# Project Setup Guide - Portfolio Best Practices

> **Purpose**: Concise guide for setting up a professional portfolio with industry standards
>
> **For**: Non-technical founders working with AI to build their portfolio
>
> **Goal**: Understand WHAT to implement and WHY it matters (AI handles HOW)

---

## 📘 How to Use This Guide

When working with AI, reference specific sections:
- *"Follow the Security Setup from project_setup_guide.md"*
- *"Implement the Naming Conventions from project_setup_guide.md Section 3"*

Each section explains the benefit, the cost of skipping, and what to ask AI to implement.

---

## Part 1: Foundation Setup (Do These First)

### 1.1 Project Initialization

**What to implement:**
- Next.js 15 + TypeScript + Tailwind CSS
- Git version control
- Testing framework (Vitest)
- ESLint + Prettier for code quality

**Why it matters:**
- TypeScript catches bugs before users see them
- Git lets you undo mistakes and deploy safely
- Tests prevent breaking things when making changes
- Linters keep code clean and maintainable

**Cost of skipping:** Bugs reach production, can't deploy, code becomes unmaintainable

**Tell AI:** *"Initialize a Next.js 15 project with TypeScript, Tailwind, Git, and Vitest testing setup"*

---

### 1.2 Security Setup (CRITICAL)

**What to implement:**
- Environment variables for ALL secrets
- `.env.local` for local secrets (NEVER commit)
- `.env.example` for structure (safe to commit)
- Type-safe env validation with Zod

**Why it matters:**
Your current site has `password = 'Anayak@2901'` visible in code. Anyone on GitHub can see it. In 2021, a developer's hardcoded AWS keys cost them $50,000 in 5 minutes.

**What goes in environment variables:**
- Passwords
- API keys (Google, Supabase, Stripe, etc.)
- Database URLs
- Any secret information

**Cost of skipping:** Credentials stolen, API abuse costing thousands, can't get hired (employers see hardcoded secrets = instant rejection)

**Tell AI:** *"Set up environment variables for [list your secrets] following security best practices"*

---

### 1.3 Error Handling

**What to implement:**
- React Error Boundaries for all risky components
- Custom 404 page
- Custom error pages
- Fallback UI when things break

**Why it matters:**
Without error boundaries: One tiny bug = entire site shows blank white screen = user leaves forever

With error boundaries: Bug in one component = rest of site still works = professional handling

**Cost of skipping:** "White screen of death", lost users, looks broken/unprofessional

**Tell AI:** *"Create error boundaries for [list your Three.js/animation components]"*

---

### 1.4 SEO & Metadata (CRITICAL)

**What to implement:**
- Viewport meta tag (YOU'RE MISSING THIS - mobile is broken!)
- Open Graph tags (social media previews)
- Twitter Card metadata
- sitemap.xml (auto-generated)
- robots.txt
- Structured data (Schema.org JSON-LD)

**Why it matters:**
- No viewport meta = mobile site broken = lose 60% of visitors
- No sitemap = Google can't find your pages
- No Open Graph = ugly links when sharing on LinkedIn/Twitter
- No structured data = Google doesn't understand your content

**Real example:** One developer fixed SEO, went from 50 to 5,000 monthly visitors.

**Cost of skipping:** Invisible on Google, mobile broken, can't get hired (recruiters can't find you)

**Tell AI:** *"Implement complete SEO metadata including viewport, Open Graph, sitemap, and robots.txt"*

---

### 1.5 Performance Optimization

**What to implement:**
- Code splitting (lazy load heavy components)
- Image optimization (WebP/AVIF formats)
- Video compression (your 138MB videos need this!)
- Lazy loading for images/videos
- Font optimization

**Why it matters:**
- Your Three.js (260KB) loads on EVERY page even when not used
- Your videos are 138MB uncompressed
- Slow sites = users leave = bad Google ranking

**Target: Site loads in under 2 seconds**

**Cost of skipping:** Slow site, high bounce rate, poor Google ranking, wasted bandwidth

**Tell AI:** *"Implement code splitting for Three.js components and compress all videos to under 5MB each"*

---

### 1.6 Rate Limiting & Security

**What to implement:**
- API route rate limiting (25 requests/minute per IP)
- Security headers (CSP, X-Frame-Options)
- Input validation on all forms
- CORS configuration

**Why it matters:**
Without rate limiting: Attacker sends 1 million requests → site crashes or $5,000+ hosting bill

**Cost of skipping:** DDoS attacks, huge bills, site downtime, spam submissions

**Tell AI:** *"Add rate limiting to all API routes with 10 requests per minute per IP"*

---

## Part 2: Design System & Consistency

### 2.1 Design Tokens (Prevents Your 23,000-Line Component Problem!)

**What to implement:**
Create one central file with:
- Color palette (light + dark mode)
- Typography scale (font sizes, weights)
- Spacing scale (consistent margins/padding)
- Border radius values
- Shadow definitions
- Z-index scale
- Transition timings

**Why it matters:**
Your current site has 4 styling approaches (Tailwind + CSS + SCSS + inline) = 23,390-line component!

**Without design tokens:**

**With design tokens:**

**Benefits:**
- Change theme in seconds (change one value, entire site updates)
- Dark mode = just swap token values
- Consistent professional look
- Easy to match Figma designs

**Cost of skipping:** Inconsistent colors/spacing, impossible to rebrand, no dark mode, looks unprofessional

**Tell AI:** *"Create a design token system with colors, typography, spacing, and shadows"*

---

### 2.2 Component Architecture Rules

**Critical rules:**
1. **Maximum 300 lines per component** (you have 23,390-line components!)
2. **One component = one responsibility**
3. **Extract logic to custom hooks**
4. **Reusable components in `/components/ui/`**
5. **Page-specific components in `/components/[page-name]/`**

**Why 300 lines max:**
- Human brain can't understand giant files
- Easy to debug small files
- Reusable in other projects
- Faster to load

**Your current issue:** HoverTextBox.tsx = 23,390 lines (should be 80 separate components!)

**Tell AI:** *"Refactor [ComponentName] to be under 300 lines by extracting logic and splitting into sub-components"*

---

### 2.3 Folder Structure & Naming

**Standard structure:**

**Naming conventions (STRICT):**
- **Components:** `PascalCase.tsx` (Button.tsx, UserProfile.tsx)
- **Hooks:** `camelCase.ts` starting with "use" (useLocalStorage.ts)
- **Utils:** `camelCase.ts` (formatDate.ts, calculateTotal.ts)
- **Files/folders:** `kebab-case` (user-profile/, api-client.ts)
- **Constants:** `UPPER_SNAKE_CASE.ts` (API_ENDPOINTS.ts)

**Why these rules:**
- Consistency = easier to find files
- Case-sensitive servers (Linux) = broken builds if inconsistent
- Industry standard = other developers understand

**Your current issue:** Mixed naming (useIsVisible, use_progress, useScrolltoView) = confusing

**Tell AI:** *"Standardize all naming to follow conventions: PascalCase for components, camelCase for hooks starting with 'use'"*

---

## Part 3: Animation Standards

**Primary Library:** Framer Motion
**Backup:** GSAP (for complex timeline-based animations if needed)

### 3.1 Performance Targets

**Rule: 60 FPS (16.7ms per frame) = smooth animations**

**What to animate:**
✅ **FAST (GPU-accelerated):**
- `transform` (translate, scale, rotate)
- `opacity`

❌ **SLOW (avoid):**
- `width`, `height` (triggers layout)
- `top`, `left` (triggers layout)
- `background` (triggers paint)
- `box-shadow` (triggers paint)

**Why:** Animating layout/paint properties = janky 20 FPS = looks unprofessional

---

### 3.2 Animation Best Practices

**Implement:**
1. **Use CSS transforms over position changes**
2. **Use `will-change` for heavy animations** (but sparingly!)
3. **Use `requestAnimationFrame` for JS animations**
4. **Reduce motion for accessibility** (`prefers-reduced-motion`)
5. **Test on low-end devices** (not just MacBook Pro)

**GSAP-specific rules:**
- Wrap in ErrorBoundary
- Use `'use client'` directive (Next.js)
- Clean up with `gsap.context()` to prevent memory leaks
- Lazy load GSAP (don't load on every page)

**Animation timing standards:**
- **Fast:** 150ms (hover effects)
- **Normal:** 250ms (transitions)
- **Slow:** 350ms (page transitions)
- **Never:** >500ms (feels broken)

**Tell AI:** *"Optimize animations to use transform and opacity only, targeting 60 FPS"*

---

### 3.3 Scroll Animations

**Best practices:**
- Use Intersection Observer (not scroll events)
- Fade in as elements enter viewport
- Stagger animations for lists (100ms delay between items)
- Don't animate everything (reduces impact)
- Disable on mobile if performance suffers

**Tell AI:** *"Implement scroll-triggered fade-in animations using Intersection Observer with 100ms stagger"*

---

## Part 4: Responsive Design

### 4.1 Mobile-First Approach (CRITICAL)

**Rule: Start with mobile, enhance for desktop**

70% of web traffic = mobile devices. Your missing viewport meta tag = mobile site broken = losing majority of visitors.

**Breakpoints for 2025:**

**Why mobile-first:**
- Forces focus on essentials
- Smaller initial payload = faster
- Progressive enhancement = better UX

**Tell AI:** *"Refactor styles to mobile-first using min-width media queries"*

---

### 4.2 Responsive Design Checklist

**Test on:**
- [ ] iPhone SE (320px width - smallest)
- [ ] iPhone 14 Pro (393px)
- [ ] iPad (768px)
- [ ] MacBook Air (1280px)
- [ ] Desktop (1920px)

**Common responsive issues:**
- Text too small on mobile
- Images don't scale
- Buttons too close (can't tap)
- Horizontal scroll on mobile
- Menu doesn't work on touch

**Tell AI:** *"Make [component] responsive from 320px to 1920px width, test on all breakpoints"*

---

### 4.3 Touch-Friendly Design

**Mobile requirements:**
- Minimum tap target: **44×44px** (Apple) or **48×48px** (Android)
- Space between taps: **8px minimum**
- No hover-only interactions (doesn't work on touch)
- Swipe gestures for carousels
- Large, easy-to-tap buttons

**Tell AI:** *"Make all interactive elements at least 44px tall with 8px spacing for touch accessibility"*

---

## Part 5: DOM Structure & Semantic HTML

### 5.1 Semantic HTML (You're Missing This!)

**Your current problem:** Everything is `<div>`. Should use semantic tags.

**Proper structure:**

**Why it matters:**
- **SEO:** Google understands page structure
- **Accessibility:** Screen readers navigate by landmarks
- **Maintainability:** Clear semantic meaning
- **Professional:** Industry standard

**Cost of skipping:** Poor SEO, fails accessibility audits, unprofessional code

**Tell AI:** *"Replace divs with semantic HTML: header, nav, main, section, article, footer with proper ARIA labels"*

---

### 5.2 Accessibility (A11y) Standards

**WCAG 2.2 Level AA compliance (industry standard):**

**Must implement:**
- `alt` text for ALL images
- ARIA labels for buttons/links without text
- Keyboard navigation (Tab, Enter, Space, Escape)
- Focus indicators (visible outline)
- Color contrast ratio: 4.5:1 minimum
- Skip-to-content link
- No auto-playing videos/audio

**Test with:**
- Keyboard only (no mouse)
- Screen reader (Mac VoiceOver, NVDA)
- Browser extensions (axe DevTools, Lighthouse)

**Cost of skipping:** Fails audits, excludes disabled users, legal risk (ADA lawsuits), can't get hired

**Tell AI:** *"Audit accessibility and fix WCAG 2.2 AA violations: alt text, ARIA labels, keyboard nav, color contrast"*

---

### 5.3 Form Best Practices

**Every form must have:**
- Clear labels (not placeholder-only)
- Validation with helpful error messages
- Success states
- Loading states (disable submit during processing)
- Rate limiting (prevent spam)
- CSRF protection

**Tell AI:** *"Create contact form with validation, error messages, loading state, and rate limiting"*

---

## Part 6: Content Strategy

### 6.3 Image Optimization

**Requirements:**
- Format: WebP or AVIF (not PNG/JPG)
- Sizes: Multiple resolutions for responsive
- Lazy loading: Load when entering viewport
- Alt text: Descriptive for accessibility
- Compression: 80-85% quality (invisible loss)

**Your issue:** Images probably not optimized, videos definitely not (138MB!)

**Tell AI:** *"Convert all images to WebP format, create responsive sizes, add lazy loading and descriptive alt text"*

---

## Part 7: Testing Strategy

### 7.1 What to Test

**Essential tests:**
1. **Unit tests** - Individual components work
2. **Integration tests** - Components work together
3. **E2E tests** - User flows work (Playwright/Cypress)
4. **Visual regression** - Design doesn't break
5. **Accessibility tests** - axe-core automated checks

**Coverage target: 80% minimum**

Your current coverage: **0%** (you have zero tests!)

---

### 7.2 When to Test

**Write tests WHILE coding, not after:**
- Write test for feature
- Write code to pass test
- Refactor with confidence

**Cost of skipping:** Every change is scary ("did I break something?"), bugs reach users, can't refactor safely

**Tell AI:** *"Write unit tests for [ComponentName] covering props, events, and edge cases"*

---

## Part 8: Deployment & Monitoring

### 8.1 Pre-Deployment Checklist

**Before going live:**
- [ ] All tests pass
- [ ] Lighthouse score: 90+ on all metrics
- [ ] Mobile works (test on real device)
- [ ] SEO meta tags complete
- [ ] Environment variables in hosting platform
- [ ] Analytics configured (Google Analytics, Plausible)
- [ ] Error tracking (Sentry, LogRocket)
- [ ] Forms work and send emails
- [ ] Custom domain connected
- [ ] SSL certificate active (HTTPS)

---

### 8.2 Performance Budgets

**Target metrics (Core Web Vitals):**
- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1
- **FCP (First Contentful Paint):** < 1.8s
- **TTI (Time to Interactive):** < 3.8s

**If you miss these:** Google ranks you lower = fewer visitors

**Tell AI:** *"Run Lighthouse audit and fix issues to achieve 90+ scores on Performance, SEO, Accessibility, Best Practices"*

---

### 8.3 Ongoing Maintenance

**Monthly tasks:**
- Update dependencies
- Check for security vulnerabilities (`npm audit`)
- Review analytics (what pages get traffic?)
- Test forms still work
- Check mobile rendering

**Quarterly tasks:**
- Update portfolio with new projects
- Refresh content (dates, job titles)
- Audit performance
- Review and improve SEO

---

## Part 9: Common Mistakes to Avoid

### ❌ What NOT To Do

1. **Hardcode secrets** (your password is visible right now!)
2. **Skip mobile testing** (60% of traffic!)
3. **Use all divs** (use semantic HTML)
4. **Create giant components** (your 23,000-line component!)
5. **Load everything upfront** (use code splitting)
6. **Forget accessibility** (screen readers, keyboard nav)
7. **Skip error handling** (white screen of death)
8. **Ignore SEO** (no viewport meta = mobile broken)
9. **No rate limiting** (open to DDoS attacks)
10. **Uncompressed videos** (your 138MB issue!)
11. **Mix styling approaches** (pick one: Tailwind + design tokens)
12. **No tests** (current state: 0% coverage)
13. **Inconsistent naming** (your useIsVisible vs use_progress)
14. **Skip Git commits** (lose work, can't undo)

---

## Part 10: Quick Reference - Implementation Priorities

### Week 1: Critical Fixes (Must Do Immediately)

1. **Move credentials to .env.local** (your password is exposed!)
2. **Add viewport meta tag** (mobile is broken!)
3. **Add error boundaries** (prevent white screens)
4. **Set up rate limiting** (prevent attacks)
5. **Create sitemap.xml** (help Google find pages)
6. **Compress videos** (138MB → ~25MB)

**Tell AI:** *"Implement Week 1 critical fixes from project_setup_guide.md"*

---

### Week 2: Foundation & Standards

1. Create design token system
2. Set up testing framework
3. Implement semantic HTML
4. Fix accessibility violations
5. Standardize naming conventions
6. Add code splitting for Three.js

**Tell AI:** *"Implement Week 2 foundation and standards from project_setup_guide.md"*

---

### Week 3: Optimization & Polish

1. Lazy load heavy components
2. Optimize all images to WebP
3. Implement scroll animations
4. Make fully responsive (320px - 1920px)
5. Add loading skeletons
6. Achieve 90+ Lighthouse scores

**Tell AI:** *"Implement Week 3 optimizations from project_setup_guide.md"*

---

## Summary: The Foundation of Success

**Your site currently has:**
- ❌ Hardcoded password (security disaster)
- ❌ Missing viewport meta (mobile broken)
- ❌ 23,390-line component (unmaintainable)
- ❌ 138MB uncompressed videos (slow loading)
- ❌ Zero tests (risky to change anything)
- ❌ No rate limiting (vulnerable to attacks)
- ❌ All divs (poor SEO, accessibility)
- ❌ No error boundaries (white screen of death)

**After implementing this guide:**
- ✅ Secure (secrets hidden)
- ✅ Mobile-first responsive
- ✅ Maintainable (max 300 line components)
- ✅ Fast (<2s load time)
- ✅ Tested (80%+ coverage)
- ✅ Protected (rate limiting)
- ✅ Semantic HTML (good SEO)
- ✅ Resilient (graceful errors)
- ✅ Accessible (WCAG 2.2 AA)
- ✅ Professional (industry standards)

---

## How to Use This With AI

**Starting from scratch:**

**Fixing existing site:**

**Adding features:**

---

**Remember:** You don't need to understand the code. You need to understand:
1. **What** each practice accomplishes
2. **Why** it's important for your portfolio
3. **What breaks** if you skip it

Let AI handle the implementation. You make the decisions.

---

**Last Updated:** 2025-10-23
**Version:** 2.0
**Status:** Production Guide

---


---
# Project Setup Instructions for AI-Assisted Development

> **Purpose**: Step-by-step instructions for rebuilding the portfolio from scratch with best practices baked in from day 1.
>
> **Audience**: AI assistants (Claude, GPT, etc.) helping with development
>
> **Goal**: Set up a scalable, maintainable, production-ready Next.js portfolio

---

## 📘 Understanding This Document (Read This First!)

### What is this document?
This is like a recipe book for AI assistants to help you build your portfolio website the RIGHT way from the start. Each step includes:
1. **What to do** - The technical instructions for AI
2. **Why it matters** - Plain English explanation of the benefits
3. **What happens if you skip it** - The problems you'll face later

### Who is this for?
- **You** (to understand what's being built and why)
- **AI assistants** (to execute the technical steps correctly)

### How to use it:
When working with AI, simply say: *"Follow Step X from project_setup_instructions.md"* and the AI will know exactly what to do. Read the "Why this matters" sections to understand the value.

---

## 🎯 Project Initialization

### Step 1: Create Next.js Project with Correct Configuration

**Configuration choices**:
- ✅ TypeScript: Yes
- ✅ ESLint: Yes
- ✅ Tailwind CSS: Yes
- ✅ `src/` directory: Yes
- ✅ App Router: Yes
- ✅ Import alias (@/*): Yes
- ❌ Turbopack: No (use default Webpack for stability)

**🎓 Why this matters:**
- **TypeScript** = Catches typos and mistakes before your site goes live (like spell-check for code)
- **ESLint** = Auto-detects bad coding patterns (like grammar-check for code)
- **Tailwind CSS** = Write styles faster without messy CSS files
- **src/ directory** = Keeps your code organized in one place
- **App Router** = Modern Next.js way of building pages (faster, better SEO)
- **Import alias (@/*)** = Makes file imports cleaner: `@/components/Button` instead of `../../../components/Button`

**❌ What happens if you skip this:**
- No TypeScript = Bugs slip through, hard to maintain
- No ESLint = Messy code that's hard to read and debug
- No organization = Files scattered everywhere, impossible to find things

### Step 2: Initialize Git and Set Up Version Control

**🎓 Why this matters:**
Git is like a "time machine" for your code. It saves every version so you can:
- **Undo mistakes** = Made a change that broke everything? Go back in time
- **Track changes** = See exactly what changed and when
- **Collaborate** = Work with others without overwriting each other's work
- **Deploy safely** = Platforms like Vercel use Git to deploy your site

**❌ What happens if you skip this:**
- No backups = Accidentally delete something? It's gone forever
- No history = Can't remember what worked before? Too bad
- Can't deploy = Most hosting platforms require Git
- No collaboration = Can't work with others or get help

**Critical**: Create `.gitignore` additions:

---

## 📦 Install Core Dependencies (Day 1)

### Step 3: Install Testing Framework First

**🎓 Why this matters:**
Tests are like quality control for your website. They automatically check if things work correctly:
- **Catch bugs early** = Find problems before users do
- **Confidence to change code** = Know immediately if you broke something
- **Documentation** = Tests show how components should work
- **Professional standard** = All serious projects have tests

Think of it like this: Would you trust a bridge built without safety inspections? Same idea with code.

**❌ What happens if you skip this:**
- Every change is scary = "Did I break something?"
- Manual testing = Clicking through every feature after every change (hours of work)
- Bugs reach users = Embarrassing, unprofessional
- Hard to get hired = Employers expect to see tests in portfolios

**Why first?**: If you add tests later, you'll never do it. Start with them from Day 1.

**Create `vitest.config.ts`**:

**Create `src/test/setup.ts`**:

**Add to `package.json` scripts**:

### Step 4: Install Animation Libraries

### Step 5: Install UI/UX Libraries

### Step 6: Install Backend/Data Libraries (if needed)

---

## 🏗️ Project Structure Setup

### Step 7: Create Scalable Folder Structure

**Final structure**:

---

## 🎨 Design System Setup (Critical)

### Step 8: Create Design Token System

**🎓 Why this matters:**
Design tokens are like a "style guide" for your entire website. Instead of hardcoding colors and sizes everywhere, you define them once:

**Without design tokens:**

**With design tokens:**

**Benefits:**
- **Consistency** = Your site looks professional, not random
- **Easy theme changes** = Change one value, update entire site
- **Dark mode** = Just swap the token values
- **Faster development** = No guessing colors/sizes
- **Designer-friendly** = Matches Figma design systems

**❌ What happens if you skip this:**
- Inconsistent colors/spacing = Looks unprofessional
- Hard to rebrand = Find and replace in 100 files
- No dark mode = Would need to rewrite everything
- Designers hate you = Can't match design specs

**Real example from your current site:** You have 4 different styling approaches (Tailwind, CSS, SCSS, inline). This creates a 23,000-line component! Design tokens prevent this.

**Create `src/styles/design-tokens.css`**:

**Create `src/lib/utils/cn.ts`** (for className merging):

**Update `src/app/globals.css`**:

**Update `tailwind.config.ts`** to use design tokens:

---

## 🔒 Security & Environment Setup

### Step 9: Create Environment Variables Structure

**🎓 Why this matters:**
Environment variables are SECRET values that should NEVER be in your code:

**The problem with your current site:**
You have a hardcoded password `'Anayak@2901'` visible in `AdminContext.tsx:22`. Anyone can see it on GitHub!

**How environment variables work:**

**What goes in environment variables:**
- Passwords
- API keys (Google, Supabase, etc.)
- Database URLs
- Any secret information

**How it protects you:**
- **Secrets stay secret** = Not on GitHub for hackers
- **Different values per environment** = Test passwords locally, real passwords in production
- **Easy to rotate** = Change password without changing code

**❌ What happens if you skip this:**
- **Credentials stolen** = Hackers get your admin password, API keys
- **Can't get hired** = Employers see hardcoded secrets = instant rejection
- **Expensive** = Someone steals your API keys, racks up $1000s in charges
- **Embarrassing** = Your password is on the internet forever

**Real example:** In 2021, a developer hardcoded AWS keys on GitHub. Hackers found them in 5 minutes and charged $50,000 to his credit card. This is serious.

**Create `.env.example`** (commit this):

**Create `.env.local`** (never commit this):

**Create `src/lib/env.ts`** (type-safe environment variables):

**Usage in code**:

---

## 🛡️ Error Handling Setup

### Step 10: Create Global Error Boundary

**🎓 Why this matters:**
Error boundaries prevent the "white screen of death". Here's what happens without them:

**Without error boundaries:**
1. User visits your site
2. One component has a small bug
3. **Entire site crashes** = Blank white screen
4. User thinks your site is broken
5. User leaves, never comes back

**With error boundaries:**
1. User visits your site
2. One component has a small bug
3. **Only that component shows error message** = Rest of site still works
4. User can still navigate and use other features
5. You get notified about the error

**Real example from your site:**
Your HomeBlobs component uses Three.js. If Three.js fails to load (slow internet, old browser), your entire homepage crashes. With error boundaries, you'd show a fallback and the rest of the page works.

**Benefits:**
- **Better user experience** = Site doesn't completely break
- **Professional** = Graceful error handling, not crashes
- **Debugging** = See exactly which component failed
- **Trust** = Users trust sites that handle errors well

**❌ What happens if you skip this:**
- One tiny bug = Entire site unusable
- Looks broken = Users think you're incompetent
- No error info = Can't figure out what went wrong
- Lost users = They leave and don't come back

**Create `src/components/ErrorBoundary.tsx`**:

**Create `src/app/error.tsx`** (Next.js error handler):

**Create `src/app/not-found.tsx`**:

---

## 🔍 SEO & Metadata Setup

### Step 11: Configure Complete SEO Metadata

**🎓 Why this matters:**
SEO (Search Engine Optimization) is how people find your site on Google. Without it, you're invisible.

**The problem with your current site:**
Missing viewport meta tag = Your site doesn't work on mobile = Google won't show it in mobile search results = You lose 60% of potential visitors.

**What SEO does:**
- **Google finds you** = Shows your site in search results
- **Social media previews** = Nice image/description when sharing on Twitter, LinkedIn
- **Mobile works** = Site displays correctly on phones
- **Professional** = Shows you know what you're doing

**What each part does:**
- **Viewport meta** = Makes mobile work (CRITICAL - you're missing this!)
- **Open Graph** = Pretty preview when sharing on social media
- **Title/Description** = What Google shows in search results
- **Sitemap** = Tells Google all your pages
- **Robots.txt** = Tells Google what to index

**❌ What happens if you skip this:**
- **Invisible on Google** = No one finds your portfolio
- **Mobile broken** = 60% of traffic bounces immediately
- **Unprofessional** = Sharing link shows ugly plain text
- **Can't get hired** = Recruiters can't find you
- **Lost opportunities** = Your great work, hidden from the world

**Example:** A developer fixed their SEO and went from 50 monthly visitors to 5,000. Your portfolio is worthless if no one sees it.

**Update `src/app/layout.tsx`**:

**Create `src/app/sitemap.ts`**:

**Create `src/app/robots.ts`**:

---

## 🚦 API Rate Limiting Setup

### Step 12: Create Rate Limiting Middleware

**🎓 Why this matters:**
Rate limiting prevents attacks and abuse. Without it, bad actors can destroy your site.

**What is a DDoS attack?**
Someone sends millions of requests to your site in seconds, trying to crash it or rack up huge hosting bills.

**Real scenarios:**
1. **Hacker sends 1 million requests/second** → Your site crashes → You're offline
2. **Bot spams your contact form** → 10,000 emails → Your email provider bans you
3. **Competitor attacks your API** → $5,000 hosting bill → You go bankrupt

**How rate limiting protects you:**

**Benefits:**
- **Protection from attacks** = Bots and hackers can't take you down
- **Cost control** = Won't get surprise $1000s hosting bills
- **Fair usage** = Legitimate users get good performance
- **Professional** = All production sites have this

**❌ What happens if you skip this:**
- **Easy target** = Hackers can crash your site anytime
- **Expensive** = One attack = hundreds/thousands in costs
- **Downtime** = Site goes offline during attack
- **Reputation damage** = "That site is always down"

**Your current site:** Zero rate limiting. Your API routes are wide open to abuse right now.

**Create `src/lib/rate-limit.ts`**:

**Example usage in API route**:

---

## 📏 Code Quality & Linting Setup

### Step 13: Configure ESLint and Prettier

**Install Prettier**:

**Create `.prettierrc`**:

**Create `.prettierignore`**:

**Update `.eslintrc.json`**:

**Add to `package.json` scripts**:

### Step 14: Set Up Pre-commit Hooks (Optional but Recommended)

**Create `.husky/pre-commit`**:

**Add to `package.json`**:

---

## 🎭 Component Development Rules

### Step 15: Component Architecture Guidelines

**🎓 Why this matters:**
Large files are impossible to maintain. It's like having one giant messy room vs organized closets.

**The problem with your current site:**
- `HoverTextBox.tsx` = **23,390 lines** (should be max 300)
- `Logo.tsx` = **13,166 lines** (should be max 300)

These files are 30-40x larger than professional standards! This is like writing a book where every chapter is 500 pages long.

**Why 300 lines max?**
- **Human brain limits** = Can't understand huge files
- **Easy to find bugs** = Small files = quick to scan
- **Reusable** = Small components can be used elsewhere
- **Team-friendly** = Others can understand your code
- **Faster to load** = Code splitting works better

**Example:**

**❌ What happens if you skip this:**
- **Can't maintain** = Make one change, break 10 things
- **Can't hire help** = No one understands your code
- **Can't reuse** = Write same thing 5 times
- **Slow performance** = Browser loads huge files

**Rule 1: Maximum Component Size = 300 Lines**

If a component exceeds 300 lines:
1. Extract logic to custom hooks
2. Split into smaller sub-components
3. Move constants/types to separate files

**Rule 2: File Naming Conventions (Strict)**

**Rule 3: Component Template**

**Create `src/components/ui/Button.tsx`** (example):

**Create `src/components/ui/Button.test.tsx`**:

**Rule 4: Custom Hook Template**

**Create `src/hooks/useLocalStorage.ts`** (example):

**Create `src/hooks/useLocalStorage.test.ts`**:

---

## 🎨 Asset Management Setup

### Step 16: Create Centralized Asset Registry

**Create `src/data/assets.ts`**:

**Rule**: Never hardcode asset paths. Always use the registry.

❌ **Bad**:

✅ **Good**:

---

## 🖼️ Image Optimization Setup

### Step 17: Create OptimizedImage Component

**Create `src/components/ui/OptimizedImage.tsx`**:

### Step 18: Set Up Image Conversion Scripts

**Create `scripts/convert-images.js`**:

**Install sharp**:

**Add to `package.json` scripts**:

---

## 📱 Responsive Design Setup

### Step 19: Create Responsive Breakpoint Hook

**Create `src/hooks/useBreakpoint.ts`**:

**Usage**:

---

## 🎬 Animation Setup (GSAP)

### Step 20: Create GSAP Animation Utilities

**Create `src/lib/animations/gsap-utils.ts`**:

**Create `src/components/animations/FadeIn.tsx`** (example):

**Rule**: Always wrap GSAP-dependent components in ErrorBoundary and use `'use client'` directive.

---

## 🚀 Performance Optimization Setup

### Step 21: Configure Code Splitting

**🎓 Why this matters:**
Code splitting = Loading only what you need, when you need it. It's like streaming vs downloading.

**Analogy:**
- **Without code splitting** = Download entire Netflix before watching anything
- **With code splitting** = Stream only the movie you're watching

**The problem with your current site:**
Your Three.js library (260KB) loads on EVERY page, even pages that don't use it. That's like carrying a toolbox everywhere even when you just need a pen.

**How it works:**

**Benefits:**
- **Faster initial load** = Site appears in 1 second instead of 5
- **Better performance** = Only load what's needed
- **Better user experience** = No waiting for unused features
- **Better Core Web Vitals** = Google ranks you higher

**Real numbers:**
- Current: 260KB loaded on every page
- With code splitting: 0KB on most pages, 260KB only where needed
- **Savings: 260KB × 100 page views = 26MB saved** (faster site, lower costs)

**❌ What happens if you skip this:**
- **Slow loading** = Users leave before site loads
- **Bad Google ranking** = Google penalizes slow sites
- **Wasted bandwidth** = Loading stuff you don't use
- **Poor mobile experience** = Especially bad on slow connections

**Your site's issue:** HomeBlobs loads Three.js everywhere. Should only load on homepage.

**Create `src/components/LazyLoad.tsx`**:

**Usage example**:

### Step 22: Create Video Optimization Script

**Create `scripts/compress-videos.sh`**:

**Make executable**:

**Add to `package.json`**:

---

## 🧪 Testing Strategy

### Step 23: Create Test Utilities

**Create `src/test/test-utils.tsx`**:

**Create `src/test/mocks/intersection-observer.ts`**:

**Update `src/test/setup.ts`**:

---

## 📋 Development Checklist Template

### Step 24: Create Component Development Checklist

---

## 🎯 AI Prompt Templates

### Step 25: Effective Prompts for AI Assistance

**When asking AI to create a component**:

**When asking AI to refactor code**:

**When asking AI to fix bugs**:

---

## 🚀 Deployment Checklist

### Step 26: Pre-Deployment Verification

**Before deploying to production**:

**Deployment environment variables checklist**:

---

## 📖 Documentation Structure

### Step 27: Create Project Documentation

**Create `README.md`**:

**Create `ARCHITECTURE.md`**:

---

## ✅ Final Checklist

### Step 28: Verify Everything is Set Up

---

## 🎓 Key Principles for AI-Assisted Development

### Golden Rules When Working with AI:

1. **Be Specific**: Give exact requirements, constraints, and examples
2. **Safety First**: Ask AI to show plan before making changes
3. **Verify Everything**: Don't trust AI blindly - review all code
4. **Test Continuously**: Run tests after every change
5. **Document Intent**: Explain WHY, not just WHAT
6. **Iterate Slowly**: Small changes → test → next change
7. **Use Checklists**: Ensure nothing is missed
8. **Review Diffs**: Always review what changed before committing
9. **Ask Questions**: If unclear, ask AI to explain
10. **Maintain Context**: Reference existing patterns and files

---

## 🚨 Common Pitfalls to Avoid

### Never Do This:

1. ❌ Hardcode secrets in code
2. ❌ Skip writing tests "for now"
3. ❌ Let components grow past 300 lines
4. ❌ Mix multiple styling approaches
5. ❌ Use `any` type frequently
6. ❌ Commit without running lint/test
7. ❌ Deploy without testing build
8. ❌ Ignore accessibility
9. ❌ Skip error handling
10. ❌ Leave TODO comments without tickets

### Always Do This:

1. ✅ Use environment variables for secrets
2. ✅ Write tests alongside features
3. ✅ Refactor when components get large
4. ✅ Stick to one styling approach (Tailwind + CSS vars)
5. ✅ Use strict TypeScript types
6. ✅ Run pre-commit checks
7. ✅ Test production build locally
8. ✅ Include ARIA labels and semantic HTML
9. ✅ Wrap risky code in error boundaries
10. ✅ Create tickets for TODOs

---

## 📚 Resources

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [React 19 Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [GSAP Documentation](https://greensock.com/docs/)
- [Vitest Documentation](https://vitest.dev/)

---

**Last Updated**: 2025-10-20
**Version**: 1.0.0
**Status**: Production-Ready Template

---

## 📚 Summary: Why Each Step Matters (Quick Reference)

| Step | What It Does | Why You Need It | Cost of Skipping |
|------|--------------|-----------------|------------------|
| **TypeScript** | Catches errors before they reach users | Prevents bugs, makes code maintainable | Bugs in production, hard to maintain |
| **Git** | Version control and backup | Undo mistakes, collaborate, deploy | Lose all work if something breaks |
| **Tests** | Automatically verify code works | Catch bugs early, confidence to change | Manual testing, bugs reach users |
| **Design Tokens** | Centralized styling system | Consistency, easy theming, professional look | Inconsistent design, hard to maintain |
| **Environment Variables** | Hide secrets from public | Security, different values per environment | **Credentials stolen, expensive attacks** |
| **Error Boundaries** | Prevent full site crashes | Better UX, professional error handling | White screen of death, lost users |
| **SEO Metadata** | Make Google find you | Traffic, mobile support, social previews | **Invisible on Google, mobile broken** |
| **Rate Limiting** | Protect from attacks | Prevent crashes, control costs | **Easy DDoS target, huge bills** |
| **Component Size Limits** | Keep files manageable | Maintainable, reusable, debuggable | 23,000-line files (your current issue!) |
| **Code Splitting** | Load only what's needed | Fast loading, better performance | Slow site, poor Google ranking |
| **Image/Video Optimization** | Compress media | Fast loading, lower bandwidth costs | **138MB videos (your current issue!)** |

### 🎯 The Three Most Critical Steps (Do These First!)

1. **Environment Variables (Step 9)** - Your password is currently visible on GitHub. Fix this IMMEDIATELY.
2. **SEO Metadata (Step 11)** - Your mobile site is currently broken. You're losing 60% of potential visitors.
3. **Error Boundaries (Step 10)** - One small bug currently crashes your entire site. Users see blank screens.

### 💡 Key Takeaway

Think of this document as a **checklist for building a house**:
- You COULD skip the foundation and just build walls... but the house would collapse.
- You COULD skip electrical wiring... but you'd have no power.
- You COULD skip plumbing... but you'd have no water.

**Same with your website:**
- Skip environment variables = **Security disaster**
- Skip SEO = **No one finds you**
- Skip tests = **Everything breaks when you make changes**
- Skip component limits = **23,000-line files (you have this now!)**

### 🚀 How to Use This Document

**When starting from scratch:**

**When fixing your current site:**

**When adding a new feature:**

### 🤝 Remember

You don't need to understand all the code. You just need to understand:
1. **What** each step accomplishes
2. **Why** it's important
3. **What breaks** if you skip it

The AI will handle the technical details. You focus on making informed decisions about what to build and why.

---

**Questions?** Check the "Why this matters" sections for each step. Every technical decision has a plain-English explanation of the benefits and costs.
--- End of content ---