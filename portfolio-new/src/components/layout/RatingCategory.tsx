'use client'

import { cn } from '@/lib/utils/cn'

interface RatingCategoryProps {
  label: string
  value: number
  hoveredValue: number
  onRate: (rating: number) => void
  onHover: (rating: number) => void
  onLeave: () => void
}

/**
 * RatingCategory Component
 *
 * Reusable rating stars component for Footer rating modal.
 * Displays 5-star rating with hover and click interactions.
 *
 * Features:
 * - Hover preview
 * - Click to rate
 * - Accessible with ARIA labels
 */
export function RatingCategory({
  label,
  value,
  hoveredValue,
  onRate,
  onHover,
  onLeave,
}: RatingCategoryProps) {
  const activeRating = hoveredValue || value

  return (
    <div className="flex items-center justify-between gap-8">
      <div className="text-[20px] text-foreground">{label}</div>
      <div className="flex gap-2" onMouseLeave={onLeave}>
        {[1, 2, 3, 4, 5].map((rating) => {
          const isFilled = activeRating >= rating

          return (
            <button
              key={rating}
              onClick={() => onRate(rating)}
              onMouseEnter={() => onHover(rating)}
              className={cn(
                'w-4 h-4 rounded-full border-2 transition-all',
                'hover:scale-110'
              )}
              style={{
                borderColor: isFilled
                  ? 'rgb(var(--color-foreground))'
                  : 'rgba(255, 255, 255, 0.2)',
                backgroundColor: isFilled
                  ? 'rgb(var(--color-foreground))'
                  : 'transparent',
              }}
              aria-label={`Rate ${label} ${rating} out of 5`}
            />
          )
        })}
      </div>
    </div>
  )
}
