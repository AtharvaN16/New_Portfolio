'use client'

import { useEffect, useState } from 'react'

/** Tailwind default breakpoints — keep in sync with `src/styles/tailwind-theme.css` */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

export type Breakpoint = keyof typeof BREAKPOINTS

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
