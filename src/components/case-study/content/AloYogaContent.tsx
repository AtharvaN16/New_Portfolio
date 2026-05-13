'use client'
import { m } from 'framer-motion'
import { CaseStudyReadMore } from '@/components/case-study/CaseStudyReadMore'
import { IndexabilityWall } from './IndexabilityWall'
import { MarketVoidVenn } from './MarketVoidVenn'
import { PlatformRoleGrid } from './PlatformRoleGrid'

interface AloYogaContentProps {
  isContentRevealed: boolean
  onToggleContent: () => void
}

export function AloYogaContent({ isContentRevealed, onToggleContent }: AloYogaContentProps) {
  return (
    <m.section
      className="w-full px-6 2xl:px-[140px] py-16 md:py-24 max-w-[1920px] mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <div className="max-w-[1044px] mx-auto text-left">
        {/* Abstract */}
        <h3 className="text-lg md:text-[28px] font-bold text-text-primary mb-6 md:mb-[28px]">
          Abstract
        </h3>
        <div className="space-y-6 md:space-y-8">
          <p className="text-base md:text-[18px] font-normal text-text-color70 leading-relaxed">
            When you think of premium activewear, Alo sits alongside Lululemon — same price point, same
            cultural presence, same customer. But unlike Lululemon or Gymshark, Alo barely shows up when
            you search for athletic wear, workout clothes, or anything men&apos;s. The brand and the
            search strategy weren&apos;t in the same conversation.
          </p>
          <p className="text-base md:text-[18px] font-normal text-text-color70 leading-relaxed">
            We ran a full digital audit across SEO, keyword coverage, and social performance using
            SimilarWeb, Screaming Frog, and SEMrush, benchmarked against Lululemon and Gymshark. The goal
            was to find where the gap was coming from and put together a strategy to close it.
          </p>
        </div>

        <CaseStudyReadMore
          readTime="6 min read"
          isContentRevealed={isContentRevealed}
          onToggleContent={onToggleContent}
        >
          <div className="space-y-32 mt-24">
            {/* Context */}
            <div className="max-w-[800px]">
              <h2 className="text-3xl md:text-[48px] font-bold mb-8 text-text-primary leading-[1.1] tracking-tighter">
                Alo has the brand recognition of a Lululemon competitor and a fraction of its search traffic.
              </h2>
              <p className="text-lg md:text-[22px] text-text-color70 leading-relaxed">
                As of early 2026, Lululemon receives 37.92M monthly visits. Gymshark gets 13.98M. Alo
                gets 9.35M — and roughly 95% of that comes from people already searching for Alo
                specifically. The brand isn&apos;t showing up for anyone new.
              </p>
            </div>

            {/* Technical SEO */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
              <div>
                <p className="text-sm font-mono uppercase tracking-widest text-text-color70 mb-4">
                  Technical SEO
                </p>
                <h3 className="text-xl md:text-[28px] font-bold mb-6 text-text-primary">
                  A third of the site wasn&apos;t being indexed
                </h3>
                <p className="text-base md:text-[18px] text-text-color70 leading-relaxed mb-6">
                  We crawled 392 URLs using Screaming Frog. 143 of them — 36.5% — were non-indexable,
                  meaning Google couldn&apos;t reach them at all. On top of that: 104 broken links,
                  48.6% of pages missing H1 tags, and 39 pages with no meta description.
                </p>
                <p className="text-base md:text-[18px] text-text-color70 leading-relaxed">
                  Before any keyword strategy makes sense, the site needs to be crawlable.
                </p>
              </div>
              <div className="flex justify-center md:justify-end">
                <IndexabilityWall />
              </div>
            </div>

            <div className="border-t border-[rgb(var(--color-text-color10))] w-full" />

            {/* Keyword Coverage */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
              <div className="order-2 md:order-1 flex justify-center md:justify-start">
                <MarketVoidVenn />
              </div>
              <div className="order-1 md:order-2">
                <p className="text-sm font-mono uppercase tracking-widest text-text-color70 mb-4">
                  Keyword Coverage
                </p>
                <h3 className="text-xl md:text-[28px] font-bold mb-6 text-text-primary">
                  The brand only ranked for yoga
                </h3>
                <p className="text-base md:text-[18px] text-text-color70 leading-relaxed mb-8">
                  About 80% of Alo&apos;s keyword visibility is tied to yoga and women&apos;s categories.
                  Gymshark converts 47% of its traffic from non-branded searches — for Alo, that number
                  is around 5%. Alo doesn&apos;t rank for &quot;workout clothes,&quot; &quot;gym
                  clothes,&quot; or most men&apos;s activewear terms at all.
                </p>
                <div className="flex flex-col">
                  <span className="text-sm font-mono uppercase tracking-widest text-text-color70 mb-2">
                    Monthly search volume not captured
                  </span>
                  <span
                    className="text-4xl md:text-[64px] font-bold text-text-primary tracking-tighter"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    572,000
                  </span>
                  <span className="text-sm text-text-color70 mt-2">
                    men&apos;s activewear searches per month
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-[rgb(var(--color-text-color10))] w-full" />

            {/* Social Performance */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
              <div>
                <p className="text-sm font-mono uppercase tracking-widest text-text-color70 mb-4">
                  Social Performance
                </p>
                <h3 className="text-xl md:text-[28px] font-bold mb-6 text-text-primary">
                  Reach without traffic
                </h3>
                <p className="text-base md:text-[18px] text-text-color70 leading-relaxed mb-6">
                  Alo runs separate Instagram accounts for men, yoga, and the main brand — but posts the
                  same campaigns across all of them. The segmentation exists in the account structure,
                  not in the content. As a result, Alo accounts for just 12.4% of social-driven traffic
                  across the three brands, despite having 5M Instagram followers.
                </p>
                <p className="text-base md:text-[18px] text-text-color70 leading-relaxed">
                  Notably, once users do land on the site, they behave almost identically to Lululemon
                  visitors — 36% bounce rate, 5.08 pages per visit. The site works. Getting people
                  there is the problem.
                </p>
              </div>
              <div className="flex justify-center md:justify-end">
                <PlatformRoleGrid />
              </div>
            </div>

            <div className="border-t border-[rgb(var(--color-text-color10))] w-full" />

            {/* Recommendations */}
            <div className="pb-24">
              <h2 className="text-3xl md:text-[48px] font-bold mb-4 text-text-primary leading-[1.1] tracking-tighter">
                Recommendations
              </h2>
              <p className="text-base md:text-[18px] text-text-color70 leading-relaxed mb-16 max-w-[680px]">
                We prioritized three areas in sequence — fix the technical foundation first, then expand
                keyword reach, then make the social strategy actually differentiated.
              </p>
              <div className="space-y-6">
                {[
                  {
                    step: '01',
                    title: 'Fix indexability',
                    description:
                      'Resolve the 36.5% of non-indexable URLs and clean up the 104 broken links so search engines can crawl the site.',
                  },
                  {
                    step: '02',
                    title: 'Expand keyword coverage',
                    description:
                      "Build out content clusters for men's activewear and general fitness terms. There are 572K monthly searches in this space that Alo currently doesn't capture.",
                  },
                  {
                    step: '03',
                    title: 'Differentiate content by platform',
                    description:
                      'Give each social channel a distinct role rather than cross-posting the same content. TikTok for reach, YouTube for depth, Instagram for conversion.',
                  },
                ].map((item, i) => (
                  <m.div
                    key={item.step}
                    className="p-8 rounded-2xl border border-[rgb(var(--color-text-color10))] bg-white dark:bg-neutral-900"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <span className="text-sm font-mono text-text-color70 mb-2 block">
                      PHASE {item.step}
                    </span>
                    <h4 className="text-xl font-bold text-text-primary mb-3">{item.title}</h4>
                    <p className="text-base text-text-color70 leading-relaxed">{item.description}</p>
                  </m.div>
                ))}
              </div>
            </div>
          </div>
        </CaseStudyReadMore>
      </div>
    </m.section>
  )
}
