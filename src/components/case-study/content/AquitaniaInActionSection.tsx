'use client'

import { CaseStudyVideo } from '@/components/case-study/CaseStudyVideo'

const GOLD_VIDEO_WRAPPER_STYLE = {
  background:
    'var(--gradient-gold, linear-gradient(109deg, #D3CDC0 14.47%, #ACA084 45.1%, #998965 70.02%, #857246 88.54%))',
} as const

const GOLD_VIDEO_SHADOW_STYLE = {
  boxShadow: '0 20px 60px rgba(0,0,0,0.35), 0 4px 16px rgba(0,0,0,0.2)',
} as const

export function AquitaniaInActionSection() {
  return (
    <section
      id="aquitania-showcase"
      data-section="aquitania-in-action"
      className="scroll-mt-32 space-y-10 md:space-y-14"
    >
      <div className="space-y-6 md:space-y-8">
        <h3 className="text-xl md:text-2xl font-bold text-text-primary leading-tight tracking-[-0.04em]">
          Aquitania in action
        </h3>
        <p className="max-w-[750px] text-base md:text-[18px] font-normal text-text-body leading-normal">
          Applying Aquitania transformed the experience from fragmented and inconsistent to cohesive,
          accessible, and premium. By standardizing components, typography, spacing, and interactions,
          the system created a more polished digital experience that better reflects Cunard&apos;s luxury
          brand identity.
        </p>
      </div>

      <div className="w-full px-10 py-10 md:px-16 md:py-14" style={GOLD_VIDEO_WRAPPER_STYLE}>
        <div className="rounded-none" style={GOLD_VIDEO_SHADOW_STYLE}>
          <CaseStudyVideo
            src="/videos/case-studies/aquitania-design-system/demo-video.mp4"
            alt="Aquitania design system demo applied across Cunard digital products"
            className="rounded-none"
          />
        </div>
      </div>
    </section>
  )
}
