import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { AccessibilityProvider } from '@/components/providers/AccessibilityProvider'
import { Footer } from '@/components/layout/Footer'

// Mocking the sendMessage action to avoid Resend API key error
vi.mock('@/app/actions/send-message', () => ({
  sendMessage: vi.fn(() => Promise.resolve({ success: true }))
}))

describe('Accessibility Tests', () => {
  it('Footer should have no accessibility violations', async () => {
    const { container } = render(
      <AccessibilityProvider>
        <Footer />
      </AccessibilityProvider>
    )

    const results = await axe(container)
    expect(results.violations).toHaveLength(0)
  })
})
