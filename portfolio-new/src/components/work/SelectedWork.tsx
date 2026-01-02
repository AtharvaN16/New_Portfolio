'use client'

import { motion } from 'framer-motion'
import Masonry from 'react-masonry-css'
import { ProjectCard, type ProjectCardProps } from './ProjectCard'
import { cn } from '@/lib/utils/cn'
import { getFeaturedCaseStudies } from '@/lib/data/case-studies'
import { AnimatedArrow } from '@/components/ui/AnimatedArrow'
import { useArrowAnimation } from '@/hooks/use-arrow-animation'

interface SelectedWorkProps {
  projects?: ProjectCardProps[]
  className?: string
}

// Get featured case studies and map to ProjectCardProps with custom heights for offset layout
const defaultProjects: ProjectCardProps[] = getFeaturedCaseStudies()
  .slice(0, 4)
  .map((study, index) => {
    // Define custom heights for each card to create masonry effect
    const heights = [
      'h-[280px] sm:h-[340px] md:h-[400px] lg:h-[480px]', // Card 1: Medium
      'h-[320px] sm:h-[400px] md:h-[480px] lg:h-[580px]', // Card 2: Tall
      'h-[300px] sm:h-[380px] md:h-[460px] lg:h-[560px]', // Card 3: Medium-tall
      'h-[260px] sm:h-[320px] md:h-[380px] lg:h-[460px]', // Card 4: Short
    ]

    return {
      title: study.title,
      organization: study.organization,
      year: study.year,
      description: study.description,
      tags: study.tags,
      imageBg: study.imageBg,
      imageUrl: study.imageUrl,
      slug: study.slug,
      cardHeight: heights[index],
    }
  })

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

  // Masonry breakpoint configuration: 1 column on mobile, 2 columns on desktop
  // react-masonry-css uses max-width breakpoints (viewport <= breakpoint uses that column count)
  const breakpointColumnsObj = {
    default: 2, // 2 columns for viewport > 767px (desktop)
    767: 1, // 1 column for viewport <= 767px (mobile/tablet, matches Tailwind md:768px)
  }

  return (
    <section className={cn('w-full bg-background pb-0', className)}>
      {/* Section Title - Seamless reveal with no top padding */}
      <h2 className="mb-8 text-5xl font-bold tracking-tight text-foreground md:mb-12 md:text-6xl lg:text-7xl">
        Selected Work
      </h2>

      {/* Projects Masonry - Automatic staggered layout with equal column gaps */}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex -ml-6" // Negative left margin to offset column margins
        columnClassName="pl-6 flex flex-col gap-6" // Left padding creates horizontal gap, gap-6 creates vertical gap
      >
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </Masonry>

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
          className="group inline-flex items-center gap-[16px] text-[28px] font-bold tracking-tight text-foreground transition-colors hover:text-primary md:gap-[18px] md:text-[34px] lg:gap-[20px] lg:text-[40px]"
        >
          See More Work
          <AnimatedArrow
            isAnimating={isAnimating}
            showFirstArrow={showFirstArrow}
            animationCycle={animationCycle}
            className="w-[21.6px] h-[21.6px] md:w-[25.2px] md:h-[25.2px] lg:w-[28.8px] lg:h-[28.8px]"
          />
        </motion.button>
      </div>
    </section>
  )
}
