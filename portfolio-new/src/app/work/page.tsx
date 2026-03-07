'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { WorkFilter } from '@/components/work/WorkFilter'
import type { ProjectCardProps } from '@/components/work/ProjectCard'
import { AnimatedTitle } from '@/components/ui/AnimatedTitle'
import { GradientBar } from '@/components/ui/GradientBar'
import { NavButton } from '@/components/ui/NavButton'
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
  'Usability Testing': 'Usability Testing',
  'Client Project': 'Client Projects',
  Explorations: 'Explorations',
  'Service Design': 'Service Design',
  'Design Thinking': 'Design Thinking',
  'UX Research': 'UX Research',
  'UI Design': 'UI Design',
  Prototyping: 'Prototyping',
  Design: 'Design',
}

export default function WorkPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>('All')
  // Derive if filter has been changed from initial 'All' state
  const hasChangedFilter = selectedFilter !== 'All'

  // Fix: Ensure page starts at the top on direct load/refresh
  useEffect(() => {
    // Check if we are in a dialog (rendered via WorkDialog)
    const isInsideDialog = !!document.getElementById('dialog')

    if (!isInsideDialog) {
      window.scrollTo(0, 0)
      // Also scroll Lenis if available
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true })
      }
    }
  }, [])

  const titleText =
    filterTitleMap[selectedFilter] || 'Check out more of my work'

  const handleBack = () => {
    // Go back in history (this will trigger the dialog to close)
    window.history.back()
  }

  return (
    <div className="min-h-screen w-full bg-background">
      <GradientBar
        className="fixed left-0 top-0 z-[60] w-full"
        height="h-2 md:h-4"
      />

      {/* Header with Back Button - 30px gap from GradientBar */}
      <header className="relative z-50">
        <nav className="px-6 2xl:px-[140px] pt-[38px] md:pt-[46px] pb-6 flex items-center justify-end max-w-[1920px] mx-auto">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.4,
              delay: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <NavButton onClick={handleBack} className="-mr-3">
              Back
            </NavButton>
          </motion.div>
        </nav>
      </header>

      <div className="relative px-6 2xl:px-[140px] pb-20 pt-4 md:pb-32 md:pt-8">
        <main id="main-content">
          {/* Page Header */}
          <header className="mb-4 lg:mb-5">
            {/* On initial load: use whileInView for slide-in animation when page transitions */}
            {/* After filter change: use animate for immediate animation */}
            <AnimatePresence mode="wait">
              <AnimatedTitle
                key={selectedFilter}
                text={titleText}
                animationType="fadeIn"
                alwaysAnimate={hasChangedFilter}
                delay={hasChangedFilter ? 0 : 0.6}
                className="text-[28px] lg:text-[36px] 2xl:text-[42px] font-bold leading-[1.1] lg:leading-tight max-w-[65%] lg:max-w-none"
              />
            </AnimatePresence>
          </header>

          {/* Animated Line Separator - 50% opacity on all screens */}
          <LineSeparator
            className="lg:mb-[16px]"
            opacity={0.5}
            delay={hasChangedFilter ? 0 : 0.3}
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
