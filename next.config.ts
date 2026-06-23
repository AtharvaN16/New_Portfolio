import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Configure page extensions
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],

  experimental: {
    optimizePackageImports: ['framer-motion'],
  },


  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    /** 30 days — avoid re-running the optimizer on every repeat visit */
    minimumCacheTTL: 2_592_000,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
}

export default nextConfig
