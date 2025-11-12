'use client'

import { useState, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import { WorkFilter } from '@/components/work/WorkFilter'
import type { ProjectCardProps } from '@/components/work/ProjectCard'
import { AnimatedTitle } from '@/components/ui/AnimatedTitle'
import { GradientBar } from '@/components/ui/GradientBar'
import { LineSeparator } from '@/components/ui/LineSeparator'

const allProjects: ProjectCardProps[] = [
  {
    title: 'Helping New Yorkers apply for business licenses with ease',
    organization: 'NYC DCWP',
    year: '2024',
    description:
      'A case study on improving the application process for business licenses for the NYC Department of Consumer and Worker Protection.',
    tags: ['Selected Work', 'Client Project'],
    imageBg: '#87CEEB',
  },
  {
    title: 'Improving Usability of Library Website',
    organization: 'University of Alberta',
    year: '2024',
    description:
      'A comprehensive UX redesign of the university library website, focusing on improving navigation, search functionality, and overall user experience for students and faculty.',
    tags: ['Selected Work', 'Usability Testing'],
    imageBg: '#90EE90',
  },
  {
    title: 'Usability study on free tours page MET',
    organization: 'Class Project',
    year: '2024',
    description:
      "An in-depth usability study of the Metropolitan Museum of Art's free tours page, identifying key pain points and providing actionable recommendations to enhance visitor experience.",
    tags: ['Selected Work', 'Usability Testing', 'Client Project'],
    imageBg: '#CD5C5C',
  },
]

// Map filter names to title texts
const filterTitleMap: Record<string, string> = {
  All: 'Check out more of my work',
  'Selected Work': 'Selected Work',
  'Usability Testing': 'Usability Testing Projects',
  'Client Project': 'Client Projects',
  Explorations: 'Explorations',
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
