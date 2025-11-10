'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { type ReactNode, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { FrozenRouter } from './FrozenRouter'
import { useViewTransition } from '@/components/providers/ViewTransitionProvider'
import { usePreviousValue } from '@/hooks/use-previous-value'

interface PageTransitionProps {
  children: ReactNode
  className?: string
}

type TransitionState = {
  frozenContent: ReactNode
  frozenPath: string
  newPath: string
  scrollY: number
}

const TRANSITION_EASE: [number, number, number, number] = [0.87, 0, 0.13, 1]
const TRANSITION_DURATION = 0.9

/**
 * Swaddle-style page transition controller.
 *
 * CRITICAL INSIGHT: We must capture the OLD children BEFORE Next.js
 * replaces them with the NEW page content.
 * 
 * Strategy:
 * 1. Use usePreviousValue to get children from the PREVIOUS render
 * 2. When pathname changes, freeze router and show old children in base layer
 * 3. Animate new children in as overlay
 */
export function PageTransition({ children, className }: PageTransitionProps) {
  const pathname = usePathname()
  const previousPathname = usePreviousValue(pathname)
  const previousChildren = usePreviousValue(children)
  
  const { startTransition, endTransition } = useViewTransition()
  
  const [transitionState, setTransitionState] = useState<TransitionState | null>(null)
  const [hasMounted, setHasMounted] = useState(false)

  // Track mounted state
  useEffect(() => {
    setHasMounted(true)
  }, [])

  // Detect route changes and trigger transition
  useEffect(() => {
    if (!hasMounted) return
    if (transitionState) return // Already transitioning
    if (!previousPathname) return // First render
    if (pathname === previousPathname) return // No change

    console.log('[PageTransition] Navigation:', previousPathname, '→', pathname)

    // Capture scroll position NOW
    const scrollY = typeof window !== 'undefined' ? window.scrollY : 0

    // Start transition with frozen snapshot from PREVIOUS render
    setTransitionState({
      frozenContent: previousChildren, // This is from the PREVIOUS render!
      frozenPath: previousPathname,
      newPath: pathname,
      scrollY,
    })
    startTransition()

    // Pause Lenis during transition
    const lenis = (window as any).lenis
    if (lenis) {
      lenis.stop()
    }
  }, [hasMounted, pathname, previousPathname, previousChildren, children, startTransition, transitionState])

  // Lock scroll during transition
  useEffect(() => {
    if (!transitionState) return

    const scrollY = transitionState.scrollY
    const root = document.documentElement
    
    // Save original styles
    const originalPosition = root.style.position
    const originalTop = root.style.top
    const originalWidth = root.style.width
    const originalOverflow = document.body.style.overflow

    // Lock in place (Swaddle technique)
    root.style.position = 'fixed'
    root.style.top = `-${scrollY}px`
    root.style.width = '100%'
    document.body.style.overflow = 'hidden'

    return () => {
      // Restore
      root.style.position = originalPosition
      root.style.top = originalTop
      root.style.width = originalWidth
      document.body.style.overflow = originalOverflow
      
      // Scroll to top for new page
      window.scrollTo(0, 0)
    }
  }, [transitionState])

  const isTransitioning = Boolean(transitionState)

  return (
    <>
      {/* Base layer - shows OLD content during transition */}
      <FrozenRouter freeze={isTransitioning}>
        <div
          id="page-wrapper"
          className={className}
          aria-hidden={isTransitioning}
          style={
            isTransitioning
              ? {
                  position: 'relative',
                  zIndex: 0,
                  pointerEvents: 'none',
                }
              : undefined
          }
        >
          {isTransitioning && transitionState ? transitionState.frozenContent : children}
        </div>
      </FrozenRouter>

      {/* Overlay - NEW content slides from bottom */}
      <AnimatePresence initial={false} mode="wait">
        {transitionState && (
          <motion.div
            key={transitionState.newPath}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{
              duration: TRANSITION_DURATION,
              ease: TRANSITION_EASE,
            }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 50,
              overflowY: 'auto',
              backgroundColor: 'hsl(var(--background))',
            }}
            onAnimationComplete={(definition) => {
              if (definition !== 'animate') return
              
              // Animation done - clear transition state
              setTransitionState(null)
              endTransition()

              // Resume Lenis
              const lenis = (window as any).lenis
              if (lenis) {
                lenis.start()
              }
            }}
          >
            <div className={className}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
