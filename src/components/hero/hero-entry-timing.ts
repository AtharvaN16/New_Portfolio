/**
 * Desktop hero entry timeline (milliseconds from page load).
 *
 * Mobile uses separate hardcoded timings in Hero.tsx — do not change those here.
 */

/** F1 ghost flash starts */
export const HERO_F1_ENTRY_MS = 500

/** F1 visual crest after F1 loop begins */
export const HERO_F1_CREST_AFTER_ENTRY_MS = 334

export const HERO_F1_CREST_MS = HERO_F1_ENTRY_MS + HERO_F1_CREST_AFTER_ENTRY_MS

/** F2 permanent blobs start — tightened gap after F1 fades */
export const HERO_F2_ENTRY_MS = 1400

/** When F2 blobs have crested into view — before full plasma settle */
export const HERO_F2_CTA_OFFSET_MS = 1200

export const HERO_CTA_DELAY_MS = HERO_F2_ENTRY_MS + HERO_F2_CTA_OFFSET_MS

export const HERO_BIO_DELAY_S = HERO_F1_CREST_MS / 1000

/** Meta line follows bio reveal */
export const HERO_CURRENTLY_DELAY_S = HERO_BIO_DELAY_S + 0.35

export const HERO_CURRENTLY_DURATION_S = 1.0

export const HERO_CTA_DELAY_S = HERO_CTA_DELAY_MS / 1000

export const HERO_CTA_DURATION_S = 0.55

export const HERO_BROWSE_WORK_DELAY_S = HERO_CTA_DELAY_S

export const HERO_BROWSE_WORK_DELAY_MS = HERO_CTA_DELAY_MS

export const HERO_BOTTOM_ROW_DELAY_S = HERO_CTA_DELAY_S

/**
 * Logo glow: brief hold after F1 lights the logo, then fade finishes as bottom row enters.
 * F1 reaches navbar ~1.25s; fade must not start before that.
 */
export const HERO_NAV_GLOW_HOLD_MS = 200

export const HERO_NAV_GLOW_FADE_START_MS =
  HERO_F2_ENTRY_MS + HERO_NAV_GLOW_HOLD_MS

export const HERO_NAV_GLOW_FADE_LEAD_MS =
  HERO_CTA_DELAY_MS - HERO_NAV_GLOW_FADE_START_MS

/** Set to true to show F1 welcome text in the water blob frame */
export const HERO_FLASH_WELCOME_ENABLED = false

/** Bottom-left welcome copy during F1 */
export const HERO_FLASH_WELCOME_TEXT = 'welcom to my portfolio :)'

export const HERO_FLASH_BEAT_DELAY_S = HERO_F1_ENTRY_MS / 1000

export const HERO_FLASH_BEAT_DURATION_S = 0.9
