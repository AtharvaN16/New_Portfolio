'use client'

import React, { useMemo, useState, useEffect } from 'react'
import { useBreakpoints } from '@/hooks/use-responsive'

interface MasonryGridProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  gap?: number
  mobileGap?: number
  className?: string
}

/**
 * MasonryGrid - A simple responsive masonry layout component
 * Splits items into columns for true vertical stacking without gaps.
 */
export function MasonryGrid<T>({
  items,
  renderItem,
  gap = 24,
  mobileGap,
  className,
}: MasonryGridProps<T>) {
  const { isDesktop, isTablet, isMobile } = useBreakpoints()
  const [mounted, setMounted] = useState(false)

  // Ensure hydration matches client render
  useEffect(() => {
    setMounted(true)
  }, [])

  const columns = useMemo(() => {
    // Default to 1 column for SSR/initial mount to prevent hydration mismatch
    if (!mounted) return [items]

    const columnCount = isDesktop ? 3 : isTablet ? 2 : 1
    const cols: T[][] = Array.from({ length: columnCount }, () => [])

    // Distribute items into columns (interleaved)
    items.forEach((item, index) => {
      cols[index % columnCount].push(item)
    })

    return cols
  }, [items, isDesktop, isTablet, mounted])

  const effectiveGap = mounted && isMobile && mobileGap !== undefined ? mobileGap : gap

  if (!mounted) {
    // Return a simple stack for SSR to avoid layout shift later
    return (
      <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: `${mobileGap ?? gap}px` }}>
        {items.map((item, index) => renderItem(item, index))}
      </div>
    )
  }

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: `${effectiveGap}px`,
        alignItems: 'flex-start',
      }}
    >
      {columns.map((col, colIndex) => (
        <div
          key={colIndex}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: `${effectiveGap}px`,
            flex: 1,
          }}
        >
          {col.map((item, itemIndex) => {
            // Reconstruct the original index for proper animation delays
            const originalIndex = itemIndex * columns.length + colIndex
            return (
              <div key={originalIndex}>
                {renderItem(item, originalIndex)}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
