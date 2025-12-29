'use client'

import { motion, useScroll } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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
  const containerRef = useRef<HTMLDivElement>(null)

  // Scroll progress tracking for progress bar - track scroll within the container
  const { scrollYProgress } = useScroll({
    container: containerRef,
  })

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

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-background text-text-primary overflow-y-auto h-screen"
      style={{
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[4px] z-[60] origin-left"
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
          alwaysAnimate={true}
          delay={0.8}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary mb-6 md:mb-8 leading-tight max-w-[1400px]"
        />

        {/* Category Tags - Below title (temporarily hidden) */}
        {/* <motion.div
          className="mb-16 md:mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
          <p className="text-sm md:text-base text-text-secondary uppercase tracking-wider">
            {caseStudy.tags && caseStudy.tags.length > 0
              ? caseStudy.tags[0]
              : caseStudy.category
                  .split('-')
                  .map((word) => word.toUpperCase())
                  .join(' / ')}
          </p>
        </motion.div> */}

        {/* Metadata Layout */}
        <motion.div
          className="flex flex-col md:flex-row gap-12 md:gap-0 mt-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Description - Fixed max-width: responsive for different screen sizes */}
          <div className="max-w-full sm:max-w-[25rem] md:max-w-[28.75rem]">
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
                <div className="md:min-w-[12.5rem] group/team">
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
                <div className="md:min-w-[12.5rem]">
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
    </div>
  )
}
