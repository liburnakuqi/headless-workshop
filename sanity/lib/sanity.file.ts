import { dataset, projectId } from './sanity.api'

/**
 * Get the URL for a Sanity file asset
 * Files in Sanity have a different structure than images
 */
export const urlForFile = (file: any): string | undefined => {
  if (!file) return undefined

  // If it's already a URL string, return it
  if (typeof file === 'string') {
    return file
  }

  // Case 1: Expanded asset from query (asset-> { url })
  if (file?.asset?.url) {
    return file.asset.url
  }

  // Case 2: Direct asset object with url
  if (file?.asset && typeof file.asset === 'object' && file.asset.url) {
    return file.asset.url
  }

  // Case 3: Asset reference that needs expansion
  // When query uses asset->, it should expand, but if it doesn't, try to construct URL
  if (file?.asset?._ref) {
    const ref = file.asset._ref
    if (ref && typeof ref === 'string' && ref.startsWith('file-')) {
      // Sanity file reference format: file-{projectId}-{hash}-{extension}
      // Example: file-wt2nt5ce-production-abc123def456.mp4
      const parts = ref.split('-')
      if (parts.length >= 4) {
        // Extract everything after the projectId and dataset
        // Format: file-{projectId}-{dataset}-{hash}-{extension}
        const hashAndExt = parts.slice(3).join('-') // Skip 'file', projectId, dataset
        return `https://cdn.sanity.io/files/${projectId}/${dataset}/${hashAndExt}`
      }
    }
  }

  // Case 4: Direct url property (sometimes Sanity returns this)
  if (file?.url && typeof file.url === 'string') {
    return file.url
  }

  // Case 5: Check if asset is directly the file object
  if (file?._type === 'file' && file?.asset?.url) {
    return file.asset.url
  }

  return undefined
}
