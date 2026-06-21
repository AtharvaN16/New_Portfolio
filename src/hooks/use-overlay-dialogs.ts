'use client'

import { useCallback, useEffect, useState } from 'react'

export type OverlayDialogId =
  | 'work'
  | 'explorations'
  | 'case-study'
  | 'about'
  | 'writings'

export function overlayDialogFromPath(path: string): OverlayDialogId | null {
  if (path === '/work') return 'work'
  if (path === '/explorations') return 'explorations'
  if (path === '/about') return 'about'
  if (path === '/writings') return 'writings'
  if (path.startsWith('/case-studies/')) return 'case-study'
  return null
}

/**
 * Lazily mounts overlay dialog components on the home page.
 * Only the dialog(s) actually needed are added to the mounted set.
 * Once mounted, a dialog stays mounted for the session (avoids remount churn
 * when navigating Work → case study, etc.).
 */
export function useOverlayDialogs() {
  const [mountedDialogs, setMountedDialogs] = useState<Set<OverlayDialogId>>(
    () => new Set()
  )

  const mountDialog = useCallback((id: OverlayDialogId) => {
    setMountedDialogs((prev) => {
      if (prev.has(id)) return prev
      const next = new Set(prev)
      next.add(id)
      return next
    })
  }, [])

  useEffect(() => {
    const syncFromPath = () => {
      const id = overlayDialogFromPath(window.location.pathname)
      if (id) mountDialog(id)
    }

    const preloadWork = () => mountDialog('work')
    const preloadExplorations = () => mountDialog('explorations')
    const preloadCaseStudy = () => mountDialog('case-study')
    const preloadAbout = () => mountDialog('about')
    const preloadWritings = () => mountDialog('writings')

    syncFromPath()

    window.addEventListener('popstate', syncFromPath)
    window.addEventListener('workdialog:preload', preloadWork)
    window.addEventListener('workdialog:check', syncFromPath)
    window.addEventListener('explorationsdialog:preload', preloadExplorations)
    window.addEventListener('explorationsdialog:check', syncFromPath)
    window.addEventListener('casestudydialog:preload', preloadCaseStudy)
    window.addEventListener('casestudydialog:check', syncFromPath)
    window.addEventListener('aboutdialog:preload', preloadAbout)
    window.addEventListener('aboutdialog:check', syncFromPath)
    window.addEventListener('writingsdialog:preload', preloadWritings)
    window.addEventListener('writingsdialog:check', syncFromPath)

    return () => {
      window.removeEventListener('popstate', syncFromPath)
      window.removeEventListener('workdialog:preload', preloadWork)
      window.removeEventListener('workdialog:check', syncFromPath)
      window.removeEventListener('explorationsdialog:preload', preloadExplorations)
      window.removeEventListener('explorationsdialog:check', syncFromPath)
      window.removeEventListener('casestudydialog:preload', preloadCaseStudy)
      window.removeEventListener('casestudydialog:check', syncFromPath)
      window.removeEventListener('aboutdialog:preload', preloadAbout)
      window.removeEventListener('aboutdialog:check', syncFromPath)
      window.removeEventListener('writingsdialog:preload', preloadWritings)
      window.removeEventListener('writingsdialog:check', syncFromPath)
    }
  }, [mountDialog])

  const isDialogMounted = useCallback(
    (id: OverlayDialogId) => mountedDialogs.has(id),
    [mountedDialogs]
  )

  return { isDialogMounted }
}
