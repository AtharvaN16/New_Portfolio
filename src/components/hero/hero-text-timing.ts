/** Max wait for hero body fonts before splitting (avoids Safari blocking on unrelated fonts). */
export const HERO_FONT_READY_TIMEOUT_MS = 200

/**
 * Remaining GSAP delay so reveal starts at `targetDelayS` from `originMs`,
 * even if font loading / GSAP import took longer (common in Safari).
 */
export function getRemainingRevealDelayS(
  targetDelayS: number,
  originMs: number,
  nowMs = performance.now()
): number {
  const elapsedS = (nowMs - originMs) / 1000
  return Math.max(0, targetDelayS - elapsedS)
}

/**
 * Wait only for fonts used by the hero copy — not `document.fonts.ready`,
 * which also blocks on Material Symbols and other late page fonts in Safari.
 */
export async function waitForHeroElementFonts(
  element: HTMLElement,
  timeoutMs = HERO_FONT_READY_TIMEOUT_MS
): Promise<void> {
  if (typeof document === 'undefined' || !document.fonts?.load) return

  const style = getComputedStyle(element)
  const { fontStyle, fontWeight, fontSize, fontFamily } = style
  const base = `${fontStyle} ${fontWeight} ${fontSize} ${fontFamily}`
  const bold = `${fontStyle} 700 ${fontSize} ${fontFamily}`

  await Promise.race([
    Promise.all([
      document.fonts.load(base),
      document.fonts.load(bold),
    ]).then(() => undefined),
    new Promise<void>((resolve) => setTimeout(resolve, timeoutMs)),
  ])
}
