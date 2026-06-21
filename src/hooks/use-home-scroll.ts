import { useRef, useState, useEffect, useMemo, useCallback } from 'react'
import {
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from 'framer-motion'
import { useBreakpoints } from '@/hooks/use-responsive'
import { useLenis } from '@/components/providers/LenisProvider'
import { dispatchHomePauseBlobs } from '@/lib/overlay-events'
import {
  CARD_ENTRY_END_PROGRESS,
  CARD_SCRIM_REVEAL_COVERAGE,
  HERO_FADE_END_PROGRESS,
} from './home-scroll-timing'

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

interface HomeScrollResult {
  containerRef: React.RefObject<HTMLDivElement | null>
  selectedWorkRef: React.RefObject<HTMLDivElement | null>
  footerRef: React.RefObject<HTMLDivElement | null>
  scrollYProgress: MotionValue<number>
  containerHeightPx: number
  isMounted: boolean
  heroContentY: MotionValue<number>
  navbarScrollOpacity: MotionValue<number>
  heroOpacity: MotionValue<number>
  heroIsHidden: boolean
  heroPointerEvents: MotionValue<'auto' | 'none'>
  cardY: MotionValue<number>
  cardMediaScrimOpacity: MotionValue<number>
  selectedWorkY: MotionValue<number>
  footerRevealProgress: MotionValue<number>
  handleBrowseWorkClick: () => void
  handleGetInTouchClick: () => void
}

export function useHomeScroll(): HomeScrollResult {
  const containerRef = useRef<HTMLDivElement>(null)
  const selectedWorkRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)
  const [selectedWorkHeight, setSelectedWorkHeight] = useState(0)
  const [footerHeight, setFooterHeight] = useState(0)
  const [windowHeight, setWindowHeight] = useState(1000)
  const [isMounted, setIsMounted] = useState(false)
  const [heroIsHidden, setHeroIsHidden] = useState(false)
  const { isDesktop } = useBreakpoints()
  const lenis = useLenis()

  useEffect(() => {
    setIsMounted(true)
    let rafId: number | null = null
    let resizeObserver: ResizeObserver | null = null
    let lastWidth = typeof window !== 'undefined' ? window.innerWidth : 0
    let lastHeight = typeof window !== 'undefined' ? window.innerHeight : 0

    const measureHeight = () => {
      if (selectedWorkRef.current) {
        const height = selectedWorkRef.current.scrollHeight
        setSelectedWorkHeight((prev) => (prev !== height ? height : prev))
      }
      if (footerRef.current) {
        const height = footerRef.current.offsetHeight
        setFooterHeight((prev) => (prev !== height ? height : prev))
      }
      if (typeof window !== 'undefined') {
        const height = window.innerHeight
        setWindowHeight((prev) => (prev !== height ? height : prev))
      }
    }

    const handleResize = () => {
      if (typeof window === 'undefined') return
      
      const currentWidth = window.innerWidth
      const currentHeight = window.innerHeight
      
      // If nothing changed, bail
      if (currentWidth === lastWidth && currentHeight === lastHeight) return
      
      // Calculate scroll progress BEFORE changing container height to prevent jitter
      const scrollHeight = document.documentElement.scrollHeight
      const currentScrollY = window.scrollY
      const progress = scrollHeight > currentHeight ? currentScrollY / (scrollHeight - currentHeight) : 0
      
      lastWidth = currentWidth
      lastHeight = currentHeight
      
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
      
      rafId = requestAnimationFrame(() => {
        measureHeight()
        
        // After heights are updated and React re-renders, the scrollHeight will change.
        // We sync the scroll position in the next frame to maintain progress.
        requestAnimationFrame(() => {
          const newScrollHeight = document.documentElement.scrollHeight
          const newWindowHeight = window.innerHeight
          const newScrollY = progress * (newScrollHeight - newWindowHeight)
          
          if (lenis) {
            lenis.scrollTo(newScrollY, { immediate: true })
          } else {
            window.scrollTo(0, newScrollY)
          }
        })
      })
    }

    measureHeight()
    window.addEventListener('resize', handleResize)

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        if (rafId !== null) cancelAnimationFrame(rafId)
        rafId = requestAnimationFrame(measureHeight)
      })

      if (selectedWorkRef.current) resizeObserver.observe(selectedWorkRef.current)
      if (footerRef.current) resizeObserver.observe(footerRef.current)
    }

    const timeout = setTimeout(measureHeight, 100)

    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timeout)
      resizeObserver?.disconnect()
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [lenis])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Use a stable ref for tracking pause state without triggering re-renders
  const lastPauseState = useRef(false)
  const lastHeroHiddenState = useRef(false)
  
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const nextPauseState = latest > 0.03
    if (nextPauseState !== lastPauseState.current) {
      lastPauseState.current = nextPauseState
      dispatchHomePauseBlobs(nextPauseState)
    }

    const nextHeroHiddenState = latest >= HERO_FADE_END_PROGRESS
    if (nextHeroHiddenState !== lastHeroHiddenState.current) {
      lastHeroHiddenState.current = nextHeroHiddenState
      setHeroIsHidden(nextHeroHiddenState)
    }
  })

  // Replaces the old SVH and VH calculations with pure pixels
  const selectedWorkMovePx = Math.max(0, selectedWorkHeight - windowHeight) + footerHeight
  const footerScrollPx = Math.min(footerHeight, windowHeight * 0.35)
  const containerHeightPx = (windowHeight * 2) + Math.max(0, selectedWorkHeight - windowHeight) + footerScrollPx

  const heroContentRange = useMemo(() => [0, 0.2], [])
  const heroContentOutput = useMemo(
    () => [0, -windowHeight * 0.3],
    [windowHeight]
  )
  const navbarRange = useMemo(() => [0, 0.02], [])
  const navbarOutput = useMemo(() => [1, 0], [])
  const heroOpacityRange = useMemo(
    () => [0, HERO_FADE_END_PROGRESS - 0.005, HERO_FADE_END_PROGRESS],
    []
  )
  const heroOpacityOutput = useMemo(() => [1, 1, 0], [])
  const cardRange = useMemo(() => [0, CARD_ENTRY_END_PROGRESS, 0.5], [])
  const cardOutput = useMemo(
    () => [windowHeight, 0, -windowHeight * 1.05],
    [windowHeight]
  )

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

  // Tie scrim to the card parallax entry segment (cardRange[0]→cardRange[1]),
  // not raw cardY pixels — matches how cardY is driven by scrollYProgress.
  const cardEntryEnd = cardRange[1]
  const cardMediaScrimOpacity = useTransform(scrollYProgress, (progress) => {
    if (progress >= cardEntryEnd) return 0

    const coverage = clamp(progress / cardEntryEnd, 0, 1)
    if (coverage >= CARD_SCRIM_REVEAL_COVERAGE) return 0
    return 1 - coverage / CARD_SCRIM_REVEAL_COVERAGE
  })

  const selectedWorkRange = useMemo(() => [0, 0.5, 1], [])
  const selectedWorkOutput = useMemo(
    () => [0, 0, -selectedWorkMovePx],
    [selectedWorkMovePx]
  )
  const selectedWorkY = useTransform(
    scrollYProgress,
    selectedWorkRange,
    selectedWorkOutput
  )

  const contentScrollPx = Math.max(0, selectedWorkHeight - windowHeight)
  const footerRevealStart =
    selectedWorkMovePx > 0
      ? 0.5 + (0.5 * contentScrollPx) / selectedWorkMovePx
      : 1
  const footerRevealRange = useMemo(
    () => {
      if (!isDesktop) {
        // Start reveal after SelectedWork starts moving up, end at 1.0
        return [0.55, 1]
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

    const vh = window.innerHeight
    const containerTop = containerRef.current.offsetTop
    const currentContainerHeightPx = (windowHeight * 2) + Math.max(0, selectedWorkHeight - windowHeight) + Math.min(footerHeight, windowHeight * 0.35)
    const maxScrollWithinContainer = Math.max(currentContainerHeightPx - vh, 0)

    const targetProgress = 0.5
    const targetScrollWithin = maxScrollWithinContainer * targetProgress
    const targetScrollY = containerTop + targetScrollWithin

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
  }, [selectedWorkHeight, windowHeight, footerHeight, lenis])

  const handleGetInTouchClick = useCallback(() => {
    if (!containerRef.current || typeof window === 'undefined') return

    const vh = window.innerHeight
    const containerTop = containerRef.current.offsetTop
    const currentContainerHeightPx = (windowHeight * 2) + Math.max(0, selectedWorkHeight - windowHeight) + Math.min(footerHeight, windowHeight * 0.35)
    const targetScrollY = containerTop + currentContainerHeightPx - vh

    if (lenis) {
      lenis.scrollTo(targetScrollY, {
        duration: 1.5,
        easing: (t) => 1 - Math.pow(1 - t, 4),
      })
    } else {
      window.scrollTo({ top: targetScrollY, behavior: 'smooth' })
    }
  }, [selectedWorkHeight, windowHeight, footerHeight, lenis])

  return {
    containerRef,
    selectedWorkRef,
    footerRef,
    scrollYProgress,
    containerHeightPx,
    isMounted,
    heroContentY,
    navbarScrollOpacity,
    heroOpacity,
    heroIsHidden,
    heroPointerEvents,
    cardY,
    cardMediaScrimOpacity,
    selectedWorkY,
    footerRevealProgress,
    handleBrowseWorkClick,
    handleGetInTouchClick,
  }
}
