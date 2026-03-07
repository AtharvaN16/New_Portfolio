import { useRef, useState, useEffect, useMemo, useCallback } from 'react'
import {
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from 'framer-motion'
import { useBreakpoints } from '@/hooks/use-breakpoint'
import { useLenis } from '@/components/providers/LenisProvider'

interface HomeScrollResult {
  containerRef: React.RefObject<HTMLDivElement | null>
  selectedWorkRef: React.RefObject<HTMLDivElement | null>
  footerRef: React.RefObject<HTMLDivElement | null>
  shouldPauseBlobs: boolean
  containerHeightVh: number
  heroContentY: MotionValue<string>
  navbarScrollOpacity: MotionValue<number>
  heroOpacity: MotionValue<number>
  heroPointerEvents: MotionValue<'auto' | 'none'>
  cardY: MotionValue<string>
  selectedWorkY: MotionValue<string>
  footerRevealProgress: MotionValue<number>
  handleBrowseWorkClick: () => void
  handleGetInTouchClick: () => void
}

export function useHomeScroll(): HomeScrollResult {
  const containerRef = useRef<HTMLDivElement>(null)
  const selectedWorkRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)
  const [shouldPauseBlobs, setShouldPauseBlobs] = useState(false)
  const [selectedWorkHeight, setSelectedWorkHeight] = useState(0)
  const [footerHeight, setFooterHeight] = useState(0)
  const { isDesktop } = useBreakpoints()
  const lenis = useLenis()

  // Measure SelectedWork content height dynamically (throttled with RAF)
  useEffect(() => {
    let rafId: number | null = null

    const measureHeight = () => {
      if (selectedWorkRef.current) {
        const height = selectedWorkRef.current.scrollHeight
        setSelectedWorkHeight(height)
      }
      if (footerRef.current) {
        setFooterHeight(footerRef.current.offsetHeight)
      }
    }

    const handleResize = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
      rafId = requestAnimationFrame(measureHeight)
    }

    measureHeight()
    window.addEventListener('resize', handleResize)

    // Re-measure after a short delay to ensure content is rendered
    const timeout = setTimeout(measureHeight, 100)

    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timeout)
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Pause/resume water blobs based on scroll position (performance)
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest > 0.03 && !shouldPauseBlobs) {
      setShouldPauseBlobs(true)
    } else if (latest <= 0.03 && shouldPauseBlobs) {
      setShouldPauseBlobs(false)
    }
  })

  // Memoize transform input arrays for performance
  const heroContentRange = useMemo(() => [0, 0.2], [])
  const heroContentOutput = useMemo(() => ['0vh', '-30vh'], [])
  const navbarRange = useMemo(() => [0, 0.02], [])
  const navbarOutput = useMemo(() => [1, 0], [])
  const heroOpacityRange = useMemo(() => [0, 0.195, 0.2], [])
  const heroOpacityOutput = useMemo(() => [1, 1, 0], [])
  const cardRange = useMemo(() => [0, 0.2, 0.5], [])
  const cardOutput = useMemo(() => ['100vh', '0vh', '-105vh'], [])

  const heroContentY = useTransform(
    scrollYProgress,
    heroContentRange,
    heroContentOutput
  )
  const navbarScrollOpacity = useTransform(
    scrollYProgress,
    navbarRange,
    navbarOutput
  )
  const heroOpacity = useTransform(
    scrollYProgress,
    heroOpacityRange,
    heroOpacityOutput
  )
  const heroPointerEvents = useTransform(heroOpacity, (opacity: number) =>
    opacity > 0 ? 'auto' : 'none'
  )
  const cardY = useTransform(scrollYProgress, cardRange, cardOutput)

  // Calculate dynamic scroll distances
  const viewportHeight =
    typeof window !== 'undefined' ? window.innerHeight : 1000
  const selectedWorkHeightVh =
    selectedWorkHeight > 0 ? (selectedWorkHeight / viewportHeight) * 100 : 300
  const footerHeightVh =
    footerHeight > 0 ? (footerHeight / viewportHeight) * 100 : 0
  const selectedWorkMoveVh =
    Math.max(0, selectedWorkHeightVh - 100) + footerHeightVh

  const footerScrollVh = Math.min(footerHeightVh, 35)
  const containerHeightVh =
    200 + Math.max(0, selectedWorkHeightVh - 100) + footerScrollVh

  // SelectedWork transform
  // Mobile: cap exit at 0.90 — Chrome iOS's WKWebView discrete resize events
  // prevent scrollYProgress from reliably reaching 1.0, so SelectedWork would
  // stall partway up the screen. Completing at 0.90 matches the footer reveal cap.
  const selectedWorkRange = useMemo(
    () => (isDesktop ? [0, 0.5, 1] : [0, 0.5, 0.90]),
    [isDesktop]
  )
  const selectedWorkOutput = useMemo(
    () => ['0vh', '0vh', `-${selectedWorkMoveVh}vh`],
    [selectedWorkMoveVh]
  )
  const selectedWorkY = useTransform(
    scrollYProgress,
    selectedWorkRange,
    selectedWorkOutput
  )

  // Footer reveal progress
  const contentScrollVh = Math.max(0, selectedWorkHeightVh - 100)
  const footerRevealStart =
    selectedWorkMoveVh > 0
      ? 0.5 + (0.5 * contentScrollVh) / selectedWorkMoveVh
      : 1
  const footerRevealRange = useMemo(
    () => {
      if (!isDesktop) {
        // On mobile/tablet, the browser bottom bar (56–84px on iOS/Android)
        // prevents scrollYProgress from reaching 1.0. Start the reveal 8%
        // earlier and complete it at 90% so the glow/dust fire before the
        // browser-imposed dead zone at the scroll bottom.
        const mobileStart = Math.min(Math.max(footerRevealStart - 0.08, 0.5), 0.85)
        return [mobileStart, 0.90]
      }
      return [footerRevealStart, 1]
    },
    [footerRevealStart, isDesktop]
  )
  const footerRevealOutput = useMemo(() => [0, 1], [])
  const footerRevealProgress = useTransform(
    scrollYProgress,
    footerRevealRange,
    footerRevealOutput
  )

  /**
   * Scroll Snap/Nudge Logic
   * If the user stops scrolling when the footer is almost fully revealed,
   * automatically nudge the scroll to the end to trigger the glow effect.
   */
  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const unsubscribe = scrollYProgress.on('change', () => {
      // We only nudge on desktop where the glow threshold is high (0.98).
      // On mobile, the glow triggers much earlier (0.05) so it's less critical.
      if (!isDesktop) return

      clearTimeout(timeoutId)

      const progress = footerRevealProgress.get()

      // Trigger zone: between 85% and 99% revealed
      if (progress > 0.85 && progress < 0.99) {
        timeoutId = setTimeout(() => {
          // Re-verify after settling
          const currentProgress = footerRevealProgress.get()
          if (currentProgress > 0.85 && currentProgress < 0.99) {
            const vh = window.innerHeight
            const containerTop = containerRef.current?.offsetTop || 0
            const maxScrollWithinContainer = (containerHeightVh / 100) * vh - vh
            const targetScrollY = containerTop + maxScrollWithinContainer

            if (lenis) {
              lenis.scrollTo(targetScrollY, {
                duration: 1.2,
                easing: (t) => 1 - Math.pow(1 - t, 4), // Quartic ease out
              })
            } else {
              window.scrollTo({ top: targetScrollY, behavior: 'smooth' })
            }
          }
        }, 150)
      }
    })

    return () => {
      unsubscribe()
      clearTimeout(timeoutId)
    }
  }, [
    isDesktop,
    lenis,
    footerRevealProgress,
    scrollYProgress,
    containerHeightVh,
  ])

  const handleBrowseWorkClick = useCallback(() => {
    if (!containerRef.current || typeof window === 'undefined') return

    window.dispatchEvent(new CustomEvent('force-card-up'))

    const vh = window.innerHeight
    const containerTop = containerRef.current.offsetTop
    const containerHeightPx = (containerHeightVh / 100) * vh
    const maxScrollWithinContainer = Math.max(containerHeightPx - vh, 0)

    const targetProgress = 0.5
    const targetScrollWithin = maxScrollWithinContainer * targetProgress
    const targetScrollY = containerTop + targetScrollWithin

    // Use Lenis if available for a smoother experience
    if (lenis) {
      lenis.scrollTo(targetScrollY, {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })
      return
    }

    const startY = window.scrollY
    const distance = targetScrollY - startY
    const duration = 468
    let startTime: number | null = null

    const easeInOutQuad = (t: number): number => {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
    }

    const scroll = (currentTime: number) => {
      if (startTime === null) startTime = currentTime
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeProgress = easeInOutQuad(progress)

      window.scrollTo(0, startY + distance * easeProgress)

      if (progress < 1) {
        requestAnimationFrame(scroll)
      }
    }

    requestAnimationFrame(scroll)
  }, [containerHeightVh, lenis])

  const handleGetInTouchClick = useCallback(() => {
    if (!containerRef.current || typeof window === 'undefined') return

    const vh = window.innerHeight
    const containerTop = containerRef.current.offsetTop
    const containerHeightPx = (containerHeightVh / 100) * vh
    const targetScrollY = containerTop + containerHeightPx - vh

    if (lenis) {
      lenis.scrollTo(targetScrollY, {
        duration: 1.5,
        easing: (t) => 1 - Math.pow(1 - t, 4), // Quartic ease out
      })
    } else {
      window.scrollTo({ top: targetScrollY, behavior: 'smooth' })
    }
  }, [containerHeightVh, lenis])

  return {
    containerRef,
    selectedWorkRef,
    footerRef,
    shouldPauseBlobs,
    containerHeightVh,
    heroContentY,
    navbarScrollOpacity,
    heroOpacity,
    heroPointerEvents,
    cardY,
    selectedWorkY,
    footerRevealProgress,
    handleBrowseWorkClick,
    handleGetInTouchClick,
  }
}
