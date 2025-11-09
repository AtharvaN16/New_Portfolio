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
  className?: string
}

export function ProjectCard({
  title,
  organization,
  year,
  description,
  tags,
  imageBg,
  className,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <article className={cn('group flex flex-col', className)}>
      {/* Card - Just the colored rectangle with hover overlay */}
      <div
        className="relative h-[500px] w-full overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background Color */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundColor: imageBg }}
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
                className="flex h-full flex-col justify-end p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.25, delay: 0.1 }}
              >
                {/* Tags */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className={cn(
                        'rounded-sm border border-white/60 px-3 py-1',
                        'text-sm font-medium text-white',
                        'backdrop-blur-sm'
                      )}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p className="max-w-lg text-base leading-relaxed text-white">
                  {description}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Title and Info - Outside the card, below it */}
      <div className="mt-6 space-y-2">
        {/* Organization and Year */}
        <p className="text-sm font-medium text-text-secondary">
          {organization} — {year}
        </p>

        {/* Project Title */}
        <h3 className="text-3xl font-bold leading-tight text-foreground lg:text-4xl">
          {title}
        </h3>
      </div>
    </article>
  )
}
