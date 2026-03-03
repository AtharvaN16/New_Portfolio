import { useRef, useState, useEffect, useMemo, useCallback } from 'react'
import {
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from 'framer-motion'
import { useBreakpoints } from '@/hooks/use-breakpoint'

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
}

export function useHomeScroll(): HomeScrollResult {
  const containerRef = useRef<HTMLDivElement>(null)
  const selectedWorkRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)
  const [shouldPauseBlobs, setShouldPauseBlobs] = useState(false)
  const [selectedWorkHeight, setSelectedWorkHeight] = useState(0)
  const [footerHeight, setFooterHeight] = useState(0)
  const { isDesktop } = useBreakpoints()

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
  const selectedWorkRange = useMemo(() => [0, 0.5, 1], [])
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
  }, [containerHeightVh])

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
  }
}
