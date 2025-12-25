'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import { RemoveScroll } from 'react-remove-scroll'
import { getCaseStudyBySlug } from '@/lib/data/case-studies'
import { CaseStudyDetail } from '@/components/case-study/CaseStudyDetail'

const TRANSITION_EASE: [number, number, number, number] = [0.87, 0, 0.13, 1]
const OPEN_DURATION = 1.2
const CLOSE_DURATION = 1.0

/**
 * Swaddle-style dialog for case study detail pages.
 * Opens when navigating to /case-studies/[slug]
 * Uses same transition as WorkDialog
 */
export function CaseStudyDialog() {
  const scrollYRef = useRef(0)
  const [isOpen, setIsOpen] = useState(false)
  const [currentSlug, setCurrentSlug] = useState<string | null>(null)
  const isClosingRef = useRef(false)
  const [shouldLockScroll, setShouldLockScroll] = useState(false)

  // Listen for URL changes
  useEffect(() => {
    const checkURL = () => {
      const path = window.location.pathname
      const caseStudyMatch = path.match(/^\/case-studies\/([^/]+)$/)

      if (caseStudyMatch) {
        const slug = caseStudyMatch[1]
        if (!isOpen || currentSlug !== slug) {
          // Opening dialog - save scroll position and stop Lenis
          isClosingRef.current = false
          setCurrentSlug(slug)
          scrollYRef.current = window.scrollY

          // Stop Lenis smooth scrolling while dialog is open
          const lenis = window.lenis
          if (lenis) lenis.stop()

          // Lock scroll and open dialog
          setShouldLockScroll(true)
          setIsOpen(true)
        }
      } else if (isOpen) {
        // Close dialog - trigger exit animation
        // KEEP scroll locked during exit animation
        isClosingRef.current = true
        setIsOpen(false)
        // Don't unlock scroll yet - wait for animation to complete
      }
    }

    // Check on mount
    checkURL()

    // Listen for navigation events
    window.addEventListener('popstate', checkURL)
    window.addEventListener('casestudydialog:check', checkURL)

    return () => {
      window.removeEventListener('popstate', checkURL)
      window.removeEventListener('casestudydialog:check', checkURL)
    }
  }, [isOpen, currentSlug])

  const handleExitComplete = () => {
    // Dialog has fully closed - NOW unlock scroll and restore position
    setShouldLockScroll(false)

    const savedScroll = scrollYRef.current
    window.scrollTo(0, savedScroll)

    // Restart Lenis and restore its position
    const lenis = window.lenis
    if (lenis) {
      lenis.scrollTo(savedScroll, { immediate: true })
      lenis.start()
    }

    setCurrentSlug(null)
  }

  const caseStudy = currentSlug ? getCaseStudyBySlug(currentSlug) : null

  return (
    <RemoveScroll enabled={shouldLockScroll}>
      <AnimatePresence mode="wait">
        {isOpen && caseStudy && (
          <motion.div
            id="case-study-dialog"
            className="dialog fixed inset-0 z-[100] overflow-y-auto"
            data-lenis-prevent="true"
            initial={{ y: '100%' }}
            animate={{
              y: 0,
              transition: {
                duration: OPEN_DURATION,
                ease: TRANSITION_EASE,
              }
            }}
            exit={{
              y: '100%',
              transition: {
                duration: CLOSE_DURATION,
                ease: TRANSITION_EASE,
              }
            }}
            onAnimationComplete={() => {
              if (isClosingRef.current) {
                handleExitComplete()
              }
            }}
            style={{
              backgroundColor: 'rgb(var(--color-background))',
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              transform: 'translate3d(0, 0, 0)',
            }}
          >
            <CaseStudyDetail caseStudy={caseStudy} />
          </motion.div>
        )}
      </AnimatePresence>
    </RemoveScroll>
  )
}
