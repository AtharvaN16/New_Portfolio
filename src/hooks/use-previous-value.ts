import { useEffect, useRef } from 'react'

/**
 * Hook to store and return the previous value of a state
 * Useful for comparing state changes and preserving old values during transitions
 * 
 * How it works:
 * - On render N, it returns the value from render N-1
 * - After render completes, it updates the ref to the current value
 * - This way, on the next render, the ref contains the "previous" value
 */
export function usePreviousValue<T>(value: T): T | undefined {
  const prevValue = useRef<T | undefined>(undefined)

  useEffect(() => {
    prevValue.current = value
  })

  return prevValue.current
}
