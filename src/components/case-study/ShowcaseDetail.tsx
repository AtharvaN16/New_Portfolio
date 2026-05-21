'use client'

import { useRef } from 'react'
import type { CaseStudy } from '@/lib/data/case-studies'
import { ShowcaseHero } from '@/components/case-study/ShowcaseHero'
import { CaseStudyLayout } from '@/components/case-study/CaseStudyLayout'

interface ShowcaseDetailProps {
  caseStudy: CaseStudy
  onClose?: () => void
}

/**
 * ShowcaseDetail
 * 
 * Showcase variant (e.g., for 'Snakes').
 * Uses ShowcaseHero as the heroSlot.
 */
export function ShowcaseDetail({ caseStudy, onClose }: ShowcaseDetailProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const heroSlot = (
    <ShowcaseHero caseStudy={caseStudy} containerRef={containerRef} />
  )

  return (
    <CaseStudyLayout
      caseStudy={caseStudy}
      onClose={onClose}
      containerRef={containerRef}
      heroSlot={heroSlot}
    />
  )
}
