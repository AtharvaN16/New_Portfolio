# 🎬 Animation Strategy

**Purpose:** How to implement animations properly with Framer Motion and Lenis smooth scroll.

**Prerequisites:**
- Read `/Documentation/CODEBASE_STRATEGIC_REVIEW.md` (animation performance issues in old portfolio)
- Understand you want "heavy animations" but done correctly

---

## 📊 Table of Contents

1. [Why Framer Motion (Not GSAP)](#why-framer-motion-not-gsap)
2. [Lenis Smooth Scroll](#lenis-smooth-scroll)
3. [Performance Rules](#performance-rules)
4. [Common Animation Patterns](#common-animation-patterns)
5. [Scroll-Triggered Animations](#scroll-triggered-animations)
6. [Page Transitions](#page-transitions)
7. [Accessibility](#accessibility)
8. [Migration from Old Portfolio](#migration-from-old-portfolio)

---

## 🎯 Why Framer Motion (Not GSAP)

### The Decision

**We chose Framer Motion over GSAP for the new portfolio.**

### Old Portfolio Problems with GSAP

From `/Documentation/CODEBASE_STRATEGIC_REVIEW.md`:

```tsx
// Old portfolio: GSAP chaos
- CaseStudyAnimation.tsx (1,845 lines) with GSAP timelines
- HomeBlobs.tsx (1,113 lines) mixing Three.js + GSAP
- No cleanup → memory leaks
- Complex timeline management
- Harder to make responsive
- Not React-friendly (imperative API)
```

### Why Framer Motion is Better for Us

| Aspect | GSAP | Framer Motion |
|--------|------|---------------|
| **API Style** | Imperative (tell browser what to do) | Declarative (describe what you want) |
| **React Integration** | Manual refs, cleanup, lifecycle | Built for React, automatic cleanup |
| **Bundle Size** | 80KB (with plugins) | 38KB |
| **Learning Curve** | Steeper | Easier |
| **Responsiveness** | Manual media queries | Automatic with variants |
| **Accessibility** | Manual `prefers-reduced-motion` | Built-in support |
| **Type Safety** | Basic | Full TypeScript support |

### Code Comparison

**GSAP (Old Portfolio):**
```tsx
// Imperative, complex, lots of refs
useEffect(() => {
  const tl = gsap.timeline()
  tl.to(ref.current, { opacity: 1, y: 0, duration: 1 })
  tl.to(ref2.current, { x: 100, duration: 0.5 }, '-=0.5')

  // Manual cleanup
  return () => tl.kill()
}, [])
```

**Framer Motion (New Portfolio):**
```tsx
// Declarative, simple, no refs needed
<motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
>
  Content
</motion.div>
```

### When GSAP Might Still Be Needed

**Framer Motion can't do (rare cases):**
- Complex SVG path morphing
- Extremely precise timeline orchestration
- Specific easing curves not in Framer

**Solution if needed:**
- Use Framer Motion for 95% of animations
- Use GSAP only for specific advanced cases
- Isolate in separate components with error boundaries

---

## 🌊 Lenis Smooth Scroll

### What It Does

**Lenis** adds premium momentum-based smooth scrolling (like Apple websites).

### Implementation

**Already set up in:** `src/components/providers/LenisProvider.tsx`

```tsx
// Automatically enabled in layout.tsx
<LenisProvider>
  {children}
</LenisProvider>
```

### Configuration

```tsx
// src/components/providers/LenisProvider.tsx
const lenis = new Lenis({
  duration: 1.2,          // Smoothness (higher = smoother but slower)
  easing: (t) => ...,     // Easing function
  smoothWheel: true,      // Enable for mouse wheel
  touchMultiplier: 2,     // Touch scroll speed
})
```

### Scrolling to Elements

```tsx
// Manual scroll control
import { useLenis } from '@/components/providers/LenisProvider'

function ScrollButton() {
  const lenis = useLenis()

  const scrollToSection = () => {
    lenis?.scrollTo('#section-id', {
      offset: -100,      // Account for fixed navbar
      duration: 1.5,     // Animation duration
    })
  }

  return <button onClick={scrollToSection}>Scroll Down</button>
}
```

### Accessibility

**Lenis respects `prefers-reduced-motion`:**

```tsx
// Automatically disabled if user prefers reduced motion
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches

if (prefersReducedMotion) {
  return // No smooth scroll
}
```

---

## ⚡ Performance Rules

### The 60 FPS Rule

**All animations must run at 60 FPS (16.7ms per frame).**

### What to Animate (Fast)

**✅ GPU-Accelerated Properties:**
```tsx
// FAST - Uses GPU
<motion.div
  animate={{
    opacity: 1,        // ✅ Cheap
    x: 100,            // ✅ Transform (translate)
    y: -50,            // ✅ Transform (translate)
    scale: 1.2,        // ✅ Transform (scale)
    rotate: 45,        // ✅ Transform (rotate)
  }}
/>
```

### What NOT to Animate (Slow)

**❌ Layout-Triggering Properties:**
```tsx
// SLOW - Triggers layout recalculation
<motion.div
  animate={{
    width: 200,        // ❌ Triggers layout
    height: 300,       // ❌ Triggers layout
    top: 100,          // ❌ Triggers layout
    left: 50,          // ❌ Triggers layout
    padding: 20,       // ❌ Triggers layout
    margin: 10,        // ❌ Triggers layout
  }}
/>
```

**❌ Paint-Triggering Properties:**
```tsx
// SLOW - Triggers paint
<motion.div
  animate={{
    background: 'red', // ❌ Triggers paint
    boxShadow: '...',  // ❌ Triggers paint
    borderRadius: 10,  // ❌ Triggers paint
  }}
/>
```

### Performance-First Approach

**Instead of animating width:**
```tsx
// ❌ Bad
<motion.div animate={{ width: 200 }}>

// ✅ Good - Use scaleX
<motion.div animate={{ scaleX: 1 }}>
```

**Instead of animating background:**
```tsx
// ❌ Bad
<motion.div animate={{ background: 'blue' }}>

// ✅ Good - Use opacity on overlay
<div className="bg-blue-500">
  <motion.div
    className="absolute inset-0 bg-primary"
    animate={{ opacity: 0.5 }}
  />
</div>
```

### Performance Monitoring

```tsx
// Add to complex animations during development
<motion.div
  onAnimationStart={() => console.time('animation')}
  onAnimationComplete={() => console.timeEnd('animation')}
  animate={{ ... }}
/>
```

**Target:** <16.7ms per frame = 60 FPS

---

## 🎨 Common Animation Patterns

### Pattern 1: Fade In

```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

### Pattern 2: Slide In from Bottom

```tsx
<motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>
```

### Pattern 3: Scale In

```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.4 }}
>
  Content
</motion.div>
```

### Pattern 4: Stagger Children

```tsx
<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // 100ms delay between children
      },
    },
  }}
>
  <motion.div variants={itemVariants}>Item 1</motion.div>
  <motion.div variants={itemVariants}>Item 2</motion.div>
  <motion.div variants={itemVariants}>Item 3</motion.div>
</motion.div>

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}
```

### Pattern 5: Hover Animation

```tsx
<motion.button
  whileHover={{
    scale: 1.05,
    transition: { duration: 0.2 },
  }}
  whileTap={{ scale: 0.95 }}
>
  Hover me
</motion.button>
```

### Pattern 6: Loading Spinner

```tsx
<motion.div
  animate={{ rotate: 360 }}
  transition={{
    duration: 1,
    repeat: Infinity,
    ease: 'linear',
  }}
>
  ⭐
</motion.div>
```

---

## 📜 Scroll-Triggered Animations

### Using Framer Motion's Scroll Hooks

**Pattern 1: Fade in when scrolled into view**

```tsx
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 0.6 }}
>
  Appears when 30% visible
</motion.div>
```

**Options:**
- `once: true` - Animate only once (recommended for performance)
- `once: false` - Animate every time it enters viewport
- `amount: 0.3` - Trigger when 30% visible
- `amount: 'all'` - Trigger when fully visible

### Pattern 2: Scroll Progress Indicator

```tsx
import { useScroll, motion } from 'framer-motion'

function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  )
}
```

### Pattern 3: Parallax Effect

```tsx
import { useScroll, useTransform, motion } from 'framer-motion'

function ParallaxSection() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <motion.div style={{ y }}>
      Moves slower than scroll (parallax)
    </motion.div>
  )
}
```

### Pattern 4: Scroll-Based Scale

```tsx
function ScaleOnScroll() {
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.2])

  return (
    <motion.div style={{ scale }}>
      Scales as you scroll
    </motion.div>
  )
}
```

### Integration with Lenis

**Lenis smooth scroll works automatically with Framer Motion's scroll animations.**

```tsx
// No special setup needed - just works!
<motion.div whileInView={{ opacity: 1 }}>
  Animates smoothly with Lenis scroll
</motion.div>
```

---

## 🔄 Page Transitions

### Route Change Animations

```tsx
// app/template.tsx (applies to all route changes)
'use client'

import { motion } from 'framer-motion'

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}
```

### Shared Layout Animations

```tsx
// Animate between states
<motion.div layout>
  {isExpanded ? <ExpandedView /> : <CollapsedView />}
</motion.div>
```

---

## ♿ Accessibility

### Respect User Preferences

**Framer Motion automatically respects `prefers-reduced-motion`:**

```tsx
// Automatically becomes instant if user prefers reduced motion
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }} // Becomes duration: 0 if reduced motion
/>
```

### Manual Control

```tsx
import { useReducedMotion } from 'framer-motion'

function Component() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      animate={{
        scale: shouldReduceMotion ? 1 : 1.2,
        transition: {
          duration: shouldReduceMotion ? 0 : 0.5,
        },
      }}
    />
  )
}
```

### Skip Animations Toggle

```tsx
// Provide user control
import { env } from '@/lib/env'

const animationsEnabled = env.NEXT_PUBLIC_ENABLE_ANIMATIONS

{animationsEnabled ? (
  <motion.div animate={{ ... }} />
) : (
  <div>Static content</div>
)}
```

---

## 🔄 Migration from Old Portfolio

### Refactoring GSAP to Framer Motion

**Old Portfolio GSAP:**
```tsx
// HomeBlobs.tsx from old portfolio
useEffect(() => {
  const tl = gsap.timeline()

  tl.to('.blob', {
    duration: 2,
    y: -100,
    opacity: 1,
    stagger: 0.2,
  })

  return () => tl.kill()
}, [])
```

**New Portfolio Framer Motion:**
```tsx
// Cleaner, more maintainable
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const blobVariants = {
  hidden: { opacity: 0, y: 0 },
  visible: { opacity: 1, y: -100 },
}

<motion.div
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
  {blobs.map((blob) => (
    <motion.div key={blob.id} variants={blobVariants} className="blob">
      {blob.content}
    </motion.div>
  ))}
</motion.div>
```

### Scroll Animation Migration

**Old Portfolio (GSAP ScrollTrigger):**
```tsx
gsap.to('.section', {
  scrollTrigger: {
    trigger: '.section',
    start: 'top 80%',
    end: 'bottom 20%',
    scrub: true,
  },
  y: -50,
  opacity: 1,
})
```

**New Portfolio (Framer Motion):**
```tsx
<motion.div
  className="section"
  initial={{ opacity: 0, y: 0 }}
  whileInView={{ opacity: 1, y: -50 }}
  viewport={{ once: true, amount: 0.3 }}
/>
```

### Checklist for Migration

When converting animations:

- [ ] Remove GSAP imports
- [ ] Add Framer Motion imports
- [ ] Convert imperative refs to declarative props
- [ ] Use `transform` properties (x, y, scale, rotate)
- [ ] Add `prefers-reduced-motion` support (automatic)
- [ ] Test on mobile (60 FPS)
- [ ] Wrap in ErrorBoundary if complex
- [ ] Remove manual cleanup (Framer handles it)

---

## 📚 Animation Library

### Reusable Animation Components

**Create in `src/components/animations/`:**

```tsx
// FadeIn.tsx
interface FadeInProps {
  children: React.ReactNode
  delay?: number
}

export function FadeIn({ children, delay = 0 }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  )
}

// Usage:
<FadeIn delay={0.2}>
  <Content />
</FadeIn>
```

### Variants Library

**Create in `src/lib/animations/variants.ts`:**

```tsx
export const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
}

// Usage:
<motion.div
  variants={fadeInUp}
  initial="hidden"
  animate="visible"
/>
```

---

## 🎯 Performance Best Practices

### 1. Use `will-change` Sparingly

```tsx
// Only for animations you KNOW will happen
<motion.div
  style={{ willChange: 'transform' }}
  animate={{ x: 100 }}
/>
```

### 2. Limit Concurrent Animations

```tsx
// ❌ Bad: Too many at once
{items.map(item => (
  <motion.div animate={{ ... }} /> // 100 items animating
))}

// ✅ Good: Stagger or limit
<motion.div variants={staggerContainer}>
  {items.map(item => (
    <motion.div variants={itemVariants} />
  ))}
</motion.div>
```

### 3. Use `layout` Animations Carefully

```tsx
// Can be expensive - use only when needed
<motion.div layout>
  {/* Only if layout actually changes */}
</motion.div>
```

### 4. Debounce Scroll Listeners

```tsx
// If adding custom scroll logic
import { useMemo } from 'react'
import { debounce } from 'lodash'

const handleScroll = useMemo(
  () => debounce(() => {
    // Scroll logic
  }, 16), // ~60 FPS
  []
)
```

---

## 📚 References

**Related Docs:**
- Component patterns → `02-COMPONENT-GUIDELINES.md`
- Architecture → `01-ARCHITECTURE.md`
- Decisions → `04-DECISIONS-LOG.md`

**Old Portfolio Issues:**
- Animation performance → `/Documentation/CODEBASE_STRATEGIC_REVIEW.md` Section 3.2
- GSAP complexity → `/Documentation/CODEBASE_STRATEGIC_REVIEW.md` Section 1.1

**External Resources:**
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Lenis Smooth Scroll](https://github.com/studio-freight/lenis)
- [Web Animation Performance](https://web.dev/animations/)

---

**Last Updated:** 2025-01-23
**Status:** Living Document
