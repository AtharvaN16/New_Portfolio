import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { AnimatedCursor } from '../../remotion/components/AnimatedCursor'

vi.mock('remotion', () => ({
  useCurrentFrame: () => 0,
  interpolate: (_f: number, _in: number[], out: number[]) => out[0],
  spring: () => 1,
  AbsoluteFill: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

describe('AnimatedCursor', () => {
  it('renders at given position', () => {
    const { container } = render(
      <AnimatedCursor x={100} y={200} clicking={false} />
    )
    expect(container.querySelector('svg')).toBeTruthy()
  })
})
