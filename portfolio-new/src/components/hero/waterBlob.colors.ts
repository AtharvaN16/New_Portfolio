/**
 * Color Palettes and Color Management for WaterBlob
 *
 * Defines color palettes for interactive mode and provides utilities
 * for extracting colors from design tokens.
 */

import type { Colors } from './waterBlob.types'

/**
 * Light mode color palettes for interactive mode
 * Same hues as dark mode, slightly deeper/more saturated for light backgrounds
 */
export const LIGHT_PALETTES = [
  // Indigo / Lavender / Rose (original)
  [
    [57 / 255, 71 / 255, 202 / 255],
    [138 / 255, 106 / 255, 234 / 255],
    [255 / 255, 103 / 255, 140 / 255],
  ],
  // Orange / Purple / Cyan
  [
    [230 / 255, 120 / 255, 40 / 255],
    [150 / 255, 65 / 255, 220 / 255],
    [20 / 255, 180 / 255, 210 / 255],
  ],
  // Gold / Coral / Burgundy
  [
    [200 / 255, 150 / 255, 20 / 255],
    [235 / 255, 110 / 255, 65 / 255],
    [128 / 255, 0 / 255, 32 / 255],
  ],
  // Peach / Terracotta / Plum
  [
    [240 / 255, 175 / 255, 140 / 255],
    [190 / 255, 95 / 255, 60 / 255],
    [130 / 255, 60 / 255, 100 / 255],
  ],
  // Deep Teal / Sage Green / Sand
  [
    [0 / 255, 120 / 255, 115 / 255],
    [120 / 255, 165 / 255, 110 / 255],
    [175 / 255, 145 / 255, 75 / 255],
  ],
  // Navy / Cerulean / Sky Blue
  [
    [15 / 255, 35 / 255, 95 / 255],
    [0 / 255, 110 / 255, 175 / 255],
    [110 / 255, 190 / 255, 225 / 255],
  ],
  // Grape / Violet / Lavender
  [
    [70 / 255, 15 / 255, 110 / 255],
    [125 / 255, 35 / 255, 210 / 255],
    [185 / 255, 148 / 255, 240 / 255],
  ],
  // Ocean Blue / Coral / Sun Yellow
  [
    [0 / 255, 90 / 255, 165 / 255],
    [240 / 255, 115 / 255, 65 / 255],
    [240 / 255, 195 / 255, 35 / 255],
  ],
  // Ice Blue / Mint / Lilac
  [
    [130 / 255, 180 / 255, 215 / 255],
    [100 / 255, 185 / 255, 150 / 255],
    [165 / 255, 115 / 255, 215 / 255],
  ],
]

/**
 * Dark mode color palettes for interactive mode
 * Brighter/lighter values to pop against dark backgrounds
 */
export const DARK_PALETTES = [
  // Indigo / Light Purple / Pink (original)
  [
    [99 / 255, 102 / 255, 241 / 255],
    [167 / 255, 139 / 255, 250 / 255],
    [236 / 255, 72 / 255, 153 / 255],
  ],
  // Orange / Purple / Cyan
  [
    [251 / 255, 146 / 255, 60 / 255],
    [168 / 255, 85 / 255, 247 / 255],
    [34 / 255, 211 / 255, 238 / 255],
  ],
  // Gold / Coral / Burgundy
  [
    [255 / 255, 200 / 255, 50 / 255],
    [255 / 255, 140 / 255, 100 / 255],
    [180 / 255, 40 / 255, 60 / 255],
  ],
  // Peach / Terracotta / Plum
  [
    [255 / 255, 200 / 255, 170 / 255],
    [220 / 255, 120 / 255, 85 / 255],
    [170 / 255, 90 / 255, 140 / 255],
  ],
  // Deep Teal / Sage Green / Sand
  [
    [30 / 255, 180 / 255, 170 / 255],
    [150 / 255, 200 / 255, 140 / 255],
    [195 / 255, 165 / 255, 90 / 255],
  ],
  // Navy / Cerulean / Sky Blue
  [
    [40 / 255, 60 / 255, 140 / 255],
    [50 / 255, 150 / 255, 220 / 255],
    [150 / 255, 210 / 255, 255 / 255],
  ],
  // Grape / Violet / Lavender
  [
    [110 / 255, 40 / 255, 160 / 255],
    [160 / 255, 70 / 255, 255 / 255],
    [210 / 255, 175 / 255, 255 / 255],
  ],
  // Ocean Blue / Coral / Sun Yellow
  [
    [30 / 255, 130 / 255, 220 / 255],
    [255 / 255, 140 / 255, 100 / 255],
    [255 / 255, 225 / 255, 80 / 255],
  ],
  // Ice Blue / Mint / Lilac
  [
    [120 / 255, 185 / 255, 255 / 255],
    [80 / 255, 210 / 255, 165 / 255],
    [210 / 255, 140 / 255, 255 / 255],
  ],
]

/**
 * Get colors from design tokens or custom palettes
 */
export function getColors(
  theme: string,
  interactive: boolean,
  paletteIndex: number
): Colors | null {
  if (typeof window === 'undefined') return null

  const root = document.documentElement
  const getColor = (variable: string) => {
    const value = getComputedStyle(root).getPropertyValue(variable).trim()
    return value.split(' ').map((v) => parseInt(v) / 255) as [
      number,
      number,
      number,
    ]
  }

  if (interactive) {
    const palettes = theme === 'dark' ? DARK_PALETTES : LIGHT_PALETTES
    const palette = palettes[paletteIndex]
    return {
      blue: palette[0] as [number, number, number],
      purple: palette[1] as [number, number, number],
      pink: palette[2] as [number, number, number],
      background: getColor('--color-background'),
    }
  }

  return {
    blue: getColor('--hero-blob-blue'),
    purple: getColor('--hero-blob-purple'),
    pink: getColor('--hero-blob-pink'),
    background: getColor('--color-background'),
  }
}

/**
 * Handle palette cycling for interactive mode
 * Returns a random palette index that's different from the last one
 */
export function getNextPaletteIndex(
  currentIndex: number,
  lastIndex: number,
  paletteCount: number
): number {
  if (paletteCount <= 1) return currentIndex

  let nextIndex = Math.floor(Math.random() * paletteCount)
  while (nextIndex === lastIndex) {
    nextIndex = Math.floor(Math.random() * paletteCount)
  }
  return nextIndex
}
