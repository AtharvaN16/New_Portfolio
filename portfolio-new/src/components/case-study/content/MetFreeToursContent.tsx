'use client'

import { m } from 'framer-motion'
import { AnimatedTitle } from '@/components/ui/AnimatedTitle'
import { CaseStudyReadMore } from '@/components/case-study/CaseStudyReadMore'

interface MetFreeToursContentProps {
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

export function MetFreeToursContent({
  isContentRevealed,
  onToggleContent,
}: MetFreeToursContentProps) {
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
          <p className="text-base md:text-[18px] font-normal text-text-color70 leading-relaxed">
            The Metropolitan Museum of Art offers free guided tours daily, but
            half the participants in this study didn&apos;t know they existed.
            This case study evaluates the usability of The Met&apos;s Free Tours
            page, identifying why visitors miss this offering and what it takes
            to make it discoverable, comprehensible, and actionable.
          </p>
          <p className="text-base md:text-[18px] font-normal text-text-color70 leading-relaxed">
            Through unmoderated remote user testing with 12 participants, the
            study exposed six usability problems, from broken filters and a
            misleading breadcrumb to the absence of any booking closure. Two
            focused redesigns were proposed: a restructured Free Tours landing
            page and a richer tour details page that removes ambiguity and
            increases participation.
          </p>
        </div>

        <CaseStudyReadMore
          readTime="8 min read"
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
                text="The Met offers free guided tours daily. Finding them shouldn't feel like a treasure hunt."
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
                  The Metropolitan Museum of Art — one of the world&apos;s
                  largest museums — provides daily guided tours to the public at
                  no cost. No reservation needed. Yet despite this, many
                  visitors remain unaware the tours exist. The opportunity cost
                  is real: a high-quality, free offering sits behind a page that
                  users can&apos;t find, can&apos;t browse, and can&apos;t act
                  on.
                </p>
                <p
                  className="text-base md:text-[18px] font-normal leading-relaxed"
                  style={{ color: 'rgb(var(--color-text-color90))' }}
                >
                  The research question was straightforward: is The Met&apos;s
                  Free Tours page usable enough for a first-time visitor to
                  understand, browse, and decide to attend? The answer shaped
                  two focused redesigns.
                </p>
              </div>

              <ImagePlaceholder
                label="The Free Tours page — a long, scroll-heavy list that made comparison and discovery difficult"
                aspectRatio="16/9"
                className="mb-12 md:mb-16"
              />

              <Divider />

              {/* Research Goals */}
              <h3
                className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]"
                style={{ color: 'rgb(var(--color-text-tertiary))' }}
              >
                Research Goals
              </h3>

              <p
                className="text-base md:text-[18px] font-normal leading-relaxed mb-8 md:mb-10"
                style={{ color: 'rgb(var(--color-text-color90))' }}
              >
                The study was structured around five questions:
              </p>

              <ul className="space-y-6 md:space-y-7">
                {[
                  {
                    title: 'Clarity of logistics',
                    body: 'Are time, location, language, and duration presented in a way users can quickly understand and use to make decisions?',
                  },
                  {
                    title: 'Discovery of the free tour offering',
                    body: 'Do users know The Met offers free daily tours — and do they know where to find that information on the website?',
                  },
                  {
                    title: 'Sufficiency of tour information',
                    body: 'After visiting the page, do users have enough context to know what attending a free tour actually involves?',
                  },
                  {
                    title: 'Visitor motivations',
                    body: 'What drives museum-goers to seek out a guided tour in the first place?',
                  },
                  {
                    title: 'Opportunities for improvement',
                    body: 'Where does the current design create unnecessary friction, and what changes would make tours more accessible to a general audience?',
                  },
                ].map((obj) => (
                  <li key={obj.title} className="flex items-start gap-4">
                    <span
                      className="mt-[0.6em] h-1.5 w-1.5 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor: 'rgb(var(--color-text-secondary))',
                      }}
                    />
                    <div>
                      <div className="text-base md:text-[18px] font-semibold leading-relaxed text-text-color70">
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
                text="Unmoderated testing let us observe natural behavior without researcher influence"
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
                  We chose{' '}
                  <span className="font-bold">
                    unmoderated remote user testing via Userlytics
                  </span>{' '}
                  to test on a live website and reach a wider participant pool
                  without scheduling overhead. Each session was{' '}
                  <span className="font-bold">screen and audio recorded</span>{' '}
                  as participants completed{' '}
                  <span className="font-bold">6 tasks</span> independently. A
                  screener filtered for museum-goers: only users who selected
                  &ldquo;Visit museums, galleries, or cultural events&rdquo;
                  were accepted.
                </p>
                <p
                  className="text-base md:text-[18px] font-normal leading-relaxed"
                  style={{ color: 'rgb(var(--color-text-color90))' }}
                >
                  We rated task difficulty on a 1–7 scale. Tasks 3 and 4 —
                  finding tours at Met Cloisters and locating a post-5pm Friday
                  tour — both scored{' '}
                  <span className="font-bold">6 out of 7</span>, the highest
                  difficulty in the study.
                </p>
              </div>

              {/* Participant Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16">
                {[
                  {
                    stat: '12',
                    label: 'Participants',
                    sub: 'Museum-goers via Userlytics',
                  },
                  {
                    stat: '6',
                    label: 'Tasks per session',
                    sub: '5 with difficulty ratings',
                  },
                  {
                    stat: '~50%',
                    label: 'Unaware of free tours',
                    sub: 'Before the test began',
                  },
                  {
                    stat: '6/7',
                    label: 'Peak task difficulty',
                    sub: 'Tasks 3 & 4',
                  },
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
                label="Task difficulty ratings — Tasks 3 and 4 scored 6/7, both involving targeted tour filtering"
                aspectRatio="16/7"
                className="mb-12 md:mb-16"
              />

              <Divider />

              {/* Finding 1 */}
              <h3
                className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]"
                style={{ color: 'rgb(var(--color-text-tertiary))' }}
              >
                Finding 1 — Navigation
              </h3>

              <AnimatedTitle
                text="Six users went to Plan Your Visit first. Half of them never found the tours."
                animationType="fadeIn"
                alwaysAnimate={false}
                delay={0}
                className="text-2xl md:text-[40px] font-bold text-text-primary mb-6 md:mb-8 leading-tight tracking-[-0.05em]"
              />

              <ImagePlaceholder
                label="Plan Your Visit page — where most users landed first, finding no mention of free tours"
                aspectRatio="16/9"
                className="mb-8 md:mb-12"
              />

              <div
                className="mb-8 md:mb-12 space-y-4"
                style={{ color: 'rgb(var(--color-text-color90))' }}
              >
                <p className="text-base md:text-[18px] font-normal leading-relaxed">
                  When tasked with finding guided tour information, 6 of 12
                  participants navigated to{' '}
                  <span className="font-bold">Plan Your Visit</span> — a page
                  that doesn&apos;t mention free tours at all. This reflects a
                  clear mental model: museum-goers think of tours as part of
                  planning a visit, not as a separate events-adjacent section.
                </p>
                <p className="text-base md:text-[18px] font-normal leading-relaxed">
                  Only 3 of those 6 found their way out. The other half had to
                  be redirected. The issue wasn&apos;t a label — it was
                  taxonomy. Free Tours lives in the wrong part of the site for
                  how visitors think about attending one.
                </p>
              </div>

              <div className="space-y-6 md:space-y-8 mb-12 md:mb-16">
                <Quote
                  text="Plan Your Visit is where I'd go [for guided tours information]... I thought it would be right up front to get something about special guides, but it's not very obvious."
                  participant="Participant"
                  context="on locating the Free Tours page"
                />
              </div>

              {/* Recommendation 01 */}
              <h3
                className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]"
                style={{ color: 'rgb(var(--color-text-tertiary))' }}
              >
                Recommendation 01 — Navigation
              </h3>

              <AnimatedTitle
                text="Surface Free Tours within the planning flow — that's where users expect to find it"
                animationType="fadeIn"
                alwaysAnimate={false}
                delay={0}
                className="text-2xl md:text-[36px] font-bold text-text-primary mb-6 md:mb-8 leading-tight tracking-[-0.05em]"
              />

              <ul className="space-y-3 mb-12 md:mb-16">
                {[
                  'Add a Free Tours entry or link within the Plan Your Visit page — users look there first and currently find nothing.',
                  'List Free Tours under both the Visit and Events sections of the navigation to match both mental models users have of where tours live.',
                  'Fix the breadcrumb on the tour details page to read Free Tours consistently — the Events Calendar path sent users to the wrong section 5+ times.',
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
                Finding 2 — Browsing
              </h3>

              <AnimatedTitle
                text="The layout made comparison so costly that one user gave up entirely"
                animationType="fadeIn"
                alwaysAnimate={false}
                delay={0}
                className="text-2xl md:text-[40px] font-bold text-text-primary mb-6 md:mb-8 leading-tight tracking-[-0.05em]"
              />

              <p
                className="text-base md:text-[18px] font-normal leading-relaxed mb-8 md:mb-10"
                style={{ color: 'rgb(var(--color-text-color90))' }}
              >
                Tours were arranged chronologically in a long vertical list with
                no grouped view and no way to compare at a glance. Three users
                resorted to{' '}
                <span className="font-bold">ctrl+f</span> to search the page.
                When asked to choose the tour they&apos;d most want to attend,
                one user became so frustrated scrolling back and forth that they
                gave up on a meaningful comparison entirely.
              </p>

              <div className="space-y-6 md:space-y-8 mb-12 md:mb-16">
                <Quote
                  text="This idea of having to scroll through the free tours, just manually scroll... it is cumbersome."
                  participant="Participant"
                  context="on browsing the full tour listing"
                />
              </div>

              {/* Recommendation 02 */}
              <h3
                className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]"
                style={{ color: 'rgb(var(--color-text-tertiary))' }}
              >
                Recommendation 02 — Browsing
              </h3>

              <AnimatedTitle
                text="Replace the vertical list with cards so users can compare without losing their place"
                animationType="fadeIn"
                alwaysAnimate={false}
                delay={0}
                className="text-2xl md:text-[36px] font-bold text-text-primary mb-6 md:mb-8 leading-tight tracking-[-0.05em]"
              />

              <ImagePlaceholder
                label="Redesigned tour listing — card format allowing side-by-side comparison without excessive scroll"
                aspectRatio="16/9"
                className="mb-8 md:mb-12"
              />

              <ul className="space-y-3 mb-12 md:mb-16">
                {[
                  'Replace the vertical scroll list with a card format — one card per tour — so comparison is possible without scrolling back and forth.',
                  'Tag popular tours visually to help users who are browsing without a specific tour in mind.',
                  'Group tours by date in a collapsible day-by-day view so users scanning for a time slot can skim rather than scroll.',
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
                Finding 3 — Filters
              </h3>

              <AnimatedTitle
                text="Filters were the most relied-on feature on the page — and the most broken"
                animationType="fadeIn"
                alwaysAnimate={false}
                delay={0}
                className="text-2xl md:text-[40px] font-bold text-text-primary mb-6 md:mb-8 leading-tight tracking-[-0.05em]"
              />

              <ImagePlaceholder
                label="Type filters showing '0' results for all subcategories — a critical failure mid-task"
                aspectRatio="16/9"
                className="mb-8 md:mb-12"
              />

              <p
                className="text-base md:text-[18px] font-normal leading-relaxed mb-8 md:mb-10"
                style={{ color: 'rgb(var(--color-text-color90))' }}
              >
                All 12 participants used filters when searching for a specific
                tour. Three called filters the most helpful feature on the page.
                The problem: the filter system had four distinct failures that
                made it unreliable at exactly the moments it was needed most.
              </p>

              <ul className="space-y-6 md:space-y-7 mb-10 md:mb-12">
                {[
                  {
                    title: 'No language filter',
                    body: 'When asked to find tours for non-English speaking visitors, all users looked for a language filter. None existed — forcing manual scrolling through every listing.',
                  },
                  {
                    title: 'No time-of-day filter',
                    body: 'Two users specifically searched for options like "morning" or "afternoon." The only arrangement was chronological scroll.',
                  },
                  {
                    title: 'Type filters showed 0 results',
                    body: 'For 5 users, all type subcategory filters displayed 0 available tours — a reliability failure that pushed users back to manual browsing mid-task.',
                  },
                  {
                    title: 'Unclear "Access" label',
                    body: 'Two users were confused by the "Access" option under Audience filters. No tooltip or explanation clarified its meaning.',
                  },
                ].map((obj) => (
                  <li key={obj.title} className="flex items-start gap-4">
                    <span
                      className="mt-[0.6em] h-1.5 w-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: 'rgb(var(--color-text-secondary))' }}
                    />
                    <div>
                      <div className="text-base md:text-[18px] font-semibold leading-relaxed text-text-color70">
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

              <div className="space-y-6 md:space-y-8 mb-12 md:mb-16">
                <Quote
                  text="Am I able to filter it by language? Let's see. Does not look like you can filter it by language. That's too bad. I feel like that should be an option."
                  participant="Participant"
                  context="while trying to find a non-English tour"
                />
              </div>

              {/* Recommendation 03 */}
              <h3
                className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]"
                style={{ color: 'rgb(var(--color-text-tertiary))' }}
              >
                Recommendation 03 — Filters
              </h3>

              <AnimatedTitle
                text="Fix what's broken, add what's missing, and make filter state visible"
                animationType="fadeIn"
                alwaysAnimate={false}
                delay={0}
                className="text-2xl md:text-[36px] font-bold text-text-primary mb-6 md:mb-8 leading-tight tracking-[-0.05em]"
              />

              <ul className="space-y-3 mb-12 md:mb-16">
                {[
                  'Add a language filter so users can find non-English tours without manually scanning every listing.',
                  'Add a time-of-day filter (morning, afternoon, evening) since users think in time blocks, not exact start times.',
                  'Fix the type subcategory filters — currently showing 0 results for all subcategories, making them unusable.',
                  'Clarify the "Access" label under Audience with a tooltip or plain-language description.',
                  'Add active filter tags with a "clear all" button so users always know which filters are on and can reset without starting over.',
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
                Finding 4 — Wayfinding
              </h3>

              <AnimatedTitle
                text="A broken breadcrumb quietly sent users to the wrong section five times"
                animationType="fadeIn"
                alwaysAnimate={false}
                delay={0}
                className="text-2xl md:text-[40px] font-bold text-text-primary mb-6 md:mb-8 leading-tight tracking-[-0.05em]"
              />

              <p
                className="text-base md:text-[18px] font-normal leading-relaxed mb-8 md:mb-10"
                style={{ color: 'rgb(var(--color-text-color90))' }}
              >
                When opening a tour details page from the listing, the breadcrumb
                updated from{' '}
                <span className="font-bold">Free Tours</span> to{' '}
                <span className="font-bold">Events Calendar</span> — silently
                and incorrectly. At least 5 times across sessions, users
                attempting to navigate back to the tour listing followed the
                breadcrumb and ended up in an entirely different section of the
                site with no awareness it had happened.
              </p>

              <ImagePlaceholder
                label="Tour details breadcrumb — incorrectly showing Events Calendar instead of Free Tours"
                aspectRatio="16/7"
                className="mb-12 md:mb-16"
              />

              {/* Recommendation 04 */}
              <h3
                className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]"
                style={{ color: 'rgb(var(--color-text-tertiary))' }}
              >
                Recommendation 04 — Wayfinding
              </h3>

              <AnimatedTitle
                text="Fix the breadcrumb — a one-line change that restores trust in navigation"
                animationType="fadeIn"
                alwaysAnimate={false}
                delay={0}
                className="text-2xl md:text-[36px] font-bold text-text-primary mb-6 md:mb-8 leading-tight tracking-[-0.05em]"
              />

              <ul className="space-y-3 mb-12 md:mb-16">
                {[
                  'Update the breadcrumb on tour details pages to read Free Tours, not Events Calendar — the current path is technically correct by CMS logic but contradicts where users believe they are.',
                  'Make the interactive map link prominent on each details page — most users missed it despite it being the most direct answer to their wayfinding questions.',
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

              {/* Finding 5 */}
              <h3
                className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]"
                style={{ color: 'rgb(var(--color-text-tertiary))' }}
              >
                Finding 5 — Information Architecture
              </h3>

              <AnimatedTitle
                text="After browsing the page, users still couldn't explain what a free tour actually involves"
                animationType="fadeIn"
                alwaysAnimate={false}
                delay={0}
                className="text-2xl md:text-[40px] font-bold text-text-primary mb-6 md:mb-8 leading-tight tracking-[-0.05em]"
              />

              <p
                className="text-base md:text-[18px] font-normal leading-relaxed mb-8 md:mb-10"
                style={{ color: 'rgb(var(--color-text-color90))' }}
              >
                Asked to describe what a free tour at The Met entails, most
                users referenced only the specific tour they had just viewed.
                No one could describe the general format — whether tours were
                guided or self-guided, how long they typically ran, or whether
                you could join mid-tour. The page offered listings but no
                orientation.
              </p>

              <div className="space-y-6 md:space-y-8 mb-12 md:mb-16">
                <Quote
                  text="What do I think a free tour entails? It entails the description that is displayed here along with a guide... that's only for this specific tour."
                  participant="Participant"
                  context="when asked to describe what free tours involve"
                />
              </div>

              {/* Recommendation 05 */}
              <h3
                className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]"
                style={{ color: 'rgb(var(--color-text-tertiary))' }}
              >
                Recommendation 05 — Information Architecture
              </h3>

              <AnimatedTitle
                text="Add an overview section so users understand what free tours are before they choose one"
                animationType="fadeIn"
                alwaysAnimate={false}
                delay={0}
                className="text-2xl md:text-[36px] font-bold text-text-primary mb-6 md:mb-8 leading-tight tracking-[-0.05em]"
              />

              <ul className="space-y-3 mb-12 md:mb-16">
                {[
                  'Add a brief intro section at the top of the Free Tours page explaining what tours involve: walk-in, no reservation, guided by knowledgeable staff, approximately one hour.',
                  'Add a Tour Highlights section on each details page previewing key artworks (e.g., Washington Crossing the Delaware, Temple of Dendur) so users can decide if the tour matches their interests before committing.',
                  'Add an Accessibility section and a Related Events panel so users with specific needs and browsing interests can find relevant information without a separate search.',
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

              {/* Finding 6 */}
              <h3
                className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]"
                style={{ color: 'rgb(var(--color-text-tertiary))' }}
              >
                Finding 6 — Completion Model
              </h3>

              <AnimatedTitle
                text="Three users left looking for a booking step that doesn't exist"
                animationType="fadeIn"
                alwaysAnimate={false}
                delay={0}
                className="text-2xl md:text-[40px] font-bold text-text-primary mb-6 md:mb-8 leading-tight tracking-[-0.05em]"
              />

              <p
                className="text-base md:text-[18px] font-normal leading-relaxed mb-8 md:mb-10"
                style={{ color: 'rgb(var(--color-text-color90))' }}
              >
                Public Collection Tours are first-come, first-served — no
                reservation required. But the page never states this clearly.
                Three users kept searching for a booking flow, assuming they had
                missed it. One concluded they hadn&apos;t completed the task
                because they couldn&apos;t book a spot. This was a design
                problem, not a communication gap: the mental model of planning
                to attend an event requires some form of closure.
              </p>

              <div className="space-y-6 md:space-y-8 mb-12 md:mb-16">
                <Quote
                  text="Where do I make the reservation? I wasn't able to book it, so I would say [I was not successful]."
                  participant="Participant"
                  context="after completing the tour-planning task"
                />
              </div>

              {/* Recommendation 06 */}
              <h3
                className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]"
                style={{ color: 'rgb(var(--color-text-tertiary))' }}
              >
                Recommendation 06 — Completion Model
              </h3>

              <AnimatedTitle
                text="State no-registration upfront and give users a way to close the loop"
                animationType="fadeIn"
                alwaysAnimate={false}
                delay={0}
                className="text-2xl md:text-[36px] font-bold text-text-primary mb-6 md:mb-8 leading-tight tracking-[-0.05em]"
              />

              <ImagePlaceholder
                label="Redesigned tour details page — no-reservation notice, duration, and Add to Calendar upfront"
                aspectRatio="16/9"
                className="mb-8 md:mb-12"
              />

              <ul className="space-y-3 mb-12 md:mb-16">
                {[
                  '"No registration required — first come, first served" at the top of the details page. This single line resolves the confusion that caused 3 users to believe they had failed the task.',
                  'Add an "Add to Calendar" feature as a lightweight stand-in for booking — provides closure without implying reservation, and gives users a reminder for the day of the visit.',
                  'Show tour duration prominently — users cited length as one of the top three pieces of information they want before deciding to attend.',
                  'Consolidate all language versions of each tour on one details page instead of separate listings, shortening scroll and resolving the filter gap at source.',
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

              {/* Summary */}
              <h3
                className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]"
                style={{ color: 'rgb(var(--color-text-tertiary))' }}
              >
                Summary
              </h3>

              <AnimatedTitle
                text="A valuable offering was invisible because the page never told users it existed, what it was, or how to act on it"
                animationType="fadeIn"
                alwaysAnimate={false}
                delay={0}
                className="text-2xl md:text-[40px] font-bold text-text-primary mb-6 md:mb-8 leading-tight tracking-[-0.05em]"
              />

              <p
                className="text-base md:text-[18px] font-normal leading-relaxed mb-6"
                style={{ color: 'rgb(var(--color-text-color90))' }}
              >
                The Met&apos;s free tours aren&apos;t a hidden secret — they&apos;re
                buried behind an experience that makes them feel like one. The
                core issue wasn&apos;t any single broken element: it was
                placement, filtering, and missing context compounding at every
                step in the visitor&apos;s journey.
              </p>

              <p
                className="text-base md:text-[18px] font-normal leading-relaxed mb-6"
                style={{ color: 'rgb(var(--color-text-color90))' }}
              >
                The two redesigns address each layer: the landing page fixes
                where users land, how they filter, and what they understand
                before choosing a tour. The details page resolves what happens
                after they choose — eliminating the no-reservation confusion,
                surfacing tour content, and giving visitors a natural endpoint
                to the planning process.
              </p>

              <p
                className="text-base md:text-[18px] font-normal leading-relaxed"
                style={{ color: 'rgb(var(--color-text-color90))' }}
              >
                What would be measured next: filter usage rate, Add to Calendar
                adoption, and whether task completion time on the redesigned
                page drops meaningfully. The clearest signal of success: a
                first-time visitor who can find, understand, and decide on a
                tour in under two minutes — without needing to use ctrl+f.
              </p>
        </CaseStudyReadMore>
      </div>
    </m.section>
  )
}
