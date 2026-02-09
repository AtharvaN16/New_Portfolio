'use client'

/**
 * Footer Component (Refactored)
 *
 * Modern, responsive footer with:
 * - Quick navigation links with hover effects
 * - Contact information with email copy
 * - Real-time location clock (memoized to prevent re-renders)
 * - Rating modal for portfolio feedback
 *
 * Mobile-first responsive design using design tokens
 * Reduced from 737 lines to <200 lines by extracting components
 */

import { useState } from 'react'
import { motion, useTransform, useMotionValue, type MotionValue } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import { useEmailCopy } from '@/hooks/use-email-copy'
import { useArrowAnimation } from '@/hooks/use-arrow-animation'
import {
  FOOTER_LINKS,
  FOOTER_CONTACT,
  FOOTER_ARIA_LABELS,
} from '@/lib/constants/footer'
import { GradientBar } from '@/components/ui/GradientBar'
import { AnimatedArrow } from '@/components/ui/AnimatedArrow'
import { FooterClock } from './FooterClock'
import { RatingModal } from './rating'

interface FooterProps {
  revealProgress?: MotionValue<number>
}

export function Footer({ revealProgress }: FooterProps) {
  const fallbackProgress = useMotionValue(1)
  const progress = revealProgress ?? fallbackProgress

  // Staggered fade-in + move-up for each section
  // Content is at the TOP of the footer, revealed last (bottom-up reveal)
  // so animations must play during the final ~35% of the reveal
  const sectionOpacity = useTransform(progress, [0.8, 1.0], [0, 1])
  const sectionY = useTransform(progress, [0.8, 1.0], [25, 0])

  const { copyEmail, isCopied } = useEmailCopy()
  const {
    isAnimating,
    animationCycle,
    showFirstArrow,
    handleMouseEnter,
    handleMouseLeave,
  } = useArrowAnimation()
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false)

  const handleCopyEmail = () => {
    copyEmail(FOOTER_CONTACT.email)
  }

  return (
    <footer
      className="w-full text-foreground footer-bg relative z-20"
      style={{
        backgroundColor: 'rgb(var(--color-footer-bg))',
        boxShadow: 'var(--shadow-2xl)',
      }}
    >
      {/* Main Footer Content */}
      <div
        className="mx-auto max-w-[1920px] px-6 pt-15 md:pt-16 lg:pt-20"
        style={{ paddingBottom: 'calc(85vh - 300px)' }}
      >
        <div className="footer-all-links-wrapper grid grid-cols-1 gap-12 lg:flex lg:items-start lg:justify-between">
          {/* Rate My Portfolio Section - Left */}
          <motion.div
            className="order-3 lg:order-1 lg:min-w-[420px] relative z-30"
            style={{ opacity: sectionOpacity, y: sectionY }}
          >
            <motion.button
              onClick={() => setIsRatingModalOpen(true)}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="group inline-flex items-center gap-[16px] text-[28px] font-bold tracking-tight text-foreground transition-colors hover:text-primary"
              disabled={isRatingModalOpen}
            >
              Rate my portfolio
              {!isRatingModalOpen && (
                <AnimatedArrow
                  isAnimating={isAnimating}
                  showFirstArrow={showFirstArrow}
                  animationCycle={animationCycle}
                />
              )}
            </motion.button>

            {!isRatingModalOpen && (
              <p
                className="mt-2 text-sm max-w-[270px]"
                style={{ color: 'rgb(var(--color-text-color30))' }}
              >
                Takes less than 5 min and is anonymous. The feedback will help
                me get better
              </p>
            )}
          </motion.div>

          {/* Columns Group */}
          <motion.div
            className="order-1 lg:order-2 flex gap-0 lg:-ml-32"
            style={{ opacity: sectionOpacity, y: sectionY }}
          >
            {/* Quick Links Section */}
            <nav
              aria-label={FOOTER_ARIA_LABELS.quickLinks}
              className="w-full lg:w-[200px]"
            >
              <h3 className="mb-6 text-lg font-bold text-foreground md:text-xl lg:text-2xl">
                Quick links
              </h3>
              <ul className="space-y-2 md:space-y-3">
                {FOOTER_LINKS.quickLinks.map((link) => {
                  const isResume = link.label === 'Resume'

                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className={cn(
                          isResume && 'footer-resume-link',
                          'footer-link group relative inline-block',
                          'text-base text-text-secondary',
                          'focus-visible:outline-none focus-visible:ring-2',
                          'focus-visible:ring-primary focus-visible:ring-offset-2 rounded'
                        )}
                      >
                        {link.label}
                        <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-current transition-all duration-300 ease-out group-hover:w-full" />
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>

            {/* Get in Touch Section */}
            <div className="w-full lg:w-[200px] mt-12 lg:mt-0">
              <h3 className="mb-6 text-lg font-bold text-foreground md:text-xl lg:text-2xl">
                Get in touch
              </h3>
              <div className="space-y-2 md:space-y-3">
                {/* External Links */}
                {FOOTER_LINKS.contact.map((link) => (
                  <div key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        'footer-link group relative inline-block',
                        'text-base text-text-secondary',
                        'transition-colors duration-200',
                        'focus-visible:outline-none focus-visible:ring-2',
                        'focus-visible:ring-primary focus-visible:ring-offset-2 rounded'
                      )}
                    >
                      {link.label}
                      <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-current transition-all duration-300 ease-out group-hover:w-full" />
                    </a>
                  </div>
                ))}

                {/* Email with Copy Button */}
                <div className="flex items-center gap-3 -my-1">
                  <a
                    href={`mailto:${FOOTER_CONTACT.email}`}
                    className={cn(
                      'footer-link group relative inline-block',
                      'text-base text-text-secondary',
                      'transition-colors duration-200',
                      'focus-visible:outline-none focus-visible:ring-2',
                      'focus-visible:ring-primary focus-visible:ring-offset-2 rounded'
                    )}
                  >
                    {FOOTER_CONTACT.email}
                    <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-current transition-all duration-300 ease-out group-hover:w-full" />
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    aria-label={FOOTER_ARIA_LABELS.copyEmail}
                    className={cn(
                      'group relative flex items-center justify-center',
                      'rounded-md p-2',
                      'text-text-tertiary opacity-50 transition-all duration-200',
                      'hover:bg-surface hover:text-foreground hover:opacity-100',
                      'focus-visible:outline-none focus-visible:ring-2',
                      'focus-visible:ring-primary focus-visible:ring-offset-2'
                    )}
                  >
                    <svg
                      width="14"
                      height="18"
                      viewBox="0 0 12 15"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      className="scale-110"
                    >
                      <g clipPath="url(#clip0_2011_35922)">
                        <path d="M2.77734 1.86749C2.77734 0.625103 3.38393 0.00390625 4.6117 0.00390625H6.74569C7.43999 0.00390625 7.97348 0.171995 8.41926 0.632407L11.1598 3.43144C11.6276 3.91378 11.7883 4.41805 11.7883 5.21464V9.73112C11.7883 10.9735 11.1745 11.5947 9.94668 11.5947H9.01124V10.5423H9.8955C10.4436 10.5423 10.7286 10.2427 10.7286 9.71645V4.915H8.18541C7.49842 4.915 7.15495 4.57151 7.15495 3.87724V1.05628H4.67016C4.11474 1.05628 3.82972 1.35592 3.82972 1.88211V2.91271C3.8251 2.91257 3.82011 2.91256 3.81511 2.91256H2.77734V1.86749ZM8.0977 3.71646C8.0977 3.89917 8.1708 3.97225 8.35346 3.97225H10.4729L8.0977 1.53863V3.71646Z" />
                        <path d="M0 12.6413C0 13.891 0.606577 14.5049 1.83435 14.5049H7.16932C8.39711 14.5049 9.011 13.8837 9.011 12.6413V8.27829C9.011 7.46707 8.92329 7.12354 8.41902 6.60466L5.38613 3.50603C4.91109 3.01638 4.51646 2.91406 3.81487 2.91406H1.83435C0.606577 2.91406 0 3.53526 0 4.77765V12.6413ZM1.05238 12.6266V4.79227C1.05238 4.26608 1.3374 3.96644 1.89282 3.96644H3.63947V7.21125C3.63947 7.97865 4.0268 8.35863 4.78686 8.35863H7.95127V12.6266C7.95127 13.1528 7.66629 13.4524 7.11814 13.4524H1.88551C1.3374 13.4524 1.05238 13.1528 1.05238 12.6266ZM4.91109 7.37936C4.70647 7.37936 4.61877 7.29165 4.61877 7.08702V4.17107L7.754 7.37936H4.91109Z" />
                      </g>
                      <defs>
                        <clipPath id="clip0_2011_35922">
                          <rect width="12" height="14.504" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                  {isCopied && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-sm font-medium text-green-500"
                    >
                      Copied!
                    </motion.span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Clock Section - Right */}
          <motion.div
            className="order-2 lg:order-3"
            style={{ opacity: sectionOpacity, y: sectionY }}
          >
            <FooterClock />
          </motion.div>
        </div>
      </div>

      {/* Rating Modal */}
      <RatingModal
        isOpen={isRatingModalOpen}
        onClose={() => setIsRatingModalOpen(false)}
      />

      {/* Gradient Bar Below Footer */}
      <GradientBar height="h-4" className="w-full" />
    </footer>
  )
}
