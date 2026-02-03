export function resolveHref(
  documentType?: string,
  slug?: string
): string | undefined {
  switch (documentType) {
    case 'page':
      // Handle both string slugs and slug objects
      if (typeof slug === 'string') {
        // If it's already a string, return it
        return slug.startsWith('/') ? slug : `/${slug}`
      }
      // If it's an object with current property (from Sanity)
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
