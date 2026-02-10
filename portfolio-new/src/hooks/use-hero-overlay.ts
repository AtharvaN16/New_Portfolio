import { useState, useEffect, type RefObject } from 'react'

// Viewport fraction at which overlay has fully faded out (scroll past top)
const HERO_OVERLAY_FADEOUT_VIEWPORT = 0.4
// Visible hero fraction below which overlay fades back in (exiting)
const HERO_OVERLAY_FADEIN_VISIBLE = 0.2
// Max opacity of the dark overlay (image stays visible, only darkened)
export const HERO_OVERLAY_MAX_OPACITY = 0.55

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function useHeroOverlay(
  containerRef: RefObject<HTMLDivElement | null>,
  heroSectionRef: RefObject<HTMLElement | null>
): number {
  const [heroOverlayOpacity, setHeroOverlayOpacity] = useState(1)

  useEffect(() => {
    const container = containerRef.current
    const heroSection = heroSectionRef.current
    if (!container || !heroSection) return

    let rafId: number | null = null

    const updateOverlay = () => {
      const viewportHeight = container.clientHeight
      const scrollTop = container.scrollTop
      const heroTop = heroSection.offsetTop - scrollTop
      const heroHeight = heroSection.offsetHeight

      const visibleTop = Math.max(0, heroTop)
      const visibleBottom = Math.min(viewportHeight, heroTop + heroHeight)
      const visibleHeight = Math.max(0, visibleBottom - visibleTop)
      const visibleRatio = heroHeight > 0 ? visibleHeight / heroHeight : 0

      let opacity: number
      const fadeOutThreshold = HERO_OVERLAY_FADEOUT_VIEWPORT * viewportHeight
      const atOrPast40Viewport = scrollTop >= fadeOutThreshold

      if (atOrPast40Viewport && visibleRatio > HERO_OVERLAY_FADEIN_VISIBLE) {
        opacity = 0
      } else if (scrollTop < fadeOutThreshold) {
        opacity = 1
      } else {
        opacity =
          visibleRatio <= HERO_OVERLAY_FADEIN_VISIBLE
            ? 1 - visibleRatio / HERO_OVERLAY_FADEIN_VISIBLE
            : 0
      }

      setHeroOverlayOpacity(clamp(opacity, 0, 1))
    }

    const handleScroll = () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        updateOverlay()
        rafId = null
      })
    }

    updateOverlay()
    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      container.removeEventListener('scroll', handleScroll)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [containerRef, heroSectionRef])

  return heroOverlayOpacity
}
