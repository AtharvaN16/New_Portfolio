import { CASE_STUDY_RETURN_PATH_KEY, rememberCaseStudyOpener } from '@/lib/case-study-overlay'

export type OverlayDialogId =
  | 'work'
  | 'explorations'
  | 'case-study'
  | 'about'
  | 'writings'

export type OverlayRoutePath =
  | '/work'
  | '/explorations'
  | '/about'
  | '/writings'

interface OverlayDialogConfig {
  path: OverlayRoutePath | null
  preload: string
  check: string
}

/** Single source of truth for overlay custom event names and route paths. */
export const OVERLAY_DIALOGS = {
  work: {
    path: '/work',
    preload: 'workdialog:preload',
    check: 'workdialog:check',
  },
  explorations: {
    path: '/explorations',
    preload: 'explorationsdialog:preload',
    check: 'explorationsdialog:check',
  },
  about: {
    path: '/about',
    preload: 'aboutdialog:preload',
    check: 'aboutdialog:check',
  },
  writings: {
    path: '/writings',
    preload: 'writingsdialog:preload',
    check: 'writingsdialog:check',
  },
  'case-study': {
    path: null,
    preload: 'casestudydialog:preload',
    check: 'casestudydialog:check',
  },
} as const satisfies Record<OverlayDialogId, OverlayDialogConfig>

export const DIALOG_CLOSED_EVENT = 'dialog:closed'
export const HOME_PAUSE_BLOBS_EVENT = 'home:pause-blobs'

const ALL_OVERLAY_IDS: OverlayDialogId[] = [
  'work',
  'explorations',
  'about',
  'writings',
  'case-study',
]

export function overlayDialogFromPath(path: string): OverlayDialogId | null {
  if (path === '/work') return 'work'
  if (path === '/explorations') return 'explorations'
  if (path === '/about') return 'about'
  if (path === '/writings') return 'writings'
  if (path.startsWith('/case-studies/')) return 'case-study'
  return null
}

export function dispatchOverlayPreload(id: OverlayDialogId): void {
  window.dispatchEvent(new CustomEvent(OVERLAY_DIALOGS[id].preload))
}

export function dispatchOverlayCheck(id: OverlayDialogId): void {
  window.dispatchEvent(new CustomEvent(OVERLAY_DIALOGS[id].check))
}

export function openOverlayRoute(path: OverlayRoutePath): void {
  window.history.pushState({}, '', path)
  const id = overlayDialogFromPath(path)
  if (id) dispatchOverlayCheck(id)
}

export function openCaseStudyOverlay(
  slug: string,
  returnPath = window.location.pathname
): void {
  rememberCaseStudyOpener()
  try {
    sessionStorage.setItem(CASE_STUDY_RETURN_PATH_KEY, returnPath)
  } catch {
    /* ignore quota / private mode */
  }
  window.history.pushState({}, '', `/case-studies/${slug}`)
  dispatchOverlayCheck('case-study')
}

export function dispatchDialogClosed(): void {
  window.dispatchEvent(new CustomEvent(DIALOG_CLOSED_EVENT))
}

export function dispatchHomePauseBlobs(paused: boolean): void {
  window.dispatchEvent(
    new CustomEvent(HOME_PAUSE_BLOBS_EVENT, { detail: { paused } })
  )
}

export function subscribeOverlayPreload(
  id: OverlayDialogId,
  handler: () => void
): () => void {
  const event = OVERLAY_DIALOGS[id].preload
  window.addEventListener(event, handler)
  return () => window.removeEventListener(event, handler)
}

export function subscribeOverlayCheck(
  id: OverlayDialogId,
  handler: () => void
): () => void {
  const event = OVERLAY_DIALOGS[id].check
  window.addEventListener(event, handler)
  return () => window.removeEventListener(event, handler)
}

export function subscribeDialogClosed(handler: () => void): () => void {
  window.addEventListener(DIALOG_CLOSED_EVENT, handler)
  return () => window.removeEventListener(DIALOG_CLOSED_EVENT, handler)
}

export function subscribeHomePauseBlobs(
  handler: (paused: boolean) => void
): () => void {
  const listener = (event: Event) => {
    handler((event as CustomEvent<{ paused: boolean }>).detail.paused)
  }
  window.addEventListener(HOME_PAUSE_BLOBS_EVENT, listener)
  return () => window.removeEventListener(HOME_PAUSE_BLOBS_EVENT, listener)
}

/** Subscribe to all overlay `:check` events (path sync, blob pause, etc.). */
export function addAllOverlayCheckListeners(handler: () => void): () => void {
  const unsubscribers = ALL_OVERLAY_IDS.map((id) =>
    subscribeOverlayCheck(id, handler)
  )
  return () => unsubscribers.forEach((unsub) => unsub())
}

/** Subscribe to `:preload` on every overlay; returns one cleanup function. */
export function addAllOverlayPreloadListeners(
  handlers: Record<OverlayDialogId, () => void>
): () => void {
  const unsubscribers = ALL_OVERLAY_IDS.map((id) =>
    subscribeOverlayPreload(id, handlers[id])
  )
  return () => unsubscribers.forEach((unsub) => unsub())
}

/** Subscribe to `:check` on route overlays (excludes case study). */
export function addRouteOverlayCheckListeners(handler: () => void): () => void {
  const routeIds: OverlayDialogId[] = [
    'work',
    'explorations',
    'about',
    'writings',
  ]
  const unsubscribers = routeIds.map((id) => subscribeOverlayCheck(id, handler))
  return () => unsubscribers.forEach((unsub) => unsub())
}

export function overlayCheckEvent(id: OverlayDialogId): string {
  return OVERLAY_DIALOGS[id].check
}

export function overlayPreloadEvent(id: OverlayDialogId): string {
  return OVERLAY_DIALOGS[id].preload
}
