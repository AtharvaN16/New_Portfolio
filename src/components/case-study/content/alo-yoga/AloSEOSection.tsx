'use client'

import { useState } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { AnimatedText } from '@/components/ui/AnimatedText'
import { AloSearchForbidden } from './AloSearchForbidden'
import { AloSEOPieChart } from './AloSEOPieChart'
import { AloKeywordInsights } from './AloKeywordInsights'
import { AloSearchPositionMap } from './AloSearchPositionMap'
import { AloKeywordRecommendations } from './AloKeywordRecommendations'
import { AloCWVTable } from './AloCWVTable'
import { AloLighthouseScores } from './AloLighthouseScores'
import Image from 'next/image'

const ONPAGE_I1 = '/images/case-studies/alo-yoga-digital-analytics/onpage_i1.avif'
const ONPAGE_I2 = '/images/case-studies/alo-yoga-digital-analytics/onpage_i2.avif'
const ONPAGE_I3 = '/images/case-studies/alo-yoga-digital-analytics/onpage_i3.avif'

export function AloSEOSection() {
  const [isKeywordStrategyOpen, setIsKeywordStrategyOpen] = useState(false)
  const [activeSeoTab, setActiveSeoTab] = useState<'technical' | 'on-page' | 'off-page'>('technical')

  return (
    <div>
      <div id="keyword" className="scroll-mt-32">
      {/* ── Keyword Strategy ── */}
      <h3
        className="text-[12px] md:text-[14px] font-bold uppercase mb-6"
        style={{ color: 'rgb(var(--color-text-tertiary))' }}
      >
        Keyword Strategy
      </h3>

      <AnimatedText variant="heading"
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

      <div className="mt-32 mb-24 md:mt-40 md:mb-32 space-y-20 md:space-y-24">
        <div className="max-w-[800px]">
          <span 
            className="text-sm md:text-base font-bold uppercase tracking-[0.2em] mb-8 block"
            style={{ color: 'rgb(var(--color-text-tertiary))' }}
          >
            Problem Statement
          </span>
          <AnimatedText variant="heading"
            text="Alo Yoga's digital infrastructure and SEO strategy are stuck in its 'Yoga-only' and 'Women-only' legacy, creating a gap between its lifestyle vision and search visibility."
            highlightWords={["'Yoga-only'", "'Women-only'"]}
            highlightColor="rgb(var(--color-alo-progress))"
            animationType="fadeIn"
            alwaysAnimate={false}
            delay={0}
            className="text-2xl md:text-[42px] font-bold text-text-primary leading-[1.15] tracking-[-0.04em]"
          />
        </div>

        <div className="max-w-[800px] ml-auto text-right">
          <span 
            className="text-sm md:text-base font-bold uppercase tracking-[0.2em] mb-8 block"
            style={{ color: 'rgb(var(--color-text-tertiary))' }}
          >
            The Goal
          </span>
          <AnimatedText variant="heading"
            text="Strategically expand Alo Yoga from a women-centric yoga brand into a comprehensive activewear lifestyle brand that serves a broader range of workout occasions and male consumers."
            highlightWords={["expand Alo Yoga from a women-centric yoga brand into a comprehensive activewear lifestyle brand"]}
            highlightColor="rgb(var(--color-alo-progress))"
            animationType="fadeIn"
            alwaysAnimate={false}
            delay={0}
            className="text-2xl md:text-[42px] font-bold text-text-primary leading-[1.15] tracking-[-0.04em]"
          />
        </div>
      </div>

      <div
        className="border-t my-24 md:my-32"
        style={{ borderColor: 'rgb(var(--color-text-color10))' }}
      />
      </div>

      {/* ── Finding 2: SEO Audit ── */}
      <div id="seo" className="scroll-mt-32">
        <h3
        className="text-[12px] md:text-[14px] font-bold uppercase mb-8 md:mb-10"
        style={{ color: 'rgb(var(--color-text-tertiary))' }}
      >
        SEO Audit
      </h3>

      {/* Tabs */}
      <div className="flex flex-wrap border-b border-neutral-200 dark:border-neutral-800 mb-16 gap-x-8 gap-y-4">
        {(['technical', 'on-page', 'off-page'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveSeoTab(tab)}
            className={`pb-4 text-sm font-bold uppercase tracking-widest transition-colors relative ${
              activeSeoTab === tab
                ? 'text-neutral-900 dark:text-neutral-100'
                : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
            }`}
          >
            {tab === 'technical' ? 'Technical SEO' : tab === 'on-page' ? 'On-page SEO' : 'Off-page SEO'}
            {activeSeoTab === tab && (
              <m.div
                layoutId="seoTabIndicator"
                className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-neutral-900 dark:bg-neutral-100"
              />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeSeoTab === 'technical' && (
          <m.div
            key="technical"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >

      <AnimatedText variant="heading"
        text="A significant share of the site is invisible to Google"
        animationType="fadeIn"
        alwaysAnimate={false}
        delay={0}
        className="text-2xl md:text-[40px] font-bold text-text-primary mb-8 leading-tight tracking-[-0.05em] max-w-[680px]"
      />

      {/* IndexabilityWall visual first */}
      <AloSearchForbidden />

      <section className="pt-8 mb-10 md:mb-12">
        {/* Insight 1 Label removed */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-14">
          <div className="flex max-w-[520px] flex-col gap-8">
            <h4 className="max-w-[420px] text-2xl md:text-[30px] font-bold text-text-primary leading-tight tracking-[-0.04em]">
              Significant Gaps in Search Engine Indexability
            </h4>
            <p className="text-base md:text-[18px] leading-relaxed" style={{ color: 'rgb(var(--color-text-color90))' }}>
              Out of 392, a significant portion of the crawled URLs (143 i.e. 36.5%) is non-indexable. More concerningly, 104 URLs (26.5% of the total crawl) returned 4xx Client Errors, which effectively makes them broken links or blocked content from a crawler&apos;s perspective.
            </p>

            <div className="mt-2 md:mt-2">
              <p
                className="text-xs font-mono uppercase tracking-widest mb-4"
                style={{ color: 'rgb(var(--color-text-tertiary))' }}
              >
                Why it matters
              </p>
              <p className="text-sm md:text-base leading-relaxed" style={{ color: 'rgb(var(--color-text-color90))' }}>
                &ldquo;Indexable&rdquo; pages are those that Google can successfully crawl and include in its search results. &ldquo;Non-indexable&rdquo; pages are those that search engines are instructed to ignore or those that fail to load correctly.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center lg:justify-end">
            <AloSEOPieChart />
          </div>
        </div>
      </section>
      
      <div className="mt-12 p-8 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 max-w-[680px]">
        <h5 className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: 'rgb(var(--color-text-tertiary))' }}>
          Recommendation
        </h5>
        <p className="text-sm md:text-base leading-relaxed" style={{ color: 'rgb(var(--color-text-color90))' }}>
          Investigate the 104 client errors. If these are 403 Forbidden errors (common when sites block automated crawlers), ensure future crawls use a &ldquo;User-Agent&rdquo; like Googlebot to bypass basic security blocks. If these are 404s, they should be redirected to the nearest relevant page.
        </p>
      </div>

      {/* ── Insight 2: Performance ── */}
      <section className="pt-24 md:pt-32 border-t border-neutral-100 dark:border-neutral-900">
        {/* Insight 2 Label removed */}

        <AnimatedText variant="heading"
          text="Alo yoga website performance needs to be improved"
          animationType="fadeIn"
          delay={0}
          className="text-2xl md:text-[40px] font-bold text-text-primary mb-16 leading-tight tracking-[-0.05em] max-w-[800px]"
        />

        <div className="mb-16">
          <div className="mt-8">
            <AloCWVTable />
          </div>

          <div className="mt-8 max-w-[520px]">
            <p
              className="text-xs font-mono uppercase tracking-widest mb-4"
              style={{ color: 'rgb(var(--color-text-tertiary))' }}
            >
              Why it matters
            </p>
            <p className="text-sm md:text-base leading-relaxed" style={{ color: 'rgb(var(--color-text-color90))' }}>
              Google uses Core Web Vitals (CWV) to measure how users experience the speed, responsiveness, and visual stability of a page. Pages that fail these metrics are penalized in the search rankings, directly impacting organic visibility and user conversion rates.
            </p>
          </div>
        </div>
        <AloLighthouseScores />

        {/* 3 Recommendations */}
        <div className="mt-16 mb-24 p-8 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
          <h5 className="text-xs font-mono uppercase tracking-widest mb-10" style={{ color: 'rgb(var(--color-text-tertiary))' }}>
            Recommendations
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="flex flex-col">
              <h5 className="text-xl md:text-2xl mb-4 text-neutral-900 dark:text-neutral-100" style={{ fontFamily: 'var(--font-instrument), serif' }}>
                JavaScript & Payloads:
              </h5>
              <p className="text-sm md:text-base leading-relaxed" style={{ color: 'rgb(var(--color-text-color90))' }}>
                Reduce unused JavaScript and compress assets to lower the 24 MB payload. Break up long main-thread tasks to improve mobile responsiveness (INP).
              </p>
            </div>
            <div className="flex flex-col">
              <h5 className="text-xl md:text-2xl mb-4 text-neutral-900 dark:text-neutral-100" style={{ fontFamily: 'var(--font-instrument), serif' }}>
                For CLS:
              </h5>
              <p className="text-sm md:text-base leading-relaxed" style={{ color: 'rgb(var(--color-text-color90))' }}>
                Ensure all images and video elements have defined <code className="bg-neutral-200 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-sm font-mono">width</code> and <code className="bg-neutral-200 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-sm font-mono">height</code> attributes in the HTML.
              </p>
            </div>
            <div className="flex flex-col">
              <h5 className="text-xl md:text-2xl mb-4 text-neutral-900 dark:text-neutral-100" style={{ fontFamily: 'var(--font-instrument), serif' }}>
                Accessibility:
              </h5>
              <p className="text-sm md:text-base leading-relaxed" style={{ color: 'rgb(var(--color-text-color90))' }}>
                Fix buttons and links that lack discernible names, and correct heading structures to improve the accessibility scores.
              </p>
            </div>
          </div>
        </div>
      </section>



          </m.div>
        )}

        {activeSeoTab === 'on-page' && (
          <m.div
            key="on-page"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-32"
          >
            <AnimatedText variant="heading"
              text="Weak on-page SEO limits visibility"
              animationType="fadeIn"
              alwaysAnimate={false}
              delay={0}
              className="text-2xl md:text-[40px] font-bold text-text-primary mb-8 leading-tight tracking-[-0.05em] max-w-[680px]"
            />

            {/* Insight 1 */}
            <section className="pt-8 mb-24 md:mb-32">
              <p className="text-xs font-mono uppercase tracking-widest mb-8" style={{ color: 'rgb(var(--color-text-tertiary))' }}>
                Insight 1
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-14">
                <div className="flex max-w-[520px] flex-col gap-8">
                  <h4 className="max-w-[420px] text-2xl md:text-[30px] font-bold text-text-primary leading-tight tracking-[-0.04em]">
                    Multiple pages are missing meta descriptions
                  </h4>
                  <p className="text-base md:text-[18px] leading-relaxed" style={{ color: 'rgb(var(--color-text-color90))' }}>
                    About 39 pages are missing meta descriptions, so search engines lack clear summaries. 57 titles are either too short or too long, making them unclear or likely to be cut off in search results.
                  </p>

                  <div className="mt-2">
                    <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: 'rgb(var(--color-text-tertiary))' }}>
                      Why it matters
                    </p>
                    <p className="text-sm md:text-base leading-relaxed" style={{ color: 'rgb(var(--color-text-color90))' }}>
                      Meta descriptions and titles are the first things users and search engines see. Missing or poorly formatted metadata reduces click-through rates and makes it harder for search engines to rank the page appropriately.
                    </p>
                  </div>

                  <div className="mt-4 p-8 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
                    <h5 className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: 'rgb(var(--color-text-tertiary))' }}>
                      Recommendation
                    </h5>
                    <p className="text-sm md:text-base leading-relaxed" style={{ color: 'rgb(var(--color-text-color90))' }}>
                      Alo should prioritize rewriting product page titles and meta descriptions across all categories. Ensure titles are descriptive, within optimal length, and include relevant target keywords to improve overall search visibility.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-center lg:justify-end">
                  <div className="w-full aspect-[4/3] relative group">
                    <Image 
                      src={ONPAGE_I1} 
                      alt="On-page Insight 1" 
                      width={800}
                      height={600}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Insight 2 */}
            <section className="mb-24 md:mb-32">
              <p className="text-xs font-mono uppercase tracking-widest mb-8" style={{ color: 'rgb(var(--color-text-tertiary))' }}>
                Insight 2
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-14">
                <div className="flex max-w-[520px] flex-col gap-8">
                  <h4 className="max-w-[420px] text-2xl md:text-[30px] font-bold text-text-primary leading-tight tracking-[-0.04em]">
                    Multiple indexed pages are missing H1s
                  </h4>
                  <p className="text-base md:text-[18px] leading-relaxed" style={{ color: 'rgb(var(--color-text-color90))' }}>
                    48.6% of pages are missing an H1. This makes it harder for search engines and users to understand what each page is about.
                  </p>

                  <div className="mt-2">
                    <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: 'rgb(var(--color-text-tertiary))' }}>
                      Why it matters
                    </p>
                    <p className="text-sm md:text-base leading-relaxed" style={{ color: 'rgb(var(--color-text-color90))' }}>
                      The H1 tag acts as the primary headline for a web page. Without it, search engines struggle to determine the page&apos;s core topic, which can significantly hurt organic ranking performance.
                    </p>
                  </div>

                  <div className="mt-4 p-8 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
                    <h5 className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: 'rgb(var(--color-text-tertiary))' }}>
                      Recommendation
                    </h5>
                    <p className="text-sm md:text-base leading-relaxed" style={{ color: 'rgb(var(--color-text-color90))' }}>
                      Every indexable page should have one clear, descriptive H1 that reflects the main search intent for that specific category or product, rather than relying on vague brand or campaign language.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-center lg:justify-end">
                  <div className="w-full aspect-[4/3] relative group">
                    <Image 
                      src={ONPAGE_I2} 
                      alt="On-page Insight 2" 
                      width={800}
                      height={600}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Insight 3 */}
            <section className="mb-24 md:mb-32">
              <p className="text-xs font-mono uppercase tracking-widest mb-8" style={{ color: 'rgb(var(--color-text-tertiary))' }}>
                Insight 3
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-14">
                <div className="flex max-w-[520px] flex-col gap-8">
                  <h4 className="max-w-[420px] text-2xl md:text-[30px] font-bold text-text-primary leading-tight tracking-[-0.04em]">
                    Multiple crawled pages have very shallow content depth
                  </h4>
                  <p className="text-base md:text-[18px] leading-relaxed" style={{ color: 'rgb(var(--color-text-color90))' }}>
                    About 36% of pages have very little content (under 200 words). This makes it harder for search engines to understand the page and rank it properly.
                  </p>

                  <div className="mt-2">
                    <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: 'rgb(var(--color-text-tertiary))' }}>
                      Why it matters
                    </p>
                    <p className="text-sm md:text-base leading-relaxed" style={{ color: 'rgb(var(--color-text-color90))' }}>
                      Search engines rely on text to understand context. Pages with &quot;thin&quot; content are often deemed low-value by Google and struggle to rank for competitive, high-intent keywords.
                    </p>
                  </div>

                  <div className="mt-4 p-8 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
                    <h5 className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: 'rgb(var(--color-text-tertiary))' }}>
                      Recommendation
                    </h5>
                    <p className="text-sm md:text-base leading-relaxed" style={{ color: 'rgb(var(--color-text-color90))' }}>
                      Alo should prioritize adding substantive, helpful content to category and product pages. This provides search engines with more context and helps customers make informed purchasing decisions across all product lines.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-center lg:justify-end">
                  <div className="w-full aspect-[4/3] relative group">
                    <Image 
                      src={ONPAGE_I3} 
                      alt="On-page Insight 3" 
                      width={800}
                      height={600}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </section>
          </m.div>
        )}

        {activeSeoTab === 'off-page' && (
          <m.div
            key="off-page"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-32"
          >
            <AnimatedText variant="heading"
              text="Weak backlink quality and anchor text relevance"
              animationType="fadeIn"
              alwaysAnimate={false}
              delay={0}
              className="text-2xl md:text-[40px] font-bold text-text-primary mb-8 leading-tight tracking-[-0.05em] max-w-[680px]"
            />

            <section className="pt-8 mb-10 md:mb-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-14">
                <div className="flex max-w-[520px] flex-col gap-8">
                  <h4 className="max-w-[420px] text-2xl md:text-[30px] font-bold text-text-primary leading-tight tracking-[-0.04em]">
                    High volume, low quality backlink profile
                  </h4>
                  <p className="text-base md:text-[18px] leading-relaxed" style={{ color: 'rgb(var(--color-text-color90))' }}>
                    Alo&apos;s backlink profile is strong in size, but weak in quality and diversity. 66% of referring domains are low authority, and 11% of backlinks use completely empty anchors. Furthermore, promotional anchors like &quot;get the deal&quot; dominate instead of descriptive product terms.
                  </p>
 
                  <div className="mt-2">
                    <p
                      className="text-xs font-mono uppercase tracking-widest mb-4"
                      style={{ color: 'rgb(var(--color-text-tertiary))' }}
                    >
                      Why it matters
                    </p>
                    <p className="text-sm md:text-base leading-relaxed" style={{ color: 'rgb(var(--color-text-color90))' }}>
                      Backlinks are like &quot;votes of confidence&quot; from other websites. When most votes come from low-quality sites or lack descriptive context (anchors), search engines trust the site less, making it harder to rank for competitive terms.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col gap-8 lg:gap-12 w-full max-w-[400px] lg:ml-auto lg:mr-0 pt-2">
                  <div className="flex flex-col">
                    <div className="text-5xl md:text-6xl font-black mb-2 text-[#A03033] dark:text-[#FF8E8B] tracking-[-0.05em]">66%</div>
                    <div className="text-sm md:text-base font-medium leading-relaxed" style={{ color: 'rgb(var(--color-text-color90))' }}>of referring domains are low authority</div>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-5xl md:text-6xl font-black mb-2 text-[#D67027] dark:text-[#E89E62] tracking-[-0.05em]">11%</div>
                    <div className="text-sm md:text-base font-medium leading-relaxed" style={{ color: 'rgb(var(--color-text-color90))' }}>of backlinks use completely empty anchors</div>
                  </div>
                </div>
              </div>
            </section>
 
            <div className="mt-12 p-8 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 max-w-[680px]">
              <div className="mb-8">
                <h5 className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: 'rgb(var(--color-text-tertiary))' }}>
                  Recommendation
                </h5>
                <p className="text-sm md:text-base leading-relaxed" style={{ color: 'rgb(var(--color-text-color90))' }}>
                  Alo should prioritize higher-authority backlinks from fitness, fashion, wellness, lifestyle, and media sites. It should also guide partners and affiliates toward more descriptive anchor text (e.g., &quot;women&apos;s yoga leggings,&quot; &quot;men&apos;s activewear,&quot; &quot;Alo workout sets&quot;).
                </p>
              </div>

              <div>
                <h5 className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: 'rgb(var(--color-text-tertiary))' }}>
                  Expected Impact
                </h5>
                <p className="text-sm md:text-base leading-relaxed" style={{ color: 'rgb(var(--color-text-color90))' }}>
                  Better backlink quality and anchor relevance would improve Alo&apos;s ability to rank for priority non-branded keywords. This can drastically increase domain authority, keyword visibility, and qualified organic traffic.
                </p>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  )
}
