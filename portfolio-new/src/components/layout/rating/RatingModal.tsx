'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useRatingForm } from './use-rating-form'
import { RatingStep1 } from './RatingStep1'
import { RatingStep2 } from './RatingStep2'

interface RatingModalProps {
  isOpen: boolean
  onClose: () => void
}

/**
 * RatingModal Component
 *
 * Two-step rating form that slides in from the left.
 * Step 1: Ratings + suggestions
 * Step 2: Optional contact information
 */
export function RatingModal({ isOpen, onClose }: RatingModalProps) {
  const {
    ratings,
    hoveredRatings,
    suggestions,
    step,
    contactInfo,
    updateRating,
    updateHoveredRating,
    setSuggestions,
    setStep,
    updateContactField,
    reset,
    submit,
  } = useRatingForm()

  const handleClose = () => {
    onClose()
    // Reset state after animation completes
    setTimeout(reset, 400)
  }

  const handleSubmit = () => {
    submit()
    handleClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute left-0 top-0 bottom-4 w-full max-w-[500px] overflow-y-auto z-20 bg-black/50"
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute right-6 top-[calc(var(--space-15)+1.125rem)] text-text-tertiary hover:text-foreground transition-colors z-40"
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

          {/* Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="px-6 pt-36 pb-10 space-y-8"
          >
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <RatingStep1
                  ratings={ratings}
                  hoveredRatings={hoveredRatings}
                  suggestions={suggestions}
                  onRate={updateRating}
                  onHover={updateHoveredRating}
                  onSuggestionsChange={setSuggestions}
                  onNext={() => setStep(2)}
                />
              ) : (
                <RatingStep2
                  contactInfo={contactInfo}
                  onFieldChange={updateContactField}
                  onBack={() => setStep(1)}
                  onSubmit={handleSubmit}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
