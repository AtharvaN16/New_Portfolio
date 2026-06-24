import { describe, expect, it } from 'vitest'
import {
  CASE_STUDY_LAYOUT_PRESETS,
  getCellSpanClasses,
  getPresetSpans,
  getSectionShellClass,
} from '@/lib/case-study-grid'

describe('case-study-grid', () => {
  describe('CASE_STUDY_LAYOUT_PRESETS', () => {
    it('preset column spans sum to 12 for two-column layouts', () => {
      expect(CASE_STUDY_LAYOUT_PRESETS.equal).toEqual([6, 6])
      expect(CASE_STUDY_LAYOUT_PRESETS['40-60']).toEqual([5, 7])
      expect(CASE_STUDY_LAYOUT_PRESETS['60-40']).toEqual([7, 5])
    })

    it('full preset is a single 12-column span', () => {
      expect(CASE_STUDY_LAYOUT_PRESETS.full).toEqual([12])
    })
  })

  describe('getPresetSpans', () => {
    it('returns preset tuple by key', () => {
      expect(getPresetSpans('equal')).toEqual([6, 6])
      expect(getPresetSpans('40-60')).toEqual([5, 7])
    })
  })

  describe('getCellSpanClasses', () => {
    it('stacks on mobile and spans at md by default', () => {
      expect(getCellSpanClasses(6)).toBe('col-span-12 md:col-span-6')
    })

    it('supports sm breakpoint for gallery layouts', () => {
      expect(getCellSpanClasses(6, { breakpoint: 'sm' })).toBe(
        'col-span-12 sm:col-span-6'
      )
    })

    it('adds responsive col-start when provided', () => {
      expect(getCellSpanClasses(6, { start: 1, breakpoint: 'sm' })).toBe(
        'col-span-12 sm:col-span-6 sm:col-start-1'
      )
    })

    it('throws for invalid span', () => {
      expect(() => getCellSpanClasses(0)).toThrow(RangeError)
      expect(() => getCellSpanClasses(13)).toThrow(RangeError)
    })
  })

  describe('getSectionShellClass', () => {
    it('returns cs-section utility classes', () => {
      expect(getSectionShellClass()).toContain('cs-section')
    })
  })
})
