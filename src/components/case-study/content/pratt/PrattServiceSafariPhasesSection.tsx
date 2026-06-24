'use client'

import Image from 'next/image'
import { OpportunityAreas } from './pratt-shared'

export function PrattServiceSafariPhasesSection() {
  return (
    <>
        {/* Phase 1: Discover & Register */}
        <div className="mb-16 md:mb-20">
          <h4 className="text-sm md:text-lg font-bold text-text-primary mb-6 md:mb-8">
            1 — Discover &amp; Register
          </h4>
          <figure className="w-full mb-8">
            <Image
              src="/images/case-studies/pratt-institute-visitor-experience/safari-p1.avif"
              alt="Collage of Pratt website, scheduling page, and confirmation emails for the Discover and Register phase"
              width={1600}
              height={1000}
              className="w-full h-auto"
              quality={85}
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </figure>
          <ol className="space-y-3 mb-6 list-none">
            {[
              'You first come across Pratt through web search, social media, signages, or a recommendation.',
              'You decide to book a campus tour through the website.',
              'A tour or info session stands out, and you select it.',
              'The next step is completing the registration form.',
              'You get a confirmation email with the visit details.',
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-4">
                <span
                  className="text-base md:text-[18px] font-semibold flex-shrink-0 w-5"
                  style={{ color: 'rgb(var(--color-text-tertiary))' }}
                >
                  {i + 1}.
                </span>
                <span
                  className="text-base md:text-[18px] font-normal leading-normal"
                  style={{ color: 'rgb(var(--color-text-color90))' }}
                >
                  {step}
                </span>
              </li>
            ))}
          </ol>
          <OpportunityAreas
            problems={[
              "The confirmation email after registration doesn't include an \"Add to Calendar\" option, making it easy for visitors to forget their scheduled visit.",
            ]}
            opportunities={[
              'Add "Add to Calendar" links (Google/Apple/Outlook) directly in confirmation emails so visitors can save their tour date.',
            ]}
          />
        </div>

        {/* Phase 2: Pre-Arrival */}
        <div className="mb-16 md:mb-20">
          <h4 className="text-sm md:text-lg font-bold text-text-primary mb-6 md:mb-8">
            2 — Pre-Arrival
          </h4>
          <ol className="space-y-3 mb-6 list-none">
            {[
              'Before the tour, you get a reminder email with details about the start location.',
              'You review the email and check for transportation, parking, and accessibility information.',
              'You finalize your travel option and check arrival time.',
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-4">
                <span
                  className="text-base md:text-[18px] font-semibold flex-shrink-0 w-5"
                  style={{ color: 'rgb(var(--color-text-tertiary))' }}
                >
                  {i + 1}.
                </span>
                <span
                  className="text-base md:text-[18px] font-normal leading-normal"
                  style={{ color: 'rgb(var(--color-text-color90))' }}
                >
                  {step}
                </span>
              </li>
            ))}
          </ol>
          <OpportunityAreas
            problems={[
              'The pre-arrival email is text-heavy, making it easy for visitors to miss important information.',
              "Accessibility and transportation details aren't clearly explained in the reminder email.",
            ]}
            opportunities={[
              'Use visual layouts instead of long text blocks—include maps, arrival directions, accessibility icons, and photos.',
              'Create a "Know Before You Visit" guide with a Myrtle Hall photo, parking/shuttle info, and accessibility details, linked from reminder emails.',
              'Add a "Need help on arrival?" section with a contact phone number or monitored inbox for day-of questions.',
            ]}
          />
        </div>

        {/* Phase 3: Arrival & Check-In */}
        <div className="mb-16 md:mb-20">
          <h4 className="text-sm md:text-lg font-bold text-text-primary mb-6 md:mb-8">
            3 — Arrival &amp; Check-In
          </h4>
          <figure className="w-full mb-8">
            <Image
              src="/images/case-studies/pratt-institute-visitor-experience/safari-p3.avif"
              alt="Photos from the Arrival and Check-In phase: Myrtle Hall exterior, admissions office lobby, directional signage, and welcome packet"
              width={1600}
              height={1000}
              className="w-full h-auto"
              quality={85}
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </figure>
          <ol className="space-y-3 mb-6 list-none">
            {[
              'You arrive at the campus.',
              'You look for signage or directions to Myrtle Hall.',
              'The security at Myrtle Hall logs your visit.',
              'You then go to the admissions office on the second floor where you check in at the front desk.',
              'After completing the check-in, you receive a welcome packet.',
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-4">
                <span
                  className="text-base md:text-[18px] font-semibold flex-shrink-0 w-5"
                  style={{ color: 'rgb(var(--color-text-tertiary))' }}
                >
                  {i + 1}.
                </span>
                <span
                  className="text-base md:text-[18px] font-normal leading-normal"
                  style={{ color: 'rgb(var(--color-text-color90))' }}
                >
                  {step}
                </span>
              </li>
            ))}
          </ol>
          <OpportunityAreas
            problems={[
              'Limited building signage causes visitors to frequently ask for directions.',
              'No exterior sign identifies Myrtle Hall, confusing first-time visitors.',
              'Manual check-in slows down the process during busy tours.',
            ]}
            opportunities={[
              'Add clear exterior signage and a visible "Welcome to Myrtle Hall / Admissions Office" banner near the entrance.',
              'Install directional signs from nearby bus stops and crosswalks to guide visitors to the entrance.',
              'Implement QR code self-check-in or a tablet kiosk to speed up the process.',
            ]}
          />
        </div>

        {/* Phase 4: Experiencing the Tour */}
        <div className="mb-16 md:mb-20">
          <h4 className="text-sm md:text-lg font-bold text-text-primary mb-6 md:mb-8">
            4 — Experiencing the Tour
          </h4>
          <figure className="w-full mb-8">
            <Image
              src="/images/case-studies/pratt-institute-visitor-experience/safari-p4.avif"
              alt="Photos from the campus tour: info session, campus model, student gathering spaces, and outdoor walking tour"
              width={1600}
              height={1100}
              className="w-full h-auto"
              quality={85}
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </figure>
          <ol className="space-y-3 mb-6 list-none">
            {[
              'The visit begins with an info session offering an overview of the programs and the application process.',
              'After that, the campus tour begins, led by student ambassadors.',
              'During the tour, you take photos, ask questions, and learn from the ambassadors about their experiences as students at Pratt.',
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-4">
                <span
                  className="text-base md:text-[18px] font-semibold flex-shrink-0 w-5"
                  style={{ color: 'rgb(var(--color-text-tertiary))' }}
                >
                  {i + 1}.
                </span>
                <span
                  className="text-base md:text-[18px] font-normal leading-normal"
                  style={{ color: 'rgb(var(--color-text-color90))' }}
                >
                  {step}
                </span>
              </li>
            ))}
          </ol>
          <OpportunityAreas
            problems={[
              'The information ambassadors provide lacks structure and varies based on who is giving the tour. Sometimes they need to ask other ambassadors to confirm details during tours.',
              'When groups are small, having too many ambassadors leads to confusion and fragmented storytelling.',
              'Visitors struggle to hear ambassadors during tours.',
            ]}
            opportunities={[
              'Develop a standardized tour script or key talking points to ensure consistency across all ambassadors.',
              "Create a training guide and route map to clarify each ambassador's responsibilities and avoid overlap.",
              'Provide portable microphones or voice amplifiers so ambassadors can be heard clearly by all visitors.',
            ]}
          />
        </div>

        {/* Phase 5: Post Visit */}
        <div className="mb-16 md:mb-20">
          <h4 className="text-sm md:text-lg font-bold text-text-primary mb-6 md:mb-8">
            5 — Post Visit
          </h4>
          <figure className="w-full mb-8">
            <Image
              src="/images/case-studies/pratt-institute-visitor-experience/safari-p5.avif"
              alt="Photos from the post-visit phase: feedback QR code, counselor meeting, and follow-up emails from Pratt Admissions"
              width={1600}
              height={1000}
              className="w-full h-auto"
              quality={85}
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </figure>
          <ol className="space-y-3 mb-6 list-none">
            {[
              'The tour ends and you return to the Office of Admissions.',
              'You scan a QR code at the front desk to complete a feedback survey.',
              'If you want, you can choose to schedule a one-on-one session with an admissions counselor.',
              'After the tour, you get a thank you email and follow-up resources are sent based on the program you showed interest in.',
              'For next steps, you can schedule a portfolio review.',
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-4">
                <span
                  className="text-base md:text-[18px] font-semibold flex-shrink-0 w-5"
                  style={{ color: 'rgb(var(--color-text-tertiary))' }}
                >
                  {i + 1}.
                </span>
                <span
                  className="text-base md:text-[18px] font-normal leading-normal"
                  style={{ color: 'rgb(var(--color-text-color90))' }}
                >
                  {step}
                </span>
              </li>
            ))}
          </ol>
          <OpportunityAreas
            problems={[
              'Automated follow-up emails are generic and not personalized to the visitor.',
              "Visitors often don't fill out the feedback survey.",
              "If a visitor couldn't make it to the tour, there's no follow-up asking if they'd like to reschedule.",
            ]}
            opportunities={[
              'Personalize follow-up emails by visitor segment, including relevant program links, next steps, or counselor info. Add a brief personal touch from the ambassador or Shamôr to make visitors feel remembered and valued.',
              'Actively push visitors to fill the survey, and provide the option to fill it at a later point—in a follow-up email or in the artifacts they take home.',
              'For no-shows, send a follow-up email expressing understanding and giving them the option to reschedule with an appointment link.',
            ]}
          />
        </div>
    </>
  )
}
