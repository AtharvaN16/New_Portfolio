# Mobile Experience Report — Audit & Fix Guide

> **Audience:** AI agents (and humans) tasked with fixing mobile issues in this Next.js 15 portfolio.
> **Date of audit:** 2026-06-22
> **Branch at audit:** `dev`
> **Method:** Direct reads of central files + focused exploration agents across the hero/WebGL, scroll, dialog, and asset layers.

---

## ⚠️ READ THIS BEFORE YOU CHANGE ANYTHING

This file is an **audit**, not a work order. Treat every item as a hypothesis to confirm, not a fact to act on blindly. Several findings below came from exploration that was **not independently re-verified** — they are tagged `[NEEDS-CONFIRM]`. Acting on a wrong assumption here can break a deliberately-tuned animation system.

**Mandatory workflow for any fix:**

1. **Re-read the actual file and line** cited before touching it. Line numbers drift; the code may already differ.
2. **Confirm the finding is still true** in the current code. If a finding is tagged `[NEEDS-CONFIRM]`, verifying it IS part of the task — do not "fix" something you haven't reproduced.
3. **Understand WHY the current code is the way it is** before replacing it. This codebase has *intentional* mobile branches (DPR scaling, frame caps, desktop-only animations). Many "missing" things are deliberate. Do not "optimize" something that is already a tuned tradeoff (see the ✅ DO-NOT-TOUCH list).
4. **One concern per change.** Do not bundle an image fix with an a11y fix with a refactor. Small, reviewable diffs.
5. **Respect the project rules** in `CLAUDE.md` and `rules.md`: max 300 lines/file, no hardcoded values (use tokens in `src/app/globals.css`), strict TypeScript (no `any`), mobile-first, WCAG 2.2 **AA** (not AAA — see note in §4).
6. **Verify before claiming done.** Run `bun run validate` (lint + format + type-check + test). For UI/animation/scroll changes, you MUST check behavior on an actual mobile viewport (DevTools device mode at minimum, real device preferred) — type/scroll/tap changes cannot be verified by tests alone.
7. **Ask the user before destructive or far-reaching changes** (deleting assets, mass refactors, changing the mobile-detection contract used across many files).
8. **Branch discipline:** work in `dev`. Do not merge to `main` (that triggers a Vercel production deploy per `CLAUDE.md`).

**The single most important correction this audit produced:** mobile is **NOT** WebGL-free. See §2.

---

## 1. How "mobile" is decided (READ FIRST — context for everything else)

There are **three different mobile cutoffs** in the codebase. Know which one a file uses before editing.

| Mechanism | Cutoff | Where | Notes |
|---|---|---|---|
| `useBreakpoints()` → `isMobile = !isSm` | `< 640px` | `src/hooks/use-responsive.ts:80` | React hook. **Starts `false`, flips after mount** (`useState(false)` + effect). Causes first-render flicker if used naively. |
| Synchronous `matchMedia('(min-width: 768px)')` | `< 768px` | `src/components/hero/Hero.tsx:47` | Used to avoid the hook's "false on first render" problem. |
| `(pointer: coarse) \|\| innerWidth < 768` | touch OR `< 768px` | `waterBlob.helpers.ts`, `LenisProvider.tsx`, `TextureOverlay.tsx` | Used for WebGL/scroll/texture gating. |

**Maintainability finding (M1):** these should converge on a single source of truth (`useIsMobile()` / `useIsTouch()`). But changing the contract touches many files — treat as its own scoped task, do it deliberately, and verify each call site still gets the cutoff it expects (640 vs 768 vs coarse are NOT interchangeable).

---

## 2. ✅ DO-NOT-TOUCH — intentional, well-tuned mobile optimizations

**Do not "fix," "optimize," or remove these. They are deliberate and correct.** If a future task seems to require changing one, confirm with the user first.

- **Lenis smooth scroll is disabled on touch devices** — `LenisProvider.tsx` early-returns on `(pointer: coarse)`. Mobile gets native scroll + no RAF loop. Correct.
- **WebGL blob runs ONE blob on mobile, heavily optimized:**
  - F1 "ghost" blob is skipped on mobile: `Hero.tsx:135` `{!isMobile && (...)}`.
  - F2 "interactive" blob **DOES render on mobile**: `Hero.tsx:144` (`entryDelay=1500`, `webglInitDelay=0`).
  - Renders at **0.25× resolution** (`MOBILE_DPR_SCALE`), **30fps cap**, **2 noise octaves vs 4**, simplified falloff/glow math — all in `waterBlob.helpers.ts` / `waterBlob.shader.ts`.
  - Falls back to a static CSS gradient if WebGL fails, `prefers-reduced-motion`, in-app `pauseWebGL`, or `navigator.connection.saveData`.
  - ⚠️ **Correction to earlier belief:** mobile is NOT "no WebGL." Do not write code assuming the canvas is absent on phones.
- **Desktop-only animations correctly gated:** `SelectedWork` scroll listener (`isDesktop`), `ProjectCard` recede effect (`homeDesktop && isDesktop`).
- **Shimmer animations disabled on mobile** — `globals.css` `@media (max-width: 767px), (hover: none)`.
- **`TextureOverlay`** swaps an SVG filter for a static texture on mobile/Safari (`globals.css` ~line 415).
- **`ProgressiveBlur`** caps to 3 steps on mobile (`ProgressiveBlur.tsx`).
- **Fonts:** variable font, `display: 'swap'`, `preload: false` on decorative faces (`fonts.ts`, `layout.tsx`).
- **Remotion** is build-time only; not in the client bundle. Keep it that way.
- **`next.config`** already emits AVIF/WebP with mobile-tuned `deviceSizes`.

---

## 3. Mobile user journey (reference map — where things live)

Use this to orient before editing. Verified files marked `[V]`.

1. **Providers** `[V]` `src/app/AppProviders.tsx` — `LazyMotion(domAnimation)` → Accessibility → Theme → Lenis. Lean.
2. **Home page** `[V]` `src/app/page.tsx` — **4 fixed layers**, z-stacked (Footer z5, SelectedWork z10, Hero z30, Card z40). "Scroll" is faked via Framer transforms on `scrollYProgress`. Container height ≈ `200svh+` computed in px.
3. **Hero** `[V]` `src/components/hero/Hero.tsx` — see §2 + §5 table. Note: `"M.S. … Pratt"`, `"Browse work"`, bottom row are `hidden md:block` (not rendered on mobile).
4. **Hero text** `src/components/hero/AnimatedHeroTextGSAP.tsx` — mobile path = `blur(20px)→0` over 1.2s; desktop = SplitText line reveal. Honors reduced-motion (instant reveal).
5. **Scroll** `src/hooks/use-scroll-progress.ts` (passive + RAF-gated), `src/hooks/use-home-scroll.ts` (the orchestrator; mobile footer reveal range `[0.55, 1]`).
6. **Nav/menu** `[V partial]` `src/components/layout/Navbar.tsx`, `MobileMenu.tsx`, `NavButton.tsx` `[V]`.
7. **Dialogs** `src/components/dialogs/CaseStudyDialog.tsx`, `RouteSlideDialog.tsx`, `route-slide-dialogs.tsx`. Per-slug `dynamic(..., {ssr:false})`.
8. **Cards** `[V]` `src/components/work/ProjectCard.tsx` — video branch at lines 316–326.
9. **Accessibility** `src/components/providers/AccessibilityProvider.tsx`, `AccessibilityModal.tsx`, `A11yFilterOverlay.tsx`, `ReadingGuide.tsx`.

---

## 4. Findings & fixes — PERFORMANCE

Each finding: **what / where / why it matters / suggested fix / risk & verification**.

### P1 — 🔴 Oversized source images (highest real-world impact)
- **What:** `public/` totals ~344 MB. Several 7–20 MB PNGs, e.g. `public/images/case-studies/nyc-dcwp-business-licenses/old-dcwp-page.png` (~20MB), `…/pratt-institute-visitor-experience/pratt-service-design-hero-8k.png` (~13MB).
- **Why:** Dominates case-study LCP on cellular. Even with next/image transcoding, large sources are slow to process and any direct `<img>`/CSS reference ships them raw.
- **Confirm first:** `du -sh public`, `find public -type f -size +1M`. Grep each large file name across `src/` to see whether it's served via next/image (transcoded) or referenced directly.
- **Fix:** Downscale to a sane max (≈2560px wide), re-export as WebP/AVIF; keep next/image for delivery. Do NOT delete originals without user OK — they may be reused at higher res elsewhere (and per global rules, look before deleting).
- **Risk:** Low if done per-image with visual check. **Verify:** open each affected case study on mobile viewport, confirm no visible quality regression + smaller transfer in Network tab.

### P2 — 🔴 Card/fullpage video autoplay not gated on mobile
- **What:** `ProjectCard.tsx:316–326` — `<video autoPlay muted loop playsInline preload="none">` with no mobile branch. `[NEEDS-CONFIRM]` `FullpageCard` reportedly same pattern, possibly without a `poster`.
- **Why:** `preload="none"` helps, but once on-screen a phone fetches the full clip; multiple such cards compound on cellular.
- **Fix:** On mobile, render the poster image (`cardImageUrl`) instead of the autoplay video. Reuse the existing mobile-detection approach already in that file/area — do not introduce a 4th cutoff.
- **Risk:** Medium — changes what mobile users see (static vs motion). Confirm the design intent with the user if unsure. **Verify:** mobile viewport, Network tab shows no video request until/unless intended.

### P3 — 🟡 WebGL blob JS not device-split
- **What:** The blob is `dynamic(ssr:false)` (`Hero.tsx:23`) but the shader/animation/color bundle still downloads on mobile even though only one simplified blob runs.
- **Why:** Extra critical-path JS on phones.
- **Fix:** Consider a lighter mobile entry or further splitting. **Lower priority** — measure with a bundle analyzer before investing; the blob is already heavily runtime-optimized (§2), so JS weight may not be the bottleneck.
- **Risk:** Medium-high (touches the tuned WebGL path). Do not attempt without profiling proof it matters.

### P4 — 🟡 Always-on `backdrop-blur` on `ReadingGuide` fixed tooltip
- **What:** `[NEEDS-CONFIRM]` `ReadingGuide.tsx` fixed tooltip uses `backdrop-blur-md` always.
- **Why:** Continuous GPU compositing cost during scroll on low-end phones.
- **Fix:** Gate blur off on mobile (`max-md:backdrop-blur-none`) or make it an accessibility-setting opt-in. Note: `[NEEDS-CONFIRM]` ReadingGuide may be desktop-only anyway (tracks `mousemove`, no `touchmove`) — confirm whether it even runs on mobile before touching.
- **Risk:** Low. **Verify:** scroll perf on mobile viewport.

### P5 — 🟡 Infinite `travelingGradient` footer animation
- **What:** `globals.css` ~357–389 — `animation: travelingGradient 4s linear infinite` on the résumé link (background-position).
- **Why:** Continuous composite; small viewport area so impact is minor.
- **Fix:** Pause when offscreen, or disable on mobile/`pointer:coarse`, or gate by reduced-motion. Low priority.
- **Risk:** Low.

---

## 5. Findings & fixes — ACCESSIBILITY & UX

### A1 — 🔴 `CaseStudyDialog` missing dialog semantics + focus trap `[NEEDS-CONFIRM]`
- **What:** Reported: `CaseStudyDialog.tsx` lacks `role="dialog"` / `aria-modal="true"` and has no focus trap or focus return. (For contrast, `MobileMenu.tsx` DOES have these — use it as the reference pattern.)
- **Why:** Keyboard/screen-reader users can tab into the page behind the modal.
- **Confirm first:** open `CaseStudyDialog.tsx`, check the dialog root element's attributes and whether any focus management exists. **This verification is part of the task.**
- **Fix:** Add `role="dialog" aria-modal="true" aria-labelledby={titleId}`; trap focus within the dialog; restore focus to the trigger on close. Mirror the menu's approach for consistency.
- **Risk:** Medium (focus management interacts with the open/close animation timing — 1.2s open / 1.0s close). **Verify:** keyboard-only tab cycle stays inside; VoiceOver/screen-reader announces dialog; focus returns to the card on close.

### A2 — 🟡 Reduced-motion not honored in home parallax & dialogs
- **What:** Hero/WebGL honor reduced-motion thoroughly, but `[NEEDS-CONFIRM]` the home layer transforms (hero fade, card parallax in `use-home-scroll.ts`/`page.tsx`) and dialog durations do not.
- **Why:** Vestibular-sensitivity users still get full parallax + 1.2s slides.
- **Fix:** Thread the existing reduced-motion signal (`useReducedMotion()` / `useAccessibility().reducedMotion`) into these paths; collapse durations / disable parallax when set.
- **Risk:** Medium — don't break the layer choreography; reduced-motion should still land at the same final layout, just without the journey. **Verify:** toggle OS reduce-motion + in-app pause, confirm content is fully reachable and laid out correctly.

### A3 — 🟡 `NavButton` touch target marginal
- **What:** `[V]` `NavButton.tsx:28` — `text-[14px] px-3 py-1.5 leading-none` → ~26px tall. Used for Menu/Close/Back.
- **Why:** Clears WCAG 2.2 **AA** (2.5.8 = 24×24 CSS px) but only just; fails the 44px AAA guideline. **Project target is AA**, so this is compliant — treat as polish, not a bug.
- **Fix (optional):** Increase mobile vertical hit area (e.g. `py-2`/min-height) without changing visual type size, if the user wants more comfortable targets.
- **Risk:** Low, but it's a high-visibility nav element — get design sign-off.

### A4 — 🟡 Mobile menu backdrop tap doesn't close; scroll position not restored `[NEEDS-CONFIRM]`
- **What:** `MobileMenu.tsx` — only the close button dismisses; `body.style.overflow` lock may not restore scroll offset.
- **Fix:** Add backdrop-tap-to-close; ensure scroll position is preserved/restored (consider unifying on `react-remove-scroll`, see M2).
- **Risk:** Low. **Verify:** open menu mid-page, close via backdrop, confirm scroll position unchanged.

---

## 6. Findings & fixes — MAINTAINABILITY

### M1 — Three mobile-detection cutoffs
See §1. Converge on one source of truth. **Scoped, deliberate task** — verify each call site keeps its intended cutoff (640 ≠ 768 ≠ coarse).

### M2 — Duplicated scroll-lock logic
`MobileMenu` uses `body.style.overflow='hidden'`; dialogs use `react-remove-scroll`. Consolidate on `react-remove-scroll` everywhere for consistent behavior and scrollbar-compensation.

### M3 — 🔴 300-line rule broken widely (per `CLAUDE.md`)
Confirmed large files:
| File | Lines |
|---|---|
| `src/components/case-study/content/PrattVisitorExperienceContent.tsx` | 2,079 |
| `src/components/case-study/content/GutenbergContent.tsx` | 1,476 |
| `src/components/case-study/content/MetFreeToursContent.tsx` | 917 |
| `src/components/case-study/content/UAlbertaLibraryContent.tsx` | 784 |
| `src/components/case-study/content/NycThirdSpacesContent.tsx` | 730 |
| `src/components/case-study/content/NycDcwpBusinessLicensesContent.tsx` | 697 |
| `src/components/layout/AccessibilityModal.tsx` | 618 |
| (+ several 400–550 line files) | |
- **Fix:** Split case-study content into per-section components; consider a shared `CaseStudySection` wrapper. Pure structural refactor — **behavior must not change**.
- **Risk:** Low logically, but high surface area. Do ONE file at a time, diff visually on desktop + mobile after each, run `bun run validate`.

---

## 7. Suggested priority order

1. **P1** (compress/resize oversized images) + **P2** (gate video autoplay on mobile) — biggest real mobile win.
2. **A1** (`CaseStudyDialog` semantics + focus trap) — confirm first, then fix.
3. **A2** (reduced-motion in parallax/dialogs).
4. **M1/M2** (unify mobile detection + scroll lock), then chip at **M3** (split large files) one file at a time.

Lower priority / measure-first: P3, P4, P5, A3, A4.

---

## 8. Verification checklist (run before claiming any fix is done)

- [ ] Re-read the cited file/line; finding still reproduces in current code.
- [ ] `[NEEDS-CONFIRM]` items were actually confirmed, not assumed.
- [ ] Change is scoped to ONE concern.
- [ ] No DO-NOT-TOUCH item (§2) was altered without user sign-off.
- [ ] `bun run validate` passes (lint + format + type-check + test).
- [ ] For UI/scroll/animation/tap changes: checked on a mobile viewport (device mode min; real device preferred).
- [ ] For a11y changes: keyboard tab cycle + screen reader behavior verified.
- [ ] For perf changes: Network/Performance tab shows the intended improvement.
- [ ] No hardcoded values introduced (used tokens from `globals.css`).
- [ ] Still on `dev`; not merged to `main`.
- [ ] Reported outcome honestly (including anything skipped or still failing).

---

*Findings tagged `[V]` were read directly during the audit. `[NEEDS-CONFIRM]` came from exploration and must be verified before action. Line numbers are accurate as of 2026-06-22 on `dev` and will drift — always re-read.*
