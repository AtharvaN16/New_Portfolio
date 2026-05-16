'use client'

import { useState, useRef, useEffect } from 'react'
import { m } from 'framer-motion'
import Image from 'next/image'
import { CaseStudyReadMore } from '@/components/case-study/CaseStudyReadMore'
import { AnimatedTitle } from '@/components/ui/AnimatedTitle'
import { AloCompetitiveSection } from './alo-yoga/AloCompetitiveSection'
import { AloSEOSection } from './alo-yoga/AloSEOSection'
import { AloSocialSection } from './alo-yoga/AloSocialSection'
import { AloDashboardSection } from './alo-yoga/AloDashboardSection'
import { AloRecommendationsSection } from './alo-yoga/AloRecommendationsSection'
import { CaseStudySideNav } from '@/components/case-study/CaseStudySideNav'

const aloNavItems = [
  { id: 'comp-analysis', label: 'Competitive Landscape' },
  { id: 'keyword', label: 'Keyword Strategy' },
  { id: 'seo', label: 'SEO Audit' },
  { id: 'social-media', label: 'Social Media Strategy' },
  { id: 'dashboard', label: 'Web Performance Dashboard' },
]

interface AloYogaContentProps {
  isContentRevealed: boolean
  onToggleContent: () => void
  progressBarColor?: string
}

const divider = (
  <div
    className="border-t my-24 md:my-32"
    style={{ borderColor: 'rgb(var(--color-text-color10))' }}
  />
)

export function AloYogaContent({
  isContentRevealed,
  onToggleContent,
  progressBarColor = 'rgb(var(--color-alo-progress))',
}: AloYogaContentProps) {
  const overviewRef = useRef<HTMLDivElement>(null)
  const [isPastOverview, setIsPastOverview] = useState(false)

  useEffect(() => {
    if (!isContentRevealed) return
    
    // We wait a tiny bit to ensure the DOM is updated after the height expansion animation starts
    const timeout = setTimeout(() => {
      const compAnalysis = document.getElementById('comp-analysis')
      if (!compAnalysis) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          // If the element's top is above the viewport's bottom, we've scrolled down to it or past it
          setIsPastOverview(entry.boundingClientRect.top < window.innerHeight)
        },
        { threshold: [0] }
      )

      observer.observe(compAnalysis)
      return () => observer.disconnect()
    }, 100)

    return () => clearTimeout(timeout)
  }, [isContentRevealed])

  return (
    <m.section
      className="w-full px-6 2xl:px-[140px] py-16 md:py-24 max-w-[1920px] mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <CaseStudySideNav 
        isVisible={isContentRevealed && isPastOverview} 
        navItems={aloNavItems}
        themeColor="rgb(var(--color-alo-progress))"
      />
      <div className="max-w-[1044px] mx-auto text-left">
        {/* Abstract */}
        <h3 className="text-lg md:text-[28px] font-bold text-text-primary mb-6 md:mb-[28px]">
          Abstract
        </h3>
        <div className="space-y-6 md:space-y-8">
          <p className="text-base md:text-[18px] font-normal text-text-color70 leading-relaxed">
            When you think of premium activewear, Alo sits alongside Lululemon — same price point,
            same cultural relevance, same customers. But unlike Lululemon, Alo barely shows up when
            you search for &ldquo;gym clothes&rdquo; or &ldquo;workout clothes&rdquo;, Alo also
            doesn&apos;t rank well for men&apos;s wear. That&apos;s not a product problem.
            That&apos;s a digital visibility problem.
          </p>
          <p className="text-base md:text-[18px] font-normal text-text-color70 leading-relaxed">
            We ran a full digital audit across SEO, keyword coverage, and social media analysis
            using SimilarWeb, Screaming Frog, and SEMrush, benchmarked against Lululemon, Gymshark,
            UnderArmour, and Vuori. The goal was to find where the gap was coming from and put
            together a strategy to close it.
          </p>
        </div>

        <CaseStudyReadMore
          readTime="15 min read"
          isContentRevealed={isContentRevealed}
          onToggleContent={onToggleContent}
        >
          <div>
            <div ref={overviewRef}>
              <h3
                className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]"
                style={{ color: 'rgb(var(--color-text-tertiary))' }}
              >
                Project Overview
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-0 items-center">
              <div className="flex flex-col justify-start space-y-6 md:space-y-8">
                <AnimatedTitle
                  text="A brand with cultural reach and a digital presence that doesn't match it"
                  animationType="fadeIn"
                  alwaysAnimate={false}
                  delay={0}
                  className="text-2xl md:text-[40px] font-bold text-text-primary leading-tight tracking-[-0.05em] max-w-[580px]"
                />
                <p
                  className="text-base md:text-[18px] font-normal leading-relaxed max-w-[680px]"
                  style={{ color: 'rgb(var(--color-text-color90))' }}
                >
                  Alo Yoga is a premium activewear brand that sits alongside Lululemon in
                  terms of positioning and cultural relevance. It has real celebrity following,
                  strong product recognition, and a loyal customer base. But when you search
                  for activewear on Google, Alo doesn&apos;t show up.
                </p>
                <p
                  className="text-base md:text-[18px] font-normal leading-relaxed max-w-[680px]"
                  style={{ color: 'rgb(var(--color-text-color90))' }}
                >
                  Our team set out to understand why — and what it would take to close the
                  gap between Alo&apos;s brand recognition and its digital reach. We focused
                  on three areas: SEO and keyword coverage, technical site health, and social
                  media strategy.
                </p>
              </div>

              <m.div 
                className="relative w-full max-w-[420px] mx-auto aspect-[4/5] flex items-center justify-center mt-8 lg:mt-0"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.2,
                      delayChildren: 0.2
                    }
                  }
                }}
              >
                {/* Back Image (Top Left) */}
                <m.div 
                  variants={{
                    hidden: { opacity: 0, scale: 0.95, y: 20 },
                    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
                  }}
                  className="absolute top-0 left-0 w-[65%] overflow-hidden shadow-lg transition-transform duration-500 hover:-translate-y-2 hover:shadow-2xl z-10 hover:z-30"
                >
                  <Image 
                    src="/images/case-studies/alo-yoga-digital-analytics/alo-intro-2.webp" 
                    alt="Alo Yoga Lifestyle 2" 
                    width={400}
                    height={500}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </m.div>
                {/* Front Image (Bottom Right) */}
                <m.div 
                  variants={{
                    hidden: { opacity: 0, scale: 0.95, y: 20 },
                    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
                  }}
                  className="absolute bottom-4 right-0 w-[65%] overflow-hidden shadow-2xl transition-transform duration-500 hover:-translate-y-2 hover:shadow-2xl z-20 hover:z-30"
                >
                  <Image 
                    src="/images/case-studies/alo-yoga-digital-analytics/alo-intro-1.webp" 
                    alt="Alo Yoga Lifestyle 1" 
                    width={400}
                    height={500}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </m.div>
              </m.div>
            </div>
            </div>

            {divider}

            {/* Competitive Landscape */}
            <div id="comp-analysis" className="scroll-mt-32">
              <AloCompetitiveSection />
            </div>

            {divider}

            {/* SEO Findings */}
            <AloSEOSection />

            {divider}

            {/* Social Performance */}
            <div id="social-media" className="scroll-mt-32">
              <AloSocialSection />
            </div>

            {divider}

            {/* Dashboard Deliverable */}
            <div id="dashboard" className="scroll-mt-32">
              <AloDashboardSection />
            </div>

            {divider}

            {/* Insights + Recommendations + Roadmap */}
            <AloRecommendationsSection />

            <div
              className="border-t my-16 md:my-24"
              style={{ borderColor: 'rgb(var(--color-text-color10))' }}
            />

            {/* The End */}
            <div className="py-8 md:py-12">
              <h3
                className="text-3xl md:text-[48px] font-bold uppercase tracking-[-0.02em] mb-6 md:mb-8"
                style={{ color: progressBarColor }}
              >
                The End
              </h3>
              <p className="text-xl md:text-[24px] font-bold text-text-primary">
                Thank you for reading this case study
              </p>
            </div>
          </div>
        </CaseStudyReadMore>
      </div>
    </m.section>
  )
}
