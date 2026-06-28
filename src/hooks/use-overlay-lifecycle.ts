import { useCallback, useEffect, useRef, useState, type RefObject } from 'react'
import {
  dispatchDialogClosed,
  subscribeOverlayCheck,
  subscribeOverlayPreload,
  type OverlayDialogId,
} from '@/lib/overlay-events'
import {
  applyOverlayPageChrome,
  clearOverlayPageChrome,
} from '@/lib/overlay-page-chrome'

const CASE_STUDY_PATH_RE = /^\/case-studies\/([^/]+)$/

export type OverlayPathMatch =
  | { mode: 'exact'; path: string }
  | { mode: 'case-study' }

interface UseOverlayLifecycleOptions {
  dialogId: OverlayDialogId
  match: OverlayPathMatch
  preload?: () => void | Promise<unknown>
  /** Extra work when URL says open (e.g. rememberCaseStudyOpener). */
  onOpen?: (pathname: string) => void
  /** Defer page chrome until content is ready (case study waits for slug data). */
  isChromeReady?: boolean
  /** Dynamic chrome readiness based on overlay state. */
  resolveIsChromeReady?: (state: {
    isOpen: boolean
    slug: string | null
    routePath: string | null
  }) => boolean
  /** Return true to skip default exit cleanup entirely. */
  onExitComplete?: () => boolean | void
}

interface UseOverlayLifecycleResult {
  isOpen: boolean
  shouldLockScroll: boolean
  scrollYRef: RefObject<number>
  routePath: string | null
  slug: string | null
  handleExitComplete: () => void
}

function resolvePathMatch(
  pathname: string,
  match: OverlayPathMatch
): { open: boolean; slug: string | null; routePath: string | null } {
  if (match.mode === 'exact') {
    const open = pathname === match.path
    return {
      open,
      slug: null,
      routePath: open ? match.path : null,
    }
  }

  const caseStudyMatch = pathname.match(CASE_STUDY_PATH_RE)
  if (!caseStudyMatch) {
    return { open: false, slug: null, routePath: null }
  }

  const slug = caseStudyMatch[1]
  return {
    open: true,
    slug,
    routePath: `/case-studies/${slug}`,
  }
}

function scheduleIdlePreload(preload: () => void | Promise<unknown>): void {
  if (typeof window === 'undefined') return

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => {
      void preload()
    })
  } else {
    setTimeout(() => {
      void preload()
    }, 2000)
  }
}

export function useOverlayLifecycle({
  dialogId,
  match,
  preload,
  onOpen,
  isChromeReady = true,
  resolveIsChromeReady,
  onExitComplete,
}: UseOverlayLifecycleOptions): UseOverlayLifecycleResult {
  const scrollYRef = useRef(0)
  const [isOpen, setIsOpen] = useState(false)
  const [shouldLockScroll, setShouldLockScroll] = useState(false)
  const [slug, setSlug] = useState<string | null>(null)
  const [routePath, setRoutePath] = useState<string | null>(null)

  const isOpenRef = useRef(false)
  const slugRef = useRef<string | null>(null)
  const onOpenRef = useRef(onOpen)
  const onExitCompleteRef = useRef(onExitComplete)
  const resolveIsChromeReadyRef = useRef(resolveIsChromeReady)
  const matchRef = useRef(match)

  useEffect(() => {
    isOpenRef.current = isOpen
  }, [isOpen])

  useEffect(() => {
    slugRef.current = slug
  }, [slug])

  useEffect(() => {
    onOpenRef.current = onOpen
  }, [onOpen])

  useEffect(() => {
    onExitCompleteRef.current = onExitComplete
  }, [onExitComplete])

  useEffect(() => {
    resolveIsChromeReadyRef.current = resolveIsChromeReady
  }, [resolveIsChromeReady])

  useEffect(() => {
    matchRef.current = match
  }, [match])

  useEffect(() => {
    if (!preload) return

    scheduleIdlePreload(preload)

    const handlePreload = () => {
      void preload()
    }

    return subscribeOverlayPreload(dialogId, handlePreload)
  }, [dialogId, preload])

  useEffect(() => {
    const checkURL = () => {
      const pathname = window.location.pathname
      const resolved = resolvePathMatch(pathname, matchRef.current)

      if (resolved.open) {
        const slugChanged =
          matchRef.current.mode === 'case-study' &&
          slugRef.current !== resolved.slug

        if (!isOpenRef.current || slugChanged) {
          onOpenRef.current?.(pathname)
          setSlug(resolved.slug)
          setRoutePath(resolved.routePath)
          scrollYRef.current = window.scrollY
          document.body.style.overflow = 'hidden'
          setShouldLockScroll(true)
          setIsOpen(true)
        }
        return
      }

      if (isOpenRef.current) {
        setIsOpen(false)
      }
    }

    checkURL()
    window.addEventListener('popstate', checkURL)
    const removeCheck = subscribeOverlayCheck(dialogId, checkURL)

    return () => {
      window.removeEventListener('popstate', checkURL)
      removeCheck()
    }
  }, [dialogId])

  useEffect(() => {
    const chromeReady =
      resolveIsChromeReadyRef.current?.({ isOpen, slug, routePath }) ??
      isChromeReady

    const chromeActive =
      isOpen &&
      chromeReady &&
      routePath &&
      (match.mode !== 'case-study' || !!slug)

    if (!chromeActive) return

    applyOverlayPageChrome(routePath)
    return () => clearOverlayPageChrome()
  }, [isOpen, isChromeReady, routePath, slug, match.mode])

  const handleExitComplete = useCallback(() => {
    const skipDefaults = onExitCompleteRef.current?.() === true
    if (skipDefaults) return

    setShouldLockScroll(false)
    document.body.style.overflow = ''
    setSlug(null)
    setRoutePath(null)
    dispatchDialogClosed()
    window.scrollTo(0, scrollYRef.current)
  }, [])

  return {
    isOpen,
    shouldLockScroll,
    scrollYRef,
    routePath,
    slug,
    handleExitComplete,
  }
}
