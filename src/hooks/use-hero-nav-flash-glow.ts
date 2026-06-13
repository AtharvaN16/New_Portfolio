'use client'

import { useEffect, useRef, type RefObject } from 'react'
import {
  HERO_NAV_GLOW_FADE_LEAD_MS,
  HERO_NAV_GLOW_FADE_START_MS,
} from '@/components/hero/hero-entry-timing'
import { useAccessibility } from '@/components/providers/AccessibilityProvider'
import {
  computeNavFlashIntensity,
  fadeNavFlashIntensity,
  HERO_FLASH_HEAD_EVENT,
  navFlashFilterGlow,
  type HeroFlashHeadDetail,
} from '@/components/hero/hero-flash-head'
import { useBreakpoint } from '@/hooks/use-responsive'

function clearLogoGlow(el: HTMLImageElement | null) {
  if (!el) return
  el.style.filter = ''
}

function applyLogoGlow(el: HTMLImageElement | null, intensity: number) {
  if (!el) return
  el.style.filter = navFlashFilterGlow(intensity)
}

function logoIntensity(
  el: HTMLImageElement | null,
  headScreenY: number,
  trail: number
): number {
  if (!el) return 0
  return computeNavFlashIntensity(headScreenY, el.getBoundingClientRect(), trail)
}

export function useHeroNavFlashGlow(logoImage: RefObject<HTMLImageElement | null>) {
  const { reducedMotion } = useAccessibility()
  const isMdUp = useBreakpoint('md')
  const intensityRef = useRef(0)
  const peakRef = useRef(0)
  const fadeStartedRef = useRef(false)
  const fadeElapsedRef = useRef(0)
  const rafRef = useRef(0)
  const lastTimeRef = useRef(0)

  useEffect(() => {
    if (reducedMotion || !isMdUp) return

    const tick = (now: number) => {
      const last = lastTimeRef.current || now
      const deltaMs = Math.min(now - last, 48)
      lastTimeRef.current = now
      fadeElapsedRef.current += deltaMs

      intensityRef.current = fadeNavFlashIntensity(
        peakRef.current,
        fadeElapsedRef.current,
        HERO_NAV_GLOW_FADE_LEAD_MS
      )

      applyLogoGlow(logoImage.current, intensityRef.current)

      if (
        fadeElapsedRef.current < HERO_NAV_GLOW_FADE_LEAD_MS &&
        intensityRef.current > 0.003
      ) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        rafRef.current = 0
        lastTimeRef.current = 0
        fadeElapsedRef.current = 0
        intensityRef.current = 0
        peakRef.current = 0
        clearLogoGlow(logoImage.current)
      }
    }

    const startFade = () => {
      peakRef.current = intensityRef.current
      fadeStartedRef.current = true
      fadeElapsedRef.current = 0
      if (!rafRef.current) {
        lastTimeRef.current = 0
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    const fadeTimer = window.setTimeout(startFade, HERO_NAV_GLOW_FADE_START_MS)

    const handleFlashHead = (event: Event) => {
      if (fadeStartedRef.current) return

      const { headScreenY, trail, active } = (
        event as CustomEvent<HeroFlashHeadDetail>
      ).detail

      if (!active || trail <= 0.001) return

      const live = logoIntensity(logoImage.current, headScreenY, trail)
      intensityRef.current = Math.max(intensityRef.current, live)
      applyLogoGlow(logoImage.current, intensityRef.current)
    }

    window.addEventListener(HERO_FLASH_HEAD_EVENT, handleFlashHead)

    return () => {
      window.clearTimeout(fadeTimer)
      window.removeEventListener(HERO_FLASH_HEAD_EVENT, handleFlashHead)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = 0
      fadeStartedRef.current = false
      fadeElapsedRef.current = 0
      intensityRef.current = 0
      peakRef.current = 0
      clearLogoGlow(logoImage.current)
    }
  }, [isMdUp, reducedMotion, logoImage])
}
