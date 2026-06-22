/**
 * Type definitions for WaterBlob component
 */

export interface WaterBlobProps {
  className?: string
  /** Enable enhanced dynamics for smaller spaces (faster motion, more turbulence) */
  enhanced?: boolean
  /** Enable click interaction for color cycling and wave effects */
  interactive?: boolean
  /** Pause the animation (for performance when not visible) */
  paused?: boolean
  /** Delay in milliseconds before the entry animation starts */
  entryDelay?: number
  /** If true, the blob stays in plasma state and fades out after rising */
  isGhost?: boolean
  /** If true, the entry/fade sequence is accelerated for quick pulses */
  isQuick?: boolean
  /** Starting palette index (shared by F1 ghost + interactive blob on load) */
  initialPaletteIndex?: number
  /** Delay WebGL context creation until this many ms after mount (desktop F2) */
  webglInitDelay?: number
}

export interface Colors {
  /** Blob 1 / gradient start (uColor1) */
  primary: [number, number, number]
  /** Blob 2 / gradient end (uColor2) */
  secondary: [number, number, number]
  background: [number, number, number]
}

export interface WebGLProgramInfo {
  program: WebGLProgram
  uTimeLocation: WebGLUniformLocation | null
  uIsMobileLocation: WebGLUniformLocation | null
  uColor1Location: WebGLUniformLocation | null
  uColor2Location: WebGLUniformLocation | null
  uBackgroundColorLocation: WebGLUniformLocation | null
  uYOffsetLocation: WebGLUniformLocation | null
  uRevealPhaseLocation: WebGLUniformLocation | null
  uAmbientLocation: WebGLUniformLocation | null
  uTrailLocation: WebGLUniformLocation | null
  posBuffer: WebGLBuffer | null
  vertShader: WebGLShader
  fragShader: WebGLShader
}

export const ANIMATION_SPEED_MULTIPLIER_ENHANCED = 1.5
export const ANIMATION_SPEED_MULTIPLIER_NORMAL = 1.0
export const ENHANCED_CONTRAST = 1.1
export const ENHANCED_SATURATION = 1.15
export const COLOR_LERP_SPEED = 0.045 // Per-frame lerp factor: ~75% at 0.5s, ~95% at 1s @ 60fps
/** Gentle palette crossfade for desktop interactive cycling (~5s at 60fps). */
export const PALETTE_COLOR_LERP_SPEED = 0.022
/** Hold time before auto-advancing to the next palette (desktop interactive). */
export const AUTO_CYCLE_HOLD_MS = 8_500
/** Toggle sequential palette auto-cycling on the interactive hero blob. Click-to-cycle still works. */
export const AUTO_PALETTE_CYCLE_ENABLED = false
