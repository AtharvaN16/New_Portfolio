'use client'

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/hero/Hero'
import { SelectedWork } from '@/components/work/SelectedWork'
import { FullpageCard } from '@/components/ui/FullpageCard'
import { WorkDialog } from '@/components/animations/WorkDialog'
import { CaseStudyDialog } from '@/components/animations/CaseStudyDialog'

export default function Home() {
  const [forceCardUp, setForceCardUp] = useState(false)
  const [cardHasExited, setCardHasExited] = useState(false)

  // Listen for custom event to force FullpageCard out of view
  useEffect(() => {
    const handleForceUp = () => setForceCardUp(true)
    const handleReset = () => setForceCardUp(false)

    window.addEventListener('force-card-up', handleForceUp)
    window.addEventListener('reset-card', handleReset)

    return () => {
      window.removeEventListener('force-card-up', handleForceUp)
      window.removeEventListener('reset-card', handleReset)
    }
  }, [])

  // Track when card has exited viewport to allow scrolling
  useEffect(() => {
    const handleScroll = () => {
      const workSection = document.getElementById('work')
      if (!workSection) return

      const workPosition = workSection.offsetTop
      const scrollPosition = window.scrollY
      const viewportHeight = window.innerHeight

      // Card exits after 200vh of scrolling through its container (parallaxIntensity=2)
      // With parallaxIntensity=2, the card moves from 0vh to -100vh over the 200vh container
      // At 100vh: card is at -50vh (halfway out)
      // At 200vh: card is at -100vh (fully exited)
      const scrollPastWork = scrollPosition - workPosition
      const cardExitThreshold = viewportHeight * 2.0 // Card is fully gone at 200vh

      setCardHasExited(scrollPastWork > cardExitThreshold)

      // Reset card if we scroll back up above the work section (with some buffer)
      if (scrollPosition < workPosition - viewportHeight * 0.5 && forceCardUp) {
        setForceCardUp(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [forceCardUp])
  return (
    <>
      {/* Main content */}
      <div id="page-wrapper" className="relative min-h-screen w-full bg-background">
        <div className="px-6 pt-6">
          <Navbar />
          <main id="main-content">
            <Hero />
          </main>
        </div>

        {/* Scroll reveal section - FullpageCard exits with parallax, revealing SelectedWork below */}
        <div className="relative h-[500vh] bg-background">
          {/* Scroll anchor */}
          <div id="work" className="absolute left-0 w-px h-px top-[100vh]" aria-hidden="true" />

          {/* SelectedWork - sticky background layer, revealed as card scrolls away, locked until card exits */}
          <div
            className={`sticky top-0 z-30 bg-background px-6 pb-20 ${
              cardHasExited ? 'min-h-screen overflow-y-auto' : 'h-screen overflow-hidden'
            }`}
          >
            <SelectedWork />
          </div>

          {/* FullpageCard - on top, exits with parallax effect */}
          <div className="absolute left-0 right-0 top-0 z-50">
            <FullpageCard
              title="Helping New Yorkers apply for business licenses with ease"
              description="A case study on improving the application process for business licenses for the NYC Department of Consumer and Worker Protection."
              variant="surface"
              parallaxIntensity={2}
              forceHidden={forceCardUp}
              slug="nyc-dcwp-business-licenses"
            />
          </div>
        </div>

        {/* Footer - part of main page flow */}
        <Footer />
      </div>

      <WorkDialog />
      <CaseStudyDialog />
    </>
  )
}
