'use client'

import { useRef } from 'react'
import { cn } from '@/lib/utils/cn'
import { useInteractiveGradient } from '@/hooks/use-interactive-gradient'

interface GradientBarProps {
  /** Custom height for the bar. Uses Tailwind height classes. */
  height?: string
  /** Additional CSS classes. */
  className?: string
  /** The start color of the gradient (e.g., 'bg-primary'). */
  startColor?: string
  /** The end color of the gradient (e.g., 'bg-accent'). */
  endColor?: string
}

/**
 * An interactive gradient bar that shifts based on mouse position or device tilt.
 * Built with performance and accessibility in mind.
 *
 * @example
 * <GradientBar
 *   height="h-8"
 *   startColor="bg-blue-500"
 *   endColor="bg-pink-500"
 * />
 */
export function GradientBar({
  height = 'h-4',
  className,
  startColor = 'bg-gradient-start',
  endColor = 'bg-gradient-end',
}: GradientBarProps) {
  const gradientRef = useRef<HTMLDivElement>(null)
  const gradientPosition = useInteractiveGradient({
    ref: gradientRef as React.RefObject<HTMLElement>,
  })

  // Map color names to CSS variable references
  const getColorVar = (colorName: string) => {
    // Remove 'bg-' prefix if present
    const cleanName = colorName.replace('bg-', '')
    // Return CSS variable reference that will be resolved by the browser
    if (cleanName === 'gradient-start' || cleanName === 'gradient-end') {
      return `rgb(var(--color-${cleanName}))`
    }
    // Default fallback
    return `rgb(var(--color-${cleanName}))`
  }

  return (
    <div
      ref={gradientRef}
      className={cn('w-full', height, className)}
      style={
        {
          backgroundImage: `linear-gradient(90deg, 
          ${getColorVar(startColor)} 0%, 
          ${getColorVar(startColor)} ${gradientPosition - 20}%, 
          ${getColorVar(endColor)} ${gradientPosition + 20}%, 
          ${getColorVar(endColor)} 100%)`,
          // Enhanced brightness, saturation, and luminance for gradient bars only
          filter: 'brightness(1.15) saturate(1.3)',
        } as React.CSSProperties
      }
    />
  )
}
