'use client'

import { useCallback, useEffect, useState } from 'react'
import {
  addAllOverlayCheckListeners,
  addAllOverlayPreloadListeners,
  type OverlayDialogId,
  overlayDialogFromPath,
} from '@/lib/overlay-events'

export type { OverlayDialogId } from '@/lib/overlay-events'
export { overlayDialogFromPath } from '@/lib/overlay-events'

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

    syncFromPath()

    window.addEventListener('popstate', syncFromPath)

    const removePreloads = addAllOverlayPreloadListeners({
      work: () => mountDialog('work'),
      explorations: () => mountDialog('explorations'),
      'case-study': () => mountDialog('case-study'),
      about: () => mountDialog('about'),
      writings: () => mountDialog('writings'),
    })

    const removeChecks = addAllOverlayCheckListeners(syncFromPath)

    return () => {
      window.removeEventListener('popstate', syncFromPath)
      removePreloads()
      removeChecks()
    }
  }, [mountDialog])

  const isDialogMounted = useCallback(
    (id: OverlayDialogId) => mountedDialogs.has(id),
    [mountedDialogs]
  )

  return { isDialogMounted }
}
