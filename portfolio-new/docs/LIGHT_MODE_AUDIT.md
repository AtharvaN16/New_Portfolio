# Light Mode Audit Report

**Date:** March 2026
**Scope:** All sections and pages in `portfolio-new/`
**Methodology:** Static code analysis + color contrast calculations (WCAG 2.2)

---

## Executive Summary

Light mode was clearly designed as a secondary concern. The dark mode implementation is polished, but light mode has **3 critical bugs**, **4 high-severity issues**, and several medium/low concerns. The most acute problems are broken component backgrounds, nearly invisible text at the footer, and dust particles designed exclusively for dark backgrounds.

---

## Severity Definitions

| Level | Description |
|-------|-------------|
| **Critical** | Broken visually or accessibility failure — must fix |
| **High** | Clearly wrong in light mode, degrades UX significantly |
| **Medium** | Technically works but feels off or borderline fails WCAG |
| **Low** | Minor design inconsistency, low impact |

---

## Critical Issues

### 1. RatingModal: Hardcoded Dark Background

**File:** `src/components/layout/rating/RatingModal.tsx:55`

```tsx
className="... bg-black/50"
```

The rating modal uses a hardcoded `bg-black/50` background. In light mode, this renders as a dark gray semi-transparent panel sliding in from the left of a white/light page. It looks completely broken — like a dark overlay from a different app.

**Fix:** Replace with a theme-aware background.
```tsx
// Use surface with backdrop-blur instead
className="... bg-surface/90 backdrop-blur-xl border-r border-border"
```

---

### 2. FooterDustParticles: White Particles on Light Background

**File:** `src/components/layout/FooterDustParticles.tsx:110`

```tsx
ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
```

Particle color is hardcoded white. In light mode, the footer background is `#f0f0f0` (light gray). White particles on a light gray background produce an opacity range of ~0.001 to 0.004 in perceived luminance difference — essentially invisible. The entire dust particle effect is a no-op in light mode.

**Fix:** Read the current theme and use an appropriate particle color (e.g., dark particles at low opacity for light mode). Alternatively, skip rendering in light mode with a reduced-opacity foreground color.

```tsx
// Example: theme-aware particle color
const isDark = document.documentElement.getAttribute('data-theme') === 'dark'
ctx.fillStyle = isDark
  ? `rgba(255, 255, 255, ${alpha})`
  : `rgba(0, 0, 0, ${alpha * 0.4})`
```

---

### 3. AccessibilityModal: Toggle Knob Invisible in Inactive State

**File:** `src/components/layout/AccessibilityModal.tsx:142`

```tsx
className="w-4 h-4 bg-white rounded-full shadow-sm"
```

When a toggle is inactive, the track is `bg-surface-elevated` (`#f5f5f5`) and the knob is `bg-white` (`#ffffff`). Contrast ratio: **1.05:1** — functionally invisible. The user cannot see whether a toggle is on or off when it's in the off state.

**Fix:** Use a visible color for the inactive knob, or change the inactive track to a distinct mid-gray.
```tsx
// Option A: Border on knob
className="w-4 h-4 bg-white rounded-full border border-border shadow-sm"

// Option B: Track is themed
className={cn(
  "w-12 h-6 rounded-full transition-all relative flex items-center px-1",
  active ? "bg-primary" : "bg-surface-muted" // surface-muted = #e5e7eb = visible
)}
```

---

## High Severity Issues

### 4. Footer Bottom Bar: Text is Nearly Invisible

**File:** `src/components/layout/Footer.tsx:122`

```tsx
style={{ color: 'rgb(var(--color-text-color30))' }}
```

Light mode value: `--color-text-color30: 185 185 185` (`#b9b9b9`).
On footer background `#f0f0f0`:
**Contrast ratio: ~1.7:1** (WCAG AA minimum for normal text: 4.5:1, large text: 3:1)

The "Designed + Coded with <3 by Atharva" and "Last updated:" lines are essentially unreadable in light mode. They're so light they might as well not be there.

**Fix:** Use `--color-text-color60` or higher for footer bottom text.
```tsx
style={{ color: 'rgb(var(--color-text-color60))' }}
// #747474 on #f0f0f0 = ~4.5:1 — passes WCAG AA
```

---

### 5. ProjectCard Tags + Year: Insufficient Contrast

**File:** `src/components/work/ProjectCard.tsx:112`

```tsx
style={{ color: 'rgb(var(--color-text-tertiary-50))' }}
```

Light mode value: `--color-text-tertiary-50: 139 139 139` (`#8b8b8b`).
On page background `#fafcfe`:
**Contrast ratio: ~3.1:1** at 14–18px font size.
WCAG AA requires 4.5:1 for text at these sizes.

The tags/year metadata below every project card fails contrast requirements in light mode. Dark mode (#808080 equivalent on near-black) is fine because the contrast inverts favorably.

**Fix:** Bump to `--color-text-color70` for this use case.
```tsx
style={{ color: 'rgb(var(--color-text-color70))' }}
// #5d5d5d on #fafcfe = ~7.0:1 — comfortable
```

---

### 6. FooterSmog / CSSGlow: Effect Breaks Down in Light Mode

**File:** `src/components/layout/FooterSmog.tsx:58–102`

The CSSGlow component uses `--color-gradient-start` (orange) and `--color-gradient-end` (cyan) at 20–40% opacity. In dark mode, this creates an atmospheric glow — light-colored gradients bleeding into near-black, producing a luminous smog effect. In light mode, the same colors at the same opacity produce a muddy, patchy wash on a light gray footer (`#f0f0f0`). The effect looks like an accidental color leak rather than an intentional design element.

Additionally, the blur radii (6px–35px) designed to scatter light in dark mode create a smudged appearance in light mode.

**Options:**
- Reduce opacity significantly in light mode (20% → 8–10%)
- Change the gradient direction/shape for light mode so it reads differently (e.g., top-down instead of top-spread)
- Suppress the CSSGlow effect entirely in light mode and keep only the color bar header

---

### 7. Case Study List Item Descriptions: Contrast Failure

**File:** `src/styles/prose-theme.css:189`

```css
.prose-case-study ul li p,
.prose-case-study ul li .list-description {
  color: rgb(var(--color-text-tertiary));
}
```

`--color-text-tertiary` is an alias for `--color-text-tertiary-50` = `#8b8b8b` in light mode.
**Contrast ratio: ~3.1:1** — same issue as ProjectCard tags, same fix applies.

The case study content body uses `--color-text-color90` (~12.9:1) for paragraphs which is excellent. But the list item sub-descriptions use tertiary-50, creating a jarring contrast inconsistency — headings and paragraphs are readable, but bulleted sub-text drops below accessibility thresholds.

---

## Medium Severity Issues

### 8. Hero Subtext: Borderline Contrast

**File:** `src/components/hero/Hero.tsx:94`

```tsx
style={{ color: 'rgb(var(--color-text-color60))' }}
// "MS in Human-Computer Interaction at Pratt Institute."
```

Light mode value: `#747474` on `#fafcfe` = **~4.5:1** — exactly at the WCAG AA threshold for normal text. No safety margin. At 12px on mobile (`text-[12px]`), this falls below the threshold entirely (WCAG requires 4.5:1 for 12px normal weight text, and the actual ratio here is below that at small sizes).

The mobile version is more critical: at 12px and normal weight, `#747474` on `#fafcfe` fails.

**Fix:** Consider `--color-text-color70` (#5d5d5d, ~7.0:1) for the subtext, or increase mobile font size.

---

### 9. AnimatedLink Default Color: Same Borderline Issue

**File:** `src/components/ui/AnimatedLink.tsx:82`

```tsx
style={{ color: 'rgb(var(--color-text-color60))' }}
```

The "Browse work" and similar links use `--color-text-color60` = `#747474` in light mode. Same borderline contrast as above. At normal text sizes (16px+) this barely passes; the hover state transitions to `text-primary` (`#3947ca`), which is fine (~5:1).

---

### 10. NavButton: `dark:` Prefix Doesn't Match Theme System

**File:** `src/components/ui/NavButton.tsx:37`

```tsx
className="... bg-foreground/10 dark:bg-white/20"
```

The project uses `[data-theme='dark']` attribute-based theming (set via JavaScript), not Tailwind's `dark:` media query variant. Tailwind's `dark:` prefix responds to `@media (prefers-color-scheme: dark)` — the OS-level preference — not the data attribute.

This creates a mismatch: a user with OS set to dark who manually switches to light mode will still get `dark:bg-white/20` on the hover fill (white on near-white = invisible hover state). A user with OS light who manually switches to dark mode won't get `dark:bg-white/20` (dark foreground fill on dark bg = barely visible).

The hover effect works correctly when OS preference matches user selection, but breaks in cross-mode scenarios. Since this is a portfolio with a prominent theme toggle, users may switch frequently.

**Fix:** Either configure Tailwind's dark mode to use `[data-theme='dark']`, or use explicit `[data-theme='dark']` CSS overrides.

In `tailwind.config` (or Tailwind v4 config):
```ts
// Next.js Tailwind v4: add to CSS
@variant dark (&:where([data-theme='dark'], [data-theme='dark'] *));
```

---

### 11. WorkFilter Empty State: Undefined Token

**File:** `src/components/work/WorkFilter.tsx:128`

```tsx
<p className="text-lg text-muted-foreground">
  No projects found with this filter.
</p>
```

`text-muted-foreground` is not a defined token in this design system (it's a shadcn/ui convention). Unless explicitly mapped somewhere, this will fall back to `inherit` or `currentColor`. The text may inherit full-opacity foreground color rather than the intended muted appearance, and behavior will be inconsistent across modes.

**Fix:** Replace with the actual design token:
```tsx
className="text-lg text-text-tertiary"
```

---

## Low Severity Issues

### 12. Hero Gradient Background Opacity: Heavy in Light Mode

**File:** `src/app/globals.css:152-173`

```css
.hero-gradient-light {
  background: radial-gradient(
    ellipse at 30% 50%,
    rgba(var(--hero-blob-blue), 0.85) 0%,   /* 85% */
    rgba(var(--hero-blob-purple), 0.75) 40%, /* 75% */
    rgba(var(--hero-blob-pink), 0.7) 80%,    /* 70% */
    ...
  );
}

.hero-gradient-dark {
  /* 60%, 50%, 45% — significantly more transparent */
}
```

The light mode gradient uses 70–85% opacity while dark mode uses 45–60%. The dark colors in light mode (`#2a34a5`, `#6e4bc3`, `#dc4169`) at these opacities create a visually dense, saturated background that can feel heavy and overwhelming compared to the airier dark mode effect. This is more a design taste issue than a technical bug.

Consider reducing light mode opacity to 65–75% or testing against the target audience's expectations.

---

### 13. Case Study Hero: Hardcoded Black Overlay

**File:** `src/components/case-study/CaseStudyDetail.tsx:230`

```tsx
className="absolute inset-0 bg-black pointer-events-none ..."
```

The scroll-driven overlay that darkens the hero image as you scroll is hardcoded black (`bg-black`). In dark mode, this is invisible until scroll (the page is already dark). In light mode, the overlay could create an abrupt darkening effect that clashes with the light surrounding page. It's functional but could be themed (e.g., `bg-foreground` instead) for consistency.

---

### 14. `section-header` Color in Prose: Tertiary at Low Contrast

**File:** `src/styles/prose-theme.css:81`

```css
.prose-case-study h3.section-header {
  color: rgb(var(--color-text-tertiary));
  font-size: 0.875rem; /* 14px */
  ...
}
```

`--color-text-tertiary` = `#8b8b8b` in light mode at 14px = **~3.1:1** — WCAG AA fails for small text. These are the uppercase section labels like "PROJECT OVERVIEW". However, since they're 700 font-weight, WCAG considers them "large bold text" at this size... but 14px bold is borderline. Use `--color-text-color60` to be safe.

---

## Color Contrast Reference Table (Light Mode)

| Token | Hex | On Background (#fafcfe) | On Footer (#f0f0f0) | Pass AA Normal | Pass AA Large |
|-------|-----|------------------------|---------------------|----------------|---------------|
| `color-text-primary` | #171717 | 17.7:1 | 14.2:1 | Yes | Yes |
| `color-text-secondary` | #454545 | 9.4:1 | 7.5:1 | Yes | Yes |
| `color-text-color70` | #5d5d5d | 7.0:1 | 5.6:1 | Yes | Yes |
| `color-text-color60` | #747474 | 4.5:1 | 3.8:1 | Borderline | Yes |
| `color-text-tertiary-50` | #8b8b8b | 3.1:1 | 2.5:1 | **No** | Borderline |
| `color-text-color40` | #a2a2a2 | 2.3:1 | 1.9:1 | **No** | **No** |
| `color-text-color30` | #b9b9b9 | 1.7:1 | 1.4:1 | **No** | **No** |
| `color-primary` | #3947ca | 5.1:1 | 4.1:1 | Yes | Yes |

**WCAG 2.2 AA thresholds:** 4.5:1 for normal text, 3:1 for large text (18pt+ or 14pt+ bold)

---

## Recommended Fix Priority

| Priority | Issue | Files |
|----------|-------|-------|
| Fix immediately | RatingModal dark background | `RatingModal.tsx` |
| Fix immediately | Dust particles invisible in light mode | `FooterDustParticles.tsx` |
| Fix immediately | Accessibility toggle off state invisible | `AccessibilityModal.tsx` |
| Fix soon | Footer copyright text contrast (#b9b9b9) | `Footer.tsx` |
| Fix soon | ProjectCard tags contrast (#8b8b8b) | `ProjectCard.tsx` |
| Fix soon | Case study list descriptions contrast | `prose-theme.css` |
| Fix soon | FooterSmog looks muddy in light mode | `FooterSmog.tsx` |
| Consider | NavButton `dark:` vs data-attribute | `NavButton.tsx` |
| Consider | `text-muted-foreground` undefined token | `WorkFilter.tsx` |
| Consider | Hero subtext mobile contrast | `Hero.tsx` |
| Low | Hero gradient opacity levels | `globals.css` |

---

## Sections with No Major Issues

- **Navbar / HoverLink** — token-based, theme-aware logo swap, correct
- **MobileMenu** — theme-aware backdrop, correct
- **WaterBlob** — distinct LIGHT_PALETTES defined, well-considered
- **CaseStudyHeader** — all tokens, theme-aware logo swap
- **GradientBar** — token-based, gradient colors appropriate in both modes
- **Footer links + resume gradient** — explicit `[data-theme='light']` overrides
- **Shimmer glow** — explicit `[data-theme='light']` override
- **Accessibility modal backdrop** (`bg-black/40`) — acceptable, darkens the light content behind it
- **Prose case study** — most text uses high-contrast tokens; only list descriptions are problematic

---

---

# Part II: Visual Quality & Polish (Beyond Accessibility)

*Research sources: [alexharri.com WebGL gradients](https://alexharri.com/blog/webgl-gradients), [web.dev blend modes](https://web.dev/learn/css/blend-modes), [designsystems.surf elevation](https://designsystems.surf/articles/depth-with-purpose-how-elevation-adds-realism-and-hierarchy), [ecommercewebdesign.agency vivid glow](https://ecommercewebdesign.agency/vivid-glow-aesthetics-how-bright-colors-and-light-effects-define-2025-web-design/)*

---

## WaterBlob Deep Dive: Why It Looks Wrong in Light Mode

The TLDR: **the shader was built entirely around one physical metaphor — emissive light on a dark surface — and that metaphor simply doesn't exist in light mode.** The light mode code attempts a "pigment/ink" metaphor but the math contradicts itself at almost every step.

### Problem 1: The Glow Effect Is Mathematically Broken in Light Mode

**Shader line 187:**
```glsl
vec3 color = backgroundColor + backgroundColor * glowIntensity;
```

In **dark mode**: `backgroundColor ≈ [0, 0, 0]` → `color = 0 + 0 * intensity` → the glow adds a faint luminous halo. Correct behavior.

In **light mode**: `backgroundColor ≈ [0.98, 0.988, 0.996]` → `glowIntensity = 0.08` → `color = 0.98 + 0.98 * 0.08 = 1.058`, **which clips to 1.0**.

The glow literally does nothing in light mode. The near-white background plus 8% more near-white = still white. The entire glow pass is wasted computation that produces zero visible output.

### Problem 2: Oversaturation Turns Mixed Colors to Mud

**Shader constants:**
```glsl
const float BASE_SATURATION_LIGHT = 1.45;
const float DENSITY_SAT_BOOST_LIGHT = 0.55;
```

At maximum blob density: `densitySaturation = 1.45 * (1.0 + 1.0 * 0.55) = 2.25x saturation multiplier`.

Tracing Orange (`[0.784, 0.373, 0.098]`) through the saturation function at 2.25x:
- Luminance = 0.464
- R: `0.464 + 2.25 * (0.784 - 0.464)` = **1.184 → clips to 1.0**
- G: `0.464 + 2.25 * (0.373 - 0.464)` = **0.259**
- B: `0.464 + 2.25 * (0.098 - 0.464)` = **-0.36 → clips to 0.0**

The orange becomes `[1.0, 0.259, 0.0]` — a harsh oversaturated brick red that has lost its original hue character entirely. When orange and purple blend in the overlap zone, and both clip like this, you get **a muddy desaturated zone in the middle where the colors fight each other**.

### Problem 3: Subsurface Scattering Pushes Brightness the Wrong Way

**Shader lines 219-221:**
```glsl
vec3 backlight = mix(uColor1, uColor3, 0.5) * 1.3;
color += backlight * subsurfaceScatter;
```

In dark mode: `backlight` = average of two bright colors × 1.3 = a luminous rim. Adding this to a dark background creates a beautiful inner glow at blob edges.

In light mode: `backlight` = average of orange and cyan = brownish mid-tone × 1.3 = warm gray. Adding this to a light background near blob edges creates **a brownish smudge artifact at the rim** — the opposite of what watercolor pigment looks like (watercolor darkens at edges because pigment accumulates, but it stays the color of the pigment, not a mixed average).

### Problem 4: The Canvas Is Opaque — Blobs Sit ON the Page Like Decals

The canvas uses `gl.clear(gl.COLOR_BUFFER_BIT)` to fill with the background color and paints blobs on top. In dark mode, this is seamless because the canvas fills with black, matching the page — you can't see where the canvas starts/ends, so the blobs appear to float in space.

In light mode, the canvas fills with near-white `#fafcfe`, matching the page background. This means the canvas IS invisible... but the blobs on it are just flat color shapes sitting on top of the page. There's no physical interaction between the blob colors and the underlying page — the blobs look like colored rectangles that happen to have wavy shapes.

**What's missing:** In dark mode, the "why it looks good" is that light-colored blobs on a black canvas create a perception of luminous depth — like neon lights glowing in a dark room. In light mode, you need the opposite phenomenon: **the canvas should be transparent and the blob colors should physically darken/interact with the white page**, like ink seeping into paper.

### Problem 5: The Edge Physics Are Inverted

In the shader's `irregularWaterShape` function:
```glsl
float influence = 1.0 - smoothstep(turbulentRadius * edgeSoftness, turbulentRadius * 1.5, dist);
```

Combined with the atmospheric fade at the end:
```glsl
float atmosphericAlpha = pow(totalWater, 0.78);
color = mix(backgroundColor, color, atmosphericAlpha);
```

The blob fades to background at edges, which is fine. But then the shadow effect (which darkens edges) is applied *before* the mix, meaning the darkened edges get mixed with the background color and are largely neutralized. The edges end up looking the same as the center — a flat wash with no pigment concentration.

Real watercolor has **darker pigment at edges** (paint accumulates as water dries) and **lighter, more transparent color at the center**. The shader currently does the opposite or nothing.

---

## WaterBlob Fix: What Would Actually Make It Look Good

### Fix 1 (Highest Impact — One CSS Property): `mix-blend-mode: multiply`

The single biggest improvement requires essentially no shader changes. The CSS `multiply` blend mode multiplies the canvas pixel color with what's behind it:
- Canvas white `[1.0, 1.0, 1.0]` × page white `[0.98, 0.99, 1.0]` = near-white (effectively invisible)
- Canvas orange `[0.78, 0.37, 0.10]` × page white `[1.0, 1.0, 1.0]` = orange (unchanged)
- The blob colors appear as ink stains on the page without the flat canvas border

**Implementation:**
```tsx
// In WaterBlob.tsx canvas element:
style={
  enhanced
    ? { filter: `contrast(...) saturate(...)`, mixBlendMode: theme === 'light' ? 'multiply' : 'normal' }
    : { mixBlendMode: theme === 'light' ? 'multiply' : 'normal' }
}
```

**But this requires one additional shader change:** The canvas background must render as pure white `[1.0, 1.0, 1.0]` in light mode, not `#fafcfe`. Otherwise the slightly-off-white background rectangle will be visible as a very slightly grey overlay. Pass `[1.0, 1.0, 1.0]` as `uBackgroundColor` in light mode from the colors resolver:

```ts
// In waterBlob.colors.ts getColors(), light mode path:
background: [1.0, 1.0, 1.0] // pure white for multiply blend to work
```

**Result:** Blobs look like translucent ink or dye stains on white paper. The boundary between canvas and page disappears. The interaction between blob colors and the page background is physically correct.

### Fix 2: Reduce Saturation to Stop Color Clipping

```glsl
const float BASE_SATURATION_LIGHT = 1.15;   // was 1.45
const float DENSITY_SAT_BOOST_LIGHT = 0.20; // was 0.55
```

This brings the max saturation multiplier from 2.25x down to ~1.38x, which keeps colors vivid without clipping into solid primaries. The chosen palette colors are already dark and saturated for light mode — they don't need further boosting.

### Fix 3: Add Proper Pigment Edge Darkening (The Watercolor Signature)

Replace the current shadow function that accidentally cancels itself out:

```glsl
// CURRENT (wrong — shadow at edges gets blended away):
float shadow = pow(1.0 - totalWater, 1.5) * 0.15;
blendedColor = blendedColor * (1.0 - shadow);

// BETTER — darken the actual composited result at blob edges in light mode:
float pigmentEdgeDarken = mix(
  smoothstep(0.0, 0.4, totalWater) * (1.0 - smoothstep(0.4, 0.9, totalWater)) * 0.25,
  0.0,
  uIsDarkMode
);
// Apply after compositing:
color = mix(color * (1.0 - pigmentEdgeDarken), color, uIsDarkMode);
```

This creates a darker ring at the blob boundary — characteristic of real watercolor pigment accumulation at wet edges.

### Fix 4: Fix the Glow to Be a Soft Vignette Instead

Instead of the useless additive glow:
```glsl
// CURRENT (does nothing in light mode):
vec3 color = backgroundColor + backgroundColor * glowIntensity;

// BETTER — in light mode, add a very subtle darkening in the blob area (depth cue):
float depthCue = mix(glowIntensity * 0.04, 0.0, uIsDarkMode); // subtle shadow underneath blobs
vec3 color = backgroundColor * (1.0 - depthCue);
// Then for dark mode, restore the original glow behavior
color += backgroundColor * glowIntensity * uIsDarkMode;
```

This creates a barely-perceptible shadow under the blobs in light mode, giving them physical presence on the white page instead of appearing to float with no depth.

---

## Overall Light Mode Visual Quality Recommendations

### 1. Add Elevation to Project Cards

**Current state:** Cards are completely flat — colored background fill, no shadow. In dark mode, cards sit in a dark field and the slightly different background color is enough. In light mode, cards on a near-white page with no border and no shadow look like colored rectangles with no perceived lift.

**Recommendation:** Add a subtle shadow in light mode. The `--shadow-md` token exists but isn't applied to cards:
```tsx
// In ProjectCard.tsx, the card container div:
className="... shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.10)]"
// Or more targeted with [data-theme='light']:
// light mode: shadow-sm → shadow-md on hover
// dark mode: no shadow (contrast from background is enough)
```

### 2. Footer Needs More Separation in Light Mode

**Current state:** Page background `#fafcfe`, footer background `#f0f0f0`. The difference is only ~10 RGB units — barely perceptible. In dark mode, the footer (`#181A1B`) vs page (`#000`) is clearly distinct.

**Recommendation:** Either darken the footer background in light mode to ~`#e8e8e8`, or add a top border:
```css
/* In design-tokens.css: */
--color-footer-bg: 232 232 232; /* #e8e8e8 - stronger step down from page */

/* Or in Footer.tsx: */
style={{ borderTop: '1px solid rgb(var(--color-border))' }}
```

### 3. Page Background: Add Warmth

**Current state:** `#fafcfe` is a very slightly blue-tinted white. Clinical and neutral.

**Best practice from research:** Top-tier portfolio light modes (Linear, Vercel, Stripe) use a barely-perceptible warm tint (`#FAFAF8`, `#FDFDF9`) rather than pure white or cool white. This prevents the "blank document" feel.

**Recommendation:**
```css
/* In design-tokens.css :root: */
--color-background: 250 250 248; /* #FAFAF8 - very subtle warm tint */
--color-surface: 246 246 244;    /* Consistent warm step */
```

### 4. Hero Area: Context Separation

In dark mode, the hero is literally a black full-screen section — the blobs float in it like a void, giving them scale and mystery. In light mode, the hero blends into the rest of the page. There's no visual boundary.

**Recommendation:** Add a very subtle bottom border or gradient fade to visually close the hero section in light mode:
```css
/* Subtle gradient fade at bottom of hero section */
[data-theme='light'] .hero-section-bottom-fade {
  background: linear-gradient(to bottom, transparent 80%, rgb(var(--color-background)) 100%);
}
```

Or, more impactful: the hero section could have a very faint inset shadow or a slightly different background to give it a panel-like quality:
```css
[data-theme='light'] .hero-section {
  background: linear-gradient(135deg, rgb(250, 250, 248) 0%, rgb(245, 246, 250) 100%);
}
```

### 5. Typography: Section Headings Could Use Color Accents in Light Mode

In dark mode, the warm off-white text (`#E8E6E3`) naturally reads as intentionally styled, not just default black. In light mode, `#171717` headings on `#fafcfe` are functionally high contrast but feel generic.

**Recommendation:** Consider using `text-primary` (the brand blue `#3947ca`) for the large section heading "Selected work" and "See More Work" in light mode. This adds personality without affecting readability:
```tsx
// In SelectedWork.tsx heading:
className="... text-foreground lg:text-primary"
// Or via CSS:
[data-theme='light'] h2.section-heading { color: rgb(var(--color-primary)); }
```

### 6. The `selected work` Section Background

Currently `bg-background` on both the hero and work sections — the page is a seamless white sheet. This is fine minimally, but could benefit from the slightest surface variation:

**Option A:** Nothing (keep the clean seamless scroll — very design-forward)
**Option B:** Add a very subtle top border at the section transition: `border-t border-border/50`

---

## Quick Visual Reference: The Core Light Mode Problem

```
Dark Mode Physics:           Light Mode (Current):          Light Mode (Goal):
┌─────────────────┐         ┌─────────────────┐           ┌─────────────────┐
│ ██████ BLACK    │         │ ░░░░░░ WHITE    │           │ ░░░░░░ WHITE    │
│  ╔═══╗          │         │  ╔═══╗          │           │                 │
│  ║🟠🟣║ glow   │         │  ║🟠🟣║ flat   │           │   🟠🟣  ink    │
│  ╚═══╝          │         │  ╚═══╝          │           │   stains        │
│ colors EMIT     │         │ colors sit ON   │           │ colors ABSORB   │
│ light into dark │         │ white like decal│           │ into white paper│
└─────────────────┘         └─────────────────┘           └─────────────────┘
✓ Looks great               ✗ Looks flat/wrong            ✓ Goal state
```

The fundamental mismatch: dark mode = light-emitting objects. Light mode = light-absorbing pigments. The shader was built for emissive metaphysics but light mode needs absorptive metaphysics. `mix-blend-mode: multiply` on the canvas gives you the absorptive physics for free.
