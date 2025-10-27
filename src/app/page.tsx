import { Navbar } from '@/components/layout/Navbar'
import { Hero } from '@/components/hero/Hero'

export default function Home() {
  return (
    <div className="min-h-screen w-full px-6 pt-6">
      <Navbar />
      <Hero />
    </div>
  )
}
