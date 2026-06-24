'use client'

import { AnimatedText } from '@/components/ui/AnimatedText'
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
        className="text-sm md:text-base font-semibold normal-case mb-6 md:mb-[28px]"
        style={{ color: 'rgb(var(--color-text-tertiary))' }}
      >
        Web Performance Dashboard
      </h3>

      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
        <AnimatedText variant="heading"
          text="We built a dashboard to track what would matter going forward"
          animationType="fadeIn"
          alwaysAnimate={false}
          delay={0}
          className="text-xl md:text-2xl font-bold text-text-primary leading-tight tracking-[-0.05em] max-w-[600px]"
        />

        <a
          href="https://alo-dashboard-iyhcja0ii-anayak-2220s-projects.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest border px-6 py-4 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100"
        >
          View Live Dashboard
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 12L12 4M12 4H5.5M12 4V10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>

      <p
        className="text-base md:text-[18px] font-normal leading-normal mb-10 max-w-[680px]"
        style={{ color: 'rgb(var(--color-text-color90))' }}
      >
        Alongside the audit, we designed and built an analytics dashboard to give Alo a way
        to track the metrics most relevant to their expansion goals. The dashboard is organized
        into three categories — acquisition, engagement, and brand presence — each with its
        own set of views and time range controls.
      </p>

      {/* Dashboard overview video */}
      <div
        className="mb-3 p-8 md:p-12 lg:p-16 flex justify-center"
        style={{ background: 'linear-gradient(180deg, #A8D3FF 0%, #FFF4DF 100%)' }}
      >
        <div className="w-full max-w-5xl shadow-2xl rounded-xl overflow-hidden">
          <CaseStudyVideo
            src="/videos/case-studies/alo-yoga-digital-analytics/dashboard-overview.mp4"
            alt="Alo Analytics Dashboard overview walkthrough"
          />
        </div>
      </div>
      <p
        className="text-sm mb-12 md:mb-16"
        style={{ color: 'rgb(var(--color-text-tertiary))' }}
      >
        Alo Analytics Dashboard with mock data
      </p>
    </div>
  )
}
