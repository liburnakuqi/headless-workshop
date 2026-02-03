import { createClient } from 'next-sanity'
import { groq } from 'next-sanity'
import type { PagePayload, SitemapPayload } from 'types'
import { apiVersion, dataset, projectId, useCdn } from './sanity.api'
import { getLangQuery } from '../helpers/i18n'

/**
 * Sanity Client
 * 
 * Creates and manages Sanity client instances for data fetching
 */

const sanityClient = (token?: string) => {
  return projectId
    ? createClient({ projectId, dataset, apiVersion, useCdn, token })
    : null
}

/**
 * GROQ Queries
 * 
 * All Sanity queries used throughout the application
 */

const heroFragment = groq`
  _type == "Hero" => {
    ...,
    videoUrl {
      asset-> {
        url,
        _ref,
        _type,
        originalFilename,
        size
      }
    }
  }
`

export const pagesBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug && ${getLangQuery()}][0] {
    ...,
    "slug": slug.current,
    sections[] {
      ...,
      ${heroFragment}
    }
  }
`

export const pagePathsQuery = groq`
  *[_type == "page" && slug.current != null].slug.current
`

export const getAllPagesQuery = groq`
  *[_type == "page"] {
    "slug": slug.current,
    "lang": _lang,
    "lastmod": _updatedAt
  }
`

export const footerQuery = groq`
  *[_type == "footer"][0]
`

export const navigationQuery = groq`
  *[_type == "navigation"][0]
`

/**
 * Data Fetching Functions
 * 
 * Functions to fetch data from Sanity using the queries above
 */

export async function getFooter({
  token,
}: {
  token?: string
}): Promise<any | undefined> {
  return await sanityClient(token)?.fetch(footerQuery)
}

export async function getNavigation({
  token,
}: {
  token?: string
}): Promise<any | undefined> {
  return await sanityClient(token)?.fetch(navigationQuery)
}

export async function getPageBySlug({
  token,
  query,
  params
}: {
  query: string
  token?: string
  params?: any
}): Promise<PagePayload | undefined> {
  return await sanityClient(token)?.fetch(query, params)
}

export async function getAllPages({
  token,
  query,
}: {
  query: string
  token?: string
}): Promise<SitemapPayload[] | undefined> {
  return await sanityClient(token)?.fetch(query)
}

export async function getPagePaths(pagePaths: string): Promise<string[]> {
  return await sanityClient()?.fetch(pagePaths) || []
}
