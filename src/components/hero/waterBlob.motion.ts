export const WATER_BLOB_REFERENCE_FPS = 60

const MAX_DELTA_FRAMES = 4

export function deltaFramesFromMs(deltaMs: number): number {
  const frameMs = 1000 / WATER_BLOB_REFERENCE_FPS
  return Math.max(0, Math.min(MAX_DELTA_FRAMES, deltaMs / frameMs))
}

export function lerpByReferenceFrames(
  current: number,
  target: number,
  perFrameRate: number,
  deltaFrames: number
): number {
  const frameAdjustedRate = 1 - Math.pow(1 - perFrameRate, deltaFrames)
  return current + (target - current) * frameAdjustedRate
}

export function multiplyByReferenceFrames(
  current: number,
  perFrameDecay: number,
  deltaFrames: number
): number {
  return current * Math.pow(perFrameDecay, deltaFrames)
}
