import { useRouter } from 'next/router'
import { usePreview } from '../sanity/lib/sanity.preview'
import { useEffect, useState } from 'react'
import { getLangParam } from '../sanity/helpers/i18n'

export default function Preview({
  token,
  PageComponent,
  pageQuery,
  slug,
}: {
  token: null | string
  PageComponent: any
  pageQuery: string
  slug?: string
}) {
  const router = useRouter()
  const { locale } = router
  const [renderCount, setRenderCount] = useState(0)
  
  // Normalize slug - ensure it starts with /
  const normalizedSlug = slug 
    ? (slug.startsWith('/') ? slug : `/${slug}`)
    : '/'
  
  // Normalize locale to match Sanity's _lang format (en-GB, de-DE, fr-FR)
  const normalizedLocale = getLangParam(locale || 'en-GB')
  
  useEffect(() => {
    setRenderCount(prev => prev + 1)
  }, [token, normalizedSlug, locale, normalizedLocale, pageQuery, renderCount])

  const queryParams = { slug: normalizedSlug, locale: normalizedLocale }
  
  const page: any = usePreview(token, pageQuery, queryParams)
  
  useEffect(() => {
  }, [page])

  // Add a timeout to show if data never arrives
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!page) {
      }
    }, 5000)
    return () => clearTimeout(timer)
  }, [page])

  if (!page) {
    return (
      <div className="text-center py-12">
        <p>Please start editing your document to see the preview!</p>
        <p className="text-sm text-gray-500 mt-2">
          Slug: {normalizedSlug || 'none'} | Locale: {locale || 'none'} | Token: {token ? 'present' : 'missing'}
        </p>
        <p className="text-xs text-gray-400 mt-4">
          Check browser console for detailed logs. If this message persists, the query might not be matching any documents.
        </p>
      </div>
    )
  }

  return <PageComponent page={page} preview={true} />
}
