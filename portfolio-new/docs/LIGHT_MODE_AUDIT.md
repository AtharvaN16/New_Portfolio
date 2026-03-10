# Light Mode Audit Report (Updated)

**Date:** March 2026
**Scope:** Remaining visual and architectural fixes for Light Mode
**Status:** Phase 1 (Accessibility) mostly complete. Phase 2 & 3 (UI Polish & Effects) pending.

---

## Remaining Implementation Tasks

- [ ] 1. **FooterDustParticles:** Currently invisible in light mode. Needs to switch to dark particles at low opacity (`rgba(0, 0, 0, alpha * 0.4)`).
- [ ] 2. **FooterSmog / CSSGlow:** Gradients are too saturated/muddy in light mode. Needs lower opacity (8-10%) and potentially a change in blend mode.
- [ ] 3. **NavButton:** `dark:` prefix doesn't match our `[data-theme]` system. Hover states are broken in cross-mode scenarios.
- [ ] 4. **Hero Gradient Background:** Opacity is currently too heavy (85%). Needs to be reduced to 55-70% to feel "airy."
- [ ] 5. **Case Study Hero Overlay:** Replace hardcoded `bg-black` with a theme-aware background for smoother scroll transitions.
- [ ] 6. **WaterBlob Physics (Phase 3):** Implement `mix-blend-mode: multiply` and pigment-edge darkening to make the dark-mode palette look like "ink" on light paper.
- [ ] 7. **Surface Hierarchy:** Implement layered whites (#F6F7F9 background vs #FFFFFF cards) to create depth.
- [ ] 8. **Texture:** Add a subtle (1-2%) noise overlay to remove the clinical/sterile feeling.

---

## Critical Issues (Pending)

### 1. FooterDustParticles: White Particles on Light Background
**File:** `src/components/layout/FooterDustParticles.tsx`
The particle color is hardcoded white. On the light gray footer, they are functionally invisible.
**Fix:** Read theme and use dark particles for light mode.

### 2. NavButton: Theme System Mismatch
**File:** `src/components/ui/NavButton.tsx`
Uses Tailwind `dark:` variants which respond to OS settings, not our toggle.
**Fix:** Update Tailwind config or use attribute selectors to respect the `[data-theme]` attribute.

---

## Visual Quality & Polish (New Strategy)

### 1. Layered Whites (Depth)
*   **Page Background:** Move from `#fafcfe` to `#F6F7F9` (slight gray/blue warmth).
*   **Cards/Sections:** Use `#FFFFFF` with soft shadows to create clear hierarchy.

### 2. Absorptive Physics for WaterBlobs
*   **Metaphor:** "Ink on Paper" instead of "Neon in the Dark."
*   **Colors:** Use the saturated Dark Mode palette.
*   **Blend Mode:** Use `multiply` to allow colors to "stain" the background.
*   **Edge Logic:** Add a subtle darkening at blob boundaries to simulate pigment accumulation.

### 3. Typography Refinement
*   **Primary:** #111111 (Sharp, premium)
*   **Secondary:** #555555 (Softer body text)
*   **Labels:** #777777 (Metadata)

### 4. Noise & Texture
Implement a global noise filter to eliminate the sterile "Google Docs" appearance common in clinical light mode implementations.
