'use client'

export function GutenbergOverviewSection() {
  return (
    <>
      {/* Abstract Section */}
      <h3 className="text-lg md:text-case-heading font-bold text-text-primary mb-6 md:mb-[28px]">
        Abstract
      </h3>

      <div className="space-y-6 md:space-y-8">
        <p className="text-base md:text-[18px] font-normal text-text-body leading-relaxed">
          This case study is based on a usability evaluation of Gutenberg
          Technologies&apos; course management system (CMS), a legacy
          e-learning content authoring platform used primarily by
          publishers. The research focused on understanding how new users
          create content, manage the table of contents, interact with
          drag-and-drop features, and discover and use AI-assisted content
          generation. Using moderated user testing with eye-tracking and
          Retrospective Think-Aloud (RTA), the study triangulated
          behavioral metrics, gaze data, and verbal feedback across nine
          participants to identify critical breakdowns in onboarding and
          authoring workflows.
        </p>
        <p className="text-base md:text-[18px] font-normal text-text-body leading-relaxed">
          Findings revealed a strong learnability baseline driven by
          familiar editor patterns, but significant usability issues caused
          by expectation mismatches, poor feature discoverability, and
          unclear system-generated structures. Key problems included
          confusion around default template pages, forced template
          selection during &ldquo;author from scratch&rdquo; flows, and
          multiple points of friction in the AI content generation
          experience.
        </p>
      </div>

      {/* My Role Section */}
      <div className="mt-12 md:mt-16">
        <h3 className="text-lg md:text-[24px] font-bold text-text-primary mb-6 md:mb-[28px]">
          My Role
        </h3>

        <div className="space-y-6 md:space-y-8">
          <p className="text-base md:text-[18px] font-medium text-text-body leading-relaxed">
            As part of a four-person research team, I contributed to:
          </p>
          <ul className="space-y-2 md:space-y-3 list-disc list-inside ml-2">
            <li className="text-base md:text-[18px] font-normal text-text-body leading-relaxed">
              Research planning and hypothesis development
            </li>
            <li className="text-base md:text-[18px] font-normal text-text-body leading-relaxed">
              Eye-tracking study design and moderation
            </li>
            <li className="text-base md:text-[18px] font-normal text-text-body leading-relaxed">
              Analyzing the insights
            </li>
            <li className="text-base md:text-[18px] font-normal text-text-body leading-relaxed">
              Design recommendations
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
