'use client'

import { m, AnimatePresence } from 'framer-motion'
import { useCallback, useEffect, useState, useRef } from 'react'
import { RemoveScroll } from 'react-remove-scroll'
import { CASE_STUDY_RETURN_PATH_KEY } from '@/lib/case-study-overlay'
import {
  dispatchDialogClosed,
  dispatchOverlayCheck,
  subscribeOverlayCheck,
  subscribeOverlayPreload,
} from '@/lib/overlay-events'
import { getCaseStudyBySlug } from '@/lib/data/case-studies'
import { useImageDominantColor } from '@/hooks/use-image-dominant-color'
import dynamic from 'next/dynamic'

const CaseStudyDetail = dynamic(
  () =>
    import('@/components/case-study/CaseStudyDetail').then((mod) => ({
      default: mod.CaseStudyDetail,
    })),
  { ssr: false, loading: () => <div className="min-h-dvh bg-background" /> }
)

const ShowcaseDetail = dynamic(
  () =>
    import('@/components/case-study/ShowcaseDetail').then((mod) => ({
      default: mod.ShowcaseDetail,
    })),
  { ssr: false, loading: () => <div className="min-h-dvh bg-background" /> }
)

const FigmaPresentationDetail = dynamic(
  () =>
    import('@/components/case-study/FigmaPresentationDetail').then((mod) => ({
      default: mod.FigmaPresentationDetail,
    })),
  { ssr: false, loading: () => <div className="min-h-dvh bg-background" /> }
)

// Preload function
const preloadCaseStudyPages = () => {
  import('@/components/case-study/CaseStudyDetail')
  import('@/components/case-study/ShowcaseDetail')
  import('@/components/case-study/FigmaPresentationDetail')
}

const TRANSITION_EASE: [number, number, number, number] = [0.87, 0, 0.13, 1]
const OPEN_DURATION = 1.2
const CLOSE_DURATION = 1.0

/**
 * Flash overlay state for showcase transitions.
 * Lives at CaseStudyDialog level so it survives dialog mount/unmount,
 * enabling a smooth reveal of the portfolio page after exit.
 */
interface FlashState {
  visible: boolean
  opacity: number
  duration: number
}

export function CaseStudyDialog() {
  const scrollYRef = useRef(0)
  const [isOpen, setIsOpen] = useState(false)
  const [currentSlug, setCurrentSlug] = useState<string | null>(null)
  const isClosingRef = useRef(false)
  const [shouldLockScroll, setShouldLockScroll] = useState(false)

  // Refs always hold the latest state for use in stable callbacks
  const isOpenRef = useRef(false)
  const currentSlugRef = useRef<string | null>(null)
  useEffect(() => { isOpenRef.current = isOpen }, [isOpen])
  useEffect(() => { currentSlugRef.current = currentSlug }, [currentSlug])

  // Preload on mount and on event
  useEffect(() => {
    const handlePreload = () => {
      preloadCaseStudyPages()
    }

    // Preload on idle
    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => handlePreload())
      } else {
        setTimeout(handlePreload, 2000)
      }
    }

    return subscribeOverlayPreload('case-study', handlePreload)
  }, [])

  // Flash overlay — managed here so it outlives the dialog for exit reveals
  const [flash, setFlash] = useState<FlashState>({ visible: false, opacity: 1, duration: 0 })
  // Exit always uses site background color (black/white), entry uses dominant image color
  const [flashBgColor, setFlashBgColor] = useState<string>('rgb(var(--color-background))')
  const wasShowcaseRef = useRef(false)
  const flashTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // URL listener — stable (runs once). Uses refs for fresh isOpen/currentSlug values
  // so there's never a gap between cleanup and re-attach across state changes.
  useEffect(() => {
    const checkURL = () => {
      const path = window.location.pathname
      const caseStudyMatch = path.match(/^\/case-studies\/([^/]+)$/)

      if (caseStudyMatch) {
        const slug = caseStudyMatch[1]
        if (!isOpenRef.current || currentSlugRef.current !== slug) {
          isClosingRef.current = false
          setCurrentSlug(slug)
          scrollYRef.current = window.scrollY
          document.body.style.overflow = 'hidden'
          setShouldLockScroll(true)
          setIsOpen(true)
        }
      } else if (isOpenRef.current) {
        isClosingRef.current = true
        setIsOpen(false)
      }
    }

    checkURL()
    window.addEventListener('popstate', checkURL)
    const removeCheck = subscribeOverlayCheck('case-study', checkURL)
    return () => {
      window.removeEventListener('popstate', checkURL)
      removeCheck()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const caseStudy = currentSlug ? getCaseStudyBySlug(currentSlug) : null
  const isShowcase = caseStudy?.pageVariant === 'showcase'
  const isFigmaPresentation = caseStudy?.pageVariant === 'figma-presentation'

  const flashColor = useImageDominantColor(isShowcase ? caseStudy?.imageUrl : undefined)

  // Entry flash: dominant image color, hold briefly, then fade to reveal
  useEffect(() => {
    if (!isOpen || !isShowcase) return
    wasShowcaseRef.current = true
    setFlashBgColor(flashColor || 'rgb(var(--color-background))')
    setFlash({ visible: true, opacity: 1, duration: 0 })

    const timer = setTimeout(() => {
      setFlash({ visible: true, opacity: 0, duration: 0.3 })  // faster reveal (was 0.45)
    }, 250)                                                      // shorter hold (was 250)

    flashTimerRef.current = timer
    return () => clearTimeout(timer)
  }, [isOpen, isShowcase, flashColor])

  // Exit flash: always site background color (theme-aware black/white), quick cover + quick reveal
  const handleFigmaClose = useCallback(() => {
    const returnPath = sessionStorage.getItem(CASE_STUDY_RETURN_PATH_KEY) ?? '/'
    try {
      sessionStorage.removeItem(CASE_STUDY_RETURN_PATH_KEY)
    } catch {
      /* ignore */
    }
    window.history.replaceState({}, '', returnPath)
    dispatchOverlayCheck('case-study')
  }, [])

  const handleShowcaseClose = () => {
    if (flashTimerRef.current) clearTimeout(flashTimerRef.current)
    setFlashBgColor('rgb(var(--color-background))')             // theme bg, not dominant color
    setFlash({ visible: true, opacity: 1, duration: 0.15 })    // even faster cover (was 0.18)

    setTimeout(() => {
      if (window.history.length > 1) {
        window.history.back()
      } else {
        window.location.href = '/'
      }
    }, 180)                                                      // navigate once opaque (was 220)
  }

  const handleExitComplete = () => {
    // A new case study was opened before this exit finished — skip state reset.
    if (isOpenRef.current) return

    setShouldLockScroll(false)
    document.body.style.overflow = ''
    setCurrentSlug(null)
    dispatchDialogClosed()

    if (wasShowcaseRef.current) {
      wasShowcaseRef.current = false
      window.scrollTo(0, scrollYRef.current)
      setFlash({ visible: true, opacity: 0, duration: 0.25 })  // quick reveal of portfolio (was 0.35)
      const timer = setTimeout(() => setFlash({ visible: false, opacity: 0, duration: 0 }), 350) // was 450
      flashTimerRef.current = timer
    } else {
      window.scrollTo(0, scrollYRef.current)
    }
  }

  return (
    <RemoveScroll enabled={shouldLockScroll}>
      {/*
        Flash overlay lives OUTSIDE the dialog AnimatePresence so it persists
        through dialog unmount, allowing the exit reveal to play over the portfolio.
      */}
      {flash.visible && (
        <m.div
          className="fixed inset-0 z-[200] pointer-events-none"
          initial={false}
          animate={{ opacity: flash.opacity }}
          transition={{ duration: flash.duration, ease: 'easeInOut' }}
          style={{ backgroundColor: flashBgColor }}
          aria-hidden
        />
      )}

      <AnimatePresence onExitComplete={handleExitComplete}>
        {isOpen && caseStudy && (
          <m.div
            key={currentSlug}
            id="case-study-dialog"
            className="dialog fixed inset-0 z-[110]"
            data-lenis-prevent="true"
            initial={isShowcase ? { opacity: 1 } : { y: '100%' }}
            animate={
              isShowcase
                ? { opacity: 1 }
                : { y: 0, transition: { duration: OPEN_DURATION, ease: TRANSITION_EASE } }
            }
            exit={
              isShowcase
                ? {
                    // Exit instantly — flash overlay at z-[200] covers the dialog
                    opacity: 0,
                    transition: { duration: 0.01 },
                  }
                : {
                    y: '100%',
                    transition: { duration: CLOSE_DURATION, ease: TRANSITION_EASE },
                  }
            }
            style={{
              backgroundColor: 'rgb(var(--color-background))',
              boxShadow: 'var(--shadow-2xl)',
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden',
            }}
          >
            {isShowcase ? (
              <ShowcaseDetail caseStudy={caseStudy} onClose={handleShowcaseClose} />
            ) : isFigmaPresentation ? (
              <FigmaPresentationDetail
                caseStudy={caseStudy}
                onClose={handleFigmaClose}
              />
            ) : (
              <CaseStudyDetail caseStudy={caseStudy} />
            )}
          </m.div>
        )}
      </AnimatePresence>
    </RemoveScroll>
  )
}
