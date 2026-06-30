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
  '/videos/case-studies/ualberta-library-website/subject-guides-reel.mp4'

const PROSE_MAX = 'max-w-[680px]'
const SECTION_LABEL = CASE_STUDY_SECTION_LABEL_PROSE
const HEADLINE_MD = `${CASE_STUDY_SECTION_HEADLINE_SPACED} ${PROSE_MAX}`
const BODY_FULL = `text-base md:text-[18px] font-normal ${CASE_STUDY_BODY_LEADING} w-full`

export function UAlbertaSubjectGuidesReelSection() {
  return (
    <div className={CASE_STUDY_NARRATIVE_SECTION_GAP}>
      <h3
        id="ualberta-subject-guides-solution-heading"
        className={SECTION_LABEL}
        style={{ color: 'rgb(var(--color-text-tertiary))' }}
      >
        Solution
      </h3>

      <AnimatedText
        variant="heading"
        text="Consolidating all guides into one browsable page"
        animationType="fadeIn"
        alwaysAnimate={false}
        delay={0}
        className={HEADLINE_MD}
      />

      <p
        className={`${BODY_FULL} mb-8 md:mb-10`}
        style={{ color: 'rgb(var(--color-text-color90))' }}
      >
        Guides were scattered across multiple pages and types. We consolidated all
        guide types into one page and added an explainer at the top. A search bar
        helps students find what they need. Categories now use expandable dropdowns,
        so students can quickly scan for guides without clicking through multiple
        pages.
      </p>

      <CaseStudyVideo
        src={VIDEO_SRC}
        alt="Walkthrough of the redesigned University of Alberta library subject guides page"
      />

      <OpenPrototypeLink slug="subject-guides" className="mt-6" />
    </div>
  )
}
