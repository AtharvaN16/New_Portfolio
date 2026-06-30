/**
 * Desktop hero entry timeline (milliseconds from page load).
 *
 * Mobile hero copy timings — keep in sync with Navbar.tsx + AnimatedHeroTextGSAP.
 */

/** F1 ghost flash starts */
export const HERO_F1_ENTRY_MS = 500

/** F1 visual crest after F1 loop begins */
export const HERO_F1_CREST_AFTER_ENTRY_MS = 334

export const HERO_F1_CREST_MS = HERO_F1_ENTRY_MS + HERO_F1_CREST_AFTER_ENTRY_MS

/** F2 permanent blobs start — tightened gap after F1 fades */
export const HERO_F2_ENTRY_MS = 1400

/** Dispatched when the interactive (F2) blob finishes reveal — cutout fill may apply after this */
export const HERO_BLOB_F2_SETTLED_EVENT = 'hero:blob-f2-settled'

export function dispatchHeroBlobF2Settled(): void {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent(HERO_BLOB_F2_SETTLED_EVENT))
}

/** Hero copy starts as F2 crests and begins settling */
export const HERO_F2_TEXT_OFFSET_MS = 1200

export const HERO_TEXT_DELAY_MS = HERO_F2_ENTRY_MS + HERO_F2_TEXT_OFFSET_MS

export const HERO_BIO_DELAY_S = HERO_TEXT_DELAY_MS / 1000

/** Desktop bio line-reveal duration — keep in sync with AnimatedHeroTextGSAP */
export const HERO_BIO_REVEAL_DURATION_S = 1.0

/** Pratt/meta line (desktop) */
export const HERO_CURRENTLY_DELAY_S = 2.9

export const HERO_CURRENTLY_DURATION_S = 1.0

/** Browse work + bottom row CTAs (desktop) */
export const HERO_CTA_DELAY_MS = 3400

export const HERO_CTA_DELAY_S = HERO_CTA_DELAY_MS / 1000

export const HERO_CTA_DURATION_S = 0.55

export const HERO_BROWSE_WORK_DELAY_S = HERO_CTA_DELAY_S

export const HERO_BROWSE_WORK_DELAY_MS = HERO_CTA_DELAY_MS

export const HERO_BOTTOM_ROW_DELAY_S = HERO_CTA_DELAY_S

/** Mobile menu button entry delay — keep in sync with Navbar.tsx */
export const NAVBAR_MOBILE_MENU_DELAY_S = 0.5

/** Bio blur-in starts this long after the menu button animation begins */
export const MOBILE_BIO_OFFSET_AFTER_MENU_S = 0.4

export const MOBILE_BIO_DELAY_S =
  NAVBAR_MOBILE_MENU_DELAY_S + MOBILE_BIO_OFFSET_AFTER_MENU_S

/**
 * Logo glow: F1 lights the navbar, brief hold, then ease-out fade.
 * F1 reaches navbar ~1.25s; fade must not start before that.
 */
export const HERO_NAV_GLOW_FIRST_LIGHT_MS = 1250

/** Total visible glow from first light to fully off */
export const HERO_NAV_GLOW_TOTAL_MS = 1400

export const HERO_NAV_GLOW_HOLD_MS = 50

export const HERO_NAV_GLOW_FADE_START_MS =
  HERO_F2_ENTRY_MS + HERO_NAV_GLOW_HOLD_MS

export const HERO_NAV_GLOW_END_MS =
  HERO_NAV_GLOW_FIRST_LIGHT_MS + HERO_NAV_GLOW_TOTAL_MS

export const HERO_NAV_GLOW_FADE_LEAD_MS =
  HERO_NAV_GLOW_END_MS - HERO_NAV_GLOW_FADE_START_MS

/** Set to true to show F1 welcome text in the water blob frame */
export const HERO_FLASH_WELCOME_ENABLED = false

/** Bottom-left welcome copy during F1 */
export const HERO_FLASH_WELCOME_TEXT = 'welcom to my portfolio :)'

export const HERO_FLASH_BEAT_DELAY_S = HERO_F1_ENTRY_MS / 1000

export const HERO_FLASH_BEAT_DURATION_S = 0.9
