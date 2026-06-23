type Rgb = readonly [number, number, number]
export type PalettePair = readonly [Rgb, Rgb]

export interface HeroPalette {
  id: string
  name: string
  /** Visit probability percent. All entries should sum to 100. */
  weight: number
  /** Used by the WebGL blob and dark-theme CSS gradient vars. */
  dark: PalettePair
  /** Used by light-theme CSS gradient vars. */
  light: PalettePair
  /** Optional underline color override when palette start needs better contrast. */
  scribble?: {
    dark: Rgb
    light: Rgb
  }
}

const EXPLICIT_WEIGHTS = {
  orangeCyan: 40,
  goldBurgundy: 10,
  salmonLavender: 27,
  navySky: 2,
  oceanYellow: 3,
  indigoCoralRed: 8,
} as const

/** Gray / Cherry Red, Soft Green / Soft Pink, Ice Blue / Lilac share the remainder. */
const SHARED_PALETTE_WEIGHT =
  (100 -
    EXPLICIT_WEIGHTS.orangeCyan -
    EXPLICIT_WEIGHTS.goldBurgundy -
    EXPLICIT_WEIGHTS.salmonLavender -
    EXPLICIT_WEIGHTS.navySky -
    EXPLICIT_WEIGHTS.oceanYellow -
    EXPLICIT_WEIGHTS.indigoCoralRed) /
  3

/** Warm → cool cycle order (auto-advance uses index + 1). Blues run together. */
export const HERO_PALETTES: readonly HeroPalette[] = [
  {
    id: 'orange-cyan',
    name: 'Orange / Cyan',
    weight: EXPLICIT_WEIGHTS.orangeCyan,
    light: [
      [200, 95, 25],
      [15, 145, 175],
    ],
    dark: [
      [251, 146, 60],
      [34, 211, 238],
    ],
  },
  {
    id: 'gold-burgundy',
    name: 'Gold / Burgundy',
    weight: EXPLICIT_WEIGHTS.goldBurgundy,
    light: [
      [170, 120, 15],
      [110, 0, 25],
    ],
    dark: [
      [255, 200, 50],
      [180, 40, 60],
    ],
  },
  {
    id: 'salmon-lavender',
    name: 'Salmon / Lavender',
    weight: EXPLICIT_WEIGHTS.salmonLavender,
    light: [
      [200, 95, 55],
      [100, 80, 185],
    ],
    dark: [
      [247, 134, 81],
      [149, 137, 251],
    ],
  },
  {
    id: 'gray-cherry-red',
    name: 'Gray / Cherry Red',
    weight: SHARED_PALETTE_WEIGHT,
    light: [
      [130, 130, 135],
      [185, 22, 48],
    ],
    dark: [
      [210, 210, 214],
      [232, 48, 72],
    ],
    scribble: {
      dark: [255, 95, 115],
      light: [155, 20, 45],
    },
  },
  {
    id: 'soft-green-soft-pink',
    name: 'Soft Green / Soft Pink',
    weight: SHARED_PALETTE_WEIGHT,
    light: [
      [95, 145, 75],
      [210, 65, 120],
    ],
    dark: [
      [188, 255, 167],
      [255, 130, 175],
    ],
    scribble: {
      dark: [188, 255, 167],
      light: [95, 145, 75],
    },
  },
  {
    id: 'ocean-yellow',
    name: 'Ocean / Yellow',
    weight: EXPLICIT_WEIGHTS.oceanYellow,
    light: [
      [0, 75, 140],
      [205, 160, 25],
    ],
    dark: [
      [30, 130, 220],
      [255, 225, 80],
    ],
  },
  {
    id: 'navy-sky',
    name: 'Navy / Sky',
    weight: EXPLICIT_WEIGHTS.navySky,
    light: [
      [12, 28, 80],
      [85, 150, 190],
    ],
    dark: [
      [40, 60, 140],
      [150, 210, 255],
    ],
    scribble: {
      dark: [128, 207, 255],
      light: [0, 65, 130],
    },
  },
  {
    id: 'ice-blue-lilac',
    name: 'Ice Blue / Lilac',
    weight: SHARED_PALETTE_WEIGHT,
    light: [
      [95, 130, 170],
      [135, 90, 180],
    ],
    dark: [
      [120, 185, 255],
      [210, 140, 255],
    ],
  },
  {
    id: 'indigo-coral-red',
    name: 'Indigo / Coral Red',
    weight: EXPLICIT_WEIGHTS.indigoCoralRed,
    light: [
      [42, 52, 165],
      [210, 55, 45],
    ],
    dark: [
      [99, 102, 241],
      [255, 110, 85],
    ],
    scribble: {
      dark: [106, 111, 255],
      light: [55, 60, 195],
    },
  },
] as const

export const HERO_PALETTE_COUNT = HERO_PALETTES.length

export const HERO_PALETTE_TOTAL_WEIGHT = HERO_PALETTES.reduce(
  (sum, palette) => sum + palette.weight,
  0
)

export function getHeroPalette(index: number): HeroPalette {
  return HERO_PALETTES[index % HERO_PALETTE_COUNT] ?? HERO_PALETTES[0]
}

export function getPalettePair(
  index: number,
  mode: 'dark' | 'light'
): PalettePair {
  return getHeroPalette(index)[mode]
}

export function toNormalizedRgb(rgb: Rgb): [number, number, number] {
  return rgb.map((channel) => channel / 255) as [number, number, number]
}

export function toRgbArray(rgb: Rgb): number[] {
  return [...rgb]
}
