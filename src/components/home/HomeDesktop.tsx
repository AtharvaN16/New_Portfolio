'use client'

import { useState, useCallback, Suspense } from 'react'
import { m } from 'framer-motion'
import dynamic from 'next/dynamic'
import { Navbar } from '@/components/layout/Navbar'
import { Hero } from '@/components/hero/Hero'
import { FullpageCard } from '@/components/ui/FullpageCard'
import { useHomeScroll } from '@/hooks/use-home-scroll'
import { useOverlayDialogs } from '@/hooks/use-overlay-dialogs'

const SelectedWork = dynamic(
  () =>
    import('@/components/work/SelectedWork').then((mod) => mod.SelectedWork),
  { ssr: true }
)
const Footer = dynamic(
  () => import('@/components/layout/Footer').then((mod) => mod.Footer),
  { ssr: true }
)

const WorkDialog = dynamic(() =>
  import('@/components/dialogs/route-slide-dialogs').then(
    (mod) => mod.WorkDialog
  )
)
const CaseStudyDialog = dynamic(() =>
  import('@/components/dialogs/CaseStudyDialog').then(
    (mod) => mod.CaseStudyDialog
  )
)
const ExplorationsDialog = dynamic(() =>
  import('@/components/dialogs/route-slide-dialogs').then(
    (mod) => mod.ExplorationsDialog
  )
)
const AboutDialog = dynamic(() =>
  import('@/components/dialogs/route-slide-dialogs').then(
    (mod) => mod.AboutDialog
  )
)
const WritingsDialog = dynamic(() =>
  import('@/components/dialogs/route-slide-dialogs').then(
    (mod) => mod.WritingsDialog
  )
)

/**
 * Desktop home — fixed-layer scroll reveal (unchanged behavior).
 */
export function HomeDesktop() {
  const [shouldTriggerFooterShimmer, setShouldTriggerFooterShimmer] =
    useState(false)
  const { isDialogMounted } = useOverlayDialogs()

  const {
    containerRef,
    selectedWorkRef,
    footerRef,
    scrollYProgress,
    containerHeightPx,
    isMounted,
    heroContentY,
    navbarScrollOpacity,
    heroOpacity,
    heroIsHidden,
    heroPointerEvents,
    cardY,
    cardMediaScrimOpacity,
    selectedWorkY,
    footerRevealProgress,
    handleBrowseWorkClick,
    handleGetInTouchClick,
  } = useHomeScroll()

  const handleGetInTouchWithShimmer = useCallback(() => {
    handleGetInTouchClick()
    setShouldTriggerFooterShimmer(true)
    setTimeout(() => setShouldTriggerFooterShimmer(false), 3100)
  }, [handleGetInTouchClick])

  return (
    <>
      <div
        ref={containerRef}
        className="relative"
        style={{
          height: isMounted ? `${containerHeightPx}px` : '200svh',
          backgroundColor: 'rgb(var(--color-background))',
        }}
      >
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
              <Suspense
                fallback={<div className="min-h-screen bg-background" />}
              >
                <SelectedWork
                  enableHomeCardRecede
                  homeScrollProgress={scrollYProgress}
                  desktopSpacingScale={1.12}
                />
              </Suspense>
            </div>
          </div>
        </m.div>

        <m.div
          className="fixed inset-0 flex flex-col"
          style={{
            zIndex: 30,
            backgroundColor: 'rgb(var(--color-background))',
            opacity: heroOpacity,
            visibility: heroIsHidden ? 'hidden' : 'visible',
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
              onBrowseWorkClick={handleBrowseWorkClick}
              onGetInTouchClick={handleGetInTouchWithShimmer}
            />
          </m.main>
        </m.div>

        <m.div
          className="fixed inset-0 pointer-events-none"
          style={{
            y: isMounted ? cardY : '100vh',
            zIndex: 40,
            willChange: 'transform',
          }}
        >
          <div className="h-[100svh] pointer-events-auto">
            <FullpageCard
              title="Helping New Yorkers apply for business licenses with ease"
              description="A case study on improving the application process for business licenses for the NYC Department of Consumer and Worker Protection."
              tags={['Selected Work', 'Client Project', 'UX Research']}
              mediaSrc="/images/case-studies/nyc-dcwp-business-licenses/fullpage-card-v2.avif"
              mediaType="image"
              mediaAlt="NYC DCWP Home Improvement Contractor License Application"
              variant="surface"
              slug="nyc-dcwp-business-licenses"
              priority
              mediaScrimOpacity={cardMediaScrimOpacity}
            />
          </div>
        </m.div>
      </div>

      <div
        ref={footerRef}
        className="fixed bottom-0 left-0 right-0"
        style={{ zIndex: 5 }}
      >
        <Suspense fallback={<div className="h-[400px] bg-background" />}>
          <Footer
            layoutVariant="desktop-reveal"
            revealProgress={footerRevealProgress}
            triggerShimmer={shouldTriggerFooterShimmer}
          />
        </Suspense>
      </div>

      {isDialogMounted('work') && <WorkDialog />}
      {isDialogMounted('explorations') && <ExplorationsDialog />}
      {isDialogMounted('case-study') && <CaseStudyDialog />}
      {isDialogMounted('about') && <AboutDialog />}
      {isDialogMounted('writings') && <WritingsDialog />}
    </>
  )
}
