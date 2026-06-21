'use client'

import { useEffect, useRef, useState } from 'react'
import { useAccessibility } from '@/components/providers/AccessibilityProvider'
import { cn } from '@/lib/utils/cn'
import { scrollToContainerElement } from '@/hooks/use-container-scroll'

type NoteTone = 'positive' | 'negative'

export interface ExplorationNote {
  text: string
  tone: NoteTone
}

const NOTE_BADGE_CLASS: Record<NoteTone, string> = {
  positive: 'bg-[#2a7a52] text-[#0f5f38] dark:bg-[#72d39a] dark:text-[#0f5f38]',
  negative: 'bg-[#b84d4d] text-[#6b2020] dark:bg-[#c97a6f] dark:text-[#6b2020]',
}

const FADE_OUT_MS = 280
const TEXT_HOLD_MS = 80
const FADE_IN_MS = 480

/** Reserves height for V1 notes so the section does not jump between tabs. */
export const EXPLORATION_NOTES_MIN_HEIGHT_CLASS =
  'min-h-[42rem] md:min-h-[44rem]'

export const UALBERTA_FINAL_SOLUTION_SECTION_ID = 'ualberta-final-solution'

export function scrollToFinalSolution(
  sectionId = UALBERTA_FINAL_SOLUTION_SECTION_ID
) {
  scrollToContainerElement(sectionId)
}

function ExplorationNotesList({ notes }: { notes: ExplorationNote[] }) {
  return (
    <ol className="space-y-5">
      {notes.map((note, noteIndex) => (
        <li key={note.text} className="grid grid-cols-[18px_1fr] gap-2.5">
          <span
            className={`mt-[0.1em] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full text-[10px] font-bold leading-none ${NOTE_BADGE_CLASS[note.tone]}`}
          >
            {noteIndex + 1}
          </span>
          <p className="text-[12px] leading-relaxed text-text-secondary">
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
