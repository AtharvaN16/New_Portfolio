'use client'

import { m } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import type { CaseStudy } from '@/lib/data/case-studies'
import { AnimatedTitle } from '@/components/ui/AnimatedTitle'
import { CaseStudyLayout } from '@/components/case-study/CaseStudyLayout'

interface CaseStudyDetailProps {
  caseStudy: CaseStudy
  children?: React.ReactNode
}

/**
 * CaseStudyDetail
 * 
 * Standard case study variant.
 * Provides the classic hero and metadata layout to CaseStudyLayout.
 */
export function CaseStudyDetail({ caseStudy, children }: CaseStudyDetailProps) {
  const heroSectionRef = useRef<HTMLElement>(null)

  const heroSlot = (
    <>
      <main 
        ref={heroSectionRef}
        className="px-6 2xl:px-[140px] pt-4 pb-3 md:pb-[1.5rem] max-w-[1920px] mx-auto min-h-[calc(100dvh-4.625rem)] md:min-h-[calc(100dvh-4.875rem)] flex flex-col relative"
      >
        <AnimatedTitle
          text={caseStudy.title}
          animationType="fadeIn"
          alwaysAnimate
          delay={0.8}
          className="text-[2rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary mb-6 md:mb-8 leading-tight tracking-[-0.05em] max-w-[1400px]"
        />

        <m.div
          className="flex flex-col md:flex-row md:items-start md:gap-0 mt-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="max-w-full sm:max-w-[25rem] md:max-w-[28.75rem] text-left">
            <p className="text-base md:text-lg text-text-secondary leading-relaxed">
              {caseStudy.fullDescription || caseStudy.description}
            </p>
          </div>

          <div className="hidden md:block md:flex-1 md:min-w-0" />

          {/* Desktop Metadata */}
          {(caseStudy.team || caseStudy.timeline) && (
            <div className="hidden md:flex flex-col md:flex-row md:justify-between md:items-start md:gap-[3.5rem] mt-10 md:mt-0">
              {caseStudy.team && caseStudy.team.length > 0 && (
                <div className="md:min-w-[12.5rem] md:w-[12.5rem] text-left">
                  <h2 className="text-base md:text-lg font-medium text-text-primary mb-2 md:mb-4">
                    Team
                  </h2>
                  <ul className="space-y-1 md:space-y-2 [&:has(a:hover)_a]:opacity-40 [&:has(a:hover)_a:hover]:opacity-100">
                    {caseStudy.team.map((member, index) => (
                      <li key={index}>
                        <a
                          href="#"
                          className="group/link relative inline-block text-sm md:text-base font-normal text-text-secondary transition-opacity duration-200"
                        >
                          {member}
                          <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-current transition-all duration-300 ease-out group-hover/link:w-full" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {caseStudy.timeline && (
                <div className="text-left md:text-left md:ml-auto">
                  <h2 className="text-base md:text-lg font-medium text-text-primary mb-2 md:mb-4">
                    Timeline
                  </h2>
                  <p className="text-sm md:text-base font-normal text-text-secondary whitespace-nowrap">
                    {caseStudy.timeline}
                  </p>
                </div>
              )}
            </div>
          )}
        </m.div>
      </main>

      {/* Hero Image Section */}
      {caseStudy.imageUrl && (
        <m.section
          className="w-full relative z-10"
          style={{ backgroundColor: caseStudy.imageBg || 'rgb(var(--color-footer-bg))' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          aria-label={`${caseStudy.title} hero image`}
        >
          <figure className="w-full overflow-hidden">
            <div className="relative w-full aspect-[16/9] md:aspect-auto md:min-h-screen">
              <Image
                src={caseStudy.imageUrl}
                alt={
                  caseStudy.heroImageDescription ??
                  `${caseStudy.title} — hero image`
                }
                fill
                className="object-cover [filter:contrast(1.05)]"
                sizes="100vw"
                priority
                quality={95}
              />
            </div>
            {caseStudy.heroImageDescription && (
              <figcaption className="px-6 2xl:px-[140px] py-4 md:py-6 mx-auto max-w-[52rem] text-xs md:text-sm font-sans text-text-secondary leading-relaxed">
                {caseStudy.heroImageDescription}
              </figcaption>
            )}
          </figure>
        </m.section>
      )}
    </>
  )

  return (
    <CaseStudyLayout caseStudy={caseStudy} heroSlot={heroSlot}>
      {children}
    </CaseStudyLayout>
  )
}
