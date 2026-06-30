'use client'

import { AnimatedScribble } from './AnimatedScribble'
import { HERO_NAME_WORD_CLASS } from './hero-name-word'
import {
  PRONUNCIATION_SCRIBBLE_MOUNT_CLASS,
  PRONUNCIATION_SCRIBBLE_MOUNT_STYLE,
} from './pronunciation-scribble-mount'

interface HeroPronunciationWordProps {
  word: string
  pronunciation: string
  /** Mount underline after bio reveal (matches desktop post–line-reveal timing) */
  showScribble?: boolean
}

/** Shared pronunciation markup — desktop hover + mobile tap use the same DOM/CSS. */
export function HeroPronunciationWord({
  word,
  pronunciation,
  showScribble = false,
}: HeroPronunciationWordProps) {
  return (
    <span
      className={`pronunciation-word pronunciation-word--tappable ${HERO_NAME_WORD_CLASS}`}
      role="button"
      tabIndex={0}
      aria-label={`${word}, tap for pronunciation`}
    >
      {word}
      <span className="pronunciation-tooltip" aria-hidden="true">
        {pronunciation}
      </span>
      {showScribble ? (
        <span
          aria-hidden="true"
          className={PRONUNCIATION_SCRIBBLE_MOUNT_CLASS}
          style={PRONUNCIATION_SCRIBBLE_MOUNT_STYLE}
        >
          <AnimatedScribble />
        </span>
      ) : null}
    </span>
  )
}
