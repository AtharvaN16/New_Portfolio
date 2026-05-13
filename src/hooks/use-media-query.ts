'use client'

import { useEffect, useState } from 'react'

/**
 * useMediaQuery Hook - React hook for CSS media queries
 *
 * Returns true if the media query matches, false otherwise.
 * Handles SSR by returning false on the server.
 *
 * @param query - CSS media query string (e.g., "(min-width: 768px)")
 * @returns boolean indicating if the media query matches
 *
 * @example
 * const isMobile = useMediaQuery('(max-width: 768px)')
 * const hasHover = useMediaQuery('(hover: hover)')
 * const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
 */
export function useMediaQuery(query: string): boolean {
  // Initialize with false to avoid hydration mismatch
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    // Return early if not in browser
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia(query)

    // Set initial value
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Syncing with external media query on mount
    setMatches(mediaQuery.matches)

    // Create event listener
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // Add listener (use deprecated addListener for older browsers)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler)
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handler)
    }

    // Cleanup
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handler)
      } else {
        // Fallback for older browsers
        mediaQuery.removeListener(handler)
      }
    }
  }, [query])

  return matches
}
