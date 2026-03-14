'use client'

import { m, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import { RemoveScroll } from 'react-remove-scroll'
import dynamic from 'next/dynamic'

// Lazy load WritingsPage - only loads when dialog opens
const WritingsPage = dynamic(() => import('@/app/writings/page'), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-background" />,
})

// Preload function
const preloadWritingsPage = () => {
  const p = import('@/app/writings/page')
  return p
}

const TRANSITION_EASE: [number, number, number, number] = [0.87, 0, 0.13, 1]
const OPEN_DURATION = 1.2
const CLOSE_DURATION = 1.0

/**
 * Writings-specific dialog that slides up from bottom.
 * Follows the same pattern as ExplorationsDialog.
 */
export function WritingsDialog() {
  const scrollYRef = useRef(0)
  const [isOpen, setIsOpen] = useState(false)
  const isClosingRef = useRef(false)
  const [shouldLockScroll, setShouldLockScroll] = useState(false)

  // Preload on mount and on event
  useEffect(() => {
    const handlePreload = () => {
      preloadWritingsPage()
    }

    // Preload on idle
    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => handlePreload())
      } else {
        setTimeout(handlePreload, 2000)
      }
    }

    window.addEventListener('writingsdialog:preload', handlePreload)
    return () =>
      window.removeEventListener('writingsdialog:preload', handlePreload)
  }, [])

  // Listen for URL changes
  useEffect(() => {
    const checkURL = () => {
      const shouldOpen = window.location.pathname === '/writings'

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
    window.addEventListener('writingsdialog:check', checkURL)

    return () => {
      window.removeEventListener('popstate', checkURL)
      window.removeEventListener('writingsdialog:check', checkURL)
    }
  }, [isOpen])

  const handleExitComplete = () => {
    // Dialog has fully closed - NOW unlock scroll and restore position
    setShouldLockScroll(false)
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
          <m.div
            key="writings-dialog"
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
            <WritingsPage />
          </m.div>
        )}
      </AnimatePresence>
    </RemoveScroll>
  )
}
