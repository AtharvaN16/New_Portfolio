'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, type MotionValue, type Variants } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import { PaperPlane } from '@/components/ui/PaperPlane'
import { PaperPlaneFlight, type PaperPlaneFlightRef } from '@/components/animations/PaperPlaneFlight'
import { sendMessage } from '@/app/actions/send-message'

interface FooterMessageSectionProps {
  sectionOpacity: MotionValue<number>
  sectionY: MotionValue<number>
  isDesktop: boolean
  playShimmer: boolean
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
  isDesktop,
  playShimmer,
}: FooterMessageSectionProps) {
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

  useEffect(() => {
    if (!isSent) return

    const timer = setTimeout(() => {
      setIsSent(false)
      setIsFlying(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [isSent])

  return (
    <motion.div
      className="hidden lg:block lg:order-1 lg:min-w-[420px] relative z-30"
      style={{ opacity: sectionOpacity, y: sectionY }}
    >
      <div className="relative">
        <motion.button
          onClick={handleTapMessage}
          animate={{ scale: isTappingMessage ? 0.94 : 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          className={cn(
            'group inline-flex items-start gap-[16px] text-base font-bold tracking-tight text-foreground md:text-xl lg:text-2xl transition-all duration-500 hover:text-primary relative outline-none',
            playShimmer && 'shimmer-glow'
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
              <PaperPlane className="w-[28px] h-[28px] text-foreground" />
            </motion.div>
            <div className="absolute top-0 left-0">
              {isDesktop && (
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
                    setIsFormOpen(false)
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
              <motion.div variants={fieldVariants} className="relative">
                <textarea
                  name="message"
                  placeholder="Message"
                  rows={1}
                  required
                  className="contact-placeholder w-full bg-transparent border-b py-2 text-lg focus:border-primary focus:outline-none transition-colors resize-none overflow-hidden"
                  style={{ borderBottomColor: 'rgb(var(--color-text-color70))' }}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement
                    target.style.height = 'auto'
                    target.style.height = `${target.scrollHeight}px`
                  }}
                />
              </motion.div>

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
                    'text-sm font-bold uppercase tracking-widest text-foreground hover:text-primary transition-colors py-2',
                    isSubmitting && 'opacity-50 cursor-not-allowed'
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
  )
}
