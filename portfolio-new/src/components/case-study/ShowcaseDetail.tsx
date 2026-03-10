'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useRef } from 'react'
import Image from 'next/image'
import type { CaseStudy } from '@/lib/data/case-studies'
import { AnimatedTitle } from '@/components/ui/AnimatedTitle'
import { CaseStudyHeader } from '@/components/case-study/CaseStudyHeader'
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
  const heroSectionRef = useRef<HTMLElement>(null)

  useSmoothScroll(containerRef, contentRef)

  // Scroll progress bar (full page)
  const { scrollYProgress } = useScroll({ container: containerRef })

  // Parallax: image moves UP as user scrolls through the 200dvh hero.
  // offset 'start start' → 'end start' = hero section fully exits the viewport top.
  // image travels -20% (upward) over that distance — slower than the scroll = parallax depth.
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroSectionRef,
    container: containerRef,
    offset: ['start start', 'end start'],
  })
  const imageParallaxY = useTransform(heroProgress, [0, 1], ['0%', '-20%'])

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

        {/*
          Outer section: 200dvh, pulled up by -mt-[5.75rem] so the image covers
          the full viewport from the very top (sticky header floats above it).
          Inner sticky div: locks the text in place while the image parallaxes
          behind it. Once the 200dvh is scrolled through, the sticky releases
          and the abstract content scrolls in.
        */}
        <section
          ref={heroSectionRef}
          className="relative -mt-[5.75rem]"
          style={{ height: '200dvh' }}
        >
          <div className="sticky top-0 h-dvh overflow-hidden">
            {/* Parallax image — extended vertically for travel room */}
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

            <div className="absolute inset-0 bg-black/30" aria-hidden />

            {/* Text layout — identical structure to CaseStudyDetail's main section */}
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
                {/* Description */}
                <div className="max-w-full sm:max-w-[25rem] md:max-w-[28.75rem] text-left">
                  <p className="text-base md:text-lg font-medium text-white/80 leading-relaxed">
                    {caseStudy.fullDescription || caseStudy.description}
                  </p>
                </div>

                <div className="hidden md:block md:flex-1 md:min-w-0" />

                {/* Desktop metadata */}
                {(caseStudy.team || caseStudy.timeline) && (
                  <div className="hidden md:flex flex-col md:flex-row md:justify-between md:items-start md:gap-[3.5rem] mt-10 md:mt-0">
                    {caseStudy.team && caseStudy.team.length > 0 && (
                      <div className="md:min-w-[12.5rem] md:w-[12.5rem] text-left">
                        <h2 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-4">
                          Team
                        </h2>
                        <ul className="space-y-1 md:space-y-2 [&:has(a:hover)_a]:opacity-40 [&:has(a:hover)_a:hover]:opacity-100">
                          {caseStudy.team.map((member, index) => (
                            <li key={index}>
                              <a
                                href="#"
                                className="group/link relative inline-block text-sm md:text-base font-medium text-white/70 transition-opacity duration-200"
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
                        <h2 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-4">
                          Timeline
                        </h2>
                        <p className="text-sm md:text-base font-medium text-white/70 whitespace-nowrap">
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
