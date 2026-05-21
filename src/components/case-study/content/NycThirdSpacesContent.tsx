'use client'

import { m } from 'framer-motion'
import { CaseStudyReadMore } from '@/components/case-study/CaseStudyReadMore'
import { OptimizedImage } from '@/components/case-study/OptimizedImage'

interface NycThirdSpacesContentProps {
  isContentRevealed: boolean
  onToggleContent: () => void
}

const BASE = '/images/case-studies/nyc-third-spaces-ethnography'

function Divider() {
  return (
    <div
      className="border-t my-24 md:my-32"
      style={{ borderColor: 'rgb(var(--color-text-color10))' }}
    />
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-lg md:text-[28px] font-bold text-text-primary mb-6 md:mb-[28px]">
      {children}
    </h3>
  )
}

function ChapterLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[28px] md:text-[36px] font-bold uppercase tracking-[0.06em] mb-10 md:mb-14"
      style={{ color: 'rgb(var(--color-case-study-purple))' }}
    >
      {children}
    </p>
  )
}

function CityCard({ flag, name, description }: { flag: string; name: string; description: string }) {
  return (
    <div className="rounded-xl p-6 md:p-8" style={{ backgroundColor: 'rgb(var(--color-surface-elevated))' }}>
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xl">{flag}</span>
        <h4 className="text-base md:text-[18px] font-semibold text-text-primary">{name}</h4>
      </div>
      <p className="text-base md:text-[17px] font-normal leading-relaxed" style={{ color: 'rgb(var(--color-text-secondary))' }}>
        {description}
      </p>
    </div>
  )
}

function SitePhoto({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="rounded-xl overflow-hidden">
      <OptimizedImage
        src={`${BASE}/${src}`}
        alt={alt}
        width={400}
        height={300}
        className="w-full h-auto block"
      />
    </div>
  )
}

function FieldPhoto({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <div>
      <div className="rounded-xl overflow-hidden mb-3">
        <OptimizedImage
          src={`${BASE}/${src}`}
          alt={alt}
          width={600}
          height={400}
          className="w-full h-auto block"
        />
      </div>
      <p className="text-sm font-normal" style={{ color: 'rgb(var(--color-text-tertiary))' }}>
        {caption}
      </p>
    </div>
  )
}

const FRAMEWORK_ITEMS = [
  { title: 'Accessible Locations', description: 'Spaces must be easy to reach and embedded in places where people already spend time', span: 2 },
  { title: 'Regular Rhythms', description: 'Rituals create predictability and trust, making communities form habits around shared time', span: 1 },
  { title: 'Integrates Aspects of Play', description: 'Playful elements lower social barriers, spark curiosity, and encourage low-stakes experimentation', span: 1 },
  { title: 'Psychological Safety', description: 'People must not feel judged so they can share ideas, take risks, and engage authentically', span: 2 },
  { title: 'Low Barriers to Entry', description: 'Welcome people without cost, expertise, or prior knowledge—removing intimidation', span: 2 },
  { title: 'Recognition and Belonging', description: 'Small acts of acknowledgment reinforce identity and connection, making spaces personal and meaningful', span: 1 },
  { title: 'Clear Ways to Participate', description: 'Visible, simple steps help people understand how to join, grow, and take ownership', span: 1 },
  { title: 'Shared Decision-Making', description: 'Members influence rules, programming, and resource use, ensuring the space reflects collective needs', span: 2 },
  { title: 'Adaptive / Modular Spaces', description: 'Design should flex between structured events and unplanned encounters, responding to how people actually use it', span: 3 },
]

function FrameworkCard({ num, title, description }: { num: number; title: string; description: string }) {
  return (
    <div className="rounded-xl p-6 md:p-7 flex flex-col gap-3.5 h-full" style={{ backgroundColor: 'rgb(var(--color-surface-elevated))' }}>
      <div className="flex items-start gap-3">
        <span
          className="w-8 h-8 min-w-8 rounded-md flex items-center justify-center text-sm font-bold tabular-nums leading-none flex-shrink-0 mt-0.5 bg-[rgb(var(--color-case-study-purple)/0.18)] dark:bg-[rgb(var(--color-case-study-purple)/0.26)] text-[rgb(var(--hero-blob-purple))] dark:text-[rgb(var(--color-foreground))]"
        >
          {num}
        </span>
        <h4 className="text-lg md:text-xl font-bold leading-snug" style={{ color: 'rgb(var(--color-case-study-purple))' }}>
          {title}
        </h4>
      </div>
      <p className="text-base md:text-[17px] font-medium leading-relaxed" style={{ color: 'rgb(var(--color-text-secondary))' }}>
        {description}
      </p>
    </div>
  )
}

function ResearchCard({ text }: { text: string }) {
  return (
    <div className="rounded-xl p-5 md:p-6" style={{ backgroundColor: 'rgb(var(--color-surface-elevated))' }}>
      <div className="flex items-center gap-2 mb-3">
        <span>🔍</span>
        <span className="font-semibold text-sm md:text-base" style={{ color: '#4B8AC0' }}>
          What our research says?
        </span>
      </div>
      <p className="text-base font-normal leading-relaxed" style={{ color: 'rgb(var(--color-text-secondary))' }}>
        {text}
      </p>
    </div>
  )
}

function ImpactCard({ text }: { text: string }) {
  return (
    <div className="rounded-xl p-5 md:p-6" style={{ backgroundColor: 'rgb(var(--color-surface-elevated))' }}>
      <div className="flex items-center gap-2 mb-3">
        <span>📈</span>
        <span className="font-semibold text-sm md:text-base" style={{ color: '#D97706' }}>
          Citywide Impact
        </span>
      </div>
      <p className="text-base font-normal leading-relaxed" style={{ color: 'rgb(var(--color-text-secondary))' }}>
        {text}
      </p>
    </div>
  )
}

export function NycThirdSpacesContent({ isContentRevealed, onToggleContent }: NycThirdSpacesContentProps) {
  return (
    <m.section
      className="w-full px-6 2xl:px-[140px] py-16 md:py-24 max-w-[1920px] mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <div className="max-w-[1044px] mx-auto text-left">
        {/* Abstract */}
        <SectionTitle>Abstract</SectionTitle>
        <div className="space-y-6 md:space-y-8">
          <p className="text-base md:text-[18px] font-normal text-text-color70 leading-relaxed">
            This case study documents a semester-long ethnographic research project conducted as a
            collaboration between Pratt Institute and Woven by Toyota. Our team studied how communities
            in New York City&apos;s third spaces naturally engage, collaborate, and innovate through
            everyday interactions.
          </p>
          <p className="text-base md:text-[18px] font-normal text-text-color70 leading-relaxed">
            The goal was to uncover the social infrastructures, behaviors, and cultural practices that
            help these spaces thrive, and translate those insights into actionable recommendations that
            our client can use in Woven City.
          </p>
        </div>

        <CaseStudyReadMore
          readTime="8 min read"
          isContentRevealed={isContentRevealed}
          onToggleContent={onToggleContent}
        >
              {/* About the Client */}
              <SectionTitle>About the Client</SectionTitle>
              <div className="w-full rounded-xl overflow-hidden mb-8 md:mb-10">
                <OptimizedImage
                  src={`${BASE}/woven-city-entrance.jpg`}
                  alt="Toyota Woven City entrance at night"
                  width={1200}
                  height={675}
                  className="w-full h-auto block"
                />
              </div>
              <p className="text-base md:text-[18px] font-normal text-text-color70 leading-relaxed">
                Woven City is an initiative by Woven by Toyota to create a living laboratory at the base
                of Mount Fuji in Japan—a testbed for mobility, sustainability, and human-centered
                innovation. The vision is for Inventors (startups, researchers, companies) to collaborate
                with Weavers (residents) to co-create products and services through daily life.
              </p>

              <Divider />

              {/* The Challenge */}
              <SectionTitle>The challenge</SectionTitle>
              <p className="text-base md:text-[18px] font-normal text-text-color70 leading-relaxed mb-10 md:mb-14">
                The core challenge we set out to investigate is one shared by innovation districts around the world:
              </p>
              <m.p
                className="text-[22px] md:text-[28px] lg:text-[32px] font-bold leading-snug tracking-[-0.03em]"
                style={{ color: 'rgb(var(--color-foreground))' }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                How do you design an environment where{' '}
                <span style={{ color: 'rgb(var(--color-case-study-purple))' }}>authentic collaboration</span>{' '}
                emerges organically rather than being artificially programmed?
              </m.p>

              <Divider />

              {/* Why Smart Cities Fail */}
              <SectionTitle>Why Smart cities always seem to fail?</SectionTitle>
              <p className="text-base md:text-[18px] font-normal text-text-color70 leading-relaxed mb-10 md:mb-14">
                Smart cities and living labs aren&apos;t new. While a few have succeeded, many have fallen short
                of their potential, often propelled by hype and buzzwords more than by real community needs.
                Projects led by technological ambition frequently overlook the social infrastructure that
                actually enables communities to thrive. Notable examples include:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <CityCard flag="🇰🇷" name="Songdo, South Korea"
                  description="Top-down planning, limited organic community development, and high living costs discouraged residents. The result was a space that felt sterile and disconnected from Korean culture." />
                <CityCard flag="🇨🇦" name="Sidewalk Toronto - Canada"
                  description="Privacy concerns and corporate control of public space eroded community trust, leading to project cancellation." />
              </div>
              <div className="mb-12 md:mb-16">
                <CityCard flag="🇦🇪" name="Masdar City, UAE"
                  description="Overly ambitious technological goals, the impact of the financial crisis, extreme development costs, limited economic diversity, and an isolated location all hindered the project's success." />
              </div>

              {/* Common threads */}
              <p className="text-[20px] md:text-[24px] font-bold leading-snug" style={{ color: 'rgb(var(--color-foreground))' }}>
                These failures share common threads:{' '}
                <span style={{ color: 'rgb(var(--color-case-study-purple))' }}>
                  Inauthentic social fabric, disconnect from local culture, and lack of diverse spaces
                </span>{' '}
                that organically support community formation
              </p>

              {/* Research Question */}
              <div className="mt-12 md:mt-16">
                <p className="text-base md:text-[18px] font-normal text-text-color70 leading-relaxed mb-6">
                  This led to our research question:
                </p>
                <div className="rounded-xl p-6 md:p-8 flex items-start gap-4" style={{ backgroundColor: 'rgb(var(--color-surface-elevated))' }}>
                  <span className="text-xl flex-shrink-0 mt-0.5">💡</span>
                  <p className="text-[20px] md:text-[24px] font-bold leading-snug" style={{ color: 'rgb(var(--color-text-secondary))' }}>
                    How do everyday third spaces—libraries, parks, shared meals—enable informal innovation,
                    collaboration, and community-building?
                  </p>
                </div>
              </div>

              <Divider />

              {/* METHODOLOGY */}
              <ChapterLabel>Methodology</ChapterLabel>
              <SectionTitle>Theoretical Foundation</SectionTitle>
              <div className="flex flex-col md:flex-row md:items-start md:gap-12">
                {/* Book cover on left */}
                <div className="w-full md:w-[200px] flex-shrink-0 mb-8 md:mb-0">
                  <OptimizedImage
                    src={`${BASE}/palace.png`}
                    alt="Palaces for the People book cover by Eric Klinenberg"
                    width={200}
                    height={300}
                    className="w-full h-auto block rounded-xl"
                  />
                </div>
                {/* Text on right */}
                <p className="text-base md:text-[18px] font-normal text-text-color70 leading-relaxed flex-1">
                  We grounded our research in sociologist Eric Klinenberg&apos;s work on social infrastructure
                  (<em>Palaces for the People</em>) and Ray Oldenburg&apos;s concept of{' '}
                  <strong className="font-bold" style={{ color: 'rgb(var(--color-foreground))' }}>
                    third places—spaces beyond home and work where community naturally forms
                  </strong>
                  . Klinenberg argues that isolation and polarization stem not from technology alone but from
                  neglected physical spaces that bring people together.
                </p>
              </div>

              <Divider />

              {/* Field Research */}
              <SectionTitle>Field Research</SectionTitle>
              <p className="text-base md:text-[18px] font-normal text-text-color70 leading-relaxed mb-10">
                We conducted contextual inquiry and guerrilla interviews across six NYC sites, selected to
                represent different modes of social infrastructure:
              </p>
              <div className="mb-10">
                <p className="text-base md:text-[18px] font-normal text-text-color70 leading-relaxed mb-6">
                  <strong className="font-semibold" style={{ color: 'rgb(var(--color-foreground))' }}>Organized Spaces:</strong>{' '}
                  Brooklyn Library, The Met Date Night, Community Gardens—structured environments with defined rules and roles
                </p>
                <div className="grid grid-cols-3 gap-3 md:gap-4">
                  <SitePhoto src="brooklyn-lib.png" alt="Brooklyn Library" />
                  <SitePhoto src="met.png" alt="The Met Date Night" />
                  <SitePhoto src="garden.png" alt="Community Garden" />
                </div>
              </div>
              <div className="mb-14">
                <p className="text-base md:text-[18px] font-normal text-text-color70 leading-relaxed mb-6">
                  <strong className="font-semibold" style={{ color: 'rgb(var(--color-foreground))' }}>Unorganized Spaces:</strong>{' '}
                  Union Square Winter Market, Union Square Farmers Market — spontaneous settings where informal
                  interactions emerge naturally
                </p>
                <div className="grid grid-cols-3 gap-3 md:gap-4">
                  <SitePhoto src="winter-market.png" alt="Union Square Winter Market" />
                  <SitePhoto src="farmers-market.png" alt="Union Square Farmers Market" />
                  <SitePhoto src="queens.png" alt="Queens Night Market" />
                </div>
              </div>

              {/* Field observations */}
              <p className="text-base md:text-[18px] font-normal text-text-color70 leading-relaxed mb-10">
                Through{' '}
                <strong className="font-semibold" style={{ color: 'rgb(var(--color-case-study-purple))' }}>12 guerrilla interviews</strong>{' '}
                with participants and extensive field observations, we documented how people actually use these
                spaces, what motivates sustained participation, what subtle barriers shape who engages.
              </p>
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                <FieldPhoto src="union-sq-winter-1.png" alt="Union Square Holiday Market booth" caption="Union Square Winter Market" />
                <FieldPhoto src="union-sq-winter-2.png" alt="Union Square Winter Market crowd" caption="Union Square Winter Market" />
                <FieldPhoto src="union-sq-farmers-1.png" alt="Union Square Farmers Market produce" caption="Union Square Farmers Market" />
                <FieldPhoto src="union-sq-farmers-2.png" alt="Union Square Farmers Market tents" caption="Union Square Farmers Market" />
              </div>

              <Divider />

              {/* Framework */}
              <ChapterLabel>Framework for Thriving Third Spaces</ChapterLabel>
              <p className="text-base md:text-[18px] font-normal text-text-color70 leading-relaxed mb-10 md:mb-14">
                Synthesizing insights from our fieldwork, we developed a nine-element framework that identifies
                the core conditions enabling third spaces to support innovation, collaboration, and community-building:
              </p>

              {/* Bento grid — alternating wide/narrow on desktop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {FRAMEWORK_ITEMS.map((item, i) => (
                  <div
                    key={i}
                    className={
                      item.span === 3
                        ? 'sm:col-span-2 lg:col-span-3'
                        : item.span === 2
                          ? 'lg:col-span-2'
                          : ''
                    }
                  >
                    <FrameworkCard num={i + 1} title={item.title} description={item.description} />
                  </div>
                ))}
              </div>

              <Divider />

              {/* ─── PROPOSED INTERVENTIONS ─────────────────────────── */}
              <SectionTitle>Proposed Interventions</SectionTitle>
              <p className="text-xl md:text-[24px] font-bold text-text-primary mb-16 md:mb-20">
                How can smart city projects like Woven City use this framework?
              </p>

              {/* ── Intervention 1: Blank Slate Zones ─────────────── */}
              <div className="mb-20 md:mb-28">
                <h3 className="text-2xl md:text-[34px] font-bold text-text-primary mb-3">
                  1. Blank Slate Zones
                </h3>
                <p className="text-base md:text-[17px] mb-10 md:mb-14" style={{ color: 'rgb(var(--color-text-secondary))' }}>
                  Residents are provided with modular raw materials to build their own temporary structures, markets, or gardens
                </p>
                <div className="flex flex-col md:flex-row md:items-start md:gap-10 mb-10 md:mb-14">
                  <div className="w-full md:w-[280px] flex-shrink-0 mb-8 md:mb-0">
                    <OptimizedImage
                      src={`${BASE}/int-blank-slate.png`}
                      alt="Blank Slate Zones isometric"
                      width={280}
                      height={210}
                      className="w-full h-auto block"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-base md:text-[17px] text-text-primary mb-4">Some ways this can be adopted by Woven City:</p>
                    <ul className="space-y-3 list-disc list-outside pl-5">
                      {[
                        'Micro-plazas, lobbies, rooftops, and alleys act as modular collaboration pockets',
                        'Built-in power, tools, shared surfaces – no setup needed',
                        'Clear visual cues on how to participate in a blank state zone ("Observe," "Join," "Co-create") reduce invisible barriers',
                        'Neighborhood gratitude walls, shared playlists, "open tools hour"',
                      ].map((b, i) => (
                        <li key={i} className="text-base md:text-[17px] font-normal leading-relaxed" style={{ color: 'rgb(var(--color-text-secondary))' }}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 md:mb-16">
                  <ResearchCard text="Flexibility lowers pressure and makes participation feel natural" />
                  <ImpactCard text="Collaboration becomes effortless, embedded in familiar places where people already spend time." />
                </div>
                <h4 className="text-lg md:text-xl font-bold text-text-primary mb-4">Example:</h4>
                <p className="text-base md:text-[17px] font-normal text-text-color70 leading-relaxed mb-6">
                  Brick Lane&apos;s graffiti district in London grew organically as artists painted freely, with work constantly updated without formal oversight. Over time, this attracted galleries, markets, studios, and street performances, transforming the area into a creative district.
                </p>
                <div className="mb-6 max-w-[500px]">
                  <div className="rounded-xl overflow-hidden mb-2">
                    <OptimizedImage
                      src={`${BASE}/int-brick-lane.png`}
                      alt="Brick Lane graffiti district, London"
                      width={500}
                      height={375}
                      className="w-full h-auto block"
                    />
                  </div>
                  <p className="text-sm font-normal" style={{ color: 'rgb(var(--color-text-tertiary))' }}>Brick Lane, London</p>
                </div>
                <p className="text-base md:text-[17px] font-normal text-text-color70 leading-relaxed mb-8">
                  Woven City could apply this model by designating zones for murals, experimental gardens, performances, temporary structures, or community installations—spaces where ongoing modification and change are expected rather than discouraged.
                </p>
                <h4 className="text-lg md:text-xl font-bold text-text-primary mb-4">Why this works?</h4>
                <ul className="space-y-3 list-disc list-outside pl-5">
                  {[
                    { label: 'Lowers creative barriers:', text: 'No approval process, no committee reviews, no waiting for permission to experiment' },
                    { label: 'Creativity is contagious:', text: 'Watching makers build in public sparks curiosity and pulls more people into the process' },
                  ].map((b, i) => (
                    <li key={i} className="text-base md:text-[17px] font-normal leading-relaxed" style={{ color: 'rgb(var(--color-text-secondary))' }}>
                      <span className="font-semibold" style={{ color: 'rgb(var(--color-case-study-purple))' }}>{b.label}</span>{' '}{b.text}
                    </li>
                  ))}
                </ul>
              </div>

              {/* ── Intervention 2: Participatory Stewardship ─────── */}
              <div className="mb-20 md:mb-28">
                <h3 className="text-2xl md:text-[34px] font-bold text-text-primary mb-3">
                  2. Participatory Stewardship Model
                </h3>
                <p className="text-base md:text-[17px] mb-10 md:mb-14" style={{ color: 'rgb(var(--color-text-secondary))' }}>
                  A support system that lowers the threshold for joining, leading, and creating
                </p>
                <div className="flex flex-col md:flex-row md:items-start md:gap-10 mb-10 md:mb-14">
                  <div className="w-full md:w-[280px] flex-shrink-0 mb-8 md:mb-0">
                    <OptimizedImage
                      src={`${BASE}/int-steward.png`}
                      alt="Participatory Stewardship isometric"
                      width={280}
                      height={210}
                      className="w-full h-auto block"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-base md:text-[17px] text-text-primary mb-4">Some ways this can be adopted by Woven City:</p>
                    <ul className="space-y-3 list-disc list-outside pl-5">
                      {[
                        'Every neighborhood has Event Starter Kits, Workshop Kits, and Welcome Kits',
                        'Residents can book designated spaces around the city to host events',
                        'Quick-claim tools: a designated digital space to find resources for stewardships, such as tools, volunteer sign-ups, etc.',
                      ].map((b, i) => (
                        <li key={i} className="text-base md:text-[17px] font-normal leading-relaxed" style={{ color: 'rgb(var(--color-text-secondary))' }}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 md:mb-16">
                  <ResearchCard text="People lead only when the infrastructure carries the logistical load" />
                  <ImpactCard text="Leadership becomes something anyone can step into, not a special role, but a supported behavior." />
                </div>
                <h4 className="text-lg md:text-xl font-bold text-text-primary mb-6">Examples:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                  <div>
                    <p className="text-base md:text-[17px] font-normal text-text-color70 leading-relaxed mb-5">
                      Lectures on Tap in NYC brings professors and experts into bars for 40-minute talks on topics like philosophy, hip-hop culture, or quantum physics—selling out within hours. Learning becomes social, accessible, and woven into nightlife rather than confined to lecture halls.
                    </p>
                    <div className="mb-5">
                      <div className="rounded-xl overflow-hidden mb-2">
                        <OptimizedImage
                          src={`${BASE}/int-lectures-on-tap.png`}
                          alt="Lectures on Tap event at a bar in NYC"
                          width={600}
                          height={400}
                          className="w-full h-auto block"
                        />
                      </div>
                      <p className="text-sm font-normal" style={{ color: 'rgb(var(--color-text-tertiary))' }}>Lectures on Tap, NYC</p>
                    </div>
                    <h4 className="text-base md:text-[17px] font-bold text-text-primary mb-3">Why this works?</h4>
                    <ul className="space-y-2 list-disc list-outside pl-5">
                      <li className="text-base md:text-[17px] font-normal leading-relaxed" style={{ color: 'rgb(var(--color-text-secondary))' }}>
                        <span className="font-semibold" style={{ color: 'rgb(var(--color-case-study-purple))' }}>Removes intimidation barriers:</span>{' '}
                        Learning happens where you&apos;re already comfortable, no need to enter formal academic or corporate spaces
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-base md:text-[17px] font-normal text-text-color70 leading-relaxed mb-5">
                      NYC community gardens run through collective stewardship—members rotate tasks, take turns serving as &ldquo;garden coordinator,&rdquo; and make decisions together to manage the space.
                    </p>
                    <div className="mb-5">
                      <div className="rounded-xl overflow-hidden mb-2">
                        <OptimizedImage
                          src={`${BASE}/int-community-garden.png`}
                          alt="NYC community garden with raised beds"
                          width={600}
                          height={400}
                          className="w-full h-auto block"
                        />
                      </div>
                      <p className="text-sm font-normal" style={{ color: 'rgb(var(--color-text-tertiary))' }}>NYC Community Garden</p>
                    </div>
                    <h4 className="text-base md:text-[17px] font-bold text-text-primary mb-3">Why this works?</h4>
                    <ul className="space-y-2 list-disc list-outside pl-5">
                      {[
                        { label: 'Builds ownership:', text: 'Rotating roles mean more residents gain leadership experience rather than power concentrating in a few hands' },
                        { label: 'Maintains Accountability:', text: 'Collective decision-making create transparency; residents see their input matter' },
                      ].map((b, i) => (
                        <li key={i} className="text-base md:text-[17px] font-normal leading-relaxed" style={{ color: 'rgb(var(--color-text-secondary))' }}>
                          <span className="font-semibold" style={{ color: 'rgb(var(--color-case-study-purple))' }}>{b.label}</span>{' '}{b.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* ── Intervention 3: Micro-Rituals ─────────────────── */}
              <div className="mb-20 md:mb-28">
                <h3 className="text-2xl md:text-[34px] font-bold text-text-primary mb-3">
                  3. Micro-Rituals
                </h3>
                <p className="text-base md:text-[17px] mb-10 md:mb-14" style={{ color: 'rgb(var(--color-text-secondary))' }}>
                  Small, repeating rituals between major events that transform strangers into regulars who feel their presence matters
                </p>
                <div className="flex flex-col md:flex-row md:items-start md:gap-10 mb-10 md:mb-14">
                  <div className="w-full md:w-[280px] flex-shrink-0 mb-8 md:mb-0">
                    <OptimizedImage
                      src={`${BASE}/int-micro-rituals.png`}
                      alt="Micro-Rituals isometric"
                      width={280}
                      height={210}
                      className="w-full h-auto block"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-base md:text-[17px] text-text-primary mb-4">Some ways this can be adopted by Woven City:</p>
                    <ul className="space-y-3 list-disc list-outside pl-5">
                      {[
                        'Daily micro-rituals (morning warm-up circle, evening potluck corner)',
                        'Weekly rotating skill-swaps (like "city-wide makers hour")',
                        'Create "playful" collaborative experiences around the city, encouraging ritual based experiences',
                      ].map((b, i) => (
                        <li key={i} className="text-base md:text-[17px] font-normal leading-relaxed" style={{ color: 'rgb(var(--color-text-secondary))' }}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 md:mb-16">
                  <ResearchCard text="Rituals create predictability, trust and comfort which creates participation" />
                  <ImpactCard text="Rituals create cultural glue between districts — shared identity → shared behaviors → collaborative momentum." />
                </div>
                <h4 className="text-lg md:text-xl font-bold text-text-primary mb-4">Example:</h4>
                <p className="text-base md:text-[17px] font-normal text-text-color70 leading-relaxed mb-6">
                  Ogden&apos;s End, a community garden we visited holds regular micro-rituals throughout the year like Winter Tea Party, Plant Swaps, Pepperpalooza, Garden Crawls. These create a predictable rhythm where participation becomes habitual.
                </p>
                <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8">
                  <div>
                    <div className="rounded-xl overflow-hidden mb-2">
                      <OptimizedImage
                        src={`${BASE}/int-winter-tea.png`}
                        alt="Winter Tea Party flyer"
                        width={300}
                        height={400}
                        className="w-full h-auto block"
                      />
                    </div>
                    <p className="text-sm font-normal" style={{ color: 'rgb(var(--color-text-tertiary))' }}>Winter Tea Party</p>
                  </div>
                  <div>
                    <div className="rounded-xl overflow-hidden mb-2">
                      <OptimizedImage
                        src={`${BASE}/int-pepperpalooza.png`}
                        alt="Pepperpalooza flyer"
                        width={300}
                        height={400}
                        className="w-full h-auto block"
                      />
                    </div>
                    <p className="text-sm font-normal" style={{ color: 'rgb(var(--color-text-tertiary))' }}>Pepperpalooza</p>
                  </div>
                  <div>
                    <div className="rounded-xl overflow-hidden mb-2">
                      <OptimizedImage
                        src={`${BASE}/int-plant-swap.png`}
                        alt="Plant Swap flyer"
                        width={300}
                        height={400}
                        className="w-full h-auto block"
                      />
                    </div>
                    <p className="text-sm font-normal" style={{ color: 'rgb(var(--color-text-tertiary))' }}>Plant Swap</p>
                  </div>
                </div>
                <h4 className="text-lg md:text-xl font-bold text-text-primary mb-4">Why this works?</h4>
                <ul className="space-y-3 list-disc list-outside pl-5">
                  {[
                    { label: 'Lowers participation barriers:', text: 'Small events feel manageable, you can miss one and catch the next, no guilt or pressure, making it easier to show up when you can.' },
                    { label: 'Sustains connection between big moments:', text: 'Frequent micro events keep people engaged during quiet periods, preventing the community from going dormant between major events.' },
                    { label: 'Makes tradition through doing:', text: 'After doing the same ritual 2-3 times, it becomes "what we do here"—It organically gives rise to community traditions.' },
                    { label: 'Builds identity through repetition:', text: 'Attending smaller events frequently, makes you a "regular", your presence becomes valued in the community.' },
                  ].map((b, i) => (
                    <li key={i} className="text-base md:text-[17px] font-normal leading-relaxed" style={{ color: 'rgb(var(--color-text-secondary))' }}>
                      <span className="font-semibold" style={{ color: 'rgb(var(--color-case-study-purple))' }}>{b.label}</span>{' '}{b.text}
                    </li>
                  ))}
                </ul>
              </div>

              {/* ── Intervention 4: Common Banks ──────────────────── */}
              <div className="mb-20 md:mb-28">
                <h3 className="text-2xl md:text-[34px] font-bold text-text-primary mb-3">
                  4. Common Banks
                </h3>
                <p className="text-base md:text-[17px] mb-10 md:mb-14" style={{ color: 'rgb(var(--color-text-secondary))' }}>
                  Low-barrier exchange systems where residents share resources without gatekeepers, schedules, or transactions. Built on trust and reciprocity rather than formal management.
                </p>
                <div className="flex flex-col md:flex-row md:items-start md:gap-10 mb-10 md:mb-14">
                  <div className="w-full md:w-[280px] flex-shrink-0 mb-8 md:mb-0">
                    <OptimizedImage
                      src={`${BASE}/int-common-bank.png`}
                      alt="Common Banks isometric"
                      width={280}
                      height={210}
                      className="w-full h-auto block"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-base md:text-[17px] text-text-primary mb-4">Some ways this can be adopted by Woven City:</p>
                    <ul className="space-y-3 list-disc list-outside pl-5">
                      {[
                        'tool banks (drills, ladders, gardening equipment) accessible to all',
                        'Skill swap boards where residents post availability without formal scheduling',
                        'Meal-sharing shelves for extra produce or prepared food',
                      ].map((b, i) => (
                        <li key={i} className="text-base md:text-[17px] font-normal leading-relaxed" style={{ color: 'rgb(var(--color-text-secondary))' }}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 md:mb-16">
                  <ResearchCard text="Trust forms through repeated, low-stakes exchanges rather than formal introductions." />
                  <ImpactCard text="Trust becomes part of the infrastructure, embedded in physical space that makes reciprocity visible and routine." />
                </div>
                <h4 className="text-lg md:text-xl font-bold text-text-primary mb-4">Examples:</h4>
                <p className="text-base md:text-[17px] font-normal text-text-color70 leading-relaxed mb-6">
                  Mujin Hanbaisho (shops without clerks) and Little Free Libraries both operate on trust: take what you need, leave what you can, no gatekeepers. Woven City could extend this to tools, seeds, skills, meals, and materials, building reciprocity through small exchanges
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
                  <div>
                    <div className="rounded-xl overflow-hidden mb-2">
                      <OptimizedImage
                        src={`${BASE}/int-japan-trust.png`}
                        alt="Mujin Hanbaisho roadside stand in Japan"
                        width={600}
                        height={400}
                        className="w-full h-auto block"
                      />
                    </div>
                    <p className="text-sm font-normal" style={{ color: 'rgb(var(--color-text-tertiary))' }}>Mujin Hanbaisho (unmanned shop), Japan</p>
                  </div>
                  <div>
                    <div className="rounded-xl overflow-hidden mb-2">
                      <OptimizedImage
                        src={`${BASE}/int-little-library.png`}
                        alt="Little Free Library red box"
                        width={600}
                        height={400}
                        className="w-full h-auto block"
                      />
                    </div>
                    <p className="text-sm font-normal" style={{ color: 'rgb(var(--color-text-tertiary))' }}>Little Free Library</p>
                  </div>
                </div>
                <h4 className="text-lg md:text-xl font-bold text-text-primary mb-4">Why this works?</h4>
                <ul className="space-y-3 list-disc list-outside pl-5">
                  {[
                    { label: 'Removes friction:', text: 'No commitment, no reservations, no tracking who owes what' },
                    { label: 'Builds ambient trust:', text: 'Small acts of reciprocity create social fabric before people even meet' },
                  ].map((b, i) => (
                    <li key={i} className="text-base md:text-[17px] font-normal leading-relaxed" style={{ color: 'rgb(var(--color-text-secondary))' }}>
                      <span className="font-semibold" style={{ color: 'rgb(var(--color-case-study-purple))' }}>{b.label}</span>{' '}{b.text}
                    </li>
                  ))}
                </ul>
              </div>

              <Divider />

              {/* ─── CONCLUSION ─────────────────────────────────────── */}
              <SectionTitle>Conclusion</SectionTitle>
              <p className="text-base md:text-[18px] font-normal text-text-color70 leading-relaxed">
                The central challenge facing Woven City—and innovation communities worldwide, is how to design spaces where authentic collaboration emerges organically. Our ethnographic research across NYC&apos;s third spaces reveals that the answer lies in mundane infrastructure that supports everyday human connection. Our nine-element framework and four design recommendations are easy to implement and can work not just for Woven City, but for communities anywhere.
              </p>

              <Divider />

              {/* The End */}
              <div className="py-8 md:py-12">
                <h3
                  className="text-3xl md:text-[48px] font-bold uppercase tracking-[-0.02em] mb-6 md:mb-8"
                  style={{ color: 'rgb(var(--color-case-study-purple))' }}
                >
                  The End
                </h3>
                <p className="text-xl md:text-case-heading font-bold text-text-primary">
                  Thank you for reading this case study
                </p>
              </div>
        </CaseStudyReadMore>
      </div>
    </m.section>
  )
}
