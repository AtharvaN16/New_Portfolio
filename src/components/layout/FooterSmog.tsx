'use client'

import { m } from 'framer-motion'
import { useState } from 'react'
import { FooterDustParticles } from './FooterDustParticles'
import { useTheme } from '@/components/providers/ThemeProvider'
import { useAccessibility } from '@/components/providers/AccessibilityProvider'

export type FooterSmogVariant = 'desktop' | 'mobile'

interface FooterSmogProps {
  visible: boolean
  variant?: FooterSmogVariant
}

export function FooterSmog({ visible, variant = 'desktop' }: FooterSmogProps) {
  const { reducedMotion, pauseWebGL } = useAccessibility()
  const { theme } = useTheme()
  const [isSafari] = useState(
    () =>
      typeof navigator !== 'undefined' &&
      /Safari/.test(navigator.userAgent) &&
      !/Chrome/.test(navigator.userAgent)
  )
  const isMobile = variant === 'mobile'

  const showEffects = !reducedMotion && !pauseWebGL
  const smogHeight = isMobile ? 300 : 450

  return (
    <div
      className="absolute left-0 right-0 pointer-events-none z-0 overflow-hidden"
      style={{
        top: isMobile ? '-36px' : '0',
        height: `${smogHeight}px`,
        maskImage:
          'linear-gradient(to bottom, black 0%, black 20%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to bottom, black 0%, black 20%, transparent 100%)',
      }}
      aria-hidden="true"
    >
      <CSSGlow
        visible={visible}
        theme={theme}
        isMobile={isMobile}
        animateSwells={showEffects && !isMobile && !isSafari}
        isSafari={isSafari}
        useDither={!isMobile && !isSafari}
      />

      {showEffects && (
        <FooterDustParticles
          visible={visible}
          variant={isMobile ? 'mobile-lite' : 'desktop'}
        />
      )}
    </div>
  )
}

function CSSGlow({
  visible,
  theme,
  isMobile,
  animateSwells,
  isSafari,
  useDither,
}: {
  visible: boolean
  theme: string
  isMobile: boolean
  animateSwells: boolean
  isSafari: boolean
  useDither: boolean
}) {
  const isLight = theme === 'light'
  const isDesktop = !isMobile

  const baseAlpha = isLight ? '0.35' : isDesktop ? '0.2' : '0.38'
  const swell1Alpha = isLight ? '0.50' : isDesktop ? '0.4' : '0.58'
  const swell2Alpha = isLight ? '0.40' : isDesktop ? '0.35' : '0.48'
  const swell3Alpha = isLight ? '0.30' : isDesktop ? '0.3' : '0.42'

  const containerBlur = isLight
    ? isMobile
      ? '56px'
      : '80px'
    : isMobile
      ? '28px'
      : '40px'
  const ditherOpacity = isLight ? 0.12 : 0.18

  const height1 = isLight ? '85%' : '120%'
  const height2 = isLight ? '65%' : '85%'
  const height3 = isLight ? '75%' : '100%'

  const swellOriginY = isMobile ? '-12%' : '0%'

  return (
    <m.div
      className="absolute inset-0"
      animate={{ opacity: visible ? 1 : 0 }}
      transition={
        isMobile
          ? { duration: 1.6, ease: [0.4, 0, 0.2, 1] }
          : { duration: 1.2, ease: 'easeOut' }
      }
      initial={{ opacity: 0 }}
    >
      <div
        className="absolute inset-0 gpu-accelerate"
        style={{
          filter: isLight
            ? `blur(${containerBlur}) saturate(1.6) brightness(1.1)`
            : `blur(${containerBlur})`,
          mixBlendMode: isLight ? 'screen' : 'normal',
        }}
      >
        <div
          suppressHydrationWarning
          className="absolute inset-0"
          style={{
            background: `linear-gradient(in oklch to right, rgb(var(--color-gradient-start) / ${baseAlpha}), rgb(var(--color-gradient-end) / 0.20))`,
            maskImage: 'linear-gradient(to bottom, black 0%, transparent 90%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, black 0%, transparent 90%)',
          }}
        />

        <m.div
          suppressHydrationWarning
          className="absolute -inset-x-[10%] inset-y-0"
          animate={
            animateSwells
              ? { x: ['0%', '6%', '0%'], scale: isLight ? [1, 1.1, 1] : 1 }
              : { x: '0%', scale: 1 }
          }
          transition={{
            duration: 14,
            repeat: animateSwells ? Infinity : 0,
            ease: 'easeInOut',
          }}
          style={{
            background: `radial-gradient(in oklch ellipse 40% ${height1} at 28% ${swellOriginY}, rgb(var(--color-gradient-start) / ${swell1Alpha}) 0%, transparent 75%)`,
          }}
        />

        <m.div
          suppressHydrationWarning
          className="absolute -inset-x-[10%] inset-y-0"
          animate={
            animateSwells
              ? {
                  x: ['0%', '-5%', '0%'],
                  scale: isLight ? [1, 1.15, 1] : 1,
                  opacity: [0.8, 1, 0.8],
                }
              : { x: '0%', scale: 1, opacity: 0.8 }
          }
          transition={{
            duration: 18,
            repeat: animateSwells ? Infinity : 0,
            ease: 'easeInOut',
          }}
          style={{
            background: `radial-gradient(in oklch ellipse 35% ${height2} at 72% ${swellOriginY}, rgb(var(--color-gradient-end) / ${swell2Alpha}) 0%, transparent 75%)`,
          }}
        />

        <m.div
          suppressHydrationWarning
          className="absolute -inset-x-[15%] inset-y-0"
          animate={
            animateSwells
              ? {
                  x: ['-3%', '10%', '-3%'],
                  scale: isLight ? [1, 1.08, 1] : 1,
                  opacity: [0.5, 1, 0.5],
                }
              : { x: '-3%', scale: 1, opacity: 0.5 }
          }
          transition={{
            duration: 22,
            repeat: animateSwells ? Infinity : 0,
            ease: 'easeInOut',
          }}
          style={{
            background: `radial-gradient(in oklch ellipse 30% ${height3} at 50% ${swellOriginY}, rgb(var(--color-gradient-start) / ${swell3Alpha}) 0%, transparent 70%)`,
          }}
        />
      </div>

      {useDither && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            filter: isSafari ? 'none' : 'url(#sensory-grit)',
            mixBlendMode: 'overlay',
            opacity: ditherOpacity,
          }}
        />
      )}
    </m.div>
  )
}
