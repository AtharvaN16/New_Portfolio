import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { UAlbertaPrototypeRenderer } from '@/components/case-study/content/ualberta/UAlbertaPrototypeRenderer'
import {
  isUAlbertaPrototypeSlug,
  UALBERTA_PROTOTYPE_LABELS,
  UALBERTA_PROTOTYPE_SLUGS,
} from '@/lib/data/ualberta-prototypes'

interface PrototypePageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return UALBERTA_PROTOTYPE_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: PrototypePageProps): Promise<Metadata> {
  const { slug } = await params

  if (!isUAlbertaPrototypeSlug(slug)) {
    return { title: 'Prototype not found' }
  }

  return {
    title: UALBERTA_PROTOTYPE_LABELS[slug],
    robots: { index: false, follow: false },
  }
}

export default async function UAlbertaPrototypePage({ params }: PrototypePageProps) {
  const { slug } = await params

  if (!isUAlbertaPrototypeSlug(slug)) {
    notFound()
  }

  return <UAlbertaPrototypeRenderer slug={slug} variant="fullscreen" />
}
