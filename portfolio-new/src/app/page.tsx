'use client'

import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/hero/Hero'
import { SelectedWork } from '@/components/work/SelectedWork'
import { FullpageCard } from '@/components/ui/FullpageCard'
import { WorkDialog } from '@/components/animations/WorkDialog'
import { CaseStudyDialog } from '@/components/animations/CaseStudyDialog'

export default function Home() {
  return (
    <>
      {/* Home page container - wraps all scrollable content */}
      <div
        id="home-page-container"
        className="relative min-h-screen w-full bg-background"
      >
        {/* Header and hero section - introduction and animated water blob */}
        <div id="hero-section-wrapper" className="px-6 pt-6">
          <Navbar />
          <main id="main-content">
            <Hero />
          </main>
        </div>

        {/* Featured case study - fullpage card with parallax (z-50) */}
        <div className="relative">
          <FullpageCard
            title="Helping New Yorkers apply for business licenses with ease"
            description="A case study on improving the application process for business licenses for the NYC Department of Consumer and Worker Protection."
            variant="surface"
            parallaxIntensity={2.5}
            slug="nyc-dcwp-business-licenses"
          />
        </div>

        {/* Selected work - revealed underneath as card exits (z-40) */}
        <div className="relative z-40 bg-background px-6 pb-20 pt-4 -mt-[100vh]">
          <SelectedWork />
        </div>

        {/* Footer - revealed underneath selected work (z-30) */}
        <div className="relative z-30 bg-background -mt-12">
          <Footer />
        </div>
      </div>

      {/* Modal dialogs - opened via buttons/links, rendered outside main flow */}
      <WorkDialog />
      <CaseStudyDialog />
    </>
  )
}
