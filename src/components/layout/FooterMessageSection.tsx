'use client'

import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  m,
  type MotionValue,
  type Variants,
} from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import { HoverButton } from '@/components/ui/HoverButton'
import { PaperPlane } from '@/components/ui/PaperPlane'
import { sendMessage } from '@/app/actions/send-message'
import type { PaperPlaneFlightRef } from '@/components/dialogs/PaperPlaneFlight'
import dynamic from 'next/dynamic'

const PaperPlaneFlight = dynamic(
  () =>
    import('@/components/dialogs/PaperPlaneFlight').then(
      (mod) => mod.PaperPlaneFlight
    ),
  {
    ssr: false,
  }
)

interface FooterMessageSectionProps {
  sectionOpacity: MotionValue<number>
  sectionY: MotionValue<number>
  isMobileFlow?: boolean
  playShimmer: boolean
  isFormOpen: boolean
  onFormOpenChange: (open: boolean) => void
}

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
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

export function FooterMessageSection({
  sectionOpacity,
  sectionY,
  isMobileFlow = false,
  playShimmer,
  isFormOpen,
  onFormOpenChange,
}: FooterMessageSectionProps) {
  const [isFlying, setIsFlying] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isTappingMessage, setIsTappingMessage] = useState(false)
  const flightRef = useRef<PaperPlaneFlightRef>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const closeForm = () => {
    onFormOpenChange(false)
    setIsFlying(false)
    setErrorMessage(null)
  }

  const handleTapMessage = () => {
    setIsTappingMessage(true)
    setTimeout(() => setIsTappingMessage(false), 200)
    const nextOpen = !isFormOpen
    onFormOpenChange(nextOpen)
    setIsFlying(false)
    setErrorMessage(null)
    if (!nextOpen) setIsSent(false)
  }

  useEffect(() => {
    if (!isSent) return

    const timer = setTimeout(() => {
      setIsSent(false)
      setIsFlying(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [isSent])

  return (
    <m.div
      className={cn(
        'relative z-30',
        isMobileFlow
          ? 'order-first mb-16 w-full'
          : 'hidden lg:block lg:order-1 lg:min-w-[420px]'
      )}
      style={
        isMobileFlow ? undefined : { opacity: sectionOpacity, y: sectionY }
      }
    >
      <div className="relative">
        <m.button
          onClick={handleTapMessage}
          animate={{ scale: isTappingMessage ? 0.94 : 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          className={cn(
            'group inline-flex items-start gap-[16px] font-bold tracking-tight text-foreground transition-all duration-500 hover:text-primary relative outline-none',
            isMobileFlow ? 'text-xl' : 'text-base md:text-xl lg:text-2xl',
            playShimmer && 'shimmer-glow'
          )}
        >
          Send a message
          <div className="relative w-[28px] h-[28px] mt-0.5">
            <m.div
              animate={{
                y: isFormOpen || isFlying ? 0 : [0, -4, 0],
                scale: isFlying ? 0 : 1,
                opacity: isFlying ? 0 : 1,
              }}
              transition={{
                y:
                  isFormOpen || isFlying
                    ? { duration: 0.25, ease: 'easeOut' }
                    : {
                        repeat: Infinity,
                        duration: 1.5,
                        ease: 'easeInOut',
                      },
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
              <PaperPlane className="w-[28px] h-[28px] text-foreground" />
            </m.div>
            <div className="absolute top-0 left-0">
              {isMounted && (
                <PaperPlaneFlight
                  ref={flightRef}
                  onComplete={() => {
                    setIsSent(true)
                    setIsSubmitting(false)
                  }}
                />
              )}
            </div>
          </div>
        </m.button>

        <AnimatePresence>
          {isSent && !isFormOpen && (
            <m.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 mt-4 text-sm md:text-base font-medium"
              style={{ color: 'rgb(var(--color-text-tertiary-50))' }}
            >
              Your message has been sent
            </m.p>
          )}
          {errorMessage && !isFormOpen && (
            <m.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 mt-4 text-sm md:text-base font-medium text-red-500"
            >
              {errorMessage}
            </m.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isFormOpen && (
            <m.form
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
                    onFormOpenChange(false)
                    setIsSent(false)
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
              <m.div variants={fieldVariants} className="relative">
                <label htmlFor="footer-message" className="sr-only">
                  Message
                </label>
                <textarea
                  id="footer-message"
                  name="message"
                  placeholder="Message"
                  rows={1}
                  required
                  className="contact-placeholder w-full bg-transparent border-b py-2 text-lg focus:border-primary focus:outline-none transition-colors resize-none overflow-hidden"
                  style={{
                    borderBottomColor: 'rgb(var(--color-text-color70))',
                  }}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement
                    target.style.height = 'auto'
                    target.style.height = `${target.scrollHeight}px`
                  }}
                />
              </m.div>

              <div className="space-y-6">
                <m.div variants={fieldVariants} className="pt-2">
                  <h3 className="text-[14px] font-bold text-foreground uppercase tracking-tight">
                    Optional
                  </h3>
                </m.div>

                <div className="space-y-8 !mt-4">
                  <m.div variants={fieldVariants} className="relative">
                    <label htmlFor="footer-linkedin" className="sr-only">
                      LinkedIn Profile (Optional)
                    </label>
                    <input
                      id="footer-linkedin"
                      type="text"
                      name="linkedin"
                      placeholder="LinkedIn"
                      className="contact-placeholder w-full bg-transparent border-b py-2 text-lg focus:border-primary focus:outline-none transition-colors"
                      style={{
                        borderBottomColor: 'rgb(var(--color-text-color70))',
                      }}
                    />
                  </m.div>

                  <m.div variants={fieldVariants} className="relative">
                    <label htmlFor="footer-email" className="sr-only">
                      Your Email Address (Optional)
                    </label>
                    <input
                      id="footer-email"
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="contact-placeholder w-full bg-transparent border-b py-2 text-lg focus:border-primary focus:outline-none transition-colors"
                      style={{
                        borderBottomColor: 'rgb(var(--color-text-color70))',
                      }}
                    />
                  </m.div>
                </div>
              </div>

              <m.div
                variants={fieldVariants}
                className="flex items-center justify-between pt-8"
              >
                <HoverButton type="button" muted animate={false} onClick={closeForm}>
                  Close
                </HoverButton>
                <HoverButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send'}
                </HoverButton>
              </m.div>
            </m.form>
          )}
        </AnimatePresence>
      </div>
    </m.div>
  )
}
