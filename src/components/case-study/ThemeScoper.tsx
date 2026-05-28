'use client'

import { hexToRgb } from '@/lib/utils/color'

interface ThemeScoperProps {
  themeColor: string
  children: React.ReactNode
}

export function ThemeScoper({ themeColor, children }: ThemeScoperProps) {
  const rgb = hexToRgb(themeColor)
  
  return (
    <div 
      className="case-study-theme"
      style={{ 
        ['--cs-primary-rgb' as string]: rgb 
      } as React.CSSProperties}
    >
      {children}
    </div>
  )
}
