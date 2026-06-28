'use client'

import { m, AnimatePresence } from 'framer-motion'
import { useCallback, useEffect, useState, useRef } from 'react'
import { RemoveScroll } from 'react-remove-scroll'
import {
  CASE_STUDY_RETURN_PATH_KEY,
  rememberCaseStudyOpener,
  restoreCaseStudyOpenerFocus,
} from '@/lib/case-study-overlay'
import { dispatchOverlayCheck } from '@/lib/overlay-events'
import { getCaseStudyBySlug } from '@/lib/data/case-studies'
import { useFocusTrap } from '@/hooks/use-focus-trap'
import { useOverlayLifecycle } from '@/hooks/use-overlay-lifecycle'
import { useImageDominantColor } from '@/hooks/use-image-dominant-color'
import {
  OVERLAY_CLOSE_DURATION,
  OVERLAY_OPEN_DURATION,
  OVERLAY_TRANSITION_EASE,
} from '@/lib/overlay-tokens'
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

const preloadCaseStudyPages = () => {
  import('@/components/case-study/CaseStudyDetail')
  import('@/components/case-study/ShowcaseDetail')
  import('@/components/case-study/FigmaPresentationDetail')
}

interface FlashState {
  visible: boolean
  opacity: number
  duration: number
}

export function CaseStudyDialog() {
  const dialogRef = useRef<HTMLDivElement>(null)
  const isOpenRef = useRef(false)
  const wasShowcaseRef = useRef(false)
  const flashTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [flash, setFlash] = useState<FlashState>({
    visible: false,
    opacity: 1,
    duration: 0,
  })
  const [flashBgColor, setFlashBgColor] = useState<string>(
    'rgb(var(--color-background))'
  )

  const {
    isOpen,
    shouldLockScroll,
    routePath,
    slug,
    handleExitComplete: completeOverlayExit,
  } = useOverlayLifecycle({
    dialogId: 'case-study',
    match: { mode: 'case-study' },
    preload: preloadCaseStudyPages,
    onOpen: () => rememberCaseStudyOpener(),
    resolveIsChromeReady: ({ slug: activeSlug }) =>
      !!activeSlug && !!getCaseStudyBySlug(activeSlug),
    onExitComplete: () => isOpenRef.current,
  })

  useEffect(() => {
    isOpenRef.current = isOpen
  }, [isOpen])

  const caseStudy = slug ? getCaseStudyBySlug(slug) : null
  const isShowcase = caseStudy?.pageVariant === 'showcase'
  const isFigmaPresentation = caseStudy?.pageVariant === 'figma-presentation'

  const flashColor = useImageDominantColor(
    isShowcase ? caseStudy?.imageUrl : undefined
  )

  useEffect(() => {
    if (!isOpen || !isShowcase) return
    wasShowcaseRef.current = true
    setFlashBgColor(flashColor || 'rgb(var(--color-background))')
    setFlash({ visible: true, opacity: 1, duration: 0 })

    const timer = setTimeout(() => {
      setFlash({ visible: true, opacity: 0, duration: 0.3 })
    }, 250)

    flashTimerRef.current = timer
    return () => clearTimeout(timer)
  }, [isOpen, isShowcase, flashColor])

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

  const handleShowcaseClose = useCallback(() => {
    if (flashTimerRef.current) clearTimeout(flashTimerRef.current)
    setFlashBgColor('rgb(var(--color-background))')
    setFlash({ visible: true, opacity: 1, duration: 0.15 })

    setTimeout(() => {
      if (window.history.length > 1) {
        window.history.back()
      } else {
        window.location.href = '/'
      }
    }, 180)
  }, [])

  const handleEscapeClose = useCallback(() => {
    if (isShowcase) {
      handleShowcaseClose()
      return
    }
    if (isFigmaPresentation) {
      handleFigmaClose()
      return
    }
    if (window.history.length > 1) {
      window.history.back()
    } else {
      window.location.href = '/'
    }
  }, [isShowcase, isFigmaPresentation, handleFigmaClose, handleShowcaseClose])

  useFocusTrap(dialogRef, {
    enabled: isOpen && !!caseStudy,
    initialFocusSelector: '#case-study-dialog-close',
    onEscape: handleEscapeClose,
  })

  const handleExitComplete = () => {
    if (isOpenRef.current) return

    const wasShowcase = wasShowcaseRef.current
    completeOverlayExit()

    if (wasShowcase) {
      wasShowcaseRef.current = false
      setFlash({ visible: true, opacity: 0, duration: 0.25 })
      const timer = setTimeout(
        () => setFlash({ visible: false, opacity: 0, duration: 0 }),
        350
      )
      flashTimerRef.current = timer
    }

    restoreCaseStudyOpenerFocus()
  }

  return (
    <RemoveScroll enabled={shouldLockScroll}>
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
            ref={dialogRef}
            key={slug}
            id="case-study-dialog"
            className="dialog fixed inset-0 z-[110]"
            data-lenis-prevent="true"
            data-overlay-active="true"
            data-overlay-route={routePath ?? undefined}
            role="dialog"
            aria-modal="true"
            aria-label={`${caseStudy.title} case study`}
            initial={isShowcase ? { opacity: 1 } : { y: '100%' }}
            animate={
              isShowcase
                ? { opacity: 1 }
                : {
                    y: 0,
                    transition: {
                      duration: OVERLAY_OPEN_DURATION,
                      ease: OVERLAY_TRANSITION_EASE,
                    },
                  }
            }
            exit={
              isShowcase
                ? {
                    opacity: 0,
                    transition: { duration: 0.01 },
                  }
                : {
                    y: '100%',
                    transition: {
                      duration: OVERLAY_CLOSE_DURATION,
                      ease: OVERLAY_TRANSITION_EASE,
                    },
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
              <ShowcaseDetail
                caseStudy={caseStudy}
                onClose={handleShowcaseClose}
              />
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
