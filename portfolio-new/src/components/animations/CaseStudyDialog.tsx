'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import { RemoveScroll } from 'react-remove-scroll'
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

  // Flash overlay — managed here so it outlives the dialog for exit reveals
  const [flash, setFlash] = useState<FlashState>({ visible: false, opacity: 1, duration: 0 })
  // Exit always uses site background color (black/white), entry uses dominant image color
  const [flashBgColor, setFlashBgColor] = useState<string>('rgb(var(--color-background))')
  const wasShowcaseRef = useRef(false)
  const flashTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // URL listener
  useEffect(() => {
    const checkURL = () => {
      const path = window.location.pathname
      const caseStudyMatch = path.match(/^\/case-studies\/([^/]+)$/)

      if (caseStudyMatch) {
        const slug = caseStudyMatch[1]
        if (!isOpen || currentSlug !== slug) {
          isClosingRef.current = false
          setCurrentSlug(slug)
          scrollYRef.current = window.scrollY
          document.body.style.overflow = 'hidden'
          setShouldLockScroll(true)
          setIsOpen(true)
        }
      } else if (isOpen) {
        isClosingRef.current = true
        setIsOpen(false)
      }
    }

    checkURL()
    window.addEventListener('popstate', checkURL)
    window.addEventListener('casestudydialog:check', checkURL)
    return () => {
      window.removeEventListener('popstate', checkURL)
      window.removeEventListener('casestudydialog:check', checkURL)
    }
  }, [isOpen, currentSlug])

  const caseStudy = currentSlug ? getCaseStudyBySlug(currentSlug) : null
  const isShowcase = caseStudy?.pageVariant === 'showcase'

  const flashColor = useImageDominantColor(isShowcase ? caseStudy?.imageUrl : undefined)

  // Entry flash: dominant image color, hold briefly, then fade to reveal
  useEffect(() => {
    if (!isOpen || !isShowcase) return
    wasShowcaseRef.current = true
    setFlashBgColor(flashColor || 'rgb(var(--color-background))')
    setFlash({ visible: true, opacity: 1, duration: 0 })

    const timer = setTimeout(() => {
      setFlash({ visible: true, opacity: 0, duration: 0.3 })  // faster reveal (was 0.45)
    }, 200)                                                      // shorter hold (was 250)

    flashTimerRef.current = timer
    return () => clearTimeout(timer)
  }, [isOpen, isShowcase, flashColor])

  // Exit flash: always site background color (theme-aware black/white), quick cover + quick reveal
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
    setShouldLockScroll(false)
    document.body.style.overflow = ''
    setCurrentSlug(null)
    window.dispatchEvent(new CustomEvent('dialog:closed'))

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
        <motion.div
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
          <motion.div
            key="case-study-dialog"
            id="case-study-dialog"
            className="dialog fixed inset-0 z-[100]"
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
            ) : (
              <CaseStudyDetail caseStudy={caseStudy} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </RemoveScroll>
  )
}
