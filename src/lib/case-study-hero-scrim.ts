/** How aggressively visibility maps to reveal effects (>1 completes earlier while scrolling). */
const VISIBILITY_REVEAL_GAIN = 1.2

/** Scale when the hero first enters — settles to 1 as it reveals. */
export const CASE_STUDY_HERO_SETTLE_SCALE_MAX = 1.1

/** Subtle upward offset (%) before the image settles into place. */
const SETTLE_TRANSLATE_Y_PERCENT = -1.25

/** Hold scale still for this fraction of reveal progress before settling begins. */
const SETTLE_REVEAL_DELAY = 0.08

function clamp01(value: number): number {
  return Math.min(Math.max(value, 0), 1)
}

function smoothstep(value: number): number {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

/** Decelerates into the final settled position (ease-in at the end). */
function easeInEnd(value: number): number {
  const t = clamp01(value)
  return 1 - Math.pow(1 - t, 2.75)
}

function heroRevealProgress(visibleRatio: number): number {
  return smoothstep(clamp01(visibleRatio) * VISIBILITY_REVEAL_GAIN)
}

function delayedSettleReveal(visibleRatio: number): number {
  const reveal = heroRevealProgress(visibleRatio)
  if (reveal <= SETTLE_REVEAL_DELAY) return 0
  return easeInEnd((reveal - SETTLE_REVEAL_DELAY) / (1 - SETTLE_REVEAL_DELAY))
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
