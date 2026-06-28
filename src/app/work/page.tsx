'use client'

import { useEffect, useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { m } from 'framer-motion'
import { WorkFilter } from '@/components/work/WorkFilter'
import { MasonryWorkGrid } from '@/components/work/MasonryWorkGrid'
import type { ProjectCardProps } from '@/components/work/ProjectCard'
import { GradientBar } from '@/components/ui/GradientBar'
import { NavButton } from '@/components/ui/NavButton'
import { LineSeparator } from '@/components/ui/LineSeparator'
import { useLenis } from '@/components/providers/LenisProvider'
import { getVisibleCaseStudies } from '@/lib/data/case-studies'
import {
  MAIN_CONTENT_ID,
  OVERLAY_MAIN_CONTENT_ID,
} from '@/lib/overlay-page-chrome'

const CaseStudyDialog = dynamic(
  () => import('@/components/dialogs/CaseStudyDialog').then((m) => ({ default: m.CaseStudyDialog })),
  { ssr: false }
)

const allProjects: ProjectCardProps[] = getVisibleCaseStudies().map((study) => ({
  title: study.title,
  organization: study.organization,
  year: study.year,
  description: study.description,
  tags: study.tags,
  themeColor: study.themeColor,
  imageUrl: study.imageUrl,
  thumbnailUrl: study.thumbnailUrl,
  videoUrl: study.videoUrl,
  slug: study.slug,
}))

export default function WorkPage() {
  const lenis = useLenis()
  const [selectedFilter, setSelectedFilter] = useState<string>('All')
  const [isStandalone, setIsStandalone] = useState(false)
  const [isDialogSettled, setIsDialogSettled] = useState(() => {
    if (typeof document === 'undefined') return false
    return !document.getElementById('dialog')
  })

  // Derive if filter has been changed from initial 'All' state
  const hasChangedFilter = selectedFilter !== 'All'

  // Fix: Ensure page starts at the top on direct load/refresh
  useEffect(() => {
    // Check if we are in a dialog (rendered via WorkDialog)
    const isInsideDialog = !!document.getElementById('dialog')

    if (!isInsideDialog) {
      setIsStandalone(true)
      window.scrollTo(0, 0)
      lenis?.scrollTo(0, { immediate: true })
    }

    if (!isDialogSettled) {
      const timer = setTimeout(() => setIsDialogSettled(true), 1100)
      return () => clearTimeout(timer)
    }
  }, [lenis, isDialogSettled])

  const filteredProjects = useMemo(() => {
    if (selectedFilter === 'All') return allProjects
    return allProjects.filter((project) => project.tags?.includes(selectedFilter))
  }, [selectedFilter])

  const handleBack = () => {
    // Go back in history (this will trigger the dialog to close)
    window.history.back()
  }

  return (
    <div className="min-h-screen w-full bg-background">
      {isStandalone && <CaseStudyDialog />}
      <GradientBar
        className="fixed left-0 top-0 z-[60] w-full"
        height="h-2"
      />

      {/* Header with Filters and Back Button */}
      <header className="relative z-50">
        <div className="max-w-[1920px] mx-auto">
          {/* Back button row — mirrors CaseStudyHeader */}
          <div className="px-6 2xl:px-[140px] pt-[38px] md:pt-[46px] flex items-center justify-end">
            <m.div
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
            </m.div>
          </div>

          {/* Filter row — full width below the Back button */}
          <div className="px-6 2xl:px-[140px] pb-6 pt-4">
            <WorkFilter
              projects={allProjects}
              selectedFilter={selectedFilter}
              onFilterChange={setSelectedFilter}
              hasChangedFilter={hasChangedFilter}
            />
          </div>

          <div className="px-6 2xl:px-[140px]">
            <LineSeparator
              className="opacity-50"
              delay={hasChangedFilter ? 0 : 0.2}
            />
          </div>
        </div>
      </header>

      <div className="relative px-6 2xl:px-[140px] pb-20 pt-4 md:pb-32">
        <main id={isStandalone ? MAIN_CONTENT_ID : OVERLAY_MAIN_CONTENT_ID}>
          <MasonryWorkGrid
            projects={filteredProjects}
            isDialogSettled={isDialogSettled}
            hasChangedFilter={hasChangedFilter}
          />

          {filteredProjects.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-lg text-text-tertiary">
                No projects found with this filter.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
