import { describe, expect, it } from 'vitest'
import {
  deltaFramesFromMs,
  lerpByReferenceFrames,
  multiplyByReferenceFrames,
  WATER_BLOB_REFERENCE_FPS,
} from '@/components/hero/waterBlob.motion'

describe('water blob motion helpers', () => {
  it('matches the existing per-frame lerp at the reference frame rate', () => {
    const current = -1.5
    const target = 0
    const perFrameRate = 0.06

    expect(lerpByReferenceFrames(current, target, perFrameRate, 1)).toBeCloseTo(
      current + (target - current) * perFrameRate,
      12
    )
  })

  it('keeps two half-frame lerps equivalent to one full frame', () => {
    const current = -1.5
    const target = 0
    const perFrameRate = 0.035

    const halfStep = lerpByReferenceFrames(current, target, perFrameRate, 0.5)
    const twoHalfSteps = lerpByReferenceFrames(
      halfStep,
      target,
      perFrameRate,
      0.5
    )

    expect(twoHalfSteps).toBeCloseTo(
      lerpByReferenceFrames(current, target, perFrameRate, 1),
      12
    )
  })

  it('caps large frame gaps to avoid teleporting after stutters', () => {
    const tenFramesMs = (1000 / WATER_BLOB_REFERENCE_FPS) * 10

    expect(deltaFramesFromMs(tenFramesMs)).toBe(4)
  })

  it('applies multiplicative decay using reference frames', () => {
    const value = 0.8
    const perFrameDecay = 0.92

    expect(multiplyByReferenceFrames(value, perFrameDecay, 1)).toBeCloseTo(
      value * perFrameDecay,
      12
    )
  })
})
