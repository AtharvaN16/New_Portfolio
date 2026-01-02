'use client'

import { memo } from 'react'
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
function FooterClockComponent() {
  const { formattedTime, formattedDate } = useCurrentTime()

  return (
    <div className="mt-auto">
      <p
        className="mb-2 text-base font-medium lg:text-lg"
        style={{ color: 'rgb(var(--color-text-color30))' }}
      >
        New York, NY
      </p>
      <div
        className="text-xs font-bold font-mono tabular-nums md:text-sm lg:text-sm"
        style={{ color: 'rgb(var(--color-text-secondary))' }}
      >
        {formattedTime}
      </div>
      <div
        className="mt-1 text-xs font-medium md:text-sm"
        style={{ color: 'rgb(var(--color-text-color30))' }}
      >
        {formattedDate}
      </div>
    </div>
  )
}

// Memoize to prevent unnecessary re-renders
export const FooterClock = memo(FooterClockComponent)
FooterClock.displayName = 'FooterClock'
