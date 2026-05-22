'use client'

import { m } from 'framer-motion'
import { OptimizedImage } from '@/components/case-study/OptimizedImage'

const BASE = '/images/case-studies/imdb-ia-redesign'

// Images 1–39, skipping 33 (missing)
const IMAGE_NUMBERS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
  31, 32, 34, 35, 36, 37, 38, 39,
]

export function ImdbIaRedesignContent() {
  return (
    <m.section
      className="w-full px-6 2xl:px-[140px] py-16 md:py-24 max-w-[1920px] mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      {/* Abstract — narrow for readability */}
      <div className="max-w-[1044px] mx-auto text-left">
        <h3 className="text-lg md:text-[28px] font-bold text-text-primary mb-6 md:mb-[28px]">
          Abstract
        </h3>
        <p className="text-base md:text-[18px] font-normal text-text-body leading-relaxed mb-6">
          We conducted 8 in-depth user interviews to understand how users discover and search
          for content within IMDb. Through this research, we identified key pain points in
          IMDb&apos;s current content discovery system, including an outdated and cluttered
          interface that makes navigation difficult, limited search functionality that doesn&apos;t
          align with natural user behavior, and poor content discovery features that lead users
          to rely on external platforms.
        </p>
        <p className="text-base md:text-[18px] font-normal text-text-body leading-relaxed">
          Additionally, there is a lack of personalized recommendations despite the availability
          of rich data, and information overload makes it challenging to find relevant details
          quickly. We mapped user needs to improve filtering, recommendation, and browsing
          features.
        </p>

        <div
          className="border-t my-16 md:my-20"
          style={{ borderColor: 'rgb(var(--color-text-color10))' }}
        />
      </div>

      {/* Image gallery — wider than text but with margin */}
      <div className="max-w-[1400px] mx-auto flex flex-col gap-6 md:gap-8">
        {IMAGE_NUMBERS.map((num) => (
          <m.div
            key={num}
            className="w-full"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <OptimizedImage
              src={`${BASE}/${num}.png`}
              alt={`IMDb redesign slide ${num}`}
              width={1400}
              height={788}
              className="w-full h-auto block"
            />
          </m.div>
        ))}
      </div>
    </m.section>
  )
}
