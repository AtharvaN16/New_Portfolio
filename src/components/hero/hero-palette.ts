/**
 * Hero palette catalog and weighted random selection on each visit.
 *
 * Edit `HERO_PALETTE_WEIGHTS` for explicit percents. Palettes 2, 3, 4, 6, 8, 9
 * share whatever remains to reach 100%.
 * Indices match DARK_PALETTES / LIGHT_PALETTES in waterBlob.colors.ts.
 */

export interface HeroPaletteEntry {
  index: number
  name: string
  /** Visit probability percent (all entries sum to 100). */
  weight: number
}

/** Palettes with fixed visit probability (%). */
const HERO_PALETTE_WEIGHTS: Record<number, number> = {
  0: 42,
  1: 18,
  5: 5,
  7: 25,
}

/** Auto-split remainder across these indices. */
const SHARED_WEIGHT_INDICES = [2, 3, 4, 6, 8, 9] as const

const PALETTE_NAMES: Record<number, string> = {
  0: 'Orange / Purple / Cyan',
  1: 'Gold / Coral / Burgundy',
  2: 'Peach / Terracotta / Plum',
  3: 'Ocean / Coral / Yellow',
  4: 'Teal / Sage / Sand',
  5: 'Navy / Cerulean / Sky',
  6: 'Ice Blue / Mint / Lilac',
  7: 'Salmon / Rose / Lavender',
  8: 'Indigo / Purple / Pink',
  9: 'Grape / Violet / Lavender',
}

const EXPLICIT_TOTAL = Object.values(HERO_PALETTE_WEIGHTS).reduce(
  (sum, weight) => sum + weight,
  0
)

const SHARED_PALETTE_WEIGHT =
  (100 - EXPLICIT_TOTAL) / SHARED_WEIGHT_INDICES.length

/** All hero color themes, warm → cool. */
export const HERO_PALETTE_CATALOG: readonly HeroPaletteEntry[] = Array.from(
  { length: 10 },
  (_, index) => ({
    index,
    name: PALETTE_NAMES[index] ?? `Palette ${index}`,
    weight: HERO_PALETTE_WEIGHTS[index] ?? SHARED_PALETTE_WEIGHT,
  })
)

export const HERO_PALETTE_COUNT = HERO_PALETTE_CATALOG.length

export const HERO_PALETTE_TOTAL_WEIGHT = HERO_PALETTE_CATALOG.reduce(
  (sum, entry) => sum + entry.weight,
  0
)

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
