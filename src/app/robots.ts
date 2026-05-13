import type { MetadataRoute } from 'next'
import { env } from '@/lib/env'

/**
 * Robots.txt Configuration
 *
 * Tells search engine crawlers which pages they can access.
 * Includes sitemap location for better indexing.
 */

export default function robots(): MetadataRoute.Robots {
  const baseUrl = env.NEXT_PUBLIC_SITE_URL

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'], // Block API routes and admin (if you add one later)
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
