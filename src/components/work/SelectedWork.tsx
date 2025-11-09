'use client'

import { ProjectCard, type ProjectCardProps } from './ProjectCard'
import { cn } from '@/lib/utils/cn'

interface SelectedWorkProps {
  projects?: ProjectCardProps[]
  className?: string
}

const defaultProjects: ProjectCardProps[] = [
  {
    title: 'Improving Usability of Library Website',
    organization: 'University of Alberta',
    year: '2024',
    description:
      'A comprehensive UX redesign of the university library website, focusing on improving navigation, search functionality, and overall user experience for students and faculty.',
    tags: ['UX Research', 'UI Design', 'Prototyping'],
    imageBg: '#90EE90', // Light green
  },
  {
    title: 'Usability study on free tours page MET',
    organization: 'Class Project',
    year: '2024',
    description:
      "An in-depth usability study of the Metropolitan Museum of Art's free tours page, identifying key pain points and providing actionable recommendations to enhance visitor experience.",
    tags: ['Usability Study', 'Design'],
    imageBg: '#CD5C5C', // Coral/Indian red
  },
]

export function SelectedWork({ projects = defaultProjects, className }: SelectedWorkProps) {
  return (
    <section className={cn('w-full bg-background pb-20 pt-8 md:pb-32 md:pt-12', className)}>
      {/* Section Title */}
      <h2 className="mb-12 text-5xl font-bold tracking-tight text-foreground md:mb-16 md:text-6xl lg:text-7xl">
        Selected Work
      </h2>

      {/* Projects Grid - gap matches page margin (px-6 = gap-6) */}
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </section>
  )
}
