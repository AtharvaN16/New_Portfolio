'use client'

import { useRef } from 'react'
import { m } from 'framer-motion'
import { AnimatedText } from '@/components/ui/AnimatedText'
import { CaseStudyHeader } from '@/components/case-study/CaseStudyHeader'
import { useSmoothScroll } from '@/hooks/use-smooth-scroll'

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useSmoothScroll(containerRef, contentRef)

  const handleClose = () => {
    window.history.back()
  }

  return (
    <div
      ref={containerRef}
      className="min-h-dvh bg-background text-text-primary overflow-y-auto h-dvh"
      style={{
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      <div ref={contentRef}>
        <CaseStudyHeader onClose={handleClose} />

        <main className="px-6 2xl:px-[140px] pt-4 pb-20 md:pb-32 max-w-[1920px] mx-auto flex flex-col">
          <div className="mb-14 lg:mb-20 flex flex-col gap-8">
            <AnimatedText
              variant="hero"
              text="About"
              animationType="fadeIn"
              alwaysAnimate
              delay={0.8}
              className="text-[28px] sm:text-[36px] md:text-[44px] lg:text-[56px] font-bold text-text-primary leading-tight tracking-[-0.05em] max-w-full lg:max-w-[50%]"
            />
          </div>

          <m.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.6 }}
          >
            <p className="text-lg leading-relaxed max-w-2xl" style={{ color: 'rgb(var(--color-text-color70))' }}>
              Hi, I&apos;m Atharva — a product designer based in NYC. I love solving problems through thoughtful design and crafting delightful, user-centered experiences.
            </p>
            <p className="text-lg leading-relaxed max-w-2xl" style={{ color: 'rgb(var(--color-text-color70))' }}>
              More details about my background and experience will be added here shortly.
            </p>
          </m.div>
        </main>
      </div>
    </div>
  )
}
