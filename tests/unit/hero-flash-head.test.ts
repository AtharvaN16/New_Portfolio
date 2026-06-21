import { describe, expect, it, vi } from 'vitest'
import { HERO_F1_ENTRY_MS } from '@/components/hero/hero-entry-timing'
import {
  computeFlashHeadUvY,
  computeNavFlashIntensity,
  developNavFlashDecay,
  dispatchHeroFlashHead,
  easeOutCubic,
  fadeNavFlashIntensity,
  f1MsUntilHeadReachesScreenY,
  f1PageMsUntilNavbarGlow,
  flashHeadScreenY,
  flashHeadScreenYFromSweep,
  flashHeadScreenYPxPerFrame,
  flashNavbarPassDurationMs,
  FLASH_HEAD_DISPATCH_FRAME_INTERVAL,
  NAV_FLASH_DECAY_MS,
  NAV_FLASH_GLOW_FALLOFF_PX,
  yOffsetForHeadScreenY,
} from '@/components/hero/hero-flash-head'

describe('hero flash head sync', () => {
  it('matches shader approxTopEdge during plasma entry', () => {
    expect(computeFlashHeadUvY(-1.5)).toBeCloseTo(-0.45, 2)
    expect(computeFlashHeadUvY(0)).toBeCloseTo(1.05, 2)
  })

  it('maps UV head position to screen coordinates within the canvas', () => {
    const rect = { top: 200, bottom: 600, height: 400 }
    expect(flashHeadScreenY(0, rect)).toBe(600)
    expect(flashHeadScreenY(1, rect)).toBe(200)
  })

  it('extends the sweep across the full viewport for navbar sync', () => {
    const viewport = 900
    expect(flashHeadScreenYFromSweep(-1.5, viewport)).toBe(viewport)
    expect(flashHeadScreenYFromSweep(0, viewport)).toBe(0)
  })

  it('uses direct falloff glow — pre film-develop level', () => {
    const band = { top: 40, bottom: 80 }
    const peak = computeNavFlashIntensity(60, band, 0.9)
    const edge = computeNavFlashIntensity(60 + NAV_FLASH_GLOW_FALLOFF_PX, band, 0.9)
    expect(peak).toBeCloseTo(0.9, 2)
    expect(edge).toBeLessThan(peak * 0.4)
  })

  it('calculates exact F1 arrival at navbar from rise physics', () => {
    const viewport = 900
    const navbarCenterY = 56
    const targetYOffset = yOffsetForHeadScreenY(navbarCenterY, viewport)
    expect(targetYOffset).toBeLessThan(0)
    expect(targetYOffset).toBeGreaterThan(-0.2)

    const sweepMs = f1MsUntilHeadReachesScreenY(navbarCenterY, viewport)
    expect(sweepMs).toBeGreaterThan(600)
    expect(sweepMs).toBeLessThan(900)

    expect(f1PageMsUntilNavbarGlow(navbarCenterY, viewport)).toBe(
      HERO_F1_ENTRY_MS + sweepMs
    )
  })

  it('decays slowly after F1 exits', () => {
    let visible = 0.85
    for (let t = 0; t < NAV_FLASH_DECAY_MS; t += 16) {
      visible = developNavFlashDecay(visible, 16)
    }
    expect(visible).toBeGreaterThan(0.1)
  })

  it('fades gently with plateau then ease-out', () => {
    const peak = 0.8
    const lead = 1000
    const plateau = 400

    expect(fadeNavFlashIntensity(peak, 200, lead, plateau)).toBe(peak)
    expect(fadeNavFlashIntensity(peak, 500, lead, plateau)).toBeGreaterThan(
      peak * 0.55
    )
    expect(fadeNavFlashIntensity(peak, lead, lead, plateau)).toBe(0)
    expect(easeOutCubic(0.5)).toBeLessThan(0.5)
  })

  it('estimates navbar pass duration from F1 rise speed', () => {
    const pxPerFrame = flashHeadScreenYPxPerFrame(-0.08, 900)
    const duration = flashNavbarPassDurationMs(44, 900, -0.08)
    expect(pxPerFrame).toBeGreaterThan(0)
    expect(duration).toBeCloseTo((44 / pxPerFrame) * (1000 / 60), 0)
  })

  it('throttles active flash-head dispatches but clears immediately', () => {
    const dispatchEvent = vi.spyOn(window, 'dispatchEvent')

    try {
      dispatchHeroFlashHead(0, 0, false)
      dispatchEvent.mockClear()

      for (let i = 0; i < FLASH_HEAD_DISPATCH_FRAME_INTERVAL * 3; i++) {
        dispatchHeroFlashHead(-1 + i * 0.01, 0.8, true)
      }

      expect(dispatchEvent).toHaveBeenCalledTimes(3)

      dispatchEvent.mockClear()
      dispatchHeroFlashHead(0, 0, false)
      expect(dispatchEvent).toHaveBeenCalledTimes(1)
    } finally {
      dispatchEvent.mockRestore()
      dispatchHeroFlashHead(0, 0, false)
    }
  })
})
