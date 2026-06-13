'use client'

import { m } from 'framer-motion'
import dynamic from 'next/dynamic'
import { AnimatedLink } from '@/components/ui/AnimatedLink'
import { useBreakpoints } from '@/hooks/use-responsive'

const WaterBlobWithBoundary = dynamic(
  () =>
    import('./WaterBlobWithBoundary').then((mod) => mod.WaterBlobWithBoundary),
  { ssr: false }
)
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
const DESKTOP_CURRENTLY_DELAY = 2.0
const DESKTOP_BROWSE_WORK_DELAY = 2.2
const SHOW_WELCOME_TEXT = false
const DESKTOP_CURRENTLY_DURATION = 1.1
const META_FADE_DURATION = 1.2

interface HeroProps {
  onBrowseWorkClick?: () => void
  onGetInTouchClick?: () => void
}

export function Hero({
  onBrowseWorkClick,
  onGetInTouchClick,
}: HeroProps) {
  const { isMobile } = useBreakpoints()
  const isDesktopAnimation =
    typeof window !== 'undefined' &&
    window.matchMedia('(min-width: 768px)').matches
  const currentlyDelay = isDesktopAnimation
    ? DESKTOP_CURRENTLY_DELAY
    : isMobile
      ? 0.1
      : 0.7
  const browseWorkDelay = isDesktopAnimation ? DESKTOP_BROWSE_WORK_DELAY : 1.0
  const currentlyDuration = isDesktopAnimation
    ? DESKTOP_CURRENTLY_DURATION
    : META_FADE_DURATION

  return (
    <section className="relative flex flex-col h-full w-full">
      <div className="max-w-[1920px] mx-auto w-full h-full flex flex-col">
        <m.div
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
                  delay={isMobile ? 0.3 : 1.8}
                >
                  Hi, I&apos;m Atharva — a product designer based in NYC. I love
                  solving problems through thoughtful design and crafting
                  delightful, user-centered experiences.
                </AnimatedHeroTextGSAP>
              </div>

              <div className="flex flex-col items-end gap-3 md:flex-row md:items-end md:gap-10 lg:gap-[196px]">
                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: currentlyDuration,
                    delay: currentlyDelay,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className="max-w-[50%] md:max-w-xs text-[12px] md:text-[16px] font-normal text-left"
                >
                  <span className="block md:inline text-text-secondary font-medium">
                    Currently,{' '}
                  </span>
                  <span style={{ color: 'rgb(var(--color-text-secondary))' }}>
                    MS in Human-Computer Interaction at Pratt Institute.
                  </span>
                </m.div>

                {/* Browse work link - hidden on mobile, visible from md and up */}
                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: META_FADE_DURATION,
                    delay: browseWorkDelay,
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
                </m.div>
              </div>
            </div>

            {/* Water blob container — canvas renders as bg color until blobs rise (WebGL yOffset).
                No opacity gate: the area is already "black" because the shader outputs the
                background color wherever there's no blob. */}
            <div className="relative w-full overflow-hidden water-blob-container flex-1 md:flex-none md:h-[320px] md:max-h-[320px] lg:h-[400px] lg:max-h-[400px] 2xl:h-[440px] 2xl:max-h-[480px]">
              {/* Flash 1: desktop only. Ghost pulse that rises and fades.
                  Skipped on mobile for performance — F2 follows text directly. */}
              {!isMobile && <WaterBlobWithBoundary isGhost isQuick entryDelay={500} />}

              {/* Flash 2: desktop waits for F1 gap (2500ms). Mobile follows text directly (1500ms). */}
              <WaterBlobWithBoundary interactive entryDelay={isMobile ? 1500 : 2500} />

              {/* Welcome text — toggle SHOW_WELCOME_TEXT to enable. Black, all-caps,
                  centered. Revealed by F1's light, gone before F2. */}
              {SHOW_WELCOME_TEXT && <m.div
                aria-hidden="true"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{
                  delay: 0.5,
                  duration: 1.4,
                  times: [0, 0.12, 0.55, 1],
                  ease: 'easeInOut',
                }}
                className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6"
              >
                <span className="text-center font-bold uppercase tracking-tight text-black text-xs sm:text-sm md:text-base">
                  Welcome to the portfolio of Atharva
                </span>
              </m.div>}
            </div>
          </div>

          {/* Bottom Navigation Links - 16px from viewport bottom */}
          <m.div
            variants={fadeInUp}
            className="hidden md:flex items-center justify-between mt-4 px-6 md:px-0"
            style={{ flexShrink: 0, paddingBottom: '1rem' }}
          >
            {/* Left Link - Hover animation */}
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

            <div
              className="text-[16px] font-normal"
              style={{ color: 'rgb(var(--color-text-secondary))' }}
            >
              Looking for full-time roles starting Summer &apos;26.
            </div>

            {/* Right Link - Hover animation */}
            <HoverLink href="/resume" prefetch={false}>Résumé</HoverLink>
          </m.div>
        </m.div>
      </div>
    </section>
  )
}
