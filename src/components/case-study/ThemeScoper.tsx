'use client'

interface ThemeScoperProps {
  themeColor: string
  children: React.ReactNode
}

export function ThemeScoper({ themeColor, children }: ThemeScoperProps) {
  return (
    <div 
      className="case-study-theme"
      style={{ 
        ['--cs-theme-color' as string]: themeColor 
      } as React.CSSProperties}
    >
      {children}
    </div>
  )
}
