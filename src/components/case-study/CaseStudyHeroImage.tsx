'use client'

import { m, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from 'react'
import Image from 'next/image'
import { CASE_STUDY_HERO_IMAGE_QUALITY } from '@/lib/case-study-image-sizes'
import {
  CASE_STUDY_HERO_SCRIM_COLOR,
  caseStudyHeroScrimOpacity,
  caseStudyHeroSettleScale,
  caseStudyHeroSettleTranslateYPercent,
  heroMediaVisibleRatio,
  latchSettleVisibleRatio,
} from '@/lib/case-study-hero-scrim'
import { useCaseStudyScrollContainerRef } from '@/hooks/use-container-scroll'
import { useBreakpoint } from '@/hooks/use-responsive'
import { useAccessibility } from '@/components/providers/AccessibilityProvider'

interface CaseStudyHeroImageProps {
  title: string
  imageUrl?: string
  videoUrl?: string
  posterUrl?: string
  caption?: string
  mediaRef?: RefObject<HTMLDivElement | null>
  videoRef?: RefObject<HTMLVideoElement | null>
}

export function CaseStudyHeroImage({
  title,
  imageUrl,
  videoUrl,
  posterUrl,
  caption,
  mediaRef: externalMediaRef,
  videoRef,
}: CaseStudyHeroImageProps) {
  const internalMediaRef = useRef<HTMLDivElement>(null)
  const mediaRef = externalMediaRef ?? internalMediaRef
  const scrollContainerRef = useCaseStudyScrollContainerRef()
  const visibleRatio = useMotionValue(0)
  const settleRatio = useMotionValue(0)
  const peakSettleRatioRef = useRef(0)
  const [effectsReady, setEffectsReady] = useState(false)
  const isDesktop = useBreakpoint('md')
  const { reducedMotion } = useAccessibility()

  const enableScrim = effectsReady && !reducedMotion
  const enableSettle = effectsReady && isDesktop && !reducedMotion

  const scrimOpacity = useTransform(visibleRatio, (ratio) =>
    caseStudyHeroScrimOpacity(ratio)
  )
  const mediaScale = useTransform(settleRatio, (ratio) =>
    caseStudyHeroSettleScale(ratio)
  )
  const mediaY = useTransform(settleRatio, (ratio) =>
    `${caseStudyHeroSettleTranslateYPercent(ratio)}%`
  )

  useEffect(() => {
    setEffectsReady(true)
  }, [])

  useLayoutEffect(() => {
    if (!effectsReady || reducedMotion) {
      visibleRatio.set(0)
      settleRatio.set(0)
      peakSettleRatioRef.current = 0
      return
    }

    let rafId = 0
    let container: HTMLElement | null = null
    let resizeObserver: ResizeObserver | null = null

    const update = () => {
      const media = mediaRef.current
      if (!container || !media) return

      const containerRect = container.getBoundingClientRect()
      const mediaRect = media.getBoundingClientRect()
      const ratio = heroMediaVisibleRatio(mediaRect, containerRect)

      visibleRatio.set(ratio)

      if (isDesktop) {
        peakSettleRatioRef.current = latchSettleVisibleRatio(
          ratio,
          peakSettleRatioRef.current
        )
        settleRatio.set(peakSettleRatioRef.current)
      }
    }

    const attach = () => {
      container =
        scrollContainerRef?.current ??
        document.getElementById('case-study-scroll-container')

      const media = mediaRef.current
      if (!container || !media) {
        rafId = requestAnimationFrame(attach)
        return
      }

      update()
      container.addEventListener('scroll', update, { passive: true })
      window.addEventListener('resize', update, { passive: true })
      resizeObserver = new ResizeObserver(update)
      resizeObserver.observe(container)
      resizeObserver.observe(media)
    }

    attach()

    return () => {
      cancelAnimationFrame(rafId)
      container?.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      resizeObserver?.disconnect()
    }
  }, [
    effectsReady,
    isDesktop,
    mediaRef,
    reducedMotion,
    scrollContainerRef,
    settleRatio,
    visibleRatio,
  ])

  if (!imageUrl && !videoUrl) {
    return null
  }

  const mediaContent = videoUrl ? (
    <video
      ref={videoRef}
      src={videoUrl}
      poster={posterUrl ?? imageUrl}
      muted
      loop
      playsInline
      preload="none"
      className="absolute inset-0 h-full w-full object-cover [filter:contrast(1.05)]"
    />
  ) : (
    <Image
      src={imageUrl!}
      alt={caption ?? `${title} — hero image`}
      fill
      className="object-cover [filter:contrast(1.05)]"
      sizes="100vw"
      priority
      quality={CASE_STUDY_HERO_IMAGE_QUALITY}
    />
  )

  return (
    <section
      className="relative z-10 mb-20 w-full bg-background md:mb-32"
      aria-label={`${title} hero`}
    >
      <div
        ref={mediaRef}
        className="relative aspect-[16/9] w-full overflow-hidden md:aspect-auto md:min-h-screen"
      >
        {enableSettle ? (
          <m.div
            className="absolute inset-0 will-change-transform"
            style={{ scale: mediaScale, y: mediaY }}
          >
            {mediaContent}
          </m.div>
        ) : (
          <div className="absolute inset-0">{mediaContent}</div>
        )}

        {enableScrim ? (
          <m.div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[1]"
            style={{
              opacity: scrimOpacity,
              backgroundColor: CASE_STUDY_HERO_SCRIM_COLOR,
            }}
          />
        ) : null}
      </div>

      {caption ? (
        <figcaption className="mx-auto max-w-[52rem] px-6 py-4 text-xs font-sans leading-normal text-text-body md:py-6 2xl:px-[140px]">
          {caption}
        </figcaption>
      ) : null}
    </section>
  )
}
