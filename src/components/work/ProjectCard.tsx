'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import Image from 'next/image'
import {
  m,
  useMotionValueEvent,
  useMotionValue,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { CASE_STUDY_RETURN_PATH_KEY } from '@/lib/case-study-overlay'
import {
  getEditorialTextClasses,
  type CardAlign,
  type CardSize,
} from '@/lib/project-card-layout'
import { cn } from '@/lib/utils/cn'
import { useBreakpoint } from '@/hooks/use-responsive'

export interface ProjectCardProps {
  title: string
  organization: string
  year: string
  description: string
  tags: string[]
  themeColor: string
  imageUrl?: string // Optional project image
  thumbnailUrl?: string // Optional landscape card thumbnail; falls back to imageUrl
  videoUrl?: string // Optional looping background video; takes priority over image
  imageSizes?: string
  imagePriority?: boolean
  imageFetchPriority?: 'high' | 'low' | 'auto'
  variant?: 'default' | 'compact' | 'sub-case' // default for 2-grid, compact for 3-grid, sub-case for inline mini case studies
  className?: string
  slug?: string // Optional slug for linking to case study page
  cardHeight?: string // Optional custom height (e.g., 'h-[400px] md:h-[500px]')
  readTime?: string // Only used by sub-case variant
  glowColor?: string // Glow color for sub-case hover effect (e.g. '#3183CB')
  anchorId?: string // Scroll-to anchor id; used by sub-case cards instead of slug navigation
  recedeEffect?: 'none' | 'homeDesktop'
  homeScrollProgress?: MotionValue<number>
  isMasonry?: boolean
  masonryIndex?: number
  heroImageFill?: boolean // Fill the full card height; use for portrait/non-16:9 heroes
  cardSize?: CardSize // Editorial width preset — triggers unified 16:9 thumbnail
  cardAlign?: CardAlign // Horizontal alignment in scattered layouts (applied by parent)
}

export function ProjectCard({
  title,
  organization,
  year,
  description,
  tags: _tags,
  themeColor,
  imageUrl,
  imageSizes,
  imagePriority = false,
  imageFetchPriority,
  variant = 'default',
  className,
  slug,
  cardHeight,
  recedeEffect = 'none',
  homeScrollProgress,
  isMasonry = false,
  masonryIndex = 0,
  readTime,
  glowColor = 'rgb(var(--color-primary))',
  heroImageFill = false,
  thumbnailUrl,
  videoUrl,
  anchorId,
  cardSize,
  cardAlign: _cardAlign,
}: ProjectCardProps) {
  // For card rendering, always prefer the dedicated landscape thumbnail when provided
  const cardImageUrl = thumbnailUrl ?? imageUrl
  const isEditorial = cardSize !== undefined
  const editorialText = isEditorial ? getEditorialTextClasses(cardSize) : null
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

  useMotionValueEvent(homeScrollProgress ?? edgeProgress, 'change', () => {
    if (shouldApplyRecede && homeScrollProgress) {
      updateEdgeProgress()
    }
  })

  useEffect(() => {
    if (!shouldApplyRecede || !homeScrollProgress) {
      edgeProgress.set(0)
      return
    }

    updateEdgeProgress()

    const handleResize = () => updateEdgeProgress()
    window.addEventListener('resize', handleResize, { passive: true })

    const card = cardRef.current
    let resizeObserver: ResizeObserver | undefined
    if (card && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(handleResize)
      resizeObserver.observe(card)
    }

    return () => {
      window.removeEventListener('resize', handleResize)
      resizeObserver?.disconnect()
    }
  }, [shouldApplyRecede, homeScrollProgress, updateEdgeProgress, edgeProgress])

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
    if (anchorId) {
      document.getElementById(anchorId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }
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

  const getMasonryHeight = () => {
    if (!isMasonry)
      return cardHeight || 'h-[280px] sm:h-[360px] md:h-[420px] lg:h-[500px]'

    // Subtle height variance — stays close to 4:3 at typical 2-col widths
    const desktopHeights = [
      'lg:h-[380px]',
      'lg:h-[420px]',
      'lg:h-[400px]',
      'lg:h-[440px]',
      'lg:h-[390px]',
    ]
    const tabletHeights = ['md:h-[340px]', 'md:h-[380px]']
    return cn(
      'h-[300px]',
      tabletHeights[masonryIndex % tabletHeights.length],
      desktopHeights[masonryIndex % desktopHeights.length]
    )
  }

  return (
    <m.article
      ref={cardRef}
      className={cn('group flex flex-col', (slug || anchorId) && 'cursor-pointer', className)}
      onMouseEnter={() => {
        if (isDesktop) setIsHovered(true)
        if (slug) {
          window.dispatchEvent(new CustomEvent('casestudydialog:preload'))
        }
      }}
      onPointerDown={() => {
        if (slug) {
          window.dispatchEvent(new CustomEvent('casestudydialog:preload'))
        }
      }}
      onMouseLeave={() => { if (isDesktop) setIsHovered(false) }}
      onClick={handleClick}
      aria-label={slug ? `View ${title} case study` : undefined}
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
      <div
        className={cn(
          // no translateZ here — gpu-accelerate on image ancestors can soften raster content
          'relative w-full overflow-hidden transition-[box-shadow] duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]',
          variant === 'sub-case'
            ? 'aspect-[4/3]'
            : cn(
                'shadow-md lg:hover:shadow-xl [data-theme="dark"]:shadow-none',
                isEditorial
                  ? 'aspect-[16/9]'
                  : isMasonry
                    ? cn('flex items-center justify-center', getMasonryHeight())
                    : className?.includes('h-full')
                      ? 'flex-1 min-h-[200px]'
                      : cn(
                          'aspect-[16/9] lg:aspect-auto',
                          (cardHeight ?? 'h-[280px] sm:h-[360px] md:h-[420px] lg:h-[500px]')
                            .split(' ')
                            .filter((c) => /^(lg:|xl:|2xl:)/.test(c))
                            .join(' ')
                        )
              )
        )}
      >
        {/* Base: themeColor for non-image cards; neutral dark for masonry+image (blurred layer provides color) */}
        <div
          className="absolute inset-0 z-0"
          style={{ backgroundColor: variant === 'sub-case' ? themeColor : (isMasonry && cardImageUrl ? '#111' : themeColor) }}
        />

        {/* Frosted bars — blurred image provides image-matched color in the bar regions */}
        {cardImageUrl && isMasonry && variant !== 'sub-case' && (
          <Image
            src={cardImageUrl}
            alt=""
            fill
            aria-hidden
            sizes={imageSizes ?? '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'}
            priority={imagePriority}
            loading={imagePriority ? 'eager' : 'lazy'}
            quality={60}
            className="object-cover scale-125 blur-2xl z-0"
          />
        )}

        {/* 10% tint overlay for sub-case */}
        {variant === 'sub-case' && (
          <div className="absolute inset-0 z-10 pointer-events-none [data-theme='dark']:bg-black/10 [data-theme='light']:bg-white/10" />
        )}

        {/* Main image */}
        {cardImageUrl && (
          variant === 'sub-case' ? (
            <m.div
              className="absolute w-[70%] left-1/2 -translate-x-1/2 z-20"
              style={{ top: '35%' }}
              animate={{ y: isHovered ? -32 : 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Glow behind the image */}
              <m.div
                className="absolute inset-[-25%] -z-10 rounded-full blur-3xl"
                style={{ backgroundColor: glowColor }}
                animate={{ opacity: isHovered ? 0.45 : 0 }}
                transition={{ duration: 0.4 }}
              />
              <Image
                src={cardImageUrl}
                alt={title}
                width={0}
                height={0}
                sizes={imageSizes ?? '(max-width: 768px) 75vw, (max-width: 1024px) 38vw, 28vw'}
                priority={imagePriority}
                loading={imagePriority ? 'eager' : 'lazy'}
                fetchPriority={imageFetchPriority}
                quality={92}
                className="w-full h-auto shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] lg:group-hover:scale-[1.04]"
              />
            </m.div>
          ) : isMasonry ? (
            // 4:3 hero: constrain to ratio so blurred background bars show as intended
            <div className="relative w-full aspect-[4/3] z-10 shrink-0 overflow-hidden">
              <Image
                src={cardImageUrl}
                alt={title}
                fill
                sizes={imageSizes ?? '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'}
                priority={imagePriority}
                loading={imagePriority ? 'eager' : 'lazy'}
                fetchPriority={imageFetchPriority}
                quality={92}
                className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] lg:group-hover:scale-[1.04]"
              />
            </div>
          ) : videoUrl ? (
            <video
              src={videoUrl}
              poster={cardImageUrl}
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] lg:group-hover:scale-[1.04]"
            />
          ) : (
            <Image
              src={cardImageUrl}
              alt={title}
              fill
              sizes={imageSizes ?? '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'}
              priority={imagePriority}
              loading={imagePriority ? 'eager' : 'lazy'}
              fetchPriority={imageFetchPriority}
              quality={isDesktop ? 92 : 75}
              className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] lg:group-hover:scale-[1.04]"
            />
          )
        )}

        {/* Melting Overlay - Matches background for receding effect */}
        {shouldApplyRecede && (
          <m.div
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
              backgroundColor: 'rgb(var(--color-background))',
              opacity: overlayOpacity,
            }}
          />
        )}
      </div>

      {/* Title and Info - Outside the card, below it */}
      <div className={cn('mt-3', !isMasonry && 'sm:mt-6 space-y-1')}>
        {variant === 'sub-case' ? (
          <h3 className="font-bold leading-tight text-foreground text-[18px] lg:text-[20px]">
            {title}
          </h3>
        ) : isMasonry ? (
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="min-w-0 font-medium leading-snug text-foreground text-[15px] sm:text-[16px] lg:text-[17px]">
              {title}
            </h3>
            <p
              className="shrink-0 text-right text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.06em] leading-tight max-w-[45%]"
              style={{ color: 'rgb(var(--color-text-tertiary))' }}
            >
              {[organization, ...(_tags || []).filter((tag) => tag !== 'Selected Work' && tag !== year).slice(0, 1), year]
                .filter(Boolean)
                .join(' • ')}
            </p>
          </div>
        ) : (
          <>
            {(organization || year) && (
              <p
                className={cn(
                  'font-semibold',
                  editorialText?.org ?? 'text-[14px] md:text-[18px]'
                )}
                style={{ color: 'rgb(var(--color-text-secondary))' }}
              >
                {organization ? `${organization} — ${year}` : year}
              </p>
            )}

            <h3
              className={cn(
                'font-bold leading-tight text-foreground max-w-none sm:max-w-[85%]',
                editorialText?.title ??
                  (variant === 'compact'
                    ? 'text-[18px] sm:text-xl lg:text-[1.75rem]'
                    : 'text-[18px] sm:text-2xl lg:text-[1.75rem]')
              )}
            >
              {title}
            </h3>

            <div className="flex flex-wrap items-center gap-x-2 pt-3">
              <span
                className={cn(
                  'font-sans font-medium tracking-normal',
                  editorialText?.tags ?? 'text-[12px] md:text-[18px]'
                )}
                style={{ color: 'rgb(var(--color-text-tertiary))' }}
              >
                {(_tags || [])
                  .filter((tag) => tag !== 'Selected Work' && tag !== year)
                  .slice(0, 3)
                  .join(' / ')}
              </span>
            </div>
          </>
        )}
      </div>
    </m.article>
  )
}
