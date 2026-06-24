import { describe, expect, it } from 'vitest'
import {
  HERO_BIO_DELAY_S,
  HERO_BROWSE_WORK_DELAY_MS,
  HERO_CTA_DELAY_MS,
  HERO_CURRENTLY_DELAY_S,
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

  it('reveals Pratt/meta and CTAs at tuned desktop offsets', () => {
    expect(HERO_CURRENTLY_DELAY_S).toBe(2.9)
    expect(HERO_BROWSE_WORK_DELAY_MS).toBe(HERO_CTA_DELAY_MS)
    expect(HERO_CTA_DELAY_MS).toBe(3400)
    expect(HERO_CTA_DELAY_MS).toBeGreaterThan(HERO_CURRENTLY_DELAY_S * 1000)
  })

  it('fades nav glow from first F1 light within a tuned total window', () => {
    expect(HERO_NAV_GLOW_FADE_START_MS).toBe(
      HERO_F2_ENTRY_MS + HERO_NAV_GLOW_HOLD_MS
    )
    expect(HERO_NAV_GLOW_FADE_START_MS).toBeGreaterThan(HERO_F1_CREST_MS)
    expect(HERO_NAV_GLOW_TOTAL_MS).toBe(1400)
    expect(HERO_NAV_GLOW_FADE_START_MS + HERO_NAV_GLOW_FADE_LEAD_MS).toBe(
      HERO_NAV_GLOW_END_MS
    )
    expect(HERO_NAV_GLOW_END_MS - HERO_NAV_GLOW_FIRST_LIGHT_MS).toBe(
      HERO_NAV_GLOW_TOTAL_MS
    )
  })
})
