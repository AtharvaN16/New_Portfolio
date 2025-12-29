/**
 * Color Palettes and Color Management for WaterBlob
 *
 * Defines color palettes for interactive mode and provides utilities
 * for extracting colors from design tokens.
 */

import type { Colors } from './waterBlob.types'

/**
 * Light mode color palettes for interactive mode
 * Each palette contains [blue, purple, pink] RGB values normalized to 0-1
 */
export const LIGHT_PALETTES = [
  [
    [57 / 255, 71 / 255, 202 / 255],
    [138 / 255, 106 / 255, 234 / 255],
    [255 / 255, 103 / 255, 140 / 255],
  ], // Default
  [
    [236 / 255, 72 / 255, 153 / 255],
    [251 / 255, 146 / 255, 60 / 255],
    [59 / 255, 130 / 255, 246 / 255],
  ],
  [
    [34 / 255, 197 / 255, 94 / 255],
    [59 / 255, 130 / 255, 246 / 255],
    [168 / 255, 85 / 255, 247 / 255],
  ],
  [
    [249 / 255, 115 / 255, 22 / 255],
    [220 / 255, 38 / 255, 127 / 255],
    [147 / 255, 51 / 255, 234 / 255],
  ],
]

/**
 * Dark mode color palettes for interactive mode
 * Each palette contains [blue, purple, pink] RGB values normalized to 0-1
 */
export const DARK_PALETTES = [
  [
    [99 / 255, 102 / 255, 241 / 255],
    [167 / 255, 139 / 255, 250 / 255],
    [236 / 255, 72 / 255, 153 / 255],
  ], // Default
  [
    [251 / 255, 146 / 255, 60 / 255],
    [168 / 255, 85 / 255, 247 / 255],
    [34 / 255, 211 / 255, 238 / 255],
  ],
  [
    [74 / 255, 222 / 255, 128 / 255],
    [59 / 255, 130 / 255, 246 / 255],
    [196 / 255, 181 / 255, 253 / 255],
  ],
  [
    [248 / 255, 113 / 255, 113 / 255],
    [96 / 255, 165 / 255, 250 / 255],
    [45 / 255, 212 / 255, 191 / 255],
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
