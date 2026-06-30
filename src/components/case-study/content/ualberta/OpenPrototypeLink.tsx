'use client'

import Link from 'next/link'
import { AnimatedArrow } from '@/components/ui/AnimatedArrow'
import { useArrowAnimation } from '@/hooks/use-arrow-animation'
import { cn } from '@/lib/utils/cn'
import {
  getUAlbertaPrototypePath,
  type UAlbertaPrototypeSlug,
} from '@/lib/data/ualberta-prototypes'

interface OpenPrototypeLinkProps {
  slug: UAlbertaPrototypeSlug
  className?: string
}

export function OpenPrototypeLink({ slug, className = '' }: OpenPrototypeLinkProps) {
  const {
    isAnimating,
    animationCycle,
    showFirstArrow,
    handleMouseEnter,
    handleMouseLeave,
  } = useArrowAnimation()

  return (
    <div className={cn('hidden justify-end lg:flex', className)}>
      <Link
        href={getUAlbertaPrototypePath(slug)}
        target="_blank"
        rel="noopener noreferrer"
        prefetch={false}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
      >
        <span>Check interactive prototype</span>
        <AnimatedArrow
          isAnimating={isAnimating}
          showFirstArrow={showFirstArrow}
          animationCycle={animationCycle}
          className="h-[14px] w-[14px]"
        />
      </Link>
    </div>
  )
}
