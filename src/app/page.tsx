import { Navbar } from '@/components/layout/Navbar'
import { Hero } from '@/components/hero/Hero'
import { SelectedWork } from '@/components/work/SelectedWork'
import { FullpageCard } from '@/components/ui/FullpageCard'
import { WorkDialog } from '@/components/animations/WorkDialog'

export default function Home() {
  return (
    <>
      <div id="page-wrapper" className="min-h-screen w-full">
        <div className="px-6 pt-6">
          <Navbar />
          <main id="main-content">
            <Hero />
          </main>
        </div>

        {/* Scroll reveal section - Selected Work underneath, FullpageCard on top */}
        <div className="relative h-[300vh]">
          {/* Selected Work - base layer, stays sticky while being revealed */}
          <div className="sticky top-0 z-30 min-h-screen bg-background px-6">
            <SelectedWork />
          </div>

          {/* FullpageCard - overlays on top, scrolls away with parallax */}
          <div className="absolute left-0 right-0 top-0 z-50">
            <FullpageCard
              title="Helping New Yorkers apply for business licenses with ease"
              description="A case study on improving the application process for business licenses for the NYC Department of Consumer and Worker Protection."
              variant="surface"
              parallaxIntensity={2}
            />
          </div>
        </div>
      </div>

      {/* Swaddle-style dialog - slides up when navigating to /work */}
      <WorkDialog />
    </>
  )
}
