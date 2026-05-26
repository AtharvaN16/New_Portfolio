import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { SPRING_GENTLE, SPRING_SNAPPY } from '../constants'

// Beat 1 receives local frame 0–119 via <Sequence from={BEAT1_START} durationInFrames={120}>
export function Beat1Open({ logoSrc = '/images/ualberta-logo-white.png' }: { logoSrc?: string }) {
  const frame = useCurrentFrame() // local frame: 0–119
  const { fps } = useVideoConfig()

  // Logo slides up: frames 0–30
  const logoY = spring({
    frame,
    fps,
    from: 80,
    to: 0,
    config: SPRING_GENTLE,
    durationInFrames: 30,
  })

  // Title fades in: frames 12–24
  const titleOpacity = interpolate(frame, [12, 24], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' })

  // Exit: both slide up from frame 90–120
  const exitY = spring({
    frame: Math.max(0, frame - 90),
    fps,
    from: 0,
    to: -140,
    config: SPRING_SNAPPY,
    durationInFrames: 30,
  })

  const translateY = frame < 90 ? logoY : exitY

  return (
    <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ transform: `translateY(${translateY}px)`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        {/* Logo */}
        <img
          src={logoSrc}
          alt="University of Alberta"
          style={{ width: 120, height: 'auto' }}
          onError={(e) => {
            // Fallback: text stand-in while logo is being sourced
            const el = e.currentTarget
            el.style.display = 'none'
            const fallback = el.nextElementSibling as HTMLElement
            if (fallback) fallback.style.display = 'flex'
          }}
        />
        {/* Text fallback — hidden by default, shown if logo 404s */}
        <div
          style={{
            display: 'none',
            width: 80,
            height: 80,
            background: 'rgba(255,255,255,0.15)',
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 28,
            fontWeight: 800,
            color: 'white',
            letterSpacing: '-0.04em',
            fontFamily: 'system-ui',
          }}
        >
          UA
        </div>

        {/* Title */}
        <p
          style={{
            opacity: titleOpacity,
            color: 'rgba(255,255,255,0.75)',
            fontSize: 22,
            fontWeight: 400,
            letterSpacing: '0.04em',
            fontFamily: 'system-ui, sans-serif',
            textAlign: 'center',
          }}
        >
          Library Website Usability Study
        </p>
      </div>
    </AbsoluteFill>
  )
}
