'use client'

import { useEffect } from 'react'
import { m } from 'framer-motion'
import { ProjectCard, type ProjectCardProps } from '@/components/work/ProjectCard'
import { MasonryGrid } from '@/components/work/MasonryGrid'
import { NavButton } from '@/components/ui/NavButton'
import { caseStudies } from '@/lib/data/case-studies'
import { AnimatedTitle } from '@/components/ui/AnimatedTitle'

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
  // Fix: Ensure page starts at the top on direct load/refresh
  useEffect(() => {
    // Check if we are in a dialog
    const isInsideDialog = !!document.getElementById('dialog')

    if (!isInsideDialog) {
      window.scrollTo(0, 0)
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true })
      }
    }
  }, [])

  const handleBack = () => {
    window.history.back()
  }

  return (
    <div className="min-h-screen w-full bg-background">
      {/* Header with Back Button */}
      <header className="relative z-50">
        <nav className="px-6 2xl:px-[140px] pt-[38px] md:pt-[46px] pb-6 flex items-center justify-end max-w-[1920px] mx-auto">
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
        </nav>
      </header>

      <div className="relative px-6 2xl:px-[140px] pb-20 pt-4 md:pb-32 md:pt-8">
        <main id="main-content" className="max-w-[1920px] mx-auto">
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
