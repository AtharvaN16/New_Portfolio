'use client'

import {
  createContext,
  useContext,
  useEffect,
  type ReactNode,
  type RefObject,
} from 'react'

export interface ContainerScrollOptions {
  offset?: number
  duration?: number
}

export type ScrollToElementFn = (
  id: string,
  options?: ContainerScrollOptions
) => void

interface ContainerScrollContextValue {
  scrollToElement: ScrollToElementFn
  containerRef: React.RefObject<HTMLDivElement | null>
}

const ContainerScrollContext = createContext<ContainerScrollContextValue | null>(
  null
)

let activeScrollToElement: ScrollToElementFn | null = null

interface ContainerScrollProviderProps {
  scrollToElement: ScrollToElementFn
  containerRef: RefObject<HTMLDivElement | null>
  children: ReactNode
}

export function ContainerScrollProvider({
  scrollToElement,
  containerRef,
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
    <ContainerScrollContext.Provider value={{ scrollToElement, containerRef }}>
      {children}
    </ContainerScrollContext.Provider>
  )
}

export function useContainerScroll(): ScrollToElementFn | null {
  return useContext(ContainerScrollContext)?.scrollToElement ?? null
}

export function useCaseStudyScrollContainerRef(): RefObject<HTMLDivElement | null> | null {
  return useContext(ContainerScrollContext)?.containerRef ?? null
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
