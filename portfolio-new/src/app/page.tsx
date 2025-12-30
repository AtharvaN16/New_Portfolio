'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent, MotionValue } from 'framer-motion'
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
 * 4. Hero fades/blurs as Card covers it
 * 5. Card exits through top
 * 6. SelectedWork revealed (was always underneath)
 * 7. SelectedWork scrolls after card fully exits
 */

// Helper to convert blur value to filter string
function useBlurFilter(blur: MotionValue<number>): MotionValue<string> {
  return useTransform(blur, (b) => b > 0 ? `blur(${b}px)` : 'none')
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [shouldPauseBlobs, setShouldPauseBlobs] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Pause water blobs when scroll starts (performance)
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest > 0.05 && !shouldPauseBlobs) {
      setShouldPauseBlobs(true)
    }
  })

  // Hero CONTENT moves up to simulate scrolling (0-20% scroll moves content up by 30vh)
  const heroContentY = useTransform(scrollYProgress, [0, 0.2], ['0vh', '-30vh'])
  
  // Navbar fades out as we scroll (0-15% scroll)
  const navbarOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  
  // Hero wrapper: INSTANT snap to invisible when card covers viewport (at 20%)
  // Card hits y=0 at 20% scroll. Hero stays visible (opacity=1) until 20%, then snaps to 0.
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const heroBlur = useTransform(scrollYProgress, [0, 0.2], [0, 12])
  const heroFilter = useBlurFilter(heroBlur)

  // Card parallax: starts below viewport, catches up, covers hero, exits through top
  const cardY = useTransform(scrollYProgress, [0, 0.2, 0.5], ['100vh', '0vh', '-100vh'])

  // SelectedWork: stays fixed at viewport until card exits (50%), then scrolls up
  const selectedWorkY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['0vh', '0vh', '-200vh']
  )

  return (
    <>
      <div ref={containerRef} className="relative" style={{ height: '400vh', backgroundColor: 'rgb(var(--color-background))' }}>
        
        {/* ===== LAYER 1: SelectedWork ===== */}
        {/* Always here at bottom, covered by Hero, revealed when Card exits */}
        <motion.div 
          className="fixed inset-0"
          style={{ 
            y: selectedWorkY,
            zIndex: 10,
            backgroundColor: 'rgb(var(--color-background))',
          }}
        >
          <div className="px-6 pt-12 pb-20">
            <SelectedWork />
          </div>
          <Footer />
        </motion.div>

        {/* ===== LAYER 2: Hero ===== */}
        {/* FIXED with solid bg to cover SelectedWork. Content moves up to simulate scroll. */}
        <motion.div 
          className="fixed inset-0"
          style={{ 
            zIndex: 30,
            backgroundColor: 'rgb(var(--color-background))',
            opacity: heroOpacity,
            filter: heroFilter,
          }}
        >
          {/* Navbar - fades out separately (faster than hero content) */}
          <motion.div 
            className="px-6 pt-6"
            style={{ opacity: navbarOpacity }}
          >
            <Navbar />
          </motion.div>
          
          {/* Hero content - moves UP with scroll to simulate scrolling */}
          <motion.main 
            className="px-6"
            style={{ y: heroContentY }}
          >
            <Hero shouldPauseBlobs={shouldPauseBlobs} />
          </motion.main>
        </motion.div>

        {/* ===== LAYER 3: Card ===== */}
        {/* Parallax overlay - catches up, covers Hero, exits to reveal SelectedWork */}
        <motion.div 
          className="fixed inset-0 pointer-events-none"
          style={{ 
            y: cardY,
            zIndex: 40,
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
