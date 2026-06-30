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
  '/videos/case-studies/ualberta-library-website/services-discovery-reel.mp4'

const PROSE_MAX = 'max-w-[680px]'
const SECTION_LABEL = CASE_STUDY_SECTION_LABEL_PROSE
const HEADLINE_MD = `${CASE_STUDY_SECTION_HEADLINE_SPACED} ${PROSE_MAX}`
const BODY_FULL = `text-base md:text-[18px] font-normal ${CASE_STUDY_BODY_LEADING} w-full`

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
        text="Find services faster"
        animationType="fadeIn"
        alwaysAnimate={false}
        delay={0}
        className={HEADLINE_MD}
      />

      <p
        className={`${BODY_FULL} mb-8 md:mb-10`}
        style={{ color: 'rgb(var(--color-text-color90))' }}
      >
        The services page was cluttered and hard to scan. Students couldn&apos;t tell
        what most services were for, so we gave each service a description. The most
        popular ones were moved to the hero. We added search and an audience filter to
        help students find what they need faster.
      </p>

      <CaseStudyVideo
        src={VIDEO_SRC}
        alt="Walkthrough of the redesigned University of Alberta library services page hero and popular services grid"
      />

      <OpenPrototypeLink slug="full-services" className="mt-6" />
    </div>
  )
}
