'use client'

import Image from 'next/image'

export function PrattIntervention2ChangesEarlySection() {
  return (
    <>
        {/* Change 1 */}
        <h4 className="text-base md:text-lg font-bold text-text-primary mb-8 md:mb-10">
          Change 1: Welcome Pratt One-Pager
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-8 md:gap-12 items-start mb-20 md:mb-24">
          <figure>
            <Image
              src="/images/case-studies/pratt-institute-visitor-experience/welcome-one-pager.avif"
              alt="Redesigned Welcome to Pratt one-pager listing resources inside the visitor folder"
              width={800}
              height={1100}
              className="w-full h-auto"
              quality={90}
              sizes="(max-width: 768px) 100vw, 380px"
            />
            <figcaption
              className="mt-3 text-sm italic"
              style={{ color: 'rgb(var(--color-text-tertiary))' }}
            >
              Welcome packet one-pager
            </figcaption>
          </figure>
          <div className="space-y-6 md:space-y-8">
            <p
              className="text-base md:text-[18px] font-normal leading-normal"
              style={{ color: 'rgb(var(--color-text-tertiary))' }}
            >
              To improve clarity at the moment visitors open the packet,
              we recommend updating the existing one-pager to include a
              concise overview of the materials inside. The current
              version effectively sets a welcoming tone, but it does not
              clearly explain what resources are included or how visitors
              should use them. The revised layout preserves the original
              warmth while adding explicit guidance to help visitors
              orient themselves.
            </p>
            <div>
              <p className="text-base md:text-[18px] font-semibold text-text-primary mb-4">
                By updating this one-pager, Visitor Services can:
              </p>
              <ul className="space-y-3">
                {[
                  'Reduce confusion about whether all necessary materials are present in the folder',
                  'Make admissions contact information easier to locate by bolding and repositioning key details',
                  "Reinforce Pratt\u2019s hospitality by proactively explaining how each resource supports the visitor\u2019s journey",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="mt-[0.55em] h-1.5 w-1.5 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor:
                          'rgb(var(--color-text-tertiary))',
                      }}
                    />
                    <span
                      className="text-base md:text-[18px] font-normal leading-normal"
                      style={{ color: 'rgb(var(--color-text-tertiary))' }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Change 2 */}
        <h4 className="text-base md:text-lg font-bold text-text-primary mb-8 md:mb-10">
          Change 2: Redesigned Campus Map
        </h4>
        <figure className="w-full mb-8 md:mb-10 overflow-x-auto">
          <Image
            src="/images/case-studies/pratt-institute-visitor-experience/campus-map-redesign.avif"
            alt="Redesigned Pratt Brooklyn Campus map with color-coded tour stops, notes area, QR code for feedback, and digital guide QR code"
            width={1600}
            height={1100}
            className="w-full h-auto min-w-[600px]"
            quality={90}
            sizes="(max-width: 768px) 200vw, 896px"
          />
        </figure>
        <p
          className="text-base md:text-[18px] font-normal leading-normal mb-6 md:mb-8"
          style={{ color: 'rgb(var(--color-text-tertiary))' }}
        >
          During campus tours, visitors receive a lot of information in a
          short amount of time and often have to rely on memory once they
          leave campus. It can be hard to remember specific buildings,
          tour stops, or questions, especially when ambassadors are not
          able to answer everything in the moment. Since prospective
          students usually visit multiple campuses, Pratt&apos;s
          information can easily get mixed in with experiences from other
          schools they visit. To address this, we redesigned the campus
          map to help visitors track their tour, capture questions, and
          continue engaging with Pratt after they leave campus.
        </p>
        <div className="mb-20 md:mb-24">
          <p className="text-base md:text-[18px] font-semibold text-text-primary mb-4">
            By introducing a redesigned campus map, Visitor Services can:
          </p>
          <ul className="space-y-3">
            {[
              'Help visitors remember what they saw during the tour with clearly marked, color-coded tour stops',
              'Provide space for visitors to write down questions or notes for later follow-up',
              'Increase feedback survey completion by making the QR code visible and easy to access after the tour',
              'Connect the physical welcome packet to an always-updated digital Visitor Welcome Guide through a QR code',
              'Support post-tour independence as visitors continue exploring campus on their own or revisit information later',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="mt-[0.55em] h-1.5 w-1.5 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor: 'rgb(var(--color-text-tertiary))',
                  }}
                />
                <span
                  className="text-base md:text-[18px] font-normal leading-normal"
                  style={{ color: 'rgb(var(--color-text-tertiary))' }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
    </>
  )
}
