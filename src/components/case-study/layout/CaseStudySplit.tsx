import type { ReactNode } from 'react'
import {
  getCellSpanClasses,
  getPresetSpans,
  type CaseStudyGridBreakpoint,
  type CaseStudyLayoutPreset,
} from '@/lib/case-study-grid'
import { cn } from '@/lib/utils/cn'
import { CaseStudyGrid } from './CaseStudyGrid'

interface CaseStudySplitProps {
  left: ReactNode
  right: ReactNode
  preset?: Exclude<CaseStudyLayoutPreset, 'full'>
  breakpoint?: CaseStudyGridBreakpoint
  className?: string
}

/** Two-column split using named layout presets (equal, 40-60, 60-40). */
export function CaseStudySplit({
  left,
  right,
  preset = 'equal',
  breakpoint = 'md',
  className,
}: CaseStudySplitProps) {
  const [leftSpan, rightSpan] = getPresetSpans(preset) as [number, number]

  return (
    <CaseStudyGrid width="fill" className={className}>
      <div className={getCellSpanClasses(leftSpan, { breakpoint })}>{left}</div>
      <div className={getCellSpanClasses(rightSpan, { breakpoint })}>{right}</div>
    </CaseStudyGrid>
  )
}
