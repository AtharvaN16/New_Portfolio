import type { ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

interface CaseStudyContentProps {
  children: ReactNode
  className?: string
}

/** Prose column wrapper (56rem). Use for stacked sections — not a grid. */
export function CaseStudyContent({ children, className }: CaseStudyContentProps) {
  return <div className={cn('cs-content text-left', className)}>{children}</div>
}
