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
}

/**
 * LineSeparator - Animated line divider with whip entry and guitar pluck
 *
 * Entry: Line draws with a traveling wave that settles to straight
 * Interaction: Mouse causes guitar-string pluck deformation (desktop only)
 */
export function LineSeparator({
  className,
  enablePluck = true,
  delay = 0,
}: LineSeparatorProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const [svgWidth, setSvgWidth] = useState(1000)
  const [hasAnimated, setHasAnimated] = useState(false)
  const [isInteractive, setIsInteractive] = useState(false)

  const hasHover = useMediaQuery('(hover: hover) and (pointer: fine)')
  const shouldEnablePluck = enablePluck && hasHover

  // Pluck state
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const pluckX = useSpring(mouseX, { stiffness: 100, damping: 15, mass: 0.8 }) // More bouncy
  const pluckY = useSpring(mouseY, { stiffness: 120, damping: 18, mass: 0.6 }) // More bouncy

  // Generate path with BEZIER curves (like original)
  const generatePath = useCallback(
    (
      width: number,
      waveT: number, // 0 = straight, 1 = max wave
      pluckXPos?: number,
      pluckAmp?: number
    ): string => {
      // Increased points for smoother, more elegant wave
      const points = 35
      // More subtle amplitude for elegant wave (not too dramatic)
      const amp = 40 * waveT
      const coords: [number, number][] = []

      for (let i = 0; i <= points; i++) {
        const x = (width / points) * i
        const progress = i / points

        // Elegant wave: appears at the right end and decays towards left
        // Decay curve: starts weak at left, builds up to strong at right end
        const decay = Math.pow(progress, 0.8) // Wave is strongest at right end
        // Traveling wave: wave travels from right to left, appearing at the end
        const wavePhase = waveT * Math.PI * 2 - (1 - progress) * Math.PI * 2
        // Smooth sine wave with decay - strongest at right end
        let y = 1 + Math.sin(wavePhase) * amp * decay

        // Add pluck deformation if active
        if (
          pluckXPos !== undefined &&
          pluckAmp !== undefined &&
          Math.abs(pluckAmp) > 0.01
        ) {
          const dist = Math.abs(x - pluckXPos)
          const falloff = Math.exp(-Math.pow(dist / 150, 2))
          // Anchor the ends: multiply by sin to make deformation 0 at edges
          const edgeAnchor = Math.sin(progress * Math.PI)
          y += pluckAmp * falloff * edgeAnchor
        }

        coords.push([x, y])
      }

      // Build path with BEZIER curves (smooth)
      let d = `M${coords[0][0]} ${coords[0][1]}`
      for (let i = 0; i < points; i++) {
        const [x0, y0] = coords[i]
        const [x1, y1] = coords[i + 1]
        // Improved control points for smoother curves
        const dx = x1 - x0
        const dy = y1 - y0
        const cpx1 = x0 + dx / 3
        const cpy1 = y0 + dy / 3
        const cpx2 = x0 + (2 * dx) / 3
        const cpy2 = y0 + (2 * dy) / 3
        d += ` C${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${x1} ${y1}`
      }

      return d
    },
    []
  )

  // Update SVG width
  useEffect(() => {
    if (!svgRef.current) return

    const updateWidth = () => {
      const width = svgRef.current?.getBoundingClientRect().width || 1000
      setSvgWidth(width)
    }

    updateWidth()
    const timeoutId = setTimeout(updateWidth, 100)
    window.addEventListener('resize', updateWidth)

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', updateWidth)
    }
  }, [])

  // Trigger animation on scroll into view
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

  // Whip entry animation - runs ONCE when hasAnimated becomes true
  useEffect(() => {
    if (!pathRef.current || !hasAnimated || isInteractive) return

    const path = pathRef.current
    const width = svgWidth
    const initialPath = generatePath(width, 0)
    path.setAttribute('d', initialPath)

    // Get path length for stroke-dasharray
    const length = path.getTotalLength()
    path.style.strokeDasharray = `${length}`
    path.style.strokeDashoffset = `${length}`

    // Animate: elegant wave morphing + stroke draw
    const controls = animate(0, 1, {
      duration: 1.6, // Slightly longer for smoother animation
      delay: delay,
      // Smooth, elegant easing curve (ease-out-cubic-like)
      ease: [0.25, 0.1, 0.25, 1],
      onUpdate: (latest) => {
        // Elegant wave: smooth rise and fall with natural decay
        // Wave peaks around 60% of animation, then gracefully settles
        let waveT: number
        if (latest < 0.6) {
          // Smooth rise: ease-in-out curve
          const t = latest / 0.6
          waveT = t * t * (3 - 2 * t) // Smoothstep for elegant rise
        } else {
          // Smooth fall: exponential decay
          const t = (latest - 0.6) / 0.4
          waveT = Math.pow(1 - t, 2) // Quadratic decay for graceful fall
        }
        waveT = Math.max(0, Math.min(1, waveT))

        // Update path shape and dash
        const newPath = generatePath(width, waveT)
        path.setAttribute('d', newPath)
        path.style.strokeDashoffset = `${length * (1 - latest)}`
      },
      onComplete: () => {
        // Settle to straight line
        path.setAttribute('d', generatePath(width, 0))
        path.style.strokeDasharray = 'none'
        path.style.strokeDashoffset = '0'
        setIsInteractive(true)
      },
    })

    // Cleanup: stop animation if component unmounts
    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasAnimated]) // Only depend on hasAnimated to run once

  // Update pluck on mouse move
  useEffect(() => {
    if (!pathRef.current || !isInteractive) return

    const unsubscribe = pluckY.on('change', (y) => {
      const x = pluckX.get()
      const newPath = generatePath(svgWidth, 0, x, y)
      pathRef.current?.setAttribute('d', newPath)
    })

    return unsubscribe
  }, [svgWidth, pluckX, pluckY, isInteractive, generatePath])

  // Mouse handlers
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (!shouldEnablePluck || !isInteractive || !svgRef.current) return

      const rect = svgRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = (e.clientY - rect.top - rect.height / 2) * -1.2 // Dialed back from -1.5 to -0.8 for balanced pluck

      mouseX.set(x)
      mouseY.set(y)
    },
    [shouldEnablePluck, isInteractive, mouseX, mouseY]
  )

  const handleMouseLeave = useCallback(() => {
    mouseY.set(0)
  }, [mouseY])

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
          cursor: shouldEnablePluck && isInteractive ? 'pointer' : 'default',
        }}
      >
        <path
          ref={pathRef}
          d={generatePath(svgWidth, 0)}
          stroke="rgb(var(--color-foreground))"
          strokeWidth="0.8"
          fill="none"
          strokeLinecap="round"
          transform="translate(0, 40)"
          className="transition-colors duration-300 hover:stroke-[rgb(var(--color-primary))]"
        />
      </svg>
    </div>
  )
}
