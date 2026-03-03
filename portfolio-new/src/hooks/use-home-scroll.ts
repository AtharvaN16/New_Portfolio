import { useRef, useState, useEffect, useMemo, useCallback } from 'react'
import {
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from 'framer-motion'

interface HomeScrollResult {
  containerRef: React.RefObject<HTMLDivElement | null>
  selectedWorkRef: React.RefObject<HTMLDivElement | null>
  footerRef: React.RefObject<HTMLDivElement | null>
  shouldPauseBlobs: boolean
  containerHeightPx: number
  heroContentY: MotionValue<number>
  navbarScrollOpacity: MotionValue<number>
  heroOpacity: MotionValue<number>
  heroPointerEvents: MotionValue<'auto' | 'none'>
  cardY: MotionValue<number>
  selectedWorkY: MotionValue<number>
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
  const [viewportHeight, setViewportHeight] = useState(1000)

  // Measure content and viewport dynamically
  useEffect(() => {
    let rafId: number | null = null

    const measure = () => {
      if (selectedWorkRef.current) {
        setSelectedWorkHeight(selectedWorkRef.current.scrollHeight)
      }
      if (footerRef.current) {
        setFooterHeight(footerRef.current.offsetHeight)
      }
      setViewportHeight(window.innerHeight)
    }

    const handleResize = () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('resize', handleResize)
    const timeout = setTimeout(measure, 100)

    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timeout)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Pause blobs when scrolling away from Hero
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest > 0.03 && !shouldPauseBlobs) {
      setShouldPauseBlobs(true)
    } else if (latest <= 0.03 && shouldPauseBlobs) {
      setShouldPauseBlobs(false)
    }
  })

  // Dynamic transforms in PIXELS for mobile precision
  const heroContentY = useTransform(
    scrollYProgress,
    [0, 0.2],
    [0, -viewportHeight * 0.3]
  )
  
  const navbarScrollOpacity = useTransform(scrollYProgress, [0, 0.02], [1, 0])
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.195, 0.2], [1, 1, 0])
  const heroPointerEvents = useTransform(heroOpacity, (o: number) => o > 0 ? 'auto' : 'none')
  
  const cardY = useTransform(
    scrollYProgress, 
    [0, 0.2, 0.5], 
    [viewportHeight, 0, -viewportHeight * 1.05]
  )

  // SelectedWork & Footer Reveal Logic
  const contentScrollPx = Math.max(0, selectedWorkHeight - viewportHeight)
  const footerRevealPx = Math.min(footerHeight, viewportHeight * 0.35)
  
  // Total distance SelectedWork needs to move up to reveal footer
  const selectedWorkMovePx = contentScrollPx + footerHeight
  
  // Total container height in pixels
  const containerHeightPx = (viewportHeight * 2) + contentScrollPx + footerRevealPx

  const selectedWorkY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, 0, -selectedWorkMovePx]
  )

  const footerRevealStart = selectedWorkMovePx > 0 
    ? 0.5 + (0.5 * contentScrollPx) / selectedWorkMovePx 
    : 1
    
  const footerRevealProgress = useTransform(
    scrollYProgress,
    [footerRevealStart, 1],
    [0, 1]
  )

  const handleBrowseWorkClick = useCallback(() => {
    if (!containerRef.current || typeof window === 'undefined') return
    window.dispatchEvent(new CustomEvent('force-card-up'))

    const targetScrollY = containerRef.current.offsetTop + (containerHeightPx - window.innerHeight) * 0.5
    
    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth'
    })
  }, [containerHeightPx])

  return {
    containerRef,
    selectedWorkRef,
    footerRef,
    shouldPauseBlobs,
    containerHeightPx,
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
