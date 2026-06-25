export const UALBERTA_CASE_STUDY_SLUG = 'ualberta-library-website'

export const UALBERTA_PROTOTYPE_SLUGS = [
  'hours-locations',
  'subject-guides',
  'full-services',
] as const

export type UAlbertaPrototypeSlug = (typeof UALBERTA_PROTOTYPE_SLUGS)[number]

export function isUAlbertaPrototypeSlug(
  value: string
): value is UAlbertaPrototypeSlug {
  return UALBERTA_PROTOTYPE_SLUGS.includes(value as UAlbertaPrototypeSlug)
}

export function getUAlbertaPrototypePath(slug: UAlbertaPrototypeSlug): string {
  return `/case-studies/${UALBERTA_CASE_STUDY_SLUG}/prototype/${slug}`
}

export const UALBERTA_PROTOTYPE_LABELS: Record<UAlbertaPrototypeSlug, string> = {
  'hours-locations': 'Hours & Locations prototype',
  'subject-guides': 'Subject Guides prototype',
  'full-services': 'Full Services prototype',
}
