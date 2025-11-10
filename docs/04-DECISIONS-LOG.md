# 📝 Architectural Decisions Log

**Purpose:** Track every major decision with full context and reasoning. Future you (and AI assistants) will thank you for this!

**Format:** Each decision includes:

- What we decided
- Why we decided it
- What we considered
- References to discussions/audits
- Date and participants

---

## 🎯 How to Use This Log

### Adding New Decisions

When making a significant choice, add an entry:

```markdown
## [Date] Decision Title

**Decision:** What did we decide?

**Context:** What problem were we solving?

**Considered Alternatives:**

1. Option A - Why not?
2. Option B - Why not?
3. Option C (chosen) - Why yes?

**Reasoning:** Detailed explanation

**References:**

- Link to relevant audit
- Link to discussion
- Link to documentation

**Participants:** Who decided?

**Status:** Active | Superseded | Deprecated
```

---

## Decision Index

1. [2025-01-23: Technology Stack](#2025-01-23-technology-stack)
2. [2025-01-23: Framer Motion over GSAP](#2025-01-23-framer-motion-over-gsap)
3. [2025-01-23: MDX over Sanity CMS](#2025-01-23-mdx-over-sanity-cms)
4. [2025-01-23: Lenis Smooth Scroll](#2025-01-23-lenis-smooth-scroll)
5. [2025-01-23: File-Based Content](#2025-01-23-file-based-content)
6. [2025-01-23: Skip Admin Panel](#2025-01-23-skip-admin-panel)
7. [2025-01-23: Design Token System](#2025-01-23-design-token-system)
8. [2025-01-23: Dark Mode Implementation](#2025-01-23-dark-mode-implementation)
9. [2025-01-23: Component Size Limit](#2025-01-23-component-size-limit)
10. [2025-01-23: Mobile-First Approach](#2025-01-23-mobile-first-approach)

---

## 2025-01-23: Technology Stack

**Decision:** Next.js 15 + React 19 + TypeScript + Tailwind CSS + Framer Motion

**Context:**
Rebuilding portfolio from scratch after old portfolio received 32/100 grade. Needed modern, maintainable stack.

**Considered Alternatives:**

1. **Keep old Next.js 15 setup**
   - Why not: Too many architectural issues to fix
   - Faster to rebuild than refactor

2. **Use different framework (Astro, Remix, etc.)**
   - Why not: Next.js is industry standard
   - Why not: Already familiar with Next.js
   - Why not: Best for portfolios (SSG + great SEO)

3. **Different styling (styled-components, Emotion)**
   - Why not: Tailwind is faster to write
   - Why not: Tailwind has better performance
   - Why not: Design tokens work great with Tailwind

**Chosen:** Next.js 15 + TypeScript + Tailwind

**Reasoning:**

- Next.js 15: Latest features, App Router, great SSG
- TypeScript: Catch bugs early, better DX
- Tailwind: Fast to write, consistent with design tokens
- React 19: Latest features, better performance

**References:**

- `/Documentation/CODEBASE_STRATEGIC_REVIEW.md` (why rebuild needed)
- `/Documentation/setup_guide.md` (best practices)

**Participants:** Atharva + AI Assistant

**Status:** ✅ Active

---

## 2025-01-23: Framer Motion over GSAP

**Decision:** Use Framer Motion as primary animation library, not GSAP

**Context:**
Old portfolio used GSAP extensively (CaseStudyAnimation.tsx 1,845 lines). Caused complexity, memory leaks, and maintenance issues. Need heavy animations but done properly.

**Considered Alternatives:**

1. **Keep GSAP**
   - Pros: Already familiar, powerful
   - Cons: Imperative API, harder to maintain
   - Cons: Manual cleanup required
   - Cons: Not React-friendly
   - Cons: Heavier bundle (80KB)
   - Why not: Old portfolio problems prove it's hard to maintain

2. **CSS Animations only**
   - Pros: Lightest, no library
   - Cons: Limited control
   - Cons: Can't do scroll-triggered easily
   - Cons: User wants "heavy animations"
   - Why not: Too limiting for requirements

3. **React Spring**
   - Pros: Physics-based, smooth
   - Cons: Different mental model (spring physics)
   - Cons: Heavier API for simple animations
   - Why not: More complex than needed

4. **Framer Motion** ✅
   - Pros: Declarative (React-friendly)
   - Pros: Automatic cleanup
   - Pros: Great TypeScript support
   - Pros: Built-in `prefers-reduced-motion`
   - Pros: Lighter (38KB)
   - Pros: Easier to maintain
   - Cons: Some advanced GSAP features missing
   - Solution: Use GSAP for specific cases if needed

**Chosen:** Framer Motion (with GSAP fallback for edge cases)

**Reasoning:**

- Declarative API matches React patterns
- Automatic cleanup prevents memory leaks
- Accessibility built-in
- Easier for others to understand and maintain
- Can handle 95% of animation needs
- Can add GSAP later for specific advanced cases

**Code Example:**

```tsx
// Old: GSAP (imperative)
useEffect(() => {
  const tl = gsap.timeline()
  tl.to(ref.current, { y: -100 })
  return () => tl.kill() // Manual cleanup
}, [])

// New: Framer Motion (declarative)
<motion.div
  initial={{ y: 0 }}
  animate={{ y: -100 }}
  // Automatic cleanup!
/>
```

**References:**

- `/Documentation/CODEBASE_STRATEGIC_REVIEW.md` Section 1.1 (GSAP complexity)
- `03-ANIMATION-STRATEGY.md` (full comparison)
- Conversation about The Swaddle website

**Participants:** Atharva + AI Assistant

**Status:** ✅ Active

---

## 2025-01-23: MDX over Sanity CMS

**Decision:** Use MDX files for case studies instead of Sanity CMS

**Context:**
The Swaddle website (inspiration) uses Sanity CMS. Considered whether we need a headless CMS for managing case studies.

**Considered Alternatives:**

1. **Sanity CMS** (like The Swaddle)
   - Pros: Nice editor UI
   - Pros: Image CDN
   - Pros: Real-time collaboration
   - Cons: Extra complexity
   - Cons: Another service to manage
   - Cons: Learning curve
   - Cons: Overkill for ~10 case studies
   - Cons: User skipping admin panel
   - Why not: Magazine needs CMS; portfolio doesn't

2. **Notion + API**
   - Pros: Already use Notion
   - Pros: Simpler than Sanity
   - Cons: Still external dependency
   - Cons: API rate limits
   - Why not: MDX is simpler

3. **Contentful, Strapi, etc.**
   - Same pros/cons as Sanity
   - Why not: Same reasoning

4. **MDX Files** ✅
   - Pros: Simple markdown + React components
   - Pros: Version controlled in Git
   - Pros: No database needed
   - Pros: No external service
   - Pros: Fast (no API calls)
   - Pros: Free
   - Pros: Flexible layouts per case study
   - Cons: Edit in code editor
   - Solution: That's fine for 5-10 case studies

**Chosen:** MDX with file-based content

**Reasoning:**

- **The Swaddle = Magazine** (hundreds of articles, multiple authors, daily updates)
- **Your Portfolio = Showcase** (~10 case studies, one author, rare updates)
- Different needs = different solutions
- MDX gives flexibility without complexity
- Can still have unique layouts per case study
- Version controlled = can track changes
- No external dependencies = simpler deployment

**Example Structure:**

```
src/content/case-studies/
├── chess-app.mdx
├── ecommerce-platform.mdx
└── fitness-tracker.mdx
```

**References:**

- Conversation analyzing The Swaddle website
- Discussion about flexible case study layouts
- `/Documentation/CODEBASE_STRATEGIC_REVIEW.md` Section 6.1 (data storage issues)

**Participants:** Atharva + AI Assistant

**Status:** ✅ Active

---

## 2025-01-23: Lenis Smooth Scroll

**Decision:** Add Lenis smooth scroll library

**Context:**
Wanted premium feel for animations. Heavy animations need smooth scrolling to feel polished.

**Considered Alternatives:**

1. **CSS `scroll-behavior: smooth`**
   - Pros: Built-in, no library
   - Cons: Basic, no momentum
   - Cons: Not as smooth as Lenis
   - Why not: Not premium enough

2. **Locomotive Scroll**
   - Pros: Popular, feature-rich
   - Cons: Heavier than Lenis
   - Cons: More complex API
   - Why not: Lenis is lighter and simpler

3. **No smooth scroll**
   - Pros: Lightest
   - Cons: Feels basic
   - Why not: User wants premium feel

4. **Lenis** ✅
   - Pros: Lightweight (3KB)
   - Pros: Smooth momentum scrolling
   - Pros: Works with Framer Motion
   - Pros: Respects `prefers-reduced-motion`
   - Pros: Easy to configure
   - Cons: Adds dependency
   - Solution: Worth it for UX

**Chosen:** Lenis smooth scroll

**Reasoning:**

- Premium feel for heavy animations
- Lightweight (3KB)
- Works seamlessly with Framer Motion
- Accessible (respects motion preferences)
- Industry standard (used by top agencies)

**Implementation:**

```tsx
// src/components/providers/LenisProvider.tsx
<LenisProvider>{children}</LenisProvider>
```

**References:**

- Discussion about premium feel and animations
- `03-ANIMATION-STRATEGY.md` (Lenis integration)

**Participants:** Atharva + AI Assistant

**Status:** ✅ Active

---

## 2025-01-23: File-Based Content

**Decision:** Store case studies as MDX files in Git, not database

**Context:**
Needed to decide content storage strategy. Old portfolio used localStorage (bad - data loss issues).

**Considered Alternatives:**

1. **localStorage** (old portfolio)
   - Pros: Client-side, fast
   - Cons: 5-10MB limit
   - Cons: Data loss if cleared
   - Cons: No sync across devices
   - Why not: Old portfolio had this problem

2. **Supabase/PostgreSQL**
   - Pros: Real database
   - Pros: Scalable
   - Cons: Overkill for static content
   - Cons: Extra complexity
   - Cons: Need backend API routes
   - Why not: Case studies don't change often

3. **MDX Files in Git** ✅
   - Pros: Version controlled
   - Pros: Simple
   - Pros: No database needed
   - Pros: Fast (static generation)
   - Pros: Can review changes (Git diff)
   - Pros: Automatic backups (Git)
   - Cons: Must redeploy to update
   - Solution: Fine - case studies change rarely

**Chosen:** MDX files committed to Git

**Reasoning:**

- Case studies are static content
- Updated rarely (not daily like a blog)
- Version control is valuable (track changes)
- No database = simpler architecture
- Automatic backups through Git
- Fast (static site generation)

**Structure:**

```
src/content/case-studies/
├── project-1.mdx
├── project-2.mdx
└── project-3.mdx
```

**References:**

- `/Documentation/CODEBASE_STRATEGIC_REVIEW.md` Section 6.1 (storage issues)
- Decision on skipping admin panel

**Participants:** Atharva + AI Assistant

**Status:** ✅ Active

---

## 2025-01-23: Skip Admin Panel

**Decision:** No admin panel - edit content directly in code/MDX files

**Context:**
Old portfolio had client-side admin with hardcoded password (major security issue). Needed to decide if rebuilding admin panel.

**Considered Alternatives:**

1. **Rebuild admin panel (properly)**
   - Pros: Edit without code
   - Cons: Significant development time
   - Cons: Need proper server-side auth
   - Cons: Database required
   - Cons: Security complexity
   - Why not: Not worth effort for ~10 case studies

2. **Third-party CMS** (Sanity, Contentful)
   - See "MDX over Sanity" decision
   - Why not: Overkill for use case

3. **No admin panel** ✅
   - Pros: Simpler
   - Pros: No security concerns
   - Pros: Faster development
   - Pros: Version controlled changes
   - Cons: Must edit in code
   - Solution: Fine - user is developer

**Chosen:** No admin panel - edit MDX files directly

**Reasoning:**

- User is comfortable with code editor
- Only ~10 case studies to manage
- Changes are infrequent
- Avoids security complexity
- Version control is better than admin UI
- Can focus on public-facing features

**Old Portfolio Problem:**

```tsx
// AdminContext.tsx line 22
const password = 'Anayak@2901' // ❌ Visible on GitHub!
```

**New Solution:**

```bash
# Just edit the MDX file
vim src/content/case-studies/new-project.mdx
git commit -m "Add new case study"
git push
# Vercel auto-deploys
```

**References:**

- `/Documentation/CODEBASE_STRATEGIC_REVIEW.md` Section 2.1 (security disaster)
- User's explicit decision during planning

**Participants:** Atharva + AI Assistant

**Status:** ✅ Active

---

## 2025-01-23: Design Token System

**Decision:** Single source of truth for all design values in `globals.css`

**Context:**
Old portfolio had colors, spacing, etc. hardcoded across 47+ files. Made changes impossible.

**Considered Alternatives:**

1. **Hardcoded values** (old portfolio)
   - Old way: `marginTop: '240px'`, `color: '#3947CA'`
   - Cons: Change brand color = find-replace 100 files
   - Cons: Inconsistent spacing
   - Cons: No dark mode
   - Why not: Old portfolio disaster

2. **Tailwind theme only**
   - Pros: Some centralization
   - Cons: Can't use CSS variables
   - Cons: Less flexible
   - Why not: Need more flexibility

3. **CSS Variables + Tailwind** ✅
   - Pros: Single source of truth
   - Pros: Works with Tailwind AND raw CSS
   - Pros: Easy dark mode (just swap values)
   - Pros: Change once, updates everywhere
   - Cons: Slightly more setup
   - Solution: Worth it for maintainability

**Chosen:** Design tokens in CSS variables

**Implementation:**

```css
/* src/app/globals.css */
:root {
  --color-primary: 57 71 202;
  --space-4: 1rem;
  /* etc... */
}

[data-theme='dark'] {
  --color-primary: 99 102 241; /* Adjusted for dark */
}
```

**Usage:**

```tsx
// Tailwind classes
<div className="text-primary p-4">

// Or direct CSS
<div style={{ color: 'rgb(var(--color-primary))' }}>
```

**Reasoning:**

- Single source of truth
- Change brand color in one place
- Dark mode = just swap token values
- Consistent spacing scale
- Works with Tailwind and raw CSS
- Industry best practice

**References:**

- `/Documentation/CODEBASE_STRATEGIC_REVIEW.md` Section 4.3 "Magic Numbers"
- `/Documentation/setup_guide.md` Section 2.1
- `01-ARCHITECTURE.md` (Design Token System)

**Participants:** Atharva + AI Assistant

**Status:** ✅ Active

---

## 2025-01-23: Dark Mode Implementation

**Decision:** Three-part dark mode system (ThemeScript + Provider + CSS Variables)

**Context:**
Old portfolio had theme flash on page load and inconsistent state management.

**Considered Alternatives:**

1. **Class-based (`dark` class)**
   - Pros: Simple
   - Cons: Still flashes
   - Cons: Requires JavaScript
   - Why not: Flash is bad UX

2. **localStorage only**
   - Pros: Persists choice
   - Cons: Flashes on load
   - Why not: Bad UX

3. **Three-part system** ✅
   - ThemeScript (prevents flash)
   - ThemeProvider (React state)
   - CSS variables (styling)
   - Pros: Zero flash
   - Pros: Respects system preference
   - Pros: Persists user choice
   - Cons: More complex
   - Solution: Worth it for UX

**Chosen:** ThemeScript + Provider + CSS Variables

**Implementation:**

```tsx
// 1. ThemeScript runs before React (no flash)
<head><ThemeScript /></head>

// 2. ThemeProvider manages state
<ThemeProvider>{children}</ThemeProvider>

// 3. CSS variables swap automatically
[data-theme='dark'] { --color-background: 10 10 10; }
```

**Reasoning:**

- Zero flash (best UX)
- Respects system preference
- Remembers user choice
- Smooth transitions
- Industry best practice

**Old Portfolio Problem:**

- Theme flash on every page load
- State in 4 different places
- Inconsistent behavior

**References:**

- `/Documentation/CODEBASE_STRATEGIC_REVIEW.md` Section 1.4 "Context Hell"
- `01-ARCHITECTURE.md` (Dark Mode Implementation)

**Participants:** Atharva + AI Assistant

**Status:** ✅ Active

---

## 2025-01-23: Component Size Limit

**Decision:** Maximum 300 lines per component (ESLint enforced)

**Context:**
Old portfolio had 23,000-line components. Unmaintainable.

**Considered Alternatives:**

1. **No limit**
   - Old portfolio result: 23,390 lines in one file
   - Why not: Impossible to maintain

2. **500 line limit**
   - Still too large
   - Why not: 300 is industry standard

3. **100 line limit**
   - Too strict
   - Hard to achieve
   - Why not: Unrealistic

4. **300 line limit** ✅
   - Industry standard
   - Enforced by ESLint
   - Large enough for complex components
   - Small enough to understand
   - Forces good architecture

**Chosen:** 300 line maximum (ESLint warning)

**Reasoning:**

- Human brain limit (~200-300 lines readable)
- Forces composition (small pieces)
- Easier to test
- Easier to reuse
- Team-friendly
- Prevents old portfolio mistakes

**Old Portfolio Disasters:**

```
HoverTextBox.tsx:  23,390 lines ❌
Logo.tsx:          13,166 lines ❌
CaseStudyAnimation.tsx: 1,845 lines ❌
HomeBlobs.tsx:      1,113 lines ❌
```

**ESLint Rule:**

```json
{
  "rules": {
    "max-lines": ["warn", 300]
  }
}
```

**References:**

- `/Documentation/CODEBASE_STRATEGIC_REVIEW.md` Section 1.1 "Monolithic Component Disease"
- `02-COMPONENT-GUIDELINES.md` (Component Size Limits)

**Participants:** Atharva + AI Assistant

**Status:** ✅ Active

---

## 2025-01-23: Mobile-First Approach

**Decision:** Build mobile-first with proper viewport meta tag

**Context:**
Old portfolio was missing viewport meta tag - mobile completely broken. Critical mistake.

**Considered Alternatives:**

1. **Desktop-first**
   - Old portfolio approach
   - Result: Mobile was afterthought, broken
   - Why not: 60%+ traffic is mobile

2. **Mobile-first** ✅
   - Start at 320px
   - Enhance for larger screens
   - Proper viewport meta tag
   - Test mobile extensively
   - Pros: Mobile users get great experience
   - Pros: Forces focus on essentials
   - Pros: Progressive enhancement
   - Cons: None really

**Chosen:** Mobile-first from 320px up

**Critical Fix:**

```tsx
// layout.tsx
export const viewport: Viewport = {
  width: 'device-width', // ← THIS WAS MISSING!
  initialScale: 1,
}
```

**Breakpoints:**

```
Mobile:  320px - 639px   (base)
Tablet:  640px - 1023px  (sm, md)
Laptop:  1024px - 1279px (lg)
Desktop: 1280px+         (xl, 2xl)
```

**Reasoning:**

- Old portfolio mobile was broken (no viewport meta)
- 60%+ of traffic is mobile
- Mobile-first forces good UX decisions
- Easier to enhance than reduce
- Industry best practice

**Old Portfolio Disaster:**

```tsx
// ❌ No viewport meta tag
// Result: Mobile site completely broken
// Users saw desktop site zoomed out
```

**References:**

- `/Documentation/PORTFOLIO_AUDIT.md` Critical Issue #1
- `/Documentation/setup_guide.md` Section 1.4 "SEO & Metadata (CRITICAL)"
- `01-ARCHITECTURE.md` (Responsive System)

**Participants:** Atharva + AI Assistant

**Status:** ✅ Active

---

## Template for Future Decisions

```markdown
## [Date]: Decision Title

**Decision:** What we decided

**Context:** Problem we're solving

**Considered Alternatives:**

1. Option A - Why not?
2. Option B - Why not?
3. Option C (chosen) - Why yes?

**Reasoning:** Detailed explanation

**References:**

- Links to relevant docs
- Links to discussions
- Links to code

**Participants:** Who decided

**Status:** Active | Superseded | Deprecated
```

---

**Last Updated:** 2025-01-23
**Maintained By:** Atharva + AI Assistants
**Status:** Living Document (add new decisions as they're made)
