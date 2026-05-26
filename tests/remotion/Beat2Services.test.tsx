import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { Beat2Services } from '../../remotion/beats/Beat2Services'

vi.mock('remotion', () => ({
  useCurrentFrame: () => 60,
  useVideoConfig: () => ({ fps: 30, width: 1920, height: 1080, durationInFrames: 720 }),
  spring: (_: unknown) => 0,
  interpolate: (_f: number, _in: number[], out: number[]) => out[0],
  AbsoluteFill: ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => <div style={style}>{children}</div>,
}))

vi.mock('../../src/components/case-study/content/LibraryServicesPagePrototype', () => ({
  default: () => <div data-testid="services-prototype" />,
}))

vi.mock('../../remotion/components/AnimatedCursor', () => ({
  AnimatedCursor: () => <div data-testid="cursor" />,
}))

describe('Beat2Services', () => {
  it('renders the services prototype', () => {
    const { getByTestId } = render(<Beat2Services />)
    expect(getByTestId('services-prototype')).toBeTruthy()
  })
})
