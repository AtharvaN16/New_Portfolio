'use client'

import { motion } from 'framer-motion'
import { ProjectCard, type ProjectCardProps } from './ProjectCard'
import { cn } from '@/lib/utils/cn'
import { getFeaturedCaseStudies } from '@/lib/data/case-studies'
import { AnimatedArrow } from '@/components/ui/AnimatedArrow'
import { useArrowAnimation } from '@/hooks/use-arrow-animation'

interface SelectedWorkProps {
  projects?: ProjectCardProps[]
  className?: string
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
const defaultProjects: ProjectCardProps[] = getFeaturedCaseStudies()
  .slice(0, 4)
  .map((study, index) => ({
    title: study.title,
    organization: study.organization,
    year: study.year,
    description: study.description,
    tags: study.tags,
    imageBg: study.imageBg,
    imageUrl: study.imageUrl,
    slug: study.slug,
    cardHeight: cardConfig[index].height,
  }))

export function SelectedWork({
  projects = defaultProjects,
  className,
}: SelectedWorkProps) {
  const {
    isAnimating,
    animationCycle,
    showFirstArrow,
    handleMouseEnter,
    handleMouseLeave,
  } = useArrowAnimation()

  return (
    <section className={cn('w-full bg-background pb-0', className)}>
      {/* Section Title - Seamless reveal with no top padding */}
      <h2 className="mt-8 mb-12 text-xl font-bold tracking-[-0.05em] text-foreground sm:mt-10 sm:mb-16 sm:text-2xl md:mt-12 md:mb-20 md:text-3xl lg:mt-[60px] lg:mb-28 lg:text-4xl xl:mt-[72px] xl:mb-[140px] xl:text-[56px]">
        Selected work
      </h2>

      {/* Mobile/Tablet: Single column stack */}
      <div className="flex flex-col gap-8 lg:hidden">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>

      {/* Desktop (lg+): 12-column Bento Grid for art-directed layout */}
      <div
        className="hidden lg:grid gap-6"
        style={{
          gridTemplateColumns: 'repeat(12, 1fr)',
          gridAutoRows: '60px', // Base row height - cards span multiple rows
        }}
      >
        {projects.map((project, index) => {
          const config = cardConfig[index]
          return (
            <div
              key={index}
              style={{
                gridColumn: `${config.colStart} / span ${config.colSpan}`,
                gridRow: `${config.rowStart} / span ${config.rowSpan}`,
              }}
            >
              <ProjectCard {...project} className="h-full" />
            </div>
          )
        })}
      </div>

      {/* Show More Work Link */}
      <div className="mt-28 mb-0 md:mt-36 lg:mt-48 flex justify-end">
        <motion.button
          onClick={() => {
            // Change URL and trigger dialog - RemoveScroll handles scroll locking
            window.history.pushState({}, '', '/work')
            window.dispatchEvent(new CustomEvent('workdialog:check'))
          }}
          onMouseEnter={handleMouseEnter}
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
        </motion.button>
      </div>
    </section>
  )
}
