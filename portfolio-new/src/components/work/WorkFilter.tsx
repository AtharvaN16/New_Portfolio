'use client'

import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ProjectCard, type ProjectCardProps } from './ProjectCard'
import { MasonryGrid } from './MasonryGrid'
import { cn } from '@/lib/utils/cn'
import { LineSeparator } from '@/components/ui/LineSeparator'
import { useAccessibility } from '@/components/providers/AccessibilityProvider'

interface WorkFilterProps {
  projects: ProjectCardProps[]
  selectedFilter?: string
  onFilterChange?: (filter: string) => void
  className?: string
  hasChangedFilter?: boolean
}

// Map filter tags to display titles (Keys must match EXACT tags in case-studies.ts)
const filterTitleMap: Record<string, string> = {
  All: 'All Work',
  'Selected Work': 'Selected Work',
  'Usability Testing': 'Usability Testing',
  'Client Project': 'Client Projects',
  Explorations: 'Explorations',
  'Eye Tracking': 'Eye Tracking',
  'Service design': 'Service Design',
}

/**
 * FilterTitleItem - Individual filter rendered as an animated title
 */
function FilterTitleItem({
  text,
  isSelected,
  onClick,
  count,
  wordVariants,
  onMouseEnter,
  onMouseLeave,
  isHovered,
}: {
  text: string
  isSelected: boolean
  onClick: () => void
  count: number
  wordVariants: any
  onMouseEnter: () => void
  onMouseLeave: () => void
  isHovered: boolean
}) {
  return (
    <button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="group relative flex items-start gap-1 text-left outline-none"
    >
      <span
        className="text-[18px] lg:text-[36px] 2xl:text-[42px] font-bold leading-[1.1] tracking-tight flex flex-wrap"
        style={{
          color: isSelected
            ? 'rgb(var(--color-foreground))'
            : isHovered
              ? 'rgb(var(--color-text-color70))'
              : 'rgb(var(--color-text-color40))'
        }}
      >
        {text.split(' ').map((word, i) => (
          <motion.span
            key={`${text}-${word}-${i}`}
            variants={wordVariants}
            className="inline-block mr-[0.25em]"
          >
            {word}
          </motion.span>
        ))}
        {/* Count Badge - also animates with words */}
        <motion.span
          variants={wordVariants}
          className="text-[10px] lg:text-[18px] 2xl:text-[20px] font-medium opacity-50 mt-1"
          style={{ color: 'inherit' }}
        >
          {count}
        </motion.span>
      </span>
    </button>
  )
}

export function WorkFilter({
  projects,
  selectedFilter: controlledFilter,
  onFilterChange,
  className,
  hasChangedFilter = false,
}: WorkFilterProps) {
  const { reducedMotion: prefersReducedMotion, pauseWebGL } = useAccessibility()
  const shouldPause = prefersReducedMotion || pauseWebGL
  
  const [internalFilter, setInternalFilter] = useState<string>('All')
  const [hoveredFilter, setHoveredFilter] = useState<string | null>(null)
  
  const selectedFilter = controlledFilter ?? internalFilter
  const setSelectedFilter = onFilterChange ?? setInternalFilter

  const filterOptions = useMemo(() => {
    const tagCounts = new Map<string, number>()
    projects.forEach((project) => {
      project.tags?.forEach((tag) => {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1)
      })
    })

    return [
      { tag: 'All', count: projects.length },
      { tag: 'Selected Work', count: tagCounts.get('Selected Work') || 0 },
      { tag: 'Usability Testing', count: tagCounts.get('Usability Testing') || 0 },
      { tag: 'Client Project', count: tagCounts.get('Client Project') || 0 },
      { tag: 'Explorations', count: tagCounts.get('Explorations') || 0 },
      { tag: 'Eye Tracking', count: tagCounts.get('Eye Tracking') || 0 },
      { tag: 'Service design', count: tagCounts.get('Service design') || 0 },
    ]
  }, [projects])

  const filteredProjects = useMemo(() => {
    if (selectedFilter === 'All') return projects
    return projects.filter((project) => project.tags?.includes(selectedFilter))
  }, [projects, selectedFilter])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldPause ? 0 : 0.04,
        delayChildren: shouldPause ? 0 : (hasChangedFilter ? 0 : 0.9),
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: shouldPause ? 0 : 0.5,
      },
    },
  }

  return (
    <div className={cn('w-full', className)}>
      <div className="mb-14 lg:mb-20">
        <motion.div 
          className="flex flex-col gap-6 lg:gap-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-wrap items-center gap-x-2 lg:gap-x-4 gap-y-2 lg:gap-y-2 max-w-[95%] lg:max-w-[60%]">
            {filterOptions.map((opt, index) => (              <React.Fragment key={opt.tag}>
                <FilterTitleItem
                  text={filterTitleMap[opt.tag] || opt.tag}
                  count={opt.count}
                  isSelected={selectedFilter === opt.tag}
                  isHovered={hoveredFilter === opt.tag}
                  onMouseEnter={() => setHoveredFilter(opt.tag)}
                  onMouseLeave={() => setHoveredFilter(null)}
                  onClick={() => opt.count > 0 && setSelectedFilter(opt.tag)}
                  wordVariants={itemVariants}
                />
                
                {/* Slash Separator - Animated in sequence */}
                {index < filterOptions.length - 1 && (
                  <motion.span 
                    variants={itemVariants}
                    className="text-[14px] lg:text-[28px] 2xl:text-[34px] font-medium opacity-20 mx-0.5" 
                    style={{ color: 'rgb(var(--color-text-color40))' }} 
                    aria-hidden="true" 
                  >
                    /
                  </motion.span>
                )}
              </React.Fragment>
            ))}
          </div>

          <LineSeparator
            className="opacity-50"
            delay={hasChangedFilter ? 0 : 0.2}
          />
        </motion.div>
      </div>

      <MasonryGrid
        items={filteredProjects}
        gap={24}
        renderItem={(project, index) => (
          <motion.div
            key={`${project.title}-${project.organization}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                delay: (index % 3) * 0.1,
                ease: [0.22, 1, 0.36, 1],
              },
            }}
            viewport={{ once: true, margin: '-50px' }}
          >
            <ProjectCard
              {...project}
              variant="compact"
              isMasonry
              masonryIndex={index}
              imagePriority={index < 3}
              imageSizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </motion.div>
        )}
      />

      {filteredProjects.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-lg text-text-tertiary">
            No projects found with this filter.
          </p>
        </div>
      )}
    </div>
  )
}
