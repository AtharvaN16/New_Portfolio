import { describe, it, expect } from 'vitest'
import { getCaseStudyBySlug, caseStudies } from '../../src/lib/data/case-studies'

describe('Case Studies Data', () => {
  it('should contain the new digital-accessibility case study', () => {
    const slug = 'blv-museum-accessibility'
    const study = getCaseStudyBySlug(slug)
    
    expect(study).toBeDefined()
    expect(study?.slug).toBe(slug)
    expect(study?.category).toBe('digital-accessibility')
  })

  it('should have the correct tags for the new case study', () => {
    const study = getCaseStudyBySlug('blv-museum-accessibility')
    expect(study?.tags).toContain('Digital Accessibility')
    expect(study?.tags).toContain('UX Research')
    expect(study?.tags).toContain('Conversational UI')
  })

  it('should have digital-accessibility in the list of categories used by case studies', () => {
    const categories = caseStudies.map(s => s.category)
    expect(categories).toContain('digital-accessibility')
  })
})
