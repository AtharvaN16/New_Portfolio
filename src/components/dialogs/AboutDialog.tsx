'use client'

import { m, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import { RemoveScroll } from 'react-remove-scroll'
import dynamic from 'next/dynamic'
import {
  dispatchDialogClosed,
  OVERLAY_DIALOGS,
  subscribeOverlayCheck,
  subscribeOverlayPreload,
} from '@/lib/overlay-events'

// Lazy load AboutPage - only loads when dialog opens
const AboutPage = dynamic(() => import('@/app/about/page'), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-background" />,
})

// Preload function
const preloadAboutPage = () => {
  const p = import('@/app/about/page')
  return p
}

const ABOUT_PATH = OVERLAY_DIALOGS.about.path

const TRANSITION_EASE: [number, number, number, number] = [0.87, 0, 0.13, 1]
const OPEN_DURATION = 1.2
const CLOSE_DURATION = 1.0

/**
 * About-specific dialog that slides up from bottom.
 * Follows the same pattern as ExplorationsDialog.
 */
export function AboutDialog() {
  const scrollYRef = useRef(0)
  const [isOpen, setIsOpen] = useState(false)
  const isClosingRef = useRef(false)
  const [shouldLockScroll, setShouldLockScroll] = useState(false)

  // Preload on mount and on event
  useEffect(() => {
    const handlePreload = () => {
      preloadAboutPage()
    }

    // Preload on idle
    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => handlePreload())
      } else {
        setTimeout(handlePreload, 2000)
      }
    }

    return subscribeOverlayPreload('about', handlePreload)
  }, [])

  // Listen for URL changes
  useEffect(() => {
    const checkURL = () => {
      const shouldOpen = window.location.pathname === ABOUT_PATH

      if (shouldOpen && !isOpen) {
        // Opening dialog - save scroll position
        isClosingRef.current = false
        scrollYRef.current = window.scrollY

        // Lock body scroll manually
        document.body.style.overflow = 'hidden'

        // Lock scroll and open dialog
        setShouldLockScroll(true)
        setIsOpen(true)
      } else if (!shouldOpen && isOpen) {
        // Close dialog - trigger exit animation
        isClosingRef.current = true
        setIsOpen(false)
      }
    }

    // Check on mount
    checkURL()

    // Listen for popstate and custom events
    window.addEventListener('popstate', checkURL)
    const removeCheck = subscribeOverlayCheck('about', checkURL)

    return () => {
      window.removeEventListener('popstate', checkURL)
      removeCheck()
    }
  }, [isOpen])

  const handleExitComplete = () => {
    // Dialog has fully closed - NOW unlock scroll and restore position
    setShouldLockScroll(false)
    document.body.style.overflow = ''
    const savedScroll = scrollYRef.current
    window.scrollTo(0, savedScroll)

    dispatchDialogClosed()
  }

  return (
    <RemoveScroll enabled={shouldLockScroll}>
      <AnimatePresence onExitComplete={handleExitComplete}>
        {isOpen && (
          <m.div
            key="about-dialog"
            id="dialog"
            className="dialog fixed inset-0 z-[100]"
            data-lenis-prevent="true"
            initial={{ y: '100%' }}
            animate={{
              y: 0,
              transition: {
                duration: OPEN_DURATION,
                ease: TRANSITION_EASE,
              },
            }}
            exit={{
              y: '100%',
              transition: {
                duration: CLOSE_DURATION,
                ease: TRANSITION_EASE,
              },
            }}
            style={{
              backgroundColor: 'rgb(var(--color-background))',
              boxShadow: 'var(--shadow-2xl)',
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden',
            }}
          >
            <AboutPage />
          </m.div>
        )}
      </AnimatePresence>
    </RemoveScroll>
  )
}
