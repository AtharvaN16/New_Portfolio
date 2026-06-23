'use client'

import Image from 'next/image'
import { AnimatedText } from '@/components/ui/AnimatedText'

export function PrattSurveyAnalysisIntroSection() {
  return (
    <>
        {/* ── Section: Survey Analysis ── */}
        <h3
          className="text-[12px] md:text-[14px] font-bold uppercase mb-6 md:mb-[28px]"
          style={{ color: 'rgb(var(--color-text-tertiary))' }}
        >
          Survey Analysis
        </h3>

        <AnimatedText variant="heading"
          text="Tours Feedback Survey Analysis"
          animationType="fadeIn"
          alwaysAnimate={false}
          delay={0}
          className="text-2xl md:text-[40px] font-bold text-text-primary mb-6 md:mb-8 leading-tight tracking-[-0.05em]"
        />

        <div className="space-y-6 md:space-y-8 mb-12 md:mb-16">
          <p
            className="text-base md:text-[18px] font-normal leading-relaxed"
            style={{ color: 'rgb(var(--color-text-color90))' }}
          >
            The client shared an Excel file containing tour feedback
            responses. We analyzed 718 survey entries and created a
            dashboard to visualize key insights from the data.
          </p>
        </div>

        <figure className="w-full mb-12 md:mb-16">
          <Image
            src="/images/case-studies/pratt-institute-visitor-experience/analysis.avif"
            alt="Side-by-side view of the Excel spreadsheet with 718 tour feedback responses and the Google Sheets analysis dashboard"
            width={1600}
            height={1000}
            className="w-full h-auto"
            quality={85}
            sizes="(max-width: 768px) 100vw, 1044px"
          />
        </figure>

    </>
  )
}
