'use client'

import { m } from 'framer-motion'
import { Fragment, useState, useEffect } from 'react'
import { cn } from '@/lib/utils/cn'
import { useAccessibility } from '@/components/providers/AccessibilityProvider'
import { ANIMATION_CONFIG } from '@/lib/constants/animations'

interface AnimatedTitleProps {
  /** The text to be animated. */
  text: string
  /** The type of animation to apply. */
  animationType?: 'fadeInUp' | 'fadeIn'
  /** The maximum width variant to apply. */
  variant?: 'default' | 'narrow' | 'wide' | 'full'
  /** Whether to always animate on mount (true) or wait for scroll into view (false). Default: false. */
  alwaysAnimate?: boolean
  /** Additional className for the h1 element. */
  className?: string
  /** Delay before starting the animation (in seconds). */
  delay?: number
  /** Stagger time between words (in seconds). Default: 0.08. */
  stagger?: number
  /** Duration of the animation per word (in seconds). */
  duration?: number
  /** Words to highlight with a specific color. */
  highlightWords?: string[]
  /** Color for highlighted words. */
  highlightColor?: string
  /** Whether to delay the highlight animation until after the title has entered. Default: false. */
  delayHighlight?: boolean
  /** Extra delay before the highlight animation starts (in seconds). Default: 0.5s after text staggers in. */
  highlightDelay?: number
  /** Whether to show a marker background sweep behind the highlighted words. Default: false. */
  showMarkerSweep?: boolean
  /** Background highlight color (optional). Enables marker sweep if provided or if delayHighlight is true. */
  highlightBgColor?: string
}

/**
 * AnimatedTitle
 * 
 * A deep module that animates text with high leverage.
 * Uses ANIMATION_CONFIG for centralized control over brand motion.
 */
export function AnimatedTitle({
  text,
  animationType = 'fadeInUp',
  variant = 'default',
  alwaysAnimate = false,
  className,
  delay = 0,
  stagger = ANIMATION_CONFIG.DURATION.STAGGER,
  duration,
  highlightWords,
  highlightColor,
  delayHighlight = false,
  highlightDelay,
  showMarkerSweep = false,
  highlightBgColor,
}: AnimatedTitleProps) {
  const [mounted, setMounted] = useState(false)
  const { reducedMotion: prefersReducedMotion, pauseWebGL } = useAccessibility()
  
  useEffect(() => {
    setMounted(true)
  }, [])

  const shouldPause = prefersReducedMotion || pauseWebGL

  // Count total words across all lines to calculate the stagger end time
  const totalWordsCount = text.split(/\s+/).filter(Boolean).length
  const finalWordStartDelay = 0.2 + delay + Math.max(0, totalWordsCount - 1) * stagger
  const calculatedHighlightDelay = highlightDelay !== undefined 
    ? highlightDelay 
    : (finalWordStartDelay + 0.4)

  const variantStyles = {
    default: 'max-w-[700px]',
    narrow: 'max-w-[500px]',
    wide: 'max-w-[1000px]',
    full: 'max-w-none'
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldPause ? 0 : stagger,
        delayChildren: shouldPause ? 0 : 0.2 + delay,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.02,
        staggerDirection: -1,
        duration: shouldPause ? 0 : ANIMATION_CONFIG.DURATION.FAST,
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
          ...ANIMATION_CONFIG.EASE.SPRING,
          stiffness: shouldPause ? 1000 : ANIMATION_CONFIG.EASE.SPRING.stiffness,
          duration: shouldPause ? 0 : duration,
        },
      },
      exit: {
        opacity: 0,
        y: shouldPause ? 0 : -10,
        transition: {
          duration: shouldPause ? 0 : ANIMATION_CONFIG.DURATION.FAST,
        },
      },
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration: shouldPause ? 0 : (duration ?? ANIMATION_CONFIG.DURATION.SLOW),
          ease: ANIMATION_CONFIG.EASE.PREMIUM,
        },
      },
      exit: {
        opacity: 0,
        transition: {
          duration: shouldPause ? 0 : ANIMATION_CONFIG.DURATION.FAST,
        },
      },
    },
  }

  const wordVariants = animationVariants[animationType]
  const lines = text.split('\n')

  let markerBg = 'rgba(255, 140, 0, 0.12)'
  if (highlightBgColor) {
    markerBg = highlightBgColor
  } else if (highlightColor) {
    if (highlightColor.startsWith('#')) {
      markerBg = highlightColor.length === 7 ? `${highlightColor}1a` : `${highlightColor}2`
    } else {
      markerBg = highlightColor
    }
  }

  return (
    <m.h1
      variants={containerVariants}
      initial="hidden"
      exit="exit"
      {...(alwaysAnimate
        ? { animate: 'visible' }
        : {
            whileInView: 'visible',
            viewport: ANIMATION_CONFIG.VIEWPORT,
          })}
      className={cn(
        'font-bold leading-tight tracking-tight text-foreground',
        variantStyles[variant],
        className
      )}
    >
      {lines.map((line, lineIndex) => {
        const words = line.split(' ')
        
        return (
          <Fragment key={lineIndex}>
            {words.map((word, wordIndex) => {
              const isHighlighted = highlightWords?.some(phrase => {
                const phraseWords = phrase.split(' ')
                const wordClean = word.toLowerCase().replace(/[.,!?;:"]/g, '')
                return phraseWords.some(pw => pw.toLowerCase().replace(/[.,!?;:"]/g, '') === wordClean)
              })
              
              return (
                <Fragment key={wordIndex}>
                  <m.span 
                    variants={wordVariants} 
                    className="inline-block relative"
                    style={isHighlighted && !delayHighlight && highlightColor ? { color: highlightColor } : {}}
                  >
                    {!mounted ? (
                      word
                    ) : (
                      <>
                        <span className={cn(isHighlighted && !delayHighlight ? "" : "text-text-primary")}>
                          {word}
                        </span>

                        {isHighlighted && delayHighlight && (
                          <>
                            {highlightColor && (
                              <m.span
                                variants={{
                                  hidden: { opacity: 0 },
                                  visible: {
                                    opacity: 1,
                                    transition: {
                                      delay: calculatedHighlightDelay + (showMarkerSweep ? 0.08 : 0),
                                      duration: ANIMATION_CONFIG.DURATION.SLOW,
                                      ease: ANIMATION_CONFIG.EASE.PREMIUM
                                    }
                                  }
                                }}
                                style={{ color: highlightColor }}
                                className="absolute inset-0 select-none pointer-events-none"
                              >
                                {word}
                              </m.span>
                            )}

                            {showMarkerSweep && (
                              <m.span
                                variants={{
                                  hidden: { scaleX: 0 },
                                  visible: {
                                    scaleX: 1,
                                    transition: {
                                      delay: calculatedHighlightDelay,
                                      duration: 0.75,
                                      ease: ANIMATION_CONFIG.EASE.EXPO
                                    }
                                  }
                                }}
                                style={{ 
                                  originX: 0, 
                                  backgroundColor: markerBg 
                                }}
                                className="absolute -inset-x-1 -inset-y-[1px] rounded-[3px] -z-10 pointer-events-none"
                              />
                            )}
                          </>
                        )}
                      </>
                    )}
                  </m.span>
                  {wordIndex < words.length - 1 && ' '}
                </Fragment>
              )
            })}
            {lineIndex < lines.length - 1 && <br />}
          </Fragment>
        )
      })}
    </m.h1>
  )
}
