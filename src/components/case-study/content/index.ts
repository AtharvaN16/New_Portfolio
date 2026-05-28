import dynamic from 'next/dynamic'

/**
 * Interface for the properties passed to every case study content component.
 */
export interface CaseStudyContentProps {
  isContentRevealed: boolean
  onToggleContent: () => void
}

/**
 * Registry of case study content components.
 * This decouples the CaseStudyContentRenderer from specific implementations.
 */
export const CONTENT_REGISTRY: Record<
  string,
  React.ComponentType<CaseStudyContentProps>
> = {
  'gutenberg-cms-usability-evaluation': dynamic(() =>
    import('./GutenbergContent').then((mod) => mod.GutenbergContent)
  ),
  'pratt-institute-visitor-experience': dynamic(() =>
    import('./PrattVisitorExperienceContent').then((mod) => mod.PrattVisitorExperienceContent)
  ),
  'nyc-dcwp-business-licenses': dynamic(() =>
    import('./NycDcwpBusinessLicensesContent').then((mod) => mod.NycDcwpBusinessLicensesContent)
  ),
  'nyc-third-spaces-ethnography': dynamic(() =>
    import('./NycThirdSpacesContent').then((mod) => mod.NycThirdSpacesContent)
  ),
  'alo-yoga-digital-analytics': dynamic(() =>
    import('./AloYogaContent').then((mod) => mod.AloYogaContent)
  ),
  'met-free-tours-usability': dynamic(() =>
    import('./MetFreeToursContent').then((mod) => mod.MetFreeToursContent)
  ),
  'ualberta-library-website': dynamic(() =>
    import('./UAlbertaLibraryContent').then((mod) => mod.UAlbertaLibraryContent)
  ),
  'blv-museum-accessibility': dynamic(() =>
    import('./EmpoweringBlvContent').then((mod) => mod.EmpoweringBlvContent)
  ),
  'aquitania-design-system': dynamic(() =>
    import('./AquitaniaContent').then((mod) => mod.AquitaniaContent)
  ),
  // Specialized showcases or simpler components can still be registered here
  'snakes': dynamic(() =>
    import('./SnakesShowcaseContent').then((mod) => mod.SnakesShowcaseContent)
  ),
  'imdb-ia-redesign': dynamic(() =>
    import('./ImdbIaRedesignContent').then((mod) => mod.ImdbIaRedesignContent)
  ),
}

export { AloYogaContent } from './AloYogaContent'
export { AquitaniaContent } from './AquitaniaContent'
export { GutenbergContent } from './GutenbergContent'
export { ImdbIaRedesignContent } from './ImdbIaRedesignContent'
export { MetFreeToursContent } from './MetFreeToursContent'
export { NycDcwpBusinessLicensesContent } from './NycDcwpBusinessLicensesContent'
export { NycThirdSpacesContent } from './NycThirdSpacesContent'
export { PrattVisitorExperienceContent } from './PrattVisitorExperienceContent'
export { SnakesShowcaseContent } from './SnakesShowcaseContent'
export { UAlbertaLibraryContent } from './UAlbertaLibraryContent'
export * from './EmpoweringBlvContent'
