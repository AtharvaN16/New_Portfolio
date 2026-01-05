import { notFound } from 'next/navigation'
import { CaseStudyDetail } from '@/components/case-study/CaseStudyDetail'
import { getCaseStudyBySlug, caseStudies } from '@/lib/data/case-studies'
import { getCaseStudyContent } from '@/lib/mdx/get-case-study-content'
import type { Metadata } from 'next'

interface CaseStudyPageProps {
  params: Promise<{
    slug: string
  }>
}

// Generate static params for all case studies
export async function generateStaticParams() {
  return caseStudies.map((study) => ({
    slug: study.slug,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params
  const caseStudy = getCaseStudyBySlug(slug)

  if (!caseStudy) {
    return {
      title: 'Case Study Not Found',
    }
  }

  return {
    title: `${caseStudy.title} | Atharva Nayak`,
    description: caseStudy.description,
    openGraph: {
      title: caseStudy.title,
      description: caseStudy.description,
      type: 'article',
    },
  }
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params
  const caseStudy = getCaseStudyBySlug(slug)

  if (!caseStudy) {
    notFound()
  }

  // Try to load MDX content for this case study
  const ContentComponent = await getCaseStudyContent(slug)

  return (
    <CaseStudyDetail caseStudy={caseStudy}>
      {ContentComponent && <ContentComponent />}
    </CaseStudyDetail>
  )
}
