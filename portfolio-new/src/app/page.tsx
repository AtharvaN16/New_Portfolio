'use client'

import { motion } from 'framer-motion'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/hero/Hero'
import { SelectedWork } from '@/components/work/SelectedWork'
import { FullpageCard } from '@/components/ui/FullpageCard'
import { WorkDialog } from '@/components/animations/WorkDialog'
import { CaseStudyDialog } from '@/components/animations/CaseStudyDialog'
import { useHomeScroll } from '@/hooks/use-home-scroll'

/**
 * Home Page - Scroll Reveal Effect
 */

export default function Home() {
  const {
    containerRef,
    selectedWorkRef,
    footerRef,
    shouldPauseBlobs,
    containerHeightPx,
    heroContentY,
    navbarScrollOpacity,
    heroOpacity,
    heroPointerEvents,
    cardY,
    selectedWorkY,
    footerRevealProgress,
    handleBrowseWorkClick,
  } = useHomeScroll()

  return (
    <>
      <div
        ref={containerRef}
        className="relative"
        style={{
          height: `${containerHeightPx}px`,
          backgroundColor: 'rgb(var(--color-background))',
        }}
      >
        {/* ===== LAYER 1: SelectedWork ===== */}
        <motion.div
          className="fixed top-0 left-0 right-0"
          style={{
            y: selectedWorkY,
            zIndex: 10,
            backgroundColor: 'rgb(var(--color-background))',
            willChange: 'transform',
          }}
        >
          <div ref={selectedWorkRef}>
            <div className="px-6 pt-12 pb-20">
              <SelectedWork />
            </div>
          </div>
        </motion.div>

        {/* ===== LAYER 2: Hero ===== */}
        <motion.div
          className="fixed inset-0 flex flex-col"
          style={{
            zIndex: 30,
            backgroundColor: 'rgb(var(--color-background))',
            opacity: heroOpacity,
            pointerEvents: heroPointerEvents,
            willChange: 'opacity',
          }}
        >
          <motion.div
            className="px-6 pt-6"
            style={{
              opacity: navbarScrollOpacity,
              willChange: 'opacity',
            }}
          >
            <Navbar />
          </motion.div>

          <motion.main
            className="px-0 md:px-6 flex-1"
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
              mediaSrc="/images/case-studies/nyc-dcwp-business-licenses/fullpage-card-v2.png"
              mediaType="image"
              mediaAlt="NYC DCWP Home Improvement Contractor License Application"
              variant="surface"
              slug="nyc-dcwp-business-licenses"
            />
          </div>
        </motion.div>
      </div>

      {/* ===== FOOTER ===== */}
      <div
        ref={footerRef}
        className="fixed bottom-0 left-0 right-0"
        style={{ zIndex: 5 }}
      >
        <Footer revealProgress={footerRevealProgress} />
      </div>

      <WorkDialog />
      <CaseStudyDialog />
    </>
  )
}
