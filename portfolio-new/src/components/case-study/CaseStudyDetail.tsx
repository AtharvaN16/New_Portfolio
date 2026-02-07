'use client'

import { motion, useScroll } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import type { CaseStudy } from '@/lib/data/case-studies'
import { AnimatedTitle } from '@/components/ui/AnimatedTitle'
import { CaseStudyContent } from '@/components/case-study/CaseStudyContent'
import { CaseStudyHeader } from '@/components/case-study/CaseStudyHeader'
import { GutenbergContent } from '@/components/case-study/content/GutenbergContent'
import { useSmoothScroll } from '@/hooks/use-smooth-scroll'

interface CaseStudyDetailProps {
  caseStudy: CaseStudy
  children?: React.ReactNode
}

// Viewport fraction at which overlay has fully faded out (scroll past top)
const HERO_OVERLAY_FADEOUT_VIEWPORT = 0.4
// Visible hero fraction below which overlay fades back in (exiting)
const HERO_OVERLAY_FADEIN_VISIBLE = 0.2
// Max opacity of the dark overlay (image stays visible, only darkened)
const HERO_OVERLAY_MAX_OPACITY = 0.55

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function CaseStudyDetail({ caseStudy, children }: CaseStudyDetailProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isContentRevealed, setIsContentRevealed] = useState(false)
  const [heroOverlayOpacity, setHeroOverlayOpacity] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const heroSectionRef = useRef<HTMLElement>(null)

  // Smooth scroll hook
  const { lenisRef, scrollTo } = useSmoothScroll(containerRef, contentRef)

  // Scroll progress tracking for progress bar
  const { scrollYProgress } = useScroll({
    container: containerRef,
  })

  // Hero overlay: dark at start, fades out by 40% viewport scroll, fades back in when ~20% of hero remains visible
  useEffect(() => {
    const container = containerRef.current
    const heroSection = heroSectionRef.current
    if (!container || !heroSection) return

    let rafId: number | null = null

    const updateOverlay = () => {
      const viewportHeight = container.clientHeight
      const scrollTop = container.scrollTop
      const heroTop = heroSection.offsetTop - scrollTop
      const heroHeight = heroSection.offsetHeight

      const visibleTop = Math.max(0, heroTop)
      const visibleBottom = Math.min(viewportHeight, heroTop + heroHeight)
      const visibleHeight = Math.max(0, visibleBottom - visibleTop)
      const visibleRatio = heroHeight > 0 ? visibleHeight / heroHeight : 0

      let opacity: number
      const fadeOutThreshold = HERO_OVERLAY_FADEOUT_VIEWPORT * viewportHeight
      const atOrPast40Viewport = scrollTop >= fadeOutThreshold

      if (atOrPast40Viewport && visibleRatio > HERO_OVERLAY_FADEIN_VISIBLE) {
        // Full bright: once 40% viewport has passed, no overlay until hero exits (< 20% visible)
        opacity = 0
      } else if (scrollTop < fadeOutThreshold) {
        // Phase 1: dark until 40% viewport, then instant full bright (no gradual fade)
        opacity = 1
      } else {
        // Phase 2: hero exiting with only ~20% visible; fade overlay back in
        opacity =
          visibleRatio <= HERO_OVERLAY_FADEIN_VISIBLE
            ? 1 - visibleRatio / HERO_OVERLAY_FADEIN_VISIBLE
            : 0
      }

      setHeroOverlayOpacity(clamp(opacity, 0, 1))
    }

    const handleScroll = () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        updateOverlay()
        rafId = null
      })
    }

    updateOverlay()
    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      container.removeEventListener('scroll', handleScroll)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [])

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
      {/* Scroll Progress Bar - Fixed, outside content wrapper */}
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
        {/* Header Navigation */}
        <CaseStudyHeader isScrolled={isScrolled} onClose={handleClose} />

        {/* Main Content - Hero Section */}
        <main className="px-6 pt-4 pb-[1.5rem] max-w-[1920px] mx-auto min-h-[calc(100vh-6rem)] flex flex-col relative">
        {/* Title */}
        <AnimatedTitle
          text={caseStudy.title}
          animationType="fadeIn"
          alwaysAnimate
          delay={0.8}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary mb-6 md:mb-8 leading-tight tracking-[-0.05em] max-w-[1400px]"
        />

        {/* Metadata Layout */}
        <motion.div
          className="flex flex-col md:flex-row gap-12 md:gap-0 mt-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Description */}
          <div className="max-w-full sm:max-w-[25rem] md:max-w-[28.75rem] text-left">
            <p className="text-base md:text-lg text-text-secondary leading-relaxed">
              {caseStudy.fullDescription || caseStudy.description}
            </p>
          </div>

          {/* Auto gap between description and metadata */}
          <div className="md:flex-1 md:min-w-0" />

          {/* Team and Timeline */}
          {(caseStudy.team || caseStudy.timeline) && (
            <div className="flex flex-col md:flex-row md:gap-[3.5rem] md:items-start">
              {/* Team */}
              {caseStudy.team && caseStudy.team.length > 0 && (
                <div className="md:min-w-[12.5rem] group/team text-left">
                  <h2 className="text-lg font-medium text-text-primary mb-4">
                    Team
                  </h2>
                  <ul className="space-y-2">
                    {caseStudy.team.map((member, index) => (
                      <li key={index}>
                        <a
                          href="#"
                          className="group/link relative inline-block text-base font-normal text-text-secondary transition-opacity duration-200 group-hover/team:opacity-40 hover:!opacity-100"
                        >
                          {member}
                          <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-current transition-all duration-300 ease-out group-hover/link:w-full" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Timeline */}
              {caseStudy.timeline && (
                <div className="md:min-w-[12.5rem] text-left">
                  <h2 className="text-lg font-medium text-text-primary mb-4">
                    Timeline
                  </h2>
                  <p className="text-base font-normal text-text-secondary">
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
              {/* Scroll-driven dark overlay: darkens image at start, fades out by 40% viewport, fades back in when hero exits (~20% visible) */}
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
      {renderCaseStudyContent(caseStudy, children, {
        isContentRevealed,
        onToggleContent: () => setIsContentRevealed(!isContentRevealed),
      })}
      </div>
      {/* End content wrapper */}
    </div>
  )
}

/**
 * Renders case study specific content based on slug
 * Keeps the main component clean by separating content rendering logic
 */
function renderCaseStudyContent(
  caseStudy: CaseStudy,
  children: React.ReactNode,
  contentState: { isContentRevealed: boolean; onToggleContent: () => void }
) {
  switch (caseStudy.slug) {
    case 'nyc-dcwp-business-licenses':
      return children ? (
        <motion.section
          className="w-full px-6 py-16 md:py-24 max-w-[1920px] mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <CaseStudyContent>{children}</CaseStudyContent>
        </motion.section>
      ) : null

    case 'gutenberg-cms-usability-evaluation':
      return (
        <GutenbergContent
          isContentRevealed={contentState.isContentRevealed}
          onToggleContent={contentState.onToggleContent}
        />
      )

    default:
      return children ? (
        <motion.section
          className="w-full px-6 py-16 md:py-24 max-w-[1920px] mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <CaseStudyContent>{children}</CaseStudyContent>
        </motion.section>
      ) : null
  }
}
