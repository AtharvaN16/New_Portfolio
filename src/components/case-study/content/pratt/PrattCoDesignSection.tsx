'use client'

import Image from 'next/image'
import { AnimatedText } from '@/components/ui/AnimatedText'
import { SectionDivider } from './pratt-shared'

export function PrattCoDesignSection() {
  return (
    <>
        {/* ── Cover image: Co-Design Workshops ── */}
        <figure className="w-full mb-16 md:mb-20">
          <Image
            src="/images/case-studies/pratt-institute-visitor-experience/codesign-cover.avif"
            alt="Students walking through Pratt Institute campus gardens"
            width={1600}
            height={560}
            className="w-full h-auto"
            quality={85}
            sizes="(max-width: 768px) 100vw, 896px"
          />
        </figure>

        {/* ── Section: Co-Design Workshops ── */}
        <h3
          className="text-sm md:text-base font-semibold normal-case mb-6 md:mb-[28px]"
          style={{ color: 'rgb(var(--color-text-tertiary))' }}
        >
          Co-Design Workshops
        </h3>

        <AnimatedText variant="heading"
          text="Why We Use the Co-Design Method?"
          animationType="fadeIn"
          alwaysAnimate={false}
          delay={0}
          className="text-xl md:text-2xl font-bold text-text-primary mb-6 md:mb-8 leading-tight tracking-[-0.05em]"
        />

        <div className="space-y-6 md:space-y-8 mb-12 md:mb-16">
          <p
            className="text-base md:text-[18px] font-normal leading-normal"
            style={{ color: 'rgb(var(--color-text-color90))' }}
          >
            Co-design brings student ambassadors, the people who deliver
            the service every day, directly into the improvement process.
            Their participation reveals needs and insights that surveys or
            service blueprints alone cannot uncover.
          </p>
          <p
            className="text-base md:text-[18px] font-normal leading-normal"
            style={{ color: 'rgb(var(--color-text-color90))' }}
          >
            By involving ambassadors closely, our solutions become more
            realistic, actionable, and aligned with how the visitor
            experience is actually operated and delivered.
          </p>
        </div>

        {/* Workshop photos */}
        <figure className="w-full mb-12 md:mb-16">
          <Image
            src="/images/case-studies/pratt-institute-visitor-experience/codesign-workshop.avif"
            alt="Co-design workshop sessions: ambassadors placing sticky notes on the journey map and collaborating at tables"
            width={800}
            height={1000}
            className="w-full h-auto"
            quality={85}
            sizes="(max-width: 768px) 100vw, 896px"
          />
        </figure>

        {/* Our Goal */}
        <h4 className="text-base md:text-xl font-bold text-text-primary mb-6 md:mb-8">
          Our Goal
        </h4>
        <div className="space-y-3 mb-16 md:mb-20">
          {[
            'Understand the Real Tour Experience from Student Ambassadors',
            'Identify Challenges and Needs in the Current Tour Process',
            'Co-Create Simple and Feasible Improvements',
          ].map((goal, i) => (
            <div
              key={i}
              className="flex items-center gap-4 px-5 py-4 rounded-xl"
              style={{
                backgroundColor: 'rgb(var(--color-surface-elevated))',
              }}
            >
              <span
                className="text-sm font-bold flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-lg"
                style={{
                  backgroundColor: 'rgb(var(--color-surface-muted))',
                  color: 'rgb(var(--color-text-primary))',
                }}
              >
                {i + 1}
              </span>
              <span className="text-base md:text-[18px] font-normal text-text-primary">
                {goal}
              </span>
            </div>
          ))}
        </div>

        {/* What we did */}
        <h4 className="text-base md:text-xl font-bold text-text-primary mb-6">
          What we did?
        </h4>
        <div className="space-y-6 md:space-y-8 mb-8 md:mb-10">
          <p
            className="text-base md:text-[18px] font-normal leading-normal"
            style={{ color: 'rgb(var(--color-text-color90))' }}
          >
            We hosted{' '}
            <strong>two 60-minute in-person co-design workshops</strong>{' '}
            with <strong>16 participants</strong>, including ambassadors
            across all tiers and Sham&ocirc;r. Each session combined
            reflection, mapping, and creativity to uncover improvement
            opportunities.
          </p>
        </div>
        <p
          className="text-base md:text-[18px] font-semibold text-text-primary mb-4"
        >
          Activities included:
        </p>
        <ul className="space-y-3 mb-16 md:mb-20">
          {[
            'A warm-up defining \u201cWhat Welcome Means\u201d',
            'Visitor journey mapping through the eyes of ambassadors',
            'Role-play exercises to simulate real tour moments',
            'Identifying emotional highs/lows, gaps, and breakdowns',
            'Sketching solutions for a better visitor experience',
          ].map((activity, i) => (
            <li key={i} className="flex items-start gap-3">
              <span
                className="mt-[0.55em] h-1.5 w-1.5 rounded-full flex-shrink-0"
                style={{
                  backgroundColor: 'rgb(var(--color-text-tertiary))',
                }}
              />
              <span
                className="text-base md:text-[18px] font-normal leading-normal"
                style={{ color: 'rgb(var(--color-text-color90))' }}
              >
                {activity}
              </span>
            </li>
          ))}
        </ul>

        {/* Workshop artifacts photo */}
        <figure className="w-full mb-12 md:mb-16">
          <Image
            src="/images/case-studies/pratt-institute-visitor-experience/codesign-artifacts.avif"
            alt="Workshop artifacts: filled welcome cards, ambassador annotated journey map, observation cards, and sketching sheets"
            width={900}
            height={900}
            className="w-full h-auto"
            quality={85}
            sizes="(max-width: 768px) 100vw, 896px"
          />
        </figure>

        {/* What we learned */}
        <h4 className="text-base md:text-xl font-bold text-text-primary mb-8 md:mb-10">
          What we learned?
        </h4>
        <div className="space-y-8 md:space-y-10">
          {[
            {
              title: 'Information Gaps',
              desc: 'Ambassadors rely heavily on memory, which may lead to inconsistent or inaccurate answers. They need quick-reference tools and clear boundaries around what they can and cannot answer.',
            },
            {
              title: 'Outdated or Inconsistent Information',
              desc: "Recent changes in campus stops or policies aren\u2019t reaching everyone which directly impacts visitor impressions.",
            },
            {
              title: 'Emotional Moments Matter',
              desc: 'Visitors feel a sense of belonging when ambassadors personalize stories and share their lived experiences as students. These moments help visitors imagine themselves at Pratt, while the absence of personal connection can make the experience feel generic.',
            },
            {
              title: 'Need Practical Support Materials',
              desc: 'Ambassadors expressed a need for practical support materials, including updated talking points, transition prompts, scenario-based responses, and pre-tour preparation reminders.',
            },
          ].map(({ title, desc }) => (
            <div key={title}>
              <h5 className="text-base md:text-[18px] font-bold text-text-primary mb-2 md:mb-3">
                {title}
              </h5>
              <p
                className="text-base md:text-[18px] font-normal leading-normal"
                style={{ color: 'rgb(var(--color-text-tertiary))' }}
              >
                {desc}
              </p>
            </div>
          ))}
        </div>

    </>
  )
}
