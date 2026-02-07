'use client'

import { useState, type ReactNode } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils/cn'
import { AnimatedHeroTextGSAP } from '@/components/hero/AnimatedHeroTextGSAP'
import { AnimatedTitle } from '@/components/ui/AnimatedTitle'

interface FullpageCardProps {
  title: string
  description?: string
  mediaSrc?: string
  mediaType?: 'image' | 'video'
  mediaAlt?: string
  children?: ReactNode
  variant?: 'surface' | 'surface-elevated' | 'dark' | 'light'
  className?: string
  titleClassName?: string
  descriptionClassName?: string
  mediaClassName?: string
  slug?: string
}

/**
 * Fullpage card component - Basic version (no parallax)
 */
export function FullpageCard({
  title,
  description,
  mediaSrc,
  mediaType = 'image',
  mediaAlt = '',
  children,
  variant = 'surface',
  className,
  titleClassName,
  descriptionClassName,
  mediaClassName,
  slug,
}: FullpageCardProps) {
  if (!title || title.trim().length === 0) {
    throw new Error('FullpageCard: title prop is required and cannot be empty')
  }

  const [mediaError, setMediaError] = useState(false)

  const variantStyles = {
    surface: 'bg-[rgb(var(--color-gray-dark))]',
    'surface-elevated': 'bg-surface-elevated',
    dark: 'bg-[rgb(var(--color-text-primary))]',
    light: 'bg-background',
  }

  const handleMediaError = () => {
    setMediaError(true)
  }

  const handleClick = () => {
    if (slug) {
      window.history.pushState({}, '', `/case-studies/${slug}`)
      window.dispatchEvent(new CustomEvent('casestudydialog:check'))
    }
  }

  return (
    <section
      className={cn(
        'min-h-screen w-full overflow-hidden',
        variantStyles[variant],
        slug && 'cursor-pointer',
        className
      )}
      onClick={handleClick}
      role={slug ? 'button' : undefined}
      tabIndex={slug ? 0 : undefined}
      onKeyDown={(e) => {
        if (slug && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault()
          handleClick()
        }
      }}
    >
      <div className="flex min-h-screen w-full flex-col justify-start px-6 py-16 text-white sm:px-8 sm:py-20 md:py-[72px]">
        <AnimatedTitle
          text={title}
          animationType="fadeIn"
          className={cn(
            'max-w-[90%] text-4xl font-black leading-[1.1] tracking-[-0.05em] sm:max-w-[85%] sm:text-5xl md:max-w-[76%] md:text-6xl lg:text-[72px]',
            titleClassName
          )}
        />

        {mediaSrc && !mediaError && (
          <div className="mt-6 sm:mt-8">
            {mediaType === 'video' ? (
              <video
                src={mediaSrc}
                autoPlay
                loop
                muted
                playsInline
                onError={handleMediaError}
                className={cn(
                  'h-auto w-full rounded-lg object-cover',
                  mediaClassName
                )}
              />
            ) : (
              <div className="relative aspect-video w-full">
                <Image
                  src={mediaSrc}
                  alt={mediaAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
                  onError={handleMediaError}
                  className={cn('rounded-lg object-cover', mediaClassName)}
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgZmlsbD0iIzMzMyIvPjwvc3ZnPg=="
                />
              </div>
            )}
          </div>
        )}

        {description && (
          <AnimatedHeroTextGSAP
            delay={0.5}
            className={cn(
              'mt-48 max-w-sm text-base font-medium leading-normal tracking-[-0.4px] sm:mt-64 sm:max-w-md sm:text-lg md:mt-[420px] md:text-[20px]',
              descriptionClassName
            )}
          >
            {description}
          </AnimatedHeroTextGSAP>
        )}

        {children && <div className="mt-6 sm:mt-8">{children}</div>}
      </div>
    </section>
  )
}

FullpageCard.displayName = 'FullpageCard'
