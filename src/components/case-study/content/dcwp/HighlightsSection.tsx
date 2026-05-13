'use client'

import { CaseStudyVideo } from '@/components/case-study/CaseStudyVideo'

const VIDEO_SRC = '/videos/case-studies/nyc-dcwp-business-licenses/highlight-reel.mp4'

export function HighlightsSection() {
  return (
    <section
      data-section="nyc-dcwp-highlights"
      className="w-full mt-20 md:mt-28 lg:mt-36"
    >
      <h3 className="text-xl md:text-[28px] font-bold text-text-primary mb-8">
        Highlights
      </h3>
      <CaseStudyVideo src={VIDEO_SRC} alt="Highlight reel of DCWP checklist redesign" />
    </section>
  )
}
