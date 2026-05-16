import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AloKeywordInsights } from '@/components/case-study/content/alo-yoga/AloKeywordInsights'

describe('AloKeywordInsights', () => {
  it('renders insight sections with handwritten keywords and diagram watermarks', () => {
    render(<AloKeywordInsights />)

    expect(screen.getByText('Insight 1')).toBeInTheDocument()
    expect(screen.getAllByText('Why it matters')).toHaveLength(3)
    expect(screen.getByText(/Alo ranks 55th for "workout clothes"/i)).toBeInTheDocument()
    expect(screen.queryByText('athleisure wear')).not.toBeInTheDocument()
    expect(screen.getByTestId('alo-cluster-diagram')).toBeInTheDocument()
    expect(screen.getByTestId('alo-untapped-diagram')).toBeInTheDocument()
    const handwritten = screen.getByRole('group', { name: /Related search keywords in informal layout/i })
    expect(handwritten).toBeInTheDocument()
    expect(handwritten).toHaveTextContent('mens sweatpants')
    expect(handwritten.querySelectorAll('[data-scatter-keyword]')).toHaveLength(6)
  })
})
