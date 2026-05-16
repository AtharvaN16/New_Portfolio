import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AloSearchPositionMap } from '@/components/case-study/content/alo-yoga/AloSearchPositionMap'

describe('AloSearchPositionMap', () => {
  it('renders the branded market-position graphic labels', () => {
    render(<AloSearchPositionMap />)

    expect(
      screen.getByRole('img', {
        name: /competitive position map for alo yoga search visibility/i,
      })
    ).toBeInTheDocument()

    expect(screen.getByText('Sport breadth (Yoga-only → Multi-sport)')).toBeInTheDocument()
    expect(screen.getByText('Audience gender balance')).toBeInTheDocument()
    expect(screen.getByText('Yoga + Female-dominant')).toBeInTheDocument()
    expect(screen.getByText('Multi-sport + Gender-equal')).toBeInTheDocument()

    for (const brand of ['Alo Yoga', 'Vuori', 'Lululemon', 'Gymshark', 'Under Armour']) {
      expect(screen.getByText(brand)).toBeInTheDocument()
    }

    expect(screen.getAllByTestId('alo-map-brand-marker')).toHaveLength(5)
  })
})
