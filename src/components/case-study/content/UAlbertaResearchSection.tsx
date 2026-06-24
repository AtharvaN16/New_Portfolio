import Image from 'next/image'
import { CaseStudyVideo } from '@/components/case-study/CaseStudyVideo'
import {
  CaseStudyCell,
  CaseStudyGrid,
  CaseStudySplit,
} from '@/components/case-study/layout'
import { SectionSpacer } from '@/components/case-study/SectionSpacer'
import {
  CASE_STUDY_FINDING_BULLET_LIST,
  CASE_STUDY_FINDING_BULLET_TEXT,
  CASE_STUDY_SECTION_LABEL_PROSE,
} from '@/components/case-study/caseStudyTypography'
import { AnimatedText } from '@/components/ui/AnimatedText'
import { GrayFrame } from '@/components/ui/GrayFrame'
import { UAlbertaServiceIterationsSection } from './UAlbertaServiceIterationsSection'

const VIDEO_BASE = '/videos/case-studies/ualberta-library-website'

const userGroups = [
  {
    title: 'Unfamiliar Users',
    body: 'Recruited via the university newsletter to see where the site’s discoverability fails on a first visit.',
  },
  {
    title: 'Frequent Users',
    body: 'Recruited from the Student Library Advisory Committee to identify which services matter most to typical students.',
  },
]

function FindingBulletList({ points }: { points: string[] }) {
  return (
    <ul className={CASE_STUDY_FINDING_BULLET_LIST}>
      {points.map((point) => (
        <li key={point} className="flex items-start gap-3">
          <span
            className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ backgroundColor: 'rgb(var(--color-text-secondary))' }}
          />
          <p className={`${CASE_STUDY_FINDING_BULLET_TEXT} text-text-secondary`}>
            {point}
          </p>
        </li>
      ))}
    </ul>
  )
}

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
    <figure>
      <CaseStudyGrid width="fill" className="gap-8 md:gap-14">
        <CaseStudyCell span={6}>
          <div className="flex items-start justify-center">
            <CaseStudyVideo
              src={src}
              alt={alt}
              playbackRate={1.5}
              className="max-w-[760px] bg-transparent"
            />
          </div>
        </CaseStudyCell>
        <CaseStudyCell span={6}>
          <figcaption className="flex h-full items-end justify-end">
            <div className="max-w-[680px]">
              {title ? (
                <h4 className="mb-4 text-xl font-bold leading-snug text-text-primary md:text-xl">
                  {title}
                </h4>
              ) : null}
              <p
                className="text-base font-normal leading-normal md:text-[18px]"
                style={{ color: 'rgb(var(--color-text-color90))' }}
              >
                {description}
              </p>
            </div>
          </figcaption>
        </CaseStudyCell>
      </CaseStudyGrid>
    </figure>
  )
}

export function UAlbertaResearchSection() {
  return (
    <section aria-labelledby="ualberta-research-heading">
      <h3
        className={CASE_STUDY_SECTION_LABEL_PROSE}
        style={{ color: 'rgb(var(--color-text-tertiary))' }}
      >
        Talking to the users
      </h3>

      <h2
        id="ualberta-research-heading"
        className="mb-10 max-w-[680px] text-xl font-bold leading-tight tracking-[-0.04em] text-text-primary md:mb-12 md:text-2xl"
      >
        We wanted to understand the experience of students while using the
        library website
      </h2>

      <div className="mb-12 max-w-[680px] space-y-6 md:mb-20">
        <p
          className="text-base font-normal leading-normal md:text-[18px]"
          style={{ color: 'rgb(var(--color-text-color90))' }}
        >
          ...So to understand how students experience the library website, we
          observed them over Zoom while they completed tasks such as finding
          library locations, booking study rooms, and using research guides. We
          tested two student types:
        </p>

        <CaseStudySplit
          preset="equal"
          className="gap-8 md:gap-12"
          left={
            <div className="space-y-3">
              <h4 className="text-base font-bold text-text-primary">
                {userGroups[0]!.title}
              </h4>
              <p
                className="text-[14px] font-normal leading-normal md:text-[15px]"
                style={{ color: 'rgb(var(--color-text-color80))' }}
              >
                {userGroups[0]!.body}
              </p>
            </div>
          }
          right={
            <div className="space-y-3">
              <h4 className="text-base font-bold text-text-primary">
                {userGroups[1]!.title}
              </h4>
              <p
                className="text-[14px] font-normal leading-normal md:text-[15px]"
                style={{ color: 'rgb(var(--color-text-color80))' }}
              >
                {userGroups[1]!.body}
              </p>
            </div>
          }
        />
      </div>

      <div className="space-y-10 md:space-y-14">
        <ResearchMediaRow
          src={`${VIDEO_BASE}/user-testing.mp4`}
          alt="Recording of a University of Alberta student completing library website tasks over Zoom"
          title="We tested 8 students on 16 common library tasks."
          description="Each session had two researchers: one facilitated, the other documented friction points and navigation issues. I personally led 2 sessions and observed 2 more."
        />

        <ResearchMediaRow
          src={`${VIDEO_BASE}/affinity-map.mp4`}
          alt="Affinity map of University of Alberta library website research observations"
          description="Over two weeks, we gathered 8 hours of recordings and mapped every frustration, hesitation, and confusion onto an affinity diagram."
        />
      </div>

      <SectionSpacer />

      {/* Findings */}
      <div>
        <h3
          className={CASE_STUDY_SECTION_LABEL_PROSE}
          style={{ color: 'rgb(var(--color-text-tertiary))' }}
        >
          Findings and insight
        </h3>

        <div className="space-y-32 md:space-y-48">

        {/* Finding 01 */}
        <CaseStudySplit
          preset="equal"
          className="gap-8 md:gap-14"
          left={
            <GrayFrame className="flex h-[430px] items-start justify-end overflow-hidden pt-[calc(15%-6px)] md:h-[540px]">
              <Image
                src="/images/case-studies/ualberta-library-website/servicespage.avif"
                alt="University of Alberta Library Services page"
                width={1640}
                height={2260}
                className="block h-auto w-[85%] shrink-0 translate-x-[6px]"
              />
            </GrayFrame>
          }
          right={
            <div className="flex flex-col gap-8 md:gap-10">
              <AnimatedText
                variant="quote"
                as="blockquote"
                segments={[
                  {
                    text: '"It\'s too much, hard to read, cluttered, and difficult to navigate."',
                  },
                ]}
                maxWidth="default"
                className="self-end max-w-[300px] text-left text-xl leading-[1.08] tracking-[-0.05em] text-text-primary md:max-w-[360px] md:text-2xl"
              />
              <div className="space-y-4">
                <p className="text-2xl font-bold tracking-[-0.04em] text-text-primary opacity-30 md:text-3xl">01</p>
                <h4 className="text-lg font-bold leading-snug text-text-primary md:text-xl">
                  Services are organized into logical categories, but the page has too many options displayed at once.
                </h4>
                <FindingBulletList
                  points={[
                    'One student used "Ctrl + F" after failing to find a service.',
                    'Services in research, alumni or teaching categories were irrelevant to undergraduate users.',
                    'Some services have ambiguous names like "ERA" with no descriptions.',
                    'Majority of students only use a handful of services regularly.',
                  ]}
                />
              </div>
            </div>
          }
        />

        {/* Finding 02 */}
        <CaseStudySplit
          preset="equal"
          className="gap-8 md:gap-14"
          left={
            <GrayFrame className="flex h-[430px] items-start justify-end overflow-hidden pt-[calc(15%-6px)] md:h-[540px]">
              <Image
                src="/images/case-studies/ualberta-library-website/hourspage.avif"
                alt="University of Alberta Library Hours + Locations page"
                width={1640}
                height={2260}
                className="block h-auto w-[85%] shrink-0 translate-x-[6px]"
              />
            </GrayFrame>
          }
          right={
            <div className="flex items-end">
              <div className="space-y-4">
                <p className="text-2xl font-bold tracking-[-0.04em] text-text-primary opacity-30 md:text-3xl">02</p>
                <h4 className="text-lg font-bold leading-snug text-text-primary md:text-xl">
                  Students are unsure which library is right for them.
                </h4>
                <FindingBulletList
                  points={[
                    'Alphabetical ordering pushed satellite campus locations above main campus options.',
                    'Some listed locations are archives or scholarship centers, not actual libraries, confusing new students.',
                    'The page did not show which libraries had 24/7 study space or what facilities each offered.',
                    'You have to click into the card to know the library hours.',
                  ]}
                />
              </div>
            </div>
          }
        />

        {/* Findings 03 + 04 — side by side */}
        <CaseStudySplit
          preset="equal"
          className="gap-8 md:gap-14"
          left={
            <div className="space-y-5">
              <GrayFrame className="flex h-[430px] items-start justify-start overflow-hidden pt-[calc(15%-6px)] md:h-[540px]">
                <Image
                  src="/images/case-studies/ualberta-library-website/subjectguides.avif"
                  alt="University of Alberta Subject Guides page"
                  width={1640}
                  height={2260}
                  className="block h-auto w-[85%] shrink-0 -translate-x-[6px]"
                />
              </GrayFrame>
              <div className="space-y-2">
                <p className="text-2xl font-bold tracking-[-0.04em] text-text-primary opacity-30 md:text-3xl">03</p>
                <h4 className="text-lg font-bold leading-snug text-text-primary md:text-xl">
                  Navigating to specific guides was difficult as it required multiple steps.
                </h4>
              </div>
            </div>
          }
          right={
            <div className="space-y-5">
              <GrayFrame className="flex h-[430px] items-start justify-start overflow-hidden pt-[calc(15%-6px)] md:h-[540px]">
                <Image
                  src="/images/case-studies/ualberta-library-website/homepage.avif"
                  alt="University of Alberta Library homepage"
                  width={1640}
                  height={2260}
                  className="block h-auto w-[85%] shrink-0 -translate-x-[6px]"
                />
              </GrayFrame>
              <div className="space-y-2">
                <p className="text-2xl font-bold tracking-[-0.04em] text-text-primary opacity-30 md:text-3xl">04</p>
                <h4 className="text-lg font-bold leading-snug text-text-primary md:text-xl">
                  The home page above fold works well. Everything below it gets ignored.
                </h4>
              </div>
            </div>
          }
        />
        </div>
      </div>

      <SectionSpacer />

      {/* Competitor Analysis */}
      <div>
        <GrayFrame className="p-6 md:p-10">
          <h3
            className={CASE_STUDY_SECTION_LABEL_PROSE}
            style={{ color: 'rgb(var(--color-text-tertiary))' }}
          >
            Competitor Research
          </h3>
          <Image
            src="/images/case-studies/ualberta-library-website/competitor-research.avif"
            alt="Competitor research — screenshots of comparable university library websites"
            width={2560}
            height={1440}
            className="w-full h-auto"
          />
        </GrayFrame>
      </div>

      <UAlbertaServiceIterationsSection />
    </section>
  )
}
