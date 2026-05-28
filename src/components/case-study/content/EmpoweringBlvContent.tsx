'use client'

import { m, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { AccessibilityModal } from '@/components/layout/AccessibilityModal'
import { CaseStudyReadMore } from '@/components/case-study/CaseStudyReadMore'
import { cn } from '@/lib/utils/cn'
import { MatisseSimulation } from './blv-museum/MatisseSimulation'
import { MuseumAnalysis } from './blv-museum/MuseumAnalysis'
import { SolutionParadigm } from './blv-museum/SolutionParadigm'

interface EmpoweringBlvContentProps {
  isContentRevealed: boolean
  onToggleContent: () => void
}

export function EmpoweringBlvContent({
  isContentRevealed,
  onToggleContent,
}: EmpoweringBlvContentProps) {
  const scrollContainerRef = useRef<HTMLElement | null>(null)
  const [isReady, setIsReady] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [toastState, setToastState] = useState<'hidden' | 'visible' | 'dismissed'>('hidden')

  useEffect(() => {
    scrollContainerRef.current = document.getElementById('case-study-scroll-container')
    setIsReady(true)
    const timer = setTimeout(() => setToastState('visible'), 2500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (toastState === 'visible') {
      const autoCollapseTimer = setTimeout(() => setToastState('dismissed'), 7000)
      return () => clearTimeout(autoCollapseTimer)
    }
  }, [toastState])

  return (
    <>
      <m.section
        className="w-full px-6 2xl:px-[140px] pt-32 md:pt-56 pb-16 md:pb-24 max-w-[1920px] mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="max-w-[1044px] mx-auto text-left">
          {/* Abstract Section */}
          <h3 className="text-lg md:text-case-heading font-bold text-text-primary mb-6 md:mb-[28px]">
            Abstract
          </h3>
          <div className="space-y-6 md:space-y-8">
            <p className="text-base md:text-[18px] font-normal text-text-body leading-relaxed">
              This project focuses on the &quot;interpretive authority&quot; in art galleries. While museums provide audio descriptions, these are often fixed, curator-authored accounts that collapse the variability of an artwork into a single narrative. We introduce &quot;negotiable interpretation&quot; as a design paradigm to redistribute that authority back to the visitor.
            </p>
            <p className="text-base md:text-[18px] font-normal text-text-body leading-relaxed">
              Through a multi-phase research process including a literature survey, a corpus analysis of museum audio descriptions, and an interactive simulation, we identified the structural mechanisms that &quot;fix&quot; meaning for visitors before they even arrive.
            </p>
          </div>

          <CaseStudyReadMore
            readTime="12 min read"
            isContentRevealed={isContentRevealed}
            onToggleContent={onToggleContent}
          >
            <div className="space-y-32 md:space-y-48">
              <MatisseSimulation scrollContainerRef={scrollContainerRef} isReady={isReady} />
              <MuseumAnalysis />
              <SolutionParadigm />
            </div>
          </CaseStudyReadMore>
        </div>
      </m.section>

      {/* Accessibility Toast */}
      <AnimatePresence>
        {toastState !== 'hidden' && (
          <div className={cn("fixed bottom-8 md:bottom-12 left-0 right-0 z-[100] pointer-events-none flex", toastState === 'visible' ? "justify-center" : "justify-start pl-6 md:pl-8")}>
            <m.div
              role="button"
              tabIndex={0}
              layout
              initial={{ y: 50, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setIsModalOpen(true);
                setToastState('dismissed');
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsModalOpen(true);
                  setToastState('dismissed');
                }
              }}
              className={cn(
                "cursor-pointer pointer-events-auto flex items-center overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/10 dark:border-white/5",
                toastState === 'visible'
                  ? "bg-[#2A2A2A] text-white pl-5 pr-3 py-3 rounded-full gap-3"
                  : "bg-[#2A2A2A] text-white p-4 rounded-full gap-0"
              )}
              aria-label="Accessibility Options"
              aria-live="polite"
            >
              <m.div layout="position" className="flex-shrink-0 flex items-center justify-center w-6 h-6">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="currentColor" className="overflow-visible">
                  <path d="M0 0h24v24H0V0z" fill="none"/>
                  <path d="M20.5 6c-2.61.7-5.67 1-8.5 1s-5.89-.3-8.5-1L3 8c1.86.5 4 .83 6 1v13h2v-6h2v6h2V9c2-.17 4.14-.5 6-1l-.5-2zM12 6c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/>
                </svg>
              </m.div>
              
              <AnimatePresence initial={false}>
                {toastState === 'visible' && (
                  <m.div 
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 'auto', opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="flex items-center gap-3 overflow-hidden"
                  >
                    <span className="font-bold text-sm md:text-base whitespace-nowrap">
                      Accessibility Options
                    </span>
                    <div className="w-[1px] h-4 bg-white/20 ml-1" />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setToastState('dismissed');
                      }}
                      className="p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer outline-none focus:ring-2 focus:ring-white/40"
                      aria-label="Dismiss accessibility options toast"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                    </button>
                  </m.div>
                )}
              </AnimatePresence>
            </m.div>
          </div>
        )}
      </AnimatePresence>

      <AccessibilityModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
