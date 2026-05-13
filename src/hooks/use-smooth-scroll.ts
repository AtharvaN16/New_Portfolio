'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

interface UseSmoothScrollOptions {
  duration?: number
  easing?: (t: number) => number
  wheelMultiplier?: number
  touchMultiplier?: number
}

interface UseSmoothScrollReturn {
  lenisRef: React.RefObject<Lenis | null>
  scrollTo: (target: number, options?: { duration?: number; easing?: (t: number) => number }) => void
}

/**
 * Custom hook for smooth scrolling within a container using Lenis
 * @param containerRef - Ref to the scrollable container element (wrapper)
 * @param contentRef - Ref to the content element (direct child of wrapper)
 * @param options - Configuration options for Lenis
 * @returns Object containing the Lenis instance ref and scrollTo function
 */
export function useSmoothScroll(
  containerRef: React.RefObject<HTMLElement | null>,
  contentRef: React.RefObject<HTMLElement | null>,
  options: UseSmoothScrollOptions = {}
): UseSmoothScrollReturn {
  const {
    duration = 1.2,
    easing = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    wheelMultiplier = 1,
    touchMultiplier = 2,
  } = options

  const lenisRef = useRef<Lenis | null>(null)

  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    const container = containerRef.current
    const content = contentRef.current
    if (!container || !content) return

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    // Skip smooth scroll if user prefers reduced motion
    if (prefersReducedMotion) {
      return
    }

    // Wait for DOM to be fully ready
    const timeoutId = setTimeout(() => {
      try {
        // Initialize Lenis with the container as wrapper and content element
        const lenis = new Lenis({
          wrapper: container,
          content: content, // Required for container scrolling
          duration,
          easing,
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier,
          touchMultiplier,
          infinite: false,
          autoResize: true, // Enable automatic resize using ResizeObserver
        })

        lenisRef.current = lenis

        // Animation frame loop for Lenis
        let rafId: number | null = null

        function raf(time: number) {
          lenis.raf(time)
          rafId = requestAnimationFrame(raf)
        }

        rafId = requestAnimationFrame(raf)

        // Cleanup
        return () => {
          if (rafId !== null) {
            cancelAnimationFrame(rafId)
          }
          lenis.destroy()
          lenisRef.current = null
        }
      } catch (error) {
        console.error('Lenis initialization failed:', error)
        // Container will still work with native scroll
      }
    }, 0)

    return () => clearTimeout(timeoutId)
  }, [containerRef, contentRef, duration, easing, wheelMultiplier, touchMultiplier])

  // Scroll to target position
  const scrollTo = (
    target: number,
    scrollOptions?: { duration?: number; easing?: (t: number) => number }
  ) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, scrollOptions)
    } else if (containerRef.current) {
      // Fallback to manual smooth scroll if Lenis not available
      const container = containerRef.current
      const startScroll = container.scrollTop
      const distance = target - startScroll
      const scrollDuration = scrollOptions?.duration || 600
      const startTime = performance.now()

      const animateScroll = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / scrollDuration, 1)
        const easeOut = scrollOptions?.easing
          ? scrollOptions.easing(progress)
          : 1 - Math.pow(1 - progress, 3)
        container.scrollTop = startScroll + distance * easeOut

        if (progress < 1) {
          requestAnimationFrame(animateScroll)
        }
      }

      requestAnimationFrame(animateScroll)
    }
  }

  return { lenisRef, scrollTo }
}
