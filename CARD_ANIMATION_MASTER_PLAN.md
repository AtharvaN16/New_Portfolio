# Master Plan: Project Card "Recede & Blur" Animation

## 🎯 Goal
Implement a high-performance, scroll-linked "recede" effect for project cards on the desktop home page, mimicking the behavior of the old portfolio. 

## ✨ Visual Requirements
1. **Recede (3D):** As a card leaves the viewport (top) or enters (bottom), it should move back in 3D space (`translateZ`).
2. **Scale:** The card should subtly shrink (scale from 1.0 down to 0.9).
3. **Blur:** A Gaussian blur should increase as the card recedes (up to 20px).
4. **Melt/Fade:** The card should fade into the background color (`rgb(var(--color-background))`) to appear as if it is dissolving.
5. **Thresholds:** The effect should only trigger at the very edges of the viewport (top 5% and bottom 5%), staying perfectly clear and flat in the middle 90%.

---

## 🏗️ Architectural Root Cause & Issues
The current implementation faces a conflict between **Local `useScroll`** and the home page's **Layered Fixed Scrolling** architecture.

### The Conflict:
1. **Fixed Layering:** Sections (Hero, SelectedWork, FullpageCard) are `position: fixed`.
2. **Simulated Scroll:** A master `containerRef` (`useHomeScroll.ts`) tracks a global `scrollYProgress`.
3. **Layer Transitions:** The `SelectedWork` section is revealed only after the top layer exits (at ~0.5 global scroll progress).
4. **Incorrect Local Progress:** Because the card is inside a `fixed` container being manually moved by a transform, `framer-motion`'s standard `useScroll({ target: cardRef })` cannot accurately determine its position relative to the viewport.
5. **Result:** Cards appear blurred or shrunk immediately upon reveal because the local hook reports they are already at the "edge" of the scroll range.

---

## 🛠️ Technical Strategy & Refined Implementation
To fix this, the card-level animations must be synchronized with the **Global Page Scroll** rather than local viewport detection.

### 1. Global Sync (Recommended)
Instead of a local `useScroll` inside `ProjectCard.tsx`, the card should receive the global `scrollYProgress` (or a derived value) from `useHomeScroll.ts`.
- **Mapping:** The card animations must "know" they only exist in the `0.5` to `1.0` global scroll range.
- **Offsets:** Each card needs an internal offset based on its position within the `SelectedWork` grid.

### 2. Container Configuration
- **Perspective:** The desktop grid in `SelectedWork.tsx` must maintain `perspective: 1200px` and `transform-style: preserve-3d`.
- **Conditional logic:** Restrict all heavy 3D transforms to `isDesktop` via `useBreakpoint` hook for mobile performance.

### 3. Optimization
- Use `gpu-accelerate` classes for transform-only animations.
- Replace `useSpring` with a more direct mapping if initial "flashing" persists, or ensure the spring is initialized to the correct scroll position.
