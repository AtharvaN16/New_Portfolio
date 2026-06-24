'use client'

import { AnimatedText } from '@/components/ui/AnimatedText'

export function GutenbergProjectOverviewSection() {
  return (
    <>
        {/* Project Overview Section */}
        <h3
          className="text-sm md:text-base font-semibold normal-case mb-6 md:mb-[28px]"
          style={{ color: 'rgb(var(--color-text-tertiary))' }}
        >
          Project Overview
        </h3>

        <AnimatedText
          variant="heading"
          as="h3"
          text="Understanding First-Time User Experience in a Legacy CMS"
          animationType="fadeIn"
          alwaysAnimate={false}
          delay={0}
          className="text-xl md:text-2xl font-bold text-text-primary mb-6 md:mb-8 leading-tight tracking-[-0.05em]"
        />

        <div className="space-y-6 md:space-y-8 mb-12 md:mb-16">
          <p
            className="text-base md:text-[18px] font-normal leading-normal"
            style={{ color: 'rgb(var(--color-text-color90))' }}
          >
            Gutenberg Technologies is an e-learning course builder tool
            for creating text-based learning materials like textbooks and
            training resources, primarily used by publishers. Their course
            management system (CMS) is outdated and difficult for new
            users.
          </p>
          <p
            className="text-base md:text-[18px] font-normal leading-normal"
            style={{ color: 'rgb(var(--color-text-color90))' }}
          >
            The client wanted to improve the usability of the CMS, make
            the product more intuitive, and integrate generative AI to
            simplify resource creation.
          </p>
        </div>

        {/* Divider */}
        <div
          className="border-t my-24 md:my-32"
          style={{ borderColor: 'rgb(var(--color-text-color10))' }}
        />
    </>
  )
}
