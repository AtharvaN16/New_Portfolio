# Library Services Page Prototype Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete interactive page prototype combining a Hero section with dynamic "Your Services" and the existing Directory.

**Architecture:** A top-level `LibraryServicesPagePrototype` component that manages the shared `bookmarks` state and coordinates the Hero and Directory.

**Tech Stack:** Next.js, Framer Motion, Tailwind CSS.

---

### Task 1: Component Refactoring & New Sub-components

**Files:**
- Create: `src/components/case-study/content/LibraryServicesNavbar.tsx`
- Create: `src/components/case-study/content/LibraryServicesHero.tsx`
- Modify: `src/components/case-study/content/LibraryServicesDirectory.tsx`

- [ ] **Step 1: Create `LibraryServicesNavbar`** with the `#245D3A` background and links.
- [ ] **Step 2: Create `LibraryServicesHero`** with the requested gradient, title, and grids for Popular/Your Services.
- [ ] **Step 3: Refactor `LibraryServicesDirectory`** to accept `bookmarks` and `onToggleBookmark` as props instead of managing them internally.

### Task 2: Page Orchestration & State

**Files:**
- Create: `src/components/case-study/content/LibraryServicesPagePrototype.tsx`

- [ ] **Step 1: Implement the main container** with the navbar, hero, and directory.
- [ ] **Step 2: Move `bookmarks` state** to this component.
- [ ] **Step 3: Implement the "Go to all services" scroll logic.**

### Task 3: Integration & Visual Polish

**Files:**
- Modify: `src/components/case-study/content/UAlbertaLibraryContent.tsx`

- [ ] **Step 1: Replace the separate Directory call** with the new `LibraryServicesPagePrototype`.
- [ ] **Step 2: Fine-tune the Hero grid layout** (6 cards for popular, up to 6 for "Your Services").
- [ ] **Step 3: Ensure "Your Services" cards animate in** when a bookmark is clicked in the directory below.
- [ ] **Step 4: Final verification** of all colors and font sizes.
