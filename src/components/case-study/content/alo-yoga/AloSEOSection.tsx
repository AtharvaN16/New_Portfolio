'use client'

import { AnimatedTitle } from '@/components/ui/AnimatedTitle'
import { IndexabilityWall } from '../IndexabilityWall'
import { MarketVoidVenn } from '../MarketVoidVenn'

interface AloSEOSectionProps {
  progressBarColor?: string
}

const seoStats = [
  { value: '36.5%', label: 'Non-indexable URLs', sub: '143 of 392 crawled' },
  { value: '104', label: 'Broken links', sub: '4xx errors' },
  { value: '48.6%', label: 'Pages missing H1', sub: 'On-page issue' },
  { value: '36%', label: 'Shallow content pages', sub: 'Under 200 words' },
]

const sampleKeywords = [
  { kw: 'alo yoga mens', cat: "Men's", vol: '33,100', rank: '#1' },
  { kw: 'mens workout joggers', cat: "Men's", vol: '22,400', rank: '#4' },
  { kw: 'mens yoga shorts', cat: "Men's", vol: '18,900', rank: '#6' },
  { kw: 'alo airbrush leggings', cat: 'Workout', vol: '74,200', rank: '#1' },
  { kw: 'high waisted leggings', cat: 'Workout', vol: '110,500', rank: '#8' },
  { kw: 'workout sets women', cat: 'Workout', vol: '41,300', rank: '#5' },
]

export function AloSEOSection({ progressBarColor = '#EEEEE7' }: AloSEOSectionProps) {
  return (
    <div>
      {/* ── Finding 1: Keyword Coverage ── */}
      <h3
        className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]"
        style={{ color: 'rgb(var(--color-text-tertiary))' }}
      >
        Finding 1 — Keyword Coverage
      </h3>

      <AnimatedTitle
        text="Alo's search visibility is almost entirely yoga and women's"
        animationType="fadeIn"
        alwaysAnimate={false}
        delay={0}
        className="text-2xl md:text-[40px] font-bold text-text-primary mb-8 leading-tight tracking-[-0.05em]"
      />

      <p
        className="text-base md:text-[18px] font-normal leading-relaxed mb-10 max-w-[760px]"
        style={{ color: 'rgb(var(--color-text-color90))' }}
      >
        We mapped Alo&apos;s keyword rankings in SEMrush and compared them against Lululemon
        and Gymshark across yoga, fitness, and men&apos;s categories. About 80% of Alo&apos;s
        search visibility is tied to women&apos;s yoga content. Broader terms — &ldquo;workout
        clothes,&rdquo; &ldquo;gym clothes,&rdquo; &ldquo;men&apos;s activewear&rdquo; — are
        dominated by competitors.
      </p>

      {/* Visual first */}
      <div className="mb-4 flex justify-center md:justify-start">
        <MarketVoidVenn />
      </div>
      <p
        className="text-sm mb-10 md:mb-12"
        style={{ color: 'rgb(var(--color-text-tertiary))' }}
      >
        Alo&apos;s keyword territory compared to Lululemon and Gymshark. The men&apos;s and
        general activewear space is largely uncontested for Alo.
      </p>

      {/* Stat callouts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 md:mb-12">
        <div
          className="p-6 rounded-2xl"
          style={{ backgroundColor: 'rgb(var(--color-surface-elevated))' }}
        >
          <div
            className="text-4xl md:text-5xl font-bold tracking-[-0.05em] mb-2"
            style={{ color: 'rgb(var(--color-text-primary))' }}
          >
            572K
          </div>
          <p
            className="text-sm font-mono uppercase tracking-widest mb-1"
            style={{ color: 'rgb(var(--color-text-tertiary))' }}
          >
            Monthly search opportunity
          </p>
          <p className="text-sm" style={{ color: 'rgb(var(--color-text-color60))' }}>
            Men&apos;s activewear categories Alo doesn&apos;t rank for
          </p>
        </div>
        <div
          className="p-6 rounded-2xl"
          style={{ backgroundColor: 'rgb(var(--color-surface-elevated))' }}
        >
          <div
            className="text-4xl md:text-5xl font-bold tracking-[-0.05em] mb-2"
            style={{ color: 'rgb(var(--color-text-primary))' }}
          >
            #55
          </div>
          <p
            className="text-sm font-mono uppercase tracking-widest mb-1"
            style={{ color: 'rgb(var(--color-text-tertiary))' }}
          >
            Alo&apos;s rank for &ldquo;workout clothes&rdquo;
          </p>
          <p className="text-sm" style={{ color: 'rgb(var(--color-text-color60))' }}>
            Does not appear at all for &ldquo;gym clothes&rdquo;
          </p>
        </div>
      </div>

      {/* Keyword table */}
      <h4
        className="text-sm font-mono uppercase tracking-widest mb-4"
        style={{ color: 'rgb(var(--color-text-tertiary))' }}
      >
        Sample keywords where Alo does rank
      </h4>
      <div className="overflow-x-auto mb-3">
        <table className="w-full text-sm md:text-base">
          <thead>
            <tr className="border-b" style={{ borderColor: 'rgb(var(--color-text-color10))' }}>
              <th className="text-left py-3 font-semibold text-text-primary">Keyword</th>
              <th className="text-left py-3 font-semibold text-text-primary">Category</th>
              <th className="text-right py-3 font-semibold text-text-primary">Volume</th>
              <th className="text-right py-3 font-semibold text-text-primary">Alo Rank</th>
            </tr>
          </thead>
          <tbody>
            {sampleKeywords.map(({ kw, cat, vol, rank }) => (
              <tr
                key={kw}
                className="border-b"
                style={{ borderColor: 'rgb(var(--color-text-color10))' }}
              >
                <td className="py-3" style={{ color: 'rgb(var(--color-text-color90))' }}>{kw}</td>
                <td className="py-3" style={{ color: 'rgb(var(--color-text-tertiary))' }}>{cat}</td>
                <td className="py-3 text-right" style={{ color: 'rgb(var(--color-text-color90))' }}>{vol}</td>
                <td className="py-3 text-right font-mono font-bold" style={{ color: progressBarColor }}>{rank}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs mb-0" style={{ color: 'rgb(var(--color-text-tertiary))' }}>
        Source: SEMrush, Spring 2026
      </p>

      <div
        className="border-t my-24 md:my-32"
        style={{ borderColor: 'rgb(var(--color-text-color10))' }}
      />

      {/* ── Finding 2: Technical SEO ── */}
      <h3
        className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]"
        style={{ color: 'rgb(var(--color-text-tertiary))' }}
      >
        Finding 2 — Technical SEO
      </h3>

      <AnimatedTitle
        text="A significant share of the site is invisible to Google"
        animationType="fadeIn"
        alwaysAnimate={false}
        delay={0}
        className="text-2xl md:text-[40px] font-bold text-text-primary mb-8 leading-tight tracking-[-0.05em]"
      />

      <p
        className="text-base md:text-[18px] font-normal leading-relaxed mb-10 max-w-[760px]"
        style={{ color: 'rgb(var(--color-text-color90))' }}
      >
        We crawled aloyoga.com using Screaming Frog and ran a full technical and on-page audit.
        Before any keyword strategy can work, these underlying issues need to be resolved —
        Google can&apos;t rank pages it can&apos;t crawl.
      </p>

      {/* IndexabilityWall visual first */}
      <div className="mb-4 flex justify-center md:justify-start">
        <IndexabilityWall />
      </div>
      <p
        className="text-sm mb-10 md:mb-12"
        style={{ color: 'rgb(var(--color-text-tertiary))' }}
      >
        Out of 392 URLs crawled, 143 were non-indexable — blocked from appearing in search results.
      </p>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 md:mb-12">
        {seoStats.map(({ value, label, sub }) => (
          <div key={label}>
            <div
              className="text-3xl md:text-4xl font-bold tracking-[-0.05em] mb-1"
              style={{ color: 'rgb(var(--color-text-primary))' }}
            >
              {value}
            </div>
            <p className="text-sm font-semibold mb-0.5" style={{ color: 'rgb(var(--color-text-secondary))' }}>
              {label}
            </p>
            <p className="text-xs" style={{ color: 'rgb(var(--color-text-color60))' }}>
              {sub}
            </p>
          </div>
        ))}
      </div>

      {/* On-page and off-page breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <div>
          <h4
            className="text-sm font-mono uppercase tracking-widest mb-4"
            style={{ color: 'rgb(var(--color-text-tertiary))' }}
          >
            On-page issues
          </h4>
          <ul className="space-y-3">
            {[
              '39 pages missing meta descriptions',
              '57 pages with title lengths outside the recommended range',
              'Lighthouse performance score: 23 desktop / 35 mobile',
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm md:text-base"
                style={{ color: 'rgb(var(--color-text-color90))' }}
              >
                <span
                  className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: 'rgb(var(--color-text-color30))' }}
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4
            className="text-sm font-mono uppercase tracking-widest mb-4"
            style={{ color: 'rgb(var(--color-text-tertiary))' }}
          >
            Off-page issues
          </h4>
          <ul className="space-y-3">
            {[
              '66% of referring domains are low authority',
              '11% of anchor texts are empty',
              'Promotional anchors ("shop now", "click here") dominate the backlink profile',
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm md:text-base"
                style={{ color: 'rgb(var(--color-text-color90))' }}
              >
                <span
                  className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: 'rgb(var(--color-text-color30))' }}
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
