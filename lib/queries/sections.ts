/**
 * Section Query Utilities
 * 
 * This module provides utilities for building section-specific GROQ queries.
 * 
 * Note: Section-specific query fragments are currently defined directly in
 * `sanity/lib/sanity.queries.ts` for better GROQ template literal support.
 * 
 * As the project grows, you may want to extract common patterns here.
 */

/**
 * Common asset expansion pattern
 * Use this when you need to expand image/file assets
 */
export const expandAsset = (fieldName: string) => `
  ${fieldName} {
    asset-> {
      url,
      _ref,
      _type,
      originalFilename,
      size,
      metadata
    }
  }
`

/**
 * Common image expansion pattern
 * Use this for image fields that need hotspot/crop data
 */
export const expandImage = (fieldName: string) => `
  ${fieldName} {
    asset-> {
      url,
      _ref,
      _type,
      metadata {
        dimensions,
        lqip,
        palette
      }
    },
    hotspot,
    crop
  }
`
