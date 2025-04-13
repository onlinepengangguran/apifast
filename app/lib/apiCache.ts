// Cache structure to store responses
interface CacheItem {
  data: any
  expiry: number
}

// Cache object to store responses by their request URL and parameters
const apiCache: Record<string, CacheItem> = {}

/**
 * Get cached response or execute the handler to get a fresh response
 * @param cacheKey Unique key for the cache entry
 * @param handler Function that returns the response data
 * @param duration Cache duration in milliseconds
 * @returns The cached or fresh response data
 */
export async function getCachedResponse<T>(cacheKey: string, handler: () => Promise<T>, duration: number): Promise<T> {
  const currentTime = Date.now()

  // Check if we have a valid cached response
  if (apiCache[cacheKey] && currentTime < apiCache[cacheKey].expiry) {
    console.log(`Cache hit for: ${cacheKey}`)
    return apiCache[cacheKey].data
  }

  // No valid cache, execute handler to get fresh data
  console.log(`Cache miss for: ${cacheKey}, fetching fresh data`)
  const data = await handler()

  // Store in cache
  apiCache[cacheKey] = {
    data,
    expiry: currentTime + duration,
  }

  return data
}

/**
 * Generate a cache key from request URL and search params
 * @param request Request object
 * @returns Cache key string
 */
export function generateCacheKey(request: Request): string {
  const url = new URL(request.url)
  const params = new URLSearchParams(url.search)
  const sortedParams = Array.from(params.entries())
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    .map(([key, value]) => `${key}=${value}`)
    .join("&")

  return `${url.pathname}?${sortedParams}`
}

// Cache durations
export const CACHE_DURATIONS = {
  FIVE_YEARS: 5 * 365 * 24 * 60 * 60 * 1000, // 5 years in milliseconds
  ONE_YEAR: 365 * 24 * 60 * 60 * 1000, // 1 year in milliseconds
  ONE_DAY: 24 * 60 * 60 * 1000, // 1 day in milliseconds
  ONE_HOUR: 60 * 60 * 1000, // 1 hour in milliseconds
}

