'use client'

import { AnimatedText } from '@/components/ui/AnimatedText'
import { OptimizedImage } from '@/components/case-study/OptimizedImage'
import { AnimatedBars } from '@/components/case-study/AnimatedBars'

export function GutenbergFinding1Section() {
  return (
    <>
          {/* Finding 1 */}
          <h3
            className="text-sm md:text-base font-semibold normal-case mb-6 md:mb-[28px]"
            style={{ color: 'rgb(var(--color-text-tertiary))' }}
          >
            Finding 1
          </h3>

          <AnimatedText
            variant="heading"
            as="h3"
            text="Making template selection required during project creation caused expectation mismatch"
            animationType="fadeIn"
            alwaysAnimate={false}
            delay={0}
            className="text-xl md:text-2xl font-bold text-text-primary mb-24 leading-tight tracking-[-0.05em]"
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
                    className="text-2xl md:text-2xl font-bold leading-none mb-2 tracking-[-0.05em]"
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
                  className="text-base md:text-[18px] font-normal leading-normal"
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
              webpSrc="/images/case-studies/gutenberg-cms-usability-evaluation/f1-s1-2.avif"
              fallbackSrc="/images/case-studies/gutenberg-cms-usability-evaluation/f1-s1-2.avif"
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
              webpSrc="/images/case-studies/gutenberg-cms-usability-evaluation/f1-s1-1.avif"
              fallbackSrc="/images/case-studies/gutenberg-cms-usability-evaluation/f1-s1-1.avif"
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
                    className="text-base md:text-[18px] italic leading-normal"
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
                    className="text-base md:text-[18px] italic leading-normal"
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
                    className="text-base md:text-[18px] italic leading-normal"
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
    </>
  )
}
