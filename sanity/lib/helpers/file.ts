import { dataset, projectId } from '../sanity.api'

export const urlForFile = (file: any): string | undefined => {
  if (!file) return undefined

  if (typeof file === 'string') {
    return file
  }

  if (file?.asset?.url) {
    return file.asset.url
  }

  if (file?.asset && typeof file.asset === 'object' && file.asset.url) {
    return file.asset.url
  }

  if (file?.asset?._ref) {
    const ref = file.asset._ref
    if (ref && typeof ref === 'string' && ref.startsWith('file-')) {
      const parts = ref.split('-')
      if (parts.length >= 4) {
        const hashAndExt = parts.slice(3).join('-')
        return `https://cdn.sanity.io/files/${projectId}/${dataset}/${hashAndExt}`
      }
    }
  }

  if (file?.url && typeof file.url === 'string') {
    return file.url
  }

  if (file?._type === 'file' && file?.asset?.url) {
    return file.asset.url
  }

  return undefined
}
