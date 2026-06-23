'use client'

import { useEffect, useState } from 'react'

/**
 * Tailwind default breakpoints — keep in sync with `src/styles/tailwind-theme.css`.
 *
 * Three "mobile" concepts exist in this codebase — pick the right one:
 *   Layout / nav:  `useBreakpoints().isMobile`  → < 640px (Tailwind `sm`)
 *   Animation:     `getBreakpointMatch('md')`   → < 768px (Tailwind `md`)
 *   Touch / WebGL: `getIsTouch()`               → pointer: coarse (any width)
 */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

export type Breakpoint = keyof typeof BREAKPOINTS

/**
 * Synchronous breakpoint check — safe to call outside React render or on
 * first render in client components to avoid the false-on-SSR flash that
 * `useBreakpoints()` has (starts false, flips after mount).
 *
 * @example
 * // Hero animation gate — needs a real answer immediately
 * const isDesktopAnimation = getBreakpointMatch('md')
 */
export function getBreakpointMatch(breakpoint: Breakpoint): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia(`(min-width: ${BREAKPOINTS[breakpoint]}px)`).matches
}

/**
 * Synchronous touch-device check.
 * Use for gating WebGL, Lenis smooth scroll, and other pointer-sensitive code.
 * Do NOT use for layout — prefer `getBreakpointMatch` or `useBreakpoints()` for width-based decisions.
 */
export function getIsTouch(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(pointer: coarse)').matches
}

/**
 * Subscribe to any CSS media query.
 *
 * @example
 * const isMobile = useMediaQuery('(max-width: 767px)')
 * const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia(query)

    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync with external media query on mount
    setMatches(mediaQuery.matches)

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler)
    } else {
      mediaQuery.addListener(handler)
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handler)
      } else {
        mediaQuery.removeListener(handler)
      }
    }
  }, [query])

  return matches
}

/**
 * True when viewport is at or above a Tailwind breakpoint.
 *
 * @example
 * const isDesktop = useBreakpoint('lg')
 */
export function useBreakpoint(breakpoint: Breakpoint): boolean {
  return useMediaQuery(`(min-width: ${BREAKPOINTS[breakpoint]}px)`)
}

/**
 * Semantic + raw breakpoint flags for layout decisions.
 *
 * @example
 * const { isMobile, isTablet, isDesktop } = useBreakpoints()
 */
export function useBreakpoints() {
  const isSm = useBreakpoint('sm')
  const isMd = useBreakpoint('md')
  const isLg = useBreakpoint('lg')
  const isXl = useBreakpoint('xl')
  const is2Xl = useBreakpoint('2xl')

  return {
    isMobile: !isSm,
    isTablet: isSm && !isLg,
    isDesktop: isLg,
    isLarge: isXl,
    isXLarge: is2Xl,
    isSm,
    isMd,
    isLg,
    isXl,
    is2Xl,
  }
}
