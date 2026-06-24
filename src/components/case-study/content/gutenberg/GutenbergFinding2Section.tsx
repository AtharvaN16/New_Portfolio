'use client'

import { AnimatedText } from '@/components/ui/AnimatedText'
import { AnimatedBars } from '@/components/case-study/AnimatedBars'

export function GutenbergFinding2Section() {
  return (
    <>
          {/* Finding 2 */}
          <div className="mt-16 md:mt-24">
            <h3
              className="text-sm md:text-base font-semibold normal-case mb-6 md:mb-[28px]"
              style={{ color: 'rgb(var(--color-text-tertiary))' }}
            >
              Finding 2
            </h3>

            <AnimatedText
              variant="heading"
              as="h3"
              text="The System-Generated Template Page caused confusion"
              animationType="fadeIn"
              alwaysAnimate={false}
              delay={0}
              className="text-xl md:text-2xl font-bold text-text-primary mb-24 leading-tight tracking-[-0.05em]"
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
                      className="text-2xl md:text-2xl font-bold leading-none mb-2 tracking-[-0.05em]"
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
                    className="text-base md:text-[18px] font-normal leading-normal"
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
                <li className="text-base md:text-[18px] font-normal leading-normal" style={{ color: 'rgb(var(--color-text-color90))' }}>
                  Task 1 (Author content from scratch) has the <strong>lowest success rate (0.7)</strong> and the <strong>highest time on task (4.6 mins)</strong>
                </li>
                <li className="text-base md:text-[18px] font-normal leading-normal" style={{ color: 'rgb(var(--color-text-color90))' }}>
                  Users wasted effort labeling and formatting template headings
                </li>
                <li className="text-base md:text-[18px] font-normal leading-normal" style={{ color: 'rgb(var(--color-text-color90))' }}>
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
                      className="text-base md:text-[18px] italic leading-normal"
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
                      className="text-base md:text-[18px] italic leading-normal"
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
                      className="text-base md:text-[18px] italic leading-normal"
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
                className="text-base md:text-[18px] font-normal leading-normal"
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
    </>
  )
}
