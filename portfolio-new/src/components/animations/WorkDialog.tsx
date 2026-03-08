'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import { RemoveScroll } from 'react-remove-scroll'
import dynamic from 'next/dynamic'

// Lazy load WorkPage - only loads when dialog opens
const WorkPage = dynamic(() => import('@/app/work/page'), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-background" />,
})

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

    // Unlock body scroll
    document.body.style.overflow = ''

    const savedScroll = scrollYRef.current
    window.scrollTo(0, savedScroll)

    // Notify Water Blob to resume animation
    window.dispatchEvent(new CustomEvent('dialog:closed'))
  }

  return (
    <RemoveScroll enabled={shouldLockScroll}>
      <AnimatePresence onExitComplete={handleExitComplete}>
        {isOpen && (
          <motion.div
            key="work-dialog"
            id="dialog"
            className="dialog fixed inset-0 z-[100] overflow-y-auto"
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
              willChange: 'transform',
              backfaceVisibility: 'hidden',
            }}
          >
            <WorkPage />
          </motion.div>
        )}
      </AnimatePresence>
    </RemoveScroll>
  )
}
