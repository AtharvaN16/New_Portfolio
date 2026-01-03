# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a portfolio project containing two main parts:
1. **portfolio-new/** - Modern Next.js 15 portfolio (active development, best practices)
2. **Old portfolio components/** - Legacy components (reference only, do not modify)
3. **Documentation/** - Setup guides and coding standards for building the portfolio
4. **rules.md** - Core development principles and coding standards (read this!)

**Primary working directory: `portfolio-new/`**

## Development Commands

**Using Bun** (faster alternative to npm, acquired by Anthropic in 2025):

```bash
# Navigate to working directory
cd portfolio-new

# Package Management
bun install              # Install dependencies (faster than npm)
bun add <package>        # Add a package
bun remove <package>     # Remove a package
bun update               # Update all dependencies

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
bun run test:ui          # Tests with UI
bun run test:coverage    # Generate coverage report

# Validation (run all checks)
bun run validate         # Lint + Format + Type-check + Test
```

**Why Bun?**
- 25x faster package installs than npm
- Drop-in replacement for Node.js (compatible with npm packages)
- Built-in bundler, transpiler, and test runner
- Powers Claude Code infrastructure
- Open-source and MIT licensed

## Critical Development Rules

### From rules.md (Core Principles)
- **File size limit**: Max 300 lines per file - refactor if larger
- **Single responsibility**: Each module/function does one thing well
- **No hardcoded values**: Use design tokens from `src/app/globals.css`
- **Type safety**: Strict TypeScript, avoid `any`, use explicit types
- **Early returns**: Avoid deep nesting, use guard clauses
- **Environment variables**: ALL secrets go in `.env.local`, never hardcode
- **Documentation files**: NEVER create .md files without explicit user permission
- **Consult user**: When uncertain about approach or implementation

### Component Development
- **Location**: Reusable UI in `src/components/ui/`, page-specific in `src/components/[page-name]/`
- **Naming**: Components use `PascalCase.tsx`, hooks use `camelCase.ts` with `use` prefix
- **Max 300 lines**: Extract logic to hooks, split into sub-components if exceeding
- **Design tokens only**: Reference CSS variables, never hardcode colors/spacing
- **Accessibility**: Use semantic HTML, ARIA labels, keyboard navigation support
- **Mobile-first**: Start with mobile layout, enhance for desktop with `sm:`, `md:`, `lg:` prefixes

## Architecture Overview

### Tech Stack
- **Runtime**: Bun (faster alternative to Node.js)
- **Framework**: Next.js 15 (App Router) + React 19
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 with design token system
- **Animation**: Framer Motion + Lenis smooth scroll
- **Testing**: Vitest + Testing Library
- **Validation**: Zod for env variables and schemas

### Design Token System
**Single source of truth: `portfolio-new/src/app/globals.css`**

All colors, spacing, typography defined as CSS variables:
- Colors: `--color-background`, `--color-primary`, `--color-accent`, etc.
- Spacing: `--space-1` (4px) through `--space-32` (128px) on 8px grid
- Typography: `--text-xs` through `--text-7xl` with responsive defaults
- Effects: `--shadow-*`, `--radius-*`, `--transition-*`, `--z-*`
- Dark mode: Automatic swapping via `[data-theme='dark']` selector

**Usage**: Reference via Tailwind classes (`bg-background`, `text-primary`, `p-4`)

**NEVER hardcode colors/spacing** - this was a major problem in the old portfolio (see Documentation/CODEBASE_STRATEGIC_REVIEW.md for context).

### Project Structure
```
portfolio-new/
├── src/
│   ├── app/                    # Next.js App Router (pages, layouts, SEO)
│   ├── components/
│   │   ├── ui/                # Reusable primitives (Button, Card, etc.)
│   │   ├── layout/            # Layout components (Navbar, Footer)
│   │   ├── hero/              # Hero section components
│   │   ├── providers/         # React contexts (Theme, Lenis)
│   │   ├── animations/        # Animation wrappers
│   │   └── error/             # Error boundaries
│   ├── hooks/                 # Custom React hooks (use-breakpoint, etc.)
│   ├── lib/
│   │   ├── utils/             # Utility functions (cn.ts for className merging)
│   │   └── env.ts             # Type-safe environment variables (Zod)
│   ├── styles/                # Additional styles (fonts, theme extensions)
│   ├── content/               # MDX content files
│   └── types/                 # TypeScript type definitions
├── public/                    # Static assets (images, videos)
├── tests/                     # Test files (unit, integration)
└── docs/                      # Internal documentation (architecture, guidelines)
```

### Key Files
- **`src/app/globals.css`** - Design tokens (SINGLE SOURCE OF TRUTH for styling)
- **`src/app/layout.tsx`** - Root layout (SEO, theme, providers, fonts)
- **`src/lib/env.ts`** - Type-safe environment variable validation
- **`src/components/providers/ThemeProvider.tsx`** - Dark mode state management
- **`src/components/ThemeScript.tsx`** - Prevents theme flash on load
- **`rules.md`** - Development principles and best practices (READ THIS)

## Common Patterns

### Type-Safe Environment Variables
```typescript
// src/lib/env.ts - Uses Zod for validation
import { env } from '@/lib/env'
const siteUrl = env.NEXT_PUBLIC_SITE_URL
```

**Setup**: Copy `.env.example` to `.env.local` and fill in values

### Dark Mode
```tsx
import { useTheme } from '@/components/providers/ThemeProvider'

function Component() {
  const { theme, toggleTheme } = useTheme()
  return <button onClick={toggleTheme}>Toggle</button>
}
```

### Responsive Breakpoints
```tsx
import { useBreakpoints } from '@/hooks/use-breakpoint'

function Component() {
  const { isMobile, isTablet, isDesktop } = useBreakpoints()
  return isMobile ? <MobileView /> : <DesktopView />
}
```

### ClassName Merging
```tsx
import { cn } from '@/lib/utils/cn'

<div className={cn('base-class', conditionalClass && 'conditional', className)} />
```

### Component Template
```tsx
import { cn } from '@/lib/utils/cn'

interface ComponentProps {
  className?: string
  children: React.ReactNode
}

export function Component({ className, children }: ComponentProps) {
  return (
    <div className={cn('base-styles', className)}>
      {children}
    </div>
  )
}
```

## SEO & Performance

### SEO Setup
- **Viewport meta**: Already configured in layout (critical for mobile)
- **Metadata**: Export `metadata` object from page components
- **Sitemap**: Auto-generated at `src/app/sitemap.ts`
- **Robots**: Configured at `src/app/robots.ts`
- **Semantic HTML**: Use `<main>`, `<nav>`, `<section>`, `<article>`, not `<div>` for everything

### Performance Targets
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1
- Lighthouse scores: 90+ on all metrics

**Image optimization**: Use Next.js `<Image>` component with WebP/AVIF formats
**Font optimization**: Already configured with `next/font` in layout
**Code splitting**: Use `dynamic()` imports for heavy components

## Testing

### Test Location
- Unit tests: `tests/unit/`
- Integration tests: `tests/integration/`
- Co-located tests: `ComponentName.test.tsx` next to component

### Test Template
```tsx
import { render, screen } from '@testing-library/react'
import { Component } from './Component'

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component>Test</Component>)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })
})
```

## MDX Setup

**Configuration**: `next.config.ts` includes `@next/mdx` setup
**Content location**: `src/content/` for MDX files
**Page extensions**: `.js`, `.jsx`, `.md`, `.mdx`, `.ts`, `.tsx`

## Accessibility Standards

**Target**: WCAG 2.2 Level AA compliance

**Requirements**:
- Semantic HTML (`<header>`, `<nav>`, `<main>`, `<footer>`)
- ARIA labels for buttons/links without text
- Keyboard navigation support (Tab, Enter, Escape)
- Focus indicators visible
- Color contrast 4.5:1 minimum
- Skip-to-content link
- `prefers-reduced-motion` support (already in globals.css)

## Error Handling

- **Error boundaries**: Wrap risky components in `<ErrorBoundary>` from `src/components/error/`
- **Error pages**: `src/app/error.tsx` for general errors, `not-found.tsx` for 404s
- **Validation**: Use Zod for runtime validation, TypeScript for compile-time

## Security

- **Secrets**: NEVER hardcode - use environment variables in `.env.local`
- **Input validation**: Validate all user inputs, sanitize outputs
- **CORS**: Configure if adding API routes
- **Rate limiting**: Implement for contact forms and API endpoints
- **CSP headers**: Configure in `next.config.ts` as needed

## State Management

**Simple approach - no Redux/Zustand needed**:
- **Global state**: React Context (theme, smooth scroll)
- **Local state**: `useState` for component-specific state
- **URL state**: Next.js `searchParams` for shareable state
- **Form state**: Controlled components or form libraries as needed

## Animation Guidelines

- **Library**: Framer Motion for React components
- **Smooth scroll**: Lenis provider (already configured in layout)
- **Performance**: Animate `transform` and `opacity` only (GPU-accelerated)
- **Accessibility**: Respect `prefers-reduced-motion` (handled in globals.css)
- **Timing**: 150ms fast, 250ms base, 350ms slow

## Git Workflow

**Never commit**:
- `.env.local` (secrets)
- `node_modules/`
- `.next/` build output
- IDE-specific files (already in `.gitignore`)

**Commit structure**: Follow semantic commit messages

## Common Issues & Solutions

### Problem: Component exceeds 300 lines
**Solution**: Extract logic to custom hooks in `src/hooks/`, split into smaller sub-components

### Problem: Need to change brand colors
**Solution**: Edit CSS variables in `src/app/globals.css` `:root` and `[data-theme='dark']` sections

### Problem: Mobile layout broken
**Solution**: Use mobile-first approach - start with base styles, add `md:` and `lg:` prefixes for larger screens

### Problem: Theme flashes on page load
**Solution**: Already handled by `<ThemeScript>` in layout - runs before React hydrates

### Problem: Need type-safe environment variable
**Solution**: Add to schema in `src/lib/env.ts`, update `.env.example`, add to `.env.local`

## Resources

- **Internal docs**: `portfolio-new/docs/` for architecture, component guidelines, animation strategy
- **Coding standards**: `rules.md` for development principles
- **Setup guide**: `Documentation/setup_guide.md` for detailed implementation instructions
- **Old portfolio issues**: `Documentation/CODEBASE_STRATEGIC_REVIEW.md` explains what problems we're solving

## Notes for Claude Code

1. **Always work in `portfolio-new/` directory** - old portfolio is reference only
2. **Read `rules.md` first** - contains core development principles
3. **Consult design tokens** before styling - check `src/app/globals.css`
4. **Ask before creating .md files** - user permission required
5. **Max 300 lines per file** - strict limit, refactor if exceeded
6. **Mobile-first** - start with mobile styles, enhance for desktop
7. **Type safety** - use strict TypeScript, avoid `any`
8. **Test as you build** - write tests alongside features
9. **Semantic HTML** - use proper elements, not divs everywhere
10. **When uncertain, ask the user** - don't guess implementation details
