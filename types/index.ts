import type { PortableTextBlock } from '@portabletext/types'
export interface PagePayload {
  body?: PortableTextBlock[]
  name?: string
  overview?: PortableTextBlock[]
  title?: string
  slug?: string
}

export interface SitemapPayload{
  slug: string,
  lang: string,
  lastmod: string
}