import { useState, useEffect, type RefObject } from 'react'

// Fraction of hero height at which the overlay is fully gone
const FADE_OUT_BY = 0.55
// When the hero is less than this fraction visible (scrolling away), fade back in
const HERO_OVERLAY_FADEIN_VISIBLE = 0.2
// Max opacity of the dark overlay at rest
export const HERO_OVERLAY_MAX_OPACITY = 0.65

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
      const heroHeight = heroSection.offsetHeight
      const heroTop = heroSection.offsetTop - scrollTop

      const visibleTop = Math.max(0, heroTop)
      const visibleBottom = Math.min(viewportHeight, heroTop + heroHeight)
      const visibleHeight = Math.max(0, visibleBottom - visibleTop)
      const visibleRatio = heroHeight > 0 ? visibleHeight / heroHeight : 0

      let opacity: number
      const fadeOutScrollDistance = heroHeight * FADE_OUT_BY

      if (scrollTop <= fadeOutScrollDistance) {
        // Smoothly fade from 1 → 0 as we scroll to FADE_OUT_BY of hero height
        opacity = 1 - scrollTop / fadeOutScrollDistance
      } else if (visibleRatio > HERO_OVERLAY_FADEIN_VISIBLE) {
        // Hero still prominently visible — overlay fully gone
        opacity = 0
      } else {
        // Hero scrolling out of view — fade back in
        opacity = 1 - visibleRatio / HERO_OVERLAY_FADEIN_VISIBLE
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
