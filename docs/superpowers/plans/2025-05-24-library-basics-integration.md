# Library Basics Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate the `LibraryBasicsPrototype` component into the University of Alberta Library case study page.

**Architecture:** Import the `LibraryBasicsPrototype` component and place it within the "Recommendation 04 — Library Services" section of `UAlbertaLibraryContent.tsx`, replacing the existing static image placeholder.

**Tech Stack:** React 19, Next.js 15, Framer Motion, TypeScript.

---

### Task 1: Integrate LibraryBasicsPrototype into UAlbertaLibraryContent

**Files:**
- Modify: `src/components/case-study/content/UAlbertaLibraryContent.tsx`

- [ ] **Step 1: Import LibraryBasicsPrototype**

Add the following import to `src/components/case-study/content/UAlbertaLibraryContent.tsx`:
```tsx
import { LibraryBasicsPrototype } from './LibraryBasicsPrototype'
```

- [ ] **Step 2: Replace ImagePlaceholder in Recommendation 04**

Find the "Recommendation 04 — Library Services" section and replace the `ImagePlaceholder` with the `LibraryBasicsPrototype` component.

```tsx
              {/* Recommendation 04 */}
              <h3
                className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]"
                style={{ color: 'rgb(var(--color-text-tertiary))' }}
              >
                Recommendation 04 — Library Services
              </h3>

              <AnimatedTitle
                text="Prioritize popular services and add audience-based filtering"
                animationType="fadeIn"
                alwaysAnimate={false}
                delay={0}
                className="text-2xl md:text-[36px] font-bold text-text-primary mb-6 md:mb-8 leading-tight tracking-[-0.05em]"
              />

              <LibraryBasicsPrototype />

              <ul className="space-y-3 mb-12 md:mb-16 mt-8 md:mt-12">
```

- [ ] **Step 3: Adjust spacing**

Ensure there is a margin below the component if needed. The `LibraryBasicsPrototype` itself has `mx-auto` but not `mb`.

- [ ] **Step 4: Verify Compilation**

Run `bun run type-check` to ensure no type errors were introduced.

- [ ] **Step 5: Commit**

```bash
git add src/components/case-study/content/UAlbertaLibraryContent.tsx
git commit -m "feat(alberta): integrate LibraryBasicsPrototype into case study"
```
