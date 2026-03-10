# Performance Improvement Plan

**Data source:** `docs/LIGHTHOUSE_PERFORMANCE_PLAN.md` (raw audit data, Catchpoint/Lighthouse run 2026-03-10)
**Baseline:** Performance 0 (Lighthouse timeout), LCP 3,544ms (target <2.5s), PWA 29/100
**Infrastructure:** CDN, compression, caching all 100/100 — no infra changes needed

---

## Session State — Resume Here

> **Update this block at the end of every session.**
> This is the single source of truth for resuming across token-limit resets.

**Last updated:** 2026-03-10
**Current tier:** Tier 3 complete — awaiting Tier 4 approval
**Build status:** ✅ Clean (`bun run build` passes, zero TS errors)

### Completed

| # | Fix | Status | Notes |
|---|-----|--------|-------|
| 1.1 | Create `public/site.webmanifest` | ✅ Done | Icon PNGs (`icon-192.png`, `icon-512.png`) still needed in `public/icons/` — pending user export from Figma |
| 1.2 | `id="main-content"` on `<motion.main>` | ✅ Done | `src/app/page.tsx` line 154 |
| 1.3 | `prefetch={false}` for missing routes | ✅ Done | `HoverLink.tsx` (new prop), `Navbar.tsx`, `Hero.tsx`, `MobileMenu.tsx` |
| — | Fix pre-existing TS error | ✅ Done | `ShowcaseHero.tsx`: `RefObject<HTMLDivElement>` → `RefObject<HTMLDivElement \| null>` |
| 2.1 | Conditional `priority` on `FullpageCard` | ✅ Done | `FullpageCard.tsx`: `priority` prop added (default `false`), replaces hardcoded `priority`. Card is below-fold — no call site needs `priority={true}`. |
| 2.2 | Cache headers for font + favicon | ✅ Done | `next.config.ts`: `/fonts/(.*)` → `max-age=31536000, immutable`; `/favicon.ico` → `max-age=86400` |

### Next action

**Plan complete.** All actionable items resolved. LCP stays ~3.6s (animation kept by design). Run `bun run lhci` after next production deploy to confirm no regressions.

### Completed (post-plan accessibility pass)

| # | Fix | Status | Notes |
|---|-----|--------|-------|
| A | Skip links not focusable | ✅ Resolved | Caused by ThemeProvider `return null` (fixed 2026-03-07). Skip link now in SSR output. |
| B | Invalid ARIA role on `<section>` / `<article>` | ✅ Fixed | Removed `role="button"` (not allowed on those elements); added `aria-label="View [title] case study"` in `FullpageCard.tsx` + `ProjectCard.tsx` |
| C | `font-display: swap` | ✅ Already done | `layout.tsx` had `display: 'swap'` for JetBrains Mono + Mynerve. Fallback variants are Next.js internals, not changeable. |
| D | Maskable icon | ✅ Done | `site.webmanifest`: added `"purpose": "any"` to existing icons + maskable entry for icon-512.png |

### Open questions / blockers

- LHCI run: not yet run against production. Run after deploying.

---

## Guardrails

These must be respected throughout all tiers:
- No visual design regressions
- No layout behavior changes across breakpoints
- No animation removals or timing/easing changes unless explicitly approved (see Tier 4)

---

## Tier 1 — Zero Risk ✅ Complete

Pure additions. No existing code modified.

### 1.1 Create `public/site.webmanifest` ✅

File does not exist. Causes 6 console errors, PWA score 29/100, 5 red rows in WebPageTest.

Created `public/site.webmanifest` with name, short_name, start_url, display, theme_color, icons.
Also requires: `public/icons/icon-192.png` and `public/icons/icon-512.png` — **pending**.

### 1.2 Add `id="main-content"` to `<motion.main>` ✅

The skip link in `layout.tsx` targets `#main-content`, but the element had no `id`. Zero visual change.
Fixed: `src/app/page.tsx` line 154.

### 1.3 Suppress RSC prefetch 404s ✅

Routes `/resume`, `/about`, `/explorations`, `/writings` don't exist → 4 console 404 errors from RSC prefetch.

Fixed by adding `prefetch?: boolean` prop to `HoverLink.tsx` and threading `prefetch={false}` through:
- `Navbar.tsx` — all 3 nav links
- `Hero.tsx` line ~185 — Résumé link
- `MobileMenu.tsx` — all 4 missing-route links

### Tier 1 Checkpoint

```bash
bun run build   # ✅ passes
bun run lhci    # pending — run after deploy
```

Verify: zero console 404s in DevTools, skip link works with keyboard (Tab → Enter → focus jumps to `#main-content`).

---

## Tier 2 — Low Risk

Targeted single-attribute or config changes.

### 2.1 Conditional `priority` on `FullpageCard`

`src/components/ui/FullpageCard.tsx` hardcodes `priority` on its `<Image>`. Below-fold cards should not be eager-loaded.

- Add optional `priority?: boolean` prop (default `false`) to `FullpageCard`
- Pass `priority={true}` from `src/app/page.tsx` only for the first (above-fold) card

### 2.2 Cache headers for font and favicon

`Satoshi-Variable.woff2` and `favicon.ico` have no `Cache-Control` header (flagged in WebPageTest).

Add a `headers()` function in `next.config.ts`:

```ts
{
  source: '/fonts/Satoshi-Variable.woff2',
  headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
},
{
  source: '/favicon.ico',
  headers: [{ key: 'Cache-Control', value: 'public, max-age=86400' }],
},
```

### Tier 2 Checkpoint

```bash
bun run build
bun run lhci
```

Verify: font and favicon response headers contain correct `Cache-Control` values. Confirm first `FullpageCard` image still loads eagerly; subsequent cards load lazily.

---

## Tier 3 — Medium Risk

CSS changes. Visual verification required after implementation.

### 3.1 Refactor `travelingGradient` to compositor-compatible approach

`src/app/globals.css` animates `background-position` on `.footer-resume-link` and `.shimmer-glow`. The GPU cannot composite `background-position` (Lighthouse flag: "Unsupported CSS Property: `background-position-x`").

Fix: replace with a `::before` pseudo-element that uses `transform: translateX(...)` over a gradient, with `overflow: hidden` on the parent. Visual effect (traveling light band) is identical.

Requires: dark + light mode visual check.

### 3.2 Fix `shimmerScale` timing parameters

`.shimmer-glow` uses `ease-in-out` on the CSS `animation` shorthand. Three `button.group` elements flagged "unsupported timing parameters."

Fix: change to `linear` or an explicit `cubic-bezier(...)` value.

Combined with 3.1, these two changes should clear all 4 non-composited animation warnings.

### 3.3 Fix heading hierarchy

Audit `Hero.tsx`, `SelectedWork.tsx`, and home page sections for skipped heading levels. Change semantic element only — Tailwind classes preserve visual style.

### Tier 3 Checkpoint

```bash
bun run build
bun run lhci
```

Verify: Lighthouse "Non-composited animations" audit shows 0 warnings. Visual check of footer shimmer/gradient in dark and light mode, across Chrome, Firefox, Safari.

---

## Tier 4 — High Risk

**Explicit written approval required before implementation.**

### 4.1 LCP element animation (needs approval)

`src/components/hero/Hero.tsx` lines ~100–117: "Currently, MS in HCI at Pratt Institute." text has `initial={{ opacity: 0, y: 20 }}` with 0.7s delay. `opacity: 0` prevents the browser from painting this as LCP until JS hydrates + delay elapses. **Primary cause of LCP = 3,598ms.**

**Options (pick one, all require approval):**

| Option | Change | Risk | Notes |
|--------|--------|------|-------|
| A | Remove `opacity` from `initial`/`animate`, keep `y` only | Low | Removes fade-in effect |
| B | CSS fallback: `opacity: 1` in CSS so SSR is visible; Framer Motion overrides on mount | Low-medium | Minor flicker possible |
| C | Remove animation from this element entirely | Low | Cleanest LCP fix |

Expected impact of any option: **LCP 3,598ms → ~1,100–1,500ms.** Highest-impact single fix available.

### 4.2 Render-blocking CSS (deferred)

Two Next.js CSS chunks block render for ~150ms. Fix requires inlining critical CSS or `optimizeCss` (uses `critters`). Very high risk of theme flash and style ordering issues.

**Not pursuing.** 4.1 was rejected (animation kept as designed), so LCP stays ~3.6s. Saving ~150ms from render start does not move LCP under the 2.5s target, so the risk/reward is not justified.

### Tier 4 Checkpoint

1. Receive explicit written approval
2. `bun run build` (zero TS errors)
3. `bun run lhci` — LCP must be <2.5s on both desktop and mobile configs
4. Run Catchpoint or PageSpeed Insights against production URL to confirm

---

## Summary

| # | Fix | File(s) | Risk | Status | Primary Impact |
|---|-----|---------|------|--------|----------------|
| 1.1 | Create site.webmanifest | `public/site.webmanifest` | Zero | ✅ Done | PWA + Best Practices |
| 1.2 | `id="main-content"` on main | `src/app/page.tsx` | Zero | ✅ Done | Accessibility |
| 1.3 | `prefetch={false}` for missing routes | `HoverLink.tsx`, `Navbar.tsx`, `Hero.tsx`, `MobileMenu.tsx` | Zero | ✅ Done | Console errors |
| 2.1 | Conditional `priority` on FullpageCard | `FullpageCard.tsx`, `page.tsx` | Low | ✅ Done | Image audit |
| 2.2 | Cache headers for font + favicon | `next.config.ts` | Low | ✅ Done | Asset checklist |
| 3.1 | `travelingGradient` → `transform` | `globals.css` | Medium | 🚫 Not fixable | `background-clip: text` requires `background-position` — no compositor-safe equivalent |
| 3.2 | `shimmerScale` timing fix | `globals.css` | Medium | ✅ Done | Composited animations |
| 3.3 | Heading hierarchy | `WorkFilter.tsx` | Medium | ✅ Done | Accessibility |
| 4.1 | LCP element opacity | `Hero.tsx` | High | 🚫 Rejected — animation kept as designed | LCP stays ~3.6s |
| 4.2 | Render-blocking CSS | `next.config.ts` | Very High | 🚫 Not pursuing — 4.1 rejected so ~150ms saving won't move LCP past 2.5s threshold | ~150ms render start |

---

## Verification summary

| After | Command | Pass criteria |
|-------|---------|---------------|
| Every tier | `bun run build` | Zero TypeScript errors |
| Every tier | `bun run lhci` | No regressions vs. previous run |
| Tier 1 | Browser DevTools console | Zero 404s, skip link functional |
| Tier 3 | Lighthouse + visual | Non-composited animations: 0 |
| Tier 4.1 | Lighthouse + Catchpoint/PSI | LCP < 2.5s on production |
