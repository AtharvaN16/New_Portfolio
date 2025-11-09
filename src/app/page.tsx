import { Navbar } from '@/components/layout/Navbar'
import { Hero } from '@/components/hero/Hero'
import { FullpageCard } from '@/components/ui/FullpageCard'

export default function Home() {
  return (
    <div className="min-h-screen w-full">
      <div className="px-6 pt-6">
        <Navbar />
        <main id="main-content">
          <Hero />
        </main>
      </div>
      <FullpageCard
        title="Helping New Yorkers apply for business licenses with ease"
        description="A case study on improving the application process for business licenses for the NYC Department of Consumer and Worker Protection."
        variant="surface"
      />
    </div>
  )
}
