'use client'

import { useState, useEffect } from 'react'
import { m } from 'framer-motion'
import { ProjectCard, type ProjectCardProps } from './ProjectCard'

interface ExplorationsGridProps {
  projects: ProjectCardProps[]
}

const PAIR_STRIDE = 14

function getBentoConfig(index: number, totalCards: number) {
  const pairIndex = Math.floor(index / 2)
  const positionInPair = index % 2
  const isLastCard = index === totalCards - 1
  const isAlone = totalCards % 2 === 1 && isLastCard

  const baseRowStart = 1 + pairIndex * PAIR_STRIDE

  if (isAlone) {
    return { colStart: 1, colSpan: 6, rowStart: baseRowStart + 3, rowSpan: 7 }
  }

  if (positionInPair === 0) {
    return { colStart: 1, colSpan: 5, rowStart: baseRowStart, rowSpan: 7 }
  }

  return { colStart: 6, colSpan: 7, rowStart: baseRowStart + 4, rowSpan: 8 }
}

export function ExplorationsGrid({ projects }: ExplorationsGridProps) {
  const [isDialogSettled, setIsDialogSettled] = useState(() => {
    if (typeof document === 'undefined') return false
    return !document.getElementById('dialog')
  })

  // Wait for dialog animation to be mostly complete before starting card entrance
  useEffect(() => {
    if (!isDialogSettled) {
      const timer = setTimeout(() => setIsDialogSettled(true), 1100)
      return () => clearTimeout(timer)
    }
  }, [isDialogSettled])

  return (
    <>
      {/* Mobile/Tablet: single column stack */}
      <div className="flex flex-col gap-12 lg:hidden">
        {projects.map((project, index) => {
          const isInitialCard = index < 4
          return (
            <m.div
              key={`${project.title}-${project.organization}`}
              initial={{ opacity: 0, y: 30 }}
              animate={
                isDialogSettled && isInitialCard
                  ? {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.5,
                        delay: index * 0.1,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    }
                  : undefined
              }
              whileInView={
                !isInitialCard
                  ? {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.5,
                        delay: index * 0.1,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    }
                  : undefined
              }
              viewport={{ once: true, margin: '-50px' }}
            >
              <ProjectCard
                {...project}
                imageSizes="(max-width: 1024px) 100vw, 75vw"
              />
            </m.div>
          )
        })}
      </div>

      {/* Desktop: 12-column bento grid */}
      <div
        className="hidden lg:grid gap-6"
        style={{
          gridTemplateColumns: 'repeat(12, 1fr)',
          gridAutoRows: '60px',
        }}
      >
        {projects.map((project, index) => {
          const config = getBentoConfig(index, projects.length)
          const isRightCard = index % 2 === 1
          return (
            <m.div
              key={`${project.title}-${project.organization}`}
              style={{
                gridColumn: `${config.colStart} / span ${config.colSpan}`,
                gridRow: `${config.rowStart} / span ${config.rowSpan}`,
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, margin: '-100px' }}
              transition={{
                duration: 1.0,
                delay: isRightCard ? 0.4 : 0,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <ProjectCard
                {...project}
                className="h-full"
                imageSizes={
                  isRightCard
                    ? '(max-width: 1024px) 100vw, 58vw'
                    : '(max-width: 1024px) 100vw, 42vw'
                }
              />
            </m.div>
          )
        })}
      </div>
    </>
  )
}
