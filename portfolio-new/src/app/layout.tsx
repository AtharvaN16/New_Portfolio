'use client'
import { Geist, Geist_Mono, JetBrains_Mono, Mynerve } from 'next/font/google'
import './globals.css'

import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { LenisProvider } from '@/components/providers/LenisProvider'
import { ThemeScript } from '@/components/ThemeScript'

// Font Configuration
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: false, // Only load when needed
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
})

const mynerve = Mynerve({
  variable: '--font-mynerve',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  preload: false,
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable} ${mynerve.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <LenisProvider>
            {/* Skip to main content link (accessibility) */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
            >
              Skip to main content
            </a>

            {children}
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
