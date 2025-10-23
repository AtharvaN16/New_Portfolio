# 🏗️ Architecture Documentation

**Purpose:** Complete guide to the portfolio's architecture, design system, and structural patterns.

**Prerequisites:** Read `/Documentation/CODEBASE_STRATEGIC_REVIEW.md` to understand what we're fixing.

---

## 📊 Table of Contents

1. [Design Token System](#design-token-system)
2. [Folder Structure](#folder-structure)
3. [State Management](#state-management)
4. [Routing & Pages](#routing--pages)
5. [Responsive System](#responsive-system)
6. [Dark Mode Implementation](#dark-mode-implementation)
7. [Performance Strategy](#performance-strategy)

---

## 🎨 Design Token System

### What Are Design Tokens?

**Design tokens are the single source of truth for all visual design decisions.**

Instead of this (old portfolio):
```tsx
// Hardcoded values scattered everywhere
<div style={{ marginTop: '240px', color: '#3947CA' }}>
```

We do this (new portfolio):
```tsx
// References design tokens
<div className="mt-32 text-primary">
```

### Why This Matters

**Old Portfolio Problem:**
- Colors defined in 47 different files
- 4 different styling approaches (Tailwind, CSS, SCSS, inline)
- Change brand color = find-replace across 100+ files
- Inconsistent spacing (8px here, 10px there, 12px somewhere else)

**Reference:** `/Documentation/CODEBASE_STRATEGIC_REVIEW.md` → Section 4.3 "Magic Numbers Everywhere"

**New Portfolio Solution:**
- All values in ONE file: `src/app/globals.css`
- Change once = updates everywhere
- Consistent spacing scale
- Light/dark mode = just swap token values

### Token Categories

Located in: `src/app/globals.css`

#### 1. **Colors**

```css
/* Light Mode */
:root {
  --color-background: 255 255 255;      /* #ffffff */
  --color-surface: 250 250 250;          /* #fafafa */
  --color-foreground: 23 23 23;          /* #171717 */

  --color-primary: 57 71 202;            /* #3947ca - Brand blue */
  --color-accent: 79 70 229;             /* #4f46e5 - Accent */

  --color-success: 34 197 94;            /* Green */
  --color-warning: 251 146 60;           /* Orange */
  --color-error: 239 68 68;              /* Red */

  --color-border: 229 231 235;           /* #e5e7eb */
}

/* Dark Mode (automatically swaps) */
[data-theme='dark'] {
  --color-background: 10 10 10;          /* #0a0a0a */
  --color-surface: 23 23 23;             /* #171717 */
  --color-foreground: 237 237 237;       /* #ededed */
  --color-primary: 99 102 241;           /* Brighter for dark */
  /* etc... */
}
```

**Usage:**
```tsx
<div className="bg-background text-foreground">
  Content adapts to theme automatically
</div>
```

#### 2. **Spacing** (8px Grid System)

```css
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-5: 1.25rem;  /* 20px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-10: 2.5rem;  /* 40px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
--space-20: 5rem;    /* 80px */
--space-24: 6rem;    /* 96px */
--space-32: 8rem;    /* 128px */
```

**Why 8px grid?**
- Industry standard
- Clean mathematical progression
- Works well for responsive scaling
- Aligns with design tools (Figma, etc.)

**Usage:**
```tsx
<div className="p-4 gap-8">  {/* 16px padding, 32px gap */}
```

#### 3. **Typography**

```css
/* Font Sizes */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */
--text-6xl: 3.75rem;   /* 60px */
--text-7xl: 4.5rem;    /* 72px */

/* Line Heights */
--leading-none: 1;
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
--leading-loose: 2;

/* Font Families */
--font-sans: var(--font-geist-sans), system-ui, sans-serif;
--font-mono: var(--font-geist-mono), monospace;
```

**Auto-responsive headings:**
```tsx
<h1>  {/* 48px mobile → 60px tablet → 72px desktop */}
<h2>  {/* 30px mobile → 36px tablet → 48px desktop */}
```

#### 4. **Effects**

```css
/* Shadows */
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);

/* Border Radius */
--radius-sm: 0.25rem;   /* 4px */
--radius-md: 0.375rem;  /* 6px */
--radius-lg: 0.5rem;    /* 8px */
--radius-xl: 0.75rem;   /* 12px */
--radius-2xl: 1rem;     /* 16px */
--radius-full: 9999px;  /* Circular */

/* Transitions */
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: 350ms cubic-bezier(0.4, 0, 0.2, 1);
```

#### 5. **Z-Index Scale**

```css
--z-base: 0;
--z-dropdown: 1000;
--z-sticky: 1100;
--z-fixed: 1200;
--z-modal-backdrop: 1300;
--z-modal: 1400;
--z-popover: 1500;
--z-tooltip: 1600;
```

**Old Portfolio Problem:** Random z-index values (1001, 1002, 50, 2, 1000)
**New Solution:** Organized scale

### Customizing Design Tokens

**To change brand colors:**

1. Edit `src/app/globals.css`
2. Update the root variables:
```css
:root {
  --color-primary: 57 71 202;  /* Change to your brand */
  --color-accent: 79 70 229;   /* Change accent color */
}
```

3. Also update dark mode:
```css
[data-theme='dark'] {
  --color-primary: 99 102 241;  /* Adjust for dark mode */
}
```

**Everything else updates automatically!**

---

## 📁 Folder Structure

### Overview

```
portfolio-new/
├── src/
│   ├── app/                          # Next.js 15 App Router
│   ├── components/                   # React components
│   ├── hooks/                        # Custom React hooks
│   ├── lib/                          # Utilities & helpers
│   ├── styles/                       # Global styles
│   ├── types/                        # TypeScript types
│   └── content/                      # MDX content (case studies)
│
├── public/                           # Static assets
├── tests/                            # Test files
├── docs/                             # Documentation (you're here)
└── Documentation/                    # Old portfolio audits (reference)
```

### Detailed Breakdown

#### `src/app/` - Next.js App Router

```
src/app/
├── layout.tsx              # Root layout (theme, providers, SEO)
├── page.tsx                # Homepage
├── globals.css             # Design tokens + base styles
├── error.tsx               # Error page handler
├── not-found.tsx           # 404 page
├── sitemap.ts              # Auto-generated sitemap
├── robots.ts               # SEO robots.txt
│
├── case-studies/
│   ├── page.tsx           # Case studies gallery
│   └── [slug]/
│       └── page.tsx       # Individual case study
│
└── contact/
    └── page.tsx           # Contact page
```

**Key Files:**

- **`layout.tsx`**: Root of everything
  - SEO metadata
  - Theme provider
  - Lenis smooth scroll
  - Font loading

- **`globals.css`**: Design tokens (SINGLE SOURCE OF TRUTH)

- **`page.tsx`**: Each folder's main page

#### `src/components/` - React Components

```
src/components/
├── ui/                    # Reusable primitives
│   ├── Button.tsx        # <200 lines
│   ├── Card.tsx
│   ├── Input.tsx
│   └── ...
│
├── layout/               # Layout components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Container.tsx    # Max-width wrapper
│   └── Section.tsx      # Page sections
│
├── case-study/          # Case study components
│   ├── HeroVideo.tsx
│   ├── ImageGrid.tsx
│   ├── MetricsCard.tsx
│   └── ...
│
├── animations/          # Reusable animation wrappers
│   ├── FadeIn.tsx
│   ├── SlideIn.tsx
│   └── ScrollReveal.tsx
│
├── providers/           # React context providers
│   ├── ThemeProvider.tsx    # Dark mode
│   └── LenisProvider.tsx    # Smooth scroll
│
├── error/               # Error handling
│   └── ErrorBoundary.tsx
│
└── ThemeScript.tsx      # Prevents theme flash
```

**Component Rules** (see `02-COMPONENT-GUIDELINES.md`):
- Max 300 lines per file
- One component = one responsibility
- Extract logic to custom hooks
- Use design tokens (no hardcoded values)

#### `src/hooks/` - Custom Hooks

```
src/hooks/
├── use-breakpoint.ts      # Responsive breakpoints
├── use-scroll-progress.ts # Scroll position
├── use-intersection.ts    # Element visibility
└── ...
```

**Naming:** Always `camelCase` starting with `use`

#### `src/lib/` - Utilities

```
src/lib/
├── utils/
│   ├── cn.ts             # className merger
│   └── format.ts         # Formatting helpers
│
├── animations/
│   └── variants.ts       # Framer Motion variants
│
└── env.ts                # Type-safe env variables
```

#### `src/content/` - MDX Content

```
src/content/
└── case-studies/
    ├── project-1.mdx
    ├── project-2.mdx
    └── project-3.mdx
```

**See:** MDX setup details in `03-ANIMATION-STRATEGY.md`

---

## 🔄 State Management

### Philosophy

**Keep it simple.** We don't need Redux/Zustand for a portfolio.

**Old Portfolio Problem:**
- State scattered everywhere
- Multiple sources of truth
- State in localStorage, sessionStorage, React state, and DOM attributes simultaneously

**Reference:** `/Documentation/CODEBASE_STRATEGIC_REVIEW.md` → Section 1.3 "State Management Chaos"

### Our Approach

#### 1. **React Context** (for global state)

**Theme State:**
```tsx
// src/components/providers/ThemeProvider.tsx
<ThemeProvider>
  {children}
</ThemeProvider>

// Usage:
const { theme, toggleTheme } = useTheme()
```

**Lenis Smooth Scroll:**
```tsx
// src/components/providers/LenisProvider.tsx
<LenisProvider>
  {children}
</LenisProvider>
```

#### 2. **Local State** (for component-specific)

```tsx
// Use useState for component-specific state
const [isOpen, setIsOpen] = useState(false)
```

#### 3. **URL State** (for shareable state)

```tsx
// Use Next.js search params
const searchParams = useSearchParams()
const filter = searchParams.get('filter')
```

#### 4. **No Redux/Zustand**

Why? Portfolio doesn't have complex shared state.

**Use contexts for:**
- Theme (light/dark)
- Smooth scroll instance

**Use local state for:**
- UI state (modals, dropdowns)
- Form inputs
- Animations

---

## 🛣️ Routing & Pages

### Next.js App Router

We use Next.js 15 App Router (file-based routing):

```
src/app/
├── page.tsx                    → /
├── case-studies/
│   ├── page.tsx               → /case-studies
│   └── [slug]/
│       └── page.tsx           → /case-studies/chess-app
└── contact/
    └── page.tsx               → /contact
```

### Page Structure Template

```tsx
// src/app/some-page/page.tsx
import { Metadata } from 'next'

// SEO metadata
export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description for SEO',
}

// Page component
export default function PageName() {
  return (
    <main id="main-content">
      {/* Page content */}
    </main>
  )
}
```

**Always include:**
- ✅ `metadata` export for SEO
- ✅ `<main id="main-content">` wrapper (accessibility)
- ✅ Semantic HTML

---

## 📱 Responsive System

### Mobile-First Approach

**Old Portfolio Problem:**
- Missing viewport meta tag → Mobile completely broken
- Desktop-first approach → Mobile was afterthought

**Reference:** `/Documentation/PORTFOLIO_AUDIT.md` → Critical issue #1

### Breakpoints

```typescript
// Tailwind breakpoints (mobile-first)
sm: 640px   // Small tablets
md: 768px   // Tablets
lg: 1024px  // Laptops
xl: 1280px  // Desktops
2xl: 1536px // Large desktops
```

### Usage

**CSS (Tailwind):**
```tsx
<div className="
  text-base          // 16px on mobile
  md:text-lg         // 18px on tablets
  lg:text-xl         // 20px on desktop
">
```

**JavaScript (Hook):**
```tsx
import { useBreakpoints } from '@/hooks/use-breakpoint'

function Component() {
  const { isMobile, isTablet, isDesktop } = useBreakpoints()

  if (isMobile) {
    return <MobileView />
  }

  return <DesktopView />
}
```

### Testing Checklist

Test on these widths:
- [ ] 320px (iPhone SE - smallest)
- [ ] 393px (iPhone 14 Pro)
- [ ] 768px (iPad)
- [ ] 1024px (Laptop)
- [ ] 1920px (Desktop)

---

## 🌓 Dark Mode Implementation

### How It Works

**Three-Part System:**

1. **ThemeScript** (prevents flash)
   - Runs BEFORE React hydrates
   - Sets theme immediately
   - Located in `<head>` of layout

2. **ThemeProvider** (React context)
   - Manages theme state
   - Provides `useTheme` hook
   - Persists to localStorage

3. **CSS Variables** (design tokens)
   - Light/dark values in globals.css
   - Automatically swap based on `data-theme` attribute

### Architecture

```tsx
// layout.tsx
<html suppressHydrationWarning>
  <head>
    <ThemeScript />  {/* 1. Prevents flash */}
  </head>
  <body>
    <ThemeProvider>  {/* 2. React state */}
      {children}
    </ThemeProvider>
  </body>
</html>
```

```css
/* globals.css */
:root {
  --color-background: 255 255 255;  /* 3. Light */
}

[data-theme='dark'] {
  --color-background: 10 10 10;     /* 3. Dark */
}
```

### Usage

```tsx
import { useTheme } from '@/components/providers/ThemeProvider'

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  )
}
```

**Old Portfolio Problem:**
- Theme flash on page load (bad UX)
- Theme state in 4 different places
- Inconsistent behavior

**New Solution:**
- Zero flash (ThemeScript runs first)
- Single source of truth (ThemeProvider)
- Respects system preference
- Persists user choice

---

## ⚡ Performance Strategy

### Static Site Generation (SSG)

**All pages are pre-rendered at build time:**

```bash
npm run build
# ✓ Generating static pages (6/6)
```

**Benefits:**
- ⚡ Instant page loads
- 🚀 Perfect Lighthouse scores
- 💰 Cheap hosting (Vercel free tier)
- 🔍 Great for SEO

### Image Optimization

**Use Next.js Image:**
```tsx
import Image from 'next/image'

<Image
  src="/photo.jpg"
  alt="Description"
  width={1200}
  height={675}
  loading="lazy"
/>
```

**Automatic:**
- WebP/AVIF conversion
- Responsive sizes
- Lazy loading
- Blur placeholders

### Font Optimization

**Already configured in layout.tsx:**
```tsx
import { Geist, Geist_Mono } from 'next/font/google'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',     // Prevent FOIT
  preload: true,       // Preload main font
})
```

### Code Splitting

**Will be added when building features:**
```tsx
// Lazy load heavy components
const HeroAnimation = dynamic(() => import('./HeroAnimation'), {
  loading: () => <Skeleton />,
})
```

**See:** `03-ANIMATION-STRATEGY.md` for animation performance

---

## 📚 References

**Related Documentation:**
- Component patterns → `02-COMPONENT-GUIDELINES.md`
- Animation setup → `03-ANIMATION-STRATEGY.md`
- Technical decisions → `04-DECISIONS-LOG.md`

**Old Portfolio Issues:**
- Architecture problems → `/Documentation/CODEBASE_STRATEGIC_REVIEW.md`
- Specific issues → `/Documentation/PORTFOLIO_AUDIT.md`

---

**Last Updated:** 2025-01-23
**Status:** Living Document
