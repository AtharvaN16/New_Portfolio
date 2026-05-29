'use client'

import { useState } from 'react'
import { m } from 'framer-motion'
import Image from 'next/image'
import { CaseStudyReadMore } from '@/components/case-study/CaseStudyReadMore'
import { AnimatedText } from '@/components/ui/AnimatedText'
import { ProjectCard } from '@/components/work/ProjectCard'
import { ChecklistProcessOverviewSection } from '@/components/case-study/content/dcwp/ChecklistProcessOverviewSection'
import { ChecklistSubCase } from '@/components/case-study/content/dcwp/ChecklistSubCase'
import { HighlightsSection } from '@/components/case-study/content/dcwp/HighlightsSection'
import { ChecklistSolutionsSection } from '@/components/case-study/content/dcwp/ChecklistSolutionsSection'

interface NycDcwpBusinessLicensesContentProps {
  isContentRevealed: boolean
  onToggleContent: () => void
}

export function NycDcwpBusinessLicensesContent({
  isContentRevealed,
  onToggleContent,
}: NycDcwpBusinessLicensesContentProps) {
  const [showAnnotations, setShowAnnotations] = useState(true)
  const [showAnnotations2, setShowAnnotations2] = useState(true)

  return (
    <m.section
      data-section="nyc-dcwp-case-study-root"
      className="w-full px-6 2xl:px-[140px] py-16 md:py-24 max-w-[1920px] mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <div
        data-section="nyc-dcwp-content-column"
        className="max-w-[1044px] mx-auto text-left"
      >
        {/* Abstract */}
        <h3 className="text-lg md:text-[28px] font-bold text-text-primary mb-6 md:mb-[28px]">
          Abstract
        </h3>
        <div
          data-section="nyc-dcwp-abstract-body"
          className="space-y-6 md:space-y-8"
        >
          <p className="text-base md:text-[18px] font-normal text-text-body leading-relaxed">
            NYC DCWP Chief Information Officer Rina Sharma approached Pratt
            Institute with a project to improve the functionality of the
            business portal, with a specific focus on the Home Improvement
            License category. This category has the highest number of
            licensees, with more than 14,000 businesses.
          </p>
          <p className="text-base md:text-[18px] font-normal text-text-body leading-relaxed">
            Many home improvement contractors tend to be older, may be less
            comfortable with digital systems, and often have limited
            English proficiency. The goal of the project was to identify
            pain points in the application and renewal journey and make the
            process easier to navigate with less confusion and friction.
          </p>
        </div>

        <CaseStudyReadMore
          readTime="15 min read (3 mini casestudies)"
          isContentRevealed={isContentRevealed}
          onToggleContent={onToggleContent}
        >
          <div
            data-section="nyc-dcwp-read-more-inner"
            className="space-y-12 md:space-y-16"
          >
            <div data-section="nyc-dcwp-hero-headline">
              <h2 className="text-2xl md:text-[40px] font-bold text-text-primary leading-tight tracking-[-0.05em]">
                Helping 14,000+ business owners renew and apply for licenses
                with less hassle and more clarity
              </h2>
            </div>

            <section data-section="nyc-dcwp-the-client">
              <h3 className="text-lg md:text-[28px] font-bold text-text-primary mb-6 md:mb-[28px]">
                The Client
              </h3>
              <div
                data-section="nyc-dcwp-the-client-body"
                className="space-y-6 md:space-y-8"
              >
                <p className="text-base md:text-[18px] font-normal text-text-body leading-relaxed">
                  The New York City Department of Consumer and Worker
                  Protection is responsible for issuing licenses to more
                  than 45,000 businesses across over 40 industries and
                  enforces major consumer protection, licensing, and
                  workplace laws.
                </p>
                <p className="text-base md:text-[18px] font-normal text-text-body leading-relaxed">
                  The product in scope was the department&apos;s online
                  portal, where business owners apply for or renew their
                  licenses.
                </p>
              </div>
            </section>

            {/* Opportunity */}
            <section data-section="nyc-dcwp-opportunity">
              <p className="text-[12px] md:text-[14px] font-semibold uppercase tracking-widest text-text-color70 mb-4">
                Opportunity
              </p>
              <h3 className="text-xl md:text-[28px] font-bold text-text-primary mb-6 md:mb-8 leading-snug">
                By improving the Home Improvement License Renewal
                functionality, DCWP can:
              </h3>
              <ul className="space-y-4">
                {[
                  'Enhance user satisfaction by making the renewal process more intuitive and efficient',
                  'Reduce support inquiries and complaints related to renewal difficulties, in turn saving budget and resources',
                  'Increase completion rates by minimizing roadblocks in the user journey',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-base md:text-[18px] text-text-body leading-relaxed"
                  >
                    <svg
                      className="mt-[0.42em] h-2 w-2 shrink-0"
                      viewBox="0 0 8 8"
                      aria-hidden
                    >
                      <circle
                        cx="4"
                        cy="4"
                        r="4"
                        className="fill-[var(--cs-pop-light)] dark:fill-[var(--cs-pop-dark)]"
                      />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Divider */}
            <div
              data-section="nyc-dcwp-divider-after-opportunity"
              className="border-t my-24 md:my-32"
              style={{ borderColor: 'rgb(var(--color-text-color10))' }}
            />

            {/* Understanding the Process */}
            <section data-section="nyc-dcwp-understanding-process">
              <div
                data-section="nyc-dcwp-understanding-process-grid"
                className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-start"
              >
                {/* Left column: heading + text + 2 stacked images */}
                <div
                  data-section="nyc-dcwp-understanding-process-left"
                  className="flex flex-col gap-8 md:gap-10"
                >
                  <div
                    data-section="nyc-dcwp-understanding-process-intro"
                    className="space-y-4"
                  >
                    <h3 className="text-xl md:text-[28px] font-bold text-text-primary leading-snug">
                      Understanding the process
                    </h3>
                    <p className="text-base md:text-[18px] text-text-body leading-relaxed">
                      We visited DCWP&apos;s office on 42 Broadway to talk to
                      the staff from different teams to understand their roles
                      there and understand the application process
                    </p>
                  </div>
                  <div
                    data-section="nyc-dcwp-understanding-process-left-images"
                    className="flex flex-col gap-8 md:gap-10"
                  >
                    <div
                      data-section="nyc-dcwp-process-photo-waiting-area"
                      className="relative w-full overflow-hidden aspect-[4/3]"
                    >
                      <Image
                        src="/images/case-studies/nyc-dcwp-business-licenses/process-1.webp"
                        alt="DCWP office waiting area at 42 Broadway"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 45vw"
                      />
                    </div>
                    <div
                      data-section="nyc-dcwp-process-photo-service-counter"
                      className="relative w-full overflow-hidden aspect-[4/3]"
                    >
                      <Image
                        src="/images/case-studies/nyc-dcwp-business-licenses/process-2.webp"
                        alt="DCWP service counter with queue number display"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 45vw"
                      />
                    </div>
                  </div>
                </div>

                {/* Right column: 2 stacked images + caption */}
                <div
                  data-section="nyc-dcwp-understanding-process-right"
                  className="flex flex-col gap-8 md:gap-10"
                >
                  <div
                    data-section="nyc-dcwp-process-photo-testing-room"
                    className="relative w-full overflow-hidden aspect-[4/3]"
                  >
                    <Image
                      src="/images/case-studies/nyc-dcwp-business-licenses/process-3.webp"
                      alt="Staff member assisting a user in the DCWP testing room"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 45vw"
                    />
                  </div>
                  <div
                    data-section="nyc-dcwp-process-photo-ipad-kiosk"
                    className="relative w-full overflow-hidden aspect-[4/3]"
                  >
                    <Image
                      src="/images/case-studies/nyc-dcwp-business-licenses/process-4.webp"
                      alt="iPad kiosk station at DCWP office"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 45vw"
                    />
                  </div>
                  <p
                    data-section="nyc-dcwp-understanding-process-office-caption"
                    className="text-sm md:text-base text-text-body leading-relaxed"
                  >
                    At the DCWP office, client managers assisted users to
                    create online accounts using the iPads available on-site.
                    While the users couldn&apos;t upload documents or make
                    payments on these public devices, the idea was to push them
                    towards using the online service—so that next time, they
                    could complete the renewal on their own without needing to
                    come to the office.
                  </p>
                </div>
              </div>
            </section>

            <ChecklistProcessOverviewSection />

            <div
              data-section="nyc-dcwp-divider-before-case-studies-hub"
              className="border-t mt-40 md:mt-48 mb-16 md:mb-20"
              style={{ borderColor: 'rgb(var(--color-text-color10))' }}
            />

            {/* Sub-case study thumbnails */}
            <section
              data-section="nyc-dcwp-case-studies-hub"
              className="pt-16 md:pt-28"
            >
              <div
                data-section="nyc-dcwp-case-studies-hub-header"
                className="space-y-4 mb-12 md:mb-16"
              >
                <h3 className="text-xl md:text-[28px] font-bold text-text-primary leading-snug">
                  Case Studies
                </h3>
                <p className="text-base md:text-[18px] text-text-body leading-relaxed max-w-2xl">
                  To help you better understand each part of this large project,
                  I&apos;ve broken it up into bite-sized case studies for an
                  easier read.
                </p>
              </div>
              <div
                data-section="nyc-dcwp-case-studies-hub-grid"
                className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10"
              >
                <ProjectCard
                  variant="sub-case"
                  title="Redesigning the Application Checklist Page"
                  description="NYC Department of Consumer Affairs & Worker Protection — 2025"
                  readTime="8 min read"
                  imageUrl="/images/case-studies/nyc-dcwp-business-licenses/checklist-thumbnail.png"
                  themeColor="rgb(var(--color-text-color10))"
                  glowColor="#3183CB"
                  imageSizes="(max-width: 768px) 100vw, 45vw"
                  anchorId="checklist"
                  organization=""
                  year=""
                  tags={[]}
                />
                <ProjectCard
                  variant="sub-case"
                  title="Form Design"
                  description="NYC Department of Consumer Affairs & Worker Protection — 2025"
                  imageUrl="/images/case-studies/nyc-dcwp-business-licenses/thumb-form-design.png"
                  themeColor="rgb(var(--color-text-color10))"
                  glowColor="#3183CB"
                  imageSizes="(max-width: 768px) 100vw, 45vw"
                  organization=""
                  year=""
                  tags={[]}
                />
                <ProjectCard
                  variant="sub-case"
                  title="Dashboard"
                  description="NYC Department of Consumer Affairs & Worker Protection — 2025"
                  readTime="12 min read"
                  imageUrl="/images/case-studies/nyc-dcwp-business-licenses/thumb-dashboard.png"
                  themeColor="rgb(var(--color-text-color10))"
                  glowColor="#3183CB"
                  imageSizes="(max-width: 768px) 100vw, 45vw"
                  organization=""
                  year=""
                  tags={[]}
                />
              </div>
            </section>

            <ChecklistSubCase />

            <HighlightsSection />

            {/* Research */}
            <section
              data-section="nyc-dcwp-research"
              className="mt-20 md:mt-28 lg:mt-36 space-y-20 md:space-y-28"
            >
              <div
                data-section="nyc-dcwp-research-intro"
                className="max-w-[680px] space-y-6"
              >
                <h3 className="text-xl md:text-[28px] font-bold text-text-primary leading-snug">
                  Research
                </h3>
                <p className="text-base md:text-[18px] leading-relaxed text-text-body">
                  To understand if this page was effective in guiding and empowering users through the
                  process, we conducted 10 moderated usability testing sessions. The results confirmed
                  our suspicions and helped us to convince the client of the need to redesign the
                  checklist page.
                </p>
              </div>

              {/* Insight 01 — image left, content right */}
              <div
                data-section="nyc-dcwp-research-insight-01"
                className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-start"
              >
                {/* Left: document image + toggle below */}
                <div
                  data-section="nyc-dcwp-research-insight-01-media"
                  className="flex flex-col gap-3"
                >
                  {/* Crossfade: base image defines layout, annotated layer fades over it */}
                  <div
                    data-section="nyc-dcwp-research-insight-01-crossfade"
                    className="relative w-full overflow-hidden"
                  >
                    <Image
                      src="/images/case-studies/nyc-dcwp-business-licenses/insight-1-no-annotations.png"
                      alt="DCWP checklist page without annotations"
                      width={1000}
                      height={1400}
                      className="w-full h-auto"
                      sizes="(max-width: 768px) 100vw, 45vw"
                    />
                    <m.div
                      data-section="nyc-dcwp-research-insight-01-annotated-layer"
                      className="absolute inset-0"
                      animate={{ opacity: showAnnotations ? 1 : 0 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                    >
                      <Image
                        src="/images/case-studies/nyc-dcwp-business-licenses/insight-1-annotated.png"
                        alt="DCWP checklist page with annotations highlighting problem areas"
                        width={1000}
                        height={1400}
                        className="w-full h-auto"
                        sizes="(max-width: 768px) 100vw, 45vw"
                      />
                    </m.div>
                  </div>

                  {/* Toggle — below image */}
                  <div
                    data-section="nyc-dcwp-research-insight-01-annotation-toggle"
                    className="flex items-center"
                  >
                    <button
                      onClick={() => setShowAnnotations((v) => !v)}
                      aria-pressed={showAnnotations}
                      className="flex items-center gap-3 rounded-full px-4 py-2.5 text-sm font-medium text-text-primary transition-colors"
                      style={{ backgroundColor: 'rgb(var(--color-text-color10))' }}
                    >
                      <span>Show annotations</span>
                      <span
                        className="relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors duration-200"
                        style={{
                          backgroundColor: showAnnotations ? '#3183CB' : 'rgb(var(--color-text-color30))',
                        }}
                      >
                        <span
                          className="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200"
                          style={{
                            transform: showAnnotations ? 'translateX(20px)' : 'translateX(0)',
                          }}
                        />
                      </span>
                    </button>
                  </div>
                </div>

                {/* Right: insight 01 content */}
                <div
                  data-section="nyc-dcwp-research-insight-01-copy"
                  className="space-y-6 md:ml-auto md:max-w-[440px]"
                >
                  <div
                    data-section="nyc-dcwp-research-insight-01-heading-body"
                    className="space-y-3 md:max-w-[380px]"
                  >
                    <p className="text-2xl md:text-insight-num font-bold text-text-primary opacity-50">
                      01
                    </p>
                    <h4 className="text-xl md:text-2xl font-bold text-text-primary">
                      Important information does not stand out
                    </h4>
                    <p className="text-sm md:text-base font-normal text-text-body leading-relaxed">
                      There are many important sections, but they are not visually distinct and
                      don&apos;t stand out from the other content. Additionally, some sections are
                      bold, others italicized, and multiple font sizes are used. There is no
                      consistency in styling.
                    </p>
                  </div>

                  <div
                    data-section="nyc-dcwp-research-insight-01-impact"
                    className="space-y-2 md:max-w-[380px]"
                  >
                    <p className="text-sm font-mono uppercase tracking-widest text-text-color70">
                      Impact
                    </p>
                    <p className="text-sm font-sans font-normal text-text-body leading-relaxed">
                      When everything looks the same, users may overlook critical requirements or
                      instructions, increasing the risk of submitting incomplete or incorrect
                      applications—potentially leading to rejection, avoidable delays, and
                      additional costs.
                    </p>
                  </div>

                  <div
                    data-section="nyc-dcwp-research-insight-01-quote"
                    className="mt-10 md:mt-16"
                  >
                    <AnimatedText variant="quote"
                      className="text-xl md:text-case-heading font-bold tracking-[-0.02em] text-text-primary md:max-w-[420px]"
                      segments={[
                        { text: '\u201cThere are many important sections but' },
                        { text: 'you can\u2019t even tell that they are important,', color: '#3183CB' },
                        { text: 'they blend with the other sections\u201d' },
                      ]}
                    />
                  </div>
                </div>
              </div>

              {/* Insight 02 — full width, two-column layout */}
              <div
                data-section="nyc-dcwp-research-insight-02"
                className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 "
              >
                {/* Left: number + heading + body */}
                <div
                  data-section="nyc-dcwp-research-insight-02-copy"
                  className="space-y-3 md:max-w-[380px]"
                >
                  <p className="text-2xl md:text-insight-num font-bold text-text-primary opacity-50">
                    02
                  </p>
                  <h4 className="text-xl md:text-2xl font-bold text-text-primary">
                    Users would just skip the Exam section
                  </h4>
                  <p className="text-sm md:text-base font-normal text-text-body leading-relaxed">
                    During testing we noticed that users barely read through the whole page
                    because it was just too long and dense. Most of them assumed they just had to
                    fill out the application, submit the documents and that was it. They were
                    unaware that they needed to take an exam and undergo fingerprinting.
                  </p>
                  <p className="text-sm md:text-base font-normal text-text-body leading-relaxed">
                    A DCWP staff member also noted that a significant number of applicants
                    attempted to register for the exam before completing their
                    application—despite the fact that the exam can only be taken after the
                    application is approved—indicating a lack of understanding of the process
                    and the correct order of steps.
                  </p>
                </div>

                {/* Right: quote pinned to bottom */}
                <div
                  data-section="nyc-dcwp-research-insight-02-quote"
                  className="md:flex md:items-end md:justify-end"
                >
                  <AnimatedText variant="quote"
                    className="text-xl md:text-case-heading font-bold tracking-[-0.02em] text-text-primary md:max-w-[420px]"
                    segments={[
                      { text: '\u201cI did not realize that you have to give an exam.', color: '#3183CB' },
                      { text: 'At first, I thought we just have to gather the documents and fill an online form\u201d' },
                    ]}
                  />
                </div>
              </div>

              {/* Insight 03 — image left, content right. Toggle sits below the grid so the
                   grid height = image height, letting the quote pin to the image bottom. */}
              <div
                data-section="nyc-dcwp-research-insight-03-stack"
                className="flex flex-col gap-3"
              >
                <div
                  data-section="nyc-dcwp-research-insight-03"
                  className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 md:items-stretch"
                >
                  {/* Left: image only */}
                  <div
                    data-section="nyc-dcwp-research-insight-03-crossfade"
                    className="relative w-full overflow-hidden"
                  >
                    <Image
                      src="/images/case-studies/nyc-dcwp-business-licenses/insight-2-no-annotations.png"
                      alt="DCWP checklist page without annotations"
                      width={1000}
                      height={1400}
                      className="w-full h-auto"
                      sizes="(max-width: 768px) 100vw, 45vw"
                    />
                    <m.div
                      data-section="nyc-dcwp-research-insight-03-annotated-layer"
                      className="absolute inset-0"
                      animate={{ opacity: showAnnotations2 ? 1 : 0 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                    >
                      <Image
                        src="/images/case-studies/nyc-dcwp-business-licenses/insight-2-annotated.png"
                        alt="DCWP checklist page with annotations on fee table and CTA"
                        width={1000}
                        height={1400}
                        className="w-full h-auto"
                        sizes="(max-width: 768px) 100vw, 45vw"
                      />
                    </m.div>
                  </div>

                  {/* Right: insight 03 content — quote pins to image bottom */}
                  <div
                    data-section="nyc-dcwp-research-insight-03-copy"
                    className="flex flex-col justify-between md:ml-auto md:max-w-[440px] gap-6"
                  >
                    <div
                      data-section="nyc-dcwp-research-insight-03-heading-body"
                      className="space-y-3"
                    >
                      <p className="text-2xl md:text-insight-num font-bold text-text-primary opacity-50">03</p>
                      <h4 className="text-xl md:text-2xl font-bold text-text-primary">
                        Fee Table is not easy to understand
                      </h4>
                      <p className="text-sm md:text-base font-normal text-text-body leading-relaxed md:max-w-[380px]">
                        The current fee table on the page is difficult to understand. The amount you
                        pay depends on a bunch of factors, whether it&apos;s an odd or even year, how
                        long the license is valid for, and the month in which the applicant applies.
                      </p>
                    </div>
                    <div data-section="nyc-dcwp-research-insight-03-quote">
                      <AnimatedText variant="quote"
                        className="text-xl md:text-case-heading font-bold tracking-[-0.02em] text-text-primary md:max-w-[420px]"
                        segments={[
                          { text: '\u201cI will be able to understand this if I read carefully but I wouldn\u2019t say it\u2019s good.' },
                          { text: 'The odd-even thing is confusing\u201d', color: '#3183CB' },
                        ]}
                      />
                    </div>
                  </div>
                </div>

                {/* Toggle sits below the grid — doesn't affect row height */}
                <div
                  data-section="nyc-dcwp-research-insight-03-annotation-toggle"
                  className="flex items-center"
                >
                  <button
                    onClick={() => setShowAnnotations2((v) => !v)}
                    aria-pressed={showAnnotations2}
                    className="flex items-center gap-3 rounded-full px-4 py-2.5 text-sm font-medium text-text-primary transition-colors"
                    style={{ backgroundColor: 'rgb(var(--color-text-color10))' }}
                  >
                    <span>Show annotations</span>
                    <span
                      className="relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors duration-200"
                      style={{
                        backgroundColor: showAnnotations2 ? '#3183CB' : 'rgb(var(--color-text-color30))',
                      }}
                    >
                      <span
                        className="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200"
                        style={{
                          transform: showAnnotations2 ? 'translateX(20px)' : 'translateX(0)',
                        }}
                      />
                    </span>
                  </button>
                </div>
              </div>

              {/* Insight 04 — full width, two-column */}
              <div
                data-section="nyc-dcwp-research-insight-04"
                className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 "
              >
                <div
                  data-section="nyc-dcwp-research-insight-04-copy"
                  className="space-y-4 md:max-w-[380px]"
                >
                  <p className="text-2xl md:text-insight-num font-bold text-text-primary opacity-50">04</p>
                  <h4 className="text-xl md:text-2xl font-bold text-text-primary">
                    CTA* Placement Does Not Match User Expectations
                  </h4>
                  <p className="text-sm md:text-base font-normal text-text-body leading-relaxed">
                    Most users expect the option to begin their application to be at the top of the
                    page. Instead, they have to scroll through a lengthy page to find it. It also
                    lacks the visual cues you typically associate with a button—with one user
                    commenting that it looks more like a banner ad.
                  </p>
                  <div
                    data-section="nyc-dcwp-research-insight-04-impact"
                    className="space-y-2 pt-2"
                  >
                    <p className="text-sm font-mono uppercase tracking-widest text-text-color70">
                      Impact
                    </p>
                    <p className="text-sm font-sans font-normal text-text-body leading-relaxed">
                      Users are likely to miss the application button entirely or assume they need
                      to visit a separate page, increasing drop-off and confusion at a critical
                      step in the process.
                    </p>
                  </div>
                </div>
                <div
                  data-section="nyc-dcwp-research-insight-04-quote"
                  className="md:flex md:items-end md:justify-end"
                >
                  <AnimatedText variant="quote"
                    className="text-xl md:text-case-heading tracking-[-0.02em] text-text-primary md:max-w-[420px]"
                    segments={[
                      { text: '\u201cWhy is this all the way down on the page?' },
                      { text: 'I need to scroll all the way down to actually apply\u201d', color: '#3183CB' },
                    ]}
                  />
                </div>
              </div>

              {/* Insight 05 — full width, two-column */}
              <div
                data-section="nyc-dcwp-research-insight-05"
                className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 "
              >
                <div
                  data-section="nyc-dcwp-research-insight-05-copy"
                  className="space-y-3 md:max-w-[380px]"
                >
                  <p className="text-2xl md:text-insight-num font-bold text-text-primary opacity-50">05</p>
                  <h4 className="text-xl md:text-2xl font-bold text-text-primary">
                    The Page is too long
                  </h4>
                  <p className="text-sm md:text-base font-normal text-text-body leading-relaxed">
                    Users mentioned that the page felt excessively long, especially when viewed on
                    mobile. The length discouraged thorough reading, made users feel overwhelmed.
                    Many stopped reading halfway and skipped important details.
                  </p>
                </div>
                <div
                  data-section="nyc-dcwp-research-insight-05-quote"
                  className="md:flex md:items-end md:justify-end"
                >
                  <AnimatedText variant="quote"
                    className="text-xl md:text-case-heading tracking-[-0.02em] text-text-primary md:max-w-[420px]"
                    segments={[
                      { text: '\u201cI was expecting a step-by-step guide.. this is too long to read.' },
                      { text: 'I am losing focus..\u201d', color: '#3183CB' },
                    ]}
                  />
                </div>
              </div>
            </section>

            <ChecklistSolutionsSection />
          </div>
        </CaseStudyReadMore>
      </div>
    </m.section>
  )
}
