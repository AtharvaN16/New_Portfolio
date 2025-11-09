'use client'

import { useRef, useEffect, useState, useMemo } from 'react'
import { useTheme } from '@/components/providers/ThemeProvider'
import { ErrorBoundary } from '@/components/error/ErrorBoundary'
import { vertexShader, fragmentShader } from './waterBlob.shader'

/**
 * WaterBlob Component
 *
 * Simplified WebGL water blob animation - MUCH better than old 1,114-line version!
 *
 * Key improvements:
 * - <250 lines (vs 1,114 lines in old portfolio)
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

interface WaterBlobProps {
  className?: string
}

export function WaterBlob({ className = '' }: WaterBlobProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const [hasWebGL, setHasWebGL] = useState(true)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Get colors from design tokens
  // Note: theme is needed as dependency because CSS variables change when theme changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const colors = useMemo(() => {
    if (typeof window === 'undefined') return null

    const root = document.documentElement
    const getColor = (variable: string) => {
      const value = getComputedStyle(root).getPropertyValue(variable).trim()
      return value.split(' ').map((v) => parseInt(v) / 255) as [number, number, number]
    }

    return {
      blue: getColor('--hero-blob-blue'),
      purple: getColor('--hero-blob-purple'),
      pink: getColor('--hero-blob-pink'),
    }
  }, [theme])

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
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

    // Compile shaders
    const vertShader = gl.createShader(gl.VERTEX_SHADER)!
    gl.shaderSource(vertShader, vertexShader)
    gl.compileShader(vertShader)

    const fragShader = gl.createShader(gl.FRAGMENT_SHADER)!
    gl.shaderSource(fragShader, fragmentShader)
    gl.compileShader(fragShader)

    // Check for shader compilation errors
    if (!gl.getShaderParameter(vertShader, gl.COMPILE_STATUS)) {
      console.error('Vertex shader error:', gl.getShaderInfoLog(vertShader))
      setHasWebGL(false)
      return
    }
    if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS)) {
      console.error('Fragment shader error:', gl.getShaderInfoLog(fragShader))
      setHasWebGL(false)
      return
    }

    // Create program
    const program = gl.createProgram()!
    gl.attachShader(program, vertShader)
    gl.attachShader(program, fragShader)
    gl.linkProgram(program)
    gl.useProgram(program)

    // Create geometry (full screen quad)
    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])

    const posBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

    const posLocation = gl.getAttribLocation(program, 'position')
    gl.enableVertexAttribArray(posLocation)
    gl.vertexAttribPointer(posLocation, 2, gl.FLOAT, false, 0, 0)

    // Get uniform locations
    const uTimeLocation = gl.getUniformLocation(program, 'uTime')
    const uColor1Location = gl.getUniformLocation(program, 'uColor1')
    const uColor2Location = gl.getUniformLocation(program, 'uColor2')
    const uColor3Location = gl.getUniformLocation(program, 'uColor3')

    // Set initial colors
    gl.uniform3fv(uColor1Location, colors.blue)
    gl.uniform3fv(uColor2Location, colors.purple)
    gl.uniform3fv(uColor3Location, colors.pink)

    // Animation loop
    let animationId: number
    const startTime = Date.now()

    const animate = () => {
      const time = (Date.now() - startTime) / 1000
      gl.uniform1f(uTimeLocation, time)

      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

      animationId = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId)
      gl.deleteProgram(program)
      gl.deleteShader(vertShader)
      gl.deleteShader(fragShader)
      gl.deleteBuffer(posBuffer)
    }
  }, [colors, prefersReducedMotion])

  // Handle canvas resize
  useEffect(() => {
    if (!canvasRef.current) return

    const handleResize = () => {
      const canvas = canvasRef.current
      if (!canvas) return

      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()

      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr

      // Set viewport
      const gl = canvas.getContext('webgl')
      if (gl) {
        gl.viewport(0, 0, canvas.width, canvas.height)
      }
    }

    // Delay initial sizing to ensure parent has dimensions
    const timeoutId = setTimeout(handleResize, 10)

    window.addEventListener('resize', handleResize)
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

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
      className={`w-full h-full block ${theme === 'dark' ? 'hero-gradient-dark' : 'hero-gradient-light'} ${className}`}
      aria-label="Animated gradient background"
    />
  )
}

// Wrap with error boundary
export function WaterBlobWithBoundary(props: WaterBlobProps) {
  return (
    <ErrorBoundary
      fallback={
        <div className={`w-full h-full hero-gradient-light ${props.className || ''}`} />
      }
    >
      <WaterBlob {...props} />
    </ErrorBoundary>
  )
}
