'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface LineSeparatorProps {
  className?: string
  /** Delay before starting the entry animation (in seconds). */
  delay?: number
  /** Opacity of the line (0 to 1). Default: 1. */
  opacity?: number
}

/**
 * LineSeparator - Simplified animated line divider
 *
 * Entry: Line draws from left to right when it enters the viewport.
 * This version removes the complex guitar-pluck hover effect to keep it lightweight
 * and maintainable, while preserving the exact same visual entry animation.
 */
export function LineSeparator({
  className,
  delay = 0,
  opacity = 1,
}: LineSeparatorProps) {
  return (
    <div
      className={cn('w-full', className)}
      role="separator"
      aria-hidden="true"
    >
      <svg
        width="100%"
        height="80"
        viewBox="0 0 1000 80"
        preserveAspectRatio="none"
        className="block overflow-visible"
        style={{ color: 'rgb(var(--color-foreground))' }}
      >
        <motion.path
          d="M 0 40 L 1000 40"
          stroke="currentColor"
          strokeWidth="0.8"
          fill="none"
          strokeLinecap="round"
          style={{ opacity }}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 1.4,
            delay,
            ease: [0.19, 1, 0.22, 1],
          }}
        />
      </svg>
    </div>
  )
}
