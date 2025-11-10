'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import WorkPage from '@/app/work/page'

const TRANSITION_EASE: [number, number, number, number] = [0.87, 0, 0.13, 1]
const OPEN_DURATION = 1.2
const CLOSE_DURATION = 0.6

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
  const [isClosing, setIsClosing] = useState(false)
  const isClosingRef = useRef(false)

  // Listen for URL changes (both custom event and popstate)
  useEffect(() => {
    const checkURL = () => {
      const shouldOpen = window.location.pathname === '/work'

      if (shouldOpen && !isOpen) {
        // Opening dialog
        isClosingRef.current = false
        setIsClosing(false)
        const currentScrollY = window.scrollY
        scrollYRef.current = currentScrollY

        // Freeze #page-wrapper (Swaddle technique)
        const pageWrapper = document.getElementById('page-wrapper')
        if (pageWrapper) {
          pageWrapper.style.position = 'fixed'
          pageWrapper.style.left = '0'
          pageWrapper.style.right = '0'
          pageWrapper.style.top = `-${currentScrollY}px`
          pageWrapper.style.width = '100%'
          pageWrapper.style.willChange = 'transform' // Performance hint
        }

        // Also lock body scroll
        document.body.style.overflow = 'hidden'

        // Pause Lenis on the main page
        const lenis = window.lenis
        if (lenis) lenis.stop()

        setIsOpen(true)
      } else if (!shouldOpen && isOpen) {
        // Close dialog - trigger exit animation
        isClosingRef.current = true
        setIsClosing(true)
        setIsOpen(false)
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

  const handleEnterComplete = () => {
    // Enter animation complete - NOW unfreeze the page
    // The dialog is fully visible and covering the page, so we can safely restore it
    const savedScroll = scrollYRef.current
    const pageWrapper = document.getElementById('page-wrapper')

    if (pageWrapper) {
      // Unfreeze page-wrapper
      pageWrapper.style.position = ''
      pageWrapper.style.left = ''
      pageWrapper.style.right = ''
      pageWrapper.style.top = ''
      pageWrapper.style.width = ''
      pageWrapper.style.willChange = ''
    }

    // Restore scroll position
    window.scrollTo(0, savedScroll)

    // Unlock body
    document.body.style.overflow = ''

    // Resume Lenis at the correct position
    const lenis = window.lenis
    if (lenis) {
      lenis.scrollTo(savedScroll, { immediate: true })
      lenis.start()
    }
  }

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          id="dialog"
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
            // Only restore on ENTER animation (when dialog finishes sliding up)
            if (!isClosingRef.current) {
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
          <WorkPage />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
