# Library Services Page Prototype Design Spec

**Topic:** Full interactive "Library Services" page prototype for the University of Alberta Library case study.
**Date:** 2026-05-24
**Status:** Draft

## 1. Overview
A high-fidelity, end-to-end page prototype that combines a Hero section with personalized "Your Services" and the comprehensive "Services Directory". It demonstrates how bookmarking an item in the directory immediately surfaces it in the Hero for quick access.

## 2. Visual Design

### 2.1 Navbar
- **Background:** `#245D3A`
- **Text:** White, `Inter`, Semi-bold
- **Height:** `64px`
- **Content:** Logo, "Library Services", "Subject Guides", "Hours + Locations", etc.

### 2.2 Hero Section
- **Background:** `linear-gradient(111deg, #245D3A 3.15%, #FFF0A0 98.1%)`
- **Padding:** `80px 64px`
- **Title:** "Library Services", Gold (`#FFF0A0`), `48px`, Bold
- **Section Headers:** "Popular Services", "Your Services", `24px`, Bold, White

### 2.3 Cards (Hero)
- **Background:** `#FFFFFF`
- **Corners:** Sharp (No rounded corners)
- **Padding:** `24px`
- **Shadow:** Subtle shadow for depth
- **Header:** `#265D38`, `18px`, Semi-bold
- **Description:** `#383838`, `14px`, Regular
- **Bookmark Icon:** Top right corner, `#265D38`, `16px`

## 3. Interaction & Behavior

### 3.1 Personalization (Shared State)
- **Logic:** Bookmarking a service anywhere in the prototype adds it to the "Your Services" section in the Hero.
- **Limit:** Max 6 cards displayed in "Your Services".
- **Real-time:** The update should be instantaneous.

### 3.2 Navigation
- **Go to all services:** Clicking this link in the Hero smooth-scrolls the user down to the Directory section.

## 4. Technical Architecture

### 4.1 Component Structure
- `LibraryServicesPagePrototype.tsx`: Main page orchestrator. Holds the `bookmarks` state.
- `LibraryServicesNavbar.tsx`: Static styled navbar.
- `LibraryServicesHero.tsx`: Interactive hero section with Popular and Your Services.
- `LibraryServicesDirectory.tsx`: Refactored to accept `bookmarks` as a prop.

### 4.2 Data
- **Popular Services:** Hardcoded list (Book a Study Space, Citation Guides, Printing + Scanning, How to Research, Library Locations, A-Z Databases).

## 5. Implementation Notes
- Use `framer-motion` for smooth entry/exit of cards in the "Your Services" section.
- Maintain the "scaled image" aesthetic for all typography and proportions.
- Integrate into `UAlbertaLibraryContent.tsx` replacing the separate Directory.
