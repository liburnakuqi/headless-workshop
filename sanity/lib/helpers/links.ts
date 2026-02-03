export function resolveHref(
  documentType?: string,
  slug?: string
): string | undefined {
  switch (documentType) {
    case 'page':
      if (typeof slug === 'string') {
        return slug.startsWith('/') ? slug : `/${slug}`
      }
      if (slug && typeof slug === 'object' && 'current' in slug) {
        const slugValue = (slug as any).current
        return slugValue ? (slugValue.startsWith('/') ? slugValue : `/${slugValue}`) : '/'
      }
      return slug || '/'
    default:
      console.warn('Invalid document type:', documentType)
      return undefined
  }
}
