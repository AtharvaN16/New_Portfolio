'use client'

import { AnimatePresence, m } from 'framer-motion'
import { useRef } from 'react'
import { AnimatedTitle } from '@/components/ui/AnimatedTitle'

interface PrattVisitorExperienceContentProps {
  isContentRevealed: boolean
  onToggleContent: () => void
}

function PlaceholderFigure({
  label,
  aspectRatio = '16 / 9',
}: {
  label: string
  aspectRatio?: string
}) {
  return (
    <div
      className="w-full rounded-lg border"
      style={{
        aspectRatio,
        borderColor: 'rgb(var(--color-text-color10))',
        background:
          'linear-gradient(135deg, rgb(var(--color-surface-muted)) 0%, rgb(var(--color-surface-elevated)) 100%)',
      }}
    >
      <div className="flex h-full items-center justify-center p-6 text-center">
        <p
          className="text-sm md:text-[16px] font-medium uppercase tracking-[0.12em]"
          style={{ color: 'rgb(var(--color-text-color60))' }}
        >
          {label}
        </p>
      </div>
    </div>
  )
}

function SectionDivider() {
  return (
    <div
      className="border-t my-24 md:my-32"
      style={{ borderColor: 'rgb(var(--color-text-color10))' }}
    />
  )
}

export function PrattVisitorExperienceContent({
  isContentRevealed,
  onToggleContent,
}: PrattVisitorExperienceContentProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  return (
    <m.section
      className="w-full px-6 2xl:px-[140px] py-16 md:py-24 max-w-[1920px] mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <div className="max-w-[940px] mx-auto text-left">
        <h3 className="text-lg md:text-[28px] font-bold text-text-primary mb-6 md:mb-[28px]">
          Abstract
        </h3>

        <div className="space-y-6 md:space-y-8">
          <p className="text-base md:text-[20px] font-normal text-text-color90 leading-relaxed">
            Pratt&apos;s campus tour already created warmth and enthusiasm, but
            the quality of the experience depended too heavily on individual
            ambassadors and fragmented information across touchpoints.
          </p>
          <p className="text-base md:text-[20px] font-normal text-text-color90 leading-relaxed">
            This project reframed the challenge as a service consistency
            problem. Through service safaris, survey analysis, blueprinting, and
            co-design workshops, we designed two practical interventions: a
            three-phase ambassador support system and a redesigned
            physical-digital welcome packet that reduced information gaps before,
            during, and after the visit.
          </p>
        </div>

        <div className="mt-12 md:mt-16">
          <h3 className="text-lg md:text-[24px] font-bold text-text-primary mb-6 md:mb-[28px]">
            My Role
          </h3>

          <div className="space-y-6 md:space-y-8">
            <p className="text-base md:text-[20px] font-medium text-text-color90 leading-relaxed">
              As part of a three-person service design team, I contributed to:
            </p>
            <ul className="space-y-2 md:space-y-3 list-disc list-inside ml-2">
              <li className="text-base md:text-[20px] font-normal text-text-color90 leading-relaxed">
                Service safari documentation and journey mapping
              </li>
              <li className="text-base md:text-[20px] font-normal text-text-color90 leading-relaxed">
                Survey analysis and research synthesis
              </li>
              <li className="text-base md:text-[20px] font-normal text-text-color90 leading-relaxed">
                Co-design workshop planning and facilitation
              </li>
              <li className="text-base md:text-[20px] font-normal text-text-color90 leading-relaxed">
                Intervention strategy and content design
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-[100px] flex flex-col items-center gap-2">
          <span
            className="text-sm font-normal"
            style={{ color: 'rgb(var(--color-text-tertiary))' }}
          >
            6 min read
          </span>
          <button
            ref={buttonRef}
            onClick={onToggleContent}
            className="group inline-flex items-center gap-2 text-base md:text-[20px] font-normal text-text-primary hover:text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
          >
            <span className="relative inline-block">
              {isContentRevealed ? 'Hide case study' : 'Read full case study'}
              <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-current transition-all duration-300 ease-out group-hover:w-full" />
            </span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="w-4 h-4 transition-transform duration-200"
              style={{
                transform: isContentRevealed ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
              aria-hidden="true"
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <AnimatePresence initial={false}>
          {isContentRevealed && (
            <m.div
              className="mt-[160px] md:mt-[224px] lg:mt-[288px]"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div>
                <h3
                  className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]"
                  style={{ color: 'rgb(var(--color-text-tertiary))' }}
                >
                  Project Overview
                </h3>

                <AnimatedTitle
                  text="A better visit meant reducing information friction across the entire service"
                  animationType="fadeIn"
                  alwaysAnimate={false}
                  delay={0}
                  className="text-2xl md:text-[40px] font-bold text-text-primary mb-6 md:mb-8 leading-tight tracking-[-0.05em]"
                />

                <div className="space-y-6 md:space-y-8 mb-12 md:mb-16">
                  <p
                    className="text-base md:text-[20px] font-normal leading-relaxed"
                    style={{ color: 'rgb(var(--color-text-color90))' }}
                  >
                    Campus tours are one of Pratt&apos;s earliest trust-building
                    moments with prospective students and families. The
                    experience was emotionally strong, but it was uneven. The
                    visit often depended on how much an ambassador remembered,
                    how clearly logistics were communicated, and whether visitors
                    could find answers once the tour ended.
                  </p>
                  <p
                    className="text-base md:text-[20px] font-normal leading-relaxed"
                    style={{ color: 'rgb(var(--color-text-color90))' }}
                  >
                    Instead of proposing a large operational overhaul, we focused
                    on two adoptable interventions: support tools for ambassadors
                    and a clearer information system for visitors. The trade-off
                    was deliberate. We prioritized realistic implementation over
                    a more complex service redesign.
                  </p>
                </div>

                <PlaceholderFigure
                  label="Image Placeholder: Visitor journey overview"
                />

                <SectionDivider />

                <h3
                  className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]"
                  style={{ color: 'rgb(var(--color-text-tertiary))' }}
                >
                  Research Signals
                </h3>

                <AnimatedTitle
                  text="Survey data exposed the gap between a positive impression and a complete experience"
                  animationType="fadeIn"
                  alwaysAnimate={false}
                  delay={0}
                  className="text-2xl md:text-[40px] font-bold text-text-primary mb-6 md:mb-8 leading-tight tracking-[-0.05em]"
                />

                <p
                  className="text-base md:text-[20px] font-normal leading-relaxed mb-8 md:mb-10"
                  style={{ color: 'rgb(var(--color-text-color90))' }}
                >
                  We combined service safaris, stakeholder conversations,
                  service blueprinting, ecosystem mapping, survey analysis, and
                  co-design workshops with ambassadors. The most important
                  pattern came from the survey data: visitors liked the campus
                  and the ambassadors, but still left with unanswered questions.
                </p>

                <ul className="space-y-6 md:space-y-7">
                  <li className="flex items-start gap-4">
                    <span
                      className="mt-[0.6em] h-1.5 w-1.5 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor: 'rgb(var(--color-text-secondary))',
                      }}
                    />
                    <div>
                      <div className="text-base md:text-[20px] font-semibold leading-relaxed text-text-color90">
                        718 visitor responses reviewed
                      </div>
                      <p
                        className="text-base md:text-[20px] font-normal mt-1 md:mt-1.5 leading-relaxed"
                        style={{ color: 'rgb(var(--color-text-tertiary))' }}
                      >
                        The data gave us a broader view of recurring friction
                        than observation alone could provide.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span
                      className="mt-[0.6em] h-1.5 w-1.5 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor: 'rgb(var(--color-text-secondary))',
                      }}
                    />
                    <div>
                      <div className="text-base md:text-[20px] font-semibold leading-relaxed text-text-color90">
                        82% positive sentiment, 4.5/5 average rating
                      </div>
                      <p
                        className="text-base md:text-[20px] font-normal mt-1 md:mt-1.5 leading-relaxed"
                        style={{ color: 'rgb(var(--color-text-tertiary))' }}
                      >
                        The experience was not failing. It was succeeding
                        inconsistently.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span
                      className="mt-[0.6em] h-1.5 w-1.5 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor: 'rgb(var(--color-text-secondary))',
                      }}
                    />
                    <div>
                      <div className="text-base md:text-[20px] font-semibold leading-relaxed text-text-color90">
                        Highest information gaps
                      </div>
                      <p
                        className="text-base md:text-[20px] font-normal mt-1 md:mt-1.5 leading-relaxed"
                        style={{ color: 'rgb(var(--color-text-tertiary))' }}
                      >
                        Academic programs, financial aid, housing, and admissions
                        expectations surfaced repeatedly across feedback.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span
                      className="mt-[0.6em] h-1.5 w-1.5 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor: 'rgb(var(--color-text-secondary))',
                      }}
                    />
                    <div>
                      <div className="text-base md:text-[20px] font-semibold leading-relaxed text-text-color90">
                        69% said they were more likely to apply
                      </div>
                      <p
                        className="text-base md:text-[20px] font-normal mt-1 md:mt-1.5 leading-relaxed"
                        style={{ color: 'rgb(var(--color-text-tertiary))' }}
                      >
                        The visit created momentum. Our job was to prevent that
                        momentum from being weakened by missing information.
                      </p>
                    </div>
                  </li>
                </ul>

                <div className="mt-12 md:mt-16">
                  <PlaceholderFigure
                    label="Image Placeholder: Survey dashboard and coded insights"
                  />
                </div>

                <SectionDivider />

                <h3
                  className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]"
                  style={{ color: 'rgb(var(--color-text-tertiary))' }}
                >
                  Intervention 1
                </h3>

                <AnimatedTitle
                  text="A three-phase ambassador support system improved consistency without scripting away authenticity"
                  animationType="fadeIn"
                  alwaysAnimate={false}
                  delay={0}
                  className="text-2xl md:text-[40px] font-bold text-text-primary mb-6 md:mb-8 leading-tight tracking-[-0.05em]"
                />

                <div className="space-y-6 md:space-y-8 mb-12 md:mb-16">
                  <p
                    className="text-base md:text-[20px] font-normal leading-relaxed"
                    style={{ color: 'rgb(var(--color-text-color90))' }}
                  >
                    Ambassadors were the emotional core of the experience, so we
                    avoided a rigid script. Instead, we designed lightweight
                    tools that supported the job across three moments:
                    onboarding, live tours, and mid-semester reflection.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 md:mb-12">
                  {[
                    {
                      title: 'Learning',
                      body: 'Shadow note cards, service promise cards, and commitment cards built a shared standard during onboarding.',
                    },
                    {
                      title: 'Doing',
                      body: 'Cue cards reduced recall pressure during tours and helped ambassadors stay consistent in the moment.',
                    },
                    {
                      title: 'Reviewing',
                      body: 'Reflection sheets and quick check-ins turned tour delivery into a feedback loop for continuous improvement.',
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="rounded-lg border p-5 md:p-6"
                      style={{
                        borderColor: 'rgb(var(--color-text-color10))',
                        backgroundColor: 'rgb(var(--color-surface-elevated))',
                      }}
                    >
                      <h4 className="text-base md:text-[22px] font-bold mb-3 text-text-primary">
                        {item.title}
                      </h4>
                      <p
                        className="text-sm md:text-[18px] font-normal leading-relaxed"
                        style={{ color: 'rgb(var(--color-text-color90))' }}
                      >
                        {item.body}
                      </p>
                    </div>
                  ))}
                </div>

                <PlaceholderFigure
                  label="Image Placeholder: Ambassador training toolkit"
                />

                <SectionDivider />

                <h3
                  className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]"
                  style={{ color: 'rgb(var(--color-text-tertiary))' }}
                >
                  Intervention 2
                </h3>

                <AnimatedTitle
                  text="The welcome packet became a physical-digital system instead of a stack of disconnected materials"
                  animationType="fadeIn"
                  alwaysAnimate={false}
                  delay={0}
                  className="text-2xl md:text-[40px] font-bold text-text-primary mb-6 md:mb-8 leading-tight tracking-[-0.05em]"
                />

                <div className="space-y-6 md:space-y-8 mb-10 md:mb-12">
                  <p
                    className="text-base md:text-[20px] font-normal leading-relaxed"
                    style={{ color: 'rgb(var(--color-text-color90))' }}
                  >
                    The packet redesign focused on the recurring questions that
                    ambassadors could not fully answer on the move. We treated it
                    as an extension of the visit itself, not as a generic leave
                    behind.
                  </p>
                </div>

                <ul className="space-y-6 md:space-y-7 mb-12 md:mb-16">
                  {[
                    'A branded folder update to improve first impression and cohesion',
                    'A clearer one-pager to orient visitors to the materials',
                    'A redesigned campus map with note-taking space and survey QR access',
                    'A digital visitor welcome guide for richer, updateable information',
                    'A reorganized FAQ focused on the questions visitors actually asked',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-4">
                      <span
                        className="mt-[0.6em] h-1.5 w-1.5 rounded-full flex-shrink-0"
                        style={{
                          backgroundColor: 'rgb(var(--color-text-secondary))',
                        }}
                      />
                      <div
                        className="text-base md:text-[20px] font-normal leading-relaxed"
                        style={{ color: 'rgb(var(--color-text-color90))' }}
                      >
                        {item}
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <PlaceholderFigure
                    label="Image Placeholder: Redesigned campus map"
                    aspectRatio="4 / 3"
                  />
                  <PlaceholderFigure
                    label="Image Placeholder: Digital welcome guide"
                    aspectRatio="4 / 3"
                  />
                </div>

                <SectionDivider />

                <h3
                  className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]"
                  style={{ color: 'rgb(var(--color-text-tertiary))' }}
                >
                  Outcome
                </h3>

                <AnimatedTitle
                  text="The final concept protected what felt human while making the service more dependable"
                  animationType="fadeIn"
                  alwaysAnimate={false}
                  delay={0}
                  className="text-2xl md:text-[40px] font-bold text-text-primary mb-6 md:mb-8 leading-tight tracking-[-0.05em]"
                />

                <div className="space-y-6 md:space-y-8">
                  <p
                    className="text-base md:text-[20px] font-normal leading-relaxed"
                    style={{ color: 'rgb(var(--color-text-color90))' }}
                  >
                    This project was strongest when we stopped treating the
                    campus tour as a single event and started treating it as a
                    service ecosystem. The final direction improved clarity,
                    consistency, confidence, and continuity without requiring a
                    major operational rewrite.
                  </p>
                  <p
                    className="text-base md:text-[20px] font-normal leading-relaxed"
                    style={{ color: 'rgb(var(--color-text-color90))' }}
                  >
                    The core lesson was simple: Pratt did not need a more
                    performative visitor experience. It needed a more supported
                    one.
                  </p>
                </div>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </m.section>
  )
}
