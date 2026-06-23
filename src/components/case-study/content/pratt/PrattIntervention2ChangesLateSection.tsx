'use client'

import Image from 'next/image'

export function PrattIntervention2ChangesLateSection() {
  return (
    <>
        {/* Change 3 */}
        <h4 className="text-lg md:text-[22px] font-bold text-text-primary mb-8 md:mb-10">
          Change 3: Digital Visitor Welcome Guide
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-8 md:gap-12 items-start mb-12 md:mb-16">
          <figure>
            <Image
              src="/images/case-studies/pratt-institute-visitor-experience/visitor-welcome-guide.avif"
              alt="iPhone mockup showing the Digital Visitor Welcome Guide on the Pratt admissions website"
              width={500}
              height={1000}
              className="w-full h-auto"
              quality={90}
              sizes="(max-width: 768px) 100vw, 300px"
            />
            <figcaption
              className="mt-3 text-sm italic"
              style={{ color: 'rgb(var(--color-text-tertiary))' }}
            >
              Digital Visitor Welcome Guide &ndash; Mobile
            </figcaption>
          </figure>
          <div className="space-y-6 md:space-y-8">
            <p
              className="text-base md:text-[18px] font-normal leading-relaxed"
              style={{ color: 'rgb(var(--color-text-tertiary))' }}
            >
              To address frequently requested information that cannot fit
              into a printed packet, we recommend creating a dedicated
              digital Visitor Welcome Guide on the Admissions website.
              This online resource can host richer explanations, visuals,
              and program-specific details, supporting visitors throughout
              their decision-making process long after they leave campus.
            </p>
            <div>
              <p className="text-base md:text-[18px] font-semibold text-text-primary mb-4">
                By introducing a digital guide, Visitor Services can:
              </p>
              <ul className="space-y-3">
                {[
                  'Provide comprehensive answers to the most common visitor questions (financial aid, study abroad, student life, etc.)',
                  'Reduce repetitive inquiries directed to staff by centralizing key information',
                  'Offer accessible, mobile-friendly content during and after the visit',
                  'Maintain accuracy with real-time updates that printed materials cannot accommodate',
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
                      className="text-base md:text-[18px] font-normal leading-relaxed"
                      style={{
                        color: 'rgb(var(--color-text-tertiary))',
                      }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <p
          className="text-base md:text-[20px] font-normal leading-relaxed mb-12 md:mb-16"
          style={{ color: 'rgb(var(--color-text-color90))' }}
        >
          This digital extension bridges the gap between in-person
          experiences and online research, ensuring visitors have a
          clear, reliable source of truth at every stage of their
          engagement with Pratt.
        </p>
        <figure className="w-full mb-6">
          <Image
            src="/images/case-studies/pratt-institute-visitor-experience/visitor-guide-screens-1.avif"
            alt="Three iPhone mockups showing the Digital Visitor Welcome Guide: Financial Aid Essentials, Housing and Dorm Life, and Dining and Student Life sections"
            width={1500}
            height={750}
            className="w-full h-auto"
            quality={85}
            sizes="(max-width: 768px) 100vw, 1044px"
          />
        </figure>
        <figure className="w-full mb-20 md:mb-24">
          <Image
            src="/images/case-studies/pratt-institute-visitor-experience/visitor-guide-screens-2.avif"
            alt="Three iPhone mockups showing the Digital Visitor Welcome Guide: Study Abroad Programs, Career and Internships, and What's Next After Your Visit sections"
            width={1500}
            height={750}
            className="w-full h-auto"
            quality={85}
            sizes="(max-width: 768px) 100vw, 1044px"
          />
        </figure>

        {/* Change 4 */}
        <h4 className="text-lg md:text-[22px] font-bold text-text-primary mb-8 md:mb-10">
          Change 4: Quick FAQ Guide
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-8 md:gap-12 items-start">
          <figure>
            <Image
              src="/images/case-studies/pratt-institute-visitor-experience/faq-guide.avif"
              alt="Pratt Institute Quick FAQ Guide cover page with yellow title and admissions contact details"
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
              FAQ Guide
            </figcaption>
          </figure>
          <div className="space-y-6 md:space-y-8">
            <p
              className="text-base md:text-[18px] font-normal leading-relaxed"
              style={{ color: 'rgb(var(--color-text-tertiary))' }}
            >
              To address the information gaps repeatedly identified in
              visitor surveys, we reorganized Pratt&apos;s original FAQ
              sheet, which was long, text-heavy, and lacked clear
              hierarchy, into a more structured, intuitive, and scannable
              format. The new FAQ groups all questions into five core
              categories aligned with what prospective students and
              families care about most:
            </p>
            <ol className="space-y-2 list-none">
              {[
                'Application & Admissions',
                'Financial Aid, Scholarships & Career Preparation',
                'Study Abroad Opportunities',
                'Student Life & Campus Experience',
                'Housing, Dining & Daily Living',
              ].map((cat, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="text-base md:text-[18px] font-normal flex-shrink-0 w-5"
                    style={{ color: 'rgb(var(--color-case-study-gold))' }}
                  >
                    {i + 1}.
                  </span>
                  <span
                    className="text-base md:text-[18px] font-normal leading-relaxed"
                    style={{ color: 'rgb(var(--color-text-tertiary))' }}
                  >
                    {cat}
                  </span>
                </li>
              ))}
            </ol>
            <p
              className="text-base md:text-[18px] font-normal leading-relaxed"
              style={{ color: 'rgb(var(--color-text-tertiary))' }}
            >
              This reorganization transforms the FAQ from a dense
              information sheet into a clear reference tool that visitors
              can navigate quickly during and after their tour.
            </p>
          </div>
        </div>
    </>
  )
}
