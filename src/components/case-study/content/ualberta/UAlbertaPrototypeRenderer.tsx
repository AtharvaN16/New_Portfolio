'use client'

import { MaterialSymbolsFont } from '@/components/case-study/MaterialSymbolsFont'
import LibraryHoursPagePrototype from '@/components/case-study/content/LibraryHoursPagePrototype'
import LibraryServicesPagePrototype from '@/components/case-study/content/LibraryServicesPagePrototype'
import SubjectGuidesPrototype from '@/components/case-study/content/SubjectGuidesPrototype'
import {
  isUAlbertaPrototypeSlug,
  type UAlbertaPrototypeSlug,
} from '@/lib/data/ualberta-prototypes'
import type { PrototypeVariant } from './PrototypePresentationShell'

const PROTOTYPE_MAP = {
  'hours-locations': LibraryHoursPagePrototype,
  'subject-guides': SubjectGuidesPrototype,
  'full-services': LibraryServicesPagePrototype,
} satisfies Record<UAlbertaPrototypeSlug, React.ComponentType<{ variant?: PrototypeVariant }>>

interface UAlbertaPrototypeRendererProps {
  slug: string
  variant?: PrototypeVariant
}

export function UAlbertaPrototypeRenderer({
  slug,
  variant = 'fullscreen',
}: UAlbertaPrototypeRendererProps) {
  const Prototype = isUAlbertaPrototypeSlug(slug)
    ? PROTOTYPE_MAP[slug]
    : null

  if (!Prototype) {
    return null
  }

  return (
    <>
      <MaterialSymbolsFont />
      <Prototype variant={variant} />
    </>
  )
}
