'use client'

import { motion } from 'framer-motion'
import { WaterBlobWithBoundary } from './WaterBlobWithBoundary'
import { AnimatedLink } from '@/components/ui/AnimatedLink'
import { AnimatedHeroTextGSAP } from './AnimatedHeroTextGSAP'
import { HoverLink } from '@/components/ui/HoverLink'

/**
 * Hero Component
 *
 * Main hero section for homepage.
 * Clean, maintainable implementation following all guidelines.
 *
 * Layout:
 * - Hero text above blob
 * - Animated water blob (480px height, 90deg corners)
 * - Navigation links at bottom (absolute positioned)
 *
 * Features:
 * - Framer Motion animations (NOT GSAP)
 * - 24px margin on all sides
 * - Dark background
 * - Font: 20px/500 for text, 16px/500 for links
 */

const fadeInUp = {
  initial: { y: 40, opacity: 0 },
  animate: { y: 0, opacity: 1 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

// Stable references for AnimatedHeroTextGSAP to prevent re-animation on re-renders
const HERO_BOLD_WORDS = ['Atharva']
const HERO_PRONUNCIATION = { Atharva: 'uh · thar · vuh' }

interface HeroProps {
  shouldPauseBlobs?: boolean
  onBrowseWorkClick?: () => void
  onGetInTouchClick?: () => void
}

export function Hero({
  shouldPauseBlobs = false,
  onBrowseWorkClick,
  onGetInTouchClick,
}: HeroProps) {
  return (
    <section className="relative flex flex-col h-full w-full">
      <div className="max-w-[1920px] mx-auto w-full h-full flex flex-col">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="flex flex-col h-full"
        >
          {/* Wrapper for text + blob to keep them attached */}
          <div className="flex flex-col mt-0 pt-[20dvh] md:mt-auto md:pt-0 gap-4 md:gap-0 flex-1 md:flex-none">
            {/* Hero Text + meta - stacked on mobile, horizontal on desktop */}
            <div
              className="flex flex-col gap-12 mb-4 md:mb-5 lg:mb-6 md:flex-row md:items-end md:justify-between md:gap-4 px-6 md:px-0 md:min-h-0"
              style={{ flexShrink: 0 }}
            >
              {/* Hero Text - Single paragraph with GSAP line-by-line reveal animation */}
              <div className="max-w-[70%] md:max-w-none md:w-[410px]">
                <AnimatedHeroTextGSAP
                  as="h1"
                  boldWords={HERO_BOLD_WORDS}
                  pronunciationWords={HERO_PRONUNCIATION}
                  className="text-hero-body"
                  delay={0.6}
                >
                  Hi, I&apos;m Atharva — a product designer based in NYC. I love
                  solving problems through thoughtful design and crafting
                  delightful, user-centered experiences.
                </AnimatedHeroTextGSAP>
              </div>

              <div className="flex flex-col items-end gap-3 md:flex-row md:items-end md:gap-10 lg:gap-[196px]">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 1.2,
                    delay: 0.7,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className="max-w-[50%] md:max-w-xs text-[12px] md:text-[16px] font-normal text-left"
                >
                  <span className="block md:inline text-text-secondary font-medium">
                    Currently,{' '}
                  </span>
                  <span style={{ color: 'rgb(var(--color-text-color60))' }}>
                    MS in Human-Computer Interaction at Pratt Institute.
                  </span>
                </motion.div>

                {/* Browse work link - hidden on mobile, visible from md and up */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 1.2,
                    delay: 1.0,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className="hidden md:block"
                >
                  <AnimatedLink
                    href="#work"
                    variant="down-arrow"
                    onClick={(event) => {
                      if (onBrowseWorkClick) {
                        event.preventDefault()
                        onBrowseWorkClick()
                      }
                    }}
                  >
                    Browse work
                  </AnimatedLink>
                </motion.div>
              </div>
            </div>

            {/* Animated Water Blob - Flex grow to fill space with max height constraints */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.6, delay: 1.4 }}
              className="relative w-full overflow-hidden water-blob-container flex-1 md:flex-none md:h-[320px] md:max-h-[320px] lg:h-[400px] lg:max-h-[400px] 2xl:h-[440px] 2xl:max-h-[480px]"
            >
              <WaterBlobWithBoundary paused={shouldPauseBlobs} interactive />
            </motion.div>
          </div>

          {/* Bottom Navigation Links - 16px from viewport bottom */}
          <motion.div
            variants={fadeInUp}
            className="hidden md:flex items-center justify-between mt-4 px-6 md:px-0"
            style={{ flexShrink: 0, paddingBottom: '1rem' }}
          >
            {/* Left Link - Hover animation */}
            <HoverLink href="/resume">Résumé</HoverLink>

            <div
              className="text-[16px] font-normal"
              style={{ color: 'rgb(var(--color-text-color60))' }}
            >
              Looking for full-time roles starting Summer &apos;26.
            </div>

            {/* Right Link - Hover animation */}
            <HoverLink
              href="#footer"
              onClick={(e) => {
                if (onGetInTouchClick) {
                  e.preventDefault()
                  onGetInTouchClick()
                }
              }}
            >
              Get in touch
            </HoverLink>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
