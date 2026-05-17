'use client'

import { m } from 'framer-motion'
import dynamic from 'next/dynamic'
import type { CaseStudy } from '@/lib/data/case-studies'
import { CaseStudyContent } from '@/components/case-study/CaseStudyContent'

const AloYogaContent = dynamic(() =>
  import('@/components/case-study/content/AloYogaContent').then(
    (module) => module.AloYogaContent
  )
)
const AquitaniaContent = dynamic(() =>
  import('@/components/case-study/content/AquitaniaContent').then(
    (module) => module.AquitaniaContent
  )
)
const GutenbergContent = dynamic(() =>
  import('@/components/case-study/content/GutenbergContent').then(
    (module) => module.GutenbergContent
  )
)
const ImdbIaRedesignContent = dynamic(() =>
  import('@/components/case-study/content/ImdbIaRedesignContent').then(
    (module) => module.ImdbIaRedesignContent
  )
)
const MetFreeToursContent = dynamic(() =>
  import('@/components/case-study/content/MetFreeToursContent').then(
    (module) => module.MetFreeToursContent
  )
)
const NycDcwpBusinessLicensesContent = dynamic(() =>
  import('@/components/case-study/content/NycDcwpBusinessLicensesContent').then(
    (module) => module.NycDcwpBusinessLicensesContent
  )
)
const NycThirdSpacesContent = dynamic(() =>
  import('@/components/case-study/content/NycThirdSpacesContent').then(
    (module) => module.NycThirdSpacesContent
  )
)
const PrattVisitorExperienceContent = dynamic(() =>
  import('@/components/case-study/content/PrattVisitorExperienceContent').then(
    (module) => module.PrattVisitorExperienceContent
  )
)
const SnakesShowcaseContent = dynamic(() =>
  import('@/components/case-study/content/SnakesShowcaseContent').then(
    (module) => module.SnakesShowcaseContent
  )
)
const UAlbertaLibraryContent = dynamic(() =>
  import('@/components/case-study/content/UAlbertaLibraryContent').then(
    (module) => module.UAlbertaLibraryContent
  )
)
const EmpoweringBlvContent = dynamic(() =>
  import('@/components/case-study/content/EmpoweringBlvContent').then(
    (module) => module.EmpoweringBlvContent
  )
)

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
