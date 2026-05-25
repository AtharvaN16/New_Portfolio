# Library Basics Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an interactive "Library Basics" component for the Alberta case study with a peeking card and bookmarking logic.

**Architecture:** A main `LibraryBasicsPrototype` component managing global state (reveal) and individual `LibraryServiceItem` components managing local bookmarking state. Uses Framer Motion for animations.

**Tech Stack:** Next.js, Framer Motion, Tailwind CSS, Lucide React (or custom SVGs).

---

### Task 1: Component Scaffolding

**Files:**
- Create: `src/components/case-study/content/LibraryBasicsPrototype.tsx`
- Create: `src/components/case-study/content/LibraryServiceItem.tsx`

- [ ] **Step 1: Create `LibraryServiceItem` with basic structure**
- [ ] **Step 2: Create `LibraryBasicsPrototype` with the gradient frame and peeking logic**
- [ ] **Step 3: Define the service data array**

### Task 2: Interaction Logic (TDD)

**Files:**
- Modify: `src/components/case-study/content/LibraryServiceItem.tsx`
- Test: `tests/unit/LibraryServiceItem.test.tsx`

- [ ] **Step 1: Write test for bookmarking toggle**
- [ ] **Step 2: Implement `useState` for bookmarking and "Bookmarked" message**
- [ ] **Step 3: Add hover states (underline, icon appearance)**

### Task 3: Visual Refinement & Animations

**Files:**
- Modify: `src/components/case-study/content/LibraryBasicsPrototype.tsx`

- [ ] **Step 1: Apply the exact gradient and sharp corners**
- [ ] **Step 2: Implement the Framer Motion "peek" animation**
- [ ] **Step 3: Ensure `Inter` font is applied correctly via Tailwind/CSS**

### Task 4: Integration

**Files:**
- Modify: `src/components/case-study/content/UAlbertaLibraryContent.tsx`

- [ ] **Step 1: Import and place `LibraryBasicsPrototype` in the Recommendation 04 section**
- [ ] **Step 2: Verify visual consistency with surrounding content**
- [ ] **Step 3: Final validation of all interactions**
