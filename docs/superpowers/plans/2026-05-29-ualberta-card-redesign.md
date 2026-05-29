# UofA Library Card Image Integration & Layout Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add library images to the UofA prototype and refactor the card layout to remove the green sidebar in favor of rounded, top-aligned images with a refined notification layout.

**Architecture:** Update the central data source with image paths and surgically modify the `LibraryLocationCard` component to transition from a full-column background to a vertical stack with a top-level notification and a horizontal image|content row below it.

**Tech Stack:** Next.js 15, React 19, Tailwind CSS.

---

### Task 1: Update Library Hours Data (COMPLETE)

**Files:**
- Modify: `src/lib/data/library-hours-data.ts`

- [x] **Step 1: Add image URLs to LIBRARY_HOURS_DATA**
- [x] **Step 2: Verify data structure**
- [x] **Step 3: Commit**

---

### Task 2: Refactor LibraryLocationCard Layout

**Files:**
- Modify: `src/components/case-study/content/LibraryLocationCard.tsx`

- [ ] **Step 1: Refactor component structure for Notifications**

Reorganize the component to have a `flex-col` root with the notification at the top and a `flex` row for image and content below it.

```tsx
// src/components/case-study/content/LibraryLocationCard.tsx

<div className="bg-white border border-[#E0E0E0] rounded-sm overflow-hidden w-full p-4 flex flex-col gap-4">
  {/* 1. Notification Banner (if present) - Full Width */}
  {library.notification && (
    <div className="bg-[#FFF8E1] px-4 py-3 text-[10px] text-[#383838] leading-relaxed border-l-4 border-[#FFD54F]">
      {renderNotification(library.notification)}
    </div>
  )}

  {/* 2. Main Row: Image + Content */}
  <div className="flex gap-5 items-start">
    {/* Left: Library Image with Stroke */}
    <div className="w-[110px] flex-shrink-0">
      <div className="w-[110px] h-[110px] rounded-xl overflow-hidden bg-[#F5F5F5] border border-[#E0E0E0]">
        {library.imageUrl ? (
          <Image 
            src={library.imageUrl} 
            alt={library.name} 
            width={110}
            height={110}
            className="w-full h-full object-cover" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[10px] text-[#888]">
            No Image
          </div>
        )}
      </div>
    </div>

    {/* Right: Content (Unchanged internal structure) */}
    <div className="flex-1 flex flex-col">
      {/* ... Title, Amenities, Info Rows ... */}
    </div>
  </div>
</div>
```

- [ ] **Step 2: Verify Alignment and Spacing**

Ensure the image is top-aligned with the title and the notification has consistent spacing.

- [ ] **Step 3: Commit**

```bash
git add src/components/case-study/content/LibraryLocationCard.tsx
git commit -m "feat(ualberta): refactor LibraryLocationCard with top notification and rounded image stroke"
```

---

### Task 3: Final Verification

- [ ] **Step 1: Visual Check**

Run `bun run dev` and navigate to the UofA case study page to verify all images are loading with strokes and the notifications are correctly positioned at the top.

- [ ] **Step 2: Lint and Type Check**

Run `bun run lint` and `bun run type-check`.

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "chore: final verification for UofA card redesign v2"
```
