# Case Study Theme System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a unified, adaptive case study theme system that derives a 6-variant palette from a single seed color using OKLCH, and remove unused MDX dependencies.

**Architecture:** A `ThemeScoper` utility will broadcast the derived palette as CSS variables from the layout level. Components will consume these variables for themed UI elements and custom selection highlights.

**Tech Stack:** Next.js, Tailwind CSS (Modern CSS Color Level 4), TypeScript.

---

### Task 1: MDX Cleanup

**Files:**
- Modify: `next.config.ts`
- Modify: `package.json`
- Delete: `mdx-components.tsx`

- [ ] **Step 1: Remove MDX configuration from Next.js**
Remove `createMDX` import and `withMDX` wrapper from `next.config.ts`. Set `pageExtensions` to exclude `md` and `mdx`.
- [ ] **Step 2: Delete `mdx-components.tsx`**
- [ ] **Step 3: Uninstall MDX dependencies**
Run: `bun remove @next/mdx @mdx-js/loader @mdx-js/react`
- [ ] **Step 4: Commit cleanup**
```bash
git add next.config.ts package.json
git rm mdx-components.tsx
git commit -m "chore: remove unused MDX dependencies and configuration"
```

---

### Task 2: Data Schema & Utilities

**Files:**
- Modify: `src/lib/data/case-studies.ts`
- Create: `src/lib/utils/color.ts`

- [ ] **Step 1: Update CaseStudy interface**
Replace `progressBarColor` and `imageBg` with `themeColor` in `src/lib/data/case-studies.ts`. Update `CaseStudyStore` to handle the new field.
- [ ] **Step 2: Create hex-to-rgb utility**
Create `src/lib/utils/color.ts` with a function to convert hex strings to space-separated RGB values (e.g., "255 140 0").

```typescript
export function hexToRgb(hex: string): string {
  // Remove hash
  hex = hex.replace('#', '');
  // Expand short hex
  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('');
  }
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `${r} ${g} ${b}`;
}
```

- [ ] **Step 3: Run type check**
Run: `bun run type-check`
- [ ] **Step 4: Commit data changes**
```bash
git add src/lib/data/case-studies.ts src/lib/utils/color.ts
git commit -m "feat: update case study schema and add color utility"
```

---

### Task 3: ThemeScoper Implementation

**Files:**
- Create: `src/components/case-study/ThemeScoper.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Implement ThemeScoper component**
This component will take a `themeColor` and inject CSS variables into a wrapper div.

```tsx
'use client'

import { hexToRgb } from '@/lib/utils/color'

interface ThemeScoperProps {
  themeColor: string
  children: React.ReactNode
}

export function ThemeScoper({ themeColor, children }: ThemeScoperProps) {
  const rgb = hexToRgb(themeColor)
  
  return (
    <div 
      className="case-study-theme"
      style={{ 
        ['--cs-primary-rgb' as string]: rgb 
      } as React.CSSProperties}
    >
      {children}
    </div>
  )
}
```

- [ ] **Step 2: Add OKLCH derivation logic to globals.css**
Define the 6 variants using the `from` syntax in `globals.css`.

```css
.case-study-theme {
  --cs-primary: rgb(var(--cs-primary-rgb));
  
  /* Light Mode Derivatives */
  --cs-pop-light: oklch(from var(--cs-primary) 0.65 0.25 h);
  --cs-soft-light: oklch(from var(--cs-primary) 0.96 0.05 h);
  --cs-contrast-light: oklch(from var(--cs-primary) 0.30 0.20 h);
  
  /* Dark Mode Derivatives */
  --cs-pop-dark: oklch(from var(--cs-primary) 0.75 0.20 h);
  --cs-soft-dark: oklch(from var(--cs-primary) 0.20 0.08 h / 0.9);
  --cs-contrast-dark: oklch(from var(--cs-primary) 0.96 0.05 h);
  
  /* Selection Tokens - Dynamic based on theme */
  --cs-selection-bg: var(--cs-soft-light);
  --cs-selection-text: var(--cs-contrast-light);
}

[data-theme='dark'] .case-study-theme {
  --cs-selection-bg: var(--cs-soft-dark);
  --cs-selection-text: var(--cs-contrast-dark);
}

.case-study-theme ::selection {
  background-color: var(--cs-selection-bg);
  color: var(--cs-selection-text);
}
```

- [ ] **Step 3: Commit ThemeScoper**
```bash
git add src/components/case-study/ThemeScoper.tsx src/app/globals.css
git commit -m "feat: implement ThemeScoper and OKLCH color engine"
```

---

### Task 4: Integration into CaseStudyLayout

**Files:**
- Modify: `src/components/case-study/CaseStudyLayout.tsx`
- Modify: `src/components/case-study/CaseStudyDetail.tsx`

- [ ] **Step 1: Wrap CaseStudyLayout with ThemeScoper**
Import `ThemeScoper` and wrap the main container.
- [ ] **Step 2: Update Progress Bar and Hero BG**
Replace `caseStudy.progressBarColor` and `caseStudy.imageBg` references with `var(--cs-pop-light)` (or dark equivalent) via Tailwind or inline styles.

```tsx
{/* Scroll Progress Bar */}
<m.div
  className="fixed top-0 left-0 right-0 h-[5px] z-[60] origin-left bg-[var(--cs-pop-light)] dark:bg-[var(--cs-pop-dark)]"
  style={{ scaleX: scrollYProgress }}
/>
```

- [ ] **Step 3: Commit integration**
```bash
git add src/components/case-study/CaseStudyLayout.tsx src/components/case-study/CaseStudyDetail.tsx
git commit -m "feat: integrate ThemeScoper into CaseStudyLayout"
```

---

### Task 5: Final Migration & Validation

**Files:**
- Modify: `src/lib/data/case-studies.ts`
- Modify: All components in `src/components/case-study/content/`

- [ ] **Step 1: Map all existing case studies to `themeColor`**
Go through `RAW_CASE_STUDIES` and convert the old colors to the new `themeColor` field.
- [ ] **Step 2: Remove props from content components**
Remove `progressBarColor` from `CaseStudyContentProps` and update all components in `src/components/case-study/content/` to use CSS variables instead of props.
- [ ] **Step 3: Run final validation**
Run: `bun run validate`
- [ ] **Step 4: Commit migration**
```bash
git add src/lib/data/case-studies.ts src/components/case-study/content/
git commit -m "feat: complete migration to unified theme system"
```
