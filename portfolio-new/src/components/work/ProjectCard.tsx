'use client'

import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import { useBreakpoint } from '@/hooks/use-breakpoint'

export interface ProjectCardProps {
  title: string
  organization: string
  year: string
  description: string
  tags: string[]
  imageBg: string
  imageUrl?: string // Optional project image
  imageSizes?: string
  imagePriority?: boolean
  imageFetchPriority?: 'high' | 'low' | 'auto'
  variant?: 'default' | 'compact' // default for 2-grid, compact for 3-grid
  className?: string
  slug?: string // Optional slug for linking to case study page
  cardHeight?: string // Optional custom height (e.g., 'h-[400px] md:h-[500px]')
  recedeEffect?: 'none' | 'homeDesktop'
  homeScrollProgress?: MotionValue<number>
  isMasonry?: boolean
  masonryIndex?: number
}

export function ProjectCard({
  title,
  organization,
  year,
  description: _description,
  tags: _tags,
  imageBg,
  imageUrl,
  imageSizes,
  imagePriority = false,
  imageFetchPriority,
  variant = 'default',
  className,
  slug,
  cardHeight,
  recedeEffect = 'none',
  homeScrollProgress: _homeScrollProgress,
  isMasonry = false,
  masonryIndex = 0,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLElement>(null)
  const isDesktop = useBreakpoint('lg')
  const edgeProgress = useMotionValue(0)

  const shouldApplyRecede = recedeEffect === 'homeDesktop' && isDesktop

  const updateEdgeProgress = useCallback(() => {
    if (!shouldApplyRecede || !cardRef.current) {
      edgeProgress.set(0)
      return
    }

    const rect = cardRef.current.getBoundingClientRect()
    const visibleHeight =
      Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)
    const clampedVisibleHeight = Math.max(0, visibleHeight)
    const cardHeightPx = Math.max(rect.height, 1)
    const visibleRatio = clampedVisibleHeight / cardHeightPx

    const isExitingTop = rect.top < 0
    const isEnteringBottom = rect.bottom > window.innerHeight

    if ((!isExitingTop && !isEnteringBottom) || visibleRatio > 0.25) {
      edgeProgress.set(0)
      return
    }

    // 0 progress at 25% visible, 1 progress at 5% visible.
    const progress = (0.25 - visibleRatio) / 0.2
    edgeProgress.set(Math.min(1, Math.max(0, progress)))
  }, [edgeProgress, shouldApplyRecede])

  useAnimationFrame(() => {
    if (!shouldApplyRecede) return
    updateEdgeProgress()
  })

  const z = useTransform(
    edgeProgress,
    [0, 1],
    shouldApplyRecede ? ['0px', '-100px'] : ['0px', '0px']
  )

  const scale = useTransform(
    edgeProgress,
    [0, 1],
    shouldApplyRecede ? [1, 0.96] : [1, 1]
  )

  const blurValue = useTransform(
    edgeProgress,
    [0, 1],
    shouldApplyRecede ? ['0px', '20px'] : ['0px', '0px']
  )
  const filter = useTransform(blurValue, (v) => `blur(${v})`)

  const overlayOpacity = useTransform(
    edgeProgress,
    [0, 1],
    shouldApplyRecede ? [0, 0.6] : [0, 0]
  )

  const handleClick = () => {
    if (slug) {
      // Change URL and trigger dialog - RemoveScroll handles scroll locking
      window.history.pushState({}, '', `/case-studies/${slug}`)
      window.dispatchEvent(new CustomEvent('casestudydialog:check'))
    }
  }

  // Determine dynamic height for masonry layout
  const getMasonryHeight = () => {
    if (!isMasonry)
      return cardHeight || 'h-[280px] sm:h-[360px] md:h-[420px] lg:h-[500px]'

    // Pattern of heights for masonry look on desktop
    const desktopHeights = [
      'lg:h-[350px]',
      'lg:h-[480px]',
      'lg:h-[400px]',
      'lg:h-[520px]',
      'lg:h-[380px]',
    ]
    const tabletHeights = ['md:h-[320px]', 'md:h-[400px]']

    const dH = desktopHeights[masonryIndex % desktopHeights.length]
    const tH = tabletHeights[masonryIndex % tabletHeights.length]

    return cn('h-[280px]', tH, dH)
  }

  return (
    <motion.article
      ref={cardRef}
      className={cn('group flex flex-col', slug && 'cursor-pointer', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      role={slug ? 'button' : undefined}
      tabIndex={slug ? 0 : undefined}
      onKeyDown={(e) => {
        if (slug && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault()
          handleClick()
        }
      }}
      style={
        shouldApplyRecede
          ? {
              scale,
              z,
              filter,
            }
          : undefined
      }
    >
      {/* Card - Responsive height, or flex-1 to fill container when h-full is passed */}
      <div
        className={cn(
          'relative w-full overflow-hidden gpu-accelerate transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]',
          'shadow-md hover:shadow-xl [data-theme="dark"]:shadow-none [data-theme="dark"]:hover:shadow-none',
          // If parent has h-full, use flex-1 to fill; otherwise use explicit heights
          className?.includes('h-full')
            ? 'flex-1 min-h-[200px]'
            : getMasonryHeight()
        )}
      >
        {/* Background Color or Image */}
        <div
          className="absolute inset-0 gpu-accelerate"
          style={{ backgroundColor: imageBg }}
        >
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={title}
              fill
              sizes={
                imageSizes ??
                '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
              }
              priority={imagePriority}
              loading={imagePriority ? 'eager' : 'lazy'}
              fetchPriority={imageFetchPriority}
              className="object-cover"
            />
          )}
        </div>

        {/* Melting Overlay - Matches background for receding effect */}
        {shouldApplyRecede && (
          <motion.div
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
              backgroundColor: 'rgb(var(--color-background))',
              opacity: overlayOpacity,
            }}
          />
        )}

        {/* Overlay - Appears on Hover - CSS transition for performance */}
        <div
          className={cn(
            'project-card-overlay absolute inset-0 z-10 transition-opacity duration-250',
            isHovered ? 'opacity-100' : 'opacity-0'
          )}
        />
      </div>

      {/* Title and Info - Outside the card, below it */}
      <div className="mt-4 space-y-1 sm:mt-6">
        {/* Organization (Company Name) */}
        <p
          className="text-[16px] font-semibold md:text-[18px]"
          style={{ color: 'rgb(var(--color-text-secondary))' }}
        >
          {organization}
        </p>

        {/* Project Title */}
        <h3
          className={cn(
            'font-bold leading-tight text-foreground max-w-none sm:max-w-[85%]',
            variant === 'compact'
              ? 'text-[20px] sm:text-xl lg:text-[1.75rem]'
              : 'text-[20px] sm:text-2xl lg:text-[1.75rem]'
          )}
        >
          {title}
        </h3>

        {/* Tags and Year */}
        <div className="flex flex-wrap items-center gap-x-2 pt-3">
          <span
            className="font-sans font-medium tracking-normal text-[14px] md:text-[18px]"
            style={{ color: 'rgb(var(--color-text-tertiary))' }}
          >
            {(() => {
              const displayTags = (_tags || [])
                .filter((tag) => tag !== 'Selected Work')
                .slice(0, 3)

              if (displayTags.length > 0) {
                return `${displayTags.join(' / ')} / ${year}`
              }
              return year
            })()}
          </span>
        </div>
      </div>
    </motion.article>
  )
}
