'use client'

import { useRef } from 'react'
import { m } from 'framer-motion'
import { type ProjectCardProps } from '@/components/work/ProjectCard'
import { ExplorationsGrid } from '@/components/work/ExplorationsGrid'
import { getVisibleCaseStudies } from '@/lib/data/case-studies'
import { AnimatedTitle } from '@/components/ui/AnimatedTitle'
import { CaseStudyHeader } from '@/components/case-study/CaseStudyHeader'
import { useSmoothScroll } from '@/hooks/use-smooth-scroll'

// Map case studies to ProjectCardProps and filter for Explorations
const explorationProjects: ProjectCardProps[] = getVisibleCaseStudies()
  .filter((study) =>
    study.tags.includes('Explorations') ||
    study.tags.includes('Exploration')
  )
  .map((study) => ({
    title: study.title,
    organization: '',
    year: '',
    description: study.description,
    tags: study.tags.filter(tag => tag !== 'Exploration' && tag !== 'Explorations'),
    imageBg: study.imageBg,
    imageUrl: study.imageUrl,
    slug: study.slug,
  }))

export default function ExplorationsPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useSmoothScroll(containerRef, contentRef)

  const handleClose = () => {
    window.history.back()
  }

  return (
    <div
      ref={containerRef}
      className="min-h-dvh bg-background text-text-primary overflow-y-auto h-dvh"
      style={{
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      <div ref={contentRef}>
        <CaseStudyHeader onClose={handleClose} />

        <main className="px-6 2xl:px-[140px] pt-4 pb-20 md:pb-32 max-w-[1920px] mx-auto flex flex-col">
          <div className="mb-14 lg:mb-20 flex flex-col gap-8">
            <AnimatedTitle
              text="Losing sleep over random design explorations"
              animationType="fadeIn"
              alwaysAnimate
              delay={0.8}
              className="text-[28px] sm:text-[36px] md:text-[44px] lg:text-[56px] font-bold text-text-primary leading-tight tracking-[-0.05em] max-w-full lg:max-w-[50%]"
            />
            <div className="flex lg:justify-end">
              <m.p
                className="text-base md:text-lg font-medium leading-relaxed max-w-[22rem] lg:text-right"
                style={{ color: 'rgb(var(--color-text-color70))' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.4 }}
              >
                Currently experimenting with vibe coding to bring my design concepts to life
              </m.p>
            </div>
          </div>

          {explorationProjects.length > 0 ? (
            <ExplorationsGrid projects={explorationProjects} />
          ) : (
            <div className="py-20 text-center">
              <p className="text-lg text-text-tertiary">No explorations found.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
