import { createClient } from 'next-sanity'
import type { PagePayload, SitemapPayload } from 'types'
import { apiVersion, dataset, projectId, useCdn } from './sanity.api'
import { footerQuery, navigationQuery } from './sanity.queries'

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
