'use client'

import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useContext } from 'react'
import { usePreviousValue } from '@/hooks/use-previous-value'

/**
 * FrozenRouter - Prevents router context from updating during page transitions
 * This keeps the old page mounted while animations complete
 *
 * How it works:
 * - Captures the current router context
 * - Preserves the previous context value
 * - During navigation, provides the OLD context instead of new one
 * - This prevents the component from unmounting too early
 */
interface FrozenRouterProps {
  children: React.ReactNode
  freeze: boolean
}

export function FrozenRouter({ children, freeze }: FrozenRouterProps) {
  const context = useContext(LayoutRouterContext)
  const previousContext = usePreviousValue(context)

  const value = freeze && previousContext ? previousContext : context

  return <LayoutRouterContext.Provider value={value}>{children}</LayoutRouterContext.Provider>
}
