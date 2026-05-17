'use client'

import Image from 'next/image'

const CONCLUSION_IMAGES = {
  portrait: {
    src: '/images/case-studies/aquitania-design-system/conclusion-portrait.webp',
    alt: 'Aquitania design system conclusion portrait image',
    width: 900,
    height: 1600,
  },
  landscape: {
    src: '/images/case-studies/aquitania-design-system/conclusion-landscape.webp',
    alt: 'Aquitania design system conclusion landscape image',
    width: 653,
    height: 444,
  },
} as const

export function AquitaniaConclusionSection() {
  return (
    <section
      id="aquitania-conclusion"
      data-section="aquitania-conclusion"
      className="scroll-mt-32 space-y-16 md:space-y-24"
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] md:gap-12 lg:gap-16">
        <h3 className="text-xl md:text-[28px] font-bold text-text-primary leading-snug">
          Conclusion
        </h3>
        <div className="space-y-6 text-base md:text-[18px] font-normal text-text-color70 leading-relaxed">
          <p>
            Aquitania transformed Cunard&apos;s fragmented digital experience into a more
            cohesive, scalable, and premium design ecosystem. Through shared foundations,
            semantic tokens, reusable components, and documentation, the system improved
            consistency, accessibility, and collaboration while better reflecting Cunard&apos;s
            luxury brand identity.
          </p>
          <p>
            One of the biggest lessons from the process was realizing that design systems are
            culture change disguised as a UI kit. Beyond components and tokens, Aquitania
            encouraged teams to align around shared principles, workflows, and standards,
            creating a more intentional and collaborative way of designing and building
            products.
          </p>
        </div>
      </div>

      <div className="flex w-full items-end justify-between gap-8 md:gap-12 lg:gap-16">
        <div className="h-[300px] shrink-0 md:h-[460px] lg:h-[500px]">
          <Image
            src={CONCLUSION_IMAGES.portrait.src}
            alt={CONCLUSION_IMAGES.portrait.alt}
            width={CONCLUSION_IMAGES.portrait.width}
            height={CONCLUSION_IMAGES.portrait.height}
            className="h-full w-auto"
            quality={90}
            sizes="(max-width: 768px) 169px, 281px"
          />
        </div>
        <div className="relative h-[300px] min-w-0 flex-1 md:h-[460px] lg:h-[500px]">
          <Image
            src={CONCLUSION_IMAGES.landscape.src}
            alt={CONCLUSION_IMAGES.landscape.alt}
            fill
            className="object-cover"
            quality={90}
            sizes="(max-width: 768px) 58vw, 720px"
          />
        </div>
      </div>

      <div className="max-w-[760px] space-y-6">
        <h3 className="text-xl md:text-[28px] font-bold text-text-primary leading-snug">
          Key Learnings
        </h3>
        <div className="space-y-6 text-base md:text-[18px] font-normal text-text-color70 leading-relaxed">
          <p>
            This project reinforced how important documentation is in making a design system
            usable, scalable, and easy to adopt across teams. I also learned the importance of
            properly scoping a system early on and creating structures that can scale over time.
          </p>
          <p>
            Working on Aquitania deepened my understanding of Figma variables, semantic tokens,
            and how tokens translate into development workflows and code. It also gave me
            valuable insight into file organization, developer handoff, and designing systems in
            a way that is intuitive not just for designers, but for engineers as well.
          </p>
        </div>
      </div>
    </section>
  )
}
