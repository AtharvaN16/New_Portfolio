/**
 * useScrollProgress Hook
 *
 * Provides a normalized scroll progress value (0→1) for scroll-driven animations.
 * Designed for the layered parallax reveal effect inspired by The Swaddle.
 *
 * Scroll Phases:
 * - 0.00 → 0.20: Initial phase - Hero and FullpageCard move together
 * - 0.20 → 0.30: Card begins accelerating, hero starts fading
 * - 0.30 → 0.70: Card overtakes hero, hero fully frosted
 * - 0.70 → 1.00: Card exits viewport, SelectedWork revealed
 *
 * Performance: Uses RAF and passive scroll listeners for 60fps updates.
 */

import { useState, useEffect, useCallback, useRef } from 'react'

// ============================================
// Phase Boundaries (as fraction of total scroll)
// Card exits at ~67% (when cardY = -100vh with 1.5x speed)
// ============================================
const PHASE_INITIAL_END = 0.15 // Initial phase ends (hero starts fading)
const PHASE_FROST_START = 0.2 // When hero frosting begins
const PHASE_BLOBS_PAUSE = 0.3 // When water blobs should pause
const PHASE_CARD_EXIT = 0.67 // When card has fully exited

// ============================================
// Types
// ============================================
export interface ScrollProgressResult {
  /** Normalized scroll progress 0→1 across the scroll container */
  progress: number
  /** Whether in initial phase (hero + card unified) */
  isInitialPhase: boolean
  /** Whether hero should have frosted glass effect */
  shouldFrostHero: boolean
  /** Whether water blobs should pause animation */
  shouldPauseBlobs: boolean
  /** Whether the fullpage card has exited viewport */
  cardHasExited: boolean
  /** Opacity for hero content (1→0 as card overtakes) */
  heroOpacity: number
  /** Blur amount for hero in pixels (0→12) */
  heroBlur: number
}

// ============================================
// Utility Functions
// ============================================

/**
 * Clamp value between min and max
 */
function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Map value from input range to output range
 */
function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  const normalized = clamp((value - inMin) / (inMax - inMin), 0, 1)
  return outMin + (outMax - outMin) * normalized
}

/**
 * Ease-out cubic for smooth deceleration
 */
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

/**
 * Ease-in-out cubic for smooth transitions
 */
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

// ============================================
// Main Hook
// ============================================

/**
 * Hook to track scroll progress for the layered parallax effect
 *
 * @param containerHeight - Total height of scroll container in vh units
 * @returns Scroll progress values and derived animation parameters
 *
 * @example
 * ```tsx
 * const { progress, heroOpacity, heroBlur } = useScrollProgress(400)
 * ```
 */
export function useScrollProgress(
  containerHeight: number = 400
): ScrollProgressResult {
  const [progress, setProgress] = useState(0)
  const rafRef = useRef<number | null>(null)

  const calculateProgress = useCallback(() => {
    if (typeof window === 'undefined') return

    const scrollY = window.scrollY
    const viewportHeight = window.innerHeight

    // Total scrollable distance based on container height
    const totalScrollDistance = (containerHeight / 100) * viewportHeight

    // Normalized progress: 0 at top, 1 at end of scroll container
    const rawProgress = scrollY / totalScrollDistance
    const normalizedProgress = clamp(rawProgress, 0, 1)

    setProgress(normalizedProgress)
  }, [containerHeight])

  useEffect(() => {
    const handleScroll = () => {
      // Cancel any pending RAF to avoid stacking
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
      // Schedule calculation on next frame
      rafRef.current = requestAnimationFrame(calculateProgress)
    }

    // Initial calculation
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Syncing with external scroll position on mount
    calculateProgress()

    // Passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [calculateProgress])

  // ============================================
  // Derived Values
  // ============================================

  // Phase indicators
  const isInitialPhase = progress <= PHASE_INITIAL_END
  const shouldFrostHero = progress >= PHASE_FROST_START
  const shouldPauseBlobs = progress >= PHASE_BLOBS_PAUSE
  const cardHasExited = progress >= PHASE_CARD_EXIT

  // Hero opacity: 1 during initial phase, fades to 0 as card overtakes
  // Uses easeInOutCubic for smooth fade that feels natural
  const heroOpacity = isInitialPhase
    ? 1
    : 1 -
      easeInOutCubic(
        mapRange(progress, PHASE_INITIAL_END, PHASE_CARD_EXIT, 0, 1)
      )

  // Hero blur: 0 initially, increases to 12px max
  // Uses easeOutCubic so blur ramps up quickly then slows
  const heroBlur =
    progress < PHASE_FROST_START
      ? 0
      : easeOutCubic(
          mapRange(progress, PHASE_FROST_START, PHASE_CARD_EXIT, 0, 1)
        ) * 12

  return {
    progress,
    isInitialPhase,
    shouldFrostHero,
    shouldPauseBlobs,
    cardHasExited,
    heroOpacity,
    heroBlur,
  }
}

/**
 * Type for scroll progress context value
 */
export type ScrollProgressContextValue = ScrollProgressResult
