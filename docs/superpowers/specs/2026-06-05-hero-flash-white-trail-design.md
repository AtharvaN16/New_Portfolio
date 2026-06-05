# Hero First-Flash White Trailing Light — Design

Date: 2026-06-05

## Goal

Add a big, soft **pure-white trailing light** to the hero entry animation's **first
flash** (the `isGhost isQuick` instance in `Hero.tsx`). As the flash rises it should
illuminate the frame like a light passing through, leaving a glow behind it that
fades to complete darkness — mirroring the ambient lighting in
`user_references/shaderlight.MP4`.

## Hard constraint

This is an **addition only**. The plasma thermal rim, the water-blob look, the
existing ambient wake, and the second/permanent flash must render **identically**
to today. No existing visual term is modified — the new light is purely additive
and gated so only the first flash drives it.

## Art direction (confirmed)

- **Shape:** comet wake — brightest at the rising pulse front, big soft white tail
  trailing *below* it, sharp-ish dark cutoff above (area "not yet reached").
- **Color:** pure white.
- **Scope:** first flash only. Second flash keeps its current subtle ambient.
- **Intensity:** noticeable but tasteful.
- **Sweep:** front moves bottom → top as the pulse rises, then fades to black.

## Approach (chosen: A)

A new additive shader term controlled by a brand-new uniform `uTrail` (0→1,
default `0`). Only the first-flash instance ramps it; everything else leaves it at
`0` and renders byte-for-byte identical to today.

Rejected alternatives:
- **B — enlarge existing `uAmbient`:** shared by the permanent flash and carries the
  warm `mix(uColor1, white, 0.7)` wash; editing it changes the protected look.
- **C — CSS/DOM gradient overlay:** cannot stay perfectly synced to the WebGL pulse
  position; the pulse lives in the shader, so the light must too.

## Implementation

### 1. `waterBlob.shader.ts`
- Declare `uniform float uTrail;`.
- Append at the very end of `main()`, after the existing ambient block:
  ```glsl
  // === FIRST-FLASH WHITE TRAIL (light passing through) ===
  float headPos = uYOffset + 0.9;            // front sweeps bottom->top as pulse rises
  float d = headPos - vUv.y;                  // >0 = below the front (the wake)
  float wake = d >= 0.0 ? exp(-d * 1.6)       // long soft tail below
                        : exp(d * 6.0);       // sharp leading edge above
  float vignette = 1.0 - 0.25 * pow((vUv.x - 0.5) * 2.0, 2.0); // soft center bias
  color += vec3(1.0) * wake * vignette * uTrail * 0.55;
  ```
- Add `uTrail` to the `WaterBlobUniforms` interface.

Knobs to tune during verification: `0.9` head offset, `1.6`/`6.0` falloffs,
`0.55` peak, `0.25` vignette.

### 2. `waterBlob.helpers.ts`
- `getUniformLocations`: add `uTrailLocation`.
- `setupWebGL`: initialize `uTrail` to `0.0`.
- `createAnimationLoop`: add `getTrail` param (default `() => 0`) and push it each
  frame — exactly parallel to the existing `uAmbient` wiring.

### 3. `WaterBlob.tsx`
- Add `trailRef = useRef(0)`.
- Reset to `0` on initial mount alongside `ambientRef`.
- In the `isGhost` branch only: ramp `trailRef` up as the pulse rises, and fade it
  out together with `ghostOpacity` so it ends at complete darkness.
- Pass `() => trailRef.current` to `createAnimationLoop`.

## Verification

- Run the app; record the hero entry. Confirm: first flash shows a big white light
  sweeping up with a trailing glow that fades to black.
- Confirm the second/permanent flash and settled blobs look unchanged (A/B against
  current `main`).
- Confirm no WebGL console errors and reduced-motion fallback still works.
