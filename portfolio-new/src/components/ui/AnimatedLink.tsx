'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { type ReactNode, type MouseEvent } from 'react'

/**
 * AnimatedLink Component
 *
 * Link with animated arrow icon using Framer Motion (NOT GSAP).
 * Follows component guidelines: <300 lines, uses design tokens, accessible.
 *
 * Features:
 * - Arrow slides out right and re-enters from left on hover
 * - Smooth Framer Motion animations with page transition easing for hash links
 * - Accessible focus states
 * - Responsive sizing
 */

interface AnimatedLinkProps {
  href: string
  children: ReactNode
  className?: string
  variant?: 'default' | 'down-arrow'
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void
}

/**
 * Cubic bezier easing function matching page transitions
 * Easing: [0.87, 0, 0.13, 1] - exponential ease out
 */
function bezierEasing(t: number): number {
  // Approximate cubic-bezier(0.87, 0, 0.13, 1)
  // This is an exponential ease-out curve
  return 1 - Math.pow(1 - t, 4)
}

export function AnimatedLink({
  href,
  children,
  className = '',
  variant = 'default',
  onClick,
}: AnimatedLinkProps) {
  // Handle smooth scroll for hash links with page transition easing
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Allow parent components to hook into click behavior
    if (onClick) {
      onClick(e)
      // If parent prevented default, skip internal hash handling
      if (e.defaultPrevented) return
    }

    // Only handle hash links
    if (href.startsWith('#')) {
      e.preventDefault()
      const targetId = href.slice(1)

      // Trigger card animation immediately for #work (simultaneous with scroll)
      if (targetId === 'work') {
        window.dispatchEvent(new CustomEvent('force-card-up'))
      }

      const targetElement = document.getElementById(targetId)

      if (targetElement && window.lenis) {
        window.lenis.scrollTo(targetElement, {
          duration: 0.9, // Match page transition duration
          easing: bezierEasing, // Match page transition easing
        })
      } else if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={`group inline-flex items-center gap-2 text-nav-link text-text-primary hover:text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded px-2 py-1 ${className}`}
    >
      {children}

      {variant === 'default' && (
        <span className="relative w-4 h-4 overflow-hidden">
          <motion.span
            className="absolute inset-0 flex items-center justify-center"
            initial={{ x: 0, opacity: 1 }}
            whileHover={{ x: 16, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="w-4 h-4"
            >
              <path
                d="M3 8H13M13 8L9 4M13 8L9 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.span>

          <motion.span
            className="absolute inset-0 flex items-center justify-center"
            initial={{ x: -16, opacity: 0 }}
            whileHover={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="w-4 h-4"
            >
              <path
                d="M3 8H13M13 8L9 4M13 8L9 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.span>
        </span>
      )}

      {variant === 'down-arrow' && (
        <motion.span
          animate={{ y: [0, -4, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="w-5 h-5"
            aria-hidden="true"
          >
            <path
              d="M10 4V16M10 16L4 10M10 16L16 10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.span>
      )}
    </Link>
  )
}
