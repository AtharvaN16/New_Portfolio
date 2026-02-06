'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import type { ContactInfo } from './types'

interface RatingStep2Props {
  contactInfo: ContactInfo
  onFieldChange: <K extends keyof ContactInfo>(key: K, value: ContactInfo[K]) => void
  onBack: () => void
  onSubmit: () => void
}

const inputClassName = cn(
  'w-full px-0 py-2 text-sm text-foreground',
  'bg-transparent border-0 border-b border-text-tertiary',
  'focus:outline-none focus:border-foreground',
  'transition-colors placeholder:text-text-tertiary'
)

export function RatingStep2({
  contactInfo,
  onFieldChange,
  onBack,
  onSubmit,
}: RatingStep2Props) {
  return (
    <motion.div
      key="step-2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.2 }}
      className="space-y-8"
    >
      {/* Back Button */}
      <button
        onClick={onBack}
        className="text-sm font-medium text-foreground hover:text-primary transition-colors -mt-4 mb-4"
      >
        ← Back
      </button>

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
            onChange={(e) => onFieldChange('name', e.target.value)}
            className={inputClassName}
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
            onChange={(e) => onFieldChange('email', e.target.value)}
            className={inputClassName}
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
            onChange={(e) => onFieldChange('referralSource', e.target.value)}
            className={inputClassName}
          />
        </div>

        {/* LinkedIn Connection */}
        <div>
          <label className="block text-sm text-foreground mb-3">
            Would you like to connect on LinkedIn?
          </label>
          <div className="flex gap-4">
            <button
              onClick={() => onFieldChange('linkedinConnect', 'yes')}
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
              onClick={() => onFieldChange('linkedinConnect', 'no')}
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
          onClick={onSubmit}
          className="text-base font-medium text-foreground hover:text-primary transition-colors"
        >
          Submit
        </button>
      </div>
    </motion.div>
  )
}
