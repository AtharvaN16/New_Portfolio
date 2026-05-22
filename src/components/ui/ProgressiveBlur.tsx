'use client'

import { cn } from '@/lib/utils/cn'
import type { ComponentPropsWithoutRef } from 'react'
import { useBreakpoints } from '@/hooks/use-responsive'

type BlurSide = 'top' | 'bottom' | 'left' | 'right'

interface ProgressiveBlurProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Which side the blur originates from
   * @default 'top'
   */
  side?: BlurSide
  /**
   * Height/width of the blur effect (CSS value)
   * @default '50%'
   */
  height?: string
  /**
   * Maximum blur strength in pixels
   * @default 64
   */
  strength?: number
  /**
   * Number of blur layers (higher = smoother but more DOM nodes)
   * @default 8
   */
  steps?: number
  /**
   * Percentage of the element where blur falls off (0-100)
   * @default 100
   */
  falloffPercentage?: number
  /**
   * Optional tint color
   * @default 'transparent'
   */
  tint?: string
}

const oppositeSide: Record<BlurSide, string> = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
}

/**
 * ProgressiveBlur - Creates a smooth gradient blur effect
 * Based on Magic UI's progressive-blur pattern
 * @see https://magicui.design/docs/components/progressive-blur
 */
export function ProgressiveBlur({
  className,
  side = 'top',
  height = '50%',
  strength = 64,
  steps = 8,
  falloffPercentage = 100,
  tint = 'transparent',
  style,
  ...props
}: ProgressiveBlurProps) {
  const { isMobile } = useBreakpoints()
  const isVertical = side === 'top' || side === 'bottom'
  const gradientDirection = `to ${oppositeSide[side]}`

  // Optimization: reduce layers on mobile to save GPU (3 steps vs 8)
  const effectiveSteps = isMobile ? Math.min(steps, 3) : steps

  // Calculate exponential base for smooth blur falloff
  const factor = 1 / 10
  const base = Math.pow(strength / factor, 1 / (effectiveSteps - 1))

  return (
    <div
      className={cn(
        'pointer-events-none absolute',
        side === 'top' && 'inset-x-0 top-0',
        side === 'bottom' && 'inset-x-0 bottom-0',
        side === 'left' && 'inset-y-0 left-0',
        side === 'right' && 'inset-y-0 right-0',
        className
      )}
      style={{
        [isVertical ? 'height' : 'width']: height,
        ...style,
      }}
      aria-hidden="true"
      {...props}
    >
      {Array.from({ length: effectiveSteps }).map((_, index) => {
        // Exponential blur calculation for smooth transition
        const blurAmount = factor * Math.pow(base, index)

        // Calculate mask gradient stops
        const startOffset = (index / effectiveSteps) * falloffPercentage
        const endOffset = ((index + 1) / effectiveSteps) * falloffPercentage

        return (
          <div
            key={index}
            className="absolute inset-0"
            style={{
              backdropFilter: `blur(${blurAmount}px)`,
              WebkitBackdropFilter: `blur(${blurAmount}px)`,
              maskImage: `linear-gradient(${gradientDirection}, rgba(0, 0, 0, 0) ${startOffset}%, rgba(0, 0, 0, 1) ${endOffset}%, rgba(0, 0, 0, 1) 100%)`,
              WebkitMaskImage: `linear-gradient(${gradientDirection}, rgba(0, 0, 0, 0) ${startOffset}%, rgba(0, 0, 0, 1) ${endOffset}%, rgba(0, 0, 0, 1) 100%)`,
              backgroundColor: tint,
            }}
          />
        )
      })}
    </div>
  )
}
