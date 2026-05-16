'use client'

import { m } from 'framer-motion'
import { CaseStudyReadMore } from '@/components/case-study/CaseStudyReadMore'
import { AnimatedTitle } from '@/components/ui/AnimatedTitle'

interface EmpoweringBlvContentProps {
  isContentRevealed: boolean
  onToggleContent: () => void
  progressBarColor?: string
}

export function EmpoweringBlvContent({
  isContentRevealed,
  onToggleContent,
  progressBarColor = '#FF8C00',
}: EmpoweringBlvContentProps) {
  return (
    <m.section
      className="w-full px-6 2xl:px-[140px] py-16 md:py-24 max-w-[1920px] mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <div className="max-w-[1044px] mx-auto text-left">
        {/* Abstract */}
        <h3 className="text-lg md:text-[28px] font-bold text-text-primary mb-6 md:mb-[28px]">
          Abstract
        </h3>
        <div className="space-y-6 md:space-y-8">
          <p className="text-base md:text-[18px] font-normal text-text-color70 leading-relaxed">
            Museums are sites of cultural participation where engagement depends on interpretive agency. 
            However, for blind and low-vision (BLV) visitors, this agency is often preempted by fixed audio descriptions.
          </p>
          <p className="text-base md:text-[18px] font-normal text-text-color70 leading-relaxed">
            This study critiques the "interpretive authority" of major institutions and proposes 
            "negotiable interpretation"—a paradigm where meaning is constructed through a 
            conversational dialogue between the visitor and the system.
          </p>
        </div>

        <CaseStudyReadMore
          readTime="10 min read"
          isContentRevealed={isContentRevealed}
          onToggleContent={onToggleContent}
        >
          <div className="space-y-24 md:space-y-32">
             {/* The Critique */}
             <div className="pt-12">
               <h3 className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]" style={{ color: 'rgb(var(--color-text-tertiary))' }}>
                 The Critique
               </h3>
               <AnimatedTitle
                 text="Beyond Technical Compliance"
                 animationType="fadeIn"
                 className="text-2xl md:text-[40px] font-bold text-text-primary leading-tight tracking-[-0.05em] mb-8"
               />
               <p className="text-base md:text-[18px] text-text-color90 leading-relaxed mb-8">
                 An accessibility audit asks: "Does this meet standards?" An accessibility critique asks: "Who is excluded, and why?"
                 Our research found that BLV visitors are often positioned as passive recipients of expert knowledge rather than active meaning-makers.
               </p>
             </div>

             {/* The Analysis */}
             <div>
               <h3 className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]" style={{ color: 'rgb(var(--color-text-tertiary))' }}>
                 The Analysis
               </h3>
               <AnimatedTitle
                 text="Findings from 14 Major Museums"
                 animationType="fadeIn"
                 className="text-2xl md:text-[40px] font-bold text-text-primary leading-tight tracking-[-0.05em] mb-8"
               />
               <p className="text-base md:text-[18px] text-text-color90 leading-relaxed mb-8">
                 We analyzed audio descriptions from institutions like Tate Modern, MoMA, and the Guggenheim. 
                 The results revealed structural mechanisms—Ordering, Certainty, and Omission—that resolve interpretation before the visitor even arrives.
               </p>
             </div>
          </div>
        </CaseStudyReadMore>
      </div>
    </m.section>
  )
}
