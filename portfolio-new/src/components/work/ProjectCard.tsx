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
      {/* Card - Responsive height for different screen sizes */}
      <div
        className={cn(
          'relative w-full overflow-hidden',
          cardHeight || 'h-[280px] sm:h-[360px] md:h-[420px] lg:h-[500px]'
        )}
      >
        {/* Background Color or Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
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
      <div className="mt-4 space-y-2 sm:mt-6">
        {/* Organization and Year with Tags */}
        <p
          className="text-base font-semibold"
          style={{ color: 'rgb(var(--color-text-secondary))' }}
        >
          {organization} — {year}
          {_tags && _tags.length > 0 && (
            <>
              <span style={{ color: 'rgb(var(--color-text-tertiary))' }}>
                {' / '}
              </span>
              <span
                className={cn(
                  'font-medium uppercase',
                  variant === 'compact' ? 'text-xs' : 'text-sm'
                )}
                style={{ color: 'rgb(var(--color-text-tertiary))' }}
              >
                {(variant === 'compact' ? _tags.slice(0, 2) : _tags.slice(0, 3)).join(' • ')}
              </span>
            </>
          )}
        </p>

        {/* Project Title */}
        <h3
          className={cn(
            'max-w-[85%] font-bold leading-tight text-foreground',
            variant === 'compact'
              ? 'text-lg sm:text-xl lg:text-[1.75rem]' // 28px on large screens for 3-grid
              : 'text-xl sm:text-2xl lg:text-[1.75rem]' // 28px on large screens for 2-grid (home page)
          )}
        >
          {title}
        </h3>
      </div>
    </article>
  )
}
