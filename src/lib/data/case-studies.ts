import { CONTENT_REGISTRY } from '@/components/case-study/content'

export interface CaseStudy {
  slug: string
  title: string
  organization: string
  year: string
  description: string
  tags: string[]
  themeColor: string
  imageUrl?: string
  /** Accessible description for the hero image (alt + visible caption) */
  heroImageDescription?: string
  thumbnailUrl?: string // Optional separate card thumbnail (e.g. landscape crop when hero is portrait)
  featured?: boolean
  category:
    | 'service-design'
    | 'design-thinking'
    | 'ux-research'
    | 'usability-testing'
    | 'ui-design'
    | 'digital-analytics'
    | 'digital-accessibility'
  team?: string[]
  timeline?: string
  fullDescription?: string
  pageVariant?: 'case-study' | 'showcase' | 'figma-presentation'
  heroImageFill?: boolean // When true, card thumbnail fills full height (for portrait/non-16:9 heroes)
  heroTextLight?: boolean
  figmaEmbedUrl?: string
  videoUrl?: string
  hidden?: boolean // When true, excluded from all listings and static builds
  overviewBullets?: {
    heading: string
    items: string[]
  }
}

/**
 * RAW DATA
 * Private to this module to enforce access through the CaseStudyStore.
 */
const RAW_CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'pratt-institute-visitor-experience',
    title: 'Elevating the Visitor Experience at Pratt Institute',
    organization: 'Pratt Institute',
    year: '2025',
    description:
      "Redesigning Pratt's campus visit experience through ambassador support tools and a clearer physical-digital information system for prospective students and families.",
    tags: ['Service design', 'Design thinking', 'Selected Work'],
    themeColor: '#9370DB',
    imageUrl:
      '/images/case-studies/pratt-institute-visitor-experience/pratt-service-design-hero.webp',
    featured: true,
    category: 'service-design',
    team: ['Atharva Nayak', 'Gloria Yang', 'Sakshi Rane'],
    timeline: 'Sep - Dec 2025',
    fullDescription:
      "A service design project with Pratt Institute's Office of Admissions that improved the visitor journey by making tours more consistent for ambassadors and key information easier for visitors to access before, during, and after their campus visit.",
  },
  {
    slug: 'nyc-dcwp-business-licenses',
    title: 'Helping New Yorkers apply for business licenses with ease',
    organization: 'NYC DCWP',
    year: '2024',
    description:
      'A case study on improving how small business owners in New York City navigate and apply for business licenses through the Department of Consumer and Worker Protection portal.',
    tags: ['Selected Work', 'Client Project', 'UX Research'],
    themeColor: '#3183CB',
    imageUrl: '/images/case-studies/nyc-dcwp-business-licenses/hero.webp',
    featured: true,
    category: 'ux-research',
    team: ['Atharva Nayak', 'Meng Shi', 'Rutuja Nagulpelli', 'Sandra Ye'],
    timeline: 'Jan - May 2024',
  },
  {
    slug: 'ualberta-library-website',
    title: 'Improving Usability of Library Website',
    organization: 'University of Alberta',
    year: '2024',
    description:
      'A comprehensive study on improving the usability and information architecture of the University of Alberta Library website to enhance student research workflows.',
    tags: ['UX Research', 'UI Design', 'Prototyping', 'Selected Work'],
    themeColor: '#257948',
    featured: true,
    category: 'ux-research',
    team: ['Atharva Nayak', 'Arnav Sharma', 'Azka Qasim', 'Natalie Cheng'],
    timeline: 'Mar - Jun 2024',
    videoUrl: '/videos/case-studies/ualberta-reel.mp4',
    thumbnailUrl: '/images/case-studies/ualberta-library-website/thumbnail.jpg',
  },
  {
    slug: 'gutenberg-cms-usability-evaluation',
    title: 'Usability Evaluation of CMS Authoring Experience',
    organization: 'Gutenberg Technologies',
    year: '2025',
    description:
      'A usability study of Gutenberg Technologies\' course management system (CMS), identifying workflow challenges and proposing design improvements to make the CMS more intuitive and easier for new users to adopt.',
    tags: ['Eye Tracking', 'Usability Study', 'Selected Work'],
    themeColor: '#2A55DF',
    imageUrl:
      '/images/case-studies/gutenberg-cms-usability-evaluation/hero.webp',
    featured: true,
    category: 'usability-testing',
    team: ['Atharva Nayak', 'Gloria Yang', 'Grace Ho', 'Karla Santamaria'],
    timeline: 'September - December 2025',
  },
  {
    slug: 'met-free-tours-usability',
    title: "Usability study of The Met's free tours page",
    organization: 'Class Project',
    year: '2024',
    description:
      'A usability study examining the Metropolitan Museum of Art free tours page, identifying pain points and proposing design improvements for better visitor engagement.',
    tags: ['Usability Testing', 'Design', 'Selected Work'],
    themeColor: '#E3032A',
    featured: false,
    category: 'usability-testing',
    team: ['Atharva Nayak'],
    timeline: 'Feb - Apr 2024',
  },
  {
    slug: 'nyc-third-spaces-ethnography',
    title: 'An Ethnographic Study of NYC Third Spaces',
    organization: 'Woven by Toyota',
    year: '2025',
    description:
      'This case study documents a semester-long ethnographic research project conducted as a collaboration between Pratt Institute and Woven by Toyota. Our team studied how communities in New York City\'s third spaces naturally engage, collaborate, and innovate through everyday interactions.',
    tags: ['Ethnography', 'Client Project'],
    themeColor: '#FFB6C1',
    imageUrl: '/images/case-studies/nyc-third-spaces-ethnography/hero.jpg',
    featured: false,
    category: 'ux-research',
    team: ['Ananya Yadav', 'Atharva Nayak', 'Nisheta Gupta'],
    timeline: '3 Months',
    fullDescription:
      'This case study documents a semester-long ethnographic research project conducted as a collaboration between Pratt Institute and Woven by Toyota. Our team studied how communities in New York City\'s third spaces naturally engage, collaborate, and innovate through everyday interactions.',
  },
  {
    slug: 'seo-audit',
    title: 'Jif.com SEO Audit',
    organization: 'Personal Project',
    year: '2025',
    description:
      'An SEO audit evaluates how well a website is positioned to be found, crawled, and ranked by search engines. This POV focuses on the SEO Audit of jif.com — the #1 P&B brand in America.',
    tags: ['Digital Analytics', 'Selected Work'],
    hidden: true,
    themeColor: '#CE102C',
    featured: false,
    category: 'digital-analytics',
    team: ['Atharva Nayak'],
    timeline: '1 Week',
    pageVariant: 'figma-presentation',
    imageUrl: '/images/case-studies/seo-audit/hero-2.png',
    figmaEmbedUrl:
      'https://embed.figma.com/deck/TGsYVaQSar3IDgKfNiiTrU/SEO-audit-jif.com---AN?node-id=27-3673&embed-host=share',
    fullDescription:
      'Jif holds ~32% of the U.S. peanut butter market and is the #1 P&B brand in America. It has 14 products in 6 product lines. Target audiences include families, health-conscious individuals, bakers, and recipe seekers. Despite its dominant market position, organic traffic is declining year over year while several competitors are growing.',
    overviewBullets: {
      heading: 'Key traffic observations',
      items: [
        'Top product page (Creamy Peanut Butter) drives 14,433 organic visits — nearly 20% of total site traffic',
        'Health-oriented products like To-Go Natural (+96%) and Simply Jif (+61.8%) are growing',
        'All crunchy category products are declining',
        'Overall organic traffic is down 8.2% year over year, while competitors Peter Pan (+25%) and Skippy (+22%) are growing',
      ],
    },
  },
  {
    slug: 'imdb-ia-redesign',
    title: "Redesigning IMDB's user interface for improved movie discovery",
    organization: 'Class Project',
    year: '2024',
    description:
      "A UX redesign of IMDb's interface focused on improving content discovery through better filtering, cleaner navigation, and personalized recommendations — grounded in 8 in-depth user interviews.",
    tags: ['Information Architecture', 'Redesign'],
    hidden: true,
    themeColor: '#F5C518',
    imageUrl: '/images/case-studies/imdb-ia-redesign/hero.webp',
    featured: false,
    category: 'ui-design',
    team: ['Atharva Nayak', 'Charlene Guo', 'Nisheta Gupta', 'Ritika Ramesh'],
    timeline: '1 month',
    fullDescription:
      'We conducted 8 in-depth user interviews to understand how users discover and search for content within IMDb. Through this research, we identified key pain points in IMDb\'s current content discovery system and mapped user needs to improve filtering, recommendation, and browsing features.',
  },
  {
    slug: 'alo-yoga-digital-analytics',
    title: 'Alo Yoga Digital Strategy',
    organization: 'Class Project',
    year: '2026',
    description: 'A digital analytics study of Alo Yoga\'s SEO health, keyword coverage, and social strategy, benchmarked against the competition.',
    tags: ['Digital Analytics', 'SEO Strategy', 'Selected Work'],
    themeColor: '#5C8ED3',
    imageUrl: '/images/case-studies/alo-yoga-digital-analytics/hero-v3.webp',
    featured: true,
    category: 'digital-analytics',
    team: ['Atharva Nayak', 'Anvita Shah', 'Carol Bai', 'Lanting Ko', 'Myra Chen'],
    timeline: 'Spring 2026',
    heroTextLight: false,
  },
  {
    slug: 'snakes',
    title: 'Designing an Interactive Experience to learn about snakes',
    organization: 'Personal Project',
    year: '2026',
    description:
      'A study on the movement and behavior of snakes in digital environments.',
    tags: ['Explorations', 'Vibe Coded', 'Data Visualization'],
    themeColor: '#9370DB',
    imageUrl: '/images/case-studies/snakes/hero.webp',
    thumbnailUrl: '/images/case-studies/snakes/hero-card.webp',
    featured: true,
    category: 'ui-design',
    pageVariant: 'showcase',
    heroTextLight: false,
    timeline: 'Weekend Project',
    heroImageFill: true,
  },
  {
    slug: 'aquitania-design-system',
    title: 'Aquitania — A Design System for Cunard',
    organization: 'Cunard / Pratt Institute',
    year: '2026',
    description:
      'A design system that bridges the gap between Cunard\'s premium physical brand and its inconsistent digital experience — built for a luxury cruise line with 185 years of heritage.',
    tags: ['Design Systems', 'UI Design', 'Accessibility', 'Selected Work'],
    themeColor: '#9B2335',
    imageUrl: '/images/case-studies/aquitania-design-system/hero.webp',
    featured: true,
    category: 'ui-design',
    team: ['Atharva Nayak', 'Jasmin Rose Guerrera', 'Jane Hsieh', 'Zach Hojeibane'],
    timeline: 'Spring 2026',
    fullDescription:
      'This case study explores the creation of a design system for Cunard to modernize its digital experience and better reflect its premium brand identity.',
  },
  {
    slug: 'blv-museum-accessibility',
    title:
      'Who Decides What Art Means? Giving interpretive agency to blind and low-vision museum visitors.',
    organization: 'Pratt Institute',
    year: '2026',
    description:
      'A research-based case study on returning interpretive authority to blind and low-vision patrons through conversational UI.',
    tags: ['Digital Accessibility', 'UX Research', 'Conversational UI'],
    themeColor: '#FF8C00',
    imageUrl: '/images/case-studies/blv-museum-accessibility/hero.webp',
    heroImageDescription:
      'Black-and-white illustration of a young visitor wearing headphones, viewed from behind in a minimal art gallery, facing a large empty canvas on the wall. The scene represents blind and low-vision patrons approaching artwork without a fixed, curator-authored interpretation.',
    featured: true,
    category: 'digital-accessibility',
    team: ['Atharva Nayak', 'Arnav Sharma', 'Nisheta Gupta'],
    timeline: 'Spring 2026',
    fullDescription:
      'This project focuses on the "interpretive authority" in art galleries. While museums provide audio descriptions, these are often fixed, curator-authored accounts that collapse the variability of an artwork into a single narrative. We introduce "negotiable interpretation" as a design paradigm to redistribute that authority back to the visitor.',
  },
]

/**
 * CaseStudyStore
 * 
 * A deep module providing high-leverage access to case study data.
 * It encapsulates filtering, validation, and metadata generation logic.
 */
export const CaseStudyStore = {
  /**
   * Retrieves all case studies, including hidden ones.
   */
  getAll(): CaseStudy[] {
    return [...RAW_CASE_STUDIES]
  },

  /**
   * Retrieves all visible case studies.
   */
  getVisible(): CaseStudy[] {
    return RAW_CASE_STUDIES.filter((s) => !s.hidden)
  },

  /**
   * Retrieves featured and visible case studies.
   */
  getFeatured(): CaseStudy[] {
    return RAW_CASE_STUDIES.filter((s) => s.featured && !s.hidden)
  },

  /**
   * Retrieves a specific case study by slug.
   * Performs validation to ensure a corresponding content component exists.
   */
  getBySlug(slug: string): CaseStudy | undefined {
    const study = RAW_CASE_STUDIES.find((s) => s.slug === slug)
    
    if (study && !CONTENT_REGISTRY[slug]) {
      console.warn(`[CaseStudyStore] Case study found for slug "${slug}", but no content component is registered in CONTENT_REGISTRY.`)
    }
    
    return study
  },

  /**
   * Retrieves case studies by tag.
   */
  getByTag(tag: string): CaseStudy[] {
    const visible = this.getVisible()
    if (tag === 'All') return visible
    return visible.filter((s) => s.tags.includes(tag))
  },


  /**
   * Generates a unique list of all tags used by visible case studies.
   */
  getAllTags(): string[] {
    const tags = new Set<string>()
    this.getVisible().forEach((s) => {
      s.tags.forEach((t) => tags.add(t))
    })
    return ['All', ...Array.from(tags)]
  }
}

/**
 * LEGACY EXPORTS (FOR BACKWARD COMPATIBILITY)
 * These are marked for deprecation in favor of CaseStudyStore.
 */
export const caseStudies = CaseStudyStore.getAll()
export const getCaseStudyBySlug = (slug: string) => CaseStudyStore.getBySlug(slug)
export const getVisibleCaseStudies = () => CaseStudyStore.getVisible()
export const getFeaturedCaseStudies = () => CaseStudyStore.getFeatured()
export const getCaseStudiesByTag = (tag: string) => CaseStudyStore.getByTag(tag)
export const getAllTags = () => CaseStudyStore.getAllTags()
