'use client'

import { AnimatedText } from '@/components/ui/AnimatedText'
import Image from 'next/image'

const ALO_INSTA = '/images/case-studies/alo-yoga-digital-analytics/alo_insta.webp'
const ALO_TIKTOK = '/images/case-studies/alo-yoga-digital-analytics/alo_tiktok.webp'
const ALO_YT = '/images/case-studies/alo-yoga-digital-analytics/alo_yt.webp'

export function AloSocialSection() {
  return (
    <div>
      <h3
        className="text-[12px] md:text-[14px] font-bold uppercase mb-6 md:mb-[28px]"
        style={{ color: 'rgb(var(--color-text-tertiary))' }}
      >
        Social Media Analysis
      </h3>

      <AnimatedText variant="heading"
        text="Social strategy lags behind audience expansion goals"
        animationType="fadeIn"
        alwaysAnimate={false}
        delay={0}
        className="text-2xl md:text-[40px] font-bold text-text-primary mb-8 leading-tight tracking-[-0.04em] max-w-[680px]"
      />

      <p
        className="text-base md:text-[18px] font-normal leading-relaxed mb-24 md:mb-32 max-w-[680px]"
        style={{ color: 'rgb(var(--color-text-color90))' }}
      >
        Despite having over 5 million followers, Alo captures only 12.4% of competitive social traffic compared to Lululemon&apos;s 66.45%. Our analysis across Instagram, TikTok, and YouTube reveals a gap between Alo&apos;s massive audience and actual web conversion.
      </p>



      {/* Insight 1 */}
      <section className="mb-24 md:mb-32">
        <p className="text-xs font-mono uppercase tracking-widest mb-8" style={{ color: 'rgb(var(--color-text-tertiary))' }}>
          Insight 1
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-14">
          <div className="flex max-w-[520px] flex-col gap-8">
            <h4 className="max-w-[420px] text-2xl md:text-[30px] font-bold text-text-primary leading-tight tracking-[-0.04em]">
              Content lacks platform-specific roles and audience segmentation
            </h4>
            <p className="text-base md:text-[18px] leading-relaxed" style={{ color: 'rgb(var(--color-text-color90))' }}>
              Alo runs multiple accounts (e.g., @alo, @alomen) but frequently posts identical campaigns across Instagram, TikTok, and YouTube. This removes the purpose of having separate accounts and reduces content differentiation.
            </p>

            <div className="mt-4 p-8 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
              <h5 className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: 'rgb(var(--color-text-tertiary))' }}>
                Recommendation
              </h5>
              <p className="text-sm md:text-base leading-relaxed" style={{ color: 'rgb(var(--color-text-color90))' }}>
                Redefine platform roles. Give each social media platform a clear purpose instead of reposting the same content everywhere. Let TikTok be for trends, YouTube for education, and Instagram for polished brand building.
              </p>
            </div>
          </div>
          
          <div className="flex lg:justify-end items-stretch pt-2">
            <div 
              className="w-full max-w-[480px] h-full relative group overflow-hidden flex items-end justify-end p-0 pt-12 pl-12 md:pt-16 md:pl-16"
              style={{ background: 'linear-gradient(180deg, #A8D3FF 0%, #FFF4DF 100%)' }}
            >
              <Image 
                src={ALO_INSTA} 
                alt="Instagram strategy analysis" 
                width={480}
                height={640}
                className="w-full h-auto max-h-full object-contain object-bottom origin-bottom-right"
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
              Social presence remains anchored in female yoga
            </h4>
            <p className="text-base md:text-[18px] leading-relaxed" style={{ color: 'rgb(var(--color-text-color90))' }}>
              Despite goals to expand into men&apos;s activewear and general fitness, Alo&apos;s YouTube (503K) and Instagram (5M) are overwhelmingly focused on yoga content, unlike competitors Gymshark and Lululemon who capture broader fitness audiences.
            </p>

            <div className="mt-4 p-8 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
              <h5 className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: 'rgb(var(--color-text-tertiary))' }}>
                Recommendation
              </h5>
              <p className="text-sm md:text-base leading-relaxed" style={{ color: 'rgb(var(--color-text-color90))' }}>
                Expand beyond yoga-centered content. Integrate more gym, fitness, lifestyle, and men&apos;s content to actively support the broader audience expansion goals.
              </p>
            </div>
          </div>
          
          <div className="flex lg:justify-end items-stretch pt-2">
            <div 
              className="w-full max-w-[480px] h-full relative group overflow-hidden flex items-end justify-end p-0 pt-12 pl-12 md:pt-16 md:pl-16"
              style={{ background: 'linear-gradient(180deg, #A8D3FF 0%, #FFF4DF 100%)' }}
            >
              <Image 
                src={ALO_YT} 
                alt="YouTube content focus" 
                width={480}
                height={640}
                className="w-full h-auto max-h-full object-contain object-bottom origin-bottom-right"
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
              TikTok represents a massive untapped growth channel
            </h4>
            <p className="text-base md:text-[18px] leading-relaxed" style={{ color: 'rgb(var(--color-text-color90))' }}>
              Alo actually leads its competitors in TikTok referral share (65% of competitive TikTok-referral traffic comes from Alo). That&apos;s a real signal. But with only 736K followers versus Gymshark&apos;s 6.5M, the potential is constrained by duplicated content.
            </p>

            <div className="mt-4 p-8 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
              <h5 className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: 'rgb(var(--color-text-tertiary))' }}>
                Recommendation
              </h5>
              <p className="text-sm md:text-base leading-relaxed" style={{ color: 'rgb(var(--color-text-color90))' }}>
                Use TikTok as a distinct growth and experimentation channel. Focus on creator-led content, fitness trends, and community-driven engagement rather than polished campaign reposts.
              </p>
            </div>
          </div>
          
          <div className="flex lg:justify-end items-stretch pt-2">
            <div 
              className="w-full max-w-[480px] h-full relative group overflow-hidden flex items-end justify-end p-0 pt-12 pl-12 md:pt-16 md:pl-16"
              style={{ background: 'linear-gradient(180deg, #A8D3FF 0%, #FFF4DF 100%)' }}
            >
              <Image 
                src={ALO_TIKTOK} 
                alt="TikTok growth signal" 
                width={480}
                height={640}
                className="w-full h-auto max-h-full object-contain object-bottom origin-bottom-right"
              />
            </div>
          </div>
        </div>
      </section>


    </div>
  )
}
