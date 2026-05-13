'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react'

interface ViewTransitionContextType {
  isTransitioning: boolean
  startTransition: () => void
  endTransition: () => void
}

const ViewTransitionContext = createContext<
  ViewTransitionContextType | undefined
>(undefined)

export function useViewTransition() {
  const context = useContext(ViewTransitionContext)
  if (!context) {
    throw new Error(
      'useViewTransition must be used within ViewTransitionProvider'
    )
  }
  return context
}

interface ViewTransitionProviderProps {
  children: ReactNode
}

export function ViewTransitionProvider({
  children,
}: ViewTransitionProviderProps) {
  const [isTransitioning, setIsTransitioning] = useState(false)

  const startTransition = useCallback(() => {
    setIsTransitioning(true)
  }, [])

  const endTransition = useCallback(() => {
    setIsTransitioning(false)
  }, [])

  return (
    <ViewTransitionContext.Provider
      value={{ isTransitioning, startTransition, endTransition }}
    >
      {children}
    </ViewTransitionContext.Provider>
  )
}
