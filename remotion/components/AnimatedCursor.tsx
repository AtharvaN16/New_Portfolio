import { interpolate, useCurrentFrame } from 'remotion'

interface AnimatedCursorProps {
  /** Absolute x position in the 1920×1080 frame */
  x: number
  /** Absolute y position in the 1920×1080 frame */
  y: number
  /** When true, the cursor animates a press (scale down + up) */
  clicking: boolean
}

export function AnimatedCursor({ x, y, clicking }: AnimatedCursorProps) {
  const frame = useCurrentFrame()

  // Click animation: scale 1 → 0.7 → 1 over 10 frames when clicking=true
  const clickScale = clicking
    ? interpolate(frame % 10, [0, 5, 10], [1, 0.7, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' })
    : 1

  return (
    <svg
      width={28}
      height={28}
      viewBox="0 0 28 28"
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `scale(${clickScale})`,
        transformOrigin: '0 0',
        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))',
        pointerEvents: 'none',
      }}
    >
      {/* Arrow cursor shape */}
      <path
        d="M4 2 L4 22 L9 17 L13 24 L15 23 L11 16 L18 16 Z"
        fill="white"
        stroke="rgba(0,0,0,0.5)"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </svg>
  )
}
