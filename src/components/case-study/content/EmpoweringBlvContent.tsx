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
               <p className="text-base md:text-[18px] text-text-color90 leading-relaxed mb-12">
                 We analyzed audio descriptions from institutions like Tate Modern, MoMA, and the Guggenheim. 
                 The results revealed three structural mechanisms that "fix" meaning before the visitor arrives:
               </p>
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                 {[
                   {
                     title: '01. Ordering',
                     desc: 'Interpretive claims (e.g., "a joyous circle") precede perceptual details, telling visitors what to feel before they know what they are seeing.'
                   },
                   {
                     title: '02. Certainty',
                     desc: 'Using words like "represents" or "depicts" to present a single curated meaning as fact, rather than one of many possibilities.'
                   },
                   {
                     title: '03. Omission',
                     desc: 'Leaving out the specific perceptual grounding (scale, texture, spatial arrangement) needed for visitors to form their own readings.'
                   }
                 ].map((item) => (
                   <div key={item.title} className="p-6 rounded-xl border border-text-color10 bg-text-color5/5">
                     <h4 className="text-lg font-bold text-text-primary mb-3">{item.title}</h4>
                     <p className="text-sm text-text-color70 leading-relaxed">{item.desc}</p>
                   </div>
                 ))}
               </div>
             </div>

             {/* The Solution */}
             <div>
               <h3 className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]" style={{ color: 'rgb(var(--color-text-tertiary))' }}>
                 The Solution
               </h3>
               <AnimatedTitle
                 text="Negotiable Interpretation"
                 animationType="fadeIn"
                 className="text-2xl md:text-[40px] font-bold text-text-primary leading-tight tracking-[-0.05em] mb-8"
               />
               <div className="space-y-8">
                 <p className="text-base md:text-[18px] text-text-color90 leading-relaxed">
                   Instead of a static recording, we proposed a **Conversational Interface** that allows for 
                   turn-by-turn negotiation. In this paradigm, accessibility is not just access to *content*, 
                   but access to the *process* of interpretation.
                 </p>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
                   <div className="space-y-4">
                     <h4 className="text-xl font-bold text-text-primary">Positioning</h4>
                     <p className="text-text-color70 leading-relaxed italic">
                       "Just tell me what’s there."
                     </p>
                     <p className="text-text-color70 leading-relaxed">
                       The visitor begins by declaring an interpretive stance. The system responds with perceptual detail only—color, layout, material—leaving affect and symbolism out unless requested.
                     </p>
                   </div>
                   <div className="space-y-4">
                     <h4 className="text-xl font-bold text-text-primary">Reframing</h4>
                     <p className="text-text-color70 leading-relaxed italic">
                       "For me, this almost feels threatening."
                     </p>
                     <p className="text-text-color70 leading-relaxed">
                       When a visitor pushes back on a framing, the system follows rather than corrects. It treats their interpretation as input to the encounter, not as a deviation from a canonical account.
                     </p>
                   </div>
                 </div>
               </div>
             </div>

             {/* The Design Probe */}
             <div>
               <h3 className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]" style={{ color: 'rgb(var(--color-text-tertiary))' }}>
                 The Design Probe
               </h3>
               <AnimatedTitle
                 text="The Four Stances"
                 animationType="fadeIn"
                 className="text-2xl md:text-[40px] font-bold text-text-primary leading-tight tracking-[-0.05em] mb-8"
               />
               <div className="space-y-12">
                 <p className="text-base md:text-[18px] text-text-color90 leading-relaxed">
                   To operationalize this, we designed a conversational probe where visitors can select from four 
                   distinct "stances" to frame their encounter:
                 </p>
                 
                 <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                   {[
                     { label: 'Technical', icon: '⚙️', desc: 'Focus on dimensions, materials, and composition.' },
                     { label: 'Emotional', icon: '❤️', desc: 'Focus on affect, mood, and subjective response.' },
                     { label: 'Contextual', icon: '🏛️', desc: 'Focus on historical background and curation.' },
                     { label: 'Musical', icon: '🎵', desc: 'Translating visual rhythm into auditory patterns.' }
                   ].map((stance) => (
                     <div key={stance.label} className="flex flex-col items-center text-center p-6 border border-text-color10 rounded-2xl hover:border-primary/50 transition-colors">
                       <span className="text-3xl mb-4">{stance.icon}</span>
                       <h5 className="font-bold text-text-primary mb-2">{stance.label}</h5>
                       <p className="text-xs text-text-color60">{stance.desc}</p>
                     </div>
                   ))}
                 </div>

                 <div className="bg-primary/5 p-8 rounded-3xl border border-primary/20">
                    <h4 className="text-lg font-bold text-text-primary mb-4">Why this matters</h4>
                    <p className="text-text-color70 leading-relaxed">
                      By making the "frame" explicit, the system reveals curatorial authority as authority rather than 
                      as invisible fact. This transparency is itself an equity intervention, opening the artistic 
                      encounter to genuine participation from the BLV community.
                    </p>
                 </div>
               </div>
             </div>

             {/* Reflection */}
             <div className="py-16 md:py-24 border-t border-text-color10">
               <h3 className="text-sm md:text-[16px] font-bold uppercase mb-8" style={{ color: 'rgb(var(--color-text-tertiary))' }}>
                 Conclusion & Reflection
               </h3>

               <div className="max-w-[760px] space-y-8">
                 <p className="text-base md:text-[18px] font-normal text-text-color70 leading-relaxed">
                   Working on this project shifted my understanding of what "accessibility" truly means. 
                   It is not enough to simply provide a verbal description of an image; true accessibility 
                   requires redistributing the power to create meaning. 
                 </p>
                 <p className="text-base md:text-[18px] font-normal text-text-color70 leading-relaxed">
                   Individually, this project challenged me to think beyond UI components and into the 
                   ethics of interpretation. Analyzing the institutional descriptions of museums I had 
                   visited myself was a humbling experience—it forced me to recognize the "invisible" 
                   authority I had taken for granted as a sighted visitor. If I were to continue this 
                   work, I would focus on scaling the "Musical" stance, exploring how cross-modal 
                   translation can provide even richer pathways for autonomous exploration.
                 </p>
               </div>

               <div className="mt-32 md:mt-48 pt-16 md:pt-24 border-t border-text-color10">
                 <h3 className="text-3xl md:text-[48px] font-bold uppercase tracking-[-0.02em] mb-6 md:mb-8 text-primary">
                   References
                 </h3>
                 <div className="space-y-4 text-sm text-text-color60 leading-relaxed font-mono">
                    <p>Candlin, F. (2003). Blindness, art and exclusion in museums and galleries. International Journal of Art and Design, 22(1), 100–110.</p>
                    <p>Eardley, A. F., Thompson, H., Fineman, A., Hutchinson, R., Bywood, L., & Cock, M. (2022). Devisualizing the museum: From access to inclusion. Journal of Museum Education, 47(2), 150–165.</p>
                    <p>Li, F. M., Zhang, L., Bandukda, M., Stangl, A., Shinohara, K., Findlater, L., & Carrington, P. (2023). Understanding Visual Arts Experiences of Blind People. In Proceedings of the 2023 CHI Conference on Human Factors in Computing Systems (CHI ’23).</p>
                    <p>Stangl, A., Verma, N., Fleischmann, K. R., Morris, M. R., & Gurari, D. (2021). Going Beyond One-Size-Fits-All Image Descriptions. In Proceedings of the 23rd International ACM SIGACCESS Conference on Computers and Accessibility (ASSETS ’21).</p>
                 </div>
               </div>
             </div>
          </div>
        </CaseStudyReadMore>
      </div>
    </m.section>
  )
}
