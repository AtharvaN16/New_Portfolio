# University of Alberta Library Hours Card - Image Integration & Layout Refactor

**Topic:** Update the `LibraryLocationCard` component to use provided library images and refactor the layout to remove the full-height green sidebar in favor of a rounded, top-aligned image with a refined notification layout.

## Goals
- Integrate 11 provided library images into the `LIBRARY_HOURS_DATA`.
- Refactor `LibraryLocationCard` to remove the `bg-[#B8C8B8]` left column.
- Display the library image as a standalone rounded rectangle in the left section, top-aligned with the right-side content.
- **Add a light 1px stroke (`border border-[#E0E0E0]`) to the images.**
- **Refactor Notification Layout:** If a notification exists, place it at the very top of the card's content area (full width). The image and header text should align horizontally below the notification.
- Ensure the right-side content (amenities, hours, location) remains untouched in terms of its internal structure.

## Proposed Changes

### 1. Data Layer (`src/lib/data/library-hours-data.ts`)
- Update `LIBRARY_HOURS_DATA` with `imageUrl` paths pointing to `/images/ualberta/`. (Already mapped in Task 1).

### 2. UI Layer (`src/components/case-study/content/LibraryLocationCard.tsx`)
- Modify the root `div` of the card to ensure a unified background (white) and `p-4` padding.
- **Structure for Notifications:**
  - The card content should be a vertical stack (`flex flex-col`).
  - **Top:** Notification banner (if present), spanning full width.
  - **Middle Row:** A horizontal flex container (`flex gap-5`) containing:
    - **Left:** Image container (`110x110px`, `rounded-xl`, `border border-[#E0E0E0]`, `overflow-hidden`).
    - **Right:** The library info (`flex-1`).
- **Image styling:** `object-cover`, `top-aligned`.
- Ensure the right column (`flex-1`) retains its internal structure (amenities grid, info rows, action buttons).

## Success Criteria
- All library cards display their corresponding images with a light stroke.
- The "green stripe" on the left is gone.
- **Notifications appear at the top of the card, with image and title below.**
- The right-side layout remains clean and aligned.
- No regression in responsiveness or accessibility.
