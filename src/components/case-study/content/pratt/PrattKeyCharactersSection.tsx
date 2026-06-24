'use client'

import Image from 'next/image'
import { AnimatedText } from '@/components/ui/AnimatedText'
import { SectionDivider } from './pratt-shared'

export function PrattKeyCharactersSection() {
  return (
    <>
        {/* ── Section: Key Characters ── */}
        <h3
          className="text-sm md:text-base font-semibold normal-case mb-6 md:mb-[28px]"
          style={{ color: 'rgb(var(--color-text-tertiary))' }}
        >
          Ecosystem Loops
        </h3>

        <AnimatedText variant="heading"
          text="Key Characters in the Visitor Experience"
          animationType="fadeIn"
          alwaysAnimate={false}
          delay={0}
          className="text-xl md:text-2xl font-bold text-text-primary mb-6 md:mb-8 leading-tight tracking-[-0.05em]"
        />

        <div className="space-y-6 md:space-y-8 mb-12 md:mb-16">
          <p
            className="text-base md:text-[18px] font-normal leading-normal"
            style={{ color: 'rgb(var(--color-text-color90))' }}
          >
            The visitor experience at Pratt involves multiple actors—individuals,
            teams, and departments—working together across different touchpoints
            to create a seamless experience for visitors. Each plays a specific
            role, and the value they exchange with each other creates loops that
            keep the system running and improving.
          </p>
          <p
            className="text-base md:text-[18px] font-normal leading-normal"
            style={{ color: 'rgb(var(--color-text-color90))' }}
          >
            The ecosystem loops below show how these actors work together and
            what they contribute to the system.
          </p>
        </div>

        {/* Ecosystem Loops image */}
        <figure className="w-full">
          <Image
            src="/images/case-studies/pratt-institute-visitor-experience/ecosystem-loops.avif"
            alt="Pratt Visitor Experience Ecosystem Loops diagram showing how Visitors, Student Ambassadors, Shamôr Peeler, Admissions Communication, and Counsellors exchange value"
            width={1207}
            height={876}
            className="w-full h-auto"
            quality={90}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 896px"
          />
          <figcaption
            className="mt-3 text-sm font-medium text-center"
            style={{ color: 'rgb(var(--color-text-tertiary))' }}
          >
            Ecosystem Loops
          </figcaption>
        </figure>

        {/* Actor descriptions */}
        <div className="mt-12 md:mt-16 space-y-10 md:space-y-12">
          {[
            {
              name: 'Visitors',
              body: 'Visitors are prospective students and parents exploring Pratt. As the primary users of this service, they interact with multiple touchpoints throughout their campus visit. Through their visit, they get to see the campus, ask questions, hear from current students, learn about the programs, and figure out if Pratt is right for them. Their feedback helps improve the service.',
            },
            {
              name: 'Associate Director of Visitor Services',
              body: null,
              bodyJsx: (
                <p
                  className="text-base md:text-[18px] font-normal leading-normal"
                  style={{ color: 'rgb(var(--color-text-color90))' }}
                >
                  <strong>Shamôr Peeler</strong>, the Associate Director
                  of Visitor Services and our client and point of
                  contact, recruits and trains ambassadors, manages tour
                  logistics, scheduling, and follow-up communications. He
                  receives insights from the ambassadors about visitor
                  questions and concerns that feed back to Communications.
                </p>
              ),
            },
            {
              name: 'Admissions Communication',
              body: 'Communication Teams drive initial interest through social media, videos, and emails. This brings in prospective students who schedule tours, providing Shamôr with visitors.',
            },
            {
              name: 'Student Ambassadors',
              body: "Ambassadors give campus tours, answer questions, and share their student experience, shaping visitors' first impressions of Pratt. They earn pay, gain resume experience, and build staff connections while improving their communication skills through visitor interactions.",
            },
            {
              name: 'Counsellors',
              body: "The Counseling Team handle program-specific, academic, and financial questions that ambassadors aren't allowed to answer. They receive leads from Shamôr after tours and help visitors move closer to application.",
            },
          ].map((actor) => (
            <div key={actor.name}>
              <h4 className="text-base md:text-[18px] font-bold text-text-primary mb-3 md:mb-4">
                {actor.name}
              </h4>
              {actor.bodyJsx ?? (
                <p
                  className="text-base md:text-[18px] font-normal leading-normal"
                  style={{ color: 'rgb(var(--color-text-color90))' }}
                >
                  {actor.body}
                </p>
              )}
            </div>
          ))}
        </div>

        <SectionDivider />
    </>
  )
}
