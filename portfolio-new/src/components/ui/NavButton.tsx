'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface NavButtonProps extends HTMLMotionProps<'button'> {
  children: React.ReactNode
  className?: string
}

/**
 * A standardized navigation button used for actions like "Menu", "Close", and "Back".
 * Features a consistent title-case, normal tracked style across the application.
 * 
 * Composition:
 * - Base state: Transparent background, Foreground text
 * - Desktop Hover Effect:
 *   - CSS-powered animated fill from bottom to top
 *   - Default Fill: Neutral gray/white tint (bg-foreground/10 or bg-white/20)
 * - Square corners (rounded-none)
 * - Explicit z-index and pointer-events-auto to ensure hover works in dialogs
 */
export function NavButton({ children, className, ...props }: NavButtonProps) {
  return (
    <motion.button
      type="button"
      className={cn(
        'group relative overflow-hidden text-[14px] md:text-[18px] tracking-normal transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 px-3 py-1.5 rounded-none bg-transparent z-[101] pointer-events-auto',
        className
      )}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {/* Animated Fill Background (Desktop only) */}
      {/* Neutral gray in light mode, subtle white in dark mode for clear discernability */}
      <div
        className="absolute inset-x-0 bottom-0 z-0 hidden md:block h-0 group-hover:h-full transition-[height] duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] pointer-events-none bg-foreground/10 dark:bg-white/20"
      />
      
      {/* Label - Subtle color change on hover (Desktop only) */}
      <span className="relative z-10 block transition-colors duration-300 text-text-secondary group-hover:md:text-foreground pointer-events-none font-sans font-medium tracking-[0.1em] uppercase leading-none">
        {children}
      </span>
    </motion.button>
  )
}
