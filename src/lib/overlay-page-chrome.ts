import { getCaseStudyBySlug } from '@/lib/data/case-studies'

export const HOME_SHELL_ID = 'home-shell'
export const MAIN_CONTENT_ID = 'main-content'
export const OVERLAY_MAIN_CONTENT_ID = 'overlay-main-content'

export const DEFAULT_DOCUMENT_TITLE = 'Atharva Nayak - Designer & Strategist'

const ROUTE_LABELS: Record<string, string> = {
  '/work': 'Work',
  '/about': 'About',
  '/explorations': 'Explorations',
  '/writings': 'Writings',
}

let savedTitle: string | null = null
let overlayDepth = 0

export function getOverlayTitleForPath(pathname: string): string {
  const caseStudyMatch = pathname.match(/^\/case-studies\/([^/]+)$/)
  if (caseStudyMatch) {
    const study = getCaseStudyBySlug(caseStudyMatch[1])
    return study ? `${study.title} | Atharva Nayak` : DEFAULT_DOCUMENT_TITLE
  }

  const label = ROUTE_LABELS[pathname]
  return label ? `${label} | Atharva Nayak` : DEFAULT_DOCUMENT_TITLE
}

/** Tooling + a11y: title sync, route markers, hide home from AT while overlay is open. */
export function applyOverlayPageChrome(pathname: string): void {
  overlayDepth += 1

  if (overlayDepth === 1) {
    savedTitle = document.title
    document.getElementById(HOME_SHELL_ID)?.setAttribute('aria-hidden', 'true')
  }

  document.documentElement.dataset.overlayActive = 'true'
  document.documentElement.dataset.overlayRoute = pathname
  document.title = getOverlayTitleForPath(pathname)
}

export function clearOverlayPageChrome(): void {
  overlayDepth = Math.max(0, overlayDepth - 1)
  if (overlayDepth > 0) return

  delete document.documentElement.dataset.overlayActive
  delete document.documentElement.dataset.overlayRoute

  document.title = savedTitle ?? DEFAULT_DOCUMENT_TITLE
  savedTitle = null

  document.getElementById(HOME_SHELL_ID)?.removeAttribute('aria-hidden')
}
