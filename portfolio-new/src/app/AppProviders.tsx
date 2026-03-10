'use client'

import { type ReactNode } from 'react'
import { LazyMotion, domAnimation } from 'framer-motion'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { LenisProvider } from '@/components/providers/LenisProvider'
import { AccessibilityProvider } from '@/components/providers/AccessibilityProvider'
import { ReadingGuide } from '@/components/layout/ReadingGuide'
import { A11yFilterOverlay } from '@/components/layout/A11yFilterOverlay'

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      <AccessibilityProvider>
        <ThemeProvider>
          <LenisProvider>
            {children}
            <ReadingGuide />
            <A11yFilterOverlay />
          </LenisProvider>
        </ThemeProvider>
      </AccessibilityProvider>
    </LazyMotion>
  )
}
