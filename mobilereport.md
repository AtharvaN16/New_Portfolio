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
3. **Understand WHY the current code is the way it is** before replacing it. This codebase has _intentional_ mobile branches (DPR scaling, frame caps, desktop-only animations). Many "missing" things are deliberate. Do not "optimize" something that is already a tuned tradeoff (see the ✅ DO-NOT-TOUCH list).
4. **One concern per change.** Do not bundle an image fix with an a11y fix with a refactor. Small, reviewable diffs.
5. **Respect the project rules** in `CLAUDE.md` and `rules.md`: max 300 lines/file, no hardcoded values (use tokens in `src/app/globals.css`), strict TypeScript (no `any`), mobile-first, WCAG 2.2 **AA** (not AAA — see note in §4).
6. **Verify before claiming done.** Run `bun run validate` (lint + format + type-check + test). For UI/animation/scroll changes, you MUST check behavior on an actual mobile viewport (DevTools device mode at minimum, real device preferred) — type/scroll/tap changes cannot be verified by tests alone.
7. **Ask the user before destructive or far-reaching changes** (deleting assets, mass refactors, changing the mobile-detection contract used across many files).
8. **Branch discipline:** work in `dev`. Do not merge to `main` (that triggers a Vercel production deploy per `CLAUDE.md`).

**The single most important correction this audit produced:** mobile is **NOT** WebGL-free. See §2.

---

## 1. How "mobile" is decided (READ FIRST — context for everything else)

There are **three different mobile cutoffs** in the codebase. Know which one a file uses before editing.

| Mechanism                                      | Cutoff             | Where                                                             | Notes                                                                                                                        |
| ---------------------------------------------- | ------------------ | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `useBreakpoints()` → `isMobile = !isSm`        | `< 640px`          | `src/hooks/use-responsive.ts:80`                                  | React hook. **Starts `false`, flips after mount** (`useState(false)` + effect). Causes first-render flicker if used naively. |
| Synchronous `matchMedia('(min-width: 768px)')` | `< 768px`          | `src/components/hero/Hero.tsx:47`                                 | Used to avoid the hook's "false on first render" problem.                                                                    |
| `(pointer: coarse) \|\| innerWidth < 768`      | touch OR `< 768px` | `waterBlob.helpers.ts`, `LenisProvider.tsx`, `TextureOverlay.tsx` | Used for WebGL/scroll/texture gating.                                                                                        |

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

- **Status:** ✅ **Largely fixed (2026-06-22)** — AVIF migration, `public/images` ~411 MB → ~140 MB, legacy PNG/JPG/WebP purged; `sizes` + lower `quality` on grid/hero images; scripts: `images:optimize`, `images:purge`, `images:audit`.
- **What:** `public/` totals ~344 MB. Several 7–20 MB PNGs, e.g. `public/images/case-studies/nyc-dcwp-business-licenses/old-dcwp-page.png` (~20MB), `…/pratt-institute-visitor-experience/pratt-service-design-hero-8k.png` (~13MB).
- **Why:** Dominates case-study LCP on cellular. Even with next/image transcoding, large sources are slow to process and any direct `<img>`/CSS reference ships them raw.
- **Confirm first:** `du -sh public`, `find public -type f -size +1M`. Grep each large file name across `src/` to see whether it's served via next/image (transcoded) or referenced directly.
- **Fix:** Downscale to a sane max (≈2560px wide), re-export as WebP/AVIF; keep next/image for delivery. Do NOT delete originals without user OK — they may be reused at higher res elsewhere (and per global rules, look before deleting).
- **Risk:** Low if done per-image with visual check. **Verify:** open each affected case study on mobile viewport, confirm no visible quality regression + smaller transfer in Network tab.

### P2 — 🔴 Card/fullpage video autoplay not gated on mobile

- **Status:** ✅ **Fixed (2026-06-22)** — kept video + poster; removed blind `autoPlay`; `useVideoPlaybackInView` plays at **50% visible** (cards/fullpage) / **35%** (case-study heroes), pauses off-screen + on tab hide. Files: `ProjectCard.tsx`, `FullpageCard.tsx`, `CaseStudyDetail.tsx`, `ShowcaseHero.tsx`, `use-video-playback-in-view.ts`.
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

1. ~~**P1** (compress/resize oversized images) + **P2** (video IO play/pause)~~ ✅ Done.
2. ~~**10.B** (`next.config` + Material Symbols + `<motion.>` → `<m.>`)~~ ✅ Done — see §10.F.
3. **10.C runtime** — throttle `CaseStudyVideo`/`CaseStudySideNav`, fix `once:false`, gate `WorkFilter` stagger on mobile.
4. **A1** (`CaseStudyDialog` semantics + focus trap) — confirm first, then fix.
5. **A2** (reduced-motion in parallax/dialogs).
6. **M1/M2** (unify mobile detection + scroll lock), then chip at **M3** (split large files) one file at a time.

Lower priority / measure-first: P3, P4, P5, A3, A4, **10.E**.

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

---

## 9. 🔴 SCROLL PERFORMANCE — ROOT CAUSE OF MOBILE JITTER (added 2026-06-22)

> This section supersedes scattered scroll notes above. It is the **primary reason the site feels janky on mobile**. Decision taken with the site owner: **fix via native-flow rendering on mobile** (option A below).

### 9.1 The root cause (verified)

The homepage **does not actually scroll**. `src/app/page.tsx` renders **4 `position: fixed` layers** (Footer z5, SelectedWork z10, Hero z30, Card z40) inside a tall empty container. Native scroll moves nothing visible; instead Framer Motion `useScroll` reads scroll position and `useTransform` writes `translateY`/`opacity` onto each fixed layer **on the JS main thread every frame** (`src/hooks/use-home-scroll.ts:184–224`).

Why this jitters on mobile specifically:

- Native touch scroll runs on the **compositor thread** (smooth, off-main-thread).
- Framer's transform writes run on the **main thread**, reacting to `scroll` events that on mobile fire **irregularly / coalesced** (sometimes only at gesture end on older iOS Safari).
- **Lenis — which normally reconciles the two via a RAF loop — is disabled on touch devices** (`LenisProvider` early-returns on `(pointer: coarse)`).
- Result: visible fixed layers lag the finger and snap to catch up → perceived jitter.

This is a documented Motion issue (`motiondivision/motion` #2770, "useScroll jittery when using translateY on mobile"); Motion's docs confirm `useScroll` only hardware-accelerates _certain_ animations — `translateY` pinning stays on the main thread.

**The author already diagnosed this from the inside.** See the comment at `src/components/work/SelectedWork.tsx:159–170`: _"on the home page this section is dragged hundreds of vh by a transform every frame... Desktop GPUs absorb it; mobile does not, so only apply it on desktop."_ Existing mitigations (disabling `content-visibility` on mobile, gating internal scroll listeners, the recede effect) treat **symptoms** — the transform-per-frame machine still mounts and runs on mobile.

### 9.2 Amplifiers (each makes it worse)

- **A1 — Address-bar resize thrash.** `windowHeight` is JS state (`use-home-scroll.ts:47,70`) and the container height + every transform output range depend on it (`heroContentOutput`, `cardOutput`, `selectedWorkOutput`). The mobile URL bar _animates_ during scroll → `innerHeight` changes continuously → `handleResize` recomputes heights and even calls `scrollTo` mid-gesture (lines 96–111). Relayout + programmatic scroll during a scroll gesture = guaranteed jank. Hero also uses `pt-[20dvh]`; `dvh` recalculates layout on every toolbar animation frame.
- **A2 — 5 permanently-promoted layers.** `page.tsx` sets `willChange:'transform'`/`'opacity'` on SelectedWork, Hero, Card, hero-main, navbar — always on. On memory-limited mobile GPUs this causes layer-memory pressure and slower paints. `will-change` should be transient, not permanent.
- **A3 — WebGL blob during first scroll.** F2 blob runs (30fps) on mobile and shares main thread/GPU. It pauses past 3% scroll (`dispatchHomePauseBlobs`, line 148) but is live during the critical first-scroll moment.
- **A4 — React re-render mid-scroll.** `setHeroIsHidden` (line 157) fires a state update while dragging.
- **A5 — Misc per-frame work.** `heroPointerEvents` MotionValue maps opacity→string each frame; `FullpageCard.tsx:87` uses `transition-all duration-500` (broad).

### 9.3 Chosen fix: NATIVE-FLOW ON MOBILE (option A)

On mobile (`pointer: coarse` / below the chosen cutoff), **do not mount the fixed-layer transform machine at all.** Render the homepage in normal document flow: Hero → FullpageCard → SelectedWork → Footer, stacked, scrolled natively. Desktop keeps the full layered parallax reveal unchanged.

This matches what the author already started — the mobile `SelectedWork` is a plain column stack commented _"Optimized for 0 jitter"_. The job is to extend that principle to the **whole page** so `useHomeScroll`'s transforms / fixed layers never run on mobile.

### 9.4 Implementation guidance for the agent doing this

**Confirm the approach with current code before starting; this is a behavior change — brainstorm/plan it.**

- **Branch the render in `page.tsx`** by device. Mobile branch: normal-flow sections, no `position: fixed`, no `style={{ y: ... }}` MotionValues, no `useHomeScroll` transform outputs. Desktop branch: existing behavior untouched.
- **Do not call `useHomeScroll`'s transform machinery on mobile** (or make it a no-op on mobile so no `useScroll`/`useTransform`/resize-scrollTo runs). The `scrollTo`-on-resize (lines 96–111) must NOT run on mobile.
- **Anchor-based nav:** "Browse work" / "Get in touch" should become anchor scrolls (`scrollIntoView`) on mobile rather than progress-target math.
- **Viewport height:** prefer `100svh` for stable full-screen sections (FullpageCard already uses `min-h-[100svh]` ✅). Avoid `dvh`/JS `innerHeight` for anything that affects layout during scroll. If a JS height is unavoidable, set a `--vh` CSS var **once** on mount (throttle any resize 100–200ms) instead of reading `innerHeight` live.
- **Strip permanent `will-change`** on the mobile branch (nothing is being transformed, so it's pure cost).
- **Keep the WebGL blob decision explicit** — owner wants "super optimized"; confirm whether mobile hero keeps the single optimized blob (signature visual) or drops it for max perf. Do not silently change it.
- **Reuse existing mobile variants** — `SelectedWork` mobile column stack, `FullpageCard`, Footer already have mobile paths. Prefer composing them over new code.
- Respect the 300-line rule; if `page.tsx`/`use-home-scroll.ts` grow, split the mobile path into its own component/hook.

**Verification (mandatory):**

- Test on a real device or DevTools device mode with CPU 4–6× throttle. Record a Performance trace while scrolling; confirm no long main-thread tasks per frame and no layout thrash on address-bar show/hide.
- Confirm desktop parallax is byte-for-byte unchanged (diff the desktop branch).
- `bun run validate` passes.
- No `position: fixed` transform layers present in the mobile DOM (inspect).

### 9.5 If owner ever reverts to "keep the effect" (option B — NOT chosen, for reference)

Surgical-only path (reduces but does not eliminate jitter): lock viewport height to a `--vh` var set once; remove the mid-scroll `scrollTo`; drop permanent `will-change`; gate `heroPointerEvents`/`transition-all`; consider `useSpring` smoothing. Document says this won't be perfectly buttery because main-thread transform lag remains — that's why option A was chosen.

### 9.6 ✅ FIXED — Native-flow mobile homepage (2026-06-22)

**Implemented:** Sticky-stack mobile home (`HomeMobile.tsx`) with CSS scroll-driven hero dim / blob scale / card scrim (`home-mobile-scroll.css`). Desktop path extracted unchanged to `HomeDesktop.tsx`. Branch via `useMobileHomeLayout()` — `(max-width: 767px), (pointer: coarse)`.

**Also shipped with this fix:**
- Selected Work: `whileInView` once entrances on title + cards (`mobileHomeEntrance`), `15svh` breathing room after featured card
- Viewport: `100svh` section heights, `12svh` hero top padding (`stableMobileViewport`), safe-area insets — no `dvh` on sticky layout, no `useHomeScroll` on mobile
- Footer mobile-flow: normal document footer, staggered entrance, **lite smog** (static gradient swells, 28px blur, 6 dust particles via IO-gated canvas, no SVG dither, no swell animation)
- WebGL blob kept on mobile; pauses via IntersectionObserver when featured card enters

**Verified:** `bun run type-check` passes; eslint clean on touched files (pre-existing Footer IO lint elsewhere). Manual mobile viewport check recommended before merge.

**Files:** `src/components/home/HomeMobile.tsx`, `HomeDesktop.tsx`, `src/hooks/use-is-mobile-home-layout.ts`, `src/styles/home-mobile-scroll.css`, `src/app/page.tsx`, `SelectedWork.tsx`, `Footer.tsx`, `FooterSmog.tsx`, `FooterDustParticles.tsx`, `Hero.tsx`, `FullpageCard.tsx`

---

---

## 10. COMPLETE MOBILE PERFORMANCE DIAGNOSIS (added 2026-06-22)

> Whole-site sweep: load path, fonts, bundle, assets, CSS, runtime, and the case-study/secondary routes. The homepage scroll architecture (§9) remains the #1 _feel_ problem; this section covers everything else. **No fabricated metrics** — severity is relative, measured numbers must come from a real Lighthouse/WebPageTest run on a throttled device.
>
> Same safety rules as §0 apply: re-read each cited line, confirm `[NEEDS-CONFIRM]` items, one concern per change, don't touch the §2 DO-NOT-TOUCH list, verify on a real mobile profile.

### 10.A — Network & asset weight 🔴 (the biggest non-scroll cost)

- **Status:** ✅ **Fixed (2026-06-22)** — AVIF sources, `public/` slimmed, all `src/` refs `.avif`, `sizes` on Alo/social images, `CASE_STUDY_*_IMAGE_QUALITY` (75 content / 85 hero), `CaseStudyReadMore` mounts children only when revealed (`mode="wait"`).
- **`public/` is ~344 MB** `[V]` — 303 MB images, ~69 MB of referenced video. `find public -type f -size +1M` → **74 images over 1 MB**.
- **Oversized sources, incl. "optimized" copies that aren't** `[V]`:
  - `nyc-dcwp-business-licenses/old-dcwp-page.png` **20 MB** AND `old-dcwp-page.webp` **14 MB** (the webp is still enormous — false optimization).
  - `pratt-service-design-hero-8k.png` **13 MB**, `gutenberg/hero.png` **6.8 MB**, `alo-yoga/alo_insta.png` **7.4 MB** (+4.5 MB webp), plus ~dozen 3–5 MB files.
- **Why it hurts mobile:** even though next/image transcodes to AVIF/WebP at delivery, (a) any image referenced as a raw `<img>`, video `poster`, or CSS background ships the multi-MB source as-is; (b) `quality` is set high (92 in `ProjectCard`, reportedly 95 in `CaseStudyDetail` `[NEEDS-CONFIRM]`); (c) media inside collapsed "Read more" sections loads eagerly.
- **Fixes (per-image, with visual check):**
  1. Re-encode/resize all source images to a sane max (~2560px wide) and modern format; delete the redundant giant `.webp` twins **only after confirming nothing references them** (look before deleting).
  2. Ensure **every** case-study/grid image goes through `next/image` with a correct `sizes` prop (several lack it — `[NEEDS-CONFIRM]` `alo-yoga/AloSocialSection.tsx` images use `width/height` but no `sizes`).
  3. Lower `quality` to ~70–75 for non-hero imagery.
  4. **Lazy-load media in collapsed sections** (`CaseStudyReadMore` children) so hidden 4–7 MB images don't download until revealed.
  5. **Gate card/fullpage autoplay video to desktop** (already in §4 P2) — confirmed `ProjectCard.tsx:316–326` and `FullpageCard.tsx:117–125` autoplay with no mobile branch `[V]`.

  5. ~~**Gate card/fullpage autoplay video to desktop**~~ ✅ IO play/pause instead — see P2 / `use-video-playback-in-view.ts`.

### 10.B — Critical-path load, fonts, bundle

- **Status:** ✅ **Fixed (2026-06-22)** — Material Symbols scoped to `UAlbertaLibraryContent` via `MaterialSymbolsFont.tsx`; `next.config` `minimumCacheTTL` → 30 days + `optimizePackageImports: ['framer-motion']`; all Library directory prototypes use `<m.>` not `<motion.>`; removed dead `framer-motion` import from `LibraryServicesHero.tsx`.
- ~~**🔴 Render-blocking Google Fonts in the root `<head>`**~~ ✅ `[V]` — was `layout.tsx:35–38` **Material Symbols Rounded** sitewide; now only UAlberta Library case study (`MaterialSymbolsFont.tsx` in `UAlbertaLibraryContent.tsx`). Icons: `check_circle` in `LibraryLocationCard.tsx`; 13 subject icons in `SubjectGuidesPrototype.tsx`.
- ~~**🟡 Mixed Framer Motion imports**~~ ✅ — Library files now `<m.>` paired with `LazyMotion` in `AppProviders`.
- ~~**🟡 `next.config`**~~ ✅ — `minimumCacheTTL: 2_592_000` (30d), `experimental.optimizePackageImports: ['framer-motion']`.
- **✅ Good:** local fonts `display:swap` + variable; `JetBrains_Mono`/`Mynerve` `preload:false`; **GSAP is code-split** (`PaperPlaneFlight` is `dynamic()` in `FooterMessageSection.tsx:16`) so it never ships on initial load `[V]`; home dialogs/`SelectedWork`/`Footer` are `dynamic()`.

### 10.C — Runtime / animation cost on mobile

- **🔴 Homepage fixed-layer transform machine** — see §9. Root cause of jank; dominates everything here.
- **🟡 `CaseStudySideNav`** `[NEEDS-CONFIRM]` — IntersectionObserver updates `activeId` state on scroll → re-render per active-section change while scrolling a case study. Throttle via RAF / only setState on actual change.
- **🟡 `CaseStudyVideo` progress** `[NEEDS-CONFIRM]` — `timeupdate` fires ~4–60×/s and drives a React state update + progress-bar re-render. Throttle to ~10/s or drive the bar via a ref/CSS var instead of state. (Note: the video itself is well-built — `preload="none"`, IO-gated play, reduced-motion aware.)
- **🟡 `whileInView` with `viewport={{ once: false }}`** `[NEEDS-CONFIRM]` in `ExplorationsGrid` (and the desktop `SelectedWork` grid) re-runs entrance animations every time cards scroll in/out. Use `once: true` where re-animation isn't intended.
- **🟡 `WorkFilter`** `[NEEDS-CONFIRM]` — word-level stagger (~30–40 motion nodes, `delayChildren ~0.9`) animates on `/work` load; gate the per-word animation off on mobile.
- **🟢 `use-interactive-gradient`** `[V]` attaches a `document` `mousemove` listener unconditionally (`use-interactive-gradient.ts:95`), used by `GradientBar` on `/work`. Idle on touch (no mouse) but a wasted always-on listener — gate behind `(hover:hover)` / non-coarse. Low priority.
- **✅ Good / already gated:** `FooterDustParticles` canvas RAF returns `null` on mobile and only starts via IntersectionObserver (`FooterDustParticles.tsx:56,150,170`) `[V]`; `SelectedWork` scroll listener and `ProjectCard` recede effect are `isDesktop`-gated; Lenis off on touch.

### 10.D — CSS rendering

- **✅ CORRECTION to §4 P5:** the footer résumé **`travelingGradient` and `shimmer-glow` are wrapped in `@media (hover: hover)` and explicitly neutralized in `@media (max-width:767px),(hover:none)`** (`globals.css:312,393`) `[V]` — they do **NOT** run on mobile. Do not "fix" them; the earlier flag was wrong.
- **🟡 Permanent `will-change`** on ~5 always-mounted homepage layers (`page.tsx`) — see §9 A2. Strip on the mobile native-flow branch.
- **🟡 `transition: all`** smells: `FullpageCard.tsx:87` (`transition-all duration-500`) and `globals.css:334,353`. Scope to specific properties.
- **✅ Good:** `TextureOverlay` swaps SVG filter → static texture on mobile/Safari; `ProgressiveBlur` capped to 3 steps on mobile; shimmer disabled on mobile. CSS is generally mobile-aware.

### 10.E — Case-study content (parse + mount cost)

- **🟡 Whole case study mounts at once** `[NEEDS-CONFIRM]` — content components are huge and render their entire tree (all sections + media) on open; "Read more" toggles visibility via `AnimatePresence`, not virtualization. On a phone that's a large synchronous DOM/JS mount.
- **🔴 300-line rule broken (also a parse-cost issue)** `[V]`: `PrattVisitorExperienceContent.tsx` **2,079**, `GutenbergContent.tsx` **1,476**, `MetFreeToursContent.tsx` **917**, + several 400–784. Splitting into per-section components (and lazy-mounting below-the-fold / behind "Read more") cuts initial parse + mount on mobile and fixes the rule violation in one move.

### 10.F — Prioritized action list (mobile perf)

1. ~~**§9 native-flow homepage**~~ ✅ Done — see §9.6.
2. ~~**10.A image/video pipeline**~~ ✅ Done — AVIF, sizes, quality, read-more lazy mount, video IO play/pause.
3. ~~**10.B fonts + bundle + `next.config`**~~ ✅ Done — see §10.B status.
4. **10.C runtime** — throttle `CaseStudyVideo`/`CaseStudySideNav`, fix `once:false`, gate `WorkFilter` stagger on mobile. **← next**
5. **A1** — `CaseStudyDialog` focus trap + dialog semantics.
6. **A2** — reduced-motion in desktop parallax + dialog slides.
7. **10.E / M3** — split 300-line case study files; lazy-mount below-the-fold sections.

**Before claiming any of this improved anything:** capture a _baseline_ Lighthouse mobile + Performance trace (CPU 4–6× throttle) on `dev`, make the change, re-measure, and compare. Severity tags above are reasoning, not measurements.

---

_Findings tagged `[V]` were read directly during the audit. `[NEEDS-CONFIRM]` came from exploration and must be verified before action. Line numbers are accurate as of 2026-06-22 on `dev` and will drift — always re-read._
