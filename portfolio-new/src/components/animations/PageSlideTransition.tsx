'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { type ReactNode } from 'react'
import { FrozenRouter } from './FrozenRouter'
import { usePreviousValue } from '@/hooks/use-previous-value'

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

  const isSubPage = (path: string) => path === '/work' || path.startsWith('/case-studies/')
  const isHome = (path: string) => path === '/'

  const isTransitioning = Boolean(
    previousPathname &&
      ((isSubPage(previousPathname) && isHome(pathname)) ||
        (isHome(previousPathname) && isSubPage(pathname)))
  )

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={pathname}
        initial={isSubPage(pathname) && isHome(previousPathname || '') ? { y: '100%' } : false}
        animate={{ y: 0 }}
        exit={isSubPage(pathname) ? { y: '100%' } : { y: 0 }}
        transition={{
          duration: DURATION,
          ease: TRANSITION_EASE,
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
      </motion.div>
    </AnimatePresence>
  )
}
