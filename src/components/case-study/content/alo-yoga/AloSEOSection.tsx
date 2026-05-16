'use client'

import { useState } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { AnimatedTitle } from '@/components/ui/AnimatedTitle'
import { AloSearchForbidden } from './AloSearchForbidden'
import { AloKeywordInsights } from './AloKeywordInsights'
import { AloSearchPositionMap } from './AloSearchPositionMap'
import { AloKeywordRecommendations } from './AloKeywordRecommendations'

const seoStats = [
  { value: '36.5%', label: 'Non-indexable URLs', sub: '143 of 392 crawled' },
  { value: '104', label: 'Broken links', sub: '4xx errors' },
  { value: '48.6%', label: 'Pages missing H1', sub: 'On-page issue' },
  { value: '36%', label: 'Shallow content pages', sub: 'Under 200 words' },
]

export function AloSEOSection() {
  const [isKeywordStrategyOpen, setIsKeywordStrategyOpen] = useState(false)

  return (
    <div>
      {/* ── Keyword Strategy ── */}
      <h3
        className="text-sm md:text-[16px] font-bold uppercase mb-6"
        style={{ color: 'rgb(var(--color-text-tertiary))' }}
      >
        Keyword Strategy
      </h3>

      <AnimatedTitle
        text="Alo shows up for yoga. It doesn't show up for much else."
        animationType="fadeIn"
        alwaysAnimate={false}
        delay={0}
        className="text-2xl md:text-[40px] font-bold text-text-primary mb-8 leading-tight tracking-[-0.05em] max-w-[680px]"
      />

      <div className="mb-4">
        <AloSearchPositionMap />
      </div>

      <p
        className="text-sm mb-12"
        style={{ color: 'rgb(var(--color-text-tertiary))' }}
      >
        Alo&apos;s search visibility is concentrated in a yoga-only, female-dominant position while
        competitors occupy broader multi-sport and more gender-balanced territory.
      </p>

      {/* Primary CTA to expand details */}
      <div className="mt-12 mb-16 flex justify-center md:justify-start">
        <button
          type="button"
          onClick={() => setIsKeywordStrategyOpen(!isKeywordStrategyOpen)}
          className="group grid w-full max-w-[min(100%,20rem)] grid-cols-[1fr_auto] items-center gap-2 border border-neutral-200 px-5 py-4 text-center text-sm font-bold uppercase tracking-widest text-text-primary transition-all duration-300 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900 sm:w-[20rem] sm:max-w-[20rem]"
        >
          <span className="min-w-0 text-center leading-snug">
            {isKeywordStrategyOpen ? 'Close Strategy Details' : 'Expand to Read in Detail'}
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden
            className="shrink-0 transition-transform duration-300"
            style={{ transform: isKeywordStrategyOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {isKeywordStrategyOpen && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <AloKeywordInsights />

            <AloKeywordRecommendations />
          </m.div>
        )}
      </AnimatePresence>

      <div
        className="border-t my-24 md:my-32"
        style={{ borderColor: 'rgb(var(--color-text-color10))' }}
      />

      {/* ── Finding 2: Technical SEO ── */}
      <h3
        className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]"
        style={{ color: 'rgb(var(--color-text-tertiary))' }}
      >
        Technical SEO
      </h3>

      <AnimatedTitle
        text="A significant share of the site is invisible to Google"
        animationType="fadeIn"
        alwaysAnimate={false}
        delay={0}
        className="text-2xl md:text-[40px] font-bold text-text-primary mb-8 leading-tight tracking-[-0.05em] max-w-[680px]"
      />

      {/* IndexabilityWall visual first */}
      <AloSearchForbidden />
      <p
        className="text-base md:text-[18px] font-normal leading-relaxed mb-10 md:mb-12 max-w-[680px]"
        style={{ color: 'rgb(var(--color-text-color90))' }}
      >
        &ldquo;Indexable&rdquo; pages are those that Google can successfully crawl and include in its search results.
        &ldquo;Non-indexable&rdquo; pages are those that search engines are instructed to ignore or those that fail to load correctly.
      </p>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10 md:mb-12">
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
