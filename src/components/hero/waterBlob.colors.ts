/**
 * Color Palettes and Color Management for WaterBlob
 *
 * Defines color palettes for interactive mode and provides utilities
 * for extracting colors from design tokens.
 *
 * Order follows color wheel (warm → cool): Orange → Gold → Terracotta → Coral →
 * Teal → Blue → Slate → Indigo → Violet. Cycling feels like moving around the wheel.
 *
 * COLOR PAIRS REFERENCE (index = palette index, Color 1/2/3 = gradient positions)
 *
 * LIGHT MODE (for white/light backgrounds):
 * | Idx | Name                    | Color 1 (RGB)     | Color 2 (RGB)      | Color 3 (RGB)      |
 * |-----|-------------------------|-------------------|--------------------|--------------------|
 * | 0   | Orange / Purple / Cyan  | 200, 95, 25       | 125, 50, 185       | 15, 145, 175       |
 * | 1   | Gold / Coral / Burgundy | 170, 120, 15      | 205, 85, 50        | 110, 0, 25         |
 * | 2   | Terracotta / Rust / Plum| 190, 110, 70      | 165, 70, 45        | 115, 48, 85        |
 * | 3   | Ocean / Coral / Sunset  | 0, 75, 140         | 210, 90, 50        | 205, 160, 25       |
 * | 4   | Teal / Green / Amber    | 0, 100, 95        | 95, 135, 85        | 150, 120, 60       |
 * | 5   | Navy / Ocean / Azure    | 12, 28, 80         | 0, 90, 145         | 85, 150, 190       |
 * | 6   | Slate / Seafoam / Iris | 95, 130, 170       | 70, 145, 115       | 135, 90, 180       |
 * | 7   | Salmon / Rose / Lavender| 200, 95, 55       | 155, 88, 120       | 100, 80, 185       |
 * | 8   | Indigo / Purple / Rose  | 42, 52, 165       | 110, 75, 195       | 220, 65, 105       |
 * | 9   | Grape / Violet / Lavender| 58, 12, 95        | 105, 28, 175       | 145, 110, 200      |
 *
 * DARK MODE (for black/dark backgrounds):
 * | Idx | Name                    | Color 1 (RGB)     | Color 2 (RGB)      | Color 3 (RGB)      |
 * |-----|-------------------------|-------------------|--------------------|--------------------|
 * | 0   | Orange / Purple / Cyan | 251, 146, 60      | 168, 85, 247       | 34, 211, 238       |
 * | 1   | Gold / Coral / Burgundy | 255, 200, 50      | 255, 140, 100      | 180, 40, 60        |
 * | 2   | Peach / Terracotta / Plum| 255, 200, 170    | 220, 120, 85       | 170, 90, 140       |
 * | 3   | Ocean / Coral / Yellow  | 30, 130, 220      | 255, 140, 100      | 255, 225, 80       |
 * | 4   | Teal / Sage / Sand      | 30, 180, 170      | 150, 200, 140      | 195, 165, 90       |
 * | 5   | Navy / Cerulean / Sky   | 40, 60, 140       | 50, 150, 220       | 150, 210, 255      |
 * | 6   | Ice Blue / Mint / Lilac | 120, 185, 255     | 80, 210, 165       | 210, 140, 255      |
 * | 7   | Salmon / Rose / Lavender| 247, 134, 81      | 198, 136, 166      | 149, 137, 251      |
 * | 8   | Indigo / Purple / Pink  | 99, 102, 241      | 167, 139, 250      | 236, 72, 153       |
 * | 9   | Grape / Violet / Lavender| 110, 40, 160     | 160, 70, 255       | 210, 175, 255      |
 */

import type { Colors } from './waterBlob.types'

/**
 * Light mode color palettes for interactive mode
 * Ordered by color wheel (warm → cool). Default on load: index 0 (Orange).
 *
 * Design Strategy for Light Backgrounds:
 * - DARKER cores (40-55% lightness) for visibility
 * - HIGHER saturation (80-95%) to compensate for lower luminance contrast
 * - Pigment/ink metaphor: think watercolor stains, not neon glows
 */
export const LIGHT_PALETTES = [
  // 0: Orange / Purple / Cyan (default on load)
  [
    [200 / 255, 95 / 255, 25 / 255],      // Darker orange
    [125 / 255, 50 / 255, 185 / 255],     // Deeper purple
    [15 / 255, 145 / 255, 175 / 255],     // Richer cyan
  ],
  // 1: Gold / Coral / Burgundy
  [
    [170 / 255, 120 / 255, 15 / 255],     // Deeper gold
    [205 / 255, 85 / 255, 50 / 255],      // Richer coral
    [110 / 255, 0 / 255, 25 / 255],       // Darker burgundy
  ],
  // 2: Terracotta / Rust / Plum
  [
    [190 / 255, 110 / 255, 70 / 255],     // Richer terracotta
    [165 / 255, 70 / 255, 45 / 255],      // Deeper rust
    [115 / 255, 48 / 255, 85 / 255],      // Darker plum
  ],
  // 3: Ocean / Coral / Sunset
  [
    [0 / 255, 75 / 255, 140 / 255],       // Darker ocean
    [210 / 255, 90 / 255, 50 / 255],      // Richer coral
    [205 / 255, 160 / 255, 25 / 255],     // Deeper sunset gold
  ],
  // 4: Teal / Green / Amber
  [
    [0 / 255, 100 / 255, 95 / 255],       // Darker teal
    [95 / 255, 135 / 255, 85 / 255],      // Deeper sage
    [150 / 255, 120 / 255, 60 / 255],     // Richer amber
  ],
  // 5: Navy / Ocean / Azure
  [
    [12 / 255, 28 / 255, 80 / 255],       // Darker navy
    [0 / 255, 90 / 255, 145 / 255],       // Richer ocean
    [85 / 255, 150 / 255, 190 / 255],     // Deeper azure
  ],
  // 6: Slate / Seafoam / Iris
  [
    [95 / 255, 130 / 255, 170 / 255],     // Deeper slate
    [70 / 255, 145 / 255, 115 / 255],     // Richer seafoam
    [135 / 255, 90 / 255, 180 / 255],     // Deeper iris
  ],
  // 7: Salmon / Rose / Lavender
  [
    [200 / 255, 95 / 255, 55 / 255],      // Darker salmon (#f78651)
    [155 / 255, 88 / 255, 120 / 255],     // Rose bridge
    [100 / 255, 80 / 255, 185 / 255],     // Deeper lavender (#9589FB)
  ],
  // 8: Indigo / Purple / Rose
  [
    [42 / 255, 52 / 255, 165 / 255],      // Deeper indigo
    [110 / 255, 75 / 255, 195 / 255],     // Richer purple
    [220 / 255, 65 / 255, 105 / 255],     // Deeper rose
  ],
  // 9: Grape / Violet / Lavender
  [
    [58 / 255, 12 / 255, 95 / 255],       // Darker grape
    [105 / 255, 28 / 255, 175 / 255],     // Richer violet
    [145 / 255, 110 / 255, 200 / 255],    // Deeper lavender
  ],
]

/**
 * Dark mode color palettes for interactive mode
 * Ordered by color wheel (warm → cool). Brighter values for dark backgrounds.
 */
export const DARK_PALETTES = [
  // 0: Orange / Purple / Cyan (default on load)
  [
    [251 / 255, 146 / 255, 60 / 255],
    [168 / 255, 85 / 255, 247 / 255],
    [34 / 255, 211 / 255, 238 / 255],
  ],
  // 1: Gold / Coral / Burgundy
  [
    [255 / 255, 200 / 255, 50 / 255],
    [255 / 255, 140 / 255, 100 / 255],
    [180 / 255, 40 / 255, 60 / 255],
  ],
  // 2: Peach / Terracotta / Plum
  [
    [255 / 255, 200 / 255, 170 / 255],
    [220 / 255, 120 / 255, 85 / 255],
    [170 / 255, 90 / 255, 140 / 255],
  ],
  // 3: Ocean / Coral / Yellow
  [
    [30 / 255, 130 / 255, 220 / 255],
    [255 / 255, 140 / 255, 100 / 255],
    [255 / 255, 225 / 255, 80 / 255],
  ],
  // 4: Teal / Sage / Sand
  [
    [30 / 255, 180 / 255, 170 / 255],
    [150 / 255, 200 / 255, 140 / 255],
    [195 / 255, 165 / 255, 90 / 255],
  ],
  // 5: Navy / Cerulean / Sky Blue
  [
    [40 / 255, 60 / 255, 140 / 255],
    [50 / 255, 150 / 255, 220 / 255],
    [150 / 255, 210 / 255, 255 / 255],
  ],
  // 6: Ice Blue / Mint / Lilac
  [
    [120 / 255, 185 / 255, 255 / 255],
    [80 / 255, 210 / 255, 165 / 255],
    [210 / 255, 140 / 255, 255 / 255],
  ],
  // 7: Salmon / Rose / Lavender
  [
    [247 / 255, 134 / 255, 81 / 255],     // Salmon #f78651
    [198 / 255, 136 / 255, 166 / 255],    // Rose bridge
    [149 / 255, 137 / 255, 251 / 255],    // Lavender #9589FB
  ],
  // 8: Indigo / Purple / Pink
  [
    [99 / 255, 102 / 255, 241 / 255],
    [167 / 255, 139 / 255, 250 / 255],
    [236 / 255, 72 / 255, 153 / 255],
  ],
  // 9: Grape / Violet / Lavender
  [
    [110 / 255, 40 / 255, 160 / 255],
    [160 / 255, 70 / 255, 255 / 255],
    [210 / 255, 175 / 255, 255 / 255],
  ],
]

/** Scribble colors for palettes 5 (Navy), 8 (Indigo), 9 (Grape). Dark = accessible light; light = accessible dark. */
const SCRIBBLE_PALETTE_5_DARK = [128, 207, 255] as const  // #80CFFF azure (Navy palette)
const SCRIBBLE_PALETTE_5_LIGHT = [0, 65, 130] as const   // Accessible darker blue on white
const SCRIBBLE_PALETTE_7_DARK = [106, 111, 255] as const // #6A6FFF (Indigo palette)
const SCRIBBLE_PALETTE_7_LIGHT = [55, 60, 195] as const  // Darker indigo on white
const SCRIBBLE_PALETTE_8_DARK = [212, 167, 255] as const // #D4A7FF lavender (Grape palette)
const SCRIBBLE_PALETTE_8_LIGHT = [72, 28, 120] as const // Accessible darker violet on white

/**
 * Get scribble color for hero underline. Palettes 5, 8 and 9 use custom scribble colors;
 * others use gradient-start. Returns RGB in 0–255.
 */
export function getScribbleColor(
  paletteIndex: number,
  isDark: boolean
): number[] {
  if (paletteIndex === 5) {
    return isDark ? [...SCRIBBLE_PALETTE_5_DARK] : [...SCRIBBLE_PALETTE_5_LIGHT]
  }
  if (paletteIndex === 8) {
    return isDark ? [...SCRIBBLE_PALETTE_7_DARK] : [...SCRIBBLE_PALETTE_7_LIGHT]
  }
  if (paletteIndex === 9) {
    return isDark ? [...SCRIBBLE_PALETTE_8_DARK] : [...SCRIBBLE_PALETTE_8_LIGHT]
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
  _interactive: boolean,
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

  // Use the actual page background from CSS tokens for both modes.
  // This ensures the blob canvas perfectly matches the site background.
  const background = getColor('--color-background')
  if (!background) return null

  // Always use DARK_PALETTES — vivid colors look correct on both black and white backgrounds.
  // Ghost (F1) and interactive blobs share the same paletteIndex for entry + settled states.
  const safeIndex = paletteIndex % DARK_PALETTES.length
  const palette = DARK_PALETTES[safeIndex]

  return {
    blue: palette[0] as [number, number, number],
    purple: palette[1] as [number, number, number],
    pink: palette[2] as [number, number, number],
    background,
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
