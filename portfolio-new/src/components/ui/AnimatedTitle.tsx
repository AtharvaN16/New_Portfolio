'use client'

import { motion } from 'framer-motion'
import { Fragment } from 'react'
import { cn } from '@/lib/utils/cn'
import { useAccessibility } from '@/components/providers/AccessibilityProvider'

interface AnimatedTitleProps {
  /** The text to be animated. */
  text: string
  /** The type of animation to apply. */
  animationType?: 'fadeInUp' | 'fadeIn'
  /** Whether to always animate on mount (true) or wait for scroll into view (false). Default: false. */
  alwaysAnimate?: boolean
  /** Additional className for the h1 element. */
  className?: string
  /** Delay before starting the animation (in seconds). */
  delay?: number
}

/**
 * A component that animates a title by staggering an effect for each word.
 * The animation triggers when the component scrolls into view.
 * Supports \n for manual line breaks (mobile-only by default in this implementation).
 *
 * @param animationType - 'fadeInUp' (default) or 'fadeIn'.
 */
export function AnimatedTitle({
  text,
  animationType = 'fadeInUp',
  alwaysAnimate = false,
  className,
  delay = 0,
}: AnimatedTitleProps) {
  const { reducedMotion: prefersReducedMotion, pauseWebGL } = useAccessibility()
  const shouldPause = prefersReducedMotion || pauseWebGL

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldPause ? 0 : 0.08,
        delayChildren: shouldPause ? 0 : 0.2 + delay,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.02,
        staggerDirection: -1,
        duration: shouldPause ? 0 : 0.15,
      },
    },
  }

  const animationVariants = {
    fadeInUp: {
      hidden: { opacity: 0, y: shouldPause ? 0 : 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: 'spring' as const,
          damping: 12,
          stiffness: shouldPause ? 1000 : 100,
          duration: shouldPause ? 0 : undefined,
        },
      },
      exit: {
        opacity: 0,
        y: shouldPause ? 0 : -10,
        transition: {
          duration: shouldPause ? 0 : 0.15,
        },
      },
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration: shouldPause ? 0 : 0.5,
        },
      },
      exit: {
        opacity: 0,
        transition: {
          duration: shouldPause ? 0 : 0.15,
        },
      },
    },
  }

  const wordVariants = animationVariants[animationType]

  // Split by manual newline first
  const lines = text.split('\n')

  return (
    <motion.h1
      variants={containerVariants}
      initial="hidden"
      exit="exit"
      {...(alwaysAnimate
        ? { animate: 'visible' }
        : {
            whileInView: 'visible',
            // Use negative margin to trigger animation as page slides into view
            viewport: { once: true, margin: '-100px' },
          })}
      className={cn(
        'font-bold leading-tight tracking-tight text-foreground',
        className
      )}
    >
      {lines.map((line, lineIndex) => (
        <Fragment key={lineIndex}>
          {line.split(' ').map((word, wordIndex, array) => (
            <Fragment key={wordIndex}>
              <motion.span variants={wordVariants} className="inline-block">
                {word}
              </motion.span>
              {wordIndex < array.length - 1 && ' ' /* Add a regular space */}
            </Fragment>
          ))}
          {lineIndex < lines.length - 1 && (
            <>
              <br className="md:hidden" />
              <span className="hidden md:inline"> </span>
            </>
          )}
        </Fragment>
      ))}
    </motion.h1>
  )
}
