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
  compact?: boolean
}

function FooterClockComponent({ className, compact = false }: FooterClockProps) {
  const { formattedTime } = useCurrentTime()

  return (
    <div
      className={cn(className)}
      style={{ fontFamily: 'var(--font-jetbrains-mono), ui-monospace, monospace' }}
    >
      <p
        className={cn(
          'mb-0.5 font-medium tracking-wide text-text-secondary',
          compact ? 'text-[10px]' : 'text-sm lg:mb-2 lg:text-lg'
        )}
      >
        NEW YORK
      </p>
      <div
        className={cn(
          'font-medium tabular-nums text-text-secondary',
          compact ? 'text-xs' : 'text-sm lg:text-lg'
        )}
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
