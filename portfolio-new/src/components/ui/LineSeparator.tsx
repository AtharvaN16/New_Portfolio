'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { useMotionValue, useSpring, animate } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import { useMediaQuery } from '@/hooks/use-media-query'

interface LineSeparatorProps {
  className?: string
  enablePluck?: boolean
  /** Delay before starting the entry animation (in seconds). */
  delay?: number
  /** Opacity of the line (0 to 1). Default: 1. */
  opacity?: number
}

/**
 * LineSeparator - Animated line divider with draw entry and guitar pluck
 *
 * Entry: Line draws from left to right.
 * Interaction: Mouse causes a localized guitar-string pluck (desktop only).
 *
 * The pluck uses two cubic beziers flanked by flat line segments:
 *
 *   M 0 40  L leftAnchor 40
 *   C (hermite CPs) → peak at (px, cy)
 *   C (hermite CPs) → rightAnchor 40
 *   L width 40
 *
 * Hermite-style control points guarantee horizontal tangents at both anchor
 * points, so the curve blends smoothly into the flat sections with no corners.
 */
export function LineSeparator({
  className,
  enablePluck = true,
  delay = 0,
  opacity = 1,
}: LineSeparatorProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const [svgWidth, setSvgWidth] = useState(1000)
  const [hasAnimated, setHasAnimated] = useState(false)
  const [isInteractive, setIsInteractive] = useState(false)

  const hasHover = useMediaQuery('(hover: hover) and (pointer: fine)')
  const shouldEnablePluck = enablePluck && hasHover

  const mouseX = useMotionValue(500)
  const mouseY = useMotionValue(0)
  const pluckX = useSpring(mouseX, { stiffness: 100, damping: 15, mass: 0.8 })
  const pluckY = useSpring(mouseY, { stiffness: 120, damping: 18, mass: 0.6 })

  // Straight line — used for the entry draw animation
  const buildRestPath = useCallback(
    (width: number): string => `M 0 40 L ${width} 40`,
    []
  )

  /**
   * Localized bump path — no L segments, zero joints.
   *
   * Two full-width cubic beziers span 0→peak and peak→width.
   * The outer control points (CP1, CP4) sit far from the peak at y=40,
   * keeping the curve visually flat near the edges.
   * The inner control points (CP2, CP3) sit close to the peak at y=cy,
   * pulling up only the region near the cursor.
   *
   * Because there are no L-to-C joints, there is no curvature discontinuity
   * and no antialiasing step artifacts — just one smooth continuous curve.
   */
  const buildPluckPath = useCallback(
    (px: number, amplitude: number, width: number, falloff = 200): string => {
      const cy = 40 + amplitude

      const lcp1x = px - falloff * 1.2 // far left, stays on midline
      const lcp2x = px - falloff * 0.2 // near peak, rises to cy
      const rcp1x = px + falloff * 0.2 // near peak, stays at cy
      const rcp2x = px + falloff * 1.2 // far right, returns to midline

      return `M 0 40 C ${lcp1x} 40, ${lcp2x} ${cy}, ${px} ${cy} C ${rcp1x} ${cy}, ${rcp2x} 40, ${width} 40`
    },
    []
  )

  // Keep neutral X in sync with container width
  useEffect(() => {
    if (!svgRef.current) return

    const updateWidth = () => {
      const width = svgRef.current?.getBoundingClientRect().width || 1000
      setSvgWidth(width)
      mouseX.set(width / 2)
    }

    updateWidth()
    const timeoutId = setTimeout(updateWidth, 100)
    window.addEventListener('resize', updateWidth)

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', updateWidth)
    }
  }, [mouseX])

  // Trigger entry animation on scroll into view
  useEffect(() => {
    if (!svgRef.current) return

    const element = svgRef.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [hasAnimated])

  // Draw entry animation — runs once when the element scrolls into view
  useEffect(() => {
    if (!pathRef.current || !hasAnimated || isInteractive) return

    const path = pathRef.current
    path.setAttribute('d', buildRestPath(svgWidth))

    const length = path.getTotalLength()
    path.style.strokeDasharray = `${length}`
    path.style.strokeDashoffset = `${length}`

    const controls = animate(0, 1, {
      duration: 1.4,
      delay,
      ease: [0.19, 1, 0.22, 1],
      onUpdate: (latest) => {
        path.style.strokeDashoffset = `${length * (1 - latest)}`
      },
      onComplete: () => {
        path.style.strokeDasharray = 'none'
        path.style.strokeDashoffset = '0'
        setIsInteractive(true)
      },
    })

    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasAnimated, svgWidth])

  // Subscribe to both springs so any motion (X or Y) redraws the bump
  useEffect(() => {
    if (!pathRef.current || !isInteractive) return

    const update = () => {
      const newPath = buildPluckPath(pluckX.get(), pluckY.get(), svgWidth)
      pathRef.current?.setAttribute('d', newPath)
    }

    const unsubX = pluckX.on('change', update)
    const unsubY = pluckY.on('change', update)

    return () => {
      unsubX()
      unsubY()
    }
  }, [svgWidth, pluckX, pluckY, isInteractive, buildPluckPath])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (!shouldEnablePluck || !isInteractive || !svgRef.current) return

      const rect = svgRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = (e.clientY - rect.top - rect.height / 2) * -1.2

      mouseX.set(x)
      mouseY.set(y)
    },
    [shouldEnablePluck, isInteractive, mouseX, mouseY]
  )

  const handleMouseLeave = useCallback(() => {
    mouseX.set(svgWidth / 2)
    mouseY.set(0)
  }, [mouseX, mouseY, svgWidth])

  return (
    <div
      className={cn('w-full', className)}
      role="separator"
      aria-hidden="true"
    >
      <svg
        ref={svgRef}
        width="100%"
        height="80"
        viewBox={`0 0 ${svgWidth} 80`}
        preserveAspectRatio="none"
        className="block"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          cursor: 'default',
          overflow: 'visible',
          color: 'rgb(var(--color-foreground))',
        }}
      >
        <path
          ref={pathRef}
          d={buildRestPath(svgWidth)}
          stroke="currentColor"
          style={{ opacity }}
          strokeWidth="0.8"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}
