/**
 * Unified animation configuration for the entire project.
 * This deepens the leverage by allowing brand-wide changes to timing and easing in one place.
 */

export const ANIMATION_CONFIG = {
  // Standard durations
  DURATION: {
    FAST: 0.15,
    NORMAL: 0.3,
    SLOW: 0.6,
    STAGGER: 0.08,
  },

  // Consistent easings (Design Tokens for Motion)
  EASE: {
    // [0.22, 1, 0.36, 1] is a common premium ease (easeOutQuart-ish)
    PREMIUM: [0.22, 1, 0.36, 1] as const,
    // [0.16, 1, 0.3, 1] is easeOutExpo
    EXPO: [0.16, 1, 0.3, 1] as const,
    // Framer Motion spring defaults
    SPRING: {
      damping: 12,
      stiffness: 100,
    } as const,
  },

  // Viewport trigger defaults
  VIEWPORT: {
    once: true,
    margin: '-100px',
  },
}

/**
 * Common Animation Variants (Behaviors)
 * These can be reused across components to ensure consistent brand feel.
 */
export const ANIMATION_VARIANTS = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: (custom: { delay?: number; duration?: number } = {}) => ({
      opacity: 1,
      transition: {
        duration: custom.duration ?? ANIMATION_CONFIG.DURATION.SLOW,
        delay: custom.delay ?? 0,
        ease: ANIMATION_CONFIG.EASE.PREMIUM,
      },
    }),
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: { delay?: number; duration?: number } = {}) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: custom.duration ?? ANIMATION_CONFIG.DURATION.SLOW,
        delay: custom.delay ?? 0,
        ease: ANIMATION_CONFIG.EASE.PREMIUM,
      },
    }),
  },
  springUp: {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: { delay?: number } = {}) => ({
      opacity: 1,
      y: 0,
      transition: {
        ...ANIMATION_CONFIG.EASE.SPRING,
        delay: custom.delay ?? 0,
      },
    }),
  },
}
