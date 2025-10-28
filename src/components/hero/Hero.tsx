'use client'

import { motion } from 'framer-motion'
import { WaterBlobWithBoundary } from './WaterBlob'
import { AnimatedLink } from '@/components/ui/AnimatedLink'

/**
 * Hero Component
 *
 * Main hero section for homepage.
 * Clean, maintainable implementation following all guidelines.
 *
 * Layout:
 * - Hero text above blob
 * - Animated water blob (480px height, 90deg corners)
 * - Navigation links at bottom (absolute positioned)
 *
 * Features:
 * - Framer Motion animations (NOT GSAP)
 * - 24px margin on all sides
 * - Dark background
 * - Font: 20px/500 for text, 16px/500 for links
 */

const fadeInUp = {
  initial: { y: 40, opacity: 0 },
  animate: { y: 0, opacity: 1 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export function Hero() {
  return (
    <section className="relative flex flex-col" style={{ height: 'calc(100vh - 68px)', maxHeight: 'calc(100vh - 68px)' }}>
      <div className="max-w-[1920px] mx-auto w-full h-full flex flex-col">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="flex flex-col h-full"
        >
          {/* Hero Text + Browse work - Side by side */}
          <motion.div
            variants={fadeInUp}
            className="flex items-end justify-between gap-8 mb-8 mt-12"
            style={{ flexShrink: 0 }}
          >
            {/* Hero Text - Single line, 18px, 500 weight, -0.4px letter-spacing */}
            <p
              className="leading-relaxed max-w-lg"
              style={{
                fontSize: '18px',
                fontWeight: 500,
                lineHeight: '1.6',
                letterSpacing: '-0.4px',
              }}
            >
              Hi, I'm <span style={{ fontWeight: 700 }}>Atharva</span> — a product designer based in NYC.
              I love solving problems through thoughtful design and crafting delightful, user-centered experiences.
              Currently pursuing an MS in Human-Computer Interaction at Pratt Institute. Open to internships now
              and full-time roles starting Summer '26.
            </p>

            {/* Browse work link - Bottom aligned with text */}
            <AnimatedLink href="#work" variant="down-arrow">
              Browse work
            </AnimatedLink>
          </motion.div>

          {/* Animated Water Blob - Flex grow to fill space */}
          <motion.div
            variants={fadeInUp}
            className="relative w-full flex-1 overflow-hidden"
            style={{ minHeight: 0 }}
          >
            <WaterBlobWithBoundary />
          </motion.div>

          {/* Bottom Navigation Links - 16px from viewport bottom */}
          <motion.div
            variants={fadeInUp}
            className="flex items-center justify-between mt-4"
            style={{ flexShrink: 0, paddingBottom: '1rem' }}
          >
            {/* Left Link - No arrow */}
            <a
              href="/resume"
              className="hover:text-primary transition-colors duration-200"
              style={{ fontSize: '16px', fontWeight: 500, lineHeight: '1' }}
            >
              Résumé
            </a>

            {/* Right Link - No arrow */}
            <a
              href="#footer"
              className="hover:text-primary transition-colors duration-200"
              style={{ fontSize: '16px', fontWeight: 500, lineHeight: '1' }}
            >
              Get in touch
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
