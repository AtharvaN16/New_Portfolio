'use client'

import { useEffect, useRef, useState } from 'react'
import {
  m,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { useBreakpoints } from '@/hooks/use-responsive'
import { useAccessibility } from '@/components/providers/AccessibilityProvider'
import { cn } from '@/lib/utils/cn'
import { FooterClock } from './FooterClock'
import { FooterSmog } from './FooterSmog'
import { FooterLinksSection } from './FooterLinksSection'
import { FooterMessageSection } from './FooterMessageSection'
import { AccessibilityModal } from './AccessibilityModal'

type FooterLayoutVariant = 'desktop-reveal' | 'mobile-flow'

/** Hold before mobile footer smog fades in after IO visibility */
const MOBILE_FOOTER_GLOW_DELAY_MS = 500
/** Footer must actually enter the viewport — no 200px lookahead on mobile */
const MOBILE_FOOTER_VISIBLE_RATIO = 0.06

interface FooterProps {
  layoutVariant?: FooterLayoutVariant
  revealProgress?: MotionValue<number>
  triggerShimmer?: boolean
}

function MobileFooterEntrance({
  children,
  delay = 0,
  enabled,
}: {
  children: React.ReactNode
  delay?: number
  enabled: boolean
}) {
  if (!enabled) return children

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      {children}
    </m.div>
  )
}

export function Footer({
  layoutVariant = 'desktop-reveal',
  revealProgress,
  triggerShimmer,
}: FooterProps) {
  const footerContainerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const fallbackProgress = useMotionValue(1)
  const progress = revealProgress ?? fallbackProgress
  const { isDesktop } = useBreakpoints()
  const { reducedMotion } = useAccessibility()
  const isMobileFlow = layoutVariant === 'mobile-flow'

  const [isAccessibilityModalOpen, setIsAccessibilityModalOpen] =
    useState(false)
  const [isMessageFormOpen, setIsMessageFormOpen] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (isMobileFlow) {
          setIsVisible(
            entry.isIntersecting &&
              entry.intersectionRatio >= MOBILE_FOOTER_VISIBLE_RATIO
          )
          return
        }

        setIsVisible(entry.isIntersecting)
      },
      isMobileFlow
        ? { threshold: [0, 0.04, 0.06, 0.1, 0.15, 0.25] }
        : { threshold: 0, rootMargin: '200px' }
    )

    if (footerContainerRef.current) {
      observer.observe(footerContainerRef.current)
    }

    return () => observer.disconnect()
  }, [isMobileFlow])

  const desktopOpacity = useTransform(progress, [0.8, 1.0], [0, 1])
  const desktopY = useTransform(progress, [0.8, 1.0], [25, 0])
  const staticOpacity = useMotionValue(1)
  const staticY = useMotionValue(0)
  const sectionOpacity =
    isMobileFlow || !isDesktop ? staticOpacity : desktopOpacity
  const sectionY = isMobileFlow || !isDesktop ? staticY : desktopY

  const glowFireThreshold = isDesktop ? 0.98 : 0.05
  const glowClearThreshold = isDesktop ? 0.98 : 0.02

  const [showGlow, setShowGlow] = useState(false)
  const [playShimmer, setPlayShimmer] = useState(false)
  const glowTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useMotionValueEvent(progress, 'change', (latest) => {
    if (isMobileFlow) return

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
    if (!isMobileFlow) return

    if (isVisible) {
      glowTimerRef.current = setTimeout(() => {
        setShowGlow(true)
      }, MOBILE_FOOTER_GLOW_DELAY_MS)
    } else {
      if (glowTimerRef.current) {
        clearTimeout(glowTimerRef.current)
        glowTimerRef.current = null
      }
      queueMicrotask(() => setShowGlow(false))
    }

    return () => {
      if (glowTimerRef.current) {
        clearTimeout(glowTimerRef.current)
        glowTimerRef.current = null
      }
    }
  }, [isMobileFlow, isVisible])

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

  const smogVisible = isMobileFlow ? showGlow && isVisible : showGlow
  const showSmogLayer = isMobileFlow || isDesktop
  const smogVariant = isMobileFlow ? 'mobile' : 'desktop'
  const renderSmog =
    showSmogLayer && (isMobileFlow ? smogVisible : isVisible)
  const mobileEntrance = isMobileFlow && !reducedMotion
  const fadeTransition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.35, ease: [0.4, 0, 0.2, 1] as const }

  return (
    <footer
      ref={footerContainerRef}
      className="w-full text-foreground footer-bg relative z-20"
      style={{
        backgroundColor: 'rgb(var(--color-footer-bg))',
        boxShadow:
          isMobileFlow && !smogVisible ? 'none' : 'var(--shadow-2xl)',
      }}
    >
      {renderSmog && (
        <FooterSmog visible={smogVisible} variant={smogVariant} />
      )}

      <div
        className={
          isMobileFlow
            ? 'mx-auto min-h-[min(72svh,560px)] max-w-[1920px] px-6 pt-16 pb-[max(8rem,env(safe-area-inset-bottom))]'
            : 'mx-auto max-w-[1920px] px-6 2xl:px-[140px] pt-32 md:pt-28 lg:pt-32 [--footer-content-height:480px] lg:[--footer-content-height:300px]'
        }
        style={
          isMobileFlow
            ? undefined
            : {
                paddingBottom:
                  'calc(85svh - var(--footer-content-height) - 56px)',
              }
        }
      >
        <div
          className={cn(
            'footer-all-links-wrapper grid grid-cols-1 lg:flex lg:items-start lg:justify-between',
            isMobileFlow ? 'gap-8 -mt-2' : 'gap-12'
          )}
        >
          <MobileFooterEntrance enabled={mobileEntrance} delay={0}>
            <FooterMessageSection
              sectionOpacity={sectionOpacity}
              sectionY={sectionY}
              isMobileFlow={isMobileFlow}
              playShimmer={playShimmer}
              isFormOpen={isMessageFormOpen}
              onFormOpenChange={setIsMessageFormOpen}
            />
          </MobileFooterEntrance>

          <MobileFooterEntrance enabled={mobileEntrance} delay={0.1}>
            {isMobileFlow ? (
              <m.div
                animate={{ opacity: isMessageFormOpen ? 0 : 1 }}
                transition={fadeTransition}
                style={{ pointerEvents: isMessageFormOpen ? 'none' : 'auto' }}
              >
                <FooterLinksSection
                  sectionOpacity={sectionOpacity}
                  sectionY={sectionY}
                  playShimmer={playShimmer}
                  onOpenAccessibility={() => setIsAccessibilityModalOpen(true)}
                />
              </m.div>
            ) : (
              <FooterLinksSection
                sectionOpacity={sectionOpacity}
                sectionY={sectionY}
                playShimmer={playShimmer}
                onOpenAccessibility={() => setIsAccessibilityModalOpen(true)}
              />
            )}
          </MobileFooterEntrance>

          {!isMobileFlow && (
            <MobileFooterEntrance enabled={mobileEntrance} delay={0.2}>
              <m.div
                className="order-2 mt-12 lg:order-3 lg:mt-0"
                style={{ opacity: sectionOpacity, y: sectionY }}
              >
                <FooterClock className="text-left lg:text-right" />
              </m.div>
            </MobileFooterEntrance>
          )}
        </div>
      </div>

      {!isMobileFlow && (
        <div
          className="mx-auto flex max-w-[1920px] flex-col gap-2 px-6 2xl:px-[140px] py-4 sm:flex-row sm:items-center sm:justify-between"
          style={{ color: 'rgb(var(--color-text-secondary))' }}
        >
          <p className="vulf-mono-italic-light text-[10px] md:text-sm">
            Designed and Coded by Atharva
          </p>
          <p className="vulf-mono-italic-light text-[10px] md:text-sm">
            {`Last updated ${new Date().toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}`}
          </p>
        </div>
      )}

      {isDesktop && (
        <AccessibilityModal
          isOpen={isAccessibilityModalOpen}
          onClose={() => setIsAccessibilityModalOpen(false)}
        />
      )}
    </footer>
  )
}
