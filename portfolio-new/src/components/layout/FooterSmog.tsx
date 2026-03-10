'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FooterDustParticles } from './FooterDustParticles'
import { useBreakpoints } from '@/hooks/use-breakpoint'
import { useTheme } from '@/components/providers/ThemeProvider'
import { useAccessibility } from '@/components/providers/AccessibilityProvider'
import { cn } from '@/lib/utils/cn'

interface FooterSmogProps {
  visible: boolean
}

export function FooterSmog({ visible }: FooterSmogProps) {
  const { reducedMotion, pauseWebGL } = useAccessibility()
  const { isDesktop } = useBreakpoints()
  const { theme } = useTheme()

  const showEffects = !reducedMotion && !pauseWebGL

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

/** Original subtle CSS gradient glow — unchanged from the working version */
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
  
  // 2026 'Luminous Bloom' physics:
  // Using higher base opacities instead of extreme filter saturation to prevent banding.
  // Blur radii pushed to maximum for ultra-smooth transitions.
  const baseAlpha   = isLight ? '0.35' : (isDesktop ? '0.2' : '0.4')
  const swell1Alpha = isLight ? '0.50' : (isDesktop ? '0.4' : '0.65')
  const swell2Alpha = isLight ? '0.40' : (isDesktop ? '0.35' : '0.55')
  const swell3Alpha = isLight ? '0.30' : (isDesktop ? '0.3' : '0.5')
  
  // Pre-calculate average blur values for flattening.
  // 1 large blur on a parent is significantly more performant than 4 separate blurs.
  const containerBlur = isLight ? '80px' : '40px'

  // Restoring height definitions for radial gradients to prevent ReferenceError
  const height1 = isLight ? '85%' : '120%'
  const height2 = isLight ? '65%' : '85%'
  const height3 = isLight ? '75%' : '100%'

  return (
    <motion.div
      ref={useRef<HTMLDivElement>(null)}
      className="absolute inset-0 gpu-accelerate"
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      initial={{ opacity: 0 }}
      style={{
        // Using moderate saturation to avoid banding, and 'screen' blend mode
        // for smoother, more luminous additive blending in light mode.
        filter: isLight ? `blur(${containerBlur}) saturate(1.6) brightness(1.1)` : `blur(${containerBlur})`,
        mixBlendMode: isLight ? 'screen' : 'normal',
        willChange: 'transform, opacity',
        transform: 'translateZ(0)'
      }}
    >
      {/* 
        DITHER PASS: Injecting a microscopic noise layer specifically into the glow 
        to break up color banding in BOTH modes.
      */}
      <div 
        className={cn(
          "absolute inset-0 pointer-events-none z-10",
          isLight ? "opacity-[0.03]" : "opacity-[0.015]"
        )}
        style={{ filter: 'url(#sensory-grit)' }}
      />

      {/* Base wash */}
      <div
        suppressHydrationWarning
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to right, rgb(var(--color-gradient-start) / ${baseAlpha}), rgb(var(--color-gradient-end) / 0.20))`,
          maskImage: 'linear-gradient(to bottom, black 0%, transparent 90%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, black 0%, transparent 90%)',
        }}
      />

      {/* Swell 1 - Breathing/Pulsing in Light Mode */}
      <motion.div
        suppressHydrationWarning
        className="absolute -inset-x-[10%] inset-y-0"
        animate={animateSwells 
          ? { x: ['0%', '6%', '0%'], scale: isLight ? [1, 1.1, 1] : 1 } 
          : { x: '0%', scale: 1 }}
        transition={{ duration: 14, repeat: animateSwells ? Infinity : 0, ease: 'easeInOut' }}
        style={{
          background: `radial-gradient(ellipse 40% ${height1} at 28% 0%, rgb(var(--color-gradient-start) / ${swell1Alpha}) 0%, transparent 75%)`,
          willChange: 'transform'
        }}
      />

      {/* Swell 2 - Breathing/Pulsing in Light Mode */}
      <motion.div
        suppressHydrationWarning
        className="absolute -inset-x-[10%] inset-y-0"
        animate={animateSwells 
          ? { x: ['0%', '-5%', '0%'], scale: isLight ? [1, 1.15, 1] : 1, opacity: [0.8, 1, 0.8] } 
          : { x: '0%', scale: 1, opacity: 0.8 }}
        transition={{ duration: 18, repeat: animateSwells ? Infinity : 0, ease: 'easeInOut' }}
        style={{
          background: `radial-gradient(ellipse 35% ${height2} at 72% 0%, rgb(var(--color-gradient-end) / ${swell2Alpha}) 0%, transparent 75%)`,
          willChange: 'transform'
        }}
      />

      {/* Swell 3 - Breathing/Pulsing in Light Mode */}
      <motion.div
        suppressHydrationWarning
        className="absolute -inset-x-[15%] inset-y-0"
        animate={animateSwells 
          ? { x: ['-3%', '10%', '-3%'], scale: isLight ? [1, 1.08, 1] : 1, opacity: [0.5, 1, 0.5] } 
          : { x: '-3%', scale: 1, opacity: 0.5 }}
        transition={{ duration: 22, repeat: animateSwells ? Infinity : 0, ease: 'easeInOut' }}
        style={{
          background: `radial-gradient(ellipse 30% ${height3} at 50% 0%, rgb(var(--color-gradient-start) / ${swell3Alpha}) 0%, transparent 70%)`,
          willChange: 'transform'
        }}
      />
    </motion.div>
  )
}
