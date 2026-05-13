import Image from 'next/image'

const OLD_DCWP_PAGE_IMAGE =
  '/images/case-studies/nyc-dcwp-business-licenses/old-dcwp-page.png'

/** Sub-case surface behind image; single column — copy sits 120px below the figure. */
export function ChecklistProblemSection() {
  return (
    <div
      data-section="nyc-dcwp-subcase-checklist-problem"
      className="flex flex-col"
    >
      <div
        data-section="nyc-dcwp-subcase-checklist-problem-legacy-screenshot"
        className="relative w-full overflow-hidden mb-8 mt-20 md:mt-28 lg:mt-36"
      >
        <Image
          src={OLD_DCWP_PAGE_IMAGE}
          alt="Original NYC DCWP website page showing the Home Improvement Contractor license information"
          width={1440}
          height={900}
          className="h-auto w-full"
          sizes="(max-width: 768px) 100vw, min(1044px, 100vw)"
        />
      </div>

      <div
        data-section="nyc-dcwp-subcase-checklist-problem-copy"
        className="mt-20 max-w-[680px] space-y-6"
      >
        <h3 className="text-xl md:text-[28px] font-bold text-text-primary leading-snug">
          Problem
        </h3>
        <p className="text-base md:text-[18px] leading-relaxed text-text-color60">
          Our initial impression of the page was that it had several usability issues. The page
          felt very information-heavy—like hitting a wall of text that was overwhelming,
          cluttered, and devoid of the visual cues users need to navigate with confidence.
          Navigating through the dense blocks of information felt like wandering through a maze
          with no clear path forward, poor visual hierarchy made important information blend
          into the other blocks of text.
        </p>
        <p className="pt-4 text-lg font-bold leading-snug text-text-primary md:text-xl md:leading-snug lg:text-2xl">
          The page looks like a word doc where all the information is just randomly dumped
        </p>
      </div>
    </div>
  )
}
