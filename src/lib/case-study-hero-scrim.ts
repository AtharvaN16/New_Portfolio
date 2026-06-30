/** Settle runs over a longer scroll band — reaches full size at this visibility fraction. */
const SETTLE_COMPLETE_VISIBLE_RATIO = 0.92

/** How aggressively entry visibility maps to scrim reveal (>1 clears earlier). */
const VISIBILITY_REVEAL_GAIN = 1.2

/** Scale when the hero first enters — settles to 1 as it reveals. */
export const CASE_STUDY_HERO_SETTLE_SCALE_MAX = 1.1

/** Matches home water-blob cutout radius (globals.css .water-blob-container--cutout). */
export const CASE_STUDY_HERO_FRAME_RADIUS_PX = 14

/** Subtle blur (px) paired with entry/exit scrim. */
export const CASE_STUDY_HERO_REVEAL_BLUR_PX = 1.5

/**
 * While scrolling off, stay fully clear until visibility drops below this
 * fraction — then darken/blur only near the end of the pass.
 */
export const CASE_STUDY_HERO_EXIT_SCRIM_CLEAR_UNTIL = 0.2

/** Peak visibility required before late-exit scrim can engage. */
const EXIT_REVEALED_PEAK_MIN = 0.55

/**
 * Visible fraction before horizontal inset begins — hero stays full-bleed while
 * scrim/blur clear.
 */
export const CASE_STUDY_HERO_FRAME_INSET_START = 0.38

/** Visible fraction where inset reaches page gutter. */
export const CASE_STUDY_HERO_FRAME_INSET_END = 0.95

/**
 * Visible fraction before corner radius begins — inset transform stays square
 * so the width change reads clearly.
 */
export const CASE_STUDY_HERO_FRAME_RADIUS_START = 0.72

/** Visible fraction where radius reaches cutout size. */
export const CASE_STUDY_HERO_FRAME_RADIUS_END = 0.98

/** Gentler deceleration for frame motion (lower = softer, longer tail). */
const FRAME_EASE_POWER = 1.45

/** Subtle upward offset (%) before the image settles into place. */
const SETTLE_TRANSLATE_Y_PERCENT = -1.25

/**
 * Hold scale still for this fraction of settle reveal (0–1) before easing down.
 * Currently 0.22 — scale waits until ~22% of the settle curve, then eases over the rest.
 */
export const CASE_STUDY_HERO_SETTLE_DELAY = 0.22

const SETTLE_REVEAL_DELAY = CASE_STUDY_HERO_SETTLE_DELAY

/** Softer deceleration into final size (lower = gentler, longer-feeling settle). */
const SETTLE_EASE_POWER = 2.1

function clamp01(value: number): number {
  return Math.min(Math.max(value, 0), 1)
}

function smoothstep(value: number): number {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

/** Decelerates into the final settled position (ease-in at the end). */
function easeInEnd(value: number, power = SETTLE_EASE_POWER): number {
  const t = clamp01(value)
  return 1 - Math.pow(1 - t, power)
}

function heroEntryRevealProgress(visibleRatio: number): number {
  return smoothstep(clamp01(visibleRatio) * VISIBILITY_REVEAL_GAIN)
}

function heroSettleRevealProgress(visibleRatio: number): number {
  return smoothstep(clamp01(visibleRatio) / SETTLE_COMPLETE_VISIBLE_RATIO)
}

function delayedSettleReveal(visibleRatio: number): number {
  const reveal = heroSettleRevealProgress(visibleRatio)
  if (reveal <= SETTLE_REVEAL_DELAY) return 0
  return easeInEnd(
    (reveal - SETTLE_REVEAL_DELAY) / (1 - SETTLE_REVEAL_DELAY)
  )
}

/** One-way latch — settle progress never reverses while scrolling past. */
export function latchSettleVisibleRatio(current: number, peak: number): number {
  return Math.max(peak, clamp01(current))
}

/**
 * Fraction of the hero media currently visible inside the scroll container viewport.
 */
export function heroMediaVisibleRatio(
  mediaRect: Pick<DOMRect, 'top' | 'bottom' | 'height'>,
  containerRect: Pick<DOMRect, 'top' | 'bottom'>
): number {
  const mediaHeight = mediaRect.height
  if (mediaHeight <= 0) return 0

  const visibleTop = Math.max(mediaRect.top, containerRect.top)
  const visibleBottom = Math.min(mediaRect.bottom, containerRect.bottom)
  const visibleHeight = Math.max(0, visibleBottom - visibleTop)

  return clamp01(visibleHeight / mediaHeight)
}

/** Entry scrim — darkens before reveal, clears as the image scrolls into view. */
export function caseStudyHeroEntryScrimOpacity(visibleRatio: number): number {
  return 1 - heroEntryRevealProgress(visibleRatio)
}

/** Late-exit scrim — stays clear until the image is almost scrolled off. */
export function caseStudyHeroLateExitScrimOpacity(visibleRatio: number): number {
  const current = clamp01(visibleRatio)
  if (current >= CASE_STUDY_HERO_EXIT_SCRIM_CLEAR_UNTIL) return 0
  return smoothstep(1 - current / CASE_STUDY_HERO_EXIT_SCRIM_CLEAR_UNTIL)
}

/**
 * Combined scrim: entry darkening on scroll-in, long clear zone, late fade on scroll-off.
 */
export function caseStudyHeroScrimOpacity(
  visibleRatio: number,
  peakVisibleRatio: number
): number {
  const current = clamp01(visibleRatio)
  const peak = clamp01(peakVisibleRatio)
  const isExiting =
    peak - current > 0.02 && peak >= EXIT_REVEALED_PEAK_MIN

  if (isExiting) {
    return caseStudyHeroLateExitScrimOpacity(current)
  }

  return caseStudyHeroEntryScrimOpacity(current)
}

/** Blur paired with combined scrim opacity. */
export function caseStudyHeroRevealBlurPx(
  visibleRatio: number,
  peakVisibleRatio: number
): number {
  return (
    CASE_STUDY_HERO_REVEAL_BLUR_PX *
    caseStudyHeroScrimOpacity(visibleRatio, peakVisibleRatio)
  )
}

/** @deprecated Use caseStudyHeroLateExitScrimOpacity. */
export function caseStudyHeroExitScrimOpacity(
  visibleRatio: number,
  peakVisibleRatio: number
): number {
  return caseStudyHeroScrimOpacity(visibleRatio, peakVisibleRatio)
}

/** @deprecated Use caseStudyHeroRevealBlurPx. */
export function caseStudyHeroExitBlurPx(
  visibleRatio: number,
  peakVisibleRatio: number
): number {
  return caseStudyHeroRevealBlurPx(visibleRatio, peakVisibleRatio)
}

/** @deprecated Use caseStudyHeroLateExitScrimOpacity progress shape. */
export function caseStudyHeroExitEffectProgress(
  visibleRatio: number,
  peakVisibleRatio: number
): number {
  return caseStudyHeroScrimOpacity(visibleRatio, peakVisibleRatio)
}

/** Scroll-linked scale: subtle zoom-out with soft ease into final size. */
export function caseStudyHeroSettleScale(visibleRatio: number): number {
  const reveal = delayedSettleReveal(visibleRatio)
  return (
    CASE_STUDY_HERO_SETTLE_SCALE_MAX -
    (CASE_STUDY_HERO_SETTLE_SCALE_MAX - 1) * reveal
  )
}

/** Gentle downward settle in percent of element height. */
export function caseStudyHeroSettleTranslateYPercent(visibleRatio: number): number {
  const reveal = delayedSettleReveal(visibleRatio)
  return SETTLE_TRANSLATE_Y_PERCENT * (1 - reveal)
}

function rangeReveal(
  visibleRatio: number,
  start: number,
  end: number,
  easePower = FRAME_EASE_POWER
): number {
  const span = end - start
  if (span <= 0) return clamp01(visibleRatio) >= end ? 1 : 0

  const t = clamp01((clamp01(visibleRatio) - start) / span)
  if (t <= 0) return 0
  return easeInEnd(t, easePower)
}

/** 0–1 progress for horizontal inset — latch at use site. */
export function caseStudyHeroFrameInsetReveal(visibleRatio: number): number {
  return rangeReveal(
    visibleRatio,
    CASE_STUDY_HERO_FRAME_INSET_START,
    CASE_STUDY_HERO_FRAME_INSET_END
  )
}

/** 0–1 progress for corner radius — delayed after inset; latch at use site. */
export function caseStudyHeroFrameRadiusReveal(visibleRatio: number): number {
  return rangeReveal(
    visibleRatio,
    CASE_STUDY_HERO_FRAME_RADIUS_START,
    CASE_STUDY_HERO_FRAME_RADIUS_END
  )
}

/** One-way latch — reveal progress never reverses until scroll reset. */
export function latchHeroRevealProgress(current: number, peak: number): number {
  return Math.max(peak, clamp01(current))
}

/** @deprecated Use latchHeroRevealProgress. */
export function latchFrameRadiusReveal(current: number, peak: number): number {
  return latchHeroRevealProgress(current, peak)
}

/** Horizontal inset (px) from latched inset reveal progress. */
export function caseStudyHeroFrameInsetPxFromReveal(
  insetReveal: number,
  maxInsetPx: number
): number {
  return maxInsetPx * clamp01(insetReveal)
}

/** Horizontal inset (px) from full-bleed toward page gutter. */
export function caseStudyHeroFrameInsetPx(
  visibleRatio: number,
  maxInsetPx: number
): number {
  return caseStudyHeroFrameInsetPxFromReveal(
    caseStudyHeroFrameInsetReveal(visibleRatio),
    maxInsetPx
  )
}

/** Corner radius (px) from square toward cutout radius. */
export function caseStudyHeroFrameRadiusPx(radiusReveal: number): number {
  return CASE_STUDY_HERO_FRAME_RADIUS_PX * clamp01(radiusReveal)
}

/** @deprecated Use inset or radius reveal. */
export function caseStudyHeroFrameReveal(visibleRatio: number): number {
  return caseStudyHeroFrameInsetReveal(visibleRatio)
}

/** Scroll container scrollTop at or below this resets latched hero reveal state. */
export const CASE_STUDY_HERO_REVEAL_RESET_SCROLL_TOP_PX = 8

/** True when the user has scrolled back to the top and can replay the reveal. */
export function shouldResetCaseStudyHeroReveal(scrollTop: number): boolean {
  return scrollTop <= CASE_STUDY_HERO_REVEAL_RESET_SCROLL_TOP_PX
}

export const CASE_STUDY_HERO_SCRIM_COLOR = 'rgb(var(--color-background))'
