'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { SplitText } from '@/lib/utils/splitText'
import { cn } from '@/lib/utils/cn'

interface AnimatedHeroTextGSAPProps {
  children: string
  boldWords?: string[]
  pronunciationWords?: Record<string, string>
  className?: string
  delay?: number
  style?: React.CSSProperties
}

/**
 * AnimatedHeroTextGSAP Component
 *
 * Uses GSAP to animate text with line-by-line reveal effect.
 * Matches the exact implementation from the old portfolio.
 *
 * Animation Details:
 * - Each line starts at different y position (-100%, -200%, -300%, etc.)
 * - All lines animate together to y: 0%
 * - Opacity: 0.4 → 1.0
 * - Duration: 1.0s with power3.out easing
 */
export function AnimatedHeroTextGSAP({
  children,
  boldWords = [],
  pronunciationWords = {},
  className,
  delay = 0.2,
  style,
}: AnimatedHeroTextGSAPProps) {
  const textRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!textRef.current) return

    const element = textRef.current

    // Make visible
    gsap.set(element, { opacity: 1 })

    // Split into lines
    const split = SplitText(element, {
      type: 'lines',
      tagName: 'span',
    })

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
     * IMPORTANT:
     * Our SplitText utility rebuilds the lines from `textContent`, which strips any JSX markup
     * (like <strong> or tooltip spans). So we decorate each line AFTER splitting, by turning
     * the plain text back into HTML with controlled spans.
     */
    const decorateLine = (lineEl: HTMLElement) => {
      const raw = lineEl.textContent || ''
      let html = escapeHtml(raw)

      // Pronunciation word: bold + hover tooltip above the word.
      for (const [word, pronunciation] of Object.entries(pronunciationWords)) {
        if (!word) continue
        const pattern = new RegExp(`\\b${escapeRegExp(word)}\\b`, 'g')
        const tooltip = escapeHtml(pronunciation)

        html = html.replace(
          pattern,
          `<span class="pronunciation-word" data-pronunciation-word="${escapeHtml(word)}">${escapeHtml(
            word
          )}<span class="pronunciation-tooltip" aria-hidden="true">${tooltip}</span></span>`
        )
      }

      // Bold-only words.
      for (const word of boldWords) {
        if (!word) continue
        // If it's already wrapped as a pronunciation word, skip (pronunciation wrapper is bold by CSS).
        if (pronunciationWords[word]) continue
        const pattern = new RegExp(`\\b${escapeRegExp(word)}\\b`, 'g')
        html = html.replace(
          pattern,
          `<span class="hero-bold-word">${escapeHtml(word)}</span>`
        )
      }

      lineEl.innerHTML = html
    }

    // Decorate each line after SplitText has built them.
    split.lines.forEach(decorateLine)

    // Set up each line with its own mask container
    const lineMasks: HTMLElement[] = []
    split.lines.forEach((line) => {
      // Create a wrapper div for each line with mask
      const wrapper = document.createElement('div')
      wrapper.style.cssText = `
        position: relative;
        overflow: visible;
        display: block;
      `

      // Create inner mask container for overflow clipping
      const mask = document.createElement('div')
      mask.style.cssText = `
        position: relative;
        overflow: hidden;
        display: block;
      `
      mask.className = 'hero-line-mask'
      lineMasks.push(mask)

      // Move the line into the mask, then mask into wrapper
      line.parentNode?.insertBefore(wrapper, line)
      wrapper.appendChild(mask)
      mask.appendChild(line)

      // Set line to start above its mask
      gsap.set(line, {
        y: '-100%',
        opacity: 1,
      })
    })

    // Set up each line with different starting positions and fade
    split.lines.forEach((line, index) => {
      // Each line starts at a different position above
      // First line starts closest, last line starts farthest
      const startOffset = -(index + 1) * 100 // -100%, -200%, -300%, etc.
      gsap.set(line, {
        y: `${startOffset}%`,
        opacity: 0.4, // Start at 40% opacity for subtle fade effect
      })
    })

    // Animate all lines together to their final positions with fade
    gsap.to(split.lines, {
      y: '0%',
      opacity: 1, // Fade to 100% opacity
      duration: 1.0,
      ease: 'power3.out',
      delay: delay,
      onComplete: () => {
        // Allow tooltips to render above lines after the reveal finishes.
        lineMasks.forEach((m) => {
          m.style.overflow = 'visible'
        })
      },
    })

    // Cleanup
    return () => {
      split.revert()
    }
  }, [delay, boldWords, pronunciationWords, children])

  return (
    <p ref={textRef} className={cn(className)} style={{ ...style, opacity: 0 }}>
      {children}
    </p>
  )
}
