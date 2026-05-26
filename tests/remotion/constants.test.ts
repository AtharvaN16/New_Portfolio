import { describe, it, expect } from 'vitest'
import {
  FPS,
  TOTAL_FRAMES,
  BEAT1_START, BEAT1_END,
  BEAT2_START, BEAT2_END,
  BEAT3_START, BEAT3_END,
  BEAT4_START, BEAT4_END,
  SPRING_GENTLE, SPRING_SNAPPY,
  GRAD_START, GRAD_END,
} from '../../remotion/constants'

describe('frame constants', () => {
  it('total frames equals 24s at 30fps', () => {
    expect(TOTAL_FRAMES).toBe(720)
  })
  it('beats are contiguous and cover full duration', () => {
    expect(BEAT1_START).toBe(0)
    expect(BEAT2_START).toBe(BEAT1_END)
    expect(BEAT3_START).toBe(BEAT2_END)
    expect(BEAT4_START).toBe(BEAT3_END)
    expect(BEAT4_END).toBe(TOTAL_FRAMES)
  })
  it('beat durations match spec', () => {
    expect(BEAT1_END - BEAT1_START).toBe(120) // 4s
    expect(BEAT2_END - BEAT2_START).toBe(270) // 9s
    expect(BEAT3_END - BEAT3_START).toBe(150) // 5s
    expect(BEAT4_END - BEAT4_START).toBe(180) // 6s
  })
})
