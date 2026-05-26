import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { GradientBackground } from '../../remotion/components/GradientBackground'

// Remotion hooks need mocking outside a composition
vi.mock('remotion', () => ({
  useCurrentFrame: () => 0,
  useVideoConfig: () => ({ fps: 30, width: 1920, height: 1080, durationInFrames: 720 }),
  AbsoluteFill: ({ children, style }: any) => <div style={style}>{children}</div>,
}))

describe('GradientBackground', () => {
  it('renders without crashing', () => {
    const { container } = render(<GradientBackground />)
    expect(container.firstChild).toBeTruthy()
  })
})
