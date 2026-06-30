'use client'

import { m, useScroll } from 'framer-motion'
import { useRef } from 'react'
import type { CaseStudy } from '@/lib/data/case-studies'
import { CaseStudyHeader } from '@/components/case-study/CaseStudyHeader'
import { useSmoothScroll } from '@/hooks/use-smooth-scroll'
import { ContainerScrollProvider } from '@/hooks/use-container-scroll'
import { CaseStudyContentRenderer } from '@/components/case-study/CaseStudyContentRenderer'
import { ThemeScoper } from '@/components/case-study/ThemeScoper'

interface CaseStudyLayoutProps {
  caseStudy: CaseStudy
  onClose?: () => void
  containerRef?: React.RefObject<HTMLDivElement | null>
  heroSlot?: React.ReactNode
  metadataSlot?: React.ReactNode
  heroImageSlot?: React.ReactNode
  abstractSlot?: React.ReactNode
  children?: React.ReactNode // Content passed from specific detail components
}

/**
 * CaseStudyLayout
 * 
 * A deep structural module that encapsulates common layout patterns,
 * smooth scrolling, and scroll progress tracking for all case studies.
 */
export function CaseStudyLayout({
  caseStudy,
  onClose,
  containerRef: externalContainerRef,
  heroSlot,
  metadataSlot,
  heroImageSlot,
  abstractSlot,
  children,
}: CaseStudyLayoutProps) {
  const internalContainerRef = useRef<HTMLDivElement>(null)
  const containerRef = externalContainerRef ?? internalContainerRef
  const contentRef = useRef<HTMLDivElement>(null)

  const { scrollToElement } = useSmoothScroll(containerRef, contentRef)

  // Standardize scroll progress bar
  const { scrollYProgress } = useScroll({ container: containerRef })

  const handleClose = onClose ?? (() => {
    if (window.history.length > 1) {
      window.history.back()
    } else {
      window.location.href = '/'
    }
  })

  return (
    <ContainerScrollProvider scrollToElement={scrollToElement} containerRef={containerRef}>
      <div
        id="case-study-scroll-container"
        ref={containerRef}
        className="min-h-dvh bg-background text-text-primary overflow-x-hidden overflow-y-auto h-dvh"
        style={{
          overscrollBehavior: 'contain',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <ThemeScoper themeColor={caseStudy.themeColor}>
        <div ref={contentRef}>
          <CaseStudyHeader onClose={handleClose} scrollYProgress={scrollYProgress} />

          {/* Hero Section Slot */}
          {heroSlot}

          {/* Desktop & Mobile Metadata Slots */}
          {metadataSlot || (
            /* Default metadata layout if none provided */
            (caseStudy.team || caseStudy.timeline) && (
              <m.div
                className="md:hidden flex flex-col gap-10 px-6 2xl:px-[140px] pt-12 pb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {caseStudy.team && caseStudy.team.length > 0 && (
                  <div className="text-left">
                    <h2 className="text-base font-medium text-text-primary mb-2">Team</h2>
                    <ul className="space-y-1">
                      {caseStudy.team.map((member, index) => (
                        <li key={index}>
                          <span className="text-sm font-normal text-text-secondary">{member}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {caseStudy.timeline && (
                  <div className="text-left">
                    <h2 className="text-base font-medium text-text-primary mb-2">Timeline</h2>
                    <p className="text-sm font-normal text-text-secondary">{caseStudy.timeline}</p>
                  </div>
                )}
              </m.div>
            )
          )}

          {/* Hero Image — after metadata on mobile, after hero text on desktop */}
          {heroImageSlot}

          {/* Abstract Section Slot */}
          {abstractSlot}

          {/* Main Content Area */}
          <CaseStudyContentRenderer caseStudy={caseStudy}>
            {children}
          </CaseStudyContentRenderer>
        </div>
        </ThemeScoper>
      </div>
    </ContainerScrollProvider>
  )
}
