'use client'

import Image from 'next/image'
import { CASE_STUDY_INLINE_IMAGE_SIZES } from '@/lib/case-study-image-sizes'
import { AnimatedText } from '@/components/ui/AnimatedText'

const recommendations = [
  {
    number: '01',
    title: "Scale Men's Activewear Visibility",
    description:
      "Alo should utilize their men's activewear landing pages and supporting content clusters around terms like: “men’s workout clothes,” “men’s sweatpants,” “men’s gym shorts,” and “gym workout clothes for men.”",
    impacts: [
      'Convert new male customers who are already searching with purchase intent',
      'Increase non-branded organic traffic',
      'Improve visibility in the men’s activewear category',
    ],
  },
  {
    number: '02',
    title: 'Optimize Category Pages for Broader Search Terms',
    description:
      "Alo should maintain its yoga authority while making sure that its broader category pages for “workout clothes,” “gym clothes,” “athletic wear,” and “sports bras” are optimized as commercial landing pages with strategic keywords, not just product grids.",
    impacts: [
      'Better competitive positioning against top competitors',
      'Stronger category visibility',
      'More top-of-funnel traffic',
    ],
  },
  {
    number: '03',
    title: 'Connect Content to the Products',
    description:
      "Alo should create a connected content and landing page strategy that serves both stages of the customer journey. This includes educational guides like “What to Wear to the Gym: Alo’s Guide to Workout Outfits” featuring recommendations and outfit modules, alongside optimized material-based commercial pages like “Cotton Workout Clothes” and “Organic Activewear.”",
    impacts: [
      'Increase non-branded organic traffic and improve category visibility',
      'Strengthen internal linking across the site',
      'Support assisted conversions by connecting educational content to shoppable experiences',
    ],
    showImage: true,
  },
]

export function AloKeywordRecommendations() {
  return (
    <div className="mt-24 md:mt-32">
      <h3
        className="text-[12px] md:text-[14px] font-bold uppercase mb-6 md:mb-[28px]"
        style={{ color: 'rgb(var(--color-text-tertiary))' }}
      >
        Recommendations
      </h3>

      <AnimatedText variant="heading"
        text="Closing the Activewear and Men's Keyword Gap"
        animationType="fadeIn"
        alwaysAnimate={false}
        delay={0}
        className="text-2xl md:text-[40px] font-bold text-text-primary mb-24 md:mb-32 leading-tight tracking-[-0.05em]"
      />

      <div className="flex flex-col gap-24 md:gap-32">
        {recommendations.map(({ number, title, description, impacts, showImage }) => (
          <div key={title} className="flex flex-col">
            {/* Number on Top */}
            <span
              className="text-2xl font-mono font-bold mb-8"
              style={{ color: 'rgb(var(--color-text-tertiary))' }}
            >
              {number}
            </span>

            <div className="flex flex-col lg:flex-row gap-12 md:gap-16 items-start">
              {/* Left Side: Title and Description */}
              <div className="lg:w-1/2">
                <h4 className="text-xl md:text-[28px] font-bold text-text-primary leading-tight mb-6">
                  {title}
                </h4>
                <p
                  className="text-base md:text-[18px] leading-relaxed"
                  style={{ color: 'rgb(var(--color-text-color90))' }}
                >
                  {description}
                </p>
              </div>

              {/* Right Side: Expected Impact Frame */}
              <div 
                className="lg:w-1/2 w-full p-8 md:p-10 border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900/50"
              >
                <h5
                  className="text-xs font-mono uppercase tracking-widest mb-8"
                  style={{ color: 'rgb(var(--color-text-tertiary))' }}
                >
                  Expected Impact
                </h5>
                <ul className="flex flex-col gap-5">
                  {impacts.map((impact) => (
                    <li
                      key={impact}
                      className="flex items-start gap-4 text-sm md:text-base leading-relaxed"
                      style={{ color: 'rgb(var(--color-text-color90))' }}
                    >
                      <span
                        className="mt-2.5 h-1.5 w-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: 'rgb(var(--color-text-color30))' }}
                      />
                      {impact}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Optional Image (for Rec 3) */}
            {showImage && (
              <div className="mt-12 md:mt-16 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden">
                <Image
                  src="/images/case-studies/alo-yoga-digital-analytics/rec3_keyword.avif"
                  alt="Connected Content and Landing Page Strategy"
                  width={1920}
                  height={1080}
                  sizes={CASE_STUDY_INLINE_IMAGE_SIZES}
                  className="w-full h-auto"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
