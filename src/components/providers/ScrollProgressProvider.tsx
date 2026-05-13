'use client'

/**
 * ScrollProgressProvider
 *
 * Provides scroll progress context to child components for the layered
 * parallax reveal effect. Uses a single normalized scroll progress (0→1)
 * to drive all scroll-based animations.
 */

import type { ReactNode } from 'react'
import { createContext, useContext } from 'react'
import {
  useScrollProgress,
  type ScrollProgressContextValue,
} from '@/hooks/use-scroll-progress'

const ScrollProgressContext = createContext<ScrollProgressContextValue | null>(
  null
)

interface ScrollProgressProviderProps {
  children: ReactNode
  /** Total height of scroll container in vh units (default: 400) */
  containerHeight?: number
}

export function ScrollProgressProvider({
  children,
  containerHeight = 400,
}: ScrollProgressProviderProps) {
  const scrollProgress = useScrollProgress(containerHeight)

  return (
    <ScrollProgressContext.Provider value={scrollProgress}>
      {children}
    </ScrollProgressContext.Provider>
  )
}

/**
 * Hook to access scroll progress values from any component
 */
export function useScrollProgressContext(): ScrollProgressContextValue {
  const context = useContext(ScrollProgressContext)

  if (!context) {
    throw new Error(
      'useScrollProgressContext must be used within a ScrollProgressProvider'
    )
  }

  return context
}
