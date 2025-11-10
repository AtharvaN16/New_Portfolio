'use client'

import React, { useState, useMemo } from 'react'
import { ProjectCard, type ProjectCardProps } from './ProjectCard'
import { cn } from '@/lib/utils/cn'

interface WorkFilterProps {
  projects: ProjectCardProps[]
  className?: string
}

export function WorkFilter({ projects, className }: WorkFilterProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('All')

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
      <div className="mb-12">
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
                    'group flex items-start gap-2 text-foreground transition-all',
                    {
                      'opacity-100': isSelected && !isDisabled,
                      'opacity-40 hover:opacity-80': !isSelected && !isDisabled,
                      'cursor-not-allowed opacity-20': isDisabled,
                    }
                  )}
                >
                  <span className="text-[1.125rem] font-medium leading-tight">
                    {tag}
                  </span>
                  <span className="text-xs leading-tight">{count}</span>
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
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={index} {...project} variant="compact" />
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-lg text-muted-foreground">
            No projects found with this filter.
          </p>
        </div>
      )}
    </div>
  )
}
