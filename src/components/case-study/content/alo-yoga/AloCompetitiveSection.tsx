'use client'

import Image from 'next/image'
import { AnimatedTitle } from '@/components/ui/AnimatedTitle'

const competitors = [
  {
    name: 'Lululemon',
    src: '/images/case-studies/alo-yoga-digital-analytics/Lulu.png',
    share: '49%',
    traffic: '18.5M',
    trend: 'up',
    description:
      'Industry leader and ultimate benchmark for Alo Yoga’s growth in organic keywords (1.8M).',
  },
  {
    name: 'Gymshark',
    src: '/images/case-studies/alo-yoga-digital-analytics/gymshark.png',
    share: '21%',
    traffic: '8M',
    trend: 'down',
    description:
      "A digital-first powerhouse and primary rival for the Z-generation and fitness-focused audience.",
  },
  {
    name: 'Under Armour',
    src: '/images/case-studies/alo-yoga-digital-analytics/UA.png',
    share: '11%',
    traffic: '4.2M',
    trend: 'up',
    description:
      'A traditional athletic giant representing the legacy performance market.',
  },
  {
    name: 'Vuori',
    src: '/images/case-studies/alo-yoga-digital-analytics/vuori.png',
    share: '4%',
    traffic: '1.5M',
    trend: 'up',
    description:
      'Rapidly growing D2C "challenger" that directly threatens Alo’s premium positioning.',
  },
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
        text="Understanding Alo's current market position"
        animationType="fadeIn"
        alwaysAnimate={false}
        delay={0}
        className="text-2xl md:text-[40px] font-bold text-text-primary mb-12 md:mb-16 leading-tight tracking-[-0.05em]"
      />

      {/* Alo Yoga Baseline Stats - Polished Visualization */}
      <div className="flex flex-wrap gap-x-12 md:gap-x-16 gap-y-8 mb-16 md:mb-24">
        <div className="flex flex-col">
          <div className="flex min-h-[2.75rem] md:min-h-[3rem] items-center leading-none">
            <div className="text-3xl md:text-[40px] font-bold tracking-tighter text-text-primary">
              #3
            </div>
          </div>
          <span 
            className="text-base mt-4 uppercase font-bold tracking-wider text-text-color60"
          >
            market share
          </span>
        </div>

        <div className="flex flex-col">
          <div className="flex min-h-[2.75rem] md:min-h-[3rem] items-center gap-2 leading-none">
            <div className="text-3xl md:text-[40px] font-bold tracking-tighter text-text-primary">
              5.3M
            </div>
            <span className="text-xl md:text-2xl text-green-500 font-bold leading-none">↑</span>
          </div>
          <span 
            className="text-base mt-4 uppercase font-bold tracking-wider text-text-color60"
          >
            organic traffic
          </span>
        </div>

        <div className="flex flex-col">
          <div className="flex min-h-[2.75rem] md:min-h-[3rem] items-center leading-none">
            <div className="text-3xl md:text-[40px] font-bold tracking-tighter text-text-primary">
              14%
            </div>
          </div>
          <span 
            className="text-base mt-4 uppercase font-bold tracking-wider text-text-color60"
          >
            traffic share
          </span>
        </div>
      </div>

      {/* Unified Comparison Frame */}
      <div className="border border-neutral-200 dark:border-neutral-800 mb-12 md:mb-16 overflow-hidden">
        {/* Competitor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {competitors.map((comp) => (
            <div
              key={comp.name}
              className="flex flex-col border-b md:border-b-0 md:border-r border-neutral-200 dark:border-neutral-800 last:border-0"
            >
              <div className="relative w-full overflow-hidden bg-white dark:bg-black/20">
                <Image
                  src={comp.src}
                  alt={comp.name}
                  width={500}
                  height={300}
                  className="w-full h-auto"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div 
                className="p-6 md:p-8 flex flex-col grow"
                style={{ backgroundColor: 'rgb(var(--color-surface-elevated))' }}
              >
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-4"
                  style={{ color: 'rgb(var(--color-text-tertiary))' }}
                >
                  {comp.name}
                </p>
                <p 
                  className="text-sm leading-relaxed mb-10"
                  style={{ color: 'rgb(var(--color-text-color70))' }}
                >
                  {comp.description}
                </p>
                
                <div className="mt-auto space-y-8">
                  <div>
                    <div 
                      className="text-3xl font-bold tracking-tighter"
                      style={{ color: 'rgb(var(--color-text-primary))' }}
                    >
                      {comp.share}
                    </div>
                    <div 
                      className="text-[10px] font-bold uppercase tracking-widest mt-3"
                      style={{ color: 'rgb(var(--color-text-tertiary))' }}
                    >
                      Traffic Share
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <div 
                        className="text-3xl font-bold tracking-tighter"
                        style={{ color: 'rgb(var(--color-text-primary))' }}
                      >
                        {comp.traffic}
                      </div>
                      <span className={`text-xl font-bold ${comp.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                        {comp.trend === 'up' ? '↑' : '↓'}
                      </span>
                    </div>
                    <div 
                      className="text-[10px] font-bold uppercase tracking-widest mt-3"
                      style={{ color: 'rgb(var(--color-text-tertiary))' }}
                    >
                      Organic Traffic
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p
        className="text-[10px] uppercase font-bold tracking-widest mb-12 md:mb-16"
        style={{ color: 'rgb(var(--color-text-tertiary))' }}
      >
        Source: Semrush May 2026
      </p>

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
