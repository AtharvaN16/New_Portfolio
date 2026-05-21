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

  useEffect(() => {
    let rafId: number | null = null
    let resizeObserver: ResizeObserver | null = null

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

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        if (rafId !== null) {
          cancelAnimationFrame(rafId)
        }
        rafId = requestAnimationFrame(measureHeight)
      })

      if (selectedWorkRef.current) {
        resizeObserver.observe(selectedWorkRef.current)
      }
      if (footerRef.current) {
        resizeObserver.observe(footerRef.current)
      }
    }

    const timeout = setTimeout(measureHeight, 100)

    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timeout)
      resizeObserver?.disconnect()
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [])

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
  })

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

  const contentScrollVh = Math.max(0, selectedWorkHeightVh - 100)
  const footerRevealStart =
    selectedWorkMoveVh > 0
      ? 0.5 + (0.5 * contentScrollVh) / selectedWorkMoveVh
      : 1
  const footerRevealRange = useMemo(
    () => {
      if (!isDesktop) {
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
  }
}
