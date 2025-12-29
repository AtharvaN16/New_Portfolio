'use client'

import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/hero/Hero'
import { SelectedWork } from '@/components/work/SelectedWork'
import { FullpageCard } from '@/components/ui/FullpageCard'
import { WorkDialog } from '@/components/animations/WorkDialog'
import { CaseStudyDialog } from '@/components/animations/CaseStudyDialog'

/**
 * Home Page - Basic Layout (no scroll effects)
 */
export default function Home() {
  return (
    <>
      <div className="relative w-full bg-background">
        {/* Navbar */}
        <div className="px-6 pt-6">
          <Navbar />
        </div>

        {/* Hero */}
        <main className="px-6">
          <Hero />
        </main>

        {/* FullpageCard */}
        <FullpageCard
          title="Helping New Yorkers apply for business licenses with ease"
          description="A case study on improving the application process for business licenses for the NYC Department of Consumer and Worker Protection."
          variant="surface"
          slug="nyc-dcwp-business-licenses"
        />

        {/* Selected Work */}
        <div className="bg-background px-6 py-12">
          <SelectedWork />
        </div>

        {/* Footer */}
        <Footer />
      </div>

      <WorkDialog />
      <CaseStudyDialog />
    </>
  )
}
