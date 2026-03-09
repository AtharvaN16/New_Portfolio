'use client'

import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { useBreakpoints } from '@/hooks/use-breakpoint'
import { FooterClock } from './FooterClock'
import { FooterSmog } from './FooterSmog'
import { FooterLinksSection } from './FooterLinksSection'
import { FooterMessageSection } from './FooterMessageSection'
import { AccessibilityModal } from './AccessibilityModal'

interface FooterProps {
  revealProgress?: MotionValue<number>
  triggerShimmer?: boolean
}

export function Footer({ revealProgress, triggerShimmer }: FooterProps) {
  const fallbackProgress = useMotionValue(1)
  const progress = revealProgress ?? fallbackProgress
  const { isDesktop } = useBreakpoints()

  const [isAccessibilityModalOpen, setIsAccessibilityModalOpen] =
    useState(false)

  const desktopOpacity = useTransform(progress, [0.8, 1.0], [0, 1])
  const desktopY = useTransform(progress, [0.8, 1.0], [25, 0])
  const staticOpacity = useMotionValue(1)
  const staticY = useMotionValue(0)
  const sectionOpacity = isDesktop ? desktopOpacity : staticOpacity
  const sectionY = isDesktop ? desktopY : staticY

  const glowFireThreshold = isDesktop ? 0.98 : 0.05
  const glowClearThreshold = isDesktop ? 0.98 : 0.02

  const [showGlow, setShowGlow] = useState(false)
  const [playShimmer, setPlayShimmer] = useState(false)
  const glowTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useMotionValueEvent(progress, 'change', (latest) => {
    if (latest >= glowFireThreshold && !glowTimerRef.current) {
      glowTimerRef.current = setTimeout(() => {
        setShowGlow(true)
      }, 100)
      return
    }

    if (latest < glowClearThreshold) {
      if (glowTimerRef.current) {
        clearTimeout(glowTimerRef.current)
        glowTimerRef.current = null
      }
      queueMicrotask(() => setShowGlow(false))
    }
  })

  useEffect(() => {
    if (!triggerShimmer) return

    // eslint-disable-next-line react-hooks/set-state-in-effect -- Shimmer playback is intentionally triggered by prop changes.
    setPlayShimmer(true)
    const timer = setTimeout(() => {
      setPlayShimmer(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [triggerShimmer])

  useEffect(
    () => () => {
      if (glowTimerRef.current) clearTimeout(glowTimerRef.current)
    },
    []
  )

  return (
    <footer
      className="w-full text-foreground footer-bg relative z-20"
      style={{
        backgroundColor: 'rgb(var(--color-footer-bg))',
        boxShadow: 'var(--shadow-2xl)',
      }}
    >
      <FooterSmog visible={showGlow} />

      <div
        className="mx-auto max-w-[1920px] px-6 2xl:px-[140px] pt-32 md:pt-28 lg:pt-32 [--footer-content-height:480px] lg:[--footer-content-height:300px]"
        style={{
          paddingBottom: 'calc(85vh - var(--footer-content-height) - 56px)',
        }}
      >
        <div className="footer-all-links-wrapper grid grid-cols-1 gap-12 lg:flex lg:items-start lg:justify-between">
          <FooterMessageSection
            sectionOpacity={sectionOpacity}
            sectionY={sectionY}
            isDesktop={isDesktop}
            playShimmer={playShimmer}
          />

          <FooterLinksSection
            sectionOpacity={sectionOpacity}
            sectionY={sectionY}
            playShimmer={playShimmer}
            onOpenAccessibility={() => setIsAccessibilityModalOpen(true)}
          />

          <motion.div
            className="order-2 mt-12 lg:order-3 lg:mt-0"
            style={{ opacity: sectionOpacity, y: sectionY }}
          >
            <FooterClock className="text-left lg:text-right" />
          </motion.div>
        </div>
      </div>

      <div
        className="mx-auto flex max-w-[1920px] flex-col gap-2 px-6 2xl:px-[140px] py-4 sm:flex-row sm:items-center sm:justify-between"
        style={{ color: 'rgb(var(--color-text-color60))' }}
      >
        <p className="vulf-mono-italic-light text-[10px] md:text-sm tabular-nums opacity-80">
          Designed + Coded with &lt;3 by Atharva
        </p>
        <p className="vulf-mono-italic-light text-[10px] md:text-sm tabular-nums opacity-80">
          Last updated:{' '}
          {new Date().toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </p>
      </div>

      {isDesktop && (
        <AccessibilityModal
          isOpen={isAccessibilityModalOpen}
          onClose={() => setIsAccessibilityModalOpen(false)}
        />
      )}
    </footer>
  )
}
