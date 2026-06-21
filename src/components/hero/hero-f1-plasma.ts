/**
 * F1 plasma entry — tuning reference
 *
 * The F1 ghost flash uses a fixed thermal rim in `waterBlob.shader.ts`
 * (classic red → orange → yellow → white → blue). Settled blobs use the
 * visit palette. To theme-match F1 later, pick a mode and adjust the levers below.
 */

export type HeroF1PlasmaMode = 'classic' | 'palette-derived' | 'palette-tinted'

/** Active F1 look. `classic` = original thermal rim regardless of visit palette. */
export const HERO_F1_PLASMA_MODE: HeroF1PlasmaMode = 'classic'

/**
 * F1 customization levers (all in `waterBlob.shader.ts` unless noted).
 *
 * 1. **Plasma mode** (`HERO_F1_PLASMA_MODE` here)
 *    - `classic` — fixed thermal stops (current OG look).
 *    - `palette-derived` — sweep uColor1 → uColor2 with plasmaBoost.
 *    - `palette-tinted` — classic thermal stops mixed ~30–50% toward palette anchors.
 *
 * 2. **Thermal stop colors** (shader: tRed, tOrange, tYellow, tWhite, tBlue)
 *    Per-palette overrides could map palette index → 5-stop gradient in TS, passed as uniforms.
 *
 * 3. **Stop positions** (shader: smoothstep thresholds 0.04–0.80)
 *    Wider bands = softer blend; tighter = sharper plasma edge.
 *
 * 4. **Brightness boost** (`plasmaBoost`: c * 1.22 + 0.06) — rim intensity for palette modes.
 *
 * 5. **Plasma alpha** (`smoothstep(0.02, 0.08, totalWater)`) — how quickly rim appears at blob edge.
 *
 * 6. **Reveal ease** (`revealEased` smoothstep) — F1 → settled crossfade timing vs rise physics.
 *
 * 7. **White trail** (`uTrail` block) — always white; could tint toward uColor1 for theme match.
 *
 * 8. **Ambient wash** (`uAmbient` + lightColor mix) — navbar glow inherits uColor1; already palette-aware.
 *
 * 9. **Entry timing** (`hero-entry-timing.ts`: HERO_F1_ENTRY_MS, rise rate in WaterBlob isQuick 0.06).
 *
 * 10. **Ghost fade** (WaterBlob ghostOpacity decrement 0.035/frame) — how long F1 lingers after crest.
 */
export const HERO_F1_PLASMA_TUNING = {
  mode: HERO_F1_PLASMA_MODE,
  /** For `palette-tinted`: 0 = classic only, 1 = full palette (shader mix factor). */
  paletteTintStrength: 0.35,
} as const
