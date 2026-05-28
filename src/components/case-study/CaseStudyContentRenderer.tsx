'use client'

import { m } from 'framer-motion'
import type { CaseStudy } from '@/lib/data/case-studies'
import { CaseStudyContent } from '@/components/case-study/CaseStudyContent'
import { CONTENT_REGISTRY } from '@/components/case-study/content'

interface CaseStudyContentRendererProps {
  caseStudy: CaseStudy
  children?: React.ReactNode
  isContentRevealed?: boolean
  onToggleContent?: () => void
}

/**
 * CaseStudyContentRenderer
 * 
 * A deep module that renders the content of a case study based on its slug.
 * It uses the CONTENT_REGISTRY to decouple structural logic from specific content modules.
 */
export function CaseStudyContentRenderer({
  caseStudy,
  children,
  isContentRevealed = false,
  onToggleContent = () => {},
}: CaseStudyContentRendererProps) {
  const ContentComponent = CONTENT_REGISTRY[caseStudy.slug]

  if (ContentComponent) {
    return (
      <ContentComponent
        isContentRevealed={isContentRevealed}
        onToggleContent={onToggleContent}
      />
    )
  }

  // Fallback for children-based content or missing slugs
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
