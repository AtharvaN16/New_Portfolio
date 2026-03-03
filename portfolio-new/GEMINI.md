# Atharva Nayak's Portfolio - Project Context

This document serves as the primary instructional context for Gemini CLI when working on Atharva Nayak's personal portfolio.

## 🚀 Project Overview

A modern, high-performance, and accessible personal portfolio website built with the latest web technologies. The project is a clean rebuild from a previous version, focusing on code quality, maintainability, and visual excellence.

- **Primary Technologies:** Next.js 15 (App Router), React 19, TypeScript.
- **Styling:** Tailwind CSS v4 with a comprehensive design token system.
- **Animations:** GSAP, Framer Motion, and Lenis for smooth scrolling.
- **Interactive Visuals:** Custom WebGL-based hero animation (`WaterBlob`).
- **Content Management:** MDX-based case studies with data-driven categorization.
- **Testing:** Vitest and React Testing Library.

## 🏗️ Architecture & Conventions

### 1. Design Token System
All styling should derive from design tokens defined in `src/app/globals.css` (imported from `src/styles/design-tokens.css`). Avoid hardcoded values; use Tailwind classes that reference these tokens.

### 2. Component Guidelines
- **Size Limit:** Components should ideally be under **300 lines**. If a component grows larger, refactor into smaller sub-components.
- **Separation of Concerns:**
  - `src/components/ui`: Low-level, reusable primitive components.
  - `src/components/layout`: Structural components like Navbar and Footer.
  - `src/components/animations`: Wrappers and logic for complex animations.
  - `src/components/case-study`: Components specific to case study rendering.
- **Error Boundaries:** Use `ErrorBoundary` for risky components, especially those involving WebGL or third-party libraries.

### 3. State & Theme
- **Theme Management:** Managed via `ThemeProvider` (`data-theme` attribute). Supports light/dark mode with system preference detection and persistence.
- **No Flash of Unstyled Content (FOUC):** A `ThemeScript` is used in the root layout to apply the theme before hydration.

### 4. Animations Strategy
- **Smooth Scroll:** Powered by `Lenis`.
- **GSAP:** Used for complex timeline-based animations and low-level performance-critical transitions.
- **Framer Motion:** Used for declarative UI transitions and simple entrance/exit animations.

### 5. Content Structure
- **Case Studies:** Metadata is stored in `src/lib/data/case-studies.ts`. Detailed content is written in MDX files located in `src/content/case-studies/`.
- **Images:** Optimized via `next/image` with WebP/AVIF support.

## 🛠️ Building and Running

| Task | Command |
| :--- | :--- |
| **Development** | `npm run dev` |
| **Production Build** | `npm run build` |
| **Start Production** | `npm run start` |
| **Linting** | `npm run lint` / `npm run lint:fix` |
| **Formatting** | `npm run format` / `npm run format:check` |
| **Type Checking** | `npm run type-check` |
| **Testing** | `npm run test` (watch), `npm run test:ui` (UI), `npm run test:coverage` |
| **Full Validation** | `npm run validate` (lint + format + type-check + test) |

## ⚠️ Critical Development Rules (Avoid Old Mistakes)

This project was rebuilt to fix catastrophic issues in a previous version. **Never repeat these anti-patterns:**

- **NO** component over 300 lines (the old portfolio had 23,000-line files).
- **NO** hardcoded secrets or credentials (use `.env.local` and Zod for validation).
- **NO** hardcoded colors or spacing (use design tokens).
- **ALWAYS** ensure mobile responsiveness (320px to 4K).
- **ALWAYS** include unit tests for new hooks or complex utility functions.
- **ALWAYS** follow semantic HTML for accessibility (WCAG 2.2 AA).

## 📂 Key Directory Map

- `src/app/`: Routing, global styles, and root layout.
- `src/components/`: Component library categorized by function.
- `src/hooks/`: Custom React hooks (e.g., `use-breakpoint`, `use-theme`).
- `src/lib/`: Utilities, constants, and MDX processing logic.
- `src/content/`: MDX content for case studies.
- `docs/`: In-depth documentation on architecture, animations, and decisions.
- `Documentation/`: Audits of the *old* portfolio (reference for what NOT to do).
- `tests/`: Vitest test suite.

## 🧪 Testing Guidelines

- Unit tests should be colocated or placed in the `tests/unit` directory.
- Use `screen` and `user-event` from `@testing-library/react` for component tests.
- Mock GSAP or Framer Motion where necessary if they interfere with DOM state assertions.

---

**Note:** This file is a living document. Update it as new architectural decisions are made or new major features are implemented.
