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
}

export interface Colors {
  blue: [number, number, number]
  purple: [number, number, number]
  pink: [number, number, number]
  background: [number, number, number]
}

export interface WebGLProgramInfo {
  program: WebGLProgram
  uTimeLocation: WebGLUniformLocation | null
  uIsDarkModeLocation: WebGLUniformLocation | null
  uIsMobileLocation: WebGLUniformLocation | null
  uColor1Location: WebGLUniformLocation | null
  uColor2Location: WebGLUniformLocation | null
  uColor3Location: WebGLUniformLocation | null
  uBackgroundColorLocation: WebGLUniformLocation | null
  uYOffsetLocation: WebGLUniformLocation | null
  posBuffer: WebGLBuffer | null
  vertShader: WebGLShader
  fragShader: WebGLShader
}

export const ANIMATION_SPEED_MULTIPLIER_ENHANCED = 1.5
export const ANIMATION_SPEED_MULTIPLIER_NORMAL = 1.0
export const ENHANCED_CONTRAST = 1.1
export const ENHANCED_SATURATION = 1.15
export const COLOR_LERP_SPEED = 0.045 // Per-frame lerp factor: ~75% at 0.5s, ~95% at 1s @ 60fps
