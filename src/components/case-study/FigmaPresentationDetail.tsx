'use client'

import { m } from 'framer-motion'
import { useRef, useState } from 'react'
import Image from 'next/image'
import type { CaseStudy } from '@/lib/data/case-studies'
import { AnimatedTitle } from '@/components/ui/AnimatedTitle'
import {
  useFigmaEmbedLoad,
  useFigmaPresentationClose,
  useInterceptHistoryBackToClose,
} from '@/hooks/use-figma-presentation-overlay'
import { CaseStudyLayout } from '@/components/case-study/CaseStudyLayout'

interface FigmaPresentationDetailProps {
  caseStudy: CaseStudy
  onClose?: () => void
}

/**
 * FigmaPresentationDetail
 * 
 * Variant for embedding Figma decks.
 * Includes specialized iframe loading and history interception.
 */
export function FigmaPresentationDetail({
  caseStudy,
  onClose,
}: FigmaPresentationDetailProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [iframeLoaded, setIframeLoaded] = useState(false)

  useFigmaEmbedLoad(iframeRef, caseStudy.figmaEmbedUrl)

  const closePresentation = useFigmaPresentationClose(onClose)

  useInterceptHistoryBackToClose(closePresentation)

  const hasAbstract = !!(caseStudy.fullDescription || caseStudy.overviewBullets)

  const heroSlot = (
    <main className="px-6 2xl:px-[140px] pt-4 pb-3 md:pb-[1.5rem] max-w-[1920px] mx-auto min-h-[calc(100dvh-4.625rem)] md:min-h-[calc(100dvh-4.875rem)] flex flex-col relative">
      <AnimatedTitle
        text={caseStudy.title}
        animationType="fadeIn"
        alwaysAnimate
        delay={0.8}
        className="text-[2rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary mb-6 md:mb-8 leading-tight tracking-[-0.05em] max-w-[1400px]"
      />

      <m.div
        className="flex flex-col md:flex-row md:items-start md:gap-0 mt-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="max-w-full sm:max-w-[25rem] md:max-w-[28.75rem] text-left">
          <p className="text-base md:text-lg text-text-secondary leading-relaxed">
            {caseStudy.description}
          </p>
        </div>

        <div className="hidden md:block md:flex-1 md:min-w-0" />

        {/* Desktop Metadata */}
        {(caseStudy.team || caseStudy.timeline) && (
          <div className="hidden md:flex flex-col md:flex-row md:justify-between md:items-start md:gap-[3.5rem] mt-10 md:mt-0">
            {caseStudy.team && caseStudy.team.length > 0 && (
              <div className="md:min-w-[12.5rem] md:w-[12.5rem] text-left">
                <h2 className="text-base md:text-lg font-medium text-text-primary mb-2 md:mb-4">
                  Team
                </h2>
                <ul className="space-y-1 md:space-y-2 [&:has(a:hover)_a]:opacity-40 [&:has(a:hover)_a:hover]:opacity-100">
                  {caseStudy.team.map((member, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className="group/link relative inline-block text-sm md:text-base font-normal text-text-secondary transition-opacity duration-200"
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
                <h2 className="text-base md:text-lg font-medium text-text-primary mb-2 md:mb-4">
                  Timeline
                </h2>
                <p className="text-sm md:text-base font-normal text-text-secondary whitespace-nowrap">
                  {caseStudy.timeline}
                </p>
              </div>
            )}
          </div>
        )}
      </m.div>
    </main>
  )

  const abstractSlot = hasAbstract && (
    <m.section
      className="w-full px-6 2xl:px-[140px] py-16 md:py-24 max-w-[1920px] mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      aria-label="Abstract"
    >
      <div className="max-w-[1044px] mx-auto text-left">
        <h3 className="text-lg md:text-[28px] font-bold text-text-primary mb-6 md:mb-[28px]">
          Abstract
        </h3>

        {caseStudy.fullDescription && (
          <p className="text-base md:text-[18px] font-normal text-text-color90 leading-relaxed">
            {caseStudy.fullDescription}
          </p>
        )}

        {caseStudy.overviewBullets && (
          <div className="mt-8 md:mt-10">
            <p className="text-base md:text-[18px] font-semibold text-text-primary mb-4 md:mb-5">
              {caseStudy.overviewBullets.heading}:
            </p>
            <ul className="space-y-3 md:space-y-4">
              {caseStudy.overviewBullets.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                <span
                  className="mt-[0.45em] shrink-0 w-[6px] h-[6px] rounded-full"
                  style={{ backgroundColor: 'rgb(var(--color-text-color90))' }}
                  aria-hidden
                />
                  <span className="text-base md:text-[18px] font-normal text-text-color90 leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </m.section>
  )

  return (
    <CaseStudyLayout 
      caseStudy={caseStudy} 
      onClose={closePresentation}
      heroSlot={heroSlot}
      abstractSlot={abstractSlot}
    >
      {/* Figma Image Section (Standard for presentations) */}
      {caseStudy.imageUrl && (
        <m.section
          className="w-full relative z-10 overflow-hidden"
          style={{ backgroundColor: 'rgb(var(--color-footer-bg))' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          aria-label={`${caseStudy.title} hero image`}
        >
          <div className="relative w-full aspect-[16/9] md:aspect-auto md:min-h-screen">
            <Image
              src={caseStudy.imageUrl}
              alt={`${caseStudy.title} — hero image`}
              fill
              className="object-cover [filter:contrast(1.05)]"
              sizes="100vw"
              priority
              quality={95}
            />
          </div>
        </m.section>
      )}

      {/* Figma Iframe Section */}
      <m.section
        className="w-full"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.9 }}
        aria-label="Figma presentation"
      >
        {caseStudy.figmaEmbedUrl ? (
          <div
            className="relative w-full"
            style={{ height: 'calc(100dvh - 80px)' }}
          >
            {!iframeLoaded && (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ backgroundColor: 'rgb(var(--color-footer-bg))' }}
              >
                <span className="text-sm text-text-secondary animate-pulse">
                  Loading presentation…
                </span>
              </div>
            )}
            <iframe
              ref={iframeRef}
              src="about:blank"
              title={`${caseStudy.title} — Figma Presentation`}
              className="w-full h-full border-0"
              allowFullScreen
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals allow-pointer-lock allow-presentation allow-fullscreen allow-downloads"
              onLoad={() => setIframeLoaded(true)}
            />
          </div>
        ) : (
          <div
            className="w-full flex flex-col items-center justify-center"
            style={{
              height: 'calc(100dvh - 80px)',
              backgroundColor: 'rgb(var(--color-footer-bg))',
            }}
          >
            <p
              className="text-4xl md:text-6xl font-bold tracking-widest uppercase"
              style={{ color: 'rgba(var(--color-foreground) / 0.15)' }}
            >
              Presentation
            </p>
            <p className="text-sm text-text-secondary mt-4">
              Figma embed coming soon
            </p>
          </div>
        )}
      </m.section>
    </CaseStudyLayout>
  )
}
