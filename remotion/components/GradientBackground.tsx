import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion'
import { GRAD_CSS } from '../constants'

export function GradientBackground() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // Slow radial shimmer: a subtle opacity-pulsing overlay at 8s cycle
  const shimmerProgress = (frame % (fps * 8)) / (fps * 8)
  const shimmerOpacity = 0.06 + 0.06 * Math.sin(shimmerProgress * Math.PI * 2)

  return (
    <AbsoluteFill style={{ background: GRAD_CSS }}>
      {/* Shimmer overlay — two radial gradients that breathe */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at 25% 65%, rgba(54,164,89,${shimmerOpacity * 4}) 0%, transparent 55%),
                       radial-gradient(ellipse at 72% 28%, rgba(34,84,50,${shimmerOpacity * 5}) 0%, transparent 50%)`,
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  )
}
