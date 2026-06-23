'use client'

import { useCallback, useEffect, useRef, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { Navbar } from '@/components/layout/Navbar'
import { Hero } from '@/components/hero/Hero'
import { FullpageCard } from '@/components/ui/FullpageCard'
import { useOverlayDialogs } from '@/hooks/use-overlay-dialogs'
import { useMobileFeaturedCover } from '@/hooks/use-mobile-featured-cover'
import { dispatchHomePauseBlobs } from '@/lib/overlay-events'
import '@/styles/home-mobile-scroll.css'

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

const FEATURED_CARD = {
  title: 'Helping New Yorkers apply for business licenses with ease',
  description:
    'A case study on improving the application process for business licenses for the NYC Department of Consumer and Worker Protection.',
  tags: ['Selected Work', 'Client Project', 'UX Research'],
  mediaSrc:
    '/images/case-studies/nyc-dcwp-business-licenses/fullpage-card-v2.avif',
  mediaAlt: 'NYC DCWP Home Improvement Contractor License Application',
  slug: 'nyc-dcwp-business-licenses',
} as const

/**
 * Mobile home — native-flow sticky stack (hero → featured card → work → footer).
 * No fixed-layer transform machine; scroll-driven polish via CSS view timelines.
 */
export function HomeMobile() {
  const { isDialogMounted } = useOverlayDialogs()
  const featuredRef = useRef<HTMLElement>(null)
  const featuredCoverProgress = useMobileFeaturedCover(featuredRef)

  const scrollToFooter = useCallback(() => {
    document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    const target = featuredRef.current
    if (!target || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        dispatchHomePauseBlobs(
          entry.isIntersecting && entry.intersectionRatio > 0.08
        )
      },
      { threshold: [0, 0.08, 0.25] }
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div className="home-mobile relative bg-background">
        <div className="home-mobile-act-one relative">
          <div className="home-mobile-hero-sticky sticky top-0 z-10 flex min-h-[100svh] flex-col bg-background">
            <div
              className="shrink-0 px-6 pt-6"
              style={{
                paddingTop: 'max(1.5rem, env(safe-area-inset-top))',
                paddingLeft: 'max(1.5rem, env(safe-area-inset-left))',
                paddingRight: 'max(1.5rem, env(safe-area-inset-right))',
              }}
            >
              <Navbar />
            </div>

            <div className="home-mobile-hero-content flex min-h-0 flex-1 flex-col">
              <main
                id="main-content"
                className="flex min-h-0 flex-1 flex-col px-0"
              >
                <Hero
                  stableMobileViewport
                  featuredCoverProgress={featuredCoverProgress}
                  onGetInTouchClick={scrollToFooter}
                />
              </main>
            </div>
          </div>

          <section
            ref={featuredRef}
            className="home-mobile-featured relative z-20 min-h-[100svh]"
            aria-label="Featured case study"
          >
            <FullpageCard
              title={FEATURED_CARD.title}
              description={FEATURED_CARD.description}
              tags={[...FEATURED_CARD.tags]}
              mediaSrc={FEATURED_CARD.mediaSrc}
              mediaType="image"
              mediaAlt={FEATURED_CARD.mediaAlt}
              variant="surface"
              slug={FEATURED_CARD.slug}
              priority
              enableMobileScrollScrim
            />
          </section>
        </div>

        <div className="home-mobile-work relative z-10 bg-background px-6 pt-[15svh] pb-20">
          <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <SelectedWork mobileHomeEntrance sectionId="selected-work" />
          </Suspense>
          {/* Opaque seam — footer smog blur bleeds upward; this keeps it behind work */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-28 bg-background"
          />
        </div>

        <div id="footer">
          <Suspense fallback={<div className="h-[400px] bg-background" />}>
            <Footer layoutVariant="mobile-flow" />
          </Suspense>
        </div>
      </div>

      {isDialogMounted('work') && <WorkDialog />}
      {isDialogMounted('explorations') && <ExplorationsDialog />}
      {isDialogMounted('case-study') && <CaseStudyDialog />}
      {isDialogMounted('about') && <AboutDialog />}
      {isDialogMounted('writings') && <WritingsDialog />}
    </>
  )
}
