'use client'

import { m, AnimatePresence } from 'framer-motion'
import { type ComponentType } from 'react'
import { RemoveScroll } from 'react-remove-scroll'
import { useOverlayLifecycle } from '@/hooks/use-overlay-lifecycle'
import { OVERLAY_DIALOGS, type OverlayDialogId } from '@/lib/overlay-events'
import {
  OVERLAY_CLOSE_DURATION,
  OVERLAY_OPEN_DURATION,
  OVERLAY_TRANSITION_EASE,
} from '@/lib/overlay-tokens'

export type RouteOverlayDialogId = Exclude<OverlayDialogId, 'case-study'>

interface RouteSlideDialogProps {
  dialogId: RouteOverlayDialogId
  Page: ComponentType
  preloadPage: () => Promise<unknown>
  /** Work overlay scrolls internally; other routes use page-level scroll. */
  scrollable?: boolean
}

/**
 * Shared slide-up overlay for /work, /about, /explorations, /writings.
 * Opens when window.location matches the route path; closes on back/popstate.
 */
export function RouteSlideDialog({
  dialogId,
  Page,
  preloadPage,
  scrollable = false,
}: RouteSlideDialogProps) {
  const configuredRoutePath = OVERLAY_DIALOGS[dialogId].path!

  const { isOpen, shouldLockScroll, routePath, handleExitComplete } =
    useOverlayLifecycle({
      dialogId,
      match: { mode: 'exact', path: configuredRoutePath },
      preload: preloadPage,
    })

  return (
    <RemoveScroll enabled={shouldLockScroll}>
      <AnimatePresence onExitComplete={handleExitComplete}>
        {isOpen && (
          <m.div
            key={`${dialogId}-dialog`}
            id="dialog"
            className={`dialog fixed inset-0 z-[100]${scrollable ? ' overflow-y-auto' : ''}`}
            data-lenis-prevent="true"
            data-overlay-active="true"
            data-overlay-route={routePath ?? configuredRoutePath}
            role="dialog"
            aria-modal="true"
            initial={{ y: '100%' }}
            animate={{
              y: 0,
              transition: {
                duration: OVERLAY_OPEN_DURATION,
                ease: OVERLAY_TRANSITION_EASE,
              },
            }}
            exit={{
              y: '100%',
              transition: {
                duration: OVERLAY_CLOSE_DURATION,
                ease: OVERLAY_TRANSITION_EASE,
              },
            }}
            style={{
              backgroundColor: 'rgb(var(--color-background))',
              boxShadow: 'var(--shadow-2xl)',
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden',
            }}
          >
            <Page />
          </m.div>
        )}
      </AnimatePresence>
    </RemoveScroll>
  )
}
