'use client'

import { SectionDivider } from './pratt-shared'

export function PrattIntervention1ImpactSection() {
  return (
    <>
        {/* Ecosystem impact */}
        <div className="mt-16 md:mt-20">
          <h4 className="text-base md:text-xl font-bold text-text-primary mb-10 md:mb-12 leading-snug">
            How the Updated Training Material Strengthens the Visitor
            Services Ecosystem Loops
          </h4>
          <div className="space-y-10 md:space-y-12">
            {[
              {
                title: 'The Ambassador - Visitor relationship',
                paras: [
                  "With the cue cards, ambassadors don\u2019t have to stress about memorizing stats, so they can focus on connecting personally.",
                  'With this Visitors leave trusting the information they heard. They get the authentic student perspective they came for, without the confusion.',
                ],
              },
              {
                title: 'The Ambassador - Sham\u00f4r Relationship',
                paras: [
                  'The \u201cReviewing\u201d phase gives Sham\u00f4r direct feedback on what visitors are asking. He receives clearer feedback from ambassadors about visitor reactions, challenges, and questions and can make more informed operational decisions, because tours become more predictable and aligned.',
                ],
              },
              {
                title: 'The Ambassador - Admissions Comms Relationship',
                paras: [
                  'Reflection tools help ambassadors surface real visitor questions and confusion points, which Communications can use to improve email reminders and pre-visit content.',
                ],
              },
            ].map(({ title, paras }) => (
              <div key={title}>
                <h5 className="text-base md:text-[18px] font-bold text-text-primary mb-3 md:mb-4">
                  {title}
                </h5>
                <div className="space-y-3">
                  {paras.map((para, i) => (
                    <p
                      key={i}
                      className="text-base md:text-[18px] font-normal leading-normal"
                      style={{ color: 'rgb(var(--color-text-tertiary))' }}
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <SectionDivider />
    </>
  )
}
