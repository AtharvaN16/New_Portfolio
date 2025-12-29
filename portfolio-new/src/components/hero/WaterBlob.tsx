'use client'

import { useRef, useEffect, useState, useMemo } from 'react'
import { useTheme } from '@/components/providers/ThemeProvider'
import { ErrorBoundary } from '@/components/error/ErrorBoundary'
import {
  setupWebGL,
  createAnimationLoop,
  setupCanvasResize,
} from './waterBlob.helpers'
import {
  getColors,
  getNextPaletteIndex,
  LIGHT_PALETTES,
  DARK_PALETTES,
} from './waterBlob.colors'
import type { WaterBlobProps } from './waterBlob.types'
import {
  ANIMATION_SPEED_MULTIPLIER_ENHANCED,
  ANIMATION_SPEED_MULTIPLIER_NORMAL,
  ENHANCED_CONTRAST,
  ENHANCED_SATURATION,
} from './waterBlob.types'

/**
 * WaterBlob Component
 *
 * Simplified WebGL water blob animation - MUCH better than old 1,114-line version!
 *
 * Key improvements:
 * - Modular architecture (WebGL helpers, colors, types separated)
 * - No particle system (performance killer removed)
 * - Uses design tokens (no hardcoded colors)
 * - Proper error handling with fallback
 * - Respects prefers-reduced-motion
 * - Clean separation of concerns
 *
 * What it does:
 * - Renders animated gradient blobs using WebGL
 * - Smooth color transitions
 * - Theme-aware colors (light/dark mode)
 * - Responsive canvas sizing
 */

export function WaterBlob({
  className = '',
  enhanced = false,
  interactive = false,
}: WaterBlobProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const [hasWebGL, setHasWebGL] = useState(true)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Interactive mode state
  const [paletteIndex, setPaletteIndex] = useState(0)
  const [lastPaletteIndex, setLastPaletteIndex] = useState(0)
  const animationSpeedRef = useRef(
    enhanced
      ? ANIMATION_SPEED_MULTIPLIER_ENHANCED
      : ANIMATION_SPEED_MULTIPLIER_NORMAL
  )

  // Get colors from design tokens or custom palettes
  const colors = useMemo(() => {
    return getColors(theme, interactive, paletteIndex)
    // Theme is intentionally included - CSS variables change when theme changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, interactive, paletteIndex])

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // WebGL setup and animation
  useEffect(() => {
    if (!canvasRef.current || !colors || prefersReducedMotion) return

    const canvas = canvasRef.current
    const gl = canvas.getContext('webgl')

    if (!gl) {
      console.warn('WebGL not supported, showing fallback gradient')
      setHasWebGL(false)
      return
    }

    const isDarkMode = theme === 'dark'
    const programInfo = setupWebGL(gl, colors, isDarkMode)
    if (!programInfo) {
      setHasWebGL(false)
      return
    }

    // Create animation loop
    const animate = createAnimationLoop(
      gl,
      programInfo,
      colors,
      animationSpeedRef.current
    )

    let animationId: number
    let isPaused = false

    const loop = () => {
      if (!isPaused) {
        animate()
      }
      animationId = requestAnimationFrame(loop)
    }
    loop()

    // Pause/resume handlers for dialog transitions
    const handlePause = () => {
      isPaused = true
    }
    const handleResume = () => {
      isPaused = false
    }

    // Listen for dialog events
    window.addEventListener('workdialog:check', handlePause)
    window.addEventListener('casestudydialog:check', handlePause)
    window.addEventListener('dialog:closed', handleResume)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('workdialog:check', handlePause)
      window.removeEventListener('casestudydialog:check', handlePause)
      window.removeEventListener('dialog:closed', handleResume)
      gl.deleteProgram(programInfo.program)
      gl.deleteShader(programInfo.vertShader)
      gl.deleteShader(programInfo.fragShader)
      if (programInfo.posBuffer) {
        gl.deleteBuffer(programInfo.posBuffer)
      }
    }
  }, [colors, prefersReducedMotion, theme]) // theme needed because we use it directly in effect

  // Handle canvas resize
  useEffect(() => {
    if (!canvasRef.current) return
    return setupCanvasResize(canvasRef.current)
  }, [])

  // Handle click for interactive mode
  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!interactive) return

    const palettes = theme === 'dark' ? DARK_PALETTES : LIGHT_PALETTES
    const nextIndex = getNextPaletteIndex(
      paletteIndex,
      lastPaletteIndex,
      palettes.length
    )

    setPaletteIndex(nextIndex)
    setLastPaletteIndex(nextIndex)
  }

  // Show CSS fallback if WebGL not supported or reduced motion
  if (!hasWebGL || prefersReducedMotion) {
    return (
      <div
        className={`w-full h-full ${theme === 'dark' ? 'hero-gradient-dark' : 'hero-gradient-light'} ${className}`}
        aria-label="Decorative gradient background"
      />
    )
  }

  return (
    <canvas
      ref={canvasRef}
      onClick={handleClick}
      className={`w-full h-full block ${interactive ? 'cursor-pointer' : ''} ${theme === 'dark' ? 'hero-gradient-dark' : 'hero-gradient-light'} ${enhanced ? 'shadow-inner' : ''} ${className}`}
      style={
        enhanced
          ? {
              filter: `contrast(${ENHANCED_CONTRAST}) saturate(${ENHANCED_SATURATION})`,
            }
          : undefined
      }
      aria-label={
        interactive
          ? 'Interactive animated gradient - click to change colors'
          : 'Animated gradient background'
      }
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
    />
  )
}

// Wrap with error boundary
export function WaterBlobWithBoundary(props: WaterBlobProps) {
  const { theme } = useTheme()

  return (
    <ErrorBoundary
      fallback={
        <div
          className={`w-full h-full ${theme === 'dark' ? 'hero-gradient-dark' : 'hero-gradient-light'} ${props.className || ''}`}
        />
      }
    >
      <WaterBlob {...props} />
    </ErrorBoundary>
  )
}
