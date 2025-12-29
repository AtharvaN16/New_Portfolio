# 🔧 Troubleshooting Guide

**Last Updated:** 2025-01-23
**Status:** Living Document

This guide covers common issues you might encounter and how to fix them. Most of these issues were problems in the old portfolio that we've already prevented, but understanding them helps you debug when things go wrong.

---

## 📋 Table of Contents

1. [Build & Development Issues](#build--development-issues)
2. [Environment Variables](#environment-variables)
3. [Theme & Dark Mode Issues](#theme--dark-mode-issues)
4. [Mobile Responsiveness](#mobile-responsiveness)
5. [Animation Performance](#animation-performance)
6. [Testing Issues](#testing-issues)
7. [Deployment Problems](#deployment-problems)
8. [Migration from Old Portfolio](#migration-from-old-portfolio)
9. [Common Error Messages](#common-error-messages)

---

## Build & Development Issues

### ❌ Build Fails with "Invalid environment variables"

**Error:**

```
Error: Invalid environment variables:
[{
  "code": "invalid_format",
  "format": "url",
  "path": ["GOOGLE_SHEETS_API_URL"],
  "message": "Invalid URL"
}]
```

**Cause:** Environment variable validation in `src/lib/env.ts` is failing.

**Solution:**

1. Check your `.env.local` file exists
2. Ensure all required variables are set
3. For optional URLs, use empty string or valid URL (our Zod schema handles this)
4. Copy from `.env.example` if needed:
   ```bash
   cp .env.example .env.local
   ```

**Reference:** See `01-ARCHITECTURE.md` → Environment Variables section

---

### ❌ TypeScript Errors After Adding New Component

**Error:**

```
error TS2307: Cannot find module '@/components/ui/Button' or its corresponding type declarations.
```

**Cause:** Missing type exports or incorrect import path.

**Solutions:**

1. **Ensure proper exports:**

   ```typescript
   // ❌ Wrong (no export)
   function Button() { ... }

   // ✅ Correct
   export function Button() { ... }
   ```

2. **Check import path:**

   ```typescript
   // ✅ Use alias
   import { Button } from '@/components/ui/Button'

   // ❌ Don't use relative paths unnecessarily
   import { Button } from '../../../components/ui/Button'
   ```

3. **Run type check:**
   ```bash
   npm run type-check
   ```

**Reference:** See `02-COMPONENT-GUIDELINES.md` → Naming Conventions

---

### ❌ "Module not found" After Installing Package

**Error:**

```
Module not found: Can't resolve 'lenis'
```

**Cause:** Package installed but dev server not restarted.

**Solution:**

```bash
# Stop dev server (Ctrl+C)
npm install
npm run dev
```

---

### ❌ ESLint Error: "Component is too long"

**Error:**

```
error: Component exceeds maximum allowed lines (300). Current: 450 lines
```

**Cause:** Component violates our 300-line limit (learned from old portfolio's 23,000-line component mistake).

**Solution:**

1. **Break into smaller components:**

   ```typescript
   // ❌ Before (450 lines)
   export function HeroSection() {
     return (
       <section>
         {/* 450 lines of JSX */}
       </section>
     )
   }

   // ✅ After (broken down)
   export function HeroSection() {
     return (
       <section>
         <HeroBackground />
         <HeroContent />
         <HeroAnimations />
       </section>
     )
   }
   ```

2. **Extract logic to hooks:**

   ```typescript
   // Extract complex logic
   const { scrollProgress, isInView } = useHeroAnimations()
   ```

3. **Move constants to separate file:**
   ```typescript
   // hero-config.ts
   export const HERO_ANIMATION_CONFIG = { ... }
   ```

**Why This Matters:** Old portfolio had components so large they were unmaintainable. See `Documentation/CODEBASE_STRATEGIC_REVIEW.md`.

**Reference:** See `02-COMPONENT-GUIDELINES.md` → Component Size Limits

---

## Environment Variables

### ❌ Environment Variables Not Loading

**Symptoms:**

- `env.NEXT_PUBLIC_SITE_URL` is undefined
- Build succeeds but runtime errors
- Console shows "undefined" for env values

**Solution:**

1. **Check file name:**

   ```bash
   # ✅ Correct
   .env.local

   # ❌ Wrong
   .env
   env.local
   .env.txt
   ```

2. **Ensure proper prefix:**

   ```bash
   # ✅ Client-side (exposed to browser)
   NEXT_PUBLIC_SITE_URL=https://example.com

   # ✅ Server-side only
   GOOGLE_SHEETS_API_URL=https://sheets.googleapis.com/...
   ```

3. **Restart dev server:**
   Environment variables are loaded at build time, not runtime.

   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

4. **Import from correct file:**

   ```typescript
   // ✅ Correct
   import { env } from '@/lib/env'
   console.log(env.NEXT_PUBLIC_SITE_URL)

   // ❌ Wrong (bypasses validation)
   console.log(process.env.NEXT_PUBLIC_SITE_URL)
   ```

**Reference:** See `01-ARCHITECTURE.md` → Environment Variables

---

### ❌ "Invalid URL" for Optional Environment Variable

**Error:**

```
GOOGLE_SHEETS_API_URL: Invalid URL
```

**Cause:** Variable is set to empty string but Zod expects valid URL or undefined.

**Solution:**

Our Zod schema already handles this! Just use empty string:

```bash
# .env.local
GOOGLE_SHEETS_API_URL=
```

The schema transforms empty string to `undefined`:

```typescript
GOOGLE_SHEETS_API_URL: z.string()
  .url()
  .optional()
  .or(z.literal('').transform(() => undefined))
```

---

## Theme & Dark Mode Issues

### ❌ Theme "Flash" on Page Load

**Symptoms:**

- Page loads in light mode, then switches to dark mode
- Background color flickers
- User sees wrong theme for ~100ms

**Cause:** Theme loads after React hydrates (OLD portfolio had this issue).

**Solution (Already Implemented):**

We use `ThemeScript` component that runs BEFORE React:

```typescript
// src/app/layout.tsx
<html lang="en" suppressHydrationWarning>
  <head>
    <ThemeScript />
  </head>
  <body>
    <ThemeProvider>{children}</ThemeProvider>
  </body>
</html>
```

**If Flash Still Occurs:**

1. **Ensure `suppressHydrationWarning` on `<html>`:**

   ```typescript
   <html lang="en" suppressHydrationWarning>
   ```

2. **Check ThemeScript is in `<head>`:**
   Must be before `<body>` to execute before paint.

3. **Verify localStorage key matches:**
   ```typescript
   // ThemeScript.tsx and ThemeProvider.tsx must use same key
   const THEME_KEY = 'portfolio-theme'
   ```

**Reference:** See `01-ARCHITECTURE.md` → Dark Mode Implementation

---

### ❌ Dark Mode Not Persisting

**Symptoms:**

- Toggle theme works
- Refresh page → theme resets to default

**Cause:** localStorage not being set.

**Solution:**

1. **Check ThemeProvider `setTheme` function:**

   ```typescript
   function setTheme(newTheme: Theme) {
     setThemeState(newTheme)
     localStorage.setItem('portfolio-theme', newTheme) // Must be here
     document.documentElement.setAttribute('data-theme', newTheme)
   }
   ```

2. **Verify browser allows localStorage:**
   Some privacy modes block localStorage.
   ```typescript
   // Test in console
   localStorage.setItem('test', 'test')
   localStorage.getItem('test') // Should return 'test'
   ```

---

### ❌ CSS Variables Not Updating in Dark Mode

**Symptoms:**

- Dark mode toggle works
- Colors don't change
- `data-theme="dark"` is set but colors stay light

**Cause:** CSS selector issue or missing dark mode tokens.

**Solution:**

1. **Check `globals.css` has dark mode overrides:**

   ```css
   /* Must use attribute selector, not class */
   [data-theme='dark'] {
     --color-background: 10 10 10;
     --color-text: 250 250 250;
     /* ... all color overrides */
   }
   ```

2. **Verify HTML attribute is set:**

   ```typescript
   // Inspect in DevTools
   <html data-theme="dark">
   ```

3. **Check Tailwind uses CSS variables:**
   ```typescript
   // tailwind.config.ts
   colors: {
     background: 'rgb(var(--color-background) / <alpha-value>)',
   }
   ```

**Reference:** See `01-ARCHITECTURE.md` → Design Token System

---

## Mobile Responsiveness

### ❌ Mobile Layout Completely Broken

**Symptoms:**

- Desktop layout on mobile
- Horizontal scrolling
- Text overflows screen

**Cause:** Missing viewport meta tag (OLD portfolio had this critical issue).

**Solution (Already Fixed):**

We added viewport to `layout.tsx`:

```typescript
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}
```

**If Still Broken:**

1. **Check `layout.tsx` exports viewport:**
   Must be named export, not in metadata.

2. **Verify no fixed widths:**

   ```css
   /* ❌ Wrong */
   .container {
     width: 1200px;
   }

   /* ✅ Correct */
   .container {
     max-width: 1200px;
     width: 100%;
   }
   ```

3. **Use mobile-first breakpoints:**

   ```typescript
   // ✅ Mobile first
   <div className="w-full md:w-1/2 lg:w-1/3">

   // ❌ Desktop first
   <div className="w-1/3 md:w-1/2 sm:w-full">
   ```

**Reference:** See `01-ARCHITECTURE.md` → Responsive System

---

### ❌ Touch Events Not Working

**Symptoms:**

- Hover effects work on desktop
- No touch feedback on mobile
- Buttons unresponsive on touch

**Solution:**

1. **Add touch-action CSS:**

   ```typescript
   <button className="touch-manipulation active:scale-95">
   ```

2. **Use onClick instead of onMouseDown:**

   ```typescript
   // ✅ Works on both
   <button onClick={handleClick}>

   // ❌ Desktop only
   <button onMouseDown={handleClick}>
   ```

3. **Test with device emulation:**
   Chrome DevTools → Toggle device toolbar (Cmd+Shift+M)

---

### ❌ Text Too Small on Mobile

**Symptoms:**

- Text readable on desktop
- Microscopic on mobile
- Users have to zoom

**Cause:** Absolute font sizes instead of responsive.

**Solution:**

Use our responsive typography system:

```typescript
// ✅ Correct (uses clamp in globals.css)
<h1 className="text-4xl">
// Automatically scales: 2rem (mobile) → 3.5rem (desktop)

// ❌ Wrong (fixed size)
<h1 style={{ fontSize: '3.5rem' }}>
```

**Our System:**

```css
/* globals.css */
--text-4xl: clamp(2rem, 1.5rem + 2vw, 3.5rem);
```

**Reference:** See `01-ARCHITECTURE.md` → Typography Scale

---

## Animation Performance

### ❌ Animations Janky/Laggy on Mobile

**Symptoms:**

- Smooth on desktop
- Stuttering on mobile
- FPS drops below 30

**Cause:** Animating non-GPU properties or too many animations.

**Solution:**

1. **Only animate GPU-accelerated properties:**

   ```typescript
   // ✅ Fast (GPU accelerated)
   <motion.div
     animate={{
       opacity: 1,
       scale: 1,
       x: 0,
       y: 0,
       rotate: 0,
     }}
   />

   // ❌ Slow (triggers layout)
   <motion.div
     animate={{
       width: '100%',  // ❌ Causes reflow
       height: '500px', // ❌ Causes reflow
       top: '100px',    // ❌ Causes repaint
     }}
   />
   ```

2. **Use `will-change` for complex animations:**

   ```typescript
   <motion.div
     className="will-change-transform"
     animate={{ scale: 1.2 }}
   />
   ```

3. **Reduce animation complexity on mobile:**

   ```typescript
   const { isMobile } = useBreakpoints()

   <motion.div
     animate={{
       opacity: 1,
       // Only scale on desktop
       ...(isMobile ? {} : { scale: 1.2 }),
     }}
   />
   ```

4. **Respect prefers-reduced-motion:**
   ```typescript
   // Already handled in globals.css
   @media (prefers-reduced-motion: reduce) {
     *, *::before, *::after {
       animation-duration: 0.01ms !important;
       transition-duration: 0.01ms !important;
     }
   }
   ```

**Reference:** See `03-ANIMATION-STRATEGY.md` → Performance Rules

---

### ❌ Lenis Smooth Scroll Not Working

**Symptoms:**

- Normal scroll behavior
- No smooth momentum
- Scroll-triggered animations not firing

**Solution:**

1. **Check LenisProvider in layout:**

   ```typescript
   // src/app/layout.tsx
   <LenisProvider>
     {children}
   </LenisProvider>
   ```

2. **Verify client component:**

   ```typescript
   // LenisProvider.tsx must have:
   'use client'
   ```

3. **Check requestAnimationFrame loop:**

   ```typescript
   useEffect(() => {
     function raf(time: number) {
       lenis.raf(time)
       requestAnimationFrame(raf)
     }
     requestAnimationFrame(raf)
   }, [lenis])
   ```

4. **Disable on mobile if needed:**

   ```typescript
   const { isMobile } = useBreakpoints()

   const lenis = new Lenis({
     duration: isMobile ? 0.8 : 1.2,
     smoothWheel: !isMobile, // Disable smooth scroll on mobile
   })
   ```

**Reference:** See `03-ANIMATION-STRATEGY.md` → Lenis Integration

---

### ❌ Framer Motion Animations Not Running

**Symptoms:**

- No animation on component mount
- Elements appear instantly
- Console shows no errors

**Solution:**

1. **Ensure initial state is different from animate:**

   ```typescript
   // ❌ Won't animate (same values)
   <motion.div
     initial={{ opacity: 1 }}
     animate={{ opacity: 1 }}
   />

   // ✅ Will animate
   <motion.div
     initial={{ opacity: 0 }}
     animate={{ opacity: 1 }}
   />
   ```

2. **Check component is client component:**

   ```typescript
   'use client' // Must be at top of file

   import { motion } from 'framer-motion'
   ```

3. **Verify Framer Motion is installed:**
   ```bash
   npm list framer-motion
   # Should show version
   ```

---

## Testing Issues

### ❌ Tests Fail with "Cannot find module '@/components/...'"

**Cause:** Vitest doesn't resolve path aliases.

**Solution:**

Already configured in `vitest.config.ts`:

```typescript
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
}
```

If still failing:

1. Check `vitest.config.ts` exists
2. Restart test runner
3. Clear cache: `rm -rf node_modules/.vite`

---

### ❌ Component Tests Fail: "useBreakpoints is not a function"

**Cause:** Hook not mocked in test environment.

**Solution:**

Mock the hook:

```typescript
// Button.test.tsx
import { vi } from 'vitest'

vi.mock('@/hooks/use-breakpoint', () => ({
  useBreakpoints: () => ({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  }),
}))
```

**Reference:** See `02-COMPONENT-GUIDELINES.md` → Testing Examples

---

## Deployment Problems

### ❌ Build Works Locally But Fails on Vercel

**Error:**

```
Error: Invalid environment variables
```

**Cause:** Environment variables not set in Vercel dashboard.

**Solution:**

1. **Go to Vercel Dashboard** → Project → Settings → Environment Variables
2. **Add all variables from `.env.example`:**
   - `NEXT_PUBLIC_SITE_URL`
   - `NEXT_PUBLIC_ENABLE_ANIMATIONS`
   - `GOOGLE_SHEETS_API_URL` (if using contact form)
3. **Redeploy:**
   ```bash
   git commit --allow-empty -m "Trigger redeploy"
   git push
   ```

---

### ❌ Images Not Loading in Production

**Symptoms:**

- Images work in dev
- Broken in production
- Console shows 404 errors

**Cause:** Image paths or Next.js Image config issue.

**Solution:**

1. **Use Next.js Image component:**

   ```typescript
   import Image from 'next/image'

   <Image
     src="/images/hero.jpg"
     alt="Hero"
     width={1200}
     height={600}
   />
   ```

2. **Check images are in `public/`:**

   ```
   public/
   └── images/
       └── hero.jpg
   ```

3. **Use correct paths:**

   ```typescript
   // ✅ Correct
   src = '/images/hero.jpg'

   // ❌ Wrong
   src = './public/images/hero.jpg'
   ```

4. **For external images, add to next.config.ts:**
   ```typescript
   images: {
     remotePatterns: [
       {
         protocol: 'https',
         hostname: 'example.com',
       },
     ],
   }
   ```

---

### ❌ CSS Not Applied in Production

**Symptoms:**

- Styles work in dev
- Unstyled in production
- Tailwind classes missing

**Cause:** Tailwind purging unused classes.

**Solution:**

1. **Check `tailwind.config.ts` content paths:**

   ```typescript
   content: [
     './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
     './src/components/**/*.{js,ts,jsx,tsx,mdx}',
     './src/app/**/*.{js,ts,jsx,tsx,mdx}',
     './mdx-components.tsx', // Don't forget this!
   ]
   ```

2. **Don't use dynamic class names:**

   ```typescript
   // ❌ Wrong (Tailwind can't detect)
   <div className={`text-${color}-500`} />

   // ✅ Correct
   <div className={color === 'red' ? 'text-red-500' : 'text-blue-500'} />
   ```

3. **Add to safelist if needed:**
   ```typescript
   // tailwind.config.ts
   safelist: ['text-red-500', 'bg-blue-600']
   ```

---

## Migration from Old Portfolio

### ❌ Old Component Too Large to Migrate

**Problem:** Component is 1,000+ lines (old portfolio had 23,000-line component).

**Solution:**

Follow the migration checklist from `02-COMPONENT-GUIDELINES.md`:

1. **Analyze the component:**
   - What does it do?
   - What are the distinct sections?
   - What can be extracted?

2. **Break into smaller pieces:**

   ```
   HomeBlobs.tsx (1,113 lines)
   ↓
   hero-section/
   ├── HeroSection.tsx (200 lines)
   ├── HeroBackground.tsx (150 lines)
   ├── HeroContent.tsx (180 lines)
   ├── HeroAnimations.tsx (220 lines)
   └── hero-config.ts (50 lines)
   ```

3. **Extract patterns:**
   - Reusable animations → `src/lib/animation-variants.ts`
   - Common logic → Custom hooks
   - Shared styles → Design tokens

4. **Refactor code:**
   - Remove hardcoded values
   - Use design tokens
   - Add TypeScript types
   - Follow naming conventions

5. **Test thoroughly:**
   - Write unit tests
   - Test responsiveness
   - Verify animations

**Reference:** See `02-COMPONENT-GUIDELINES.md` → Migrating from Old Portfolio

---

### ❌ GSAP Code Needs Converting to Framer Motion

**Problem:** Old portfolio used GSAP, new uses Framer Motion.

**Solution:**

Use conversion guide from `03-ANIMATION-STRATEGY.md`:

```typescript
// ❌ Old (GSAP)
gsap.to('.hero', {
  opacity: 1,
  y: 0,
  duration: 0.8,
  ease: 'power2.out',
})

// ✅ New (Framer Motion)
<motion.div
  className="hero"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: 'easeOut' }}
/>
```

**Common Conversions:**

| GSAP            | Framer Motion                    |
| --------------- | -------------------------------- |
| `gsap.to()`     | `animate={}`                     |
| `gsap.from()`   | `initial={}`                     |
| `ScrollTrigger` | `useScroll()` + `useTransform()` |
| `timeline()`    | `variants` with stagger          |
| `.delay(0.2)`   | `transition={{ delay: 0.2 }}`    |

**Reference:** See `03-ANIMATION-STRATEGY.md` → Migration Guide

---

### ❌ Hardcoded Values in Old Code

**Problem:** Old code has magic numbers and hardcoded colors.

**Solution:**

Replace with design tokens:

```typescript
// ❌ Old
<div style={{
  color: '#3947ca',
  padding: '32px',
  fontSize: '24px',
}}>

// ✅ New
<div className="text-primary p-8 text-2xl">
// Uses: --color-primary, --space-8, --text-2xl
```

**Reference:** See `01-ARCHITECTURE.md` → Design Token System

---

## Common Error Messages

### "Hydration Error"

**Full Error:**

```
Error: Hydration failed because the initial UI does not match what was rendered on the server.
```

**Causes & Solutions:**

1. **Theme mismatch:**
   - Add `suppressHydrationWarning` to `<html>`
   - Ensure ThemeScript runs before React

2. **Client-only content in server component:**

   ```typescript
   // ❌ Wrong
   export default function Page() {
     return <div>{window.location.href}</div>
   }

   // ✅ Correct
   'use client'
   export default function Page() {
     const [url, setUrl] = useState('')
     useEffect(() => setUrl(window.location.href), [])
     return <div>{url}</div>
   }
   ```

3. **Nested interactive elements:**

   ```typescript
   // ❌ Wrong (button in button)
   <button>
     <button>Click</button>
   </button>

   // ✅ Correct
   <div>
     <button>Click</button>
   </div>
   ```

---

### "Cannot read property 'map' of undefined"

**Cause:** Data not loaded yet.

**Solution:**

Add proper guards:

```typescript
// ❌ Wrong
{data.map(item => <div>{item}</div>)}

// ✅ Correct
{data?.map(item => <div>{item}</div>) ?? <div>Loading...</div>}
```

---

### "Maximum update depth exceeded"

**Cause:** Infinite render loop, usually from useEffect.

**Solution:**

Check useEffect dependencies:

```typescript
// ❌ Wrong (infinite loop)
useEffect(() => {
  setCount(count + 1)
}) // No deps = runs every render

// ✅ Correct
useEffect(() => {
  setCount(count + 1)
}, []) // Empty deps = runs once
```

---

## 🆘 Still Stuck?

### Debugging Checklist:

1. **Check the docs:**
   - `00-START-HERE.md` → Navigation
   - Relevant guide for your issue
   - `04-DECISIONS-LOG.md` → Why things work this way

2. **Check old portfolio audits:**
   - Was this a problem before?
   - `Documentation/CODEBASE_STRATEGIC_REVIEW.md`

3. **Run validation:**

   ```bash
   npm run lint          # Check code quality
   npm run type-check    # Check TypeScript
   npm run test          # Run tests
   npm run build         # Test production build
   ```

4. **Clear cache:**

   ```bash
   rm -rf .next
   rm -rf node_modules/.cache
   npm run dev
   ```

5. **Check browser console:**
   - Look for errors
   - Check network tab for failed requests
   - Verify localStorage values

6. **Test in incognito:**
   - Rules out extension conflicts
   - Fresh localStorage
   - No cached data

### Still Can't Fix It?

1. **Document the issue:**
   - What were you trying to do?
   - What happened instead?
   - Error messages (full stack trace)
   - Steps to reproduce

2. **Check similar issues:**
   - Search old portfolio audits
   - Check this troubleshooting guide
   - Google the exact error message

3. **Ask for help:**
   - Provide context (what you tried)
   - Share relevant code
   - Include error messages

---

## 📝 Contributing to This Guide

Found a solution to a problem? Add it here!

**Template:**

```markdown
### ❌ [Problem Title]

**Symptoms:**

- What the user sees

**Cause:** Why it happens

**Solution:**

1. Step-by-step fix
2. With code examples

**Reference:** See [relevant doc]
```

---

**Remember:** Most of these issues were problems in the old portfolio (32/100 grade). We've already prevented them with proper architecture. This guide helps you understand WHY things work the way they do and how to debug when something goes wrong.

**Happy building! 🚀**
