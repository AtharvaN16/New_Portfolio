'use client'

import { useState, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import { WorkFilter } from '@/components/work/WorkFilter'
import type { ProjectCardProps } from '@/components/work/ProjectCard'
import { AnimatedTitle } from '@/components/ui/AnimatedTitle'
import { GradientBar } from '@/components/ui/GradientBar'
import { LineSeparator } from '@/components/ui/LineSeparator'
import { caseStudies } from '@/lib/data/case-studies'

// Map case studies to ProjectCardProps
const allProjects: ProjectCardProps[] = caseStudies.map((study) => ({
  title: study.title,
  organization: study.organization,
  year: study.year,
  description: study.description,
  tags: study.tags,
  imageBg: study.imageBg,
  imageUrl: study.imageUrl,
  slug: study.slug,
}))

// Map filter names to title texts
const filterTitleMap: Record<string, string> = {
  All: 'Check out more of my work',
  'Selected Work': 'Selected Work',
  'Usability Testing': 'Usability Testing Projects',
  'Client Project': 'Client Projects',
  Explorations: 'Explorations',
  'Service Design': 'Service Design Projects',
  'Design Thinking': 'Design Thinking Projects',
  'UX Research': 'UX Research Projects',
  'UI Design': 'UI Design Projects',
  Prototyping: 'Prototyping Projects',
  Design: 'Design Projects',
}

export default function WorkPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>('All')
  // Track if filter has been changed from initial 'All' state
  // Use ref to avoid unnecessary re-renders
  const hasChangedFilterRef = useRef(false)
  
  // Update ref when filter changes from initial state
  if (selectedFilter !== 'All' && !hasChangedFilterRef.current) {
    hasChangedFilterRef.current = true
  }
  
  const titleText = filterTitleMap[selectedFilter] || 'Check out more of my work'

  const handleBack = () => {
    // Go back in history (this will trigger the dialog to close)
    window.history.back()
  }

  return (
    <div className="min-h-screen w-full bg-background">
      <GradientBar className="fixed left-0 top-0 z-50 w-full" height="h-8" />
      <div className="relative px-6 pb-20 pt-20 md:pb-32 md:pt-24">
        <main id="main-content">
          {/* Back Button - Absolutely positioned on right edge */}
          <button
            onClick={handleBack}
            className="absolute right-6 top-20 text-muted-foreground transition-colors hover:text-foreground md:top-24"
          >
            Back
          </button>

          {/* Page Header */}
          <header className="mb-4 lg:mb-5">
            {/* On initial load: use whileInView for slide-in animation when page transitions */}
            {/* After filter change: use animate for immediate animation */}
            <AnimatePresence mode="wait">
              <AnimatedTitle
                key={selectedFilter}
                text={titleText}
                animationType="fadeIn"
                alwaysAnimate={hasChangedFilterRef.current}
                delay={hasChangedFilterRef.current ? 0 : 0.6}
              />
            </AnimatePresence>
          </header>

          {/* Animated Line Separator - Animates first at 0.6s */}
          <LineSeparator 
            className="lg:mb-2" 
            delay={hasChangedFilterRef.current ? 0 : 0.3}
          />

          {/* Filter and Projects */}
          <WorkFilter
            projects={allProjects}
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
          />
        </main>
      </div>
    </div>
  )
}
