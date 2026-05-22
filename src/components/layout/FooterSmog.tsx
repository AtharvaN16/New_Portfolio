'use client'

import { m } from 'framer-motion'
import { FooterDustParticles } from './FooterDustParticles'
import { useBreakpoints } from '@/hooks/use-responsive'
import { useTheme } from '@/components/providers/ThemeProvider'
import { useAccessibility } from '@/components/providers/AccessibilityProvider'

interface FooterSmogProps {
  visible: boolean
}

export function FooterSmog({ visible }: FooterSmogProps) {
  const { reducedMotion, pauseWebGL } = useAccessibility()
  const { isDesktop } = useBreakpoints()
  const { theme } = useTheme()

  const showEffects = !reducedMotion && !pauseWebGL

  // Mobile/touch: skip the smog entirely. The animated swells run behind a
  // blur(40px) + SVG-dither pass that the GPU cannot cache while animating,
  // so it re-rasterizes every frame — a major source of scroll jitter + heat.
  if (!isDesktop) return null

  return (
    <div
      className="absolute top-0 left-0 right-0 pointer-events-none z-0 overflow-hidden"
      style={{
        height: '450px',
        maskImage: 'linear-gradient(to bottom, black 0%, black 20%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 20%, transparent 100%)'
      }}
      aria-hidden="true"
    >
      {/* Layer 1: Original CSS color glow */}
      <CSSGlow visible={visible} isDesktop={isDesktop} theme={theme} animate={showEffects} />

      {/* Layer 2: Tiny bright dust motes */}
      {showEffects && <FooterDustParticles visible={visible} />}
    </div>
  )
}

function CSSGlow({
  visible,
  isDesktop,
  theme,
  animate: animateSwells,
}: {
  visible: boolean
  isDesktop: boolean
  theme: string
  animate: boolean
}) {
  const isLight = theme === 'light'

  const baseAlpha   = isLight ? '0.35' : (isDesktop ? '0.2' : '0.4')
  const swell1Alpha = isLight ? '0.50' : (isDesktop ? '0.4' : '0.65')
  const swell2Alpha = isLight ? '0.40' : (isDesktop ? '0.35' : '0.55')
  const swell3Alpha = isLight ? '0.30' : (isDesktop ? '0.3' : '0.5')

  // 1 large blur on a parent is significantly more performant than 4 separate blurs.
  const containerBlur = isLight ? '80px' : '40px'

  const height1 = isLight ? '85%' : '120%'
  const height2 = isLight ? '65%' : '85%'
  const height3 = isLight ? '75%' : '100%'

  // Dither opacity: reduced to compensate for the global TextureOverlay grain.
  // Ensures gradient smoothing without excessive perceived noise.
  const ditherOpacity = isLight ? 0.12 : 0.18

  return (
    // Outer wrapper handles the opacity fade so dither and gradients fade together.
    <m.div
      className="absolute inset-0"
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      initial={{ opacity: 0 }}
    >
      {/* Blur container — gradients only, no dither inside */}
      <div
        className="absolute inset-0 gpu-accelerate"
        style={{
          filter: isLight
            ? `blur(${containerBlur}) saturate(1.6) brightness(1.1)`
            : `blur(${containerBlur})`,
          mixBlendMode: isLight ? 'screen' : 'normal',
        }}
      >
        {/* Base wash — uses oklch interpolation for smooth left-to-right blend */}
        <div
          suppressHydrationWarning
          className="absolute inset-0"
          style={{
            background: `linear-gradient(in oklch to right, rgb(var(--color-gradient-start) / ${baseAlpha}), rgb(var(--color-gradient-end) / 0.20))`,
            maskImage: 'linear-gradient(to bottom, black 0%, transparent 90%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 90%)',
          }}
        />

        {/* Swell 1 */}
        <m.div
          suppressHydrationWarning
          className="absolute -inset-x-[10%] inset-y-0"
          animate={animateSwells
            ? { x: ['0%', '6%', '0%'], scale: isLight ? [1, 1.1, 1] : 1 }
            : { x: '0%', scale: 1 }}
          transition={{ duration: 14, repeat: animateSwells ? Infinity : 0, ease: 'easeInOut' }}
          style={{
            background: `radial-gradient(in oklch ellipse 40% ${height1} at 28% 0%, rgb(var(--color-gradient-start) / ${swell1Alpha}) 0%, transparent 75%)`,
          }}
        />

        {/* Swell 2 */}
        <m.div
          suppressHydrationWarning
          className="absolute -inset-x-[10%] inset-y-0"
          animate={animateSwells
            ? { x: ['0%', '-5%', '0%'], scale: isLight ? [1, 1.15, 1] : 1, opacity: [0.8, 1, 0.8] }
            : { x: '0%', scale: 1, opacity: 0.8 }}
          transition={{ duration: 18, repeat: animateSwells ? Infinity : 0, ease: 'easeInOut' }}
          style={{
            background: `radial-gradient(in oklch ellipse 35% ${height2} at 72% 0%, rgb(var(--color-gradient-end) / ${swell2Alpha}) 0%, transparent 75%)`,
          }}
        />

        {/* Swell 3 */}
        <m.div
          suppressHydrationWarning
          className="absolute -inset-x-[15%] inset-y-0"
          animate={animateSwells
            ? { x: ['-3%', '10%', '-3%'], scale: isLight ? [1, 1.08, 1] : 1, opacity: [0.5, 1, 0.5] }
            : { x: '-3%', scale: 1, opacity: 0.5 }}
          transition={{ duration: 22, repeat: animateSwells ? Infinity : 0, ease: 'easeInOut' }}
          style={{
            background: `radial-gradient(in oklch ellipse 30% ${height3} at 50% 0%, rgb(var(--color-gradient-start) / ${swell3Alpha}) 0%, transparent 70%)`,
          }}
        />
      </div>

      {/*
        DITHER PASS: Lives OUTSIDE the blur container so it is not blurred away.
        mix-blend-mode: overlay applies the noise as a tonal variation on the
        composited gradient, breaking up 8-bit quantization bands.
        Effective range per research: opacity 0.25–0.35 with overlay blend.
      */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          filter: 'url(#sensory-grit)',
          mixBlendMode: 'overlay',
          opacity: ditherOpacity,
        }}
      />
    </m.div>
  )
}
