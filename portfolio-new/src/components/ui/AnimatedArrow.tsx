'use client'

import { motion } from 'framer-motion'

interface AnimatedArrowProps {
  isAnimating: boolean
  showFirstArrow: boolean
  animationCycle: number
  className?: string
}

/**
 * AnimatedArrow Component
 *
 * Reusable arrow animation for buttons and links.
 * Features diagonal arrow that exits top-right and enters from bottom-left.
 *
 * Usage:
 * - Manage animation state in parent component
 * - Pass isAnimating, showFirstArrow, and animationCycle as props
 *
 * Animation behavior:
 * - On hover: First arrow exits diagonally to top-right
 * - After 750ms: Second arrow enters from bottom-left
 */
export function AnimatedArrow({
  isAnimating,
  showFirstArrow,
  animationCycle,
  className = 'w-[18px] h-[18px]',
}: AnimatedArrowProps) {
  return (
    <span className={`relative overflow-hidden ${className}`}>
      {/* Arrow that exits top-right */}
      <motion.span
        key={`exit-${animationCycle}`}
        className="absolute inset-0 flex items-center justify-center"
        initial={{ x: 0, y: 0, clipPath: 'inset(0% 0% 0% 0%)' }}
        animate={{
          x: isAnimating && showFirstArrow ? 20 : showFirstArrow ? 0 : 20,
          y: isAnimating && showFirstArrow ? -20 : showFirstArrow ? 0 : -20,
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
          <g clipPath="url(#clip0_arrow)">
            <path
              d="M19.5142 14.589L19.4975 1.52369C19.4975 0.669421 18.9448 0.0664062 18.0402 0.0664062H4.97487C4.13736 0.0664062 3.56784 0.719672 3.56784 1.43993C3.56784 2.16021 4.20435 2.77998 4.92463 2.77998H8.79396L15.4272 2.54547L12.8978 4.70628L0.418761 17.2188C0.150753 17.4868 0 17.8386 0 18.1568C0 18.8771 0.653266 19.5806 1.40703 19.5806C1.7588 19.5806 2.0938 19.4467 2.36181 19.1787L14.8576 6.66607L17.052 4.13676L16.7671 10.7197V14.6561C16.7671 15.3595 17.4037 16.0295 18.1407 16.0295C18.8609 16.0295 19.5142 15.4098 19.5142 14.589Z"
              fill="currentColor"
            />
          </g>
          <defs>
            <clipPath id="clip0_arrow">
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
          <g clipPath="url(#clip0_arrow_hover)">
            <path
              d="M19.5142 14.589L19.4975 1.52369C19.4975 0.669421 18.9448 0.0664062 18.0402 0.0664062H4.97487C4.13736 0.0664062 3.56784 0.719672 3.56784 1.43993C3.56784 2.16021 4.20435 2.77998 4.92463 2.77998H8.79396L15.4272 2.54547L12.8978 4.70628L0.418761 17.2188C0.150753 17.4868 0 17.8386 0 18.1568C0 18.8771 0.653266 19.5806 1.40703 19.5806C1.7588 19.5806 2.0938 19.4467 2.36181 19.1787L14.8576 6.66607L17.052 4.13676L16.7671 10.7197V14.6561C16.7671 15.3595 17.4037 16.0295 18.1407 16.0295C18.8609 16.0295 19.5142 15.4098 19.5142 14.589Z"
              fill="currentColor"
            />
          </g>
          <defs>
            <clipPath id="clip0_arrow_hover">
              <rect width="20" height="19.5812" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </motion.span>
    </span>
  )
}
