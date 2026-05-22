'use client'

import {
  m,
  type MotionValue,
  useTransform,
  useMotionValue,
} from 'framer-motion'
import { useState, useEffect } from 'react'
import { ProjectCard, type ProjectCardProps } from './ProjectCard'
import { cn } from '@/lib/utils/cn'
import { getFeaturedCaseStudies } from '@/lib/data/case-studies'
import { AnimatedArrow } from '@/components/ui/AnimatedArrow'
import { useArrowAnimation } from '@/hooks/use-arrow-animation'
import { useBreakpoints } from '@/hooks/use-responsive'

interface SelectedWorkProps {
  projects?: ProjectCardProps[]
  className?: string
  enableHomeCardRecede?: boolean
  homeScrollProgress?: MotionValue<number>
  desktopSpacingScale?: number
}

/**
 * BENTO GRID CARD CONFIGURATION
 * =============================
 * Uses a 12-column CSS Grid for precise art-directed layouts.
 *
 * GRID PLACEMENT (desktop only):
 *   - colSpan: How many columns the card spans (1-12)
 *   - colStart: Which column to start at (1-12)
 *   - rowSpan: How many rows the card spans
 *   - rowStart: Which row to start at
 *
 * HEIGHT: Card height (affects row size on mobile)
 *   - Format: 'h-[mobile] sm:h-[tablet] lg:h-[desktop]'
 *
 * The 12-column grid gives fine control:
 *   - colSpan: 5 = ~42% width, colSpan: 6 = 50%, colSpan: 7 = ~58%
 *   - colStart: 1 = left aligned, colStart: 6 = right half, etc.
 *
 * Images/videos automatically resize via CSS `object-cover` in ProjectCard
 */
const cardConfig = [
  {
    // Card 1: Top-left, narrower
    colSpan: 5,
    colStart: 1,
    rowSpan: 7,
    rowStart: 1,
    height: 'h-[280px] sm:h-[320px] lg:h-auto',
  },
  {
    // Card 2: Right side, wider, starts lower (row 5)
    colSpan: 8,
    colStart: 7,
    rowSpan: 8,
    rowStart: 5,
    height: 'h-[300px] sm:h-[360px] lg:h-auto',
  },
  {
    // Card 3: Left side, wider, below card 1
    colSpan: 6,
    colStart: 1,
    rowSpan: 7,
    rowStart: 14,
    height: 'h-[280px] sm:h-[340px] lg:h-auto',
  },
  {
    // Card 4: Right side, wider and taller
    colSpan: 9,
    colStart: 6,
    rowSpan: 8,
    rowStart: 22,
    height: 'h-[350px] sm:h-[420px] lg:h-auto',
  },
]

// Get featured case studies and map to ProjectCardProps with custom layout config
const featuredStudies = getFeaturedCaseStudies()

// Define the projects manually to ensure exact ordering and content as requested
const defaultProjects: ProjectCardProps[] = [
  // Card 1 (UofA)
  {
    ...featuredStudies.find((s) => s.slug === 'ualberta-library-website')!,
    cardHeight: cardConfig[0].height,
  },
  // Card 2 (NYC DCWP stays here)
  {
    ...featuredStudies.find((s) => s.slug === 'nyc-dcwp-business-licenses')!,
    cardHeight: cardConfig[1].height,
  },
  // Card 3 (Pratt Institute Visitor Experience)
  {
    ...featuredStudies.find((s) => s.slug === 'pratt-institute-visitor-experience')!,
    cardHeight: cardConfig[2].height,
  },
  // Card 4 (Gutenberg stays here)
  {
    ...featuredStudies.find((s) => s.slug === 'gutenberg-cms-usability-evaluation')!,
    cardHeight: cardConfig[3].height,
  },
]

export function SelectedWork({
  projects = defaultProjects,
  className,
  enableHomeCardRecede = false,
  homeScrollProgress,
  desktopSpacingScale = 1,
}: SelectedWorkProps) {
  const {
    isAnimating,
    animationCycle,
    showFirstArrow,
    handleMouseEnter,
    handleMouseLeave,
  } = useArrowAnimation()

  const { isDesktop } = useBreakpoints()

  // Track if user has scrolled past the initial cards
  const [hasScrolledPast, setHasScrolledPast] = useState(false)

  // Title animation driven by scroll progress
  // Reveal starts when FullpageCard is almost fully moved up (between 0.44 and 0.5 progress)
  const defaultProgress = useMotionValue(1)
  const progress = homeScrollProgress || defaultProgress

  const titleOpacity = useTransform(progress, [0.44, 0.5], [0, 1])
  const titleY = useTransform(progress, [0.44, 0.5], [20, 0])

  useEffect(() => {
    if (!isDesktop) return // Disable scroll listener on mobile for performance

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // If user has scrolled down past 800px (roughly past card 1 and 2), enable animations
      if (currentScrollY > 800 && !hasScrolledPast) {
        setHasScrolledPast(true)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hasScrolledPast, isDesktop])

  return (
    <section 
      className={cn('w-full bg-background pb-0', className)}
      style={{ 
        contentVisibility: 'auto',
        containIntrinsicSize: '0 2000px', // Provides an estimated height for the browser to reduce layout shifts
      } as React.CSSProperties}
    >
      {/* Section Title */}
      {isDesktop ? (
        <m.h2
          className="mt-8 mb-14 text-xl font-bold tracking-[-0.05em] sm:mt-10 sm:mb-16 sm:text-2xl md:mt-12 md:mb-20 md:text-3xl lg:mt-[60px] lg:mb-28 lg:text-4xl xl:mt-[72px] xl:mb-[140px] xl:text-[56px]"
          style={{
            color: 'rgb(var(--color-foreground))',
            opacity: titleOpacity,
            y: titleY,
            willChange: 'opacity, transform',
          }}
        >
          Selected work
        </m.h2>
      ) : (
        <h2 className="mt-8 mb-14 text-3xl font-bold tracking-[-0.05em] sm:mt-10 sm:mb-16 md:text-2xl text-foreground">
          Selected work
        </h2>
      )}

      {/* Mobile/Tablet: Single column stack - Optimized for 0 jitter */}
      <div className="flex flex-col gap-12 lg:hidden">
        {projects.map((project, index) => (
          <div
            key={`${project.title}-${project.organization}`}
            className="opacity-100 transform-none" // Direct reveal on mobile
          >
            <ProjectCard
              {...project}
              imageSizes="(max-width: 1024px) 100vw, 75vw"
              imageFetchPriority="low"
            />
          </div>
        ))}
      </div>

      {/* Desktop (lg+): 12-column Bento Grid for art-directed layout */}
      <div
        className="hidden lg:grid gap-6"
        style={{
          gridTemplateColumns: 'repeat(12, 1fr)',
          gridAutoRows: '60px', // Base row height - cards span multiple rows
          perspective: '1200px',
          transformStyle: 'preserve-3d',
        }}
      >
        {projects.map((project, index) => {
          const config = cardConfig[index]
          const scaledRowStart = Math.max(
            1,
            Math.round(1 + (config.rowStart - 1) * desktopSpacingScale)
          )
          const isCard3or4 = index === 2 || index === 3 || index === 4
          const isCard1or2 = index === 0 || index === 1

          return (
            <m.div
              key={index}
              className="gpu-accelerate"
              style={{
                gridColumn: `${config.colStart} / span ${config.colSpan}`,
                gridRow: `${scaledRowStart} / span ${config.rowSpan}`,
              }}
              initial={
                isCard3or4
                  ? { opacity: 0 }
                  : isCard1or2 && hasScrolledPast
                    ? { opacity: 0 }
                    : undefined
              }
              whileInView={
                isCard3or4
                  ? { opacity: 1 }
                  : isCard1or2 && hasScrolledPast
                    ? { opacity: 1 }
                    : undefined
              }
              viewport={{ once: false, margin: '-100px' }}
              transition={
                isCard3or4
                  ? {
                      duration: 1.0,
                      delay: index === 2 ? 0 : 0.4,
                      ease: [0.4, 0, 0.2, 1],
                    }
                  : isCard1or2 && hasScrolledPast
                    ? {
                        duration: 0.8,
                        delay: index === 0 ? 0 : 0.2,
                        ease: [0.4, 0, 0.2, 1],
                      }
                    : undefined
              }
            >
              <ProjectCard
                {...project}
                className="h-full"
                imageSizes="(max-width: 1024px) 100vw, 75vw"
                imageFetchPriority="low"
                recedeEffect={enableHomeCardRecede ? 'homeDesktop' : 'none'}
                homeScrollProgress={homeScrollProgress}
              />
            </m.div>
          )
        })}
      </div>

      {/* Show More Work Link */}
      <div className="mt-40 mb-32 md:mt-52 md:mb-40 lg:mt-72 lg:mb-52 flex justify-end">
        <m.button
          onClick={() => {
            // Change URL and trigger dialog - RemoveScroll handles scroll locking
            window.history.pushState({}, '', '/work')
            window.dispatchEvent(new CustomEvent('workdialog:check'))
          }}
          onMouseEnter={() => {
            handleMouseEnter()
            window.dispatchEvent(new CustomEvent('workdialog:preload'))
          }}
          onPointerDown={() => {
            window.dispatchEvent(new CustomEvent('workdialog:preload'))
          }}
          onMouseLeave={handleMouseLeave}
          className="group inline-flex items-center gap-[16px] text-[28px] font-bold tracking-[-0.05em] text-foreground transition-colors hover:text-primary md:gap-[18px] md:text-[34px] lg:gap-[20px] lg:text-[40px]"
        >
          See More Work
          <AnimatedArrow
            isAnimating={isAnimating}
            showFirstArrow={showFirstArrow}
            animationCycle={animationCycle}
            className="w-[22px] h-[22px] md:w-[26px] md:h-[26px] lg:w-[30px] lg:h-[30px]"
          />
        </m.button>
      </div>
    </section>
  )
}
