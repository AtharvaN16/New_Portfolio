'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import type { CaseStudy } from '@/lib/data/case-studies'
import { AnimatedTitle } from '@/components/ui/AnimatedTitle'
import { CaseStudyHeader } from '@/components/case-study/CaseStudyHeader'
import { CaseStudyContentRenderer } from '@/components/case-study/CaseStudyContentRenderer'
import { useSmoothScroll } from '@/hooks/use-smooth-scroll'

interface ShowcaseDetailProps {
  caseStudy: CaseStudy
  flashColor?: string | null
}

export function ShowcaseDetail({ caseStudy, flashColor }: ShowcaseDetailProps) {
  const [isContentRevealed, setIsContentRevealed] = useState(false)
  // Always start flash visible — fades out after a short hold
  const [flashDone, setFlashDone] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const heroSectionRef = useRef<HTMLElement>(null)

  useSmoothScroll(containerRef, contentRef)

  // Scroll progress bar (full page)
  const { scrollYProgress } = useScroll({ container: containerRef })

  // Parallax: as the 200dvh hero exits the viewport, image drifts 20% downward
  // giving the image a sense of depth relative to the sticky text.
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroSectionRef,
    container: containerRef,
    offset: ['start start', 'end start'],
  })
  const imageParallaxY = useTransform(heroProgress, [0, 1], ['0%', '20%'])

  // Hold the opaque flash overlay, then gently fade it out
  useEffect(() => {
    const timer = setTimeout(() => setFlashDone(true), 400)
    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    if (window.history.length > 1) {
      window.history.back()
    } else {
      window.location.href = '/'
    }
  }

  return (
    <div
      ref={containerRef}
      className="min-h-dvh bg-background text-text-primary overflow-y-auto h-dvh"
      style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}
    >
      {/* Flash overlay — starts fully opaque, gently fades to reveal the image */}
      <motion.div
        className="fixed inset-0 z-[200] pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: flashDone ? 0 : 1 }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
        style={{ backgroundColor: flashColor || 'rgb(var(--color-background))' }}
        aria-hidden
      />

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

        {/*
          Outer section: 200dvh tall, pulled up by the header height so the
          image fills the full viewport from top. overflow-hidden clips the
          extended parallax image.

          Inner sticky div: stays at viewport top while the outer section
          scrolls — this keeps the text content fixed in view while the image
          slowly drifts behind it (parallax). Once the full 200dvh is scrolled,
          the sticky releases and the abstract section scrolls into view.
        */}
        <section
          ref={heroSectionRef}
          className="relative -mt-[5.75rem]"
          style={{ height: '200dvh' }}
        >
          <div className="sticky top-0 h-dvh overflow-hidden">
            {/* Parallax image — extended vertically to allow drift travel */}
            {caseStudy.imageUrl && (
              <motion.div
                className="absolute inset-x-0 -top-[15%] -bottom-[15%]"
                style={{ y: imageParallaxY }}
              >
                <Image
                  src={caseStudy.imageUrl}
                  alt={`${caseStudy.title} hero`}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
              </motion.div>
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30" aria-hidden />

            {/*
              Text layout: identical to CaseStudyDetail's main section.
              Title at top, description + team/timeline pinned to bottom via mt-auto.
              pt-4 matches CaseStudyDetail (header already accounts for the offset
              from the -mt-[5.75rem] on the section).
            */}
            <div className="relative z-10 h-full flex flex-col px-6 2xl:px-[140px] pt-[5.75rem] pb-3 md:pb-[1.5rem] max-w-[1920px] mx-auto">
              <AnimatedTitle
                text={caseStudy.title}
                animationType="fadeIn"
                alwaysAnimate
                delay={0.8}
                className="text-[2rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 md:mb-8 leading-tight tracking-[-0.05em] max-w-[1400px]"
              />

              <motion.div
                className="flex flex-col md:flex-row md:items-start md:gap-0 mt-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="max-w-full sm:max-w-[25rem] md:max-w-[28.75rem] text-left">
                  <p className="text-base md:text-lg text-white/80 leading-relaxed">
                    {caseStudy.fullDescription || caseStudy.description}
                  </p>
                </div>

                <div className="hidden md:block md:flex-1 md:min-w-0" />

                {(caseStudy.team || caseStudy.timeline) && (
                  <div className="hidden md:flex flex-col md:flex-row md:justify-between md:items-start md:gap-[3.5rem] mt-10 md:mt-0">
                    {caseStudy.team && caseStudy.team.length > 0 && (
                      <div className="md:min-w-[12.5rem] md:w-[12.5rem] text-left">
                        <h2 className="text-base md:text-lg font-medium text-white mb-2 md:mb-4">
                          Team
                        </h2>
                        <ul className="space-y-1 md:space-y-2 [&:has(a:hover)_a]:opacity-40 [&:has(a:hover)_a:hover]:opacity-100">
                          {caseStudy.team.map((member, index) => (
                            <li key={index}>
                              <a
                                href="#"
                                className="group/link relative inline-block text-sm md:text-base font-normal text-white/70 transition-opacity duration-200"
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
                      <div className="text-left md:ml-auto">
                        <h2 className="text-base md:text-lg font-medium text-white mb-2 md:mb-4">
                          Timeline
                        </h2>
                        <p className="text-sm md:text-base font-normal text-white/70 whitespace-nowrap">
                          {caseStudy.timeline}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mobile metadata — mirrors CaseStudyDetail's mobile section */}
        {(caseStudy.team || caseStudy.timeline) && (
          <motion.div
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
                      <a href="#" className="text-sm font-normal text-text-secondary">
                        {member}
                      </a>
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
          </motion.div>
        )}

        {/* Abstract + full content */}
        <CaseStudyContentRenderer
          caseStudy={caseStudy}
          isContentRevealed={isContentRevealed}
          onToggleContent={() => setIsContentRevealed(!isContentRevealed)}
        />
      </div>
    </div>
  )
}
