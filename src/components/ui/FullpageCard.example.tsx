/**
 * Example usage of FullpageCard component
 * This file demonstrates different use cases and variants
 */

import { FullpageCard } from './FullpageCard'

export function FullpageCardExamples() {
  return (
    <>
      {/* Basic usage - Surface background */}
      <FullpageCard
        title="Helping New Yorkers apply for business licenses with ease"
        description="A case study on improving the application process for business licenses for the NYC Department of Consumer and Worker Protection."
      />

      {/* With image */}
      <FullpageCard
        title="Designing for accessibility and inclusion"
        description="Creating inclusive digital experiences that work for everyone."
        mediaSrc="/images/project-screenshot.png"
        mediaType="image"
        mediaAlt="Project screenshot showing accessible design"
      />

      {/* With video */}
      <FullpageCard
        title="Interactive prototyping for user testing"
        description="Building high-fidelity prototypes to validate design decisions."
        mediaSrc="/videos/prototype-demo.mp4"
        mediaType="video"
      />

      {/* Dark variant with custom content */}
      <FullpageCard
        title="Building the future of design systems"
        variant="dark"
        parallaxIntensity={1.5}
      >
        <p className="text-lg leading-relaxed opacity-80">
          Creating scalable, accessible components that empower teams to build
          better products faster.
        </p>
        <div className="mt-8 flex gap-4">
          <button className="rounded-lg bg-white px-6 py-3 text-sm font-medium text-black transition-transform hover:scale-105">
            View Case Study
          </button>
          <button className="rounded-lg border border-white/20 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10">
            Learn More
          </button>
        </div>
      </FullpageCard>

      {/* Surface elevated with subtitle */}
      <FullpageCard
        title="Reimagining the checkout experience"
        description="How we increased conversion rates by 42% through thoughtful UX improvements and A/B testing."
        variant="surface-elevated"
        parallaxIntensity={0.5}
      />

      {/* Light background with custom styling */}
      <FullpageCard
        title="From concept to launch in 6 weeks"
        variant="light"
        titleClassName="text-primary"
        descriptionClassName="text-text-primary"
      >
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border p-6">
            <div className="text-3xl font-bold text-primary">42%</div>
            <div className="mt-2 text-sm text-text-secondary">
              Faster time to market
            </div>
          </div>
          <div className="rounded-xl border border-border p-6">
            <div className="text-3xl font-bold text-primary">98%</div>
            <div className="mt-2 text-sm text-text-secondary">
              User satisfaction
            </div>
          </div>
          <div className="rounded-xl border border-border p-6">
            <div className="text-3xl font-bold text-primary">3x</div>
            <div className="mt-2 text-sm text-text-secondary">ROI increase</div>
          </div>
        </div>
      </FullpageCard>
    </>
  )
}
