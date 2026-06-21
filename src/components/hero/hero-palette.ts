/**
 * Hero palette catalog and weighted random selection on each visit.
 *
 * Palette definitions, colors, and weights live in `waterBlob.palettes.ts`.
 * This module only exposes the picker API used by `Hero`.
 */

import {
  HERO_PALETTE_COUNT,
  HERO_PALETTE_TOTAL_WEIGHT,
  HERO_PALETTES,
} from './waterBlob.palettes'

/** All hero color themes, warm → cool. */
export const HERO_PALETTE_CATALOG = HERO_PALETTES.map((entry, index) => ({
  index,
  name: entry.name,
  weight: entry.weight,
}))

export { HERO_PALETTE_COUNT, HERO_PALETTE_TOTAL_WEIGHT }

export function pickInitialHeroPaletteIndex(
  random: () => number = Math.random
): number {
  const totalWeight = HERO_PALETTE_TOTAL_WEIGHT

  if (totalWeight <= 0) return 0

  let roll = random() * totalWeight

  for (const entry of HERO_PALETTE_CATALOG) {
    roll -= entry.weight
    if (roll <= 0) return entry.index
  }

  return HERO_PALETTE_CATALOG[HERO_PALETTE_CATALOG.length - 1]?.index ?? 0
}
