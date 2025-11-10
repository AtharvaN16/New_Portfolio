import { useEffect, useRef } from 'react'

/**
 * Hook to store and return the previous value of a state
 * Useful for comparing state changes and preserving old values during transitions
 *
 * How it works:
 * - On render N, it returns the value from render N-1
 * - After render completes, it updates the ref to the current value
 * - This way, on the next render, the ref contains the "previous" value
 *
 * Note: This pattern is specifically designed to capture previous values
 * and is an acceptable use case for accessing refs during render.
 */
export function usePreviousValue<T>(value: T): T | undefined {
  const prevValue = useRef<T | undefined>(undefined)
  const currentValue = useRef<T>(value)

  // Store current value for next render
  useEffect(() => {
    prevValue.current = currentValue.current
    currentValue.current = value
  })

  // This ref access during render is intentional for this use case
  // eslint-disable-next-line react-hooks/refs
  return prevValue.current
}
