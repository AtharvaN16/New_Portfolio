'use client'

import { useState, useCallback, useEffect } from 'react'
import { m } from 'framer-motion'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/hero/Hero'
import { SelectedWork } from '@/components/work/SelectedWork'
import { FullpageCard } from '@/components/ui/FullpageCard'
import { useHomeScroll } from '@/hooks/use-home-scroll'
import { WorkDialog } from '@/components/dialogs/WorkDialog'
import { CaseStudyDialog } from '@/components/dialogs/CaseStudyDialog'
import { ExplorationsDialog } from '@/components/dialogs/ExplorationsDialog'
import { AboutDialog } from '@/components/dialogs/AboutDialog'
import { WritingsDialog } from '@/components/dialogs/WritingsDialog'

/**
 * Home Page - Scroll Reveal Effect
 *
 * ALL LAYERS ARE FIXED for proper z-index stacking in same viewport context:
 * z-index:  5 - Footer (fixed at bottom, revealed when SelectedWork scrolls past)
 * z-index: 10 - SelectedWork (covers footer, revealed when Card exits)
 * z-index: 30 - Hero (middle layer, solid bg covers SelectedWork, content moves up to simulate scroll)
 * z-index: 40 - Card (top layer, parallax, exits to reveal SelectedWork)
 *
 * Flow:
 * 1. Hero visible with solid bg (covers SelectedWork + Footer)
 * 2. Hero content + Navbar move UP with scroll (simulated scroll via transform)
 * 3. Card catches up with faster parallax, covers Hero
 * 4. Hero fades as Card covers it
 * 5. Card exits through top
 * 6. SelectedWork revealed (was always underneath)
 * 7. SelectedWork scrolls after card fully exits
 * 8. SelectedWork scrolls past viewport, revealing Footer fixed at bottom
 */

export default function Home() {
  const [shouldTriggerFooterShimmer, setShouldTriggerFooterShimmer] =
    useState(false)
  const [shouldLoadDialogs, setShouldLoadDialogs] = useState(false)

  const {
    containerRef,
    selectedWorkRef,
    footerRef,
    scrollYProgress,
    shouldPauseBlobs,
    containerHeightVh,
    heroContentY,
    navbarScrollOpacity,
    heroOpacity,
    heroPointerEvents,
    cardY,
    selectedWorkY,
    footerRevealProgress,
    handleBrowseWorkClick,
    handleGetInTouchClick,
  } = useHomeScroll()

  const handleGetInTouchWithShimmer = useCallback(() => {
    handleGetInTouchClick()
    setShouldTriggerFooterShimmer(true)
    // Reset after some time so it can be re-triggered
    setTimeout(() => setShouldTriggerFooterShimmer(false), 3100)
  }, [handleGetInTouchClick])

  useEffect(() => {
    // Load dialogs after a short delay to keep initial paint light
    const timer = setTimeout(() => {
      setShouldLoadDialogs(true)
    }, 1000)

    const checkDialogRoute = () => {
      const path = window.location.pathname
      if (
        path === '/work' ||
        path === '/explorations' ||
        path === '/about' ||
        path === '/writings' ||
        path.startsWith('/case-studies/')
      ) {
        setShouldLoadDialogs(true)
      }
    }

    checkDialogRoute()

    window.addEventListener('popstate', checkDialogRoute)
    window.addEventListener('workdialog:check', checkDialogRoute)
    window.addEventListener('explorationsdialog:check', checkDialogRoute)
    window.addEventListener('casestudydialog:check', checkDialogRoute)
    window.addEventListener('aboutdialog:check', checkDialogRoute)
    window.addEventListener('writingsdialog:check', checkDialogRoute)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('popstate', checkDialogRoute)
      window.removeEventListener('workdialog:check', checkDialogRoute)
      window.removeEventListener('explorationsdialog:check', checkDialogRoute)
      window.removeEventListener('casestudydialog:check', checkDialogRoute)
      window.removeEventListener('aboutdialog:check', checkDialogRoute)
      window.removeEventListener('writingsdialog:check', checkDialogRoute)
    }
  }, [])

  return (
    <>
      <div
        ref={containerRef}
        className="relative"
        style={{
          height: `${containerHeightVh}vh`,
          backgroundColor: 'rgb(var(--color-background))',
        }}
      >
        {/* ===== LAYER 1: SelectedWork ===== */}
        <m.div
          className="fixed top-0 left-0 right-0"
          style={{
            y: selectedWorkY,
            zIndex: 10,
            backgroundColor: 'rgb(var(--color-background))',
            willChange: 'transform',
          }}
        >
          <div ref={selectedWorkRef}>
            <div className="px-6 2xl:px-[140px] pt-12 pb-20">
              <SelectedWork
                enableHomeCardRecede
                homeScrollProgress={scrollYProgress}
                desktopSpacingScale={1.12}
              />
            </div>
          </div>
        </m.div>

        {/* ===== LAYER 2: Hero ===== */}
        <m.div
          className="fixed inset-0 flex flex-col"
          style={{
            zIndex: 30,
            backgroundColor: 'rgb(var(--color-background))',
            opacity: heroOpacity,
            pointerEvents: heroPointerEvents,
            willChange: 'opacity',
          }}
        >
          <m.div
            className="px-6 2xl:px-[140px] pt-6"
            style={{
              opacity: navbarScrollOpacity,
              willChange: 'opacity',
            }}
          >
            <Navbar />
          </m.div>

          <m.main
            id="main-content"
            className="px-0 md:px-6 2xl:px-[140px] flex-1"
            style={{
              y: heroContentY,
              willChange: 'transform',
            }}
          >
            <Hero
              shouldPauseBlobs={shouldPauseBlobs}
              onBrowseWorkClick={handleBrowseWorkClick}
              onGetInTouchClick={handleGetInTouchWithShimmer}
            />
          </m.main>
        </m.div>

        {/* ===== LAYER 3: Card ===== */}
        <m.div
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
              tags={['Selected Work', 'Client Project', 'UX Research']}
              mediaSrc="/images/case-studies/nyc-dcwp-business-licenses/fullpage-card-v2.webp"
              mediaType="image"
              mediaAlt="NYC DCWP Home Improvement Contractor License Application"
              variant="surface"
              slug="nyc-dcwp-business-licenses"
            />
          </div>
        </m.div>
      </div>

      {/* ===== FOOTER ===== */}
      <div
        ref={footerRef}
        className="fixed bottom-0 left-0 right-0"
        style={{ zIndex: 5 }}
      >
        <Footer
          revealProgress={footerRevealProgress}
          triggerShimmer={shouldTriggerFooterShimmer}
        />
      </div>

      {shouldLoadDialogs && (
        <>
          <WorkDialog />
          <ExplorationsDialog />
          <CaseStudyDialog />
          <AboutDialog />
          <WritingsDialog />
        </>
      )}
    </>
  )
}
