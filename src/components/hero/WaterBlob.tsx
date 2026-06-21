'use client'

import { useRef, useEffect, useState } from 'react'
import { useTheme } from '@/components/providers/ThemeProvider'
import { useAccessibility } from '@/components/providers/AccessibilityProvider'
import { setupCanvasResize } from './waterBlob.helpers'
import type { WaterBlobProps } from './waterBlob.types'
import {
  ANIMATION_SPEED_MULTIPLIER_ENHANCED,
  ANIMATION_SPEED_MULTIPLIER_NORMAL,
  ENHANCED_CONTRAST,
  ENHANCED_SATURATION,
  AUTO_PALETTE_CYCLE_ENABLED,
} from './waterBlob.types'
import { useWaterBlobGradientVars } from './use-water-blob-gradient-vars'
import { useWaterBlobAutoCycle } from './use-water-blob-auto-cycle'
import { useWaterBlobColorRefs } from './use-water-blob-color-refs'
import { useWaterBlobAnimation } from './use-water-blob-animation'
import { useWaterBlobPauseEvents } from './use-water-blob-pause-events'

/**
 * WebGL water blob animation with smooth color transitions.
 * Animation, pause, and color logic live in dedicated hooks.
 */
export function WaterBlob({
  className = '',
  enhanced = false,
  interactive = false,
  paused = false,
  entryDelay = 2400,
  isGhost = false,
  isQuick = false,
  initialPaletteIndex = 0,
}: WaterBlobProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const {
    reducedMotion: prefersReducedMotion,
    pauseWebGL,
    saveData,
  } = useAccessibility()
  const [hasWebGL, setHasWebGL] = useState(true)

  const animationSpeedRef = useRef(
    enhanced
      ? ANIMATION_SPEED_MULTIPLIER_ENHANCED
      : ANIMATION_SPEED_MULTIPLIER_NORMAL
  )

  const pausedRef = useRef(paused || pauseWebGL)
  const isPausedByDialogRef = useRef(false)
  const isTabHiddenRef = useRef(
    typeof document !== 'undefined' ? document.hidden : false
  )
  const resumeLoopRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    pausedRef.current = paused || pauseWebGL
  }, [paused, pauseWebGL])

  const gradientCurrentRef = useRef<{ start: number[]; end: number[] } | null>(
    null
  )
  const gradientAnimFrameRef = useRef<number>(0)

  const {
    paletteIndex,
    advancePalette,
    displayColorsRef,
    targetColorsRef,
    paletteLerpSpeed,
  } = useWaterBlobColorRefs({
    theme,
    interactive,
    initialPaletteIndex,
  })

  useWaterBlobAutoCycle({
    enabled: interactive && AUTO_PALETTE_CYCLE_ENABLED,
    paused:
      paused ||
      pauseWebGL ||
      saveData ||
      prefersReducedMotion,
    onAdvance: advancePalette,
  })

  useWaterBlobGradientVars({
    interactive,
    paletteIndex,
    theme,
    colorLerpSpeed: paletteLerpSpeed,
    gradientCurrentRef,
    gradientAnimFrameRef,
  })

  useWaterBlobAnimation({
    canvasRef,
    displayColorsRef,
    targetColorsRef,
    pausedRef,
    animationSpeedRef,
    isPausedByDialogRef,
    isTabHiddenRef,
    resumeLoopRef,
    paletteLerpSpeed,
    entryDelay,
    isGhost,
    isQuick,
    prefersReducedMotion,
    pauseWebGL,
    saveData,
    setHasWebGL,
  })

  useWaterBlobPauseEvents({
    pausedRef,
    isPausedByDialogRef,
    isTabHiddenRef,
    resumeLoopRef,
  })

  useEffect(() => {
    if (!canvasRef.current) return
    return setupCanvasResize(canvasRef.current)
  }, [])

  const handleClick = (_e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!interactive) return

    const isMobile =
      typeof window !== 'undefined' &&
      (window.matchMedia('(pointer: coarse)').matches ||
        window.innerWidth < 768)
    if (isMobile) return

    advancePalette()
  }

  if (!hasWebGL || prefersReducedMotion || pauseWebGL || saveData) {
    return (
      <div
        className={`w-full h-full ${theme === 'dark' ? 'hero-gradient-dark' : 'hero-gradient-light'} ${className}`}
        aria-hidden="true"
        suppressHydrationWarning
      />
    )
  }

  return (
    <canvas
      ref={canvasRef}
      onClick={handleClick}
      className={`absolute inset-0 w-full h-full block ${interactive ? 'cursor-pointer' : ''} ${isGhost ? 'pointer-events-none' : ''} ${theme === 'dark' ? 'hero-gradient-dark' : 'hero-gradient-light'} ${enhanced ? 'shadow-inner' : ''} ${className}`}
      suppressHydrationWarning
      style={
        enhanced
          ? {
              filter: `contrast(${ENHANCED_CONTRAST}) saturate(${ENHANCED_SATURATION})`,
            }
          : undefined
      }
      aria-hidden="true"
    />
  )
}
