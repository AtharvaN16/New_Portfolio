export interface CaseStudy {
  slug: string
  title: string
  organization: string
  year: string
  description: string
  tags: string[]
  imageBg: string
  imageUrl?: string
  thumbnailUrl?: string // Optional separate card thumbnail (e.g. landscape crop when hero is portrait)
  featured?: boolean
  category:
    | 'service-design'
    | 'design-thinking'
    | 'ux-research'
    | 'usability-testing'
    | 'ui-design'
    | 'digital-analytics'
  team?: string[]
  timeline?: string
  fullDescription?: string
  progressBarColor?: string
  pageVariant?: 'case-study' | 'showcase' | 'figma-presentation'
  heroImageFill?: boolean // When true, card thumbnail fills full height (for portrait/non-16:9 heroes)
  heroTextLight?: boolean
  figmaEmbedUrl?: string
  overviewBullets?: {
    heading: string
    items: string[]
  }
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'pratt-institute-visitor-experience',
    title: 'Elevating the Visitor Experience at Pratt Institute',
    organization: 'Pratt Institute',
    year: '2025',
    description:
      "Redesigning Pratt's campus visit experience through ambassador support tools and a clearer physical-digital information system for prospective students and families.",
    tags: ['Service design', 'Design thinking', 'Selected Work'],
    imageBg: 'rgb(var(--color-case-study-purple))',
    imageUrl:
      '/images/case-studies/pratt-institute-visitor-experience/pratt-service-design-hero.png',
    featured: true,
    category: 'service-design',
    team: ['Atharva Nayak', 'Gloria Yang', 'Sakshi Rane'],
    timeline: 'Sep - Dec 2025',
    fullDescription:
      "A service design project with Pratt Institute's Office of Admissions that improved the visitor journey by making tours more consistent for ambassadors and key information easier for visitors to access before, during, and after their campus visit.",
    progressBarColor: 'rgb(var(--color-case-study-gold))',
  },
  {
    slug: 'nyc-dcwp-business-licenses',
    title: 'Helping New Yorkers apply for business licenses with ease',
    organization: 'NYC DCWP',
    year: '2024',
    description:
      'A case study on improving how small business owners in New York City navigate and apply for business licenses through the Department of Consumer and Worker Protection portal.',
    tags: ['Selected Work', 'Client Project', 'UX Research'],
    imageBg: 'rgb(var(--color-footer-bg))',
    imageUrl: '/images/case-studies/nyc-dcwp-business-licenses/hero.png',
    featured: true,
    category: 'ux-research',
    team: ['Atharva Nayak', 'Meng Shi', 'Rutuja Nagulpelli', 'Sandra Ye'],
    timeline: 'Jan - May 2024',
    progressBarColor: '#3183CB',
  },
  {
    slug: 'ualberta-library-website',
    title: 'Improving Usability of Library Website',
    organization: 'University of Alberta',
    year: '2024',
    description:
      'A comprehensive study on improving the usability and information architecture of the University of Alberta Library website to enhance student research workflows.',
    tags: ['UX Research', 'UI Design', 'Prototyping', 'Selected Work'],
    imageBg: 'rgb(var(--color-case-study-green))',
    featured: true,
    category: 'ux-research',
    team: ['Atharva Nayak', 'Arnav Sharma', 'Azka Qasim', 'Natalie Cheng'],
    timeline: 'Mar - Jun 2024',
    progressBarColor: 'rgb(var(--color-uofa-green))',
  },
  {
    slug: 'gutenberg-cms-usability-evaluation',
    title: 'Usability Evaluation of CMS Authoring Experience',
    organization: 'Gutenberg Technologies',
    year: '2025',
    description:
      'A usability study of Gutenberg Technologies\' course management system (CMS), identifying workflow challenges and proposing design improvements to make the CMS more intuitive and easier for new users to adopt.',
    tags: ['Eye Tracking', 'Usability Study', 'Selected Work'],
    imageBg: 'rgb(var(--color-case-study-red))',
    imageUrl:
      '/images/case-studies/gutenberg-cms-usability-evaluation/hero.png',
    featured: true,
    category: 'usability-testing',
    team: ['Atharva Nayak', 'Gloria Yang', 'Grace Ho', 'Karla Santamaria'],
    timeline: 'September - December 2025',
    progressBarColor: '#2A55DF',
  },
  {
    slug: 'met-free-tours-usability',
    title: "Usability study of The Met's free tours page",
    organization: 'Class Project',
    year: '2024',
    description:
      'A usability study examining the Metropolitan Museum of Art free tours page, identifying pain points and proposing design improvements for better visitor engagement.',
    tags: ['Usability Testing', 'Design', 'Selected Work'],
    imageBg: 'rgb(var(--color-case-study-met))',
    featured: false,
    category: 'usability-testing',
    team: ['Atharva Nayak'],
    timeline: 'Feb - Apr 2024',
    progressBarColor: 'rgb(var(--color-case-study-met))',
  },
  {
    slug: 'nyc-third-spaces-ethnography',
    title: 'An Ethnographic Study of NYC Third Spaces',
    organization: 'Woven by Toyota',
    year: '2025',
    description:
      'This case study documents a semester-long ethnographic research project conducted as a collaboration between Pratt Institute and Woven by Toyota. Our team studied how communities in New York City\'s third spaces naturally engage, collaborate, and innovate through everyday interactions.',
    tags: ['Ethnography', 'Client Project', 'Selected Work'],
    imageBg: 'rgb(var(--color-case-study-pink))',
    imageUrl: '/images/case-studies/nyc-third-spaces-ethnography/hero.jpg',
    featured: true,
    category: 'ux-research',
    team: ['Ananya Yadav', 'Atharva Nayak', 'Nisheta Gupta'],
    timeline: '3 Months',
    fullDescription:
      'This case study documents a semester-long ethnographic research project conducted as a collaboration between Pratt Institute and Woven by Toyota. Our team studied how communities in New York City\'s third spaces naturally engage, collaborate, and innovate through everyday interactions.',
    progressBarColor: 'rgb(var(--color-case-study-purple))',
  },
  {
    slug: 'seo-audit',
    title: 'Jif.com SEO Audit',
    organization: 'Personal Project',
    year: '2025',
    description:
      'An SEO audit evaluates how well a website is positioned to be found, crawled, and ranked by search engines. This POV focuses on the SEO Audit of jif.com — the #1 P&B brand in America.',
    tags: ['Digital Analytics', 'Selected Work'],
    imageBg: '#CE102C',
    featured: false,
    category: 'digital-analytics',
    team: ['Atharva Nayak'],
    timeline: '1 Week',
    pageVariant: 'figma-presentation',
    progressBarColor: '#CE102C',
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
    imageBg: '#F5C518',
    imageUrl: '/images/case-studies/imdb-ia-redesign/hero.png',
    featured: false,
    category: 'ui-design',
    team: ['Atharva Nayak', 'Charlene Guo', 'Nisheta Gupta', 'Ritika Ramesh'],
    timeline: '1 month',
    fullDescription:
      'We conducted 8 in-depth user interviews to understand how users discover and search for content within IMDb. Through this research, we identified key pain points in IMDb\'s current content discovery system and mapped user needs to improve filtering, recommendation, and browsing features.',
    progressBarColor: '#F5C518',
  },
  {
    slug: 'alo-yoga-digital-analytics',
    title: 'Alo Yoga: The Mindful Logic of Discovery',
    organization: 'Personal Project',
    year: '2026',
    description: 'A deep dive into why one of the world\'s most recognized lifestyle brands is quietly losing the search war.',
    tags: ['Digital Analytics', 'SEO Strategy', 'Selected Work'],
    imageBg: '#E8E1D4', // Premium Bone/Cream color
    featured: true,
    category: 'digital-analytics',
    team: ['Atharva Nayak'],
    timeline: 'Spring 2026',
    progressBarColor: '#1F3A66', // Deep Anthracite/Blue
  },
  {
    slug: 'snakes',
    title: 'Designing an Interactive Experience to learn about snakes',
    organization: 'Personal Project',
    year: '2026',
    description:
      'A study on the movement and behavior of snakes in digital environments.',
    tags: ['Explorations', 'Vibe Coded', 'Data Visualization'],
    imageBg: 'rgb(var(--color-case-study-purple))',
    imageUrl: '/images/case-studies/snakes/hero.webp',
    thumbnailUrl: '/images/case-studies/snakes/hero-card.webp',
    featured: true,
    category: 'ui-design',
    pageVariant: 'showcase',
    heroTextLight: false,
    timeline: 'Weekend Project',
    progressBarColor: 'rgb(var(--color-case-study-snakes-progress))',
    heroImageFill: true,
  },
]

// Helper functions
export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug)
}

export function getFeaturedCaseStudies(): CaseStudy[] {
  return caseStudies.filter((study) => study.featured)
}

export function getCaseStudiesByTag(tag: string): CaseStudy[] {
  if (tag === 'All') return caseStudies
  return caseStudies.filter((study) => study.tags.includes(tag))
}

export function getAllTags(): string[] {
  const tags = new Set<string>()
  caseStudies.forEach((study) => {
    study.tags.forEach((tag) => tags.add(tag))
  })
  return ['All', ...Array.from(tags)]
}
