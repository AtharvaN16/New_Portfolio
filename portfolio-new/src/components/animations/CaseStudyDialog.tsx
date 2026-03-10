'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import { RemoveScroll } from 'react-remove-scroll'
import { getCaseStudyBySlug } from '@/lib/data/case-studies'
import { useImageDominantColor } from '@/hooks/use-image-dominant-color'
import dynamic from 'next/dynamic'

// Lazy load detail components - only loads when dialog opens
const CaseStudyDetail = dynamic(
  () =>
    import('@/components/case-study/CaseStudyDetail').then((mod) => ({
      default: mod.CaseStudyDetail,
    })),
  {
    ssr: false,
    loading: () => <div className="min-h-dvh bg-background" />,
  }
)

const ShowcaseDetail = dynamic(
  () =>
    import('@/components/case-study/ShowcaseDetail').then((mod) => ({
      default: mod.ShowcaseDetail,
    })),
  {
    ssr: false,
    loading: () => <div className="min-h-dvh bg-background" />,
  }
)

const TRANSITION_EASE: [number, number, number, number] = [0.87, 0, 0.13, 1]
const OPEN_DURATION = 1.2
const CLOSE_DURATION = 1.0

/**
 * Swaddle-style dialog for case study detail pages.
 * Opens when navigating to /case-studies/[slug]
 * Regular case studies: slide up/down animation
 * Showcase variant: color flash entry, fade exit
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

  const handleExitComplete = () => {
    setShouldLockScroll(false)
    document.body.style.overflow = ''
    const savedScroll = scrollYRef.current
    window.scrollTo(0, savedScroll)
    setCurrentSlug(null)
    window.dispatchEvent(new CustomEvent('dialog:closed'))
  }

  const caseStudy = currentSlug ? getCaseStudyBySlug(currentSlug) : null
  const isShowcase = caseStudy?.pageVariant === 'showcase'

  // Extract dominant color from showcase hero image for the flash effect
  const flashColor = useImageDominantColor(
    isShowcase ? caseStudy?.imageUrl : undefined
  )

  return (
    <RemoveScroll enabled={shouldLockScroll}>
      <AnimatePresence onExitComplete={handleExitComplete}>
        {isOpen && caseStudy && (
          <motion.div
            key="case-study-dialog"
            id="case-study-dialog"
            className="dialog fixed inset-0 z-[100]"
            data-lenis-prevent="true"
            initial={isShowcase ? { opacity: 0 } : { y: '100%' }}
            animate={
              isShowcase
                ? {
                    opacity: 1,
                    transition: { duration: 0.5, delay: 0.15, ease: 'easeOut' },
                  }
                : {
                    y: 0,
                    transition: { duration: OPEN_DURATION, ease: TRANSITION_EASE },
                  }
            }
            exit={
              isShowcase
                ? {
                    opacity: 0,
                    transition: { duration: 0.4, ease: 'easeIn' },
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
              <ShowcaseDetail caseStudy={caseStudy} flashColor={flashColor} />
            ) : (
              <CaseStudyDetail caseStudy={caseStudy} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </RemoveScroll>
  )
}
