'use client'

import {
  createContext,
  useContext,
  useEffect,
  type ReactNode,
} from 'react'

export interface ContainerScrollOptions {
  offset?: number
  duration?: number
}

export type ScrollToElementFn = (
  id: string,
  options?: ContainerScrollOptions
) => void

const ContainerScrollContext = createContext<ScrollToElementFn | null>(null)

let activeScrollToElement: ScrollToElementFn | null = null

interface ContainerScrollProviderProps {
  scrollToElement: ScrollToElementFn
  children: ReactNode
}

export function ContainerScrollProvider({
  scrollToElement,
  children,
}: ContainerScrollProviderProps) {
  useEffect(() => {
    activeScrollToElement = scrollToElement
    return () => {
      if (activeScrollToElement === scrollToElement) {
        activeScrollToElement = null
      }
    }
  }, [scrollToElement])

  return (
    <ContainerScrollContext.Provider value={scrollToElement}>
      {children}
    </ContainerScrollContext.Provider>
  )
}

export function useContainerScroll(): ScrollToElementFn | null {
  return useContext(ContainerScrollContext)
}

/** Imperative scroll for handlers outside React context (e.g. exported helpers). */
export function scrollToContainerElement(
  id: string,
  options?: ContainerScrollOptions
): void {
  if (activeScrollToElement) {
    activeScrollToElement(id, options)
    return
  }

  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
