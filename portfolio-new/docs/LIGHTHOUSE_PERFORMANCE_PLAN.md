# Lighthouse Performance Plan (Living)

Last updated: 2026-03-07

## Goal
Improve performance safely with zero regressions to visual look, theme, layout, or animation behavior.

## Guardrails
- No visual design regressions (colors, typography, spacing, composition).
- No layout behavior changes across breakpoints.
- No animation removals or timing/easing changes unless explicitly approved.
- Every optimization requires build + Lighthouse CI validation.

## Why Scores Differ
- Different test environments produce different scores.
- Local LHCI (`localhost`) and PSI (Google infra) are not equivalent.
- PSI run settings in your screenshots used Lighthouse `13.0.1` with emulation/throttling and showed `Document request latency — Error!`.
- Performance score is heavily influenced by `Total Blocking Time (TBT)`, which can vary significantly run-to-run.
- Decision rule: use your lower PSI readings as the external/worst-case benchmark, and local LHCI as regression safety during development.

## User PSI Baseline (Primary External Reference)
- Source: user screenshots captured on **March 7, 2026, 08:10 GMT-5**.
- Mobile:
  - Performance `46`, Accessibility `90`, Best Practices `100`, SEO `83`
  - FCP `2.4s`, LCP `3.8s`, TBT `9,590ms`, Speed Index `12.6s`, CLS `0`
- Desktop:
  - Performance `59`, Accessibility `90`, Best Practices `96`, SEO `83`
  - FCP `0.3s`, LCP `0.9s`, TBT `14,060ms`, Speed Index `8.1s`, CLS `0.023`
- Interpretation: TBT is the dominant score drag on both profiles.

## User PSI Insights Snapshot (From Screenshots)
- Source: user screenshots captured on **March 7, 2026, 08:10 GMT-5**.

### Mobile Insights
- Render blocking requests — estimated savings `620ms`
- Document request latency — `Error!`
- Forced reflow
- Network dependency tree
- Improve image delivery — estimated savings `46KiB`
- Legacy JavaScript — estimated savings `14KiB`
- LCP breakdown

### Mobile Diagnostics
- Minimise main-thread work — `40.1s`
- Reduce unused JavaScript — estimated savings `46KiB`
- Avoid long main-thread tasks — `20` long tasks found
- Avoid non-composited animations — `2` animated elements found

### Desktop Insights
- Legacy JavaScript — estimated savings `14KiB`
- Render blocking requests — estimated savings `160ms`
- Forced reflow
- LCP request discovery
- Network dependency tree
- Improve image delivery — estimated savings `68KiB`
- Layout shift culprits
- Optimise DOM size
- LCP breakdown

### Desktop Diagnostics
- Minimise main-thread work — `34.6s`
- Reduce unused JavaScript — estimated savings `46KiB`
- Avoid long main-thread tasks — `20` long tasks found
- Avoid non-composited animations — `4` animated elements found

## Pre-Fix Baseline (Prod Vercel, Lighthouse 12.6.1, March 7 2026)
These numbers were captured from the production Vercel URL before any optimizations.
- Desktop: FCP `0.3s`, LCP `0.7s`, TBT `0ms`, Speed Index `1.0s`
- Mobile: FCP `1.1s`, LCP `2.8s`, TBT `176ms` (score `0.92`)
- LCP element on mobile: `<h2>Selected work</h2>` — render delay `2,162ms` (78% of LCP)
- Root cause of render delay: `ThemeProvider` returned `null` until client mounted, blocking all SSR content.

## Completed Optimizations

### 2026-03-07 — SSR Unblocked (Critical LCP Fix)

**Problem identified:** The app was effectively doing CSR (client-side rendering) despite using Next.js App Router SSR. Root cause chain:
1. `ThemeProvider` had `if (!mounted) return null` — this meant **zero page content** was included in the server-rendered HTML.
2. Every page visitor waited for JavaScript to download, parse, execute, and hydrate before any content appeared.
3. This caused the `<h2>Selected work</h2>` LCP element to have a 2,162ms render delay.

**Changes made — no animations altered:**

- `src/components/providers/ThemeProvider.tsx`: Removed `if (!mounted) return null` and the `mounted` state entirely. State initializer now reads from `document.documentElement.getAttribute('data-theme')` on the client (which `ThemeScript` already set in `<head>`), so the client theme matches the server default (`'dark'`) and hydration mismatches are avoided. Server default changed from `'light'` to `'dark'` to match the portfolio's default.

- `src/app/layout.tsx`: Removed `'use client'`. Layout is now a server component, which allows Next.js to prerender pages as static HTML. Added `export { metadata, viewport }` from `src/app/metadata.ts`.

- `src/app/AppProviders.tsx` (new file): Client component wrapper for `AccessibilityProvider` → `ThemeProvider` → `LenisProvider`. Layout imports this instead of the individual providers.

- `src/components/providers/LenisProvider.tsx`: Changed from static `import Lenis from 'lenis'` to `import('lenis').then(...)` inside `useEffect`. Lenis bundle is now deferred and only loads on non-touch, non-reduced-motion devices. Reduces initial JS parse cost.

- `src/components/layout/Navbar.tsx`: Removed `{isSm && (...)}` JS conditional around the theme toggle. This was causing a hydration mismatch — `useBreakpoint` returns `false` on the server, so the toggle was absent from SSR HTML but present on the client. The existing `className="hidden sm:flex"` CSS class already handles responsive visibility correctly, so the JS conditional was redundant. Removed the `useBreakpoint` import and `isSm` variable.

**Build result:** `/` now shows `○ (Static)` — prerendered as static content. Previously the ThemeProvider null-return prevented any static prerendering.

## Current Priorities
1. Re-run LHCI after deploy to measure LCP improvement from SSR fix.
2. Reduce mobile unused JS and TBT on `/` and `/work`.
3. Preserve all current interaction and animation quality.

## Active Workstreams
- Image Delivery
  - Keep modern formats (`webp`/`avif`) for large hero/card media.
  - Keep responsive `sizes` and low fetch priority for below-the-fold media.
- JS Payload
  - Defer non-critical client code and route-specific UI.
  - Prefer on-demand imports for heavy libs where behavior remains unchanged.
- Validation
  - Run `bun run build` and `bun run lhci` after each change set.
  - Keep LHCI assertions baseline-safe; tighten gradually as metrics improve.

## Next Actions
1. Deploy to Vercel and run PSI / LHCI to measure the LCP improvement from the SSR fix.
2. Record new medians in this file under a new baseline section.
3. If LCP is still above 2.5s, investigate whether the `page.tsx` hero animation delays (GSAP 0.6s delay + 1.0s duration) are the remaining bottleneck.
4. Investigate reduction options for large initial script chunks (`framer-motion`, `gsap`) with no visual/animation regressions.

## Lighthouse CI
- Workflow: `.github/workflows/lighthouse-ci.yml`
- Configs:
  - `lighthouserc.desktop.json`
  - `lighthouserc.mobile.json`
- Commands:
  - `bun run lhci:desktop`
  - `bun run lhci:mobile`
  - `bun run lhci`

## Maintenance Rules
- This file tracks only current state and next actions.
- Remove stale tasks as soon as they are no longer relevant.
- Do not keep historical changelog entries here.
