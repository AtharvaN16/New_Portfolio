'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
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
  /**
   * Optional slug for linking to case study page
   */
  slug?: string
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
  slug,
}: FullpageCardProps) {
  // Input validation - title is required
  if (!title || title.trim().length === 0) {
    throw new Error('FullpageCard: title prop is required and cannot be empty')
  }

  const containerRef = useRef<HTMLDivElement>(null)
  const [mediaError, setMediaError] = useState(false)

  // Parallax scroll effect - wider range for dramatic parallax (card covers content above)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  /**
   * Parallax transform calculation:
   * - 75vh: Distance the card travels (creating dramatic parallax scroll speed effect)
   * - Negative value makes card move upward faster than normal scroll
   * - Multiplied by parallaxIntensity for customizable effect strength
   * - Higher value (75 vs 50) ensures card fully exits before selected work scrolls
   */
  const cardYRaw = useTransform(
    scrollYProgress,
    [0, 1],
    ['0vh', `-${75 * parallaxIntensity}vh`]
  )

  /**
   * Spring-based smoothing for buttery scrolling
   * - Prevents micro-stuttering and jank
   * - stiffness: 100 = responsive but smooth
   * - damping: 30 = natural deceleration
   * - mass: 0.5 = lighter feel, quicker response
   */
  const cardY = useSpring(cardYRaw, {
    stiffness: 100,
    damping: 30,
    mass: 0.5,
  })

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

  // Click handler for case study navigation
  const handleClick = () => {
    if (slug) {
      window.history.pushState({}, '', `/case-studies/${slug}`)
      window.dispatchEvent(new CustomEvent('casestudydialog:check'))
    }
  }

  /**
   * Container height calculation:
   * - 220vh: Extended scroll space for smoother, more dramatic parallax effect
   * - Allows card to fully exit before next section scrolls
   */
  return (
    <div ref={containerRef} className="relative h-[220vh]">
      <motion.section
        style={{
          y: cardY,
          willChange: 'transform',
        }}
        className={cn(
          'sticky top-0 z-50 min-h-screen w-full overflow-hidden',
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
