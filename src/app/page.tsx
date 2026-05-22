'use client'

import { useState, useCallback, useEffect, Suspense } from 'react'
import { m } from 'framer-motion'
import dynamic from 'next/dynamic'
import { Navbar } from '@/components/layout/Navbar'
import { Hero } from '@/components/hero/Hero'
import { FullpageCard } from '@/components/ui/FullpageCard'
import { useHomeScroll } from '@/hooks/use-home-scroll'

// Dynamically import heavy components to reduce initial JS payload
const SelectedWork = dynamic(() => import('@/components/work/SelectedWork').then(mod => mod.SelectedWork), {
  ssr: true,
})
const Footer = dynamic(() => import('@/components/layout/Footer').then(mod => mod.Footer), {
  ssr: true,
})

// Dynamically import dialogs to reduce initial JS payload
const WorkDialog = dynamic(() => import('@/components/dialogs/WorkDialog').then(mod => mod.WorkDialog))
const CaseStudyDialog = dynamic(() => import('@/components/dialogs/CaseStudyDialog').then(mod => mod.CaseStudyDialog))
const ExplorationsDialog = dynamic(() => import('@/components/dialogs/ExplorationsDialog').then(mod => mod.ExplorationsDialog))
const AboutDialog = dynamic(() => import('@/components/dialogs/AboutDialog').then(mod => mod.AboutDialog))
const WritingsDialog = dynamic(() => import('@/components/dialogs/WritingsDialog').then(mod => mod.WritingsDialog))

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
    isHeroMounted,
    isCardMounted,
    isWorkMounted,
    isFooterMounted,
  } = useHomeScroll()

  const handleGetInTouchWithShimmer = useCallback(() => {
    handleGetInTouchClick()
    setShouldTriggerFooterShimmer(true)
    // Reset after some time so it can be re-triggered
    setTimeout(() => setShouldTriggerFooterShimmer(false), 3100)
  }, [handleGetInTouchClick])

  useEffect(() => {
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

    const loadDialogs = () => setShouldLoadDialogs(true)

    checkDialogRoute()

    window.addEventListener('popstate', checkDialogRoute)
    window.addEventListener('workdialog:preload', loadDialogs)
    window.addEventListener('workdialog:check', checkDialogRoute)
    window.addEventListener('explorationsdialog:preload', loadDialogs)
    window.addEventListener('explorationsdialog:check', checkDialogRoute)
    window.addEventListener('casestudydialog:preload', loadDialogs)
    window.addEventListener('casestudydialog:check', checkDialogRoute)
    window.addEventListener('aboutdialog:preload', loadDialogs)
    window.addEventListener('aboutdialog:check', checkDialogRoute)
    window.addEventListener('writingsdialog:preload', loadDialogs)
    window.addEventListener('writingsdialog:check', checkDialogRoute)

    return () => {
      window.removeEventListener('popstate', checkDialogRoute)
      window.removeEventListener('workdialog:preload', loadDialogs)
      window.removeEventListener('workdialog:check', checkDialogRoute)
      window.removeEventListener('explorationsdialog:preload', loadDialogs)
      window.removeEventListener('explorationsdialog:check', checkDialogRoute)
      window.removeEventListener('casestudydialog:preload', loadDialogs)
      window.removeEventListener('casestudydialog:check', checkDialogRoute)
      window.removeEventListener('aboutdialog:preload', loadDialogs)
      window.removeEventListener('aboutdialog:check', checkDialogRoute)
      window.removeEventListener('writingsdialog:preload', loadDialogs)
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
        {/* ===== LAYER 1: Hero (Bottom) ===== */}
        <m.div
          className="fixed inset-0 flex flex-col"
          style={{
            zIndex: 30,
            backgroundColor: 'rgb(var(--color-background))',
            opacity: heroOpacity,
            pointerEvents: heroPointerEvents,
            willChange: 'opacity',
            // Soft Gating: Hide from GPU when far off-screen, but keep mounted for WebGL
            display: isHeroMounted ? 'flex' : 'none'
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

            {/* ===== LAYER 2: NYC Card (Slides over Hero) ===== */}
            <m.div
            className="fixed inset-0 pointer-events-none"
            style={{
              y: cardY,
              zIndex: 40,
              willChange: 'transform',
              display: isCardMounted ? 'block' : 'none'
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
                priority
              />
            </div>
            </m.div>

            {/* ===== LAYER 3: SelectedWork (Top) ===== */}
            {isWorkMounted && (
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
                  <Suspense fallback={<div className="min-h-screen bg-background" />}>
                    <SelectedWork
                      enableHomeCardRecede
                      homeScrollProgress={scrollYProgress}
                      desktopSpacingScale={1.12}
                    />
                  </Suspense>
                </div>
              </div>
            </m.div>
            )}

      </div>

      {/* ===== FOOTER (Only mounted at the end to prevent peek-through) ===== */}
      {isFooterMounted && (
        <div
          ref={footerRef}
          className="fixed bottom-0 left-0 right-0"
          style={{ zIndex: 5 }}
        >
          <Suspense fallback={<div className="h-[400px] bg-background" />}>
            <Footer
              revealProgress={footerRevealProgress}
              triggerShimmer={shouldTriggerFooterShimmer}
            />
          </Suspense>
        </div>
      )}

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
