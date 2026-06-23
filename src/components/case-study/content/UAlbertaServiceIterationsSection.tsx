import Image from 'next/image'

type NoteTone = 'positive' | 'negative'

interface IterationNote {
  tone: NoteTone
  text: string
}

const NOTE_BADGE_CLASS: Record<NoteTone, string> = {
  positive: 'bg-[#2a7a52] text-[#0f5f38] dark:bg-[#72d39a] dark:text-[#0f5f38]',
  negative: 'bg-[#b84d4d] text-[#6b2020] dark:bg-[#c97a6f] dark:text-[#6b2020]',
}

interface Iteration {
  label: string
  src: string
  width: number
  height: number
  notPicturedOpacity?: number
  notes: IterationNote[]
}

const iterations: Iteration[] = [
  {
    label: 'V1',
    src: '/images/case-studies/ualberta-library-website/services-strip-v1.avif',
    width: 1122,
    height: 1836,
    notPicturedOpacity: 1,
    notes: [
      { tone: 'positive', text: 'Students already use Ctrl+F to find services. A search bar is a natural addition.' },
      { tone: 'positive', text: 'Add audience-based filters. Many services are only relevant to specific user groups. (Researcher, faculty, alumni, undergrads)' },
      { tone: 'positive', text: 'Convert existing categories into tabs for quick access to each service section.' },
      { tone: 'negative', text: 'Added an alphabetical row (A–Z) to let users jump to services by letter. However, it was removed because Alphabetical sorting assumes users already know the exact service name.' },
      { tone: 'negative', text: 'We presented services as a glossary-style list with alphabetical ordering. Removed alphabetical order but kept services grouped by category.' },
      { tone: 'positive', text: 'Added descriptions below the services to reduce confusion caused by ambiguity in the service name.' },
      { tone: 'negative', text: 'Students only use a select few services every time they visit. Added a "Featured Services" column to surface the most popular services.' },
      { tone: 'positive', text: 'Reduced the number of services by consolidating duplicates and similar services.' },
    ],
  },
  {
    label: 'V2',
    src: '/images/case-studies/ualberta-library-website/services-strip-v2.avif',
    width: 1161,
    height: 1837,
    notes: [
      { tone: 'positive', text: 'Moved the popular services to the hero section for quick access.' },
      { tone: 'positive', text: 'Moved category tabs to a sticky sidebar for quick scrolling through the list.' },
    ],
  },
  {
    label: 'V3',
    src: '/images/case-studies/ualberta-library-website/services-strip-v3.avif',
    width: 1076,
    height: 1836,
    notes: [
      { tone: 'positive', text: "Added a 'Go to all services' button to jump to the full list." },
      { tone: 'negative', text: 'We wanted to let users pin services to the hero section. But pinned services would clutter the page and make the hero section very long. For the final version, we went with tabs instead.' },
      { tone: 'negative', text: "We added 'Last Visited' and 'Frequently Visited' sections at the top of the list. But they felt out of place next to the static sidebar categories. We moved both into tabs in the final version." },
    ],
  },
  {
    label: 'Final',
    src: '/images/case-studies/ualberta-library-website/services-final.avif',
    width: 1115,
    height: 1836,
    notes: [
      { tone: 'positive', text: 'Popular services grid promoted to the hero section for immediate access.' },
      { tone: 'positive', text: 'Category tabs replace the sticky sidebar for a cleaner layout.' },
      { tone: 'positive', text: 'Bookmarking lets users save frequently-used services.' },
      { tone: 'positive', text: 'Search and audience filters are retained for discoverability.' },
    ],
  },
]

const NOT_PICTURED_SRC = '/images/case-studies/ualberta-library-website/services-not-pictured.avif'

export function UAlbertaServiceIterationsSection() {
  return (
    <section
      className="relative left-1/2 mt-20 w-screen -translate-x-1/2 px-4 md:mt-28 md:px-6"
      aria-label="Service page design iterations"
    >
      <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-4 md:gap-x-4">
        {iterations.map((iteration) => (
          <div key={iteration.label} className="flex flex-col">
            {/* Main image */}
            <div className="relative aspect-[7/12] w-full overflow-hidden">
              <Image
                src={iteration.src}
                alt={`Library services page ${iteration.label} wireframe`}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover object-top"
              />
            </div>

            {/* Not pictured strip — only for V1 */}
            {iteration.notPicturedOpacity === 1 ? (
              <div className="mt-6 mb-18 h-[18px]">
                <Image
                  src={NOT_PICTURED_SRC}
                  alt="Not pictured"
                  width={415}
                  height={60}
                  className="h-full w-auto object-contain object-left"
                />
              </div>
            ) : (
              <div className="mt-6 mb-18 h-[18px]" />
            )}

            {/* Label + notes */}
            <div className="w-[80%] space-y-1.5">
              <p
                className="mb-4 text-[16px] font-bold"
                style={{ color: 'rgb(var(--color-text-primary))' }}
              >
                {iteration.label}
              </p>
              <ol className="space-y-3">
                {iteration.notes.map((note, i) => (
                  <li key={i} className="grid grid-cols-[16px_1fr] gap-2">
                    <span
                      className={`mt-[0.15em] flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full text-[9px] font-bold leading-none ${NOTE_BADGE_CLASS[note.tone]}`}
                    >
                      {i + 1}
                    </span>
                    <p
                      className="text-[12px] leading-relaxed"
                      style={{ color: 'rgb(var(--color-text-secondary))' }}
                    >
                      {note.text}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
