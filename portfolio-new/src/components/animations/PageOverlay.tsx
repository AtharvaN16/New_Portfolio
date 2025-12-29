'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState, type ReactNode } from 'react'

interface PageOverlayProps {
  /**
   * Pathname that triggers the overlay to open
   * e.g., "/work" will open the overlay when user navigates to /work
   */
  triggerPath: string

  /**
   * Content to show in the overlay
   */
  children: ReactNode

  /**
   * Path to navigate to when overlay closes
   * Defaults to "/"
   */
  closePath?: string
}

const TRANSITION_EASE: [number, number, number, number] = [0.87, 0, 0.13, 1]
const OPEN_DURATION = 1.2
const CLOSE_DURATION = 0.6

/**
 * Swaddle-style page overlay that slides up from the bottom.
 *
 * HOW IT WORKS (like Swaddle):
 * 1. This component is always mounted on the home page
 * 2. When user navigates to triggerPath, we intercept with shallow routing
 * 3. We open the dialog with GSAP-style animation
 * 4. The home page stays mounted underneath the whole time
 * 5. On close, we animate down and shallow route back to home
 *
 * This is NOT a page transition - it's a dialog that updates the URL.
 */
export function PageOverlay({
  triggerPath,
  children,
  closePath = '/',
}: PageOverlayProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  // Sync overlay state with pathname
  useEffect(() => {
    const shouldBeOpen = pathname === triggerPath

    if (shouldBeOpen && !isOpen) {
      // Opening - capture scroll and freeze page using state update function
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setScrollY(window.scrollY)

      // Use setTimeout to defer DOM manipulation after state update
      setTimeout(() => {
        const currentScrollY = window.scrollY

        // Freeze the page (Swaddle technique)
        const root = document.documentElement
        root.style.position = 'fixed'
        root.style.top = `-${currentScrollY}px`
        root.style.width = '100%'
        document.body.style.overflow = 'hidden'

        // Pause Lenis
        const lenis = window.lenis
        if (lenis) lenis.stop()
      }, 0)

      setIsOpen(true)
    } else if (!shouldBeOpen && isOpen) {
      // Closing - will be handled by animation complete
      setIsOpen(false)
    }
  }, [pathname, triggerPath, isOpen])

  // Handle browser back button
  useEffect(() => {
    const handlePopState = () => {
      if (isOpen && pathname !== triggerPath) {
        setIsOpen(false)
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [isOpen, pathname, triggerPath])

  const handleClose = () => {
    // Shallow route back to home (updates URL without unmounting)
    router.push(closePath, { scroll: false })
  }

  const handleAnimationComplete = () => {
    if (!isOpen) {
      // Animation closed - restore page state
      const root = document.documentElement
      root.style.position = ''
      root.style.top = ''
      root.style.width = ''
      document.body.style.overflow = ''

      // Restore scroll
      window.scrollTo(0, scrollY)

      // Resume Lenis
      const lenis = window.lenis
      if (lenis) {
        lenis.scrollTo(scrollY, { immediate: true })
        lenis.start()
      }
    }
  }

  return (
    <AnimatePresence initial={false} onExitComplete={handleAnimationComplete}>
      {isOpen && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{
            duration: isOpen ? OPEN_DURATION : CLOSE_DURATION,
            ease: TRANSITION_EASE,
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            overflowY: 'auto',
            backgroundColor: 'hsl(var(--background))',
          }}
          // Clicking the backdrop (if any) would close
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleClose()
            }
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
