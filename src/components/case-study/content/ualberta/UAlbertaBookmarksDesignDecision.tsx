import { AnimatedText } from '@/components/ui/AnimatedText'
import {
  CASE_STUDY_BODY_LEADING,
  CASE_STUDY_NARRATIVE_SECTION_GAP,
  CASE_STUDY_SECTION_HEADLINE_SPACED,
  CASE_STUDY_SECTION_LABEL_PROSE,
} from '@/components/case-study/caseStudyTypography'

const PROSE_MAX = 'max-w-[680px]'
const SECTION_LABEL = CASE_STUDY_SECTION_LABEL_PROSE
const HEADLINE_MD = `${CASE_STUDY_SECTION_HEADLINE_SPACED} ${PROSE_MAX}`
const BODY_MUTED = `text-base md:text-[18px] font-normal ${CASE_STUDY_BODY_LEADING} ${PROSE_MAX}`

export function UAlbertaBookmarksDesignDecision() {
  return (
    <div className={CASE_STUDY_NARRATIVE_SECTION_GAP}>
      <h3
        id="ualberta-bookmarks-design-decision-heading"
        className={SECTION_LABEL}
        style={{ color: 'rgb(var(--color-text-tertiary))' }}
      >
        Design decision
      </h3>

      <AnimatedText
        variant="heading"
        text="Bookmarks over visit tracking — scoping personalization to what ships"
        animationType="fadeIn"
        alwaysAnimate={false}
        delay={0}
        className={HEADLINE_MD}
      />

      <p className={`${BODY_MUTED} mb-4`} style={{ color: 'rgb(var(--color-text-color90))' }}>
        Early iterations included <strong className="font-semibold text-text-primary">Last visited</strong>{' '}
        and <strong className="font-semibold text-text-primary">Frequently visited</strong> tabs —
        personalized lists built from browsing history. We removed them from the final
        recommendation and kept <strong className="font-semibold text-text-primary">bookmarks</strong>{' '}
        instead.
      </p>

      <p className={`${BODY_MUTED} mb-4`} style={{ color: 'rgb(var(--color-text-color90))' }}>
        Visit tracking would require event logging, tying activity to campus accounts (SSO), and a
        privacy review under <strong className="font-semibold text-text-primary">FIPPA</strong> —
        Alberta&apos;s public-sector data law. For a public library site, that implementation
        overhead did not justify the payoff: most students already use search, the popular-services
        hero, or audience filters to find what they need.
      </p>

      <p className={BODY_MUTED} style={{ color: 'rgb(var(--color-text-color90))' }}>
        Bookmarks give users an explicit, opt-in shortcut list with no background tracking. They can
        ship with simple <strong className="font-semibold text-text-primary">client-side storage</strong>{' '}
        first and sync to a profile later if the library adds authenticated personalization.
      </p>
    </div>
  )
}
