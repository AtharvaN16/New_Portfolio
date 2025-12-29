export interface CaseStudy {
  slug: string
  title: string
  organization: string
  year: string
  description: string
  tags: string[]
  imageBg: string
  imageUrl?: string
  featured?: boolean
  category:
    | 'service-design'
    | 'design-thinking'
    | 'ux-research'
    | 'usability-testing'
    | 'ui-design'
  team?: string[]
  timeline?: string
  fullDescription?: string
  progressBarColor?: string
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'pratt-institute-visitor-experience',
    title: 'Elevating the Visitor Experience at Pratt Institute',
    organization: 'Pratt Institute',
    year: '2025',
    description:
      "A service design project with Pratt Institute's Office of Admissions focused on improving the end-to-end campus visit experience through research, co-design, and the redesign of visitor touchpoints and student ambassador support tools.",
    tags: ['Service design / Design thinking', 'Selected Work'],
    imageBg: 'rgb(var(--color-case-study-purple))',
    imageUrl:
      '/images/case-studies/pratt-institute-visitor-experience/hero.png',
    featured: true,
    category: 'service-design',
    team: ['Atharva Nayak', 'Gloria Yang', 'Sakshi Rane'],
    timeline: 'Sep - Dec 2025',
    fullDescription:
      "A service design project with Pratt Institute's Office of Admissions focused on improving the end-to-end campus visit experience through research, co-design, and the redesign of visitor touchpoints and student ambassador support tools.",
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
    imageBg: 'rgb(var(--color-case-study-sky))',
    featured: true,
    category: 'ux-research',
    team: ['Atharva Nayak'],
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
    imageBg: 'rgb(var(--color-case-study-green))',
    featured: true,
    category: 'ux-research',
    team: ['Atharva Nayak', 'Research Team'],
    timeline: 'Mar - Jun 2024',
  },
  {
    slug: 'met-free-tours-usability',
    title: 'Usability study on free tours page MET',
    organization: 'Class Project',
    year: '2024',
    description:
      'A usability study examining the Metropolitan Museum of Art free tours page, identifying pain points and proposing design improvements for better visitor engagement.',
    tags: ['Usability Testing', 'Design', 'Selected Work'],
    imageBg: 'rgb(var(--color-case-study-red))',
    featured: true,
    category: 'usability-testing',
    team: ['Atharva Nayak'],
    timeline: 'Feb - Apr 2024',
  },
  {
    slug: 'career-services-platform',
    title: 'Transforming Career Services Through Digital Innovation',
    organization: 'University of Alberta',
    year: '2023',
    description:
      'Designing a comprehensive digital platform for university career services, focusing on improving student-employer connections and career development resources.',
    tags: ['Client Project', 'UX Research', 'UI Design'],
    imageBg: 'rgb(var(--color-case-study-pink))',
    category: 'ux-research',
  },
  {
    slug: 'sustainable-shopping-app',
    title: 'Sustainable Shopping Companion',
    organization: 'Personal Project',
    year: '2023',
    description:
      'Exploration of a mobile application that helps consumers make environmentally conscious purchasing decisions through product sustainability ratings and alternatives.',
    tags: ['Explorations', 'UI Design'],
    imageBg: 'rgb(var(--color-case-study-pale-green))',
    category: 'ui-design',
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
