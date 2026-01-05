# Performance Recommendations for CaseStudyDetail Component

## Current Performance Measures ✅

1. **Scroll Event Throttling**: Using `requestAnimationFrame` to throttle scroll events
2. **Lazy Loading**: Component is dynamically imported via `next/dynamic`
3. **Image Optimization**: Using Next.js `Image` component with `priority` flag
4. **Reduced Motion**: Respecting `prefers-reduced-motion` for accessibility
5. **Cleanup**: Proper cleanup in `useEffect` hooks

## Performance Concerns & Recommendations

### 1. AnimatedTitle Word Splitting Performance ⚠️

**Issue**: `AnimatedTitle` splits text into words and creates individual `motion.span` elements for each word. For long titles, this creates many DOM nodes and animation targets.

**Example**: "Understanding First-Time User Experience in a Legacy CMS" = 8 words = 8 motion.span elements

**Recommendations**:
- Consider animating the entire title as one element for very long titles
- Use `will-change: transform` CSS property for better GPU acceleration
- Limit stagger delay for long titles (currently 0.08s per word = 0.64s total for 8 words)

**Code Suggestion**:
```tsx
// In AnimatedTitle.tsx, add performance optimization
const shouldSplitWords = words.length <= 10 // Only split if reasonable
```

### 2. Lenis Smooth Scroll Performance ⚠️

**Issue**: Lenis runs a continuous `requestAnimationFrame` loop, which can be CPU-intensive, especially on lower-end devices.

**Current Implementation**: ✅ Already good - checks for reduced motion preference

**Additional Recommendations**:
- Consider pausing Lenis when content is not visible
- Use `will-change: transform` on scrollable container
- Monitor FPS and reduce animation quality on low-end devices

**Code Suggestion**:
```tsx
// Pause Lenis when tab is not visible
useEffect(() => {
  const handleVisibilityChange = () => {
    if (localLenisRef.current) {
      if (document.hidden) {
        localLenisRef.current.stop()
      } else {
        localLenisRef.current.start()
      }
    }
  }
  document.addEventListener('visibilitychange', handleVisibilityChange)
  return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
}, [])
```

### 3. Multiple Framer Motion Animations ⚠️

**Issue**: Multiple `motion` components with animations can cause layout thrashing.

**Recommendations**:
- Use `layoutId` for shared element transitions (if applicable)
- Prefer CSS transforms over layout properties (already doing this ✅)
- Use `will-change` CSS property strategically
- Consider using `useReducedMotion` hook from framer-motion

**Code Suggestion**:
```tsx
import { useReducedMotion } from 'framer-motion'

const shouldReduceMotion = useReducedMotion()
// Then conditionally disable animations
```

### 4. Image Loading Strategy 📸

**Current**: Using `priority` flag on hero image ✅

**Recommendations**:
- Add `loading="lazy"` to images below the fold
- Use `placeholder="blur"` with blur data URLs for better perceived performance
- Consider responsive image sizes with `sizes` attribute
- Use WebP/AVIF formats where possible

**Code Suggestion**:
```tsx
<Image
  src={caseStudy.imageUrl}
  alt={`${caseStudy.title} - Hero Image`}
  fill
  className="object-cover"
  sizes="100vw"
  priority // Only for above-fold images
  placeholder="blur" // Add blur placeholder
  blurDataURL="data:image/jpeg;base64,..." // Generate from image
/>
```

### 5. State Management & Re-renders 🔄

**Current**: Multiple `useState` hooks that could cause unnecessary re-renders

**Recommendations**:
- Use `useMemo` for expensive calculations
- Use `useCallback` for event handlers passed to child components
- Consider `React.memo` for child components that don't need frequent updates
- Batch state updates when possible

**Code Suggestion**:
```tsx
// Memoize expensive computations
const memoizedValue = useMemo(() => {
  // Expensive calculation
}, [dependencies])

// Memoize callbacks
const handleToggleContent = useCallback(() => {
  // Handler logic
}, [isContentRevealed])
```

### 6. Large Content Sections 📄

**Issue**: Long case study content loads all at once, even if user doesn't scroll to it.

**Recommendations**:
- Consider lazy loading sections below the fold
- Use Intersection Observer for content that's far down
- Implement virtual scrolling for very long content (if needed)

**Code Suggestion**:
```tsx
// Lazy load sections below fold
const [shouldLoadSection, setShouldLoadSection] = useState(false)
const sectionRef = useRef<HTMLDivElement>(null)

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setShouldLoadSection(true)
        observer.disconnect()
      }
    },
    { rootMargin: '200px' } // Start loading 200px before visible
  )
  
  if (sectionRef.current) {
    observer.observe(sectionRef.current)
  }
  
  return () => observer.disconnect()
}, [])
```

### 7. Memory Leaks Prevention 🧹

**Current**: ✅ Good cleanup in useEffect hooks

**Additional Recommendations**:
- Ensure all event listeners are removed
- Clear all timeouts/intervals
- Dispose of Lenis instance properly (already doing ✅)
- Clean up Intersection Observers

### 8. Bundle Size Optimization 📦

**Recommendations**:
- Tree-shake unused Framer Motion features
- Consider code splitting for heavy animations
- Use dynamic imports for non-critical components
- Monitor bundle size with `@next/bundle-analyzer`

### 9. Performance Monitoring 📊

**Recommendations**:
- Add Web Vitals tracking (Core Web Vitals)
- Monitor Largest Contentful Paint (LCP)
- Track First Input Delay (FID)
- Measure Cumulative Layout Shift (CLS)
- Use React DevTools Profiler to identify slow renders

**Code Suggestion**:
```tsx
// Add to _app.tsx or layout
export function reportWebVitals(metric: NextWebVitalsMetric) {
  // Send to analytics
  console.log(metric)
}
```

### 10. CSS Performance 🎨

**Recommendations**:
- Use `transform` and `opacity` for animations (already doing ✅)
- Avoid animating `width`, `height`, `top`, `left` (causes layout recalculation)
- Use `contain` CSS property for isolated components
- Minimize repaints with `will-change` (use sparingly)

## Priority Actions

### High Priority 🔴
1. Add `will-change` to animated elements
2. Implement image lazy loading for below-fold content
3. Add performance monitoring (Web Vitals)
4. Optimize AnimatedTitle for long titles

### Medium Priority 🟡
1. Pause Lenis when tab is hidden
2. Memoize expensive computations
3. Add blur placeholders for images
4. Consider reducing animation complexity on low-end devices

### Low Priority 🟢
1. Implement virtual scrolling (if content becomes very long)
2. Code split heavy animation libraries
3. Add bundle size monitoring

## Testing Recommendations

1. **Performance Testing**:
   - Test on low-end devices (Android mid-range)
   - Test on slow 3G/4G connections
   - Use Chrome DevTools Performance tab
   - Test with CPU throttling enabled

2. **Lighthouse Audits**:
   - Target 90+ Performance score
   - Monitor Core Web Vitals
   - Check for accessibility issues

3. **Real User Monitoring**:
   - Track actual user performance metrics
   - Monitor error rates
   - Track user engagement metrics

## Metrics to Track

- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1
- **FPS**: Maintain 60fps during scroll
- **Bundle Size**: Keep initial JS < 200KB
- **Time to Interactive**: < 3.5s

