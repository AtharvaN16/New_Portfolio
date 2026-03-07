'use client'

import { type ReactNode } from 'react'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { LenisProvider } from '@/components/providers/LenisProvider'
import { AccessibilityProvider } from '@/components/providers/AccessibilityProvider'

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AccessibilityProvider>
      <ThemeProvider>
        <LenisProvider>{children}</LenisProvider>
      </ThemeProvider>
    </AccessibilityProvider>
  )
}
