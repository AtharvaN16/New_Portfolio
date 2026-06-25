import { CASE_STUDY_BODY_LEADING } from '@/components/case-study/caseStudyTypography'
import { UAlbertaScreenshotFrame } from './UAlbertaScreenshotFrame'

const IMAGE_BASE = '/images/case-studies/ualberta-library-website'

const findings = [
  {
    number: '01',
    pageName: 'Library Services',
    headline: 'The services page is cluttered and hard to scan',
    body: 'We realised most students typically use just 2-3 services. The rest either aren\'t relevant to them or lack clear descriptions, making them hard to understand. Showing every service at once increases cognitive load. We noticed that time on task was consistently high, even amongst regular library users.',
    src: `${IMAGE_BASE}/servicespage.avif`,
    alt: 'University of Alberta Library Services page',
    width: 1640,
    height: 2260,
  },
  {
    number: '02',
    pageName: 'Hours & Locations',
    headline: 'Students are unsure which library is right for their needs',
    body: 'Libraries are not grouped by campus, and some locations are archives or research facilities instead of conventional libraries, making it difficult for students to determine which location is relevant to them. Students also can\'t see information such as library hours or available services, like study rooms and printers, without clicking into the card.',
    src: `${IMAGE_BASE}/hourspage.avif`,
    alt: 'University of Alberta Library Hours + Locations page',
    width: 1640,
    height: 2260,
  },
  {
    number: '03',
    pageName: 'Subject Guides',
    headline: "Students don't understand the utility of subject guides",
    body: "Most students don't know what subject guides are or how to find them. The navigation is confusing and finding a specific guide takes multiple clicks.",
    src: `${IMAGE_BASE}/subjectguides.avif`,
    alt: 'University of Alberta Subject Guides page',
    width: 1640,
    height: 2260,
  },
  {
    number: '04',
    pageName: 'Homepage',
    headline: 'Students ignore everything below the first fold',
    body: "Students don't find content below the fold useful or relevant to their needs. The space is currently wasted on content they don't care about. It could better serve to educate them about the various ways in which the library can support them.",
    src: `${IMAGE_BASE}/homepage.avif`,
    alt: 'University of Alberta Library homepage — current design',
    width: 1640,
    height: 2260,
  },
] as const

/** Desktop: reserve 2 lines @ 18px leading-snug */
const FINDING_HEADLINE_MIN_H = 'md:min-h-[3.25rem]'
/** Narrower measure so every headline wraps to two lines on desktop */
const FINDING_HEADLINE_MAX_W = 'md:max-w-[20rem]'
/** Desktop: reserve 4 lines @ 16px leading-normal */
const FINDING_BODY_MIN_H = 'md:min-h-[6.75rem]'

function FindingCard({
  number,
  pageName,
  headline,
  body,
  src,
  alt,
  width,
  height,
}: (typeof findings)[number]) {
  return (
    <article className="flex h-full flex-col gap-4 md:gap-5">
      <UAlbertaScreenshotFrame
        src={src}
        alt={alt}
        width={width}
        height={height}
        pageName={pageName}
      />
      <div className="flex flex-col gap-3">
        <p className="text-2xl font-bold tracking-[-0.04em] text-text-primary opacity-30 md:text-xl">
          {number}
        </p>
        <div className={`${FINDING_HEADLINE_MIN_H} ${FINDING_HEADLINE_MAX_W}`}>
          <h4 className="text-pretty text-lg font-bold leading-snug text-text-primary md:text-[18px]">
            {headline}
          </h4>
        </div>
        <div className={FINDING_BODY_MIN_H}>
          <p
            className={`text-base font-normal md:text-base ${CASE_STUDY_BODY_LEADING}`}
            style={{ color: 'rgb(var(--color-text-color90))' }}
          >
            {body}
          </p>
        </div>
      </div>
    </article>
  )
}

export function UAlbertaFindingsInsightsGrid() {
  return (
    <div className="mt-12 grid grid-cols-1 gap-10 md:mt-16 md:grid-cols-2 md:items-stretch md:gap-12">
      {findings.map((finding) => (
        <FindingCard key={finding.number} {...finding} />
      ))}
    </div>
  )
}
