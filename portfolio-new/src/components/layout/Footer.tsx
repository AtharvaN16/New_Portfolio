'use client'

/**
 * Footer Component (Refactored)
 *
 * Modern, responsive footer with:
 * - Quick navigation links with hover effects
 * - Contact information with email copy
 * - Real-time location clock (memoized to prevent re-renders)
 * - Inline contact form with staggered animations
 * - Refined paper plane flight animation
 *
 * Mobile-first responsive design using design tokens
 * Reduced from 737 lines to <200 lines by extracting components
 */

import { useState, useRef, useEffect } from 'react'
import { motion, useTransform, useMotionValue, useMotionValueEvent, AnimatePresence, type MotionValue, type Variants } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import { useEmailCopy } from '@/hooks/use-email-copy'
import { useBreakpoints } from '@/hooks/use-breakpoint'
import {
  FOOTER_LINKS,
  FOOTER_CONTACT,
  FOOTER_ARIA_LABELS,
} from '@/lib/constants/footer'
import { FooterClock } from './FooterClock'
import { FooterSmog } from './FooterSmog'
import { PaperPlane } from '@/components/ui/PaperPlane'
import { PaperPlaneFlight, type PaperPlaneFlightRef } from '@/components/animations/PaperPlaneFlight'

import { sendMessage } from '@/app/actions/send-message'

interface FooterProps {
  revealProgress?: MotionValue<number>
  triggerShimmer?: boolean
}

export function Footer({ revealProgress, triggerShimmer }: FooterProps) {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isFlying, setIsFlying] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isTappingMessage, setIsTappingMessage] = useState(false)
  const flightRef = useRef<PaperPlaneFlightRef>(null)

  const handleTapMessage = () => {
    setIsTappingMessage(true)
    setTimeout(() => setIsTappingMessage(false), 200)
    setIsFormOpen(!isFormOpen)
    setIsFlying(false)
    setErrorMessage(null)
    if (!isFormOpen) setIsSent(false)
  }

  // Auto-fade success message after 2 seconds and bring plane back
  useEffect(() => {
    if (isSent) {
      const timer = setTimeout(() => {
        setIsSent(false)
        setIsFlying(false) // Static plane pops back in after message fades
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [isSent])

  const fallbackProgress = useMotionValue(1)
  const progress = revealProgress ?? fallbackProgress
  const { isDesktop } = useBreakpoints()

  // Desktop: content fades in and moves up during the final stretch of the reveal.
  const desktopOpacity = useTransform(progress, [0.8, 1.0], [0, 1])
  const desktopY = useTransform(progress, [0.8, 1.0], [25, 0])
  const staticOpacity = useMotionValue(1)
  const staticY = useMotionValue(0)
  const sectionOpacity = isDesktop ? desktopOpacity : staticOpacity
  const sectionY = isDesktop ? desktopY : staticY

  const glowFireThreshold = isDesktop ? 0.98 : 0.05
  const glowClearThreshold = isDesktop ? 0.98 : 0.02

  const [showGlow, setShowGlow] = useState(false)
  const [playShimmer, setPlayShimmer] = useState(false)
  const glowTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useMotionValueEvent(progress, 'change', (latest) => {
    if (latest >= glowFireThreshold && !glowTimerRef.current) {
      glowTimerRef.current = setTimeout(() => {
        setShowGlow(true)
      }, 100)
    } else if (latest < glowClearThreshold) {
      if (glowTimerRef.current) {
        clearTimeout(glowTimerRef.current)
        glowTimerRef.current = null
      }
      queueMicrotask(() => setShowGlow(false))
    }
  })

  // Play shimmer when explicitly triggered (e.g., from hero "Get in touch" link)
  useEffect(() => {
    if (triggerShimmer) {
      setPlayShimmer(true)
      const timer = setTimeout(() => {
        setPlayShimmer(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [triggerShimmer])

  useEffect(() => {
    return () => {
      if (glowTimerRef.current) clearTimeout(glowTimerRef.current)
    }
  }, [])

  const { copyEmail, isCopied } = useEmailCopy()

  const handleCopyEmail = () => {
    copyEmail(FOOTER_CONTACT.email)
  }

  // Form variants for staggered animation
  const formVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const fieldVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    },
  }

  return (
    <footer
      className="w-full text-foreground footer-bg relative z-20"
      style={{
        backgroundColor: 'rgb(var(--color-footer-bg))',
        boxShadow: 'var(--shadow-2xl)',
      }}
    >
      <FooterSmog visible={showGlow} />

      <div
        className="mx-auto max-w-[1920px] px-6 2xl:px-[140px] pt-24 md:pt-28 lg:pt-32 [--footer-content-height:480px] lg:[--footer-content-height:300px]"
        style={{ 
          paddingBottom: 'calc(85vh - var(--footer-content-height) - 56px)' 
        }}
      >
        <div className="footer-all-links-wrapper grid grid-cols-1 gap-12 lg:flex lg:items-start lg:justify-between">
          {/* Send Message Section - Left (Hidden on Mobile) */}
          <motion.div
            className="hidden lg:block lg:order-1 lg:min-w-[420px] relative z-30"
            style={{ opacity: sectionOpacity, y: sectionY }}
          >
            <div className="relative">
              <motion.button
                onClick={handleTapMessage}
                animate={{ scale: isTappingMessage ? 0.94 : 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className={cn(
                  "group inline-flex items-start gap-[16px] text-base font-bold tracking-tight text-foreground md:text-xl lg:text-2xl transition-all duration-500 hover:text-primary relative outline-none",
                  playShimmer && "shimmer-glow"
                )}
              >
                Send a message
                <div className="relative w-[28px] h-[28px] mt-0.5">
                  <motion.div
                    initial={false}
                    animate={{
                      y: isFormOpen || isFlying ? 0 : [0, -4, 0],
                      scale: isFlying ? 0 : 1,
                      opacity: isFlying ? 0 : 1,
                    }}
                    transition={{
                      y:
                        isFormOpen || isFlying
                          ? { duration: 0.25, ease: 'easeOut' }
                          : { repeat: Infinity, duration: 1.5, ease: 'easeInOut' },
                      scale: {
                        type: 'spring',
                        stiffness: 500,
                        damping: 15,
                        mass: 0.8,
                        restDelta: 0.001,
                      },
                      opacity: {
                        type: 'spring',
                        stiffness: 500,
                        damping: 15,
                        mass: 0.8,
                        restDelta: 0.001,
                      },
                    }}
                  >
                    <PaperPlane
                      className="w-[28px] h-[28px] text-foreground"
                    />
                  </motion.div>
                  <div className="absolute top-0 left-0">
                    {isDesktop && (
                      <PaperPlaneFlight 
                        ref={flightRef} 
                        onComplete={() => {
                          setIsSent(true) // Trigger success message when flight is done
                          setIsSubmitting(false)
                        }} 
                      />
                    )}
                  </div>
                </div>
              </motion.button>

              <AnimatePresence>
                {isSent && !isFormOpen && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-4 text-sm md:text-base font-medium"
                    style={{ color: 'rgb(var(--color-text-tertiary-50))' }}
                  >
                    Your message has been sent
                  </motion.p>
                )}
                {errorMessage && !isFormOpen && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-4 text-sm md:text-base font-medium text-red-500"
                  >
                    {errorMessage}
                  </motion.p>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {isFormOpen && (
                  <motion.form
                    variants={formVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="absolute top-full left-0 mt-8 space-y-10 w-full max-w-[360px] z-40"
                    onSubmit={async (e) => {
                      e.preventDefault()
                      setIsSubmitting(true)
                      setErrorMessage(null)
                      
                      try {
                        const formData = new FormData(e.currentTarget)
                        const response = await sendMessage(formData)
                        
                        if (response.success) {
                          setIsFlying(true)
                          setIsFormOpen(false) // Close fields immediately
                          setIsSent(false) // Reset success state when sending a new one
                          flightRef.current?.play()
                        } else {
                          setIsSubmitting(false)
                          setErrorMessage(response.error || 'Failed to send')
                        }
                      } catch (err) {
                        setIsSubmitting(false)
                        setErrorMessage('A network error occurred. Please try again.')
                        console.error('Form submission error:', err)
                      }
                    }}
                  >
                    <motion.div variants={fieldVariants} className="relative">
                      <textarea
                        name="message"
                        placeholder="Message"
                        rows={1}
                        required
                        className="contact-placeholder w-full bg-transparent border-b py-2 text-lg focus:border-primary focus:outline-none transition-colors resize-none overflow-hidden"
                        style={{ borderBottomColor: 'rgb(var(--color-text-color70))' }}
                        onInput={(e) => {
                          const target = e.target as HTMLTextAreaElement;
                          target.style.height = 'auto';
                          target.style.height = `${target.scrollHeight}px`;
                        }}
                      />
                    </motion.div>

                    {/* Optional Section */}
                    <div className="space-y-6">
                      <motion.div variants={fieldVariants} className="pt-2">
                        <h3 className="text-[14px] font-bold text-foreground uppercase tracking-tight">
                          Optional
                        </h3>
                      </motion.div>

                      <div className="space-y-8 !mt-4">
                        <motion.div variants={fieldVariants} className="relative">
                          <input
                            type="text"
                            name="linkedin"
                            placeholder="LinkedIn"
                            className="contact-placeholder w-full bg-transparent border-b py-2 text-lg focus:border-primary focus:outline-none transition-colors"
                            style={{ borderBottomColor: 'rgb(var(--color-text-color70))' }}
                          />
                        </motion.div>

                        <motion.div variants={fieldVariants} className="relative">
                          <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="contact-placeholder w-full bg-transparent border-b py-2 text-lg focus:border-primary focus:outline-none transition-colors"
                            style={{ borderBottomColor: 'rgb(var(--color-text-color70))' }}
                          />
                        </motion.div>
                      </div>
                    </div>

                    <motion.div variants={fieldVariants} className="flex justify-end pt-8">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={cn(
                          "text-sm font-bold uppercase tracking-widest text-foreground hover:text-primary transition-colors py-2",
                          isSubmitting && "opacity-50 cursor-not-allowed"
                        )}
                      >
                        {isSubmitting ? 'Sending...' : 'Send'}
                      </button>
                    </motion.div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Columns Group */}
          <motion.div
            className="order-1 lg:order-2 flex flex-col gap-8 sm:flex-row sm:gap-12 lg:gap-0 lg:-ml-32"
            style={{ opacity: sectionOpacity, y: sectionY }}
          >
            {/* Quick Links Section */}
            <nav
              aria-label={FOOTER_ARIA_LABELS.quickLinks}
              className="w-full lg:w-[200px]"
            >
              <h3 className="mb-4 text-base font-bold text-foreground md:text-xl lg:mb-6 lg:text-2xl">
                Quick links
              </h3>
              <ul className="space-y-1.5 md:space-y-3">
                {FOOTER_LINKS.quickLinks.map((link) => {
                  const isResume = link.label === 'Resume'

                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className={cn(
                          isResume && 'footer-resume-link',
                          'footer-link group relative inline-block',
                          'text-sm md:text-base text-text-secondary',
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
            <div className="w-full lg:w-[200px] mt-4 sm:mt-0">
              <h3 className={cn(
                "mb-4 text-base font-bold text-foreground md:text-xl lg:mb-6 lg:text-2xl relative inline-block",
                playShimmer && "shimmer-glow"
              )}>
                Get in touch
              </h3>
              <div className="space-y-1.5 md:space-y-3">
                {/* External Links */}
                {FOOTER_LINKS.contact.map((link) => (
                  <div key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        'footer-link group relative inline-block',
                        'text-sm md:text-base text-text-secondary',
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

                <div className="flex items-center gap-3 -my-1">
                  <a
                    href={`mailto:${FOOTER_CONTACT.email}`}
                    className={cn(
                      'footer-link group relative inline-block',
                      'text-sm md:text-base text-text-secondary',
                      'transition-colors duration-200',
                      'focus-visible:outline-none focus-visible:ring-2',
                      'focus-visible:ring-primary focus-visible:ring-offset-2 rounded'
                    )}
                  >
                    {FOOTER_CONTACT.email}
                    <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-current transition-all duration-300 ease-out group-hover:w-full" />
                  </a>
                  <div className="flex items-center gap-2">
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
                    <AnimatePresence>
                      {isCopied && (
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-xs font-medium text-green-500 whitespace-nowrap"
                        >
                          Copied!
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Clock Section - Right */}
          <motion.div
            className="order-2 mt-12 lg:order-3 lg:mt-0"
            style={{ opacity: sectionOpacity, y: sectionY }}
          >
            <FooterClock className="text-left lg:text-right" />
          </motion.div>
        </div>
      </div>

      <div
        className="mx-auto flex max-w-[1920px] flex-col gap-2 px-6 2xl:px-[140px] py-4 sm:flex-row sm:items-center sm:justify-between"
        style={{ color: 'rgb(var(--color-text-color30))' }}
      >
        <p className="vulf-mono-italic-light text-[10px] md:text-sm tabular-nums opacity-80">
          Designed + Coded with &lt;3 by Atharva
        </p>
        <p className="vulf-mono-italic-light text-[10px] md:text-sm tabular-nums opacity-80">
          Last updated:{' '}
          {new Date().toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </p>
      </div>

    </footer>
  )
}
