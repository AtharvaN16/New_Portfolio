/**
 * GrayFrame
 * A tonal container used to frame images or media.
 * - Light mode: #CECFCD (solid)
 * - Dark mode : white at 20% opacity
 */
import { cn } from '@/lib/utils/cn'

interface GrayFrameProps {
  children: React.ReactNode
  className?: string
}

export function GrayFrame({ children, className }: GrayFrameProps) {
  return (
    <div
      className={cn(
        'bg-[#CECFCD] dark:bg-[rgba(255,255,255,0.15)]',
        className
      )}
    >
      {children}
    </div>
  )
}
