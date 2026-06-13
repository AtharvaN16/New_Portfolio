# WaterBlob Fluidity Improvements — Design Spec

**Date:** 2026-06-13  
**Status:** Approved  
**Scope:** `waterBlob.shader.ts` only — no React, no helpers, no types

## Problem

The water blobs feel static despite being animated. Three root causes were identified:

1. Edge contours barely evolve (time multiplier too low → shape looks frozen)
2. Blob radii are fixed (no sense of life or breathing)
3. Orbital path repeats on a short period (motion feels mechanical and looping)

Additionally, edge glow and subsurface scatter are too subtle, making blobs look flat and 2D.

## Constraints

- Same overall aesthetic — no new colors, no structural changes
- Purple (`uColor2`) is a legacy uniform from an old palette; it stays wired but unused
- Mobile path must stay within its 2-octave noise budget (lighter turbulence)
- Amplitude changes must not push blobs outside their current canvas footprint

---

## Change 1 — Edge Evolution Rate

**Location:** `irregularWaterShape()` — turbulence and edgeNoise calls

Increase the time multiplier on all noise inputs inside `irregularWaterShape` so edge contours visibly morph in real time.

| Platform | Before | After |
|----------|--------|-------|
| Desktop  | `time * 0.02` | `time * 0.05` |
| Mobile   | `time * 0.02` | `time * 0.03` |

Apply to both the angle-turbulence call and the `edgeNoise` fractal noise call on desktop. Mobile's `edgeNoise` branch does not run (it's guarded by `uIsMobile < 0.5`), so only the angle-turbulence call needs updating there.

---

## Change 2 — Blob Breathing

**Location:** `main()` — just before the two `irregularWaterShape` calls

Add a slow sinusoidal breath multiplier to each blob's base radius. Frequencies are chosen to be incommensurable so the two blobs never pulse in sync.

```glsl
float breath1 = 1.0 + 0.06 * sin(uTime * 0.27);
float breath2 = 1.0 + 0.06 * sin(uTime * 0.19 + 2.1);
```

Apply `breath1` to blob1's base size (`0.55 * size1 * breath1`) and `breath2` to blob2's (`0.38 * size2 * breath2`). The ±6% swing is subtle enough to read as organic rather than pulsing.

---

## Change 3 — Non-Repeating Orbital Path

**Location:** `blobMotion()` — return expression

Add a 4th motion component at `speed * 1.618` (golden ratio multiplier). Because 1.618 is irrational relative to the existing `1.0`, `0.7`, `0.5` multipliers, the combined path has no finite repeat period — it will never visibly loop.

```glsl
float angle3 = time * speed * 1.618 + seed * 3.0 + 2.9;
vec2 motion4 = vec2(cos(angle3 * 0.9), sin(angle3)) * (0.04 * amplitude);
return basePos + motion1 + motion2 + motion3 + motion4;
```

Amplitude `0.04` is small enough that blobs stay within their existing canvas footprint.

---

## Change 4 — Depth (Glow + Subsurface Scatter)

**Location:** Shader constants at the top of the fragment shader

| Constant | Before | After |
|----------|--------|-------|
| `EDGE_GLOW` | `0.08` | `0.12` |
| `SUBSURFACE_SCATTER` | `0.05` | `0.08` |

Both are additive terms that stack cleanly with existing color mixing. The edge glow increase gives a visible rim without overexposing; the scatter increase adds perceived translucency where the backlight bleeds through blob edges.

---

## Files Changed

- `src/components/hero/waterBlob.shader.ts` — all four changes live here

## Files NOT Changed

- `waterBlob.tsx` — no React/animation logic changes
- `waterBlob.helpers.ts` — no helper changes
- `waterBlob.types.ts` — no constant changes
- `waterBlob.colors.ts` — no palette changes
