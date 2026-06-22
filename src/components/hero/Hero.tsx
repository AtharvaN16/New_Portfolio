'use client'

import { useState } from 'react'
import { m } from 'framer-motion'
import dynamic from 'next/dynamic'
import { AnimatedLink } from '@/components/ui/AnimatedLink'
import { useBreakpoints } from '@/hooks/use-responsive'
import { cn } from '@/lib/utils/cn'
import {
  HERO_BIO_DELAY_S,
  HERO_BOTTOM_ROW_DELAY_S,
  HERO_BROWSE_WORK_DELAY_MS,
  HERO_BROWSE_WORK_DELAY_S,
  HERO_CTA_DURATION_S,
  HERO_CURRENTLY_DELAY_S,
  HERO_CURRENTLY_DURATION_S,
  HERO_F1_ENTRY_MS,
  HERO_F2_ENTRY_MS,
  HERO_FLASH_WELCOME_ENABLED,
} from './hero-entry-timing'
import { HeroFlashWelcome } from './HeroFlashWelcome'
import { pickInitialHeroPaletteIndex } from './hero-palette'

const WaterBlobWithBoundary = dynamic(
  () =>
    import('./WaterBlobWithBoundary').then((mod) => mod.WaterBlobWithBoundary),
  { ssr: false }
)
import {
  AnimatedHeroTextGSAP,
  HERO_BIO_BOLD_WORDS,
  HERO_BIO_PRONUNCIATION_WORDS,
} from './AnimatedHeroTextGSAP'
import { HoverLink } from '@/components/ui/HoverLink'

const META_FADE_DURATION = 1.2

interface HeroProps {
  onBrowseWorkClick?: () => void
  onGetInTouchClick?: () => void
  /** Use svh-based top spacing — avoids dvh toolbar thrash on mobile home */
  stableMobileViewport?: boolean
  /** 0–1 featured card visibility — drives bio fade + blob dim on mobile home */
  featuredCover?: number
}

export function Hero({
  onBrowseWorkClick,
  onGetInTouchClick,
  stableMobileViewport = false,
  featuredCover = 0,
}: HeroProps) {
  const { isMobile } = useBreakpoints()
  const [initialPaletteIndex] = useState(() => pickInitialHeroPaletteIndex())
  // Read matchMedia synchronously — avoids the false-on-first-render problem
  // that useBreakpoints() has (starts false, updates after mount).
  // Hero.tsx is 'use client' so window is always available here.
  const isDesktopAnimation =
    typeof window !== 'undefined' &&
    window.matchMedia('(min-width: 768px)').matches

  const bioDelay = isDesktopAnimation ? HERO_BIO_DELAY_S : isMobile ? 1.0 : 1.8
  const currentlyDelay = isDesktopAnimation
    ? HERO_CURRENTLY_DELAY_S
    : isMobile
      ? 0.1
      : 0.7
  const browseWorkDelay = isDesktopAnimation ? HERO_BROWSE_WORK_DELAY_S : 1.0
  const currentlyDuration = isDesktopAnimation
    ? HERO_CURRENTLY_DURATION_S
    : META_FADE_DURATION
  const bottomRowDelay = isDesktopAnimation ? HERO_BOTTOM_ROW_DELAY_S : 0
  const featuredScrollMix = Math.min(1, featuredCover * 1.6)

  const bioBlock = (
    <div
      className="flex flex-col gap-12 mb-2 md:mb-5 lg:mb-6 md:flex-row md:items-end md:justify-between md:gap-4 px-6 md:px-0 md:min-h-0"
      style={{ flexShrink: 0 }}
    >
      <div
        className={cn(
          'max-w-[70%] md:max-w-none md:w-[410px]',
          stableMobileViewport && 'home-mobile-hero-bio'
        )}
        style={
          stableMobileViewport
            ? {
                opacity: 1 - featuredScrollMix,
                transform: `translateY(${-20 * featuredScrollMix}px)`,
              }
            : undefined
        }
      >
        <AnimatedHeroTextGSAP
          as="h1"
          boldWords={HERO_BIO_BOLD_WORDS}
          pronunciationWords={HERO_BIO_PRONUNCIATION_WORDS}
          inlinePronunciation={stableMobileViewport}
          className="text-hero-body"
          delay={bioDelay}
        >
          Hi, I&apos;m Atharva — a product designer based in NYC. I love
          solving problems through thoughtful design and crafting delightful,
          user-centered experiences.
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
          className="hidden md:block w-80 max-w-xs text-[16px] text-left"
        >
          <p className="md:max-w-[15rem] text-text-secondary">
            <span className="font-normal">
              M.S. in Human-Computer Interaction,{' '}
            </span>
            <span className="font-medium">Pratt Institute</span>
          </p>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: isDesktopAnimation
              ? HERO_CTA_DURATION_S
              : META_FADE_DURATION,
            delay: browseWorkDelay,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="hidden md:block"
        >
          <AnimatedLink
            href="#work"
            variant="down-arrow"
            entryPulseDelayMs={HERO_BROWSE_WORK_DELAY_MS}
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
  )

  const blobBlock = (
    <div
      className={cn(
        'relative overflow-hidden water-blob-container md:min-h-0 md:flex-none md:h-[320px] md:max-h-[320px] lg:h-[400px] lg:max-h-[400px] 2xl:h-[440px] 2xl:max-h-[480px]',
        stableMobileViewport
          ? 'water-blob-container--edge h-full min-h-0 w-full'
          : 'min-h-[480px] w-full flex-1 md:min-h-0'
      )}
      style={
        stableMobileViewport
          ? { opacity: 1 - featuredScrollMix * 0.2 }
          : undefined
      }
    >
      {!isMobile && (
        <WaterBlobWithBoundary
          isGhost
          isQuick
          entryDelay={HERO_F1_ENTRY_MS}
          initialPaletteIndex={initialPaletteIndex}
        />
      )}

      <WaterBlobWithBoundary
        interactive
        entryDelay={isMobile ? 1500 : 0}
        webglInitDelay={isMobile ? 0 : HERO_F2_ENTRY_MS}
        initialPaletteIndex={initialPaletteIndex}
      />

      {!isMobile && HERO_FLASH_WELCOME_ENABLED && <HeroFlashWelcome />}
    </div>
  )

  if (stableMobileViewport) {
    return (
      <div
        className="grid h-full min-h-0 w-full flex-1"
        style={{
          gridTemplateRows: 'minmax(0, 11fr) minmax(40svh, 9fr)',
        }}
      >
        <div className="min-h-0 self-end pt-[18svh]">{bioBlock}</div>
        <div className="min-h-0 w-full">{blobBlock}</div>
      </div>
    )
  }

  return (
    <section className="relative flex flex-col h-full w-full">
      <div className="max-w-[1920px] mx-auto w-full h-full flex flex-col">
        <m.div className="flex flex-col h-full">
          <div className="mt-0 flex flex-1 flex-col gap-4 pt-[20dvh] md:mt-auto md:flex-none md:gap-0 md:pt-0">
            {bioBlock}
            {blobBlock}
          </div>

          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: HERO_CTA_DURATION_S,
              delay: bottomRowDelay,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="hidden md:flex items-center justify-between mt-4 px-6 md:px-0"
            style={{ flexShrink: 0, paddingBottom: '1rem' }}
          >
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

            <div className="text-[16px] font-medium text-text-secondary">
              Currently looking for full-time roles,
            </div>

            <HoverLink href="/resume" prefetch={false}>
              Résumé
            </HoverLink>
          </m.div>
        </m.div>
      </div>
    </section>
  )
}
