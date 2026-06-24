'use client'

import { m, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'
import { getSectionShellClass } from '@/lib/case-study-grid'

type CaseStudySectionProps = {
  children: ReactNode
  className?: string
  /** When true, renders as Framer Motion section (pass initial/animate/transition). */
  animated?: boolean
} & Omit<HTMLMotionProps<'section'>, 'children' | 'className'>

export function CaseStudySection({
  children,
  className,
  animated = false,
  ...motionProps
}: CaseStudySectionProps) {
  const shellClass = cn(getSectionShellClass(), className)

  if (animated) {
    return (
      <m.section className={shellClass} {...motionProps}>
        {children}
      </m.section>
    )
  }

  return <section className={shellClass}>{children}</section>
}
