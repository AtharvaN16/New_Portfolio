/**
 * Stored before opening the case study overlay (see ProjectCard / FullpageCard)
 * so close can use replaceState instead of history.back(), avoiding the Figma
 * embed consuming back navigation.
 */
export const CASE_STUDY_RETURN_PATH_KEY = 'caseStudyReturnPath'

let caseStudyOpenerElement: HTMLElement | null = null

/** Remember the element that opened the overlay for focus return on close. */
export function rememberCaseStudyOpener(element?: HTMLElement | null) {
  if (element) {
    caseStudyOpenerElement = element
    return
  }
  const active = document.activeElement
  caseStudyOpenerElement = active instanceof HTMLElement ? active : null
}

export function restoreCaseStudyOpenerFocus() {
  if (caseStudyOpenerElement?.isConnected) {
    try {
      caseStudyOpenerElement.focus({ preventScroll: true })
    } catch {
      /* ignore focus failures on stale nodes */
    }
  }
  caseStudyOpenerElement = null
}
