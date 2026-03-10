'use client'

import { useRef, useEffect } from 'react'
import { useAccessibility } from '@/components/providers/AccessibilityProvider'

/**
 * FooterDustParticles - Sparse, high-luminance dust motes
 *
 * A handful of bright pinpoints that meander and float erratically,
 * sometimes drifting upward or sideways before eventually falling.
 * Organic, random motion — not uniform snowfall.
 */

interface FooterDustParticlesProps {
  visible: boolean
}

interface Particle {
  x: number
  y: number
  size: number
  opacity: number
  /** Per-particle time phases for layered sine motion */
  px1: number
  px2: number
  py1: number
  py2: number
  /** Base drift speed (can be near-zero or negative = floating upward) */
  baseVy: number
  baseVx: number
}

const PARTICLE_COUNT = 16

export function FooterDustParticles({ visible }: FooterDustParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const particlesRef = useRef<Particle[]>([])
  const opacityRef = useRef(0)
  const visibleRef = useRef(visible)
  const { reducedMotion, pauseWebGL } = useAccessibility()
  const pausedRef = useRef(reducedMotion || pauseWebGL)

  useEffect(() => {
    visibleRef.current = visible
  }, [visible])

  useEffect(() => {
    pausedRef.current = reducedMotion || pauseWebGL
  }, [reducedMotion, pauseWebGL])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const particles: Particle[] = []
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(createParticle(canvas.clientWidth, canvas.clientHeight, true))
    }
    particlesRef.current = particles

    const render = () => {
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const dpr = Math.min(window.devicePixelRatio, 2)
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      const cw = Math.round(w * dpr)
      const ch = Math.round(h * dpr)

      if (canvas.width !== cw || canvas.height !== ch) {
        canvas.width = cw
        canvas.height = ch
      }

      // When paused, clear canvas and skip particle updates
      if (pausedRef.current) {
        ctx.clearRect(0, 0, cw, ch)
        opacityRef.current = 0
        rafRef.current = requestAnimationFrame(render)
        return
      }

      const target = visibleRef.current ? 1 : 0
      opacityRef.current += (target - opacityRef.current) * 0.02

      ctx.clearRect(0, 0, cw, ch)

      if (opacityRef.current < 0.005) {
        rafRef.current = requestAnimationFrame(render)
        return
      }

      ctx.save()
      ctx.scale(dpr, dpr)

      const t = performance.now() / 1000

      for (const p of particlesRef.current) {
        // Layered sinusoidal motion — each particle meanders uniquely
        // Two sine waves at different frequencies create erratic, non-uniform paths
        const dx =
          p.baseVx +
          Math.sin(t * 0.3 + p.px1) * 0.12 +
          Math.sin(t * 0.7 + p.px2) * 0.06

        const dy =
          p.baseVy +
          Math.sin(t * 0.2 + p.py1) * 0.1 +
          Math.cos(t * 0.5 + p.py2) * 0.05

        p.x += dx
        p.y += dy

        // Recycle when off-screen (any edge)
        if (p.y > h + 5 || p.y < -10 || p.x < -10 || p.x > w + 10) {
          Object.assign(p, createParticle(w, h, false))
        }

        // Fade out as particles move further from the light source (top of footer)
        const distFromLight = p.y
        const fadeFactor = Math.max(0, 1 - distFromLight / h)
        const alpha = p.opacity * opacityRef.current * fadeFactor

        const isDark = document.documentElement.getAttribute('data-theme') === 'dark'
        const particleSize = isDark ? p.size : 2.5
        const particleColor = isDark 
          ? `rgba(255, 255, 255, ${alpha})`
          : `rgba(255, 255, 255, ${Math.min(1, alpha * 1.5)})` // Brighter white for light mode

        ctx.fillStyle = particleColor
        ctx.fillRect(
          Math.round(p.x),
          Math.round(p.y),
          particleSize,
          particleSize
        )
      }

      ctx.restore()
      rafRef.current = requestAnimationFrame(render)
    }

    // Only start the rAF loop once the canvas enters the viewport —
    // footer is off-screen on load, so this avoids burning main-thread
    // time during Lighthouse's TBT measurement window.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !rafRef.current) {
          rafRef.current = requestAnimationFrame(render)
          observer.disconnect()
        }
      },
      { threshold: 0 }
    )
    observer.observe(canvas)

    return () => {
      observer.disconnect()
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = 0
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  )
}

function createParticle(
  width: number,
  height: number,
  randomY: boolean
): Particle {
  return {
    x: Math.random() * width,
    y: randomY ? Math.random() * height : -(Math.random() * 5),
    size: 1,
    opacity: 0.6 + Math.random() * 0.4,
    // Random phase offsets — makes each particle's path unique
    px1: Math.random() * Math.PI * 2,
    px2: Math.random() * Math.PI * 2,
    py1: Math.random() * Math.PI * 2,
    py2: Math.random() * Math.PI * 2,
    // Some drift down slowly, some barely move, some float upward briefly
    baseVy: -0.02 + Math.random() * 0.12,
    baseVx: (Math.random() - 0.5) * 0.06,
  }
}
