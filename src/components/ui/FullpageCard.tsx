'use client'

import { useState, useRef, type ReactNode } from 'react'
import Image from 'next/image'
import { m, type MotionValue } from 'framer-motion'
import { rememberCaseStudyOpener } from '@/lib/case-study-overlay'
import {
  dispatchOverlayPreload,
  openCaseStudyOverlay,
} from '@/lib/overlay-events'
import { cn } from '@/lib/utils/cn'
import { AnimatedHeroTextGSAP } from '@/components/hero/AnimatedHeroTextGSAP'
import { AnimatedText } from '@/components/ui/AnimatedText'
import { useAccessibility } from '@/components/providers/AccessibilityProvider'
import { useBreakpoints } from '@/hooks/use-responsive'
import {
  useVideoPlaybackInView,
  VIDEO_CARD_VISIBILITY_THRESHOLD,
} from '@/hooks/use-video-playback-in-view'

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
  mediaScrimOpacity?: MotionValue<number>
  /** CSS view-timeline scrim for mobile home sticky stack (no JS scroll binding) */
  enableMobileScrollScrim?: boolean
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
  mediaScrimOpacity,
  enableMobileScrollScrim = false,
}: FullpageCardProps) {
  if (!title || title.trim().length === 0) {
    throw new Error('FullpageCard: title prop is required and cannot be empty')
  }

  const [mediaError, setMediaError] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { isDesktop } = useBreakpoints()
  const { reducedMotion } = useAccessibility()

  useVideoPlaybackInView(videoRef, undefined, {
    enabled: mediaType === 'video' && !!mediaSrc && !mediaError,
    threshold: VIDEO_CARD_VISIBILITY_THRESHOLD,
  })

  const mediaScrimColor = 'rgb(var(--color-background))'

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
      openCaseStudyOverlay(slug)
    }
  }

  return (
    <section
      className={cn(
        'min-h-[100svh] w-full overflow-hidden relative transition-all duration-500',
        'shadow-md [data-theme="dark"]:shadow-none',
        variantStyles[variant],
        slug && 'cursor-pointer',
        className
      )}
      onMouseEnter={() => {
        if (slug) {
          dispatchOverlayPreload('case-study')
        }
      }}
      onPointerDown={(e) => {
        if (slug) {
          dispatchOverlayPreload('case-study')
          rememberCaseStudyOpener(e.currentTarget as HTMLElement)
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
              ref={videoRef}
              src={mediaSrc}
              loop
              muted
              playsInline
              preload="none"
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

          {mediaScrimOpacity && !reducedMotion && (
            <m.div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-[1]"
              style={{
                opacity: mediaScrimOpacity,
                backgroundColor: mediaScrimColor,
              }}
            />
          )}

          {enableMobileScrollScrim && !mediaScrimOpacity && !reducedMotion && (
            <div
              aria-hidden
              className="home-mobile-card-scrim pointer-events-none absolute inset-0 z-[1]"
              style={{
                backgroundColor: mediaScrimColor,
                opacity: 1,
              }}
            />
          )}
        </div>
      )}

      {/* Text Content - overlaid on top */}
      <div className="relative z-10 flex min-h-[100svh] w-full flex-col justify-start px-6 2xl:px-[140px] py-16 text-white sm:px-8 sm:py-20 md:py-[72px]">
        {isDesktop ? (
          <AnimatedText
            variant="heading"
            text={title}
            animationType="fadeIn"
            wordClassName="text-white"
            className={cn(
              'max-w-[90%] text-[32px] font-black leading-[1.1] tracking-[-0.05em] text-white sm:max-w-[85%] sm:text-[40px] md:max-w-[76%] 2xl:max-w-[1400px] md:text-[48px] lg:text-[54px]',
              titleClassName
            )}
          />
        ) : (
          <h2
            className={cn(
              'max-w-[90%] text-[32px] font-black leading-[1.1] tracking-[-0.05em] text-white sm:max-w-[85%] sm:text-[40px] md:max-w-[76%] 2xl:max-w-[1400px] md:text-[48px] lg:text-[54px]',
              titleClassName
            )}
          >
            {title}
          </h2>
        )}

        {description && (
          <AnimatedHeroTextGSAP
            delay={0.5}
            style={{ color: 'rgb(255 255 255)' }}
            className={cn(
              'mt-auto max-w-sm text-[14px] font-medium leading-normal tracking-[-0.4px] text-white sm:max-w-md sm:text-lg md:text-[20px]',
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
