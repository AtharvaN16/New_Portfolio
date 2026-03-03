'use client'

import { motion, useScroll } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import type { CaseStudy } from '@/lib/data/case-studies'
import { AnimatedTitle } from '@/components/ui/AnimatedTitle'
import { CaseStudyHeader } from '@/components/case-study/CaseStudyHeader'
import { CaseStudyContentRenderer } from '@/components/case-study/CaseStudyContentRenderer'
import { useSmoothScroll } from '@/hooks/use-smooth-scroll'
import { useHeroOverlay, HERO_OVERLAY_MAX_OPACITY } from '@/hooks/use-hero-overlay'

interface CaseStudyDetailProps {
  caseStudy: CaseStudy
  children?: React.ReactNode
}

export function CaseStudyDetail({ caseStudy, children }: CaseStudyDetailProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isContentRevealed, setIsContentRevealed] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const heroSectionRef = useRef<HTMLElement>(null)

  // Smooth scroll hook
  const { lenisRef, scrollTo } = useSmoothScroll(containerRef, contentRef)

  // Scroll progress tracking for progress bar
  const { scrollYProgress } = useScroll({
    container: containerRef,
  })

  // Hero overlay opacity
  const heroOverlayOpacity = useHeroOverlay(containerRef, heroSectionRef)

  // Listen to container scroll - optimized with RAF throttling
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let rafId: number | null = null
    let lastScrolled = false

    const handleScroll = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }

      rafId = requestAnimationFrame(() => {
        const scrolled = container.scrollTop > 50
        if (scrolled !== lastScrolled) {
          setIsScrolled(scrolled)
          lastScrolled = scrolled
        }
        rafId = null
      })
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      container.removeEventListener('scroll', handleScroll)
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
    }
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
      style={{
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[5px] z-[60] origin-left"
        style={{
          scaleX: scrollYProgress,
          backgroundColor:
            caseStudy.progressBarColor || 'rgb(var(--color-primary))',
          willChange: 'transform',
        }}
      />

      {/* Content wrapper for Lenis */}
      <div ref={contentRef}>
        <CaseStudyHeader
          isScrolled={isScrolled}
          onClose={handleClose}
        />

        {/* Main Content - Hero Section */}
        <main className="px-6 pt-4 pb-[1.5rem] max-w-[1920px] mx-auto min-h-[calc(100vh-6rem)] flex flex-col relative">
          <AnimatedTitle
            text={caseStudy.title}
            animationType="fadeIn"
            alwaysAnimate
            delay={0.8}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary mb-6 md:mb-8 leading-tight tracking-[-0.05em] max-w-[1400px]"
          />

          <motion.div
            className="flex flex-col md:flex-row md:items-start gap-12 md:gap-0 mt-auto pb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="max-w-full sm:max-w-[25rem] md:max-w-[28.75rem] text-left">
              <p className="text-base md:text-lg text-text-secondary leading-relaxed">
                {caseStudy.fullDescription || caseStudy.description}
              </p>
            </div>

            <div className="md:flex-1 md:min-w-0" />

            {(caseStudy.team || caseStudy.timeline) && (
              <div className="flex flex-col md:flex-row md:justify-between md:items-start md:gap-[3.5rem]">
                {caseStudy.team && caseStudy.team.length > 0 && (
                  <div className="md:min-w-[12.5rem] md:w-[12.5rem] text-left">
                    <h2 className="text-lg font-medium text-text-primary mb-4">
                      Team
                    </h2>
                    <ul className="space-y-2 [&:has(a:hover)_a]:opacity-40 [&:has(a:hover)_a:hover]:opacity-100">
                      {caseStudy.team.map((member, index) => (
                        <li key={index}>
                          <a
                            href="#"
                            className="group/link relative inline-block text-base font-normal text-text-secondary transition-opacity duration-200"
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
                    <h2 className="text-lg font-medium text-text-primary mb-4">
                      Timeline
                    </h2>
                    <p className="text-base font-normal text-text-secondary whitespace-nowrap">
                      {caseStudy.timeline}
                    </p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </main>

        {/* Hero Image Section */}
        <motion.section
          ref={heroSectionRef}
          className="w-full min-h-screen flex items-center justify-center relative z-10"
          style={{
            backgroundColor: 'rgb(var(--color-footer-bg))',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {caseStudy.imageUrl ? (
            <div className="relative w-full h-full">
              <div className="relative w-full aspect-[16/10] md:aspect-[16/9]">
                <Image
                  src={caseStudy.imageUrl}
                  alt={`${caseStudy.title} - Hero Image`}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
                <div
                  className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-500 ease-out"
                  style={{ opacity: heroOverlayOpacity * HERO_OVERLAY_MAX_OPACITY }}
                  aria-hidden
                />
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-6xl font-bold text-text-secondary/30 uppercase tracking-widest">
                IMAGE
              </p>
            </div>
          )}
        </motion.section>

        {/* Case Study Specific Content */}
        <CaseStudyContentRenderer
          caseStudy={caseStudy}
          isContentRevealed={isContentRevealed}
          onToggleContent={() => setIsContentRevealed(!isContentRevealed)}
        >
          {children}
        </CaseStudyContentRenderer>
      </div>
    </div>
  )
}
