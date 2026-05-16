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
            However, for blind and low-vision (BLV) visitors, this agency is often preempted by fixed audio descriptions 
            that prioritize "objective" transfer over personal meaning-making.
          </p>
          <p className="text-base md:text-[18px] font-normal text-text-color70 leading-relaxed">
            This exploratory study critiques the "interpretive authority" of major institutions and proposes 
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
              Focus
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                'UX Research',
                'Digital Accessibility',
                'Speculative Design',
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
             {/* The Baseline: Perception vs Language */}
             <div className="pt-12">
               <h3 className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]" style={{ color: 'rgb(var(--color-text-tertiary))' }}>
                 The Baseline
               </h3>
               <AnimatedTitle
                 text="Perception Before Language"
                 animationType="fadeIn"
                 className="text-2xl md:text-[40px] font-bold text-text-primary leading-tight tracking-[-0.05em] mb-8"
               />
               <div className="space-y-6">
                 <p className="text-base md:text-[18px] text-text-color90 leading-relaxed">
                   To design for BLV visitors, I first needed to understand what the sighted experience actually provides. 
                   When a sighted visitor enters a gallery, meaning forms in a specific sequence: **perception before language**. 
                   They take in scale, color, and rhythm before ever reading a single word of wall text.
                 </p>
                 <p className="text-base md:text-[18px] text-text-color90 leading-relaxed font-medium">
                   This sequence is the mechanism of interpretive freedom.
                 </p>
                 <p className="text-base md:text-[18px] text-text-color90 leading-relaxed">
                   But for a BLV visitor using a standard audio guide, **language arrives first**. Someone else has already 
                   decided what the work means, resolving ambiguity before the visitor has a chance to wonder. 
                   We came to call this **"The Scripted Encounter"**—an experience where the visitor's journey 
                   has been written in advance.
                 </p>
               </div>
             </div>

             {/* The Critique */}
             <div>
               <h3 className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]" style={{ color: 'rgb(var(--color-text-tertiary))' }}>
                 The Critique
               </h3>
               <AnimatedTitle
                 text="Described 'At' vs Described 'To'"
                 animationType="fadeIn"
                 className="text-2xl md:text-[40px] font-bold text-text-primary leading-tight tracking-[-0.05em] mb-8"
               />
               <div className="space-y-6">
                 <p className="text-base md:text-[18px] text-text-color90 leading-relaxed">
                   Through secondary research and video testimonies, we surfaced a recurring frustration: 
                   descriptions weren't necessarily inaccurate, they were **presumptuous**. They told visitors 
                   what to feel before giving them space to feel it. 
                 </p>
                 <div className="p-8 bg-text-color5/5 rounded-3xl border border-text-color10">
                   <p className="text-base md:text-[18px] text-text-primary font-medium mb-4">The core insight:</p>
                   <p className="text-text-color70 leading-relaxed">
                     There is a fundamental difference between being **described at** (passive reception of a curated script) 
                     and being **described to** (active participation in a meaning-making process). 
                     Standard museum practice defaults to the former, treating accessibility as a checklist of 
                     information transfer rather than an invitation to culture.
                   </p>
                 </div>
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
                 We analyzed a corpus of audio descriptions from institutions like **Tate Modern**, **MoMA**, and the **Guggenheim**. 
                 The results revealed three structural mechanisms that "fix" meaning before the visitor arrives:
               </p>
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-16">
                 {[
                   {
                     title: '01. Ordering',
                     desc: 'Interpretive claims precede perceptual details, telling visitors what to feel before they know what they are seeing.'
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

               <div className="space-y-6">
                 <p className="text-base md:text-[18px] text-text-color90 leading-relaxed italic border-l-2 border-text-color20 pl-6">
                   "The Giorgio de Chirico description at MoMA is a perfect example. It begins with compositional facts but quickly 
                   introduces adjectives like 'odd' and 'disturbing.' These aren't neutral observations; they are interpretive 
                   decisions made on behalf of the visitor."
                 </p>
                 <p className="text-base md:text-[18px] text-text-color90 leading-relaxed">
                   Across the entire corpus, we found that **80% of descriptions included emotional or interpretive language**, 
                   while only **20% preserved meaningful ambiguity**.
                 </p>
               </div>
             </div>

             {/* The Solution */}
             <div>
               <h3 className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]" style={{ color: 'rgb(var(--color-text-tertiary))' }}>
                 The Solution
               </h3>
               <AnimatedTitle
                 text="A Paradigm of Negotiable Interpretation"
                 animationType="fadeIn"
                 className="text-2xl md:text-[40px] font-bold text-text-primary leading-tight tracking-[-0.05em] mb-8"
               />
               <div className="space-y-8">
                 <p className="text-base md:text-[18px] text-text-color90 leading-relaxed">
                   To dismantle the "Scripted Encounter," we developed a paradigm of **Negotiable Interpretation**. 
                   The core proposition is that interpretive freedom is a design requirement, not a luxury. 
                   We implemented this through a conversational UI that emphasizes three key mechanisms:
                 </p>
                 
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                   <div className="space-y-4">
                     <h4 className="text-xl font-bold text-text-primary italic font-mono">01. Progressive Disclosure</h4>
                     <p className="text-text-color70 leading-relaxed text-sm">
                       Removing upfront mode-selection to reduce cognitive load. The system always begins with objective sensory 
                       observation, offering deeper layers only when the visitor's curiosity triggers them.
                     </p>
                   </div>
                   <div className="space-y-4">
                     <h4 className="text-xl font-bold text-text-primary italic font-mono">02. Audible Transitions</h4>
                     <p className="text-text-color70 leading-relaxed text-sm">
                       Using subtle tonal shifts to signal when the description moves from perceptual fact to subjective interpretation, 
                       restoring the legibility a sighted visitor has naturally.
                     </p>
                   </div>
                   <div className="space-y-4">
                     <h4 className="text-xl font-bold text-text-primary italic font-mono">03. Turn-by-turn Negotiation</h4>
                     <p className="text-text-color70 leading-relaxed text-sm">
                       Allowing the visitor to establish, revise, and redirect the system's stance through a conversational dialogue, 
                       moving interpretation from a fixed product to a dynamic process.
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
                 text="Interacting Through Stances"
                 animationType="fadeIn"
                 className="text-2xl md:text-[40px] font-bold text-text-primary leading-tight tracking-[-0.05em] mb-8"
               />
               <div className="space-y-12">
                 <p className="text-base md:text-[18px] text-text-color90 leading-relaxed">
                   I focused on designing the conversational logic for the four "stances"—the specific lenses 
                   through which a visitor can negotiate their encounter with a work of art:
                 </p>
                 
                 <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                   {[
                     { label: 'Technical', icon: '⚙️', desc: 'Dimensions, materials, and spatial arrangement.' },
                     { label: 'Emotional', icon: '❤️', desc: 'Affect, mood, and subjective response.' },
                     { label: 'Contextual', icon: '🏛️', desc: 'Historical background and curatorial framing.' },
                     { label: 'Musical', icon: '🎵', desc: 'Visual rhythm translated into auditory patterns.' }
                   ].map((stance) => (
                     <div key={stance.label} className="flex flex-col items-center text-center p-6 border border-text-color10 rounded-2xl hover:border-primary/50 transition-colors bg-white/5 backdrop-blur-sm">
                       <span className="text-3xl mb-4">{stance.icon}</span>
                       <h5 className="font-bold text-text-primary mb-2">{stance.label}</h5>
                       <p className="text-xs text-text-color60 leading-relaxed">{stance.desc}</p>
                     </div>
                   ))}
                 </div>
               </div>
             </div>

             {/* Validation */}
             <div>
               <h3 className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]" style={{ color: 'rgb(var(--color-text-tertiary))' }}>
                 Validation
               </h3>
               <AnimatedTitle
                 text="Testing in the Medium"
                 animationType="fadeIn"
                 className="text-2xl md:text-[40px] font-bold text-text-primary leading-tight tracking-[-0.05em] mb-8"
               />
               <div className="space-y-6">
                 <p className="text-base md:text-[18px] text-text-color90 leading-relaxed">
                   A critical lesson of this project was that accessibility cannot be "checked" at the end—it must 
                   be tested in the medium of experience. We validated our prototype using **TalkBack** and **VoiceOver**, 
                   ensuring that the conversational logic held up without any visual reference.
                 </p>
                 <p className="text-base md:text-[18px] text-text-color90 leading-relaxed">
                   Through a "Gallery Walk" simulation, we found that visitors responded most strongly to **modal language** 
                   ("you might notice," "could be read as"). Being invited to interpret, rather than told what to feel, 
                   was consistently identified as a qualitatively superior experience.
                 </p>
               </div>
             </div>

             {/* Reflection */}
             <div className="py-16 md:py-24 border-t border-text-color10">
               <h3 className="text-sm md:text-[16px] font-bold uppercase mb-8" style={{ color: 'rgb(var(--color-text-tertiary))' }}>
                 Conclusion & Reflection
               </h3>

               <div className="max-w-[760px] space-y-12">
                 <div className="space-y-6">
                   <p className="text-base md:text-[18px] font-normal text-text-color70 leading-relaxed">
                     Working on this project shifted my understanding of what "accessibility" truly means. 
                     It is not enough to simply provide a verbal description of an image; true accessibility 
                     requires redistributing the power to create meaning. 
                   </p>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                      {
                        title: 'Description is design material',
                        desc: 'Every word in an audio description is a design decision with deep consequences for the visitor\'s autonomy.'
                      },
                      {
                        title: 'Ambiguity is a feature to protect',
                        desc: 'If a description resolves everything, the visitor has no reason to feel that the encounter was truly theirs.'
                      }
                    ].map((lesson) => (
                      <div key={lesson.title} className="space-y-3">
                        <h4 className="text-lg font-bold text-text-primary uppercase tracking-tight">{lesson.title}</h4>
                        <p className="text-sm text-text-color70 leading-relaxed">{lesson.desc}</p>
                      </div>
                    ))}
                 </div>

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
