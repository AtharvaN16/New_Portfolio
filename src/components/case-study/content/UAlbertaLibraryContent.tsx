'use client'

import { m } from 'framer-motion'
import { AnimatedTitle } from '@/components/ui/AnimatedTitle'
import { CaseStudyReadMore } from '@/components/case-study/CaseStudyReadMore'
import { LibraryBasicsPrototype } from './LibraryBasicsPrototype'

interface UAlbertaLibraryContentProps {
  isContentRevealed: boolean
  onToggleContent: () => void
}

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
    <div className="flex items-start gap-6">
      <div
        className="w-[2px] self-stretch flex-shrink-0"
        style={{ backgroundColor: 'rgb(var(--color-text-color20))' }}
      />
      <div className="flex-1">
        <p
          className="text-[18px] italic leading-relaxed mb-2"
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

function Divider() {
  return (
    <div
      className="border-t my-24 md:my-32"
      style={{ borderColor: 'rgb(var(--color-text-color10))' }}
    />
  )
}

export function UAlbertaLibraryContent({
  isContentRevealed,
  onToggleContent,
}: UAlbertaLibraryContentProps) {
  return (
    <m.section
      className="w-full px-6 2xl:px-[140px] py-16 md:py-24 max-w-[1920px] mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <div className="max-w-[1044px] mx-auto text-left">
        {/* Abstract */}
        <h3 className="text-lg md:text-[28px] font-bold text-text-primary mb-6 md:mb-[28px]">
          Abstract
        </h3>

        <div className="space-y-6 md:space-y-8">
          <p className="text-base md:text-[18px] font-normal text-text-body leading-relaxed">
            This case study documents a usability study of the University of
            Alberta Library website, conducted to understand how students
            navigate, discover resources, and access library services. The
            research focused on four core areas: the homepage, hours and
            locations, subject guides, and library services.
          </p>
          <p className="text-base md:text-[18px] font-normal text-text-body leading-relaxed">
            Through moderated user interviews with 8 UAlberta students, the
            study surfaced a consistent pattern: the website works well for
            users who already know what they are looking for, but creates
            significant friction for students who are new to the library or
            exploring what it offers. Four targeted recommendations were
            developed to address the most critical navigation and
            discoverability gaps.
          </p>
        </div>

        {/* My Role */}
        <div className="mt-12 md:mt-16">
          <h3 className="text-lg md:text-[24px] font-bold text-text-primary mb-6 md:mb-[28px]">
            My Role
          </h3>
          <p className="text-base md:text-[18px] font-medium text-text-body leading-relaxed mb-4">
            As part of a four-person research team, I contributed to:
          </p>
          <ul className="space-y-2 md:space-y-3 list-disc list-inside ml-2">
            {[
              'Research planning, goals definition, and screener design',
              'Moderated user interviews and participant recruitment',
              'Synthesizing findings across all four focus areas',
              'Developing design recommendations and prototype wireframes',
            ].map((item) => (
              <li
                key={item}
                className="text-base md:text-[18px] font-normal text-text-body leading-relaxed"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <CaseStudyReadMore
          readTime="10 min read"
          isContentRevealed={isContentRevealed}
          onToggleContent={onToggleContent}
        >
              {/* Project Overview */}
              <h3
                className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]"
                style={{ color: 'rgb(var(--color-text-tertiary))' }}
              >
                Project Overview
              </h3>

              <AnimatedTitle
                text="The library website works well for people who already know where to look"
                animationType="fadeIn"
                alwaysAnimate={false}
                delay={0}
                className="text-2xl md:text-[40px] font-bold text-text-primary mb-6 md:mb-8 leading-tight tracking-[-0.05em]"
              />

              <div className="space-y-6 md:space-y-8 mb-12 md:mb-16">
                <p
                  className="text-base md:text-[18px] font-normal leading-relaxed"
                  style={{ color: 'rgb(var(--color-text-color90))' }}
                >
                  The University of Alberta Library website serves as the
                  primary digital entry point for students accessing research
                  databases, booking study rooms, finding hours, and navigating
                  library services. With a large and diverse student population,
                  the website needs to support both power users and students who
                  have never used a library website before.
                </p>
                <p
                  className="text-base md:text-[18px] font-normal leading-relaxed"
                  style={{ color: 'rgb(var(--color-text-color90))' }}
                >
                  The client wanted to understand how well students could
                  navigate the site and find what they need, and what specific
                  improvements would reduce confusion and improve discoverability
                  across the four most-used sections.
                </p>
              </div>

              <ImagePlaceholder
                label="University of Alberta Library homepage — current design"
                aspectRatio="16/9"
                className="mb-12 md:mb-16"
              />

              <Divider />

              {/* Research Objectives */}
              <h3
                className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]"
                style={{ color: 'rgb(var(--color-text-tertiary))' }}
              >
                Research Objectives
              </h3>

              <p
                className="text-base md:text-[18px] font-normal leading-relaxed mb-8 md:mb-10"
                style={{ color: 'rgb(var(--color-text-color90))' }}
              >
                The study was structured around four goals:
              </p>

              <ul className="space-y-6 md:space-y-7">
                {[
                  {
                    title: 'Navigation and discoverability',
                    body: 'Determine whether new users can understand and navigate to the services and features offered by the library website.',
                  },
                  {
                    title: 'Feature usage and experience',
                    body: 'Learn about the features students use most frequently and their experience using them.',
                  },
                  {
                    title: 'Recommendations for clarity',
                    body: 'Provide recommendations to improve the organization, clarity, and usability of the website and its features.',
                  },
                  {
                    title: 'Services page usability',
                    body: 'Assess the usability of the "All Library Services" page for students across different levels of library familiarity.',
                  },
                ].map((obj) => (
                  <li key={obj.title} className="flex items-start gap-4">
                    <span
                      className="mt-[0.6em] h-1.5 w-1.5 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor:
                          'rgb(var(--color-text-secondary))',
                      }}
                    />
                    <div>
                      <div className="text-base md:text-[18px] font-semibold leading-relaxed text-text-body">
                        {obj.title}
                      </div>
                      <p
                        className="text-base md:text-[18px] font-normal mt-1 md:mt-1.5 leading-relaxed"
                        style={{ color: 'rgb(var(--color-text-tertiary))' }}
                      >
                        {obj.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <Divider />

              {/* Methodology */}
              <h3
                className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]"
                style={{ color: 'rgb(var(--color-text-tertiary))' }}
              >
                Methodology
              </h3>

              <AnimatedTitle
                text="Moderated interviews with screen sharing to observe real navigation behavior"
                animationType="fadeIn"
                alwaysAnimate={false}
                delay={0}
                className="text-2xl md:text-[40px] font-bold text-text-primary mb-6 md:mb-8 leading-tight tracking-[-0.05em]"
              />

              <div className="space-y-6 md:space-y-8 mb-12 md:mb-16">
                <p
                  className="text-base md:text-[18px] font-normal leading-relaxed"
                  style={{ color: 'rgb(var(--color-text-color90))' }}
                >
                  We conducted{' '}
                  <span className="font-bold">
                    8 moderated user interviews over Zoom
                  </span>
                  , recruiting participants through SLAC and the UAlberta
                  weekly digest. Each session included{' '}
                  <span className="font-bold">16 questions and tasks</span>{' '}
                  where participants shared their screen and talked aloud while
                  navigating the library website. A{' '}
                  <span className="font-bold">
                    4-question screener questionnaire
                  </span>{' '}
                  captured demographic information and library usage frequency
                  before sessions began.
                </p>
              </div>

              {/* Participant Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16">
                {[
                  { stat: '8', label: 'Participants', sub: '100% UAlberta students' },
                  { stat: '16', label: 'Tasks & Questions', sub: 'Per session' },
                  { stat: '4', label: 'Screener Questions', sub: 'Pre-session' },
                  { stat: '62.5%', label: 'Use Library "Sometimes"', sub: '5 of 8 participants' },
                ].map((item) => (
                  <div key={item.label} className="space-y-2">
                    <div
                      className="text-4xl md:text-5xl font-bold tracking-[-0.05em]"
                      style={{ color: 'rgb(var(--color-text-primary))' }}
                    >
                      {item.stat}
                    </div>
                    <p
                      className="text-[14px] font-bold leading-relaxed"
                      style={{ color: 'rgb(var(--color-text-secondary))' }}
                    >
                      {item.label}
                    </p>
                    <p
                      className="text-[13px] font-normal leading-relaxed"
                      style={{ color: 'rgb(var(--color-text-tertiary))' }}
                    >
                      {item.sub}
                    </p>
                  </div>
                ))}
              </div>

              <ImagePlaceholder
                label="Participant demographics — year distribution and usage frequency breakdown"
                aspectRatio="16/7"
                className="mb-12 md:mb-16"
              />

              <Divider />

              {/* Finding 1 */}
              <h3
                className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]"
                style={{ color: 'rgb(var(--color-text-tertiary))' }}
              >
                Finding 1 — Homepage
              </h3>

              <AnimatedTitle
                text="The hero section held users' attention, but the page offered little utility beyond the fold"
                animationType="fadeIn"
                alwaysAnimate={false}
                delay={0}
                className="text-2xl md:text-[40px] font-bold text-text-primary mb-6 md:mb-8 leading-tight tracking-[-0.05em]"
              />

              <ImagePlaceholder
                label="Homepage — current design showing hero and below-the-fold content"
                aspectRatio="16/9"
                className="mb-8 md:mb-12"
              />

              <div
                className="mb-8 md:mb-12 space-y-3"
                style={{ color: 'rgb(var(--color-text-color90))' }}
              >
                <p className="text-base md:text-[18px] font-normal leading-relaxed">
                  The homepage search bar and navigation were appreciated by
                  participants as clear and useful. However, the content below
                  the hero section felt disconnected from everyday student
                  needs. Most participants did not scroll intuitively — they
                  found what they needed in the first viewport and stopped
                  there.
                </p>
                <p className="text-base md:text-[18px] font-normal leading-relaxed">
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
                className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]"
                style={{ color: 'rgb(var(--color-text-tertiary))' }}
              >
                Recommendation 01 — Homepage
              </h3>

              <AnimatedTitle
                text="Make the homepage useful beyond the first viewport"
                animationType="fadeIn"
                alwaysAnimate={false}
                delay={0}
                className="text-2xl md:text-[36px] font-bold text-text-primary mb-6 md:mb-8 leading-tight tracking-[-0.05em]"
              />

              <ImagePlaceholder
                label="Homepage — before and after recommendation comparison"
                aspectRatio="16/9"
                className="mb-8 md:mb-12"
              />

              <ul className="space-y-3 mb-12 md:mb-16">
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
                      className="text-base md:text-[18px] font-normal leading-relaxed"
                      style={{ color: 'rgb(var(--color-text-color90))' }}
                    >
                      {point}
                    </p>
                  </li>
                ))}
              </ul>

              <Divider />

              {/* Finding 2 */}
              <h3
                className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]"
                style={{ color: 'rgb(var(--color-text-tertiary))' }}
              >
                Finding 2 — Hours &amp; Locations
              </h3>

              <AnimatedTitle
                text="Students wanted quick answers about which library to visit — and got confusion instead"
                animationType="fadeIn"
                alwaysAnimate={false}
                delay={0}
                className="text-2xl md:text-[40px] font-bold text-text-primary mb-6 md:mb-8 leading-tight tracking-[-0.05em]"
              />

              <ImagePlaceholder
                label="Hours & Locations page — current design showing library list"
                aspectRatio="16/9"
                className="mb-8 md:mb-12"
              />

              <p
                className="text-base md:text-[18px] font-normal leading-relaxed mb-8 md:mb-10"
                style={{ color: 'rgb(var(--color-text-color90))' }}
              >
                Students naturally turned to the Hours &amp; Locations page
                when planning a library visit, but the page made it difficult
                to quickly determine which library to go to. Satellite campuses
                appeared at the top of the list, above more commonly used
                central libraries, creating confusion about library types and
                relevance.
              </p>

              <div className="mb-12 md:mb-16 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
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
                      className="text-5xl md:text-6xl font-bold leading-none mb-1 tracking-[-0.05em]"
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
                <p
                  className="text-[18px] font-normal leading-relaxed"
                  style={{ color: 'rgb(var(--color-text-color90))' }}
                >
                  4 participants specifically noted confusion about campus
                  location groupings and how to quickly identify hours for
                  their most relevant library.
                </p>
              </div>

              <div className="space-y-6 md:space-y-8 mb-12 md:mb-16">
                <Quote
                  text="It feels weird that these 2 (Augustana and BSJ) libraries are on top of more common libraries"
                  participant="Interviewee #7"
                  context="on the library list order"
                />
              </div>

              {/* Recommendation 02 */}
              <h3
                className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]"
                style={{ color: 'rgb(var(--color-text-tertiary))' }}
              >
                Recommendation 02 — Hours &amp; Locations
              </h3>

              <AnimatedTitle
                text="Group libraries by campus and surface today's hours upfront"
                animationType="fadeIn"
                alwaysAnimate={false}
                delay={0}
                className="text-2xl md:text-[36px] font-bold text-text-primary mb-6 md:mb-8 leading-tight tracking-[-0.05em]"
              />

              <ImagePlaceholder
                label="Hours & Locations — before and after with campus grouping"
                aspectRatio="16/9"
                className="mb-8 md:mb-12"
              />

              <ul className="space-y-3 mb-12 md:mb-16">
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
                      className="text-base md:text-[18px] font-normal leading-relaxed"
                      style={{ color: 'rgb(var(--color-text-color90))' }}
                    >
                      {point}
                    </p>
                  </li>
                ))}
              </ul>

              <Divider />

              {/* Finding 3 */}
              <h3
                className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]"
                style={{ color: 'rgb(var(--color-text-tertiary))' }}
              >
                Finding 3 — Subject Guides
              </h3>

              <AnimatedTitle
                text="Unexpected groupings made subject guides feel like a maze rather than a resource"
                animationType="fadeIn"
                alwaysAnimate={false}
                delay={0}
                className="text-2xl md:text-[40px] font-bold text-text-primary mb-6 md:mb-8 leading-tight tracking-[-0.05em]"
              />

              <ImagePlaceholder
                label="Subject Guides page — current broad category groupings"
                aspectRatio="16/9"
                className="mb-8 md:mb-12"
              />

              <p
                className="text-base md:text-[18px] font-normal leading-relaxed mb-8 md:mb-10"
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
                className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]"
                style={{ color: 'rgb(var(--color-text-tertiary))' }}
              >
                Recommendation 03 — Subject Guides
              </h3>

              <AnimatedTitle
                text="Add search, collapsible structure, and a clear intro to what guides are"
                animationType="fadeIn"
                alwaysAnimate={false}
                delay={0}
                className="text-2xl md:text-[36px] font-bold text-text-primary mb-6 md:mb-8 leading-tight tracking-[-0.05em]"
              />

              <ImagePlaceholder
                label="Subject Guides — redesigned with search and drawer structure"
                aspectRatio="16/9"
                className="mb-8 md:mb-12"
              />

              <ul className="space-y-3 mb-12 md:mb-16">
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
                      className="text-base md:text-[18px] font-normal leading-relaxed"
                      style={{ color: 'rgb(var(--color-text-color90))' }}
                    >
                      {point}
                    </p>
                  </li>
                ))}
              </ul>

              <Divider />

              {/* Finding 4 */}
              <h3
                className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]"
                style={{ color: 'rgb(var(--color-text-tertiary))' }}
              >
                Finding 4 — Library Services
              </h3>

              <AnimatedTitle
                text="The Services page overwhelmed new users with links and no clear starting point"
                animationType="fadeIn"
                alwaysAnimate={false}
                delay={0}
                className="text-2xl md:text-[40px] font-bold text-text-primary mb-6 md:mb-8 leading-tight tracking-[-0.05em]"
              />

              <ImagePlaceholder
                label="Library Services page — current design with all services listed flat"
                aspectRatio="16/9"
                className="mb-8 md:mb-12"
              />

              <p
                className="text-base md:text-[18px] font-normal leading-relaxed mb-8 md:mb-10"
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
                className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]"
                style={{ color: 'rgb(var(--color-text-tertiary))' }}
              >
                Recommendation 04 — Library Services
              </h3>

              <AnimatedTitle
                text="Prioritize popular services and add audience-based filtering"
                animationType="fadeIn"
                alwaysAnimate={false}
                delay={0}
                className="text-2xl md:text-[36px] font-bold text-text-primary mb-6 md:mb-8 leading-tight tracking-[-0.05em]"
              />

              <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 items-start mb-12 md:mb-16">
                <div className="lg:sticky lg:top-32">
                  <LibraryBasicsPrototype />
                </div>
                <div>
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
                          className="text-base md:text-[18px] font-normal leading-relaxed"
                          style={{ color: 'rgb(var(--color-text-color90))' }}
                        >
                          {point}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Divider />

              {/* Summary */}
              <h3
                className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]"
                style={{ color: 'rgb(var(--color-text-tertiary))' }}
              >
                Summary
              </h3>

              <AnimatedTitle
                text="The website works for power users — fixing it for everyone else requires clarity, not complexity"
                animationType="fadeIn"
                alwaysAnimate={false}
                delay={0}
                className="text-2xl md:text-[40px] font-bold text-text-primary mb-6 md:mb-8 leading-tight tracking-[-0.05em]"
              />

              <p
                className="text-base md:text-[18px] font-normal leading-relaxed mb-6"
                style={{ color: 'rgb(var(--color-text-color90))' }}
              >
                The University of Alberta Library website effectively surfaces
                its search functionality and primary navigation. The usability
                gaps are not architectural — they are about what happens when a
                student arrives without a clear intent or prior library
                experience.
              </p>

              <p
                className="text-base md:text-[18px] font-normal leading-relaxed"
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
        </CaseStudyReadMore>
      </div>
    </m.section>
  )
}
