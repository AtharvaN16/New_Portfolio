'use client'

import { AnimatedTitle } from '@/components/ui/AnimatedTitle'
import { CaseStudyVideo } from '@/components/case-study/CaseStudyVideo'

const categories = [
  {
    number: '01',
    name: 'Acquisition',
    question: 'How are people finding Alo?',
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
    items: [
      'Competitor traffic overview: Alo vs. Lululemon and Gymshark',
      'Social media follower growth by platform over time',
      'Social engagement rates: average likes, comments, and shares',
    ],
  },
]

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
        className="text-2xl md:text-[40px] font-bold text-text-primary mb-8 leading-tight tracking-[-0.05em] max-w-[680px]"
      />

      <p
        className="text-base md:text-[18px] font-normal leading-relaxed mb-10 max-w-[680px]"
        style={{ color: 'rgb(var(--color-text-color90))' }}
      >
        Alongside the audit, we designed and built an analytics dashboard to give Alo a way
        to track the metrics most relevant to their expansion goals. The dashboard is organized
        into three categories — acquisition, engagement, and brand presence — each with its
        own set of views and time range controls.
      </p>

      {/* Dashboard overview video */}
      <div
        className="mb-3 p-4 md:p-8"
        style={{ backgroundColor: 'rgb(var(--color-surface-elevated))' }}
      >
        <CaseStudyVideo
          src="/videos/case-studies/alo-yoga-digital-analytics/dashboard-overview.mp4"
          alt="Alo Analytics Dashboard overview walkthrough"
        />
      </div>
      <p
        className="text-sm mb-12 md:mb-16"
        style={{ color: 'rgb(var(--color-text-tertiary))' }}
      >
        Alo Analytics Dashboard — Overview. 4.3M organic sessions (30D), 3.84% conversion rate,
        412K total backlinks. Mock data, refreshed May 2026.
      </p>

      {/* Three category cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {categories.map(({ number, name, question, items }) => (
          <div
            key={name}
            className="p-6 md:p-7 rounded-2xl flex flex-col gap-5"
            style={{ backgroundColor: 'rgb(var(--color-surface-elevated))' }}
          >
            <div>
              <p
                className="text-3xl font-bold tracking-[-0.05em] mb-1 leading-none"
                style={{ color: 'rgb(var(--color-text-color30))' }}
              >
                {number}
              </p>
              <h4 className="text-lg font-bold text-text-primary mb-1">
                {name}
              </h4>
              <p
                className="text-sm font-medium"
                style={{ color: 'rgb(var(--color-text-secondary))' }}
              >
                {question}
              </p>
            </div>
            <ul className="space-y-2 mt-auto">
              {items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm"
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
        ))}
      </div>
    </div>
  )
}
