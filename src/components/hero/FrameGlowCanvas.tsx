'use client'

import { useEffect, useRef } from 'react'

interface FrameGlowCanvasProps {
  entryDelay?: number
}

// Must stay in sync with WaterBlob.tsx isGhost isQuick parameters
const RISE_RATE = 0.06
const RISE_TARGET = 1.5
const RISE_FROM = -1.5
const FADE_START_Y = -0.5
const FADE_RATE = 0.035

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

function drawGlow(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  peakAlpha: number
) {
  if (peakAlpha <= 0.005) return
  const x0 = Math.max(0, cx - radius)
  const y0 = Math.max(0, cy - radius)
  const x1 = Math.min(ctx.canvas.width, cx + radius)
  const y1 = Math.min(ctx.canvas.height, cy + radius)
  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius)
  grad.addColorStop(0, `rgba(255, 255, 255, ${peakAlpha.toFixed(3)})`)
  grad.addColorStop(1, 'rgba(255, 255, 255, 0)')
  ctx.fillStyle = grad
  ctx.fillRect(x0, y0, x1 - x0, y1 - y0)
}

export function FrameGlowCanvas({ entryDelay = 500 }: FrameGlowCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId = 0
    let timeoutId: ReturnType<typeof setTimeout>

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      canvas.width = parent.offsetWidth
      canvas.height = parent.offsetHeight
    }

    const observer = new ResizeObserver(resize)
    if (canvas.parentElement) observer.observe(canvas.parentElement)
    resize()

    const startLoop = () => {
      let yOffset = RISE_FROM
      let ghostOpacity = 1.0

      const loop = () => {
        const { width, height } = canvas

        yOffset += (RISE_TARGET - yOffset) * RISE_RATE

        if (yOffset > FADE_START_Y) {
          ghostOpacity -= FADE_RATE
        }

        if (ghostOpacity <= 0) {
          ctx.clearRect(0, 0, width, height)
          animId = 0
          return
        }

        ctx.clearRect(0, 0, width, height)

        // headPos matches the shader: uYOffset + 0.9
        // UV y=0 is bottom, canvas y=0 is top → invert
        const headPos = yOffset + 0.9
        const flashY = (1 - headPos) * height
        const clampedY = Math.max(0, Math.min(height, flashY))
        const baseAlpha = ghostOpacity * 0.18

        // Left and right edges: glow spot at current light Y
        drawGlow(ctx, 0, clampedY, 80, baseAlpha)
        drawGlow(ctx, width, clampedY, 80, baseAlpha)

        // Bottom edge: fades in as light enters from below
        const bottomFade = smoothstep(height * 0.4, height * 1.1, flashY)
        drawGlow(ctx, width / 2, height, 120, baseAlpha * bottomFade)

        // Top edge: fades in as light exits through top
        const topFade = smoothstep(height * 0.6, -height * 0.1, flashY)
        drawGlow(ctx, width / 2, 0, 120, baseAlpha * topFade)

        animId = requestAnimationFrame(loop)
      }

      animId = requestAnimationFrame(loop)
    }

    timeoutId = setTimeout(startLoop, entryDelay)

    return () => {
      clearTimeout(timeoutId)
      if (animId) cancelAnimationFrame(animId)
      observer.disconnect()
    }
  }, [entryDelay])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none z-10"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
