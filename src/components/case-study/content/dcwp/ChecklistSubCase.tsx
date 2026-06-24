'use client'

import { ChecklistProblemSection } from '@/components/case-study/content/dcwp/ChecklistProblemSection'

/**
 * Case Study 1 of 3 — narrative (after Case Studies hub + divider).
 * Anchor #checklist targets this block for deep links.
 */
export function ChecklistSubCase() {
  return (
    <section
      id="checklist"
      data-section="nyc-dcwp-subcase-checklist"
      className="flex flex-col gap-12 md:gap-16 scroll-mt-24 pt-8 md:pt-12"
    >
      <div
        data-section="nyc-dcwp-subcase-checklist-header-block"
        className="flex flex-col gap-16 md:gap-24"
      >
        <div
          data-section="nyc-dcwp-subcase-checklist-accent-rule"
          className="mt-[120px] h-[3px] w-full rounded-full shrink-0"
          style={{ background: 'rgba(49, 131, 203, 0.35)' }}
        />
        <div
          data-section="nyc-dcwp-subcase-checklist-title-group"
          className="space-y-3"
        >
          <p className="text-sm md:text-base font-semibold normal-case tracking-widest text-text-color70">
            Case Study 1 of 3
          </p>
          <h2 className="text-2xl md:text-2xl font-bold text-text-primary leading-tight tracking-[-0.03em]">
            Redesigning the Application Checklist Page
          </h2>
        </div>
      </div>

      <section
        data-section="nyc-dcwp-subcase-checklist-preparing-users"
        className="mt-20 space-y-4"
      >
        <h3 className="text-lg md:text-2xl font-bold text-text-primary leading-snug max-w-[680px]">
          Preparing the users before they start an application
        </h3>
        <p className="text-base md:text-[18px] text-text-body leading-normal max-w-[680px]">
          Before starting a new online application, users land on the HIC Application Checklist
          Page, which provides key requirements and resources to ensure a smooth license
          application process. Users are expected to read the information on this page to avoid
          making any mistakes.
        </p>
      </section>

      <ChecklistProblemSection />
    </section>
  )
}
