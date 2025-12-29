import type { NextConfig } from 'next'
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  // Configure MDX file extensions
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
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
