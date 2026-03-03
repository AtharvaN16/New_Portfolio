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
  
  // STABLE VIEWPORT MEASUREMENT
  // We lock the viewport height to prevent jumps when mobile URL bars show/hide.
  const [stableViewportHeight, setStableViewportHeight] = useState(1000)
  const lastWidth = useRef(0)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const measure = () => {
      const vh = window.innerHeight
      const vw = window.innerWidth
      
      // Update if:
      // 1. First measurement
      // 2. Width changed (rotation or desktop resize)
      // 3. Height changed significantly (>150px), likely not a URL bar toggle
      if (
        stableViewportHeight === 1000 || 
        Math.abs(vw - lastWidth.current) > 2 || 
        Math.abs(vh - stableViewportHeight) > 150
      ) {
        setStableViewportHeight(vh)
        lastWidth.current = vw
      }
      
      if (selectedWorkRef.current) {
        setSelectedWorkHeight(selectedWorkRef.current.scrollHeight)
      }
      if (footerRef.current) {
        setFooterHeight(footerRef.current.offsetHeight)
      }
    }

    measure()
    window.addEventListener('resize', measure)
    // Extra checks to ensure correct measurements after font/image loads
    const t1 = setTimeout(measure, 100)
    const t2 = setTimeout(measure, 1000)

    return () => {
      window.removeEventListener('resize', measure)
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [stableViewportHeight])

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

  // Use stableViewportHeight for all transforms to prevent mobile jitter
  const heroContentY = useTransform(
    scrollYProgress,
    [0, 0.2],
    [0, -stableViewportHeight * 0.3]
  )
  
  const navbarScrollOpacity = useTransform(scrollYProgress, [0, 0.02], [1, 0])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.195, 0.2], [1, 1, 0])
  const heroPointerEvents = useTransform(heroOpacity, (o: number) => o > 0 ? 'auto' : 'none')
  
  const cardY = useTransform(
    scrollYProgress, 
    [0, 0.2, 0.5], 
    [stableViewportHeight, 0, -stableViewportHeight * 1.05]
  )

  // SelectedWork & Footer Reveal Logic
  const contentScrollPx = Math.max(0, selectedWorkHeight - stableViewportHeight)
  
  // The reveal distance is based on the actual measured footer height.
  // We add a small buffer or cap it to ensure a smooth transition.
  const footerRevealPx = Math.min(footerHeight, stableViewportHeight * 0.9)
  
  const containerHeightPx = (stableViewportHeight * 2) + contentScrollPx + footerRevealPx

  // SelectedWork moves up by its own overflow + the footer reveal distance
  const selectedWorkMovePx = contentScrollPx + footerRevealPx

  const selectedWorkY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, 0, -selectedWorkMovePx]
  )

  const footerRevealStart = containerHeightPx > 0 
    ? (stableViewportHeight * 2 + contentScrollPx) / containerHeightPx 
    : 1
    
  const footerRevealProgress = useTransform(
    scrollYProgress,
    [footerRevealStart, 1],
    [0, 1]
  )

  const handleBrowseWorkClick = useCallback(() => {
    if (!containerRef.current || typeof window === 'undefined') return
    window.dispatchEvent(new CustomEvent('force-card-up'))

    const targetScrollY = containerRef.current.offsetTop + (stableViewportHeight * 2)
    
    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth'
    })
  }, [containerHeightPx, stableViewportHeight])

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
