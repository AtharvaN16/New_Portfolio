# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a modern Next.js 15 portfolio website. The project structure has been flattened, and the application now lives in the **root directory**.

- **App Source**: `src/` (Next.js App Router)
- **Static Assets**: `public/`
- **Tests**: `tests/`
- **Documentation**: `docs/`
- **Specialized Skills**: `skills/` (Matt Pocock integrated skills)

**Note: The `portfolio-new/` subfolder and legacy folders (`Swaddle`, `Inspiration`) have been removed/archived.**

## 🛠 Official Deployment Workflow

To ensure a stable production environment, we follow this branch-based strategy:

1.  **Develop in `dev` branch**: All new features and bug fixes happen here.
2.  **Verify & Sync**: Once ready, merge `dev` into `main`.
3.  **Deploy from `main`**: Pushing to the `main` branch on GitHub automatically triggers a Vercel production deployment.

```bash
# Workflow example
git checkout main
git merge dev
git push origin main
```

## Development Commands

**Using Bun** (faster alternative to npm):

```bash
# Package Management
bun install              # Install dependencies
bun add <package>        # Add a package

# Development
bun run dev              # Start dev server (http://localhost:3000)
bun run build            # Production build
bun run start            # Run production build locally

# Code Quality
bun run lint             # Run ESLint
bun run lint:fix         # Auto-fix ESLint issues
bun run format           # Format with Prettier
bun run format:check     # Check formatting
bun run type-check       # TypeScript type checking

# Testing
bun run test             # Run tests in watch mode
bun run validate         # Lint + Format + Type-check + Test
```

## Critical Development Rules

### From rules.md (Core Principles)
- **File size limit**: Max 300 lines per file - refactor if larger.
- **Single responsibility**: Each module/function does one thing well.
- **No hardcoded values**: Use design tokens from `src/app/globals.css`.
- **Type safety**: Strict TypeScript, avoid `any`.
- **Specialized Skills**: Use integrated skills in `skills/` (e.g., `/tdd`, `/diagnose`).

### Component Development
- **Location**: Reusable UI in `src/components/ui/`, page-specific in `src/components/[page-name]/`.
- **Naming**: Components use `PascalCase.tsx`, hooks use `camelCase.ts` with `use` prefix.
- **Accessibility**: Use semantic HTML, WCAG 2.2 AA compliant.
- **Mobile-first**: Start with mobile layout, enhance for desktop.

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15 (App Router) + React 19.
- **Language**: TypeScript (strict mode).
- **Styling**: Tailwind CSS v4 with design token system.
- **Animation**: GSAP + Framer Motion + Lenis smooth scroll.
- **Testing**: Vitest + Testing Library.

### Design Token System
**Single source of truth: `src/app/globals.css`**

All colors, spacing, and typography are defined as CSS variables. Reference them via Tailwind classes (`bg-background`, `text-primary`).

## Notes for Claude Code

1.  **Work in Root**: All code is now at the top level.
2.  **Read `rules.md`**: Foundational coding standards.
3.  **Consult design tokens**: Check `src/app/globals.css` before styling.
4.  **Max 300 lines**: Strict limit, refactor if exceeded.
5.  **When uncertain, ask the user**.
