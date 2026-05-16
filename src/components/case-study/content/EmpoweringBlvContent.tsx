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
            When we spoke with our client, **Amanda McFee** (Director of Arts, District 75) and **Positive Exposure**, 
            it was clear that great strides had been made in technical accessibility: QR codes on every label, clockwise gallery 
            navigation, and sensory kits for patrons. However, a deeper tension remained regarding the *nature* of the 
            artistic experience itself.
          </p>
          <p className="text-base md:text-[18px] font-normal text-text-color70 leading-relaxed">
            This study critiques the "interpretive authority" of major institutions and proposes 
            "negotiable interpretation"—a paradigm where meaning is constructed through a 
            conversational dialogue between the visitor and the system, rather than delivered as a fixed, authoritative account.
          </p>
        </div>

        {/* My Role Section */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-lg md:text-[24px] font-bold text-text-primary mb-6 md:mb-[28px]">
              My Role
            </h3>
            <ul className="space-y-2 md:space-y-3 list-disc list-inside ml-1">
              {[
                'Conducting secondary research on lived experiences',
                'Co-authoring the "Negotiable Interpretation" paradigm',
                'Analyzing the 14-museum corpus of audio descriptions',
                'Designing the conversational interaction flows',
              ].map((item) => (
                <li key={item} className="text-base md:text-[18px] font-normal text-text-color70 leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg md:text-[24px] font-bold text-text-primary mb-6 md:mb-[28px]">
              Client
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                'Amanda McFee (District 75)',
                'Positive Exposure',
              ].map((tool) => (
                <span 
                  key={tool}
                  className="px-3 py-1.5 rounded-full text-sm font-medium border border-text-color10 text-text-color70"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        <CaseStudyReadMore
          readTime="12 min read"
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
                 text="Objectivity as Authority"
                 animationType="fadeIn"
                 className="text-2xl md:text-[40px] font-bold text-text-primary leading-tight tracking-[-0.05em] mb-8"
               />
               <div className="space-y-6">
                 <p className="text-base md:text-[18px] text-text-color90 leading-relaxed">
                   During our client visit, we encountered a fundamental design tension. Amanda explained that professional 
                   audio descriptions are trained to be "objective, factual, and concise," specifically avoiding subjective bias. 
                   Our team pushed back: **Is "objectivity" actually neutral, or is it an authoritative voice that forecloses 
                   a visitor's ability to interpret art on their own terms?**
                 </p>
                 <blockquote className="border-l-4 border-primary pl-6 py-2 italic text-text-color70 bg-primary/5 rounded-r-lg">
                   "We thought that, as sighted visitors, we can interpret art in our own way... when you listen to someone else 
                   describe the art, they are already forming an opinion... it leaves out your ability to interpret it in your own way."
                   <cite className="block mt-2 not-italic font-bold text-text-primary">— Team Dialogue with Client</cite>
                 </blockquote>
                 <p className="text-base md:text-[18px] text-text-color90 leading-relaxed">
                   This conversation shifted our project from a technical deliverable for Art 75 into an **exploratory research probe**. 
                   We moved beyond solving for *access* to information and started solving for *agency* over meaning.
                 </p>
               </div>
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
