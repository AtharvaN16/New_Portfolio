'use client'

import { useState, useEffect, useRef } from 'react'
import { m } from 'framer-motion'

/**
 * AnimatedScribble Component
 *
 * Displays a static scribble underline that cycles while hovering.
 * Designed to appear under the "Atharva" pronunciation word in the hero section.
 *
 * Features:
 * - Static scribble when not hovering
 * - Continuously cycles through scribbles while hovering over the word
 * - Uses gradient color 1 from CSS variables
 */

// Multiple unique scribble paths - hand-drawn style, curvy doodles
const SCRIBBLE_PATHS = [
  // Scribble 1: Wavy underline with loops
  'M2,8 Q15,2 28,8 T54,8 Q67,2 80,8 T106,8 Q119,2 132,8',
  
  // Scribble 2: Zigzag with curves
  'M2,8 L18,3 Q28,10 38,3 L54,10 Q64,3 74,10 L90,3 Q100,10 110,3 L126,10 Q136,3 146,8',
  
  // Scribble 3: Loose spiral underline
  'M2,6 Q10,2 18,6 Q26,10 34,6 Q42,2 50,6 Q58,10 66,6 Q74,2 82,6 Q90,10 98,6 Q106,2 114,6 Q122,10 130,6 Q138,2 146,6',
  
  // Scribble 4: Rough hand-drawn line
  'M2,7 L12,9 L22,6 L32,8 L42,5 L52,9 L62,6 L72,8 L82,5 L92,9 L102,7 L112,8 L122,6 L132,9 L142,7',
]

interface AnimatedScribbleProps {
  /** Additional CSS class */
  className?: string
  /** Cycle interval while hovering (in milliseconds) */
  hoverInterval?: number
}

const DEFAULT_SCRIBBLE_INDEX = 2 // Scribble 3

export function AnimatedScribble({
  className = '',
  hoverInterval = 450,
}: AnimatedScribbleProps) {
  const [currentIndex, setCurrentIndex] = useState(DEFAULT_SCRIBBLE_INDEX)
  const [isHovering, setIsHovering] = useState(false)
  const [hasFadedIn, setHasFadedIn] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Find the parent pronunciation-word element
    const pronunciationWord = container.closest('.pronunciation-word')
    if (!pronunciationWord) return

    const handleMouseEnter = () => {
      setIsHovering(true)
      // Add hover class to trigger CSS effects
      const heroText = container.closest('.text-hero-body')
      if (heroText) {
        heroText.classList.add('pronunciation-hovering')
      }
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
      setCurrentIndex(DEFAULT_SCRIBBLE_INDEX) // Reset to default scribble
      // Remove hover class
      const heroText = container.closest('.text-hero-body')
      if (heroText) {
        heroText.classList.remove('pronunciation-hovering')
      }
    }

    pronunciationWord.addEventListener('mouseenter', handleMouseEnter)
    pronunciationWord.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      pronunciationWord.removeEventListener('mouseenter', handleMouseEnter)
      pronunciationWord.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  useEffect(() => {
    if (isHovering) {
      // Start cycling when hovering
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % SCRIBBLE_PATHS.length)
      }, hoverInterval)
    } else {
      // Clear interval when not hovering
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isHovering, hoverInterval])

  // Mark first-load draw complete (so later scribbles use quick draw, not long scribble)
  useEffect(() => {
    const t = setTimeout(() => setHasFadedIn(true), 1200)
    return () => clearTimeout(t)
  }, [])

  const isFirstLoad = !hasFadedIn && currentIndex === DEFAULT_SCRIBBLE_INDEX

  return (
    <span
      ref={containerRef}
      className={`scribble-container ${className}`}
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: '0',
        right: '0',
        bottom: '-4px',
        height: '16px',
        pointerEvents: 'none',
      }}
    >
      <m.svg
        key={currentIndex}
        viewBox="0 0 148 16"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          overflow: 'visible',
        }}
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0 }}
      >
        <m.path
          d={SCRIBBLE_PATHS[currentIndex]}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: isFirstLoad ? 0 : 1 }}
          animate={{ pathLength: 1 }}
          transition={
            isFirstLoad
              ? { duration: 1, ease: [0.4, 0, 0.2, 1] }
              : { duration: 0 }
          }
        />
      </m.svg>
    </span>
  )
}
