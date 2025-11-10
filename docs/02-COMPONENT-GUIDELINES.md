# 🧩 Component Building Guidelines

**Purpose:** How to build components properly - avoiding the mistakes from the old portfolio.

**Prerequisites:**

- Read `/Documentation/CODEBASE_STRATEGIC_REVIEW.md` (see the 23,000-line component problem)
- Read `01-ARCHITECTURE.md` (understand the design system)

---

## 📊 Table of Contents

1. [Component Size Limits](#component-size-limits)
2. [Component Structure](#component-structure)
3. [Naming Conventions](#naming-conventions)
4. [Props & TypeScript](#props--typescript)
5. [Styling Guidelines](#styling-guidelines)
6. [Common Patterns](#common-patterns)
7. [Testing Components](#testing-components)
8. [Migration Checklist](#migration-checklist)

---

## 🚨 Component Size Limits

### The Rule: **Maximum 300 Lines**

**Old Portfolio Disasters:**

```
HomeBlobs.tsx:        1,113 lines ❌
CaseStudyAnimation.tsx: 1,845 lines ❌
HoverTextBox.tsx:      23,390 lines ❌❌❌
Logo.tsx:             13,166 lines ❌❌
Footer.tsx:             381 lines ❌
```

**Reference:** `/Documentation/CODEBASE_STRATEGIC_REVIEW.md` → Section 1.1 "Monolithic Component Disease"

### Why This Matters

**Problems with giant components:**

- ❌ Can't understand what it does
- ❌ Can't test in isolation
- ❌ Can't reuse elsewhere
- ❌ Debugging nightmare
- ❌ Team can't collaborate
- ❌ Every change risks breaking something

**Benefits of small components:**

- ✅ Easy to understand
- ✅ Easy to test
- ✅ Reusable
- ✅ Easy to debug
- ✅ Team-friendly
- ✅ Safe to modify

### ESLint Enforcement

Already configured in `.eslintrc.json`:

```json
{
  "rules": {
    "max-lines": ["warn", 300]
  }
}
```

You'll get a warning if a component exceeds 300 lines.

### How to Split Large Components

**If your component is >300 lines, use these strategies:**

#### Strategy 1: Extract Sub-Components

**Before (800 lines):**

```tsx
function HeroSection() {
  // 100 lines of background logic
  // 200 lines of content logic
  // 300 lines of animation logic
  // 200 lines of JSX

  return <div>{/* All in one giant component */}</div>
}
```

**After (4 components <200 lines each):**

```tsx
// HeroSection.tsx (100 lines) - Orchestrator
function HeroSection() {
  return (
    <div>
      <HeroBackground />
      <HeroContent />
      <HeroAnimation />
    </div>
  )
}

// HeroBackground.tsx (150 lines)
function HeroBackground() {
  /* ... */
}

// HeroContent.tsx (120 lines)
function HeroContent() {
  /* ... */
}

// HeroAnimation.tsx (180 lines)
function HeroAnimation() {
  /* ... */
}
```

#### Strategy 2: Extract Custom Hooks

**Before:**

```tsx
function Component() {
  // 50 lines of mouse tracking logic
  // 40 lines of scroll logic
  // 60 lines of animation logic
  // 150 lines JSX

  return <div>...</div>
}
```

**After:**

```tsx
// Component.tsx (80 lines)
function Component() {
  const mousePosition = useMouseTracking()
  const scrollProgress = useScrollProgress()
  const animation = useHeroAnimation()

  return <div>...</div>
}

// hooks/use-mouse-tracking.ts (50 lines)
export function useMouseTracking() {
  /* ... */
}

// hooks/use-scroll-progress.ts (40 lines)
export function useScrollProgress() {
  /* ... */
}

// hooks/use-hero-animation.ts (60 lines)
export function useHeroAnimation() {
  /* ... */
}
```

#### Strategy 3: Extract Constants & Types

**Before:**

```tsx
function Component() {
  const animations = {
    // 80 lines of animation config
  }

  const colors = {
    // 30 lines of color config
  }

  // 200 lines of component logic
}
```

**After:**

```tsx
// Component.tsx (150 lines)
import { animations } from './animations'
import { colors } from './colors'

function Component() {
  // Clean, focused component
}

// animations.ts (80 lines)
export const animations = {
  /* ... */
}

// colors.ts (30 lines)
export const colors = {
  /* ... */
}
```

---

## 🏗️ Component Structure

### Standard Component Template

```tsx
'use client' // If uses hooks/interactivity

/**
 * ComponentName - Brief description
 *
 * Detailed description of what this component does,
 * when to use it, and any important notes.
 *
 * @example
 * <ComponentName
 *   prop1="value"
 *   prop2={data}
 * />
 */

import type { ComponentProps } from './types'
import { useState } from 'react'
import { cn } from '@/lib/utils/cn'

interface Props {
  // Define props with JSDoc
  /** Description of prop */
  title: string
  /** Optional prop with default */
  variant?: 'primary' | 'secondary'
  /** Children content */
  children?: React.ReactNode
}

export function ComponentName({ title, variant = 'primary', children }: Props) {
  // 1. Hooks
  const [state, setState] = useState(false)

  // 2. Derived state/calculations
  const isActive = variant === 'primary' && state

  // 3. Event handlers
  const handleClick = () => {
    setState(!state)
  }

  // 4. Render
  return (
    <div
      className={cn(
        'base-classes',
        variant === 'primary' && 'primary-classes',
        isActive && 'active-classes'
      )}
    >
      <h2>{title}</h2>
      {children}
    </div>
  )
}
```

### Component Organization

**File structure for complex components:**

```
src/components/hero/
├── HeroSection.tsx           # Main export (orchestrator)
├── HeroBackground.tsx        # Sub-component
├── HeroContent.tsx           # Sub-component
├── types.ts                  # TypeScript types
├── animations.ts             # Animation configs
└── HeroSection.test.tsx      # Tests
```

### Composition Pattern

**Build complex UIs by composing small components:**

```tsx
// Good: Composed from small pieces
<HeroSection>
  <HeroBackground variant="gradient">
    <ParticleEffect />
  </HeroBackground>
  <HeroContent>
    <Heading size="xl">Title</Heading>
    <Paragraph>Description</Paragraph>
    <Button variant="primary">CTA</Button>
  </HeroContent>
</HeroSection>

// Bad: One giant component that does everything
<HeroMegaComponent
  title="Title"
  description="Description"
  particleEffect={true}
  backgroundGradient={true}
  buttonText="CTA"
  // 50 more props...
/>
```

---

## 📝 Naming Conventions

### Components (PascalCase)

```tsx
✅ Button.tsx
✅ HeroSection.tsx
✅ CaseStudyCard.tsx
✅ ImageGallery.tsx

❌ button.tsx
❌ hero-section.tsx
❌ caseStudyCard.tsx
```

### Hooks (camelCase + "use" prefix)

```tsx
✅ useBreakpoint.ts
✅ useScrollProgress.ts
✅ useMouseTracking.ts

❌ use-breakpoint.ts
❌ UseBreakpoint.ts
❌ breakpoint.ts
```

### Utilities (camelCase)

```tsx
✅ formatDate.ts
✅ calculateProgress.ts
✅ cn.ts

❌ format-date.ts
❌ FormatDate.ts
```

### Files/Folders (kebab-case)

```
✅ case-study/
✅ user-profile/
✅ api-client.ts

❌ caseStudy/
❌ UserProfile/
❌ apiClient.ts
```

### Constants (UPPER_SNAKE_CASE)

```tsx
✅ API_ENDPOINTS.ts
✅ BREAKPOINTS.ts

const MAX_WIDTH = 1200
const DEFAULT_THEME = 'light'

❌ apiEndpoints.ts
❌ maxWidth = 1200
```

**Old Portfolio Problem:** Inconsistent naming everywhere

- `useIsVisible.ts` vs `use_progress.ts` vs `use-mobile.ts`
- Made files hard to find

**Reference:** `/Documentation/CODEBASE_STRATEGIC_REVIEW.md` → Section 4.2

---

## 🎯 Props & TypeScript

### Define Props Interface

```tsx
// Good: Explicit interface with JSDoc
interface ButtonProps {
  /** Button text */
  children: React.ReactNode
  /** Visual variant */
  variant?: 'primary' | 'secondary' | 'ghost'
  /** Size preset */
  size?: 'sm' | 'md' | 'lg'
  /** Click handler */
  onClick?: () => void
  /** Disabled state */
  disabled?: boolean
  /** Additional CSS classes */
  className?: string
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  className,
}: ButtonProps) {
  // ...
}
```

### Optional vs Required Props

```tsx
interface Props {
  // Required
  title: string
  id: number

  // Optional (with default)
  variant?: 'primary' | 'secondary'

  // Optional (no default needed)
  onClick?: () => void
  className?: string

  // Required but can be undefined
  data: User | undefined
}
```

### Extending HTML Element Props

```tsx
// Extend native button props
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
}

export function Button({ variant = 'primary', ...props }: ButtonProps) {
  return <button {...props} className={cn('base', variant)} />
}

// Usage: All native button props work!
;<Button
  variant="primary"
  onClick={handleClick}
  type="submit"
  disabled={isLoading}
>
  Submit
</Button>
```

### Prop Validation (Runtime)

For complex props, use Zod:

```tsx
import { z } from 'zod'

const MetricsSchema = z.object({
  value: z.string(),
  label: z.string(),
  change: z.number().optional(),
})

interface Props {
  metrics: z.infer<typeof MetricsSchema>[]
}

export function MetricsCard({ metrics }: Props) {
  // Validate at runtime (in development)
  if (process.env.NODE_ENV === 'development') {
    metrics.forEach((m) => MetricsSchema.parse(m))
  }

  // ...
}
```

---

## 🎨 Styling Guidelines

### Use Design Tokens (Never Hardcode)

```tsx
// ❌ BAD: Hardcoded values
<div style={{
  color: '#3947CA',
  marginTop: '240px',
  borderRadius: '8px'
}}>

// ✅ GOOD: Design tokens via Tailwind
<div className="text-primary mt-32 rounded-lg">

// ✅ GOOD: Design tokens via CSS variables
<div style={{
  color: 'rgb(var(--color-primary))',
  marginTop: 'var(--space-32)',
  borderRadius: 'var(--radius-lg)'
}}>
```

### className Merging with cn()

```tsx
import { cn } from '@/lib/utils/cn'

interface Props {
  variant?: 'primary' | 'secondary'
  isActive?: boolean
  className?: string
}

export function Component({ variant, isActive, className }: Props) {
  return (
    <div
      className={cn(
        // Base classes (always applied)
        'px-4 py-2 rounded-lg transition-colors',

        // Conditional classes
        variant === 'primary' && 'bg-primary text-white',
        variant === 'secondary' && 'bg-surface text-foreground',
        isActive && 'ring-2 ring-primary',

        // Allow className override
        className
      )}
    >
      Content
    </div>
  )
}
```

### Responsive Classes

```tsx
// Mobile-first approach
<div className="
  text-base          // 16px on mobile
  md:text-lg         // 18px on tablet (768px+)
  lg:text-xl         // 20px on desktop (1024px+)

  p-4                // 16px padding on mobile
  md:p-6             // 24px on tablet
  lg:p-8             // 32px on desktop
">
```

### Component Variants with CVA

For complex variant logic, use `class-variance-authority`:

```tsx
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  // Base classes
  'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-white hover:bg-primary-hover',
        secondary: 'bg-surface text-foreground hover:bg-surface-elevated',
        ghost: 'hover:bg-surface',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

interface ButtonProps extends VariantProps<typeof buttonVariants> {
  children: React.ReactNode
}

export function Button({ variant, size, children }: ButtonProps) {
  return (
    <button className={buttonVariants({ variant, size })}>{children}</button>
  )
}
```

---

## 🔄 Common Patterns

### Pattern 1: Container Component

```tsx
// Container.tsx - Max-width wrapper with padding
import { cn } from '@/lib/utils/cn'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'full'
}

const sizes = {
  sm: 'max-w-3xl', // 768px
  md: 'max-w-5xl', // 1024px
  lg: 'max-w-7xl', // 1280px
  full: 'max-w-none',
}

export function Container({
  children,
  className,
  size = 'lg',
}: ContainerProps) {
  return (
    <div className={cn('mx-auto px-4 sm:px-6 lg:px-8', sizes[size], className)}>
      {children}
    </div>
  )
}
```

### Pattern 2: Section Component

```tsx
// Section.tsx - Full-width section with Container
interface SectionProps {
  children: React.ReactNode
  className?: string
  containerSize?: 'sm' | 'md' | 'lg' | 'full'
}

export function Section({ children, className, containerSize }: SectionProps) {
  return (
    <section className={cn('py-12 md:py-16 lg:py-20', className)}>
      <Container size={containerSize}>{children}</Container>
    </section>
  )
}
```

### Pattern 3: Conditional Rendering

```tsx
// Good: Early returns for loading/error states
function Component({ data, isLoading, error }: Props) {
  if (isLoading) {
    return <Skeleton />
  }

  if (error) {
    return <ErrorMessage error={error} />
  }

  if (!data) {
    return <EmptyState />
  }

  // Main render
  return <div>{data.content}</div>
}
```

### Pattern 4: Error Boundary Wrapper

```tsx
// For risky components (animations, API calls)
import { ErrorBoundary } from '@/components/error/ErrorBoundary'

export function RiskyFeature() {
  return (
    <ErrorBoundary
      fallback={
        <div className="p-8 text-center">
          <p>Unable to load this feature</p>
        </div>
      }
    >
      <ComplexAnimation />
    </ErrorBoundary>
  )
}
```

---

## 🧪 Testing Components

### Test File Location

```
src/components/ui/Button.tsx
src/components/ui/Button.test.tsx  ← Same folder
```

### Basic Component Test

```tsx
// Button.test.tsx
import { render, screen } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('handles click events', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click</Button>)

    screen.getByText('Click').click()
    expect(handleClick).toHaveBeenCalledOnce()
  })

  it('applies variant classes', () => {
    render(<Button variant="secondary">Button</Button>)
    const button = screen.getByText('Button')
    expect(button).toHaveClass('bg-surface')
  })
})
```

### Testing with User Interactions

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

it('toggles state on click', async () => {
  const user = userEvent.setup()
  render(<Toggle />)

  const button = screen.getByRole('button')
  expect(button).toHaveAttribute('aria-pressed', 'false')

  await user.click(button)
  expect(button).toHaveAttribute('aria-pressed', 'true')
})
```

---

## ✅ Migration Checklist

### When Migrating Code from Old Portfolio

**Before bringing code over, verify:**

- [ ] **Read the audit** - Check what was wrong with this component
- [ ] **Component size** - Is it <300 lines? If not, plan how to split
- [ ] **No hardcoded values** - Replace with design tokens
- [ ] **No inline styles** - Use Tailwind classes
- [ ] **Proper naming** - Follow conventions
- [ ] **TypeScript** - Add proper types
- [ ] **Remove console.logs** - No debugging statements
- [ ] **Error boundary** - Add if component is risky
- [ ] **Accessibility** - Semantic HTML, ARIA labels
- [ ] **Responsive** - Test 320px to 1920px
- [ ] **Dark mode** - Works in both themes
- [ ] **Write tests** - At least basic coverage
- [ ] **Document** - Add JSDoc comments

### Refactoring Template

```tsx
// OLD PORTFOLIO CODE (don't use as-is!)
function OldComponent() {
  // 500 lines of messy code
  // Hardcoded colors
  // Inline styles
  // No types
  // console.logs everywhere
}

// NEW PORTFOLIO CODE (refactored)
/**
 * ComponentName - What it does
 *
 * Refactored from old portfolio's OldComponent
 * Fixes: Size, hardcoded values, types, accessibility
 */
interface Props {
  // Proper types
}

export function ComponentName({ ...props }: Props) {
  // Clean, focused logic
  // Uses design tokens
  // Proper TypeScript
  // Well tested
}
```

---

## 📚 Reference

**Related Docs:**

- Design system → `01-ARCHITECTURE.md`
- Animation patterns → `03-ANIMATION-STRATEGY.md`
- Decisions → `04-DECISIONS-LOG.md`

**Old Portfolio Issues:**

- Component size disasters → `/Documentation/CODEBASE_STRATEGIC_REVIEW.md` Section 1.1
- Inconsistent patterns → `/Documentation/CODEBASE_STRATEGIC_REVIEW.md` Section 4.2
- Magic numbers → `/Documentation/CODEBASE_STRATEGIC_REVIEW.md` Section 4.3

---

**Last Updated:** 2025-01-23
**Status:** Living Document
