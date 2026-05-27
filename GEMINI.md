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

## 🛠 Available Skill Families

**7 families installed.** Agents: update this list whenever a new skill family is added.

| Family | Location | Purpose |
| :--- | :--- | :--- |
| **agent-council** | `.agents/skills/agent-council/` | Gather multi-agent opinions and synthesize a recommendation for big decisions with trade-offs. |
| **engineering** | `skills/engineering/` | TDD, debugging, architecture, planning, and code-quality workflows. |
| **productivity** | `skills/productivity/` | Token-efficient communication, handoffs, and focused review. |
| **impeccable** | `.agents/skills/impeccable/` | Design, polish, and improve frontend UI/UX. |
| **find-skills** | `.agents/skills/find-skills/` | Discover and install new skills from the skills ecosystem. |
| **nextjs-performance** | `.agents/skills/nextjs-performance/` | Optimize Next.js for Core Web Vitals, caching, bundles, and Server Components. |
| **performance-investigation** | `.agents/skills/performance-investigation/` | Investigate performance regressions and optimization opportunities. |

Use **agent-council** before big decisions with meaningful trade-offs. Use **find-skills** before complex tasks to check for better automation. When installing, only add the **specific targeted skill** needed — **NEVER** download an entire skill library.

## 📂 Key Directory Map

- `src/app/`: Routing, global styles, and root layout.
- `src/components/`: Component library categorized by function.
- `src/hooks/`: Custom React hooks.
- `src/lib/`: Utilities, constants, and data definitions.
- `tests/`: Vitest test suite.
- `docs/`: In-depth documentation on architecture and decisions.

---

**Note:** This file is a living document. Update it as new architectural decisions are made.
