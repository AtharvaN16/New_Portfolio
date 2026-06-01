/** Section kicker labels (e.g. "Project Overview", "Research Objectives") */
export const CASE_STUDY_SECTION_LABEL =
  'text-[12px] md:text-[14px] font-bold uppercase'

export const CASE_STUDY_PROSE_MAX = 'max-w-[680px]'

export const CASE_STUDY_SECTION_LABEL_WITH_SPACING = `${CASE_STUDY_SECTION_LABEL} mb-6 md:mb-[28px]`

/** Section label + spacing + readable line length (UAlberta, NYC DCWP, etc.) */
export const CASE_STUDY_SECTION_LABEL_PROSE = `${CASE_STUDY_SECTION_LABEL_WITH_SPACING} ${CASE_STUDY_PROSE_MAX}`

/** Alternate kickers that use semibold (Aquitania, NYC DCWP) */
export const CASE_STUDY_SECTION_KICKER =
  'text-[12px] md:text-[14px] font-semibold uppercase'
