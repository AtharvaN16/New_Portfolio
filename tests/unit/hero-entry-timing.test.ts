import { describe, expect, it } from 'vitest'
import {
  HERO_BIO_DELAY_S,
  HERO_BROWSE_WORK_DELAY_MS,
  HERO_CTA_DELAY_MS,
  HERO_F1_CREST_MS,
  HERO_F2_ENTRY_MS,
  HERO_NAV_GLOW_FADE_LEAD_MS,
  HERO_NAV_GLOW_FADE_START_MS,
  HERO_NAV_GLOW_HOLD_MS,
} from '@/components/hero/hero-entry-timing'

describe('hero entry timing', () => {
  it('starts bio reveal at the F1 crest', () => {
    expect(HERO_BIO_DELAY_S * 1000).toBe(HERO_F1_CREST_MS)
  })

  it('starts F2 before the bio animation finishes', () => {
    expect(HERO_F2_ENTRY_MS).toBeLessThan(HERO_F1_CREST_MS + 1000)
  })

  it('reveals browse work and bottom row when F2 blobs crest', () => {
    expect(HERO_BROWSE_WORK_DELAY_MS).toBe(HERO_CTA_DELAY_MS)
    expect(HERO_CTA_DELAY_MS).toBeLessThan(HERO_F2_ENTRY_MS + 2000)
  })

  it('starts nav glow fade after F1, finishes as bottom row enters', () => {
    expect(HERO_NAV_GLOW_FADE_START_MS).toBe(
      HERO_F2_ENTRY_MS + HERO_NAV_GLOW_HOLD_MS
    )
    expect(HERO_NAV_GLOW_FADE_START_MS).toBeGreaterThan(HERO_F1_CREST_MS)
    expect(HERO_NAV_GLOW_FADE_START_MS + HERO_NAV_GLOW_FADE_LEAD_MS).toBe(
      HERO_CTA_DELAY_MS
    )
  })
})
