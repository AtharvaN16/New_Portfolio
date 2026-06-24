'use client'

import { useEffect, useRef, useState } from 'react'
import { SectionSpacer } from '@/components/case-study/SectionSpacer'
import { CASE_STUDY_SECTION_LABEL_PROSE } from '@/components/case-study/caseStudyTypography'
import {
  UAlbertaExplorationImageFrame,
  type ExplorationSlideImage,
} from '@/components/case-study/content/UAlbertaExplorationImageFrame'
import {
  EXPLORATION_NOTES_MIN_HEIGHT_CLASS,
  scrollToFinalSolution,
  UAlbertaExplorationNotesPanel,
} from '@/components/case-study/content/UAlbertaExplorationNotesPanel'

const SLIDE_DURATION_MS = 16000
const CONTROLS_HIDE_DELAY_MS = 400

type NoteTone = 'positive' | 'negative'

interface ExplorationNote {
  text: string
  tone: NoteTone
}

interface Exploration {
  id: string
  label: string
  image: string
  imageWidth: number
  imageHeight: number
  bottomClipPercent?: number
  offsetY?: number
  notes: ExplorationNote[]
}

const explorations: Exploration[] = [
  {
    id: 'v1',
    label: 'V1',
    image: '/images/case-studies/ualberta-library-website/services-v1.avif',
    imageWidth: 1200,
    imageHeight: 1155,
    bottomClipPercent: 3,
    notes: [
      {
        tone: 'positive',
        text: 'Students already use Ctrl+F to find services. A search bar is a natural addition.',
      },
      {
        tone: 'positive',
        text: 'Add audience-based filters. Many services are only relevant to specific user groups. (Researcher, faculty, alumni, undergrads)',
      },
      {
        tone: 'positive',
        text: 'Convert existing categories into tabs for quick access to each service section.',
      },
      {
        tone: 'negative',
        text: 'Added an alphabetical row (A–Z) to let users jump to services by letter. However, it was removed because Alphabetical sorting assumes users already know the exact service name. "Printing and Scanning" falls under P, but "Scanning and Printing" falls under S.',
      },
      {
        tone: 'negative',
        text: 'We presented services as a glossary-style list with alphabetical ordering. Based on the same logic as (4), we removed alphabetical order but kept services in a list grouped by category instead.',
      },
      {
        tone: 'positive',
        text: 'Added descriptions below the services to reduce confusion caused by ambiguity in the service name.',
      },
      {
        tone: 'negative',
        text: 'Students only use a select few services every time they visit. Added a "Featured Services" column to surface the most popular services.',
      },
      {
        tone: 'positive',
        text: 'Reduced the number of services by consolidating duplicates and similar services.',
      },
    ],
  },
  {
    id: 'v2',
    label: 'V2',
    image: '/images/case-studies/ualberta-library-website/services-v2.avif',
    imageWidth: 1200,
    imageHeight: 1552,
    bottomClipPercent: 4,
    offsetY: 10,
    notes: [
      {
        tone: 'positive',
        text: 'Moved the popular services to the hero section for quick access.',
      },
      {
        tone: 'positive',
        text: 'Moved category tabs to a sticky sidebar for quick scrolling through the list.',
      },
    ],
  },
  {
    id: 'v3',
    label: 'V3',
    image: '/images/case-studies/ualberta-library-website/services-v3.avif',
    imageWidth: 1200,
    imageHeight: 1902,
    bottomClipPercent: 2,
    offsetY: 10,
    notes: [
      {
        tone: 'positive',
        text: "Added a 'Go to all services' button to jump to the full list.",
      },
      {
        tone: 'negative',
        text: 'We wanted to let users pin services to the hero section. Different users have different needs. But pinned services would clutter the page and make the hero section very long. For the final version, we went with tabs instead.',
      },
      {
        tone: 'negative',
        text: "We added 'Last Visited' and 'Frequently Visited' sections at the top of the list. But they felt out of place next to the static sidebar categories. We moved both into tabs in the final version.",
      },
    ],
  },
]

const explorationSlides: ExplorationSlideImage[] = explorations.map(
  ({ id, label, image, imageWidth, imageHeight, bottomClipPercent, offsetY }) => ({
    id,
    label,
    src: image,
    width: imageWidth,
    height: imageHeight,
    bottomClipPercent,
    offsetY,
  })
)

const VERSION_LABEL_CLASS =
  'block whitespace-nowrap text-2xl font-bold leading-none tracking-[-0.05em] md:text-2xl'

function PlayPauseIcon({
  isPlaying,
  className,
}: {
  isPlaying: boolean
  className: string
}) {
  if (isPlaying) {
    return (
      <svg className={className} viewBox="0 0 14 14" fill="currentColor" aria-hidden>
        <rect x="2" y="1" width="4" height="12" rx="1" />
        <rect x="8" y="1" width="4" height="12" rx="1" />
      </svg>
    )
  }

  return (
    <svg
      className={className}
      viewBox="0 0 14 14"
      fill="currentColor"
      aria-hidden
      style={{ marginLeft: 2 }}
    >
      <path d="M3 1.5l9 5.5-9 5.5V1.5z" />
    </svg>
  )
}

/** Current tab stays full; the next tab fills as autoplay progress runs. */
function getTabFillPercent(
  index: number,
  activeIndex: number,
  progress: number,
  total: number
): number {
  if (index === activeIndex) return 100
  const nextIndex = (activeIndex + 1) % total
  if (index === nextIndex) return progress
  return 0
}

function VersionTabLabel({
  label,
  fillPercent,
}: {
  label: string
  fillPercent: number
}) {
  const fill = Math.max(0, Math.min(100, fillPercent))

  return (
    <span className="relative inline-block align-bottom">
      <span
        className={VERSION_LABEL_CLASS}
        style={{ color: 'rgb(var(--color-text-primary-100) / 0.22)' }}
        aria-hidden
      >
        {label}
      </span>
      <span
        className={`${VERSION_LABEL_CLASS} pointer-events-none absolute inset-0`}
        style={{
          color: 'rgb(var(--color-text-primary-100))',
          clipPath: `inset(0 ${100 - fill}% 0 0)`,
        }}
        aria-hidden
      >
        {label}
      </span>
    </span>
  )
}

export function UAlbertaDesignExplorationSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [controlsVisible, setControlsVisible] = useState(false)
  const hideControlsTimeoutRef = useRef<number | null>(null)
  const showControls = () => {
    if (hideControlsTimeoutRef.current !== null) {
      window.clearTimeout(hideControlsTimeoutRef.current)
      hideControlsTimeoutRef.current = null
    }
    setControlsVisible(true)
  }

  const scheduleHideControls = () => {
    if (hideControlsTimeoutRef.current !== null) {
      window.clearTimeout(hideControlsTimeoutRef.current)
    }
    hideControlsTimeoutRef.current = window.setTimeout(() => {
      setControlsVisible(false)
      hideControlsTimeoutRef.current = null
    }, CONTROLS_HIDE_DELAY_MS)
  }

  useEffect(() => {
    return () => {
      if (hideControlsTimeoutRef.current !== null) {
        window.clearTimeout(hideControlsTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!isPlaying) return

    setProgress(0)
    const startedAt = Date.now()

    const intervalId = window.setInterval(() => {
      const nextProgress = Math.min(
        ((Date.now() - startedAt) / SLIDE_DURATION_MS) * 100,
        100
      )

      setProgress(nextProgress)

      if (nextProgress >= 100) {
        window.clearInterval(intervalId)
        setActiveIndex((current) => (current + 1) % explorations.length)
      }
    }, 50)

    return () => window.clearInterval(intervalId)
  }, [activeIndex, isPlaying])

  return (
    <>
      <SectionSpacer />

      <section
        aria-labelledby="ualberta-design-exploration-heading"
        className="relative left-1/2 w-screen -translate-x-1/2 bg-[#CECFCD] py-16 dark:bg-[rgba(255,255,255,0.15)] md:py-24"
      >
        <div className="cs-content px-6 2xl:px-0">
          <h3
            id="ualberta-design-exploration-heading"
            className={CASE_STUDY_SECTION_LABEL_PROSE}
            style={{ color: 'rgb(var(--color-text-tertiary))' }}
          >
            Design and Exploration
          </h3>

          <div
            className="mb-10 flex flex-col gap-6 md:-ml-[calc(2.25rem+3.5rem)] md:mb-14 md:flex-row md:items-end md:justify-between md:pl-[calc(2.25rem+3.5rem)]"
            onMouseEnter={showControls}
            onMouseLeave={scheduleHideControls}
          >
            <div className="relative flex w-fit items-end gap-8 md:gap-12">
              <button
                type="button"
                className={`absolute bottom-0 right-full mr-14 hidden h-9 w-9 shrink-0 items-center justify-center text-text-primary transition-opacity duration-200 ease-out md:flex ${
                  controlsVisible
                    ? 'pointer-events-auto opacity-100'
                    : 'pointer-events-none opacity-0'
                }`}
                aria-label={isPlaying ? 'Pause autoplay' : 'Play autoplay'}
                onClick={() => setIsPlaying((playing) => !playing)}
              >
                <PlayPauseIcon isPlaying={isPlaying} className="h-7 w-7" />
              </button>

              {explorations.map((item, index) => {
                const isActive = activeIndex === index
                const fillPercent = getTabFillPercent(
                  index,
                  activeIndex,
                  progress,
                  explorations.length
                )

                return (
                  <button
                    key={item.id}
                    type="button"
                    className="text-left leading-none"
                    aria-pressed={isActive}
                    onClick={() => {
                      setActiveIndex(index)
                      setProgress(0)
                    }}
                  >
                    <VersionTabLabel label={item.label} fillPercent={fillPercent} />
                  </button>
                )
              })}

              <button
                type="button"
                className="flex h-8 w-8 shrink-0 items-center justify-center text-text-primary md:hidden"
                aria-label={isPlaying ? 'Pause autoplay' : 'Play autoplay'}
                onClick={() => setIsPlaying((playing) => !playing)}
              >
                <PlayPauseIcon isPlaying={isPlaying} className="h-6 w-6" />
              </button>
            </div>

            <button
              type="button"
              className="shrink-0 self-end text-right text-[18px] font-semibold text-text-primary underline decoration-solid underline-offset-[3px] md:self-auto"
              onClick={() => scrollToFinalSolution()}
            >
              Go to final solution
            </button>
          </div>

          <div className="grid items-start gap-10 md:grid-cols-[3fr_2fr] md:gap-14">
            <UAlbertaExplorationImageFrame
              slides={explorationSlides}
              activeIndex={activeIndex}
            />

            <div className={EXPLORATION_NOTES_MIN_HEIGHT_CLASS}>
              <UAlbertaExplorationNotesPanel
                noteSets={explorations.map((item) => item.notes)}
                activeIndex={activeIndex}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
