'use client'

import { m } from 'framer-motion'
import Image from 'next/image'
import { AnimatedArrow } from '@/components/ui/AnimatedArrow'
import {
  CaseStudyCell,
  CaseStudyGrid,
  CaseStudySection,
} from '@/components/case-study/layout'
import { useArrowAnimation } from '@/hooks/use-arrow-animation'

const LIVE_SITE_URL = 'https://snakes.atharva.design/'

/** Matches source PNG dimensions (2940×1842) for stable layout / LCP hints */
const SHOT_WIDTH = 2940
const SHOT_HEIGHT = 1842

const SNAKE_SCREENSHOTS = Array.from({ length: 13 }, (_, i) => ({
  src: `/images/case-studies/snakes/${i + 1}.avif`,
  alt: `Snakes data visualization project — screenshot ${i + 1} of 13`,
}))

const SCREENSHOT_SIZES =
  '(max-width: 639px) 100vw, (max-width: 1023px) 45vw, calc((min(100vw, 1920px) - 3rem) / 2)'

export function SnakesShowcaseContent() {
  const {
    isAnimating,
    animationCycle,
    showFirstArrow,
    handleMouseEnter,
    handleMouseLeave,
  } = useArrowAnimation()

  return (
    <CaseStudySection
      animated
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <CaseStudyGrid width="content">
        <CaseStudyCell span={12}>
          <h3 className="text-base md:text-2xl font-bold text-text-primary mb-6 md:mb-[28px]">
            Abstract
          </h3>

          <div className="space-y-6 md:space-y-8">
            <p className="text-base md:text-[18px] font-normal text-text-body leading-normal">
              This showcase is a personal exploration into interactive data visualization,
              centered on the taxonomy and behavior of snakes. The goal was to design an
              experience that makes biological information — species rankings, venom
              classification, and geographic distribution — feel navigable and visually
              engaging for a general audience.
            </p>
            <p className="text-base md:text-[18px] font-normal text-text-body leading-normal">
              The project was vibe-coded over a weekend, prioritizing feel and motion over
              completeness. It served as a test bed for ideas around scroll-driven
              storytelling, ambient UI, and data-first design — exploring how visual
              hierarchy and interaction can reduce the cognitive load of dense taxonomic data.
            </p>
          </div>
        </CaseStudyCell>

        <CaseStudyCell span={12} className="mt-16 md:mt-24 lg:mt-32 flex justify-end">
          <m.a
            href={LIVE_SITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="group inline-flex items-center gap-[16px] text-2xl font-bold tracking-[-0.05em] text-foreground transition-colors hover:text-primary md:gap-[18px] md:text-[28px] lg:gap-[20px] lg:text-[32px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
          >
            Check the live site
            <AnimatedArrow
              isAnimating={isAnimating}
              showFirstArrow={showFirstArrow}
              animationCycle={animationCycle}
              className="w-[22px] h-[22px] md:w-[26px] md:h-[26px] lg:w-[30px] lg:h-[30px]"
            />
          </m.a>
        </CaseStudyCell>
      </CaseStudyGrid>

      <CaseStudyGrid width="section" className="mt-12 md:mt-16 lg:mt-20">
        <CaseStudyCell span={12}>
          <h4 className="sr-only">Project screenshots</h4>
        </CaseStudyCell>
        {SNAKE_SCREENSHOTS.map((shot, i) => {
          const isLastOdd =
            i === SNAKE_SCREENSHOTS.length - 1 &&
            SNAKE_SCREENSHOTS.length % 2 !== 0

          return (
            <CaseStudyCell
              key={shot.src}
              span={6}
              breakpoint="sm"
              start={isLastOdd ? 1 : undefined}
            >
              <div
                className="relative w-full"
                style={{ aspectRatio: `${SHOT_WIDTH} / ${SHOT_HEIGHT}` }}
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  sizes={SCREENSHOT_SIZES}
                  className={`object-contain ${isLastOdd ? 'object-left-top' : 'object-top'}`}
                  loading="lazy"
                  quality={85}
                  decoding="async"
                />
              </div>
            </CaseStudyCell>
          )
        })}
      </CaseStudyGrid>
    </CaseStudySection>
  )
}
