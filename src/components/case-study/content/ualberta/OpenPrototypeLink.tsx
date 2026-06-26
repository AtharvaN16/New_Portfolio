import Link from 'next/link'
import { cn } from '@/lib/utils/cn'
import {
  getUAlbertaPrototypePath,
  type UAlbertaPrototypeSlug,
  UALBERTA_PROTOTYPE_LABELS,
} from '@/lib/data/ualberta-prototypes'

interface OpenPrototypeLinkProps {
  slug: UAlbertaPrototypeSlug
  className?: string
}

export function OpenPrototypeLink({ slug, className = '' }: OpenPrototypeLinkProps) {
  const label = UALBERTA_PROTOTYPE_LABELS[slug]

  return (
    <div className={cn('hidden justify-end lg:flex', className)}>
      <Link
        href={getUAlbertaPrototypePath(slug)}
        target="_blank"
        rel="noopener noreferrer"
        prefetch={false}
        className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors"
        style={{
          borderColor: 'rgb(var(--color-text-color20))',
          color: 'rgb(var(--color-text-primary))',
        }}
      >
        <span>Open {label}</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <path d="M15 3h6v6" />
          <path d="M10 14 21 3" />
        </svg>
      </Link>
    </div>
  )
}
