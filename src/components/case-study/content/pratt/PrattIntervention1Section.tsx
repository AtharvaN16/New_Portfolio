'use client'

import { AnimatedText } from '@/components/ui/AnimatedText'

export function PrattIntervention1Section() {
  return (
    <>
        {/* ── Section: Interventions ── */}
        <h3
          className="text-sm md:text-base font-semibold normal-case mb-6 md:mb-[28px]"
          style={{ color: 'rgb(var(--color-text-tertiary))' }}
        >
          Interventions
        </h3>

        <AnimatedText variant="heading"
          text="Intervention 1: Ambassador Training Materials"
          animationType="fadeIn"
          alwaysAnimate={false}
          delay={0}
          className="text-xl md:text-2xl font-bold text-text-primary mb-6 md:mb-8 leading-tight tracking-[-0.05em]"
        />

        <div className="space-y-6 md:space-y-8 mb-16 md:mb-20">
          <p
            className="text-base md:text-[18px] font-normal leading-normal"
            style={{ color: 'rgb(var(--color-text-color90))' }}
          >
            We changed the training for our student ambassadors to help
            them more while they give campus tours. This is important
            because the ambassadors create the first impression of Pratt,
            and better training means better visitor tours. The new
            training system makes it clearer and more consistent for
            ambassadors to get ready for, lead, and think about their
            campus tours.
          </p>
        </div>

        {/* Three-Phase Training Model */}
        <h4 className="text-base md:text-xl font-bold text-text-primary mb-3 md:mb-4">
          The Three - Phase Training Model
        </h4>
        <p
          className="text-base md:text-[18px] italic mb-10 md:mb-12"
          style={{ color: 'rgb(var(--color-case-study-gold))' }}
        >
          Learning ---&gt; Doing ---&gt; Reviewing
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-20 md:mb-24">
          {[
            {
              phase: 'Learning',
              tool: 'Workshop Training',
              desc: 'Gives new ambassadors a shared foundation, common language, and confidence.',
            },
            {
              phase: 'Doing',
              tool: 'Real Time Reminders',
              desc: 'Mobile & physical cue cards to support consistent storytelling during tours.',
            },
            {
              phase: 'Reviewing',
              tool: 'Mid-Point Reflection',
              desc: 'Short check-ins to surface emotional challenges, share wins, and adjust.',
            },
          ].map(({ phase, tool, desc }) => (
            <div key={phase}>
              <h5 className="text-base md:text-[18px] font-bold text-text-primary mb-2">
                {phase}
              </h5>
              <p
                className="text-sm md:text-[16px] italic mb-3"
                style={{ color: 'rgb(var(--color-case-study-gold))' }}
              >
                {tool}
              </p>
              <p
                className="text-base md:text-[18px] font-normal leading-normal"
                style={{ color: 'rgb(var(--color-text-tertiary))' }}
              >
                {desc}
              </p>
            </div>
          ))}
        </div>
    </>
  )
}
