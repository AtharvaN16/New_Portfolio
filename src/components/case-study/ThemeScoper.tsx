'use client'

import { hexToRgb } from '@/lib/utils/color'

interface ThemeScoperProps {
  themeColor: string
  children: React.ReactNode
}

export function ThemeScoper({ themeColor, children }: ThemeScoperProps) {
  return (
    <div
      className="case-study-theme"
      style={
        {
          ['--cs-primary-rgb' as string]: hexToRgb(themeColor),
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  )
}
