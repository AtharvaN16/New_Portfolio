'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef } from 'react'
import { AnimatedTitle } from '@/components/ui/AnimatedTitle'
import { OptimizedImage } from '@/components/case-study/OptimizedImage'

interface GutenbergContentProps {
  isContentRevealed: boolean
  onToggleContent: () => void
}

export function GutenbergContent({
  isContentRevealed,
  onToggleContent,
}: GutenbergContentProps) {
  const [isSUSCalloutOpen, setIsSUSCalloutOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  return (
    <motion.section
      className="w-full px-6 py-16 md:py-24 max-w-[1920px] mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <div className="max-w-[940px] ml-auto text-left">
        {/* Abstract Section */}
        <h3 className="text-lg md:text-[28px] font-bold text-text-primary mb-6 md:mb-[28px]">
          Abstract
        </h3>

        <div className="space-y-6 md:space-y-8">
          <p className="text-base md:text-[20px] font-normal text-text-color90 leading-relaxed">
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
          <p className="text-base md:text-[20px] font-normal text-text-color90 leading-relaxed">
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
            <p className="text-base md:text-[20px] font-medium text-text-color90 leading-relaxed">
              As part of a four-person research team, I contributed to:
            </p>
            <ul className="space-y-2 md:space-y-3 list-disc list-inside ml-2">
              <li className="text-base md:text-[20px] font-normal text-text-color90 leading-relaxed">
                Research planning and hypothesis development
              </li>
              <li className="text-base md:text-[20px] font-normal text-text-color90 leading-relaxed">
                Eye-tracking study design and moderation
              </li>
              <li className="text-base md:text-[20px] font-normal text-text-color90 leading-relaxed">
                Analyzing the insights
              </li>
              <li className="text-base md:text-[20px] font-normal text-text-color90 leading-relaxed">
                Design recommendations
              </li>
            </ul>
          </div>
        </div>

        {/* Read Full Case Study Button */}
        <div className="mt-[100px] flex flex-col items-center gap-2">
          <span
            className="text-sm font-normal"
            style={{ color: 'rgb(var(--color-text-tertiary))' }}
          >
            8 min read
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

        {/* Full Case Study Content */}
        <AnimatePresence initial={false}>
          {isContentRevealed && (
            <motion.div
              className="mt-[160px] md:mt-[224px] lg:mt-[288px]"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
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
                    className="text-base md:text-[20px] font-normal leading-relaxed"
                    style={{ color: 'rgb(var(--color-text-color90))' }}
                  >
                    Gutenberg Technologies is an e-learning course builder tool
                    for creating text-based learning materials like textbooks and
                    training resources, primarily used by publishers. Their course
                    management system (CMS) is outdated and difficult for new
                    users.
                  </p>
                  <p
                    className="text-base md:text-[20px] font-normal leading-relaxed"
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
                  className="text-base md:text-[20px] font-normal leading-relaxed mb-8 md:mb-10"
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
                      <div className="text-base md:text-[20px] font-semibold leading-relaxed text-text-color90">
                        Table of contents (TOC)
                      </div>
                      <p
                        className="text-base md:text-[20px] font-normal mt-1 md:mt-1.5 leading-relaxed"
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
                      <div className="text-base md:text-[20px] font-semibold leading-relaxed text-text-color90">
                        Authoring content from scratch
                      </div>
                      <p
                        className="text-base md:text-[20px] font-normal mt-1 md:mt-1.5 leading-relaxed"
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
                      <div className="text-base md:text-[20px] font-semibold leading-relaxed text-text-color90">
                        Drag-and-drop
                      </div>
                      <p
                        className="text-base md:text-[20px] font-normal mt-1 md:mt-1.5 leading-relaxed"
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
                      <div className="text-base md:text-[20px] font-semibold text-text-color90 leading-relaxed">
                        AI-assisted content generation
                      </div>
                      <p
                        className="text-base md:text-[20px] font-normal mt-1 md:mt-1.5 leading-relaxed"
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
                      fallbackSrc="/images/case-studies/gutenberg-cms-usability-evaluation/eyetracking-01.jpg"
                      alt="Eye tracking setup during usability testing session"
                      width={768}
                      height={432}
                      className="w-full rounded-lg"
                      imgClassName="h-full object-contain"
                    />
                  </div>

                  <div className="space-y-6 md:space-y-8 mb-12 md:mb-16">
                    <p
                      className="text-base md:text-[20px] font-normal leading-relaxed"
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
                        fallbackSrc="/images/case-studies/gutenberg-cms-usability-evaluation/timeontask.png"
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
                        fallbackSrc="/images/case-studies/gutenberg-cms-usability-evaluation/SUS.png"
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
                        fallbackSrc="/images/case-studies/gutenberg-cms-usability-evaluation/Gazedata.png"
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
                        fallbackSrc="/images/case-studies/gutenberg-cms-usability-evaluation/RTA.png"
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
                        fallbackSrc="/images/case-studies/gutenberg-cms-usability-evaluation/SUS_Diagram.png"
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
                        <motion.div
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
                        </motion.div>
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
                  <h3 className="text-lg md:text-[28px] font-bold text-text-primary mb-6 md:mb-[28px]">
                    Findings and Recommendations
                  </h3>

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
                    className="text-2xl md:text-[40px] font-bold text-text-primary mb-6 md:mb-8 leading-tight tracking-[-0.05em]"
                  />

                  {/* Finding 1 - Image 1 */}
                  <div className="mb-12 md:mb-16">
                    <OptimizedImage
                      webpSrc="/images/case-studies/gutenberg-cms-usability-evaluation/f1-s1-1.webp"
                      fallbackSrc="/images/case-studies/gutenberg-cms-usability-evaluation/f1-s1-1.png"
                      alt="Comparison of current and proposed design for template selection - showing how the revised title and 'Start from Scratch' option reduces confusion"
                      width={2820}
                      height={1621}
                      className="w-full rounded-lg"
                    />
                  </div>

                  {/* Finding 1 - Image 2 */}
                  <div className="mb-12 md:mb-16">
                    <OptimizedImage
                      webpSrc="/images/case-studies/gutenberg-cms-usability-evaluation/f1-s1-2.webp"
                      fallbackSrc="/images/case-studies/gutenberg-cms-usability-evaluation/f1-s1-2.png"
                      alt="Comparison of current and proposed design for project creation modal - showing how adding a 'Continue without a theme' option improves user experience"
                      width={2820}
                      height={1621}
                      className="w-full rounded-lg"
                    />
                  </div>

                  {/* Data Visualization with 9 Bars */}
                  <div className="mb-12 md:mb-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
                      {/* Left Column: Bars and Stats */}
                      <div className="flex items-start gap-4 md:gap-6">
                        {/* 9 Vertical Bars */}
                        <div className="flex items-end gap-[14px]">
                          {[...Array(9)].map((_, index) => (
                            <div
                              key={index}
                              className="w-[14px] h-[144px]"
                              style={{
                                backgroundColor: index < 7
                                  ? 'rgb(var(--color-info))'
                                  : 'rgb(var(--color-text-color20))',
                              }}
                            />
                          ))}
                        </div>

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
                          className="text-[18px] font-normal leading-relaxed"
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

                  {/* Participant Quotes from the RTA */}
                  <div className="mt-12 md:mt-16">
                    <h4 className="text-lg md:text-[28px] font-bold text-text-primary mb-6 md:mb-8">
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
                            className="text-[18px] italic leading-relaxed"
                            style={{ color: 'rgb(var(--color-text-color60))' }}
                          >
                            &ldquo;Can I make my own custom one or not? This is the only
                            one available I had to go ahead with it.&rdquo;
                          </p>
                          <span
                            className="text-[18px] font-semibold whitespace-nowrap"
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
                            className="text-[18px] italic leading-relaxed"
                            style={{ color: 'rgb(var(--color-text-color60))' }}
                          >
                            &ldquo;there&apos;s just 1 template so... i just went ahead
                            with it because i didn&apos;t know otherwise&rdquo;
                          </p>
                          <span
                            className="text-[18px] font-semibold whitespace-nowrap"
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
                            className="text-[18px] italic leading-relaxed"
                            style={{ color: 'rgb(var(--color-text-color60))' }}
                          >
                            &ldquo;I&apos;m not sure what to expect and what should I do
                            with what (template) I&apos;m using.&rdquo;
                          </p>
                          <span
                            className="text-[18px] font-semibold whitespace-nowrap"
                            style={{ color: 'rgb(var(--color-text-primary))' }}
                          >
                            &ndash; P2
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  )
}
