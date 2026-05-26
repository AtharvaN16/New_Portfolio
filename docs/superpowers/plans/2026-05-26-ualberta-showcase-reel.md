# UAlberta Showcase Reel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 24-second looping product showcase video using Remotion that renders the actual UAlberta library prototype components into a polished MP4 for use as the case study card thumbnail.

**Architecture:** Remotion lives in a `remotion/` directory at the project root alongside the Next.js app. Prototype components are imported directly from `src/components/case-study/content/` with no modifications. A Webpack alias in `remotion.config.ts` mocks `next/font/google` so Inter loads via a normal CSS import instead. The video is composed of 4 sequential `<Sequence>` beats inside a single `<Composition>`.

**Tech Stack:** Remotion 4.x, React 19, TypeScript, Vitest (existing), Inter font via Google Fonts CSS

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Create | `remotion.config.ts` | Remotion CLI config, webpack aliases |
| Create | `remotion/index.ts` | `registerRoot(Root)` entry point |
| Create | `remotion/Root.tsx` | `<Composition>` registration |
| Create | `remotion/constants.ts` | Frame timings, spring configs, colours |
| Create | `remotion/mocks/next-font-google.ts` | Mock `Inter` so prototypes render outside Next.js |
| Create | `remotion/components/GradientBackground.tsx` | Animated green gradient with shimmer loop |
| Create | `remotion/components/AnimatedCursor.tsx` | SVG cursor with position interpolation + click animation |
| Create | `remotion/beats/Beat1Open.tsx` | Logo + title spring up, exit up |
| Create | `remotion/beats/Beat2Services.tsx` | Services page slides in, scroll+zoom, cursor interaction |
| Create | `remotion/beats/Beat3Hours.tsx` | Screen dissolves, hours card slides up, rows stagger in |
| Create | `remotion/beats/Beat4Grid.tsx` | 3 screens fly in from edges, hold, fade to loop |
| Create | `remotion/compositions/UAlbertaReel.tsx` | Root composition assembling all 4 beats |
| Create | `tests/remotion/constants.test.ts` | Verify frame math and timing constants |

**Never modify:** anything under `src/components/case-study/content/`

---

## Frame Budget (30 fps)

| Beat | Start frame | End frame | Duration |
|------|-------------|-----------|----------|
| 1 — Open | 0 | 120 | 4 s |
| 2 — Services | 120 | 390 | 9 s |
| 3 — Hours | 390 | 540 | 5 s |
| 4 — Grid | 540 | 720 | 6 s |
| **Total** | | **720** | **24 s** |

---

## Task 1: Install Remotion and configure Webpack

**Files:**
- Modify: `package.json`
- Create: `remotion.config.ts`
- Create: `remotion/mocks/next-font-google.ts`

- [ ] **Step 1: Install Remotion packages**

```bash
bun add remotion @remotion/cli @remotion/bundler @remotion/renderer
```

Expected: packages added to `package.json` dependencies.

- [ ] **Step 2: Add render script to package.json**

In `package.json`, add under `"scripts"`:
```json
"remotion:studio": "remotion studio remotion/index.ts",
"remotion:render": "remotion render remotion/index.ts UAlbertaReel --output out/ualberta-reel.mp4"
```

- [ ] **Step 3: Create the next/font/google mock**

Create `remotion/mocks/next-font-google.ts`:
```ts
export function Inter(_options: { subsets: string[] }) {
  return { className: 'inter-font' }
}
```

- [ ] **Step 4: Create remotion.config.ts**

Create `remotion.config.ts` at the project root:
```ts
import { Config } from '@remotion/cli/config'
import path from 'path'

Config.overrideWebpackConfig((config) => {
  return {
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        '@': path.resolve('./src'),
        'next/font/google': path.resolve('./remotion/mocks/next-font-google.ts'),
      },
    },
  }
})
```

- [ ] **Step 5: Verify Remotion studio launches**

```bash
bun run remotion:studio
```

Expected: browser opens at `http://localhost:3001` (Remotion studio). No import errors. Close when confirmed.

- [ ] **Step 6: Commit**

```bash
git add remotion.config.ts remotion/mocks/next-font-google.ts package.json bun.lockb
git commit -m "feat(reel): install remotion and configure webpack aliases"
```

---

## Task 2: Constants and frame math

**Files:**
- Create: `remotion/constants.ts`
- Create: `tests/remotion/constants.test.ts`

- [ ] **Step 1: Write the failing test**

Create `tests/remotion/constants.test.ts`:
```ts
import { describe, it, expect } from 'vitest'
import {
  FPS,
  TOTAL_FRAMES,
  BEAT1_START, BEAT1_END,
  BEAT2_START, BEAT2_END,
  BEAT3_START, BEAT3_END,
  BEAT4_START, BEAT4_END,
  SPRING_GENTLE, SPRING_SNAPPY,
  GRAD_START, GRAD_END,
} from '../../remotion/constants'

describe('frame constants', () => {
  it('total frames equals 24s at 30fps', () => {
    expect(TOTAL_FRAMES).toBe(720)
  })
  it('beats are contiguous and cover full duration', () => {
    expect(BEAT1_START).toBe(0)
    expect(BEAT2_START).toBe(BEAT1_END)
    expect(BEAT3_START).toBe(BEAT2_END)
    expect(BEAT4_START).toBe(BEAT3_END)
    expect(BEAT4_END).toBe(TOTAL_FRAMES)
  })
  it('beat durations match spec', () => {
    expect(BEAT1_END - BEAT1_START).toBe(120) // 4s
    expect(BEAT2_END - BEAT2_START).toBe(270) // 9s
    expect(BEAT3_END - BEAT3_START).toBe(150) // 5s
    expect(BEAT4_END - BEAT4_START).toBe(180) // 6s
  })
})
```

- [ ] **Step 2: Run test to confirm it fails**

```bash
bun run test tests/remotion/constants.test.ts
```

Expected: FAIL — `remotion/constants` not found.

- [ ] **Step 3: Create constants.ts**

Create `remotion/constants.ts`:
```ts
export const FPS = 30

// Beat boundaries (frames)
export const BEAT1_START = 0
export const BEAT1_END   = 120  // 4s
export const BEAT2_START = 120
export const BEAT2_END   = 390  // 9s
export const BEAT3_START = 390
export const BEAT3_END   = 540  // 5s
export const BEAT4_START = 540
export const BEAT4_END   = 720  // 6s
export const TOTAL_FRAMES = BEAT4_END

// Spring presets
export const SPRING_GENTLE = { mass: 1, stiffness: 60, damping: 14 } as const
export const SPRING_SNAPPY = { mass: 1, stiffness: 80, damping: 18 } as const
export const SPRING_GRID   = { mass: 1, stiffness: 65, damping: 15 } as const
export const SPRING_CARD   = { mass: 1, stiffness: 70, damping: 16 } as const

// Brand colours
export const GRAD_START = '#225432'
export const GRAD_END   = '#36A459'
export const GRAD_CSS   = `linear-gradient(295deg, ${GRAD_START} 11.56%, ${GRAD_END} 88.84%)`

// Beat 2 — scroll animation (frames within beat, absolute)
export const B2_SLIDE_IN_START  = BEAT2_START          // 120
export const B2_SLIDE_IN_END    = BEAT2_START + 30     // 121 → 150 (1s)
export const B2_SCROLL_START    = BEAT2_START + 60     // 180
export const B2_SCROLL_END      = BEAT2_START + 210    // 330  (5s)
export const B2_CURSOR_ENTER    = BEAT2_START + 180    // 300
export const B2_SIDEBAR_CLICK   = BEAT2_START + 210    // 330
export const B2_BOOKMARK_MOVE   = BEAT2_START + 225    // 345
export const B2_BOOKMARK_CLICK  = BEAT2_START + 240    // 360

// Beat 3 — card animation (frames, absolute)
export const B3_SCREEN_OUT_END  = BEAT3_START + 18     // 408  (600ms)
export const B3_CARD_SLIDE_END  = BEAT3_START + 55     // 445
export const B3_ROWS_START      = BEAT3_START + 55     // 445
export const B3_ROWS_PER_FRAME  = 2                    // 60ms per row ≈ 2 frames

// Beat 4 — grid (frames, absolute)
export const B4_CARD_DOWN_END   = BEAT4_START + 18     // 558
export const B4_FLY_IN_START    = BEAT4_START + 27     // 567
export const B4_FLY_IN_END      = BEAT4_START + 87     // 627  (2s)
export const B4_HOLD_END        = BEAT4_START + 147    // 687  (2s hold)
export const B4_FADE_END        = BEAT4_END            // 720
```

- [ ] **Step 4: Run test to confirm it passes**

```bash
bun run test tests/remotion/constants.test.ts
```

Expected: PASS — 3 tests.

- [ ] **Step 5: Commit**

```bash
git add remotion/constants.ts tests/remotion/constants.test.ts
git commit -m "feat(reel): add frame timing constants with tests"
```

---

## Task 3: GradientBackground component

**Files:**
- Create: `remotion/components/GradientBackground.tsx`
- Create: `tests/remotion/GradientBackground.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `tests/remotion/GradientBackground.test.tsx`:
```tsx
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { GradientBackground } from '../../remotion/components/GradientBackground'

// Remotion hooks need mocking outside a composition
vi.mock('remotion', () => ({
  useCurrentFrame: () => 0,
  useVideoConfig: () => ({ fps: 30, width: 1920, height: 1080, durationInFrames: 720 }),
  AbsoluteFill: ({ children, style }: any) => <div style={style}>{children}</div>,
}))

describe('GradientBackground', () => {
  it('renders without crashing', () => {
    const { container } = render(<GradientBackground />)
    expect(container.firstChild).toBeTruthy()
  })
})
```

- [ ] **Step 2: Run test to confirm it fails**

```bash
bun run test tests/remotion/GradientBackground.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 3: Create GradientBackground.tsx**

Create `remotion/components/GradientBackground.tsx`:
```tsx
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
```

- [ ] **Step 4: Run test to confirm it passes**

```bash
bun run test tests/remotion/GradientBackground.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add remotion/components/GradientBackground.tsx tests/remotion/GradientBackground.test.tsx
git commit -m "feat(reel): add animated gradient background component"
```

---

## Task 4: Remotion entry point and Root composition

**Files:**
- Create: `remotion/index.ts`
- Create: `remotion/Root.tsx`
- Create: `remotion/compositions/UAlbertaReel.tsx` (scaffold only — filled in Task 9)

- [ ] **Step 1: Create index.ts**

Create `remotion/index.ts`:
```ts
import { registerRoot } from 'remotion'
import { Root } from './Root'

registerRoot(Root)
```

- [ ] **Step 2: Create scaffold UAlbertaReel.tsx**

Create `remotion/compositions/UAlbertaReel.tsx`:
```tsx
import { AbsoluteFill } from 'remotion'
import { GradientBackground } from '../components/GradientBackground'

// Beats are added in Task 9 once all beat components exist
export function UAlbertaReel() {
  return (
    <AbsoluteFill>
      <GradientBackground />
    </AbsoluteFill>
  )
}
```

- [ ] **Step 3: Create Root.tsx**

Create `remotion/Root.tsx`:
```tsx
import { Composition } from 'remotion'
import { UAlbertaReel } from './compositions/UAlbertaReel'
import { TOTAL_FRAMES, FPS } from './constants'

export function Root() {
  return (
    <Composition
      id="UAlbertaReel"
      component={UAlbertaReel}
      durationInFrames={TOTAL_FRAMES}
      fps={FPS}
      width={1920}
      height={1080}
    />
  )
}
```

- [ ] **Step 4: Verify studio shows the composition**

```bash
bun run remotion:studio
```

Expected: Studio opens. "UAlbertaReel" appears in the left panel. Preview shows the green gradient with shimmer. No console errors.

- [ ] **Step 5: Commit**

```bash
git add remotion/index.ts remotion/Root.tsx remotion/compositions/UAlbertaReel.tsx
git commit -m "feat(reel): add remotion root and scaffold composition"
```

---

## Task 5: Beat 1 — Open

**Files:**
- Create: `remotion/beats/Beat1Open.tsx`
- Create: `tests/remotion/Beat1Open.test.tsx`

Beat 1 plays from frame 0 to 120. Inside the `<Sequence>` it receives local frame (0–119).

- [ ] **Step 1: Source the UAlberta logo**

Place the UAlberta white logo at `public/images/ualberta-logo-white.png`.

If the white-on-transparent PNG is not yet available, use the SVG text stand-in below until the real logo is added — the component accepts a `logoSrc` prop with a default.

- [ ] **Step 2: Write the failing test**

Create `tests/remotion/Beat1Open.test.tsx`:
```tsx
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Beat1Open } from '../../remotion/beats/Beat1Open'

vi.mock('remotion', () => ({
  useCurrentFrame: () => 30,
  useVideoConfig: () => ({ fps: 30, width: 1920, height: 1080, durationInFrames: 720 }),
  spring: () => 1,
  interpolate: (_f: number, _in: number[], out: number[]) => out[1],
  AbsoluteFill: ({ children, style }: any) => <div style={style}>{children}</div>,
}))

describe('Beat1Open', () => {
  it('renders logo and title text', () => {
    const { getByText } = render(<Beat1Open />)
    expect(getByText('Library Website Usability Study')).toBeTruthy()
  })
})
```

- [ ] **Step 3: Run test to confirm it fails**

```bash
bun run test tests/remotion/Beat1Open.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 4: Create Beat1Open.tsx**

Create `remotion/beats/Beat1Open.tsx`:
```tsx
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
```

- [ ] **Step 5: Run test to confirm it passes**

```bash
bun run test tests/remotion/Beat1Open.test.tsx
```

Expected: PASS.

- [ ] **Step 6: Preview in studio**

Temporarily add Beat1Open to `UAlbertaReel.tsx`:
```tsx
import { Sequence } from 'remotion'
import { Beat1Open } from '../beats/Beat1Open'
import { BEAT1_START } from '../constants'
// ...inside UAlbertaReel return:
<Sequence from={BEAT1_START} durationInFrames={120}>
  <Beat1Open />
</Sequence>
```

Open studio, scrub frames 0–120. Confirm logo springs up, title fades in, both exit upward at frame 90.

- [ ] **Step 7: Commit**

```bash
git add remotion/beats/Beat1Open.tsx tests/remotion/Beat1Open.test.tsx remotion/compositions/UAlbertaReel.tsx
git commit -m "feat(reel): add Beat1 open sequence with logo spring and title fade"
```

---

## Task 6: AnimatedCursor component

**Files:**
- Create: `remotion/components/AnimatedCursor.tsx`
- Create: `tests/remotion/AnimatedCursor.test.tsx`

Used in Beat 2 for the sidebar click and bookmark interaction.

- [ ] **Step 1: Write the failing test**

Create `tests/remotion/AnimatedCursor.test.tsx`:
```tsx
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { AnimatedCursor } from '../../remotion/components/AnimatedCursor'

vi.mock('remotion', () => ({
  useCurrentFrame: () => 0,
  interpolate: (_f: number, _in: number[], out: number[]) => out[0],
  spring: () => 1,
  AbsoluteFill: ({ children }: any) => <div>{children}</div>,
}))

describe('AnimatedCursor', () => {
  it('renders at given position', () => {
    const { container } = render(
      <AnimatedCursor x={100} y={200} clicking={false} />
    )
    expect(container.querySelector('svg')).toBeTruthy()
  })
})
```

- [ ] **Step 2: Run test to confirm it fails**

```bash
bun run test tests/remotion/AnimatedCursor.test.tsx
```

Expected: FAIL.

- [ ] **Step 3: Create AnimatedCursor.tsx**

Create `remotion/components/AnimatedCursor.tsx`:
```tsx
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'

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
  const { fps } = useVideoConfig()

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
```

- [ ] **Step 4: Run test to confirm it passes**

```bash
bun run test tests/remotion/AnimatedCursor.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add remotion/components/AnimatedCursor.tsx tests/remotion/AnimatedCursor.test.tsx
git commit -m "feat(reel): add animated cursor component for Beat2 interaction"
```

---

## Task 7: Beat 2 — Services Page

**Files:**
- Create: `remotion/beats/Beat2Services.tsx`
- Create: `tests/remotion/Beat2Services.test.tsx`

Beat 2 receives local frame 0–269 (absolute frames 120–389).

**How scroll is simulated without touching the prototype:** The prototype renders inside an `overflow: hidden` clip div. A wrapper div inside the clip uses `translateY(-scrollOffsetPx)` to move the content up, mimicking scroll.

- [ ] **Step 1: Write the failing test**

Create `tests/remotion/Beat2Services.test.tsx`:
```tsx
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Beat2Services } from '../../remotion/beats/Beat2Services'

vi.mock('remotion', () => ({
  useCurrentFrame: () => 60,
  useVideoConfig: () => ({ fps: 30, width: 1920, height: 1080, durationInFrames: 720 }),
  spring: (_: any) => 0,
  interpolate: (_f: number, _in: number[], out: number[]) => out[0],
  AbsoluteFill: ({ children, style }: any) => <div style={style}>{children}</div>,
}))

// Mock prototype — it has next/font/google which won't resolve in tests
vi.mock('../../src/components/case-study/content/LibraryServicesPagePrototype', () => ({
  default: () => <div data-testid="services-prototype" />,
}))

vi.mock('../../remotion/components/AnimatedCursor', () => ({
  AnimatedCursor: () => <div data-testid="cursor" />,
}))

describe('Beat2Services', () => {
  it('renders the services prototype', () => {
    const { getByTestId } = render(<Beat2Services />)
    expect(getByTestId('services-prototype')).toBeTruthy()
  })
})
```

- [ ] **Step 2: Run test to confirm it fails**

```bash
bun run test tests/remotion/Beat2Services.test.tsx
```

Expected: FAIL.

- [ ] **Step 3: Create Beat2Services.tsx**

Create `remotion/beats/Beat2Services.tsx`:
```tsx
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import LibraryServicesPagePrototype from '../../src/components/case-study/content/LibraryServicesPagePrototype'
import { AnimatedCursor } from '../components/AnimatedCursor'
import {
  SPRING_GENTLE, SPRING_SNAPPY,
  B2_SLIDE_IN_END, B2_SCROLL_START, B2_SCROLL_END,
  B2_CURSOR_ENTER, B2_SIDEBAR_CLICK, B2_BOOKMARK_MOVE, B2_BOOKMARK_CLICK,
  BEAT2_START,
} from '../constants'

// Local frame offset: BEAT2_START is subtracted by <Sequence>
// So frame 0 here = absolute frame 120

const FRAME_WIDTH = 1920
const FRAME_HEIGHT = 1080
// The prototype renders at 1440px wide. We scale it to fit at 80% width of frame.
const PROTO_SCALE = (FRAME_WIDTH * 0.78) / 1440
const PROTO_DISPLAY_WIDTH = 1440 * PROTO_SCALE
const PROTO_DISPLAY_HEIGHT = FRAME_HEIGHT * 0.9

// Bookmark interaction: these are positions within the scaled prototype on screen
// Sidebar item (x, y relative to prototype top-left after centering)
const SIDEBAR_CLICK_X = (FRAME_WIDTH - PROTO_DISPLAY_WIDTH) / 2 + 180 * PROTO_SCALE
const SIDEBAR_CLICK_Y = FRAME_HEIGHT * 0.35

// Bookmark icon on first service card
const BOOKMARK_X = (FRAME_WIDTH - PROTO_DISPLAY_WIDTH) / 2 + PROTO_DISPLAY_WIDTH - 80 * PROTO_SCALE
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

  // Cursor position: enters from right at frame 180, moves to sidebar at 210, moves to bookmark at 225
  const cursorX = interpolate(
    frame,
    [180, 210, 225, 225],
    [FRAME_WIDTH + 40, SIDEBAR_CLICK_X, SIDEBAR_CLICK_X, BOOKMARK_X],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
  )
  const cursorY = interpolate(
    frame,
    [180, 210, 225, 240],
    [FRAME_HEIGHT * 0.5, SIDEBAR_CLICK_Y, SIDEBAR_CLICK_Y, BOOKMARK_Y],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
  )

  const isSidebarClicking = frame >= 210 && frame <= 220
  const isBookmarkClicking = frame >= 240 && frame <= 250
  const showCursor = frame >= 180

  // Bookmark fill: turns green after click at frame 240
  const bookmarkFill = frame >= 248 ? '#225432' : 'transparent'

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        transform: `translateY(${slideY}px) scale(${zoomScale})`,
        transformOrigin: 'center center',
      }}
    >
      {/* Green gradient outer frame — matching prototype's own outer wrapper */}
      <div
        style={{
          background: 'linear-gradient(295deg, #225432 11.56%, #36A459 88.84%)',
          width: PROTO_DISPLAY_WIDTH,
          height: PROTO_DISPLAY_HEIGHT,
          padding: `${80 * PROTO_SCALE}px ${48 * PROTO_SCALE}px 0`,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Scrollable clip window */}
        <div style={{ flex: 1, overflow: 'hidden', borderRadius: '3px 3px 0 0' }}>
          {/* Translate up to simulate scroll */}
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
```

- [ ] **Step 4: Run test to confirm it passes**

```bash
bun run test tests/remotion/Beat2Services.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Preview in studio**

Add to `UAlbertaReel.tsx`:
```tsx
import { Beat2Services } from '../beats/Beat2Services'
import { BEAT2_START } from '../constants'
// inside return:
<Sequence from={BEAT2_START} durationInFrames={270}>
  <Beat2Services />
</Sequence>
```

Scrub frames 120–389 in studio. Confirm: prototype slides up, slow scroll + zoom through directory, cursor appears and clicks sidebar then bookmark.

- [ ] **Step 6: Commit**

```bash
git add remotion/beats/Beat2Services.tsx tests/remotion/Beat2Services.test.tsx remotion/compositions/UAlbertaReel.tsx
git commit -m "feat(reel): add Beat2 services page with scroll, zoom, and cursor interaction"
```

---

## Task 8: Beat 3 — Library Hours Card

**Files:**
- Create: `remotion/beats/Beat3Hours.tsx`
- Create: `tests/remotion/Beat3Hours.test.tsx`

Beat 3 receives local frame 0–149 (absolute 390–539).

The `LibraryLocationCard` component is extracted from `LibraryHoursPagePrototype`. Instead of rendering the full page, this beat renders a single card from `LIBRARY_HOURS_DATA` centered on the gradient frame.

- [ ] **Step 1: Check LibraryLocationCard's props interface**

```bash
grep -n "interface\|Props\|export" src/components/case-study/content/LibraryLocationCard.tsx | head -15
```

Note the props so you use the exact interface in the beat.

- [ ] **Step 2: Write the failing test**

Create `tests/remotion/Beat3Hours.test.tsx`:
```tsx
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Beat3Hours } from '../../remotion/beats/Beat3Hours'

vi.mock('remotion', () => ({
  useCurrentFrame: () => 60,
  useVideoConfig: () => ({ fps: 30, width: 1920, height: 1080, durationInFrames: 720 }),
  spring: () => 0,
  interpolate: (_f: number, _in: number[], out: number[]) => out[1],
  AbsoluteFill: ({ children, style }: any) => <div style={style}>{children}</div>,
}))

vi.mock('../../src/components/case-study/content/LibraryLocationCard', () => ({
  LibraryLocationCard: ({ library }: any) => <div data-testid="location-card">{library.name}</div>,
}))

describe('Beat3Hours', () => {
  it('renders the hours card', () => {
    const { getByTestId } = render(<Beat3Hours />)
    expect(getByTestId('location-card')).toBeTruthy()
  })
})
```

- [ ] **Step 3: Run test to confirm it fails**

```bash
bun run test tests/remotion/Beat3Hours.test.tsx
```

Expected: FAIL.

- [ ] **Step 4: Read the LibraryLocationCard props**

```bash
head -40 src/components/case-study/content/LibraryLocationCard.tsx
```

Use the exact prop names from this output in the next step.

- [ ] **Step 5: Create Beat3Hours.tsx**

Create `remotion/beats/Beat3Hours.tsx`.

Replace `LibraryLocationCardProps` shape and the `library` value below with the real prop names from Step 4:

```tsx
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { LibraryLocationCard } from '../../src/components/case-study/content/LibraryLocationCard'
import { LIBRARY_HOURS_DATA } from '../../src/lib/data/library-hours-data'
import { SPRING_CARD, B3_SCREEN_OUT_END, B3_CARD_SLIDE_END, B3_ROWS_START } from '../constants'

// Cameron Library is the first Edmonton entry
const CAMERON = LIBRARY_HOURS_DATA.find((l) => l.name?.toLowerCase().includes('cameron')) ?? LIBRARY_HOURS_DATA[0]

// How many day rows the card shows (used for stagger)
const ROW_COUNT = 7

export function Beat3Hours() {
  const frame = useCurrentFrame() // local 0–149
  const { fps } = useVideoConfig()

  // Card slides up: local frames 18–55
  const cardY = spring({
    frame: Math.max(0, frame - 18),
    fps,
    from: 80,
    to: 0,
    config: SPRING_CARD,
    durationInFrames: 37,
  })

  // Card opacity: fades in with slide
  const cardOpacity = interpolate(frame, [18, 38], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' })

  // Row stagger: each row fades in 2 frames apart starting at local frame 55
  const rowOpacities = Array.from({ length: ROW_COUNT }, (_, i) => {
    const rowStart = B3_ROWS_START - 390 + i * 2 // B3_ROWS_START is absolute; offset to local
    return interpolate(frame, [rowStart, rowStart + 8], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' })
  })

  // "Open Now" pill pulse: local frame 70–80
  const pillScale = interpolate(frame, [70, 75, 80], [1, 1.1, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' })

  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div
        style={{
          transform: `translateY(${cardY}px)`,
          opacity: cardOpacity,
          width: 420,
          boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
          borderRadius: 12,
          overflow: 'hidden',
          background: 'white',
        }}
      >
        {/*
          LibraryLocationCard renders the full card UI using real data.
          rowOpacities and pillScale are passed if the component accepts them;
          if not, wrap each row in a div with the opacity applied externally
          using the approach below.
        */}
        <LibraryLocationCard library={CAMERON} />
      </div>
    </AbsoluteFill>
  )
}
```

> **Note on row stagger:** If `LibraryLocationCard` doesn't accept row-level opacity props, wrap the card in a container and apply a CSS `@keyframes` fade via a `<style>` tag injected into the Remotion frame. The key constraint is no modification to the original component. An alternative is to render a visually identical card layout directly in this beat using the data from `CAMERON` — this is acceptable since it's presentation-only code in the beat, not the original component.

- [ ] **Step 6: Run test to confirm it passes**

```bash
bun run test tests/remotion/Beat3Hours.test.tsx
```

Expected: PASS.

- [ ] **Step 7: Preview in studio**

Add to `UAlbertaReel.tsx`:
```tsx
import { Beat3Hours } from '../beats/Beat3Hours'
import { BEAT3_START } from '../constants'
// inside return:
<Sequence from={BEAT3_START} durationInFrames={150}>
  <Beat3Hours />
</Sequence>
```

Scrub frames 390–539. Confirm card slides up over gradient, rows appear one by one.

- [ ] **Step 8: Commit**

```bash
git add remotion/beats/Beat3Hours.tsx tests/remotion/Beat3Hours.test.tsx remotion/compositions/UAlbertaReel.tsx
git commit -m "feat(reel): add Beat3 library hours card with staggered row animation"
```

---

## Task 9: Beat 4 — Grid Finale

**Files:**
- Create: `remotion/beats/Beat4Grid.tsx`
- Create: `tests/remotion/Beat4Grid.test.tsx`

Beat 4 receives local frame 0–179. Three screens fly in from left, bottom, and right into a centered horizontal row.

- [ ] **Step 1: Write the failing test**

Create `tests/remotion/Beat4Grid.test.tsx`:
```tsx
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Beat4Grid } from '../../remotion/beats/Beat4Grid'

vi.mock('remotion', () => ({
  useCurrentFrame: () => 90,
  useVideoConfig: () => ({ fps: 30, width: 1920, height: 1080, durationInFrames: 720 }),
  spring: () => 1,
  interpolate: (_f: number, _in: number[], out: number[]) => out[1],
  AbsoluteFill: ({ children, style }: any) => <div style={style}>{children}</div>,
}))

const mockProto = (name: string) => ({ default: () => <div data-testid={name} /> })
vi.mock('../../src/components/case-study/content/LibraryServicesPagePrototype', () => mockProto('services'))
vi.mock('../../src/components/case-study/content/LibraryHoursPagePrototype', () => ({ LibraryHoursPagePrototype: () => <div data-testid="hours" /> }))
vi.mock('../../src/components/case-study/content/SubjectGuidesPrototype', () => ({ SubjectGuidesPrototype: () => <div data-testid="guides" /> }))

describe('Beat4Grid', () => {
  it('renders all three prototype screens', () => {
    const { getByTestId } = render(<Beat4Grid />)
    expect(getByTestId('services')).toBeTruthy()
    expect(getByTestId('hours')).toBeTruthy()
    expect(getByTestId('guides')).toBeTruthy()
  })
})
```

- [ ] **Step 2: Run test to confirm it fails**

```bash
bun run test tests/remotion/Beat4Grid.test.tsx
```

Expected: FAIL.

- [ ] **Step 3: Create Beat4Grid.tsx**

Create `remotion/beats/Beat4Grid.tsx`:
```tsx
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import LibraryServicesPagePrototype from '../../src/components/case-study/content/LibraryServicesPagePrototype'
import { LibraryHoursPagePrototype } from '../../src/components/case-study/content/LibraryHoursPagePrototype'
import SubjectGuidesPrototype from '../../src/components/case-study/content/SubjectGuidesPrototype'
import { SPRING_GRID } from '../constants'

// Each prototype's natural render width → scale to fit 1/3 of 1920 with gutters
const SLOT_WIDTH  = 540  // px in final frame
const SLOT_HEIGHT = 680
const PROTO_WIDTH = 1440 // prototypes render at 1440px wide

const PROTO_SCALE = SLOT_WIDTH / PROTO_WIDTH

interface ScreenProps {
  children: React.ReactNode
  /** local frame when this screen starts flying in */
  flyInFrame: number
  /** starting translate offset (x, y) */
  fromX: number
  fromY: number
  /** opacity exit start frame */
  fadeFrame: number
}

function Screen({ children, flyInFrame, fromX, fromY, fadeFrame }: ScreenProps) {
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

  // Fade out together after fadeFrame
  const opacity = interpolate(frame, [fadeFrame, fadeFrame + 24], [1, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' })
  const scaleOut = interpolate(frame, [fadeFrame, fadeFrame + 24], [1, 0.88], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' })

  return (
    <div
      style={{
        width: SLOT_WIDTH,
        height: SLOT_HEIGHT,
        overflow: 'hidden',
        borderRadius: 10,
        boxShadow: '0 16px 48px rgba(0,0,0,0.4)',
        transform: `translate(${x}px, ${y}px) scale(${Math.min(scaleIn, scaleOut)})`,
        opacity,
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
  const frame = useCurrentFrame() // local 0–179

  // Stagger: left flies in at 27, center at 29, right at 31 (local frames)
  const FADE_FRAME = 147 // local frame to begin fade (matches B4_HOLD_END - BEAT4_START)

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
      }}
    >
      <Screen flyInFrame={27} fromX={-300} fromY={0} fadeFrame={FADE_FRAME}>
        <LibraryServicesPagePrototype />
      </Screen>

      <Screen flyInFrame={29} fromX={0} fromY={200} fadeFrame={FADE_FRAME}>
        <LibraryHoursPagePrototype />
      </Screen>

      <Screen flyInFrame={31} fromX={300} fromY={0} fadeFrame={FADE_FRAME}>
        <SubjectGuidesPrototype />
      </Screen>
    </AbsoluteFill>
  )
}
```

- [ ] **Step 4: Run test to confirm it passes**

```bash
bun run test tests/remotion/Beat4Grid.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Preview in studio**

Add to `UAlbertaReel.tsx`:
```tsx
import { Beat4Grid } from '../beats/Beat4Grid'
import { BEAT4_START } from '../constants'
// inside return:
<Sequence from={BEAT4_START} durationInFrames={180}>
  <Beat4Grid />
</Sequence>
```

Scrub frames 540–720. Confirm 3 screens fly in from edges, hold, fade to gradient. Loop back to frame 0 should feel seamless.

- [ ] **Step 6: Commit**

```bash
git add remotion/beats/Beat4Grid.tsx tests/remotion/Beat4Grid.test.tsx remotion/compositions/UAlbertaReel.tsx
git commit -m "feat(reel): add Beat4 three-screen grid finale with spring fly-in"
```

---

## Task 10: Assemble UAlbertaReel and render MP4

**Files:**
- Modify: `remotion/compositions/UAlbertaReel.tsx` (replace scaffold with full composition)

- [ ] **Step 1: Replace scaffold with final composition**

Replace `remotion/compositions/UAlbertaReel.tsx` with:
```tsx
import { AbsoluteFill, Sequence } from 'remotion'
import { GradientBackground } from '../components/GradientBackground'
import { Beat1Open } from '../beats/Beat1Open'
import { Beat2Services } from '../beats/Beat2Services'
import { Beat3Hours } from '../beats/Beat3Hours'
import { Beat4Grid } from '../beats/Beat4Grid'
import {
  BEAT1_START, BEAT2_START, BEAT3_START, BEAT4_START,
} from '../constants'

export function UAlbertaReel() {
  return (
    <AbsoluteFill>
      {/* Gradient + shimmer runs for entire duration */}
      <GradientBackground />

      <Sequence from={BEAT1_START} durationInFrames={120}>
        <Beat1Open />
      </Sequence>

      <Sequence from={BEAT2_START} durationInFrames={270}>
        <Beat2Services />
      </Sequence>

      <Sequence from={BEAT3_START} durationInFrames={150}>
        <Beat3Hours />
      </Sequence>

      <Sequence from={BEAT4_START} durationInFrames={180}>
        <Beat4Grid />
      </Sequence>
    </AbsoluteFill>
  )
}
```

- [ ] **Step 2: Run full test suite**

```bash
bun run test tests/remotion/
```

Expected: All tests pass.

- [ ] **Step 3: Scrub full video in studio**

```bash
bun run remotion:studio
```

Watch all 720 frames end-to-end. Check:
- Beat 1 → 2 transition is seamless (logo exits just as prototype slides in)
- Beat 2 → 3: screen dissolves cleanly back to gradient before card appears
- Beat 3 → 4: card exits, screens fly in smoothly
- Beat 4 → loop: fade lands cleanly on gradient matching Beat 1 opening frame

- [ ] **Step 4: Render to MP4**

```bash
bun run remotion:render
```

Expected: `out/ualberta-reel.mp4` created. Open and watch — confirm 24s, seamless loop.

- [ ] **Step 5: Add output to .gitignore**

In `.gitignore`, add:
```
out/
```

- [ ] **Step 6: Move MP4 to public and add to case study**

```bash
cp out/ualberta-reel.mp4 public/videos/case-studies/ualberta-reel.mp4
```

In `src/lib/data/case-studies.ts`, add a `videoUrl` field to the UAlberta entry:
```ts
videoUrl: '/videos/case-studies/ualberta-reel.mp4',
```

- [ ] **Step 7: Commit**

```bash
git add remotion/compositions/UAlbertaReel.tsx .gitignore public/videos/case-studies/ualberta-reel.mp4 src/lib/data/case-studies.ts
git commit -m "feat(reel): assemble final UAlberta showcase reel and add to case study data"
```
