import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import LibraryServicesPagePrototype from '../../src/components/case-study/content/LibraryServicesPagePrototype'
import { LibraryHoursPagePrototype } from '../../src/components/case-study/content/LibraryHoursPagePrototype'
import SubjectGuidesPrototype from '../../src/components/case-study/content/SubjectGuidesPrototype'
import { SPRING_GRID } from '../constants'

const SLOT_WIDTH  = 540  // px in final 1920×1080 frame
const SLOT_HEIGHT = 680
const PROTO_WIDTH = 1440 // prototypes render at 1440px wide natively
const PROTO_SCALE = SLOT_WIDTH / PROTO_WIDTH

// Local frame when all screens begin fading out together
const FADE_FRAME = 147

interface ScreenProps {
  children: React.ReactNode
  flyInFrame: number  // local frame when spring starts
  fromX: number       // starting x offset
  fromY: number       // starting y offset
}

function Screen({ children, flyInFrame, fromX, fromY }: ScreenProps) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const progress = spring({
    frame: Math.max(0, frame - flyInFrame),
    fps,
    config: SPRING_GRID,
    durationInFrames: 40,
  })

  const x = interpolate(progress, [0, 1], [fromX, 0])
  const y = interpolate(progress, [0, 1], [fromY, 0])
  const scaleIn = interpolate(progress, [0, 1], [0.7, 1])

  const fadeOpacity = interpolate(frame, [FADE_FRAME, FADE_FRAME + 24], [1, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  })
  const scaleOut = interpolate(frame, [FADE_FRAME, FADE_FRAME + 24], [1, 0.88], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  })

  const finalScale = Math.min(scaleIn, scaleOut)

  return (
    <div
      style={{
        width: SLOT_WIDTH,
        height: SLOT_HEIGHT,
        overflow: 'hidden',
        borderRadius: 10,
        boxShadow: '0 16px 48px rgba(0,0,0,0.4)',
        transform: `translate(${x}px, ${y}px) scale(${finalScale})`,
        opacity: fadeOpacity,
        flexShrink: 0,
      }}
    >
      <div
        style={{
          transform: `scale(${PROTO_SCALE})`,
          transformOrigin: 'top left',
          width: PROTO_WIDTH,
          height: SLOT_HEIGHT / PROTO_SCALE,
        }}
      >
        {children}
      </div>
    </div>
  )
}

export function Beat4Grid() {
  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
      }}
    >
      {/* Left: Services page flies in from left */}
      <Screen flyInFrame={27} fromX={-300} fromY={0}>
        <LibraryServicesPagePrototype />
      </Screen>

      {/* Center: Hours page rises from below */}
      <Screen flyInFrame={29} fromX={0} fromY={200}>
        <LibraryHoursPagePrototype />
      </Screen>

      {/* Right: Subject Guides flies in from right */}
      <Screen flyInFrame={31} fromX={300} fromY={0}>
        <SubjectGuidesPrototype />
      </Screen>
    </AbsoluteFill>
  )
}
