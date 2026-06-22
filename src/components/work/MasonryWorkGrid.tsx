'use client'

import { m } from 'framer-motion'
import { ProjectCard, type ProjectCardProps } from './ProjectCard'
import { MasonryGrid } from './MasonryGrid'

interface MasonryWorkGridProps {
  projects: ProjectCardProps[]
  isDialogSettled: boolean
  hasChangedFilter: boolean
}

function useCardMotion(
  index: number,
  isDialogSettled: boolean,
  hasChangedFilter: boolean
) {
  const isInitialCard = index < 2

  return {
    initial: { opacity: 0, y: 24 } as const,
    animate:
      isDialogSettled || (hasChangedFilter && isInitialCard)
        ? {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.5,
              delay: (index % 2) * 0.08,
              ease: [0.22, 1, 0.36, 1] as const,
            },
          }
        : undefined,
    whileInView: !isInitialCard
      ? {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            delay: (index % 2) * 0.08,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        }
      : undefined,
    viewport: { once: true, margin: '-50px' } as const,
  }
}

function MasonryWorkCard({
  project,
  index,
  isDialogSettled,
  hasChangedFilter,
}: {
  project: ProjectCardProps
  index: number
  isDialogSettled: boolean
  hasChangedFilter: boolean
}) {
  const motion = useCardMotion(index, isDialogSettled, hasChangedFilter)

  return (
    <m.div {...motion}>
      <ProjectCard
        {...project}
        cardSize={undefined}
        cardAlign={undefined}
        isMasonry
        masonryIndex={index}
        imagePriority={index < 2}
        imageSizes="(max-width: 768px) 100vw, 50vw"
      />
    </m.div>
  )
}

export function MasonryWorkGrid({
  projects,
  isDialogSettled,
  hasChangedFilter,
}: MasonryWorkGridProps) {
  return (
    <MasonryGrid
      items={projects}
      gap={40}
      mobileGap={32}
      columns={{ desktop: 2, tablet: 2, mobile: 1 }}
      renderItem={(project, index) => (
        <MasonryWorkCard
          key={project.slug ?? `${project.title}-${index}`}
          project={project}
          index={index}
          isDialogSettled={isDialogSettled}
          hasChangedFilter={hasChangedFilter}
        />
      )}
    />
  )
}
