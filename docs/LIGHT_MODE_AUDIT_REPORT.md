# Light-Mode Audit Report

_Date: 2026-06-23 · Branch: `dev` · Method: full user-journey trace + 7 parallel component audits + token/contrast verification + 2024–2026 best-practice research_

> **Note:** This is a fresh, comprehensive audit. A prior planning note exists at `docs/LIGHT_MODE_AUDIT.md` (March 2026) — it overlaps with and independently confirms several findings here (FooterDustParticles white particles, NavButton `dark:` mismatch, FooterSmog over-saturation, the WaterBlob "ink on paper" `multiply` strategy, layered-whites depth). That file was left intact; this report supersedes it in scope.

## Context

The site was built **dark-first**; light mode was added later as the *nominal default* (`:root` in `design-tokens.css`, with dark scoped to `[data-theme="dark"]`). As a result, light mode is correct in the broad strokes — most components are token-driven and flip cleanly — but it carries a long tail of **dark-first leftovers**: white/black colors hardcoded for a black canvas, accent tokens never re-tuned for a white background, WebGL/canvas effects whose math only works on black, and low-contrast grays/pastels used as real text.

This report traces the journey **Landing → Hero → Home scroll → Work → Footer → Case studies**, plus the global theming foundation.

---

## TL;DR — the five things that actually matter

1. **Light mode is never restored on reload (guaranteed dark flash).** `layout.tsx` hardcodes `data-theme="dark"`, `ThemeProvider` initializes state to `'dark'` and **never reads `localStorage`** (it only writes it). There is **no anti-FOUC `ThemeScript`** despite a comment claiming one exists. A user who picks Light gets dark on every fresh load until they re-toggle. _Verified._
2. **`--cs-pop-light` / `--cs-pop-dark` are used 8× but defined 0×.** This is the primary accent for case-study **progress bars, hero accent bands, "The End" headings, and the side-nav active state** — all render with an invalid/empty color in both themes. _Verified._
3. **The entire hero (WaterBlob) is additive/emissive math designed for black.** The shader always uses the *dark* palette, ignores the authored light palette entirely, and its glow/plasma/trail blow out to white on the light background. The "flash lights the navbar" beat is invisible in light. _(The prior plan already proposes the `multiply` "ink on paper" fix.)_
4. **`--color-case-study-gold` (#FFCE2E) and `#FF8C00` are used as *text* on white** (Pratt headline stats, BLV highlights/annotations) at ~1.6–2.3:1 — effectively illegible. Several pastel case-study tokens were never given readable light variants.
5. **A recurring contrast tax:** `text-color30/40/60` and a few status colors are used for real body/label text and fail WCAG AA on the light background.

### Severity totals (de-duplicated across the journey)

| Severity | Count (approx.) | Meaning |
| :-- | :-- | :-- |
| **High** | ~28 | Broken / invisible / unreadable in light mode |
| **Medium** | ~49 | Poor contrast, off-brand, or inconsistent in light |
| **Low** | ~28 | Polish / token-hygiene nits |

---

## A. Systemic / cross-cutting issues (fix these first — they fan out everywhere)

### A1. [HIGH] Theme is not persisted/restored → dark flash on every load
- **Files:** `src/components/providers/ThemeProvider.tsx:35,37-39`, `src/app/layout.tsx:33`
- **Problem:** `useState<Theme>('dark')` hardcodes initial state; the only effect *writes* `theme` to the DOM and never reads `localStorage`. `setTheme` does `localStorage.setItem('theme', …)` but **nothing ever calls `getItem('theme')`** (verified: 0 reads in `src/`). `layout.tsx:33` ships `<html data-theme="dark">`. The comment at `ThemeProvider.tsx:32-34` references a "ThemeScript" that does not exist anywhere.
- **Light-mode impact:** Server renders dark → first paint dark → hydration state is `'dark'` → effect re-writes dark. Light is **never restored on a fresh load**; only a manual re-toggle brings it back. This is the single largest light-mode defect.
- **Fix:** Add a blocking inline `<script>` in `<head>` (`layout.tsx`, via `dangerouslySetInnerHTML`) that reads `localStorage.getItem('theme')` (fallback `matchMedia('(prefers-color-scheme: …)')` or your chosen default) and sets `document.documentElement.dataset.theme` **before first paint**. Initialize `ThemeProvider` state lazily from the DOM attribute, not the literal `'dark'`. Add `suppressHydrationWarning` to `<html>`.

### A2. [HIGH] `--cs-pop-light` / `--cs-pop-dark` are undefined (8 usages, 0 definitions)
- **Files (usages):** `CaseStudyLayout.tsx:71` (scroll progress bar), `CaseStudyDetail.tsx:110` (hero accent band), `AloYogaContent.tsx:75,291` (side-nav active + "The End"), `GutenbergClosingSection.tsx:68`, `NycDcwpBusinessLicensesContent.tsx:129`, plus `AnimatedBars` `filledColor` in Gutenberg findings.
- **Problem:** Neither var is declared in any CSS file or any `setProperty()` call (verified). `ThemeScoper` only sets `--cs-theme-color`.
- **Light-mode impact:** Progress bar, hero accent band, accent headings, and finding-chart bars resolve to no color → transparent/inherited. The case-study accent system is effectively dead.
- **Fix:** Define `--cs-pop-light` / `--cs-pop-dark` (likely derived from `--cs-theme-color`, light/dark variants) in `ThemeScoper` or `design-tokens.css`, **or** replace usages with a real token (`--color-primary`, `--color-alo-progress`, etc.).

### A3. [HIGH] WaterBlob hero is built additive/emissive for a black background
- **Files:** `waterBlob.colors.ts:54-56`, `waterBlob.shader.ts:174-178,216-249`, `hero-flash-head.ts:203-227`, `waterBlob.palettes.ts:46-174`
- **Problem:**
  - `getPalettePair(idx, 'dark')` is **hardcoded** — the canvas always uses the vivid dark palette; the carefully authored `light` palette pairs in `waterBlob.palettes.ts` are **never rendered** (dead code).
  - The shader composites additively: `color = backgroundColor * (1.0 + glowIntensity)`, white trail `color += vec3(1.0) * …`, ambient `mix(uColor1, vec3(1.0), 0.7)`, and an F1 "plasma" thermal rim with a white-hot stop (`vec3(1.0,1.0,0.97)`). On a black canvas this reads as "light emerging from black"; on `#F7F7F5` it **clips to white** and washes out.
  - The F1 flash + white nav-glow run on desktop in **both** themes (gated only on `!isMobile`, never theme); `hero-flash-head.ts` emits `rgba(255,255,255,…)` drop-shadows.
- **Light-mode impact:** Blobs are pale/washed; the ignition flash is a harsh white smear or invisible; the "flash lights the navbar/logo" beat does nothing on a light navbar.
- **Fix:** Thread theme into the shader (re-introduce a `uTheme`/`uIsDarkMode` uniform — the shader comment notes it was removed because "always 1.0 at runtime"), branch glow/plasma/trail to **subtractive/pigment (`mix-blend-mode: multiply`)** in light (matches the prior plan's "ink on paper"), flip `getColors` to the `light` palette, and drive nav-glow color from a token per theme.

### A4. [HIGH] `text-primary-main` is not a real token (2 usages)
- **File:** `PlatformRoleGrid.tsx:31,55` — only `--color-primary` exists; `text-primary-main` generates nothing → "Proposed" accent washes out. **Fix:** `text-primary`. _Verified undefined._

### A5. [HIGH] Dark-first base CSS: `.shimmer-glow` & `.footer-resume-link` default to white
- **File:** `globals.css:336-358,380-395` (base) corrected only at `:360,:398` (`[data-theme='light']`)
- **Problem:** Un-prefixed base rules use white gradients + white text-shadows; light is fixed only by a more-specific override. Backwards for a "light-default" system — white should be gated behind `[data-theme='dark']`. White-on-white in the FOUC/no-JS window (compounds A1).
- **Fix:** Invert the cascade: black/token version as base, white under `[data-theme='dark']`. Replace `rgba(0/255…,1)` peak stops with `rgb(var(--color-foreground) / α)`.

### A6. [HIGH] Dead `@media (prefers-color-scheme: dark)` block
- **File:** `design-tokens.css:280-313` — targets `:root:not([data-theme])`, but `data-theme` is always present (A1) → never matches. ~33 lines of dead code defining a *third, divergent* dark palette (bg `#0A0A0A` vs real `#000`); line 290 has a "106% opacity" comment bug. **Fix:** Delete; implement OS auto-detect in the A1 ThemeScript.

### A7. [MEDIUM] `.hero-gradient-light` and `.hero-gradient-dark` are byte-identical
- **File:** `globals.css:160-181` — both bodies identical (difference comes only from `--hero-blob-*` tokens); comments claim distinct "pigment"/"emissive" strategies never implemented. This is the WebGL **fallback** (reduced-motion / save-data) and was never tuned for light. **Fix:** Collapse to one class, or genuinely differentiate light (`background-blend-mode: multiply` + higher opacity). _(Prior plan item #4: reduce hero gradient opacity to 55–70%.)_

### A8. [MEDIUM] Low-contrast gray tokens shipped as text utilities
- **File:** `design-tokens.css:24-28`; utilities `globals.css:528-545`
- **Measured on `#F7F7F5`:** `color30` #BFBFBF = **1.71:1**, `color40` #A9A9A9 = **2.19:1**, `color60` #7E7E7E = **3.78:1** (all fail AA 4.5:1 body; 30/40 fail even 3:1 UI). The ramp is also **non-monotonic** — `color60` is darker than `color70` (#777).
- **Fix:** Don't ship `color30/40` as *text* utilities; stop using `color60` for <18px text → use `--color-text-tertiary-50` (#5D5D5D, ~6.1:1) or `--color-text-body` (#444). Recompute the ramp to be monotonic.

### A9. [MEDIUM] Semantic + accent colors not re-tuned for light
- **File:** `design-tokens.css:42,53-55`
- **Measured on `#F7F7F5`:** `warning` #FB923C = **2.11:1**, `error` #EF4444 = **3.51:1**, `info` #3B82F6 = **3.43:1** — fail for text (`success` *was* correctly darkened to #166534 = 6.65:1; the others weren't). `accent` #4F46E5 passes but is the bright dark-mode flavor.
- **Fix:** Darken warning/error/info for light like `success`; give `accent` a light-tuned lower-chroma variant.

---

## B. Findings by user-journey section

### B1. Landing / Hero
Covered by A3 (WaterBlob) and A7 (gradient duplication). Additional:
- **[MEDIUM] `globals.css:238-259`** — pronunciation tooltip is gradient-clipped text using `--color-gradient-start/end`; for several light palettes the mid-tones fail 4.5:1 on `#F7F7F5` (thin handwriting font worsens it). Use `--color-scribble` as a contrast floor.
- **[MEDIUM] `hero-flash-head.ts:203-227`** — nav flash filter/text glow hardcodes white; invisible on the light navbar/logo.
- **[MEDIUM] `HeroFlashWelcome.tsx:79`** — hardcoded `text-black` (feature flag-disabled, but off-token). Use `text-foreground`.
- **[LOW] `globals.css:220-224`** — scribble underline falls back to the palette start color for palettes without a `scribble` override; gray/ice palettes read faint on white.

### B2. Global chrome — navbar, mobile menu, footer, overlays
- **[HIGH] `FooterDustParticles.tsx:139-144`** — dust motes are `rgba(255,255,255,α)` in **both** themes (light branch only boosts alpha). White motes wash out on the light footer (#E8E8E8). Branch the RGB (use `--color-foreground`), not just alpha. _(Confirms prior plan #1.)_
- **[HIGH] `RatingCategory.tsx:54`** — empty-star border hardcoded `rgba(255,255,255,0.2)` → invisible on light, rating control looks broken. Use `rgb(var(--color-border))`.
- **[HIGH] `PageOverlay.tsx:138`** — `backgroundColor: 'hsl(var(--background))'` is a **broken token reference** (wrong name `--background`, and tokens are RGB-triplets used with `rgb()`, not `hsl()`) → transparent panel, page bleeds through. Use `rgb(var(--color-background))`. _(Confirm PageOverlay is still mounted — may be legacy; the active `RouteSlideDialog` is correct.)_
- **[MEDIUM] `FooterSmog.tsx:147`** — `mixBlendMode: 'screen'` in light lightens colored smog toward white on the near-white footer → much weaker than dark. Consider `multiply` (or `normal` w/ tuned alphas). _(Confirms prior plan #2.)_
- **[MEDIUM] `AccessibilityModal.tsx:390,403`** — dropdown panel `bg-foreground/95` (near-#111 dark panel) in light with `bg-foreground/10` active-row = dark-on-dark, invisible. Use `surface-elevated` panel + appropriate highlight.
- **[MEDIUM] `ReadingGuide.tsx:270`** — tooltip `bg-black/80 text-white border-white/10` (dark-only); legible but off-brand/off-token in light.
- **[MEDIUM] `NavButton.tsx`** — the documented intent vs implementation drift around `dark:`/`[data-theme]`; the render is correct, but the prior plan (#3) flags the system mismatch — worth reconciling the comments/JSDoc.
- **Clean (verified):** `Navbar`, `MobileMenu` (backdrop branches per theme), `ProgressiveBlur` (mask-only alpha), `CaseStudyDialog`/`RouteSlideDialog`, `A11yFilterOverlay`, `PaperPlaneFlight`, `FooterClock`/`FooterLinks`/`FooterMessage`. `TextureOverlay` opacity correctly theme-tuned.

### B3. Home scroll + Work pages + shared UI
- **[HIGH] `FullpageCard.tsx:179,186-187,194,205-207`** — featured/home card text is unconditionally `text-white`/`rgb(255 255 255)` (relies on dark media behind it). For `variant="light"`/`surface` or the `mediaError` fallback (`bg-gray-dark` #333 / `bg-background`), white text is wrong/invisible. Drive text color off `variant`.
- **[HIGH] `ProjectCard.tsx:291`** — `[data-theme='dark']:bg-black/10 [data-theme='light']:bg-white/10` are **malformed variants** → the light tint never renders (and would be wrong anyway). Use `dark:bg-black/10` + token scrim (`bg-foreground/5`) for light.
- **[HIGH on /work] `ProjectCard.tsx:281-286`** — masonry image letterbox hardcoded `#111` → hard black rectangle behind contained images on the light grid. Use `surface-muted`/`surface-elevated`.
- **[MEDIUM] `ProjectCard.tsx:256` & `FullpageCard.tsx:102`** — `[data-theme="dark"]:shadow-none` malformed variant (intended `dark:shadow-none`); silently does nothing.
- **[MEDIUM] `GrayFrame.tsx:18`** — light base `bg-[#CECFCD]` hardcoded hex (off-token, darker than `--color-surface-muted`).
- **[MEDIUM] `WorkFilter.tsx:33,93,203-204,281,288`** — unselected filter labels `color40`, slash `color30`; 16px mobile variant fails AA. Bump to `--color-text-tertiary`/`secondary`.
- **[MEDIUM] `not-found.tsx:23`/`error.tsx:41`/`ErrorBoundary.tsx:77`** — `text-white` on `bg-primary` (passes light, borderline dark); consider `--color-on-primary` token.
- **[LOW]** `HoverButton` muted idle `color30`; `HoverLink` coming-soon `color60` (small).
- **Clean (verified):** `HomeDesktop`/`HomeMobile`, `SelectedWork`, `MasonryWorkGrid`/`MasonryGrid`/`ExplorationsGrid`, `page.tsx`, `/explorations`/`/writings`/`/about`, `AnimatedLink`, `GradientBar`, `AnimatedText`, `PaperPlane`/`AnimatedArrow`, `ScrollContainer`, `LineSeparator`.

### B4. Case studies — framework
Covered by A2 (`--cs-pop-*`). Additional:
- **[LOW] `CaseStudyVideo.tsx:189`** — `bg-black` video letterbox heavy on a light page; consider `surface-elevated`.
- **[LOW] `OptimizedImage.tsx:69`** — shimmer placeholder white-only `rgba(255,255,255,0.15)` over light `surface-muted` → nearly invisible. Use foreground-tinted shimmer.
- **[LOW] `CaseStudySideNav.tsx:21`** — default `themeColor='#4285F4'` hardcoded; use `--color-primary`.
- **Clean:** `FigmaPresentationDetail`, `ShowcaseHero` (text-white over dark photo scrim — correct), `CaseStudyContentRenderer`, `ThemeScoper`.

### B5. Case studies — Alo Yoga & Pratt
- **[HIGH] Pratt `case-study-gold` (#FFCE2E) as text** — `PrattSurveyAnalysisAccordionsSection.tsx:27,264`, `PrattIntervention1Section.tsx:45,73`, `PrattIntervention2ChangesLateSection.tsx:153`, `PrattConclusionSection.tsx:10`. Headline stats, phase labels, list numbers, "The End" at ~1.6:1 — illegible on white. Replace with readable accent / `text-text-primary`.
- **[MEDIUM] `pratt-shared.tsx:89-122` (`OpportunityAreas`)** — hardcoded near-black card (`rgb(10 10 10)`, `text-white`) embedded 5× in a light page; readable but jarring/non-adaptive.
- **[MEDIUM] `AloCompetitiveSection.tsx:72,86,99`** — stat captions `text-color60` (3.8:1) fail AA → `text-tertiary`.
- **[MEDIUM] `AloSearchPositionMap.tsx:22,303`** — crosshair/tooltip stroke `color40` (2.2:1) below 3:1.
- **[LOW]** `AloSEOPieChart.tsx:57,74,90` hardcoded donut hexes; `AloKeywordRecommendations.tsx:106` bullet `color30` (invisible).
- **Token-hygiene only (pass on white):** Pratt priority hexes; Alo CWV/Lighthouse colors (explicit light+dark pairs).
- **Acceptable (in-world UI):** `AloSearchForbidden` Google mockup; Alo fixed light-gradient panels.

### B6. Case studies — Gutenberg, BLV-Museum, DCWP, NYC Third Spaces
- **[HIGH] BLV `#FF8C00` as text/markers** — `MuseumAnalysis.tsx:38-51,126-128,207,250-256`. Orange text/highlights/annotations/bullets ~2.3:1 on white; some lack `dark:`. Use a darker light-mode orange (`--color-scribble`) for foreground; keep `#FF8C00` only as a tint bg.
- **[HIGH] `MarketVoidVenn.tsx:18,27,32`** — Venn circle/label hardcoded `#1F3A66` navy at 10–30% opacity; invisible in dark, faint in light. Use a theme-flipping token.
- **[HIGH] NYC `--color-case-study-purple` (#9370DB) as heading/label text** — `NycThirdSpacesContent.tsx:35,110,718` + many inline spans, ~3.4:1. Dark value is even lighter, so the token can't double as text — add an accessible light purple (or reuse `--hero-blob-purple` #6E4BC3). Also `:126` `#4B8AC0` (3.3:1) and `:142` `#D97706` (2.9:1) labels fail.
- **[MEDIUM] `text-color60` body/caption text** — `ChecklistProblemSection.tsx:34`, `GutenbergMethodologyIntroSection.tsx:91,118,146,174`, Gutenberg Finding captions, BLV captions — sub-18px at 4.06:1 fail AA → `text-tertiary`/`text-body`.
- **[MEDIUM] BLV sticky-note pastels** — theme-handled but near-white on the bone page (borderless); polish.
- **Clean (verified):** **All DCWP process-flow SVGs** use a theme-aware `checklistProcessFlowPalette.ts` via `useTheme()` — the prime-suspect diagrams are correct. Gutenberg is otherwise token-based with proper light semantic colors.
- **Note:** Static AVIF charts (SUS diagrams, time-on-task, etc.) couldn't be code-audited — visually re-check any exported on a dark background.

### B7. Case studies — Library suite, UAlberta, Aquitania/Cunard, MET, Snakes
- **[HIGH] Note-badge numerals invisible in light** — `UAlbertaServiceIterationsSection.tsx:10-13` & `UAlbertaExplorationNotesPanel.tsx:15-18`: light variant `bg-[#2a7a52] text-[#0f5f38]` (1.48:1) and `bg-[#b84d4d] text-[#6b2020]` (2.27:1) — dark text on saturated fill. The `dark:` variants read fine → light value never corrected. Use light text on the fill (`text-white`).
- **[MEDIUM] `CunardHandwrittenProblems.tsx:6-7`** — handwritten gold `#A39458` = 2.82:1 (dark variant lightens, light doesn't darken). Darken light value (~#6b5d2e).
- **[MEDIUM] Pull-quote body `text-color60`** — `MetFreeToursContent.tsx:60-62` & `UAlbertaLibraryContent.tsx:86-88` (3.78:1, 18px italic). Use `text-secondary`/`color70`.
- **[MEDIUM] `ImagePlaceholder` dashed border `color20`** (#D4D4D4, ~1.3:1) — UAlberta:38-65, Met:12-40; near-invisible (likely pre-launch placeholders).
- **Acceptable (in-world product UI — must NOT flip):** entire **Library suite** (13 files, replicas of the UAlberta Library site in fixed colored frames); `ResearchObjectiveNotes` paper skeuomorph; Aquitania gold-gradient video wrappers; `UAlberta…:CECFCD/dark:white-15%`.
- **Clean:** `SnakesShowcaseContent`.

---

## C. Best-practice comparison (2024–2026)

1. **Avoid pure-white glare; convey elevation via surface tint, not just shadow.** Page bg is correctly warm off-white `#F7F7F5` ✓, but cards are pure `#FFFFFF` and hierarchy leans on `--shadow-*`. Lead with surface tint (`surface-elevated` #F1F3F5 exists); reserve pure white for the top level. _(uxgen.academy, graphiceagle.com)_ — matches prior plan #7.
2. **Re-test contrast per theme — AA 4.5:1 text / 3:1 large+UI.** Core text ramp passes (foreground 17.6:1, body 9.1:1, secondary 6.95:1, tertiary 6.1:1, color70 4.17:1) ✓, but `color60/40/30`, `warning/error/info`, and pastels fail and are used for real text. Add a per-theme contrast check to `bun run validate`. _(web-accessibility-checker.com, boia.org)_
3. **Desaturate/darken accents for a light background.** `primary` and hero blob *tokens* were re-tuned ✓, but `accent`, semantics, pastels, and the WaterBlob canvas (A3) still carry dark vibrancy. Apply per-theme treatment consistently via `oklch()`/`color-mix()`. _(accessibilitychecker.org, devpalettes.com)_

---

## D. Suggested fix roadmap

**Phase 1 — Architecture (unblocks correctness):**
1. A1 ThemeScript + DOM-initialized provider.
2. A2 define `--cs-pop-light/dark`; A4 `text-primary-main`→`text-primary`; A6 delete dead media block.
3. A5 invert `.shimmer-glow`/`.footer-resume-link` cascade.

**Phase 2 — Visible breakage:**
4. A3 theme the WaterBlob shader/palette/flash (`multiply` "ink on paper").
5. B-tier HIGHs: FooterDustParticles, RatingCategory, PageOverlay, FullpageCard `text-white`, ProjectCard malformed variants + `#111` letterbox, note-badge text, BLV `#FF8C00` text, NYC purple text, Pratt gold text.

**Phase 3 — Contrast & token hygiene:**
6. A8/A9 fix the gray ramp + semantic/accent light values; sweep `text-color60`-as-body across case studies; promote hardcoded chart hexes to tokens.

**Phase 4 — Polish & guardrails:**
7. A7 gradient dedupe; surface-tint depth (#FFFFFF cards vs tinted bg); shimmers/letterboxes/tooltips; per-theme contrast lint in `validate`; visual re-check of static AVIF charts.

---

_All findings were produced by read-only inspection; no source files were modified. The three highest-leverage claims (A1 FOUC, A2 undefined `--cs-pop-*`, A4 `primary-main`) were independently verified via grep._
