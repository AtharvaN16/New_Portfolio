'use client'

import { AnimatePresence, m } from 'framer-motion'
import { CaseStudyReadMore } from '@/components/case-study/CaseStudyReadMore'
import { useState } from 'react'
import Image from 'next/image'
import { AnimatedTitle } from '@/components/ui/AnimatedTitle'

interface PrattVisitorExperienceContentProps {
  isContentRevealed: boolean
  onToggleContent: () => void
}

function Accordion({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 md:py-6 text-left gap-4"
      >
        <div>
          <span className="block text-base md:text-[20px] font-bold text-text-primary">
            {title}
          </span>
          {subtitle && (
            <span
              className="block text-sm md:text-[16px] font-normal mt-1"
              style={{ color: 'rgb(var(--color-text-tertiary))' }}
            >
              {subtitle}
            </span>
          )}
        </div>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className="flex-shrink-0 transition-transform duration-300"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          aria-hidden="true"
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-8 md:pb-10">{children}</div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function SectionDivider() {
  return (
    <div
      className="border-t my-24 md:my-32"
      style={{ borderColor: 'rgb(var(--color-text-color10))' }}
    />
  )
}

function OpportunityAreas({
  problems,
  opportunities,
}: {
  problems: string[]
  opportunities: string[]
}) {
  return (
    <div
      className="mt-10 md:mt-12 rounded-xl p-6 md:p-8"
      style={{ backgroundColor: 'rgb(10 10 10)' }}
    >
      <h4 className="text-base md:text-[18px] font-bold text-white mb-6 md:mb-8">
        Opportunity areas in the current journey
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div
            className="inline-block px-3 py-1.5 rounded text-sm font-bold text-white mb-4"
            style={{ backgroundColor: 'rgb(80 22 14)' }}
          >
            Problems
          </div>
          <ul className="space-y-3">
            {problems.map((p, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-[0.55em] h-1.5 w-1.5 rounded-full bg-white/50 flex-shrink-0" />
                <span className="text-sm md:text-[16px] text-white/80 leading-relaxed">{p}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div
            className="inline-block px-3 py-1.5 rounded text-sm font-bold text-white mb-4"
            style={{ backgroundColor: 'rgb(18 45 28)' }}
          >
            Opportunity
          </div>
          <ul className="space-y-3">
            {opportunities.map((o, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-[0.55em] h-1.5 w-1.5 rounded-full bg-white/50 flex-shrink-0" />
                <span className="text-sm md:text-[16px] text-white/80 leading-relaxed">{o}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export function PrattVisitorExperienceContent({
  isContentRevealed,
  onToggleContent,
}: PrattVisitorExperienceContentProps) {
  return (
    <m.section
      className="w-full px-6 2xl:px-[140px] py-16 md:py-24 max-w-[1920px] mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <div className="max-w-[1044px] mx-auto text-left">
        <h3 className="text-lg md:text-[28px] font-bold text-text-primary mb-6 md:mb-[28px]">
          Abstract
        </h3>

        <div className="space-y-6 md:space-y-8">
          <p className="text-base md:text-[18px] font-normal text-text-body leading-relaxed">
            Every year, thousands of prospective students visit Pratt
            Institute&apos;s campus to imagine themselves as part of the Pratt
            community. These visits are guided by student ambassadors, who lead
            campus tours, answer questions, and share their own
            experiences—shaping visitors&apos; first impressions of Pratt.
          </p>
          <p className="text-base md:text-[18px] font-normal text-text-body leading-relaxed">
            Our team worked to improve this experience by mapping the current
            visitor experience, identifying gaps across key touchpoints, and
            designing targeted interventions. The goal was to ensure every
            visitor leaves with <strong>clarity</strong>,{' '}
            <strong>confidence</strong>, a feeling of being{' '}
            <strong>supported</strong>, and a <strong>memorable</strong>{' '}
            experience.
          </p>
        </div>

        <div className="mt-12 md:mt-16">
          <h3 className="text-lg md:text-[24px] font-bold text-text-primary mb-6 md:mb-[28px]">
            My Role
          </h3>

          <div className="space-y-6 md:space-y-8">
            <p className="text-base md:text-[18px] font-medium text-text-body leading-relaxed">
              As part of a three-person service design team, I contributed to:
            </p>
            <ul className="space-y-2 md:space-y-3 list-disc list-inside ml-2">
              <li className="text-base md:text-[18px] font-normal text-text-body leading-relaxed">
                Service safari documentation and journey mapping
              </li>
              <li className="text-base md:text-[18px] font-normal text-text-body leading-relaxed">
                Survey analysis and research synthesis
              </li>
              <li className="text-base md:text-[18px] font-normal text-text-body leading-relaxed">
                Co-design workshop planning and facilitation
              </li>
              <li className="text-base md:text-[18px] font-normal text-text-body leading-relaxed">
                Intervention strategy and content design
              </li>
            </ul>
          </div>
        </div>

        <CaseStudyReadMore
          readTime="12 min read"
          isContentRevealed={isContentRevealed}
          onToggleContent={onToggleContent}
        >
              <div>
                {/* ── Section: Key Characters ── */}
                <h3
                  className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]"
                  style={{ color: 'rgb(var(--color-text-tertiary))' }}
                >
                  Ecosystem Loops
                </h3>

                <AnimatedTitle
                  text="Key Characters in the Visitor Experience"
                  animationType="fadeIn"
                  alwaysAnimate={false}
                  delay={0}
                  className="text-2xl md:text-[40px] font-bold text-text-primary mb-6 md:mb-8 leading-tight tracking-[-0.05em]"
                />

                <div className="space-y-6 md:space-y-8 mb-12 md:mb-16">
                  <p
                    className="text-base md:text-[18px] font-normal leading-relaxed"
                    style={{ color: 'rgb(var(--color-text-color90))' }}
                  >
                    The visitor experience at Pratt involves multiple actors—individuals,
                    teams, and departments—working together across different touchpoints
                    to create a seamless experience for visitors. Each plays a specific
                    role, and the value they exchange with each other creates loops that
                    keep the system running and improving.
                  </p>
                  <p
                    className="text-base md:text-[18px] font-normal leading-relaxed"
                    style={{ color: 'rgb(var(--color-text-color90))' }}
                  >
                    The ecosystem loops below show how these actors work together and
                    what they contribute to the system.
                  </p>
                </div>

                {/* Ecosystem Loops image */}
                <figure className="w-full">
                  <Image
                    src="/images/case-studies/pratt-institute-visitor-experience/ecosystem-loops.png"
                    alt="Pratt Visitor Experience Ecosystem Loops diagram showing how Visitors, Student Ambassadors, Shamôr Peeler, Admissions Communication, and Counsellors exchange value"
                    width={1207}
                    height={876}
                    className="w-full h-auto"
                    quality={90}
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1044px"
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
                          className="text-base md:text-[18px] font-normal leading-relaxed"
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
                          className="text-base md:text-[18px] font-normal leading-relaxed"
                          style={{ color: 'rgb(var(--color-text-color90))' }}
                        >
                          {actor.body}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <SectionDivider />

                {/* ── Cover image: Service Safari ── */}
                <figure className="w-full mb-16 md:mb-20">
                  <Image
                    src="/images/case-studies/pratt-institute-visitor-experience/safari-cover.webp"
                    alt="Prospective students and families walking through Pratt Institute campus on a tour"
                    width={1600}
                    height={600}
                    className="w-full h-auto"
                    quality={90}
                    sizes="(max-width: 768px) 100vw, 1044px"
                  />
                </figure>

                {/* ── Section: Service Safari ── */}
                <h3
                  className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]"
                  style={{ color: 'rgb(var(--color-text-tertiary))' }}
                >
                  Service Safari
                </h3>

                <AnimatedTitle
                  text="Understanding the Current Experience"
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
                    To understand how visitors currently experience a campus
                    visit at Pratt, we conducted service safaris—experienced
                    the service ourselves and mapped the journey from the
                    visitor&apos;s point of view. This firsthand perspective
                    allowed us to observe real behaviors, touchpoints, and pain
                    points as they occurred, rather than relying solely on
                    client input or our own assumptions. The following sections
                    walk through each phase of the visit as a prospective
                    student or parent would experience it today.
                  </p>
                </div>

                {/* Phase 1: Discover & Register */}
                <div className="mb-16 md:mb-20">
                  <h4 className="text-base md:text-[22px] font-bold text-text-primary mb-6 md:mb-8">
                    1 — Discover &amp; Register
                  </h4>
                  <figure className="w-full mb-8">
                    <Image
                      src="/images/case-studies/pratt-institute-visitor-experience/safari-p1.png"
                      alt="Collage of Pratt website, scheduling page, and confirmation emails for the Discover and Register phase"
                      width={1600}
                      height={1000}
                      className="w-full h-auto"
                      quality={85}
                      sizes="(max-width: 768px) 100vw, 1044px"
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
                          className="text-base md:text-[18px] font-normal leading-relaxed"
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
                  <h4 className="text-base md:text-[22px] font-bold text-text-primary mb-6 md:mb-8">
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
                          className="text-base md:text-[18px] font-normal leading-relaxed"
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
                  <h4 className="text-base md:text-[22px] font-bold text-text-primary mb-6 md:mb-8">
                    3 — Arrival &amp; Check-In
                  </h4>
                  <figure className="w-full mb-8">
                    <Image
                      src="/images/case-studies/pratt-institute-visitor-experience/safari-p3.webp"
                      alt="Photos from the Arrival and Check-In phase: Myrtle Hall exterior, admissions office lobby, directional signage, and welcome packet"
                      width={1600}
                      height={1000}
                      className="w-full h-auto"
                      quality={85}
                      sizes="(max-width: 768px) 100vw, 1044px"
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
                          className="text-base md:text-[18px] font-normal leading-relaxed"
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
                  <h4 className="text-base md:text-[22px] font-bold text-text-primary mb-6 md:mb-8">
                    4 — Experiencing the Tour
                  </h4>
                  <figure className="w-full mb-8">
                    <Image
                      src="/images/case-studies/pratt-institute-visitor-experience/safari-p4.webp"
                      alt="Photos from the campus tour: info session, campus model, student gathering spaces, and outdoor walking tour"
                      width={1600}
                      height={1100}
                      className="w-full h-auto"
                      quality={85}
                      sizes="(max-width: 768px) 100vw, 1044px"
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
                          className="text-base md:text-[18px] font-normal leading-relaxed"
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
                  <h4 className="text-base md:text-[22px] font-bold text-text-primary mb-6 md:mb-8">
                    5 — Post Visit
                  </h4>
                  <figure className="w-full mb-8">
                    <Image
                      src="/images/case-studies/pratt-institute-visitor-experience/safari-p5.png"
                      alt="Photos from the post-visit phase: feedback QR code, counselor meeting, and follow-up emails from Pratt Admissions"
                      width={1600}
                      height={1000}
                      className="w-full h-auto"
                      quality={85}
                      sizes="(max-width: 768px) 100vw, 1044px"
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
                          className="text-base md:text-[18px] font-normal leading-relaxed"
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

                {/* ── Service Blueprint ── */}
                <div className="mt-16 md:mt-20 mb-0">
                  <p
                    className="text-base md:text-[18px] font-normal leading-relaxed mb-8 md:mb-10"
                    style={{ color: 'rgb(var(--color-text-color90))' }}
                  >
                    After experiencing the service firsthand and speaking with
                    the client to better understand how the service operates, we
                    created a service blueprint. You can explore the full
                    blueprint by clicking the link below.
                  </p>
                  <figure className="w-full overflow-x-auto">
                    <Image
                      src="/images/case-studies/pratt-institute-visitor-experience/blueprint.png"
                      alt="Service blueprint mapping visitor actions, front-stage and back-stage employee actions, technology, and support processes across all five journey phases"
                      width={2400}
                      height={1350}
                      className="w-full h-auto min-w-[640px]"
                      quality={90}
                      sizes="(max-width: 768px) 200vw, 1044px"
                    />
                  </figure>
                </div>

                <SectionDivider />

                {/* ── Section: Survey Analysis ── */}
                <h3
                  className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]"
                  style={{ color: 'rgb(var(--color-text-tertiary))' }}
                >
                  Survey Analysis
                </h3>

                <AnimatedTitle
                  text="Tours Feedback Survey Analysis"
                  animationType="fadeIn"
                  alwaysAnimate={false}
                  delay={0}
                  className="text-2xl md:text-[40px] font-bold text-text-primary mb-6 md:mb-8 leading-tight tracking-[-0.05em]"
                />

                <div className="space-y-6 md:space-y-8 mb-12 md:mb-16">
                  <p
                    className="text-base md:text-[18px] font-normal leading-relaxed"
                    style={{ color: 'rgb(var(--color-text-color90))' }}
                  >
                    The client shared an Excel file containing tour feedback
                    responses. We analyzed 718 survey entries and created a
                    dashboard to visualize key insights from the data.
                  </p>
                </div>

                <figure className="w-full mb-12 md:mb-16">
                  <Image
                    src="/images/case-studies/pratt-institute-visitor-experience/analysis.png"
                    alt="Side-by-side view of the Excel spreadsheet with 718 tour feedback responses and the Google Sheets analysis dashboard"
                    width={1600}
                    height={1000}
                    className="w-full h-auto"
                    quality={85}
                    sizes="(max-width: 768px) 100vw, 1044px"
                  />
                </figure>

                {/* Accordion subsections */}
                <div>
                  <Accordion title="Survey Highlights">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                      <div className="space-y-4">
                        {[
                          { label: 'Responses', value: '718' },
                          { label: 'Positive comments', value: '82%' },
                          { label: 'Average rating', value: '4.5/5' },
                        ].map(({ label, value }) => (
                          <p
                            key={label}
                            className="text-base md:text-[18px] font-normal leading-relaxed"
                            style={{ color: 'rgb(var(--color-text-color90))' }}
                          >
                            {label}:{' '}
                            <span
                              className="font-bold"
                              style={{
                                color: 'rgb(var(--color-case-study-gold))',
                              }}
                            >
                              {value}
                            </span>
                          </p>
                        ))}
                      </div>
                      <div>
                        <p className="text-base md:text-[18px] font-bold text-text-primary mb-4">
                          Sentiment Distribution:
                        </p>
                        <ul className="space-y-2">
                          {[
                            'Very Positive (102): 14%',
                            'Positive (184): 26%',
                            'Neutral (396): 55%',
                            'Negative (36): 5%',
                          ].map((item) => (
                            <li key={item} className="flex items-start gap-3">
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
                  </Accordion>

                  <Accordion
                    title="Information Gaps"
                    subtitle="108 information requests identified from 220 responses"
                  >
                    <div className="space-y-8">
                      {[
                        {
                          priority: 'High Priority',
                          color: '#C0392B',
                          startIndex: 1,
                          items: [
                            'Academic Programs & Curriculum (32 requests | 19.9%)',
                            'Financial Aid & Scholarships (31 requests | 19.3%)',
                          ],
                        },
                        {
                          priority: 'Medium Priority',
                          color: '#D97706',
                          startIndex: 3,
                          items: [
                            'Housing & Residential Life (16 requests)',
                            'Admissions & Portfolio (10 requests)',
                          ],
                        },
                        {
                          priority: 'Low Priority',
                          color: '#4A8C5C',
                          startIndex: 5,
                          items: [
                            'Career & Job Outcomes (8 requests)',
                            'Study Abroad Programs (4 requests)',
                            'Campus Life & Social (3 requests)',
                            'Student Demographics (2 requests)',
                          ],
                        },
                      ].map(({ priority, color, startIndex, items }) => (
                        <div key={priority}>
                          <h5
                            className="text-base md:text-[18px] font-bold mb-3"
                            style={{ color }}
                          >
                            {priority}
                          </h5>
                          <ol className="space-y-2 list-none">
                            {items.map((item, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <span
                                  className="text-base md:text-[18px] font-normal flex-shrink-0 w-5"
                                  style={{
                                    color: 'rgb(var(--color-text-tertiary))',
                                  }}
                                >
                                  {startIndex + i}.
                                </span>
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
                          </ol>
                        </div>
                      ))}
                    </div>
                  </Accordion>

                  <Accordion title="Top Strengths">
                    <ol className="space-y-6 list-none">
                      {[
                        {
                          title: 'Tour Guides (225 mentions)',
                          desc: 'Visitors praised ambassadors for being knowledgeable, passionate, friendly, and relatable',
                        },
                        {
                          title: 'Campus Environment (154 mentions)',
                          desc: 'The physical environment, architecture, and overall campus atmosphere made strong impressions',
                        },
                        {
                          title: 'Department Visits (55 mentions)',
                          desc: 'Seeing actual program facilities and learning about specific academic offerings was valuable',
                        },
                      ].map(({ title, desc }, i) => (
                        <li key={i} className="flex items-start gap-4">
                          <span
                            className="text-base md:text-[18px] font-bold flex-shrink-0"
                            style={{ color: 'rgb(var(--color-text-tertiary))' }}
                          >
                            {i + 1}.
                          </span>
                          <div>
                            <p className="text-base md:text-[18px] font-bold text-text-primary mb-1">
                              {title}
                            </p>
                            <p
                              className="text-base md:text-[18px] font-normal leading-relaxed"
                              style={{ color: 'rgb(var(--color-text-tertiary))' }}
                            >
                              {desc}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </Accordion>

                  <Accordion
                    title="Visitor Impact"
                    subtitle="How the visit influenced likelihood to apply"
                  >
                    <h5 className="text-base md:text-[20px] font-bold text-text-primary mb-6">
                      Application Intent Score
                    </h5>
                    <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                      <div className="flex-1">
                        <p className="text-base md:text-[18px] font-bold text-text-primary mb-4">
                          How it&apos;s calculated:
                        </p>
                        <ol className="space-y-4 list-none">
                          <li className="flex items-start gap-4">
                            <span
                              className="text-base md:text-[18px] font-normal flex-shrink-0 w-5"
                              style={{ color: 'rgb(var(--color-text-tertiary))' }}
                            >
                              1.
                            </span>
                            <div>
                              <p
                                className="text-base md:text-[18px] font-normal leading-relaxed"
                                style={{ color: 'rgb(var(--color-text-color90))' }}
                              >
                                Categorize each visitor response:
                              </p>
                              <ul className="mt-2 space-y-1 ml-1">
                                {[
                                  'More likely to apply → Promoter',
                                  'Neutral/same → Passive',
                                  'Less likely to apply → Detractor',
                                ].map((item) => (
                                  <li key={item} className="flex items-start gap-3">
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
                          </li>
                          <li className="flex items-start gap-4">
                            <span
                              className="text-base md:text-[18px] font-normal flex-shrink-0 w-5"
                              style={{ color: 'rgb(var(--color-text-tertiary))' }}
                            >
                              2.
                            </span>
                            <div>
                              <p className="text-base md:text-[18px] font-bold text-text-color70">
                                Calculate the score:
                              </p>
                              <p
                                className="text-base md:text-[18px] font-normal mt-1 leading-relaxed"
                                style={{ color: 'rgb(var(--color-text-tertiary))' }}
                              >
                                Score = (Promoters &minus; Detractors) / Total
                                Visitors &times; 100
                              </p>
                            </div>
                          </li>
                        </ol>
                      </div>
                      <div className="flex flex-col gap-8">
                        <div
                          className="flex flex-col items-center justify-center w-28 h-28 rounded-lg border"
                          style={{
                            borderColor: 'rgb(var(--color-text-color10))',
                            backgroundColor: 'rgb(var(--color-surface-elevated))',
                          }}
                        >
                          <span
                            className="text-4xl font-bold"
                            style={{ color: 'rgb(var(--color-case-study-gold))' }}
                          >
                            68
                          </span>
                          <span className="text-sm font-medium text-text-primary mt-1">
                            Excellent
                          </span>
                        </div>
                        <div>
                          <p className="text-base md:text-[18px] font-bold text-text-primary mb-3">
                            Breakdown
                          </p>
                          <ul className="space-y-2">
                            {[
                              '494 visitors (69%) – More likely to apply',
                              '217 visitors (30%) – Neutral',
                              '7 visitors (1%) – Less likely',
                            ].map((item) => (
                              <li key={item} className="flex items-start gap-3">
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
                  </Accordion>
                </div>

                <SectionDivider />

                {/* ── Cover image: Co-Design Workshops ── */}
                <figure className="w-full mb-16 md:mb-20">
                  <Image
                    src="/images/case-studies/pratt-institute-visitor-experience/codesign-cover.webp"
                    alt="Students walking through Pratt Institute campus gardens"
                    width={1600}
                    height={560}
                    className="w-full h-auto"
                    quality={85}
                    sizes="(max-width: 768px) 100vw, 1044px"
                  />
                </figure>

                {/* ── Section: Co-Design Workshops ── */}
                <h3
                  className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]"
                  style={{ color: 'rgb(var(--color-text-tertiary))' }}
                >
                  Co-Design Workshops
                </h3>

                <AnimatedTitle
                  text="Why We Use the Co-Design Method?"
                  animationType="fadeIn"
                  alwaysAnimate={false}
                  delay={0}
                  className="text-2xl md:text-[40px] font-bold text-text-primary mb-6 md:mb-8 leading-tight tracking-[-0.05em]"
                />

                <div className="space-y-6 md:space-y-8 mb-12 md:mb-16">
                  <p
                    className="text-base md:text-[18px] font-normal leading-relaxed"
                    style={{ color: 'rgb(var(--color-text-color90))' }}
                  >
                    Co-design brings student ambassadors, the people who deliver
                    the service every day, directly into the improvement process.
                    Their participation reveals needs and insights that surveys or
                    service blueprints alone cannot uncover.
                  </p>
                  <p
                    className="text-base md:text-[18px] font-normal leading-relaxed"
                    style={{ color: 'rgb(var(--color-text-color90))' }}
                  >
                    By involving ambassadors closely, our solutions become more
                    realistic, actionable, and aligned with how the visitor
                    experience is actually operated and delivered.
                  </p>
                </div>

                {/* Workshop photos */}
                <figure className="w-full mb-12 md:mb-16">
                  <Image
                    src="/images/case-studies/pratt-institute-visitor-experience/codesign-workshop.webp"
                    alt="Co-design workshop sessions: ambassadors placing sticky notes on the journey map and collaborating at tables"
                    width={800}
                    height={1000}
                    className="w-full h-auto"
                    quality={85}
                    sizes="(max-width: 768px) 100vw, 1044px"
                  />
                </figure>

                {/* Our Goal */}
                <h4 className="text-lg md:text-[24px] font-bold text-text-primary mb-6 md:mb-8">
                  Our Goal
                </h4>
                <div className="space-y-3 mb-16 md:mb-20">
                  {[
                    'Understand the Real Tour Experience from Student Ambassadors',
                    'Identify Challenges and Needs in the Current Tour Process',
                    'Co-Create Simple and Feasible Improvements',
                  ].map((goal, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 px-5 py-4 rounded-xl"
                      style={{
                        backgroundColor: 'rgb(var(--color-surface-elevated))',
                      }}
                    >
                      <span
                        className="text-sm font-bold flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-lg"
                        style={{
                          backgroundColor: 'rgb(var(--color-surface-muted))',
                          color: 'rgb(var(--color-text-primary))',
                        }}
                      >
                        {i + 1}
                      </span>
                      <span className="text-base md:text-[18px] font-normal text-text-primary">
                        {goal}
                      </span>
                    </div>
                  ))}
                </div>

                {/* What we did */}
                <h4 className="text-lg md:text-[24px] font-bold text-text-primary mb-6">
                  What we did?
                </h4>
                <div className="space-y-6 md:space-y-8 mb-8 md:mb-10">
                  <p
                    className="text-base md:text-[18px] font-normal leading-relaxed"
                    style={{ color: 'rgb(var(--color-text-color90))' }}
                  >
                    We hosted{' '}
                    <strong>two 60-minute in-person co-design workshops</strong>{' '}
                    with <strong>16 participants</strong>, including ambassadors
                    across all tiers and Sham&ocirc;r. Each session combined
                    reflection, mapping, and creativity to uncover improvement
                    opportunities.
                  </p>
                </div>
                <p
                  className="text-base md:text-[18px] font-semibold text-text-primary mb-4"
                >
                  Activities included:
                </p>
                <ul className="space-y-3 mb-16 md:mb-20">
                  {[
                    'A warm-up defining \u201cWhat Welcome Means\u201d',
                    'Visitor journey mapping through the eyes of ambassadors',
                    'Role-play exercises to simulate real tour moments',
                    'Identifying emotional highs/lows, gaps, and breakdowns',
                    'Sketching solutions for a better visitor experience',
                  ].map((activity, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span
                        className="mt-[0.55em] h-1.5 w-1.5 rounded-full flex-shrink-0"
                        style={{
                          backgroundColor: 'rgb(var(--color-text-tertiary))',
                        }}
                      />
                      <span
                        className="text-base md:text-[18px] font-normal leading-relaxed"
                        style={{ color: 'rgb(var(--color-text-color90))' }}
                      >
                        {activity}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Workshop artifacts photo */}
                <figure className="w-full mb-12 md:mb-16">
                  <Image
                    src="/images/case-studies/pratt-institute-visitor-experience/codesign-artifacts.png"
                    alt="Workshop artifacts: filled welcome cards, ambassador annotated journey map, observation cards, and sketching sheets"
                    width={900}
                    height={900}
                    className="w-full h-auto"
                    quality={85}
                    sizes="(max-width: 768px) 100vw, 1044px"
                  />
                </figure>

                {/* What we learned */}
                <h4 className="text-lg md:text-[24px] font-bold text-text-primary mb-8 md:mb-10">
                  What we learned?
                </h4>
                <div className="space-y-8 md:space-y-10">
                  {[
                    {
                      title: 'Information Gaps',
                      desc: 'Ambassadors rely heavily on memory, which may lead to inconsistent or inaccurate answers. They need quick-reference tools and clear boundaries around what they can and cannot answer.',
                    },
                    {
                      title: 'Outdated or Inconsistent Information',
                      desc: "Recent changes in campus stops or policies aren\u2019t reaching everyone which directly impacts visitor impressions.",
                    },
                    {
                      title: 'Emotional Moments Matter',
                      desc: 'Visitors feel a sense of belonging when ambassadors personalize stories and share their lived experiences as students. These moments help visitors imagine themselves at Pratt, while the absence of personal connection can make the experience feel generic.',
                    },
                    {
                      title: 'Need Practical Support Materials',
                      desc: 'Ambassadors expressed a need for practical support materials, including updated talking points, transition prompts, scenario-based responses, and pre-tour preparation reminders.',
                    },
                  ].map(({ title, desc }) => (
                    <div key={title}>
                      <h5 className="text-base md:text-[18px] font-bold text-text-primary mb-2 md:mb-3">
                        {title}
                      </h5>
                      <p
                        className="text-base md:text-[18px] font-normal leading-relaxed"
                        style={{ color: 'rgb(var(--color-text-tertiary))' }}
                      >
                        {desc}
                      </p>
                    </div>
                  ))}
                </div>

                <SectionDivider />

                {/* ── Section: Interventions ── */}
                <h3
                  className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]"
                  style={{ color: 'rgb(var(--color-text-tertiary))' }}
                >
                  Interventions
                </h3>

                <AnimatedTitle
                  text="Intervention 1: Ambassador Training Materials"
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
                <h4 className="text-lg md:text-[24px] font-bold text-text-primary mb-3 md:mb-4">
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
                        className="text-base md:text-[18px] font-normal leading-relaxed"
                        style={{ color: 'rgb(var(--color-text-tertiary))' }}
                      >
                        {desc}
                      </p>
                    </div>
                  ))}
                </div>

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
                        '/images/case-studies/pratt-institute-visitor-experience/shadow-note-card.png',
                      imageAlt: 'Shadow Note Card template for new ambassador onboarding',
                      whatItIs:
                        'This is used during the first two weeks when a new recruit shadows a senior ambassador. It prompts them to note three things to observe, listen for a moment of visitor connection, and write one question to ask the senior ambassador.',
                      purpose:
                        'Ambassadors previously learned the role inconsistently. This tool ensures new ambassadors observe tours purposefully rather than passively and start building clarity about effective tour delivery.',
                    },
                    {
                      name: 'Service Promise Card',
                      imageSrc:
                        '/images/case-studies/pratt-institute-visitor-experience/service-promise-card.png',
                      imageAlt: 'Service Promise Card template for ambassador training',
                      whatItIs:
                        'It\'s a card where ambassadors write a "We Promise" statement to visitors and then describe how they will keep that promise in real life, focusing on Pratt\'s values (creativity, belonging, and inclusivity).',
                      purpose:
                        "The goal was for all ambassadors to understand and apply Pratt's values in their behavior, creating a single, consistent way to welcome and communicate with visitors.",
                    },
                    {
                      name: 'Commitment Card',
                      imageSrc:
                        '/images/case-studies/pratt-institute-visitor-experience/commitment-card.png',
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
                        src="/images/case-studies/pratt-institute-visitor-experience/cue-cards.png"
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
                      src="/images/case-studies/pratt-institute-visitor-experience/cue-cards-mobile.png"
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
                        '/images/case-studies/pratt-institute-visitor-experience/reflection-sheet.png',
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
                        '/images/case-studies/pratt-institute-visitor-experience/challenge-cluster.png',
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
                        '/images/case-studies/pratt-institute-visitor-experience/one-win-card.png',
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

                {/* Ecosystem impact */}
                <div className="mt-16 md:mt-20">
                  <h4 className="text-lg md:text-[24px] font-bold text-text-primary mb-10 md:mb-12 leading-snug">
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
                              className="text-base md:text-[18px] font-normal leading-relaxed"
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

                {/* ── Section: Intervention 2 ── */}
                <AnimatedTitle
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
                    src="/images/case-studies/pratt-institute-visitor-experience/current-welcome-packet.webp"
                    alt="Current Pratt visitor welcome packet spread out showing FAQ sheet, welcome letter, campus map, and campus directory"
                    width={1600}
                    height={1000}
                    className="w-full h-auto"
                    quality={85}
                    sizes="(max-width: 768px) 100vw, 1044px"
                  />
                </figure>

                {/* Change 1 */}
                <h4 className="text-lg md:text-[22px] font-bold text-text-primary mb-8 md:mb-10">
                  Change 1: Welcome Pratt One-Pager
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-8 md:gap-12 items-start mb-20 md:mb-24">
                  <figure>
                    <Image
                      src="/images/case-studies/pratt-institute-visitor-experience/welcome-one-pager.png"
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
                      className="text-base md:text-[18px] font-normal leading-relaxed"
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
                              className="text-base md:text-[18px] font-normal leading-relaxed"
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
                <h4 className="text-lg md:text-[22px] font-bold text-text-primary mb-8 md:mb-10">
                  Change 2: Redesigned Campus Map
                </h4>
                <figure className="w-full mb-8 md:mb-10 overflow-x-auto">
                  <Image
                    src="/images/case-studies/pratt-institute-visitor-experience/campus-map-redesign.png"
                    alt="Redesigned Pratt Brooklyn Campus map with color-coded tour stops, notes area, QR code for feedback, and digital guide QR code"
                    width={1600}
                    height={1100}
                    className="w-full h-auto min-w-[600px]"
                    quality={90}
                    sizes="(max-width: 768px) 200vw, 1044px"
                  />
                </figure>
                <p
                  className="text-base md:text-[18px] font-normal leading-relaxed mb-6 md:mb-8"
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
                          className="text-base md:text-[18px] font-normal leading-relaxed"
                          style={{ color: 'rgb(var(--color-text-tertiary))' }}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Change 3 */}
                <h4 className="text-lg md:text-[22px] font-bold text-text-primary mb-8 md:mb-10">
                  Change 3: Digital Visitor Welcome Guide
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-8 md:gap-12 items-start mb-12 md:mb-16">
                  <figure>
                    <Image
                      src="/images/case-studies/pratt-institute-visitor-experience/visitor-welcome-guide.png"
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
                    src="/images/case-studies/pratt-institute-visitor-experience/visitor-guide-screens-1.png"
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
                    src="/images/case-studies/pratt-institute-visitor-experience/visitor-guide-screens-2.png"
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
                      src="/images/case-studies/pratt-institute-visitor-experience/faq-guide.png"
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

                {/* ── Intervention 2 Ecosystem Impact ── */}
                <div className="mt-16 md:mt-20">
                  <h4 className="text-xl md:text-[28px] font-bold text-text-primary mb-12 md:mb-16 leading-tight tracking-[-0.03em]">
                    How the Updated Visitor Welcome Packet Strengthens the
                    Visitor Services Ecosystem Loops
                  </h4>

                  <div className="space-y-12 md:space-y-16">
                    {/* Relationship 1 */}
                    <div>
                      <h5 className="text-base md:text-[18px] font-bold text-text-primary mb-4 md:mb-5">
                        The Visitor – Ambassador (Tour Guide) Relationship
                      </h5>
                      <div className="space-y-4">
                        <p
                          className="text-base md:text-[18px] font-normal leading-relaxed"
                          style={{ color: 'rgb(var(--color-text-tertiary))' }}
                        >
                          The updated welcome packet gives visitors foundational
                          information before the tour begins, reducing the number
                          of basic, repetitive questions they bring into the
                          experience. While ambassadors&apos; core tour delivery
                          does not change, visitors now have clearer context,
                          freeing ambassadors to focus more fully on
                          storytelling, campus culture, and personal experiences.
                        </p>
                        <p
                          className="text-base md:text-[18px] font-normal leading-relaxed"
                          style={{ color: 'rgb(var(--color-text-tertiary))' }}
                        >
                          Visitors leave feeling more grounded, informed, and
                          able to absorb the ambassadors&apos; authentic student
                          perspectives.
                        </p>
                      </div>
                    </div>

                    {/* Relationship 2 */}
                    <div>
                      <h5 className="text-base md:text-[18px] font-bold text-text-primary mb-4 md:mb-5">
                        The Visitor – Ambassador (Student Visitor Service
                        Assistant) Relationship
                      </h5>
                      <div className="space-y-4">
                        <p
                          className="text-base md:text-[18px] font-normal leading-relaxed"
                          style={{ color: 'rgb(var(--color-text-tertiary))' }}
                        >
                          With clearer maps, FAQs, and digital resources,
                          visitors enter the tour with fewer logistical questions
                          and greater confidence navigating the experience. The
                          packet reduces front-desk inquiries and minimizes
                          follow-up questions that visitors typically ask after
                          the tour.
                        </p>
                        <p
                          className="text-base md:text-[18px] font-normal leading-relaxed"
                          style={{ color: 'rgb(var(--color-text-tertiary))' }}
                        >
                          This allows the Student Visitor Services Assistant to
                          handle requests more efficiently, maintain smoother
                          operations, and ensure a welcoming, well-supported
                          experience.
                        </p>
                      </div>
                    </div>

                    {/* Relationship 3 */}
                    <div>
                      <h5 className="text-base md:text-[18px] font-bold text-text-primary mb-4 md:mb-5">
                        The Visitor – Admissions Communications Relationship
                      </h5>
                      <div className="space-y-4">
                        <p
                          className="text-base md:text-[18px] font-normal leading-relaxed"
                          style={{ color: 'rgb(var(--color-text-tertiary))' }}
                        >
                          Updated printed materials and the digital welcome guide
                          present visitors with consistent, accurate, and
                          visually cohesive information across channels, before,
                          during, and after the tour. This reinforces
                          Pratt&apos;s brand identity by aligning messaging,
                          tone, and design across all touchpoints.
                        </p>
                        <p
                          className="text-base md:text-[18px] font-normal leading-relaxed"
                          style={{ color: 'rgb(var(--color-text-tertiary))' }}
                        >
                          Visitors gain greater trust in Pratt&apos;s
                          communications and feel more confident navigating next
                          steps independently, supported by reliable and
                          well-branded resources.
                        </p>
                      </div>
                    </div>

                    {/* Relationship 4 */}
                    <div>
                      <h5 className="text-base md:text-[18px] font-bold text-text-primary mb-4 md:mb-5">
                        The Visitor – Counselor Relationship
                      </h5>
                      <div className="space-y-4">
                        <p
                          className="text-base md:text-[18px] font-normal leading-relaxed"
                          style={{ color: 'rgb(var(--color-text-tertiary))' }}
                        >
                          Visitors now arrive to counselor meetings with a
                          clearer baseline understanding of admissions
                          requirements, financial aid, housing, study abroad,
                          and portfolio expectations. Counselors spend less time
                          correcting misunderstandings and more time offering
                          individualized, meaningful guidance tailored to each
                          visitor&apos;s goals.
                        </p>
                        <p
                          className="text-base md:text-[18px] font-normal leading-relaxed"
                          style={{ color: 'rgb(var(--color-text-tertiary))' }}
                        >
                          Visitors leave advising sessions feeling prepared,
                          supported, and empowered to move forward in the
                          admissions process.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <SectionDivider />

                {/* ── The End ── */}
                <div className="py-8 md:py-12">
                  <h3
                    className="text-3xl md:text-[48px] font-bold uppercase tracking-[-0.02em] mb-6 md:mb-8"
                    style={{ color: 'rgb(var(--color-case-study-gold))' }}
                  >
                    The End
                  </h3>
                  <p className="text-xl md:text-[28px] font-bold text-text-primary">
                    Thank you for reading this case-study
                  </p>
                </div>

              </div>
        </CaseStudyReadMore>
      </div>
    </m.section>
  )
}
