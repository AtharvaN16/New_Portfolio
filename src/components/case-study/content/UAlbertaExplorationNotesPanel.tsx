'use client'

import { useEffect, useRef, useState } from 'react'
import { useAccessibility } from '@/components/providers/AccessibilityProvider'
import { cn } from '@/lib/utils/cn'

type NoteTone = 'positive' | 'negative'

export interface ExplorationNote {
  text: string
  tone: NoteTone
}

const NOTE_TONE_CLASS: Record<NoteTone, string> = {
  positive: 'text-[#2a7a52] dark:text-[#72d39a]',
  negative: 'text-[#b84d4d] dark:text-[#e8a598]',
}

const FADE_OUT_MS = 280
const TEXT_HOLD_MS = 80
const FADE_IN_MS = 480

/** Reserves height for V1 notes so the section does not jump between tabs. */
export const EXPLORATION_NOTES_MIN_HEIGHT_CLASS =
  'min-h-[42rem] md:min-h-[44rem]'

export const UALBERTA_FINAL_SOLUTION_SECTION_ID = 'ualberta-final-solution'

export function scrollToFinalSolution(sectionId = UALBERTA_FINAL_SOLUTION_SECTION_ID) {
  const element = document.getElementById(sectionId)
  if (!element) return

  const lenis = window.lenis
  if (lenis) {
    lenis.scrollTo(`#${sectionId}`, {
      offset: -120,
      duration: 1.5,
      easing: (t: number) => 1 - (1 - t) ** 5,
    })
    return
  }

  element.scrollIntoView({ behavior: 'smooth' })
}

function ExplorationNotesList({ notes }: { notes: ExplorationNote[] }) {
  return (
    <ol className="space-y-5">
      {notes.map((note, noteIndex) => (
        <li key={note.text} className="grid grid-cols-[22px_1fr] gap-3">
          <span className="mt-[0.15em] flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-[#c60011] text-[11px] font-bold leading-none text-white md:text-[12px]">
            {noteIndex + 1}
          </span>
          <p
            className={`text-[14px] leading-relaxed md:text-[15px] ${NOTE_TONE_CLASS[note.tone]}`}
          >
            {note.text}
          </p>
        </li>
      ))}
    </ol>
  )
}

export function UAlbertaExplorationNotesPanel({
  noteSets,
  activeIndex,
}: {
  noteSets: ExplorationNote[][]
  activeIndex: number
}) {
  const { reducedMotion } = useAccessibility()
  const [renderIndex, setRenderIndex] = useState(activeIndex)
  const [textVisible, setTextVisible] = useState(true)
  const timersRef = useRef<number[]>([])
  const transitionTargetRef = useRef(activeIndex)

  const motionClass = reducedMotion ? 'transition-none' : 'transition-opacity ease-in-out'

  const clearTimers = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id))
    timersRef.current = []
  }

  const schedule = (fn: () => void, delay: number) => {
    const id = window.setTimeout(fn, delay)
    timersRef.current.push(id)
  }

  useEffect(() => {
    clearTimers()
    transitionTargetRef.current = activeIndex

    if (reducedMotion) {
      setRenderIndex(activeIndex)
      setTextVisible(true)
      return
    }

    if (activeIndex === renderIndex && textVisible) {
      return
    }

    setTextVisible(false)

    schedule(() => {
      if (transitionTargetRef.current !== activeIndex) return

      setRenderIndex(activeIndex)

      schedule(() => {
        if (transitionTargetRef.current !== activeIndex) return

        setTextVisible(true)
      }, TEXT_HOLD_MS)
    }, FADE_OUT_MS)

    return clearTimers
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only re-run when the target slide changes
  }, [activeIndex, reducedMotion])

  useEffect(() => () => clearTimers(), [])

  const notes = noteSets[renderIndex]

  return (
    <div className="relative">
      <div
        className={cn(motionClass, textVisible ? 'opacity-100' : 'opacity-0')}
        style={{
          transitionDuration: reducedMotion
            ? undefined
            : `${textVisible ? FADE_IN_MS : FADE_OUT_MS}ms`,
        }}
        aria-live="polite"
      >
        {notes ? <ExplorationNotesList notes={notes} /> : null}
      </div>
    </div>
  )
}
