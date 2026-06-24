import type { ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

export type CaseStudyGridWidth = 'content' | 'section' | 'fill'
export type CaseStudyGridGap = 'sm' | 'md'

interface CaseStudyGridProps {
  children: ReactNode
  /** content = 56rem prose column; section = full width between page gutters; fill = 100% of parent (nested splits) */
  width?: CaseStudyGridWidth
  gap?: CaseStudyGridGap
  className?: string
}

export function CaseStudyGrid({
  children,
  width = 'content',
  gap = 'sm',
  className,
}: CaseStudyGridProps) {
  return (
    <div
      className={cn(
        'cs-grid',
        width === 'content' && 'cs-grid--content',
        width === 'section' && 'cs-grid--section',
        width === 'fill' && 'cs-grid--fill',
        gap === 'md' && 'cs-grid--gap-md',
        className
      )}
    >
      {children}
    </div>
  )
}
