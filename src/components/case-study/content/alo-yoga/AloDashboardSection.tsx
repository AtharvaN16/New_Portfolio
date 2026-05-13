'use client'

import { AnimatedTitle } from '@/components/ui/AnimatedTitle'

const categories = [
  {
    number: '01',
    name: 'Acquisition',
    question: 'How are people finding Alo?',
    imgSlug: 'dashboard-acquisition',
    items: [
      'Daily, monthly, and yearly organic traffic trends',
      'Targeted keyword performance across men\'s, workout, and gym categories',
      'Backlink analytics: authority score, total backlinks, referring domains',
    ],
  },
  {
    number: '02',
    name: 'Engagement',
    question: 'What do users do once they arrive?',
    imgSlug: 'dashboard-engagement',
    items: [
      'Bounce rate and engaged session trends over time',
      'Website conversion funnel: sessions → product view → cart → checkout',
      'User demographics and interest affinity index',
    ],
  },
  {
    number: '03',
    name: 'Brand Presence',
    question: 'How does Alo show up competitively?',
    imgSlug: 'dashboard-brand-presence',
    items: [
      'Competitor traffic overview: Alo vs. Lululemon and Gymshark',
      'Social media follower growth by platform over time',
      'Social engagement rates: average likes, comments, and shares',
    ],
  },
]

function ImagePlaceholder({ slug }: { slug: string }) {
  return (
    <div className="relative w-full aspect-video bg-neutral-100 dark:bg-neutral-800 overflow-hidden flex items-center justify-center border border-dashed border-neutral-300 dark:border-neutral-600 rounded-lg">
      <span className="text-neutral-500 font-mono text-xs px-4 text-center">
        {`/images/case-studies/alo-yoga-digital-analytics/${slug}.png`}
      </span>
    </div>
  )
}

export function AloDashboardSection() {
  return (
    <div>
      <h3
        className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]"
        style={{ color: 'rgb(var(--color-text-tertiary))' }}
      >
        Deliverable — Web Performance Dashboard
      </h3>

      <AnimatedTitle
        text="We built a dashboard to track what would matter going forward"
        animationType="fadeIn"
        alwaysAnimate={false}
        delay={0}
        className="text-2xl md:text-[40px] font-bold text-text-primary mb-8 leading-tight tracking-[-0.05em]"
      />

      <p
        className="text-base md:text-[18px] font-normal leading-relaxed mb-10 max-w-[760px]"
        style={{ color: 'rgb(var(--color-text-color90))' }}
      >
        Alongside the audit, we designed and built an analytics dashboard to give Alo a way
        to track the metrics most relevant to their expansion goals. The dashboard is organized
        into three categories — acquisition, engagement, and brand presence — each with its
        own set of views and time range controls.
      </p>

      {/* Full dashboard overview screenshot */}
      <div className="mb-3">
        <ImagePlaceholder slug="dashboard-overview" />
      </div>
      <p
        className="text-sm mb-12 md:mb-16"
        style={{ color: 'rgb(var(--color-text-tertiary))' }}
      >
        Alo Analytics Dashboard — Overview. 4.3M organic sessions (30D), 3.84% conversion rate,
        412K total backlinks. Mock data, refreshed May 2026.
      </p>

      {/* Three categories */}
      <div className="space-y-16 md:space-y-20">
        {categories.map(({ number, name, question, imgSlug, items }) => (
          <div
            key={name}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start"
          >
            <div>
              <p
                className="text-4xl font-bold tracking-[-0.05em] mb-1 leading-none"
                style={{ color: 'rgb(var(--color-text-color10))' }}
              >
                {number}
              </p>
              <h4 className="text-xl md:text-[24px] font-bold text-text-primary mb-1">
                {name}
              </h4>
              <p
                className="text-base md:text-[18px] font-medium mb-5"
                style={{ color: 'rgb(var(--color-text-secondary))' }}
              >
                {question}
              </p>
              <ul className="space-y-2">
                {items.map((item) => (
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
              <ImagePlaceholder slug={imgSlug} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
