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
  const { formattedTime } = useCurrentTime()

  return (
    <div
      className="mt-auto text-right"
      style={{ fontFamily: 'var(--font-jetbrains-mono), ui-monospace, monospace' }}
    >
      <p
        className="mb-2 text-base font-medium lg:text-lg tracking-wide"
        style={{ color: 'rgb(var(--color-text-tertiary-50))' }}
      >
        NEW YORK
      </p>
      <div
        className="text-base font-medium tabular-nums lg:text-lg"
        style={{ color: 'rgb(var(--color-text-tertiary-50))' }}
      >
        {formattedTime}
      </div>
    </div>
  )
}

// Memoize to prevent unnecessary re-renders
export const FooterClock = memo(FooterClockComponent)
FooterClock.displayName = 'FooterClock'
