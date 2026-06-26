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
  '/videos/case-studies/ualberta-library-website/subject-guides-reel.mp4'

const PROSE_MAX = 'max-w-[680px]'
const SECTION_LABEL = CASE_STUDY_SECTION_LABEL_PROSE
const HEADLINE_MD = `${CASE_STUDY_SECTION_HEADLINE_SPACED} ${PROSE_MAX}`
const BODY_MUTED = `text-base md:text-[18px] font-normal ${CASE_STUDY_BODY_LEADING} ${PROSE_MAX}`

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
        text="Making subject guides easier to browse, search, and discover"
        animationType="fadeIn"
        alwaysAnimate={false}
        delay={0}
        className={HEADLINE_MD}
      />

      <p
        className={`${BODY_MUTED} mb-4`}
        style={{ color: 'rgb(var(--color-text-color90))' }}
      >
        The redesigned subject guides page organizes disciplines into scannable
        categories, adds a search that jumps directly to the right guide, and
        keeps related database access one click away.
      </p>

      <p
        className={`${BODY_MUTED} mb-8 md:mb-10`}
        style={{ color: 'rgb(var(--color-text-color90))' }}
      >
        This walkthrough shows how a student can search for a topic, open the
        matching category, and land on the guide they need without digging through
        nested menus.
      </p>

      <CaseStudyVideo
        src={VIDEO_SRC}
        alt="Walkthrough of the redesigned University of Alberta library subject guides page"
      />
    </div>
  )
}
