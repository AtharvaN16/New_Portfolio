# Library Services Directory Prototype Design Spec

**Topic:** Comprehensive interactive "All Library Services" directory for the University of Alberta Library case study.
**Date:** 2026-05-23
**Status:** Draft

## 1. Overview
An advanced, multi-state interactive UI directory that allows users to explore library services by category, audience type, and search. It demonstrates a refined Information Architecture and personalized features (Frequently Visited).

## 2. Visual Design & Layout

### 2.1 Container
- **Layout:** Full-width container (occupies the entire central column).
- **Structure:** 
  - Sidebar (Left): Fixed-width category navigation.
  - Main Content (Right): Flexible area for filters, tabs, and services.
- **Performance:** Lightweight CSS-based hover states and optimized Framer Motion transitions (reduced complexity) to ensure high FPS for video capture.

### 2.2 Typography (Scaled-Down Image Look)
- **Main Header (e.g. "Library Basics"):** `#265D38`, `20px`, Bold.
- **Service Item Title:** `#265D38`, `14px`, Medium (Lighter weight than previous).
- **Service Item Body:** `#383838`, `12px`, Regular.
- **Sidebar Categories:** `16px` (inactive), `16px` Bold (active).
- **"Bookmarked" Label:** `9px`, ALL CAPS GRAY.

### 2.3 Interactive Elements
- **Sidebar:** Gold vertical indicator (`4px` wide) next to the active category. Light gray hover background on items.
- **Audience Dropdown:** Custom dropdown with blue selection highlight (`#3183CB`) and checkmarks.
- **Tabs:** Underlined indicator for the active tab.

## 3. Interaction Logic

### 3.1 Filtering
- **Category:** Selecting a category in the sidebar updates the Main Content header and filters the list.
- **Audience:** Dropdown filters services by target audience (Alumni, Faculty, Researchers, etc.).
- **Search:** Real-time text filtering across titles and descriptions.

### 3.2 Personalized Tabs
- **All Services:** Default list for the selected category.
- **Frequently Visited:** A curated list (Last visited + Frequently visited) showing items like "Publishing", "Geospatial Data", etc.

## 4. Technical Architecture

### 4.1 Component Structure
- `LibraryServicesDirectory.tsx`: Main orchestrator component.
- `DirectorySidebar.tsx`: Handles category switching and visual states.
- `DirectoryTopBar.tsx`: Custom dropdown and search input.
- `LibraryServiceItem.tsx`: Reused from previous task, with updated proportional scaling.

### 4.2 Data Model
A comprehensive JSON object mapping categories to arrays of service objects, each containing `title`, `description`, and `audiences`.

## 5. Implementation Notes
- Use `framer-motion` for sidebar indicator movement and tab transitions.
- Ensure the "hover-only" bookmark icon logic is maintained.
- The prototype will be integrated into the Alberta case study, replacing or following the previous small prototype.
