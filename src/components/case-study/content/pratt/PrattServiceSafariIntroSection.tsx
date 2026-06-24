'use client'

import Image from 'next/image'
import { AnimatedText } from '@/components/ui/AnimatedText'

export function PrattServiceSafariIntroSection() {
  return (
    <>
        {/* ── Cover image: Service Safari ── */}
        <figure className="w-full mb-16 md:mb-20">
          <Image
            src="/images/case-studies/pratt-institute-visitor-experience/safari-cover.avif"
            alt="Prospective students and families walking through Pratt Institute campus on a tour"
            width={1600}
            height={600}
            className="w-full h-auto"
            quality={90}
            sizes="(max-width: 768px) 100vw, 896px"
          />
        </figure>

        {/* ── Section: Service Safari ── */}
        <h3
          className="text-sm md:text-base font-semibold normal-case mb-6 md:mb-[28px]"
          style={{ color: 'rgb(var(--color-text-tertiary))' }}
        >
          Service Safari
        </h3>

        <AnimatedText variant="heading"
          text="Understanding the Current Experience"
          animationType="fadeIn"
          alwaysAnimate={false}
          delay={0}
          className="text-xl md:text-2xl font-bold text-text-primary mb-6 md:mb-8 leading-tight tracking-[-0.05em]"
        />

        <div className="space-y-6 md:space-y-8 mb-16 md:mb-20">
          <p
            className="text-base md:text-[18px] font-normal leading-normal"
            style={{ color: 'rgb(var(--color-text-color90))' }}
          >
            To understand how visitors currently experience a campus
            visit at Pratt, we conducted service safaris—experienced
            the service ourselves and mapped the journey from the
            visitor&apos;s point of view. This firsthand perspective
            allowed us to observe real behaviors, touchpoints, and pain
            points as they occurred, rather than relying solely on
            client input or our own assumptions. The following sections
            walk through each phase of the visit as a prospective
            student or parent would experience it today.
          </p>
        </div>
    </>
  )
}
