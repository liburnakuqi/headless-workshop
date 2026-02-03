export const useCdn = process.env.NODE_ENV === 'production'

/**
 * As this file is reused in several other files, try to keep it lean and small.
 * Importing other npm packages here could lead to needlessly increasing the client bundle size, or end up in a server-only function that don't need it.
 * 
 * Note: In browser context (Sanity Studio), Next.js replaces process.env.NEXT_PUBLIC_* at build time.
 * In Node.js context (CLI), environment variables need to be loaded first (see sanity.cli.ts).
 */

// Helper to safely get env vars with fallbacks
const getEnvVar = (key: string, fallback?: string): string | undefined => {
  if (typeof process === 'undefined') {
    return fallback
  }
  return process.env[key] || fallback
}

export const projectId = getEnvVar('NEXT_PUBLIC_SANITY_PROJECT_ID', 'wt2nt5ce')
export const dataset = getEnvVar('NEXT_PUBLIC_SANITY_DATASET', 'production')

// see https://www.sanity.io/docs/api-versioning for how versioning works
export const apiVersion = getEnvVar('NEXT_PUBLIC_SANITY_API_VERSION', '2022-11-15') || '2022-11-15'

// This is the document id used for the preview secret that's stored in your dataset.
// The secret protects against unauthorized access to your draft content and have a lifetime of 60 minutes, to protect against bruteforcing.
export const previewSecretId: `${string}.${string}` = 'preview.secret'
