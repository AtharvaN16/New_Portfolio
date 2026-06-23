'use client'

import Image from 'next/image'
import { CaseStudyVideo } from '@/components/case-study/CaseStudyVideo'

const GOLD_VIDEO_WRAPPER_STYLE = {
  background:
    'var(--gradient-gold, linear-gradient(109deg, #D3CDC0 14.47%, #ACA084 45.1%, #998965 70.02%, #857246 88.54%))',
} as const

const GOLD_VIDEO_SHADOW_STYLE = {
  boxShadow: '0 20px 60px rgba(0,0,0,0.35), 0 4px 16px rgba(0,0,0,0.2)',
} as const

const BUTTONS_IMAGE = {
  src: '/images/case-studies/aquitania-design-system/buttons.avif',
  alt: 'Aquitania button component variants showing states, sizes, and focus styles',
  width: 1484,
  height: 1497,
} as const

const CARDS_STAND_IMAGE = {
  src: '/images/case-studies/aquitania-design-system/cards-stand.avif',
  alt: 'Aquitania standardized card component variants across product layouts',
  width: 800,
  height: 1043,
} as const

const USER_TESTING_IMAGE = {
  src: '/images/case-studies/aquitania-design-system/user-testing.avif',
  alt: 'Designers reviewing and testing the Aquitania UI kit in Figma',
  width: 1600,
  height: 1200,
} as const

export function AquitaniaComponentsSection() {
  return (
    <div data-section="aquitania-creating-components">
      <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
        <div>
          <p className="text-[12px] md:text-[14px] font-semibold uppercase tracking-widest text-text-color70 mb-4">
            04 - CREATING COMPONENTS
          </p>
          <h4 className="text-xl md:text-2xl font-bold text-text-primary leading-snug">
            Scaling Basic Elements into Flexible, Interactive Components
          </h4>
        </div>
        <p className="text-base md:text-[18px] font-normal text-text-body leading-relaxed md:pt-7">
          With the foundational primitives established, the next step was building a scalable
          library of reusable components. Common UI patterns such as buttons, cards, navigation,
          forms, tabs, and modals were standardized to create consistency across products and reduce
          duplication. Each component was designed with accessibility, flexibility, and ease of use
          in mind.
        </p>
      </div>

      <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start md:items-stretch">
        <div className="w-full">
          <Image
            src={BUTTONS_IMAGE.src}
            alt={BUTTONS_IMAGE.alt}
            width={BUTTONS_IMAGE.width}
            height={BUTTONS_IMAGE.height}
            className="h-auto w-full"
            quality={90}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <p className="text-base md:text-[18px] font-normal text-text-body leading-relaxed md:self-end">
          Buttons were designed with accessibility and usability in mind, with improved color
          contrast, consistent touch target sizes, and clear focus states to support intuitive and
          inclusive interactions.
        </p>
      </div>

      <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start md:items-stretch">
        <p className="text-base md:text-[18px] font-normal text-text-body leading-relaxed md:self-end">
          Components like Cards, tabs, inputs were standardized to create a more consistent and
          scalable experience across products, reducing unnecessary variations while maintaining
          flexibility for different use cases.
        </p>
        <div className="w-full">
          <Image
            src={CARDS_STAND_IMAGE.src}
            alt={CARDS_STAND_IMAGE.alt}
            width={CARDS_STAND_IMAGE.width}
            height={CARDS_STAND_IMAGE.height}
            className="h-auto w-full"
            quality={90}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      <div
        data-section="aquitania-built-for-editing"
        className="mt-16 md:mt-24 space-y-8 md:space-y-10"
      >
        <div className="max-w-[750px] space-y-4 md:space-y-5">
          <h4 className="text-[20px] font-bold text-text-primary leading-snug">
            Built for easy editing
          </h4>
          <p className="text-base md:text-[18px] font-normal text-text-body leading-relaxed">
            All components were built for easy customization using variables in Figma, enabling
            faster updates and scalable theming. Properties were structured using semantic tokens to
            ensure consistency, flexibility, and easier maintenance across the system.
          </p>
        </div>
        <div
          className="w-full px-10 py-10 md:px-16 md:py-14"
          style={GOLD_VIDEO_WRAPPER_STYLE}
        >
          <div className="rounded-none" style={GOLD_VIDEO_SHADOW_STYLE}>
            <CaseStudyVideo
              src="/videos/case-studies/aquitania-design-system/card-edit-voyage.mp4"
              alt="Editing Aquitania card components with Figma variables and semantic tokens"
              className="rounded-none"
            />
          </div>
        </div>
      </div>

      <div
        data-section="aquitania-user-testing"
        className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start"
      >
        <div className="space-y-4 md:space-y-5">
          <p className="text-[12px] md:text-[14px] font-semibold uppercase tracking-widest text-text-color70">
            05 - USER TESTING & ITERATION
          </p>
          <h4 className="text-xl md:text-2xl font-bold text-text-primary leading-snug">
            User testing and feedback helped refine the system through improved file navigation,
            clearer naming, and additional content
          </h4>
          <p className="text-base md:text-[18px] font-normal text-text-body leading-relaxed">
            The UI kit was tested with designers to evaluate usability, clarity, and ease of adoption.
            Based on feedback, we introduced complete pre-built sections, improved Figma file
            organization and navigation, added additional semantic tokens, and refined naming
            conventions across components and elements to make the system more intuitive and scalable.
          </p>
        </div>
        <div className="w-full max-w-[420px] md:ml-auto">
          <Image
            src={USER_TESTING_IMAGE.src}
            alt={USER_TESTING_IMAGE.alt}
            width={USER_TESTING_IMAGE.width}
            height={USER_TESTING_IMAGE.height}
            className="h-auto w-full"
            quality={90}
            sizes="(max-width: 768px) 100vw, 420px"
          />
        </div>
      </div>
    </div>
  )
}
