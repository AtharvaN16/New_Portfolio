/**
 * Color Palettes and Color Management for WaterBlob
 *
 * The palette catalog lives in `waterBlob.palettes.ts`. This module only
 * converts the active catalog entry into normalized WebGL colors.
 */

import type { Colors } from './waterBlob.types'
import { getPalettePair, toNormalizedRgb } from './waterBlob.palettes'

/**
 * Get colors from design tokens or custom palettes.
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

    if (!value) {
      console.warn(`WaterBlob: CSS variable ${variable} is empty or not found`)
      return null
    }

    const parts = value.split(' ').map((v) => {
      const parsed = parseInt(v)
      return isNaN(parsed) ? 0 : parsed
    })

    if (parts.length !== 3) {
      console.warn(
        `WaterBlob: CSS variable ${variable} has invalid format: ${value}`
      )
      return null
    }

    const normalized = parts.map((v) => v / 255)
    if (normalized.some((v) => isNaN(v) || !isFinite(v))) {
      console.warn(`WaterBlob: CSS variable ${variable} produced NaN values`)
      return null
    }

    return normalized as [number, number, number]
  }

  const background = getColor('--color-background')
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
