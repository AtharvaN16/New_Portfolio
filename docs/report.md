# Portfolio UX, Performance & Maintainability Audit

**Date:** 2026-06-21  
**Scope:** Full user journey — land → hero → scroll → click → overlays → sections → case studies  
**Method:** Static code audit (read-only). No runtime benchmarks or browser profiling were run.

---

## Fixes applied

| ID | Fix | Date | Status |
|----|-----|------|--------|
| P0-1 | Stop clobbering document Lenis after overlay close | 2026-06-21 | ✅ Done |
| P0-2 | Lazy-mount only the active dialog | 2026-06-21 | ✅ Done |
| P0-3 | Tab visibility pause for hero WebGL | 2026-06-21 | ✅ Done |
| P1-1 | Delete dead `src/components/animations/` | 2026-06-21 | ✅ Done |

**P0-1 details:** Document Lenis now lives in React context (`LenisProvider` + `useLenis()`). Overlay scroll stays local in `useSmoothScroll` via `ContainerScrollProvider`. Files: `LenisProvider.tsx`, `use-smooth-scroll.ts`, `use-container-scroll.tsx`, `CaseStudyLayout.tsx`, `CaseStudySideNav.tsx`, `AnimatedLink.tsx`, `UAlbertaExplorationNotesPanel.tsx`.

**P0-2 details:** New `useOverlayDialogs()` hook mounts only the dialog(s) needed (preload/check/pathname). Replaced all-at-once `shouldLoadDialogs` block in `page.tsx`. Dialogs stay mounted once visited so Work → case study transitions remain smooth.

**P0-3 details:** `WaterBlob.tsx` pauses the WebGL rAF loop on `document.visibilitychange` when the tab is hidden; resumes when visible unless also paused by scroll or dialog.

**P1-1 details:** Deleted 10 unused files in `src/components/animations/` (~1,250 LOC). Verified zero imports; `bun run build` passes.

---

## How to use this report (for agents)

1. Work **top to bottom** within each priority tier unless a task has an explicit dependency.
2. Each finding includes: **location**, **problem**, **suggested fix**, **verification**.
3. Prefer **small, verifiable PRs** over one mega-refactor.
4. After changes, run: `bun run validate` (or at minimum `bun run type-check` + `bun run lint`).
5. Respect project rules: max **300 lines per file**, design tokens from `src/app/globals.css`, no secrets in commits.

---

## Executive summary

This portfolio uses a **fixed-layer scroll stage** on the home page (not a normal scrolling document). The hero runs **WebGL blob animations** on first paint. Navigation to Work/About/etc. uses **`history.pushState` + custom window events**, not the Next.js App Router for in-session overlay opens.

**Highest-impact issues:**

| # | Issue | Impact | Status |
|---|--------|--------|--------|
| 1 | `window.lenis` global clobbered by overlay scroll hook | Home scroll-to-CTA breaks after closing overlays | ✅ Fixed (P0-1) |
| 2 | All 5 dialogs mount on first overlay open | Unnecessary JS + hydration on first click | ✅ Fixed (P0-2) |
| 3 | Two WebGL contexts on desktop hero during entry | GPU/CPU cost on first paint | Open (P1-5 scope) |
| 4 | No tab-visibility pause for hero WebGL | Background tab still animates | ✅ Fixed (P0-3) |
| 5 | Per-frame layout reads on home project cards | Scroll jank risk on desktop | **Next (P0-4)** |
| 6 | ~1,250 lines dead duplicate code in `animations/` | Confusion + maintenance burden | ✅ Fixed (P1-1) |
| 7 | String-based custom event bus | Easy to break; some events are dead or incomplete | **Next (P1-3)** |

---

## User journey (code path map)

### 1. Initial load

```
layout.tsx
  → AppProviders.tsx (LazyMotion → Accessibility → Theme → Lenis)
  → page.tsx (home fixed-layer stage)
```

**Files:**
- `src/app/layout.tsx` — fonts, TextureOverlay, skip link
- `src/app/AppProviders.tsx` — provider stack
- `src/app/page.tsx` — home orchestration, dynamic imports for SelectedWork/Footer/dialogs

**What happens:**
- `LazyMotion` with `domAnimation` reduces framer-motion bundle
- Lenis smooth scroll: desktop only, disabled for touch + `prefers-reduced-motion` (`LenisProvider.tsx`)
- Home renders 4 fixed layers by z-index (see below)

### 2. Hero / landing

```
page.tsx → Hero.tsx
  → AnimatedHeroTextGSAP (desktop: dynamic GSAP after fonts.ready)
  → WaterBlobWithBoundary × 2 on desktop (ghost F1 + interactive F2)
  → WaterBlobWithBoundary × 1 on mobile
```

**Files:**
- `src/components/hero/Hero.tsx`
- `src/components/hero/WaterBlob.tsx` (437 lines — over limit)
- `src/components/hero/WaterBlobWithBoundary.tsx`
- `src/components/hero/waterBlob.shader.ts`, `waterBlob.helpers.ts`, `waterBlob.palettes.ts`
- `src/components/hero/AnimatedHeroTextGSAP.tsx`
- `src/hooks/use-home-scroll.ts` (334 lines — drives blob pause)

**What happens:**
- WebGL canvas with fragment shader; CSS gradient fallback when reduced motion / save-data / pause-WebGL
- Desktop: two canvases overlap during F1→F2 entry (~500ms–1400ms+)
- At scroll progress **> 0.03**, `home:pause-blobs` event stops WebGL rAF loops
- At **~18%** progress, hero fades/hides (`HERO_FADE_END_PROGRESS`)

### 3. Scroll choreography

```
use-home-scroll.ts
  → useScroll(containerRef) → scrollYProgress
  → useTransform → heroContentY, cardY, selectedWorkY, footerRevealProgress
  → home:pause-blobs CustomEvent
```

**Layer stack (z-index):**

| z-index | Layer | Behavior |
|---------|-------|----------|
| 5 | Footer | Fixed bottom; revealed when SelectedWork scrolls past |
| 10 | SelectedWork | Fixed; moves up to reveal footer |
| 30 | Hero | Fixed; content moves up, fades out |
| 40 | FullpageCard | Fixed; parallax entry, exits upward |

**Files:**
- `src/hooks/use-home-scroll.ts`
- `src/hooks/home-scroll-timing.ts`
- `src/components/providers/LenisProvider.tsx`

**CTA scroll targets:**
- "Browse work" → scroll to progress 0.5 + dispatches `force-card-up` (**dead event — no listeners**)
- "Get in touch" → scroll to container bottom

### 4. Click / navigate / overlays

**Pattern:** `history.pushState(path)` + `*dialog:check` CustomEvent. Dialog reads `window.location.pathname` (not Next.js `usePathname()`).

```
Click nav / card
  → pushState('/work' | '/about' | '/case-studies/slug' | …)
  → dispatch *dialog:check
  → page.tsx sets shouldLoadDialogs = true
  → matching dialog opens (AnimatePresence slide-up)
  → dynamic import of route page content inside overlay
Close
  → history.back() or replaceState
  → popstate → dialog checkURL → exit animation → scroll unlock
```

**Active dialog code:** `src/components/dialogs/*`  
**Dead duplicates:** `src/components/animations/*` (WorkDialog, AboutDialog, etc. — zero imports)

**Custom events (partial list):**

| Event | Purpose |
|-------|---------|
| `workdialog:preload` / `:check` | Work overlay |
| `explorationsdialog:preload` / `:check` | Explorations overlay |
| `aboutdialog:check` | About overlay (no preload on nav hover) |
| `writingsdialog:check` | Writings overlay |
| `casestudydialog:preload` / `:check` | Case study overlay |
| `dialog:closed` | Resume WebGL blob |
| `home:pause-blobs` | Pause blobs on scroll |
| `force-card-up` | **Dispatched but never listened to** |

**Fragility:**
- Next.js router stays on `/` while `window.location` is `/work` — logo `Link href="/"` may not close overlay
- Mobile About uses normal `<Link>` (full page); desktop uses overlay — inconsistent
- `WaterBlob` pauses on `workdialog:check`, `casestudydialog:check`, `explorationsdialog:check` but **not** `aboutdialog:check` / `writingsdialog:check`

### 5. Content sections

**Selected Work (home):**
- `src/components/work/SelectedWork.tsx` — 4-card bento, not virtualized
- `src/components/work/ProjectCard.tsx` — per-frame `getBoundingClientRect` for recede effect when `enableHomeCardRecede`
- Images: `fetchPriority="low"`, no priority on home cards (good)
- FullpageCard hero image: `priority` (1 eager image on home load)

**Work dialog:**
- `src/components/work/MasonryWorkGrid.tsx` — all studies, first 4 cards get `imagePriority`
- Each card can render 2 images (blur + hero) → up to 8 priority images on open

**Case studies:**
- Data: `src/lib/data/case-studies.ts`
- Registry: `src/components/case-study/content/index.ts` (`CONTENT_REGISTRY` with `next/dynamic`)
- Shell: `CaseStudyDialog` → `CaseStudyDetail` → `CaseStudyContentRenderer`
- Most bodies gated by `CaseStudyReadMore`; **exception:** `ImdbIaRedesignContent.tsx` mounts 38 PNG slides immediately

---

## Prioritized fix backlog

### P0 — Fix first (bugs + high perf)

#### P0-1: Stop clobbering `window.lenis` ✅ Fixed 2026-06-21

**Location:** `src/hooks/use-smooth-scroll.ts`, `src/components/providers/LenisProvider.tsx`

**Problem:** Overlay pages assign `window.lenis` to a container-scoped Lenis instance. On unmount they `delete window.lenis`, destroying the home page's global Lenis. `useHomeScroll` then falls back to native scroll for CTAs.

**Fix applied:**
- Document-level Lenis exposed via React context (`LenisProvider` + `useLenis()`)
- Container Lenis stays local in `useSmoothScroll` — never touches `window.lenis`
- Case study in-overlay scroll uses `ContainerScrollProvider` + `useContainerScroll()` / `scrollToContainerElement()`
- `AnimatedLink` uses `useLenis()` for hash links

**Verify:** Open About overlay → close → click "Browse work" / "Get in touch" on home → smooth Lenis scroll still works.

---

#### P0-2: Lazy-mount only the active dialog ✅ Fixed 2026-06-21

**Location:** `src/app/page.tsx`, `src/hooks/use-overlay-dialogs.ts` (new)

**What's actually broken:**  
When you click **any** nav item or project for the first time (Work, About, Explorations, a case study), the home page sets `shouldLoadDialogs = true` and mounts **all five** dialog components at once — even though only one overlay will open.

**What you'd notice visually:**  
Almost nothing changes on screen. The overlay still slides up the same way. The difference is **under the hood**:

| Moment | Before | After fix |
|--------|--------|-----------|
| First click on "About" | Browser downloads JS for all 5 dialogs | Browser downloads **only** About dialog JS |
| Time to first overlay | Slightly slower first open | Faster first open |
| Memory | 5 dialog trees initialized; 4 sit idle | 1 dialog tree active (more added only as visited) |

**Fix applied:**
- New `useOverlayDialogs()` hook tracks a `Set` of dialog IDs to mount
- Preload events mount **only** the targeted dialog (e.g. `workdialog:preload` → Work only)
- Pathname sync (`*:check`, `popstate`) mounts only the matching dialog
- Once mounted, a dialog stays mounted for the session (Work → case study transition stays smooth)

**Verify:** Network tab — opening About should not fetch Work/Writings dialog chunks on first open.

---

#### P0-3: Tab visibility pause for hero WebGL ✅ Fixed 2026-06-21

**Location:** `src/components/hero/WaterBlob.tsx`

**Problem:** rAF continues when tab is backgrounded if user hasn't scrolled past 3%.

**Fix applied:** On `document.visibilitychange`, set pause flag; resume when visible AND not paused by scroll/dialog. Uses same `shouldPauseLoop()` gate as dialog/scroll pauses.

**Verify:** Land on home → switch tab → DevTools Performance: no continuous rAF from WaterBlob.

---

#### P0-4: Remove per-frame layout reads on ProjectCard recede — **NEXT**

**Location:** `src/components/work/ProjectCard.tsx:89-118`

**Problem:** `useAnimationFrame` + `getBoundingClientRect()` every frame on desktop home cards.

**Fix:** Derive transform from `homeScrollProgress` MotionValue (already passed to SelectedWork) or throttle to scroll events / IntersectionObserver.

**Verify:** Scroll home with recede enabled — no "Layout" spikes every frame in Performance panel.

---

### P1 — High value (perf + maintainability)

#### P1-1: Delete dead `src/components/animations/` duplicates ✅ Fixed 2026-06-21

**Deleted:** 10 files (~1,250 LOC). Zero runtime imports confirmed; `bun run build` passes.

---

#### P1-2: Consolidate route dialogs into one component

**Location:** `src/components/dialogs/WorkDialog.tsx`, `AboutDialog.tsx`, `ExplorationsDialog.tsx`, `WritingsDialog.tsx`

**Problem:** ~137 lines each, nearly identical (checkURL, scroll lock, AnimatePresence, TRANSITION_EASE).

**Fix:** Create `RouteSlideDialog.tsx`:
```ts
interface Props {
  path: string
  preloadEvent: string
  checkEvent: string
  Page: ComponentType
}
```

**Verify:** Open/close each overlay; back button; scroll restore.

---

#### P1-3: Typed overlay event bus

**Location:** 15+ dispatch/listen sites across Navbar, page.tsx, dialogs, WaterBlob, ProjectCard

**Problem:** String events, easy to miss a dispatch; `force-card-up` is dead; incomplete WaterBlob pause list.

**Fix:** Create `src/lib/overlay-events.ts`:
```ts
export const OVERLAY_EVENTS = {
  work: { preload: 'workdialog:preload', check: 'workdialog:check' },
  // ...
} as const
export function dispatchOverlayCheck(path: string): void
export function subscribeOverlayEvents(handlers): () => void
```
Remove `force-card-up` dispatches OR implement listener in card animation.

**Verify:** Grep for raw string events → only in overlay-events.ts.

---

#### P1-4: Mobile nav parity with desktop overlays

**Location:** `src/components/layout/MobileMenu.tsx` vs `Navbar.tsx`

**Problem:** Mobile About uses `<Link href="/about">` (full navigation); desktop uses pushState + aboutdialog:check.

**Fix:** Mirror desktop pattern in MobileMenu for About (and Writings when enabled).

---

#### P1-5: Split `WaterBlob.tsx` (437 lines)

**Problem:** Exceeds 300-line rule; mixes React lifecycle, physics, events, GL teardown.

**Fix:** Extract:
- `useWaterBlobAnimation.ts` — rAF loop, pause, entry physics
- `useWaterBlobPauseEvents.ts` — dialog + scroll + visibility listeners
- Keep `WaterBlob.tsx` as thin render shell

---

#### P1-6: Theme change without GL program rebuild

**Location:** `WaterBlob.tsx` effect deps include `theme` (~387)

**Problem:** Theme toggle destroys and recompiles shaders.

**Fix:** Keep GL context; update `uBackgroundColor` uniform only (colors already lerped via refs).

---

#### P1-7: Throttle `hero:flash-head` events

**Location:** `WaterBlob.tsx:280-281`, `hero-flash-head.ts`

**Problem:** CustomEvent fired every rAF during F1 (~60/sec).

**Fix:** Throttle to every 2–3 frames or use ref/context to `useHeroNavFlashGlow`.

---

### P2 — Content & images

#### P2-1: Fix barrel static re-exports in case study content

**Location:** `src/components/case-study/content/index.ts:55-65` imported by `case-studies.ts`

**Problem:** Static re-exports may pull all case study modules into bundle when home imports metadata.

**Fix:** Export only `CONTENT_REGISTRY` + types from barrel; remove static re-exports of content components.

---

#### P2-2: Split giant case study files

| File | Lines | Action |
|------|------:|--------|
| `PrattVisitorExperienceContent.tsx` | 2079 | Split into section components |
| `GutenbergContent.tsx` | 1476 | Split + fix PNG paths labeled as webpSrc |
| `MetFreeToursContent.tsx` | 917 | Trim placeholders or add real content |
| `UAlbertaLibraryContent.tsx` | 784 | Split sections |

---

#### P2-3: IMDb gallery lazy load

**Location:** `ImdbIaRedesignContent.tsx` — 38 PNG slides mount at once

**Fix:** WebP/AVIF conversion, intersection-based lazy load, or pagination.

---

#### P2-4: Add `sizes` to `fill` images

**Locations:** `SolutionParadigm.tsx`, `MuseumAnalysis.tsx`, `MatisseSimulation.tsx`, `AloLighthouseScores.tsx`

**Fix:** e.g. `sizes="(max-width: 1044px) 100vw, 1044px"`

---

#### P2-5: Reduce masonry priority images

**Location:** `MasonryWorkGrid.tsx:70`, `ProjectCard.tsx` blur duplicate

**Fix:** Priority on first 2 visible cards only; replace blur duplicate with CSS if possible.

---

#### P2-6: Convert remaining JPG/PNG in data layer

**Location:** `case-studies.ts` — e.g. `thumbnail.jpg`, `hero.jpg`, `hero-2.png`

**Fix:** WebP/AVIF + update URLs; run `bun run images:audit`

---

### P3 — Polish / low priority

- Remove dead `enhanced` prop on WaterBlob types
- Remove or wire `hero-f1-plasma.ts` (documentation-only)
- Dynamic-import `AnimatedHeroTextGSAP` (currently static import in Hero.tsx:28)
- Dynamic-import `HeroFlashWelcome` only when `HERO_FLASH_WELCOME_ENABLED`
- GSAP cleanup: always `killTweensOf` + `split.revert()` in `AnimatedHeroTextGSAP` unmount
- Replace magic timeouts (1100ms, 3100ms, 1.2s slide) with shared `overlay-tokens.ts`
- Remove duplicate scroll lock (RemoveScroll + manual `body.overflow`)
- Fix duplicate `id="dialog"` across route dialogs
- Add Vitest tests for pushState → check → open → back → close flow

---

## Files over 300-line limit (project rule violations)

| File | Lines | Tier |
|------|------:|------|
| `PrattVisitorExperienceContent.tsx` | 2079 | P2 |
| `GutenbergContent.tsx` | 1476 | P2 |
| `MetFreeToursContent.tsx` | 917 | P2 |
| `UAlbertaLibraryContent.tsx` | 784 | P2 |
| `NycThirdSpacesContent.tsx` | 730 | P2 |
| `NycDcwpBusinessLicensesContent.tsx` | 697 | P2 |
| `WaterBlob.tsx` | 437 | P1 |
| `ProjectCard.tsx` | 416 | P1 |
| `AnimatedText.tsx` | 410 | P3 |
| `use-home-scroll.ts` | 334 | P3 |
| `WorkFilter.tsx` | 328 | P3 |
| `SelectedWork.tsx` | 303 | P3 |

---

## What already works well (do not regress)

- `dynamic(..., { ssr: false })` for WaterBlob — keeps WebGL off initial parse
- Scroll-based blob pause at 3% before hero fade
- GSAP dynamically imported on desktop only
- Mobile: single canvas, 30fps draw throttle, no palette click
- A11y fallbacks: reduced motion, save-data, pause-WebGL → CSS gradient
- GL resource cleanup on WaterBlob unmount
- Case study body gated by ReadMore (except IMDb)
- Home Selected Work cards use `fetchPriority="low"`

---

## Suggested implementation order (for agents)

**Sprint 1 — Quick wins (1–2 days)**
1. ~~P0-1 window.lenis fix~~ ✅ Done 2026-06-21
2. ~~P0-2 lazy-mount dialogs~~ ✅ Done 2026-06-21
3. ~~P1-1 delete dead animations/~~ ✅ Done 2026-06-21
4. P1-3 typed events + remove dead `force-card-up` OR implement listener

**Sprint 2 — Hero perf (2–3 days)**
5. ~~P0-3 tab visibility pause~~ ✅ Done 2026-06-21
6. P0-4 ProjectCard recede refactor ← **next P0**
7. P1-5 split WaterBlob.tsx
8. P1-6 theme without GL rebuild

**Sprint 3 — Navigation consistency (1–2 days)**
9. P1-2 RouteSlideDialog consolidation
10. P1-4 mobile nav parity

**Sprint 4 — Content/images (ongoing)**
11. P2-1 barrel fix
12. P2-3 IMDb gallery
13. P2-4 sizes on fill images
14. P2-2 split largest case study files

---

## Verification checklist (post-fix)

- [ ] `bun run validate` passes
- [ ] Home: land → scroll through hero/card/work/footer without jank
- [ ] Home: blob pauses on scroll, resumes on scroll back to top
- [ ] Home: blob pauses when tab hidden (P0-3 — verify manually in DevTools)
- [x] Open Work/About overlay → close → "Browse work" / "Get in touch" CTA still smooth-scrolls (P0-1, 2026-06-21)
- [ ] Mobile About opens as overlay (same as desktop)
- [ ] Direct `/work` URL still works (standalone page)
- [ ] Browser back from overlay closes dialog + restores scroll
- [ ] `bun run images:check` if image paths changed

---

## Glossary

| Term | Meaning |
|------|---------|
| Fixed-layer scroll | Elements use `position: fixed` and move via CSS transforms driven by scroll progress, not normal document flow |
| Lenis | Smooth scroll library; adds momentum on desktop |
| pushState overlay | URL changes without Next.js navigation; home page stays mounted underneath |
| WebGL blob | GPU-rendered animated gradient on canvas in hero |
| CONTENT_REGISTRY | Map of case study slug → dynamically imported content component |
| rAF | `requestAnimationFrame` — browser animation loop (~60fps) |
