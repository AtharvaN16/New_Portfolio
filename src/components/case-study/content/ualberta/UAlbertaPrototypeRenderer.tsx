'use client'

import dynamic from 'next/dynamic'
import type { ComponentType } from 'react'
import {
  isUAlbertaPrototypeSlug,
  type UAlbertaPrototypeSlug,
} from '@/lib/data/ualberta-prototypes'
import type { PrototypeVariant } from './PrototypePresentationShell'

function PrototypeChunkLoading() {
  return (
    <div
      className="flex min-h-dvh items-center justify-center px-6"
      style={{
        background: 'linear-gradient(295deg, #225432 11.56%, #36A459 88.84%)',
      }}
    >
      <p className="text-sm font-medium text-white/80" role="status">
        Loading prototype…
      </p>
    </div>
  )
}

const PROTOTYPE_MAP: Record<
  UAlbertaPrototypeSlug,
  ComponentType<{ variant?: PrototypeVariant }>
> = {
  'hours-locations': dynamic(
    () => import('@/components/case-study/content/LibraryHoursPagePrototype'),
    { ssr: false, loading: PrototypeChunkLoading },
  ),
  'subject-guides': dynamic(
    () => import('@/components/case-study/content/SubjectGuidesPrototype'),
    { ssr: false, loading: PrototypeChunkLoading },
  ),
  'full-services': dynamic(
    () => import('@/components/case-study/content/LibraryServicesPagePrototype'),
    { ssr: false, loading: PrototypeChunkLoading },
  ),
}

interface UAlbertaPrototypeRendererProps {
  slug: string
  variant?: PrototypeVariant
}

export function UAlbertaPrototypeRenderer({
  slug,
  variant = 'fullscreen',
}: UAlbertaPrototypeRendererProps) {
  if (!isUAlbertaPrototypeSlug(slug)) {
    return null
  }

  const Prototype = PROTOTYPE_MAP[slug]

  return (
    <Prototype variant={variant} />
  )
}
