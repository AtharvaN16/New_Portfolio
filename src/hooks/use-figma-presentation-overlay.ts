'use client'

import { useCallback, useEffect, useLayoutEffect, type RefObject } from 'react'
import { useRouter } from 'next/navigation'
import { CASE_STUDY_RETURN_PATH_KEY } from '@/lib/case-study-overlay'

/** Minimal typing for Chromium Navigation API (not in all TS lib.dom targets). */
type NavigationNavigateEvent = Event & {
  navigationType: string
  canIntercept: boolean
  destination: { index: number }
  intercept: (opts: { handler: () => void | Promise<void> }) => void
}

type NavigationWithTraverse = {
  currentEntry: { index: number } | null
  addEventListener: (type: 'navigate', listener: (e: NavigationNavigateEvent) => void) => void
  removeEventListener: (type: 'navigate', listener: (e: NavigationNavigateEvent) => void) => void
}

function getNavigation(): NavigationWithTraverse | undefined {
  return (window as unknown as { navigation?: NavigationWithTraverse }).navigation
}

/** Dialog uses replaceState via onClose; standalone full-page uses router.replace (no history.back() through iframe). */
export function useFigmaPresentationClose(onClose?: () => void) {
  const router = useRouter()
  return useCallback(() => {
    if (onClose) {
      onClose()
      return
    }
    const returnPath = sessionStorage.getItem(CASE_STUDY_RETURN_PATH_KEY)
    if (returnPath) {
      try {
        sessionStorage.removeItem(CASE_STUDY_RETURN_PATH_KEY)
      } catch {
        /* ignore */
      }
      router.replace(returnPath)
      return
    }
    router.replace('/')
  }, [onClose, router])
}

/**
 * Load the deck embed via location.replace from the about:blank iframe so the
 * initial load does not add an extra session history step.
 */
export function useFigmaEmbedLoad(
  iframeRef: RefObject<HTMLIFrameElement | null>,
  figmaEmbedUrl: string | undefined
) {
  useLayoutEffect(() => {
    if (!figmaEmbedUrl || !iframeRef.current) return
    const win = iframeRef.current.contentWindow
    if (!win) return
    try {
      win.location.replace(figmaEmbedUrl)
    } catch {
      iframeRef.current.src = figmaEmbedUrl
    }
  }, [figmaEmbedUrl, iframeRef])
}

/**
 * When the Navigation API is available, intercept backward traversals so the
 * browser back button closes the presentation instead of stepping Figma slides.
 */
export function useInterceptHistoryBackToClose(onClose: () => void) {
  useEffect(() => {
    const nav = getNavigation()
    if (!nav || typeof nav.addEventListener !== 'function') return

    const onNavigate = (e: NavigationNavigateEvent) => {
      if (e.navigationType !== 'traverse') return
      const current = nav.currentEntry
      if (!current || e.destination.index >= current.index) return
      if (!e.canIntercept) return
      e.intercept({
        handler: () => {
          onClose()
        },
      })
    }

    nav.addEventListener('navigate', onNavigate)
    return () => nav.removeEventListener('navigate', onNavigate)
  }, [onClose])
}
