import type { ReactNode } from 'react'
import {
  getCellSpanClasses,
  type CaseStudyGridBreakpoint,
} from '@/lib/case-study-grid'
import { cn } from '@/lib/utils/cn'

interface CaseStudyCellProps {
  children: ReactNode
  /** Column span at breakpoint (1–12). Stacks full-width below breakpoint. */
  span: number
  start?: number
  breakpoint?: CaseStudyGridBreakpoint
  className?: string
}

export function CaseStudyCell({
  children,
  span,
  start,
  breakpoint = 'md',
  className,
}: CaseStudyCellProps) {
  return (
    <div
      className={cn(
        getCellSpanClasses(span, { start, breakpoint }),
        className
      )}
    >
      {children}
    </div>
  )
}
