'use client'

import { m } from 'framer-motion'
import { useState } from 'react'
import { CaseStudyReadMore } from '@/components/case-study/CaseStudyReadMore'
import { AnimatedTitle } from '@/components/ui/AnimatedTitle'
import { OptimizedImage } from '@/components/case-study/OptimizedImage'
import { AnimatedBars } from '@/components/case-study/AnimatedBars'

interface GutenbergContentProps {
  isContentRevealed: boolean
  onToggleContent: () => void
}

export function GutenbergContent({
  isContentRevealed,
  onToggleContent,
}: GutenbergContentProps) {
  const [isSUSCalloutOpen, setIsSUSCalloutOpen] = useState(false)
  return (
    <m.section
      className="w-full px-6 2xl:px-[140px] py-16 md:py-24 max-w-[1920px] mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <div className="max-w-[1044px] mx-auto text-left">
        {/* Abstract Section */}
        <h3 className="text-lg md:text-case-heading font-bold text-text-primary mb-6 md:mb-[28px]">
          Abstract
        </h3>

        <div className="space-y-6 md:space-y-8">
          <p className="text-base md:text-[18px] font-normal text-text-body leading-relaxed">
            This case study is based on a usability evaluation of Gutenberg
            Technologies&apos; course management system (CMS), a legacy
            e-learning content authoring platform used primarily by
            publishers. The research focused on understanding how new users
            create content, manage the table of contents, interact with
            drag-and-drop features, and discover and use AI-assisted content
            generation. Using moderated user testing with eye-tracking and
            Retrospective Think-Aloud (RTA), the study triangulated
            behavioral metrics, gaze data, and verbal feedback across nine
            participants to identify critical breakdowns in onboarding and
            authoring workflows.
          </p>
          <p className="text-base md:text-[18px] font-normal text-text-body leading-relaxed">
            Findings revealed a strong learnability baseline driven by
            familiar editor patterns, but significant usability issues caused
            by expectation mismatches, poor feature discoverability, and
            unclear system-generated structures. Key problems included
            confusion around default template pages, forced template
            selection during &ldquo;author from scratch&rdquo; flows, and
            multiple points of friction in the AI content generation
            experience.
          </p>
        </div>

        {/* My Role Section */}
        <div className="mt-12 md:mt-16">
          <h3 className="text-lg md:text-[24px] font-bold text-text-primary mb-6 md:mb-[28px]">
            My Role
          </h3>

          <div className="space-y-6 md:space-y-8">
            <p className="text-base md:text-[18px] font-medium text-text-body leading-relaxed">
              As part of a four-person research team, I contributed to:
            </p>
            <ul className="space-y-2 md:space-y-3 list-disc list-inside ml-2">
              <li className="text-base md:text-[18px] font-normal text-text-body leading-relaxed">
                Research planning and hypothesis development
              </li>
              <li className="text-base md:text-[18px] font-normal text-text-body leading-relaxed">
                Eye-tracking study design and moderation
              </li>
              <li className="text-base md:text-[18px] font-normal text-text-body leading-relaxed">
                Analyzing the insights
              </li>
              <li className="text-base md:text-[18px] font-normal text-text-body leading-relaxed">
                Design recommendations
              </li>
            </ul>
          </div>
        </div>

        <CaseStudyReadMore
          readTime="10 min read"
          isContentRevealed={isContentRevealed}
          onToggleContent={onToggleContent}
        >
              <div>
                {/* Project Overview Section */}
                <h3
                  className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]"
                  style={{ color: 'rgb(var(--color-text-tertiary))' }}
                >
                  Project Overview
                </h3>

                <AnimatedTitle
                  text="Understanding First-Time User Experience in a Legacy CMS"
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
                    Gutenberg Technologies is an e-learning course builder tool
                    for creating text-based learning materials like textbooks and
                    training resources, primarily used by publishers. Their course
                    management system (CMS) is outdated and difficult for new
                    users.
                  </p>
                  <p
                    className="text-base md:text-[18px] font-normal leading-relaxed"
                    style={{ color: 'rgb(var(--color-text-color90))' }}
                  >
                    The client wanted to improve the usability of the CMS, make
                    the product more intuitive, and integrate generative AI to
                    simplify resource creation.
                  </p>
                </div>

                {/* Divider */}
                <div
                  className="border-t my-24 md:my-32"
                  style={{ borderColor: 'rgb(var(--color-text-color10))' }}
                />

                {/* Research Objectives Section */}
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
                  The objective of the study is to understand the use of the{' '}
                  <span className="font-semibold">Table of Contents</span>,{' '}
                  <span className="font-semibold">Authoring from scratch</span>,
                  and the functionality of the{' '}
                  <span className="font-semibold">drag and drop features</span> in
                  the CMS.
                </p>

                <ul className="space-y-6 md:space-y-7">
                  <li className="flex items-start gap-4">
                    <span
                      className="mt-[0.6em] h-1.5 w-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: 'rgb(var(--color-text-secondary))' }}
                    />
                    <div>
                      <div className="text-base md:text-[18px] font-semibold leading-relaxed text-text-body">
                        Table of contents (TOC)
                      </div>
                      <p
                        className="text-base md:text-[18px] font-normal mt-1 md:mt-1.5 leading-relaxed"
                        style={{ color: 'rgb(var(--color-text-tertiary))' }}
                      >
                        Explore users&apos; challenges in creating and managing
                        the TOC, their understanding of different options offered
                        in TOC, and the reasoning behind their actions.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span
                      className="mt-[0.6em] h-1.5 w-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: 'rgb(var(--color-text-secondary))' }}
                    />
                    <div>
                      <div className="text-base md:text-[18px] font-semibold leading-relaxed text-text-body">
                        Authoring content from scratch
                      </div>
                      <p
                        className="text-base md:text-[18px] font-normal mt-1 md:mt-1.5 leading-relaxed"
                        style={{ color: 'rgb(var(--color-text-tertiary))' }}
                      >
                        Explore users&apos; starting points, their authoring
                        process, and where challenges or misunderstandings arise.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span
                      className="mt-[0.6em] h-1.5 w-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: 'rgb(var(--color-text-secondary))' }}
                    />
                    <div>
                      <div className="text-base md:text-[18px] font-semibold leading-relaxed text-text-body">
                        Drag-and-drop
                      </div>
                      <p
                        className="text-base md:text-[18px] font-normal mt-1 md:mt-1.5 leading-relaxed"
                        style={{ color: 'rgb(var(--color-text-tertiary))' }}
                      >
                        Explore where users get confused, what creates the highest
                        cognitive load, and why drag-and-drop feels difficult.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span
                      className="mt-[0.6em] h-1.5 w-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: 'rgb(var(--color-text-secondary))' }}
                    />
                    <div>
                      <div className="text-base md:text-[18px] font-semibold text-text-body leading-relaxed">
                        AI-assisted content generation
                      </div>
                      <p
                        className="text-base md:text-[18px] font-normal mt-1 md:mt-1.5 leading-relaxed"
                        style={{ color: 'rgb(var(--color-text-tertiary))' }}
                      >
                        Explore how users discover and interact with the &quot;Generate
                        with AI&quot; tool.
                      </p>
                    </div>
                  </li>
                </ul>

                {/* Divider */}
                <div
                  className="border-t my-24 md:my-32"
                  style={{ borderColor: 'rgb(var(--color-text-color10))' }}
                />

                {/* Methodology Section */}
                <div className="mt-12 md:mt-16">
                  <h3
                    className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]"
                    style={{ color: 'rgb(var(--color-text-tertiary))' }}
                  >
                    Methodology
                  </h3>

                  <AnimatedTitle
                    text="Evaluating usability through behavioral and attitudinal data"
                    animationType="fadeIn"
                    alwaysAnimate={false}
                    delay={0}
                    className="text-2xl md:text-[40px] font-bold text-text-primary mb-6 md:mb-8 leading-tight tracking-[-0.05em]"
                  />

                  {/* Eye Tracking Setup Image */}
                  <div className="mb-12 md:mb-16 max-w-full md:max-w-[768px] mx-auto">
                    <OptimizedImage
                      webpSrc="/images/case-studies/gutenberg-cms-usability-evaluation/eyetracking-01.webp"
                      fallbackSrc="/images/case-studies/gutenberg-cms-usability-evaluation/eyetracking-01.webp"
                      alt="Eye tracking setup during usability testing session"
                      width={768}
                      height={432}
                      className="w-full rounded-lg"
                    />
                  </div>

                  <div className="space-y-6 md:space-y-8 mb-12 md:mb-16">
                    <p
                      className="text-base md:text-[18px] font-normal leading-relaxed"
                      style={{ color: 'rgb(var(--color-text-color90))' }}
                    >
                      We conducted{' '}
                      <span className="font-bold">
                        9 moderated desktop usability sessions
                      </span>{' '}
                      (45–60 minutes each) using{' '}
                      <span className="font-bold">Tobii eye-tracking</span>{' '}
                      software, with participants recruited through{' '}
                      <span className="font-bold">dscout Private Panels</span>. To
                      better understand user behavior, we paired eye tracking with
                      the{' '}
                      <span className="font-bold">
                        Retrospective Think-Aloud (RTA)
                      </span>{' '}
                      method, asking participants to reflect on their actions after
                      completing tasks. This allowed us to capture not just what
                      users did, but where they looked and why they made specific
                      decisions. Participants also completed the{' '}
                      <span className="font-bold">System Usability Scale (SUS)</span>{' '}
                      to provide a quantitative measure of overall usability.
                    </p>
                  </div>

                  <h4
                    className="text-base md:text-[22px] font-bold mb-6 md:mb-[28px]"
                    style={{ color: 'rgb(var(--color-text-primary))' }}
                  >
                    Data Collected:
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Task Performance */}
                    <div className="space-y-3">
                      <OptimizedImage
                        webpSrc="/images/case-studies/gutenberg-cms-usability-evaluation/timeontask.webp"
                        fallbackSrc="/images/case-studies/gutenberg-cms-usability-evaluation/timeontask.webp"
                        alt="Task Performance data"
                        width={223}
                        height={116}
                        className="w-full"
                      />
                      <div className="space-y-1">
                        <p
                          className="text-[14px] font-bold leading-relaxed"
                          style={{ color: 'rgb(var(--color-text-secondary))' }}
                        >
                          Task Performance
                        </p>
                        <p
                          className="text-[14px] font-normal leading-relaxed"
                          style={{ color: 'rgb(var(--color-text-color60))' }}
                        >
                          Tracking task completion, time-on-task to identify
                          friction points across key authoring workflows.
                        </p>
                      </div>
                    </div>

                    {/* Usability Assessment */}
                    <div className="space-y-3">
                      <OptimizedImage
                        webpSrc="/images/case-studies/gutenberg-cms-usability-evaluation/SUS.webp"
                        fallbackSrc="/images/case-studies/gutenberg-cms-usability-evaluation/SUS.webp"
                        alt="Usability Assessment data"
                        width={223}
                        height={116}
                        className="w-full"
                      />
                      <div className="space-y-1">
                        <p
                          className="text-[14px] font-bold leading-relaxed"
                          style={{ color: 'rgb(var(--color-text-secondary))' }}
                        >
                          Usability Assessment
                        </p>
                        <p
                          className="text-[14px] font-normal leading-relaxed"
                          style={{ color: 'rgb(var(--color-text-color60))' }}
                        >
                          Using System Usability Scale (SUS) responses to capture
                          participants&apos; overall perception of ease of use and
                          system clarity.
                        </p>
                      </div>
                    </div>

                    {/* Gaze Data */}
                    <div className="space-y-3">
                      <OptimizedImage
                        webpSrc="/images/case-studies/gutenberg-cms-usability-evaluation/Gazedata.webp"
                        fallbackSrc="/images/case-studies/gutenberg-cms-usability-evaluation/Gazedata.webp"
                        alt="Gaze Data visualization"
                        width={223}
                        height={116}
                        className="w-full"
                      />
                      <div className="space-y-1">
                        <p
                          className="text-[14px] font-bold leading-relaxed"
                          style={{ color: 'rgb(var(--color-text-secondary))' }}
                        >
                          Gaze Data
                        </p>
                        <p
                          className="text-[14px] font-normal leading-relaxed"
                          style={{ color: 'rgb(var(--color-text-color60))' }}
                        >
                          Analyzing gaze plots, heatmaps, and gaze replays to
                          understand where users focused their attention and what
                          they noticed or missed.
                        </p>
                      </div>
                    </div>

                    {/* Retrospective Think-Aloud */}
                    <div className="space-y-3">
                      <OptimizedImage
                        webpSrc="/images/case-studies/gutenberg-cms-usability-evaluation/RTA.webp"
                        fallbackSrc="/images/case-studies/gutenberg-cms-usability-evaluation/RTA.webp"
                        alt="Retrospective Think-Aloud notes"
                        width={223}
                        height={116}
                        className="w-full"
                      />
                      <div className="space-y-1">
                        <p
                          className="text-[14px] font-bold leading-relaxed"
                          style={{ color: 'rgb(var(--color-text-secondary))' }}
                        >
                          Retrospective Think-Aloud (RTA) Notes
                        </p>
                        <p
                          className="text-[14px] font-normal leading-relaxed"
                          style={{ color: 'rgb(var(--color-text-color60))' }}
                        >
                          Reviewing session replays with participants to understand
                          the reasoning behind their actions and decisions.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* System Usability Scale (SUS) Section */}
                  <div className="mt-16 md:mt-24">
                    <h4
                      className="text-xs md:text-sm font-bold uppercase tracking-wider mb-6 md:mb-8"
                      style={{ color: 'rgb(var(--color-text-tertiary))' }}
                    >
                      System Usability Scale (SUS)
                    </h4>

                    {/* SUS Diagram Image */}
                    <div className="mb-6 md:mb-8">
                      <OptimizedImage
                        webpSrc="/images/case-studies/gutenberg-cms-usability-evaluation/SUS_Diagram.webp"
                        fallbackSrc="/images/case-studies/gutenberg-cms-usability-evaluation/SUS_Diagram.webp"
                        alt="System Usability Scale (SUS) score visualization"
                        width={940}
                        height={529}
                        className="w-full"
                      />
                    </div>

                    {/* What is SUS? Button and Text Callout */}
                    <div className="mb-8 md:mb-12">
                      {!isSUSCalloutOpen ? (
                        <button
                          onClick={() => setIsSUSCalloutOpen(true)}
                          className="text-base md:text-[18px] font-normal underline underline-offset-4 hover:opacity-70 transition-opacity"
                          style={{ color: 'rgb(var(--color-text-primary))' }}
                        >
                          What is SUS?
                        </button>
                      ) : (
                        <m.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.3 }}
                          className="relative p-4 md:p-6"
                          style={{
                            backgroundColor: 'rgb(var(--color-surface-elevated))',
                          }}
                        >
                          {/* Close Button */}
                          <button
                            onClick={() => setIsSUSCalloutOpen(false)}
                            className="absolute top-4 right-4 md:top-6 md:right-6 z-10 w-8 h-8 flex items-center justify-center hover:opacity-70 transition-opacity"
                            aria-label="Close"
                          >
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12 4L4 12M4 4L12 12"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                style={{ color: 'rgb(var(--color-text-primary))' }}
                              />
                            </svg>
                          </button>

                          {/* Simple Text Callout */}
                          <div className="flex items-start gap-4">
                            <span
                              className="text-2xl md:text-3xl flex-shrink-0"
                              aria-hidden="true"
                            >
                              💡
                            </span>
                            <p
                              className="text-base md:text-[18px] font-normal leading-relaxed flex-1"
                              style={{ color: 'rgb(var(--color-text-color90))' }}
                            >
                              The System Usability Scale (SUS) is a widely used
                              10-question survey rated on a 1-5 agreement scale to
                              assess perceived product usability.
                            </p>
                          </div>
                        </m.div>
                      )}
                    </div>

                    {/* Text below image */}
                    <div className="space-y-8 md:space-y-12">
                      {/* Overall Score */}
                      <div className="space-y-3">
                        <div className="text-[48px] font-bold tracking-[-0.05em] text-warning">
                          60
                        </div>
                        <p
                          className="text-[20px] font-bold leading-relaxed"
                          style={{ color: 'rgb(var(--color-text-primary))' }}
                        >
                          The Overall score was 60 (Needs improvement - Below Industry
                          Benchmark)
                        </p>
                      </div>

                      {/* Learnability and Usability Scores */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        {/* Learnability Score */}
                        <div className="space-y-3">
                          <div
                            className="text-[32px] font-bold tracking-[-0.05em]"
                            style={{ color: 'rgb(var(--color-text-primary))' }}
                          >
                            72.2
                          </div>
                          <p
                            className="text-base md:text-[18px] font-semibold leading-relaxed"
                            style={{ color: 'rgb(var(--color-text-primary))' }}
                          >
                            The Learnability score was 72.2{' '}
                            <span className="text-success">
                              — Good
                            </span>
                          </p>
                          <p
                            className="text-[16px] font-normal leading-relaxed"
                            style={{ color: 'rgb(var(--color-text-secondary))' }}
                          >
                            The tool feels familiar enough for users to learn how to
                            use properly
                          </p>
                        </div>

                        {/* Usability Score */}
                        <div className="space-y-3">
                          <div
                            className="text-[32px] font-bold tracking-[-0.05em]"
                            style={{ color: 'rgb(var(--color-text-primary))' }}
                          >
                            56.9
                          </div>
                          <p
                            className="text-base md:text-[18px] font-semibold leading-relaxed"
                            style={{ color: 'rgb(var(--color-text-primary))' }}
                          >
                            The Usability score was 56.9{' '}
                            <span className="text-error">
                              — Needs improvement
                            </span>
                          </p>
                          <p
                            className="text-[16px] font-normal leading-relaxed"
                            style={{ color: 'rgb(var(--color-text-secondary))' }}
                          >
                            People struggle to find the right features and understand
                            how to start, which makes it overall less usable
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div
                  className="border-t my-24 md:my-32"
                  style={{ borderColor: 'rgb(var(--color-text-color10))' }}
                />

                {/* Findings and Recommendations Section */}
                <div className="mt-12 md:mt-16">

                  {/* Finding 1 */}
                  <h3
                    className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]"
                    style={{ color: 'rgb(var(--color-text-tertiary))' }}
                  >
                    Finding 1
                  </h3>

                  <AnimatedTitle
                    text="Making template selection required during project creation caused expectation mismatch"
                    animationType="fadeIn"
                    alwaysAnimate={false}
                    delay={0}
                    className="text-2xl md:text-[40px] font-bold text-text-primary mb-24 leading-tight tracking-[-0.05em]"
                  />

                  {/* Data Visualization with 9 Bars */}
                  <div className="mb-12 md:mb-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
                      {/* Left Column: Bars and Stats */}
                      <div className="flex items-start gap-4 md:gap-6">
                        {/* 9 Vertical Bars */}
                        <AnimatedBars
                          total={9}
                          filled={7}
                          filledColor="var(--cs-pop-light)"
                        />

                        {/* 7/9 Users Text */}
                        <div>
                          <div
                            className="text-5xl md:text-6xl font-bold leading-none mb-2 tracking-[-0.05em]"
                            style={{ color: 'rgb(var(--color-text-primary))' }}
                          >
                            7/9
                          </div>
                          <div 
                            className="text-lg md:text-xl font-medium"
                            style={{ color: 'rgb(var(--color-text-secondary))' }}
                          >
                            Users
                          </div>
                        </div>
                      </div>

                      {/* Right Column: Description */}
                      <div>
                        <p
                          className="text-base md:text-[18px] font-normal leading-relaxed"
                          style={{ color: 'rgb(var(--color-text-color90))' }}
                        >
                          7 out of 9 new users were confused by being asked to
                          &quot;create a project from scratch&quot; but then
                          immediately being forced to select a template to proceed.
                          With only one template available, users questioned whether
                          they were making the right choice and expressed uncertainty
                          about how to continue.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Finding 1 - Image 1.1 */}
                  <div id="finding-1-image-1" className="mb-2">
                    <OptimizedImage
                      webpSrc="/images/case-studies/gutenberg-cms-usability-evaluation/f1-s1-2.webp"
                      fallbackSrc="/images/case-studies/gutenberg-cms-usability-evaluation/f1-s1-2.webp"
                      alt="Comparison of current and proposed design for project creation modal - showing how adding a 'Continue without a theme' option improves user experience"
                      width={2820}
                      height={1621}
                      className="w-full rounded-lg"
                    />
                  </div>
                  <p
                    className="text-sm mb-6 md:mb-8"
                    style={{ color: 'rgb(var(--color-text-tertiary))' }}
                  >
                    Image 1.1
                  </p>

                  {/* Finding 1 - Image 1.2 */}
                  <div className="mb-2">
                    <OptimizedImage
                      webpSrc="/images/case-studies/gutenberg-cms-usability-evaluation/f1-s1-1.webp"
                      fallbackSrc="/images/case-studies/gutenberg-cms-usability-evaluation/f1-s1-1.webp"
                      alt="Comparison of current and proposed design for template selection - showing how the revised title and 'Start from Scratch' option reduces confusion"
                      width={2820}
                      height={1621}
                      className="w-full rounded-lg"
                    />
                  </div>
                  <p
                    className="text-sm mb-12 md:mb-16"
                    style={{ color: 'rgb(var(--color-text-tertiary))' }}
                  >
                    Image 1.2
                  </p>

                  {/* Eye Tracking Evidence */}
                  <div className="mt-12 md:mt-16">
                    <h4 className="text-lg md:text-case-heading font-bold text-text-primary mb-6 md:mb-8">
                      Eye Tracking Evidence
                    </h4>
                    <div className="w-full overflow-hidden bg-black">
                      <video
                        src="/images/case-studies/gutenberg-cms-usability-evaluation/eye-tracking-project-creation.mp4"
                        controls
                        playsInline
                        preload="metadata"
                        className="w-full h-auto"
                        aria-label="Eye tracking recording showing user hesitation during project creation"
                      />
                    </div>
                    <p
                      className="mt-3 text-sm italic"
                      style={{ color: 'rgb(var(--color-text-color60))' }}
                    >
                      Gaze Replay from Participant 5 shows confusion caused by the mismatch between &ldquo;create a project from scratch&rdquo; and being required to choose the only available template.
                    </p>
                  </div>

                  {/* Participant Quotes from the RTA */}
                  <div className="mt-12 md:mt-16">
                    <h4 className="text-lg md:text-case-heading font-bold text-text-primary mb-6 md:mb-8">
                      Participant Quotes from the RTA
                    </h4>

                    <div className="space-y-6 md:space-y-8">
                      {/* Quote 1 */}
                      <div className="flex items-start gap-6">
                        <div
                          className="w-[2px] self-stretch flex-shrink-0"
                          style={{ backgroundColor: 'rgb(var(--color-text-color20))' }}
                        />
                        <div className="flex-1 flex items-start justify-between gap-6">
                          <p
                            className="text-base md:text-[18px] italic leading-relaxed"
                            style={{ color: 'rgb(var(--color-text-color60))' }}
                          >
                            &ldquo;Can I make my own custom one or not? This is the only
                            one available I had to go ahead with it.&rdquo;
                          </p>
                          <span
                            className="text-base md:text-[18px] font-semibold whitespace-nowrap"
                            style={{ color: 'rgb(var(--color-text-primary))' }}
                          >
                            &ndash; P4
                          </span>
                        </div>
                      </div>

                      {/* Quote 2 */}
                      <div className="flex items-start gap-6">
                        <div
                          className="w-[2px] self-stretch flex-shrink-0"
                          style={{ backgroundColor: 'rgb(var(--color-text-color20))' }}
                        />
                        <div className="flex-1 flex items-start justify-between gap-6">
                          <p
                            className="text-base md:text-[18px] italic leading-relaxed"
                            style={{ color: 'rgb(var(--color-text-color60))' }}
                          >
                            &ldquo;there&apos;s just 1 template so... i just went ahead
                            with it because i didn&apos;t know otherwise&rdquo;
                          </p>
                          <span
                            className="text-base md:text-[18px] font-semibold whitespace-nowrap"
                            style={{ color: 'rgb(var(--color-text-primary))' }}
                          >
                            &ndash; P5
                          </span>
                        </div>
                      </div>

                      {/* Quote 3 */}
                      <div className="flex items-start gap-6">
                        <div
                          className="w-[2px] self-stretch flex-shrink-0"
                          style={{ backgroundColor: 'rgb(var(--color-text-color20))' }}
                        />
                        <div className="flex-1 flex items-start justify-between gap-6">
                          <p
                            className="text-base md:text-[18px] italic leading-relaxed"
                            style={{ color: 'rgb(var(--color-text-color60))' }}
                          >
                            &ldquo;I&apos;m not sure what to expect and what should I do
                            with what (template) I&apos;m using.&rdquo;
                          </p>
                          <span
                            className="text-base md:text-[18px] font-semibold whitespace-nowrap"
                            style={{ color: 'rgb(var(--color-text-primary))' }}
                          >
                            &ndash; P2
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="border-t my-16 md:my-24"
                    style={{ borderColor: 'rgb(var(--color-text-color10))' }}
                  />

                  {/* Finding 2 */}
                  <div className="mt-16 md:mt-24">
                    <h3
                      className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]"
                      style={{ color: 'rgb(var(--color-text-tertiary))' }}
                    >
                      Finding 2
                    </h3>

                    <AnimatedTitle
                      text="The System-Generated Template Page caused confusion"
                      animationType="fadeIn"
                      alwaysAnimate={false}
                      delay={0}
                      className="text-2xl md:text-[40px] font-bold text-text-primary mb-24 leading-tight tracking-[-0.05em]"
                    />

                    {/* 5/9 Data Visualization */}
                    <div className="mb-12 md:mb-16">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
                        {/* Left Column: Bars and Stats */}
                        <div className="flex items-start gap-4 md:gap-6">
                          {/* 9 Vertical Bars */}
                          <AnimatedBars
                            total={9}
                            filled={5}
                            filledColor="var(--cs-pop-light)"
                          />

                          {/* 5/9 Users Text */}
                          <div>
                            <div
                              className="text-5xl md:text-6xl font-bold leading-none mb-2 tracking-[-0.05em]"
                              style={{ color: 'rgb(var(--color-text-primary))' }}
                            >
                              5/9
                            </div>
                            <div
                              className="text-lg md:text-xl font-medium"
                              style={{ color: 'rgb(var(--color-text-secondary))' }}
                            >
                              Users
                            </div>
                          </div>
                        </div>

                        {/* Right Column: Description */}
                        <div>
                          <p
                            className="text-base md:text-[18px] font-normal leading-relaxed"
                            style={{ color: 'rgb(var(--color-text-color90))' }}
                          >
                            5 out of 9 participants mistook the system-generated default
                            page&apos;s heading blocks as actual project sections. This
                            misunderstanding slowed the authoring workflow, as users spent
                            time editing placeholder content instead of adding sections and
                            building their project structure through the Table of Contents.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* User Impact */}
                    <div className="mb-12 md:mb-16">
                      <h4 className="text-lg md:text-case-heading font-bold text-text-primary mb-6 md:mb-8">
                        User Impact
                      </h4>
                      <ul className="space-y-3 list-disc list-inside ml-2">
                        <li className="text-base md:text-[18px] font-normal leading-relaxed" style={{ color: 'rgb(var(--color-text-color90))' }}>
                          Task 1 (Author content from scratch) has the <strong>lowest success rate (0.7)</strong> and the <strong>highest time on task (4.6 mins)</strong>
                        </li>
                        <li className="text-base md:text-[18px] font-normal leading-relaxed" style={{ color: 'rgb(var(--color-text-color90))' }}>
                          Users wasted effort labeling and formatting template headings
                        </li>
                        <li className="text-base md:text-[18px] font-normal leading-relaxed" style={{ color: 'rgb(var(--color-text-color90))' }}>
                          Participants expressed frustration: <em>&ldquo;Why is there so much stuff on this page?&rdquo;</em> and <em>&ldquo;How do I add sections?&rdquo;</em>
                        </li>
                      </ul>
                    </div>

                    {/* Eye Tracking Evidence */}
                    <div className="mb-12 md:mb-16">
                      <h4 className="text-lg md:text-case-heading font-bold text-text-primary mb-6 md:mb-8">
                        Eye Tracking Evidence
                      </h4>
                      <div className="w-full overflow-hidden bg-black">
                        <video
                          src="/images/case-studies/gutenberg-cms-usability-evaluation/eye-tracking-toc-template-page.mp4"
                          controls
                          playsInline
                          preload="metadata"
                          className="w-full h-auto"
                          aria-label="Eye tracking recording showing participant editing system-generated template page headings"
                        />
                      </div>
                      <p
                        className="mt-3 text-sm italic"
                        style={{ color: 'rgb(var(--color-text-color60))' }}
                      >
                        Gaze Replay from Participant 2 shows them directly editing the system-generated default page
                      </p>
                    </div>

                    {/* Participant Quotes from the RTA */}
                    <div className="mt-12 md:mt-16">
                      <h4 className="text-lg md:text-case-heading font-bold text-text-primary mb-6 md:mb-8">
                        Participant Quotes from the RTA
                      </h4>

                      <div className="space-y-6 md:space-y-8">
                        {/* Quote 1 */}
                        <div className="flex items-start gap-6">
                          <div
                            className="w-[2px] self-stretch flex-shrink-0"
                            style={{ backgroundColor: 'rgb(var(--color-text-color20))' }}
                          />
                          <div className="flex-1 flex items-start justify-between gap-6">
                            <p
                              className="text-base md:text-[18px] italic leading-relaxed"
                              style={{ color: 'rgb(var(--color-text-color60))' }}
                            >
                              &ldquo;If there wasn&apos;t all the stuff on the page by default, it would be easier to navigate.&rdquo;
                            </p>
                            <span
                              className="text-base md:text-[18px] font-semibold whitespace-nowrap"
                              style={{ color: 'rgb(var(--color-text-primary))' }}
                            >
                              &ndash; P5
                            </span>
                          </div>
                        </div>

                        {/* Quote 2 */}
                        <div className="flex items-start gap-6">
                          <div
                            className="w-[2px] self-stretch flex-shrink-0"
                            style={{ backgroundColor: 'rgb(var(--color-text-color20))' }}
                          />
                          <div className="flex-1 flex items-start justify-between gap-6">
                            <p
                              className="text-base md:text-[18px] italic leading-relaxed"
                              style={{ color: 'rgb(var(--color-text-color60))' }}
                            >
                              &ldquo;At first, I was confused with as to what this page was. Then I realized it must have come from the template that I was using.&rdquo;
                            </p>
                            <span
                              className="text-base md:text-[18px] font-semibold whitespace-nowrap"
                              style={{ color: 'rgb(var(--color-text-primary))' }}
                            >
                              &ndash; P4
                            </span>
                          </div>
                        </div>

                        {/* Quote 3 */}
                        <div className="flex items-start gap-6">
                          <div
                            className="w-[2px] self-stretch flex-shrink-0"
                            style={{ backgroundColor: 'rgb(var(--color-text-color20))' }}
                          />
                          <div className="flex-1 flex items-start justify-between gap-6">
                            <p
                              className="text-base md:text-[18px] italic leading-relaxed"
                              style={{ color: 'rgb(var(--color-text-color60))' }}
                            >
                              &ldquo;Why there&apos;s so much stuff on this page? And I had to add section. How do I add section?&rdquo;
                            </p>
                            <span
                              className="text-base md:text-[18px] font-semibold whitespace-nowrap"
                              style={{ color: 'rgb(var(--color-text-primary))' }}
                            >
                              &ndash; P6
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Solution */}
                    <div className="mt-12 md:mt-16">
                      <h4 className="text-lg md:text-case-heading font-bold text-text-primary mb-4 md:mb-6">
                        Solution
                      </h4>
                      <p
                        className="text-base md:text-[18px] font-normal leading-relaxed"
                        style={{ color: 'rgb(var(--color-text-color90))' }}
                      >
                        The reworked project creation flow gives users an option to start
                        without a template (refer{' '}
                        <a
                          href="#finding-1-image-1"
                          className="underline underline-offset-2 hover:opacity-70 transition-opacity"
                          style={{ color: 'rgb(var(--color-text-primary))' }}
                        >
                          Image 1.1
                        </a>
                        ), reducing the cognitive overhead of being forced into a template
                        before understanding the project structure.
                      </p>
                    </div>
                  </div>

                  <div
                    className="border-t my-16 md:my-24"
                    style={{ borderColor: 'rgb(var(--color-text-color10))' }}
                  />

                  {/* Finding 3 */}
                  <div className="mt-16 md:mt-24">
                    <h3
                      className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]"
                      style={{ color: 'rgb(var(--color-text-tertiary))' }}
                    >
                      Finding 3
                    </h3>

                    <AnimatedTitle
                      text="Users Had Confusion with the &quot;Generate with AI&quot; Feature at Several Key Points"
                      animationType="fadeIn"
                      alwaysAnimate={false}
                      delay={0}
                      className="text-2xl md:text-[40px] font-bold text-text-primary mb-24 leading-tight tracking-[-0.05em]"
                    />

                    {/* Problem */}
                    <div className="mb-10 md:mb-12">
                      <h4 className="text-lg md:text-case-heading font-bold text-text-primary mb-4 md:mb-6">
                        Problem
                      </h4>
                      <p
                        className="text-base md:text-[18px] font-normal leading-relaxed mb-8"
                        style={{ color: 'rgb(var(--color-text-color90))' }}
                      >
                        Users struggled to find the AI button, understand the built-in
                        options, and navigate the multi-step flow, make sense of the
                        context menu, which slowed them down and increased time on task.
                      </p>
                      <div className="mb-2">
                        <OptimizedImage
                          webpSrc="/images/case-studies/gutenberg-cms-usability-evaluation/f3-current-ai-workflow.png"
                          fallbackSrc="/images/case-studies/gutenberg-cms-usability-evaluation/f3-current-ai-workflow.png"
                          alt="Current Generate with AI workflow showing language selection, pattern selection, and generation steps"
                          width={1634}
                          height={773}
                          className="w-full rounded-lg"
                        />
                      </div>
                      <p
                        className="text-sm italic mt-3"
                        style={{ color: 'rgb(var(--color-text-color60))' }}
                      >
                        Current &ldquo;Generate with AI&rdquo; workflow
                      </p>
                    </div>

                    {/* User Impact */}
                    <div className="mb-12 md:mb-16">
                      <h4 className="text-lg md:text-case-heading font-bold text-text-primary mb-6 md:mb-8">
                        User Impact
                      </h4>
                      <ul className="space-y-3 list-disc list-inside ml-2">
                        <li className="text-base md:text-[18px] font-normal leading-relaxed" style={{ color: 'rgb(var(--color-text-color90))' }}>
                          Task 5 (AI Content Generation) had an <strong>average completion time of 4.1 minutes</strong> (2nd highest across all tasks)
                        </li>
                        <li className="text-base md:text-[18px] font-normal leading-relaxed" style={{ color: 'rgb(var(--color-text-color90))' }}>
                          Users closed the AI interface multiple times when encountering unexpected steps
                        </li>
                        <li className="text-base md:text-[18px] font-normal leading-relaxed" style={{ color: 'rgb(var(--color-text-color90))' }}>
                          These friction points hurt AI feature adoption and highlight the need for better discoverability, clearer labels, and a simpler process
                        </li>
                      </ul>
                    </div>

                    {/* Sub-finding #1 */}
                    <div className="mb-12 md:mb-16 pt-10 md:pt-14">
                      <p
                        className="text-sm italic mb-3"
                        style={{ color: 'rgb(var(--color-text-tertiary))' }}
                      >
                        Severity: 1
                      </p>
                      <h5 className="text-xl md:text-case-heading font-bold text-text-primary mb-8 md:mb-10 leading-tight">
                        #1 Language selection menu caused confusion
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
                        <div>
                          <div className="w-full overflow-hidden bg-black">
                            <video
                              src="/images/case-studies/gutenberg-cms-usability-evaluation/eye-tracking-language-selection.mp4"
                              controls
                              playsInline
                              preload="metadata"
                              className="w-full h-auto"
                              aria-label="Gaze replay of participant closing AI menu at language selection"
                            />
                          </div>
                          <p
                            className="mt-3 text-sm italic"
                            style={{ color: 'rgb(var(--color-text-color60))' }}
                          >
                            Gaze Replay of Participant 2 closing the AI menu when encountered with the language selection
                          </p>
                        </div>
                        <div>
                          <p
                            className="text-base md:text-[18px] font-normal leading-relaxed mb-8"
                            style={{ color: 'rgb(var(--color-text-color90))' }}
                          >
                            The multi-step interface, particularly the language selection
                            modal, left users uncertain about whether they were in the
                            right place for AI content generation
                          </p>
                          <h6 className="text-base md:text-[18px] font-bold text-text-primary mt-12 md:mt-14 mb-4">
                            Participant Quote from the RTA
                          </h6>
                          <div className="flex items-start gap-6">
                            <div
                              className="w-[2px] self-stretch flex-shrink-0"
                              style={{ backgroundColor: 'rgb(var(--color-text-color20))' }}
                            />
                            <div className="flex-1 flex items-start justify-between gap-6">
                              <p
                                className="text-base md:text-[18px] italic leading-relaxed"
                                style={{ color: 'rgb(var(--color-text-color60))' }}
                              >
                                &ldquo;(Confused that language selection is the first option) I would expect that to be a setting.&rdquo;
                              </p>
                              <span
                                className="text-base md:text-[18px] font-semibold whitespace-nowrap"
                                style={{ color: 'rgb(var(--color-text-primary))' }}
                              >
                                &ndash; P7
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Sub-finding #2 */}
                    <div className="mb-12 md:mb-16 pt-10 md:pt-14">
                      <p
                        className="text-sm italic mb-3"
                        style={{ color: 'rgb(var(--color-text-tertiary))' }}
                      >
                        Severity: 5
                      </p>
                      <h5 className="text-xl md:text-case-heading font-bold text-text-primary mb-8 md:mb-10 leading-tight">
                        #2 Participants did not realize that the AI blocks were draggable
                      </h5>
                      {/* Video — full width */}
                      <div className="w-full overflow-hidden bg-black mb-3">
                        <video
                          src="/images/case-studies/gutenberg-cms-usability-evaluation/eye-tracking-default-ai-options.mp4"
                          controls
                          playsInline
                          preload="metadata"
                          className="w-full h-auto"
                          aria-label="Gaze replay of participant pausing at default AI options"
                        />
                      </div>
                      <p
                        className="text-sm italic mb-10 md:mb-12"
                        style={{ color: 'rgb(var(--color-text-color60))' }}
                      >
                        Gaze Replay of Participant 5 shows them pausing briefly when they encountered the default AI option.
                      </p>

                      {/* Bar chart + description */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start mb-10 md:mb-12">
                        <div className="flex items-start gap-4 md:gap-6">
                          <AnimatedBars
                            total={9}
                            filled={9}
                            filledColor="var(--cs-pop-light)"
                          />
                          <div>
                            <div
                              className="text-5xl md:text-6xl font-bold leading-none mb-2 tracking-[-0.05em]"
                              style={{ color: 'rgb(var(--color-text-primary))' }}
                            >
                              9/9
                            </div>
                            <div
                              className="text-lg md:text-xl font-medium"
                              style={{ color: 'rgb(var(--color-text-secondary))' }}
                            >
                              Users
                            </div>
                          </div>
                        </div>
                        <div>
                          <p
                            className="text-base md:text-[18px] font-normal leading-relaxed"
                            style={{ color: 'rgb(var(--color-text-color90))' }}
                          >
                            <span className="font-semibold">None (9 out of 9)</span> of our participants discovered that the AI block can be dragged into the content, which caused confusion about what the context options meant in the subsequent menu.
                          </p>
                        </div>
                      </div>

                      {/* Image (small) + quote */}
                      <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-8 md:gap-12 items-start">
                        <div>
                          <OptimizedImage
                            webpSrc="/images/case-studies/gutenberg-cms-usability-evaluation/f3-default-ai-blocks.png"
                            fallbackSrc="/images/case-studies/gutenberg-cms-usability-evaluation/f3-default-ai-blocks.png"
                            alt="Default AI blocks panel showing Text, Interactive, and Callouts categories"
                            width={800}
                            height={1200}
                            className="w-full rounded-lg"
                          />
                          <p
                            className="text-sm italic mt-2"
                            style={{ color: 'rgb(var(--color-text-color60))' }}
                          >
                            Default AI blocks
                          </p>
                        </div>
                        <div>
                          <h6 className="text-base md:text-[18px] font-bold text-text-primary mb-4">
                            Participant Quote from the RTA
                          </h6>
                          <div className="flex items-start justify-between gap-6">
                            <p
                              className="text-base md:text-[18px] italic leading-relaxed"
                              style={{ color: 'rgb(var(--color-text-color60))' }}
                            >
                              &ldquo;I had no idea (when realized the blocks were supposed to be dragged)&rdquo;
                            </p>
                            <span
                              className="text-base md:text-[18px] font-semibold whitespace-nowrap"
                              style={{ color: 'rgb(var(--color-text-primary))' }}
                            >
                              &ndash; P9
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Sub-finding #3 */}
                    <div className="mb-12 md:mb-16 pt-10 md:pt-14">
                      <p
                        className="text-sm italic mb-3"
                        style={{ color: 'rgb(var(--color-text-tertiary))' }}
                      >
                        Severity: 3
                      </p>
                      <h5 className="text-xl md:text-case-heading font-bold text-text-primary mb-8 md:mb-10 leading-tight">
                        #3 Users did not know what selecting the pre-defined AI options would do
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
                        <div>
                          <div className="w-full overflow-hidden bg-black">
                            <video
                              src="/images/case-studies/gutenberg-cms-usability-evaluation/eye-tracking-default-ai-options.mp4"
                              controls
                              playsInline
                              preload="metadata"
                              className="w-full h-auto"
                              aria-label="Gaze replay of participant pausing when encountering the default AI option"
                            />
                          </div>
                          <p
                            className="mt-3 text-sm italic"
                            style={{ color: 'rgb(var(--color-text-color60))' }}
                          >
                            Gaze Replay of Participant 5 shows them pausing briefly when they encountered the default AI option.
                          </p>
                        </div>
                        <div>
                          <p
                            className="text-base md:text-[18px] font-normal leading-relaxed mb-8"
                            style={{ color: 'rgb(var(--color-text-color90))' }}
                          >
                            Without descriptive text explaining each option&apos;s function,
                            users had to guess what selecting &ldquo;Introduction,&rdquo;
                            &ldquo;Key takeaways,&rdquo; &ldquo;Questions,&rdquo; or other
                            AI options would actually generate. Users paused when viewing
                            the menu, uncertain about what would happen if they clicked on
                            these options.
                          </p>
                          <h6 className="text-base md:text-[18px] font-bold text-text-primary mt-12 md:mt-14 mb-4">
                            Participant Quote from the RTA
                          </h6>
                          <div className="flex items-start gap-6">
                            <div
                              className="w-[2px] self-stretch flex-shrink-0"
                              style={{ backgroundColor: 'rgb(var(--color-text-color20))' }}
                            />
                            <div className="flex-1 flex items-start justify-between gap-6">
                              <p
                                className="text-base md:text-[18px] italic leading-relaxed"
                                style={{ color: 'rgb(var(--color-text-color60))' }}
                              >
                                &ldquo;I just selected one option, because didn&apos;t know what any of it meant, a descriptor would have helped&rdquo;
                              </p>
                              <span
                                className="text-base md:text-[18px] font-semibold whitespace-nowrap"
                                style={{ color: 'rgb(var(--color-text-primary))' }}
                              >
                                &ndash; P5
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Sub-finding #4 */}
                    <div className="mb-12 md:mb-16 pt-10 md:pt-14">
                      <p
                        className="text-sm italic mb-3"
                        style={{ color: 'rgb(var(--color-text-tertiary))' }}
                      >
                        Severity: 2
                      </p>
                      <h5 className="text-xl md:text-case-heading font-bold text-text-primary mb-8 md:mb-10 leading-tight">
                        #4 Confusion regarding the input area
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
                        <div>
                          <div className="mb-2">
                            <OptimizedImage
                              webpSrc="/images/case-studies/gutenberg-cms-usability-evaluation/f3-ai-context-gaze-plot.png"
                              fallbackSrc="/images/case-studies/gutenberg-cms-usability-evaluation/f3-ai-context-gaze-plot.png"
                              alt="Gaze plot showing participants fixating on the blank center of the AI generation panel"
                              width={1600}
                              height={1000}
                              className="w-full rounded-lg"
                            />
                          </div>
                          <p
                            className="text-sm mt-3"
                            style={{ color: 'rgb(var(--color-text-color60))' }}
                          >
                            Gaze plots reveal that participants fixate on the blank center first, then look around the interface.
                          </p>
                        </div>
                        <div>
                          <p
                            className="text-base md:text-[18px] font-normal leading-relaxed mb-8"
                            style={{ color: 'rgb(var(--color-text-color90))' }}
                          >
                            Many users misunderstood where to input their content, either
                            because they thought they had to put their entire content into
                            the small instructions box on the left to generate results or
                            because they overlooked it entirely and tried typing in the
                            central area.
                          </p>
                          <h6 className="text-base md:text-[18px] font-bold text-text-primary mt-12 md:mt-14 mb-4">
                            Participant Quote from the RTA
                          </h6>
                          <div className="flex items-start gap-6">
                            <div
                              className="w-[2px] self-stretch flex-shrink-0"
                              style={{ backgroundColor: 'rgb(var(--color-text-color20))' }}
                            />
                            <div className="flex-1 flex items-start justify-between gap-6">
                              <p
                                className="text-base md:text-[18px] italic leading-relaxed"
                                style={{ color: 'rgb(var(--color-text-color60))' }}
                              >
                                &ldquo;I don&apos;t know where to put the actual prompt and the actual content&rdquo;
                              </p>
                              <span
                                className="text-base md:text-[18px] font-semibold whitespace-nowrap"
                                style={{ color: 'rgb(var(--color-text-primary))' }}
                              >
                                &ndash; P5
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Proposed Recommendation */}
                    <div className="mt-16 md:mt-24">
                      <h4 className="text-lg md:text-case-heading font-bold text-text-primary mb-10 md:mb-14">
                        Proposed Recommendation
                      </h4>
                      <div className="space-y-6">
                        <OptimizedImage
                          webpSrc="/images/case-studies/gutenberg-cms-usability-evaluation/f3-recommendation-ai-blocks.png"
                          fallbackSrc="/images/case-studies/gutenberg-cms-usability-evaluation/f3-recommendation-ai-blocks.png"
                          alt="Recommendation mockup showing annotated improvements to the Generate with AI blocks panel"
                          width={1920}
                          height={1080}
                          className="w-full rounded-lg"
                        />
                        <OptimizedImage
                          webpSrc="/images/case-studies/gutenberg-cms-usability-evaluation/f3-recommendation-ai-modal.png"
                          fallbackSrc="/images/case-studies/gutenberg-cms-usability-evaluation/f3-recommendation-ai-modal.png"
                          alt="Recommendation mockup showing consolidated language selection and enlarged instruction area in the AI generation modal"
                          width={1920}
                          height={1080}
                          className="w-full rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Challenges */}
                <div className="mt-16 md:mt-24 pt-12 md:pt-16 border-t" style={{ borderColor: 'rgb(var(--color-text-color20))' }}>
                  <h3
                    className="text-lg md:text-case-heading font-bold text-text-primary mb-8 md:mb-12 leading-tight tracking-[-0.05em]"
                  >
                    Challenges
                  </h3>
                  <div className="space-y-6 md:space-y-8">
                    <p className="text-base md:text-[18px] font-normal leading-relaxed" style={{ color: 'rgb(var(--color-text-color90))' }}>
                      <strong className="font-bold text-text-primary">Learning Tobii Software:</strong>{' '}
                      The eye-tracking software was difficult to navigate. It took time to understand how to export data, generate heat maps, and create areas of interest for analysis.
                    </p>
                    <p className="text-base md:text-[18px] font-normal leading-relaxed" style={{ color: 'rgb(var(--color-text-color90))' }}>
                      <strong className="font-bold text-text-primary">Platform Limitations:</strong>{' '}
                      Because all user actions happened within a single URL with no page changes, many standard eye-tracking metrics (like page-level heat maps and automatic areas of interest) didn&apos;t work. We had to use workarounds or skip some analyses we&apos;d planned.
                    </p>
                    <p className="text-base md:text-[18px] font-normal leading-relaxed" style={{ color: 'rgb(var(--color-text-color90))' }}>
                      <strong className="font-bold text-text-primary">Google Analytics Not Available:</strong>{' '}
                      We were supposed to use Google Analytics to find additional insights, but the client did not have Google Analytics set up properly, which limited our ability to gather supplementary behavioral data.
                    </p>
                    <p className="text-base md:text-[18px] font-normal leading-relaxed" style={{ color: 'rgb(var(--color-text-color90))' }}>
                      <strong className="font-bold text-text-primary">Issues Fixed During Research:</strong>{' '}
                      The client was super quick to fix a lot of issues we told them about through our own hypothesis and heuristic analysis during the midpoint presentation, which meant we could not properly test them with all participants.
                    </p>
                  </div>
                </div>

                {/* Key Takeaway */}
                <div className="mt-16 md:mt-24">
                  <h3
                    className="text-lg md:text-case-heading font-bold text-text-primary mb-8 md:mb-12 leading-tight tracking-[-0.05em]"
                  >
                    Key Takeaway
                  </h3>
                  <h4 className="text-lg md:text-[24px] font-bold text-text-primary mb-4 md:mb-6">
                    Value of documentation and Triangulation of evidence
                  </h4>
                  <p className="text-base md:text-[18px] font-normal leading-relaxed" style={{ color: 'rgb(var(--color-text-color90))' }}>
                    Creating the problem sheet, rainbow spreadsheet, collecting evidence from gaze replays and RTA notes helped me clearly see which issues were worth prioritizing. In past projects, it was sometimes difficult to convince clients (and myself) that I was solving the right problems. Triangulating evidence across multiple data sources, where behavioral metrics, eye-tracking patterns, and verbal feedback all point to the same issue, made the case much stronger.
                  </p>
                </div>

                {/* Client Response */}
                <div className="mt-16 md:mt-24">
                  <h3
                    className="text-lg md:text-case-heading font-bold text-text-primary mb-6 md:mb-10 leading-tight tracking-[-0.05em]"
                  >
                    Client Response
                  </h3>
                  <p className="text-base md:text-[18px] font-normal leading-relaxed" style={{ color: 'rgb(var(--color-text-color90))' }}>
                    The client was highly impressed with the research. They explained that this is the oldest part of their platform and has never been updated; while they were aware of some of the issues, this was the first time they had clear evidence to support them. They told us that a design overhaul is planned for 2026 and noted that our recommendations will be very helpful for their work. They were also surprised by how simple some of the proposed solutions were, commenting that they wished they had thought of them sooner.
                  </p>
                </div>

                <div
                  className="border-t my-16 md:my-24"
                  style={{ borderColor: 'rgb(var(--color-text-color10))' }}
                />

                {/* The End */}
                <div className="py-8 md:py-12">
                  <h3
                    className="text-3xl md:text-[48px] font-bold uppercase tracking-[-0.02em] mb-6 md:mb-8 text-[var(--cs-pop-light)] dark:text-[var(--cs-pop-dark)]"
                  >
                    The End
                  </h3>
                  <p className="text-xl md:text-case-heading font-bold text-text-primary">
                    Thank you for reading this case-study
                  </p>
                </div>
              </div>
        </CaseStudyReadMore>
      </div>
    </m.section>
  )
}
