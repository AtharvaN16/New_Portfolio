'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface SnakesShowcaseContentProps {
  isContentRevealed: boolean
  onToggleContent: () => void
}

export function SnakesShowcaseContent({
  isContentRevealed,
  onToggleContent,
}: SnakesShowcaseContentProps) {
  return (
    <motion.section
      className="w-full px-6 2xl:px-[140px] py-16 md:py-24 max-w-[1920px] mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <div className="max-w-[940px] mx-auto text-left">
        {/* Abstract */}
        <h3 className="text-lg md:text-[28px] font-bold text-text-primary mb-6 md:mb-[28px]">
          Abstract
        </h3>

        <div className="space-y-6 md:space-y-8">
          <p className="text-base md:text-[20px] font-normal text-text-color90 leading-relaxed">
            This showcase is a personal exploration into interactive data visualization,
            centered on the taxonomy and behavior of snakes. The goal was to design an
            experience that makes biological information — species rankings, venom
            classification, and geographic distribution — feel navigable and visually
            engaging for a general audience.
          </p>
          <p className="text-base md:text-[20px] font-normal text-text-color90 leading-relaxed">
            The project was vibe-coded over a weekend, prioritizing feel and motion over
            completeness. It served as a test bed for ideas around scroll-driven
            storytelling, ambient UI, and data-first design — exploring how visual
            hierarchy and interaction can reduce the cognitive load of dense taxonomic data.
          </p>
        </div>

        {/* My Role */}
        <div className="mt-12 md:mt-16">
          <h3 className="text-lg md:text-[24px] font-bold text-text-primary mb-6 md:mb-[28px]">
            My Role
          </h3>

          <div className="space-y-6 md:space-y-8">
            <p className="text-base md:text-[20px] font-medium text-text-color90 leading-relaxed">
              Solo project — I handled all aspects:
            </p>
            <ul className="space-y-2 md:space-y-3 list-disc list-inside ml-2">
              <li className="text-base md:text-[20px] font-normal text-text-color90 leading-relaxed">
                Concept and interaction design
              </li>
              <li className="text-base md:text-[20px] font-normal text-text-color90 leading-relaxed">
                Data visualization and taxonomy mapping
              </li>
              <li className="text-base md:text-[20px] font-normal text-text-color90 leading-relaxed">
                Visual design and motion direction
              </li>
              <li className="text-base md:text-[20px] font-normal text-text-color90 leading-relaxed">
                Frontend implementation (vibe-coded)
              </li>
            </ul>
          </div>
        </div>

        {/* Read more toggle */}
        <div className="mt-[100px] flex flex-col items-center gap-2">
          <span
            className="text-sm font-normal"
            style={{ color: 'rgb(var(--color-text-tertiary))' }}
          >
            3 min read
          </span>
          <button
            onClick={onToggleContent}
            className="group inline-flex items-center gap-2 text-base md:text-[20px] font-normal text-text-primary hover:text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
          >
            <span className="relative inline-block">
              {isContentRevealed ? 'Hide writeup' : 'Read full writeup'}
              <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-current transition-all duration-300 ease-out group-hover:w-full" />
            </span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="w-4 h-4 transition-transform duration-200"
              style={{ transform: isContentRevealed ? 'rotate(180deg)' : 'rotate(0deg)' }}
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

        {/* Expanded content placeholder */}
        <AnimatePresence initial={false}>
          {isContentRevealed && (
            <motion.div
              className="mt-[160px] md:mt-[224px]"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3
                className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]"
                style={{ color: 'rgb(var(--color-text-tertiary))' }}
              >
                Design Process
              </h3>

              <div className="space-y-6 md:space-y-8">
                <p
                  className="text-base md:text-[20px] font-normal leading-relaxed"
                  style={{ color: 'rgb(var(--color-text-color90))' }}
                >
                  The interface began as a simple taxonomy browser and evolved into a
                  more ambient, exploratory experience. Early iterations used cards;
                  the final version leans on a ranked list with inline species detail,
                  keeping the data dense without overwhelming.
                </p>
                <p
                  className="text-base md:text-[20px] font-normal leading-relaxed"
                  style={{ color: 'rgb(var(--color-text-color90))' }}
                >
                  Full writeup coming soon.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  )
}
