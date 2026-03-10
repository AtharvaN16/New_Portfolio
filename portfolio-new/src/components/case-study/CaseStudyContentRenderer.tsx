'use client'

import { m } from 'framer-motion'
import type { CaseStudy } from '@/lib/data/case-studies'
import { CaseStudyContent } from '@/components/case-study/CaseStudyContent'
import {
  GutenbergContent,
  NycDcwpBusinessLicensesContent,
  PrattVisitorExperienceContent,
  SnakesShowcaseContent,
} from '@/components/case-study/content'

interface CaseStudyContentRendererProps {
  caseStudy: CaseStudy
  children?: React.ReactNode
  isContentRevealed: boolean
  onToggleContent: () => void
}

export function CaseStudyContentRenderer({
  caseStudy,
  children,
  isContentRevealed,
  onToggleContent,
}: CaseStudyContentRendererProps) {
  switch (caseStudy.slug) {
    case 'gutenberg-cms-usability-evaluation':
      return (
        <GutenbergContent
          isContentRevealed={isContentRevealed}
          onToggleContent={onToggleContent}
        />
      )

    case 'pratt-institute-visitor-experience':
      return (
        <PrattVisitorExperienceContent
          isContentRevealed={isContentRevealed}
          onToggleContent={onToggleContent}
        />
      )

    case 'nyc-dcwp-business-licenses':
      return <NycDcwpBusinessLicensesContent />

    case 'snakes':
      return (
        <SnakesShowcaseContent
          isContentRevealed={isContentRevealed}
          onToggleContent={onToggleContent}
        />
      )

    default:
      return children ? (
        <m.section
          className="w-full px-6 2xl:px-[140px] py-16 md:py-24 max-w-[1920px] mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <CaseStudyContent>{children}</CaseStudyContent>
        </m.section>
      ) : null
  }
}
