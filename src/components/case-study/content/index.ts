import dynamic from 'next/dynamic'

/**
 * Registry of case study content components.
 * This decouples the CaseStudyContentRenderer from specific implementations.
 */
export const CONTENT_REGISTRY: Record<string, React.ComponentType> = {
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
}
