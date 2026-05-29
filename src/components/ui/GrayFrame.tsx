/**
 * GrayFrame
 * A tonal container used to frame images or media.
 * - Light mode: black at 10% opacity
 * - Dark mode : white at 10% opacity
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
        'bg-[rgba(0,0,0,0.07)] dark:bg-[rgba(255,255,255,0.10)]',
        className
      )}
    >
      {children}
    </div>
  )
}
