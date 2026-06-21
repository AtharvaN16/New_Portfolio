import { useRef, useEffect, useMemo, useState, useCallback } from 'react'
import { getColors } from './waterBlob.colors'
import { HERO_PALETTE_COUNT } from './waterBlob.palettes'
import type { Colors } from './waterBlob.types'
import {
  COLOR_LERP_SPEED,
  PALETTE_COLOR_LERP_SPEED,
} from './waterBlob.types'

interface UseWaterBlobColorRefsParams {
  theme: string
  interactive: boolean
  initialPaletteIndex: number
}

export function useWaterBlobColorRefs({
  theme,
  interactive,
  initialPaletteIndex,
}: UseWaterBlobColorRefsParams) {
  const [paletteIndex, setPaletteIndex] = useState(initialPaletteIndex)
  const displayColorsRef = useRef<Colors | null>(null)
  const targetColorsRef = useRef<Colors | null>(null)
  const colorsInitializedRef = useRef(false)

  const colors = useMemo(
    () => getColors(theme, interactive, paletteIndex),
    [theme, interactive, paletteIndex]
  )

  const paletteLerpSpeed = interactive
    ? PALETTE_COLOR_LERP_SPEED
    : COLOR_LERP_SPEED

  const advancePalette = useCallback(() => {
    setPaletteIndex((index) => (index + 1) % HERO_PALETTE_COUNT)
  }, [])

  useEffect(() => {
    if (!colors) return

    const isValidColor = (color: number[]) =>
      color.length === 3 && color.every((c) => !isNaN(c) && isFinite(c))

    if (
      !isValidColor(colors.primary) ||
      !isValidColor(colors.secondary) ||
      !isValidColor(colors.background)
    ) {
      console.warn(
        'WaterBlob: Invalid color values detected, skipping initialization'
      )
      return
    }

    if (!colorsInitializedRef.current) {
      displayColorsRef.current = {
        primary: [...colors.primary],
        secondary: [...colors.secondary],
        background: [...colors.background],
      }
      targetColorsRef.current = {
        primary: [...colors.primary],
        secondary: [...colors.secondary],
        background: [...colors.background],
      }
      colorsInitializedRef.current = true
    } else {
      const target = targetColorsRef.current!
      target.primary = [...colors.primary]
      target.secondary = [...colors.secondary]
      target.background = [...colors.background]
    }
  }, [colors])

  return {
    paletteIndex,
    advancePalette,
    displayColorsRef,
    targetColorsRef,
    colorsInitializedRef,
    paletteLerpSpeed,
  }
}
