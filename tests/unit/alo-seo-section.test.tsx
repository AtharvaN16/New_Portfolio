import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AccessibilityProvider } from '@/components/providers/AccessibilityProvider'
import { AloSEOSection } from '@/components/case-study/content/alo-yoga/AloSEOSection'

describe('AloSEOSection', () => {
  it('renders the updated keyword coverage title', () => {
    render(
      <AccessibilityProvider>
        <AloSEOSection />
      </AccessibilityProvider>
    )

    expect(screen.getByText('Finding 1 — Keyword Coverage')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: /Alo shows up for yoga\. It doesn't show up for much else\./i,
      })
    ).toBeInTheDocument()
    expect(
      screen.queryByText("Alo's search visibility is almost entirely yoga and women's")
    ).not.toBeInTheDocument()
  })
})
