/** Section kicker labels — 14px mobile, 16px md+, sentence case, semibold */
export const CASE_STUDY_SECTION_LABEL =
  'text-sm md:text-base font-semibold normal-case leading-ui'

/** Finding bullet copy — 14px mobile, 15px md+ */
export const CASE_STUDY_FINDING_BULLET_TEXT =
  'text-[14px] md:text-[15px] font-normal leading-normal'

/** Vertical rhythm between finding bullets */
export const CASE_STUDY_FINDING_BULLET_LIST = 'space-y-1 md:space-y-1.5'

/** Body copy line height — 26/18 ratio (18px → 26px at md) */
export const CASE_STUDY_BODY_LEADING = 'leading-normal'

/** Section / major headlines — heading ratio */
export const CASE_STUDY_HEADING_LEADING = 'leading-tight'

/** Largest case study headlines — title ratio */
export const CASE_STUDY_TITLE_LEADING = 'leading-title'

/** Subsection titles — subhead ratio */
export const CASE_STUDY_SUBHEAD_LEADING = 'leading-snug'

/** Major section headlines — was 40px, now 32px */
export const CASE_STUDY_MAJOR_HEADLINE =
  `text-xl md:text-[32px] font-bold text-text-primary ${CASE_STUDY_TITLE_LEADING} tracking-[-0.05em]`

export const CASE_STUDY_MAJOR_HEADLINE_SPACED = `${CASE_STUDY_MAJOR_HEADLINE} mb-6 md:mb-8`

/** Section headlines — 20px mobile, 24px md+ (was 32px before column resize) */
export const CASE_STUDY_SECTION_HEADLINE =
  `text-xl md:text-2xl font-bold text-text-primary ${CASE_STUDY_HEADING_LEADING} tracking-[-0.05em]`

export const CASE_STUDY_SECTION_HEADLINE_SPACED = `${CASE_STUDY_SECTION_HEADLINE} mb-6 md:mb-8`

/** Abstract / block titles — was 28px, now 24px */
export const CASE_STUDY_ABSTRACT_TITLE =
  `text-base md:text-2xl font-bold text-text-primary mb-6 md:mb-[28px] ${CASE_STUDY_HEADING_LEADING}`

/** Subsection titles — was 24px, now 20px */
export const CASE_STUDY_SUBSECTION_TITLE =
  `text-base md:text-xl font-bold text-text-primary mb-6 md:mb-[28px] ${CASE_STUDY_SUBHEAD_LEADING}`

/** Standard case study body paragraph */
export const CASE_STUDY_BODY_TEXT = `text-base md:text-[18px] font-normal text-text-body ${CASE_STUDY_BODY_LEADING}`

export const CASE_STUDY_PROSE_MAX = 'max-w-[680px]'

export const CASE_STUDY_SECTION_LABEL_WITH_SPACING = `${CASE_STUDY_SECTION_LABEL} mb-6 md:mb-[28px]`

/** Section label + spacing + readable line length (UAlberta, NYC DCWP, etc.) */
export const CASE_STUDY_SECTION_LABEL_PROSE = `${CASE_STUDY_SECTION_LABEL_WITH_SPACING} ${CASE_STUDY_PROSE_MAX}`

/** Alternate kickers (Aquitania, NYC DCWP) — same label treatment */
export const CASE_STUDY_SECTION_KICKER =
  'text-sm md:text-base font-semibold normal-case leading-ui'
