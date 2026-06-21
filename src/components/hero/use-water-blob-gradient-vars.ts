import { useEffect } from 'react'
import type { MutableRefObject } from 'react'
import { COLOR_LERP_SPEED } from './waterBlob.types'
import {
  getHeroPalette,
  getPalettePair,
  toRgbArray,
} from './waterBlob.palettes'

interface UseWaterBlobGradientVarsParams {
  interactive: boolean
  paletteIndex: number
  theme: string
  gradientCurrentRef: MutableRefObject<{
    start: number[]
    end: number[]
  } | null>
  gradientAnimFrameRef: MutableRefObject<number>
}

export function useWaterBlobGradientVars({
  interactive,
  paletteIndex,
  theme,
  gradientCurrentRef,
  gradientAnimFrameRef,
}: UseWaterBlobGradientVarsParams) {
  useEffect(() => {
    if (!interactive) return

    const mode = theme === 'dark' ? 'dark' : 'light'
    const [start, end] = getPalettePair(paletteIndex, mode)
    const targetStart = toRgbArray(start)
    const targetEnd = toRgbArray(end)
    const scribble = getHeroPalette(paletteIndex).scribble?.[mode]
    const targetScribble = scribble ? toRgbArray(scribble) : targetStart
    const toStr = (c: number[]) => c.map((v) => Math.round(v)).join(' ')

    if (!gradientCurrentRef.current) {
      gradientCurrentRef.current = {
        start: [...targetStart],
        end: [...targetEnd],
      }
      document.documentElement.style.setProperty(
        '--color-gradient-start',
        toStr(targetStart)
      )
      document.documentElement.style.setProperty(
        '--color-gradient-end',
        toStr(targetEnd)
      )
      document.documentElement.style.setProperty(
        '--color-scribble',
        toStr(targetScribble)
      )
      return
    }

    const current = gradientCurrentRef.current

    const animateGradient = () => {
      let needsUpdate = false

      for (let i = 0; i < 3; i++) {
        current.start[i] +=
          (targetStart[i] - current.start[i]) * COLOR_LERP_SPEED
        current.end[i] += (targetEnd[i] - current.end[i]) * COLOR_LERP_SPEED
        if (Math.abs(current.start[i] - targetStart[i]) > 0.5)
          needsUpdate = true
        if (Math.abs(current.end[i] - targetEnd[i]) > 0.5) needsUpdate = true
      }

      if (!needsUpdate) {
        current.start = [...targetStart]
        current.end = [...targetEnd]
      }

      document.documentElement.style.setProperty(
        '--color-gradient-start',
        toStr(current.start)
      )
      document.documentElement.style.setProperty(
        '--color-gradient-end',
        toStr(current.end)
      )
      document.documentElement.style.setProperty(
        '--color-scribble',
        toStr(targetScribble)
      )

      if (needsUpdate) {
        gradientAnimFrameRef.current = requestAnimationFrame(animateGradient)
      }
    }

    cancelAnimationFrame(gradientAnimFrameRef.current)
    gradientAnimFrameRef.current = requestAnimationFrame(animateGradient)

    return () => {
      cancelAnimationFrame(gradientAnimFrameRef.current)
    }
  }, [
    interactive,
    paletteIndex,
    theme,
    gradientCurrentRef,
    gradientAnimFrameRef,
  ])
}
