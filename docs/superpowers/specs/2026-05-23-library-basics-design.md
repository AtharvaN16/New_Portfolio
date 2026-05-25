# Library Basics Interactive Prototype Design Spec

**Topic:** Interactive "Library Basics" component for the University of Alberta Library case study.
**Date:** 2026-05-23
**Status:** Draft

## 1. Overview
A highly polished, interactive UI component that demonstrates the proposed "Library Basics" refactor. It features a green gradient frame with a white card peeking from the bottom, containing a list of library services with bookmarking functionality.

## 2. Visual Design

### 2.1 Frame (Container)
- **Background:** `linear-gradient(295deg, #225432 11.56%, #36A459 88.84%)`
- **Corners:** Sharp (No rounded corners)
- **Aspect Ratio:** `16/9` (max-width `1044px`)
- **Padding:** Generous "visual breathing room" (approx. `64px` around the card when fully revealed)

### 2.2 Card (The Drawer)
- **Background:** `#FFFFFF`
- **Top Corners:** `32px` rounded
- **Padding:** `48px`
- **Typography:** `Inter`
    - **Header:** `#265D38`, `32px`, Bold
    - **Item Title:** `#265D38`, `20px`, Semi-bold
    - **Item Body:** `#383838`, `16px`, Regular
    - **"Bookmarked" Label:** `#265D38`, `14px`, Medium

## 3. Interaction & Behavior

### 3.1 Peeking Effect
- On mount, the card is positioned at the bottom of the frame, showing only the header.
- **Trigger:** Hovering over the frame or clicking the header.
- **Animation:** Slides up (Framer Motion `spring`) to reveal the full content.

### 3.2 Service Item Hover
- **Underline:** The item title gains an underline.
- **Color Shift:** Title color becomes slightly darker/richer.
- **Icon Appearance:** The "Bookmark" icon fades in at the far right of the row.

### 3.3 Bookmarking
- **Action:** Clicking the bookmark icon.
- **State Change:** 
    - Icon toggles (Add -> Off/Filled).
    - "Bookmarked" text appears next to the link.
- **Persistence:** Local state (React `useState`) for the session.

## 4. Technical Architecture

### 4.1 Component Structure
- `LibraryBasicsPrototype.tsx`: Main container and state management.
- `LibraryServiceItem.tsx`: Individual row component handling hover and bookmark state.

### 4.2 Tech Stack
- **Framework:** Next.js (React 19)
- **Animation:** Framer Motion
- **Icons:** Custom SVGs (provided by user)
- **Styling:** Tailwind CSS + Inline styles for specific tokens.

## 5. Content Data
- Accessibility Services: Support and resources to ensure an inclusive library experience for all users.
- Alumni Services: Resources and services available to UofA Alumni.
- Borrower Services + Library Cards: Information on borrowing materials, renewing items, and obtaining a library card.
- Distance Services: Delivery of library materials to your home or work address.
- Interlibrary Loan: A service that allows you to borrow materials from other libraries not available in our collection.

## 6. Implementation Notes
- Use `framer-motion` for smooth transitions.
- Ensure the `Inter` font is correctly applied.
- The component will be placed in `src/components/case-study/content/UAlbertaLibraryContent.tsx`.
