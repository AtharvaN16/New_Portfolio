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
import Lenis from 'lenis'

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
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    // Skip smooth scroll if user prefers reduced motion
    if (prefersReducedMotion) {
      return
    }

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2, // Animation duration (higher = smoother but slower)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
      orientation: 'vertical', // Vertical scrolling
      gestureOrientation: 'vertical',
      smoothWheel: true, // Enable smooth scroll on wheel
      wheelMultiplier: 1, // Scroll speed multiplier
      touchMultiplier: 2, // Touch scroll speed
      infinite: false, // Disable infinite scroll
    })

    lenisRef.current = lenis
    window.lenis = lenis

    // Animation frame loop
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Cleanup on unmount
    return () => {
      lenis.destroy()
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
