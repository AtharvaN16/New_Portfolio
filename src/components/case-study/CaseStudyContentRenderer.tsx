'use client'

import { m } from 'framer-motion'
import type { CaseStudy } from '@/lib/data/case-studies'
import { CaseStudyContent } from '@/components/case-study/CaseStudyContent'
import {
  AloYogaContent,
  AquitaniaContent,
  GutenbergContent,
  ImdbIaRedesignContent,
  MetFreeToursContent,
  NycDcwpBusinessLicensesContent,
  NycThirdSpacesContent,
  PrattVisitorExperienceContent,
  SnakesShowcaseContent,
  UAlbertaLibraryContent,
  EmpoweringBlvContent,
} from '@/components/case-study/content'

interface CaseStudyContentRendererProps {
  caseStudy: CaseStudy
  children?: React.ReactNode
  isContentRevealed?: boolean
  onToggleContent?: () => void
}

export function CaseStudyContentRenderer({
  caseStudy,
  children,
  isContentRevealed = false,
  onToggleContent = () => {},
}: CaseStudyContentRendererProps) {
  switch (caseStudy.slug) {
    case 'gutenberg-cms-usability-evaluation':
      return (
        <GutenbergContent
          isContentRevealed={isContentRevealed}
          onToggleContent={onToggleContent}
          progressBarColor={
            caseStudy.progressBarColor || 'rgb(var(--color-primary))'
          }
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
      return (
        <NycDcwpBusinessLicensesContent
          isContentRevealed={isContentRevealed}
          onToggleContent={onToggleContent}
          progressBarColor={
            caseStudy.progressBarColor || 'rgb(var(--color-primary))'
          }
        />
      )

    case 'nyc-third-spaces-ethnography':
      return (
        <NycThirdSpacesContent
          isContentRevealed={isContentRevealed}
          onToggleContent={onToggleContent}
        />
      )

    case 'snakes':
      return <SnakesShowcaseContent />

    case 'alo-yoga-digital-analytics':
      return (
        <AloYogaContent
          isContentRevealed={isContentRevealed}
          onToggleContent={onToggleContent}
          progressBarColor={
            caseStudy.progressBarColor || 'rgb(var(--color-alo-progress))'
          }
        />
      )

    case 'imdb-ia-redesign':
      return <ImdbIaRedesignContent />

    case 'met-free-tours-usability':
      return (
        <MetFreeToursContent
          isContentRevealed={isContentRevealed}
          onToggleContent={onToggleContent}
        />
      )

    case 'ualberta-library-website':
      return (
        <UAlbertaLibraryContent
          isContentRevealed={isContentRevealed}
          onToggleContent={onToggleContent}
        />
      )

    case 'blv-museum-accessibility':
      return (
        <EmpoweringBlvContent
          isContentRevealed={isContentRevealed}
          onToggleContent={onToggleContent}
          progressBarColor={caseStudy.progressBarColor || '#FF8C00'}
        />
      )

    case 'aquitania-design-system':
      return (
        <AquitaniaContent
          isContentRevealed={isContentRevealed}
          onToggleContent={onToggleContent}
          progressBarColor={caseStudy.progressBarColor || '#9B2335'}
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
