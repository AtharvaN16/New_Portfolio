# Lighthouse Performance Plan (Living)

Last updated: 2026-03-07

## Goal
Improve performance safely with zero regressions to visual look, theme, layout, or animation behavior.

## Guardrails
- No visual design regressions (colors, typography, spacing, composition).
- No layout behavior changes across breakpoints.
- No animation removals or timing/easing changes unless explicitly approved.
- Every optimization requires build + Lighthouse CI validation.

## Current Baseline (Local LHCI Median)
- Desktop `/`: Performance `92`, FCP `340ms`, LCP `1.63s`, TBT `0ms`
- Desktop `/work`: Performance `96`, FCP `341ms`, LCP `1.35s`, TBT `0ms`
- Mobile `/`: Performance `68`, FCP `1.37s`, LCP `8.55s`, TBT `192ms`
- Mobile `/work`: Performance `72`, FCP `1.22s`, LCP `7.21s`, TBT `222ms`

## Current Priorities
1. Reduce mobile LCP on `/`.
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
  - Run `npm run build` and `npm run lhci` after each change set.
  - Keep LHCI assertions baseline-safe; tighten gradually as metrics improve.

## Next Actions
1. Identify exact mobile LCP element for `/` from latest LHCI report and optimize that render path.
2. Defer non-critical animation/util modules not needed for first paint on mobile.
3. Re-run LHCI and record new medians in this file.

## Lighthouse CI
- Workflow: `.github/workflows/lighthouse-ci.yml`
- Configs:
  - `lighthouserc.desktop.json`
  - `lighthouserc.mobile.json`
- Commands:
  - `npm run lhci:desktop`
  - `npm run lhci:mobile`
  - `npm run lhci`

## Maintenance Rules
- This file tracks only current state and next actions.
- Remove stale tasks as soon as they are no longer relevant.
- Do not keep historical changelog entries here.
