'use client'

import { m } from 'framer-motion'
import { CaseStudyReadMore } from '@/components/case-study/CaseStudyReadMore'
import { AnimatedQuote } from '@/components/ui/AnimatedQuote'
import { AnimatedTitle } from '@/components/ui/AnimatedTitle'

const CUNARD_RED = '#9B2335'
const CUNARD_GOLD = '#A39458'

interface AquitaniaContentProps {
  isContentRevealed: boolean
  onToggleContent: () => void
  progressBarColor?: string
}

function PlaceholderImage({
  label,
  aspect = 'aspect-[16/9]',
  bg = 'bg-[#1a1a2e]',
}: {
  label: string
  aspect?: string
  bg?: string
}) {
  return (
    <div
      className={`relative w-full ${aspect} ${bg} flex items-center justify-center overflow-hidden`}
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(163,148,88,0.3) 20px, rgba(163,148,88,0.3) 21px)',
        }} />
      </div>
      <p className="relative z-10 text-xs font-mono uppercase tracking-widest text-white/40 text-center px-4">
        {label}
      </p>
    </div>
  )
}

function PrincipleCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="flex flex-col gap-3 p-6 border" style={{ borderColor: 'rgb(var(--color-text-color10))' }}>
      <p className="text-sm font-mono uppercase tracking-widest" style={{ color: CUNARD_GOLD }}>{number}</p>
      <h4 className="text-lg md:text-xl font-bold text-text-primary">{title}</h4>
      <p className="text-sm md:text-base text-text-color70 leading-relaxed">{description}</p>
    </div>
  )
}

export function AquitaniaContent({
  isContentRevealed,
  onToggleContent,
  progressBarColor = CUNARD_RED,
}: AquitaniaContentProps) {
  return (
    <m.section
      data-section="aquitania-case-study-root"
      className="w-full px-6 2xl:px-[140px] py-16 md:py-24 max-w-[1920px] mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <div className="max-w-[1044px] mx-auto text-left">
        {/* Abstract */}
        <h3 className="text-lg md:text-[28px] font-bold text-text-primary mb-6 md:mb-[28px]">Abstract</h3>
        <div className="space-y-6 md:space-y-8">
          <p className="text-base md:text-[18px] font-normal text-text-color70 leading-relaxed">
            Cunard has sailed the world since 1839 — a name synonymous with rich heritage, timeless luxury,
            and meticulous attention to detail. Yet its digital experience told a different story: inconsistent
            typography, overcrowded layouts, and accessibility gaps that undercut everything the brand stood for.
          </p>
          <p className="text-base md:text-[18px] font-normal text-text-color70 leading-relaxed">
            For INFO 672 — UX Design Systems at Pratt Institute, our team of four designed the Aquitania Design
            System V1: a cohesive, accessible, and luxurious foundation to finally close the gap between
            Cunard&apos;s physical and digital brand experience.
          </p>
        </div>

        <CaseStudyReadMore
          readTime="10 min read"
          isContentRevealed={isContentRevealed}
          onToggleContent={onToggleContent}
        >
          <div className="space-y-16 md:space-y-24">

            {/* Hero headline */}
            <div>
              <AnimatedTitle
                text="When the brand feels premium but the website doesn't"
                animationType="fadeInUp"
                variant="wide"
                className="text-2xl md:text-[40px] font-bold text-text-primary leading-tight tracking-[-0.05em]"
              />
            </div>

            {/* The Brand Gap */}
            <section className="space-y-8">
              <h3 className="text-lg md:text-[28px] font-bold text-text-primary">The Brand Gap</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
                <div className="space-y-6">
                  <p className="text-base md:text-[18px] text-text-color70 leading-relaxed">
                    Cunard&apos;s physical experience — the white-glove service, the Queen Mary 2, the
                    Cormorant Garamond signage — is unmistakably premium. We boarded the digital product
                    and found something else entirely.
                  </p>
                  <ul className="space-y-3">
                    {[
                      'Inconsistent typography across every page',
                      'Overcrowded layouts with no visual hierarchy',
                      'Interactive states that varied component to component',
                      'Icon buttons with no accessible labels',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-base text-text-color70 leading-relaxed">
                        <svg className="mt-[0.42em] h-2 w-2 shrink-0" viewBox="0 0 8 8" aria-hidden>
                          <circle cx="4" cy="4" r="4" fill={progressBarColor} />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <PlaceholderImage label="Cunard.com — before Aquitania" aspect="aspect-[4/3]" bg="bg-neutral-800" />
              </div>

              <div className="mt-6">
                <AnimatedQuote
                  className="text-xl md:text-[28px] font-bold tracking-[-0.02em] text-text-primary"
                  segments={[
                    { text: '“All of this goes AGAINST' },
                    { text: 'what our passengers expect from Cunard.”', color: CUNARD_RED },
                  ]}
                />
              </div>
            </section>

            <div className="border-t" style={{ borderColor: 'rgb(var(--color-text-color10))' }} />

            {/* Four Design Principles */}
            <section className="space-y-8">
              <div>
                <p className="text-xs md:text-sm font-semibold uppercase tracking-widest text-text-color70 mb-4">Framework</p>
                <h3 className="text-lg md:text-[28px] font-bold text-text-primary">Four Design Principles</h3>
                <p className="mt-4 text-base md:text-[18px] text-text-color70 leading-relaxed max-w-2xl">
                  Every decision in Aquitania traces back to one of four guiding principles — each chosen
                  because Cunard&apos;s existing product failed at it.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <PrincipleCard number="01" title="Accessible" description="Proper color contrast, touch target sizing, focus states, and labeled interactive elements — baseline standards the existing site routinely missed." />
                <PrincipleCard number="02" title="Consistent" description="A single token-based system for color, type, and spacing so that no two pages ever use the same component differently again." />
                <PrincipleCard number="03" title="Luxurious" description="Visual decisions — type choices, whitespace, gold accents — that reflect the Cunard passenger's expectation of timeless elegance." />
                <PrincipleCard number="04" title="Discoverable" description="Clear hierarchy and concise labeling so that booking a voyage — Cunard's core conversion — is never more than a few confident clicks away." />
              </div>
            </section>

            <div className="border-t" style={{ borderColor: 'rgb(var(--color-text-color10))' }} />

            {/* What We Built */}
            <section className="space-y-12">
              <h3 className="text-lg md:text-[28px] font-bold text-text-primary">What We Built</h3>

              {/* Color */}
              <div className="space-y-4">
                <p className="text-sm font-mono uppercase tracking-widest text-text-color70">Color System</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  <div className="space-y-4">
                    <p className="text-base md:text-[18px] text-text-color70 leading-relaxed">
                      Cunard&apos;s brand centers on two colors — Cunard Red and Gold — but the existing site
                      used 15+ unrelated hex values. We consolidated this into a systematic token scale:
                      11-step Red and Gold brand ramps, plus warm and cool neutral families to support
                      every UI context.
                    </p>
                  </div>
                  <div className="space-y-2">
                    {[
                      { name: 'Cunard Red 500', hex: '#DA291C', label: 'Primary CTA, brand anchors' },
                      { name: 'Cunard Gold 500', hex: '#A39458', label: 'Dividers, decorative accents' },
                      { name: 'Neutral 900', hex: '#2B2B2B', label: 'Primary text' },
                    ].map(({ name, hex, label }) => (
                      <div key={name} className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded shrink-0 border border-black/10" style={{ backgroundColor: hex }} />
                        <div>
                          <p className="text-sm font-medium text-text-primary">{name}</p>
                          <p className="text-xs text-text-color70">{label}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Typography */}
              <div className="space-y-4">
                <p className="text-sm font-mono uppercase tracking-widest text-text-color70">Typography</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  <PlaceholderImage label="Typography specimen — Aquitania" aspect="aspect-[4/3]" bg="bg-[#F5EFE6]" />
                  <div className="space-y-6">
                    {[
                      { name: 'Cormorant Garamond', use: 'Hero headlines, editorial storytelling, voyage names' },
                      { name: 'Manrope', use: 'Body text, navigation, buttons, forms — everything functional' },
                      { name: 'Jet Brains Mono', use: 'Metadata, labels, dates, prices — subtle technical accents' },
                      { name: 'Bebas Neue', use: 'Promotional headings, highlights' },
                    ].map(({ name, use }) => (
                      <div key={name} className="space-y-1">
                        <p className="text-base font-bold text-text-primary">{name}</p>
                        <p className="text-sm text-text-color70 leading-relaxed">{use}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Components */}
              <div className="space-y-6">
                <p className="text-sm font-mono uppercase tracking-widest text-text-color70">Components</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <PlaceholderImage label="Accessible button system — 4 sizes × 2 variants × 5 states" aspect="aspect-[3/2]" />
                    <h4 className="text-base font-bold text-text-primary">Accessible Buttons</h4>
                    <p className="text-sm text-text-color70 leading-relaxed">
                      Primary and secondary variants in four sizes, with proper color contrast ratios,
                      minimum touch targets, and explicit focus indicators baked in at the component level.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <PlaceholderImage label="Voyage card system — consistent across all contexts" aspect="aspect-[3/2]" />
                    <h4 className="text-base font-bold text-text-primary">Voyage & Booking Cards</h4>
                    <p className="text-sm text-text-color70 leading-relaxed">
                      Standardized card anatomy with consistent label hierarchy, dividers, and
                      scannable metadata — replacing the nine different card layouts found in the original.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <div className="border-t" style={{ borderColor: 'rgb(var(--color-text-color10))' }} />

            {/* Before / After */}
            <section className="space-y-8">
              <div>
                <p className="text-xs md:text-sm font-semibold uppercase tracking-widest text-text-color70 mb-4">
                  Before &amp; After
                </p>
                <h3 className="text-lg md:text-[28px] font-bold text-text-primary">Aquitania in Action</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <p className="text-xs font-mono uppercase tracking-widest text-text-color70">Original</p>
                  <PlaceholderImage label="Original Cunard homepage — overcrowded, inconsistent" aspect="aspect-[3/4]" bg="bg-neutral-700" />
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-mono uppercase tracking-widest" style={{ color: CUNARD_GOLD }}>With Aquitania</p>
                  <PlaceholderImage label="Redesigned homepage — cleaner, more premium" aspect="aspect-[3/4]" bg="bg-[#1a1a2e]" />
                </div>
              </div>
              <AnimatedQuote
                className="text-xl md:text-[28px] font-bold tracking-[-0.02em] text-text-primary max-w-2xl"
                segments={[
                  { text: 'A design system is a promise — it says' },
                  { text: 'every page will feel like the same brand.', color: CUNARD_RED },
                ]}
              />
            </section>

            <div className="border-t" style={{ borderColor: 'rgb(var(--color-text-color10))' }} />

            {/* Impact */}
            <section className="space-y-8">
              <h3 className="text-lg md:text-[28px] font-bold text-text-primary">Why It Matters</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: 'For the business', items: ['Faster designer → developer handoffs', 'Easier onboarding for new team members', 'Accessibility standards enforced at source'] },
                  { label: 'For the passenger', items: ['Trust built through visual cohesion', 'Faster path to booking a voyage', 'Inclusive experience for all users'] },
                ].map(({ label, items }) => (
                  <div key={label} className="space-y-4">
                    <p className="text-sm font-mono uppercase tracking-widest text-text-color70">{label}</p>
                    <ul className="space-y-3">
                      {items.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-base text-text-color70 leading-relaxed">
                          <svg className="mt-[0.42em] h-2 w-2 shrink-0" viewBox="0 0 8 8" aria-hidden>
                            <circle cx="4" cy="4" r="4" fill={CUNARD_GOLD} />
                          </svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </CaseStudyReadMore>
      </div>
    </m.section>
  )
}
