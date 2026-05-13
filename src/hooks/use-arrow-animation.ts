import { useState, useCallback } from 'react'

/**
 * useArrowAnimation Hook
 *
 * Manages state for AnimatedArrow component.
 * Encapsulates the complex 3-state animation logic into a reusable hook.
 *
 * Returns:
 * - isAnimating: Whether animation is currently running
 * - animationCycle: Increments to force re-animation (used as key)
 * - showFirstArrow: Which arrow is visible
 * - handleMouseEnter: Start animation on hover
 * - handleMouseLeave: Reset animation state
 */
export function useArrowAnimation() {
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationCycle, setAnimationCycle] = useState(0)
  const [showFirstArrow, setShowFirstArrow] = useState(true)

  const handleMouseEnter = useCallback(() => {
    if (!isAnimating) {
      setShowFirstArrow(true)
      setAnimationCycle((prev) => prev + 1)
      setIsAnimating(true)
      setTimeout(() => {
        setShowFirstArrow(false)
        setIsAnimating(false)
      }, 750)
    }
  }, [isAnimating])

  const handleMouseLeave = useCallback(() => {
    setIsAnimating(false)
  }, [])

  return {
    isAnimating,
    animationCycle,
    showFirstArrow,
    handleMouseEnter,
    handleMouseLeave,
  }
}
