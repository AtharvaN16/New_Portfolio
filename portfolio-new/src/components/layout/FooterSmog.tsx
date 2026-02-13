'use client'

import { motion } from 'framer-motion'

interface FooterSmogProps {
  visible: boolean
}

export function FooterSmog({ visible }: FooterSmogProps) {
  return (
    <motion.div
      className="absolute top-0 left-0 right-0 h-[80px] pointer-events-none z-0 overflow-hidden"
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      initial={{ opacity: 0 }}
      aria-hidden="true"
      style={{
        maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
        filter: 'saturate(1.6) brightness(1.3)',
      }}
    >
      {/* Layer 1: Left-weighted cloud, drifts right */}
      <motion.div
        className="absolute -inset-x-[10%] inset-y-0"
        animate={{ x: ['0%', '5%', '0%'] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background:
            'radial-gradient(ellipse 40% 100% at 25% 0%, rgb(var(--color-gradient-start) / 0.55) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />
      {/* Layer 2: Right-weighted cloud, drifts left */}
      <motion.div
        className="absolute -inset-x-[10%] inset-y-0"
        animate={{ x: ['0%', '-5%', '0%'] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background:
            'radial-gradient(ellipse 40% 100% at 75% 0%, rgb(var(--color-gradient-end) / 0.5) 0%, transparent 70%)',
          filter: 'blur(22px)',
        }}
      />
      {/* Layer 3: Center blend, gentle scale pulse */}
      <motion.div
        className="absolute -inset-x-[5%] inset-y-0"
        animate={{ scaleX: [1, 1.03, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background:
            'linear-gradient(to right, rgb(var(--color-gradient-start) / 0.25) 0%, rgb(var(--color-gradient-end) / 0.2) 100%)',
          filter: 'blur(30px)',
        }}
      />
    </motion.div>
  )
}
