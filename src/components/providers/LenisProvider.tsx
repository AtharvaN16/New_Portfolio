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

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import type Lenis from 'lenis'
import { getIsTouch } from '@/hooks/use-responsive'

const LenisContext = createContext<Lenis | undefined>(undefined)

interface LenisProviderProps {
  children: ReactNode
}

export function LenisProvider({ children }: LenisProviderProps) {
  const [lenis, setLenis] = useState<Lenis | undefined>(undefined)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) return

    const isTouchDevice = getIsTouch()
    if (isTouchDevice) return

    let rafId = 0
    let cancelled = false
    let lenisInstance: Lenis | null = null

    const isSafari =
      /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)

    import('lenis').then(({ default: LenisClass }) => {
      if (cancelled) return

      lenisInstance = new LenisClass({
        duration: isSafari ? 0.8 : 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        infinite: false,
      })

      setLenis(lenisInstance)

      function raf(time: number) {
        lenisInstance!.raf(time)
        rafId = requestAnimationFrame(raf)
      }

      rafId = requestAnimationFrame(raf)
    })

    return () => {
      cancelled = true
      cancelAnimationFrame(rafId)
      lenisInstance?.destroy()
      lenisInstance = null
      setLenis(undefined)
    }
  }, [])

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  )
}

/**
 * Document-level Lenis instance (home page wheel scroll + hero CTAs).
 * Returns undefined on mobile, reduced-motion, or before Lenis has loaded.
 */
export function useLenis(): Lenis | undefined {
  return useContext(LenisContext)
}
