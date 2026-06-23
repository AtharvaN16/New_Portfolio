'use client'

import { OptimizedImage } from '@/components/case-study/OptimizedImage'
import { AnimatedBars } from '@/components/case-study/AnimatedBars'

export function GutenbergFinding3SubfindingsSection() {
  return (
    <>
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
                    webpSrc="/images/case-studies/gutenberg-cms-usability-evaluation/f3-default-ai-blocks.avif"
                    fallbackSrc="/images/case-studies/gutenberg-cms-usability-evaluation/f3-default-ai-blocks.avif"
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
                      webpSrc="/images/case-studies/gutenberg-cms-usability-evaluation/f3-ai-context-gaze-plot.avif"
                      fallbackSrc="/images/case-studies/gutenberg-cms-usability-evaluation/f3-ai-context-gaze-plot.avif"
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
    </>
  )
}
