import { useEffect, useRef } from 'react'

interface UseVideoPlaybackInViewOptions {
  /** Fraction of the observed element that must be visible to play. */
  threshold?: number
  rootMargin?: string
  enabled?: boolean
}

/** Grid / card videos — only decode when the card is meaningfully on screen. */
export const VIDEO_CARD_VISIBILITY_THRESHOLD = 0.5

/** Full-bleed hero videos — play once the hero occupies a solid share of the viewport. */
export const VIDEO_HERO_VISIBILITY_THRESHOLD = 0.35

/**
 * Plays a muted inline video when its target is in view; pauses when scrolled away
 * or the tab is hidden.
 */
export function useVideoPlaybackInView(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  observeRef?: React.RefObject<HTMLElement | null>,
  options: UseVideoPlaybackInViewOptions = {}
) {
  const { threshold = VIDEO_CARD_VISIBILITY_THRESHOLD, rootMargin = '0px', enabled = true } = options
  const isIntersectingRef = useRef(false)

  useEffect(() => {
    if (!enabled) return

    const video = videoRef.current
    const target = observeRef?.current ?? video
    if (!video || !target) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersectingRef.current = entry.isIntersecting
        if (entry.isIntersecting) {
          void video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(target)

    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        video.pause()
      } else if (isIntersectingRef.current) {
        void video.play().catch(() => {})
      }
    }

    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [videoRef, observeRef, threshold, rootMargin, enabled])
}
