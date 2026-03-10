'use client'

import { m, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { type ReactNode } from 'react'
import { FrozenRouter } from './FrozenRouter'
import { usePreviousValue } from '@/hooks/use-previous-value'
import { useAccessibility } from '@/components/providers/AccessibilityProvider'

interface PageSlideTransitionProps {
  children: ReactNode
}

const TRANSITION_EASE: [number, number, number, number] = [0.87, 0, 0.13, 1]
const DURATION = 1.0

/**
 * Global Page Transition for standalone pages (/work, /case-studies/[slug]).
 * 
 * This ensures that even if you refresh on a subpage, navigating back
 * to the home page triggers a slide-down animation.
 */
export function PageSlideTransition({ children }: PageSlideTransitionProps) {
  const pathname = usePathname()
  const previousPathname = usePreviousValue(pathname)
  const { reducedMotion: prefersReducedMotion } = useAccessibility()

  const isSubPage = (path: string) => path === '/work' || path.startsWith('/case-studies/')
  const isHome = (path: string) => path === '/'

  const isTransitioning = Boolean(
    previousPathname &&
      ((isSubPage(previousPathname) && isHome(pathname)) ||
        (isHome(previousPathname) && isSubPage(pathname)))
  )

  const initialY = !prefersReducedMotion && isSubPage(pathname) && isHome(previousPathname || '') ? '100%' : 0
  const initialOpacity = prefersReducedMotion ? 0 : 1
  const exitY = !prefersReducedMotion && isSubPage(pathname) ? '100%' : 0
  const exitOpacity = prefersReducedMotion ? 0 : 1

  return (
    <AnimatePresence mode="popLayout">
      <m.div
        key={pathname}
        initial={{ y: initialY, opacity: initialOpacity }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: exitY, opacity: exitOpacity }}
        transition={{
          duration: prefersReducedMotion ? 0.4 : DURATION,
          ease: prefersReducedMotion ? 'easeOut' : TRANSITION_EASE,
        }}
        style={{
          width: '100%',
          minHeight: '100dvh',
          backgroundColor: 'rgb(var(--color-background))',
          // Only use fixed/absolute during exit to allow Home to be underneath
          position: isSubPage(pathname) ? 'relative' : 'static',
          zIndex: isSubPage(pathname) ? 50 : 0,
        }}
      >
        <FrozenRouter freeze={isTransitioning}>
          {children}
        </FrozenRouter>
      </m.div>
    </AnimatePresence>
  )
}
