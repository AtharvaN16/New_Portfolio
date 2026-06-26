'use client'

import { CaseStudyVideo } from '@/components/case-study/CaseStudyVideo'
import { AnimatedText } from '@/components/ui/AnimatedText'
import { OpenPrototypeLink } from './OpenPrototypeLink'
import {
  CASE_STUDY_BODY_LEADING,
  CASE_STUDY_NARRATIVE_SECTION_GAP,
  CASE_STUDY_SECTION_HEADLINE_SPACED,
  CASE_STUDY_SECTION_LABEL_PROSE,
} from '@/components/case-study/caseStudyTypography'

const VIDEO_SRC =
  '/videos/case-studies/ualberta-library-website/hours-locations-reel.mp4'

const PROSE_MAX = 'max-w-[680px]'
const SECTION_LABEL = CASE_STUDY_SECTION_LABEL_PROSE
const HEADLINE_MD = `${CASE_STUDY_SECTION_HEADLINE_SPACED} ${PROSE_MAX}`
const BODY_MUTED = `text-base md:text-[18px] font-normal ${CASE_STUDY_BODY_LEADING} ${PROSE_MAX}`

export function UAlbertaSolutionSection() {
  return (
    <div className={CASE_STUDY_NARRATIVE_SECTION_GAP}>
      <h3
        id="ualberta-solution-heading"
        className={SECTION_LABEL}
        style={{ color: 'rgb(var(--color-text-tertiary))' }}
      >
        Solution
      </h3>

      <AnimatedText
        variant="heading"
        text="Redesigning hours and locations so students can find the right library faster"
        animationType="fadeIn"
        alwaysAnimate={false}
        delay={0}
        className={HEADLINE_MD}
      />

      <p
        className={`${BODY_MUTED} mb-4`}
        style={{ color: 'rgb(var(--color-text-color90))' }}
      >
        The redesigned page groups libraries by campus, surfaces today&apos;s hours
        directly on each card, and removes redundant navigation that slowed students
        down during testing.
      </p>

      <p
        className={`${BODY_MUTED} mb-8 md:mb-10`}
        style={{ color: 'rgb(var(--color-text-color90))' }}
      >
        This walkthrough shows the full flow from landing on the page to comparing
        locations, booking study space context, and scanning amenities at a glance.
      </p>

      <CaseStudyVideo
        src={VIDEO_SRC}
        alt="Walkthrough of the redesigned University of Alberta library hours and locations page"
      />

      <OpenPrototypeLink slug="hours-locations" className="mt-6" />
    </div>
  )
}
