/** How aggressively visibility maps to scrim reveal (>1 finishes earlier while scrolling). */
const VISIBILITY_REVEAL_GAIN = 1.2

/** Settle runs over a longer scroll band — reaches full size at this visibility fraction. */
const SETTLE_COMPLETE_VISIBLE_RATIO = 0.92

/** Scale when the hero first enters — settles to 1 as it reveals. */
export const CASE_STUDY_HERO_SETTLE_SCALE_MAX = 1.1

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

function heroRevealProgress(visibleRatio: number): number {
  return smoothstep(clamp01(visibleRatio) * VISIBILITY_REVEAL_GAIN)
}

/** Slower input curve than scrim — settle needs more scroll to complete. */
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

/**
 * Scroll-linked scrim: more of the image visible → lower scrim, no center spike.
 */
export function caseStudyHeroScrimOpacity(visibleRatio: number): number {
  return 1 - heroRevealProgress(visibleRatio)
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

export const CASE_STUDY_HERO_SCRIM_COLOR = 'rgb(var(--color-background))'
