'use client'

import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { m, AnimatePresence, type Variants } from 'framer-motion'
import { ProjectCard, type ProjectCardProps } from './ProjectCard'
import { MasonryWorkGrid } from './MasonryWorkGrid'
import { cn } from '@/lib/utils/cn'
import { LineSeparator } from '@/components/ui/LineSeparator'
import { useAccessibility } from '@/components/providers/AccessibilityProvider'

interface WorkFilterProps {
  projects: ProjectCardProps[]
  selectedFilter?: string
  onFilterChange?: (filter: string) => void
  className?: string
  hasChangedFilter?: boolean
}

// Stagger constants — shared between containerVariants and the More button delay calculation
// so both stay in sync when values change.
const FILTER_STAGGER = 0.04
const FILTER_DELAY_CHILDREN = 0.9
// How many filters are always visible without expanding
const PRIMARY_FILTER_COUNT = 8

// Static — always-visible variant for items in the expanded overlay (no parent orchestrator)
const ALWAYS_VISIBLE: Variants = { hidden: { opacity: 1 }, visible: { opacity: 1 } }

// Slash separator — uses a pre-baked gray token (no element opacity) so it looks
// identical whether rendered in the main row or the absolutely-positioned overlay.
function Slash({ animated, itemVariants }: { animated: boolean; itemVariants?: Variants }) {
  const cls = 'text-[16px] lg:text-[28px] 2xl:text-[32px] font-bold select-none'
  const style = { color: 'rgb(var(--color-text-color30))' }
  if (animated && itemVariants) {
    return (
      <m.span variants={itemVariants} className={cls} style={style} aria-hidden="true">/</m.span>
    )
  }
  return <span className={cls} style={style} aria-hidden="true">/</span>
}

// Map filter tags to display titles (Keys must match EXACT tags in case-studies.ts)
const filterTitleMap: Record<string, string> = {
  All: 'All Work',
  'Selected Work': 'Selected Work',
  'Usability Testing': 'Usability Testing',
  'Client Project': 'Client Projects',
  Explorations: 'Explorations',
  'Eye Tracking': 'Eye Tracking',
  'Service design': 'Service Design',
  'Digital Analytics': 'Digital Analytics',
  Ethnography: 'Ethnography',
  'Information Architecture': 'Information Architecture',
  'Digital Accessibility': 'Digital Accessibility',
}

/**
 * FilterTitleItem - Individual filter rendered as an animated title
 */
function FilterTitleItem({
  text,
  isSelected,
  onClick,
  count,
  wordVariants,
  onMouseEnter,
  onMouseLeave,
  isHovered,
}: {
  text: string
  isSelected: boolean
  onClick: () => void
  count: number
  wordVariants: Variants
  onMouseEnter: () => void
  onMouseLeave: () => void
  isHovered: boolean
}) {
  return (
    <button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="group relative flex items-start gap-1 text-left outline-none"
    >
      <span
        className="text-[16px] lg:text-[28px] 2xl:text-[32px] font-bold leading-[1.1] tracking-tight flex flex-wrap"
        style={{
          color: isSelected
            ? 'rgb(var(--color-foreground))'
            : isHovered
              ? 'rgb(var(--color-text-color70))'
              : 'rgb(var(--color-text-color40))'
        }}
      >
        {text.split(' ').map((word, i) => (
          <m.span
            key={`${text}-${word}-${i}`}
            variants={wordVariants}
            className="inline-block mr-[0.25em]"
          >
            {word}
          </m.span>
        ))}
        {/* Count Badge - also animates with words */}
        <m.span
          variants={wordVariants}
          className="text-[10px] lg:text-[14px] 2xl:text-[16px] font-medium opacity-50 mt-1"
          style={{ color: 'inherit' }}
        >
          {count}
        </m.span>
      </span>
    </button>
  )
}

export function WorkFilter({
  projects,
  selectedFilter: controlledFilter,
  onFilterChange,
  className,
  hasChangedFilter = false,
}: WorkFilterProps) {
  const { reducedMotion: prefersReducedMotion, pauseWebGL } = useAccessibility()
  const shouldPause = prefersReducedMotion || pauseWebGL
  const [internalFilter, setInternalFilter] = useState<string>('All')
  const [hoveredFilter, setHoveredFilter] = useState<string | null>(null)
  const [showAllFilters, setShowAllFilters] = useState(false)

  const selectedFilter = controlledFilter ?? internalFilter
  const setSelectedFilter = onFilterChange ?? setInternalFilter

  const filterOptions = useMemo(() => {
    const tagCounts = new Map<string, number>()
    projects.forEach((project) => {
      project.tags?.forEach((tag) => {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1)
      })
    })
    return [
      { tag: 'All', count: projects.length },
      { tag: 'Selected Work', count: tagCounts.get('Selected Work') || 0 },
      { tag: 'Usability Testing', count: tagCounts.get('Usability Testing') || 0 },
      { tag: 'Client Project', count: tagCounts.get('Client Project') || 0 },
      { tag: 'Explorations', count: tagCounts.get('Explorations') || 0 },
      { tag: 'Eye Tracking', count: tagCounts.get('Eye Tracking') || 0 },
      { tag: 'Service design', count: tagCounts.get('Service design') || 0 },
      { tag: 'Digital Analytics', count: tagCounts.get('Digital Analytics') || 0 },
      { tag: 'Ethnography', count: tagCounts.get('Ethnography') || 0 },
      { tag: 'Information Architecture', count: tagCounts.get('Information Architecture') || 0 },
      { tag: 'Digital Accessibility', count: tagCounts.get('Digital Accessibility') || 0 },
    ]
  }, [projects])

  // Memoize variants — they depend on shouldPause / hasChangedFilter
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldPause ? 0 : FILTER_STAGGER,
        delayChildren: shouldPause ? 0 : (hasChangedFilter ? 0 : FILTER_DELAY_CHILDREN),
      },
    },
  }), [shouldPause, hasChangedFilter])

  // Dynamically compute when the last primary filter word finishes so the More button
  // appears exactly then, regardless of how many filters or words are added later.
  // Each FilterTitleItem contributes: wordCount + 1 (count badge) motion elements,
  // plus 1 Slash per filter = wordCount + 2 total.
  const moreButtonDelay = useMemo(() => {
    if (shouldPause) return 0
    const effectiveDelay = hasChangedFilter ? 0 : FILTER_DELAY_CHILDREN
    const totalMotionItems = filterOptions.slice(0, PRIMARY_FILTER_COUNT).reduce((acc, opt) => {
      const words = (filterTitleMap[opt.tag] || opt.tag).split(' ').length
      return acc + words + 2 // words + count badge + slash
    }, 0)
    return effectiveDelay + (totalMotionItems - 1) * FILTER_STAGGER
  }, [filterOptions, shouldPause, hasChangedFilter])

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: shouldPause ? 0 : 0.5 },
    },
  }), [shouldPause])

  // Track first interaction — before it, parent stagger drives More opacity;
  // after, we control it explicitly so it reliably returns to opacity 1 on collapse.
  const [hasInteracted, setHasInteracted] = useState(false)

  // Stable hover callbacks
  const handleHoverEnter = useCallback((tag: string) => () => setHoveredFilter(tag), [])
  const handleHoverLeave = useCallback(() => setHoveredFilter(null), [])
  const toggleExpanded = useCallback(() => {
    setHasInteracted(true)
    setShowAllFilters((prev) => !prev)
  }, [])

  const toggleColor = hoveredFilter === '__toggle__'
    ? 'rgb(var(--color-text-color70))'
    : 'rgb(var(--color-text-color40))'

  return (
    <div className={cn('w-full', className)}>
      <m.div
        className="flex flex-col"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Single unified container — expands in normal document flow */}
        <div
          className="max-w-[95%] lg:max-w-[60%] px-5 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-6"
          style={{ backgroundColor: 'rgb(var(--color-background))' }}
        >
          {/* All filters in one continuous flex-wrap row */}
          <div className="flex flex-wrap items-center gap-x-2 lg:gap-x-4 gap-y-2">
            {/* First 8 — always visible, participate in page-load stagger */}
            {filterOptions.slice(0, 8).map((opt) => (
              <React.Fragment key={opt.tag}>
                <FilterTitleItem
                  text={filterTitleMap[opt.tag] || opt.tag}
                  count={opt.count}
                  isSelected={selectedFilter === opt.tag}
                  isHovered={hoveredFilter === opt.tag}
                  onMouseEnter={handleHoverEnter(opt.tag)}
                  onMouseLeave={handleHoverLeave}
                  onClick={() => opt.count > 0 && setSelectedFilter(opt.tag)}
                  wordVariants={itemVariants}
                />
                <Slash animated itemVariants={itemVariants} />
              </React.Fragment>
            ))}

            {/* Extra filters — fade in inline, collapse instantly to avoid layout jank */}
            <AnimatePresence initial={false}>
              {showAllFilters && filterOptions.slice(8).map((opt, i) => (
                <m.div
                  key={opt.tag}
                  className="flex items-center gap-x-2 lg:gap-x-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.2, delay: i * 0.07 } }}
                  exit={{ opacity: 0, transition: { duration: 0 } }}
                >
                  <FilterTitleItem
                    text={filterTitleMap[opt.tag] || opt.tag}
                    count={opt.count}
                    isSelected={selectedFilter === opt.tag}
                    isHovered={hoveredFilter === opt.tag}
                    onMouseEnter={handleHoverEnter(opt.tag)}
                    onMouseLeave={handleHoverLeave}
                    onClick={() => opt.count > 0 && setSelectedFilter(opt.tag)}
                    wordVariants={ALWAYS_VISIBLE}
                  />
                  <Slash animated={false} />
                </m.div>
              ))}
            </AnimatePresence>

            {/* More — independent fixed-delay animation so it isn't pushed to the end of the
                word-level stagger chain (which would delay it ~2s on initial load). */}
            {!showAllFilters && (
              <m.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: shouldPause ? 0 : (hasInteracted ? 0.2 : 0.4),
                  delay: hasInteracted ? 0 : moreButtonDelay,
                }}
                onClick={toggleExpanded}
                onMouseEnter={handleHoverEnter('__toggle__')}
                onMouseLeave={handleHoverLeave}
                className="flex items-center gap-2 lg:gap-2.5 outline-none"
                aria-label="Show more filters"
              >
                <span
                  className="text-[16px] lg:text-[28px] 2xl:text-[32px] font-bold leading-[1.1] tracking-tight"
                  style={{ color: toggleColor }}
                >
                  More
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  className="w-[13px] h-[13px] lg:w-[20px] lg:h-[20px] 2xl:w-[23px] 2xl:h-[23px] shrink-0"
                  style={{ color: toggleColor }} aria-hidden="true">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </m.button>
            )}

            {/* Less — appears at end of expanded row */}
            <AnimatePresence initial={false}>
              {showAllFilters && (
                <m.button
                  key="less-btn"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.2, delay: 0.22 } }}
                  exit={{ opacity: 0, transition: { duration: 0 } }}
                  onClick={toggleExpanded}
                  onMouseEnter={handleHoverEnter('__toggle__')}
                  onMouseLeave={handleHoverLeave}
                  className="flex items-center gap-2 lg:gap-2.5 outline-none"
                  aria-label="Show fewer filters"
                >
                  <span
                    className="text-[16px] lg:text-[28px] 2xl:text-[32px] font-bold leading-[1.1] tracking-tight"
                    style={{ color: toggleColor }}
                  >
                    Less
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    className="w-[13px] h-[13px] lg:w-[20px] lg:h-[20px] 2xl:w-[23px] 2xl:h-[23px] shrink-0 rotate-180"
                    style={{ color: toggleColor }} aria-hidden="true">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </m.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </m.div>
    </div>
  )
}
