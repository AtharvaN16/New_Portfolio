'use client'

/**
 * useBreakpoint Hook - Detect current responsive breakpoint
 *
 * Usage:
 *   const { isMobile, isTablet, isDesktop } = useBreakpoint()
 *   const breakpoint = useBreakpoint('lg') // true if >= 1024px
 */

import { useEffect, useState } from 'react'

// Breakpoint definitions (matches Tailwind defaults)
const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

type Breakpoint = keyof typeof breakpoints

export function useBreakpoint(breakpoint?: Breakpoint) {
  // Initialize with lazy function to avoid hydration mismatch
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false

    const query = breakpoint
      ? `(min-width: ${breakpoints[breakpoint]}px)`
      : '(min-width: 0px)'

    return window.matchMedia(query).matches
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const query = breakpoint
      ? `(min-width: ${breakpoints[breakpoint]}px)`
      : '(min-width: 0px)'

    const mediaQuery = window.matchMedia(query)

    // Update if initial value changed
    if (mediaQuery.matches !== matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMatches(mediaQuery.matches)
    }

    // Listen for changes
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches)
    mediaQuery.addEventListener('change', handler)

    return () => mediaQuery.removeEventListener('change', handler)
  }, [breakpoint, matches])

  return matches
}

/**
 * useBreakpoints Hook - Get all breakpoint states at once
 *
 * Usage:
 *   const { isMobile, isTablet, isDesktop, isLarge } = useBreakpoints()
 */
export function useBreakpoints() {
  const isSm = useBreakpoint('sm')
  const isMd = useBreakpoint('md')
  const isLg = useBreakpoint('lg')
  const isXl = useBreakpoint('xl')
  const is2Xl = useBreakpoint('2xl')

  return {
    isMobile: !isSm, // < 640px
    isTablet: isSm && !isLg, // 640px - 1023px
    isDesktop: isLg, // >= 1024px
    isLarge: isXl, // >= 1280px
    isXLarge: is2Xl, // >= 1536px
    // Raw breakpoints
    isSm,
    isMd,
    isLg,
    isXl,
    is2Xl,
  }
}
