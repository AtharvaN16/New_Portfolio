'use client'

import { useBreakpoint } from './use-breakpoint'

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
