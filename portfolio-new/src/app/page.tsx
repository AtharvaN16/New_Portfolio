'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/hero/Hero'
import { SelectedWork } from '@/components/work/SelectedWork'
import { FullpageCard } from '@/components/ui/FullpageCard'
import { WorkDialog } from '@/components/animations/WorkDialog'
import { CaseStudyDialog } from '@/components/animations/CaseStudyDialog'

/**
 * Home Page - Correct Flow
 * 
 * 1. Hero (normal scroll)
 * 2. Card (parallax - faster, catches up, covers hero, exits)
 * 3. SelectedWork (sticky underneath, revealed when card exits)
 * 4. Footer
 */
export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [shouldPauseBlobs, setShouldPauseBlobs] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest > 0.05 && !shouldPauseBlobs) {
      setShouldPauseBlobs(true)
    }
  })

  // Hero fades as card covers it (20-40% scroll)
  const heroOpacity = useTransform(scrollYProgress, [0.2, 0.4], [1, 0])
  const heroBlur = useTransform(scrollYProgress, [0.2, 0.4], [0, 12])

  // Card parallax: catches up to hero, covers it, exits
  // Starts at 100vh, at 20% scroll reaches 0, at 50% scroll exits at -100vh
  const cardY = useTransform(scrollYProgress, [0, 0.2, 0.5], ['100vh', '0vh', '-100vh'])

  return (
    <>
      <div ref={containerRef} className="relative bg-background" style={{ height: '400vh' }}>
        
        {/* Hero - Normal document flow, scrolls at normal speed */}
        <motion.section 
          className="relative z-10 min-h-screen bg-background"
          style={{ 
            opacity: heroOpacity,
            filter: useTransform(heroBlur, (b) => b > 0 ? `blur(${b}px)` : 'none'),
          }}
        >
          <div className="px-6 pt-6">
            <Navbar />
          </div>
          <main className="px-6">
            <Hero shouldPauseBlobs={shouldPauseBlobs} />
          </main>
        </motion.section>

        {/* Reveal Section - Card exits to reveal sticky SelectedWork */}
        <div className="relative" style={{ height: '250vh' }}>
          {/* SelectedWork - Sticky underneath card */}
          <div className="sticky top-0 z-20 min-h-screen bg-background">
            <div className="px-6 pt-12 pb-20">
              <SelectedWork />
            </div>
          </div>
        </div>

        {/* Footer - Normal flow after reveal section */}
        <div className="relative z-20 bg-background">
          <Footer />
        </div>

        {/* Card - Fixed overlay with parallax (faster than scroll) */}
        <motion.div 
          className="fixed inset-0 z-30 pointer-events-none"
          style={{ y: cardY }}
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
