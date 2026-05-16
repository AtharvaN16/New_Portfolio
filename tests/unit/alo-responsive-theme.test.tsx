import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CaseStudyContentRenderer } from '@/components/case-study/CaseStudyContentRenderer'
import { AloSearchForbidden } from '@/components/case-study/content/alo-yoga/AloSearchForbidden'
import { PlatformRoleGrid } from '@/components/case-study/content/PlatformRoleGrid'
import { AloCompetitiveSection } from '@/components/case-study/content/alo-yoga/AloCompetitiveSection'
import { AloSEOSection } from '@/components/case-study/content/alo-yoga/AloSEOSection'
import { AloSocialSection } from '@/components/case-study/content/alo-yoga/AloSocialSection'
import { AccessibilityProvider } from '@/components/providers/AccessibilityProvider'
import { caseStudies } from '@/lib/data/case-studies'

describe('Alo case study responsive and theme tokens', () => {
  it('uses a stacked mobile layout and token-backed surfaces for the platform role grid', () => {
    const { container } = render(<PlatformRoleGrid />)

    expect(container.firstElementChild).toHaveClass('bg-surface', 'border-border')
    expect(screen.getByText('Platform').parentElement).toHaveClass('hidden', 'sm:grid')

    const instagramRow = screen.getByText('Instagram').closest('[data-platform-row]')
    expect(instagramRow).toHaveClass('grid-cols-1', 'sm:grid-cols-3')
    expect(screen.getAllByText('Current role')[0]).toHaveClass('sm:hidden')
    expect(screen.getAllByText('Proposed role')[0]).toHaveClass('sm:hidden')
  })

  it('renders the search-to-forbidden illustration shell with correct base classes', () => {
    const { container } = render(<AloSearchForbidden />)
    const shell = container.firstElementChild

    expect(shell).toHaveClass('bg-white', 'shadow-2xl', 'border-neutral-200')
    expect(screen.getByText('G')).toBeInTheDocument()
    expect(screen.getByText('o')).toBeTruthy()
  })

  it('uses token-backed colors for competitive comparison surfaces and trends', () => {
    const { container } = render(
      <AccessibilityProvider>
        <AloCompetitiveSection />
      </AccessibilityProvider>
    )
    const frame = container.querySelector('[data-competitive-frame]')
    const upwardTrends = screen.getAllByText('↑')
    const downwardTrend = screen.getByText('↓')

    expect(frame).toHaveClass('bg-surface', 'border-border', 'divide-border')
    expect(upwardTrends[0]).toHaveClass('text-success')
    expect(downwardTrend).toHaveClass('text-error')
  })

  it('stacks dense stat grids on narrow screens before switching to two and four columns', () => {
    render(
      <AccessibilityProvider>
        <AloSEOSection />
        <AloSocialSection />
      </AccessibilityProvider>
    )

    expect(screen.getByText('Non-indexable URLs').closest('.grid')).toHaveClass(
      'grid-cols-1',
      'sm:grid-cols-2',
      'md:grid-cols-4'
    )
    expect(screen.getByText('Instagram followers').closest('.grid')).toHaveClass(
      'grid-cols-1',
      'sm:grid-cols-2',
      'md:grid-cols-4'
    )
  })

  it('passes the Alo case study token color into the revealed end state', () => {
    const aloCaseStudy = caseStudies.find(
      (caseStudy) => caseStudy.slug === 'alo-yoga-digital-analytics'
    )

    expect(aloCaseStudy?.imageBg).toBe('rgb(var(--color-alo-hero-bg))')
    expect(aloCaseStudy?.progressBarColor).toBe('rgb(var(--color-alo-progress))')

    render(
      <AccessibilityProvider>
        <CaseStudyContentRenderer
          caseStudy={{
            ...aloCaseStudy!,
            progressBarColor: 'rgb(var(--color-alo-data-accent))',
          }}
          isContentRevealed
        />
      </AccessibilityProvider>
    )

    expect(screen.getByText('The End')).toHaveStyle({
      color: 'rgb(var(--color-alo-data-accent))',
    })
  })
})
