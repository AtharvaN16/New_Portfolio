'use client'

export function PrattOverviewSection() {
  return (
    <>
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
          visitor leaves with <strong>clarity</strong>, <strong>confidence</strong>, a
          feeling of being <strong>supported</strong>, and a <strong>memorable</strong>{' '}
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
    </>
  )
}
