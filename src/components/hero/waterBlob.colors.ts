/**
 * Color Palettes and Color Management for WaterBlob
 *
 * The palette catalog lives in `waterBlob.palettes.ts`. This module only
 * converts the active catalog entry into normalized WebGL colors.
 */

import type { Colors } from './waterBlob.types'
import { getPalettePair, toNormalizedRgb } from './waterBlob.palettes'

const HERO_BLOB_BACKGROUND_VAR = '--color-hero-blob-background'

function readCssRgbTriplet(
  variable: string
): [number, number, number] | null {
  if (typeof window === 'undefined') return null

  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .trim()

  if (!value) {
    console.warn(`WaterBlob: CSS variable ${variable} is empty or not found`)
    return null
  }

  const parts = value.split(' ').map((v) => {
    const parsed = parseInt(v, 10)
    return Number.isNaN(parsed) ? 0 : parsed
  })

  if (parts.length !== 3) {
    console.warn(
      `WaterBlob: CSS variable ${variable} has invalid format: ${value}`
    )
    return null
  }

  const normalized = parts.map((v) => v / 255)
  if (normalized.some((v) => Number.isNaN(v) || !Number.isFinite(v))) {
    console.warn(`WaterBlob: CSS variable ${variable} produced NaN values`)
    return null
  }

  return normalized as [number, number, number]
}

/** Live read from design tokens — used per-frame so canvas bg tracks theme tokens. */
export function readHeroBlobBackground(): [number, number, number] | null {
  return readCssRgbTriplet(HERO_BLOB_BACKGROUND_VAR)
}

/**
 * Get colors from design tokens or custom palettes.
 */
export function getColors(
  theme: string,
  _interactive: boolean,
  paletteIndex: number
): Colors | null {
  if (typeof window === 'undefined') return null

  const background = readHeroBlobBackground()
  if (!background) return null

  // The WebGL blob always uses vivid dark-mode palette values. Light theme only
  // changes the canvas background and related CSS gradient variables.
  const [primary, secondary] = getPalettePair(paletteIndex, 'dark')

  return {
    primary: toNormalizedRgb(primary),
    secondary: toNormalizedRgb(secondary),
    background,
  }
}
