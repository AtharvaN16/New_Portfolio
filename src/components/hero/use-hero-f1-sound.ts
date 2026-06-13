import { useEffect } from 'react'

export const HERO_F1_SOUND_SRC = '/audio/soundreality-whoosh-end-384629.mp3'
export const HERO_F1_ENTRY_DELAY_MS = 500
export const HERO_F1_AUDIO_PEAK_MS = 584
export const HERO_F1_VISUAL_CREST_AFTER_ENTRY_MS = 334
export const HERO_F1_SOUND_PLAY_DELAY_MS = Math.max(
  0,
  HERO_F1_ENTRY_DELAY_MS +
    HERO_F1_VISUAL_CREST_AFTER_ENTRY_MS -
    HERO_F1_AUDIO_PEAK_MS
)
export const HERO_F1_SOUND_ATTEMPT_DELAYS_MS = [
  HERO_F1_SOUND_PLAY_DELAY_MS,
  HERO_F1_SOUND_PLAY_DELAY_MS + 125,
  HERO_F1_SOUND_PLAY_DELAY_MS + 250,
]
export const HERO_F1_SOUND_FALLBACK_DEADLINE_MS = 900
export const HERO_F1_SOUND_VOLUME = 0.3

interface NetworkInformationWithSaveData {
  saveData?: boolean
}

interface NavigatorWithConnection extends Navigator {
  connection?: NetworkInformationWithSaveData
}

function shouldSkipHeroSound(): boolean {
  if (typeof window === 'undefined') return true

  const isDesktop = window.matchMedia('(min-width: 768px)').matches
  const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches
  const connection = (navigator as NavigatorWithConnection).connection
  const saveData = connection?.saveData === true

  return !isDesktop || isCoarsePointer || prefersReducedMotion || saveData
}

export function useHeroF1Sound() {
  useEffect(() => {
    if (shouldSkipHeroSound()) return

    const audio = new Audio(HERO_F1_SOUND_SRC)
    audio.preload = 'auto'
    audio.volume = HERO_F1_SOUND_VOLUME
    audio.load()

    let hasPlayed = false
    let isAttempting = false
    let disposed = false

    const gestureEvents = ['pointerdown', 'keydown', 'touchstart'] as const

    const removeGestureFallback = () => {
      gestureEvents.forEach((eventName) => {
        document.removeEventListener(eventName, attemptPlayFromGesture)
      })
    }

    const attemptPlay = () => {
      if (disposed || hasPlayed || isAttempting) return

      isAttempting = true
      audio.currentTime = 0
      void audio
        .play()
        .then(() => {
          hasPlayed = true
          removeGestureFallback()
        })
        .catch(() => {
          // Browsers commonly block audible autoplay on first load.
        })
        .finally(() => {
          isAttempting = false
        })
    }

    function attemptPlayFromGesture() {
      attemptPlay()
    }

    gestureEvents.forEach((eventName) => {
      document.addEventListener(eventName, attemptPlayFromGesture, {
        once: true,
        passive: true,
      })
    })

    const attemptTimeoutIds = HERO_F1_SOUND_ATTEMPT_DELAYS_MS.map((delay) =>
      window.setTimeout(attemptPlay, delay)
    )
    const fallbackTimeoutId = window.setTimeout(
      removeGestureFallback,
      HERO_F1_SOUND_FALLBACK_DEADLINE_MS
    )

    return () => {
      disposed = true
      attemptTimeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId))
      window.clearTimeout(fallbackTimeoutId)
      removeGestureFallback()
      audio.pause()
      audio.currentTime = 0
    }
  }, [])
}
