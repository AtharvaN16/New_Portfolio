'use client'

import { AnimatedText } from '@/components/ui/AnimatedText'
import { OptimizedImage } from '@/components/case-study/OptimizedImage'

export function GutenbergMethodologyIntroSection() {
  return (
    <>
          <h3
            className="text-sm md:text-base font-semibold normal-case mb-6 md:mb-[28px]"
            style={{ color: 'rgb(var(--color-text-tertiary))' }}
          >
            Methodology
          </h3>

          <AnimatedText
            variant="heading"
            as="h3"
            text="Evaluating usability through behavioral and attitudinal data"
            animationType="fadeIn"
            alwaysAnimate={false}
            delay={0}
            className="text-xl md:text-2xl font-bold text-text-primary mb-6 md:mb-8 leading-tight tracking-[-0.05em]"
          />

          {/* Eye Tracking Setup Image */}
          <div className="mb-12 md:mb-16 max-w-full md:max-w-[768px] mx-auto">
            <OptimizedImage
              webpSrc="/images/case-studies/gutenberg-cms-usability-evaluation/eyetracking-01.avif"
              fallbackSrc="/images/case-studies/gutenberg-cms-usability-evaluation/eyetracking-01.avif"
              alt="Eye tracking setup during usability testing session"
              width={768}
              height={432}
              className="w-full rounded-lg"
            />
          </div>

          <div className="space-y-6 md:space-y-8 mb-12 md:mb-16">
            <p
              className="text-base md:text-[18px] font-normal leading-normal"
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
            className="text-sm md:text-lg font-bold mb-6 md:mb-[28px]"
            style={{ color: 'rgb(var(--color-text-primary))' }}
          >
            Data Collected:
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Task Performance */}
            <div className="space-y-3">
              <OptimizedImage
                webpSrc="/images/case-studies/gutenberg-cms-usability-evaluation/timeontask.avif"
                fallbackSrc="/images/case-studies/gutenberg-cms-usability-evaluation/timeontask.avif"
                alt="Task Performance data"
                width={223}
                height={116}
                className="w-full"
              />
              <div className="space-y-1">
                <p
                  className="text-[14px] font-bold leading-normal"
                  style={{ color: 'rgb(var(--color-text-secondary))' }}
                >
                  Task Performance
                </p>
                <p
                  className="text-[14px] font-normal leading-normal"
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
                webpSrc="/images/case-studies/gutenberg-cms-usability-evaluation/SUS.avif"
                fallbackSrc="/images/case-studies/gutenberg-cms-usability-evaluation/SUS.avif"
                alt="Usability Assessment data"
                width={223}
                height={116}
                className="w-full"
              />
              <div className="space-y-1">
                <p
                  className="text-[14px] font-bold leading-normal"
                  style={{ color: 'rgb(var(--color-text-secondary))' }}
                >
                  Usability Assessment
                </p>
                <p
                  className="text-[14px] font-normal leading-normal"
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
                webpSrc="/images/case-studies/gutenberg-cms-usability-evaluation/Gazedata.avif"
                fallbackSrc="/images/case-studies/gutenberg-cms-usability-evaluation/Gazedata.avif"
                alt="Gaze Data visualization"
                width={223}
                height={116}
                className="w-full"
              />
              <div className="space-y-1">
                <p
                  className="text-[14px] font-bold leading-normal"
                  style={{ color: 'rgb(var(--color-text-secondary))' }}
                >
                  Gaze Data
                </p>
                <p
                  className="text-[14px] font-normal leading-normal"
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
                webpSrc="/images/case-studies/gutenberg-cms-usability-evaluation/RTA.avif"
                fallbackSrc="/images/case-studies/gutenberg-cms-usability-evaluation/RTA.avif"
                alt="Retrospective Think-Aloud notes"
                width={223}
                height={116}
                className="w-full"
              />
              <div className="space-y-1">
                <p
                  className="text-[14px] font-bold leading-normal"
                  style={{ color: 'rgb(var(--color-text-secondary))' }}
                >
                  Retrospective Think-Aloud (RTA) Notes
                </p>
                <p
                  className="text-[14px] font-normal leading-normal"
                  style={{ color: 'rgb(var(--color-text-color60))' }}
                >
                  Reviewing session replays with participants to understand
                  the reasoning behind their actions and decisions.
                </p>
              </div>
            </div>
          </div>
    </>
  )
}
