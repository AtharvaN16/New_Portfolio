'use client'

import { m } from 'framer-motion'
import { AloInsightHandwrittenKeywords } from './AloInsightHandwrittenKeywords'

const CLUSTER_DIAGRAM_SRC =
  '/images/case-studies/alo-yoga-digital-analytics/cluster-diagram.avif'
const UNTAPPED_DIAGRAM_SRC =
  '/images/case-studies/alo-yoga-digital-analytics/untapped.avif'

const INSIGHT_TITLE_CLASS =
  'max-w-[420px] text-2xl md:text-[30px] font-bold text-text-primary leading-tight tracking-[-0.04em]'

const DIAGRAM_BG_CLASS =
  'pointer-events-none mt-8 h-[min(72vw,300px)] w-full max-w-[420px] origin-left scale-90 bg-contain bg-left bg-no-repeat md:h-[360px]'

const DIAGRAM_FADE_EASE = [0.22, 1, 0.36, 1] as const

function InsightDiagramBackdrop({ src, testId }: { src: string; testId: string }) {
  return (
    <m.div
      aria-hidden
      className={DIAGRAM_BG_CLASS}
      data-testid={testId}
      initial={{ opacity: 0, y: 8 }}
      style={{ backgroundImage: `url(${src})` }}
      transition={{ duration: 1.05, ease: DIAGRAM_FADE_EASE, delay: 0.28 }}
      viewport={{ once: true, margin: '-10% 0px -14% 0px' }}
      whileInView={{ opacity: 1, y: 0 }}
    />
  )
}

type ExampleCluster = {
  topic: string
  clusterSize: string
  volume: string
  difficulty: string
}

type KeywordInsight = {
  eyebrow: string
  title: string
  body: string
  matters: string
  keywords?: string[]
  clusterDiagram?: boolean
  untappedDiagram?: boolean
  handwrittenKeywords?: boolean
  exampleCluster?: ExampleCluster
}

const keywordInsights: KeywordInsight[] = [
  {
    eyebrow: 'Insight 1',
    title: "Alo's search visibility is still anchored in female yoga",
    body:
      "About 80% of Alo's content and search visibility is tied to female yoga. That reinforces the brand's core strength, but leaves high-intent men's activewear searches underdeveloped.",
    matters:
      'These are high-intent searches. Users looking for "mens sweatpants" or "gym workout clothes for men" are already close to product discovery or purchase. If Alo is not visible, competitors capture the traffic and conversion opportunity.',
    handwrittenKeywords: true,
    keywords: [
      'mens sweatpants',
      'shorts for men',
      'joggers for men',
      "tshirt men's",
      "men's workout clothes",
      'mens gym clothes',
    ],
  },
  {
    eyebrow: 'Insight 2',
    title: 'Alo is missing broader workout demand beyond yoga',
    body:
      'Alo performs well for yoga-specific demand, including ranking 4th for "yoga clothes." But broader activewear terms tell a different story: Alo ranks 55th for "workout clothes" and does not appear for "gym clothes."',
    matters:
      'These searches represent a major growth opportunity. If Alo wants to be perceived as a comprehensive activewear lifestyle brand, it needs to show up when users search for workout occasions beyond yoga.',
    untappedDiagram: true,
  },
  {
    eyebrow: 'Insight 3',
    title: 'Non-branded content clusters can connect education to shopping',
    body:
      'The keyword research reveals that Alo has an opportunity to capture more non-branded organic traffic by building content around underdeveloped keyword clusters.',
    matters:
      'Educational content can capture users earlier in search, then guide them toward product discovery through outfit modules, internal links, FAQs, and shoppable category pages.',
    clusterDiagram: true,
    exampleCluster: {
      topic: '"what to wear to the gym"',
      clusterSize: '14 keywords',
      volume: '4.3K',
      difficulty: 'low',
    },
  },
]

export function AloKeywordInsights() {
  return (
    <div className="space-y-14 md:space-y-16 mb-0">
      {keywordInsights.map(
        ({
          eyebrow,
          title,
          body,
          matters,
          keywords,
          clusterDiagram,
          untappedDiagram,
          handwrittenKeywords,
          exampleCluster,
        }) => (
          <section key={title} className="pt-8">
            <p
              className="text-xs font-mono uppercase tracking-widest mb-8"
              style={{ color: 'rgb(var(--color-text-tertiary))' }}
            >
              {eyebrow}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-14">
              {clusterDiagram ? (
                <div className="relative isolate max-w-[420px] self-start">
                  <h4 className={`relative z-10 ${INSIGHT_TITLE_CLASS}`}>{title}</h4>
                  <InsightDiagramBackdrop src={CLUSTER_DIAGRAM_SRC} testId="alo-cluster-diagram" />
                </div>
              ) : untappedDiagram ? (
                <div className="relative isolate max-w-[420px] self-start">
                  <h4 className={`relative z-10 ${INSIGHT_TITLE_CLASS}`}>{title}</h4>
                  <InsightDiagramBackdrop src={UNTAPPED_DIAGRAM_SRC} testId="alo-untapped-diagram" />
                </div>
              ) : (
                <div className="max-w-[420px]">
                  <h4 className={INSIGHT_TITLE_CLASS}>{title}</h4>
                  {handwrittenKeywords && keywords && keywords.length > 0 ? (
                    <AloInsightHandwrittenKeywords keywords={keywords} />
                  ) : null}
                </div>
              )}
              <div className="flex max-w-[520px] flex-col gap-8">
                <p className="text-base md:text-[18px] leading-relaxed" style={{ color: 'rgb(var(--color-text-color90))' }}>
                  {body}
                </p>

                <div className="mt-6 md:mt-12">
                  <p
                    className="text-xs font-mono uppercase tracking-widest mb-4"
                    style={{ color: 'rgb(var(--color-text-tertiary))' }}
                  >
                    Why it matters
                  </p>
                  <p className="text-sm md:text-base leading-relaxed" style={{ color: 'rgb(var(--color-text-color90))' }}>
                    {matters}
                  </p>
                </div>

                {exampleCluster ? (
                  <m.div
                    className="pt-8"
                    initial={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                    viewport={{ once: true, margin: '-6% 0px' }}
                    whileInView={{ opacity: 1, y: 0 }}
                  >
                    <p
                      className="text-xs font-mono uppercase tracking-widest mb-5"
                      style={{ color: 'rgb(var(--color-text-tertiary))' }}
                    >
                      For example
                    </p>
                    <p
                      className="mb-5 leading-snug"
                      style={{
                        fontFamily: 'var(--font-mynerve)',
                        fontSize: 'clamp(1.5rem, 0.75rem + 3.2vw, 2.25rem)',
                        color: 'rgb(var(--color-alo-data-accent))',
                      }}
                    >
                      {exampleCluster.topic.replace(/"/g, '')}
                    </p>
                    <ul className="space-y-2 text-sm" style={{ color: 'rgb(var(--color-text-color90))' }}>
                      <li>
                        keyword cluster of{' '}
                        <strong className="font-semibold" style={{ color: 'rgb(var(--color-text-primary))' }}>
                          {exampleCluster.clusterSize}
                        </strong>
                      </li>
                      <li>
                        <strong className="font-semibold" style={{ color: 'rgb(var(--color-text-primary))' }}>
                          {exampleCluster.volume}
                        </strong>{' '}
                        total volume
                      </li>
                      <li>
                        <strong className="font-semibold" style={{ color: 'rgb(var(--color-text-primary))' }}>
                          {exampleCluster.difficulty}
                        </strong>{' '}
                        keyword difficulty
                      </li>
                    </ul>
                  </m.div>
                ) : null}
              </div>
            </div>
          </section>
        )
      )}
    </div>
  )
}
