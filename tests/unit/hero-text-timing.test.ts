import { describe, expect, it } from 'vitest'
import { getRemainingRevealDelayS } from '@/components/hero/hero-text-timing'

describe('getRemainingRevealDelayS', () => {
  it('returns full delay when nothing has elapsed', () => {
    expect(getRemainingRevealDelayS(2.6, 1000, 1000)).toBe(2.6)
  })

  it('subtracts elapsed time from the target delay', () => {
    expect(getRemainingRevealDelayS(2.6, 0, 1600)).toBe(1)
  })

  it('never returns a negative delay', () => {
    expect(getRemainingRevealDelayS(2.6, 0, 5000)).toBe(0)
  })
})
