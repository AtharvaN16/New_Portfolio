'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import WorkPage from '@/app/work/page'

const TRANSITION_EASE: [number, number, number, number] = [0.87, 0, 0.13, 1]
const OPEN_DURATION = 1.2

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

  // Listen for URL changes (both pushState and popstate)
  useEffect(() => {
    const checkURL = () => {
      const shouldOpen = window.location.pathname === '/work'

      if (shouldOpen && !isOpen) {
        // Opening dialog
        const currentScrollY = window.scrollY
        scrollYRef.current = currentScrollY

        // Freeze #page-wrapper (Swaddle technique)
        const pageWrapper = document.getElementById('page-wrapper')
        if (pageWrapper) {
          pageWrapper.style.position = 'fixed'
          pageWrapper.style.left = '0'
          pageWrapper.style.right = '0'
          pageWrapper.style.top = `-${currentScrollY}px`
        }

        // Don't set body overflow - let the dialog handle its own scroll
        // document.body.style.overflow = 'hidden'

        // Pause Lenis on the main page
        const lenis = window.lenis
        if (lenis) lenis.stop()

        setIsOpen(true)
      } else if (!shouldOpen && isOpen) {
        // Closing dialog
        const pageWrapper = document.getElementById('page-wrapper')
        if (pageWrapper) {
          pageWrapper.style.position = ''
          pageWrapper.style.left = ''
          pageWrapper.style.right = ''
          pageWrapper.style.top = ''
        }

        // document.body.style.overflow = ''
        window.scrollTo(0, scrollYRef.current)

        const lenis = window.lenis
        if (lenis) {
          lenis.scrollTo(scrollYRef.current, { immediate: true })
          lenis.start()
        }

        setIsOpen(false)
      }
    }

    // Check on mount
    checkURL()

    // Listen for popstate (back/forward buttons)
    window.addEventListener('popstate', checkURL)

    return () => {
      window.removeEventListener('popstate', checkURL)
    }
  }, [isOpen])

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
            duration: OPEN_DURATION,
            ease: TRANSITION_EASE,
          }}
          style={{
            backgroundColor: 'rgb(var(--color-background))',
          }}
        >
          <WorkPage />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
