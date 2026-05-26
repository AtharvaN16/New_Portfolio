import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Beat3Hours } from '../../remotion/beats/Beat3Hours'

vi.mock('remotion', () => ({
  useCurrentFrame: () => 60,
  useVideoConfig: () => ({ fps: 30, width: 1920, height: 1080, durationInFrames: 720 }),
  spring: () => 0,
  interpolate: (_f: number, _in: number[], out: number[]) => out[1],
  AbsoluteFill: ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => <div style={style}>{children}</div>,
}))

vi.mock('../../src/components/case-study/content/LibraryLocationCard', () => ({
  LibraryLocationCard: ({ library }: { library: { name: string } }) => <div data-testid="location-card">{library.name}</div>,
}))

describe('Beat3Hours', () => {
  it('renders the hours card', () => {
    const { getByTestId } = render(<Beat3Hours />)
    expect(getByTestId('location-card')).toBeTruthy()
  })
})
