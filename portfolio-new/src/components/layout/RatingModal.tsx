'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import { RatingCategory } from './RatingCategory'

interface RatingModalProps {
  isOpen: boolean
  onClose: () => void
}

interface Ratings {
  visualDesign: number
  caseStudies: number
  usability: number
  overall: number
}

interface ContactInfo {
  name: string
  email: string
  referralSource: string
  linkedinConnect: 'yes' | 'no' | ''
}

/**
 * RatingModal Component
 *
 * Two-step rating form that slides in from the left.
 * Step 1: Ratings + suggestions
 * Step 2: Optional contact information
 *
 * Extracted from Footer.tsx to reduce file size and improve maintainability.
 */
export function RatingModal({ isOpen, onClose }: RatingModalProps) {
  const [ratings, setRatings] = useState<Ratings>({
    visualDesign: 0,
    caseStudies: 0,
    usability: 0,
    overall: 0,
  })
  const [hoveredRatings, setHoveredRatings] = useState<Ratings>({
    visualDesign: 0,
    caseStudies: 0,
    usability: 0,
    overall: 0,
  })
  const [suggestions, setSuggestions] = useState('')
  const [step, setStep] = useState<1 | 2>(1)
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    name: '',
    email: '',
    referralSource: '',
    linkedinConnect: '',
  })

  const handleClose = () => {
    onClose()
    // Reset state after animation completes
    setTimeout(() => {
      setStep(1)
      setRatings({ visualDesign: 0, caseStudies: 0, usability: 0, overall: 0 })
      setSuggestions('')
      setContactInfo({
        name: '',
        email: '',
        referralSource: '',
        linkedinConnect: '',
      })
    }, 400)
  }

  const handleSubmit = () => {
    // TODO: Send to backend/analytics service
    // For now, just log in development mode
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('Rating submission:', { ratings, suggestions, contactInfo })
    }
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
          className="absolute left-0 top-0 bottom-4 w-full max-w-[500px] overflow-y-auto z-20"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
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

          {/* Content */}
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
                ← Back
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
                  {/* Rating Categories */}
                  <div
                    className="flex flex-col gap-5"
                    style={{ marginTop: '48px' }}
                  >
                    <RatingCategory
                      label="Visual Design"
                      value={ratings.visualDesign}
                      hoveredValue={hoveredRatings.visualDesign}
                      onRate={(rating) =>
                        setRatings((prev) => ({
                          ...prev,
                          visualDesign: rating,
                        }))
                      }
                      onHover={(rating) =>
                        setHoveredRatings((prev) => ({
                          ...prev,
                          visualDesign: rating,
                        }))
                      }
                      onLeave={() =>
                        setHoveredRatings((prev) => ({
                          ...prev,
                          visualDesign: 0,
                        }))
                      }
                    />

                    <RatingCategory
                      label="Quality of Case Studies"
                      value={ratings.caseStudies}
                      hoveredValue={hoveredRatings.caseStudies}
                      onRate={(rating) =>
                        setRatings((prev) => ({ ...prev, caseStudies: rating }))
                      }
                      onHover={(rating) =>
                        setHoveredRatings((prev) => ({
                          ...prev,
                          caseStudies: rating,
                        }))
                      }
                      onLeave={() =>
                        setHoveredRatings((prev) => ({
                          ...prev,
                          caseStudies: 0,
                        }))
                      }
                    />

                    <RatingCategory
                      label="Usability of the Portfolio"
                      value={ratings.usability}
                      hoveredValue={hoveredRatings.usability}
                      onRate={(rating) =>
                        setRatings((prev) => ({ ...prev, usability: rating }))
                      }
                      onHover={(rating) =>
                        setHoveredRatings((prev) => ({
                          ...prev,
                          usability: rating,
                        }))
                      }
                      onLeave={() =>
                        setHoveredRatings((prev) => ({ ...prev, usability: 0 }))
                      }
                    />

                    <RatingCategory
                      label="Overall"
                      value={ratings.overall}
                      hoveredValue={hoveredRatings.overall}
                      onRate={(rating) =>
                        setRatings((prev) => ({ ...prev, overall: rating }))
                      }
                      onHover={(rating) =>
                        setHoveredRatings((prev) => ({
                          ...prev,
                          overall: rating,
                        }))
                      }
                      onLeave={() =>
                        setHoveredRatings((prev) => ({ ...prev, overall: 0 }))
                      }
                    />
                  </div>

                  {/* Suggestions */}
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
                      placeholder="Optional"
                    />
                  </div>

                  {/* Next Button */}
                  <div
                    className="flex justify-end"
                    style={{ marginTop: '40px' }}
                  >
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
                    <h4 className="text-lg font-medium text-foreground mb-2">
                      Optional
                    </h4>
                    <p className="text-sm text-text-tertiary">
                      You can skip this section if you wish to remain anonymous
                    </p>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-6">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm text-foreground mb-2"
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={contactInfo.name}
                        onChange={(e) =>
                          setContactInfo((prev) => ({
                            ...prev,
                            name: e.target.value,
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

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm text-foreground mb-2"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={contactInfo.email}
                        onChange={(e) =>
                          setContactInfo((prev) => ({
                            ...prev,
                            email: e.target.value,
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

                    {/* Referral Source */}
                    <div>
                      <label
                        htmlFor="referral"
                        className="block text-sm text-foreground mb-2"
                      >
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
                            setContactInfo((prev) => ({
                              ...prev,
                              linkedinConnect: 'yes',
                            }))
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
                            setContactInfo((prev) => ({
                              ...prev,
                              linkedinConnect: 'no',
                            }))
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
                      onClick={handleSubmit}
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
  )
}
