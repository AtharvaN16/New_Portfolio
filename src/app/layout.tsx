import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { ThemeScript } from '@/components/ThemeScript'
import { env } from '@/lib/env'

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

// Site Configuration
const siteConfig = {
  name: 'Atharva Nayak',
  title: 'Atharva Nayak - Designer & Strategist',
  description:
    'Designer and strategist creating meaningful experiences through thoughtful design. Portfolio showcasing case studies, projects, and writings.',
  url: env.NEXT_PUBLIC_SITE_URL,
  ogImage: '/og-image.jpg', // TODO: Add actual OG image
  links: {
    twitter: 'https://twitter.com/yourhandle', // TODO: Update
    github: 'https://github.com/yourusername', // TODO: Update
    linkedin: 'https://linkedin.com/in/yourprofile', // TODO: Update
  },
}

// Critical: Viewport Meta (fixes mobile responsiveness)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
}

// SEO Metadata
export const metadata: Metadata = {
  // Basic metadata
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'designer',
    'strategist',
    'portfolio',
    'UX',
    'UI',
    'product design',
    'case studies',
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,

  // Open Graph (social media previews)
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@yourhandle', // TODO: Update
  },

  // Icons
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },

  // Web App Manifest
  manifest: '/site.webmanifest',

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

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
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          {/* Skip to main content link (accessibility) */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
          >
            Skip to main content
          </a>

          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
