import type { NextConfig } from 'next'
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  // Disable Strict Mode so dev matches production (no double-mount masking animation bugs)
  reactStrictMode: false,

  // Configure MDX file extensions
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // Cache headers for static assets not handled by Next.js automatically
  async headers() {
    return [
      {
        source: '/fonts/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/favicon.ico',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400' }],
      },
    ]
  },
}

const withMDX = createMDX({
  // MDX plugins can be added here
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

// Merge MDX config with Next.js config
export default withMDX(nextConfig)
