import { describe, expect, it } from 'vitest'
import {
  CARD_ENTRY_END_PROGRESS,
  CARD_SCRIM_REVEAL_COVERAGE,
  HERO_FADE_END_PROGRESS,
  scrollProgressForCardCoverage,
} from '@/hooks/home-scroll-timing'

describe('home scroll timing', () => {
  it('hides the hero by the time the card scrim is fully revealed', () => {
    expect(scrollProgressForCardCoverage(CARD_SCRIM_REVEAL_COVERAGE)).toBeCloseTo(
      HERO_FADE_END_PROGRESS
    )
  })

  it('keeps card entry coverage tied to the card entry progress range', () => {
    expect(scrollProgressForCardCoverage(1)).toBe(CARD_ENTRY_END_PROGRESS)
  })
})
