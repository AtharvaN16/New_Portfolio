'use client'

import Image from 'next/image'
import { Accordion } from './pratt-shared'

export function PrattIntervention1PhasesSection() {
  return (
    <>
        {/* Phase 1 accordion */}
        <Accordion title="Phase 1 - Learning">
          <p
            className="text-sm md:text-[16px] italic mb-8 md:mb-10"
            style={{ color: 'rgb(var(--color-text-tertiary))' }}
          >
            Tools introduced during onboarding
          </p>
          <p
            className="text-base md:text-[18px] font-normal leading-relaxed mb-16 md:mb-20"
            style={{ color: 'rgb(var(--color-text-color90))' }}
          >
            These tools are used during the Initial training sessions to
            help new ambassadors observe carefully and set personal goals
            before they lead tours on their own.
          </p>

          {[
            {
              name: 'Shadow Note Card',
              imageSrc:
                '/images/case-studies/pratt-institute-visitor-experience/shadow-note-card.avif',
              imageAlt: 'Shadow Note Card template for new ambassador onboarding',
              whatItIs:
                'This is used during the first two weeks when a new recruit shadows a senior ambassador. It prompts them to note three things to observe, listen for a moment of visitor connection, and write one question to ask the senior ambassador.',
              purpose:
                'Ambassadors previously learned the role inconsistently. This tool ensures new ambassadors observe tours purposefully rather than passively and start building clarity about effective tour delivery.',
            },
            {
              name: 'Service Promise Card',
              imageSrc:
                '/images/case-studies/pratt-institute-visitor-experience/service-promise-card.avif',
              imageAlt: 'Service Promise Card template for ambassador training',
              whatItIs:
                'It\'s a card where ambassadors write a "We Promise" statement to visitors and then describe how they will keep that promise in real life, focusing on Pratt\'s values (creativity, belonging, and inclusivity).',
              purpose:
                "The goal was for all ambassadors to understand and apply Pratt's values in their behavior, creating a single, consistent way to welcome and communicate with visitors.",
            },
            {
              name: 'Commitment Card',
              imageSrc:
                '/images/case-studies/pratt-institute-visitor-experience/commitment-card.avif',
              imageAlt: 'Commitment Card template for ambassador self-improvement',
              whatItIs:
                'The Commitment Card is a tool used at the end of the first training workshop where new ambassadors focus on making the material immediately useful by identifying one small, specific action they will try on their next tour, along with how they plan to put it into action. This simple process helps new ambassadors bridge the gap between learning theory and practicing behavior.',
              purpose:
                'The card helps new ambassadors build confidence by starting small and develops a habit of steady improvement from the beginning.',
            },
          ].map(({ name, imageSrc, imageAlt, whatItIs, purpose }) => (
            <div key={name} className="mb-16 md:mb-20">
              <h5 className="text-base md:text-[20px] font-bold text-text-primary mb-8 md:mb-10">
                {name}
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-8 md:gap-12 items-start">
                <figure>
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    width={530}
                    height={780}
                    className="w-full h-auto"
                    quality={90}
                    sizes="(max-width: 768px) 100vw, 380px"
                  />
                  <figcaption
                    className="mt-3 text-sm italic"
                    style={{ color: 'rgb(var(--color-text-tertiary))' }}
                  >
                    {name}
                  </figcaption>
                </figure>
                <div className="space-y-8 md:space-y-10">
                  <div>
                    <h6 className="text-base md:text-[18px] font-bold text-text-primary mb-3">
                      What it is?
                    </h6>
                    <p
                      className="text-base md:text-[18px] font-normal leading-relaxed"
                      style={{ color: 'rgb(var(--color-text-tertiary))' }}
                    >
                      {whatItIs}
                    </p>
                  </div>
                  <div>
                    <h6 className="text-base md:text-[18px] font-bold text-text-primary mb-3">
                      Purpose
                    </h6>
                    <p
                      className="text-base md:text-[18px] font-normal leading-relaxed"
                      style={{ color: 'rgb(var(--color-text-tertiary))' }}
                    >
                      {purpose}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Accordion>

        {/* Phase 2 accordion */}
        <Accordion title="Phase 2 - Doing">
          <p
            className="text-sm md:text-[16px] italic mb-12 md:mb-16"
            style={{ color: 'rgb(var(--color-text-tertiary))' }}
          >
            Real-Time Support for Consistent Tours
          </p>

          {/* Cue Cards */}
          <h5 className="text-base md:text-[20px] font-bold text-text-primary mb-8 md:mb-10">
            Cue Cards
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-8 md:gap-12 items-start mb-12 md:mb-16">
            <figure>
              <Image
                src="/images/case-studies/pratt-institute-visitor-experience/cue-cards.avif"
                alt="Physical cue card deck showing four cards: tour guide cover, opening script, student union, and foundation spaces"
                width={560}
                height={560}
                className="w-full h-auto"
                quality={90}
                sizes="(max-width: 768px) 100vw, 380px"
              />
              <figcaption
                className="mt-3 text-sm italic"
                style={{ color: 'rgb(var(--color-text-tertiary))' }}
              >
                Cue cards
              </figcaption>
            </figure>
            <div className="space-y-8 md:space-y-10">
              <div>
                <h6 className="text-base md:text-[18px] font-bold text-text-primary mb-3">
                  What it is?
                </h6>
                <p
                  className="text-base md:text-[18px] font-normal leading-relaxed"
                  style={{ color: 'rgb(var(--color-text-tertiary))' }}
                >
                  These are Cue Cards (physical or digital) that
                  ambassadors can quickly check during tours to remember
                  key facts and talking points. These Cue Cards give
                  ambassadors quick access to key facts and talking points
                  they can reference while leading tours.
                </p>
              </div>
              <div>
                <h6 className="text-base md:text-[18px] font-bold text-text-primary mb-3">
                  Purpose
                </h6>
                <p
                  className="text-base md:text-[18px] font-normal leading-relaxed"
                  style={{ color: 'rgb(var(--color-text-tertiary))' }}
                >
                  The Cue Cards were introduced to make information easier
                  to recall, reduce ambassador stress and anxiety, and
                  ensure the tours were delivered consistently.
                </p>
              </div>
            </div>
          </div>

          {/* Mobile mockup */}
          <figure className="w-full">
            <Image
              src="/images/case-studies/pratt-institute-visitor-experience/cue-cards-mobile.avif"
              alt="Three iPhone mockups showing the digital cue card deck: cover card, opening script card, and student union card"
              width={1400}
              height={700}
              className="w-full h-auto"
              quality={85}
              sizes="(max-width: 768px) 100vw, 1044px"
            />
            <figcaption
              className="mt-3 text-sm italic"
              style={{ color: 'rgb(var(--color-text-tertiary))' }}
            >
              Cue cards on mobile
            </figcaption>
          </figure>
        </Accordion>

        {/* Phase 3 accordion */}
        <Accordion title="Phase 3 - Reviewing">
          <p
            className="text-sm md:text-[16px] italic mb-8 md:mb-10"
            style={{ color: 'rgb(var(--color-text-tertiary))' }}
          >
            Mid-Semester Check-In Tools
          </p>
          <p
            className="text-base md:text-[18px] font-normal leading-relaxed mb-16 md:mb-20"
            style={{ color: 'rgb(var(--color-text-color90))' }}
          >
            This is a very short, focused session, only 15&ndash;20
            minutes long, that happens halfway through the semester.
          </p>

          {[
            {
              name: 'Mid-Point Reflection Sheet',
              imageSrc:
                '/images/case-studies/pratt-institute-visitor-experience/reflection-sheet.avif',
              imageAlt: 'Mid-Point Reflection Sheet with emoji mood scale and open-text fields',
              imageW: 780,
              imageH: 1100,
              whatItIs:
                'A short reflection tool used in the midpoint workshop where ambassadors describe how tours felt that month and note one moment that stood out.',
              purpose:
                'The tool was designed to encourage the team to take a moment to assess their mental and emotional state, ensuring they are mindful of how the work is affecting them, and to capture meaningful or memorable moments that occurred during their recent tour experience.',
            },
            {
              name: 'Challenge Cluster Sheet',
              imageSrc:
                '/images/case-studies/pratt-institute-visitor-experience/challenge-cluster.avif',
              imageAlt: 'Challenge Cluster worksheet with two columns: What\'s really happening and Quick Wins',
              imageW: 1200,
              imageH: 700,
              whatItIs:
                'This worksheet helps ambassadors, right after they reflect, to list their tour challenges, discover why those problems are happening, and suggest quick, simple solutions. It was added so the team can better understand issues and make fast improvements.',
              purpose:
                'This tool was added to help the ambassador team identify the underlying reasons for challenges they face on tours and to quickly generate simple, immediate improvements they can implement.',
            },
            {
              name: 'One Win + One Shift Card',
              imageSrc:
                '/images/case-studies/pratt-institute-visitor-experience/one-win-card.avif',
              imageAlt: 'One Win + One Shift card: dark cover card and cream answer card side by side',
              imageW: 800,
              imageH: 500,
              whatItIs:
                'This card closes the workshop by having ambassadors identify a success they are proud of and commit to a minor adjustment for their next tour.',
              purpose:
                'The card is used to end the workshop positively, making sure ambassadors feel appreciated and have a clear, practical goal for next time.',
            },
          ].map(({ name, imageSrc, imageAlt, imageW, imageH, whatItIs, purpose }) => (
            <div key={name} className="mb-16 md:mb-20">
              <h5 className="text-base md:text-[20px] font-bold text-text-primary mb-8 md:mb-10">
                {name}
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-8 md:gap-12 items-start">
                <figure>
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    width={imageW}
                    height={imageH}
                    className="w-full h-auto"
                    quality={90}
                    sizes="(max-width: 768px) 100vw, 380px"
                  />
                  <figcaption
                    className="mt-3 text-sm italic"
                    style={{ color: 'rgb(var(--color-text-tertiary))' }}
                  >
                    {name}
                  </figcaption>
                </figure>
                <div className="space-y-8 md:space-y-10">
                  <div>
                    <h6 className="text-base md:text-[18px] font-bold text-text-primary mb-3">
                      What it is?
                    </h6>
                    <p
                      className="text-base md:text-[18px] font-normal leading-relaxed"
                      style={{ color: 'rgb(var(--color-text-tertiary))' }}
                    >
                      {whatItIs}
                    </p>
                  </div>
                  <div>
                    <h6 className="text-base md:text-[18px] font-bold text-text-primary mb-3">
                      Purpose
                    </h6>
                    <p
                      className="text-base md:text-[18px] font-normal leading-relaxed"
                      style={{ color: 'rgb(var(--color-text-tertiary))' }}
                    >
                      {purpose}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Accordion>
    </>
  )
}
