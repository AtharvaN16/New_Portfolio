import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { Beat1Open } from '../../remotion/beats/Beat1Open'

vi.mock('remotion', () => ({
  useCurrentFrame: () => 30,
  useVideoConfig: () => ({ fps: 30, width: 1920, height: 1080, durationInFrames: 720 }),
  spring: () => 1,
  interpolate: (_f: number, _in: number[], out: number[]) => out[1],
  AbsoluteFill: ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => <div style={style}>{children}</div>,
}))

describe('Beat1Open', () => {
  it('renders logo and title text', () => {
    const { getByText } = render(<Beat1Open />)
    expect(getByText('Library Website Usability Study')).toBeTruthy()
  })
})
