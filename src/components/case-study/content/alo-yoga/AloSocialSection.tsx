'use client'

import { AnimatedTitle } from '@/components/ui/AnimatedTitle'
import { PlatformRoleGrid } from '../PlatformRoleGrid'

const socialStats = [
  { value: '5M', label: 'Instagram followers', sub: '@alo, @alomen, @aloyoga' },
  { value: '736K', label: 'TikTok followers', sub: '@alo' },
  { value: '503K', label: 'YouTube subscribers', sub: 'Alo Yoga' },
  { value: '12.4%', label: 'Competitive social share', sub: 'vs. Lululemon 66.45%' },
]

const engagementComparison = [
  { metric: 'Bounce rate', alo: '36%', lulu: '34.99%' },
  { metric: 'Pages / visit', alo: '5.08', lulu: '5.12' },
  { metric: 'Visit duration', alo: '2:22', lulu: '3:12' },
]

export function AloSocialSection() {
  return (
    <div>
      <h3
        className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]"
        style={{ color: 'rgb(var(--color-text-tertiary))' }}
      >
        Finding 3 — Social Performance
      </h3>

      <AnimatedTitle
        text="5 million followers, 12.4% of competitive social traffic"
        animationType="fadeIn"
        alwaysAnimate={false}
        delay={0}
        className="text-2xl md:text-[40px] font-bold text-text-primary mb-8 leading-tight tracking-[-0.05em]"
      />

      <p
        className="text-base md:text-[18px] font-normal leading-relaxed mb-10 max-w-[760px]"
        style={{ color: 'rgb(var(--color-text-color90))' }}
      >
        We analyzed Alo&apos;s content strategy across Instagram, TikTok, and YouTube using
        SimilarWeb traffic data and direct channel analysis, comparing against Lululemon and
        Gymshark. The goal was to understand how much of Alo&apos;s social presence was
        actually converting to web traffic, and why there was a gap.
      </p>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 md:mb-12">
        {socialStats.map(({ value, label, sub }) => (
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

      {/* PlatformRoleGrid visual first, caption after */}
      <div className="mb-4">
        <PlatformRoleGrid />
      </div>
      <p
        className="text-sm mb-10 md:mb-12"
        style={{ color: 'rgb(var(--color-text-tertiary))' }}
      >
        Content role distribution across Instagram, TikTok, and YouTube for all three brands.
        Alo lacks differentiated channel roles — the same campaigns appear across platforms.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-10 md:mb-12">
        <div>
          <h4 className="text-base md:text-[18px] font-semibold text-text-primary mb-3">
            The cross-platform duplication problem
          </h4>
          <p
            className="text-base md:text-[18px] font-normal leading-relaxed"
            style={{ color: 'rgb(var(--color-text-color90))' }}
          >
            Alo runs multiple Instagram accounts — @alo, @alomen, and @aloyoga — but frequently
            posts identical campaigns and captions across all of them. This removes the purpose
            of having separate accounts. A user following @alomen gets the same content as one
            following @alo, just with a different handle.
          </p>
        </div>
        <div>
          <h4 className="text-base md:text-[18px] font-semibold text-text-primary mb-3">
            The TikTok signal
          </h4>
          <p
            className="text-base md:text-[18px] font-normal leading-relaxed"
            style={{ color: 'rgb(var(--color-text-color90))' }}
          >
            Alo actually leads its competitors in TikTok referral share — 65.04% of competitive
            TikTok-referral traffic comes from Alo. That&apos;s a real signal. But with only 736K
            followers versus Gymshark&apos;s 6.5M, and content that&apos;s largely duplicated
            from other platforms, the growth potential isn&apos;t being used.
          </p>
        </div>
      </div>

      {/* Social insight quote block */}
      <div className="flex items-start gap-6 mb-12 md:mb-16">
        <div
          className="w-[2px] self-stretch flex-shrink-0"
          style={{ backgroundColor: 'rgb(var(--color-text-color20))' }}
        />
        <p
          className="text-base md:text-[20px] font-medium leading-relaxed"
          style={{ color: 'rgb(var(--color-text-color90))' }}
        >
          &ldquo;Alo&apos;s social strategy has not evolved alongside its broader audience
          expansion goals. Compared to its competitors, Alo lacks a clear cross-platform
          content strategy and differentiated audience targeting.&rdquo;
        </p>
      </div>

      {/* Site engagement paradox */}
      <div
        className="p-6 md:p-8 rounded-2xl"
        style={{ backgroundColor: 'rgb(var(--color-surface-elevated))' }}
      >
        <h4
          className="text-sm font-mono uppercase tracking-widest mb-4"
          style={{ color: 'rgb(var(--color-text-tertiary))' }}
        >
          Site engagement — once users arrive
        </h4>
        <p
          className="text-base md:text-[18px] font-normal leading-relaxed mb-8"
          style={{ color: 'rgb(var(--color-text-color90))' }}
        >
          Once users do land on Alo&apos;s site, they behave nearly identically to Lululemon
          visitors. The problem isn&apos;t what happens on the site — it&apos;s how few people
          are getting there in the first place.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm md:text-base">
            <thead>
              <tr
                className="border-b"
                style={{ borderColor: 'rgb(var(--color-text-color10))' }}
              >
                <th className="text-left py-3 font-semibold text-text-primary">Metric</th>
                <th className="text-right py-3 font-semibold text-text-primary">Alo Yoga</th>
                <th className="text-right py-3 font-semibold text-text-primary">Lululemon</th>
              </tr>
            </thead>
            <tbody>
              {engagementComparison.map(({ metric, alo, lulu }) => (
                <tr
                  key={metric}
                  className="border-b"
                  style={{ borderColor: 'rgb(var(--color-text-color10))' }}
                >
                  <td className="py-3" style={{ color: 'rgb(var(--color-text-color90))' }}>{metric}</td>
                  <td className="py-3 text-right font-semibold" style={{ color: 'rgb(var(--color-text-primary))' }}>{alo}</td>
                  <td className="py-3 text-right" style={{ color: 'rgb(var(--color-text-color60))' }}>{lulu}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs mt-3" style={{ color: 'rgb(var(--color-text-tertiary))' }}>
          Source: SimilarWeb, Jan–Mar 2026
        </p>
      </div>
    </div>
  )
}
