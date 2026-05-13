/**
 * Stored before opening the case study overlay (see ProjectCard / FullpageCard)
 * so close can use replaceState instead of history.back(), avoiding the Figma
 * embed consuming back navigation.
 */
export const CASE_STUDY_RETURN_PATH_KEY = 'caseStudyReturnPath'
