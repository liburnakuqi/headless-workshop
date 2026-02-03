# Technical Interview Preparation Guide

## Architecture Overview

This is a **headless CMS architecture** using:
- **Next.js 13** (Pages Router) for the frontend
- **Sanity CMS** as the content backend
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations

---

## 1. Component System Architecture

### Q: "How does your component rendering system work?"

**Answer:**
We use a **registry-based component system** that dynamically renders React components from Sanity CMS data.

**Key Components:**

1. **Component Registry** (`lib/components/registry.ts`)
   - Centralized mapping of component types to React components
   - Type-safe component map
   - Easy to extend - just add new entries

2. **Component Builder** (`utils/buildComponent.tsx`)
   - Takes a Sanity section object with `_type` and props
   - Resolves component type (handles legacy mappings)
   - Configures props based on component type
   - Returns a React element

3. **Component Config** (`utils/componentConfig.ts`)
   - Maps legacy component types to new unified ones
   - Applies default props for marketing-friendly schemas
   - Example: `Stats` schema → `ContentGrid` component with center alignment

**Flow:**
```
Sanity Data → buildComponents() → buildComponent() → 
getComponentType() → configureComponentProps() → React.createElement()
```

**Benefits:**
- **Separation of concerns**: Marketing team sees "Stats Section" in Sanity, developers maintain one `ContentGrid` component
- **Backward compatibility**: Old data types automatically map to new components
- **Type safety**: Registry ensures only registered components can be rendered
- **Maintainability**: Single source of truth for component mapping

---

### Q: "Why did you consolidate multiple components into unified ones?"

**Answer:**
We consolidated `StatsSection`, `FeatureGrid`, `CaseStudies`, `FeaturedItems` into a single `ContentGrid` component because:

1. **DRY Principle**: They shared 90% of the same logic (grid layout, item rendering)
2. **Maintenance**: One component to maintain instead of four
3. **Flexibility**: Props control rendering (borders, backgrounds, alignment)
4. **Marketing UX**: Different schemas in Sanity (`Stats`, `Features`, `CaseStudies`) map to the same component with different defaults

**Trade-off:**
- Slightly more complex component with conditional logic
- But much easier to maintain and extend

---

## 2. Data Fetching & Caching

### Q: "How do you handle data fetching and caching?"

**Answer:**

**Static Generation (SSG):**
- All pages use `getStaticProps` for build-time generation
- Pages are pre-rendered at build time for performance
- `getStaticPaths` generates all possible routes

**Global Data Caching:**
- Navigation and Footer are cached per build using `lib/cache/globalData.ts`
- In-memory cache prevents duplicate fetches during build
- All pages share the same global data instance

**Sanity Client:**
- Centralized client creation in `sanity/lib/sanity.client.ts`
- Uses CDN in production, bypasses CDN in development/preview
- Token-based authentication for preview mode

**Query Organization:**
- GROQ queries in `sanity/lib/sanity.queries.ts`
- Section-specific fragments (e.g., `heroFragment` for video URLs)
- Reusable query functions

---

### Q: "What about preview mode? How does that work?"

**Answer:**

**Preview Flow:**
1. User clicks "Open Preview" in Sanity Studio
2. Studio generates a secret and calls `/api/preview`
3. API route verifies secret, sets Next.js preview cookies
4. Redirects to the page with preview mode enabled
5. `layout/Preview.tsx` uses `usePreview` hook from `next-sanity/preview`
6. Hook subscribes to Sanity's real-time updates
7. Page re-renders when content changes

**Key Features:**
- **Token-based**: Uses `SANITY_API_READ_TOKEN` to access drafts
- **Real-time**: WebSocket connection to Sanity for live updates
- **Secure**: Secret verification prevents unauthorized access
- **Fallback**: Shows public data if user not authenticated

**Implementation:**
- `pages/api/preview.ts`: Enables preview mode, verifies secrets
- `layout/Preview.tsx`: Wraps preview pages, uses `usePreview` hook
- `sanity/lib/sanity.preview.ts`: Configures preview subscription

---

## 3. Internationalization (i18n)

### Q: "How does internationalization work in this project?"

**Answer:**

**Two-Level i18n:**

1. **Next.js Routing** (`next-i18next.config.js`)
   - Domain-based locale detection (`.co.uk`, `.de`, `.fr`)
   - Locale in URL path or subdomain
   - Default locale: `en-GB`

2. **Sanity Document Language** (`sanity/helpers/i18n.ts`)
   - Documents have `_lang` field (`en-GB`, `de-DE`, `fr-FR`)
   - GROQ queries filter by `_lang`
   - Fallback: `en-GB` includes documents with `_lang: null` for backward compatibility

**Query Filtering:**
```groq
*[_type == "page" && slug.current == $slug && 
  ((_lang == $locale) || ($locale == 'en-GB' && (_lang == $locale || _lang == null)))
][0]
```

**Sitemap:**
- Generates locale-specific sitemaps
- Includes `hreflang` alternates for SEO
- Groups pages by slug across locales

**Benefits:**
- Content editors work in their language
- SEO-friendly with proper `hreflang` tags
- Backward compatible with existing content

---

## 4. Type Safety

### Q: "How do you handle type safety?"

**Answer:**

**Current State:**
- TypeScript throughout the codebase
- Type definitions in `types/index.ts`
- Component props typed (though some use `any`)

**Areas for Improvement:**
- Replace `any` types with proper generics
- Create type mappings for component props
- Add runtime validation (Zod) for Sanity data

**Example Type Definition:**
```typescript
export interface SectionComponent {
  _type: string
  _key?: string
  [key: string]: any
}
```

**Future Enhancement:**
```typescript
type ComponentPropsMap = {
  Hero: HeroProps
  ContentGrid: ContentGridProps
  ContentBlock: ContentBlockProps
}
```

---

## 5. Performance Optimizations

### Q: "What performance optimizations have you implemented?"

**Answer:**

1. **Static Site Generation (SSG)**
   - All pages pre-rendered at build time
   - No server-side rendering overhead
   - Fast initial page loads

2. **Global Data Caching** (Detailed Explanation)
   
   **How it Works:**
   
   We use simple in-memory caching in `lib/cache/globalData.ts` with deployment-based freshness:
   
   **a) Build-Time Caching (Primary Benefit)**
   - In-memory cache during the build process
   - Navigation and Footer fetched once, shared across all pages
   - Fresh data automatically fetched on each deployment (server restart clears cache)
   - No time-based expiration - perfect for content that doesn't change often
   
   **b) Simple and Effective**
   - No complex caching libraries needed (`unstable_cache` not required)
   - Works with all Next.js versions
   - Cache persists for entire build process
   - Automatically fresh on each deployment
   
   **c) Promise Deduplication**
   - If multiple pages call `getGlobalData()` simultaneously during build
   - They all share the same `cachePromise`
   - Prevents duplicate concurrent requests
   - All wait for the same single fetch to complete
   
   **d) Deployment-Based Freshness**
   - Cache cleared on server restart/deployment
   - Fresh data fetched during `getStaticProps` on each build
   - No need for time-based revalidation or `revalidate` prop
   - Perfect for Navigation/Footer that change infrequently
   
   **Implementation:**
   ```typescript
   // lib/cache/globalData.ts
   let cachedGlobalData: GlobalData | null = null
   let cachePromise: Promise<GlobalData> | null = null
   
   export async function getGlobalData(token?: string) {
     if (cachedGlobalData) return cachedGlobalData
     if (cachePromise) return cachePromise
     
     cachePromise = fetchGlobalData(token).then((data) => {
       cachedGlobalData = data
       cachePromise = null
       return data
     })
     
     return cachePromise
   }
   ```
   
   **Why Not Use `revalidate` or `unstable_cache`?**
   - `revalidate` in `getStaticProps` would revalidate entire pages (not just global data)
   - `unstable_cache` adds complexity without benefit for deployment-based caching
   - Simple in-memory cache is sufficient: fresh on each deployment, efficient during build
   - Navigation/Footer don't need runtime revalidation - they're static until next deployment
   
   **Performance Impact:**
   - **Build time**: All pages share cached data (99% reduction in API calls)
   - **Runtime**: Static pages serve pre-rendered HTML (zero API calls)
   - **Deployment**: Fresh data automatically fetched on build
   - **Perfect for**: Navigation/Footer that change infrequently
   
   **Why This Approach:**
   - ✅ Simple and maintainable (no external dependencies)
   - ✅ Works with all Next.js versions
   - ✅ Automatically fresh on each deployment
   - ✅ Efficient during build (shared cache)
   - ✅ No time-based complexity needed
   - ✅ No `revalidate` needed - pages are static until next deployment
   
   **Cache Lifecycle:**
   1. **Build/Deployment**: Fresh data fetched from Sanity during `getStaticProps`
   2. **First page**: Fetches Navigation/Footer, caches in memory
   3. **Subsequent pages**: Use cached data (instant, no API calls)
   4. **New deployment**: Cache cleared, fresh data fetched on first page
   5. **Runtime**: Static pages serve pre-rendered HTML with cached data

3. **Code Splitting**
   - Preview component lazy-loaded
   - Next.js automatic code splitting
   - Only loads what's needed

4. **Image Optimization**
   - Sanity CDN for images
   - Next.js Image component
   - Responsive images

5. **Query Optimization**
   - Single query for page + sections
   - Fragments for specific sections
   - Minimal data fetching

**Future Improvements:**

### 1. ISR (Incremental Static Regeneration) - Detailed Explanation

**What it is:**
ISR allows you to update static pages after build time without rebuilding the entire site. Pages are regenerated on-demand or at specified intervals.

**How it works:**
- Pages are statically generated at build time (like SSG)
- After a specified time (`revalidate`), the page can be regenerated
- First request after revalidation triggers regeneration in the background
- Subsequent requests get the cached version until next revalidation

**Implementation Example:**
```typescript
// pages/[[...slug]].tsx
export const getStaticProps: GetStaticProps = async (ctx) => {
  // ... existing code ...
  
  return {
    props: { ... },
    revalidate: 3600, // Regenerate page every hour (in seconds)
  }
}
```

**When to use:**
- Content that changes frequently but doesn't need real-time updates
- Pages with high traffic where full rebuilds are expensive
- Content that updates on a schedule (e.g., blog posts, product listings)

**Benefits:**
- Best of both worlds: Static performance + dynamic updates
- No full rebuild required for content updates
- Automatic background regeneration
- Fallback to stale content if regeneration fails

**Trade-offs:**
- First request after revalidation may be slower (regeneration in progress)
- Need to handle stale content gracefully
- More complex than pure SSG

**Advanced: On-Demand Revalidation**
```typescript
// pages/api/revalidate.ts
export default async function handler(req, res) {
  // Verify webhook secret
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    // Revalidate specific page
    await res.revalidate(req.query.path)
    return res.json({ revalidated: true })
  } catch (err) {
    return res.status(500).send('Error revalidating')
  }
}

// Sanity webhook calls: /api/revalidate?secret=xxx&path=/about
```

---

### 2. Image CDN Caching Headers - Detailed Explanation

**What it is:**
HTTP cache headers tell browsers and CDNs how long to cache images, reducing server load and improving load times.

**Current State:**
- Images served from Sanity CDN (`cdn.sanity.io`)
- Next.js Image component handles optimization
- No explicit cache headers set

**How it works:**
Cache headers control:
- **Cache-Control**: How long to cache (max-age, s-maxage)
- **ETag**: Content fingerprint for validation
- **Last-Modified**: When content was last changed

**Implementation Options:**

**A) Next.js Image Optimization with Headers:**
```typescript
// next.config.mjs
const config = {
  // ... existing config ...
  
  async headers() {
    return [
      {
        source: '/_next/image',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // 1 year
          },
        ],
      },
    ]
  },
}
```

**B) Sanity CDN Headers (via API):**
```typescript
// lib/sanity.image.ts
export const urlForImage = (source: Image) => {
  if (!source?.asset?._ref) return undefined
  
  return imageBuilder
    .image(source)
    .auto('format')
    .fit('max')
    .quality(85) // Optimize quality
    .url()
}
```

**C) Custom Image Component with Cache Headers:**
```typescript
// components/shared/ImageBox.tsx
export default function ImageBox({ image, ...props }: ImageBoxProps) {
  const imageUrl = urlForImage(image)?.url()
  
  return (
    <Image
      src={imageUrl}
      {...props}
      // Next.js automatically adds cache headers for optimized images
      // But we can also use fetchpriority for critical images
      priority={props.priority} // For above-the-fold images
    />
  )
}
```

**Cache Strategy:**
- **Static images** (logos, icons): `max-age=31536000, immutable` (1 year)
- **Dynamic images** (user uploads): `max-age=86400` (1 day)
- **Critical images** (hero): Use `priority` prop for preloading

**Benefits:**
- Reduced bandwidth costs
- Faster page loads (images from cache)
- Lower server load
- Better Core Web Vitals scores

**Monitoring:**
```typescript
// Track cache hit rates
// Use browser DevTools Network tab
// Check Cache-Control headers in response
```

---

### 3. Bundle Size Analysis and Optimization - Detailed Explanation

**What it is:**
Analyzing JavaScript bundle sizes to identify large dependencies and optimize them for faster page loads.

**Why it matters:**
- Smaller bundles = faster initial page load
- Better user experience, especially on mobile
- Improved SEO (Core Web Vitals)
- Lower bandwidth costs

**Current Analysis Tools:**

**A) Next.js Built-in Analysis:**
```bash
# Add to package.json
"analyze": "ANALYZE=true next build"

# Install @next/bundle-analyzer
yarn add -D @next/bundle-analyzer

# next.config.mjs
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  // ... existing config
})
```

**B) Webpack Bundle Analyzer:**
```bash
yarn add -D webpack-bundle-analyzer

# Generates interactive treemap visualization
# Shows which packages take up the most space
```

**Optimization Strategies:**

**1. Code Splitting:**
```typescript
// Already implemented: Preview component lazy-loaded
const PagePreview = lazy(() => import('layout/Preview'))

// Can add more:
const HeavyComponent = lazy(() => import('components/HeavyComponent'))
```

**2. Dynamic Imports:**
```typescript
// Load components only when needed
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('components/Chart'), {
  loading: () => <p>Loading chart...</p>,
  ssr: false, // Don't render on server if not needed
})
```

**3. Tree Shaking:**
```typescript
// Import only what you need
// ❌ Bad: import * as lodash from 'lodash'
// ✅ Good: import debounce from 'lodash/debounce'

// ✅ Good: Use named imports
import { motion } from 'framer-motion' // Only imports motion
```

**4. Replace Heavy Dependencies:**
```typescript
// Example: Replace moment.js (70KB) with date-fns (2KB per function)
// ✅ Already using date-fns in this project

// Example: Replace full lodash with individual functions
import debounce from 'lodash/debounce' // vs import _ from 'lodash'
```

**5. Optimize Images:**
```typescript
// Use WebP format (already handled by Sanity CDN)
// Use appropriate image sizes (not loading 4K images on mobile)
// Lazy load below-the-fold images
```

**6. Remove Unused Code:**
```typescript
// Use TypeScript strict mode to catch unused imports
// Regular audits of dependencies
// Remove Storybook from production bundle (already separate)
```

**Implementation Checklist:**
- [ ] Set up bundle analyzer
- [ ] Identify top 10 largest dependencies
- [ ] Replace heavy libraries with lighter alternatives
- [ ] Implement dynamic imports for heavy components
- [ ] Set up bundle size budgets in CI/CD
- [ ] Monitor bundle size over time

**Bundle Size Budgets:**
```typescript
// next.config.mjs
const config = {
  // ... existing config ...
  
  // Warn if bundle exceeds these sizes
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Vendor chunk
            vendor: {
              name: 'vendor',
              chunks: 'all',
              test: /node_modules/,
              priority: 20,
            },
            // Common chunk
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 10,
              reuseExistingChunk: true,
            },
          },
        },
      }
    }
    return config
  },
}
```

**Monitoring:**
```typescript
// Add to CI/CD pipeline
// Fail build if bundle size exceeds threshold
// Track bundle size over time
// Alert on significant increases
```

---

## 6. Error Handling

### Q: "How do you handle errors?"

**Answer:**

**Current Approach:**
- Null checks before rendering
- Console warnings for missing components
- Graceful degradation (missing sections don't break page)

**Example:**
```typescript
if (!isComponentRegistered(componentType)) {
  console.warn(`No component registered for: ${componentType}`)
  return null
}
```

**Areas for Improvement:**
- Error boundaries for component failures
- Retry logic for failed API calls
- User-friendly error pages ✅ (Custom 404 page implemented)
- Error logging service (Sentry)

**Custom 404 Page:**
- Created `pages/404.tsx` for custom not-found experience
- Styled with Tailwind CSS matching site design
- Includes navigation options (home, back button)
- SEO-friendly (noindex, nofollow meta tags)
- User-friendly messaging and support contact

---

## 7. Scalability

### Q: "How would you scale this architecture?"

**Answer:**

**Current Limitations:**
- All pages generated at build time (long builds with many pages)
- Global data cache is in-memory (resets on server restart)
- No ISR for dynamic content

**Scaling Strategies:**

1. **Incremental Static Regeneration (ISR)**
   ```typescript
   return {
     props: { ... },
     revalidate: 3600 // Regenerate every hour
   }
   ```

2. **On-Demand Revalidation**
   - Webhook from Sanity on content update
   - Revalidate specific pages via API route

3. **Edge Caching** (See detailed explanation in "Future Improvements" section above)
   - Vercel Edge Network automatically caches static assets
   - Custom cache headers for optimal caching strategy
   - Edge functions for low-latency API routes

4. **Database Query Optimization** (See detailed explanation in "Future Improvements" section above)
   - Index frequently queried fields in Sanity
   - Implement pagination for large datasets
   - Multi-level query result caching (app, CDN, Redis)

5. **Component Lazy Loading**
   - Code split heavy components
   - Load on demand

6. **Build Optimization**
   - Parallel page generation
   - Incremental builds
   - Build caching

---

## 8. Trade-offs & Design Decisions

### Q: "What trade-offs did you make and why?"

**Answer:**

1. **Unified Components vs. Separate Components**
   - **Trade-off**: More complex components with conditional logic
   - **Benefit**: Easier maintenance, less duplication
   - **Decision**: Chose unified for maintainability

2. **Static Generation vs. Server-Side Rendering**
   - **Trade-off**: Longer build times, less real-time content
   - **Benefit**: Better performance, lower server costs
   - **Decision**: SSG for performance, preview mode for real-time

3. **Type Safety vs. Flexibility**
   - **Trade-off**: Some `any` types for flexibility
   - **Benefit**: Faster development, easier integration
   - **Decision**: Gradual type improvement

4. **Global Data Caching**
   - **Trade-off**: In-memory cache (not persistent)
   - **Benefit**: Faster builds, fewer API calls
   - **Decision**: Acceptable for build-time caching

5. **Component Registry vs. Direct Imports**
   - **Trade-off**: Slight overhead for dynamic resolution
   - **Benefit**: Centralized, extensible, type-safe
   - **Decision**: Registry for scalability

---

## 9. Testing Strategy

### Q: "How would you test this application?"

**Answer:**

**Current State:**
- Storybook for component development
- Manual testing

**Recommended Testing Strategy:**

1. **Unit Tests**
   - Component rendering logic
   - Utility functions (`buildComponent`, `getComponentType`)
   - Type mapping functions

2. **Integration Tests**
   - Component registry
   - Data fetching functions
   - Preview mode flow

3. **E2E Tests**
   - Page rendering
   - Navigation flow
   - Preview mode

4. **Visual Regression**
   - Storybook visual tests
   - Component snapshots

5. **Performance Tests**
   - Build time benchmarks
   - Page load metrics
   - Bundle size monitoring

---

## 10. Common Follow-up Questions

### Q: "What would you improve if you had more time?"

**Answer:**

1. **Type Safety**
   - Remove all `any` types
   - Add Zod validation for Sanity data
   - Type-safe component props

2. **Error Handling**
   - Error boundaries
   - Retry logic
   - Error logging

3. **Performance**
   - ISR for dynamic pages
   - Image optimization
   - Bundle size reduction

4. **Testing**
   - Unit tests for utilities
   - Integration tests
   - E2E tests

5. **Developer Experience**
   - Better error messages
   - Development tools
   - Documentation

6. **Monitoring**
   - Analytics
   - Error tracking
   - Performance monitoring

---

### Q: "How do you handle content updates without rebuilding?"

**Answer:**

**Current:**
- Full rebuild required for content updates
- Preview mode for real-time editing

**Future:**
- ISR with revalidation
- On-demand revalidation via webhooks
- Incremental builds

---

### Q: "What's the biggest challenge you faced?"

**Answer:**

**Component Consolidation:**
- Migrating from multiple components to unified ones
- Ensuring backward compatibility with existing data
- Balancing flexibility with simplicity

**Solution:**
- Created type mapping system
- Prop configuration layer
- Gradual migration path

---

## Key Talking Points

1. **Headless CMS Architecture**: Separation of content and presentation
2. **Component System**: Registry-based, type-safe, extensible
3. **Performance**: SSG, caching, optimization
4. **Developer Experience**: Type safety, clear structure, maintainable
5. **Scalability**: Designed for growth, clear improvement path
6. **Trade-offs**: Thoughtful decisions with clear reasoning

---

## Quick Reference: File Structure

```
pages/
  [[...slug]].tsx      # Dynamic page routing
  _app.tsx             # Global layout wrapper
  sitemap.xml.ts       # Sitemap generation

lib/
  components/
    registry.ts        # Component registry
    types.ts           # Type definitions
  cache/
    globalData.ts      # Global data caching

utils/
  buildComponent.tsx   # Component builder
  componentConfig.ts   # Component configuration

sanity/
  lib/
    sanity.client.ts   # Sanity client
    sanity.queries.ts  # GROQ queries
    sanity.preview.ts  # Preview hook
  schemas/             # Sanity schemas
```

---

## Questions to Ask the Interviewer

1. "What's the scale of content you're working with?"
2. "How frequently does content change?"
3. "What's the team structure (developers vs. content editors)?"
4. "What are the performance requirements?"
5. "What's the deployment strategy?"

---

Good luck with your interview! 🚀
