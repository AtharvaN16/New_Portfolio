'use client'

import { useRef, useState, useEffect, useMemo } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/hero/Hero'
import { SelectedWork } from '@/components/work/SelectedWork'
import { FullpageCard } from '@/components/ui/FullpageCard'
import { WorkDialog } from '@/components/animations/WorkDialog'
import { CaseStudyDialog } from '@/components/animations/CaseStudyDialog'

/**
 * Home Page - Scroll Reveal Effect
 *
 * ALL LAYERS ARE FIXED for proper z-index stacking in same viewport context:
 * z-index: 10 - SelectedWork (bottom layer, revealed when Card exits)
 * z-index: 30 - Hero (middle layer, solid bg covers SelectedWork, content moves up to simulate scroll)
 * z-index: 40 - Card (top layer, parallax, exits to reveal SelectedWork)
 *
 * Flow:
 * 1. Hero visible with solid bg (covers SelectedWork)
 * 2. Hero content + Navbar move UP with scroll (simulated scroll via transform)
 * 3. Card catches up with faster parallax, covers Hero
 * 4. Hero fades as Card covers it
 * 5. Card exits through top
 * 6. SelectedWork revealed (was always underneath)
 * 7. SelectedWork scrolls after card fully exits
 *
 * Performance optimizations:
 * - Memoized transform ranges (avoid array recreation)
 * - will-change hints for GPU acceleration
 * - Throttled resize handler with RAF
 * - Removed expensive blur filter
 * - Water blobs pause when scrolled away
 */

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const selectedWorkRef = useRef<HTMLDivElement>(null)
  const [shouldPauseBlobs, setShouldPauseBlobs] = useState(false)
  const [selectedWorkHeight, setSelectedWorkHeight] = useState(0)

  // Measure SelectedWork content height dynamically (throttled with RAF)
  useEffect(() => {
    let rafId: number | null = null

    const measureHeight = () => {
      if (selectedWorkRef.current) {
        const height = selectedWorkRef.current.scrollHeight
        setSelectedWorkHeight(height)
      }
    }

    const handleResize = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
      rafId = requestAnimationFrame(measureHeight)
    }

    measureHeight()
    window.addEventListener('resize', handleResize)

    // Re-measure after a short delay to ensure content is rendered
    const timeout = setTimeout(measureHeight, 100)

    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timeout)
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Pause/resume water blobs based on scroll position (performance)
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest > 0.03 && !shouldPauseBlobs) {
      setShouldPauseBlobs(true)
    } else if (latest <= 0.03 && shouldPauseBlobs) {
      setShouldPauseBlobs(false)
    }
  })

  // Memoize transform input arrays for performance (avoid recreating on every render)
  const heroContentRange = useMemo(() => [0, 0.2] as const, [])
  const heroContentOutput = useMemo(() => ['0vh', '-30vh'] as const, [])
  const navbarRange = useMemo(() => [0, 0.02] as const, [])
  const navbarOutput = useMemo(() => [1, 0] as const, [])
  const heroOpacityRange = useMemo(() => [0, 0.195, 0.2] as const, [])
  const heroOpacityOutput = useMemo(() => [1, 1, 0] as const, [])
  const cardRange = useMemo(() => [0, 0.2, 0.5] as const, [])
  const cardOutput = useMemo(() => ['100vh', '0vh', '-105vh'] as const, [])

  // Hero CONTENT moves up to simulate scrolling (0-20% scroll moves content up by 30vh)
  const heroContentY = useTransform(scrollYProgress, heroContentRange, heroContentOutput)

  // Navbar scroll-based fade (0-2% scroll)
  const navbarScrollOpacity = useTransform(scrollYProgress, navbarRange, navbarOutput)

  // Hero wrapper: stays visible until Card covers viewport, then fades to invisible
  // Blur removed - too expensive for 0.5% scroll range
  const heroOpacity = useTransform(scrollYProgress, heroOpacityRange, heroOpacityOutput)

  // Hero pointer-events: disable when invisible to allow clicking through to SelectedWork
  const heroPointerEvents = useTransform(heroOpacity, (opacity) =>
    opacity > 0 ? 'auto' : 'none'
  )

  // Card parallax: starts below viewport, catches up, covers hero, exits through top
  const cardY = useTransform(scrollYProgress, cardRange, cardOutput)

  // Calculate dynamic scroll distances based on actual SelectedWork content height
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 1000
  const selectedWorkHeightVh = selectedWorkHeight > 0 
    ? (selectedWorkHeight / viewportHeight) * 100 
    : 300 // fallback if not measured yet
  const selectedWorkMoveVh = Math.max(0, selectedWorkHeightVh - 100) // Move up by (height - viewport) to reveal bottom

  // Container height: initial space (200vh for Hero/Card effects) + space to scroll SelectedWork
  const containerHeightVh = 200 + selectedWorkMoveVh

  // SelectedWork: stays fixed at viewport until card exits (50%), then scrolls up dynamically
  // Memoize output range based on calculated height
  const selectedWorkRange = useMemo(() => [0, 0.5, 1] as const, [])
  const selectedWorkOutput = useMemo(
    () => ['0vh', '0vh', `-${selectedWorkMoveVh}vh`] as const,
    [selectedWorkMoveVh]
  )
  const selectedWorkY = useTransform(scrollYProgress, selectedWorkRange, selectedWorkOutput)

  const handleBrowseWorkClick = () => {
    if (!containerRef.current || typeof window === 'undefined') return

    // Ensure card moves up immediately (matches existing comment in AnimatedLink)
    window.dispatchEvent(new CustomEvent('force-card-up'))

    const viewportHeight = window.innerHeight
    const containerTop = containerRef.current.offsetTop
    const containerHeightPx = (containerHeightVh / 100) * viewportHeight
    const maxScrollWithinContainer = Math.max(containerHeightPx - viewportHeight, 0)

    // Scroll to the midpoint of the container's scroll range where SelectedWork is revealed
    const targetProgress = 0.5
    const targetScrollWithin = maxScrollWithinContainer * targetProgress
    const targetScrollY = containerTop + targetScrollWithin

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth',
    })
  }

  return (
    <>
      <div 
        ref={containerRef} 
        className="relative" 
        style={{ 
          height: `${containerHeightVh}vh`, 
          backgroundColor: 'rgb(var(--color-background))' 
        }}
      >
        
        {/* ===== LAYER 1: SelectedWork ===== */}
        {/* Always here at bottom, covered by Hero, revealed when Card exits */}
        <motion.div
          className="fixed inset-0"
          style={{
            y: selectedWorkY,
            zIndex: 10,
            backgroundColor: 'rgb(var(--color-background))',
            willChange: 'transform',
          }}
        >
          {/* Inner wrapper to measure actual content height */}
          <div ref={selectedWorkRef}>
            <div className="px-6 pt-12 pb-20">
              <SelectedWork />
            </div>
            <Footer />
          </div>
        </motion.div>

        {/* ===== LAYER 2: Hero ===== */}
        {/* FIXED with solid bg to cover SelectedWork. Content moves up to simulate scroll. */}
        <motion.div
          className="fixed inset-0"
          style={{
            zIndex: 30,
            backgroundColor: 'rgb(var(--color-background))',
            opacity: heroOpacity,
            pointerEvents: heroPointerEvents, // Dynamic - must be 'none' when invisible to allow clicks through
            willChange: 'opacity',
          }}
        >
          {/* Navbar - fades out with scroll (0-2%) */}
          <motion.div
            className="px-6 pt-6"
            style={{
              opacity: navbarScrollOpacity,
              willChange: 'opacity'
            }}
          >
            <Navbar />
          </motion.div>
          
          {/* Hero content - moves UP with scroll to simulate scrolling */}
          <motion.main
            className="px-6"
            style={{
              y: heroContentY,
              willChange: 'transform',
            }}
          >
            <Hero
              shouldPauseBlobs={shouldPauseBlobs}
              onBrowseWorkClick={handleBrowseWorkClick}
            />
          </motion.main>
        </motion.div>

        {/* ===== LAYER 3: Card ===== */}
        {/* Parallax overlay - catches up, covers Hero, exits to reveal SelectedWork */}
        <motion.div
          className="fixed inset-0 pointer-events-none"
          style={{
            y: cardY,
            zIndex: 40,
            willChange: 'transform',
          }}
        >
          <div className="h-screen pointer-events-auto">
            <FullpageCard
              title="Helping New Yorkers apply for business licenses with ease"
              description="A case study on improving the application process for business licenses for the NYC Department of Consumer and Worker Protection."
              variant="surface"
              slug="nyc-dcwp-business-licenses"
            />
          </div>
        </motion.div>

      </div>

      <WorkDialog />
      <CaseStudyDialog />
    </>
  )
}
