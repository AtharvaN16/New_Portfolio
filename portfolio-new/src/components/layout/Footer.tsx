'use client'

/**
 * Footer Component
 *
 * Modern, responsive footer with:
 * - Quick navigation links with hover effects
 * - Contact information with email copy
 * - Real-time location clock
 *
 * Mobile-first responsive design using design tokens
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import { useCurrentTime } from '@/hooks/use-current-time'
import { useEmailCopy } from '@/hooks/use-email-copy'
import {
  FOOTER_LINKS,
  FOOTER_CONTACT,
  FOOTER_ARIA_LABELS,
} from '@/lib/constants/footer'
import { GradientBar } from '@/components/ui/GradientBar'

export function Footer() {
  const { formattedTime, formattedDate } = useCurrentTime()
  const { isCopied, copyEmail } = useEmailCopy()
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationCycle, setAnimationCycle] = useState(0)
  const [showFirstArrow, setShowFirstArrow] = useState(true)
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false)
  const [ratings, setRatings] = useState({
    visualDesign: 0,
    caseStudies: 0,
    usability: 0,
    overall: 0,
  })
  const [suggestions, setSuggestions] = useState('')
  const [step, setStep] = useState<1 | 2>(1)
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    referralSource: '',
    linkedinConnect: '' as 'yes' | 'no' | '',
  })
  const [hoveredRatings, setHoveredRatings] = useState({
    visualDesign: 0,
    caseStudies: 0,
    usability: 0,
    overall: 0,
  })

  const handleCopyEmail = () => {
    copyEmail(FOOTER_CONTACT.email)
  }

  const handleMouseEnter = () => {
    if (!isAnimating) {
      setShowFirstArrow(true)
      setAnimationCycle((prev) => prev + 1)
      setIsAnimating(true)
      setTimeout(() => {
        setShowFirstArrow(false)
        setIsAnimating(false)
      }, 750)
    }
  }

  const handleMouseLeave = () => {
    setIsAnimating(false)
  }

  return (
    <footer
      className="w-full text-foreground footer-bg mt-[200px] md:mt-[240px] lg:mt-[280px] relative z-20"
      style={{
        backgroundColor: 'rgb(var(--color-footer-bg))',
        boxShadow: 'var(--shadow-2xl)',
      }}
    >
      {/* Main Footer Content */}
      <div className="mx-auto max-w-[1920px] px-6 pt-15 md:pt-16 lg:pt-20" style={{ paddingBottom: 'calc(85vh - 300px)' }}>
        <div className="footer-all-links-wrapper grid grid-cols-1 gap-12 lg:flex lg:items-start lg:justify-between">
          {/* Rate My Portfolio Section - Left */}
          <div className="order-3 lg:order-1 lg:min-w-[420px] relative z-30">
            <motion.button
              onClick={() => setIsRatingModalOpen(true)}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="group inline-flex items-center gap-[16px] text-[28px] font-bold tracking-tight text-foreground transition-colors hover:text-primary"
              disabled={isRatingModalOpen}
            >
              Rate my portfolio
              {!isRatingModalOpen && (
                <span className="relative w-[18px] h-[18px] overflow-hidden">
                    {/* Arrow that exits top-right */}
                    <motion.span
                      key={`exit-${animationCycle}`}
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ x: 0, y: 0, clipPath: 'inset(0% 0% 0% 0%)' }}
                      animate={{
                        x: isAnimating && showFirstArrow ? 20 : showFirstArrow ? 0 : 20,
                        y:
                          isAnimating && showFirstArrow
                            ? -20
                            : showFirstArrow
                              ? 0
                              : -20,
                        clipPath:
                          showFirstArrow && !isAnimating
                            ? 'inset(0% 0% 0% 0%)'
                            : 'inset(0% 0% 0% 100%)',
                      }}
                      transition={{
                        duration: 0.6,
                        ease: [0.25, 0.1, 0.25, 1],
                        clipPath: { duration: 0.1, delay: 0 },
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-[18px] h-[18px]"
                      >
                        <g clipPath="url(#clip0_footer_arrow)">
                          <path
                            d="M19.5142 14.589L19.4975 1.52369C19.4975 0.669421 18.9448 0.0664062 18.0402 0.0664062H4.97487C4.13736 0.0664062 3.56784 0.719672 3.56784 1.43993C3.56784 2.16021 4.20435 2.77998 4.92463 2.77998H8.79396L15.4272 2.54547L12.8978 4.70628L0.418761 17.2188C0.150753 17.4868 0 17.8386 0 18.1568C0 18.8771 0.653266 19.5806 1.40703 19.5806C1.7588 19.5806 2.0938 19.4467 2.36181 19.1787L14.8576 6.66607L17.052 4.13676L16.7671 10.7197V14.6561C16.7671 15.3595 17.4037 16.0295 18.1407 16.0295C18.8609 16.0295 19.5142 15.4098 19.5142 14.589Z"
                            fill="currentColor"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_footer_arrow">
                            <rect width="20" height="19.5812" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </motion.span>

                    {/* Arrow that enters from bottom-left */}
                    <motion.span
                      key={`enter-${animationCycle}`}
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ x: -20, y: 20, clipPath: 'inset(100% 0% 0% 0%)' }}
                      animate={{
                        x: isAnimating && showFirstArrow ? 0 : showFirstArrow ? -20 : 0,
                        y: isAnimating && showFirstArrow ? 0 : showFirstArrow ? 20 : 0,
                        clipPath:
                          !showFirstArrow || (showFirstArrow && isAnimating)
                            ? 'inset(0% 0% 0% 0%)'
                            : 'inset(100% 0% 0% 0%)',
                      }}
                      transition={{
                        duration: 0.6,
                        ease: [0.25, 0.1, 0.25, 1],
                        delay: 0.15,
                        clipPath: { duration: 0.1, delay: 0.15 },
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-[18px] h-[18px]"
                      >
                        <g clipPath="url(#clip0_footer_arrow_hover)">
                          <path
                            d="M19.5142 14.589L19.4975 1.52369C19.4975 0.669421 18.9448 0.0664062 18.0402 0.0664062H4.97487C4.13736 0.0664062 3.56784 0.719672 3.56784 1.43993C3.56784 2.16021 4.20435 2.77998 4.92463 2.77998H8.79396L15.4272 2.54547L12.8978 4.70628L0.418761 17.2188C0.150753 17.4868 0 17.8386 0 18.1568C0 18.8771 0.653266 19.5806 1.40703 19.5806C1.7588 19.5806 2.0938 19.4467 2.36181 19.1787L14.8576 6.66607L17.052 4.13676L16.7671 10.7197V14.6561C16.7671 15.3595 17.4037 16.0295 18.1407 16.0295C18.8609 16.0295 19.5142 15.4098 19.5142 14.589Z"
                            fill="currentColor"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_footer_arrow_hover">
                            <rect width="20" height="19.5812" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </motion.span>
                </span>
              )}
            </motion.button>

            {!isRatingModalOpen && (
              <p className="mt-2 text-sm max-w-[270px]" style={{ color: 'rgb(var(--color-text-color30))' }}>
                Takes less than 5 min and is anonymous. The feedback will help me get better
              </p>
            )}
          </div>

          {/* Columns Group - closer to clock */}
          <div className="order-1 lg:order-2 flex gap-0 lg:-ml-32">
          {/* Quick Links Section */}
          <nav aria-label={FOOTER_ARIA_LABELS.quickLinks} className="w-full lg:w-[200px]">
            <h3 className="mb-6 text-lg font-bold text-foreground md:text-xl lg:text-2xl">
              Quick links
            </h3>
            <ul className="space-y-2 md:space-y-3">
              {FOOTER_LINKS.quickLinks.map((link) => {
                // Special traveling gradient effect for Resume link
                const isResume = link.label === 'Resume'

                if (isResume) {
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className={cn(
                          'footer-resume-link footer-link',
                          'group relative inline-block',
                          'text-base text-text-secondary',
                          'focus-visible:outline-none focus-visible:ring-2',
                          'focus-visible:ring-primary focus-visible:ring-offset-2 rounded'
                        )}
                      >
                        {link.label}
                        {/* Underline animation */}
                        <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-current transition-all duration-300 ease-out group-hover:w-full" />
                      </a>
                    </li>
                  )
                }

                // Default styling for other links
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className={cn(
                        'footer-link group relative inline-block',
                        'text-base text-text-secondary',
                        'transition-colors duration-200',
                        'focus-visible:outline-none focus-visible:ring-2',
                        'focus-visible:ring-primary focus-visible:ring-offset-2 rounded'
                      )}
                    >
                      {link.label}
                      {/* Underline animation */}
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
                    {/* Underline animation */}
                    <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-current transition-all duration-300 ease-out group-hover:w-full" />
                  </a>
                </div>
              ))}

              {/* Email with Copy Button */}
              <div className="flex items-center gap-3">
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
                  {/* Underline animation */}
                  <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-current transition-all duration-300 ease-out group-hover:w-full" />
                </a>
                <button
                  onClick={handleCopyEmail}
                  aria-label={FOOTER_ARIA_LABELS.copyEmail}
                  className={cn(
                    'group relative flex items-center justify-center',
                    'rounded-md p-1.5',
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
                        <rect width="12" height="14.5214" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  {isCopied && (
                    <span
                      className={cn(
                        'absolute -top-8 left-1/2 -translate-x-1/2',
                        'whitespace-nowrap rounded-md',
                        'bg-surface px-2 py-1',
                        'text-xs font-medium text-success',
                        'animate-in fade-in slide-in-from-bottom-2',
                        'duration-200'
                      )}
                    >
                      Copied!
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          </div>

          {/* Clock Section */}
          <div className="order-2 lg:order-3 mt-12 lg:mt-0">
            <div className="text-sm font-black uppercase text-right md:text-base lg:text-base" style={{ color: 'rgb(var(--color-text-primary))' }}>
              NEW YORK
            </div>
            <div className="mt-1 flex items-center gap-1.5">
              <div className="h-4 w-[3px] rounded-full flex-shrink-0" style={{ backgroundColor: 'rgb(var(--color-success))' }} />
              <div className="text-xs font-bold font-mono tabular-nums md:text-sm lg:text-sm" style={{ color: 'rgb(var(--color-text-secondary))' }}>
                {formattedTime}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rating Panel - Slides in from left */}
      <AnimatePresence>
        {isRatingModalOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute left-0 top-0 bottom-4 w-full max-w-[500px] overflow-y-auto z-20"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
          >
            {/* Close Button - aligned with title center */}
            <button
              onClick={() => {
                setIsRatingModalOpen(false)
                setStep(1)
              }}
              className="absolute right-6 text-text-tertiary hover:text-foreground transition-colors z-40"
              style={{ top: 'calc(var(--space-15) + 18px)' }}
              aria-label="Close rating panel"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 lg:w-7 lg:h-7"
              >
                <path
                  d="M15 5L5 15M5 5L15 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* Content - fades in after slide, starts below "Rate my portfolio" text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className="px-6 space-y-8"
              style={{
                paddingTop: '140px',
                paddingBottom: '40px',
              }}
            >
              {/* Back button for step 2 */}
              {step === 2 && (
                <button
                  onClick={() => setStep(1)}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors -mt-4 mb-4"
                >
                  Back
                </button>
              )}

              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col"
                  >
                    {/* Rating Categories with Circles - 48px from title, 20px gap between items */}
                    <div className="flex flex-col gap-5" style={{ marginTop: '48px' }}>
                {/* Visual Design */}
                <div className="flex items-center justify-between gap-8">
                  <div className="text-[20px] text-foreground">Visual Design</div>
                  <div
                    className="flex gap-2"
                    onMouseLeave={() => setHoveredRatings((prev) => ({ ...prev, visualDesign: 0 }))}
                  >
                    {[1, 2, 3, 4, 5].map((rating) => {
                      const activeRating = hoveredRatings.visualDesign || ratings.visualDesign
                      const isFilled = activeRating >= rating
                      return (
                        <button
                          key={rating}
                          onClick={() => setRatings((prev) => ({ ...prev, visualDesign: rating }))}
                          onMouseEnter={() => setHoveredRatings((prev) => ({ ...prev, visualDesign: rating }))}
                          className={cn(
                            'w-4 h-4 rounded-full border-2 transition-all',
                            'hover:scale-110'
                          )}
                          style={{
                            borderColor: isFilled ? 'rgb(var(--color-foreground))' : 'rgba(255, 255, 255, 0.2)',
                            backgroundColor: isFilled ? 'rgb(var(--color-foreground))' : 'transparent',
                          }}
                          aria-label={`Rate Visual Design ${rating} out of 5`}
                        />
                      )
                    })}
                  </div>
                </div>

                {/* Quality of Case Studies */}
                <div className="flex items-center justify-between gap-8">
                  <div className="text-[20px] text-foreground">Quality of Case Studies</div>
                  <div
                    className="flex gap-2"
                    onMouseLeave={() => setHoveredRatings((prev) => ({ ...prev, caseStudies: 0 }))}
                  >
                    {[1, 2, 3, 4, 5].map((rating) => {
                      const activeRating = hoveredRatings.caseStudies || ratings.caseStudies
                      const isFilled = activeRating >= rating
                      return (
                        <button
                          key={rating}
                          onClick={() => setRatings((prev) => ({ ...prev, caseStudies: rating }))}
                          onMouseEnter={() => setHoveredRatings((prev) => ({ ...prev, caseStudies: rating }))}
                          className={cn(
                            'w-4 h-4 rounded-full border-2 transition-all',
                            'hover:scale-110'
                          )}
                          style={{
                            borderColor: isFilled ? 'rgb(var(--color-foreground))' : 'rgba(255, 255, 255, 0.2)',
                            backgroundColor: isFilled ? 'rgb(var(--color-foreground))' : 'transparent',
                          }}
                          aria-label={`Rate Quality of Case Studies ${rating} out of 5`}
                        />
                      )
                    })}
                  </div>
                </div>

                {/* Usability of the Portfolio */}
                <div className="flex items-center justify-between gap-8">
                  <div className="text-[20px] text-foreground">Usability of the Portfolio</div>
                  <div
                    className="flex gap-2"
                    onMouseLeave={() => setHoveredRatings((prev) => ({ ...prev, usability: 0 }))}
                  >
                    {[1, 2, 3, 4, 5].map((rating) => {
                      const activeRating = hoveredRatings.usability || ratings.usability
                      const isFilled = activeRating >= rating
                      return (
                        <button
                          key={rating}
                          onClick={() => setRatings((prev) => ({ ...prev, usability: rating }))}
                          onMouseEnter={() => setHoveredRatings((prev) => ({ ...prev, usability: rating }))}
                          className={cn(
                            'w-4 h-4 rounded-full border-2 transition-all',
                            'hover:scale-110'
                          )}
                          style={{
                            borderColor: isFilled ? 'rgb(var(--color-foreground))' : 'rgba(255, 255, 255, 0.2)',
                            backgroundColor: isFilled ? 'rgb(var(--color-foreground))' : 'transparent',
                          }}
                          aria-label={`Rate Usability of the Portfolio ${rating} out of 5`}
                        />
                      )
                    })}
                  </div>
                </div>

                {/* Overall */}
                <div className="flex items-center justify-between gap-8">
                  <div className="text-[20px] text-foreground">Overall</div>
                  <div
                    className="flex gap-2"
                    onMouseLeave={() => setHoveredRatings((prev) => ({ ...prev, overall: 0 }))}
                  >
                    {[1, 2, 3, 4, 5].map((rating) => {
                      const activeRating = hoveredRatings.overall || ratings.overall
                      const isFilled = activeRating >= rating
                      return (
                        <button
                          key={rating}
                          onClick={() => setRatings((prev) => ({ ...prev, overall: rating }))}
                          onMouseEnter={() => setHoveredRatings((prev) => ({ ...prev, overall: rating }))}
                          className={cn(
                            'w-4 h-4 rounded-full border-2 transition-all',
                            'hover:scale-110'
                          )}
                          style={{
                            borderColor: isFilled ? 'rgb(var(--color-foreground))' : 'rgba(255, 255, 255, 0.2)',
                            backgroundColor: isFilled ? 'rgb(var(--color-foreground))' : 'transparent',
                          }}
                          aria-label={`Rate Overall ${rating} out of 5`}
                        />
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Suggestions - 36px from last category */}
              <div style={{ marginTop: '36px' }}>
                <p className="text-[20px] font-medium text-foreground mb-4">
                  Any suggestions for improvement?
                </p>
                <textarea
                  value={suggestions}
                  onChange={(e) => setSuggestions(e.target.value)}
                  className={cn(
                    'w-full h-[130px] px-4 py-3 rounded-sm',
                    'bg-transparent border',
                    'text-foreground text-sm',
                    'focus:outline-none focus:border-foreground',
                    'resize-none transition-colors'
                  )}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                  }}
                />
              </div>

                    {/* Next Button - 40px gap from textarea */}
                    <div className="flex justify-end" style={{ marginTop: '40px' }}>
                      <button
                        onClick={() => setStep(2)}
                        className="text-[28px] font-bold text-foreground hover:text-primary transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-8"
                  >
                    {/* Header */}
                    <div>
                      <h4 className="text-lg font-medium text-foreground mb-2">Optional</h4>
                      <p className="text-sm text-text-tertiary">
                        You can skip this section if you wish to remain anonymous
                      </p>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-6">
                      {/* Name */}
                      <div>
                        <label htmlFor="name" className="block text-sm text-foreground mb-2">
                          Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          value={contactInfo.name}
                          onChange={(e) =>
                            setContactInfo((prev) => ({ ...prev, name: e.target.value }))
                          }
                          className={cn(
                            'w-full px-0 py-2 text-sm text-foreground',
                            'bg-transparent border-0 border-b border-text-tertiary',
                            'focus:outline-none focus:border-foreground',
                            'transition-colors placeholder:text-text-tertiary'
                          )}
                          placeholder=""
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="block text-sm text-foreground mb-2">
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={contactInfo.email}
                          onChange={(e) =>
                            setContactInfo((prev) => ({ ...prev, email: e.target.value }))
                          }
                          className={cn(
                            'w-full px-0 py-2 text-sm text-foreground',
                            'bg-transparent border-0 border-b border-text-tertiary',
                            'focus:outline-none focus:border-foreground',
                            'transition-colors placeholder:text-text-tertiary'
                          )}
                          placeholder=""
                        />
                      </div>

                      {/* Referral Source */}
                      <div>
                        <label htmlFor="referral" className="block text-sm text-foreground mb-2">
                          How did you find my site?
                        </label>
                        <input
                          id="referral"
                          type="text"
                          value={contactInfo.referralSource}
                          onChange={(e) =>
                            setContactInfo((prev) => ({
                              ...prev,
                              referralSource: e.target.value,
                            }))
                          }
                          className={cn(
                            'w-full px-0 py-2 text-sm text-foreground',
                            'bg-transparent border-0 border-b border-text-tertiary',
                            'focus:outline-none focus:border-foreground',
                            'transition-colors placeholder:text-text-tertiary'
                          )}
                          placeholder=""
                        />
                      </div>

                      {/* LinkedIn Connection */}
                      <div>
                        <label className="block text-sm text-foreground mb-3">
                          Would you like to connect on LinkedIn?
                        </label>
                        <div className="flex gap-4">
                          <button
                            onClick={() =>
                              setContactInfo((prev) => ({ ...prev, linkedinConnect: 'yes' }))
                            }
                            className={cn(
                              'px-6 py-2 text-sm rounded-md transition-colors',
                              contactInfo.linkedinConnect === 'yes'
                                ? 'bg-foreground text-background'
                                : 'bg-surface text-foreground hover:bg-text-tertiary/20'
                            )}
                          >
                            Yes
                          </button>
                          <button
                            onClick={() =>
                              setContactInfo((prev) => ({ ...prev, linkedinConnect: 'no' }))
                            }
                            className={cn(
                              'px-6 py-2 text-sm rounded-md transition-colors',
                              contactInfo.linkedinConnect === 'no'
                                ? 'bg-foreground text-background'
                                : 'bg-surface text-foreground hover:bg-text-tertiary/20'
                            )}
                          >
                            No
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-2">
                      <button
                        onClick={() => {
                          console.log('Submitting:', { ratings, suggestions, contactInfo })
                          setIsRatingModalOpen(false)
                          setStep(1)
                        }}
                        className="text-base font-medium text-foreground hover:text-primary transition-colors"
                      >
                        Submit
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gradient Bar Below Footer */}
      <GradientBar height="h-4" className="w-full" />
    </footer>
  )
}
