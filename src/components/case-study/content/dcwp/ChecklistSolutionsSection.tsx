'use client'

import Image from 'next/image'
import { useTheme } from '@/components/providers/ThemeProvider'
import { CaseStudyVideo } from '@/components/case-study/CaseStudyVideo'

const VIDEO_BASE = '/videos/case-studies/nyc-dcwp-business-licenses'

const videoSolutions = [
  {
    sectionId: 'nyc-dcwp-solution-accordion',
    src: `${VIDEO_BASE}/accordion.mp4`,
    alt: 'Accordion expandable requirements demo',
    heading: 'We put the detailed requirements into expandable accordions to reduce page length',
    body: [
      'On the old page, the requirements checklist appeared twice—once as a brief summary and again with detailed descriptions. It felt repetitive and made the page unnecessarily long, especially on mobile.',
      'Instead of forcing users to scroll through the same content twice, we decided to simplify it into a single checklist with expandable accordions. Users can quickly scan all the requirements and choose to expand only the ones they want more information about.',
    ],
  },
  {
    sectionId: 'nyc-dcwp-solution-vertical-nav',
    src: `${VIDEO_BASE}/vertical-nav.mp4`,
    alt: 'Vertical sidebar navigation demo',
    heading: 'Added a vertical sidebar for quick navigation',
    body: [
      'We added a sticky side navigation so users can easily jump to different sections without scrolling too much. It also makes it easier to see what sections are on the page.',
    ],
  },
  {
    sectionId: 'nyc-dcwp-solution-fee-calculator',
    src: `${VIDEO_BASE}/fee-table.mp4`,
    alt: 'License fee calculator demo',
    heading: 'License fee calculator',
    body: [
      'The fee table was confusing and difficult to read. We proposed an input based solution. Instead of trying to decode the table, users enter when they\'re applying and the license duration, and it shows the fee they need to pay.',
    ],
  },
]

export function ChecklistSolutionsSection() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <section
      data-section="nyc-dcwp-solutions"
      className="mt-20 md:mt-28 lg:mt-36 space-y-16 md:space-y-24"
    >
      <h3 className="text-xl md:text-[28px] font-bold text-text-primary">
        Solutions
      </h3>

      {/* Solution 1 — static image */}
      <div
        data-section="nyc-dcwp-solution-visual-hierarchy"
        className="space-y-4"
      >
        <Image
          src="/images/case-studies/nyc-dcwp-business-licenses/solution-1.avif"
          alt="Redesigned DCWP page making important information visually distinct"
          width={1440}
          height={900}
          className="w-full h-auto"
          sizes="(max-width: 768px) 100vw, 80vw"
        />
        <p className="text-sm md:text-base text-text-body leading-relaxed">
          Important information made more visually distinct
        </p>
      </div>

      {/* Solution 2 — theme-aware image */}
      <div
        data-section="nyc-dcwp-solution-timeline-cta"
        className="space-y-4"
      >
        <Image
          src={
            isDark
              ? '/images/case-studies/nyc-dcwp-business-licenses/solution-2-dark.avif'
              : '/images/case-studies/nyc-dcwp-business-licenses/solution-2-light.avif'
          }
          alt="Redesigned DCWP overview page with application timeline and CTA"
          width={1440}
          height={900}
          className="w-full h-auto"
          sizes="(max-width: 768px) 100vw, 80vw"
        />

        {/* Annotation pills */}
        <div
          data-section="nyc-dcwp-solution-timeline-cta-annotations"
          className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2"
        >
          {[
            {
              num: '1',
              text: 'To address the confusion around the order of steps in the application process, we added an application timeline.',
            },
            {
              num: '2',
              text: 'We added a \u201cBegin Application\u201d button at the top of the page to make it easier for users to start the process.',
            },
          ].map(({ num, text }) => (
            <div
              key={num}
              className="flex items-start gap-3 px-4 py-3"
              style={{ backgroundColor: 'rgb(var(--color-text-color10))' }}
            >
              <span
                className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  backgroundColor: 'rgb(var(--color-text-color30))',
                  color: 'rgb(var(--color-text-primary))',
                }}
              >
                {num}
              </span>
              <p className="text-sm text-text-body leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Solutions 3–5 — videos with caption below */}
      {videoSolutions.map(({ sectionId, src, alt, heading, body }) => (
        <div
          key={src}
          data-section={sectionId}
          className="space-y-6"
        >
          <CaseStudyVideo src={src} alt={alt} />
          <div
            data-section={`${sectionId}-copy-grid`}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pt-2"
          >
            <h4 className="text-xl md:text-2xl font-bold text-text-primary leading-snug">
              {heading}
            </h4>
            <div
              data-section={`${sectionId}-body`}
              className="space-y-4"
            >
              {body.map((para) => (
                <p key={para} className="text-sm md:text-base text-text-body leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
