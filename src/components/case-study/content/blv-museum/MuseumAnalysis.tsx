'use client'

import { m, useMotionValue, useAnimationFrame } from 'framer-motion'
import { useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatedTitle } from '@/components/ui/AnimatedTitle'
import { useAccessibility } from '@/components/providers/AccessibilityProvider'
import { cn } from '@/lib/utils/cn'

function AutoScrollTranscript() {
  const { reducedMotion, pauseWebGL } = useAccessibility()
  const shouldPause = reducedMotion || pauseWebGL
  const y = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useAnimationFrame((time, delta) => {
    if (shouldPause || !contentRef.current) return
    const scrollHeight = contentRef.current.scrollHeight / 2
    const speed = isHovered ? 12 : 35
    const moveBy = (speed * delta) / 1000
    
    let newY = y.get() - moveBy
    if (newY <= -scrollHeight) {
      newY += scrollHeight
    }
    y.set(newY)
  })

  const content = (
    <div className="font-serif leading-relaxed text-base md:text-lg text-text-color70 space-y-6 pb-8 pt-8 px-2">
      <p>
        This enormous painting shows five nude female figures with pale peach-pink skin and dark hair. Features, such as faces, buttocks, and breasts, are suggested only by minimal watery black outlines. Visibly loose brushstrokes, dripping lines of paint, and glimpses of raw canvas <span className="bg-[#FF8C00]/20 text-[#FF8C00] font-medium px-1 rounded">convey an element of quickness and improvisation</span>.
      </p>
      <p>
        The figures dance in a circle with most of their hands joined, leaping, stepping, and hopping on an emerald green landscape beneath a royal blue sky. The dancers&apos; bodies are <span className="bg-[#FF8C00]/20 text-[#FF8C00] font-medium px-1 rounded">barely contained by the four edges of the canvas</span> and their poses <span className="bg-[#FF8C00]/20 text-[#FF8C00] font-medium px-1 rounded">convey a sense of rhythm, movement, and momentum</span>.
      </p>
      <p>
        About a third of the way up the canvas, land meets sky along a wavy horizon line suggesting a hilly landscape. The hills and sky are painted with large areas of solid color, <span className="bg-[#FF8C00]/20 text-[#FF8C00] font-medium px-1 rounded">making the painting appear flat</span>. Matisse has also <span className="bg-[#FF8C00]/20 text-[#FF8C00] font-medium px-1 rounded">removed a sense of depth</span> so that the dancers appear as two-dimensional figures atop a blue and green background.
      </p>
      <p>
        This fifth dancer <span className="bg-[#FF8C00]/20 text-[#FF8C00] font-medium px-1 rounded">appears almost to be falling onto her side</span>. <span className="bg-[#FF8C00]/20 text-[#FF8C00] font-medium px-1 rounded">It&apos;s as if the group&apos;s momentum loosened her grip</span> on the hand of the first dancer to her left. <span className="bg-[#FF8C00]/20 text-[#FF8C00] font-medium px-1 rounded">In an attempt to close this gap</span> in the dancers&apos; circle, her body sways diagonally across the bottom of the canvas. <span className="bg-[#FF8C00]/20 text-[#FF8C00] font-medium px-1 rounded">Imagine lunging to your left</span>. Your left leg bends at the knee and your right leg stretches out behind you, foot dangling in the air.
      </p>
      <p>
        Matisse&apos;s approach to painting was partly the result of innovations in photography, which had become widespread by the late 1800s. <span className="bg-[#FF8C00]/20 text-[#FF8C00] font-medium px-1 rounded">Freed from the constraints of faithfully depicting reality</span>, Matisse opted for an <span className="bg-[#FF8C00]/20 text-[#FF8C00] font-medium px-1 rounded">expressive approach</span> to painting that embraced stylized lines, colors, and forms.
      </p>
    </div>
  )

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative h-[400px]",
        shouldPause ? "overflow-y-auto" : "overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <m.div style={shouldPause ? {} : { y }} ref={contentRef}>
        {content}
        {!shouldPause && <div aria-hidden="true">{content}</div>}
      </m.div>
    </div>
  )
}

export function MuseumAnalysis() {
  return (
    <div className="space-y-24 md:space-y-32">
      {/* Finding Our Focus */}
      <div className="mb-24 md:mb-32">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600&display=swap');
          .font-handwritten { font-family: 'Caveat', cursive; }
        `}</style>
        <h3 className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]" style={{ color: 'rgb(var(--color-text-tertiary))' }}>
          Finding Our Focus
        </h3>
        <AnimatedTitle
          text="Three Different Interpretations"
          animationType="fadeIn"
          className="text-2xl md:text-[40px] font-bold text-text-primary leading-tight tracking-[-0.05em] mb-12 lg:mb-16 max-w-[760px]"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="space-y-8 order-2 lg:order-1 lg:col-span-6">
            <p className="text-base md:text-[18px] font-normal text-text-color70 leading-relaxed">
              Initially, we were thinking about how apps like Be My Eyes or Seeing AI could use AI to generate descriptive audio for BLV users in a museum setting. To analyze the issues with current museum audio descriptions, we listened to the official audio description of the painting we introduced at the start. 
            </p>
            <p className="text-base md:text-[18px] font-normal text-text-color70 leading-relaxed">
              Listening to it, we realized that all three of us had a different interpretation of the artwork. I thought the figures were dancing with the sky as the background, while a teammate thought it was water. While I thought the green part was just the ground, the audio description explicitly said they were hills. That is when we realized that interpretive agency is such an important aspect of experiencing art, and a major gap in current audio descriptions. That is how we found our research focus.
            </p>
          </div>

          <m.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="relative p-0 bg-transparent border-0 rounded-none flex items-center justify-center order-1 lg:order-2 lg:col-span-6"
          >
            <div className="relative w-full aspect-[3/2] max-w-[500px] lg:max-w-none">
              <Image
                src="/images/case-studies/blv-museum-accessibility/matisse-dance-original.jpg"
                alt="Henri Matisse, Dance (I), 1909"
                fill
                className="object-cover rounded-none"
              />
              <m.div initial={{ opacity: 0, scale: 0.5, rotate: -20 }} whileInView={{ opacity: 1, scale: 1, rotate: -15 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.5, type: "spring" }} className="absolute top-0 left-[15%] -translate-x-1/2 -translate-y-[60%] text-[#FF8C00] text-3xl md:text-5xl font-handwritten z-10">Sky?</m.div>
              <m.div initial={{ opacity: 0, scale: 0.5, rotate: 20 }} whileInView={{ opacity: 1, scale: 1, rotate: 15 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.7, type: "spring" }} className="absolute top-[5%] right-0 translate-x-[20%] -translate-y-1/2 text-[#FF8C00] text-3xl md:text-5xl font-handwritten z-10">Water?</m.div>
              <m.div initial={{ opacity: 0, scale: 0.5, rotate: -10 }} whileInView={{ opacity: 1, scale: 1, rotate: -5 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.9, type: "spring" }} className="absolute bottom-0 left-[40%] -translate-x-1/2 translate-y-[60%] text-[#FF8C00] text-3xl md:text-5xl font-handwritten z-10">Hill?</m.div>
            </div>
          </m.div>
        </div>
      </div>

      <div className="my-24 md:my-32 max-w-[880px]">
        <AnimatedTitle
          text="By interpreting art instead of just describing it, standard audio descriptions strip away the visitor's autonomy to find their own meaning."
          animationType="fadeIn"
          className="text-2xl md:text-[40px] font-bold text-text-primary leading-[1.15] tracking-[-0.04em]"
        />
      </div>

      <div className="pt-12">
        <h3 className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]" style={{ color: 'rgb(var(--color-text-tertiary))' }}>
          Our Analysis
        </h3>
        <AnimatedTitle
          text="We analyzed a corpus of real museum audio descriptions to assess their objectivity."
          animationType="fadeIn"
          className="text-2xl md:text-[40px] font-bold text-text-primary leading-tight tracking-[-0.05em] mb-8"
        />

        <div className="relative w-full flex items-center min-h-[400px] py-12 md:py-20 mt-12">
          <div className="absolute top-1/2 -translate-y-1/2 -left-6 md:-left-12 w-[100%] md:w-[90%] h-[600px] md:h-[700px] z-0 opacity-40 md:opacity-60 [mask-image:linear-gradient(to_right,black_45%,transparent_70%)] pointer-events-none">
            <Image src="/images/case-studies/blv-museum-accessibility/acc_matrix.png" alt="Accessibility Matrix" fill className="object-contain object-left" />
          </div>
          <div className="w-[100%] md:w-[50%] ml-auto relative z-10 flex flex-col h-[400px] md:h-[450px] justify-center">
            <div className="absolute inset-y-0 -left-12 md:-left-32 right-0 bg-gradient-to-r from-transparent via-background to-background -z-10 pointer-events-none" />
            <div className="relative z-10 pl-0 md:pl-12">
              <p className="mb-6 font-sans text-sm md:text-[14px] uppercase tracking-widest text-text-color70">Excerpts: Audio Description for Matisse&apos;s Dance (I), 1909</p>
              <AutoScrollTranscript />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]" style={{ color: 'rgb(var(--color-text-tertiary))' }}>
          The Analysis
        </h3>
        <AnimatedTitle text="Findings from 14 Major Museums" animationType="fadeIn" className="text-2xl md:text-[40px] font-bold text-text-primary leading-tight tracking-[-0.05em] mb-16 md:mb-24" />
        <div className="w-full mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-start text-left">
            {[
              { val: '2.3', label: 'AVG OBJECTIVITY SCORE (OUT OF 5)' },
              { val: '80%', label: 'CONTAIN EMOTION WORDS' },
              { val: '20%', label: 'PRESERVE AMBIGUITY' },
              { val: '0%', label: 'CONTEMPORARY WORKS PRESERVE AMBIGUITY' }
            ].map(stat => (
              <div key={stat.label}>
                <span className="block text-5xl md:text-6xl font-bold text-text-primary mb-3">{stat.val}</span>
                <p className="text-[10px] md:text-[11px] font-sans uppercase tracking-widest text-text-color60 leading-tight">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            { text: 'Interpretive claims precede perceptual details, telling visitors what to feel before they know what they are seeing.', color: 'bg-[#FFEA79] dark:bg-[#D4C364]', rot: 'rotate-[-1deg]' },
            { text: 'Using words like "represents" or "depicts" to present a single curated meaning as fact, rather than one of many possibilities.', color: 'bg-[#B5D8FF] dark:bg-[#85B0DB]', rot: 'rotate-[1.5deg]' },
            { text: 'Leaving out the specific perceptual grounding (scale, texture, spatial arrangement) needed for visitors to form their own readings.', color: 'bg-[#FFB8D2] dark:bg-[#D490AB]', rot: 'rotate-[-1.5deg]' }
          ].map((note, i) => (
            <div key={i} className={cn("p-8 aspect-square flex flex-col justify-center text-left shadow-lg transition-transform hover:scale-[1.02] cursor-default", note.color, note.rot)}>
              <p className="text-black dark:text-black/80 font-medium leading-relaxed text-sm md:text-base">{note.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-48 md:mt-64 mb-64 md:mb-80 space-y-24">
          <div className="max-w-[800px]">
            <span className="text-sm md:text-base font-bold uppercase tracking-[0.2em] mb-8 block" style={{ color: 'rgb(var(--color-text-tertiary))' }}>Research Focus</span>
            <AnimatedTitle
              text="How might we increase interpretive agency for BLV participants in art spaces?"
              highlightWords={["interpretive agency"]}
              highlightColor="#FF8C00"
              animationType="fadeIn"
              className="text-2xl md:text-[42px] font-bold text-text-primary leading-[1.15] tracking-[-0.04em]"
              variant="full"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
