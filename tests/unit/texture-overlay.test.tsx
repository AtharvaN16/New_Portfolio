import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { TextureOverlay } from '@/components/layout/TextureOverlay'

vi.mock('@/components/providers/ThemeProvider', () => ({
  useTheme: () => ({ theme: 'dark' }),
}))

describe('TextureOverlay', () => {
  it('keeps the grain layer behind page content', () => {
    const { container } = render(<TextureOverlay />)

    const textureLayer = container.querySelector('div[aria-hidden="true"]')

    expect(textureLayer).toHaveClass('fixed', 'inset-0', 'pointer-events-none')
    expect(textureLayer).not.toHaveClass('z-[9999]')
    expect(textureLayer).toHaveClass('z-0')
  })
})
