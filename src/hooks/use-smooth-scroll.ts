'use client'

import { useCallback, useEffect, useRef } from 'react'
import Lenis from 'lenis'
import type { ContainerScrollOptions } from '@/hooks/use-container-scroll'

interface UseSmoothScrollOptions {
  duration?: number
  easing?: (t: number) => number
  wheelMultiplier?: number
  touchMultiplier?: number
}

interface UseSmoothScrollReturn {
  lenisRef: React.RefObject<Lenis | null>
  scrollTo: (
    target: number,
    options?: { duration?: number; easing?: (t: number) => number }
  ) => void
  scrollToElement: (id: string, options?: ContainerScrollOptions) => void
}

const DEFAULT_ELEMENT_OFFSET = -120
const DEFAULT_ELEMENT_DURATION = 1.5
const elementEasing = (t: number) => 1 - Math.pow(1 - t, 5)

/**
 * Smooth scrolling within a container using Lenis.
 * Keeps its instance local — never touches the document-level Lenis context.
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

  useEffect(() => {
    const container = containerRef.current
    const content = contentRef.current
    if (!container || !content) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) return

    let rafId: number | null = null
    let lenisCleanup: (() => void) | undefined

    const timeoutId = setTimeout(() => {
      try {
        const lenis = new Lenis({
          wrapper: container,
          content,
          duration,
          easing,
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier,
          touchMultiplier,
          infinite: false,
          autoResize: true,
        })

        lenisRef.current = lenis

        function raf(time: number) {
          lenis.raf(time)
          rafId = requestAnimationFrame(raf)
        }

        rafId = requestAnimationFrame(raf)

        lenisCleanup = () => {
          if (rafId !== null) {
            cancelAnimationFrame(rafId)
          }
          lenis.destroy()
          lenisRef.current = null
        }
      } catch (error) {
        console.error('Lenis initialization failed:', error)
      }
    }, 0)

    return () => {
      clearTimeout(timeoutId)
      lenisCleanup?.()
    }
  }, [containerRef, contentRef, duration, easing, wheelMultiplier, touchMultiplier])

  const scrollTo = useCallback(
    (
      target: number,
      scrollOptions?: { duration?: number; easing?: (t: number) => number }
    ) => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, scrollOptions)
        return
      }

      const container = containerRef.current
      if (!container) return

      const startScroll = container.scrollTop
      const distance = target - startScroll
      const scrollDuration = scrollOptions?.duration ?? 600
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
    },
    [containerRef]
  )

  const scrollToElement = useCallback(
    (id: string, scrollOptions?: ContainerScrollOptions) => {
      const element = document.getElementById(id)
      if (!element) return

      if (lenisRef.current) {
        lenisRef.current.scrollTo(`#${id}`, {
          offset: scrollOptions?.offset ?? DEFAULT_ELEMENT_OFFSET,
          duration: scrollOptions?.duration ?? DEFAULT_ELEMENT_DURATION,
          easing: elementEasing,
        })
        return
      }

      element.scrollIntoView({ behavior: 'smooth' })
    },
    []
  )

  return { lenisRef, scrollTo, scrollToElement }
}
