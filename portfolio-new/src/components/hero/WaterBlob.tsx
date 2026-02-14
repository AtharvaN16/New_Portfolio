'use client'

import { useRef, useEffect, useState, useMemo } from 'react'
import { useTheme } from '@/components/providers/ThemeProvider'
import { ErrorBoundary } from '@/components/error/ErrorBoundary'
import {
  setupWebGL,
  createAnimationLoop,
  setupCanvasResize,
  lerpColors,
} from './waterBlob.helpers'
import {
  getColors,
  LIGHT_PALETTES,
  DARK_PALETTES,
  getScribbleColor,
} from './waterBlob.colors'
import type { WaterBlobProps, Colors } from './waterBlob.types'
import {
  ANIMATION_SPEED_MULTIPLIER_ENHANCED,
  ANIMATION_SPEED_MULTIPLIER_NORMAL,
  ENHANCED_CONTRAST,
  ENHANCED_SATURATION,
  COLOR_LERP_SPEED,
} from './waterBlob.types'

/**
 * WaterBlob Component
 *
 * WebGL water blob animation with smooth color transitions.
 * Colors lerp per-frame toward their target when the palette changes,
 * instead of tearing down and rebuilding the WebGL program.
 */

export function WaterBlob({
  className = '',
  enhanced = false,
  interactive = false,
  paused = false,
}: WaterBlobProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const [hasWebGL, setHasWebGL] = useState(true)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Interactive mode state
  const [paletteIndex, setPaletteIndex] = useState(0) // 0 = Orange / Purple / Cyan (default on load)
  const animationSpeedRef = useRef(
    enhanced
      ? ANIMATION_SPEED_MULTIPLIER_ENHANCED
      : ANIMATION_SPEED_MULTIPLIER_NORMAL
  )

  // Track paused state in ref so animation loop can check current value
  const pausedRef = useRef(paused)
  useEffect(() => {
    pausedRef.current = paused
  }, [paused])

  // Mutable color objects for smooth interpolation.
  // displayColors is mutated in-place each frame; the animation loop closure
  // holds a reference to the same object, so it always reads the latest values.
  const displayColorsRef = useRef<Colors | null>(null)
  const targetColorsRef = useRef<Colors | null>(null)
  const colorsInitializedRef = useRef(false)
  const webglInitializedRef = useRef(false)

  // Refs for gradient bar CSS variable interpolation
  const gradientCurrentRef = useRef<{ start: number[]; end: number[] } | null>(
    null
  )
  const gradientAnimFrameRef = useRef<number>(0)

  // Get colors from design tokens or custom palettes
  // Only run client-side to avoid SSR hydration mismatches
  const colors = useMemo(() => {
    if (!isMounted) return null
    return getColors(theme, interactive, paletteIndex)
  }, [theme, interactive, paletteIndex, isMounted])

  // Check if component is mounted (client-side only)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Sync target color refs when palette or theme changes.
  // On first load, snap display to target (no lerp). After that, only
  // the target is updated — the animation loop lerps display toward it.
  useEffect(() => {
    if (!colors) return

    // Validate that colors don't contain NaN values
    const isValidColor = (color: number[]) =>
      color.length === 3 && color.every((c) => !isNaN(c) && isFinite(c))

    if (
      !isValidColor(colors.blue) ||
      !isValidColor(colors.purple) ||
      !isValidColor(colors.pink) ||
      !isValidColor(colors.background)
    ) {
      console.warn('WaterBlob: Invalid color values detected, skipping initialization')
      return
    }

    if (!colorsInitializedRef.current) {
      displayColorsRef.current = {
        blue: [...colors.blue],
        purple: [...colors.purple],
        pink: [...colors.pink],
        background: [...colors.background],
      }
      targetColorsRef.current = {
        blue: [...colors.blue],
        purple: [...colors.purple],
        pink: [...colors.pink],
        background: [...colors.background],
      }
      colorsInitializedRef.current = true
    } else {
      const target = targetColorsRef.current!
      target.blue = [...colors.blue]
      target.purple = [...colors.purple]
      target.pink = [...colors.pink]
      target.background = [...colors.background]
    }
  }, [colors])

  // Smoothly animate gradient bar CSS variables toward the new palette
  useEffect(() => {
    if (!interactive) return

    const palettes = theme === 'dark' ? DARK_PALETTES : LIGHT_PALETTES
    const palette = palettes[paletteIndex]

    const targetStart = palette[0].map((c) => c * 255)
    const targetEnd = palette[2].map((c) => c * 255)
    const scribbleRgb = getScribbleColor(paletteIndex, theme === 'dark')
    const targetScribble =
      scribbleRgb.length > 0 ? scribbleRgb : targetStart

    const toStr = (c: number[]) => c.map((v) => Math.round(v)).join(' ')

    // First load — snap immediately
    if (!gradientCurrentRef.current) {
      gradientCurrentRef.current = {
        start: [...targetStart],
        end: [...targetEnd],
      }
      document.documentElement.style.setProperty(
        '--color-gradient-start',
        toStr(targetStart)
      )
      document.documentElement.style.setProperty(
        '--color-gradient-end',
        toStr(targetEnd)
      )
      document.documentElement.style.setProperty(
        '--color-scribble',
        toStr(targetScribble)
      )
      return
    }

    const current = gradientCurrentRef.current

    const animateGradient = () => {
      let needsUpdate = false

      for (let i = 0; i < 3; i++) {
        current.start[i] +=
          (targetStart[i] - current.start[i]) * COLOR_LERP_SPEED
        current.end[i] += (targetEnd[i] - current.end[i]) * COLOR_LERP_SPEED
        if (Math.abs(current.start[i] - targetStart[i]) > 0.5)
          needsUpdate = true
        if (Math.abs(current.end[i] - targetEnd[i]) > 0.5) needsUpdate = true
      }

      if (!needsUpdate) {
        // Snap to exact values when close enough
        current.start = [...targetStart]
        current.end = [...targetEnd]
      }

      document.documentElement.style.setProperty(
        '--color-gradient-start',
        toStr(current.start)
      )
      document.documentElement.style.setProperty(
        '--color-gradient-end',
        toStr(current.end)
      )
      document.documentElement.style.setProperty(
        '--color-scribble',
        toStr(targetScribble)
      )

      if (needsUpdate) {
        gradientAnimFrameRef.current = requestAnimationFrame(animateGradient)
      }
    }

    cancelAnimationFrame(gradientAnimFrameRef.current)
    gradientAnimFrameRef.current = requestAnimationFrame(animateGradient)

    return () => {
      cancelAnimationFrame(gradientAnimFrameRef.current)
    }
  }, [interactive, paletteIndex, theme])

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Syncing with external media query on mount
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // WebGL setup and animation.
  // Only re-runs on theme or reduced-motion changes (not palette changes).
  // Palette transitions are handled by lerping displayColors toward targetColors
  // each frame inside the loop, without rebuilding the WebGL program.
  useEffect(() => {
    if (
      !canvasRef.current ||
      !displayColorsRef.current ||
      !targetColorsRef.current ||
      prefersReducedMotion ||
      !isMounted
    )
      return

    const canvas = canvasRef.current

    // Ensure canvas has valid dimensions before initializing WebGL
    const rect = canvas.getBoundingClientRect()
    if (rect.width === 0 || rect.height === 0) {
      console.warn('WaterBlob: Canvas has zero dimensions, deferring initialization')
      // Retry after a short delay to allow layout to complete
      const retryTimeout = setTimeout(() => {
        // Trigger re-initialization by toggling a ref flag
        if (!webglInitializedRef.current && canvasRef.current) {
          const newRect = canvasRef.current.getBoundingClientRect()
          if (newRect.width > 0 && newRect.height > 0) {
            // Force re-run by updating state
            setHasWebGL((prev) => prev)
          }
        }
      }, 100)
      return () => clearTimeout(retryTimeout)
    }

    const gl = canvas.getContext('webgl')

    if (!gl) {
      console.warn('WebGL not supported, showing fallback gradient')
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Detecting WebGL support on mount
      setHasWebGL(false)
      return
    }

    // On (re)setup (e.g. theme change), snap display to target immediately
    const display = displayColorsRef.current
    const target = targetColorsRef.current
    display.blue = [...target.blue]
    display.purple = [...target.purple]
    display.pink = [...target.pink]
    display.background = [...target.background]

    const isDarkMode = theme === 'dark'
    const programInfo = setupWebGL(gl, display, isDarkMode)
    if (!programInfo) {
      setHasWebGL(false)
      return
    }

    webglInitializedRef.current = true

    // display object is mutated in-place by lerpColors each frame,
    // and createAnimationLoop's closure reads from the same object.
    const animate = createAnimationLoop(
      gl,
      programInfo,
      display,
      animationSpeedRef.current
    )

    let animationId: number
    let isPausedByDialog = false

    const loop = () => {
      if (!isPausedByDialog && !pausedRef.current) {
        // Smoothly interpolate display colors toward target each frame
        lerpColors(display, target, COLOR_LERP_SPEED)
        animate()
      }
      animationId = requestAnimationFrame(loop)
    }
    loop()

    // Pause/resume handlers for dialog transitions
    const handlePause = () => {
      isPausedByDialog = true
    }
    const handleResume = () => {
      isPausedByDialog = false
    }

    window.addEventListener('workdialog:check', handlePause)
    window.addEventListener('casestudydialog:check', handlePause)
    window.addEventListener('dialog:closed', handleResume)

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
      webglInitializedRef.current = false
    }
  }, [prefersReducedMotion, theme, isMounted]) // colors removed — lerped via refs

  // Handle canvas resize
  useEffect(() => {
    if (!canvasRef.current) return
    return setupCanvasResize(canvasRef.current)
  }, [])

  // Handle click for interactive mode — cycles sequentially through palettes
  const handleClick = (_e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!interactive) return

    const palettes = theme === 'dark' ? DARK_PALETTES : LIGHT_PALETTES
    const nextIndex = (paletteIndex + 1) % palettes.length
    setPaletteIndex(nextIndex)
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
