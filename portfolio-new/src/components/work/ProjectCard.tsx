'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils/cn'

export interface ProjectCardProps {
  title: string
  organization: string
  year: string
  description: string
  tags: string[]
  imageBg: string
  imageUrl?: string // Optional project image
  variant?: 'default' | 'compact' // default for 2-grid, compact for 3-grid
  className?: string
  slug?: string // Optional slug for linking to case study page
  cardHeight?: string // Optional custom height (e.g., 'h-[400px] md:h-[500px]')
}

export function ProjectCard({
  title,
  organization,
  year,
  description: _description,
  tags: _tags,
  imageBg,
  imageUrl,
  variant = 'default',
  className,
  slug,
  cardHeight,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    if (slug) {
      // Change URL and trigger dialog - RemoveScroll handles scroll locking
      window.history.pushState({}, '', `/case-studies/${slug}`)
      window.dispatchEvent(new CustomEvent('casestudydialog:check'))
    }
  }

  return (
    <article
      className={cn('group flex flex-col', slug && 'cursor-pointer', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      role={slug ? 'button' : undefined}
      tabIndex={slug ? 0 : undefined}
      onKeyDown={(e) => {
        if (slug && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault()
          handleClick()
        }
      }}
    >
      {/* Card - Responsive height, or flex-1 to fill container when h-full is passed */}
      <div
        className={cn(
          'relative w-full overflow-hidden gpu-accelerate',
          // If parent has h-full, use flex-1 to fill; otherwise use explicit heights
          className?.includes('h-full')
            ? 'flex-1 min-h-[200px]'
            : cardHeight || 'h-[280px] sm:h-[360px] md:h-[420px] lg:h-[500px]'
        )}
      >
        {/* Background Color or Image */}
        <div
          className="absolute inset-0 bg-cover bg-center gpu-accelerate"
          style={{
            backgroundColor: imageBg,
            ...(imageUrl && { backgroundImage: `url(${imageUrl})` }),
          }}
        />

        {/* Overlay - Appears on Hover - CSS transition for performance */}
        <div
          className={cn(
            'project-card-overlay absolute inset-0 z-10 transition-opacity duration-250',
            isHovered ? 'opacity-100' : 'opacity-0'
          )}
        />
      </div>

      {/* Title and Info - Outside the card, below it */}
      <div className="mt-4 space-y-1 sm:mt-6">
        {/* Organization (Company Name) */}
        <p
          className="text-[16px] font-semibold md:text-[18px]"
          style={{ color: 'rgb(var(--color-text-secondary))' }}
        >
          {organization}
        </p>

        {/* Project Title */}
        <h3
          className={cn(
            'font-bold leading-tight text-foreground max-w-none sm:max-w-[85%]',
            variant === 'compact'
              ? 'text-[20px] sm:text-xl lg:text-[1.75rem]'
              : 'text-[20px] sm:text-2xl lg:text-[1.75rem]'
          )}
        >
          {title}
        </h3>

        {/* Tags and Year */}
        <div className="flex flex-wrap items-center gap-x-2 pt-3">
          <span 
            className="font-sans font-normal tracking-normal text-[14px] md:text-[18px]"
            style={{ color: 'rgb(var(--color-text-tertiary-50))' }}
          >
            {(() => {
              const displayTags = (_tags || [])
                .filter((tag) => tag !== 'Selected Work')
                .slice(0, 2)
              
              if (displayTags.length > 0) {
                return `${displayTags.join(' / ')} / ${year}`
              }
              return year
            })()}
          </span>
        </div>
      </div>
    </article>
  )
}
