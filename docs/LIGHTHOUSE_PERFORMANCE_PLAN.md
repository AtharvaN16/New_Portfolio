# Lighthouse Performance Plan (Living)

Last updated: 2026-03-10

## Goal
Improve performance safely with zero regressions to visual look, theme, layout, or animation behavior.

## Guardrails
- No visual design regressions (colors, typography, spacing, composition).
- No layout behavior changes across breakpoints.
- No animation removals or timing/easing changes unless explicitly approved.
- Every optimization requires build + Lighthouse CI validation.

## Why Scores Differ
- Different test environments produce different scores.
- Local LHCI (`localhost`) and PSI (Google infra) are not equivalent.
- Performance score is heavily influenced by `Total Blocking Time (TBT)`, which can vary significantly run-to-run.
- Decision rule: use external test results as the worst-case benchmark, and local LHCI as regression safety during development.

## Catchpoint Baseline (March 10, 2026)
- Source: Catchpoint test run on **2026-03-10T15:43:11Z**, Lighthouse 11.4.0
- URL: https://www.atharva.design/
- Note: Lighthouse timed out — "The page loaded too slowly to finish within the time limit. Results may be incomplete."

### Lighthouse Scores
- Performance: **0/100** (timed out)
- Accessibility: 96/100
- Best Practices: 96/100
- SEO: 100/100

### Core Web Vitals (Lighthouse)
| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| FCP | 987ms | <1.8s | OK |
| LCP | 3,544ms | <2.5s | FAIL |
| CLS | 0 | <0.1 | Perfect |
| SI | 12,211ms | <3.4s | Critical |
| TBT | null (timed out) | <200ms | Unknown |

### WebPageTest Raw Data (3-run median)
| Metric | Value |
|--------|-------|
| TTFB | 201ms |
| FCP | 1,270ms |
| LCP | 3,381ms |
| TBT | 105ms |
| CLS | 0 |
| Fully Loaded | 2,034ms |

### Interpretation
- LCP is ~3.4–3.5s across both tools — consistent failure against the 2.5s target.
- Speed Index of 12s + Lighthouse timeout indicates the page continues doing work long after visible content appears (animation loops are the likely cause).
- CLS is perfect (0). Accessibility, SEO, Best Practices are strong.
- TBT from WebPageTest raw data is 105ms (good), but Lighthouse could not measure it due to timeout — the animation loops are likely preventing TTI from being reached.
- TBT/TTI both returned `NO_TTI_CPU_IDLE_PERIOD` — Lighthouse never found a quiet CPU window; main thread was busy for the full 30s test window.

### Waterfall Analysis
- 39 total requests in ~1.4s window
- 2 failed requests (red X): `/_next/static/chunks/0e9...` (92ms), `/_next/static/chunks/2ff8...` (696ms)
- Several 404s: `/site.webmanifest`, `/resume`, `/about`, `/explorations`, `/writings`
- Heavy JS chunk parallelism from ~0.35s to ~1.0s (requests 9–22, mostly 300–700ms each)
- LCP element painted at ~1.2s (per waterfall markers)
- Main thread activity and long tasks visible from ~0.5s onward

### Opportunities (3)
1. **Reduce unused JavaScript** — 0.1s savings
   - `/_next/static/chunks/8d17e369462e4f56.js` — 71,492 bytes transferred, 22,432 bytes saveable
2. **Initial server response time** — Root document took 50ms (passing)
3. **Eliminate render-blocking resources** — 150ms savings
   - `/_next/static/chunks/0e913b905f2518ed.css` — 18,665 bytes, 150ms blocking

### Diagnostics (7)
1. **LCP element** — 3,540ms
2. **Avoid chaining critical requests** — 3 chains found
3. **Avoids enormous network payloads** — Total size 574 KiB
4. **JavaScript execution time** — 0.8s
5. **Minimize main-thread work** — **78.5s total**
   - Other: 76,843ms (98.5% — continuous animation loops)
   - Script Evaluation: 933ms
   - Style & Layout: 454ms
   - Rendering: 238ms
   - Garbage Collection: 27ms
   - Script Parsing & Compilation: 21ms
   - Parse HTML & CSS: 8ms
6. **DOM size** — 334 elements; deepest node: `span > span.scribble-container > svg > path`
7. **Non-composited animations** — 4 elements found
   - `nav.w-full > ul.space-y-1.5 > li > a.footer-resume-link` — animation `travelingGradient`, reason: **Unsupported CSS Property: `background-position-x`**
   - `div.mt-40 > button.group > span.relative > span.absolute` — reason: Effect has unsupported timing parameters
   - `div.fixed > footer.w-full > div.absolute > div.absolute` — reason: Effect has unsupported timing parameters
   - `div.relative > button.group > div.relative > div` — reason: Effect has unsupported timing parameters

### Passed Audits (29 — selected notable)
- Avoid multiple page redirects, Enable text compression, Preconnect to required origins
- All text visible during webfont loads, Minify JS/CSS, Reduce unused CSS
- Use video formats for animated content, Avoid long main-thread tasks
- Minimize third-party usage, Lazy load third-party resources with facades
- Remove duplicate modules in JS bundles, Avoid serving legacy JS to modern browsers
- Image elements have explicit width/height, Properly size images, Defer offscreen images
- Efficiently encode images, Serve images in next-gen formats, Use HTTP/2
- Uses efficient cache policy on static assets (0 resources found)
- Uses passive listeners to improve scrolling performance
- Avoids `document.write()`, Page didn't prevent back/forward cache restoration
- Neutral (not scored): Preload key requests, Preload LCP image, LCP image not lazily loaded, Avoid large layout shifts, User Timing marks and measures

---

## Accessibility Audit — 96/100

### Failures (3)

**Names and labels (1):**
- Skip links are not focusable

**Navigation (1):**
- Heading elements are not in a sequentially-descending order

**ARIA (1):**
- Values assigned to `role=""` are not valid ARIA roles

### Manual Checks Required (10)
- Interactive controls are keyboard focusable
- Interactive elements indicate their purpose and state
- The page has a logical tab order
- Visual order on the page follows DOM order
- User focus is not accidentally trapped in a region
- The user's focus is directed to new content added to the page
- HTML5 landmark elements are used to improve navigation
- Offscreen content is hidden from assistive technology
- Custom controls have associated labels
- Custom controls have ARIA roles

---

## Best Practices — Console Errors

**Browser errors were logged to the console (6 errors):**

| URL | Error |
|-----|-------|
| `https://www.atharva.design/site.webmanifest` | 404 — Failed to load resource |
| `https://www.atharva.design/about?_rsc=1r34m` | 404 — Failed to load resource |
| `https://www.atharva.design/explorations?_rsc=1r34m` | 404 — Failed to load resource |
| `https://www.atharva.design/resume?_rsc=1r34m` | 404 — Failed to load resource |
| `https://www.atharva.design/writings?_rsc=1r34m` | 404 — Failed to load resource |
| `https://www.atharva.design/` | Manifest fetch from `/site.webmanifest` failed |

Note: The `/about`, `/explorations`, `/resume`, `/writings` 404s are RSC (React Server Component) prefetch requests — these routes don't exist yet. The `site.webmanifest` 404 is a missing PWA manifest file.

---

## PWA Audit — 29/100

### Installable — FAIL (6 reasons)
- `manifest-parsing-or-network-error` — `/site.webmanifest` returns 404
- Manifest start URL is not valid
- Manifest does not contain a `name` or `short_name` field
- Manifest `display` must be `standalone`, `fullscreen`, or `minimal-ui`
- No suitable icon (PNG/SVG/WebP ≥ 144px with `purpose: any`)
- No icon ≥ 144px square with `purpose` unset or set to `"any"`

### PWA Optimized — FAIL (partial)
- Not configured for a custom splash screen — no manifest fetched
- Does not set a theme color for the address bar — no manifest fetched
- Manifest doesn't have a maskable icon
- Passing: Has `<meta name="viewport">` tag

### PWA Manual Checks (3)
- Site works cross-browser
- Page transitions don't feel like they block on the network
- Each page has a URL

**Root cause of all PWA failures:** `/site.webmanifest` is missing (404). Fixing this single file would resolve most PWA issues.

---

## Assets Tab (WebPageTest Optimization)

### Optimization Summary
| Metric | Score |
|--------|-------|
| Performance | 0 |
| First Byte Time | A (100) |
| Keep-alive Enabled | A (100) |
| Compress Transfer | A (100) |
| Compress Images | A (100) |
| Progressive JPEG | N/A |
| Cache Static Content | A (100) |
| Effective use of CDN | A (100) |

Infrastructure is excellent — CDN (Vercel), compression, caching, keep-alive all perfect. Performance score of 0 is purely the animation/LCP issue.

### Breakdown by MIME Type
| Type | Requests | Bytes (transferred) | Uncompressed |
|------|----------|---------------------|--------------|
| JS | 19 | 281,711 | 864,328 |
| Font | 5 | 173,928 | 175,908 |
| Image | 3 | 57,898 | 81,310 |
| HTML | 6 | 28,862 | 133,823 |
| CSS | 2 | 18,903 | 101,153 |
| Other | 4 | 3,631 | 8,777 |
| Video | 0 | 0 | 0 |

JS is the largest payload at 281 KB transferred (864 KB uncompressed). Fonts second at 174 KB.

### Optimization Checklist — Notable Findings
All 39 requests pass Keep-Alive and CDN checks. Red-highlighted rows (failures) are all 404s:

| # | Request | Issue |
|---|---------|-------|
| 5 | Satoshi-Variable.woff2 | No Cache Static header |
| 24 | favicon.ico | No Cache Static header |
| 30 | site.webmanifest | 404 — no Keep-Alive, GZip, Cache |
| 31 | /resume | 404 — route doesn't exist |
| 33 | /about | 404 — route doesn't exist |
| 34 | /explorations | 404 — route doesn't exist |
| 36 | /writings | 404 — route doesn't exist |

### Optimization Details
- **First Byte Time:** 190ms (target: 332ms) — 100/100
- **Keep-alive:** 100/100
- **Gzip:** 100/100 — 332.8 KB compressible, potential savings = 0 KB (already fully compressed)
- **Compress Images:** 100/100 — 43.1 KB total, potential savings = 0 KB
- **Cache Static Assets:** 100/100
- **CDN:** 100/100 — CDN detected: **Vercel**

---

## Catchpoint Opportunities Tab

### 1. 2 CSS files are blocking page rendering
- `/_next/static/chunks/0e913b905f2518ed.css`
- `/_next/static/chunks/2ff8f8858c632cbb.css`
- Both are render-blocking — fetched and executed before page can paint
- Fix options: inline critical CSS, or load asynchronously

### 2. LCP is high (over 2.5s) — LCP element identified
The LCP element is **text**, not an image:
```html
<div class="max-w-[50%] md:max-w-xs text-[12px] md:text-[16px] font-normal text-left"
     style="opacity: 1; transform: none;">
  <span class="block md:inline text-text-secondary font-medium">Currently, </span>
  <span style="color:rgb(var(--color-text-secondary))">MS in Human-Computer Interaction at Pratt Institute.</span>
</div>
```
- This is the "Currently, MS in HCI at Pratt Institute." text in the hero
- LCP is text-based — delayed by blocking scripts/stylesheets, JS-generated content, non-progressive font loading, or CSS/JS animations
- The `style="opacity: 1; transform: none;"` inline style suggests Framer Motion is controlling this element and has already resolved, but the text is still rendering late

### 3. Image outside critical viewport should be lazy-loaded
- `/_next/image?url=%2Fimages%2Fcase-studies%2Fnyc-dcwp-business-licenses%2Ffullpage-card-v2.webp&w=3840&q=75`
- This is the NYC DCWP case study card image — it's below the fold and being eagerly loaded
- Fix: add `loading="lazy"` (or remove `priority` flag if set)

### 4. Fonts loaded with `font-display: block` — hiding text during load
- **JetBrains Mono Fallback** normal normal
- **Mynerve Fallback** normal normal
- Both use `font-display: block` (default) — browser hides text entirely while font loads
- Fix: add `font-display: swap` so fallback font renders immediately

### 5. Final HTML DOM is significantly larger than initially delivered HTML
- DOM is **5.75kb larger** than the server-delivered HTML (9.53% of total HTML)
- JS is generating content client-side that wasn't in the initial SSR output
- Means some content is still being hydrated/injected by JS rather than pre-rendered
- Causes delayed asset discovery (browser can't find image/resource URLs until JS runs)

## Completed Optimizations

### 2026-03-10 — Tier 1 (Zero Risk)

- `public/site.webmanifest` created (icon PNGs pending: `public/icons/icon-192.png`, `icon-512.png`)
- `id="main-content"` on `<motion.main>` in `src/app/page.tsx`
- `prefetch={false}` for `/resume`, `/about`, `/explorations`, `/writings` via `HoverLink` prop → `Navbar`, `Hero`, `MobileMenu`
- Fixed pre-existing TS error in `ShowcaseHero.tsx` (`RefObject<HTMLDivElement | null>`)

---

### 2026-03-07 — SSR Unblocked (Critical LCP Fix)

**Problem identified:** The app was effectively doing CSR despite using Next.js App Router SSR. Root cause chain:
1. `ThemeProvider` had `if (!mounted) return null` — zero page content in server-rendered HTML.
2. Every page visitor waited for JS to download, parse, execute, and hydrate before any content appeared.
3. This caused the `<h2>Selected work</h2>` LCP element to have a 2,162ms render delay.

**Changes made — no animations altered:**

- `src/components/providers/ThemeProvider.tsx`: Removed `if (!mounted) return null`. State initializer now reads from `document.documentElement.getAttribute('data-theme')` on the client.
- `src/app/layout.tsx`: Removed `'use client'`. Layout is now a server component.
- `src/app/AppProviders.tsx` (new file): Client component wrapper for providers.
- `src/components/providers/LenisProvider.tsx`: Deferred Lenis bundle via dynamic `import('lenis').then(...)` inside `useEffect`.
- `src/components/layout/Navbar.tsx`: Removed JS breakpoint conditional causing hydration mismatch; CSS class handles it.

**Build result:** `/` now shows `○ (Static)`.

---

### 2026-03-08 — Animation Loop Gating (TBT Reduction)

**Target:** Desktop TBT reduction — continuous animation loops were preventing TTI within Lighthouse's 30s window.

**Four animation loops identified and gated:**
1. **WaterBlob** — rAF loop deferred by 1,400ms on first mount (matches CSS fade-in; blob invisible during window).
2. **FooterDustParticles** — `IntersectionObserver` gates rAF loop; only starts when footer enters viewport.
3. **FooterSmog** — `useInView` gates three `repeat: Infinity` swell animations.
4. **AnimatedLink** — down-arrow bounce gated on `window.load` event.

**Additional changes:**
- `.browserslistrc` — modern browser targets; eliminates ~13.7 KiB legacy polyfill chunk.
- LCP image priority — `imagePriority={true}` + `imageFetchPriority="high"` on first item in `SelectedWork.tsx`.
- Font preload — `<link rel="preload">` for `Satoshi-Variable.woff2` + `VulfMonoDemo-LightItalic.otf`.

---

## Current State & Next Steps

**Active plan:** `docs/performance-plan.md` — tiered fix list with session state.
**Current position:** Tier 1 complete. Starting Tier 2.

### What Tier 1 fixed (2026-03-10)
- `public/site.webmanifest` created → resolves 6 console errors and PWA 404. Icon PNGs pending.
- `id="main-content"` added to `<motion.main>` in `page.tsx` → skip link now functional.
- `prefetch={false}` threaded through `HoverLink` → `Navbar`, `Hero`, `MobileMenu` → suppresses 4 RSC 404s.
- Pre-existing TS error fixed: `ShowcaseHero.tsx` `RefObject` type.

### Tier 2 targets
- Conditional `priority` on `FullpageCard` (image eagerness audit)
- Cache headers for `Satoshi-Variable.woff2` + `favicon.ico` in `next.config.ts`

### Root cause summary (unchanged)
- LCP 3,598ms driven by `opacity: 0` initial state on "Currently, MS in HCI…" text (Framer Motion delay). Fix is Tier 4 (needs approval).
- Lighthouse timeout driven by continuous rAF animation loops preventing TTI (TBT/TTI = `NO_TTI_CPU_IDLE_PERIOD`).
- Infrastructure is excellent — no server-side fixes needed.

## JavaScript Tab (WebPageTest)

### Processing Categories (Exclude Idle: On)
| Category | Time (ms) |
|----------|-----------|
| Scripting | 317 |
| Layout | 56 |
| Loading | 26 |
| Painting | 6 |
| Other | 5 |
| **Total** | **~410ms** |

Scripting dominates at 317ms — this is the non-idle CPU time during page load (does not include the continuous animation loop work).

### Processing Events (top events)
| Event | Time (ms) |
|-------|-----------|
| FunctionCall | 191 |
| EvaluateScript | 99 |
| Layout | 32 |
| ResourceFetcher::requestResource | 24 |
| UpdateLayoutTree | 22 |
| v8.compile | 21 |
| Layerize | 5 |
| Paint | 4 |
| FireAnimationFrame | 2 |
| ParseHTML | 2 |
| ParseAuthorStyleSheet | 2 |

FunctionCall (191ms) + EvaluateScript (99ms) = 290ms of the 317ms scripting time. This is JS execution cost during initial load.

### Console Log
**Errors (network):**
- `site.webmanifest` — 404
- Manifest fetch from `site.webmanifest` failed
- `/resume?_rsc=1r34m` — 404
- `/about?_rsc=1r34m` — 404
- `/explorations?_rsc=1r34m` — 404
- `/writings?_rsc=1r34m` — 404

**Warnings (rendering — 4 entries):**
- `[.WebGL-0x1ac400132800] GL Driver Message` — WebGL context messages from WaterBlob canvas (informational, not errors)
- `[GroupMarkerNotSet(crbug.com/242999)]` — Chrome WebGL group marker warning (cosmetic)

### Performance Tab — Run 3, First View
| Metric | Value (ms) |
|--------|-----------|
| Time To First Byte | 190 |
| Time to Title | 100 |
| Time To Start Render | 1,100 |
| DOM Content Loaded | 983 |
| First Contentful Paint | 1,379 |
| Load Time (onload) | 1,177 |
| Load Time (Fully Loaded) | 1,543 |
| Speed Index | 2,906 |
| Largest Contentful Paint | **3,598** |
| Visually Complete | **4,500** |
| Last Visual Change | **4,500** |
| CPU Busy Time | **5,090** |
| Total Blocking Time | 0 |

Key observations:
- TBT = 0ms but CPU Busy Time = 5,090ms — the CPU is continuously busy but never blocks the main thread long enough to register as TBT (tasks < 50ms each). This is consistent with rAF animation loops running at 60fps.
- Visually Complete = 4,500ms — page isn't visually settled until 4.5s, likely due to animations still running/completing (WaterBlob fade-in, entry animations).
- The gap between Fully Loaded (1,543ms) and Visually Complete (4,500ms) = ~3s of continued animation work after the network is done.

---

## Lighthouse CI
- Workflow: `.github/workflows/lighthouse-ci.yml`
- Configs: `lighthouserc.desktop.json`, `lighthouserc.mobile.json`
- Commands: `bun run lhci:desktop`, `bun run lhci:mobile`, `bun run lhci`

## Maintenance Rules
- This file tracks only current state and next actions.
- Remove stale tasks as soon as they are no longer relevant.
- Do not keep historical changelog entries here.
