'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FooterDustParticles } from './FooterDustParticles'

interface FooterSmogProps {
  visible: boolean
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return reduced
}

export function FooterSmog({ visible }: FooterSmogProps) {
  const prefersReducedMotion = usePrefersReducedMotion()

  const showEffects = !prefersReducedMotion

  return (
    <div
      className="absolute top-0 left-0 right-0 h-[120px] pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Layer 1: Original CSS color glow */}
      <CSSGlow visible={visible} />

      {/* Layer 2: Tiny bright dust motes */}
      {showEffects && <FooterDustParticles visible={visible} />}
    </div>
  )
}

/** Original subtle CSS gradient glow — unchanged from the working version */
function CSSGlow({ visible }: { visible: boolean }) {
  return (
    <motion.div
      className="absolute inset-0"
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      initial={{ opacity: 0 }}
    >
      {/* Base wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, rgb(var(--color-gradient-start) / 0.2), rgb(var(--color-gradient-end) / 0.15))',
          maskImage: 'linear-gradient(to bottom, black 0%, transparent 55%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, black 0%, transparent 55%)',
          filter: 'blur(6px)',
        }}
      />

      {/* Swell 1 */}
      <motion.div
        className="absolute -inset-x-[5%] inset-y-0"
        animate={{ x: ['0%', '6%', '0%'] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background:
            'radial-gradient(ellipse 35% 110% at 28% 0%, rgb(var(--color-gradient-start) / 0.4) 0%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

      {/* Swell 2 */}
      <motion.div
        className="absolute -inset-x-[5%] inset-y-0"
        animate={{ x: ['0%', '-5%', '0%'], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background:
            'radial-gradient(ellipse 30% 75% at 72% 0%, rgb(var(--color-gradient-end) / 0.35) 0%, transparent 70%)',
          filter: 'blur(35px)',
        }}
      />

      {/* Swell 3 */}
      <motion.div
        className="absolute -inset-x-[10%] inset-y-0"
        animate={{ x: ['-3%', '10%', '-3%'], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background:
            'radial-gradient(ellipse 25% 90% at 50% 0%, rgb(var(--color-gradient-start) / 0.3) 0%, transparent 65%)',
          filter: 'blur(28px)',
        }}
      />
    </motion.div>
  )
}
