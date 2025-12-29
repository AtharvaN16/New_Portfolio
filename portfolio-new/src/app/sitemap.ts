import type { MetadataRoute } from 'next'
import { env } from '@/lib/env'

/**
 * Dynamic Sitemap Generator
 *
 * Tells search engines about all pages on the site.
 * Updates automatically when you add new pages.
 */

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = env.NEXT_PUBLIC_SITE_URL

  // Static pages
  const routes = ['', '/contact'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))

  // TODO: Add dynamic routes when you have case studies
  // Example:
  // const caseStudies = await getCaseStudies()
  // const caseStudyRoutes = caseStudies.map((study) => ({
  //   url: `${baseUrl}/case-studies/${study.slug}`,
  //   lastModified: study.updatedAt,
  //   changeFrequency: 'monthly' as const,
  //   priority: 0.9,
  // }))

  return [...routes]
}
