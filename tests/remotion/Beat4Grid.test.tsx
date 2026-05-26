import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { Beat4Grid } from '../../remotion/beats/Beat4Grid'

vi.mock('remotion', () => ({
  useCurrentFrame: () => 90,
  useVideoConfig: () => ({ fps: 30, width: 1920, height: 1080, durationInFrames: 720 }),
  spring: () => 1,
  interpolate: (_f: number, _in: number[], out: number[]) => out[1],
  AbsoluteFill: ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => <div style={style}>{children}</div>,
}))

vi.mock('../../src/components/case-study/content/LibraryServicesPagePrototype', () => ({
  default: () => <div data-testid="services" />,
}))
vi.mock('../../src/components/case-study/content/LibraryHoursPagePrototype', () => ({
  LibraryHoursPagePrototype: () => <div data-testid="hours" />,
}))
vi.mock('../../src/components/case-study/content/SubjectGuidesPrototype', () => {
  const SubjectGuidesPrototype = () => <div data-testid="guides" />
  return {
    SubjectGuidesPrototype,
    default: SubjectGuidesPrototype,
  }
})

describe('Beat4Grid', () => {
  it('renders all three prototype screens', () => {
    const { getByTestId } = render(<Beat4Grid />)
    expect(getByTestId('services')).toBeTruthy()
    expect(getByTestId('hours')).toBeTruthy()
    expect(getByTestId('guides')).toBeTruthy()
  })
})
