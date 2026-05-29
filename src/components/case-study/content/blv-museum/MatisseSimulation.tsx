'use client'

import { m, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { AnimatedText } from '@/components/ui/AnimatedText'
import { cn } from '@/lib/utils/cn'
import { useAccessibility } from '@/components/providers/AccessibilityProvider'

interface MatisseSimulationProps {
  scrollContainerRef: React.RefObject<HTMLElement | null>
  isReady: boolean
}

export function MatisseSimulation({ scrollContainerRef, isReady }: MatisseSimulationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { reducedMotion, hideImages } = useAccessibility()

  // useScroll only initializes when the component mounts (which is when isContentRevealed is true)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: isReady && scrollContainerRef.current ? scrollContainerRef : undefined,
    offset: ['start start', 'end end'],
  })

  // Transformation ranges for the visual loss simulation
  const blurValue = useTransform(scrollYProgress, [0.2, 0.7], [0, 20])
  const opacityValue = useTransform(scrollYProgress, [0.2, 0.7], [1, 0.2])
  const vignetteOpacityValue = useTransform(scrollYProgress, [0.2, 0.7], [0, 1])
  const textOpacityValue = useTransform(scrollYProgress, [0.6, 0.8], [0, 1])

  const blur = reducedMotion ? 0 : blurValue
  const opacity = reducedMotion ? 1 : opacityValue
  const vignetteOpacity = reducedMotion ? 0.3 : vignetteOpacityValue
  const textOpacity = reducedMotion ? 1 : textOpacityValue

  return (
    <>
      {/* Matisse Intro Section */}
      <div className="mb-24 md:mb-32">
        <div className="mb-12">
          <h2 className="text-2xl md:text-[40px] font-bold text-text-primary leading-tight tracking-[-0.05em] mb-4">
            What do you think about this painting? <br /> Could you describe the composition?
          </h2>
        </div>

        <div 
          ref={containerRef} 
          className="relative h-[250vh]"
          role="region"
          aria-label="Interactive simulation of visual loss"
        >
          <div className="sr-only">
            As you scroll through this section, the image of Matisse&apos;s Dance (I) progressively blurs and darkens, 
            simulating the experience of losing visual detail. This leads to the question: &quot;What about now?&quot;
          </div>

          <div className="sticky top-[10vh] sm:top-[15vh] w-full flex flex-col items-start">
            <m.div
              initial={{ scale: 0.98, opacity: 0 }}
              whileInView={{ scale: [0.98, 1.01, 1], opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              className="relative aspect-[4/3] md:aspect-video w-full overflow-hidden bg-black"
            >
              <m.div style={{ filter: `blur(${blur}px)`, opacity }} className="absolute inset-0">
                <Image
                  src="/images/case-studies/blv-museum-accessibility/matisse-dance-4k.png"
                  alt="Henri Matisse, Dance (I), 1909. Five figures in a circle against a blue and green background."
                  fill
                  className="object-cover"
                  priority
                />
              </m.div>

              <m.div
                style={{ opacity: vignetteOpacity }}
                className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,_transparent_20%,_rgba(0,0,0,0.8)_80%)]"
                aria-hidden="true"
              />

              <m.div
                style={{ opacity: textOpacity }}
                className="absolute inset-0 flex items-center justify-center p-6 text-center pointer-events-none"
              >
                <h2 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
                  What about now?
                </h2>
              </m.div>

              {hideImages && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-neutral-100 dark:bg-neutral-800 border border-dashed border-text-color30 z-20">
                  <span className="text-[10px] uppercase tracking-widest text-text-color60 mb-2">Image Hidden</span>
                  <p className="text-xs md:text-sm font-sans text-text-primary leading-relaxed max-w-[85%] font-medium">
                    Henri Matisse, Dance (I), 1909. Five figures in a circle against a blue and green background.
                  </p>
                </div>
              )}
            </m.div>
            <p className="text-xs md:text-sm font-sans text-text-color60 mt-6 md:mt-8 leading-relaxed max-w-[800px] text-left">
              <strong className="text-text-primary font-semibold">Figure 1:</strong> Interactive visual simulation of Henri Matisse’s &apos;Dance (I)&apos; (1909) progressively blurring and fading as the user scrolls, representing the loss of visual clarity and interpretive context in traditional museum settings.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-24 md:mb-32 space-y-12">
        <p className="text-base md:text-[18px] font-normal text-text-body leading-relaxed max-w-[760px]">
          When we look at art, our eyes don&apos;t just register shapes and colors. They form an initial interpretation and opinion.
          Before we read the description or listen to the audio guide, we have already begun to form our own meaning.
        </p>
        <p className="text-base md:text-[18px] font-normal text-text-body leading-relaxed max-w-[760px]">
          As part of an exploratory project for Positive Exposure, who have an art exhibition - Art 75 for children with disabilities, we were asked to research museum accessibility for BLV (Blind and low vision) visitors.
        </p>
      </div>

      {/* Secondary Research */}
      <div className="mb-24 md:mb-32">
        <h3 className="text-[12px] md:text-[14px] font-bold uppercase mb-6 md:mb-[28px]" style={{ color: 'rgb(var(--color-text-tertiary))' }}>
          Secondary Research
        </h3>
        <AnimatedText variant="heading"
          text="We conducted a literature survey to deepen our understanding"
          animationType="fadeIn"
          className="text-2xl md:text-[40px] font-bold text-text-primary leading-tight tracking-[-0.05em] mb-12 max-w-[800px]"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            "BLV visitors want choice in how they encounter art, including selecting levels of detail and engaging through multiple sensory modalities.",
            "\"One-size-fits-all\" descriptions often fail because they prioritize factual visual details over what BLV visitors actually want to know.",
            "Existing tools limit interpretive agency, reducing a potentially rich encounter into a narrow, one-directional transfer of information.",
            "Multisensory access is critical — users want multiple modalities to experience the artwork.",
            "Useful descriptions include not just objects, but attributes like color, texture, layout, activity, and relationships.",
            "Blind visitors want objective, factual descriptions first, with subjective opinions kept separate or optional.",
            "Museum visits are shorter and less frequent due to fatigue from constantly asking for missing context.",
            "Many audio descriptions still assume sight by using phrases like \"as you can see here.\""
          ].map((insight, i) => {
            const stickyColors = [
              "bg-[#FFEA79] dark:bg-[#D4C364]", "bg-[#B5D8FF] dark:bg-[#85B0DB]",
              "bg-[#FFB8D2] dark:bg-[#D490AB]", "bg-[#B3F0C3] dark:bg-[#8BC69A]",
              "bg-[#FFC999] dark:bg-[#DBA878]", "bg-[#D7C4FF] dark:bg-[#B3A1D6]",
              "bg-[#A3EED2] dark:bg-[#7DC1A8]", "bg-[#FFD1B3] dark:bg-[#D9AC8F]"
            ]
            const bgColor = stickyColors[i % stickyColors.length]
            const rotation = i % 2 === 0 ? "rotate-[-1deg]" : "rotate-[1.5deg]"
            
            return (
              <div 
                key={i} 
                className={cn(
                  bgColor,
                  "p-6 md:p-8 transition-all duration-300 relative aspect-square md:aspect-auto md:min-h-[220px]",
                  "flex flex-col justify-center text-center rounded-sm",
                  rotation,
                  "hover:rotate-0 hover:-translate-y-1 hover:shadow-xl hover:z-10"
                )}
                style={{ boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)" }}
              >
                <p className="font-sans text-base md:text-[17px] text-zinc-900 leading-relaxed font-medium tracking-tight">
                  {insight}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
