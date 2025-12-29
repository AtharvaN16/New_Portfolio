'use client'

import { motion } from 'framer-motion'
import { useEffect, type ReactNode } from 'react'
import { useViewTransition } from '@/components/providers/ViewTransitionProvider'

interface PageSlideTransitionProps {
  children: ReactNode
}

export function PageSlideTransition({ children }: PageSlideTransitionProps) {
  const { endTransition } = useViewTransition()

  useEffect(() => {
    // Signal that transition has ended after animation completes
    const timer = setTimeout(() => {
      endTransition()
    }, 900) // Match animation duration

    return () => clearTimeout(timer)
  }, [endTransition])

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{
        duration: 0.9,
        ease: [0.87, 0, 0.13, 1], // Exponential ease
      }}
      className="fixed inset-0 z-50 overflow-auto bg-background"
    >
      {children}
    </motion.div>
  )
}
