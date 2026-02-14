/**
 * Color Palettes and Color Management for WaterBlob
 *
 * Defines color palettes for interactive mode and provides utilities
 * for extracting colors from design tokens.
 */

import type { Colors } from './waterBlob.types'

/**
 * Light mode color palettes for interactive mode
 * 
 * Design Strategy for Light Backgrounds:
 * - DARKER cores (40-55% lightness) for visibility
 * - HIGHER saturation (80-95%) to compensate for lower luminance contrast
 * - Pigment/ink metaphor: think watercolor stains, not neon glows
 * - Colors should feel rich and vibrant, not washed out
 */
export const LIGHT_PALETTES = [
  // Indigo / Deep Purple / Rich Rose (original, adjusted for light mode)
  [
    [42 / 255, 52 / 255, 165 / 255],      // Deeper indigo (was 57,71,202)
    [110 / 255, 75 / 255, 195 / 255],     // Richer purple (was 138,106,234)
    [220 / 255, 65 / 255, 105 / 255],     // Deeper rose (was 255,103,140)
  ],
  // Orange / Purple / Cyan - now more saturated
  [
    [200 / 255, 95 / 255, 25 / 255],      // Darker orange
    [125 / 255, 50 / 255, 185 / 255],     // Deeper purple
    [15 / 255, 145 / 255, 175 / 255],     // Richer cyan
  ],
  // Gold / Coral / Burgundy - enhanced depth
  [
    [170 / 255, 120 / 255, 15 / 255],     // Deeper gold
    [205 / 255, 85 / 255, 50 / 255],      // Richer coral
    [110 / 255, 0 / 255, 25 / 255],       // Darker burgundy
  ],
  // Terracotta / Rust / Plum - earthy richness
  [
    [190 / 255, 110 / 255, 70 / 255],     // Richer terracotta
    [165 / 255, 70 / 255, 45 / 255],      // Deeper rust
    [115 / 255, 48 / 255, 85 / 255],      // Darker plum
  ],
  // Deep Teal / Forest Green / Amber - natural pigments
  [
    [0 / 255, 100 / 255, 95 / 255],       // Darker teal
    [95 / 255, 135 / 255, 85 / 255],      // Deeper sage
    [150 / 255, 120 / 255, 60 / 255],     // Richer amber
  ],
  // Navy / Ocean Blue / Azure - deep water tones
  [
    [12 / 255, 28 / 255, 80 / 255],       // Darker navy
    [0 / 255, 90 / 255, 145 / 255],       // Richer ocean
    [85 / 255, 150 / 255, 190 / 255],     // Deeper azure (but not too light)
  ],
  // Grape / Violet / Lavender - royal purples
  [
    [58 / 255, 12 / 255, 95 / 255],       // Darker grape
    [105 / 255, 28 / 255, 175 / 255],     // Richer violet
    [145 / 255, 110 / 255, 200 / 255],    // Deeper lavender (less washed out)
  ],
  // Ocean / Coral / Sunset - vibrant natural tones
  [
    [0 / 255, 75 / 255, 140 / 255],       // Darker ocean
    [210 / 255, 90 / 255, 50 / 255],      // Richer coral
    [205 / 255, 160 / 255, 25 / 255],     // Deeper sunset gold
  ],
  // Slate Blue / Seafoam / Iris - muted elegance
  [
    [95 / 255, 130 / 255, 170 / 255],     // Deeper slate (was too light)
    [70 / 255, 145 / 255, 115 / 255],     // Richer seafoam
    [135 / 255, 90 / 255, 180 / 255],     // Deeper iris
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

/** Scribble colors: palette 0 (first load), 5 and 6. Dark = accessible light; light = accessible dark. */
const SCRIBBLE_PALETTE_0_DARK = [106, 111, 255] as const  // #6A6FFF
const SCRIBBLE_PALETTE_0_LIGHT = [55, 60, 195] as const  // Darker indigo variant on white
const SCRIBBLE_PALETTE_5_DARK = [128, 207, 255] as const // #80CFFF azure
const SCRIBBLE_PALETTE_6_DARK = [212, 167, 255] as const // #D4A7FF lavender
const SCRIBBLE_PALETTE_5_LIGHT = [0, 65, 130] as const   // Accessible darker blue on white
const SCRIBBLE_PALETTE_6_LIGHT = [72, 28, 120] as const // Accessible darker violet on white

/**
 * Get scribble color for hero underline. Palettes 0, 5 and 6 use custom scribble colors;
 * others use gradient-start. Returns RGB in 0–255.
 */
export function getScribbleColor(
  paletteIndex: number,
  isDark: boolean
): number[] {
  if (paletteIndex === 0) {
    return isDark ? [...SCRIBBLE_PALETTE_0_DARK] : [...SCRIBBLE_PALETTE_0_LIGHT]
  }
  if (paletteIndex === 5) {
    return isDark ? [...SCRIBBLE_PALETTE_5_DARK] : [...SCRIBBLE_PALETTE_5_LIGHT]
  }
  if (paletteIndex === 6) {
    return isDark ? [...SCRIBBLE_PALETTE_6_DARK] : [...SCRIBBLE_PALETTE_6_LIGHT]
  }
  // Other palettes: use gradient-start (caller passes palette[0] * 255)
  return []
}

/**
 * Get colors from design tokens or custom palettes
 * Validates that CSS variables are properly loaded before returning values
 */
export function getColors(
  theme: string,
  interactive: boolean,
  paletteIndex: number
): Colors | null {
  if (typeof window === 'undefined') return null

  const root = document.documentElement
  const getColor = (variable: string): [number, number, number] | null => {
    const value = getComputedStyle(root).getPropertyValue(variable).trim()
    
    // Validate that the CSS variable exists and has a value
    if (!value) {
      console.warn(`WaterBlob: CSS variable ${variable} is empty or not found`)
      return null
    }

    const parts = value.split(' ').map((v) => {
      const parsed = parseInt(v)
      return isNaN(parsed) ? 0 : parsed
    })

    // Ensure we have exactly 3 valid RGB values
    if (parts.length !== 3) {
      console.warn(`WaterBlob: CSS variable ${variable} has invalid format: ${value}`)
      return null
    }

    // Normalize to 0-1 range and validate
    const normalized = parts.map((v) => v / 255)
    if (normalized.some((v) => isNaN(v) || !isFinite(v))) {
      console.warn(`WaterBlob: CSS variable ${variable} produced NaN values`)
      return null
    }

    return normalized as [number, number, number]
  }

  if (interactive) {
    const palettes = theme === 'dark' ? DARK_PALETTES : LIGHT_PALETTES
    const palette = palettes[paletteIndex]
    
    // Still need to get background color from CSS
    const background = getColor('--color-background')
    if (!background) return null

    return {
      blue: palette[0] as [number, number, number],
      purple: palette[1] as [number, number, number],
      pink: palette[2] as [number, number, number],
      background,
    }
  }

  // Non-interactive mode: get all colors from CSS variables
  const blue = getColor('--hero-blob-blue')
  const purple = getColor('--hero-blob-purple')
  const pink = getColor('--hero-blob-pink')
  const background = getColor('--color-background')

  // Return null if any color failed to load
  if (!blue || !purple || !pink || !background) {
    return null
  }

  return { blue, purple, pink, background }
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
