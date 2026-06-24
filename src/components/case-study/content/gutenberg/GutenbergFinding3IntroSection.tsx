'use client'

import { AnimatedText } from '@/components/ui/AnimatedText'
import { OptimizedImage } from '@/components/case-study/OptimizedImage'

export function GutenbergFinding3IntroSection() {
  return (
    <>
            <h3
              className="text-sm md:text-base font-semibold normal-case mb-6 md:mb-[28px]"
              style={{ color: 'rgb(var(--color-text-tertiary))' }}
            >
              Finding 3
            </h3>

            <AnimatedText
              variant="heading"
              as="h3"
              text="Users Had Confusion with the &quot;Generate with AI&quot; Feature at Several Key Points"
              animationType="fadeIn"
              alwaysAnimate={false}
              delay={0}
              className="text-xl md:text-2xl font-bold text-text-primary mb-24 leading-tight tracking-[-0.05em]"
            />

            {/* Problem */}
            <div className="mb-10 md:mb-12">
              <h4 className="text-lg md:text-case-heading font-bold text-text-primary mb-4 md:mb-6">
                Problem
              </h4>
              <p
                className="text-base md:text-[18px] font-normal leading-normal mb-8"
                style={{ color: 'rgb(var(--color-text-color90))' }}
              >
                Users struggled to find the AI button, understand the built-in
                options, and navigate the multi-step flow, make sense of the
                context menu, which slowed them down and increased time on task.
              </p>
              <div className="mb-2">
                <OptimizedImage
                  webpSrc="/images/case-studies/gutenberg-cms-usability-evaluation/f3-current-ai-workflow.avif"
                  fallbackSrc="/images/case-studies/gutenberg-cms-usability-evaluation/f3-current-ai-workflow.avif"
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
                <li className="text-base md:text-[18px] font-normal leading-normal" style={{ color: 'rgb(var(--color-text-color90))' }}>
                  Task 5 (AI Content Generation) had an <strong>average completion time of 4.1 minutes</strong> (2nd highest across all tasks)
                </li>
                <li className="text-base md:text-[18px] font-normal leading-normal" style={{ color: 'rgb(var(--color-text-color90))' }}>
                  Users closed the AI interface multiple times when encountering unexpected steps
                </li>
                <li className="text-base md:text-[18px] font-normal leading-normal" style={{ color: 'rgb(var(--color-text-color90))' }}>
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
                    className="text-base md:text-[18px] font-normal leading-normal mb-8"
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
                        className="text-base md:text-[18px] italic leading-normal"
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

    </>
  )
}
