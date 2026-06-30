'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { m } from 'framer-motion'

/**
 * AnimatedScribble — hand-drawn underline under pronunciation words.
 * Desktop: cycles on hover. Touch: tap toggles (same hero fade + tooltip above).
 */

const SCRIBBLE_PATHS = [
  'M2,8 Q15,2 28,8 T54,8 Q67,2 80,8 T106,8 Q119,2 132,8',
  'M2,8 L18,3 Q28,10 38,3 L54,10 Q64,3 74,10 L90,3 Q100,10 110,3 L126,10 Q136,3 146,8',
  'M2,6 Q10,2 18,6 Q26,10 34,6 Q42,2 50,6 Q58,10 66,6 Q74,2 82,6 Q90,10 98,6 Q106,2 114,6 Q122,10 130,6 Q138,2 146,6',
  'M2,7 L12,9 L22,6 L32,8 L42,5 L52,9 L62,6 L72,8 L82,5 L92,9 L102,7 L112,8 L122,6 L132,9 L142,7',
]

interface AnimatedScribbleProps {
  className?: string
  hoverInterval?: number
}

const DEFAULT_SCRIBBLE_INDEX = 2
const INITIAL_DRAW_MS = 1000

export function AnimatedScribble({
  className = '',
  hoverInterval = 450,
}: AnimatedScribbleProps) {
  const [currentIndex, setCurrentIndex] = useState(DEFAULT_SCRIBBLE_INDEX)
  const [isEngaged, setIsEngaged] = useState(false)
  const [hasCompletedInitialDraw, setHasCompletedInitialDraw] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const containerRef = useRef<HTMLSpanElement>(null)
  const isTappedRef = useRef(false)

  const setHeroHovering = useCallback((on: boolean) => {
    const heroText = containerRef.current?.closest('.text-hero-body')
    if (!heroText) return
    heroText.classList.toggle('pronunciation-hovering', on)
  }, [])

  const disengage = useCallback(() => {
    setIsEngaged(false)
    isTappedRef.current = false
    setCurrentIndex(DEFAULT_SCRIBBLE_INDEX)
    const pronunciationWord = containerRef.current?.closest('.pronunciation-word')
    pronunciationWord?.classList.remove('pronunciation-active')
    setHeroHovering(false)
  }, [setHeroHovering])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const pronunciationWord = container.closest('.pronunciation-word')
    if (!pronunciationWord) return

    const isCoarse = window.matchMedia('(pointer: coarse)').matches

    const engage = () => {
      setIsEngaged(true)
      setHeroHovering(true)
    }

    const handleMouseEnter = () => {
      if (isCoarse) return
      engage()
    }

    const handleMouseLeave = () => {
      if (isCoarse) return
      disengage()
    }

    const handleTap = (event: Event) => {
      if (!isCoarse) return
      event.preventDefault()
      event.stopPropagation()

      if (isTappedRef.current) {
        disengage()
        return
      }

      isTappedRef.current = true
      pronunciationWord.classList.add('pronunciation-active')
      engage()
    }

    const handleKeyDown = (event: Event) => {
      if (!isCoarse) return
      if (!(event instanceof KeyboardEvent)) return
      if (event.key !== 'Enter' && event.key !== ' ') return
      event.preventDefault()
      handleTap(event)
    }

    const handleClickOutside = (event: Event) => {
      if (!isCoarse || !isTappedRef.current) return
      const target = event.target
      if (target instanceof Node && pronunciationWord.contains(target)) return
      disengage()
    }

    pronunciationWord.addEventListener('mouseenter', handleMouseEnter)
    pronunciationWord.addEventListener('mouseleave', handleMouseLeave)
    pronunciationWord.addEventListener('click', handleTap)
    pronunciationWord.addEventListener('keydown', handleKeyDown)
    document.addEventListener('click', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside, { passive: true })

    return () => {
      pronunciationWord.removeEventListener('mouseenter', handleMouseEnter)
      pronunciationWord.removeEventListener('mouseleave', handleMouseLeave)
      pronunciationWord.removeEventListener('click', handleTap)
      pronunciationWord.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('click', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
      pronunciationWord.classList.remove('pronunciation-active')
      container.closest('.text-hero-body')?.classList.remove('pronunciation-hovering')
    }
  }, [disengage, setHeroHovering])

  useEffect(() => {
    if (isEngaged) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % SCRIBBLE_PATHS.length)
      }, hoverInterval)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isEngaged, hoverInterval])

  useEffect(() => {
    const t = setTimeout(() => setHasCompletedInitialDraw(true), INITIAL_DRAW_MS)
    return () => clearTimeout(t)
  }, [])

  const isFirstLoad =
    !hasCompletedInitialDraw && currentIndex === DEFAULT_SCRIBBLE_INDEX

  return (
    <span
      ref={containerRef}
      className={`scribble-container ${className}`}
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: '0',
        right: '0',
        top: '0',
        height: '100%',
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
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: isFirstLoad ? 0 : 1 }}
          animate={{ pathLength: 1 }}
          transition={
            isFirstLoad
              ? { duration: 1, ease: [0.4, 0, 0.2, 1] }
              : { duration: 0 }
          }
          onAnimationComplete={() => {
            if (
              currentIndex === DEFAULT_SCRIBBLE_INDEX &&
              !hasCompletedInitialDraw
            ) {
              setHasCompletedInitialDraw(true)
            }
          }}
        />
      </m.svg>
    </span>
  )
}
