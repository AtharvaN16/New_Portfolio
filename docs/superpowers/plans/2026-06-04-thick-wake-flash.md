# Thick Wake F1 Pulse Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enhance the F1 ghost pulse with a "thick" core and a lingering volumetric light trail that illuminates the container as it rises and then fades back to darkness.

**Architecture:** 
1. Update the WebGL shader to support a `uTrail` uniform and a `uDensity` uniform for core thickening.
2. Calculate a vertical light wake in the fragment shader based on `uTrail` and the current `yOffset`.
3. Orchestrate `uTrail` and `uDensity` in the `WaterBlob` animation loop, ensuring the trail lingers slightly after the blob has risen.

**Tech Stack:** React 19, WebGL (GLSL), TypeScript

---

### Task 1: Shader and Type Updates

**Files:**
- Modify: `src/components/hero/waterBlob.shader.ts`
- Modify: `src/components/hero/waterBlob.types.ts`

- [ ] **Step 1: Add uniforms to WaterBlobUniforms interface**

```typescript
export interface WaterBlobUniforms {
  uTime: { value: number }
  uColor1: { value: [number, number, number] }
  uColor2: { value: [number, number, number] }
  uColor3: { value: [number, number, number] }
  uYOffset: { value: number }
  uRevealPhase: { value: number }
  uTrail: { value: number }   // New: 0 to 1 intensity of the light wake
  uDensity: { value: number } // New: 0 to 1 density multiplier for the core
}
```

- [ ] **Step 2: Update Fragment Shader to include trail and density logic**

```glsl
// Add uniforms
uniform float uTrail;
uniform float uDensity;

// Inside main function, after color calculations:
// 1. Density: Tighten the plasma rim when uDensity is high
float density = 0.04 + (uDensity * 0.06); // Increase threshold range
float mask = 1.0 - smoothstep(0.0, density, dist);

// 2. Trail: Vertical light wake
// distY is vertical distance from current pixel to blob center
float trailMask = smoothstep(-0.5, 0.5, vUv.y - uYOffset);
vec3 trailColor = mix(uColor1, uColor2, 0.5) * uTrail * (1.0 - vUv.y);
color += trailColor * trailMask * (1.0 - mask);
```

- [ ] **Step 3: Commit**

```bash
git add src/components/hero/waterBlob.shader.ts src/components/hero/waterBlob.types.ts
git commit -m "feat(hero): add uTrail and uDensity uniforms to shader"
```

---

### Task 2: Animation Loop Orchestration

**Files:**
- Modify: `src/components/hero/WaterBlob.tsx`

- [ ] **Step 1: Add refs for trail and density**

```typescript
const trailRef = useRef(0)
const densityRef = useRef(0)
```

- [ ] **Step 2: Update Uniform mapping in loop**

Ensure `uTrail` and `uDensity` are passed to the shader in each frame.

- [ ] **Step 3: Implement "Thick Wake" logic in loop**

```typescript
// Inside loop(timestamp):
if (isQuick) {
  densityRef.current = 1.0; // Max thickness for F1
  // Trail lags behind yOffset
  trailRef.current += (1.0 - trailRef.current) * 0.05;
}

// Luminous Decay for Ghost
if (isGhost && ghostOpacity > 0) {
  if (yOffsetRef.current > -0.2) {
    // Fade trail slower than the main blob
    trailRef.current *= 0.95;
  }
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/hero/WaterBlob.tsx
git commit -m "feat(hero): orchestrate thick wake animation in WaterBlob"
```

---

### Task 3: Verification

- [ ] **Step 1: Run build to ensure no regressions**

Run: `bun run build`
Expected: PASS

- [ ] **Step 2: Manual visual check (request user check)**
