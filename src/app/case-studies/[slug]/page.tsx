import { notFound } from 'next/navigation'
import { CaseStudyDetail } from '@/components/case-study/CaseStudyDetail'
import { ShowcaseDetail } from '@/components/case-study/ShowcaseDetail'
import { FigmaPresentationDetail } from '@/components/case-study/FigmaPresentationDetail'
import { CaseStudyStore } from '@/lib/data/case-studies'
import type { Metadata } from 'next'

interface CaseStudyPageProps {
  params: Promise<{
    slug: string
  }>
}

// Generate static params for all case studies (including snakes)
export async function generateStaticParams() {
  return CaseStudyStore.getAll().map((study) => ({
    slug: study.slug,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params
  const caseStudy = CaseStudyStore.getBySlug(slug)

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
  const caseStudy = CaseStudyStore.getBySlug(slug)

  if (!caseStudy) {
    notFound()
  }

  if (caseStudy.pageVariant === 'showcase') {
    return <ShowcaseDetail caseStudy={caseStudy} />
  }

  if (caseStudy.pageVariant === 'figma-presentation') {
    return <FigmaPresentationDetail caseStudy={caseStudy} />
  }

  return <CaseStudyDetail caseStudy={caseStudy} />
}

