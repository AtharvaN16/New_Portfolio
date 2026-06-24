import { JetBrains_Mono, Mynerve } from 'next/font/google'
import './globals.css'

import { AppProviders } from './AppProviders'
import { metadata, viewport } from './metadata'
import { TextureOverlay } from '@/components/layout/TextureOverlay'
import { satoshi, vulfMono, vulfMonoLightItalic } from '@/lib/fonts'

export { metadata, viewport }

// Font Configuration
const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: false,
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
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${satoshi.variable} ${vulfMono.variable} ${vulfMonoLightItalic.variable}`}
    >
      <body
        className={`${jetbrainsMono.variable} ${mynerve.variable} font-sans antialiased`}
      >
        <AppProviders>
          <TextureOverlay />
          <div className="relative z-10">
            {/* Skip to main content link (accessibility) */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
            >
              Skip to main content
            </a>

            {children}
          </div>
        </AppProviders>
      </body>
    </html>
  )
}
// Refresh UI
