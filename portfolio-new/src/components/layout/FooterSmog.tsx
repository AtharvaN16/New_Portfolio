'use client'

import { motion } from 'framer-motion'

interface FooterSmogProps {
  visible: boolean
}

export function FooterSmog({ visible }: FooterSmogProps) {
  return (
    <motion.div
      className="absolute top-0 left-0 right-0 h-[120px] pointer-events-none z-0 overflow-hidden"
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      initial={{ opacity: 0 }}
      aria-hidden="true"
    >
      {/* Base wash: continuous L-R gradient, ensures no gaps */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, rgb(var(--color-gradient-start) / 0.2), rgb(var(--color-gradient-end) / 0.15))',
          maskImage: 'linear-gradient(to bottom, black 0%, transparent 55%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 55%)',
          filter: 'blur(6px)',
        }}
      />

      {/* Swell 1: left-center, extends deep — bright hotspot */}
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

      {/* Swell 2: right side, shorter — creates luminance dip between swells */}
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

      {/* Swell 3: wandering accent — adds organic variance */}
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
