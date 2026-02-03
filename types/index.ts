import type { PortableTextBlock } from '@portabletext/types'
import { SectionComponent } from 'lib/components/types'

export interface PagePayload {
  body?: PortableTextBlock[]
  name?: string
  overview?: PortableTextBlock[]
  title?: string
  slug?: string
  sections?: SectionComponent[]
}

export interface SitemapPayload{
  slug: string
  lang?: string | null
  lastmod: string
}