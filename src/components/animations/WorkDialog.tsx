'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import { RemoveScroll } from 'react-remove-scroll'
import WorkPage from '@/app/work/page'

const TRANSITION_EASE: [number, number, number, number] = [0.87, 0, 0.13, 1]
const OPEN_DURATION = 1.2
const CLOSE_DURATION = 1.0

/**
 * Swaddle-style dialog that slides up from bottom.
 *
 * EXACTLY how Swaddle works:
 * - Dialog is always mounted on home page
 * - When you navigate to /work, dialog opens
 * - Home page (#page-wrapper) frozen underneath
 * - Dialog has translate-y-static-screen (100vh) initially
 * - Animates to y: 0
 */
export function WorkDialog() {
  const scrollYRef = useRef(0)
  const [isOpen, setIsOpen] = useState(false)
  const isClosingRef = useRef(false)
  const [shouldLockScroll, setShouldLockScroll] = useState(false)

  // Listen for URL changes (both custom event and popstate)
  useEffect(() => {
    const checkURL = () => {
      const shouldOpen = window.location.pathname === '/work'

      if (shouldOpen && !isOpen) {
        // Opening dialog - save scroll position and stop Lenis
        isClosingRef.current = false
        scrollYRef.current = window.scrollY

        // Stop Lenis smooth scrolling while dialog is open
        const lenis = window.lenis
        if (lenis) lenis.stop()

        // Lock scroll and open dialog
        setShouldLockScroll(true)
        setIsOpen(true)
      } else if (!shouldOpen && isOpen) {
        // Close dialog - trigger exit animation
        // KEEP scroll locked during exit animation
        isClosingRef.current = true
        setIsOpen(false)
        // Don't unlock scroll yet - wait for animation to complete
      }
    }

    // Check on mount
    checkURL()

    // Listen for popstate (back/forward buttons) and custom event (pushState from button)
    window.addEventListener('popstate', checkURL)
    window.addEventListener('workdialog:check', checkURL)

    return () => {
      window.removeEventListener('popstate', checkURL)
      window.removeEventListener('workdialog:check', checkURL)
    }
  }, [isOpen])

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
  }

  return (
    <RemoveScroll enabled={shouldLockScroll}>
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            id="dialog"
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
            <WorkPage />
          </motion.div>
        )}
      </AnimatePresence>
    </RemoveScroll>
  )
}
