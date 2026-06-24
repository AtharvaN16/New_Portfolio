/** next/image quality — hero / above-the-fold imagery. */
export const CASE_STUDY_HERO_IMAGE_QUALITY = 85

/** next/image quality — in-body screenshots, grids, and cards. */
export const CASE_STUDY_CONTENT_IMAGE_QUALITY = 75

/** Matches --cs-content-max (56rem / 896px @ 16px root). */
export const CASE_STUDY_CONTENT_MAX_PX = 896

/** Default reading-column width used across long-form case study bodies. */
export const CASE_STUDY_INLINE_IMAGE_SIZES = `(max-width: ${CASE_STUDY_CONTENT_MAX_PX}px) 100vw, ${CASE_STUDY_CONTENT_MAX_PX}px`

/** Full-bleed breakout sections (`w-screen`). */
export const CASE_STUDY_FULL_BLEED_IMAGE_SIZES = '100vw'

/** Half-width column in a 2-col grid at lg+. */
export const CASE_STUDY_HALF_COLUMN_IMAGE_SIZES =
  '(max-width: 1024px) 100vw, 50vw'

/** ~50% width on md+ (e.g. matrix backdrop). */
export const CASE_STUDY_WIDE_BACKDROP_IMAGE_SIZES =
  '(max-width: 768px) 100vw, 90vw'
