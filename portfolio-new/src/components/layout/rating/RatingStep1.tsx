'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import { RatingCategory } from '../RatingCategory'
import type { Ratings, RatingKey } from './types'

interface RatingStep1Props {
  ratings: Ratings
  hoveredRatings: Ratings
  suggestions: string
  onRate: (key: RatingKey, value: number) => void
  onHover: (key: RatingKey, value: number) => void
  onSuggestionsChange: (value: string) => void
  onNext: () => void
}

const ratingCategories: { key: RatingKey; label: string }[] = [
  { key: 'visualDesign', label: 'Visual Design' },
  { key: 'caseStudies', label: 'Quality of Case Studies' },
  { key: 'usability', label: 'Usability of the Portfolio' },
  { key: 'overall', label: 'Overall' },
]

export function RatingStep1({
  ratings,
  hoveredRatings,
  suggestions,
  onRate,
  onHover,
  onSuggestionsChange,
  onNext,
}: RatingStep1Props) {
  return (
    <motion.div
      key="step-1"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col"
    >
      {/* Rating Categories */}
      <div className="flex flex-col gap-5 mt-12">
        {ratingCategories.map(({ key, label }) => (
          <RatingCategory
            key={key}
            label={label}
            value={ratings[key]}
            hoveredValue={hoveredRatings[key]}
            onRate={(rating) => onRate(key, rating)}
            onHover={(rating) => onHover(key, rating)}
            onLeave={() => onHover(key, 0)}
          />
        ))}
      </div>

      {/* Suggestions */}
      <div className="mt-9">
        <p className="text-[20px] font-medium text-foreground mb-4">
          Any suggestions for improvement?
        </p>
        <textarea
          value={suggestions}
          onChange={(e) => onSuggestionsChange(e.target.value)}
          className={cn(
            'w-full h-[130px] px-4 py-3 rounded-sm',
            'bg-white/5 border border-white/20',
            'text-foreground text-sm',
            'focus:outline-none focus:border-foreground',
            'resize-none transition-colors'
          )}
          placeholder="Optional"
        />
      </div>

      {/* Next Button */}
      <div className="flex justify-end mt-10">
        <button
          onClick={onNext}
          className="text-[28px] font-bold text-foreground hover:text-primary transition-colors"
        >
          Next
        </button>
      </div>
    </motion.div>
  )
}
