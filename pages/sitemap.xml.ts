import type { GetServerSideProps } from 'next'
import type { SitemapPayload } from 'types'

import { getAllPages } from '../sanity/lib/sanity.client'
import { getAllPagesQuery } from '../sanity/lib/sanity.queries'

const EXTERNAL_DATA_URLS: Record<string, string> = {
  'de-DE': 'https://joinhandshake.de',
  'fr-FR': 'https://joinhandshake.fr',
  'en-GB': 'https://joinhandshake.co.uk',
}

const DEFAULT_LOCALE = 'en-GB'

function normalizeSlug(slug: string): string {
  if (!slug) return '/'
  return slug.startsWith('/') ? slug : `/${slug}`
}

function resolveLocaleFromHost(host?: string): string {
  if (!host) return DEFAULT_LOCALE
  const h = host.toLowerCase()
  if (h.endsWith('.de') || h.includes('localhost.de')) return 'de-DE'
  if (h.endsWith('.fr') || h.includes('localhost.fr')) return 'fr-FR'
  if (h.endsWith('.co.uk') || h.includes('localhost.gb')) return 'en-GB'
  return DEFAULT_LOCALE
}

function isPageInLocale(pageLang: string | null | undefined, locale: string): boolean {
  if (locale === 'en-GB') {
    return pageLang === 'en-GB' || pageLang == null
  }
  return pageLang === locale
}

function generateLocaleURL(locale: string, path: string) {
  const base = EXTERNAL_DATA_URLS[locale] || EXTERNAL_DATA_URLS[DEFAULT_LOCALE]
  return `${base}${normalizeSlug(path)}`
}

type Locale = 'en-GB' | 'de-DE' | 'fr-FR'

function normalizeLang(lang: string | null | undefined): Locale {
  if (lang === 'de-DE') return 'de-DE'
  if (lang === 'fr-FR') return 'fr-FR'
  return 'en-GB'
}

type PageByLocale = Record<Locale, SitemapPayload | undefined>
type PageGroup = {
  slug: string
  byLocale: PageByLocale
}

function groupPagesBySlug(allPages: SitemapPayload[]): Record<string, PageGroup> {
  const groups: Record<string, PageGroup> = {}

  for (const p of allPages) {
    const slug = normalizeSlug(p.slug)
    const lang = normalizeLang(p.lang)

    if (!groups[slug]) {
      groups[slug] = {
        slug,
        byLocale: { 'en-GB': undefined, 'de-DE': undefined, 'fr-FR': undefined },
      }
    }

    const existing = groups[slug].byLocale[lang]
    if (!existing || existing.lastmod < p.lastmod) {
      groups[slug].byLocale[lang] = { ...p, slug, lang }
    }
  }

  return groups
}

function renderAlternates(slug: string, byLocale: PageByLocale) {
  const alternates: string[] = []
  ;(['en-GB', 'de-DE', 'fr-FR'] as const).forEach((lang) => {
    const page = byLocale[lang]
    if (!page) return
    alternates.push(
      `    <xhtml:link rel="alternate" hreflang="${lang}" href="${generateLocaleURL(lang, slug)}" />`
    )
  })

  if (byLocale['en-GB']) {
    alternates.push(
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${generateLocaleURL('en-GB', slug)}" />`
    )
  }

  return alternates.join('\n')
}

function generateSiteMap(locale: Locale, groups: PageGroup[]) {
  const urls = groups
    .map((group) => {
      const pageForLocale = group.byLocale[locale]
      if (!pageForLocale) return ''

      const loc = generateLocaleURL(locale, group.slug)
      const lastmod = pageForLocale.lastmod
      const alternates = renderAlternates(group.slug, group.byLocale)

      return `
  <url>
    <loc>${loc}</loc>
${alternates}
    <lastmod>${lastmod}</lastmod>
  </url>`
    })
    .filter(Boolean)
    .join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
${urls}
</urlset>`
}

export default function SiteMap() {
  return null
}

export const getServerSideProps: GetServerSideProps = async ({ res, req, query }) => {
  const forcedLocale = typeof query.locale === 'string' ? query.locale : undefined
  const locale = (forcedLocale || resolveLocaleFromHost(req.headers.host)) as Locale

  const allPages = (await getAllPages({ query: getAllPagesQuery })) || []

  const groupsMap = groupPagesBySlug(allPages)
  const groups = Object.values(groupsMap)
    .filter((g) => {
      if (locale === 'en-GB') {
        return !!g.byLocale['en-GB']
      }
      return !!g.byLocale[locale]
    })

  const sitemap = generateSiteMap(locale, groups)

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return { props: {} }
}
