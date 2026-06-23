'use client'

import Image from 'next/image'
import { AnimatedText } from '@/components/ui/AnimatedText'

export function PrattIntervention2Section() {
  return (
    <>
        {/* ── Section: Intervention 2 ── */}
        <AnimatedText variant="heading"
          text="Intervention 2: Updated Visitor Welcome Packet"
          animationType="fadeIn"
          alwaysAnimate={false}
          delay={0}
          className="text-2xl md:text-[40px] font-bold text-text-primary mb-6 md:mb-8 leading-tight tracking-[-0.05em]"
        />

        <div className="space-y-6 md:space-y-8 mb-16 md:mb-20">
          <p
            className="text-base md:text-[18px] font-normal leading-relaxed"
            style={{ color: 'rgb(var(--color-text-color90))' }}
          >
            We refined Pratt&apos;s visitor welcome packet to more
            clearly guide prospective students and families through their
            visit and what comes next. As this packet is the last thing
            visitors take home, it plays a key role in shaping their
            perception of Pratt once they leave campus and how they
            remember their experience.
          </p>
          <p
            className="text-base md:text-[18px] font-normal leading-relaxed"
            style={{ color: 'rgb(var(--color-text-color90))' }}
          >
            With a little tweak, it now delivers clearer information, a
            more consistent tone, and better support after the tour ends.
          </p>
        </div>

        {/* Current packet */}
        <h4 className="text-lg md:text-[24px] font-bold text-text-primary mb-8 md:mb-10">
          Current Visitor Welcome Packet
        </h4>
        <figure className="w-full mb-20 md:mb-24">
          <Image
            src="/images/case-studies/pratt-institute-visitor-experience/current-welcome-packet.avif"
            alt="Current Pratt visitor welcome packet spread out showing FAQ sheet, welcome letter, campus map, and campus directory"
            width={1600}
            height={1000}
            className="w-full h-auto"
            quality={85}
            sizes="(max-width: 768px) 100vw, 1044px"
          />
        </figure>
    </>
  )
}
