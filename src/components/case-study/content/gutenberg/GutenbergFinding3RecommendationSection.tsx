'use client'

import { OptimizedImage } from '@/components/case-study/OptimizedImage'

export function GutenbergFinding3RecommendationSection() {
  return (
    <>
            {/* Proposed Recommendation */}
            <div className="mt-16 md:mt-24">
              <h4 className="text-lg md:text-case-heading font-bold text-text-primary mb-10 md:mb-14">
                Proposed Recommendation
              </h4>
              <div className="space-y-6">
                <OptimizedImage
                  webpSrc="/images/case-studies/gutenberg-cms-usability-evaluation/f3-recommendation-ai-blocks.avif"
                  fallbackSrc="/images/case-studies/gutenberg-cms-usability-evaluation/f3-recommendation-ai-blocks.avif"
                  alt="Recommendation mockup showing annotated improvements to the Generate with AI blocks panel"
                  width={1920}
                  height={1080}
                  className="w-full rounded-lg"
                />
                <OptimizedImage
                  webpSrc="/images/case-studies/gutenberg-cms-usability-evaluation/f3-recommendation-ai-modal.avif"
                  fallbackSrc="/images/case-studies/gutenberg-cms-usability-evaluation/f3-recommendation-ai-modal.avif"
                  alt="Recommendation mockup showing consolidated language selection and enlarged instruction area in the AI generation modal"
                  width={1920}
                  height={1080}
                  className="w-full rounded-lg"
                />
              </div>
            </div>
    </>
  )
}
