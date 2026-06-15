/**
 * Editorial project card layout tokens.
 * Single aspect ratio + four width presets for scattered gallery layouts.
 */

export const CARD_THUMBNAIL_ASPECT_RATIO = '16 / 9' as const

export type CardSize = 'sm' | 'md' | 'lg' | 'fw'
export type CardAlign = 'left' | 'right'

/**
 * Desktop widths — sm/md bumped one tier; lg/fw enlarged further.
 * sm = former md, md = former lg.
 */
export const CARD_SIZE_WIDTH: Record<CardSize, string> = {
  sm: '38%',
  md: '46%',
  lg: '54%',
  fw: '68%',
}

const CARD_SIZE_WIDTH_NUM: Record<CardSize, number> = {
  sm: 38,
  md: 46,
  lg: 54,
  fw: 68,
}

/** Minimum inset from viewport edge when hugging left/right (%). */
export const EDGE_INSET_PCT = 1

/** Max extra inset variation from edge (%). */
export const EDGE_INSET_VARIANCE_PCT = 5

/** Minimum vertical gap between editorial rows. */
export const MIN_ROW_GAP_REM = 5

/** Additional variable spacing stacked on MIN_ROW_GAP_REM. */
export const MAX_ROW_GAP_EXTRA_REM = 4

/** Minimum horizontal gap between two cards in the same row. */
export const MIN_PAIR_GAP_REM = 4

const CARD_SIZES: CardSize[] = ['sm', 'md', 'lg', 'fw']
const SIZE_RANK: Record<CardSize, number> = { sm: 0, md: 1, lg: 2, fw: 3 }

function hashSlug(slug: string): number {
  return slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
}

/** Stable pseudo-random size from slug. */
export function getCardLayoutPreset(slug: string): {
  size: CardSize
  align: CardAlign
} {
  const hash = hashSlug(slug)
  return {
    size: CARD_SIZES[hash % CARD_SIZES.length]!,
    align: hash % 2 === 0 ? 'left' : 'right',
  }
}

interface ProjectCardLayoutItem {
  cardSize?: CardSize
  slug?: string
  title: string
  organization: string
}

export type EditorialRow<T extends ProjectCardLayoutItem = ProjectCardLayoutItem> =
  | { kind: 'single'; project: T; index: number; rowIndex: number }
  | {
      kind: 'pair'
      left: T
      right: T
      leftIndex: number
      rightIndex: number
      rowIndex: number
      staggerSide: 'left' | 'right'
    }

/** sm/md cards can share a row; lg/fw always render solo. */
export function canPairCardSizes(a?: CardSize, b?: CardSize): boolean {
  if (!a || !b) return false
  return SIZE_RANK[a] <= 1 && SIZE_RANK[b] <= 1
}

/** Variable top spacing per row — min gap plus slug-seeded offset. */
export function getRowTopSpacing(rowIndex: number, seedSlug: string): string {
  if (rowIndex === 0) return '0'
  const hash = hashSlug(`${seedSlug}:${rowIndex}`)
  const extra = (hash % (MAX_ROW_GAP_EXTRA_REM * 4 + 1)) / 4
  return `${MIN_ROW_GAP_REM + extra}rem`
}

/** Alternate which side sits lower in a two-card row. */
export function getPairStaggerOffset(pairIndex: number): string {
  const offsets = ['3rem', '4.5rem', '5rem', '4rem']
  return offsets[pairIndex % offsets.length]!
}

/**
 * Solo card hugs left or right edge, with a small variable inset.
 * Even rows → left edge; odd rows → right edge.
 */
export function getSingleCardHorizontalStyle(
  slug: string,
  _size: CardSize,
  rowIndex: number
): { marginLeft?: string; marginRight?: string } {
  const hash = hashSlug(`${slug}:x:${rowIndex}`)
  const leanRight = rowIndex % 2 === 1
  const inset = EDGE_INSET_PCT + (hash % (EDGE_INSET_VARIANCE_PCT + 1))

  if (leanRight) {
    return { marginLeft: 'auto', marginRight: `${inset}%` }
  }
  return { marginLeft: `${inset}%`, marginRight: 'auto' }
}

/** Edge insets for cards in a two-card row — hug outer edges, gap enforced by flex. */
export function getPairCardEdgeStyle(
  slug: string,
  side: 'left' | 'right'
): { marginLeft?: string; marginRight?: string } {
  const hash = hashSlug(`${slug}:pair-edge:${side}`)
  const inset = EDGE_INSET_PCT + (hash % (EDGE_INSET_VARIANCE_PCT + 1))

  if (side === 'left') {
    return { marginLeft: `${inset}%` }
  }
  return { marginLeft: 'auto', marginRight: `${inset}%` }
}

/**
 * Group projects into editorial rows.
 * Consecutive sm/md cards share one row; larger cards scatter solo.
 */
export function groupEditorialRows<T extends ProjectCardLayoutItem>(
  projects: T[]
): Array<
  | { kind: 'single'; project: T; index: number; rowIndex: number }
  | {
      kind: 'pair'
      left: T
      right: T
      leftIndex: number
      rightIndex: number
      rowIndex: number
      staggerSide: 'left' | 'right'
    }
> {
  const rows: ReturnType<typeof groupEditorialRows<T>> = []
  let i = 0
  let rowIndex = 0
  let pairCount = 0

  while (i < projects.length) {
    const curr = projects[i]!
    const next = projects[i + 1]

    if (next && canPairCardSizes(curr.cardSize, next.cardSize)) {
      const left =
        SIZE_RANK[curr.cardSize ?? 'md'] <= SIZE_RANK[next.cardSize ?? 'md']
          ? curr
          : next
      const right = left === curr ? next : curr
      const leftIndex = left === curr ? i : i + 1
      const rightIndex = left === curr ? i + 1 : i

      rows.push({
        kind: 'pair',
        left,
        right,
        leftIndex,
        rightIndex,
        rowIndex,
        staggerSide: pairCount % 2 === 0 ? 'right' : 'left',
      })
      pairCount += 1
      rowIndex += 1
      i += 2
      continue
    }

    rows.push({ kind: 'single', project: curr, index: i, rowIndex })
    rowIndex += 1
    i += 1
  }

  return rows
}

/** Text scale by editorial card size — lg/fw match Selected Work; md/sm step down (min 14px). */
export function getEditorialTextClasses(cardSize?: CardSize): {
  org: string
  title: string
  tags: string
} {
  switch (cardSize) {
    case 'sm':
      return {
        org: 'text-[14px] md:text-[14px]',
        title: 'text-[14px] sm:text-[18px] lg:text-[24px]',
        tags: 'text-[14px] md:text-[14px]',
      }
    case 'md':
      return {
        org: 'text-[14px] md:text-[16px]',
        title: 'text-[16px] sm:text-[20px] lg:text-[26px]',
        tags: 'text-[14px] md:text-[16px]',
      }
    case 'lg':
    case 'fw':
    default:
      return {
        org: 'text-[14px] md:text-[18px]',
        title: 'text-[18px] sm:text-2xl lg:text-[1.75rem]',
        tags: 'text-[12px] md:text-[18px]',
      }
  }
}
