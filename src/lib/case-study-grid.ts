/**
 * Case study modular grid — layout math and class helpers.
 *
 * Recipes (12-column grid inside --cs-content-max or full section width):
 *   equal   → [6, 6]   50/50 split
 *   40-60   → [5, 7]   narrow + wide (Pratt-style)
 *   60-40   → [7, 5]   wide + narrow
 *   full    → [12]     single column
 */

export type CaseStudyLayoutPreset = 'equal' | '40-60' | '60-40' | 'full'
export type CaseStudyGridBreakpoint = 'sm' | 'md' | 'lg'

export const CASE_STUDY_LAYOUT_PRESETS: Record<
  CaseStudyLayoutPreset,
  readonly [number, number?]
> = {
  equal: [6, 6],
  '40-60': [5, 7],
  '60-40': [7, 5],
  full: [12],
} as const

const COL_SPAN = {
  1: 'col-span-1',
  2: 'col-span-2',
  3: 'col-span-3',
  4: 'col-span-4',
  5: 'col-span-5',
  6: 'col-span-6',
  7: 'col-span-7',
  8: 'col-span-8',
  9: 'col-span-9',
  10: 'col-span-10',
  11: 'col-span-11',
  12: 'col-span-12',
} as const

const COL_START = {
  1: 'col-start-1',
  2: 'col-start-2',
  3: 'col-start-3',
  4: 'col-start-4',
  5: 'col-start-5',
  6: 'col-start-6',
  7: 'col-start-7',
  8: 'col-start-8',
  9: 'col-start-9',
  10: 'col-start-10',
  11: 'col-start-11',
  12: 'col-start-12',
  13: 'col-start-13',
} as const

const RESPONSIVE_PREFIX: Record<CaseStudyGridBreakpoint, string> = {
  sm: 'sm:',
  md: 'md:',
  lg: 'lg:',
}

function responsiveClass(
  base: string,
  breakpoint: CaseStudyGridBreakpoint
): string {
  return `${RESPONSIVE_PREFIX[breakpoint]}${base}`
}

export function getSectionShellClass(): string {
  return 'cs-section w-full text-left'
}

export function getCellSpanClasses(
  span: number,
  options?: {
    start?: number
    breakpoint?: CaseStudyGridBreakpoint
  }
): string {
  const breakpoint = options?.breakpoint ?? 'md'
  const spanClass = COL_SPAN[span as keyof typeof COL_SPAN]
  if (!spanClass) {
    throw new RangeError(`Case study grid span must be 1–12, received ${span}`)
  }

  const classes = [COL_SPAN[12], responsiveClass(spanClass, breakpoint)]

  if (options?.start !== undefined) {
    const startClass = COL_START[options.start as keyof typeof COL_START]
    if (!startClass) {
      throw new RangeError(
        `Case study grid start must be 1–13, received ${options.start}`
      )
    }
    classes.push(responsiveClass(startClass, breakpoint))
  }

  return classes.join(' ')
}

export function getPresetSpans(
  preset: CaseStudyLayoutPreset
): readonly [number, number?] {
  return CASE_STUDY_LAYOUT_PRESETS[preset]
}
