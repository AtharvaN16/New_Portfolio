import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ThemeScoper } from '@/components/case-study/ThemeScoper'

describe('ThemeScoper', () => {
  it('injects the seed color as --cs-primary-rgb for OKLCH derivation', () => {
    const { container } = render(
      <ThemeScoper themeColor="#5C8ED3">
        <span data-testid="child">Case study content</span>
      </ThemeScoper>
    )

    const scope = container.firstElementChild as HTMLElement
    expect(scope).toHaveClass('case-study-theme')
    expect(scope.style.getPropertyValue('--cs-primary-rgb')).toBe('92 142 211')
  })
})
