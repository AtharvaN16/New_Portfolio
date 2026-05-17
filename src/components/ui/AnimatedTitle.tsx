'use client'

import { m } from 'framer-motion'
import { Fragment } from 'react'
import { cn } from '@/lib/utils/cn'
import { useAccessibility } from '@/components/providers/AccessibilityProvider'

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
 * A component that animates a title by staggering an effect for each word.
 * The animation triggers when the component scrolls into view.
 * Supports \n for manual line breaks (mobile-only by default in this implementation).
 *
 * @param animationType - 'fadeInUp' (default) or 'fadeIn'.
 */
export function AnimatedTitle({
  text,
  animationType = 'fadeInUp',
  variant = 'default',
  alwaysAnimate = false,
  className,
  delay = 0,
  stagger = 0.08,
  duration,
  highlightWords,
  highlightColor,
  delayHighlight = false,
  highlightDelay,
  showMarkerSweep = false,
  highlightBgColor,
}: AnimatedTitleProps) {
  const { reducedMotion: prefersReducedMotion, pauseWebGL } = useAccessibility()
  const shouldPause = prefersReducedMotion || pauseWebGL

  // Count total words across all lines to calculate the stagger end time
  const totalWordsCount = text.split(/\s+/).filter(Boolean).length
  // Stagger animation for the entire title takes (totalWordsCount - 1) * stagger
  // Plus the initial delayChildren offset of 0.2 + delay
  const finalWordStartDelay = 0.2 + delay + Math.max(0, totalWordsCount - 1) * stagger
  const calculatedHighlightDelay = highlightDelay !== undefined 
    ? highlightDelay 
    : (finalWordStartDelay + 0.4)

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
          duration: shouldPause ? 0 : duration,
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
          duration: shouldPause ? 0 : (duration ?? 0.5),
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
    <m.h1
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
        variantStyles[variant],
        className
      )}
    >
      {lines.map((line, lineIndex) => {
        const words = line.split(' ')
        
        // Find ranges of highlighted words in this line
        const highlightedRanges: { start: number; end: number }[] = []
        
        highlightWords?.forEach(phrase => {
          const phraseWords = phrase.split(' ')
          const phraseLen = phraseWords.length
          
          for (let i = 0; i <= words.length - phraseLen; i++) {
            let match = true
            for (let j = 0; j < phraseLen; j++) {
              const wordClean = words[i + j].toLowerCase().replace(/[.,!?;:"]/g, '')
              const phraseWordClean = phraseWords[j].toLowerCase().replace(/[.,!?;:"]/g, '')
              
              if (wordClean !== phraseWordClean) {
                match = false
                break
              }
            }
            
            if (match) {
              highlightedRanges.push({ start: i, end: i + phraseLen - 1 })
            }
          }
        })

        return (
          <Fragment key={lineIndex}>
            {words.map((word, wordIndex) => {
              const isHighlighted = highlightedRanges.some(
                range => wordIndex >= range.start && wordIndex <= range.end
              )
              
              return (
                <Fragment key={wordIndex}>
                  {isHighlighted && delayHighlight ? (
                    <m.span 
                      variants={wordVariants} 
                      className="inline-block relative"
                    >
                      {/* Base Text in standard theme color */}
                      <span className="text-text-primary">
                        {word}
                      </span>

                      {/* Highlighted text overlay (gently fades in after delay) */}
                      {highlightColor && (
                        <m.span
                          variants={{
                            hidden: { opacity: 0 },
                            visible: {
                              opacity: 1,
                              transition: {
                                delay: calculatedHighlightDelay + (showMarkerSweep ? 0.08 : 0),
                                duration: 0.6,
                                ease: 'easeOut'
                              }
                            }
                          }}
                          style={{ color: highlightColor }}
                          className="absolute inset-0 select-none pointer-events-none"
                        >
                          {word}
                        </m.span>
                      )}

                      {/* Background marker sweep */}
                      {showMarkerSweep && (
                        <m.span
                          variants={{
                            hidden: { scaleX: 0 },
                            visible: {
                              scaleX: 1,
                              transition: {
                                delay: calculatedHighlightDelay,
                                duration: 0.75,
                                ease: [0.16, 1, 0.3, 1] // easeOutExpo
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
                    </m.span>
                  ) : (
                    <m.span 
                      variants={wordVariants} 
                      className="inline-block"
                      style={isHighlighted && highlightColor ? { color: highlightColor } : {}}
                    >
                      {word}
                    </m.span>
                  )}
                  {wordIndex < words.length - 1 && (
                    wordIndex === words.length - 2 ? '\u00A0' : ' '
                  )}
                </Fragment>
              )
            })}
            {lineIndex < lines.length - 1 && (
              <>
                <br className="md:hidden" />
                <span className="hidden md:inline"> </span>
              </>
            )}
          </Fragment>
        )
      })}
    </m.h1>
  )
}
