'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface NavButtonProps extends HTMLMotionProps<'button'> {
  children: React.ReactNode
  className?: string
}

/**
 * A standardized navigation button used for actions like "MENU", "CLOSE", and "BACK".
 * Features a consistent uppercase, tracked style across the application.
 * 
 * Composition:
 * - Base state: Transparent background, Foreground text
 * - Desktop Hover Effect:
 *   - CSS-powered animated fill from bottom to top
 *   - Fill Color: Subtle/Pastel (Surface Elevated in Light, Subtle White Overlay in Dark)
 * - Square corners (rounded-none)
 * - Explicit z-index and pointer-events-auto to ensure hover works in dialogs
 */
export function NavButton({ children, className, ...props }: NavButtonProps) {
  return (
    <motion.button
      type="button"
      className={cn(
        'group relative overflow-hidden text-[12px] md:text-sm font-medium tracking-[0.18em] uppercase transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 px-3 py-1.5 rounded-none bg-transparent z-[101] pointer-events-auto',
        className
      )}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {/* Animated Fill Background (Desktop only) */}
      {/* Light Mode: Surface Elevated (Subtle gray) */}
      {/* Dark Mode: Subtle White Overlay (Pastel/Accessible) */}
      <div
        className="absolute inset-x-0 bottom-0 z-0 hidden md:block h-0 group-hover:h-full transition-[height] duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] pointer-events-none bg-surface-elevated dark:bg-white/15"
      />
      
      {/* Label - Subtle color change on hover (Desktop only) */}
      <span className="relative z-10 block transition-colors duration-300 text-text-secondary group-hover:md:text-foreground pointer-events-none">
        {children}
      </span>
    </motion.button>
  )
}
