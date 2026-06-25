'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, m } from 'framer-motion'
import LibraryLocationCard from '../LibraryLocationCard'
import type { LibraryLocation } from '@/lib/data/library-hours-data'

const CAMERON_LIBRARY_ID = 'cameron'
const SPOTLIGHT_SCALE = 1.38
const LAYOUT_EASE = [0.22, 1, 0.36, 1] as const
const CAMERON_RENOVATION_NOTICE =
  'The library is temporarily closed for renovations. Remote consultations and digital services remain available. In-person access is expected to resume in Fall 2025.'

interface HoursLocationCardSpotlightProps {
  library: LibraryLocation
  enabled?: boolean
}

export function HoursLocationCardSpotlight({
  library,
  enabled = false,
}: HoursLocationCardSpotlightProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const isActiveRef = useRef(false)
  const [isActive, setIsActive] = useState(false)
  const [showRenovationNotice, setShowRenovationNotice] = useState(false)
  const [originRect, setOriginRect] = useState<DOMRect | null>(null)
  const [mounted, setMounted] = useState(false)

  const setSpotlightActive = useCallback((active: boolean) => {
    isActiveRef.current = active
    setIsActive(active)
    if (!active) setShowRenovationNotice(false)
  }, [])

  const closeSpotlight = useCallback(() => {
    setSpotlightActive(false)
  }, [setSpotlightActive])

  const activateSpotlight = useCallback(() => {
    if (!enabled || isActiveRef.current) return
    const rect = wrapperRef.current?.getBoundingClientRect()
    if (!rect || rect.width === 0 || rect.height === 0) return
    setOriginRect(rect)
    setShowRenovationNotice(false)
    setSpotlightActive(true)
  }, [enabled, setSpotlightActive])

  const handleCardClick = () => {
    activateSpotlight()
  }

  const handleSpotlightCardClick = (event: React.MouseEvent) => {
    event.stopPropagation()
    if (!showRenovationNotice) setShowRenovationNotice(true)
  }

  const handleExitComplete = useCallback(() => {
    setOriginRect(null)
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!isActive) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeSpotlight()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isActive, closeSpotlight])

  const overlay =
    mounted && originRect
      ? createPortal(
          <AnimatePresence onExitComplete={handleExitComplete}>
            {isActive ? (
              <>
                <m.div
                  key="hours-spotlight-backdrop"
                  className="fixed inset-0 z-[300] cursor-pointer bg-[#1a1a1a]/38 backdrop-blur-md"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  onClick={closeSpotlight}
                  aria-hidden
                />
                <m.div
                  key="hours-spotlight-card"
                  role="dialog"
                  aria-label={`${library.name} spotlight`}
                  className="fixed z-[301] cursor-pointer pointer-events-auto rounded-sm shadow-[0_28px_72px_rgba(0,0,0,0.28)]"
                  style={{ width: originRect.width }}
                  initial={{
                    top: originRect.top,
                    left: originRect.left,
                    scale: 1,
                    opacity: 1,
                  }}
                  animate={{
                    top: '50%',
                    left: '50%',
                    x: '-50%',
                    y: '-50%',
                    scale: SPOTLIGHT_SCALE,
                    opacity: 1,
                  }}
                  exit={{
                    top: originRect.top,
                    left: originRect.left,
                    x: 0,
                    y: 0,
                    scale: 1,
                    opacity: 0,
                  }}
                  transition={{ type: 'spring', stiffness: 220, damping: 26 }}
                  onClick={handleSpotlightCardClick}
                >
                  <m.div
                    layout
                    transition={{ layout: { duration: 0.42, ease: LAYOUT_EASE } }}
                  >
                    <LibraryLocationCard
                      library={library}
                      notification={
                        showRenovationNotice ? CAMERON_RENOVATION_NOTICE : undefined
                      }
                      animateNotification={showRenovationNotice}
                    />
                  </m.div>
                </m.div>
              </>
            ) : null}
          </AnimatePresence>,
          document.body
        )
      : null

  return (
    <>
      <div
        ref={wrapperRef}
        className={
          isActive ? 'pointer-events-none opacity-0' : enabled ? 'cursor-pointer' : undefined
        }
        onClick={handleCardClick}
        onKeyDown={(event) => {
          if (!enabled || isActive) return
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            activateSpotlight()
          }
        }}
        role={enabled ? 'button' : undefined}
        tabIndex={enabled && !isActive ? 0 : undefined}
        aria-hidden={isActive}
        aria-label={enabled ? `Spotlight ${library.name}` : undefined}
      >
        <LibraryLocationCard library={library} />
      </div>
      {overlay}
    </>
  )
}

export function isCameronSpotlightLibrary(library: LibraryLocation): boolean {
  return library.id === CAMERON_LIBRARY_ID
}
