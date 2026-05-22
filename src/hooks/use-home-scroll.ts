import { useRef, useState, useEffect, useMemo, useCallback } from 'react'
import {
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from 'framer-motion'
import { useBreakpoints } from '@/hooks/use-responsive'
import { useLenis } from '@/components/providers/LenisProvider'

interface HomeScrollResult {
  containerRef: React.RefObject<HTMLDivElement | null>
  selectedWorkRef: React.RefObject<HTMLDivElement | null>
  footerRef: React.RefObject<HTMLDivElement | null>
  scrollYProgress: MotionValue<number>
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
  // Section visibility flags for aggressive unmounting on mobile
  isHeroMounted: boolean
  isCardMounted: boolean
  isWorkMounted: boolean
  isFooterMounted: boolean
}

export function useHomeScroll(): HomeScrollResult {
  const containerRef = useRef<HTMLDivElement>(null)
  const selectedWorkRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)
  const [shouldPauseBlobs, setShouldPauseBlobs] = useState(false)
  
  // Section visibility flags
  const [isHeroMounted, setIsHeroMounted] = useState(true)
  const [isCardMounted, setIsCardMounted] = useState(true)
  const [isWorkMounted, setIsWorkMounted] = useState(true)
  const [isFooterMounted, setIsFooterMounted] = useState(true)

  // Use refs for measurements to avoid triggering re-renders for every small change
  // and to avoid reading from the DOM during the scroll loop.
  const measurementsRef = useRef({
    selectedWorkHeight: 0,
    footerHeight: 0,
    viewportHeight: 1000
  })

  // We still need state for the container height to drive the scroll track length
  const [containerHeightVh, setContainerHeightVh] = useState(300)
  
  const { isDesktop } = useBreakpoints()
  const lenis = useLenis()

  useEffect(() => {
    let rafId: number | null = null
    let resizeObserver: ResizeObserver | null = null

    const measureHeight = () => {
      if (!selectedWorkRef.current || !footerRef.current) return

      const swHeight = selectedWorkRef.current.scrollHeight
      const fHeight = footerRef.current.offsetHeight
      const vh = window.innerHeight

      // Only update state if measurements changed significantly (> 5px)
      const hasChanged = 
        Math.abs(swHeight - measurementsRef.current.selectedWorkHeight) > 5 ||
        Math.abs(fHeight - measurementsRef.current.footerHeight) > 5 ||
        Math.abs(vh - measurementsRef.current.viewportHeight) > 10

      if (hasChanged) {
        measurementsRef.current = {
          selectedWorkHeight: swHeight,
          footerHeight: fHeight,
          viewportHeight: vh
        }

        // Calculate Track Length
        const swHeightVh = (swHeight / vh) * 100
        const fHeightVh = (fHeight / vh) * 100
        const footerScrollVh = Math.min(fHeightVh, 35)
        
        // Optimization: Standardize track length for faster response
        // Using 200 for all devices to ensure the first swipe triggers the transition
        const baseTrackLength = 200
        const newTrackHeight = baseTrackLength + Math.max(0, swHeightVh - 100) + footerScrollVh
        setContainerHeightVh(newTrackHeight)
      }
    }

    const handleResize = () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(measureHeight)
    }

    measureHeight()
    window.addEventListener('resize', handleResize, { passive: true })

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        if (rafId !== null) cancelAnimationFrame(rafId)
        rafId = requestAnimationFrame(measureHeight)
      })

      if (selectedWorkRef.current) resizeObserver.observe(selectedWorkRef.current)
      if (footerRef.current) resizeObserver.observe(footerRef.current)
    }

    return () => {
      window.removeEventListener('resize', handleResize)
      resizeObserver?.disconnect()
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [isDesktop])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest > 0.03 && !shouldPauseBlobs) {
      setShouldPauseBlobs(true)
    } else if (latest <= 0.03 && shouldPauseBlobs) {
      setShouldPauseBlobs(false)
    }

    // Soft Visibility Gating for Mobile Performance
    if (!isDesktop) {
      // Hero Active: Hide display when fully covered by Card (latest > 0.4)
      const heroActive = latest < 0.4
      if (heroActive !== isHeroMounted) setIsHeroMounted(heroActive)

      // Card Active: Hide display when off-screen (latest > 0.6)
      const cardActive = latest > 0.05 && latest < 0.6
      if (cardActive !== isCardMounted) setIsCardMounted(cardActive)

      // Work: Mount when visible
      const workActive = latest > 0.4
      if (workActive !== isWorkMounted) setIsWorkMounted(workActive)

      // Footer: Only mount at the very end to prevent peek-through
      const footerActive = latest > 0.85
      if (footerActive !== isFooterMounted) setIsFooterMounted(footerActive)
    } else {
      // Desktop: Always mount for smooth parallax
      if (!isHeroMounted) setIsHeroMounted(true)
      if (!isCardMounted) setIsCardMounted(true)
      if (!isWorkMounted) setIsWorkMounted(true)
      if (!isFooterMounted) setIsFooterMounted(true)
    }
  })

  const heroContentRange = useMemo(() => [0, 0.2], [])
  const heroContentOutput = useMemo(() => ['0vh', '-30vh'], [])
  const navbarRange = useMemo(() => [0, 0.02], [])
  const navbarOutput = useMemo(() => [1, 0], [])
  const heroOpacityRange = useMemo(() => {
    if (!isDesktop) return [0, 0.225, 0.35] // Mobile: Fade starts at 50% coverage of new range
    return [0, 0.195, 0.2] // Desktop: Original
  }, [isDesktop])
  const heroOpacityOutput = useMemo(() => [1, 1, 0], [])
  
  // CONTINUOUS REVEAL: Remove dead zones and align ranges for mobile
  const cardRange = useMemo(() => {
    if (!isDesktop) return [0.1, 0.35, 0.5] // Mobile: Start earlier, exit faster
    return [0, 0.2, 0.5] 
  }, [isDesktop])
  
  const cardOutput = useMemo(() => ['100vh', '0vh', '-105vh'], [])

  const heroContentY = useTransform(
    scrollYProgress,
    heroContentRange,
    isDesktop ? heroContentOutput : ['0vh', '0vh']
  )
  const navbarScrollOpacity = useTransform(
    scrollYProgress,
    navbarRange,
    isDesktop ? navbarOutput : [1, 1]
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

  const transformData = useMemo(() => {
    const { selectedWorkHeight, footerHeight, viewportHeight } = measurementsRef.current
    
    const swHeightVh = (selectedWorkHeight / viewportHeight) * 100
    const fHeightVh = (footerHeight / viewportHeight) * 100
    const moveVh = Math.max(0, swHeightVh - 100) + fHeightVh

    // SelectedWork parallax
    // On Mobile: Start exactly when Card finishes its exit (0.5)
    const swRange = isDesktop ? [0, 0.5, 1] : [0, 0.5, 1.0]
    const swOutput = ['0vh', '0vh', `-${moveVh}vh`]
    
    // Footer reveal
    const contentScrollVh = Math.max(0, swHeightVh - 100)
    const revealStart = moveVh > 0 ? 0.5 + (0.5 * contentScrollVh) / moveVh : 1
    const revealRange = !isDesktop 
      ? [Math.min(Math.max(revealStart, 0.5), 0.95), 1.0]
      : [revealStart, 1]

    return {
      swRange,
      swOutput,
      revealRange
    }
  }, [containerHeightVh, isDesktop])

  const selectedWorkY = useTransform(scrollYProgress, transformData.swRange, transformData.swOutput)
  const footerRevealProgress = useTransform(scrollYProgress, transformData.revealRange, [0, 1])

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const unsubscribe = scrollYProgress.on('change', () => {
      clearTimeout(timeoutId)

      const progress = footerRevealProgress.get()

      if (progress > 0.85 && progress < 0.99) {
        timeoutId = setTimeout(() => {
          const currentProgress = footerRevealProgress.get()
          if (currentProgress > 0.85 && currentProgress < 0.99) {
            const vh = window.innerHeight
            const containerTop = containerRef.current?.offsetTop || 0
            const maxScrollWithinContainer = (containerHeightVh / 100) * vh - vh
            const targetScrollY = containerTop + maxScrollWithinContainer

            if (lenis) {
              lenis.scrollTo(targetScrollY, {
                duration: 1.2,
                easing: (t) => 1 - Math.pow(1 - t, 4),
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
        easing: (t) => 1 - Math.pow(1 - t, 4),
      })
    } else {
      window.scrollTo({ top: targetScrollY, behavior: 'smooth' })
    }
  }, [containerHeightVh, lenis])

  return {
    containerRef,
    selectedWorkRef,
    footerRef,
    scrollYProgress,
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
    isHeroMounted,
    isCardMounted,
    isWorkMounted,
    isFooterMounted,
  }
}
