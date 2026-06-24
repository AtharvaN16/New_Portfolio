'use client'

import { useState } from 'react'
import { m } from 'framer-motion'
import { OptimizedImage } from '@/components/case-study/OptimizedImage'

export function GutenbergMethodologySusSection() {
  const [isSUSCalloutOpen, setIsSUSCalloutOpen] = useState(false)

  return (
    <>
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
                webpSrc="/images/case-studies/gutenberg-cms-usability-evaluation/SUS_Diagram.avif"
                fallbackSrc="/images/case-studies/gutenberg-cms-usability-evaluation/SUS_Diagram.avif"
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
                      className="text-2xl md:text-2xl flex-shrink-0"
                      aria-hidden="true"
                    >
                      💡
                    </span>
                    <p
                      className="text-base md:text-[18px] font-normal leading-normal flex-1"
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
                <div className="text-[40px] font-bold tracking-[-0.05em] text-warning">
                  60
                </div>
                <p
                  className="text-[20px] font-bold leading-normal"
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
                    className="text-2xl font-bold tracking-[-0.05em]"
                    style={{ color: 'rgb(var(--color-text-primary))' }}
                  >
                    72.2
                  </div>
                  <p
                    className="text-base md:text-[18px] font-semibold leading-normal"
                    style={{ color: 'rgb(var(--color-text-primary))' }}
                  >
                    The Learnability score was 72.2{' '}
                    <span className="text-success">
                      — Good
                    </span>
                  </p>
                  <p
                    className="text-[16px] font-normal leading-normal"
                    style={{ color: 'rgb(var(--color-text-secondary))' }}
                  >
                    The tool feels familiar enough for users to learn how to
                    use properly
                  </p>
                </div>

                {/* Usability Score */}
                <div className="space-y-3">
                  <div
                    className="text-2xl font-bold tracking-[-0.05em]"
                    style={{ color: 'rgb(var(--color-text-primary))' }}
                  >
                    56.9
                  </div>
                  <p
                    className="text-base md:text-[18px] font-semibold leading-normal"
                    style={{ color: 'rgb(var(--color-text-primary))' }}
                  >
                    The Usability score was 56.9{' '}
                    <span className="text-error">
                      — Needs improvement
                    </span>
                  </p>
                  <p
                    className="text-[16px] font-normal leading-normal"
                    style={{ color: 'rgb(var(--color-text-secondary))' }}
                  >
                    People struggle to find the right features and understand
                    how to start, which makes it overall less usable
                  </p>
                </div>
              </div>
            </div>
          </div>
    </>
  )
}
