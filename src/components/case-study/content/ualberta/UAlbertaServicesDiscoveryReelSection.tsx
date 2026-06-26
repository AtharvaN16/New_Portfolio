'use client'

import { CaseStudyVideo } from '@/components/case-study/CaseStudyVideo'
import { AnimatedText } from '@/components/ui/AnimatedText'
import {
  CASE_STUDY_BODY_LEADING,
  CASE_STUDY_NARRATIVE_SECTION_GAP,
  CASE_STUDY_SECTION_HEADLINE_SPACED,
  CASE_STUDY_SECTION_LABEL_PROSE,
} from '@/components/case-study/caseStudyTypography'

const VIDEO_SRC =
  '/videos/case-studies/ualberta-library-website/services-discovery-reel.mp4'

const PROSE_MAX = 'max-w-[680px]'
const SECTION_LABEL = CASE_STUDY_SECTION_LABEL_PROSE
const HEADLINE_MD = `${CASE_STUDY_SECTION_HEADLINE_SPACED} ${PROSE_MAX}`
const BODY_MUTED = `text-base md:text-[18px] font-normal ${CASE_STUDY_BODY_LEADING} ${PROSE_MAX}`

export function UAlbertaServicesDiscoveryReelSection() {
  return (
    <div className={CASE_STUDY_NARRATIVE_SECTION_GAP}>
      <h3
        id="ualberta-services-discovery-solution-heading"
        className={SECTION_LABEL}
        style={{ color: 'rgb(var(--color-text-tertiary))' }}
      >
        Solution
      </h3>

      <AnimatedText
        variant="heading"
        text="Surfacing popular services before students hit the full directory"
        animationType="fadeIn"
        alwaysAnimate={false}
        delay={0}
        className={HEADLINE_MD}
      />

      <p
        className={`${BODY_MUTED} mb-4`}
        style={{ color: 'rgb(var(--color-text-color90))' }}
      >
        The redesigned services page leads with the tasks students use most — study
        rooms, citation guides, hours, and printing — each with a short description
        so purpose is clear at a glance.
      </p>

      <p
        className={`${BODY_MUTED} mb-8 md:mb-10`}
        style={{ color: 'rgb(var(--color-text-color90))' }}
      >
        This walkthrough shows how a student can scan the hero grid, understand what
        each service does, and jump straight into the full directory when they need
        more.
      </p>

      <CaseStudyVideo
        src={VIDEO_SRC}
        alt="Walkthrough of the redesigned University of Alberta library services page hero and popular services grid"
      />
    </div>
  )
}
