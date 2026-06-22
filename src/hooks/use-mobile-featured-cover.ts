import { useMotionValue, type MotionValue } from 'framer-motion'
import { useEffect, type RefObject } from 'react'

/** Card rise progress mapped to 0–1 over this fraction of the viewport height */
const FADE_VIEWPORT_FRACTION = 0.58

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value))
}

function smoothstep(value: number): number {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

function coverFromElementTop(top: number, viewportHeight: number): number {
  const rise = 1 - top / viewportHeight
  return smoothstep(rise / FADE_VIEWPORT_FRACTION)
}

/**
 * Continuous featured-card cover progress for mobile hero polish.
 * Updates a MotionValue on rAF — no stepped IntersectionObserver ratios.
 */
export function useMobileFeaturedCover(
  ref: RefObject<HTMLElement | null>
): MotionValue<number> {
  const progress = useMotionValue(0)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    let rafId = 0

    const update = () => {
      const node = ref.current
      if (!node) return
      const viewportHeight = window.innerHeight || 1
      progress.set(
        coverFromElementTop(node.getBoundingClientRect().top, viewportHeight)
      )
    }

    const scheduleUpdate = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(update)
    }

    scheduleUpdate()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate, { passive: true })

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
    }
  }, [ref, progress])

  return progress
}
