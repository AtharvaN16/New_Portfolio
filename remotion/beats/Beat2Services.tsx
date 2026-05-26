import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import LibraryServicesPagePrototype from '../../src/components/case-study/content/LibraryServicesPagePrototype'
import { AnimatedCursor } from '../components/AnimatedCursor'
import {
  GRAD_CSS,
  SPRING_GENTLE,
} from '../constants'

// Beat 2 receives local frame 0–269 via <Sequence from={BEAT2_START} durationInFrames={270}>

const FRAME_WIDTH = 1920
const FRAME_HEIGHT = 1080
// Scale the prototype (renders at 1440px wide) to 78% of frame width
const PROTO_SCALE = (FRAME_WIDTH * 0.78) / 1440
const PROTO_DISPLAY_WIDTH = 1440 * PROTO_SCALE

// Cursor target positions (absolute in 1920×1080 frame)
const LEFT_PADDING = (FRAME_WIDTH - PROTO_DISPLAY_WIDTH) / 2

// Sidebar: roughly 180px from left edge of prototype, vertically at 35% of frame
const SIDEBAR_CLICK_X = LEFT_PADDING + 180 * PROTO_SCALE
const SIDEBAR_CLICK_Y = FRAME_HEIGHT * 0.35

// Bookmark icon: near right edge of prototype, vertically at 55% of frame
const BOOKMARK_X = LEFT_PADDING + PROTO_DISPLAY_WIDTH - 80 * PROTO_SCALE
const BOOKMARK_Y = FRAME_HEIGHT * 0.55

export function Beat2Services() {
  const frame = useCurrentFrame() // local 0–269
  const { fps } = useVideoConfig()

  // Screen slides up from below frame: local frames 0–30
  const slideY = spring({ frame, fps, from: FRAME_HEIGHT, to: 0, config: SPRING_GENTLE, durationInFrames: 30 })

  // Scale zooms slowly while scrolling: local frames 60–210
  const zoomScale = interpolate(frame, [60, 210], [1.0, 1.04], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' })

  // Scroll offset: local frames 60–210 → 0 to 340px of prototype scroll
  const scrollOffset = interpolate(frame, [60, 210], [0, 340], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' })

  // Cursor enters from right at local frame 180, moves to sidebar at 210, then to bookmark at 225
  const cursorX = interpolate(
    frame,
    [180, 210, 225, 240],
    [FRAME_WIDTH + 40, SIDEBAR_CLICK_X, SIDEBAR_CLICK_X, BOOKMARK_X],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
  )
  const cursorY = interpolate(
    frame,
    [180, 210, 225, 240],
    [FRAME_HEIGHT * 0.5, SIDEBAR_CLICK_Y, SIDEBAR_CLICK_Y, BOOKMARK_Y],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
  )

  // Exit dissolve: fade out in final ~18 frames (252–269)
  const exitOpacity = interpolate(frame, [252, 269], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  const isSidebarClicking = frame >= 210 && frame <= 220
  const isBookmarkClicking = frame >= 240 && frame <= 250
  const showCursor = frame >= 180

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        transform: `translateY(${slideY}px) scale(${zoomScale})`,
        transformOrigin: 'center center',
        opacity: exitOpacity,
      }}
    >
      {/* Green gradient outer frame — wrapping the prototype */}
      <div
        style={{
          background: GRAD_CSS,
          width: PROTO_DISPLAY_WIDTH,
          height: FRAME_HEIGHT * 0.9,
          padding: `${80 * PROTO_SCALE}px ${48 * PROTO_SCALE}px 0`,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Clip window — hides content above/below visible scroll area */}
        <div style={{ flex: 1, overflow: 'hidden', borderRadius: '3px 3px 0 0' }}>
          {/* Translate up to simulate scroll, scale down to fit */}
          <div
            style={{
              transform: `scale(${PROTO_SCALE}) translateY(-${scrollOffset}px)`,
              transformOrigin: 'top left',
              width: 1440,
            }}
          >
            <LibraryServicesPagePrototype />
          </div>
        </div>
      </div>

      {showCursor && (
        <AnimatedCursor
          x={cursorX}
          y={cursorY}
          clicking={isSidebarClicking || isBookmarkClicking}
        />
      )}
    </AbsoluteFill>
  )
}
