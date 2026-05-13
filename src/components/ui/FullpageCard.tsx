'use client'

import { useState, type ReactNode } from 'react'
import Image from 'next/image'
import { CASE_STUDY_RETURN_PATH_KEY } from '@/lib/case-study-overlay'
import { cn } from '@/lib/utils/cn'
import { AnimatedHeroTextGSAP } from '@/components/hero/AnimatedHeroTextGSAP'
import { AnimatedTitle } from '@/components/ui/AnimatedTitle'

interface FullpageCardProps {
  title: string
  description?: string
  tags?: string[]
  mediaSrc?: string
  mediaType?: 'image' | 'video'
  mediaAlt?: string
  priority?: boolean
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
  tags: _tags,
  mediaSrc,
  mediaType = 'image',
  mediaAlt = '',
  priority = false,
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
      try {
        sessionStorage.setItem(
          CASE_STUDY_RETURN_PATH_KEY,
          window.location.pathname
        )
      } catch {
        /* ignore quota / private mode */
      }
      window.history.pushState({}, '', `/case-studies/${slug}`)
      window.dispatchEvent(new CustomEvent('casestudydialog:check'))
    }
  }

  return (
    <section
      className={cn(
        'min-h-screen w-full overflow-hidden relative transition-all duration-500',
        'shadow-md [data-theme="dark"]:shadow-none',
        variantStyles[variant],
        slug && 'cursor-pointer',
        className
      )}
      onMouseEnter={() => {
        if (slug) {
          window.dispatchEvent(new CustomEvent('casestudydialog:preload'))
        }
      }}
      onPointerDown={() => {
        if (slug) {
          window.dispatchEvent(new CustomEvent('casestudydialog:preload'))
        }
      }}
      onClick={handleClick}
      aria-label={slug ? `View ${title} case study` : undefined}
      tabIndex={slug ? 0 : undefined}
      onKeyDown={(e) => {
        if (slug && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault()
          handleClick()
        }
      }}
    >
      {/* Background Image - fills entire card */}
      {mediaSrc && !mediaError && (
        <div className="absolute inset-0 w-full h-full">
          {mediaType === 'video' ? (
            <video
              src={mediaSrc}
              autoPlay
              loop
              muted
              playsInline
              onError={handleMediaError}
              className={cn('w-full h-full object-cover', mediaClassName)}
            />
          ) : (
            <Image
              src={mediaSrc}
              alt={mediaAlt}
              fill
              sizes="100vw"
              onError={handleMediaError}
              className={cn('object-cover', mediaClassName)}
              priority={priority}
            />
          )}
        </div>
      )}

      {/* Text Content - overlaid on top */}
      <div className="relative z-10 flex min-h-screen w-full flex-col justify-start px-6 2xl:px-[140px] py-16 text-white sm:px-8 sm:py-20 md:py-[72px]">
        <AnimatedTitle
          text={title}
          animationType="fadeIn"
          className={cn(
            'max-w-[90%] text-[32px] font-black leading-[1.1] tracking-[-0.05em] sm:max-w-[85%] sm:text-[40px] md:max-w-[76%] 2xl:max-w-[1400px] md:text-[48px] lg:text-[54px]',
            titleClassName
          )}
        />

        {description && (
          <AnimatedHeroTextGSAP
            delay={0.5}
            className={cn(
              'mt-auto max-w-sm text-base font-medium leading-normal tracking-[-0.4px] sm:max-w-md sm:text-lg md:text-[20px]',
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
