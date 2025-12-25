'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import { getCaseStudyBySlug } from '@/lib/data/case-studies'
import { CaseStudyDetail } from '@/components/case-study/CaseStudyDetail'

const TRANSITION_EASE: [number, number, number, number] = [0.87, 0, 0.13, 1]
const OPEN_DURATION = 1.2
const CLOSE_DURATION = 0.6

/**
 * Swaddle-style dialog for case study detail pages.
 * Opens when navigating to /case-studies/[slug]
 * Uses same transition as WorkDialog
 */
export function CaseStudyDialog() {
  const scrollYRef = useRef(0)
  const [isOpen, setIsOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [currentSlug, setCurrentSlug] = useState<string | null>(null)
  const isClosingRef = useRef(false)

  // Listen for URL changes
  useEffect(() => {
    const checkURL = () => {
      const path = window.location.pathname
      const caseStudyMatch = path.match(/^\/case-studies\/([^/]+)$/)

      if (caseStudyMatch) {
        const slug = caseStudyMatch[1]
        if (!isOpen || currentSlug !== slug) {
          // Opening dialog or changing case study
          isClosingRef.current = false
          setIsClosing(false)
          setCurrentSlug(slug)

          // Save scroll position immediately
          const currentScrollY = window.scrollY
          scrollYRef.current = currentScrollY

          // Freeze IMMEDIATELY - prevents footer from showing
          const pageWrapper = document.getElementById('page-wrapper')
          const footerContainer = document.getElementById('footer-container')

          if (pageWrapper) {
            pageWrapper.style.position = 'fixed'
            pageWrapper.style.left = '0'
            pageWrapper.style.right = '0'
            pageWrapper.style.top = `-${currentScrollY}px`
            pageWrapper.style.width = '100%'
            pageWrapper.style.willChange = 'transform'
          }

          if (footerContainer) {
            footerContainer.style.position = 'fixed'
            footerContainer.style.left = '0'
            footerContainer.style.right = '0'
            footerContainer.style.top = `-${currentScrollY}px`
            footerContainer.style.width = '100%'
            footerContainer.style.willChange = 'transform'
          }

          // Lock body scroll
          document.body.style.overflow = 'hidden'

          // Pause Lenis
          const lenis = window.lenis
          if (lenis) lenis.stop()

          // Open dialog
          setIsOpen(true)
        }
      } else if (isOpen) {
        // Close dialog - trigger exit animation
        isClosingRef.current = true
        setIsClosing(true)
        setIsOpen(false)
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

  const unfreezePageAndRestore = () => {
    const savedScroll = scrollYRef.current
    const pageWrapper = document.getElementById('page-wrapper')
    const footerContainer = document.getElementById('footer-container')

    if (pageWrapper) {
      pageWrapper.style.position = ''
      pageWrapper.style.left = ''
      pageWrapper.style.right = ''
      pageWrapper.style.top = ''
      pageWrapper.style.width = ''
      pageWrapper.style.willChange = ''
    }

    if (footerContainer) {
      footerContainer.style.position = ''
      footerContainer.style.left = ''
      footerContainer.style.right = ''
      footerContainer.style.top = ''
      footerContainer.style.width = ''
      footerContainer.style.willChange = ''
    }

    // Restore scroll position
    window.scrollTo(0, savedScroll)

    // Unlock body
    document.body.style.overflow = ''

    // Resume Lenis
    const lenis = window.lenis
    if (lenis) {
      lenis.scrollTo(savedScroll, { immediate: true })
      lenis.start()
    }
  }

  const handleEnterComplete = () => {
    unfreezePageAndRestore()
  }

  const handleExitComplete = () => {
    unfreezePageAndRestore()
    setCurrentSlug(null)
  }

  const caseStudy = currentSlug ? getCaseStudyBySlug(currentSlug) : null

  return (
    <AnimatePresence mode="wait">
      {isOpen && caseStudy && (
        <motion.div
          id="case-study-dialog"
          className="dialog fixed inset-0 z-[100] overflow-y-auto"
          data-lenis-prevent="true"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{
            duration: isClosing ? CLOSE_DURATION : OPEN_DURATION,
            ease: TRANSITION_EASE,
          }}
          onAnimationComplete={() => {
            if (isClosingRef.current) {
              handleExitComplete()
            } else {
              handleEnterComplete()
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
  )
}
