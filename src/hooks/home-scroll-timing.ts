/** Viewport coverage at which the full-page card has completed its entry. */
export const CARD_ENTRY_END_PROGRESS = 0.2

/** Viewport coverage at which the media scrim is fully transparent. */
export const CARD_SCRIM_REVEAL_COVERAGE = 0.9

export const HERO_FADE_END_PROGRESS = scrollProgressForCardCoverage(
  CARD_SCRIM_REVEAL_COVERAGE
)

export function scrollProgressForCardCoverage(coverage: number): number {
  return CARD_ENTRY_END_PROGRESS * coverage
}
