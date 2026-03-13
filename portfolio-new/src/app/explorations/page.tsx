'use client'

import { useRef } from 'react'
import { m } from 'framer-motion'
import { ProjectCard, type ProjectCardProps } from '@/components/work/ProjectCard'
import { MasonryGrid } from '@/components/work/MasonryGrid'
import { caseStudies } from '@/lib/data/case-studies'
import { AnimatedTitle } from '@/components/ui/AnimatedTitle'
import { CaseStudyHeader } from '@/components/case-study/CaseStudyHeader'
import { useSmoothScroll } from '@/hooks/use-smooth-scroll'

// Map case studies to ProjectCardProps and filter for Explorations
const explorationProjects: ProjectCardProps[] = caseStudies
  .filter((study) => 
    study.tags.includes('Explorations') || 
    study.tags.includes('Exploration')
  )
  .map((study) => ({
    title: study.title,
    organization: study.organization,
    year: study.year,
    description: study.description,
    tags: study.tags,
    imageBg: study.imageBg,
    imageUrl: study.imageUrl,
    slug: study.slug,
  }))

export default function ExplorationsPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Use the same smooth scroll as Case Study pages
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

        <main className="px-6 2xl:px-[140px] pt-4 pb-20 md:pb-32 max-w-[1920px] mx-auto min-h-[calc(100dvh-4.625rem)] md:min-h-[calc(100dvh-4.875rem)] flex flex-col relative">
          <div className="mb-14 lg:mb-20">
            <AnimatedTitle
              text="Explorations"
              animationType="fadeIn"
              alwaysAnimate
              delay={0.8}
              className="text-[2rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary mb-6 md:mb-8 leading-tight tracking-[-0.05em] max-w-[1400px]"
            />
          </div>

          <MasonryGrid
            items={explorationProjects}
            gap={24}
            renderItem={(project, index) => (
              <m.div
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
              </m.div>
            )}
          />

          {explorationProjects.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-lg text-text-tertiary">
                No explorations found.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
