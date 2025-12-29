'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
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
 * Structure:
 * 1. Hero - scrolls normally, fades as card covers it
 * 2. SelectedWork - FIXED at viewport (underneath card)
 * 3. Card - FIXED at viewport (on top), transforms upward to exit
 * 4. Footer - normal flow at the end
 * 
 * The card and SelectedWork are LAYERED at the same viewport position.
 * Card scrolls away (via transform), revealing SelectedWork underneath.
 */
export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Track scroll progress across the entire page
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Hero fades out as card comes up (0% to 30% scroll)
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15, 0.3], [1, 1, 0])
  const heroBlur = useTransform(scrollYProgress, [0.15, 0.3], [0, 10])

  // Card Y position: starts at 100vh, moves to -100vh (exits top)
  // 0% scroll: card at 100vh (below viewport)
  // 30% scroll: card at 0 (covering viewport)
  // 70% scroll: card at -100vh (exited)
  const cardY = useTransform(scrollYProgress, [0, 0.3, 0.7], ['100vh', '0vh', '-100vh'])
  
  // Card exits at 70% scroll - after this, SelectedWork scrolls normally
  const cardExited = useTransform(scrollYProgress, (p) => p > 0.7)

  return (
    <>
      {/* Scroll container - 400vh gives enough room for all phases */}
      <div ref={containerRef} className="relative bg-background" style={{ height: '400vh' }}>
        
        {/* === LAYER 1: Hero (Normal flow, fades out) === */}
        <motion.div 
          className="relative z-10 min-h-screen"
          style={{ 
            opacity: heroOpacity,
            filter: useTransform(heroBlur, (b) => `blur(${b}px)`),
          }}
        >
          <div className="px-6 pt-6">
            <Navbar />
          </div>
          <main className="px-6">
            <Hero />
          </main>
        </motion.div>

        {/* === LAYER 2: SelectedWork (Fixed underneath card) === */}
        <div className="fixed inset-0 z-20 overflow-auto">
          <div className="min-h-screen bg-background px-6 pt-24 pb-20">
            <SelectedWork />
          </div>
          <Footer />
        </div>

        {/* === LAYER 3: Card (Fixed on top, transforms to exit) === */}
        <motion.div 
          className="fixed inset-0 z-30 pointer-events-auto"
          style={{ 
            y: cardY,
          }}
        >
          <div className="h-screen">
            <FullpageCard
              title="Helping New Yorkers apply for business licenses with ease"
              description="A case study on improving the application process for business licenses for the NYC Department of Consumer and Worker Protection."
              variant="surface"
              slug="nyc-dcwp-business-licenses"
            />
          </div>
        </motion.div>

        {/* Fixed Navbar - always on top */}
        <div className="fixed top-0 left-0 right-0 z-[100] px-6 pt-6 pointer-events-auto">
          <Navbar />
        </div>

      </div>

      <WorkDialog />
      <CaseStudyDialog />
    </>
  )
}
