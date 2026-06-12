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
  entryDelay = 2400,
  isGhost = false,
  isQuick = false,
}: WaterBlobProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const { reducedMotion: prefersReducedMotion, pauseWebGL, saveData } = useAccessibility()
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
  // defer so theme-switch re-runs start immediately (no jank).
  const initialMountRef = useRef(true)

  // Entry animation: blobs start below canvas (UV space) and rise to normal position.
  // -1.5 ensures they are fully off-screen even at plasma scale (1.35x size).
  const yOffsetRef = useRef(-1.5)
  // Plasma reveal phase: 0 = plasma state (energy at boundary), 1 = settled waterblob
  const revealPhaseRef = useRef(0)
  // Ambient illumination intensity: 0 to 1
  const ambientRef = useRef(0)
  // First-flash white trailing light intensity: 0 to 1 (only driven by the ghost pulse)
  const trailRef = useRef(0)

  // Entry animation: blobs start below canvas (UV space) and rise to normal position
  const yOffsetRef = useRef(-0.7)

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
      pauseWebGL ||
      saveData
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

    const isMobile = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768
    const display = displayColorsRef.current!
    const target = targetColorsRef.current!
    // Always render with dark-mode blob constants (glow, scatter, saturation).
    // Light mode achieves its look via the background color (#fafaf8) + vivid colors.
    const programInfo = setupWebGL(gl, display, isMobile)
    if (!programInfo) {
      setHasWebGL(false)
      return
    }

    webglInitializedRef.current = true

    // display object is mutated in-place by lerpColors each frame,
    // and createAnimationLoop's closure reads from the same object.
    // Only reset Y offset on first mount, not on theme switches
    if (initialMountRef.current) {
      yOffsetRef.current = -1.5
      // Mobile: skip plasma entry entirely — blobs rise as normal water blobs.
      // Desktop ghost/permanent: start in plasma state (revealPhase = 0).
      revealPhaseRef.current = (isMobile && !isGhost) ? 1 : 0
      ambientRef.current = (isMobile && !isGhost) ? 0.15 : 0
      trailRef.current = 0
      if (canvasRef.current) canvasRef.current.style.opacity = '1'
    }
    const animate = createAnimationLoop(gl, programInfo, display, () => yOffsetRef.current, isMobile, () => revealPhaseRef.current, () => ambientRef.current, () => trailRef.current)

    let animationId: number
    let startTimeoutId: ReturnType<typeof setTimeout>
    let isPausedByDialog = false
    // Accumulated animation time — only advances when not paused,
    // so the blobs resume from exactly where they froze.
    let accumulatedTime = 0
    let lastTimestamp: number | null = null
    let ghostOpacity = 1

    const loop = (timestamp: number) => {
      // If paused or hidden, we stop the loop completely (no requestAnimationFrame)
      if (isPausedByDialog || pausedRef.current) {
        lastTimestamp = null
        animationId = 0
        return
      }

      if (lastTimestamp !== null) {
        accumulatedTime +=
          ((timestamp - lastTimestamp) / 1000) * animationSpeedRef.current
      }
      lastTimestamp = timestamp

      // Lerp blobs up from entry position
      // Normal: 0.035 (~1.5s to settle)
      // Quick: 0.06 (~0.8s to settle)
      const riseRate = isQuick ? 0.06 : 0.035
      if (yOffsetRef.current < -0.001) {
        yOffsetRef.current += (0 - yOffsetRef.current) * riseRate
      } else {
        yOffsetRef.current = 0
      }

      // Drive Ambient Light
      if (isQuick) {
        // Ambient light ramps up as the quick pulse rises
        ambientRef.current += (1.0 - ambientRef.current) * 0.08
      } else if (!isGhost) {
        // Permanent blobs have a soft static ambient light
        ambientRef.current += (0.15 - ambientRef.current) * 0.02
      }

      // Drive the first-flash white trailing light (ghost pulse only).
      // Ramps up as the pulse rises so the wake builds as the light moves through.
      if (isGhost) {
        trailRef.current += (1.0 - trailRef.current) * 0.08
      }

      if (isGhost) {
        // Ghost mode: stay in plasma state, then fade out once settled
        revealPhaseRef.current = 0
        if (yOffsetRef.current > -0.5) {
          // 0.8s matter pulse targets 0.035 opacity decrement
          ghostOpacity -= isQuick ? 0.035 : 0.02

          // Fade ambient light along with the ghost pulse
          ambientRef.current *= isQuick ? 0.92 : 0.98

          // Fade the white trailing light with the pulse so it ends in complete darkness
          trailRef.current *= isQuick ? 0.92 : 0.98

          if (canvasRef.current) {
            canvasRef.current.style.opacity = Math.max(0, ghostOpacity).toString()
          }
        }
        if (ghostOpacity <= 0) {
          animationId = 0
          return
        }
      } else {
        // Normal mode: Start plasma→waterblob transition as soon as blob crests the bottom edge.
        // 0.02 rate → ~3.5s settle: plasma rim lingers as the blobs rise, then
        // eases into the normal waterblob palette.
        if (yOffsetRef.current > -1.1 && revealPhaseRef.current < 1) {
          revealPhaseRef.current += (1 - revealPhaseRef.current) * 0.02
          if (revealPhaseRef.current > 0.999) revealPhaseRef.current = 1
        }
      }

      // Smoothly interpolate display colors toward target each frame
      lerpColors(display, target, COLOR_LERP_SPEED)
      animate(accumulatedTime)

      animationId = requestAnimationFrame(loop)
    }

    // On first mount: use entryDelay. On re-runs caused by theme/retry changes: start immediately
    // so theme switches are seamless with no pause or color glitch.
    const loopDelay = initialMountRef.current ? entryDelay : 0
    
    // Function to start or resume the loop
    const startLoop = () => {
      initialMountRef.current = false
      if (!animationId) {
        animationId = requestAnimationFrame(loop)
      }
    }

    // eslint-disable-next-line prefer-const
    startTimeoutId = setTimeout(startLoop, loopDelay)

    // Pause/resume handlers for dialog transitions
    const handlePause = () => {
      isPausedByDialog = true
      // loop will stop itself on next frame
    }
    const handleResume = () => {
      isPausedByDialog = false
      startLoop()
    }

    // Handler for home page scroll-based pause (silent event)
    const handleHomePause = (e: Event) => {
      const isPaused = (e as CustomEvent).detail.paused
      pausedRef.current = isPaused
      if (isPaused) {
        // loop will stop itself
      } else {
        startLoop()
      }
    }

    const dialogOpenEvents = ['workdialog:check', 'casestudydialog:check', 'explorationsdialog:check']
    dialogOpenEvents.forEach(ev => window.addEventListener(ev, handlePause))
    window.addEventListener('dialog:closed', handleResume)
    window.addEventListener('home:pause-blobs', handleHomePause)

    return () => {
      clearTimeout(startTimeoutId)
      if (animationId) cancelAnimationFrame(animationId)
      dialogOpenEvents.forEach(ev => window.removeEventListener(ev, handlePause))
      window.removeEventListener('dialog:closed', handleResume)
      window.removeEventListener('home:pause-blobs', handleHomePause)
      gl.deleteProgram(programInfo.program)
      gl.deleteShader(programInfo.vertShader)
      gl.deleteShader(programInfo.fragShader)
      if (programInfo.posBuffer) {
        gl.deleteBuffer(programInfo.posBuffer)
      }
      webglInitializedRef.current = false
    }
  }, [prefersReducedMotion, theme, retryKey, pauseWebGL, saveData]) // colors removed — lerped via refs

  // Handle canvas resize
  useEffect(() => {
    if (!canvasRef.current) return
    return setupCanvasResize(canvasRef.current)
  }, [])

  // Handle click for interactive mode — cycles sequentially through palettes
  const handleClick = (_e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!interactive) return
    
    // Performance Optimization: Disable color switching on mobile to save on React state updates
    const isMobile = typeof window !== 'undefined' && (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768)
    if (isMobile) return

    const palettes = theme === 'dark' ? DARK_PALETTES : LIGHT_PALETTES
    const nextIndex = (paletteIndex + 1) % palettes.length
    setPaletteIndex(nextIndex)
  }

  // Show CSS fallback if WebGL not supported or reduced motion or paused or saveData
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
