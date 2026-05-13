'use client'

import { AnimatedTitle } from '@/components/ui/AnimatedTitle'

const trafficData = [
  { brand: 'Lululemon', visits: '37.92M', share: 100, color: '#E8C5C5' },
  { brand: 'Gymshark', visits: '13.98M', share: 37, color: '#C5D5E8' },
  { brand: 'Alo Yoga', visits: '9.35M', share: 25, color: '#1a1a1a' },
]

export function AloCompetitiveSection() {
  return (
    <div>
      <h3
        className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]"
        style={{ color: 'rgb(var(--color-text-tertiary))' }}
      >
        Competitive Landscape
      </h3>

      <AnimatedTitle
        text="Alo sits third in traffic, but first in cultural recognition"
        animationType="fadeIn"
        alwaysAnimate={false}
        delay={0}
        className="text-2xl md:text-[40px] font-bold text-text-primary mb-8 leading-tight tracking-[-0.05em]"
      />

      <p
        className="text-base md:text-[18px] font-normal leading-relaxed mb-12 md:mb-16 max-w-[760px]"
        style={{ color: 'rgb(var(--color-text-color90))' }}
      >
        We pulled three months of traffic data from SimilarWeb (January–March 2026) to establish
        where Alo stood relative to its main competitors before conducting any deeper analysis.
      </p>

      {/* Traffic comparison bars */}
      <div className="space-y-5 mb-4">
        {trafficData.map(({ brand, visits, share, color }) => (
          <div key={brand} className="flex items-center gap-4">
            <span
              className="text-sm md:text-base font-medium w-24 shrink-0"
              style={{ color: 'rgb(var(--color-text-secondary))' }}
            >
              {brand}
            </span>
            <div className="flex-1 h-8 rounded-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
              <div
                className="h-full rounded-full"
                style={{ width: `${share}%`, backgroundColor: color }}
              />
            </div>
            <span
              className="text-sm md:text-[16px] font-bold w-20 text-right shrink-0"
              style={{ color: 'rgb(var(--color-text-primary))' }}
            >
              {visits}
            </span>
          </div>
        ))}
      </div>
      <p
        className="text-xs mb-12 md:mb-16"
        style={{ color: 'rgb(var(--color-text-tertiary))' }}
      >
        Monthly visits, March 2026. Source: SimilarWeb
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start mb-12 md:mb-16">
        <p
          className="text-base md:text-[18px] font-normal leading-relaxed"
          style={{ color: 'rgb(var(--color-text-color90))' }}
        >
          Traffic volume isn&apos;t the whole story, but it frames the gap. Lululemon gets roughly
          4× more monthly visits. What&apos;s more telling is the <strong>nature</strong> of the
          traffic: only about 5% of Alo&apos;s organic traffic is non-branded — meaning most
          people who find Alo are already looking for Alo. Gymshark&apos;s non-branded share is 47%.
        </p>
        <div
          className="p-6 md:p-8 rounded-2xl"
          style={{ backgroundColor: 'rgb(var(--color-surface-elevated))' }}
        >
          <div
            className="text-4xl md:text-5xl font-bold tracking-[-0.05em] mb-2"
            style={{ color: 'rgb(var(--color-text-primary))' }}
          >
            5%
          </div>
          <p
            className="text-sm font-mono uppercase tracking-widest mb-1"
            style={{ color: 'rgb(var(--color-text-tertiary))' }}
          >
            Alo non-branded organic traffic
          </p>
          <p
            className="text-sm"
            style={{ color: 'rgb(var(--color-text-color60))' }}
          >
            vs. Gymshark at 47%
          </p>
        </div>
      </div>

      <p
        className="text-base md:text-[18px] font-normal leading-relaxed max-w-[760px]"
        style={{ color: 'rgb(var(--color-text-color90))' }}
      >
        Our goal was to understand what it would take for Alo&apos;s digital presence to match its
        cultural footprint — and to find the specific gaps holding it back. The project focused on
        three areas: SEO and keyword coverage, technical site health, and social media strategy.
      </p>
    </div>
  )
}
