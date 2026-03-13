'use client'

import { useRef, useEffect, useState, useMemo } from 'react'
import { useTheme } from '@/components/providers/ThemeProvider'
import { useAccessibility } from '@/components/providers/AccessibilityProvider'
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
} from './waterBlob.colors'
import type { WaterBlobProps, Colors } from './waterBlob.types'
import {
  ANIMATION_SPEED_MULTIPLIER_ENHANCED,
  ANIMATION_SPEED_MULTIPLIER_NORMAL,
  ENHANCED_CONTRAST,
  ENHANCED_SATURATION,
  COLOR_LERP_SPEED,
} from './waterBlob.types'
import { useWaterBlobGradientVars } from './use-water-blob-gradient-vars'

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
  const { reducedMotion: prefersReducedMotion, pauseWebGL } = useAccessibility()
  const [hasWebGL, setHasWebGL] = useState(true)
  const [retryKey, setRetryKey] = useState(0)

  // Interactive mode state
  const [paletteIndex, setPaletteIndex] = useState(0) // 0 = Orange / Purple / Cyan (default on load)
  const animationSpeedRef = useRef(
    enhanced
      ? ANIMATION_SPEED_MULTIPLIER_ENHANCED
      : ANIMATION_SPEED_MULTIPLIER_NORMAL
  )

  // Track paused state in ref so animation loop can check current value
  const pausedRef = useRef(paused || pauseWebGL)
  useEffect(() => {
    pausedRef.current = paused || pauseWebGL
  }, [paused, pauseWebGL])

  // Mutable color objects for smooth interpolation.
  // displayColors is mutated in-place each frame; the animation loop closure
  // holds a reference to the same object, so it always reads the latest values.
  const displayColorsRef = useRef<Colors | null>(null)
  const targetColorsRef = useRef<Colors | null>(null)
  const colorsInitializedRef = useRef(false)
  const webglInitializedRef = useRef(false)
  // Tracks whether the rAF loop has ever started; used to gate the initial
  // 1400ms defer so theme-switch re-runs start immediately (no jank).
  const hasEverStartedRef = useRef(false)

  // Refs for gradient bar CSS variable interpolation
  const gradientCurrentRef = useRef<{ start: number[]; end: number[] } | null>(
    null
  )
  const gradientAnimFrameRef = useRef<number>(0)

  // Get colors from design tokens or custom palettes
  // `getColors` safely returns null on server.
  const colors = useMemo(() => {
    return getColors(theme, interactive, paletteIndex)
  }, [theme, interactive, paletteIndex])

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

  useWaterBlobGradientVars({
    interactive,
    paletteIndex,
    theme,
    gradientCurrentRef,
    gradientAnimFrameRef,
  })

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
      pauseWebGL
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
            // Increment retryKey to actually trigger the effect to re-run
            setRetryKey((prev) => prev + 1)
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

    const display = displayColorsRef.current!
    const target = targetColorsRef.current!
    // Always render with dark-mode blob constants (glow, scatter, saturation).
    // Light mode achieves its look via the background color (#fafaf8) + vivid colors.
    const programInfo = setupWebGL(gl, display, true)
    if (!programInfo) {
      setHasWebGL(false)
      return
    }

    webglInitializedRef.current = true

    // display object is mutated in-place by lerpColors each frame,
    // and createAnimationLoop's closure reads from the same object.
    const animate = createAnimationLoop(gl, programInfo, display)

    let animationId: number
    let startTimeoutId: ReturnType<typeof setTimeout>
    let isPausedByDialog = false
    // Accumulated animation time — only advances when not paused,
    // so the blobs resume from exactly where they froze.
    let accumulatedTime = 0
    let lastTimestamp: number | null = null

    const loop = (timestamp: number) => {
      if (!isPausedByDialog && !pausedRef.current) {
        if (lastTimestamp !== null) {
          accumulatedTime +=
            ((timestamp - lastTimestamp) / 1000) * animationSpeedRef.current
        }
        lastTimestamp = timestamp
        // Smoothly interpolate display colors toward target each frame
        lerpColors(display, target, COLOR_LERP_SPEED)
        animate(accumulatedTime)
      } else {
        // Reset so we don't count paused duration when we resume
        lastTimestamp = null
      }
      animationId = requestAnimationFrame(loop)
    }

    // On first mount: defer by 1400ms (blob fade-in delay — invisible during this window,
    // so no visual change). On re-runs caused by theme/retry changes: start immediately
    // so theme switches are seamless with no pause or color glitch.
    const loopDelay = hasEverStartedRef.current ? 0 : 1550 // 200ms before blobVisible fires at 1750ms
    hasEverStartedRef.current = true
    // eslint-disable-next-line prefer-const
    startTimeoutId = setTimeout(() => {
      animationId = requestAnimationFrame(loop)
    }, loopDelay)

    // Pause/resume handlers for dialog transitions
    const handlePause = () => {
      isPausedByDialog = true
    }
    const handleResume = () => {
      isPausedByDialog = false
    }

    const dialogOpenEvents = ['workdialog:check', 'casestudydialog:check', 'explorationsdialog:check']
    dialogOpenEvents.forEach(ev => window.addEventListener(ev, handlePause))
    window.addEventListener('dialog:closed', handleResume)

    return () => {
      clearTimeout(startTimeoutId)
      cancelAnimationFrame(animationId)
      dialogOpenEvents.forEach(ev => window.removeEventListener(ev, handlePause))
      window.removeEventListener('dialog:closed', handleResume)
      gl.deleteProgram(programInfo.program)
      gl.deleteShader(programInfo.vertShader)
      gl.deleteShader(programInfo.fragShader)
      if (programInfo.posBuffer) {
        gl.deleteBuffer(programInfo.posBuffer)
      }
      webglInitializedRef.current = false
    }
  }, [prefersReducedMotion, theme, retryKey, pauseWebGL]) // colors removed — lerped via refs

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

  // Show CSS fallback if WebGL not supported or reduced motion or paused
  if (!hasWebGL || prefersReducedMotion || pauseWebGL) {
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
      className={`w-full h-full block ${interactive ? 'cursor-pointer' : ''} ${theme === 'dark' ? 'hero-gradient-dark' : 'hero-gradient-light'} ${enhanced ? 'shadow-inner' : ''} ${className}`}
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
