'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
}

export function ProjectCard({
  title,
  organization,
  year,
  description,
  tags,
  imageBg,
  imageUrl,
  variant = 'default',
  className,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <article className={cn('group flex flex-col', className)}>
      {/* Card - Responsive height for different screen sizes */}
      <div
        className="relative h-[280px] w-full overflow-hidden sm:h-[360px] md:h-[420px] lg:h-[500px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background Color or Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundColor: imageBg,
            ...(imageUrl && { backgroundImage: `url(${imageUrl})` }),
          }}
        />

        {/* Frosted Glass Overlay - Appears on Hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className={cn(
                'absolute inset-0 z-10',
                'bg-black/40 backdrop-blur-md',
                // Grainy texture effect
                'before:absolute before:inset-0 before:bg-[url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==)] before:opacity-50'
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {/* Overlay Content */}
              <motion.div
                className="flex h-full flex-col justify-end p-4 sm:p-6 md:p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.25, delay: 0.1 }}
              >
                {/* Tags */}
                <div className="mb-3 flex flex-wrap gap-2 sm:mb-4">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className={cn(
                        'rounded-sm border border-white/60 px-2 py-0.5 sm:px-3 sm:py-1',
                        'text-xs font-medium text-white sm:text-sm',
                        'backdrop-blur-sm'
                      )}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p className="max-w-lg text-sm leading-relaxed text-white sm:text-base">
                  {description}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Title and Info - Outside the card, below it */}
      <div className="mt-4 space-y-2 sm:mt-6">
        {/* Organization and Year */}
        <p className="text-xs font-medium text-text-secondary sm:text-sm">
          {organization} — {year}
        </p>

        {/* Project Title */}
        <h3
          className={cn(
            'font-bold leading-tight text-foreground',
            variant === 'compact'
              ? 'text-lg sm:text-xl lg:text-[1.75rem]' // 28px on large screens for 3-grid
              : 'text-2xl sm:text-3xl lg:text-4xl' // Larger for 2-grid (home page)
          )}
        >
          {title}
        </h3>
      </div>
    </article>
  )
}
