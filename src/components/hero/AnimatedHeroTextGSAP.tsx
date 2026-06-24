'use client'

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { animate, m } from 'framer-motion'
import { SplitText } from '@/lib/utils/splitText'
import { cn } from '@/lib/utils/cn'
import { createPortal } from 'react-dom'
import { AnimatedScribble } from './AnimatedScribble'
import { HeroPronunciationWord } from './HeroPronunciationWord'
import { PRONUNCIATION_SCRIBBLE_MOUNT_STYLE } from './pronunciation-scribble-mount'
import { useAccessibility } from '@/components/providers/AccessibilityProvider'

interface AnimatedHeroTextGSAPProps {
  children: string
  boldWords?: string[]
  pronunciationWords?: Record<string, string>
  className?: string
  delay?: number
  style?: React.CSSProperties
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
  /** Always show pronunciation + underline below marked words (mobile home) */
  inlinePronunciation?: boolean
}

const DEFAULT_BOLD_WORDS: string[] = []
const DEFAULT_PRONUNCIATION_WORDS: Record<string, string> = {}

/** Stable hero copy decoration — avoids re-triggering SplitText on parent re-renders */
export const HERO_BIO_BOLD_WORDS = ['Atharva']
export const HERO_BIO_PRONUNCIATION_WORDS: Record<string, string> = {
  Atharva: 'uh · thar · vuh',
}

/**
 * power3.out cubic-bezier — matches the original GSAP easing exactly.
 * [0.215, 0.61, 0.355, 1] is the standard approximation.
 */
const POWER3_OUT: [number, number, number, number] = [0.215, 0.61, 0.355, 1]

const MOTION_TAGS = {
  h1: m.h1,
  h2: m.h2,
  h3: m.h3,
  h4: m.h4,
  h5: m.h5,
  h6: m.h6,
  p: m.p,
  span: m.span,
  div: m.div,
} as const

const BLUR_IN_TRANSITION = { duration: 1.2, ease: [0.4, 0, 0.2, 1] as const }

/** Seconds from page navigation start → Framer Motion delay (same anchor as Navbar). */
function getDelayFromPageLoad(delaySeconds: number): number {
  if (typeof performance === 'undefined') return delaySeconds
  return Math.max(0, delaySeconds - performance.now() / 1000)
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function renderInlinePronunciation(
  text: string,
  pronunciationWords: Record<string, string>,
  showScribble: boolean
): ReactNode[] {
  const words = Object.keys(pronunciationWords).filter(Boolean)
  if (words.length === 0) return [text]

  const pattern = new RegExp(`\\b(${words.map(escapeRegExp).join('|')})\\b`, 'g')
  const parts = text.split(pattern)

  return parts.map((part, index) => {
    const pronunciation = pronunciationWords[part]
    if (!pronunciation) {
      return part
    }

    return (
      <HeroPronunciationWord
        key={`${part}-${index}`}
        word={part}
        pronunciation={pronunciation}
        showScribble={showScribble}
      />
    )
  })
}

/**
 * AnimatedHeroTextGSAP
 *
 * Line-by-line reveal: each line slides down from behind an overflow:hidden mask.
 * Uses Framer Motion's imperative animate() — same bundle, same scheduler as
 * Pratt/CTA Framer Motion delays, so timing is anchored to the same t=0 as
 * every other hero element.
 *
 * Animation details:
 * - Line i starts at translateY(-(i+1)*100%) — deeper lines start further above
 * - All lines animate to y:0% together — duration 1s, power3.out (downward drop)
 * - Opacity: 0.4 → 1
 */
export function AnimatedHeroTextGSAP({
  children,
  boldWords = DEFAULT_BOLD_WORDS,
  pronunciationWords = DEFAULT_PRONUNCIATION_WORDS,
  className,
  delay = 0.2,
  style,
  as: Component = 'p',
  inlinePronunciation = false,
}: AnimatedHeroTextGSAPProps) {
  const textRef = useRef<HTMLParagraphElement>(null)
  const hasRevealedRef = useRef(false)
  const [scribbleContainers, setScribbleContainers] = useState<HTMLElement[]>([])
  const [mobileScribblesReady, setMobileScribblesReady] = useState(false)
  const [hasMeasuredViewport, setHasMeasuredViewport] = useState(false)
  const [isMd, setIsMd] = useState(false)

  const { reducedMotion: prefersReducedMotion, pauseWebGL } = useAccessibility()
  const shouldPause = prefersReducedMotion || pauseWebGL

  useLayoutEffect(() => {
    setIsMd(window.matchMedia('(min-width: 768px)').matches)
    setHasMeasuredViewport(true)
  }, [])

  useEffect(() => {
    if (!isMd || !textRef.current || hasRevealedRef.current) {
      return
    }

    const element = textRef.current
    let split: ReturnType<typeof SplitText> | null = null
    let cancelled = false
    let revealControls: ReturnType<typeof animate> | null = null
    let timeoutId: ReturnType<typeof setTimeout> | undefined

    // ── Desktop: line-reveal ─────────────────────────────────────────────────
    element.style.opacity = '1'

    // SplitText: synchronous DOM layout read. Satoshi uses next/font/local with
    // display:swap so it's virtually always loaded by the time useEffect fires.
    split = SplitText(element, { type: 'lines', tagName: 'span' })

    // ── Decoration helpers (bold words + pronunciation tooltips) ─────────────
    const escapeHtml = (value: string) =>
      value
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;')

    const escapeRegExp = (value: string) =>
      value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

    /**
     * SplitText rebuilds from textContent (strips JSX markup), so we
     * re-inject bold and pronunciation spans after splitting.
     */
    const decorateLine = (lineEl: HTMLElement) => {
      const raw = lineEl.textContent || ''
      let html = escapeHtml(raw)

      for (const [word, pronunciation] of Object.entries(pronunciationWords)) {
        if (!word) continue
        const pattern = new RegExp(`\\b${escapeRegExp(word)}\\b`, 'g')
        const tooltip = escapeHtml(pronunciation)
        html = html.replace(
          pattern,
          `<span class="pronunciation-word" data-pronunciation-word="${escapeHtml(word)}">${escapeHtml(word)}<span class="pronunciation-tooltip" aria-hidden="true">${tooltip}</span></span>`
        )
      }

      for (const word of boldWords) {
        if (!word || pronunciationWords[word]) continue
        const pattern = new RegExp(`\\b${escapeRegExp(word)}\\b`, 'g')
        html = html.replace(
          pattern,
          `<span class="hero-bold-word">${escapeHtml(word)}</span>`
        )
      }

      lineEl.innerHTML = html
    }

    split.lines.forEach(decorateLine)

    // ── Mask setup: overflow:hidden wrapper clips each line during reveal ────
    const lineMasks: HTMLElement[] = []

    split.lines.forEach((line) => {
      const wrapper = document.createElement('div')
      wrapper.style.cssText = 'position:relative;overflow:visible;display:block;'

      const mask = document.createElement('div')
      mask.style.cssText = 'position:relative;overflow:hidden;display:block;'
      mask.className = 'hero-line-mask'
      lineMasks.push(mask)

      line.parentNode?.insertBefore(wrapper, line)
      wrapper.appendChild(mask)
      mask.appendChild(line)
    })

    // Opens masks and appends scribble portals — called on animation complete
    const openMasksAndAddScribbles = () => {
      hasRevealedRef.current = true
      lineMasks.forEach((m) => {
        m.style.overflow = 'visible'
      })

      if (!cancelled) {
        const pronunciationEls = element.querySelectorAll('.pronunciation-word')
        const newContainers: HTMLElement[] = []

        pronunciationEls.forEach((wordEl) => {
          const container = document.createElement('span')
          Object.assign(container.style, PRONUNCIATION_SCRIBBLE_MOUNT_STYLE)
          wordEl.appendChild(container)
          newContainers.push(container)
        })

        if (newContainers.length > 0) setScribbleContainers(newContainers)
      }
    }

    // ── Reduced motion: skip animation, reveal immediately ───────────────────
    if (shouldPause) {
      openMasksAndAddScribbles()
      return () => {
        cancelled = true
      }
    }

    // ── Set initial staggered positions above each mask ──────────────────────
    // Line i starts at -(i+1)*100% — deeper lines start further above,
    // so they travel farther and all land at 0 at the same time (dropping in).
    split.lines.forEach((line, i) => {
      line.style.transform = `translateY(${-(i + 1) * 100}%)`
      line.style.opacity = '0.4'
    })

    // ── Anchor to page load ──────────────────────────────────────────────────
    // `delay` is seconds from t=0 (page navigation start).
    // performance.now() measures from the same origin, so subtracting it gives
    // the remaining ms before the animation should fire — identical to how
    // Framer Motion computes delays for Pratt and CTA elements in Hero.tsx.
    const remainingMs = Math.max(0, delay * 1000 - performance.now())

    timeoutId = setTimeout(() => {
      if (cancelled || !split?.lines.length) return

      // FM's animate() reads the current transform per-element as initial value,
      // then animates to y:'0%'. Each line travels from its own depth to 0.
      revealControls = animate(
        split.lines,
        { y: '0%', opacity: 1 },
        { duration: 1.0, ease: POWER3_OUT }
      )

      void revealControls.then(() => {
        if (!cancelled) openMasksAndAddScribbles()
      })
    }, remainingMs)

    return () => {
      cancelled = true
      clearTimeout(timeoutId)
      revealControls?.stop()
      if (!hasRevealedRef.current) {
        setScribbleContainers([])
        split?.revert()
      }
    }
  }, [
    delay,
    children,
    prefersReducedMotion,
    pauseWebGL,
    shouldPause,
    isMd,
    boldWords,
    pronunciationWords,
  ])

  if (!hasMeasuredViewport) {
    return (
      <Component
        ref={textRef}
        className={cn(className)}
        style={{ ...style, opacity: 0 }}
      >
        {children}
      </Component>
    )
  }

  if (!isMd) {
    const MotionComponent = MOTION_TAGS[Component]
    const pageAnchoredDelay = getDelayFromPageLoad(delay)
    const mobileTransition = shouldPause
      ? { duration: 0 }
      : { ...BLUR_IN_TRANSITION, delay: pageAnchoredDelay }
    const showMobileScribble = shouldPause || mobileScribblesReady
    const mobileContent = inlinePronunciation
      ? renderInlinePronunciation(
          children,
          pronunciationWords,
          showMobileScribble
        )
      : children

    return (
      <MotionComponent
        className={cn(className)}
        style={style}
        initial={
          shouldPause
            ? { filter: 'blur(0px)', opacity: 1 }
            : { filter: 'blur(20px)', opacity: 0 }
        }
        animate={{ filter: 'blur(0px)', opacity: 1 }}
        transition={mobileTransition}
        onAnimationComplete={() => {
          if (!shouldPause && inlinePronunciation) {
            setMobileScribblesReady(true)
          }
        }}
      >
        {mobileContent}
      </MotionComponent>
    )
  }

  return (
    <>
      <Component
        ref={textRef}
        className={cn(className)}
        style={{ ...style, opacity: 0 }}
      >
        {children}
      </Component>
      {scribbleContainers.map((container, index) =>
        createPortal(<AnimatedScribble />, container, `scribble-${index}`)
      )}
    </>
  )
}
