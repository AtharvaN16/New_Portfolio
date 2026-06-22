import { describe, expect, it } from 'vitest'
import {
  HERO_BIO_DELAY_S,
  HERO_BROWSE_WORK_DELAY_MS,
  HERO_CTA_DELAY_MS,
  HERO_F1_CREST_MS,
  HERO_F2_ENTRY_MS,
  HERO_F2_TEXT_OFFSET_MS,
  HERO_NAV_GLOW_END_MS,
  HERO_NAV_GLOW_FADE_LEAD_MS,
  HERO_NAV_GLOW_FADE_START_MS,
  HERO_NAV_GLOW_FIRST_LIGHT_MS,
  HERO_NAV_GLOW_HOLD_MS,
  HERO_NAV_GLOW_TOTAL_MS,
  HERO_TEXT_DELAY_MS,
} from '@/components/hero/hero-entry-timing'

describe('hero entry timing', () => {
  it('starts bio reveal as F2 begins to settle', () => {
    expect(HERO_BIO_DELAY_S * 1000).toBe(HERO_TEXT_DELAY_MS)
    expect(HERO_TEXT_DELAY_MS).toBe(HERO_F2_ENTRY_MS + HERO_F2_TEXT_OFFSET_MS)
  })

  it('starts F2 before the bio animation finishes', () => {
    expect(HERO_F2_ENTRY_MS).toBeLessThan(HERO_F1_CREST_MS + 1000)
  })

  it('reveals browse work and bottom row after hero copy', () => {
    expect(HERO_BROWSE_WORK_DELAY_MS).toBe(HERO_CTA_DELAY_MS)
    expect(HERO_CTA_DELAY_MS).toBeGreaterThan(HERO_BIO_DELAY_S * 1000)
    // CTA appears within 1.5s of bio start (bio at 2.6s, CTA at 3.6s)
    expect(HERO_CTA_DELAY_MS).toBeLessThan(HERO_BIO_DELAY_S * 1000 + 1500)
  })

  it('fades nav glow over 2.2s from first F1 light', () => {
    expect(HERO_NAV_GLOW_FADE_START_MS).toBe(
      HERO_F2_ENTRY_MS + HERO_NAV_GLOW_HOLD_MS
    )
    expect(HERO_NAV_GLOW_FADE_START_MS).toBeGreaterThan(HERO_F1_CREST_MS)
    expect(HERO_NAV_GLOW_TOTAL_MS).toBe(2200)
    expect(HERO_NAV_GLOW_FADE_START_MS + HERO_NAV_GLOW_FADE_LEAD_MS).toBe(
      HERO_NAV_GLOW_END_MS
    )
    expect(HERO_NAV_GLOW_END_MS - HERO_NAV_GLOW_FIRST_LIGHT_MS).toBe(
      HERO_NAV_GLOW_TOTAL_MS
    )
  })
})
