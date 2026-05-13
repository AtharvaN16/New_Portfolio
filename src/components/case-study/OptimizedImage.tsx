'use client'

import { useState } from 'react'
import { useIntersectionObserver } from '@/hooks/use-intersection-observer'

interface OptimizedImageProps {
  webpSrc: string
  fallbackSrc: string // Can be PNG or JPG
  alt: string
  width: number
  height: number
  className?: string
  imgClassName?: string
}

/**
 * Optimized image component with WebP support and Intersection Observer lazy loading
 * Uses WebP format with PNG/JPG fallback for better performance
 * Features elegant loading placeholder with subtle shimmer effect and smooth fade-in
 */
export function OptimizedImage({
  webpSrc,
  fallbackSrc,
  alt,
  width,
  height,
  className = '',
  imgClassName = '',
}: OptimizedImageProps) {
  const [containerRef, isVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: '100px',
    triggerOnce: true,
  })
  const [isLoaded, setIsLoaded] = useState(false)

  const handleImageLoad = () => {
    setIsLoaded(true)
  }

  return (
    <div ref={containerRef} className={`relative ${className}`} style={{ aspectRatio: `${width} / ${height}` }}>
      {/* Loading placeholder - fades out when image loads */}
      <div
        className="absolute inset-0 w-full transition-opacity duration-700 ease-out"
        style={{
          opacity: isLoaded ? 0 : 1,
          pointerEvents: isLoaded ? 'none' : 'auto',
        }}
      >
        {/* Elegant gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              135deg,
              rgb(var(--color-surface-muted)) 0%,
              rgb(var(--color-surface-elevated)) 50%,
              rgb(var(--color-surface-muted)) 100%
            )`,
          }}
        />
        {/* Subtle shimmer animation */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `linear-gradient(
              90deg,
              transparent 0%,
              rgba(255, 255, 255, 0.15) 50%,
              transparent 100%
            )`,
            backgroundSize: '200% 100%',
            animation: 'shimmer 2.5s ease-in-out infinite',
          }}
        />
      </div>

      {/* Image with fade-in effect */}
      {isVisible && (
        <picture className="block w-full relative z-10">
          <source srcSet={webpSrc} type="image/webp" />
          <img
            src={fallbackSrc}
            alt={alt}
            width={width}
            height={height}
            className={`w-full h-auto ${imgClassName}`}
            loading="lazy"
            decoding="async"
            onLoad={handleImageLoad}
            style={{
              opacity: isLoaded ? 1 : 0,
              transition: 'opacity 700ms ease-out',
            }}
          />
        </picture>
      )}
    </div>
  )
}

