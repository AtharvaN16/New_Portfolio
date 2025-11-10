'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { SplitText } from '@/lib/utils/splitText'
import { cn } from '@/lib/utils/cn'

interface AnimatedHeroTextGSAPProps {
  children: string
  boldWords?: string[]
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

    // Set up each line with its own mask container
    split.lines.forEach((line) => {
      // Create a wrapper div for each line with mask
      const wrapper = document.createElement('div')
      wrapper.style.cssText = `
        position: relative;
        overflow: hidden;
        display: block;
      `

      // Move the line into the wrapper
      line.parentNode?.insertBefore(wrapper, line)
      wrapper.appendChild(line)

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
    })

    // Cleanup
    return () => {
      split.revert()
    }
  }, [delay])

  // Render text with bold words
  const renderText = () => {
    if (boldWords.length === 0) {
      return children
    }

    return children.split(' ').map((word, index) => {
      const cleanWord = word.replace(/[—,\.]/g, '')
      const isBold = boldWords.includes(cleanWord)
      return (
        <span key={index}>
          {isBold ? <strong>{word}</strong> : word}
          {index < children.split(' ').length - 1 ? ' ' : ''}
        </span>
      )
    })
  }

  return (
    <p ref={textRef} className={cn(className)} style={{ ...style, opacity: 0 }}>
      {renderText()}
    </p>
  )
}
