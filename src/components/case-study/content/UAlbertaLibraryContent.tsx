'use client'

import Image from 'next/image'
import { useState, useRef } from 'react'
import { AnimatedText } from '@/components/ui/AnimatedText'
import {
  CaseStudyCell,
  CaseStudyContent,
  CaseStudyGrid,
  CaseStudySection,
  CaseStudySplit,
} from '@/components/case-study/layout'
import { LibraryBasicsPrototype } from './LibraryBasicsPrototype'
import LibraryServicesDirectory from './LibraryServicesDirectory'
import LibraryServicesNavbar from './LibraryServicesNavbar'
import LibraryServicesHero from './LibraryServicesHero'
import LibraryServicesPagePrototype from './LibraryServicesPagePrototype'
import LibraryHoursPagePrototype from './LibraryHoursPagePrototype'
import SubjectGuidesPrototype from './SubjectGuidesPrototype'
import { ResearchObjectiveNotes } from './ResearchObjectiveNotes'
import { SectionSpacer } from '@/components/case-study/SectionSpacer'
import { UAlbertaResearchSection } from './UAlbertaResearchSection'
import { UAlbertaFindingsInsightsGrid } from './ualberta/UAlbertaFindingsInsightsGrid'
import { MaterialSymbolsFont } from '@/components/case-study/MaterialSymbolsFont'
import {
  CASE_STUDY_SECTION_LABEL_PROSE,
  CASE_STUDY_BODY_LEADING,
  CASE_STUDY_SECTION_HEADLINE,
  CASE_STUDY_SECTION_HEADLINE_SPACED,
  CASE_STUDY_NARRATIVE_SECTION_GAP,
} from '@/components/case-study/caseStudyTypography'

/** Readable line length — aligned with NYC DCWP case study */
const PROSE_MAX = 'max-w-[680px]'
const SECTION_LABEL = CASE_STUDY_SECTION_LABEL_PROSE
const BODY_TEXT = `text-base md:text-[18px] font-normal text-text-body ${CASE_STUDY_BODY_LEADING} ${PROSE_MAX}`
const BODY_FULL = `text-base md:text-[18px] font-normal ${CASE_STUDY_BODY_LEADING} w-full`
const BODY_MUTED = `text-base md:text-[18px] font-normal ${CASE_STUDY_BODY_LEADING} ${PROSE_MAX}`
/** Section hero headlines — 24px (text-2xl) */
const HEADLINE_LG = `${CASE_STUDY_SECTION_HEADLINE_SPACED} ${PROSE_MAX}`
const HEADLINE_SPLIT = `${CASE_STUDY_SECTION_HEADLINE} mb-4 md:mb-0`
const HEADLINE_MD = `${CASE_STUDY_SECTION_HEADLINE_SPACED} ${PROSE_MAX}`

function ImagePlaceholder({
  aspectRatio = '16/9',
  label = 'Placeholder image',
  className = '',
}: {
  aspectRatio?: string
  label?: string
  className?: string
}) {
  return (
    <div
      className={`w-full rounded-lg flex items-center justify-center ${className}`}
      style={{
        aspectRatio,
        backgroundColor: 'rgb(var(--color-surface-elevated))',
        border: '1px dashed rgb(var(--color-text-color20))',
      }}
      role="img"
      aria-label={label}
    >
      <span
        className="text-sm font-medium px-4 text-center"
        style={{ color: 'rgb(var(--color-text-tertiary))' }}
      >
        {label}
      </span>
    </div>
  )
}

function Quote({
  text,
  participant,
  context,
}: {
  text: string
  participant: string
  context: string
}) {
  return (
    <div className={`flex items-start gap-6 ${PROSE_MAX}`}>
      <div
        className="w-[2px] self-stretch flex-shrink-0"
        style={{ backgroundColor: 'rgb(var(--color-text-color20))' }}
      />
      <div className="flex-1">
        <p
          className="text-[18px] italic leading-normal mb-2"
          style={{ color: 'rgb(var(--color-text-color60))' }}
        >
          &ldquo;{text}&rdquo;
        </p>
        <span
          className="text-[16px] font-semibold"
          style={{ color: 'rgb(var(--color-text-primary))' }}
        >
          &ndash; {participant}
        </span>
        <span
          className="text-[14px] font-normal ml-2"
          style={{ color: 'rgb(var(--color-text-tertiary))' }}
        >
          {context}
        </span>
      </div>
    </div>
  )
}

export function UAlbertaLibraryContent() {
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>({});
  const directoryRef = useRef<HTMLDivElement>(null);

  const toggleBookmark = (title: string) => {
    setBookmarks(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const scrollToDirectory = () => {
    directoryRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <CaseStudySection
      animated
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <MaterialSymbolsFont />
      <CaseStudyContent>
              {/* Project Overview */}
              <h3
                className={SECTION_LABEL}
                style={{ color: 'rgb(var(--color-text-tertiary))' }}
              >
                The Mission
              </h3>

              <AnimatedText variant="heading"
                text="Making library services easier to find"
                animationType="fadeIn"
                alwaysAnimate={false}
                delay={0}
                className={HEADLINE_LG}
              />

              <p
                className={`${BODY_FULL}`}
                style={{ color: 'rgb(var(--color-text-color90))' }}
              >
                The University of Alberta is one of Canada&apos;s largest research
                universities serving 40,000+ students, faculty, and researchers
                across 4 campuses. Its library website is the primary digital entry
                point for accessing research support, finding hours, and using
                library services. The library wanted to understand how students
                actually navigate the site and what improvements would reduce
                confusion.
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
                    <p
                      className={BODY_FULL}
                      style={{ color: 'rgb(var(--color-text-color90))' }}
                    >
                      The library website has a lot of resources but students use the
                      site for only a handful of tasks. They don&apos;t explore because
                      they don&apos;t know what&apos;s available and the website fails to
                      inform them. Across four key pages, we saw a similar pattern.
                      When students need help, they turn to library staff or their
                      professors instead of using the website.
                    </p>
                  </div>
                </div>

                <UAlbertaFindingsInsightsGrid />
              </div>

              <SectionSpacer />
              {/* Research Objectives */}
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
              <SectionSpacer />
              {/* Finding 1 */}
              <h3
                className={SECTION_LABEL}
                style={{ color: 'rgb(var(--color-text-tertiary))' }}
              >
                Finding 1 — Homepage
              </h3>

              <AnimatedText variant="heading"
                text="The hero section held users' attention, but the page offered little utility beyond the fold"
                animationType="fadeIn"
                alwaysAnimate={false}
                delay={0}
                className={HEADLINE_LG}
              />

              <ImagePlaceholder
                label="Homepage — current design showing hero and below-the-fold content"
                aspectRatio="16/9"
                className="mb-8 md:mb-12"
              />

              <div
                className={`mb-8 md:mb-12 space-y-3 ${PROSE_MAX}`}
                style={{ color: 'rgb(var(--color-text-color90))' }}
              >
                <p className={BODY_MUTED}>
                  The homepage search bar and navigation were appreciated by
                  participants as clear and useful. However, the content below
                  the hero section felt disconnected from everyday student
                  needs. Most participants did not scroll intuitively — they
                  found what they needed in the first viewport and stopped
                  there.
                </p>
                <p className={BODY_MUTED}>
                  The &ldquo;Did You Know&rdquo; and featured content sections
                  skewed toward research-heavy users rather than addressing the
                  full range of student use cases like booking study rooms or
                  finding printing services.
                </p>
              </div>

              <div className="space-y-6 md:space-y-8 mb-12 md:mb-16">
                <Quote
                  text="I like that everything I need is visible in this first view... I usually don't go below it."
                  participant="Interviewee #1"
                  context="on the homepage"
                />
              </div>

              {/* Recommendation 01 */}
              <h3
                className={SECTION_LABEL}
                style={{ color: 'rgb(var(--color-text-tertiary))' }}
              >
                Recommendation 01 — Homepage
              </h3>

              <AnimatedText variant="heading"
                text="Make the homepage useful beyond the first viewport"
                animationType="fadeIn"
                alwaysAnimate={false}
                delay={0}
                className={HEADLINE_MD}
              />

              <ImagePlaceholder
                label="Homepage — before and after recommendation comparison"
                aspectRatio="16/9"
                className="mb-8 md:mb-12"
              />

              <ul className={`space-y-3 mb-12 md:mb-16 ${PROSE_MAX}`}>
                {[
                  'Add a prominent site search option since students were Googling services directly',
                  'Elevate "How to use the library" into the navigation to increase discoverability',
                  'Add descriptions and icons to featured service links so they communicate value at a glance',
                  'Introduce a "Starting Your Research" section with guides, services, and tools for academic use',
                  'Replace research-heavy promotional content with services relevant to everyday student needs',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-4">
                    <span
                      className="mt-[0.6em] h-1.5 w-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: 'rgb(var(--color-text-secondary))' }}
                    />
                    <p
                      className={BODY_MUTED}
                      style={{ color: 'rgb(var(--color-text-color90))' }}
                    >
                      {point}
                    </p>
                  </li>
                ))}
              </ul>
              <SectionSpacer />
              {/* Finding 2 */}
              <h3
                className={SECTION_LABEL}
                style={{ color: 'rgb(var(--color-text-tertiary))' }}
              >
                Finding 2 — Hours &amp; Locations
              </h3>

              <AnimatedText variant="heading"
                text="Students wanted quick answers about which library to visit — and got confusion instead"
                animationType="fadeIn"
                alwaysAnimate={false}
                delay={0}
                className={HEADLINE_LG}
              />

              <ImagePlaceholder
                label="Hours & Locations page — current design showing library list"
                aspectRatio="16/9"
                className="mb-8 md:mb-12"
              />

              <p
                className={`${BODY_MUTED} mb-8 md:mb-10`}
                style={{ color: 'rgb(var(--color-text-color90))' }}
              >
                Students naturally turned to the Hours &amp; Locations page
                when planning a library visit, but the page made it difficult
                to quickly determine which library to go to. Satellite campuses
                appeared at the top of the list, above more commonly used
                central libraries, creating confusion about library types and
                relevance.
              </p>

              <CaseStudyGrid
                width="fill"
                className="mb-12 md:mb-16 items-start gap-6 md:gap-8"
              >
                <CaseStudyCell span={6}>
                  <div className="flex items-start gap-4 md:gap-6">
                    <div className="flex items-end gap-[10px]">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className="w-[12px] h-[100px]"
                          style={{
                            backgroundColor:
                              i < 4
                                ? 'rgb(var(--color-info))'
                                : 'rgb(var(--color-text-color20))',
                          }}
                        />
                      ))}
                    </div>
                    <div>
                      <div
                        className="text-2xl md:text-2xl font-bold leading-none mb-1 tracking-[-0.05em]"
                        style={{ color: 'rgb(var(--color-text-primary))' }}
                      >
                        4/8
                      </div>
                      <div
                        className="text-lg md:text-xl font-medium"
                        style={{ color: 'rgb(var(--color-text-secondary))' }}
                      >
                        Students
                      </div>
                    </div>
                  </div>
                </CaseStudyCell>
                <CaseStudyCell span={6}>
                  <p
                    className={`text-[18px] font-normal ${CASE_STUDY_BODY_LEADING} ${PROSE_MAX}`}
                    style={{ color: 'rgb(var(--color-text-color90))' }}
                  >
                    4 participants specifically noted confusion about campus
                    location groupings and how to quickly identify hours for
                    their most relevant library.
                  </p>
                </CaseStudyCell>
              </CaseStudyGrid>

              <div className="space-y-6 md:space-y-8 mb-12 md:mb-16">
                <Quote
                  text="It feels weird that these 2 (Augustana and BSJ) libraries are on top of more common libraries"
                  participant="Interviewee #7"
                  context="on the library list order"
                />
              </div>

              {/* Recommendation 02 */}
              <h3
                className={SECTION_LABEL}
                style={{ color: 'rgb(var(--color-text-tertiary))' }}
              >
                Recommendation 02 — Hours &amp; Locations
              </h3>

              <AnimatedText variant="heading"
                text="Group libraries by campus and surface today's hours upfront"
                animationType="fadeIn"
                alwaysAnimate={false}
                delay={0}
                className={HEADLINE_MD}
              />

              <ImagePlaceholder
                label="Hours & Locations — before and after with campus grouping"
                aspectRatio="16/9"
                className="mb-8 md:mb-12"
              />

              <ul className={`space-y-3 mb-12 md:mb-16 ${PROSE_MAX}`}>
                {[
                  "Display today's hours directly on each library card to reduce click-through friction",
                  'Group libraries by campus type (Edmonton vs. Augustana & Saint-Jean) so students can immediately find relevant locations',
                  'Remove the redundant "View hours" button since clicking the library name navigates to the same page',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-4">
                    <span
                      className="mt-[0.6em] h-1.5 w-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: 'rgb(var(--color-text-secondary))' }}
                    />
                    <p
                      className={BODY_MUTED}
                      style={{ color: 'rgb(var(--color-text-color90))' }}
                    >
                      {point}
                    </p>
                  </li>
                ))}
              </ul>

              <div id="ualberta-hours-prototype" className="mb-12 md:mb-16">
                <LibraryHoursPagePrototype />
              </div>

              <SectionSpacer />

              <div className="flex w-full justify-center">
                <Image
                  src="/images/case-studies/ualberta-library-website/full-hours-locations-prototype.avif"
                  alt="Hours and locations prototype with sidebar navigation, map link, and campus jump categories"
                  width={1618}
                  height={1704}
                  className="h-auto w-full max-h-[min(760px,calc(82dvh-6rem))] object-contain"
                  sizes="(max-width: 896px) 100vw, 896px"
                />
              </div>

              <SectionSpacer />
              {/* Finding 3 */}
              <h3
                className={SECTION_LABEL}
                style={{ color: 'rgb(var(--color-text-tertiary))' }}
              >
                Finding 3 — Subject Guides
              </h3>

              <AnimatedText variant="heading"
                text="Unexpected groupings made subject guides feel like a maze rather than a resource"
                animationType="fadeIn"
                alwaysAnimate={false}
                delay={0}
                className={HEADLINE_LG}
              />

              <ImagePlaceholder
                label="Subject Guides page — current broad category groupings"
                aspectRatio="16/9"
                className="mb-8 md:mb-12"
              />

              <p
                className={`${BODY_MUTED} mb-8 md:mb-10`}
                style={{ color: 'rgb(var(--color-text-color90))' }}
              >
                Navigating to a specific subject guide required multiple steps
                that felt unintuitive. The broad category groupings did not
                match students&apos; mental models — subjects appeared in
                unexpected places, and the page lacked a clear entry point for
                users unfamiliar with how library guides are structured.
                Content within categories also felt dated and not relevant to
                modern research workflows.
              </p>

              <div className="space-y-6 md:space-y-8 mb-12 md:mb-16">
                <Quote
                  text="I didn't think computer science guides would be under science"
                  participant="Interviewee #5"
                  context="when searching for a guide related to their major"
                />
              </div>

              {/* Recommendation 03 */}
              <h3
                className={SECTION_LABEL}
                style={{ color: 'rgb(var(--color-text-tertiary))' }}
              >
                Recommendation 03 — Subject Guides
              </h3>

              <AnimatedText variant="heading"
                text="Add search, collapsible structure, and a clear intro to what guides are"
                animationType="fadeIn"
                alwaysAnimate={false}
                delay={0}
                className={HEADLINE_MD}
              />

              <ImagePlaceholder
                label="Subject Guides — redesigned with search and drawer structure"
                aspectRatio="16/9"
                className="mb-8 md:mb-12"
              />

              <ul className={`space-y-3 mb-12 md:mb-16 ${PROSE_MAX}`}>
                {[
                  'Add a page description explaining what subject guides are and how to use them',
                  'Introduce search and sort options so students can find specific guides without scrolling',
                  'Show individual guides in collapsible drawers to reduce visual density while keeping content accessible',
                  'Include A-Z Databases upfront in each subject guide to reduce the number of clicks needed',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-4">
                    <span
                      className="mt-[0.6em] h-1.5 w-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: 'rgb(var(--color-text-secondary))' }}
                    />
                    <p
                      className={BODY_MUTED}
                      style={{ color: 'rgb(var(--color-text-color90))' }}
                    >
                      {point}
                    </p>
                  </li>
                ))}
              </ul>

              <div id="ualberta-subject-guides-prototype" className="mb-12 md:mb-16">
                <SubjectGuidesPrototype />
              </div>

              <SectionSpacer />

              <div className="flex w-full justify-center">
                <Image
                  src="/images/case-studies/ualberta-library-website/full-subject-guides-prototype.avif"
                  alt="Full subject guides prototype with search, collapsible subject drawers, and guide links"
                  width={1582}
                  height={1704}
                  className="h-auto w-full max-h-[calc(100dvh-6rem)] object-contain"
                  sizes="(max-width: 896px) 100vw, 896px"
                />
              </div>

              <SectionSpacer />
              {/* Finding 4 */}
              <h3
                className={SECTION_LABEL}
                style={{ color: 'rgb(var(--color-text-tertiary))' }}
              >
                Finding 4 — Library Services
              </h3>

              <AnimatedText variant="heading"
                text="The Services page overwhelmed new users with links and no clear starting point"
                animationType="fadeIn"
                alwaysAnimate={false}
                delay={0}
                className={HEADLINE_LG}
              />

              <ImagePlaceholder
                label="Library Services page — current design with all services listed flat"
                aspectRatio="16/9"
                className="mb-8 md:mb-12"
              />

              <p
                className={`${BODY_MUTED} mb-8 md:mb-10`}
                style={{ color: 'rgb(var(--color-text-color90))' }}
              >
                The All Services page worked reasonably well for users who
                already knew what they were looking for. For anyone discovering
                services for the first time, the volume of links with terse or
                duplicate names created significant cognitive load with no
                clear hierarchy or prioritization to guide them.
              </p>

              <div className="space-y-6 md:space-y-8 mb-12 md:mb-16">
                <Quote
                  text="It's too much, hard to read, cluttered, and difficult to navigate"
                  participant="Interviewee #2"
                  context="on the organization of the Services page"
                />
              </div>

              {/* Recommendation 04 */}
              <h3
                className={SECTION_LABEL}
                style={{ color: 'rgb(var(--color-text-tertiary))' }}
              >
                Recommendation 04 — Library Services
              </h3>

              <AnimatedText variant="heading"
                text="Prioritize popular services and add audience-based filtering"
                animationType="fadeIn"
                alwaysAnimate={false}
                delay={0}
                className={HEADLINE_MD}
              />

              <CaseStudySplit
                preset="60-40"
                breakpoint="lg"
                className="items-start gap-12 mb-12 md:mb-16"
                left={
                  <div className="lg:sticky lg:top-32">
                    <LibraryBasicsPrototype />
                  </div>
                }
                right={
                  <div className={PROSE_MAX}>
                    <ul className="space-y-6">
                      {[
                        'Surface the most commonly used services (study rooms, citation guides, printing) at the top of the page',
                        'Add short descriptions to every service so purpose is immediately clear without clicking',
                        'Add a sticky sidebar for quick category navigation without full-page scrolling',
                        'Introduce audience-type filtering (Students, Faculty, Alumni, Researchers) so users see only what is relevant to them',
                      ].map((point) => (
                        <li key={point} className="flex items-start gap-4">
                          <span
                            className="mt-[0.6em] h-1.5 w-1.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: 'rgb(var(--color-text-secondary))' }}
                          />
                          <p
                            className={BODY_MUTED}
                            style={{ color: 'rgb(var(--color-text-color90))' }}
                          >
                            {point}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                }
              />
              <SectionSpacer />
              {/* Full Directory Prototype */}
              <h3
                className={SECTION_LABEL}
                style={{ color: 'rgb(var(--color-text-tertiary))' }}
              >
                Deep Dive — Full Directory
              </h3>

              <AnimatedText variant="heading"
                text="An interactive exploration of the recommended directory structure"
                animationType="fadeIn"
                alwaysAnimate={false}
                delay={0}
                className={HEADLINE_MD}
              />

              <div className="mb-12 md:mb-16">
                {/* Standalone Directory Wrapper */}
                <div 
                  className="relative w-full overflow-hidden rounded-none border-none shadow-2xl"
                  data-lenis-prevent="true"
                  style={{
                    background: 'linear-gradient(295deg, #225432 11.56%, #36A459 88.84%)',
                    height: '1000px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end'
                  }}
                >
                  <div className="w-full px-12">
                    <LibraryServicesDirectory height="900px" paddingX="40px" />
                  </div>
                </div>
              </div>
              <SectionSpacer />
              {/* Summary */}
              <h3
                className={SECTION_LABEL}
                style={{ color: 'rgb(var(--color-text-tertiary))' }}
              >
                Summary
              </h3>

              <AnimatedText variant="heading"
                text="The website works for power users — fixing it for everyone else requires clarity, not complexity"
                animationType="fadeIn"
                alwaysAnimate={false}
                delay={0}
                className={HEADLINE_LG}
              />

              <p
                className={`${BODY_MUTED} mb-6`}
                style={{ color: 'rgb(var(--color-text-color90))' }}
              >
                The University of Alberta Library website effectively surfaces
                its search functionality and primary navigation. The usability
                gaps are not architectural — they are about what happens when a
                student arrives without a clear intent or prior library
                experience.
              </p>

              <p
                className={BODY_MUTED}
                style={{ color: 'rgb(var(--color-text-color90))' }}
              >
                The four recommendations — making the homepage more useful
                beyond the fold, grouping locations by campus, restructuring
                subject guides with search and collapsible content, and
                prioritizing services with audience filtering — target the
                moments where the website currently asks students to already
                know what they are looking for. Each change reduces that
                requirement.
              </p>
              <SectionSpacer />
              {/* Full Experience Prototype */}
              <h3
                className={SECTION_LABEL}
                style={{ color: 'rgb(var(--color-text-tertiary))' }}
              >
                Full Experience Prototype
              </h3>

              <AnimatedText variant="heading"
                text="The complete vision: Hero discovery integrated with the full directory"
                animationType="fadeIn"
                alwaysAnimate={false}
                delay={0}
                className={HEADLINE_MD}
              />

              <div
                id="ualberta-final-solution"
                className="mb-12 scroll-mt-32 md:mb-16"
              >
                <LibraryServicesPagePrototype />
              </div>

              <SectionSpacer />

              <div className="flex w-full justify-center">
                <Image
                  src="/images/case-studies/ualberta-library-website/full-experience-prototype.avif"
                  alt="Full library services page prototype showing hero discovery and the complete services directory"
                  width={1006}
                  height={1704}
                  className="h-auto w-full max-h-[calc(100dvh-6rem)] object-contain"
                  sizes="(max-width: 896px) 100vw, 896px"
                />
              </div>
      </CaseStudyContent>
    </CaseStudySection>
  )
}
