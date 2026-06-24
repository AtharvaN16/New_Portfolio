import { describe, expect, it } from 'vitest'
import {
  CASE_STUDY_HERO_SETTLE_SCALE_MAX,
  caseStudyHeroScrimOpacity,
  caseStudyHeroSettleScale,
  caseStudyHeroSettleTranslateYPercent,
  heroMediaVisibleRatio,
  latchSettleVisibleRatio,
} from '@/lib/case-study-hero-scrim'

function rect(
  top: number,
  height: number
): Pick<DOMRect, 'top' | 'bottom' | 'height'> {
  return { top, bottom: top + height, height }
}

describe('heroMediaVisibleRatio', () => {
  const container = rect(0, 800)

  it('is 0 when media is below the viewport', () => {
    expect(heroMediaVisibleRatio(rect(900, 800), container)).toBe(0)
  })

  it('is 0 when media is above the viewport', () => {
    expect(heroMediaVisibleRatio(rect(-900, 800), container)).toBe(0)
  })

  it('is 1 when media is fully inside the viewport', () => {
    expect(heroMediaVisibleRatio(rect(100, 600), container)).toBe(1)
  })

  it('tracks partial visibility while scrolling through', () => {
    expect(heroMediaVisibleRatio(rect(400, 800), container)).toBeCloseTo(0.5)
  })
})

describe('caseStudyHeroScrimOpacity', () => {
  it('is fully covered when nothing is visible', () => {
    expect(caseStudyHeroScrimOpacity(0)).toBe(1)
  })

  it('decreases monotonically as more of the image is visible', () => {
    const values = [0.1, 0.25, 0.5, 0.75, 0.9].map(caseStudyHeroScrimOpacity)
    for (let i = 1; i < values.length; i += 1) {
      expect(values[i]).toBeLessThan(values[i - 1]!)
    }
  })

  it('is fully clear when the image is completely visible', () => {
    expect(caseStudyHeroScrimOpacity(1)).toBe(0)
  })

  it('does not snap to full brightness at a single scroll point', () => {
    const quarter = caseStudyHeroScrimOpacity(0.25)
    const half = caseStudyHeroScrimOpacity(0.5)
    const threeQuarter = caseStudyHeroScrimOpacity(0.75)

    expect(quarter).toBeGreaterThan(half)
    expect(half).toBeGreaterThan(threeQuarter)
    expect(half).toBeGreaterThan(0.1)
    expect(half).toBeLessThan(0.9)
  })
})

describe('caseStudyHeroSettleScale', () => {
  it('starts slightly enlarged before reveal', () => {
    expect(caseStudyHeroSettleScale(0)).toBe(CASE_STUDY_HERO_SETTLE_SCALE_MAX)
  })

  it('settles to natural scale when fully visible', () => {
    expect(caseStudyHeroSettleScale(1)).toBe(1)
  })

  it('eases down monotonically while revealing', () => {
    const values = [0.1, 0.25, 0.5, 0.75, 0.9].map(caseStudyHeroSettleScale)
    for (let i = 1; i < values.length; i += 1) {
      expect(values[i]).toBeLessThan(values[i - 1]!)
    }
  })

  it('lags slightly behind the scrim at the start of reveal', () => {
    const earlyVisibility = 0.12
    expect(caseStudyHeroScrimOpacity(earlyVisibility)).toBeLessThan(1)
    expect(caseStudyHeroSettleScale(earlyVisibility)).toBe(
      CASE_STUDY_HERO_SETTLE_SCALE_MAX
    )
  })
})

describe('caseStudyHeroSettleTranslateYPercent', () => {
  it('starts slightly raised and settles to neutral', () => {
    expect(caseStudyHeroSettleTranslateYPercent(0)).toBeLessThan(0)
    expect(caseStudyHeroSettleTranslateYPercent(1)).toBeCloseTo(0)
  })
})

describe('latchSettleVisibleRatio', () => {
  it('never decreases once the hero has revealed further', () => {
    expect(latchSettleVisibleRatio(0.8, 0.3)).toBe(0.8)
    expect(latchSettleVisibleRatio(0.2, 0.8)).toBe(0.8)
  })
})
