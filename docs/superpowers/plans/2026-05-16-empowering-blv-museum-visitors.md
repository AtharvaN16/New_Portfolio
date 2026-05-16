# Who Decides What Art Means? Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a new long-form case study titled "Who Decides What Art Means?" focusing on digital accessibility and interpretive agency for BLV museum visitors.

**Architecture:** 
1. Update metadata in `src/lib/data/case-studies.ts` with a new `digital-accessibility` category and project entry.
2. Create a new content component `src/components/case-study/content/EmpoweringBlvContent.tsx` following the structure of existing long-form studies like NYC DCWP.
3. Update `CaseStudyContentRenderer.tsx` and `index.ts` to include the new component.
4. Ensure the UI filter on the work page supports the new category.

**Tech Stack:** Next.js (App Router), React, TypeScript, Framer Motion, Tailwind CSS.

---

### Task 1: Update Case Study Data & Types

**Files:**
- Modify: `src/lib/data/case-studies.ts`

- [ ] **Step 1: Add 'digital-analytics' to category type and add new case study entry**

```typescript
// src/lib/data/case-studies.ts

// Update CaseStudy interface category (if not already there, ensure 'digital-accessibility' is allowed)
export interface CaseStudy {
  // ...
  category:
    | 'service-design'
    | 'design-thinking'
    | 'ux-research'
    | 'usability-testing'
    | 'ui-design'
    | 'digital-analytics'
    | 'digital-accessibility' // Add this
  // ...
}

// Add the new case study to the end of the array
export const caseStudies: CaseStudy[] = [
  // ... existing studies
  {
    slug: 'blv-museum-accessibility',
    title: 'Who Decides What Art Means? Giving interpretive agency to blind and low-vision museum visitors.',
    organization: 'Pratt Institute',
    year: '2026',
    description: 'A research-based case study on returning interpretive authority to blind and low-vision patrons through conversational UI.',
    tags: ['Digital Accessibility', 'UX Research', 'Conversational UI'],
    imageBg: '#FF8C00', // Orange accent
    featured: true,
    category: 'digital-accessibility',
    team: ['Atharva Nayak', 'Arnav Sharma', 'Nisheta Gupta'],
    timeline: 'Spring 2026',
    progressBarColor: '#FF8C00',
    fullDescription: 'This project focuses on the "interpretive authority" in art galleries. While museums provide audio descriptions, these are often fixed, curator-authored accounts that collapse the variability of an artwork into a single narrative. We introduce "negotiable interpretation" as a design paradigm to redistribute that authority back to the visitor.',
  },
]
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/data/case-studies.ts
git commit -m "data: add blv-museum-accessibility case study and digital-accessibility category"
```

---

### Task 2: Create Case Study Content Component

**Files:**
- Create: `src/components/case-study/content/EmpoweringBlvContent.tsx`
- Create: `src/components/case-study/content/blv/BlvNarrativeFlow.tsx` (Sub-component for cleaner structure)

- [ ] **Step 1: Create the main content component skeleton**

```tsx
// src/components/case-study/content/EmpoweringBlvContent.tsx
'use client'

import { m } from 'framer-motion'
import { CaseStudyReadMore } from '@/components/case-study/CaseStudyReadMore'
import { AnimatedTitle } from '@/components/ui/AnimatedTitle'

interface EmpoweringBlvContentProps {
  isContentRevealed: boolean
  onToggleContent: () => void
  progressBarColor?: string
}

export function EmpoweringBlvContent({
  isContentRevealed,
  onToggleContent,
  progressBarColor = '#FF8C00',
}: EmpoweringBlvContentProps) {
  return (
    <m.section
      className="w-full px-6 2xl:px-[140px] py-16 md:py-24 max-w-[1920px] mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <div className="max-w-[1044px] mx-auto text-left">
        {/* Abstract */}
        <h3 className="text-lg md:text-[28px] font-bold text-text-primary mb-6 md:mb-[28px]">
          Abstract
        </h3>
        <div className="space-y-6 md:space-y-8">
          <p className="text-base md:text-[18px] font-normal text-text-color70 leading-relaxed">
            Museums are sites of cultural participation where engagement depends on interpretive agency. 
            However, for blind and low-vision (BLV) visitors, this agency is often preempted by fixed audio descriptions.
          </p>
          <p className="text-base md:text-[18px] font-normal text-text-color70 leading-relaxed">
            This study critiques the "interpretive authority" of major institutions and proposes 
            "negotiable interpretation"—a paradigm where meaning is constructed through a 
            conversational dialogue between the visitor and the system.
          </p>
        </div>

        <CaseStudyReadMore
          readTime="10 min read"
          isContentRevealed={isContentRevealed}
          onToggleContent={onToggleContent}
        >
          <div className="space-y-24 md:space-y-32">
             {/* Content sections will be added here */}
             <p className="text-text-color70">Full content implementation in progress...</p>
          </div>
        </CaseStudyReadMore>
      </div>
    </m.section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/case-study/content/EmpoweringBlvContent.tsx
git commit -m "feat: create skeleton for EmpoweringBlvContent"
```

---

### Task 3: Integrate Component into Renderer

**Files:**
- Modify: `src/components/case-study/content/index.ts`
- Modify: `src/components/case-study/CaseStudyContentRenderer.tsx`

- [ ] **Step 1: Export from content index**

```typescript
// src/components/case-study/content/index.ts
// ... existing exports
export * from './EmpoweringBlvContent'
```

- [ ] **Step 2: Update Renderer**

```tsx
// src/components/case-study/CaseStudyContentRenderer.tsx
import {
  // ...
  EmpoweringBlvContent, // Add this
} from '@/components/case-study/content'

// Inside CaseStudyContentRenderer switch statement:
case 'blv-museum-accessibility':
  return (
    <EmpoweringBlvContent
      isContentRevealed={isContentRevealed}
      onToggleContent={onToggleContent}
      progressBarColor={caseStudy.progressBarColor || '#FF8C00'}
    />
  )
```

- [ ] **Step 3: Commit**

```bash
git add src/components/case-study/content/index.ts src/components/case-study/CaseStudyContentRenderer.tsx
git commit -m "feat: integrate EmpoweringBlvContent into CaseStudyContentRenderer"
```

---

### Task 4: Implement Detailed Narrative Sections

**Files:**
- Modify: `src/components/case-study/content/EmpoweringBlvContent.tsx`

- [ ] **Step 1: Implement "The Critique" and "The Analysis" sections**

```tsx
// Add these sections inside CaseStudyReadMore in EmpoweringBlvContent.tsx
<div className="pt-12">
  <h3 className="text-sm md:text-[16px] font-bold uppercase mb-6 md:mb-[28px]" style={{ color: 'rgb(var(--color-text-tertiary))' }}>
    The Critique
  </h3>
  <AnimatedTitle
    text="Beyond Technical Compliance"
    animationType="fadeIn"
    className="text-2xl md:text-[40px] font-bold text-text-primary leading-tight tracking-[-0.05em] mb-8"
  />
  <p className="text-base md:text-[18px] text-text-color90 leading-relaxed mb-8">
    An accessibility audit asks: "Does this meet standards?" An accessibility critique asks: "Who is excluded, and why?"
    Our research found that BLV visitors are often positioned as passive recipients of expert knowledge rather than active meaning-makers.
  </p>
</div>
```

- [ ] **Step 2: Commit**

```bash
git commit -am "feat: add critique section to EmpoweringBlvContent"
```

---

### Task 5: Final Polish & Category Verification

**Files:**
- Modify: `src/components/work/WorkFilter.tsx` (Ensure new category shows up)

- [ ] **Step 1: Verify 'digital-accessibility' is handled by filter**

Check `src/components/work/WorkFilter.tsx` to ensure it dynamically picks up the new category from the data.

- [ ] **Step 2: Final Verification**

Run `bun run type-check` to ensure everything is valid.

- [ ] **Step 3: Commit**

```bash
git commit -am "chore: final polish and type verification"
```
