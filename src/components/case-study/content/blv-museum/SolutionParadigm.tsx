'use client'

import { AnimatedTitle } from '@/components/ui/AnimatedTitle'

export function SolutionParadigm() {
  return (
    <div className="space-y-24 md:space-y-32">
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
            To dismantle the &quot;Scripted Encounter,&quot; we developed a paradigm of **Negotiable Interpretation**.
            The core proposition is that interpretive freedom is a design requirement, not a luxury.
            We implemented this through a conversational UI that emphasizes three key mechanisms:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              { num: '01', title: 'Progressive Disclosure', desc: 'Removing upfront mode-selection to reduce cognitive load. The system always begins with objective sensory observation, offering deeper layers only when the visitor\'s curiosity triggers them.' },
              { num: '02', title: 'Audible Transitions', desc: 'Using subtle tonal shifts to signal when the description moves from perceptual fact to subjective interpretation, restoring the legibility a sighted visitor has naturally.' },
              { num: '03', title: 'Turn-by-turn Negotiation', desc: 'Allowing the visitor to establish, revise, and redirect the system\'s stance through a conversational dialogue, moving interpretation from a fixed product to a dynamic process.' }
            ].map(item => (
              <div key={item.num} className="space-y-4">
                <h4 className="text-xl font-bold text-text-primary italic font-mono">{item.num}. {item.title}</h4>
                <p className="text-text-color70 leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
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
            I focused on designing the conversational logic for the four &quot;stances&quot;—the specific lenses
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
            A critical lesson of this project was that accessibility cannot be &quot;checked&quot; at the end—it must
            be tested in the medium of experience. We validated our prototype using **TalkBack** and **VoiceOver**,
            ensuring that the conversational logic held up without any visual reference.
          </p>
          <p className="text-base md:text-[18px] text-text-color90 leading-relaxed">
            Through a &quot;Gallery Walk&quot; simulation, we found that visitors responded most strongly to **modal language**
            (&quot;you might notice,&quot; &quot;could be read as&quot;). Being invited to interpret, rather than told what to feel,
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
              Working on this project shifted my understanding of what &quot;accessibility&quot; truly means.
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
            visited myself was a humbling experience—it forced me to recognize the &quot;invisible&quot;
            authority I had taken for granted as a sighted visitor. If I were to continue this
            work, I would focus on scaling the &quot;Musical&quot; stance, exploring how cross-modal
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
  )
}
