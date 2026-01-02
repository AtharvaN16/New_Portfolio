import type { Metadata, Viewport } from 'next'
import { env } from '@/lib/env'

// Site Configuration
const siteConfig = {
  name: 'Atharva Nayak',
  title: 'Atharva Nayak - Designer & Strategist',
  description:
    'Designer and strategist creating meaningful experiences through thoughtful design. Portfolio showcasing case studies, projects, and writings.',
  url: env.NEXT_PUBLIC_SITE_URL,
  ogImage: '/og-image.jpg',
  links: {
    twitter: '', // Optional: Add Twitter handle if available
    github: '', // Optional: Add GitHub profile if available
    linkedin: 'https://www.linkedin.com/in/atharva-nayak-142b95184/',
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
    // creator: '@yourhandle', // Optional: Add Twitter handle if available
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
