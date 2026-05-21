# Repository Guidelines

## Project Structure & Module Organization
- **Application Root**: The project has been flattened; all code lives in the root directory.
- **Core App**: Source code lives in `src/` using Next.js App Router.
- **Routes**: Top-level pages are in `src/app/`.
- **Components**: Reusable UI and feature components are in `src/components/` (`ui/`, `layout/`, `hero/`, `animations/`, `providers/`).
- **Logic**: Shared logic in `src/lib/` and custom hooks in `src/hooks/`.
- **Styles**: Global styles and tokens in `src/app/globals.css`.
- **Assets**: Static files in `public/`.
- **Tests**: Located in `tests/`.
- **Specialized Skills**: Agent-specific procedural guides in `skills/`.

## 🛠 Official Deployment Workflow

To ensure a stable production environment, we follow this branch-based strategy:

1.  **Develop in `dev` branch**: All new features and bug fixes happen here.
2.  **Verify & Sync**: Once ready, merge `dev` into `main`.
3.  **Deploy from `main`**: Pushing to the `main` branch on GitHub automatically triggers a Vercel production deployment.

## Build, Test, and Development Commands (Bun)
- `bun run dev`: start local development server.
- `bun run build`: create production build.
- `bun run lint` / `bun run lint:fix`: run/fix ESLint issues.
- `bun run format` / `bun run format:check`: apply/check Prettier formatting.
- `bun run images:check`: verify changed image references and image assets are optimized.
- `bun run images:audit`: audit all referenced local images and public image assets.
- `bun run type-check`: run TypeScript checks without emit.
- `bun run test`: run Vitest.
- `bun run validate`: full gate (lint, format check, type check, tests).

## Image Optimization Requirements
- Before adding or referencing a raster image, create a WebP or AVIF version and prefer that modern asset in code.
- Preserve the original visual look unless the user explicitly approves a lossy quality or crop change.
- Lossless WebP is the default safe conversion for screenshots, UI images, diagrams, and art-directed case-study visuals.
- Keep original source assets only when useful for archival/editing, but do not reference large PNG/JPG files directly from `src/`.
- Run `bun run images:check` before committing image changes. Use `bun run images:audit` for full-site image reviews.
- If a modern image remains larger than 2.5MB, confirm it needs full resolution before using it.

## 🛠 Specialized Skills (Agent Capabilities)

This project uses specialized skills in `skills/` to ensure high-quality engineering.
- **TDD**: ALWAYS use TDD for new features or bug fixes.
- **Diagnose**: Use this structured approach for debugging.
- **Caveman**: Use for compressed status updates to save context.

## Coding Style & Naming Conventions
- TypeScript + React functional components are standard.
- Use `PascalCase` for components (`ProjectCard.tsx`), `camelCase` for hooks/utilities (`use-responsive.ts`).
- **File size limit**: No file should be larger than 300 lines.

## Security & Configuration Tips
- Never commit secrets; use `.env.local` and keep `.env.example` updated.
- Validate environment variables through `src/lib/env.ts`.
