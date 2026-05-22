'use client'

import { useEffect, useRef, useState } from 'react'
import { SplitText } from '@/lib/utils/splitText'
import { cn } from '@/lib/utils/cn'
import { createPortal } from 'react-dom'
import { AnimatedScribble } from './AnimatedScribble'
import { useBreakpoints } from '@/hooks/use-responsive'
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
  boldWords = DEFAULT_BOLD_WORDS,
  pronunciationWords = DEFAULT_PRONUNCIATION_WORDS,
  className,
  delay = 0.2,
  style,
  as: Component = 'p',
}: AnimatedHeroTextGSAPProps) {
  const textRef = useRef<HTMLParagraphElement>(null)
  const [scribbleContainers, setScribbleContainers] = useState<HTMLElement[]>([])
  const { isDesktop } = useBreakpoints()

  const { reducedMotion: prefersReducedMotion, pauseWebGL } = useAccessibility()
  const shouldPause = prefersReducedMotion || pauseWebGL

  useEffect(() => {
    if (!textRef.current) return

    const element = textRef.current
    let split: ReturnType<typeof SplitText> | null = null
    let cancelled = false

    // Wait for fonts to load before splitting to avoid incorrect line breaks
    document.fonts.ready.then(async () => {
      if (cancelled || !textRef.current) return
      
      // Mobile Performance Bypass: Skip splitting and complex animation
      if (!isDesktop) {
        setTimeout(() => {
          if (textRef.current) {
            textRef.current.style.opacity = '1'
            textRef.current.style.transition = 'opacity 1.2s ease-out'
          }
        }, delay * 1000)
        return
      }

      const { gsap } = await import('gsap')
      if (cancelled || !textRef.current) return

      // Make visible
      gsap.set(element, { opacity: 1 })

      // Split into lines
      split = SplitText(element, {
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
        for (const [word, pronunciation] of Object.entries(
          pronunciationWords
        )) {
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
          y: shouldPause ? '0%' : '-100%',
          opacity: 1,
        })
      })

      // Set up each line with different starting positions and fade
      split.lines.forEach((line, index) => {
        const startOffset = shouldPause ? 0 : -(index + 1) * 100
        gsap.set(line, {
          y: `${startOffset}%`,
          opacity: shouldPause ? 1 : 0.4,
        })
      })

      // Animate all lines together to their final positions with fade
      gsap.to(split.lines, {
        y: '0%',
        opacity: 1,
        duration: shouldPause ? 0 : 1.0,
        ease: 'power3.out',
        delay: shouldPause ? 0 : delay,
        onComplete: () => {
          lineMasks.forEach((m) => {
            m.style.overflow = 'visible'
          })

          // Add scribble underlines to pronunciation words after animation completes
          if (!cancelled) {
            const pronunciationElements = element.querySelectorAll(
              '.pronunciation-word'
            )
            const newContainers: HTMLElement[] = []
            pronunciationElements.forEach((wordEl) => {
              const scribbleContainer = document.createElement('span')
              scribbleContainer.style.cssText = `
                position: absolute;
                left: 0;
                right: 0;
                bottom: -4px;
                height: 16px;
                pointer-events: none;
              `
              wordEl.appendChild(scribbleContainer)
              newContainers.push(scribbleContainer)
            })

            if (!cancelled && newContainers.length > 0) {
              setScribbleContainers(newContainers)
            }
          }
        },
      })
    })

    // Cleanup
    return () => {
      cancelled = true
      // Only reset if we're not cancelled by a dependency change
      // But actually, we SHOULD reset if dependencies change to avoid dangling portals
      setScribbleContainers([])
      split?.revert()
    }
  }, [delay, boldWords, pronunciationWords, children, prefersReducedMotion, pauseWebGL, shouldPause])

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
