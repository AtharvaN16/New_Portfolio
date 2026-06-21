import { HERO_F1_ENTRY_MS, HERO_NAV_GLOW_FADE_LEAD_MS } from '@/components/hero/hero-entry-timing'

/** Mirrors `approxTopEdge` in `waterBlob.shader.ts` during F1 plasma (revealPhase = 0). */
export const FLASH_TRAIL_HEAD_OFFSET = 0.52
export const FLASH_PLASMA_CENTER_Y = 0.47
export const FLASH_PLASMA_MAX_CENTER_OFFSET = 0.06
export const HERO_FLASH_HEAD_EVENT = 'hero:flash-head'

/** Active flash-head updates dispatch every N rAF frames (~20/sec at 60fps). */
export const FLASH_HEAD_DISPATCH_FRAME_INTERVAL = 2

let flashHeadDispatchFrame = 0

/** Matches `isQuick` rise lerp in `WaterBlob.tsx` (per animation frame). */
export const FLASH_QUICK_RISE_RATE = 0.06
export const FLASH_ANIMATION_FPS = 60

/** Glow level when logo was visible — direct live sync. */
export const NAV_FLASH_GLOW_FALLOFF_PX = 140

/** Exponential tau — legacy; prefer ease-out fade over `HERO_NAV_GLOW_FADE_LEAD_MS`. */
export const NAV_FLASH_DECAY_MS = Math.round(HERO_NAV_GLOW_FADE_LEAD_MS / 3.33)

/** Full-brightness plateau once fade phase begins, then ease-out to zero. */
export const NAV_FLASH_FADE_PLATEAU_MS = 400

/** Ghost pulse yOffset range during F1 rise. */
export const FLASH_Y_OFFSET_START = -1.5
export const FLASH_Y_OFFSET_END = 0

export interface HeroFlashHeadDetail {
  headScreenY: number
  yOffset: number
  trail: number
  active: boolean
}

export function computeFlashHeadUvY(yOffset: number): number {
  const maxCenterY = FLASH_PLASMA_CENTER_Y + yOffset + FLASH_PLASMA_MAX_CENTER_OFFSET
  return maxCenterY + FLASH_TRAIL_HEAD_OFFSET
}

/**
 * Map the shader head sweep to full viewport height so glow reaches the navbar
 * above the blob canvas — as if the flash traveled the entire page.
 */
export function flashHeadScreenYFromSweep(
  yOffset: number,
  viewportHeight: number
): number {
  const headStart = computeFlashHeadUvY(FLASH_Y_OFFSET_START)
  const headEnd = computeFlashHeadUvY(FLASH_Y_OFFSET_END)
  const headUvY = computeFlashHeadUvY(yOffset)
  const progress = (headUvY - headStart) / (headEnd - headStart)
  const clamped = Math.max(0, Math.min(1, progress))
  return viewportHeight * (1 - clamped)
}

/** yOffset when the F1 head reaches a given viewport Y. */
export function yOffsetForHeadScreenY(
  headScreenY: number,
  viewportHeight: number
): number {
  const headStart = computeFlashHeadUvY(FLASH_Y_OFFSET_START)
  const headEnd = computeFlashHeadUvY(FLASH_Y_OFFSET_END)
  const progress = 1 - headScreenY / viewportHeight
  const clamped = Math.max(0, Math.min(1, progress))
  const headUvY = headStart + clamped * (headEnd - headStart)
  return (
    headUvY -
    FLASH_PLASMA_CENTER_Y -
    FLASH_PLASMA_MAX_CENTER_OFFSET -
    FLASH_TRAIL_HEAD_OFFSET
  )
}

/**
 * Ms from F1 loop start until head reaches `targetScreenY`,
 * using the same 0.06/frame exponential rise as WaterBlob.
 */
export function f1MsUntilHeadReachesScreenY(
  targetScreenY: number,
  viewportHeight: number,
  fps = FLASH_ANIMATION_FPS
): number {
  const targetYOffset = yOffsetForHeadScreenY(targetScreenY, viewportHeight)
  let yOffset = FLASH_Y_OFFSET_START
  let frame = 0
  const frameMs = 1000 / fps

  while (yOffset < targetYOffset - 0.0005 && frame < 600) {
    yOffset += (FLASH_Y_OFFSET_END - yOffset) * FLASH_QUICK_RISE_RATE
    frame++
  }

  return frame * frameMs
}

/** Page-load ms when F1 head hits an element center (entry delay + sweep). */
export function f1PageMsUntilNavbarGlow(
  elementCenterY: number,
  viewportHeight: number
): number {
  return (
    HERO_F1_ENTRY_MS +
    f1MsUntilHeadReachesScreenY(elementCenterY, viewportHeight)
  )
}

/** Pixels the flash head moves upward per animation frame at a given yOffset. */
export function flashHeadScreenYPxPerFrame(
  yOffset: number,
  viewportHeight: number
): number {
  const headSpan = computeFlashHeadUvY(FLASH_Y_OFFSET_END) - computeFlashHeadUvY(FLASH_Y_OFFSET_START)
  const dyOffset = (FLASH_Y_OFFSET_END - yOffset) * FLASH_QUICK_RISE_RATE
  const dProgress = dyOffset / headSpan
  return Math.abs(viewportHeight * dProgress)
}

/** How long F1 takes to sweep across a navbar band (ms), from rise speed. */
export function flashNavbarPassDurationMs(
  navbarBandHeight: number,
  viewportHeight: number,
  yOffsetAtNavbar: number = -0.08
): number {
  const pxPerFrame = flashHeadScreenYPxPerFrame(yOffsetAtNavbar, viewportHeight)
  if (pxPerFrame <= 0) return 0
  return (navbarBandHeight / pxPerFrame) * (1000 / FLASH_ANIMATION_FPS)
}

/** Map shader UV Y (0 = canvas bottom) to viewport screen Y within the canvas. */
export function flashHeadScreenY(
  headUvY: number,
  canvasRect: Pick<DOMRect, 'top' | 'bottom' | 'height'>
): number {
  return canvasRect.bottom - headUvY * canvasRect.height
}

/** Direct live intensity — pre film-develop, when logo glow was visible. */
export function computeNavFlashIntensity(
  headScreenY: number,
  targetRect: Pick<DOMRect, 'top' | 'bottom'>,
  trail: number,
  falloffPx = NAV_FLASH_GLOW_FALLOFF_PX
): number {
  if (trail <= 0.001) return 0
  const centerY = (targetRect.top + targetRect.bottom) / 2
  const distance = Math.abs(headScreenY - centerY)
  return Math.exp(-distance / falloffPx) * trail
}

/** Slow fade after F1 exits. */
export function developNavFlashDecay(current: number, deltaMs: number): number {
  if (deltaMs <= 0 || current <= 0.001) return 0
  const factor = 1 - Math.exp(-deltaMs / NAV_FLASH_DECAY_MS)
  return current * (1 - factor)
}

/** Ease-out cubic — slow initial fall, finishes at zero. */
export function easeOutCubic(t: number): number {
  const clamped = Math.max(0, Math.min(1, t))
  return 1 - Math.pow(1 - clamped, 3)
}

/**
 * Gentle logo fade: hold peak, then ease-out to zero by `fadeDurationMs`.
 * Avoids the steep early drop of raw exponential decay.
 */
export function fadeNavFlashIntensity(
  peak: number,
  elapsedMs: number,
  fadeDurationMs: number,
  plateauMs = NAV_FLASH_FADE_PLATEAU_MS
): number {
  if (peak <= 0.001 || elapsedMs <= 0) return peak
  if (elapsedMs >= fadeDurationMs) return 0
  if (elapsedMs < plateauMs) return peak

  const fadeSpan = Math.max(1, fadeDurationMs - plateauMs)
  const t = (elapsedMs - plateauMs) / fadeSpan
  return peak * (1 - easeOutCubic(t))
}

export function navFlashFilterGlow(intensity: number): string {
  if (intensity <= 0.003) return 'none'
  const alpha = Math.min(1, intensity * 1.6)
  const blur = Math.round(12 + intensity * 32)
  const core = Math.round(3 + intensity * 8)
  const bright = (1 + intensity * 0.55).toFixed(2)
  const soft = (alpha * 0.95).toFixed(3)
  const hot = (alpha * 0.65).toFixed(3)
  return [
    `brightness(${bright})`,
    `drop-shadow(0 0 ${blur}px rgba(255,255,255,${soft}))`,
    `drop-shadow(0 0 ${core}px rgba(255,255,255,${hot}))`,
  ].join(' ')
}

export function navFlashTextGlow(intensity: number): string {
  if (intensity <= 0.01) return 'none'
  const alpha = Math.min(1, intensity * 1.5)
  const blur = Math.round(10 + intensity * 28)
  const core = Math.round(3 + intensity * 8)
  return [
    `0 0 ${blur}px rgba(255,255,255,${(alpha * 0.9).toFixed(3)})`,
    `0 0 ${core}px rgba(255,255,255,${(alpha * 0.6).toFixed(3)})`,
  ].join(', ')
}

export function dispatchHeroFlashHead(
  yOffset: number,
  trail: number,
  active = true
): void {
  if (typeof window === 'undefined') return

  const viewportHeight = window.innerHeight
  const headScreenY = flashHeadScreenYFromSweep(yOffset, viewportHeight)
  const detail: HeroFlashHeadDetail = { headScreenY, yOffset, trail, active }

  if (!active || trail <= 0.001) {
    flashHeadDispatchFrame = 0
    window.dispatchEvent(
      new CustomEvent<HeroFlashHeadDetail>(HERO_FLASH_HEAD_EVENT, { detail })
    )
    return
  }

  flashHeadDispatchFrame += 1
  if (flashHeadDispatchFrame % FLASH_HEAD_DISPATCH_FRAME_INTERVAL !== 0) {
    return
  }

  window.dispatchEvent(
    new CustomEvent<HeroFlashHeadDetail>(HERO_FLASH_HEAD_EVENT, { detail })
  )
}

export function clearHeroFlashHead(): void {
  dispatchHeroFlashHead(0, 0, false)
}
