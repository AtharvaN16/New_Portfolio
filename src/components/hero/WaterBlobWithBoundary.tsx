'use client'

import { ErrorBoundary } from '@/components/error/ErrorBoundary'
import { useTheme } from '@/components/providers/ThemeProvider'
import type { WaterBlobProps } from './waterBlob.types'
import { WaterBlob } from './WaterBlob'

export function WaterBlobWithBoundary(props: WaterBlobProps) {
  const { theme } = useTheme()

  return (
    <ErrorBoundary
      fallback={
        <div
          className={`w-full h-full ${theme === 'dark' ? 'hero-gradient-dark' : 'hero-gradient-light'} ${props.className || ''}`}
          suppressHydrationWarning
        />
      }
    >
      <WaterBlob {...props} />
    </ErrorBoundary>
  )
}
