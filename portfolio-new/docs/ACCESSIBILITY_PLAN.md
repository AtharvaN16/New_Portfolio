# Accessibility Implementation Plan (WCAG 2.2 AA)

This document outlines the strategy for bringing the portfolio website into full compliance with WCAG 2.2 AA standards while maintaining the existing visual design and performance.

## 🎯 Primary Goals
- **Zero Visual Impact:** All accessibility improvements must be "under-the-hood" (semantic, ARIA, screen-reader only).
- **Efficient Navigation:** Focus on a streamlined experience for assistive technology, avoiding unnecessary interactions (like decorative WebGL elements).
- **User Control:** Provide an accessibility options modal for manual overrides (motion, contrast, typography).

---

## 🛠️ Phase 1: Semantic & Structural Upgrades (Critical)
*Goal: Ensure the document structure is logical and machine-readable.*

### 1.1 Heading Hierarchy
- **Action:** Refactor `AnimatedHeroTextGSAP.tsx` to use an `<h1>` tag instead of `<p>`.
- **Constraint:** Must use the same CSS classes and GSAP animation logic to ensure identical visual rendering.
- **Verification:** Only one `<h1>` per page.

### 1.2 Form Accessibility (Footer)
- **Action:** Add `<label>` elements for all form inputs (`message`, `linkedin`, `email`) in `Footer.tsx`.
- **Implementation:** Use a `sr-only` (Screen Reader Only) utility class to hide labels visually while keeping them accessible to screen readers.
- **Constraint:** Do not change the existing layout or placeholder-based design.

### 1.3 Decorative Elements
- **Action:** Mark the `WaterBlob` WebGL component as decorative (`aria-hidden="true"`).
- **Action:** Remove `tabIndex` and keyboard focus listeners from the `WaterBlob`.
- **Reasoning:** Navigating complex animated canvases with a screen reader is time-consuming and provides little value for decorative content.

---

## 🏃 Phase 2: Motion & Interaction (User Preference)
*Goal: Support users with vestibular disorders or motion sensitivity.*

### 2.1 Reduced Motion Support
- **Action:** Implement a `use-reduced-motion` hook (detecting `(prefers-reduced-motion: reduce)`).
- **Action:** Update GSAP and Framer Motion components to skip heavy translations (e.g., `y: 100`) and use simple `opacity` fades when reduced motion is active.

### 2.2 Interactive Feedback
- **Action:** Ensure all interactive links and buttons have visible focus states (already implemented via `focus-visible`).
- **Action:** Audit `AnimatedLink` and `HoverLink` to ensure they use standard `<a>` or `<button>` tags with proper ARIA roles.

---

## 🎨 Phase 3: Accessibility Options Modal (New Feature)
*Goal: Give users explicit control over their experience.*

### 3.1 Modal Trigger
- **Action:** Add a subtle "Accessibility" link in the footer (next to Resume/Quick Links).
- **Visual:** Should match the style of existing footer links.

### 3.2 Feature Set (Inspired by Screenshots)
- **Reduced Motion:** Toggle to manually pause/simplify animations site-wide.
- **High Contrast:** Toggle a CSS filter or high-contrast theme overlay.
- **Dyslexia-Friendly Font:** Option to switch typography to a high-readability font (e.g., OpenDyslexic or a simplified Sans-Serif).
- **Pause Interactions:** A "kill-switch" to stop WebGL animations and decorative background effects.

---

## 🧪 Phase 4: Validation & Testing
*Goal: Maintain compliance through automated and manual checks.*

### 4.1 Automated Audits
- **Action:** Install and configure `vitest-axe` for unit-level accessibility testing.
- **Action:** Run regular Lighthouse/PageSpeed accessibility audits.

### 4.2 Manual Verification
- **Screen Reader Test:** Navigate the site using VoiceOver (macOS) or NVDA (Windows).
- **Keyboard Audit:** Ensure the tab order skips decorative elements and focuses all interactive controls in a logical sequence.

---

## 📅 Timeline & Next Steps
1. **Immediate:** Implement Phase 1 (Heading and Form Labels).
2. **Short-term:** Implement Phase 2 (Reduced Motion Hook).
3. **Mid-term:** Design and build Phase 3 (Options Modal).
4. **Final:** Perform full compliance audit and update `COMPLIANCE_REPORT.md`.
