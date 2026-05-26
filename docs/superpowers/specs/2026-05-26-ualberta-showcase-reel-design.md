# UAlberta Library — Showcase Reel Design Spec

**Date:** 2026-05-26  
**Duration:** ~24s looping, muted  
**Output:** MP4 for use as thumbnail/hero video on the UAlberta case study card  
**Tool:** Remotion (React-based video composition)

---

## Constraints

- **All UI shown in the video must be the actual prototype React components** — no recreations, no mockups, no simplified stand-ins.
  - `LibraryServicesPagePrototype` (Beat 2)
  - `LibraryHoursPagePrototype` (Beat 3 partial — single card extracted)
  - All 4 prototypes in grid (Beat 4): Services Page, Hours Page, Subject Guides, Library Basics
- The green gradient frame (`linear-gradient(295deg, #225432 11.56%, #36A459 88.84%)`) is the persistent background across all beats — it never changes.
- Font: Inter (already used in all prototypes).

---

## Beat 1 — Open (0s – 4s)

**Intent:** Establish brand. Clean, confident opening.

1. Full-bleed green gradient fills the frame.
2. A subtle radial shimmer animates on the gradient background — slow loop (~8s), low opacity. Creates a sense of light moving across a surface without being distracting.
3. The UAlberta logo block springs up from below center. Motion: `translateY: 80px → 0`, spring `stiffness: 60, damping: 14`.
4. 200ms after the logo settles: "Library Website Usability Study" fades in below it. Motion: `opacity: 0 → 1`, 400ms ease-out.
5. Both hold for ~1.5s.
6. Both exit together upward off-frame. Motion: `translateY: 0 → -120px`, spring `stiffness: 80, damping: 18`.

**Assets needed:** UAlberta official logo (white version for use on green bg).

---

## Beat 2 — Services Page (4s – 13s)

**Intent:** Show the redesigned Services experience with real interaction.

**Component:** `LibraryServicesPagePrototype` — rendered at full fidelity inside the gradient frame.

1. The full prototype screen springs up from the bottom of the gradient frame (same spring as Beat 1 logo). The gradient frame padding/structure stays identical to how it renders in the case study today.
2. Hold on the hero section (green-to-gold gradient, navbar) for ~1s.
3. The inner screen begins a slow programmatic scroll downward: `scrollY: 0 → 340px` over 5s, linear. This reveals the Services Directory below the hero.
4. Simultaneously, the entire frame subtly scales up: `scale: 1.0 → 1.04` over 5s, ease-out. Creates a slow zoom-into-content effect.
5. As the directory fills the view, an animated SVG mouse cursor enters from the right edge:
   - Moves to a sidebar filter item and performs a click (cursor scales down briefly on click).
   - Moves to a service card bookmark icon and clicks — the bookmark icon fills green (`#225432`) with a 300ms transition.
6. Hold on the bookmarked state for ~0.5s.

**Cursor:** Custom SVG cursor component in Remotion, not a system cursor screenshot.

---

## Beat 3 — Library Hours (13s – 18s)

**Intent:** Transition to a focused moment — a single card, information building.

1. The prototype screen scales down and fades: `scale: 1.04 → 0.85`, `opacity: 1 → 0`, 600ms ease-in. Dissolves back into the gradient.
2. ~200ms pause on bare gradient.
3. A single `LibraryLocationCard` (Cameron Library) slides up from below center: `translateY: 60px → 0`, spring `stiffness: 70, damping: 16`. Card is rendered at ~340px wide, centered in the frame with the gradient behind it.
4. Card content animates in sequentially:
   - Library name (bold green heading) fades in first.
   - Each day/hours row stagger-fades in: 60ms delay between each row, `opacity: 0 → 1`, 300ms ease-out.
   - The "Open Now" status pill scales up once: `scale: 1 → 1.08 → 1`, 400ms.
5. Hold for ~1s.

**Component:** `LibraryLocationCard` with real data from `LIBRARY_HOURS_DATA` — Cameron Library entry.

---

## Beat 4 — Grid Finale (18s – 24s)

**Intent:** Show the full scope of the redesign. Three screens, each representing a distinct part of the redesign.

1. The hours card slides back down off-frame: `translateY: 0 → 80px`, 400ms ease-in.
2. ~300ms on bare gradient.
3. Three prototype screens fly in from off-frame and settle side-by-side horizontally:
   - Left (from `translate(-140px, 0)`): `LibraryServicesPagePrototype` — shows hero + directory (full page, natural scroll position from Beat 2)
   - Center (from `translate(0, 80px)`): `LibraryHoursPagePrototype` — hours page with sidebar + location cards
   - Right (from `translate(140px, 0)`): `SubjectGuidesPrototype` — subject guides with tabs visible
   - Each also scales: `scale: 0.7 → 1`
   - Stagger: 80ms between each screen
   - Spring: `stiffness: 65, damping: 15`
4. All 3 screens settle into a horizontal row, each at reduced scale to fit within the gradient frame. Each screen is a real rendered prototype at a scaled viewport.
5. Hold for ~2s.
6. All 3 fade and scale down together: `scale: 1 → 0.8`, `opacity: 1 → 0`, 800ms ease-in. Returns to bare gradient.
7. **Loop point** — seamlessly connects back to Beat 1.

---

## Remotion Composition Structure

```
/remotion
  /compositions
    UAlbertaReel.tsx          — root composition, 24s @ 30fps
  /beats
    Beat1Open.tsx
    Beat2Services.tsx
    Beat3Hours.tsx
    Beat4Grid.tsx
  /components
    GradientBackground.tsx    — shimmer loop, persistent
    AnimatedCursor.tsx        — SVG cursor with click animation
  /sequences
    (uses Remotion <Sequence> and <spring> for all motion)
```

All prototype components are imported directly from `src/components/case-study/content/`. No copies, no modifications to the originals.

---

## Video Spec

| Property | Value |
|----------|-------|
| Resolution | 1920×1080 (or 1:1 square crop for card thumbnail) |
| FPS | 30 |
| Duration | ~720 frames (24s) |
| Format | MP4 H.264, for web |
| Audio | None |
| Loop | Seamless (Beat 4 fade → Beat 1 gradient) |
