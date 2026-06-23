'use client'

import { m } from 'framer-motion'
import { CaseStudyReadMore } from '@/components/case-study/CaseStudyReadMore'
import { GutenbergClosingSection } from './gutenberg/GutenbergClosingSection'
import { GutenbergFinding1Section } from './gutenberg/GutenbergFinding1Section'
import { GutenbergFinding2Section } from './gutenberg/GutenbergFinding2Section'
import { GutenbergFinding3IntroSection } from './gutenberg/GutenbergFinding3IntroSection'
import { GutenbergFinding3RecommendationSection } from './gutenberg/GutenbergFinding3RecommendationSection'
import { GutenbergFinding3SubfindingsSection } from './gutenberg/GutenbergFinding3SubfindingsSection'
import { GutenbergMethodologyIntroSection } from './gutenberg/GutenbergMethodologyIntroSection'
import { GutenbergMethodologySusSection } from './gutenberg/GutenbergMethodologySusSection'
import { GutenbergOverviewSection } from './gutenberg/GutenbergOverviewSection'
import { GutenbergProjectOverviewSection } from './gutenberg/GutenbergProjectOverviewSection'
import { GutenbergResearchObjectivesSection } from './gutenberg/GutenbergResearchObjectivesSection'

interface GutenbergContentProps {
  isContentRevealed: boolean
  onToggleContent: () => void
}

const sectionDividerClass = 'border-t my-24 md:my-32'
const findingDividerClass = 'border-t my-16 md:my-24'
const dividerColor = { borderColor: 'rgb(var(--color-text-color10))' } as const

export function GutenbergContent({
  isContentRevealed,
  onToggleContent,
}: GutenbergContentProps) {
  return (
    <m.section
      className="w-full px-6 2xl:px-[140px] py-16 md:py-24 max-w-[1920px] mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <div className="max-w-[1044px] mx-auto text-left">
        <GutenbergOverviewSection />

        <CaseStudyReadMore
          readTime="10 min read"
          isContentRevealed={isContentRevealed}
          onToggleContent={onToggleContent}
        >
          <div>
            <GutenbergProjectOverviewSection />
            <GutenbergResearchObjectivesSection />

            <div className="mt-12 md:mt-16">
              <GutenbergMethodologyIntroSection />
              <GutenbergMethodologySusSection />
            </div>

            <div className={sectionDividerClass} style={dividerColor} />

            <div className="mt-12 md:mt-16">
              <GutenbergFinding1Section />
              <div className={findingDividerClass} style={dividerColor} />
              <GutenbergFinding2Section />
              <div className={findingDividerClass} style={dividerColor} />
              <div className="mt-16 md:mt-24">
                <GutenbergFinding3IntroSection />
                <GutenbergFinding3SubfindingsSection />
                <GutenbergFinding3RecommendationSection />
              </div>
            </div>

            <GutenbergClosingSection />
          </div>
        </CaseStudyReadMore>
      </div>
    </m.section>
  )
}
