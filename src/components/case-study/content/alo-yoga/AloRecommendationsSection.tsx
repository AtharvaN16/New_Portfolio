'use client'

import { AnimatedTitle } from '@/components/ui/AnimatedTitle'

const keyInsights = [
  {
    number: '01',
    text: 'Search visibility is overly concentrated around women\'s yoga content',
  },
  {
    number: '02',
    text: 'Weak visibility across broader activewear and men\'s workout search categories',
  },
  {
    number: '03',
    text: 'Content strategy doesn\'t capture users across different stages of the search journey',
  },
  {
    number: '04',
    text: 'Technical and on-page SEO issues are actively limiting discoverability and rankings',
  },
  {
    number: '05',
    text: 'Social content is repetitive across platforms and remains too niche to drive growth',
  },
]

const recommendations = [
  {
    number: '01',
    title: 'Redefine platform roles',
    description:
      'Each social platform should serve a distinct purpose. Instagram for lifestyle and brand identity, TikTok for discovery and community growth, YouTube for long-form content that builds purchase intent. Right now, Alo posts the same campaigns everywhere — which means none of the platforms are working as hard as they could.',
  },
  {
    number: '02',
    title: 'Expand beyond yoga-centered content',
    description:
      'Alo needs to rank for the words people actually search: "gym clothes," "workout sets," "men\'s activewear." That means creating category pages with real content depth, building content clusters around fitness and lifestyle topics, and actively targeting keywords where Lululemon and Gymshark are already winning.',
  },
  {
    number: '03',
    title: 'Use TikTok as a growth and experimentation channel',
    description:
      'Alo already leads in TikTok referral share — 65% of competitive TikTok traffic comes to Alo. But with 736K followers vs. Gymshark\'s 6.5M, there\'s real room to grow. TikTok is the platform where original, platform-native content compounds fastest. It should be treated as Alo\'s primary growth channel, not a repost destination.',
  },
]

const roadmapPhases = [
  {
    range: '0–3 months',
    label: 'Foundation & Visibility',
    items: [
      { title: 'Fix on-page basics', desc: 'Resolve the 143 non-indexable URLs, fill missing H1 tags, and address the 104 broken links — before any new content strategy.' },
      { title: 'Improve metadata quality', desc: 'Write unique meta descriptions and title tags for the 39+ pages missing them. Target 600–700 character descriptions for category pages.' },
      { title: 'Address shallow content pages', desc: 'Expand the 36% of pages under 200 words. Category and collection pages especially need depth to compete in search.' },
      { title: 'Clarify platform roles', desc: 'Define what each social platform is for. Stop reposting the same campaigns across @alo, @alomen, and @aloyoga.' },
    ],
  },
  {
    range: '3–9 months',
    label: 'Audience Expansion',
    items: [
      { title: 'Expand category pages', desc: 'Build out men\'s, gym, and general activewear category pages targeting the 572K monthly searches Alo currently doesn\'t capture.' },
      { title: 'Create content clusters', desc: 'Develop topic clusters around high-volume fitness and lifestyle keywords. Each cluster should support a pillar page ranking for a head term.' },
      { title: 'Expand beyond yoga content', desc: 'Shift content mix toward general fitness and lifestyle — both on social and in organic content. This is where Gymshark gains its non-branded traffic advantage.' },
      { title: 'Use TikTok for growth', desc: 'Post platform-native content at consistent volume. Test formats, sounds, and angles that don\'t exist anywhere else in Alo\'s content library.' },
    ],
  },
  {
    range: '9+ months',
    label: 'Brand Positioning & Growth',
    items: [
      { title: 'Increase non-branded traffic', desc: 'Track non-branded organic share as a primary KPI. The goal is to move from ~5% toward Gymshark\'s 47% over an 18–24 month horizon.' },
      { title: 'Improve category visibility', desc: 'Monitor rankings for "workout clothes," "gym clothes," and "men\'s activewear." These should move from unranked to top 20 as category pages build authority.' },
      { title: 'Strengthen backlink authority', desc: 'Shift backlink strategy from promotional anchors to editorial and contextual links. Target referral partnerships with fitness publications and creators.' },
      { title: 'Stronger brand positioning', desc: 'Alo has cultural recognition. The goal is for its digital presence to reflect that — showing up wherever someone searches for premium activewear, not just when they already know the brand.' },
    ],
  },
]

export function AloRecommendationsSection() {
  return (
    <div>
      {/* Key Insights */}
      <h3
        className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]"
        style={{ color: 'rgb(var(--color-text-tertiary))' }}
      >
        Key Insights
      </h3>

      <AnimatedTitle
        text="Five findings that shaped our recommendations"
        animationType="fadeIn"
        alwaysAnimate={false}
        delay={0}
        className="text-2xl md:text-[40px] font-bold text-text-primary mb-10 leading-tight tracking-[-0.05em]"
      />

      <div className="space-y-4 mb-0">
        {keyInsights.map(({ number, text }) => (
          <div
            key={number}
            className="flex items-start gap-6 py-5 border-b"
            style={{ borderColor: 'rgb(var(--color-text-color10))' }}
          >
            <span
              className="text-sm font-mono shrink-0 mt-0.5"
              style={{ color: 'rgb(var(--color-text-color30))' }}
            >
              {number}
            </span>
            <p
              className="text-base md:text-[18px] font-medium leading-snug"
              style={{ color: 'rgb(var(--color-text-color90))' }}
            >
              {text}
            </p>
          </div>
        ))}
      </div>

      <div
        className="border-t my-24 md:my-32"
        style={{ borderColor: 'rgb(var(--color-text-color10))' }}
      />

      {/* Recommendations */}
      <h3
        className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]"
        style={{ color: 'rgb(var(--color-text-tertiary))' }}
      >
        Recommendations
      </h3>

      <AnimatedTitle
        text="Three things Alo should change"
        animationType="fadeIn"
        alwaysAnimate={false}
        delay={0}
        className="text-2xl md:text-[40px] font-bold text-text-primary mb-10 leading-tight tracking-[-0.05em]"
      />

      <div className="space-y-10 md:space-y-12">
        {recommendations.map(({ number, title, description }) => (
          <div
            key={number}
            className="grid grid-cols-1 md:grid-cols-[80px_1fr] gap-4 md:gap-8"
          >
            <p
              className="text-4xl font-bold tracking-[-0.05em] leading-none"
              style={{ color: 'rgb(var(--color-text-color10))' }}
            >
              {number}
            </p>
            <div>
              <h4 className="text-xl md:text-[24px] font-bold text-text-primary mb-3">
                {title}
              </h4>
              <p
                className="text-base md:text-[18px] font-normal leading-relaxed"
                style={{ color: 'rgb(var(--color-text-color90))' }}
              >
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div
        className="border-t my-24 md:my-32"
        style={{ borderColor: 'rgb(var(--color-text-color10))' }}
      />

      {/* Roadmap */}
      <h3
        className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]"
        style={{ color: 'rgb(var(--color-text-tertiary))' }}
      >
        Roadmap
      </h3>

      <AnimatedTitle
        text="A three-phase path to closing the gap"
        animationType="fadeIn"
        alwaysAnimate={false}
        delay={0}
        className="text-2xl md:text-[40px] font-bold text-text-primary mb-10 leading-tight tracking-[-0.05em]"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
        {roadmapPhases.map(({ range, label, items }) => (
          <div key={label}>
            <div className="mb-6">
              <p
                className="text-xs font-mono uppercase tracking-widest mb-1"
                style={{ color: 'rgb(var(--color-text-tertiary))' }}
              >
                {range}
              </p>
              <h4 className="text-base md:text-[18px] font-bold text-text-primary">
                {label}
              </h4>
            </div>
            <div className="space-y-5">
              {items.map(({ title, desc }) => (
                <div key={title}>
                  <p
                    className="text-sm font-semibold mb-1"
                    style={{ color: 'rgb(var(--color-text-secondary))' }}
                  >
                    {title}
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'rgb(var(--color-text-color60))' }}
                  >
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
