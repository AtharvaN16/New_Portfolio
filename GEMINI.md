# Atharva Nayak's Portfolio - Project Context

This document serves as the primary instructional context for Gemini CLI when working on Atharva Nayak's personal portfolio.

## 🚀 Project Overview

A modern, high-performance, and accessible personal portfolio website built with Next.js 15 (App Router), React 19, and TypeScript. 

**Structure Update**: The project has been flattened. The application code now lives in the **root directory** (no longer in `portfolio-new/`).

## 🛠 Official Deployment Workflow

To ensure a stable production environment, we follow this branch-based strategy:

1.  **Develop in `dev` branch**: All new features and bug fixes happen here.
2.  **Verify & Sync**: Once ready, merge `dev` into `main`.
3.  **Deploy from `main`**: Pushing to the `main` branch on GitHub automatically triggers a Vercel production deployment.

## 🏗️ Architecture & Conventions

### 1. Design Token System
All styling should derive from design tokens defined in `src/app/globals.css`. Avoid hardcoded values; use Tailwind classes that reference these tokens.

### 2. Component Guidelines
- **Size Limit**: Components should ideally be under **300 lines**.
- **Separation of Concerns**:
  - `src/components/ui`: Low-level, reusable primitive components.
  - `src/components/layout`: Structural components like Navbar and Footer.
  - `src/components/case-study`: Components specific to case study rendering.

### 3. State & Theme
- Managed via `ThemeProvider` (`data-theme` attribute).
- `ThemeScript` prevents FOUC in the root layout.

### 4. Animations Strategy
- **Smooth Scroll**: Powered by `Lenis`.
- **GSAP**: Used for complex timeline-based and looping data animations.
- **Framer Motion**: Used for declarative UI transitions.

## 🛠️ Building and Running (Using Bun)

| Task | Command |
| :--- | :--- |
| **Development** | `bun run dev` |
| **Production Build** | `bun run build` |
| **Linting** | `bun run lint` |
| **Type Checking** | `bun run type-check` |
| **Testing** | `bun run test` |
| **Full Validation** | `bun run validate` |

## 🛠 Specialized Skills (Matt Pocock Skills)

This project integrates specialized skills located in `skills/`. Gemini CLI should reference these when performing relevant tasks:

- **TDD**: `skills/engineering/tdd/SKILL.md` (Use for all feature/bugfix implementation).
- **Diagnose**: `skills/engineering/diagnose/SKILL.md` (Use for debugging).
- **Caveman**: `skills/productivity/caveman/SKILL.md` (Use for token efficiency).

## 📂 Key Directory Map

- `src/app/`: Routing, global styles, and root layout.
- `src/components/`: Component library categorized by function.
- `src/hooks/`: Custom React hooks.
- `src/lib/`: Utilities, constants, and data definitions.
- `tests/`: Vitest test suite.
- `docs/`: In-depth documentation on architecture and decisions.

---

**Note:** This file is a living document. Update it as new architectural decisions are made.
