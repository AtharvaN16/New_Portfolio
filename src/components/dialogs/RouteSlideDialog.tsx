'use client'

import { m, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useRef, type ComponentType } from 'react'
import { RemoveScroll } from 'react-remove-scroll'
import {
  dispatchDialogClosed,
  OVERLAY_DIALOGS,
  subscribeOverlayCheck,
  subscribeOverlayPreload,
  type OverlayDialogId,
} from '@/lib/overlay-events'

export type RouteOverlayDialogId = Exclude<OverlayDialogId, 'case-study'>

const TRANSITION_EASE: [number, number, number, number] = [0.87, 0, 0.13, 1]
const OPEN_DURATION = 1.2
const CLOSE_DURATION = 1.0

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
  const routePath = OVERLAY_DIALOGS[dialogId].path!
  const scrollYRef = useRef(0)
  const [isOpen, setIsOpen] = useState(false)
  const [shouldLockScroll, setShouldLockScroll] = useState(false)

  useEffect(() => {
    const handlePreload = () => {
      void preloadPage()
    }

    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => handlePreload())
      } else {
        setTimeout(handlePreload, 2000)
      }
    }

    return subscribeOverlayPreload(dialogId, handlePreload)
  }, [dialogId, preloadPage])

  useEffect(() => {
    const checkURL = () => {
      const shouldOpen = window.location.pathname === routePath

      if (shouldOpen && !isOpen) {
        scrollYRef.current = window.scrollY
        document.body.style.overflow = 'hidden'
        setShouldLockScroll(true)
        setIsOpen(true)
      } else if (!shouldOpen && isOpen) {
        setIsOpen(false)
      }
    }

    checkURL()
    window.addEventListener('popstate', checkURL)
    const removeCheck = subscribeOverlayCheck(dialogId, checkURL)

    return () => {
      window.removeEventListener('popstate', checkURL)
      removeCheck()
    }
  }, [dialogId, isOpen, routePath])

  const handleExitComplete = () => {
    setShouldLockScroll(false)
    document.body.style.overflow = ''
    window.scrollTo(0, scrollYRef.current)
    dispatchDialogClosed()
  }

  return (
    <RemoveScroll enabled={shouldLockScroll}>
      <AnimatePresence onExitComplete={handleExitComplete}>
        {isOpen && (
          <m.div
            key={`${dialogId}-dialog`}
            id="dialog"
            className={`dialog fixed inset-0 z-[100]${scrollable ? ' overflow-y-auto' : ''}`}
            data-lenis-prevent="true"
            initial={{ y: '100%' }}
            animate={{
              y: 0,
              transition: {
                duration: OPEN_DURATION,
                ease: TRANSITION_EASE,
              },
            }}
            exit={{
              y: '100%',
              transition: {
                duration: CLOSE_DURATION,
                ease: TRANSITION_EASE,
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
