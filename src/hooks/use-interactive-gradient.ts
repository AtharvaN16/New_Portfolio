'use client'

import { useState, useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

interface UseInteractiveGradientProps {
  ref: React.RefObject<HTMLElement>
  maxShift?: number
  lerpFactor?: number
}

const LERP_FACTOR = 0.05
const MAX_SHIFT = 30

/**
 * A hook that provides a dynamic gradient position.
 * - On desktop: Responds to mouse position over the element.
 * - On mobile: Responds to device tilt (gyroscope).
 * - Gracefully degrades to a static gradient if no sensors are available.
 * - Respects prefers-reduced-motion.
 */
export function useInteractiveGradient({
  ref,
  maxShift = MAX_SHIFT,
  lerpFactor = LERP_FACTOR,
}: UseInteractiveGradientProps) {
  const [gradientPosition, setGradientPosition] = useState(50)
  const targetPosition = useRef(50)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const element = ref.current
    if (!element || shouldReduceMotion) {
      return
    }

    let isIntersecting = false
    let animationFrameId: number

    const animate = () => {
      setGradientPosition((prevPosition) => {
        const target = targetPosition.current
        const diff = target - prevPosition
        if (Math.abs(diff) < 0.01) {
          return prevPosition // Stop updating if we're close enough
        }
        return prevPosition + diff * lerpFactor
      })
      animationFrameId = requestAnimationFrame(animate)
    }

    // Gyroscope handler for mobile
    const handleDeviceMotion = (event: DeviceMotionEvent) => {
      if (!isIntersecting || !event.rotationRate) return
      // Using gamma (left-to-right tilt) for the effect
      const tilt = event.rotationRate.gamma || 0
      // Normalize and apply shift
      const newPosition = 50 + Math.max(-1, Math.min(1, tilt / 15)) * maxShift
      targetPosition.current = newPosition
    }

    // Mouse handler for desktop - NOW TRACKS ACROSS THE ENTIRE PAGE
    const handleMouseMove = (event: MouseEvent) => {
      if (!isIntersecting) return
      const mouseX = event.clientX
      const pageWidth = window.innerWidth
      const position = (mouseX / pageWidth) * 100
      targetPosition.current = 50 + ((position - 50) / 50) * maxShift
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting
        if (!isIntersecting) {
          targetPosition.current = 50 // Reset when not visible
        }
      },
      { threshold: 0.1 }
    )

    // Detect interaction method
    // iOS 13+ requires permission for DeviceMotionEvent
    type DeviceMotionEventStatic = typeof DeviceMotionEvent & {
      requestPermission?: () => Promise<'granted' | 'denied'>
    }
    const hasGyroscope =
      typeof DeviceMotionEvent !== 'undefined' &&
      typeof (DeviceMotionEvent as unknown as DeviceMotionEventStatic)
        .requestPermission === 'function'
    const isTouchDevice = 'ontouchstart' in window

    if (isTouchDevice || hasGyroscope) {
      window.addEventListener('devicemotion', handleDeviceMotion)
    } else {
      document.addEventListener('mousemove', handleMouseMove)
    }

    observer.observe(element)
    animate()

    return () => {
      window.removeEventListener('devicemotion', handleDeviceMotion)
      document.removeEventListener('mousemove', handleMouseMove)
      observer.unobserve(element)
      cancelAnimationFrame(animationFrameId)
    }
  }, [ref, shouldReduceMotion, maxShift, lerpFactor])

  return gradientPosition
}
