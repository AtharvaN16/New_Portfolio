'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ProjectCard, type ProjectCardProps } from './ProjectCard'
import { cn } from '@/lib/utils/cn'

interface SelectedWorkProps {
  projects?: ProjectCardProps[]
  className?: string
}

const defaultProjects: ProjectCardProps[] = [
  {
    title: 'Improving Usability of Library Website',
    organization: 'University of Alberta',
    year: '2024',
    description:
      'A comprehensive UX redesign of the university library website, focusing on improving navigation, search functionality, and overall user experience for students and faculty.',
    tags: ['UX Research', 'UI Design', 'Prototyping'],
    imageBg: '#90EE90', // Light green
  },
  {
    title: 'Usability study on free tours page MET',
    organization: 'Class Project',
    year: '2024',
    description:
      "An in-depth usability study of the Metropolitan Museum of Art's free tours page, identifying key pain points and providing actionable recommendations to enhance visitor experience.",
    tags: ['Usability Study', 'Design'],
    imageBg: '#CD5C5C', // Coral/Indian red
  },
]

export function SelectedWork({
  projects = defaultProjects,
  className,
}: SelectedWorkProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationCycle, setAnimationCycle] = useState(0)
  const [showFirstArrow, setShowFirstArrow] = useState(true)

  const handleMouseEnter = () => {
    if (!isAnimating) {
      // Reset to show first arrow, then animate
      setShowFirstArrow(true)
      setAnimationCycle((prev) => prev + 1)
      setIsAnimating(true)
      // After animation completes, switch to second arrow
      setTimeout(() => {
        setShowFirstArrow(false)
        setIsAnimating(false)
      }, 750) // 600ms duration + 150ms delay
    }
  }

  const handleMouseLeave = () => {
    // Don't reset on leave, just stop animating
    setIsAnimating(false)
  }

  return (
    <section
      className={cn(
        'w-full bg-background pb-20 pt-8 md:pb-32 md:pt-12',
        className
      )}
    >
      {/* Section Title */}
      <h2 className="mb-12 text-5xl font-bold tracking-tight text-foreground md:mb-16 md:text-6xl lg:text-7xl">
        Selected Work
      </h2>

      {/* Projects Grid - gap matches page margin (px-6 = gap-6) */}
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>

      {/* Show More Work Link */}
      <div className="mt-[100px] md:mt-[133px] lg:mt-[200px] flex justify-end">
        <motion.button
          onClick={() => {
            // Use window.history.pushState to change URL without triggering Next.js navigation
            window.history.pushState({}, '', '/work')
            // Manually trigger the dialog check (don't dispatch popstate - it creates duplicate history entries)
            window.dispatchEvent(new CustomEvent('workdialog:check'))
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="group inline-flex items-center gap-[16px] text-[28px] font-bold tracking-tight text-foreground transition-colors hover:text-primary md:gap-[18px] md:text-[34px] lg:gap-[20px] lg:text-[40px]"
        >
          See More Work
          <span className="relative w-[21.6px] h-[21.6px] md:w-[25.2px] md:h-[25.2px] lg:w-[28.8px] lg:h-[28.8px] overflow-hidden">
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
                className="w-[21.6px] h-[21.6px] md:w-[25.2px] md:h-[25.2px] lg:w-[28.8px] lg:h-[28.8px]"
              >
                <g clipPath="url(#clip0_1988_35475)">
                  <path
                    d="M19.5142 14.589L19.4975 1.52369C19.4975 0.669421 18.9448 0.0664062 18.0402 0.0664062H4.97487C4.13736 0.0664062 3.56784 0.719672 3.56784 1.43993C3.56784 2.16021 4.20435 2.77998 4.92463 2.77998H8.79396L15.4272 2.54547L12.8978 4.70628L0.418761 17.2188C0.150753 17.4868 0 17.8386 0 18.1568C0 18.8771 0.653266 19.5806 1.40703 19.5806C1.7588 19.5806 2.0938 19.4467 2.36181 19.1787L14.8576 6.66607L17.052 4.13676L16.7671 10.7197V14.6561C16.7671 15.3595 17.4037 16.0295 18.1407 16.0295C18.8609 16.0295 19.5142 15.4098 19.5142 14.589Z"
                    fill="currentColor"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1988_35475">
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
                className="w-[21.6px] h-[21.6px] md:w-[25.2px] md:h-[25.2px] lg:w-[28.8px] lg:h-[28.8px]"
              >
                <g clipPath="url(#clip0_1988_35475_hover)">
                  <path
                    d="M19.5142 14.589L19.4975 1.52369C19.4975 0.669421 18.9448 0.0664062 18.0402 0.0664062H4.97487C4.13736 0.0664062 3.56784 0.719672 3.56784 1.43993C3.56784 2.16021 4.20435 2.77998 4.92463 2.77998H8.79396L15.4272 2.54547L12.8978 4.70628L0.418761 17.2188C0.150753 17.4868 0 17.8386 0 18.1568C0 18.8771 0.653266 19.5806 1.40703 19.5806C1.7588 19.5806 2.0938 19.4467 2.36181 19.1787L14.8576 6.66607L17.052 4.13676L16.7671 10.7197V14.6561C16.7671 15.3595 17.4037 16.0295 18.1407 16.0295C18.8609 16.0295 19.5142 15.4098 19.5142 14.589Z"
                    fill="currentColor"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1988_35475_hover">
                    <rect width="20" height="19.5812" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </motion.span>
          </span>
        </motion.button>
      </div>
    </section>
  )
}
