# Spec: Case Study Theme System

**Date:** 2026-05-28
**Topic:** Unified Case Study Theme System (Seed & Derive)
**Status:** Approved (Design Phase)

## 1. Executive Summary
The current case study theme system is fragmented, relying on hardcoded strings for a few UI elements while ignoring global Light/Dark mode transitions. This spec defines a "systems-thinking" replacement: a **Dynamic Theme Scoper** that derives a 6-variant functional palette from a single "Seed Color" using OKLCH logic.

## 2. Goals & Success Criteria
- **Impeccable Highlights:** Cursor-dragged text selection must adapt to the case study brand while maintaining high contrast in both Light and Dark modes.
- **Dynamic Derivation:** Automate the creation of a cohesive palette from one seed color to eliminate manual guesswork.
- **Zero Dead Weight:** Remove unused MDX dependencies (`@next/mdx`, `@mdx-js/loader`) since all case studies are currently built as `.tsx` components.
- **Maintainability:** Standardize the "Source of Truth" in `case-studies.ts`.

## 3. Architecture & Data Flow

### 3.1 Data Schema Change
Update the `CaseStudy` interface in `src/lib/data/case-studies.ts`:
- **Deprecate:** `progressBarColor`, `imageBg`.
- **Add:** `themeColor: string` (The "Seed" hex/rgb, e.g., `#FF8C00`).

### 3.2 The Color Engine (ThemeScoper)
A new component (or hook) will convert the `themeColor` into the following 6 OKLCH-based CSS variables:

| Variable | Logic (Light Mode) | Logic (Dark Mode) |
| :--- | :--- | :--- |
| `--cs-pop` | Saturated (Pop) | Vibrant/Glowy |
| `--cs-soft` | High Lightness (Pastel) | Ultra-Dark Tinted (20% Lightness) |
| `--cs-contrast` | Dark Text (30% Lightness) | Pastel Text (matches Light Pastel) |

### 3.3 Broadcast Mechanism
`CaseStudyLayout` will wrap the entire page in a container that injects these variables into its inline style. This allows any child component (Headers, Progress Bars, MDX-equivalent TSX) to reference the theme via `var()`.

## 4. Visual Implementation: The Selection System

### 4.1 Global Selection CSS
In `src/app/globals.css`, add a scoped rule for the theme:
```css
.case-study-theme ::selection {
  background-color: var(--cs-soft);
  color: var(--cs-contrast);
}
```

### 4.2 Behavior
- **In Light Mode:** The background is a soft pastel version of the brand color; the text is a dark, readable version of the brand color.
- **In Dark Mode:** The background is an ultra-dark tinted block; the text is a high-contrast pastel (near-white) version of the brand color.

## 5. Technical Cleanup
1.  **Remove Files:** `mdx-components.tsx`.
2.  **Update Config:** Remove MDX plugin from `next.config.ts`.
3.  **Dependency Purge:** Uninstall `@next/mdx`, `@mdx-js/loader`, and `@mdx-js/react`.

## 6. Testing Strategy
- **Visual Audit:** Verify all 12+ case studies with their new `themeColor` in both Light and Dark modes.
- **Contrast Check:** Use automated tools to ensure `::selection` colors meet WCAG AA standards.
- **Regression:** Ensure the global site theme (outside case studies) remains untouched.

## 7. Self-Review Notes
- **Placeholder scan:** No TBDs. OKLCH logic is explicitly defined.
- **Consistency:** Theme broadcast matches the existing `ThemeProvider` pattern.
- **Scope:** Focused strictly on the theme system and MDX cleanup.
- **Ambiguity:** Defined exact lightness values (20% for dark bg, 30% for light text) to avoid "vague" color generation.
