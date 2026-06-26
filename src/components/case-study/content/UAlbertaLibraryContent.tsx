'use client'

import { AnimatedText } from '@/components/ui/AnimatedText'
import {
  CaseStudyContent,
  CaseStudySection,
} from '@/components/case-study/layout'
import { ResearchObjectiveNotes } from './ResearchObjectiveNotes'
import { SectionSpacer } from '@/components/case-study/SectionSpacer'
import { UAlbertaResearchSection } from './UAlbertaResearchSection'
import { UAlbertaFindingsInsightsGrid } from './ualberta/UAlbertaFindingsInsightsGrid'
import { UAlbertaSolutionSection } from './ualberta/UAlbertaSolutionSection'
import { UAlbertaSubjectGuidesReelSection } from './ualberta/UAlbertaSubjectGuidesReelSection'
import { UAlbertaServicesDiscoveryReelSection } from './ualberta/UAlbertaServicesDiscoveryReelSection'
import { UAlbertaServicesDirectoryReelSection } from './ualberta/UAlbertaServicesDirectoryReelSection'
import { UAlbertaBookmarksDesignDecision } from './ualberta/UAlbertaBookmarksDesignDecision'
import {
  CASE_STUDY_SECTION_LABEL_PROSE,
  CASE_STUDY_BODY_LEADING,
  CASE_STUDY_SECTION_HEADLINE,
  CASE_STUDY_SECTION_HEADLINE_SPACED,
  CASE_STUDY_NARRATIVE_SECTION_GAP,
} from '@/components/case-study/caseStudyTypography'

const SECTION_LABEL = CASE_STUDY_SECTION_LABEL_PROSE
const BODY_FULL = `text-base md:text-[18px] font-normal ${CASE_STUDY_BODY_LEADING} w-full`
const BODY_MUTED = `text-base md:text-[18px] font-normal ${CASE_STUDY_BODY_LEADING} max-w-[680px]`
const HEADLINE_LG = `${CASE_STUDY_SECTION_HEADLINE_SPACED} max-w-[680px]`
const HEADLINE_SPLIT = `${CASE_STUDY_SECTION_HEADLINE} mb-4 md:mb-0`

export function UAlbertaLibraryContent() {
  return (
    <CaseStudySection
      animated
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <CaseStudyContent>
        <h3
          className={SECTION_LABEL}
          style={{ color: 'rgb(var(--color-text-tertiary))' }}
        >
          The Mission
        </h3>

        <AnimatedText
          variant="heading"
          text="Making library services easier to find"
          animationType="fadeIn"
          alwaysAnimate={false}
          delay={0}
          className={HEADLINE_LG}
        />

        <p className={BODY_FULL} style={{ color: 'rgb(var(--color-text-color90))' }}>
          The University of Alberta is one of Canada&apos;s largest research universities
          serving 40,000+ students, faculty, and researchers across 4 campuses. Its library
          website is the primary digital entry point for accessing research support, finding
          hours, and using library services. The library wanted to understand how students
          actually navigate the site and what improvements would reduce confusion.
        </p>

        <div className={CASE_STUDY_NARRATIVE_SECTION_GAP}>
          <h3
            id="ualberta-key-insights-heading"
            className={SECTION_LABEL}
            style={{ color: 'rgb(var(--color-text-tertiary))' }}
          >
            Key Insights
          </h3>

          <div className="mt-6 grid grid-cols-1 gap-6 md:mt-8 md:grid-cols-[minmax(0,5fr)_minmax(0,2fr)_minmax(0,6fr)] md:items-start md:gap-0">
            <div>
              <AnimatedText
                variant="heading"
                text="Students are unaware of the various ways in which the library can support them"
                animationType="fadeIn"
                alwaysAnimate={false}
                delay={0}
                maxWidth="full"
                className={HEADLINE_SPLIT}
              />
            </div>
            <div className="hidden md:block" aria-hidden="true" />
            <div>
              <p className={BODY_FULL} style={{ color: 'rgb(var(--color-text-color90))' }}>
                The library website has a lot of resources but students use the site for only
                a handful of tasks. They don&apos;t explore because they don&apos;t know what&apos;s
                available and the website fails to inform them. Across four key pages, we saw a
                similar pattern. When students need help, they turn to library staff or their
                professors instead of using the website.
              </p>
            </div>
          </div>

          <UAlbertaFindingsInsightsGrid />
        </div>

        <UAlbertaSolutionSection />

        <UAlbertaSubjectGuidesReelSection />

        <UAlbertaServicesDiscoveryReelSection />

        <UAlbertaServicesDirectoryReelSection />

        <UAlbertaBookmarksDesignDecision />

        <SectionSpacer />

        <h3
          className={SECTION_LABEL}
          style={{ color: 'rgb(var(--color-text-tertiary))' }}
        >
          Research Objectives
        </h3>

        <p
          className={`${BODY_MUTED} mb-12 md:mb-16`}
          style={{ color: 'rgb(var(--color-text-color90))' }}
        >
          The study was structured around four goals:
        </p>

        <ResearchObjectiveNotes />

        <SectionSpacer />

        <UAlbertaResearchSection />
      </CaseStudyContent>
    </CaseStudySection>
  )
}
