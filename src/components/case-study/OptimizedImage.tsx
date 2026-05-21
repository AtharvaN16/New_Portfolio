'use client'

import { useState } from 'react'
import Image, { type ImageProps } from 'next/image'
import { cn } from '@/lib/utils/cn'

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad' | 'src'> {
  /** The primary source (e.g. WebP) */
  src?: ImageProps['src']
  /** Backward compatibility: WebP source */
  webpSrc?: string
  /** Backward compatibility: Fallback source */
  fallbackSrc?: string
  /** Optional container class name */
  containerClassName?: string
}

/**
 * OptimizedImage
 * 
 * A deep module that wraps next/image with a premium loading experience.
 * Features:
 * - Next.js image optimization (webp, resizing)
 * - Shimmer placeholder during load
 * - Smooth fade-in transition
 * - Aspect-ratio aware container
 */
export function OptimizedImage({
  alt,
  src,
  webpSrc,
  fallbackSrc,
  width,
  height,
  className,
  containerClassName,
  priority,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const imageSrc = src || webpSrc || fallbackSrc || ''

  return (
    <div 
      className={cn(
        "relative overflow-hidden bg-surface-muted",
        containerClassName
      )}
      style={(!props.fill && width && height) ? { 
        aspectRatio: `${width} / ${height}` 
      } : undefined}
    >
      {/* Loading placeholder - fades out when image loads */}
      {!isLoaded && !priority && (
        <div
          className="absolute inset-0 z-0 transition-opacity duration-700 ease-out"
          aria-hidden="true"
        >
          {/* Shimmer animation - powered by design tokens */}
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
      )}

      {/* The optimized Next.js Image */}
      <Image
        alt={alt}
        src={imageSrc}
        width={width}
        height={height}
        priority={priority}
        onLoad={() => setIsLoaded(true)}
        className={cn(
          "transition-opacity duration-700 ease-out",
          isLoaded ? "opacity-100" : "opacity-0",
          className
        )}
        {...props}
      />
    </div>
  )
}
