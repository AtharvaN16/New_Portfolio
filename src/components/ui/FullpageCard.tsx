'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, type ReactNode } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils/cn'
import { AnimatedHeroTextGSAP } from '@/components/hero/AnimatedHeroTextGSAP'
import { AnimatedTitle } from '@/components/ui/AnimatedTitle'

interface FullpageCardProps {
  /**
   * Card title/heading
   */
  title: string
  /**
   * Card description
   */
  description?: string
  /**
   * Optional image source (image or video)
   */
  mediaSrc?: string
  /**
   * Media type
   */
  mediaType?: 'image' | 'video'
  /**
   * Media alt text (for images)
   */
  mediaAlt?: string
  /**
   * Optional custom content instead of description
   */
  children?: ReactNode
  /**
   * Background variant
   * @default 'surface'
   */
  variant?: 'surface' | 'surface-elevated' | 'dark' | 'light'
  /**
   * Parallax intensity (0 = no parallax, 1 = default, 2 = strong)
   * @default 1
   */
  parallaxIntensity?: number
  /**
   * Additional className
   */
  className?: string
  /**
   * Title className
   */
  titleClassName?: string
  /**
   * Description className
   */
  descriptionClassName?: string
  /**
   * Media className
   */
  mediaClassName?: string
}

/**
 * Fullpage card component that spans the entire viewport with parallax effect
 * Perfect for project showcases, case studies, or section dividers
 */
export function FullpageCard({
  title,
  description,
  mediaSrc,
  mediaType = 'image',
  mediaAlt = '',
  children,
  variant = 'surface',
  parallaxIntensity = 1,
  className,
  titleClassName,
  descriptionClassName,
  mediaClassName,
}: FullpageCardProps) {
  // Input validation - title is required
  if (!title || title.trim().length === 0) {
    throw new Error('FullpageCard: title prop is required and cannot be empty')
  }

  const containerRef = useRef<HTMLDivElement>(null)
  const [mediaError, setMediaError] = useState(false)

  // Parallax scroll effect - entire card moves faster than page (1.5x)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  /**
   * Parallax transform calculation:
   * - 50vh: Distance the card travels (creating 1.5x scroll speed effect)
   * - Negative value makes card move upward faster than normal scroll
   * - Multiplied by parallaxIntensity for customizable effect strength
   */
  const cardY = useTransform(
    scrollYProgress,
    [0, 1],
    ['0vh', `-${50 * parallaxIntensity}vh`]
  )

  // Background variants using design tokens
  const variantStyles = {
    surface: 'bg-[rgb(var(--color-gray-dark))]',
    'surface-elevated': 'bg-surface-elevated',
    dark: 'bg-[rgb(var(--color-text-primary))]',
    light: 'bg-background',
  }

  // Error handler for failed media loading
  const handleMediaError = () => {
    setMediaError(true)
  }


  /**
   * Container height calculation:
   * - 200vh: Provides scroll space for parallax effect
   * - Allows card to move upward while user scrolls through this space
   */
  return (
    <div ref={containerRef} className="relative h-[200vh]">
      <motion.section
        style={{ y: cardY }}
        className={cn(
          'sticky top-0 z-50 min-h-screen w-full overflow-hidden',
          variantStyles[variant],
          className
        )}
      >
        {/* Static content - moves with card as single unit */}
        <div className="flex min-h-screen w-full flex-col justify-start px-6 py-16 text-white sm:px-8 sm:py-20 md:py-[72px]">
          {/* Title with fade animation (like work page) */}
          <AnimatedTitle
            text={title}
            animationType="fadeIn"
            className={cn(
              'max-w-[90%] text-4xl font-black leading-[1.1] tracking-[-1.44px] sm:max-w-[85%] sm:text-5xl md:max-w-[76%] md:text-6xl lg:text-[72px]',
              titleClassName
            )}
          />

          {/* Optional media (image or video) with error handling */}
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
                  />
                </div>
              )}
            </div>
          )}

          {/* Description with GSAP line-by-line reveal animation */}
          {description && (
            <AnimatedHeroTextGSAP
              delay={0.5}
              className={cn(
                // 420px spacing from design spec (vertical rhythm between title and description)
                'mt-48 max-w-sm text-base font-medium leading-normal tracking-[-0.4px] sm:mt-64 sm:max-w-md sm:text-lg md:mt-[420px] md:text-[20px]',
                descriptionClassName
              )}
            >
              {description}
            </AnimatedHeroTextGSAP>
          )}

          {children && <div className="mt-6 sm:mt-8">{children}</div>}
        </div>
      </motion.section>
    </div>
  )
}
