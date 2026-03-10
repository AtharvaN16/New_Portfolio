'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useRef } from 'react'
import Image from 'next/image'
import type { CaseStudy } from '@/lib/data/case-studies'
import { AnimatedTitle } from '@/components/ui/AnimatedTitle'
import { CaseStudyHeader } from '@/components/case-study/CaseStudyHeader'
import { ShowcaseHero } from '@/components/case-study/ShowcaseHero'
import { CaseStudyContentRenderer } from '@/components/case-study/CaseStudyContentRenderer'
import { useSmoothScroll } from '@/hooks/use-smooth-scroll'

interface ShowcaseDetailProps {
  caseStudy: CaseStudy
  /** Called when the close button is pressed. Parent (CaseStudyDialog) handles
   *  the flash exit sequence. Falls back to history.back() when used standalone. */
  onClose?: () => void
}

export function ShowcaseDetail({ caseStudy, onClose }: ShowcaseDetailProps) {
  const [isContentRevealed, setIsContentRevealed] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useSmoothScroll(containerRef, contentRef)

  // Scroll progress bar (full page)
  const { scrollYProgress } = useScroll({ container: containerRef })

  const handleClose = onClose ?? (() => {
    if (window.history.length > 1) window.history.back()
    else window.location.href = '/'
  })

  return (
    <div
      ref={containerRef}
      className="min-h-dvh bg-background text-text-primary overflow-y-auto h-dvh"
      style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}
    >
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[5px] z-[60] origin-left"
        style={{
          scaleX: scrollYProgress,
          backgroundColor: caseStudy.progressBarColor || 'rgb(var(--color-primary))',
          willChange: 'transform',
        }}
      />

      <div ref={contentRef}>
        <CaseStudyHeader onClose={handleClose} />

        <ShowcaseHero caseStudy={caseStudy} containerRef={containerRef} />

        {/* Mobile metadata — mirrors CaseStudyDetail */}
        {(caseStudy.team || caseStudy.timeline) && (
          <motion.div
            className="md:hidden flex flex-col gap-10 px-6 2xl:px-[140px] pt-12 pb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {caseStudy.team && caseStudy.team.length > 0 && (
              <div className="text-left">
                <h2 className="text-base font-semibold text-text-primary mb-2">Team</h2>
                <ul className="space-y-1">
                  {caseStudy.team.map((member, index) => (
                    <li key={index}>
                      <a href="#" className="text-sm font-medium text-text-secondary">
                        {member}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {caseStudy.timeline && (
              <div className="text-left">
                <h2 className="text-base font-semibold text-text-primary mb-2">Timeline</h2>
                <p className="text-sm font-medium text-text-secondary">{caseStudy.timeline}</p>
              </div>
            )}
          </motion.div>
        )}

        <CaseStudyContentRenderer
          caseStudy={caseStudy}
          isContentRevealed={isContentRevealed}
          onToggleContent={() => setIsContentRevealed(!isContentRevealed)}
        />
      </div>
    </div>
  )
}
