'use client'

import { useEffect, useRef, useState } from 'react'
import { animate } from 'framer-motion'
import { SplitText } from '@/lib/utils/splitText'
import { cn } from '@/lib/utils/cn'
import { createPortal } from 'react-dom'
import { AnimatedScribble } from './AnimatedScribble'
import { useAccessibility } from '@/components/providers/AccessibilityProvider'

interface AnimatedHeroTextGSAPProps {
  children: string
  boldWords?: string[]
  pronunciationWords?: Record<string, string>
  className?: string
  delay?: number
  style?: React.CSSProperties
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
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

/**
 * AnimatedHeroTextGSAP
 *
 * Line-by-line reveal: each line slides up from behind an overflow:hidden mask.
 * Uses Framer Motion's imperative animate() — same bundle, same scheduler as
 * Pratt/CTA Framer Motion delays, so timing is anchored to the same t=0 as
 * every other hero element.
 *
 * Animation details:
 * - Line i starts at translateY(-(i+1)*100%) — deeper lines start further below
 * - All lines animate to y:0% together — duration 1s, power3.out
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
}: AnimatedHeroTextGSAPProps) {
  const textRef = useRef<HTMLParagraphElement>(null)
  const hasRevealedRef = useRef(false)
  const [scribbleContainers, setScribbleContainers] = useState<HTMLElement[]>([])

  // Read synchronously — avoids false-on-first-render from useBreakpoints()
  // (which starts false and only corrects after its own useEffect).
  const isMd =
    typeof window !== 'undefined' &&
    window.matchMedia('(min-width: 768px)').matches

  const { reducedMotion: prefersReducedMotion, pauseWebGL } = useAccessibility()
  const shouldPause = prefersReducedMotion || pauseWebGL

  useEffect(() => {
    if (!textRef.current || hasRevealedRef.current) return

    const element = textRef.current
    let split: ReturnType<typeof SplitText> | null = null
    let cancelled = false
    let revealControls: ReturnType<typeof animate> | null = null
    let timeoutId: ReturnType<typeof setTimeout> | undefined

    // ── Mobile: simple opacity fade, no line splitting ──────────────────────
    if (!isMd) {
      // delay is measured from page-load (performance.now() ≈ 0 at navigation start)
      const remainingMs = Math.max(0, delay * 1000 - performance.now())
      timeoutId = setTimeout(() => {
        if (cancelled || !textRef.current) return
        textRef.current.style.opacity = '1'
        textRef.current.style.transition = 'opacity 1.2s ease-out'
        hasRevealedRef.current = true
      }, remainingMs)

      return () => {
        cancelled = true
        clearTimeout(timeoutId)
      }
    }

    // ── Desktop: line-reveal ─────────────────────────────────────────────────

    // Make container visible — individual lines control their own opacity/transform
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
          container.style.cssText =
            'position:absolute;left:0;right:0;bottom:-4px;height:16px;pointer-events:none;'
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
    // so they move faster and all land at 0 at the same time.
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
  }, [delay, children, prefersReducedMotion, pauseWebGL, shouldPause, isMd, boldWords, pronunciationWords])

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
