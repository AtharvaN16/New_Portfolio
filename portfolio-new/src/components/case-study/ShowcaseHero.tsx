'use client'

import { motion, type MotionValue, useTransform, useScroll } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import type { CaseStudy } from '@/lib/data/case-studies'
import { AnimatedTitle } from '@/components/ui/AnimatedTitle'

interface ShowcaseHeroProps {
  caseStudy: CaseStudy
  containerRef: React.RefObject<HTMLDivElement>
}

export function ShowcaseHero({ caseStudy, containerRef }: ShowcaseHeroProps) {
  const heroSectionRef = useRef<HTMLElement>(null)

  // Parallax: image moves UP as user scrolls through the 200dvh hero.
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroSectionRef,
    container: containerRef,
    offset: ['start start', 'end start'],
  })
  
  const imageParallaxY = useTransform(heroProgress, [0, 1], ['0%', '-20%'])

  return (
    <section
      ref={heroSectionRef}
      className="relative -mt-[4.625rem] md:-mt-[4.875rem]"
      style={{ height: '200dvh' }}
    >
      <div className="sticky top-0 h-dvh overflow-hidden">
        {/* Parallax image — extended vertically for travel room */}
        {caseStudy.imageUrl && (
          <motion.div
            className="absolute inset-x-0 -top-[15%] -bottom-[15%]"
            style={{ y: imageParallaxY }}
          >
            <Image
              src={caseStudy.imageUrl}
              alt={`${caseStudy.title} hero`}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </motion.div>
        )}

        <div className="absolute inset-0 bg-black/30" aria-hidden />

        {/* Text layout — identical structure to CaseStudyDetail's main section */}
        <div className="relative z-10 h-full flex flex-col px-6 2xl:px-[140px] pt-[4.625rem] md:pt-[4.875rem] pb-3 md:pb-[1.5rem] max-w-[1920px] mx-auto">
          <AnimatedTitle
            text={caseStudy.title}
            animationType="fadeIn"
            alwaysAnimate
            delay={0.4}
            className="text-[2rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 md:mb-8 leading-tight tracking-[-0.05em] max-w-[1400px]"
          />

          <motion.div
            className="flex flex-col md:flex-row md:items-start md:gap-0 mt-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Description */}
            <div className="max-w-full sm:max-w-[25rem] md:max-w-[28.75rem] text-left">
              <p className="text-base md:text-lg font-medium text-white/80 leading-relaxed">
                {caseStudy.fullDescription || caseStudy.description}
              </p>
            </div>

            <div className="hidden md:block md:flex-1 md:min-w-0" />

            {/* Desktop metadata */}
            {(caseStudy.team || caseStudy.timeline) && (
              <div className="hidden md:flex flex-col md:flex-row md:justify-between md:items-start md:gap-[3.5rem] mt-10 md:mt-0">
                {caseStudy.team && caseStudy.team.length > 0 && (
                  <div className="md:min-w-[12.5rem] md:w-[12.5rem] text-left">
                    <h2 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-4">
                      Team
                    </h2>
                    <ul className="space-y-1 md:space-y-2 [&:has(a:hover)_a]:opacity-40 [&:has(a:hover)_a:hover]:opacity-100">
                      {caseStudy.team.map((member, index) => (
                        <li key={index}>
                          <a
                            href="#"
                            className="group/link relative inline-block text-sm md:text-base font-medium text-white/70 transition-opacity duration-200"
                          >
                            {member}
                            <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-current transition-all duration-300 ease-out group-hover/link:w-full" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {caseStudy.timeline && (
                  <div className="text-left md:ml-auto">
                    <h2 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-4">
                      Timeline
                    </h2>
                    <p className="text-sm md:text-base font-medium text-white/70 whitespace-nowrap">
                      {caseStudy.timeline}
                    </p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
