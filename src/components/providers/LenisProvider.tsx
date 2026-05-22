'use client'

/**
 * Lenis Smooth Scroll Provider
 *
 * Wraps the app with smooth scrolling functionality.
 * Creates a premium, momentum-based scroll experience.
 *
 * Features:
 * - Smooth momentum scrolling
 * - Easing and lerp customization
 * - Integrates with Framer Motion scroll animations
 * - Respects user's motion preferences
 */

import { type ReactNode, useEffect, useRef } from 'react'
import type Lenis from 'lenis'

interface LenisProviderProps {
  children: ReactNode
}

// Extend window interface to include lenis
declare global {
  interface Window {
    lenis?: Lenis
  }
}

export function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Check OS-level reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) return

    // Enable Lenis on all devices. Modern Lenis is highly optimized for touch,
    // and enabling it allows us to sync scroll-linked animations with the 
    // scroll thread, eliminating jitter on mobile.
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

    let rafId = 0
    let cancelled = false

    // Dynamically import Lenis so it doesn't inflate the initial bundle
    import('lenis').then(({ default: LenisClass }) => {
      if (cancelled) return

      const lenis = new LenisClass({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5, // Reduced from 2 to save CPU cycles on touch scroll signals
        infinite: false,
      })

      lenisRef.current = lenis
      window.lenis = lenis

      function raf(time: number) {
        lenis.raf(time)
        rafId = requestAnimationFrame(raf)
      }

      rafId = requestAnimationFrame(raf)
    })

    return () => {
      cancelled = true
      cancelAnimationFrame(rafId)
      lenisRef.current?.destroy()
      lenisRef.current = null
      delete window.lenis
    }
  }, [])

  return <>{children}</>
}

/**
 * Hook to access Lenis instance
 *
 * Usage:
 *   const lenis = useLenis()
 *   lenis?.scrollTo('#section', { offset: 100 })
 */
export function useLenis(): Lenis | undefined {
  return typeof window !== 'undefined' ? window.lenis : undefined
}
