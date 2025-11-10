'use client'

import { WorkFilter } from '@/components/work/WorkFilter'
import type { ProjectCardProps } from '@/components/work/ProjectCard'
import { AnimatedTitle } from '@/components/ui/AnimatedTitle';
import { GradientBar } from '@/components/ui/GradientBar';

const allProjects: ProjectCardProps[] = [
  {
    title: 'Helping New Yorkers apply for business licenses with ease',
    organization: 'NYC DCWP',
    year: '2024',
    description:
      'A case study on improving the application process for business licenses for the NYC Department of Consumer and Worker Protection.',
    tags: ['Selected Work', 'Client Project'],
    imageBg: '#87CEEB',
  },
  {
    title: 'Improving Usability of Library Website',
    organization: 'University of Alberta',
    year: '2024',
    description:
      'A comprehensive UX redesign of the university library website, focusing on improving navigation, search functionality, and overall user experience for students and faculty.',
    tags: ['Selected Work', 'Usability Testing'],
    imageBg: '#90EE90',
  },
  {
    title: 'Usability study on free tours page MET',
    organization: 'Class Project',
    year: '2024',
    description:
      "An in-depth usability study of the Metropolitan Museum of Art's free tours page, identifying key pain points and providing actionable recommendations to enhance visitor experience.",
    tags: ['Selected Work', 'Usability Testing', 'Client Project'],
    imageBg: '#CD5C5C',
  },
]

export default function WorkPage() {
  const handleBack = () => {
    // Go back in history (this will trigger the dialog to close)
    window.history.back()
  }

  return (
    <div className="min-h-screen w-full bg-background">
      <GradientBar className="fixed left-0 top-0 z-50 w-full" height="h-8" />
      <div className="px-6 pb-20 pt-20 md:pb-32 md:pt-24">
        <main id="main-content">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="mb-16 block text-muted-foreground transition-colors hover:text-foreground"
          >
            Back
          </button>

          {/* Page Header */}
          <header className="mb-8 border-b border-border pb-8 md:mb-12 md:pb-12">
            <AnimatedTitle text="Check out more of my work" animationType="fadeIn" />
          </header>

          {/* Filter and Projects */}
          <WorkFilter projects={allProjects} />
        </main>
      </div>
    </div>
  )
}
