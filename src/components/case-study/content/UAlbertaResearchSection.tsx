import Image from 'next/image'
import { CaseStudyVideo } from '@/components/case-study/CaseStudyVideo'
import { CASE_STUDY_SECTION_LABEL } from '@/components/case-study/caseStudyTypography'
import { GrayFrame } from '@/components/ui/GrayFrame'

const VIDEO_BASE = '/videos/case-studies/ualberta-library-website'

const userGroups = [
  {
    title: 'Unfamiliar Users',
    body: "Students who never used the website (recruited from the university newsletter) who could show us where the site's discoverability breaks on a first visit.",
  },
  {
    title: 'Frequent Users',
    body: 'Frequent users recruited from the Student Library Advisory Committee (SLAC) who knew the library website well and who could show us what services are most important for a typical student.',
  },
]

function ResearchMediaRow({
  src,
  alt,
  title,
  description,
}: {
  src: string
  alt: string
  title?: string
  description: string
}) {
  return (
    <figure className="grid gap-8 md:grid-cols-[1.05fr_1fr] md:gap-14">
      <div className="flex items-start justify-center">
        <CaseStudyVideo
          src={src}
          alt={alt}
          playbackRate={1.5}
          className="max-w-[760px] bg-transparent"
        />
      </div>

      <figcaption className="flex items-end justify-end">
        <div className="max-w-[680px]">
          {title ? (
            <h4 className="mb-4 text-xl font-bold leading-snug text-text-primary md:text-[24px]">
              {title}
            </h4>
          ) : null}
          <p
            className="text-base font-normal leading-relaxed md:text-[18px]"
            style={{ color: 'rgb(var(--color-text-color90))' }}
          >
            {description}
          </p>
        </div>
      </figcaption>
    </figure>
  )
}

export function UAlbertaResearchSection() {
  return (
    <section aria-labelledby="ualberta-research-heading">
      <h3
        className={`${CASE_STUDY_SECTION_LABEL} mb-6 md:mb-[28px] max-w-[680px]`}
        style={{ color: 'rgb(var(--color-text-tertiary))' }}
      >
        Research
      </h3>

      <h2
        id="ualberta-research-heading"
        className="mb-10 max-w-[680px] text-2xl font-bold leading-tight tracking-[-0.04em] text-text-primary md:mb-12 md:text-[32px]"
      >
        We wanted to understand the experience of students while using the
        library website
      </h2>

      <div className="mb-8 max-w-[680px] space-y-6 md:mb-10">
        <p
          className="text-base font-normal leading-relaxed md:text-[18px]"
          style={{ color: 'rgb(var(--color-text-color90))' }}
        >
          ...So we decided to observe them completing tasks like finding library
          locations, booking study rooms, and using research guides over Zoom.
          We designed a test that contrasted two different types of students:
        </p>

        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          {userGroups.map((group) => (
            <div key={group.title} className="space-y-3">
              <h4 className="text-base font-bold text-text-primary">
                {group.title}
              </h4>
              <p
                className="text-[14px] font-normal leading-relaxed md:text-[15px]"
                style={{ color: 'rgb(var(--color-text-color80))' }}
              >
                {group.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <p
        className="mb-12 max-w-[680px] text-base font-normal leading-relaxed md:mb-16 md:text-[18px]"
        style={{ color: 'rgb(var(--color-text-color90))' }}
      >
        Our cohort spanned a mix of year levels, including 1 PhD candidate, 1
        second-year, 4 third-years, and 2 fourth-year undergraduates.
      </p>

      <div className="space-y-10 md:space-y-14">
        <ResearchMediaRow
          src={`${VIDEO_BASE}/user-testing.mp4`}
          alt="Recording of a University of Alberta student completing library website tasks over Zoom"
          title="We tested 8 students completing 16 common library tasks"
          description="Every session included two researchers: one facilitated the interview while the other documented user behaviors, points of friction, and navigation bottlenecks. I personally led 2 sessions and observed 2."
        />

        <ResearchMediaRow
          src={`${VIDEO_BASE}/affinity-map.mp4`}
          alt="Affinity map of University of Alberta library website research observations"
          description="Over two weeks, we compiled 8 hours of recordings and mapped every frustration, hesitation, and confusion onto an affinity diagram."
        />
      </div>

      {/* Competitor Analysis */}
      <div className="mt-16 md:mt-24">
        <GrayFrame className="p-6 md:p-10">
          <p
            className={`${CASE_STUDY_SECTION_LABEL} mb-6 md:mb-8`}
            style={{ color: 'rgb(var(--color-text-tertiary))' }}
          >
            Competitor Research
          </p>
          <Image
            src="/images/case-studies/ualberta-library-website/competitor-research.png"
            alt="Competitor research — screenshots of comparable university library websites"
            width={2560}
            height={1440}
            className="w-full h-auto"
          />
        </GrayFrame>
      </div>
    </section>
  )
}
