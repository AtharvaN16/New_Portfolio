# Repository Guidelines

## Project Structure & Module Organization
- Core app code lives in `src/` using Next.js App Router.
- Routes and top-level pages are in `src/app/` (for example `src/app/page.tsx`, `src/app/work/page.tsx`).
- Reusable UI and feature components are in `src/components/` (`ui/`, `layout/`, `hero/`, `animations/`, `providers/`).
- Shared logic is in `src/lib/` (`utils/`, `data/`, `mdx/`) and custom hooks are in `src/hooks/`.
- Global styles and tokens are in `src/styles/`; static files are in `public/`.
- Tests live in `tests/` with `tests/unit/` and `tests/setup.ts`.
- Documentation and architecture notes are in `docs/`.

## Build, Test, and Development Commands
- `npm run dev`: start local development server.
- `npm run build`: create production build.
- `npm run start`: run production build locally.
- `npm run lint` / `npm run lint:fix`: run/fix ESLint issues.
- `npm run format` / `npm run format:check`: apply/check Prettier formatting.
- `npm run type-check`: run TypeScript checks without emit.
- `npm run test`, `npm run test:ui`, `npm run test:coverage`: run Vitest (watch, UI, coverage).
- `npm run validate`: full gate (lint, format check, type check, tests).

## Coding Style & Naming Conventions
- TypeScript + React functional components are standard.
- Prettier rules: 2 spaces, single quotes, no semicolons, 80-char line width.
- Follow ESLint (`eslint.config.mjs`), including `consistent-type-imports` and no unused vars (prefix intentional unused values with `_`).
- Use `PascalCase` for components (`ProjectCard.tsx`), `camelCase` for hooks/utilities (`use-media-query.ts`, `splitText.ts`), and kebab-case for route folders.

## Testing Guidelines
- Framework: Vitest + Testing Library (`jsdom` environment).
- Keep unit tests under `tests/unit/`; use `*.test.ts` or `*.test.tsx` naming.
- Prefer behavior-focused tests over implementation details.
- Run `npm run test:coverage` for high-impact UI or logic changes.

## Commit & Pull Request Guidelines
- Current history favors imperative, descriptive commit subjects (for example: `Refactor WaterBlob component...`, `Add FooterSmog component...`).
- Keep commits scoped to a single concern.
- PRs should include: concise summary, changed areas, test/validation results (`npm run validate`), and screenshots/GIFs for visual changes.
- Link related issues/tasks and note any env/config changes (for example updates to `.env.example`).

## Security & Configuration Tips
- Never commit secrets; use `.env.local` and keep `.env.example` updated.
- Validate environment variables through `src/lib/env.ts` when adding new config.
