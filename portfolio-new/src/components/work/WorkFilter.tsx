'use client'

import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ProjectCard, type ProjectCardProps } from './ProjectCard'
import { MasonryGrid } from './MasonryGrid'
import { cn } from '@/lib/utils/cn'

interface WorkFilterProps {
  projects: ProjectCardProps[]
  selectedFilter?: string
  onFilterChange?: (filter: string) => void
  className?: string
}

export function WorkFilter({
  projects,
  selectedFilter: controlledFilter,
  onFilterChange,
  className,
}: WorkFilterProps) {
  // Use controlled filter if provided, otherwise use internal state
  const [internalFilter, setInternalFilter] = useState<string>('All')
  const selectedFilter = controlledFilter ?? internalFilter
  const setSelectedFilter = onFilterChange ?? setInternalFilter

  // Define custom filter options to match design
  const filterOptions = useMemo(() => {
    const tagCounts = new Map<string, number>()

    projects.forEach((project) => {
      project.tags?.forEach((tag) => {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1)
      })
    })

    // Return specific filters in order
    return [
      { tag: 'All', count: projects.length },
      { tag: 'Selected Work', count: tagCounts.get('Selected Work') || 0 },
      {
        tag: 'Usability Testing',
        count: tagCounts.get('Usability Testing') || 0,
      },
      { tag: 'Client Project', count: tagCounts.get('Client Project') || 0 },
      { tag: 'Explorations', count: tagCounts.get('Explorations') || 0 },
    ]
  }, [projects])

  // Filter projects based on selected tag
  const filteredProjects = useMemo(() => {
    if (selectedFilter === 'All') {
      return projects
    }
    return projects.filter((project) => project.tags?.includes(selectedFilter))
  }, [projects, selectedFilter])

  return (
    <div className={cn('w-full', className)}>
      {/* Filter Tabs */}
      <div className="mb-24 lg:mb-36">
        <div className="flex flex-wrap items-center gap-4 md:gap-6">
          {filterOptions.map(({ tag, count }, index) => {
            const isSelected = selectedFilter === tag
            const isDisabled = count === 0

            return (
              <React.Fragment key={tag}>
                <button
                  onClick={() => count > 0 && setSelectedFilter(tag)}
                  disabled={isDisabled}
                  className={cn(
                    'group flex items-start gap-2 transition-all duration-300',
                    {
                      'text-foreground opacity-100': isSelected && !isDisabled,
                      'text-foreground opacity-40 hover:opacity-70': !isSelected && !isDisabled,
                      'cursor-not-allowed opacity-20': isDisabled,
                    }
                  )}
                >
                  <span className={cn(
                    "font-sans text-[14px] lg:text-[16px] 2xl:text-[18px] leading-tight transition-all",
                    isSelected ? "font-bold" : "font-medium"
                  )}>
                    {tag}
                  </span>
                  <span className={cn(
                    "font-sans text-[10px] lg:text-[12px] 2xl:text-[14px] leading-tight transition-all",
                    isSelected ? "font-bold" : "font-medium"
                  )}>
                    {count}
                  </span>
                </button>
                {/* Add separator after "All" */}
                {index === 0 && (
                  <span
                    className="text-foreground opacity-20"
                    aria-hidden="true"
                  >
                    |
                  </span>
                )}
              </React.Fragment>
            )
          })}
        </div>
      </div>

      {/* Projects Grid */}
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

      {/* Empty State */}
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
