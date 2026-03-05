'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { type ReactNode, useEffect, useState } from 'react'
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
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [displayChildren, setDisplayChildren] = useState(children)

  const isSubPage = (path: string) => path === '/work' || path.startsWith('/case-studies/')
  const isHome = (path: string) => path === '/'

  useEffect(() => {
    if (!previousPathname) return

    // Case 1: Navigating from SubPage back to Home (Slide Down)
    if (isSubPage(previousPathname) && isHome(pathname)) {
      setIsTransitioning(true)
    } 
    // Case 2: Navigating from Home to SubPage (Slide Up)
    else if (isHome(previousPathname) && isSubPage(pathname)) {
      setIsTransitioning(true)
    }

    // Always update display children when not freezing
    if (!isTransitioning) {
      setDisplayChildren(children)
    }
  }, [pathname, previousPathname, children, isTransitioning])

  const handleExitComplete = () => {
    setIsTransitioning(false)
    setDisplayChildren(children)
  }

  // If we're on a subpage, we want it to be able to exit with a slide down
  const shouldAnimate = isSubPage(pathname) || (previousPathname && isSubPage(previousPathname))

  return (
    <AnimatePresence mode="popLayout" onExitComplete={handleExitComplete}>
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
