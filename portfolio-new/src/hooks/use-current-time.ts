/**
 * useCurrentTime Hook
 *
 * Real-time clock with automatic updates and visibility API support
 * to pause updates when the tab is hidden.
 */

import { useState, useEffect, useRef } from 'react'

// Constants
const UPDATE_INTERVAL_MS = 1000 // 1 second updates
const TIME_LOCALE = 'en-US'
const TIME_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  hour: 'numeric',
  minute: '2-digit',
  second: '2-digit',
  hour12: true,
}
const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  year: 'numeric',
}

interface CurrentTimeResult {
  /** Current time as Date object */
  currentTime: Date
  /** Formatted time string (e.g., "4:25:31 PM") */
  formattedTime: string
  /** Formatted date string (e.g., "Monday, August 4, 2025") */
  formattedDate: string
}

/**
 * Format time string (e.g., "4:25:31 PM")
 */
function formatTime(date: Date): string {
  return date.toLocaleTimeString(TIME_LOCALE, TIME_FORMAT_OPTIONS)
}

/**
 * Format date string (e.g., "Monday, August 4, 2025")
 */
function formatDate(date: Date): string {
  return date.toLocaleDateString(TIME_LOCALE, DATE_FORMAT_OPTIONS)
}

/**
 * Setup interval for time updates
 */
function setupTimeInterval(
  callback: () => void,
  intervalMs: number
): NodeJS.Timeout {
  return setInterval(callback, intervalMs)
}

/**
 * Stop interval
 */
function stopTimeInterval(intervalRef: NodeJS.Timeout | null): void {
  if (intervalRef) {
    clearInterval(intervalRef)
  }
}

/**
 * Hook to get current time with automatic updates
 *
 * @returns Current time with formatted strings
 *
 * @example
 * ```tsx
 * function Clock() {
 *   const { formattedTime, formattedDate } = useCurrentTime()
 *   return <div>{formattedTime}<br />{formattedDate}</div>
 * }
 * ```
 */
export function useCurrentTime(): CurrentTimeResult {
  const [currentTime, setCurrentTime] = useState<Date>(() => new Date())
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Start interval for continuous updates
    const startInterval = () => {
      intervalRef.current = setupTimeInterval(() => {
        setCurrentTime(new Date())
      }, UPDATE_INTERVAL_MS)
    }

    // Handle visibility change to pause/resume updates
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopTimeInterval(intervalRef.current)
        intervalRef.current = null
      } else {
        setCurrentTime(new Date()) // Update immediately when visible
        startInterval()
      }
    }

    // Start the interval
    startInterval()

    // Listen for visibility changes
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Cleanup on unmount
    return () => {
      stopTimeInterval(intervalRef.current)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return {
    currentTime,
    formattedTime: formatTime(currentTime),
    formattedDate: formatDate(currentTime),
  }
}
