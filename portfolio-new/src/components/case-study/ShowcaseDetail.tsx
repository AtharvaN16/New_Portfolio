'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import type { CaseStudy } from '@/lib/data/case-studies'
import { AnimatedTitle } from '@/components/ui/AnimatedTitle'
import { CaseStudyHeader } from '@/components/case-study/CaseStudyHeader'
import { CaseStudyContentRenderer } from '@/components/case-study/CaseStudyContentRenderer'
import { useSmoothScroll } from '@/hooks/use-smooth-scroll'
import { cn } from '@/lib/utils/cn'

interface ShowcaseDetailProps {
  caseStudy: CaseStudy
  flashColor?: string | null
}

export function ShowcaseDetail({ caseStudy, flashColor }: ShowcaseDetailProps) {
  const [isContentRevealed, setIsContentRevealed] = useState(false)
  const [showFlash, setShowFlash] = useState(!!flashColor)
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const heroSectionRef = useRef<HTMLElement>(null)

  useSmoothScroll(containerRef, contentRef)

  // Scroll progress for progress bar
  const { scrollYProgress, scrollY } = useScroll({ container: containerRef })

  // Parallax: image moves -30% of viewport height as user scrolls through hero
  const heroHeight = typeof window !== 'undefined' ? window.innerHeight : 800
  const imageParallaxY = useTransform(
    scrollY,
    [0, heroHeight],
    ['0%', '-30%']
  )

  // Flash animation: flash in then out on mount
  useEffect(() => {
    if (!flashColor) return
    const timer = setTimeout(() => setShowFlash(false), 700)
    return () => clearTimeout(timer)
  }, [flashColor])

  const handleClose = () => {
    if (window.history.length > 1) {
      window.history.back()
    } else {
      window.location.href = '/'
    }
  }

  const textColorClass = caseStudy.heroTextLight ? 'text-white' : 'text-gray-900'
  const metaColorClass = caseStudy.heroTextLight ? 'text-white/80' : 'text-gray-900/80'

  return (
    <div
      ref={containerRef}
      className="min-h-dvh bg-background text-text-primary overflow-y-auto h-dvh"
      style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}
    >
      {/* Color flash overlay */}
      {flashColor && (
        <motion.div
          className="fixed inset-0 z-[200] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: showFlash ? 0.7 : 0 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          style={{ backgroundColor: flashColor }}
          aria-hidden
        />
      )}

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

        {/* Full-viewport hero with parallax */}
        <motion.section
          ref={heroSectionRef}
          className="relative h-screen overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {/* Parallax image wrapper — extended vertically to allow travel */}
          {caseStudy.imageUrl && (
            <motion.div
              className="absolute inset-x-0 -top-[25%] -bottom-[25%]"
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

          {/* Dark overlay for legibility */}
          <div
            className={cn(
              'absolute inset-0',
              caseStudy.heroTextLight ? 'bg-black/40' : 'bg-white/30'
            )}
            aria-hidden
          />

          {/* Hero text content */}
          <div className="relative z-10 flex flex-col h-full px-6 2xl:px-[140px] pt-[5.75rem] pb-12">
            <AnimatedTitle
              text={caseStudy.title}
              animationType="fadeIn"
              alwaysAnimate
              delay={0.8}
              className={cn(
                'text-[2rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 leading-tight tracking-[-0.05em] max-w-[1400px]',
                textColorClass
              )}
            />

            {/* Description + metadata pinned to bottom */}
            <motion.div
              className="mt-auto flex flex-col md:flex-row md:items-end md:gap-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <div className="max-w-full sm:max-w-[25rem] md:max-w-[28.75rem]">
                <p className={cn('text-base md:text-lg leading-relaxed', metaColorClass)}>
                  {caseStudy.fullDescription || caseStudy.description}
                </p>
              </div>

              <div className="hidden md:block md:flex-1 md:min-w-0" />

              {(caseStudy.team || caseStudy.timeline) && (
                <div className="hidden md:flex flex-col md:flex-row md:justify-between md:items-start md:gap-[3.5rem]">
                  {caseStudy.team && caseStudy.team.length > 0 && (
                    <div className="md:min-w-[12.5rem] md:w-[12.5rem] text-left">
                      <h2 className={cn('text-base md:text-lg font-medium mb-2 md:mb-4', textColorClass)}>
                        Team
                      </h2>
                      <ul className="space-y-1 md:space-y-2">
                        {caseStudy.team.map((member, index) => (
                          <li key={index}>
                            <span className={cn('text-sm md:text-base font-normal', metaColorClass)}>
                              {member}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {caseStudy.timeline && (
                    <div className="text-left md:ml-auto">
                      <h2 className={cn('text-base md:text-lg font-medium mb-2 md:mb-4', textColorClass)}>
                        Timeline
                      </h2>
                      <p className={cn('text-sm md:text-base font-normal whitespace-nowrap', metaColorClass)}>
                        {caseStudy.timeline}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </motion.section>

        {/* Mobile metadata below hero */}
        {(caseStudy.team || caseStudy.timeline) && (
          <motion.div
            className="md:hidden flex flex-col gap-10 px-6 pt-12 pb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {caseStudy.team && caseStudy.team.length > 0 && (
              <div>
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
              <div>
                <h2 className="text-base font-medium text-text-primary mb-2">Timeline</h2>
                <p className="text-sm font-normal text-text-secondary">{caseStudy.timeline}</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Case study content */}
        <CaseStudyContentRenderer
          caseStudy={caseStudy}
          isContentRevealed={isContentRevealed}
          onToggleContent={() => setIsContentRevealed(!isContentRevealed)}
        />
      </div>
    </div>
  )
}
