'use client'

import { motion, useScroll, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Lenis from 'lenis'
import { useTheme } from '@/components/providers/ThemeProvider'
import type { CaseStudy } from '@/lib/data/case-studies'
import { HoverLink } from '@/components/ui/HoverLink'
import { AnimatedTitle } from '@/components/ui/AnimatedTitle'

interface CaseStudyDetailProps {
  caseStudy: CaseStudy
}

const navLinks = [
  { label: 'Writings', href: '/writings' },
  { label: 'Explorations', href: '/explorations' },
  { label: 'About', href: '/about' },
]

export function CaseStudyDetail({ caseStudy }: CaseStudyDetailProps) {
  const { theme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isContentRevealed, setIsContentRevealed] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const localLenisRef = useRef<Lenis | null>(null)

  // Scroll progress tracking for progress bar - track scroll within the container
  const { scrollYProgress } = useScroll({
    container: containerRef,
  })

  // Initialize local Lenis for smooth scrolling within the container
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    // Skip smooth scroll if user prefers reduced motion
    if (prefersReducedMotion) {
      return
    }

    // Wait for DOM to be fully ready
    const timeoutId = setTimeout(() => {
      try {
        // Initialize Lenis with the container as wrapper
        const localLenis = new Lenis({
          wrapper: container,
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 2,
          infinite: false,
        })

        localLenisRef.current = localLenis

        // Animation frame loop for local Lenis
        let rafId: number | null = null

        function raf(time: number) {
          localLenis.raf(time)
          rafId = requestAnimationFrame(raf)
        }

        rafId = requestAnimationFrame(raf)

        // Cleanup
        return () => {
          if (rafId !== null) {
            cancelAnimationFrame(rafId)
          }
          localLenis.destroy()
          localLenisRef.current = null
        }
      } catch (error) {
        console.error('Local Lenis initialization failed:', error)
        // Container will still work with native scroll
      }
    }, 0)

    return () => clearTimeout(timeoutId)
  }, [])

  // Listen to container scroll - optimized with RAF throttling to prevent lag
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let rafId: number | null = null
    let lastScrolled = false

    const handleScroll = () => {
      // Cancel previous RAF if it hasn't run yet
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }

      rafId = requestAnimationFrame(() => {
        const scrolled = container.scrollTop > 50
        // Only update state if value changed
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

  const handleToggleContent = () => {
    const wasRevealed = isContentRevealed
    setIsContentRevealed(!isContentRevealed)

    // If hiding content, smoothly scroll to button position
    if (wasRevealed && buttonRef.current) {
      // Use setTimeout to ensure state update happens first
      setTimeout(() => {
        const button = buttonRef.current
        if (button) {
          const buttonTop = button.offsetTop
          const targetScroll = buttonTop - 100 // Offset from top

          // Use local Lenis instance if available, otherwise fallback to manual scroll
          if (localLenisRef.current) {
            localLenisRef.current.scrollTo(targetScroll, {
              duration: 0.6,
              easing: (t: number) => 1 - Math.pow(1 - t, 3),
            })
          } else if (containerRef.current) {
            // Fallback to manual smooth scroll if Lenis not available
            const container = containerRef.current
            const startScroll = container.scrollTop
            const distance = targetScroll - startScroll
            const duration = 600
            const startTime = performance.now()

            const animateScroll = (currentTime: number) => {
              const elapsed = currentTime - startTime
              const progress = Math.min(elapsed / duration, 1)
              const easeOut = 1 - Math.pow(1 - progress, 3)
              container.scrollTop = startScroll + distance * easeOut

              if (progress < 1) {
                requestAnimationFrame(animateScroll)
              }
            }

            requestAnimationFrame(animateScroll)
          }
        }
      }, 0)
    }
  }

  // Recalculate Lenis scroll bounds when content is revealed/hidden
  useEffect(() => {
    if (localLenisRef.current) {
      // Wait for animation to complete before resizing
      setTimeout(() => {
        localLenisRef.current?.resize()
      }, 600) // Match the animation duration from AnimatePresence
    }
  }, [isContentRevealed])

  return (
    <div
      ref={containerRef}
      data-lenis-prevent
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

      {/* Header Navigation */}
      <motion.header
        className="sticky top-0 z-50 bg-background"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ willChange: 'transform' }}
      >
        <nav className="px-6 py-6 flex items-center justify-between max-w-[1920px] mx-auto">
          {/* Logo - slides up on scroll */}
          <motion.div
            animate={{
              y: isScrolled ? -100 : 0,
              opacity: isScrolled ? 0 : 1,
            }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: 'transform, opacity' }}
          >
            <Link
              href="/"
              className="relative h-11 w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
            >
              <Image
                src={
                  theme === 'dark'
                    ? '/icons/Logo dark mode.svg'
                    : '/icons/Logo light mode.svg'
                }
                alt="Atharva Nayak"
                width={165}
                height={44}
                priority
                className="h-11 w-auto"
              />
            </Link>
          </motion.div>

          {/* Centered Navigation Links - slide up on scroll */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2"
            animate={{
              y: isScrolled ? -100 : 0,
              opacity: isScrolled ? 0 : 1,
            }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: 'transform, opacity' }}
          >
            <ul className="hidden sm:flex items-center gap-10 md:gap-12">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 + index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <HoverLink href={link.href}>{link.label}</HoverLink>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Close Button - stays visible */}
          <motion.button
            onClick={handleClose}
            className="text-sm md:text-base font-medium text-text-primary hover:text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded px-3 py-1.5 uppercase tracking-wider"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.4,
              delay: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileTap={{ scale: 0.95 }}
          >
            CLOSE
          </motion.button>
        </nav>
      </motion.header>

      {/* Main Content */}
      <main className="px-6 pt-4 pb-[1.5rem] max-w-[1920px] mx-auto min-h-[calc(100vh-6rem)] flex flex-col relative">
        {/* Title - Just below navbar with fadeIn animation (delayed until page transition completes) */}
        <AnimatedTitle
          text={caseStudy.title}
          animationType="fadeIn"
          alwaysAnimate
          delay={0.8}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary mb-6 md:mb-8 leading-tight max-w-[1400px]"
        />

        {/* Metadata Layout */}
        <motion.div
          className="flex flex-col md:flex-row gap-12 md:gap-0 mt-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Description - Fixed max-width: responsive for different screen sizes */}
          <div className="max-w-full sm:max-w-[25rem] md:max-w-[28.75rem] text-left">
            <p className="text-base md:text-lg text-text-secondary leading-relaxed">
              {caseStudy.fullDescription || caseStudy.description}
            </p>
          </div>

          {/* Auto gap between description and frame - pushes frame to edge */}
          <div className="md:flex-1 md:min-w-0" />

          {/* Team and Timeline - Combined auto layout frame */}
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
                          {/* Underline animation */}
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

      {/* Full-page Image Section */}
      <motion.section
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

      {/* NYC Case Study Content Section */}
      {caseStudy.slug === 'nyc-dcwp-business-licenses' && (
        <motion.section
          className="w-full px-6 py-16 md:py-24 max-w-[1920px] mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="max-w-[940px] mx-auto text-left">
            {/* Main Heading */}
            <h2 className="text-2xl md:text-[32px] font-bold text-text-primary mb-12 md:mb-16 leading-tight">
              Helping 14000+ business owners renew and apply for licenses with
              less hassle and more clarity.
            </h2>

            {/* Sub-heading */}
            <h3 className="text-lg md:text-[28px] font-bold text-text-primary mb-6 md:mb-[28px]">
              The Client
            </h3>

            {/* Paragraphs */}
            <div className="space-y-6 md:space-y-8">
              <p className="text-base md:text-[18px] font-normal text-text-secondary leading-relaxed">
                The New York City Department of Consumer Affairs and Worker
                Protection is responsible for issuing licenses to over 45,000
                businesses across more than 40 industries and enforces key
                consumer protection, licensing, and workplace laws that impact
                countless others
              </p>
              <p className="text-base md:text-[18px] font-normal text-text-secondary leading-relaxed">
                The product is the department&apos;s online portal, which allows
                the public to apply for or renew their licenses online.
              </p>
            </div>

            {/* About the Project Section */}
            <h3 className="text-lg md:text-[28px] font-bold text-text-primary mb-6 md:mb-[28px] mt-12 md:mt-16">
              About the Project
            </h3>

            <div className="space-y-6 md:space-y-8">
              <p className="text-base md:text-[18px] font-normal text-text-secondary leading-relaxed">
                NYC DCWP Chief Information Officer Rina Sharma approached Pratt
                Institute with a project to improve the functionality of their
                business portal, with a specific focus on the &ldquo;Home
                Improvement License&rdquo; category. This category has the
                highest number of licensees (14000+). Many Home Improvement
                Contractors tend to be older, may not be very tech-savvy, and
                often have limited proficiency in English.
              </p>
              <p className="text-base md:text-[18px] font-normal text-text-secondary leading-relaxed">
                They wanted us to help identify pain points and areas for
                improvement in the user journey for License holders and
                applicants, making it easier and faster to navigate the renewal
                and application process with minimal confusion or frustration.
              </p>
            </div>
          </div>
        </motion.section>
      )}

      {/* Gutenberg CMS Case Study Content Section */}
      {caseStudy.slug === 'gutenberg-cms-usability-evaluation' && (
        <motion.section
          className="w-full px-6 py-16 md:py-24 max-w-[1920px] mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="max-w-[940px] mx-auto text-left">
            {/* Abstract Section */}
            <h3 className="text-lg md:text-[28px] font-bold text-text-primary mb-6 md:mb-[28px]">
              Abstract
            </h3>

            <div className="space-y-6 md:space-y-8">
              <p className="text-base md:text-[18px] font-normal text-text-secondary leading-relaxed">
                This case study is based on a usability evaluation of Gutenberg
                Technologies&apos; course management system (CMS), a legacy
                e-learning content authoring platform used primarily by
                publishers. The research focused on understanding how new users
                create content, manage the table of contents, interact with
                drag-and-drop features, and discover and use AI-assisted content
                generation. Using moderated user testing with eye-tracking and
                Retrospective Think-Aloud (RTA), the study triangulated
                behavioral metrics, gaze data, and verbal feedback across nine
                participants to identify critical breakdowns in onboarding and
                authoring workflows.
              </p>
              <p className="text-base md:text-[18px] font-normal text-text-secondary leading-relaxed">
                Findings revealed a strong learnability baseline driven by
                familiar editor patterns, but significant usability issues caused
                by expectation mismatches, poor feature discoverability, and
                unclear system-generated structures. Key problems included
                confusion around default template pages, forced template
                selection during &ldquo;author from scratch&rdquo; flows, and
                multiple points of friction in the AI content generation
                experience.
              </p>
            </div>

            {/* My Role Section - Visible below Abstract */}
            <div className="mt-12 md:mt-16">
              <h3 className="text-lg md:text-[28px] font-bold text-text-primary mb-6 md:mb-[28px]">
                My Role
              </h3>

              <div className="space-y-6 md:space-y-8">
                <p className="text-base md:text-[18px] font-medium text-text-secondary leading-relaxed">
                  As part of a four-person research team, I contributed to:
                </p>
                <ul className="space-y-2 md:space-y-3 list-disc list-inside ml-2">
                  <li className="text-base md:text-[18px] font-normal text-text-secondary leading-relaxed">
                    Research planning and hypothesis development
                  </li>
                  <li className="text-base md:text-[18px] font-normal text-text-secondary leading-relaxed">
                    Eye-tracking study design and moderation
                  </li>
                  <li className="text-base md:text-[18px] font-normal text-text-secondary leading-relaxed">
                    Analyzing the insights
                  </li>
                  <li className="text-base md:text-[18px] font-normal text-text-secondary leading-relaxed">
                    Design recommendations
                  </li>
                </ul>
              </div>
            </div>

            {/* Read Full Case Study Button */}
            <div className="mt-12 md:mt-16 flex items-center gap-4">
              <button
                ref={buttonRef}
                onClick={handleToggleContent}
                className="group inline-flex items-center gap-2 text-base md:text-[18px] font-normal text-text-primary hover:text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
              >
                <span className="relative inline-block">
                  {isContentRevealed ? 'Hide case study' : 'Read full case study'}
                  {/* Animated underline */}
                  <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-current transition-all duration-300 ease-out group-hover:w-full" />
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="w-4 h-4 transition-transform duration-200"
                  style={{ transform: isContentRevealed ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  aria-hidden="true"
                >
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <span
                className="text-base md:text-[18px] font-normal"
                style={{ color: 'rgb(var(--color-text-tertiary))' }}
              >
                8 min read
              </span>
            </div>

            {/* Full Case Study Content - Clean show/hide animation */}
            <AnimatePresence initial={false}>
              {isContentRevealed && (
                <motion.div
                  className="mt-12 md:mt-16"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {/* Content wrapper */}
                  <div>

              {/* Project Overview Section */}
              <h3 className="text-lg md:text-[28px] font-bold text-text-primary mb-6 md:mb-[28px]">
                Project Overview
              </h3>

              <h4 className="text-lg md:text-[24px] font-bold text-primary mb-6 md:mb-[28px]">
                Understanding First-Time User Experience in a Legacy CMS
              </h4>

              <div className="space-y-6 md:space-y-8 mb-12 md:mb-16">
                <p className="text-base md:text-[18px] font-normal text-text-secondary leading-relaxed">
                  Gutenberg Technologies is an e-learning course builder tool for
                  creating text-based learning materials like textbooks and
                  training resources, primarily used by publishers. Their course
                  management system (CMS) is outdated and difficult for new users.
                </p>
                <p className="text-base md:text-[18px] font-normal text-text-secondary leading-relaxed">
                  The client wanted to improve the usability of the CMS, make the
                  product more intuitive, and integrate generative AI to simplify
                  resource creation.
                </p>
              </div>

              {/* Divider */}
              <div 
                className="border-t my-12 md:my-16"
                style={{ borderColor: 'rgb(var(--color-text-color30))' }}
              />

              {/* Research Objectives Section */}
              <h3 className="text-lg md:text-[28px] font-bold text-primary mb-6 md:mb-[28px]">
                Research Objectives
              </h3>

              <p className="text-base md:text-[18px] font-normal text-text-secondary leading-relaxed mb-8 md:mb-10">
                The objective of the study is to understand the use of the{' '}
                <span className="font-semibold">Table of Contents</span>,{' '}
                <span className="font-semibold">Authoring from scratch</span>, and the
                functionality of the <span className="font-semibold">drag and drop features</span> in the CMS.
              </p>

              <ul className="space-y-6 md:space-y-7">
                <li className="flex items-start gap-4">
                  <span 
                    className="mt-[0.6em] h-1.5 w-1.5 rounded-full flex-shrink-0" 
                    style={{ backgroundColor: 'rgb(var(--color-text-secondary))' }}
                  />
                  <div>
                    <div className="text-base md:text-[18px] font-semibold text-text-secondary leading-relaxed">
                      Table of contents (TOC)
                    </div>
                    <p 
                      className="text-base md:text-[18px] font-normal mt-1 md:mt-1.5 leading-relaxed"
                      style={{ color: 'rgb(var(--color-text-tertiary))' }}
                    >
                      Explore users&apos; challenges in creating and managing the TOC, their understanding
                      of different options offered in TOC, and the reasoning behind their actions.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span 
                    className="mt-[0.6em] h-1.5 w-1.5 rounded-full flex-shrink-0" 
                    style={{ backgroundColor: 'rgb(var(--color-text-secondary))' }}
                  />
                  <div>
                    <div className="text-base md:text-[18px] font-semibold text-text-secondary leading-relaxed">
                      Authoring content from scratch
                    </div>
                    <p 
                      className="text-base md:text-[18px] font-normal mt-1 md:mt-1.5 leading-relaxed"
                      style={{ color: 'rgb(var(--color-text-tertiary))' }}
                    >
                      Explore users&apos; starting points, their authoring process, and where challenges
                      or misunderstandings arise.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span 
                    className="mt-[0.6em] h-1.5 w-1.5 rounded-full flex-shrink-0" 
                    style={{ backgroundColor: 'rgb(var(--color-text-secondary))' }}
                  />
                  <div>
                    <div className="text-base md:text-[18px] font-semibold text-text-secondary leading-relaxed">
                      Drag-and-drop
                    </div>
                    <p 
                      className="text-base md:text-[18px] font-normal mt-1 md:mt-1.5 leading-relaxed"
                      style={{ color: 'rgb(var(--color-text-tertiary))' }}
                    >
                      Explore where users get confused, what creates the highest cognitive load, and
                      why drag-and-drop feels difficult.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span 
                    className="mt-[0.6em] h-1.5 w-1.5 rounded-full flex-shrink-0" 
                    style={{ backgroundColor: 'rgb(var(--color-text-secondary))' }}
                  />
                  <div>
                    <div className="text-base md:text-[18px] font-semibold text-text-secondary leading-relaxed">
                      AI-assisted content generation
                    </div>
                    <p 
                      className="text-base md:text-[18px] font-normal mt-1 md:mt-1.5 leading-relaxed"
                      style={{ color: 'rgb(var(--color-text-tertiary))' }}
                    >
                      Explore how users discover and interact with the &quot;Generate with AI&quot; tool.
                    </p>
                  </div>
                </li>
              </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.section>
      )}
    </div>
  )
}
