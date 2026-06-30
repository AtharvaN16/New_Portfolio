import { describe, expect, it } from 'vitest'
import {
  CASE_STUDY_HERO_EXIT_SCRIM_CLEAR_UNTIL,
  CASE_STUDY_HERO_FRAME_RADIUS_PX,
  CASE_STUDY_HERO_REVEAL_BLUR_PX,
  CASE_STUDY_HERO_SETTLE_SCALE_MAX,
  caseStudyHeroEntryScrimOpacity,
  caseStudyHeroFrameInsetPx,
  caseStudyHeroFrameInsetReveal,
  caseStudyHeroFrameRadiusPx,
  caseStudyHeroFrameRadiusReveal,
  caseStudyHeroFrameReveal,
  caseStudyHeroLateExitScrimOpacity,
  caseStudyHeroRevealBlurPx,
  caseStudyHeroScrimOpacity,
  caseStudyHeroSettleScale,
  caseStudyHeroSettleTranslateYPercent,
  heroMediaVisibleRatio,
  latchFrameRadiusReveal,
  latchHeroRevealProgress,
  latchSettleVisibleRatio,
  shouldResetCaseStudyHeroReveal,
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

describe('caseStudyHeroEntryScrimOpacity', () => {
  it('is fully covered when nothing is visible', () => {
    expect(caseStudyHeroEntryScrimOpacity(0)).toBe(1)
  })

  it('decreases monotonically as more of the image is visible', () => {
    const values = [0.1, 0.25, 0.5, 0.75, 0.9].map(caseStudyHeroEntryScrimOpacity)
    for (let i = 1; i < values.length; i += 1) {
      expect(values[i]).toBeLessThan(values[i - 1]!)
    }
  })

  it('is fully clear when the image is completely visible', () => {
    expect(caseStudyHeroEntryScrimOpacity(1)).toBe(0)
  })
})

describe('caseStudyHeroLateExitScrimOpacity', () => {
  it('stays clear until the image is almost scrolled off', () => {
    expect(caseStudyHeroLateExitScrimOpacity(1)).toBe(0)
    expect(caseStudyHeroLateExitScrimOpacity(0.5)).toBe(0)
    expect(caseStudyHeroLateExitScrimOpacity(CASE_STUDY_HERO_EXIT_SCRIM_CLEAR_UNTIL)).toBe(0)
  })

  it('ramps in only below the clear-until threshold', () => {
    const belowThreshold = caseStudyHeroLateExitScrimOpacity(0.05)
    expect(belowThreshold).toBeGreaterThan(0)
    expect(caseStudyHeroLateExitScrimOpacity(0)).toBe(1)
  })
})

describe('caseStudyHeroScrimOpacity', () => {
  it('uses entry scrim while the image is revealing', () => {
    expect(caseStudyHeroScrimOpacity(0.2, 0.2)).toBe(
      caseStudyHeroEntryScrimOpacity(0.2)
    )
  })

  it('stays clear through most of scroll-off', () => {
    expect(caseStudyHeroScrimOpacity(0.5, 1)).toBe(0)
    expect(caseStudyHeroScrimOpacity(0.25, 1)).toBe(0)
  })

  it('darkens only when almost completely scrolled off', () => {
    expect(caseStudyHeroScrimOpacity(0.08, 1)).toBeGreaterThan(0)
    expect(caseStudyHeroScrimOpacity(0, 1)).toBe(1)
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
    const values = [0.35, 0.5, 0.65, 0.8, 0.95].map(caseStudyHeroSettleScale)
    for (let i = 1; i < values.length; i += 1) {
      expect(values[i]).toBeLessThan(values[i - 1]!)
    }
  })

  it('lags behind entry scrim at the start of reveal', () => {
    const earlyVisibility = 0.2
    expect(caseStudyHeroEntryScrimOpacity(earlyVisibility)).toBeLessThan(1)
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

describe('caseStudyHeroFrameReveal', () => {
  it('starts at 0 and finishes at 1', () => {
    expect(caseStudyHeroFrameReveal(0)).toBe(0)
    expect(caseStudyHeroFrameReveal(1)).toBe(1)
  })

  it('holds full bleed until inset start threshold', () => {
    expect(caseStudyHeroFrameReveal(0.25)).toBe(0)
  })
})

describe('caseStudyHeroFrameInsetPx', () => {
  it('interpolates from full bleed to page gutter', () => {
    expect(caseStudyHeroFrameInsetPx(0, 24)).toBe(0)
    expect(caseStudyHeroFrameInsetPx(0.25, 24)).toBe(0)
    expect(caseStudyHeroFrameInsetPx(1, 24)).toBe(24)
    expect(caseStudyHeroFrameInsetPx(1, 140)).toBe(140)
  })
})

describe('caseStudyHeroFrameRadiusPx', () => {
  it('interpolates from square to cutout radius', () => {
    expect(caseStudyHeroFrameRadiusPx(0)).toBe(0)
    expect(caseStudyHeroFrameRadiusPx(1)).toBe(CASE_STUDY_HERO_FRAME_RADIUS_PX)
  })

  it('radius reveal lags behind inset during scroll', () => {
    const midVisibility = 0.55
    expect(caseStudyHeroFrameInsetReveal(midVisibility)).toBeGreaterThan(0)
    expect(caseStudyHeroFrameRadiusReveal(midVisibility)).toBe(0)
  })
})

describe('latchFrameRadiusReveal', () => {
  it('never decreases once corners have rounded further', () => {
    expect(latchFrameRadiusReveal(0.9, 0.3)).toBe(0.9)
    expect(latchFrameRadiusReveal(0.2, 0.9)).toBe(0.9)
  })
})

describe('latchHeroRevealProgress', () => {
  it('matches frame radius latch behavior', () => {
    expect(latchHeroRevealProgress(0.6, 0.2)).toBe(0.6)
    expect(latchHeroRevealProgress(0.1, 0.6)).toBe(0.6)
  })
})

describe('shouldResetCaseStudyHeroReveal', () => {
  it('resets at the top of the scroll container', () => {
    expect(shouldResetCaseStudyHeroReveal(0)).toBe(true)
    expect(shouldResetCaseStudyHeroReveal(8)).toBe(true)
    expect(shouldResetCaseStudyHeroReveal(9)).toBe(false)
  })
})

describe('caseStudyHeroRevealBlurPx', () => {
  it('follows entry scrim on reveal', () => {
    expect(caseStudyHeroRevealBlurPx(0, 0)).toBe(CASE_STUDY_HERO_REVEAL_BLUR_PX)
    expect(caseStudyHeroRevealBlurPx(1, 1)).toBe(0)
  })

  it('stays clear through most of scroll-off', () => {
    expect(caseStudyHeroRevealBlurPx(0.4, 1)).toBe(0)
  })

  it('ramps in when almost completely scrolled off', () => {
    expect(caseStudyHeroRevealBlurPx(0, 1)).toBe(CASE_STUDY_HERO_REVEAL_BLUR_PX)
  })
})
