'use client'

import { m } from 'framer-motion'
import Image from 'next/image'
import { AnimatedArrow } from '@/components/ui/AnimatedArrow'
import { useArrowAnimation } from '@/hooks/use-arrow-animation'

const LIVE_SITE_URL = 'https://snakes.atharva.design/'

/** Matches source PNG dimensions (2940×1842) for stable layout / LCP hints */
const SHOT_WIDTH = 2940
const SHOT_HEIGHT = 1842

const SNAKE_SCREENSHOTS = Array.from({ length: 13 }, (_, i) => ({
  src: `/images/case-studies/snakes/${i + 1}.png`,
  alt: `Snakes data visualization project — screenshot ${i + 1} of 13`,
}))

export function SnakesShowcaseContent() {
  const {
    isAnimating,
    animationCycle,
    showFirstArrow,
    handleMouseEnter,
    handleMouseLeave,
  } = useArrowAnimation()

  return (
    <m.section
      className="w-full px-6 lg:px-16 py-16 md:py-24 max-w-[1920px] mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <div className="max-w-[1044px] mx-auto text-left">
        <h3 className="text-lg md:text-[28px] font-bold text-text-primary mb-6 md:mb-[28px]">
          Abstract
        </h3>

        <div className="space-y-6 md:space-y-8">
          <p className="text-base md:text-[18px] font-normal text-text-color70 leading-relaxed">
            This showcase is a personal exploration into interactive data visualization,
            centered on the taxonomy and behavior of snakes. The goal was to design an
            experience that makes biological information — species rankings, venom
            classification, and geographic distribution — feel navigable and visually
            engaging for a general audience.
          </p>
          <p className="text-base md:text-[18px] font-normal text-text-color70 leading-relaxed">
            The project was vibe-coded over a weekend, prioritizing feel and motion over
            completeness. It served as a test bed for ideas around scroll-driven
            storytelling, ambient UI, and data-first design — exploring how visual
            hierarchy and interaction can reduce the cognitive load of dense taxonomic data.
          </p>
        </div>

        <div className="mt-16 md:mt-24 lg:mt-32 flex justify-end">
          <m.a
            href={LIVE_SITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="group inline-flex items-center gap-[16px] text-[28px] font-bold tracking-[-0.05em] text-foreground transition-colors hover:text-primary md:gap-[18px] md:text-[34px] lg:gap-[20px] lg:text-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
          >
            Check the live site
            <AnimatedArrow
              isAnimating={isAnimating}
              showFirstArrow={showFirstArrow}
              animationCycle={animationCycle}
              className="w-[22px] h-[22px] md:w-[26px] md:h-[26px] lg:w-[30px] lg:h-[30px]"
            />
          </m.a>
        </div>
      </div>

      {/* Full width between section gutters: 24px (mobile) / 64px lg+ */}
      <div className="mt-12 md:mt-16 lg:mt-20 w-full">
        <h4 className="sr-only">Project screenshots</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 [&>*:last-child:nth-child(odd)]:col-start-1">
          {SNAKE_SCREENSHOTS.map((shot, i) => {
            const isLastOdd = i === SNAKE_SCREENSHOTS.length - 1 && SNAKE_SCREENSHOTS.length % 2 !== 0
            return (
              <div
                key={shot.src}
                className="relative w-full"
                style={{ aspectRatio: `${SHOT_WIDTH} / ${SHOT_HEIGHT}` }}
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 45vw, calc((100vw - 128px) / 2)"
                  className={`object-contain ${isLastOdd ? 'object-left-top' : 'object-top'}`}
                  loading="lazy"
                  quality={85}
                  decoding="async"
                />
              </div>
            )
          })}
        </div>
      </div>
    </m.section>
  )
}
