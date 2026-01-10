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
import { CaseStudyContent } from '@/components/case-study/CaseStudyContent'
import { OptimizedImage } from '@/components/case-study/OptimizedImage'

interface CaseStudyDetailProps {
  caseStudy: CaseStudy
  children?: React.ReactNode
}

const navLinks = [
  { label: 'Writings', href: '/writings' },
  { label: 'Explorations', href: '/explorations' },
  { label: 'About', href: '/about' },
]

export function CaseStudyDetail({ caseStudy, children }: CaseStudyDetailProps) {
  const { theme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isContentRevealed, setIsContentRevealed] = useState(false)
  const [isSUSCalloutOpen, setIsSUSCalloutOpen] = useState(false)
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

      {/* NYC DCWP Case Study Content Section */}
      {caseStudy.slug === 'nyc-dcwp-business-licenses' && children && (
        <motion.section
          className="w-full px-6 py-16 md:py-24 max-w-[1920px] mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <CaseStudyContent>
            {children}
          </CaseStudyContent>
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
              <p className="text-base md:text-[20px] font-normal text-text-color90 leading-relaxed">
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
              <p className="text-base md:text-[20px] font-normal text-text-color90 leading-relaxed">
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
              <h3 className="text-lg md:text-[24px] font-bold text-text-primary mb-6 md:mb-[28px]">
                My Role
              </h3>

              <div className="space-y-6 md:space-y-8">
                <p className="text-base md:text-[20px] font-medium text-text-color90 leading-relaxed">
                  As part of a four-person research team, I contributed to:
                </p>
                <ul className="space-y-2 md:space-y-3 list-disc list-inside ml-2">
                  <li className="text-base md:text-[20px] font-normal text-text-color90 leading-relaxed">
                    Research planning and hypothesis development
                  </li>
                  <li className="text-base md:text-[20px] font-normal text-text-color90 leading-relaxed">
                    Eye-tracking study design and moderation
                  </li>
                  <li className="text-base md:text-[20px] font-normal text-text-color90 leading-relaxed">
                    Analyzing the insights
                  </li>
                  <li className="text-base md:text-[20px] font-normal text-text-color90 leading-relaxed">
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
                className="group inline-flex items-center gap-2 text-base md:text-[20px] font-normal text-text-primary hover:text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
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
                className="text-base md:text-[20px] font-normal"
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
              <h3 className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]" style={{ color: 'rgb(var(--color-text-tertiary))' }}>
                Project Overview
              </h3>

              <AnimatedTitle
                text="Understanding First-Time User Experience in a Legacy CMS"
                animationType="fadeIn"
                alwaysAnimate={false}
                delay={0}
                className="text-2xl md:text-[40px] font-bold text-text-primary mb-6 md:mb-8 leading-tight"
              />

              <div className="space-y-6 md:space-y-8 mb-12 md:mb-16">
                <p className="text-base md:text-[20px] font-normal leading-relaxed" style={{ color: 'rgb(var(--color-text-color90))' }}>
                  Gutenberg Technologies is an e-learning course builder tool for
                  creating text-based learning materials like textbooks and
                  training resources, primarily used by publishers. Their course
                  management system (CMS) is outdated and difficult for new users.
                </p>
                <p className="text-base md:text-[20px] font-normal leading-relaxed" style={{ color: 'rgb(var(--color-text-color90))' }}>
                  The client wanted to improve the usability of the CMS, make the
                  product more intuitive, and integrate generative AI to simplify
                  resource creation.
                </p>
              </div>

              {/* Divider */}
              <div
                className="border-t my-24 md:my-32"
                style={{ borderColor: 'rgb(var(--color-text-color10))' }}
              />

              {/* Research Objectives Section */}
              <h3 className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]" style={{ color: 'rgb(var(--color-text-tertiary))' }}>
                Research Objectives
              </h3>

              <p className="text-base md:text-[20px] font-normal leading-relaxed mb-8 md:mb-10" style={{ color: 'rgb(var(--color-text-color90))' }}>
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
                    <div
                      className="text-base md:text-[20px] font-semibold leading-relaxed text-text-color90"
                    >
                      Table of contents (TOC)
                    </div>
                    <p
                      className="text-base md:text-[20px] font-normal mt-1 md:mt-1.5 leading-relaxed"
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
                    <div
                      className="text-base md:text-[20px] font-semibold leading-relaxed text-text-color90"
                    >
                      Authoring content from scratch
                    </div>
                    <p
                      className="text-base md:text-[20px] font-normal mt-1 md:mt-1.5 leading-relaxed"
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
                    <div
                      className="text-base md:text-[20px] font-semibold leading-relaxed text-text-color90"
                    >
                      Drag-and-drop
                    </div>
                    <p
                      className="text-base md:text-[20px] font-normal mt-1 md:mt-1.5 leading-relaxed"
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
                    <div className="text-base md:text-[20px] font-semibold text-text-color90 leading-relaxed">
                      AI-assisted content generation
                    </div>
                    <p
                      className="text-base md:text-[20px] font-normal mt-1 md:mt-1.5 leading-relaxed"
                      style={{ color: 'rgb(var(--color-text-tertiary))' }}
                    >
                      Explore how users discover and interact with the &quot;Generate with AI&quot; tool.
                    </p>
                  </div>
                </li>
              </ul>

              {/* Divider */}
              <div
                className="border-t my-24 md:my-32"
                style={{ borderColor: 'rgb(var(--color-text-color10))' }}
              />

              {/* Methodology Section */}
              <div className="mt-12 md:mt-16">
                <h3 className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]" style={{ color: 'rgb(var(--color-text-tertiary))' }}>
                  Methodology
                </h3>

                <AnimatedTitle
                  text="Evaluating usability through behavioral and attitudinal data"
                  animationType="fadeIn"
                  alwaysAnimate={false}
                  delay={0}
                  className="text-2xl md:text-[40px] font-bold text-text-primary mb-6 md:mb-8 leading-tight"
                />

                {/* Eye Tracking Setup Image */}
                <div className="mb-12 md:mb-16">
                  <OptimizedImage
                    webpSrc="/images/case-studies/gutenberg-cms-usability-evaluation/eyetracking-01.webp"
                    fallbackSrc="/images/case-studies/gutenberg-cms-usability-evaluation/eyetracking-01.jpg"
                    alt="Eye tracking setup during usability testing session"
                    width={940}
                    height={705}
                    className="w-full rounded-lg"
                  />
                </div>

                <div className="space-y-6 md:space-y-8 mb-12 md:mb-16">
                  <p className="text-base md:text-[20px] font-normal leading-relaxed" style={{ color: 'rgb(var(--color-text-color90))' }}>
                    We conducted <span className="font-bold">9 moderated desktop usability sessions</span> (45–60 minutes each) using <span className="font-bold">Tobii eye-tracking</span> software, with participants recruited through <span className="font-bold">dscout Private Panels</span>. To better understand user behavior, we paired eye tracking with the <span className="font-bold">Retrospective Think-Aloud (RTA)</span> method, asking participants to reflect on their actions after completing tasks. This allowed us to capture not just what users did, but where they looked and why they made specific decisions. Participants also completed the <span className="font-bold">System Usability Scale (SUS)</span> to provide a quantitative measure of overall usability.
                  </p>
                </div>

                <h4 className="text-base md:text-[22px] font-bold mb-6 md:mb-[28px]" style={{ color: 'rgb(var(--color-text-primary))' }}>
                  Data Collected:
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Task Performance */}
                  <div className="space-y-3">
                    <OptimizedImage
                      webpSrc="/images/case-studies/gutenberg-cms-usability-evaluation/timeontask.webp"
                      fallbackSrc="/images/case-studies/gutenberg-cms-usability-evaluation/timeontask.png"
                      alt="Task Performance data"
                      width={223}
                      height={116}
                      className="w-full"
                    />
                    <div className="space-y-1">
                      <p className="text-[14px] font-bold leading-relaxed" style={{ color: 'rgb(var(--color-text-secondary))' }}>
                        Task Performance
                      </p>
                      <p className="text-[14px] font-normal leading-relaxed" style={{ color: 'rgb(var(--color-text-color60))' }}>
                        Tracking task completion, time-on-task to identify friction points across key authoring workflows.
                      </p>
                    </div>
                  </div>

                  {/* Usability Assessment */}
                  <div className="space-y-3">
                    <OptimizedImage
                      webpSrc="/images/case-studies/gutenberg-cms-usability-evaluation/SUS.webp"
                      fallbackSrc="/images/case-studies/gutenberg-cms-usability-evaluation/SUS.png"
                      alt="Usability Assessment data"
                      width={223}
                      height={116}
                      className="w-full"
                    />
                    <div className="space-y-1">
                      <p className="text-[14px] font-bold leading-relaxed" style={{ color: 'rgb(var(--color-text-secondary))' }}>
                        Usability Assessment
                      </p>
                      <p className="text-[14px] font-normal leading-relaxed" style={{ color: 'rgb(var(--color-text-color60))' }}>
                        Using System Usability Scale (SUS) responses to capture participants&apos; overall perception of ease of use and system clarity.
                      </p>
                    </div>
                  </div>

                  {/* Gaze Data */}
                  <div className="space-y-3">
                    <OptimizedImage
                      webpSrc="/images/case-studies/gutenberg-cms-usability-evaluation/Gazedata.webp"
                      fallbackSrc="/images/case-studies/gutenberg-cms-usability-evaluation/Gazedata.png"
                      alt="Gaze Data visualization"
                      width={223}
                      height={116}
                      className="w-full"
                    />
                    <div className="space-y-1">
                      <p className="text-[14px] font-bold leading-relaxed" style={{ color: 'rgb(var(--color-text-secondary))' }}>
                        Gaze Data
                      </p>
                      <p className="text-[14px] font-normal leading-relaxed" style={{ color: 'rgb(var(--color-text-color60))' }}>
                        Analyzing gaze plots, heatmaps, and gaze replays to understand where users focused their attention and what they noticed or missed.
                      </p>
                    </div>
                  </div>

                  {/* Retrospective Think-Aloud */}
                  <div className="space-y-3">
                    <OptimizedImage
                      webpSrc="/images/case-studies/gutenberg-cms-usability-evaluation/RTA.webp"
                      fallbackSrc="/images/case-studies/gutenberg-cms-usability-evaluation/RTA.png"
                      alt="Retrospective Think-Aloud notes"
                      width={223}
                      height={116}
                      className="w-full"
                    />
                    <div className="space-y-1">
                      <p className="text-[14px] font-bold leading-relaxed" style={{ color: 'rgb(var(--color-text-secondary))' }}>
                        Retrospective Think-Aloud (RTA) Notes
                      </p>
                      <p className="text-[14px] font-normal leading-relaxed" style={{ color: 'rgb(var(--color-text-color60))' }}>
                        Reviewing session replays with participants to understand the reasoning behind their actions and decisions.
                      </p>
                    </div>
                  </div>
                </div>

                {/* System Usability Scale (SUS) Section */}
                <div className="mt-16 md:mt-24">
                  <h4 className="text-xs md:text-sm font-bold uppercase tracking-wider mb-6 md:mb-8" style={{ color: 'rgb(var(--color-text-tertiary))' }}>
                    System Usability Scale (SUS)
                  </h4>

                  {/* SUS Diagram Image */}
                  <div className="mb-6 md:mb-8">
                    <OptimizedImage
                      webpSrc="/images/case-studies/gutenberg-cms-usability-evaluation/SUS_Diagram.webp"
                      fallbackSrc="/images/case-studies/gutenberg-cms-usability-evaluation/SUS_Diagram.png"
                      alt="System Usability Scale (SUS) score visualization"
                      width={940}
                      height={529}
                      className="w-full"
                    />
                  </div>

                  {/* What is SUS? Button and Text Callout */}
                  <div className="mb-8 md:mb-12">
                    {!isSUSCalloutOpen ? (
                      <button
                        onClick={() => setIsSUSCalloutOpen(true)}
                        className="text-base md:text-[18px] font-normal underline underline-offset-4 hover:opacity-70 transition-opacity"
                        style={{ color: 'rgb(var(--color-text-primary))' }}
                      >
                        What is SUS?
                      </button>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                        className="relative p-4 md:p-6"
                        style={{
                          backgroundColor: 'rgb(var(--color-surface-elevated))',
                        }}
                      >
                        {/* Close Button */}
                        <button
                          onClick={() => setIsSUSCalloutOpen(false)}
                          className="absolute top-4 right-4 md:top-6 md:right-6 z-10 w-8 h-8 flex items-center justify-center hover:opacity-70 transition-opacity"
                          aria-label="Close"
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 4L4 12M4 4L12 12"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              style={{ color: 'rgb(var(--color-text-primary))' }}
                            />
                          </svg>
                        </button>

                        {/* Simple Text Callout */}
                        <div className="flex items-start gap-4">
                          <span className="text-2xl md:text-3xl flex-shrink-0" aria-hidden="true">💡</span>
                          <p className="text-base md:text-[18px] font-normal leading-relaxed flex-1" style={{ color: 'rgb(var(--color-text-color90))' }}>
                            The System Usability Scale (SUS) is a widely used 10-question survey rated on a 1-5 agreement scale to assess perceived product usability.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Text below image */}
                  <div className="space-y-8 md:space-y-12">
                    {/* Overall Score */}
                    <div className="space-y-3">
                      <div className="text-[48px] font-bold" style={{ color: '#FF9500' }}>
                        60
                      </div>
                      <p className="text-[20px] font-bold leading-relaxed" style={{ color: 'rgb(var(--color-text-primary))' }}>
                        The Overall score was 60 (Needs improvement - Below Industry Benchmark)
                      </p>
                    </div>

                    {/* Learnability and Usability Scores */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      {/* Learnability Score */}
                      <div className="space-y-3">
                        <div className="text-[32px] font-bold" style={{ color: 'rgb(var(--color-text-primary))' }}>
                          72.2
                        </div>
                        <p className="text-base md:text-[18px] font-semibold leading-relaxed" style={{ color: 'rgb(var(--color-text-primary))' }}>
                          The Learnability score was 72.2 <span style={{ color: theme === 'dark' ? '#4ADE80' : '#22C55E' }}>— Good</span>
                        </p>
                        <p className="text-[16px] font-normal leading-relaxed" style={{ color: 'rgb(var(--color-text-secondary))' }}>
                          The tool feels familiar enough for users to learn how to use properly
                        </p>
                      </div>

                      {/* Usability Score */}
                      <div className="space-y-3">
                        <div className="text-[32px] font-bold" style={{ color: 'rgb(var(--color-text-primary))' }}>
                          56.9
                        </div>
                        <p className="text-base md:text-[18px] font-semibold leading-relaxed" style={{ color: 'rgb(var(--color-text-primary))' }}>
                          The Usability score was 56.9 <span style={{ color: theme === 'dark' ? '#F87171' : '#EF4444' }}>— Needs improvement</span>
                        </p>
                        <p className="text-[16px] font-normal leading-relaxed" style={{ color: 'rgb(var(--color-text-secondary))' }}>
                          People struggle to find the right features and understand how to start, which makes it overall less usable
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
