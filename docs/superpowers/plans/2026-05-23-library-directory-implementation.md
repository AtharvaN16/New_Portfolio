# Library Services Directory Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a comprehensive, full-width "Library Services Directory" prototype that is performance-optimized for inclusion in the case study and high-quality video recording.

**Architecture:** A central `LibraryServicesDirectory` component managing state (category, audience, search, tab) and orchestrating child components.

**Tech Stack:** Next.js, Framer Motion, Tailwind CSS.

---

### Task 1: Data Preparation & Sub-components

**Files:**
- Create: `src/lib/data/library-directory-data.ts`
- Create: `src/components/case-study/content/DirectorySidebar.tsx`
- Create: `src/components/case-study/content/DirectoryTopBar.tsx`

- [ ] **Step 1: Define the complete services dataset** (mapping categories to services).
- [ ] **Step 2: Build `DirectorySidebar`** with the gold indicator and hover states.
- [ ] **Step 3: Build `DirectoryTopBar`** with the Search input and Custom Audience Dropdown.

### Task 2: Main Orchestrator & State

**Files:**
- Create: `src/components/case-study/content/LibraryServicesDirectory.tsx`

- [ ] **Step 1: Implement state management** for all filters (category, audience, search, tab).
- [ ] **Step 2: Implement the filtering logic** (search + audience filtering).
- [ ] **Step 3: Build the 2-column layout structure.**

### Task 3: Personalized Tabs & Content

**Files:**
- Modify: `src/components/case-study/content/LibraryServicesDirectory.tsx`

- [ ] **Step 1: Implement the "Frequently visited" tab logic** (showing the Last visited + Frequently visited sections).
- [ ] **Step 2: Integrate `LibraryServiceItem`** for the list rendering, ensuring proportional scaling.

### Task 4: Integration & Visual Polish

**Files:**
- Modify: `src/components/case-study/content/UAlbertaLibraryContent.tsx`

- [ ] **Step 1: Place the new `LibraryServicesDirectory`** in the case study (at the bottom or replacing the previous prototype).
- [ ] **Step 2: Fine-tune all animations** (sidebar transitions, tab switches, dropdown reveal).
- [ ] **Step 3: Final validation** of the "scaled-down" image look across all text and elements.
