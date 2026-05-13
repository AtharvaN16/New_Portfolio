'use client'

import { m, useInView } from 'framer-motion'
import { Fragment, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils/cn'
import { useAccessibility } from '@/components/providers/AccessibilityProvider'

export interface QuoteSegment {
  text: string
  color?: string
}

interface AnimatedQuoteProps {
  segments: QuoteSegment[]
  className?: string
  delay?: number
}

export function AnimatedQuote({ segments, className, delay = 0 }: AnimatedQuoteProps) {
  const { reducedMotion, pauseWebGL } = useAccessibility()
  const shouldPause = reducedMotion || pauseWebGL

  const words: { word: string; color?: string }[] = []
  segments.forEach((segment) => {
    segment.text.split(' ').forEach((word) => {
      if (word) words.push({ word, color: segment.color })
    })
  })

  // Reveal accent colors after stagger completes — same timing as AnimatedTitle fadeIn
  // delayChildren=0.2, stagger=0.08, fade duration=0.5 per word → last word done at 0.2+delay+(n-1)*0.08+0.5
  const ref = useRef<HTMLParagraphElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [colorRevealed, setColorRevealed] = useState(false)

  useEffect(() => {
    if (shouldPause) { setColorRevealed(true); return }
    if (!isInView) return
    const settleMs = (0.1 + delay + (words.length - 1) * 0.05 + 0.3) * 1000
    const timer = setTimeout(() => setColorRevealed(true), settleMs)
    return () => clearTimeout(timer)
  }, [isInView, delay, words.length, shouldPause])

  // Exact match to AnimatedTitle's fadeIn variant
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldPause ? 0 : 0.05,
        delayChildren: shouldPause ? 0 : 0.1 + delay,
      },
    },
  }

  const wordVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: shouldPause ? 0 : 0.3,
      },
    },
  }

  return (
    <m.p
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className={cn('font-bold tracking-tight text-foreground', className)}
      style={{ lineHeight: '120%' }}
    >
      {words.map(({ word, color }, i) => (
        <Fragment key={i}>
          <m.span
            variants={wordVariants}
            className="inline-block"
            style={{
              color: color && colorRevealed ? color : undefined,
              transition: color ? 'color 0.2s ease-out' : undefined,
            }}
          >
            {word}
          </m.span>
          {i < words.length - 1 && ' '}
        </Fragment>
      ))}
    </m.p>
  )
}
