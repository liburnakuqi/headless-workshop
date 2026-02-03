import { getFooter, getNavigation } from '../../sanity/lib/sanity.client'

type GlobalData = {
  navigation: any
  footer: any
}

/**
 * Fetches global data (Navigation and Footer) from Sanity
 * 
 * @param token - Optional Sanity API token for preview mode
 * @returns Global data (navigation and footer)
 */
async function fetchGlobalData(token?: string): Promise<GlobalData> {
  const [navigation, footer] = await Promise.all([
    getNavigation({ token }),
    getFooter({ token }),
  ])

  return {
    navigation: navigation || null,
    footer: footer || null,
  }
}

// In-memory cache for build-time efficiency
// Persists during the build process, cleared on server restart/deployment
let cachedGlobalData: GlobalData | null = null
let cachePromise: Promise<GlobalData> | null = null

/**
 * Get global data with build-time caching
 * 
 * Cache behavior:
 * - In-memory cache during build process (all pages share same data)
 * - Fresh data fetched on each deployment (server restart clears cache)
 * - No time-based expiration (Navigation/Footer don't change often)
 * - Simple and effective for deployment-based caching
 * 
 * @param token - Optional Sanity API token for preview mode
 * @returns Cached global data
 */
export async function getGlobalData(token?: string): Promise<GlobalData> {
  // Return cached data if available (persists for build process)
  if (cachedGlobalData) {
    return cachedGlobalData
  }

  // If there's an ongoing fetch, wait for it (prevents duplicate requests)
  if (cachePromise) {
    return cachePromise
  }

  // Fetch fresh data (happens on each build/deployment)
  cachePromise = fetchGlobalData(token).then((data) => {
    cachedGlobalData = data
    cachePromise = null
    return data
  })

  return cachePromise
}

/**
 * Clear global data cache
 * Useful for testing or manual cache invalidation
 */
export function clearGlobalDataCache() {
  cachedGlobalData = null
  cachePromise = null
}
