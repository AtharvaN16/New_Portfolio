'use client'

import { memo } from 'react'
import { cn } from '@/lib/utils/cn'
import { useCurrentTime } from '@/hooks/use-current-time'

/**
 * FooterClock Component
 *
 * Memoized clock component that displays current time and date.
 * Prevents full Footer re-render by isolating time updates to this component.
 *
 * Performance optimization:
 * - React.memo prevents parent re-renders from affecting this component
 * - Only this small component re-renders when time updates (every second)
 * - Reduces Footer re-renders from ~60/min to 0
 */
interface FooterClockProps {
  className?: string
}

function FooterClockComponent({ className }: FooterClockProps) {
  const { formattedTime } = useCurrentTime()

  return (
    <div
      className={cn(className)}
      style={{ fontFamily: 'var(--font-jetbrains-mono), ui-monospace, monospace' }}
    >
      <p
        className="mb-1 text-sm font-medium tracking-wide lg:mb-2 lg:text-lg"
        style={{ color: 'rgb(var(--color-text-secondary))' }}
      >
        NEW YORK
      </p>
      <div
        className="text-sm font-medium tabular-nums lg:text-lg"
        style={{ color: 'rgb(var(--color-text-secondary))' }}
        suppressHydrationWarning
      >
        {formattedTime}
      </div>
    </div>
  )
}

// Memoize to prevent unnecessary re-renders
export const FooterClock = memo(FooterClockComponent)
FooterClock.displayName = 'FooterClock'
