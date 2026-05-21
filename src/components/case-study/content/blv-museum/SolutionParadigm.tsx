'use client'

import { AnimatedTitle } from '@/components/ui/AnimatedTitle'
import Image from 'next/image'
import { useAccessibility } from '@/components/providers/AccessibilityProvider'

export function SolutionParadigm() {
  const { hideImages } = useAccessibility()

  return (
    <div className="space-y-24 md:space-y-32">
      {/* The Solution */}
      <div>
        <h3 className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]" style={{ color: 'rgb(var(--color-text-tertiary))' }}>
          The Solution
        </h3>
        <AnimatedTitle
          text="Introducing Descripto"
          animationType="fadeIn"
          className="text-2xl md:text-[40px] font-bold text-text-primary leading-tight tracking-[-0.05em] mb-8"
        />
        <div className="space-y-8">
          {/* Image - no frame, no rounded corner, no stroke, with dark gray bg */}
          <div className="space-y-4 mb-8">
            <div className="relative w-full aspect-[2639/1442] overflow-hidden bg-neutral-900 dark:bg-neutral-950">
              <Image
                src="/images/case-studies/blv-museum-accessibility/Descripto-hero.png"
                alt="Descripto app interface shown on a mobile device, demonstrating the accessible art exploration features."
                fill
                className="object-cover"
                priority
              />
              {hideImages && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-neutral-100 dark:bg-neutral-800 border border-dashed border-text-color30 z-20">
                  <span className="text-[10px] uppercase tracking-widest text-text-color60 mb-2">Image Hidden</span>
                  <p className="text-xs md:text-sm font-sans text-text-primary leading-relaxed max-w-[85%] font-medium">
                    Descripto app interface shown on a mobile device, demonstrating the accessible art exploration features.
                  </p>
                </div>
              )}
            </div>
            <p className="text-xs md:text-sm font-sans text-text-color60 leading-relaxed max-w-[800px] text-left">
              <strong className="text-text-primary font-semibold">Figure 4:</strong> The Descripto mobile application interface, showcasing clean high-contrast layouts, variable speed audio description options, and multi-layered factual-to-interpretive text structures designed specifically for visually impaired gallery visitors.
            </p>
          </div>

          <p className="text-base md:text-[18px] text-text-color90 leading-relaxed max-w-[800px]">
            Descripto is an audio description app for BLV museum visitors, which allows users to explore the art on their own terms.
          </p>
        </div>

        {/* How it works - Full Bleed */}
        <div className="w-screen relative left-1/2 right-1/2 -translate-x-1/2 bg-neutral-900 dark:bg-neutral-950 mt-24 md:mt-32 aspect-[2639/5739] overflow-hidden">
          <Image
            src="/images/case-studies/blv-museum-accessibility/Descripto-img3-v5.webp"
            alt="A detailed, full-page workflow infographic showing how visually impaired users interact with the Descripto app across different stages of a museum visit."
            fill
            className="object-cover"
          />
          {hideImages && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-neutral-100 dark:bg-[#1C1C1E] border border-dashed border-text-color30 z-20">
              <span className="text-[10px] uppercase tracking-widest text-text-color60 mb-2">Image Hidden</span>
              <p className="text-xs md:text-sm font-sans text-text-primary leading-relaxed max-w-[85%] font-medium text-text-primary">
                A detailed, full-page workflow infographic showing how visually impaired users interact with the Descripto app across different stages of a museum visit.
              </p>
            </div>
          )}
        </div>
        <p className="text-xs md:text-sm font-sans text-text-color60 mt-4 leading-relaxed max-w-[800px] text-left">
          <strong className="text-text-primary font-semibold">Figure 5:</strong> Complete high-fidelity system workflow mapping the user journey within Descripto, detailing how progressive tactile cues, variable audio descriptions, and progressive disclosure mechanisms guide users step-by-step through a gallery environment.
        </p>
      </div>

      {/* Designing with BLV users in mind */}
      <div className="mt-16 md:mt-24">
        <h3 className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]" style={{ color: 'rgb(var(--color-text-tertiary))' }}>
          Design Details
        </h3>
        <AnimatedTitle
          text="Designing with BLV users in mind"
          animationType="fadeIn"
          className="text-2xl md:text-[40px] font-bold text-text-primary leading-tight tracking-[-0.05em] mb-8"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {[
            { title: 'Optimized for iOS VoiceOver', desc: 'Seamless integration with native screen readers.' },
            { title: 'AAA Color Contrast', desc: 'Strict adherence to WCAG AAA contrast ratios for low-vision users.' },
            { title: 'Large Touch Targets', desc: 'Expanded hit areas to ensure confident navigation.' },
            { title: 'Using Readex Pro', desc: 'Hyper-legible typography designed for clarity.' }
          ].map((feature) => (
            <div key={feature.title} className="p-6 md:p-8 bg-neutral-100 dark:bg-[#1C1C1E] space-y-3">
              <h5 className="text-base md:text-[18px] font-bold text-text-primary">{feature.title}</h5>
              <p className="text-sm md:text-base text-text-color70 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Learnings */}
      <div className="py-16 md:py-24">
        <AnimatedTitle
          text="Conclusion & Learnings"
          animationType="fadeIn"
          className="text-2xl md:text-[40px] font-bold text-text-primary leading-tight tracking-[-0.05em] mb-16 md:mb-20"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {[
            {
              num: '01',
              title: "Don't reinvent the wheel",
              desc: "Existing image to audio tools exist, but the gap is in the quality and agency they afford."
            },
            {
              num: '02',
              title: 'Access ≠ experience',
              desc: 'Just providing access is not enough. Most museums have ramps, audio guides, and other basic compliance but there is no way for BLV visitors to experience art on their own terms.'
            },
            {
              num: '03',
              title: 'Every word carries bias',
              desc: 'Defining "objective" description proved complex when even factual statements carry assumptions, biases, and sighted-first language.'
            },
            {
              num: '04',
              title: 'Research ≠ lived experience',
              desc: 'Research is not a substitute for lived experience. We could not test our solution with BLV users and had to rely on sec research and our own assessments. We would love to carry out user testing and gather feedback in the future.'
            }
          ].map((lesson) => (
            <div key={lesson.num} className="space-y-4">
              <div className="text-lg md:text-xl font-mono font-bold text-text-color60 mb-2">{lesson.num}</div>
              <h4 className="text-xl md:text-2xl font-bold text-text-primary tracking-tight leading-tight">
                {lesson.title}
              </h4>
              <p className="text-text-color70 leading-relaxed text-base">
                {lesson.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Behind the Scenes */}
      <div className="py-16 md:py-24">
        <h3 className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]" style={{ color: 'rgb(var(--color-text-tertiary))' }}>
          Process
        </h3>
        <AnimatedTitle
          text="Behind the Scenes"
          animationType="fadeIn"
          className="text-2xl md:text-[40px] font-bold text-text-primary leading-tight tracking-[-0.05em] mb-8"
        />
        <div className="space-y-4 mb-8">
          <div className="relative w-full aspect-[16/9] overflow-hidden bg-neutral-900 dark:bg-neutral-950">
            <Image
              src="/images/case-studies/blv-museum-accessibility/bts-process.webp"
              alt="A compilation of behind-the-scenes photographs showcasing the research, collaborative whiteboarding sessions, and prototyping process."
              fill
              className="object-cover"
            />
            {hideImages && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-neutral-100 dark:bg-neutral-800 border border-dashed border-text-color30 z-20">
                <span className="text-[10px] uppercase tracking-widest text-text-color60 mb-2">Image Hidden</span>
                <p className="text-xs md:text-sm font-sans text-text-primary leading-relaxed max-w-[85%] font-medium">
                  A compilation of behind-the-scenes photographs showcasing the research, collaborative whiteboarding sessions, and prototyping process.
                </p>
              </div>
            )}
          </div>
          <p className="text-xs md:text-sm font-sans text-text-color60 mt-6 md:mt-8 leading-relaxed max-w-[800px] text-left">
            <strong className="text-text-primary font-semibold">Figure 6:</strong> Behind-the-scenes documentation of our collaborative process, showcasing academic literature mapping, structured user flows, comparative analyses, and brainstorming workshops.
          </p>
        </div>
      </div>

      <div className="py-16 md:py-24 border-t border-text-color10">
        <h3 className="text-2xl md:text-[32px] font-bold text-text-primary leading-tight tracking-[-0.05em] mb-6 md:mb-8">
          References
        </h3>
          <ol className="list-decimal pl-5 space-y-6 text-base md:text-[18px] text-text-color70 leading-relaxed mb-16">
            <li>
              <strong>Candlin, F. (2003).</strong> Blindness, art and exclusion in museums and galleries. International Journal of Art and Design, 22(1), 100–110.<br />
              <a href="http://eprints.bbk.ac.uk/745" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">http://eprints.bbk.ac.uk/745</a>
            </li>
            <li>
              <strong>Gomes, A., Soares, C., Simões, F., & Correia, W. (2019).</strong> Art accessibility for blind people. ACM Digital Library, 1–9.<br />
              <a href="https://doi.org/10.1145/3357155.3358456" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://doi.org/10.1145/3357155.3358456</a>
            </li>
            <li>
              <strong>Li, F. M., Zhang, L., Bandukda, M., Stangl, A., Shinohara, K., Findlater, L., & Carrington, P. (2023).</strong> Understanding visual arts experiences of blind people. In Proceedings of the 2023 CHI Conference on Human Factors in Computing Systems (pp. 1–21).<br />
              <a href="https://doi.org/10.1145/3544548.3580941" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://doi.org/10.1145/3544548.3580941</a>
            </li>
            <li>
              <strong>Mohamad, N., Vermol, V. V., Anwar, R., & Kaspin, S. (2024).</strong> Visual art accessibility and art experience for the blind and visually impaired. The International Journal of Design in Society, 19(1), 61–74.<br />
              <a href="https://doi.org/10.18848/2325-1328/CGP/v19i01/61-77" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://doi.org/10.18848/2325-1328/CGP/v19i01/61-77</a>
            </li>
            <li>
              <strong>Stangl, A., Verma, N., Fleischmann, K. R., Morris, M. R., & Gurari, D. (2021).</strong> Going beyond one-size-fits-all image descriptions to satisfy the information wants of people who are blind or have low vision. In Proceedings of the 23rd International ACM SIGACCESS Conference on Computers and Accessibility (pp. 1–15).<br />
              <a href="https://doi.org/10.1145/3441852.3471233" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://doi.org/10.1145/3441852.3471233</a>
            </li>
          </ol>

          <h4 className="text-sm md:text-[16px] font-bold uppercase mb-2" style={{ color: 'rgb(var(--color-text-tertiary))' }}>
            ai credit
          </h4>
          <p className="text-base text-text-color70 leading-relaxed">
            Hero image created using Gemini
          </p>
        </div>
      </div>
    )
  }
