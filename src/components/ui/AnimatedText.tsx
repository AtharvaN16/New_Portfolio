'use client'

import { m, useInView } from 'framer-motion'
import { Fragment, useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils/cn'
import { useAccessibility } from '@/components/providers/AccessibilityProvider'
import { ANIMATION_CONFIG } from '@/lib/constants/animations'

export type TextVariant = 'hero' | 'heading' | 'quote'

export interface QuoteSegment {
  text: string
  color?: string
}

export interface AnimatedTextProps {
  /** The design variant of the typography animation. */
  variant: TextVariant
  /** The text to be animated (required for 'hero' and 'heading'). */
  text?: string
  /** The styled segments of text to be animated (required for 'quote'). */
  segments?: QuoteSegment[]
  /** Semantic HTML tag override. Defaults: h1 for hero, h2 for heading, blockquote for quote. */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'blockquote'
  /** Readability column width bounds. */
  maxWidth?: 'narrow' | 'default' | 'wide' | 'full'
  /** Animation transition type (Default: fadeInUp for heading, fadeIn for hero/quote). */
  animationType?: 'fadeInUp' | 'fadeIn'
  /** Stagger delay between words in seconds. */
  stagger?: number
  /** Initial delay before the animation starts in seconds. */
  delay?: number
  /** Individual duration per word transition in seconds. */
  duration?: number
  /** Words to apply highlight colors to (variant: 'heading'). */
  highlightWords?: string[]
  /** Color string or CSS variable for highlighted words. */
  highlightColor?: string
  /** Background sweep highlight sweep (variant: 'heading'). */
  showMarkerSweep?: boolean
  /** Delay the highlight reveal until after entrance (variant: 'heading'). */
  delayHighlight?: boolean
  /** Delay override in seconds for the highlight sweep. */
  highlightDelay?: number
  /** Hex/RGBA background color sweep override. */
  highlightBgColor?: string
  /** Force animation on mount, ignoring scroll-view viewport triggers. */
  alwaysAnimate?: boolean
  /** Typographic control to prevent single words or short lines at the end of the text.
   * - 'none': natural wrapping
   * - 'orphan': groups last 2 words (prevents single dangling word)
   * - 'short-line': groups last 3 words (prevents final line with only 1 or 2 words)
   * Defaults to 'short-line'.
   */
  orphanPrevention?: 'none' | 'orphan' | 'short-line'
  /** Visual class overrides. */
  className?: string
  /** Per-word color class (default: text-text-primary). Use e.g. text-white on dark media. */
  wordClassName?: string
}

/**
 * AnimatedText
 * 
 * Standardized typography animation component unifying headers, titles, and blockquotes.
 * Decouples semantics from visual presentation, providing responsive staggers,
 * text highlighting, marker sweeps, and semantic outline checks.
 */
export function AnimatedText({
  variant,
  text = '',
  segments,
  as,
  maxWidth = 'default',
  animationType,
  delay = 0,
  stagger,
  duration,
  highlightWords,
  highlightColor,
  showMarkerSweep = false,
  delayHighlight = false,
  highlightDelay,
  highlightBgColor,
  alwaysAnimate = false,
  orphanPrevention,
  className,
  wordClassName = 'text-text-primary',
}: AnimatedTextProps) {
  const [mounted, setMounted] = useState(false)
  const { reducedMotion: prefersReducedMotion, pauseWebGL } = useAccessibility()
  const scrollRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  const shouldPause = prefersReducedMotion || pauseWebGL

  // Compute quote flat words at top level
  const flatWords: { word: string; color?: string }[] = []
  if (variant === 'quote' && segments) {
    segments.forEach((segment) => {
      segment.text.trim().split(/\s+/).filter(Boolean).forEach((word) => {
        flatWords.push({ word, color: segment.color })
      })
    })
  }

  // Hooks called unconditionally at the top level
  const defaultStaggerForQuote = stagger !== undefined ? stagger : 0.05
  const isInView = useInView(scrollRef, { once: true, margin: '-100px' })
  const [colorRevealed, setColorRevealed] = useState(false)

  useEffect(() => {
    if (variant !== 'quote') return
    if (shouldPause) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setColorRevealed(true)
      return
    }
    if (!isInView) return
    const settleMs = (0.1 + delay + (flatWords.length - 1) * defaultStaggerForQuote + 0.3) * 1000
    const timer = setTimeout(() => {
      setColorRevealed(true)
    }, settleMs)
    return () => clearTimeout(timer)
  }, [isInView, delay, flatWords.length, defaultStaggerForQuote, shouldPause, variant])

  // 1. Resolve defaults based on variant
  const Tag = as || (variant === 'hero' ? 'h1' : variant === 'heading' ? 'h2' : 'blockquote')
  const defaultAnimationType = 'fadeIn'
  const activeAnimation = animationType || defaultAnimationType

  const defaultStagger = stagger !== undefined 
    ? stagger 
    : (variant === 'quote' ? 0.05 : ANIMATION_CONFIG.DURATION.STAGGER)

  const activeOrphanPrevention = orphanPrevention || 'short-line'
  const groupCount = activeOrphanPrevention === 'short-line' ? 3 : activeOrphanPrevention === 'orphan' ? 2 : 0

  // 2. Max Width classes mapping
  const maxWidthStyles = {
    narrow: 'max-w-[500px]',
    default: 'max-w-[700px]',
    wide: 'max-w-[1000px]',
    full: 'max-w-none'
  }

  // 3. Timings & Stagger triggers
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldPause ? 0 : defaultStagger,
        delayChildren: shouldPause ? 0 : (variant === 'quote' ? 0.1 : 0.2) + delay,
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
          duration: shouldPause ? 0 : (duration ?? (variant === 'quote' ? 0.3 : ANIMATION_CONFIG.DURATION.SLOW)),
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

  const wordVariants = animationVariants[activeAnimation]

  // Render Logic: Variant 'quote'
  if (variant === 'quote' && segments) {
    const renderFlatWord = ({ word, color }: { word: string; color?: string }, idx: number, isGrouped: boolean) => {
      return (
        <Fragment key={idx}>
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
          {idx < flatWords.length - 1 && (!isGrouped || idx < flatWords.length - 1) && ' '}
        </Fragment>
      )
    }

    return (
      <m.p
        ref={scrollRef}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className={cn('font-bold tracking-tight text-foreground', maxWidthStyles[maxWidth], className)}
        style={{ lineHeight: '120%' }}
      >
        {(() => {
          if (groupCount > 0 && flatWords.length >= 2) {
            const actualGroupCount = Math.min(groupCount, flatWords.length)
            const normalWords = flatWords.slice(0, flatWords.length - actualGroupCount)
            const groupedWords = flatWords.slice(flatWords.length - actualGroupCount)
            
            return (
              <>
                {normalWords.map((item, idx) => renderFlatWord(item, idx, false))}
                <span className="inline-block whitespace-nowrap">
                  {groupedWords.map((item, idx) => renderFlatWord(item, normalWords.length + idx, true))}
                </span>
              </>
            )
          } else {
            return flatWords.map((item, idx) => renderFlatWord(item, idx, false))
          }
        })()}
      </m.p>
    )
  }

  // Render Logic: Variant 'hero' or 'heading'
  const totalWordsCount = text.split(/\s+/).filter(Boolean).length
  const finalWordStartDelay = 0.2 + delay + Math.max(0, totalWordsCount - 1) * defaultStagger
  const calculatedHighlightDelay = highlightDelay !== undefined 
    ? highlightDelay 
    : (finalWordStartDelay + 0.4)

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



  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MotionTag = m[Tag] as any

  return (
    <MotionTag
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
        maxWidthStyles[maxWidth],
        className
      )}
    >
      {lines.map((line, lineIndex) => {
        const words = line.trim().split(/\s+/).filter(Boolean)
        
        const renderWord = (word: string, wordIndex: number, isGrouped: boolean) => {
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
                    <span className={cn(isHighlighted && !delayHighlight ? '' : wordClassName)}>
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
                                opacity: 1,
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
              {wordIndex < words.length - 1 && (!isGrouped || wordIndex < words.length - 1) && ' '}
            </Fragment>
          )
        }

        return (
          <Fragment key={lineIndex}>
            {(() => {
              if (groupCount > 0 && words.length >= 2) {
                const actualGroupCount = Math.min(groupCount, words.length)
                const normalWords = words.slice(0, words.length - actualGroupCount)
                const groupedWords = words.slice(words.length - actualGroupCount)
                
                return (
                  <>
                    {normalWords.map((word, wordIndex) => renderWord(word, wordIndex, false))}
                    <span className="inline-block whitespace-nowrap">
                      {groupedWords.map((word, wordIndex) => renderWord(word, normalWords.length + wordIndex, true))}
                    </span>
                  </>
                )
              } else {
                return words.map((word, wordIndex) => renderWord(word, wordIndex, false))
              }
            })()}
            {lineIndex < lines.length - 1 && <br />}
          </Fragment>
        )
      })}
    </MotionTag>
  )
}
