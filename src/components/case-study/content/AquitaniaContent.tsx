'use client'

import Image from 'next/image'
import { m } from 'framer-motion'
import { useEffect, useState } from 'react'
import { AnimatedText } from '@/components/ui/AnimatedText'
import { CaseStudySideNav } from '@/components/case-study/CaseStudySideNav'
import { CunardHandwrittenProblems } from '@/components/case-study/content/CunardHandwrittenProblems'
import { CaseStudyVideo } from '@/components/case-study/CaseStudyVideo'
import { CunardShipGallery } from '@/components/case-study/content/CunardShipGallery'
import { AquitaniaPrimitivesShowcase } from '@/components/case-study/content/AquitaniaPrimitivesShowcase'
import { AquitaniaComponentsSection } from '@/components/case-study/content/AquitaniaComponentsSection'
import { AquitaniaInActionSection } from '@/components/case-study/content/AquitaniaInActionSection'
import { AquitaniaBenefitsSection } from '@/components/case-study/content/AquitaniaBenefitsSection'
import { AquitaniaConclusionSection } from '@/components/case-study/content/AquitaniaConclusionSection'

const CUNARD_RED = '#9B2335'
const AQUITANIA_DOCS_URL = 'https://zeroheight.com/7069a3a57'
const AQUITANIA_UI_KIT_URL =
  'https://www.figma.com/design/siCTskRKCiK0a2PFdsGLJ7/Aquitania-UI-Kit--Final-?node-id=2140-390&t=pSgXqRlkN6Pnj5HC-1'

const aquitaniaNavItems = [
  { id: 'aquitania-intro', label: 'Intro' },
  { id: 'aquitania-aquitania', label: 'Aquitania' },
  { id: 'aquitania-process', label: 'Our Process' },
  { id: 'aquitania-showcase', label: 'Showcase' },
  { id: 'aquitania-conclusion', label: 'Conclusion' },
]

export function AquitaniaContent() {
  const [isPastIntro, setIsPastIntro] = useState(false)

  useEffect(() => {
    let observer: IntersectionObserver | null = null
    const timeout = window.setTimeout(() => {
      const aquitaniaSection = document.getElementById('aquitania-aquitania')
      if (!aquitaniaSection) return

      observer = new IntersectionObserver(
        ([entry]) => {
          setIsPastIntro(entry.boundingClientRect.top < window.innerHeight)
        },
        { threshold: [0] }
      )
      observer.observe(aquitaniaSection)
    }, 100)

    return () => {
      window.clearTimeout(timeout)
      observer?.disconnect()
    }
  }, [])

  return (
    <m.section
      data-section="aquitania-case-study-root"
      className="w-full px-6 2xl:px-[140px] py-16 md:py-24 max-w-[1920px] mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <CaseStudySideNav
        isVisible={isPastIntro}
        navItems={aquitaniaNavItems}
        themeColor={CUNARD_RED}
      />
      <div
        data-section="aquitania-content-column"
        className="cs-content text-left"
      >

        {/* Note */}
        <p
          className="text-sm font-medium text-text-color70 mb-16 md:mb-24"
          style={{ borderLeft: `3px solid ${CUNARD_RED}`, paddingLeft: '12px' }}
        >
          NOTE: This is a concept project.
        </p>

        <div
          data-section="aquitania-read-more-inner"
          className="space-y-24 md:space-y-32"
        >

            {/* Big animated headline */}
            <div
              id="aquitania-intro"
              data-section="aquitania-hero-headline"
              className="scroll-mt-32"
            >
              <AnimatedText
                variant="heading"
                as="h2"
                text="Redefining Cunard's Digital Presence for a consistent and premium experience with a new Design System"
                animationType="fadeIn"
                maxWidth="wide"
                alwaysAnimate
                delay={0.1}
                stagger={0.04}
                duration={0.3}
                className="text-[1.75rem] sm:text-2xl md:text-2xl font-bold text-text-primary leading-tight tracking-[-0.05em] max-w-[800px]"
              />
            </div>

            {/* What is Cunard? */}
            <section data-section="aquitania-what-is-cunard">
              <h3 className="text-base md:text-2xl font-bold text-text-primary mb-6 md:mb-8">
                What is Cunard?
              </h3>
              <p className="text-base md:text-[18px] font-normal text-text-body leading-normal max-w-2xl">
                With a legacy spanning over 185 years, Cunard is a luxury British cruise line known for its
                iconic ocean liners, heritage, and premium travel experiences. The company defined luxury
                transatlantic ocean travel in the early 1900s through legendary vessels like the Mauretania,
                Aquitania, Lusitania, and Carpathia (famed for rescuing Titanic survivors), followed later by
                the immortal RMS Queen Mary. Today, Cunard competes with high-end brands such as Silversea
                Cruises, Regent Seven Seas Cruises, and Seabourn Cruise Line.
              </p>
              <CunardShipGallery />
            </section>

            {/* Why does Cunard need a design system? — two-column */}
            <section
              data-section="aquitania-why-design-system"
              className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start"
            >
              <h3 className="text-base md:text-2xl font-bold text-text-primary leading-snug">
                Why does Cunard need a design system?
              </h3>
              <p className="text-base md:text-[18px] font-normal text-text-body leading-normal max-w-2xl">
                As a premium cruise brand competing in the luxury travel market, Cunard&apos;s digital
                experience needed to better reflect the elegance and sophistication of its brand. Outdated
                visuals, inconsistent UI patterns, and accessibility gaps created a disconnect between the
                premium onboard experience and the digital journey. In an industry where first impressions
                determine whether you keep or lose customers, it was necessary for Cunard to redefine its
                digital presence.
              </p>
            </section>

            <CunardHandwrittenProblems>
              <figure
                data-section="aquitania-current-digital-experience"
                className="w-full"
              >
                <Image
                  src="/images/case-studies/aquitania-design-system/current-digital-experience.avif"
                  alt="Cunard's current digital experience across desktop and mobile touchpoints"
                  width={1220}
                  height={1617}
                  className="h-auto w-full"
                  quality={90}
                  sizes="(max-width: 768px) 100vw, 896px"
                />
              </figure>
            </CunardHandwrittenProblems>

            <section
              data-section="aquitania-premium-callout"
              className="pt-24 md:pt-32 pb-12 md:pb-16"
            >
              <AnimatedText
                variant="quote"
                maxWidth="wide"
                className="text-xl sm:text-2xl md:text-2xl font-bold leading-tight tracking-[-0.04em] text-text-primary"
                segments={[
                  { text: 'The Current Cunard Digital Experience' },
                  { text: 'does not feel premium.', color: CUNARD_RED },
                ]}
              />
            </section>

            <div
              className="border-t my-24 md:my-32"
              style={{ borderColor: 'rgb(var(--color-text-color10))' }}
            />

            {/* Solution */}
            <section
              id="aquitania-aquitania"
              data-section="aquitania-solution"
              className="scroll-mt-32"
            >
              <p className="text-sm md:text-base font-semibold normal-case tracking-widest text-text-color70 mb-4">
                Solution
              </p>
              <h3 className="text-lg md:text-2xl font-bold text-text-primary mb-6 md:mb-8 leading-snug">
                Introducing Aquitania
              </h3>
              <p className="text-base md:text-[18px] font-normal text-text-body leading-normal mb-10 md:mb-12 max-w-2xl">
                Inspired by Cunard&apos;s heritage of sophistication and intentionality, Aquitania was designed
                to elevate the brand&apos;s digital experience through thoughtful, consistent design. It includes
                the foundations, components, patterns, and documentation needed to create premium product
                experiences across teams.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                <figure className="group w-full">
                  <a
                    href={AQUITANIA_DOCS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    <Image
                      src="/images/case-studies/aquitania-design-system/documentation-visible-equal.avif"
                      alt="Aquitania design system documentation overview"
                      width={2880}
                      height={1558}
                      className="h-auto w-full transition-transform duration-500 group-hover:scale-105"
                      quality={90}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </a>
                  <figcaption className="mt-4">
                    <a
                      href={AQUITANIA_DOCS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[20px] font-semibold text-text-primary underline underline-offset-4 transition-opacity hover:opacity-80"
                    >
                      Aquitania Documentation
                    </a>
                  </figcaption>
                </figure>

                <figure className="group w-full">
                  <a
                    href={AQUITANIA_UI_KIT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    <Image
                      src="/images/case-studies/aquitania-design-system/ui-kit-cover-visible-equal.avif"
                      alt="Aquitania UI kit cover preview"
                      width={2880}
                      height={1558}
                      className="h-auto w-full transition-transform duration-500 group-hover:scale-105"
                      quality={90}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </a>
                  <figcaption className="mt-4">
                    <a
                      href={AQUITANIA_UI_KIT_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[20px] font-semibold text-text-primary underline underline-offset-4 transition-opacity hover:opacity-80"
                    >
                      Aquitania UI Kit
                    </a>
                  </figcaption>
                </figure>
              </div>
            </section>

            <div
              className="border-t my-24 md:my-32"
              style={{ borderColor: 'rgb(var(--color-text-color10))' }}
            />

            {/* Four Principles */}
            <section data-section="aquitania-principles">
              <p className="text-sm md:text-base font-semibold normal-case tracking-widest text-text-color70 mb-4">
                Principles
              </p>
              <h3 className="text-lg md:text-2xl font-bold text-text-primary mb-8 md:mb-10 leading-snug">
                Aquitania follows four design principles
              </h3>
              <p className="text-base md:text-[18px] font-normal text-text-body leading-normal mb-10 md:mb-12 max-w-2xl">
                We established four core principles to guide the Aquitania design system and ensure every
                experience reflects Cunard’s premium brand identity.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                {[
                  {
                    num: '01',
                    title: 'Accessible',
                    desc: 'Design experiences that are inclusive, intuitive, and usable for all users.',
                  },
                  {
                    num: '02',
                    title: 'Consistent',
                    desc: 'Create a cohesive experience through unified patterns, components, and interactions.',
                  },
                  {
                    num: '03',
                    title: 'Luxurious',
                    desc: 'Reflect Cunard’s premium heritage through refined visuals and thoughtful details.',
                  },
                  {
                    num: '04',
                    title: 'Discoverable',
                    desc: 'Ensure information and resources are easy to find and understand.',
                  },
                ].map((item) => (
                  <div key={item.num} className="space-y-2">
                    <p
                      className="text-2xl md:text-insight-num font-bold text-text-primary opacity-50"
                    >
                      {item.num}
                    </p>
                    <h4 className="text-lg md:text-xl font-bold text-text-primary">{item.title}</h4>
                    <p className="text-sm md:text-base font-normal text-text-body leading-normal max-w-[320px]">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <div
              className="border-t my-24 md:my-32"
              style={{ borderColor: 'rgb(var(--color-text-color10))' }}
            />

            {/* Deconstruction */}
            <section
              id="aquitania-process"
              data-section="aquitania-deconstruction"
              className="scroll-mt-32"
            >
              <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-10 md:mb-14 leading-tight tracking-[-0.04em]">
                How we built Aquitania
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
                <div>
                  <p className="text-sm md:text-base font-semibold normal-case tracking-widest text-text-color70 mb-4">
                    01 - DECONSTRUCTION
                  </p>
                  <h4 className="text-lg md:text-xl font-bold text-text-primary leading-snug">
                    We first created a UI inventory of the existing Cunard website.
                  </h4>
                </div>
                <p className="text-base md:text-[18px] font-normal text-text-body leading-normal md:pt-7">
                  We started by taking screenshots of every unique design element on the Cunard&apos;s
                  website. These elements were pasted into a Figma board and categorized into atoms,
                  molecules, organisms, based on the Atomic Design Framework.
                </p>
              </div>

              <div
                className="mt-10 md:mt-14 w-full px-10 py-10 md:px-16 md:py-14"
                style={{
                  background:
                    'var(--gradient-gold, linear-gradient(109deg, #D3CDC0 14.47%, #ACA084 45.1%, #998965 70.02%, #857246 88.54%))',
                }}
              >
                <div
                  className="rounded-none"
                  style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.35), 0 4px 16px rgba(0,0,0,0.2)' }}
                >
                  <CaseStudyVideo
                    src="/videos/case-studies/aquitania-design-system/deconstruction.mp4"
                    alt="UI inventory deconstruction of the existing Cunard website"
                    className="rounded-none"
                  />
                </div>
              </div>

              <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
                <div>
                  <p className="text-sm md:text-base font-semibold normal-case tracking-widest text-text-color70 mb-4">
                    02 - FINDINGS
                  </p>
                  <h4 className="text-lg md:text-xl font-bold text-text-primary leading-snug">
                    We grouped recurring patterns from the inventory into actionable insights.
                  </h4>
                </div>
                <p className="text-base md:text-[18px] font-normal text-text-body leading-normal md:pt-7">
                  The deconstruction process revealed significant inconsistencies across the existing
                  digital experience. Multiple typography styles, buttons, icon treatments, and
                  variations in components used across products. Components such as tabs, cards, and
                  email sign-up existed in several different forms, creating fragmentation and
                  inconsistency.
                </p>
              </div>

              <div
                className="mt-10 md:mt-14 w-full px-10 py-10 md:px-16 md:py-14"
                style={{
                  background:
                    'var(--gradient-gold, linear-gradient(109deg, #D3CDC0 14.47%, #ACA084 45.1%, #998965 70.02%, #857246 88.54%))',
                }}
              >
                <div
                  className="rounded-none"
                  style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.35), 0 4px 16px rgba(0,0,0,0.2)' }}
                >
                  <CaseStudyVideo
                    src="/videos/case-studies/aquitania-design-system/deconstruction-insights.mp4"
                    alt="Findings from the Cunard UI inventory deconstruction"
                    className="rounded-none"
                  />
                </div>
              </div>

              <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
                <div>
                  <p className="text-sm md:text-base font-semibold normal-case tracking-widest text-text-color70 mb-4">
                    03 - DEFINING THE PRIMITIVES
                  </p>
                  <h4 className="text-lg md:text-xl font-bold text-text-primary leading-snug">
                    We defined the core design primitives that power the system.
                  </h4>
                </div>
                <p className="text-base md:text-[18px] font-normal text-text-body leading-normal md:pt-7">
                  To create a scalable and consistent foundation, the next step was defining the core
                  design primitives that power the system. This included establishing typography, color,
                  spacing, grids, elevation, and iconography standards that could be reused across every
                  component and experience.
                </p>
              </div>

              <AquitaniaPrimitivesShowcase />

              <AquitaniaComponentsSection />
            </section>

            <div
              className="border-t my-24 md:my-32"
              style={{ borderColor: 'rgb(var(--color-text-color10))' }}
            />

            <AquitaniaInActionSection />

            <div
              className="border-t my-24 md:my-32"
              style={{ borderColor: 'rgb(var(--color-text-color10))' }}
            />

            <AquitaniaBenefitsSection />

            <div
              className="border-t my-24 md:my-32"
              style={{ borderColor: 'rgb(var(--color-text-color10))' }}
            />

            <AquitaniaConclusionSection />

        </div>
      </div>
    </m.section>
  )
}
