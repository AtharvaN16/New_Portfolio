'use client'

import { m, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from 'react'
import Image from 'next/image'
import { CASE_STUDY_HERO_IMAGE_QUALITY } from '@/lib/case-study-image-sizes'
import {
  CASE_STUDY_HERO_SCRIM_COLOR,
  caseStudyHeroRevealBlurPx,
  caseStudyHeroScrimOpacity,
  caseStudyHeroFrameInsetPxFromReveal,
  caseStudyHeroFrameInsetReveal,
  caseStudyHeroFrameRadiusPx,
  caseStudyHeroFrameRadiusReveal,
  caseStudyHeroSettleScale,
  caseStudyHeroSettleTranslateYPercent,
  heroMediaVisibleRatio,
  latchHeroRevealProgress,
  latchSettleVisibleRatio,
  shouldResetCaseStudyHeroReveal,
} from '@/lib/case-study-hero-scrim'
import { useCaseStudyScrollContainerRef } from '@/hooks/use-container-scroll'
import {
  useVideoPlaybackInView,
  VIDEO_HERO_VISIBILITY_THRESHOLD,
} from '@/hooks/use-video-playback-in-view'
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
  const internalVideoRef = useRef<HTMLVideoElement>(null)
  const mediaRef = externalMediaRef ?? internalMediaRef
  const resolvedVideoRef = videoRef ?? internalVideoRef
  const scrollContainerRef = useCaseStudyScrollContainerRef()
  const liveVisibleRatio = useMotionValue(0)
  const latchedVisibleRatio = useMotionValue(0)
  const peakVisibleRatio = useMotionValue(0)
  const frameInsetRatio = useMotionValue(0)
  const frameRadiusRatio = useMotionValue(0)
  const peakVisibleRatioRef = useRef(0)
  const peakFrameInsetRatioRef = useRef(0)
  const peakFrameRadiusRatioRef = useRef(0)
  const [effectsReady, setEffectsReady] = useState(false)
  const isDesktop = useBreakpoint('md')
  const { reducedMotion } = useAccessibility()

  const enableScrim = effectsReady && !reducedMotion
  const enableSettle = effectsReady && isDesktop && !reducedMotion
  const enableFrame = effectsReady && isDesktop
  const is2xl = useBreakpoint('2xl')
  const maxFrameInsetPx = is2xl ? 140 : 24

  const scrimOpacity = useTransform(
    [liveVisibleRatio, peakVisibleRatio],
    ([live, peak]) =>
      caseStudyHeroScrimOpacity(live as number, peak as number)
  )
  const mediaScale = useTransform(latchedVisibleRatio, (ratio) =>
    caseStudyHeroSettleScale(ratio)
  )
  const mediaY = useTransform(latchedVisibleRatio, (ratio) =>
    `${caseStudyHeroSettleTranslateYPercent(ratio)}%`
  )
  const frameInsetPx = useTransform(frameInsetRatio, (insetReveal) =>
    reducedMotion
      ? maxFrameInsetPx
      : caseStudyHeroFrameInsetPxFromReveal(insetReveal, maxFrameInsetPx)
  )
  const frameWidth = useTransform(
    frameInsetPx,
    (px) => `calc(100% - ${px * 2}px)`
  )
  const frameRadius = useTransform(frameRadiusRatio, (ratio) =>
    reducedMotion
      ? `${caseStudyHeroFrameRadiusPx(1)}px`
      : `${caseStudyHeroFrameRadiusPx(ratio)}px`
  )
  const frameShadowOpacity = useTransform(frameRadiusRatio, (ratio) =>
    reducedMotion ? 1 : ratio
  )
  const mediaFilter = useTransform(
    [liveVisibleRatio, peakVisibleRatio],
    ([live, peak]) => {
      const blur = caseStudyHeroRevealBlurPx(live as number, peak as number)
      return blur > 0.01 ? `blur(${blur}px) contrast(1.05)` : 'contrast(1.05)'
    }
  )

  useEffect(() => {
    setEffectsReady(true)
  }, [])

  useVideoPlaybackInView(resolvedVideoRef, mediaRef, {
    enabled: !!videoUrl,
    threshold: VIDEO_HERO_VISIBILITY_THRESHOLD,
    root: scrollContainerRef,
  })

  useLayoutEffect(() => {
    const resetLatchedReveal = (latchedVisible = 0) => {
      peakVisibleRatioRef.current = latchedVisible
      peakFrameInsetRatioRef.current = latchedVisible ? 1 : 0
      peakFrameRadiusRatioRef.current = latchedVisible ? 1 : 0
      latchedVisibleRatio.set(latchedVisible)
      peakVisibleRatio.set(latchedVisible)
      frameInsetRatio.set(peakFrameInsetRatioRef.current)
      frameRadiusRatio.set(peakFrameRadiusRatioRef.current)
    }

    if (!effectsReady || reducedMotion) {
      liveVisibleRatio.set(0)
      resetLatchedReveal(reducedMotion ? 1 : 0)
      return
    }

    let rafId = 0
    let container: HTMLElement | null = null
    let resizeObserver: ResizeObserver | null = null

    const update = () => {
      const media = mediaRef.current
      if (!container || !media) return

      if (shouldResetCaseStudyHeroReveal(container.scrollTop)) {
        resetLatchedReveal(0)
      }

      const containerRect = container.getBoundingClientRect()
      const mediaRect = media.getBoundingClientRect()
      const ratio = heroMediaVisibleRatio(mediaRect, containerRect)

      liveVisibleRatio.set(ratio)

      peakVisibleRatioRef.current = latchSettleVisibleRatio(
        ratio,
        peakVisibleRatioRef.current
      )
      peakVisibleRatio.set(peakVisibleRatioRef.current)

      if (isDesktop) {
        latchedVisibleRatio.set(peakVisibleRatioRef.current)

        peakFrameInsetRatioRef.current = latchHeroRevealProgress(
          caseStudyHeroFrameInsetReveal(ratio),
          peakFrameInsetRatioRef.current
        )
        frameInsetRatio.set(peakFrameInsetRatioRef.current)

        peakFrameRadiusRatioRef.current = latchHeroRevealProgress(
          caseStudyHeroFrameRadiusReveal(ratio),
          peakFrameRadiusRatioRef.current
        )
        frameRadiusRatio.set(peakFrameRadiusRatioRef.current)
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
    frameInsetRatio,
    frameRadiusRatio,
    isDesktop,
    latchedVisibleRatio,
    liveVisibleRatio,
    mediaRef,
    peakVisibleRatio,
    reducedMotion,
    scrollContainerRef,
  ])

  if (!imageUrl && !videoUrl) {
    return null
  }

  const mediaContent = videoUrl ? (
    <video
      ref={resolvedVideoRef}
      src={videoUrl}
      poster={posterUrl ?? imageUrl}
      muted
      loop
      playsInline
      preload="none"
      className="absolute inset-0 h-full w-full object-cover"
    />
  ) : (
    <Image
      src={imageUrl!}
      alt={caption ?? `${title} — hero image`}
      fill
      className="object-cover"
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
      <m.div
        ref={mediaRef}
        className="case-study-hero-frame relative aspect-[16/9] w-full overflow-hidden"
        style={
          enableFrame
            ? {
                width: frameWidth,
                marginLeft: 'auto',
                marginRight: 'auto',
                borderRadius: frameRadius,
                ['--case-study-hero-frame-shadow' as string]: frameShadowOpacity,
              }
            : undefined
        }
      >
        <m.div
          className={
            enableSettle || enableScrim
              ? 'absolute inset-0 will-change-transform'
              : 'absolute inset-0'
          }
          style={
            enableSettle || enableScrim
              ? {
                  ...(enableSettle ? { scale: mediaScale, y: mediaY } : {}),
                  ...(enableScrim ? { filter: mediaFilter } : {}),
                }
              : { scale: 1, y: '0%', filter: 'contrast(1.05)' }
          }
        >
          {mediaContent}
        </m.div>

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
      </m.div>

      {caption ? (
        <figcaption className="mx-auto max-w-[52rem] px-6 py-4 text-xs font-sans leading-normal text-text-body md:py-6 2xl:px-[140px]">
          {caption}
        </figcaption>
      ) : null}
    </section>
  )
}
