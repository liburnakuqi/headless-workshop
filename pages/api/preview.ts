import {
  apiVersion,
  dataset,
  previewSecretId,
  projectId,
  useCdn,
} from '../../sanity/lib/sanity.api'
import { resolveHref } from '../../sanity/lib/helpers/links'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { PageConfig } from 'next/types'
import { createClient } from 'next-sanity'
import { getSecret } from '../../sanity/plugins/productionUrl/utils'

// res.setPreviewData only exists in the nodejs runtime, setting the config here allows changing the global runtime
// option in next.config.mjs without breaking preview mode
export const config: PageConfig = { runtime: 'nodejs' }

function redirectToPreview(
  res: NextApiResponse<string | void>,
  previewData: { token?: string },
  Location: string
): void {
  // Enable Preview Mode by setting the cookies
  res.setPreviewData(previewData)
  // Redirect to a preview capable route
  // FIXME: https://github.com/sanity-io/nextjs-blog-cms-sanity-v3/issues/95
  // res.writeHead(307, { Location })
  res.writeHead(307, {
    Location: Location,
  })
  res.end()
}

const _client = createClient({ projectId, dataset, apiVersion, useCdn })

export default async function preview(
  req: NextApiRequest,
  res: NextApiResponse<string | void>
) {
  try {
    // Log immediately to verify endpoint is hit
    console.log('='.repeat(50))
    console.log('[Preview API] ✅ ENDPOINT HIT!')
    console.log('[Preview API] Request received:', {
      query: req.query,
      method: req.method,
      url: req.url,
      headers: {
        'user-agent': req.headers['user-agent'],
        'referer': req.headers.referer,
      },
    })
    console.log('[Preview API] Environment check:', {
      hasProjectId: !!projectId,
      hasDataset: !!dataset,
      hasToken: !!process.env.SANITY_API_READ_TOKEN,
    })
    console.log('='.repeat(50))
  } catch (error) {
    console.error('[Preview API] ERROR in initial logging:', error)
    return res.status(500).send('Internal server error')
  }

  const previewData: { token?: string } = {}
  // If you want to require preview mode sessions to be started from the Studio, set the SANITY_REQUIRE_PREVIEW_SECRET
  // environment variable to 'true'. The benefit of doing this that unauthorized users attempting to brute force into your
  // preview mode won't make it past the secret check, and only legitimate users are able to bypass the statically generated pages and load up
  // the serverless-powered preview mode.
  if (
    process.env.SANITY_REQUIRE_PREVIEW_SECRET === 'true' &&
    !req.query.secret
  ) {
    console.log('[Preview API] Missing secret, returning 401')
    return res.status(401).send('Invalid secret')
  }

  // If a secret is present in the URL, verify it and if valid we upgrade to token based preview mode, which works in Safari and Incognito mode
  if (req.query.secret) {
    console.log('[Preview API] Secret provided, verifying...')
    const token = process.env.SANITY_API_READ_TOKEN
    if (!token) {
      console.error('[Preview API] ERROR: SANITY_API_READ_TOKEN not found in environment')
      throw new Error(
        'A secret is provided but there is no `SANITY_API_READ_TOKEN` environment variable setup.'
      )
    }
    console.log('[Preview API] Token found, length:', token.length)
    const client = _client.withConfig({ useCdn: false, token })
    const secret = await getSecret(client, previewSecretId)
    console.log('[Preview API] Secret from Sanity:', secret ? 'found' : 'not found')
    if (req.query.secret !== secret) {
      console.log('[Preview API] Secret mismatch, returning 401')
      return res.status(401).send('Invalid secret')
    }
    previewData.token = token
    console.log('[Preview API] Secret verified, token added to preview data')
  } else {
    console.log('[Preview API] No secret provided, using public preview')
  }

  const documentType = req.query.documentType as string
  const slug = req.query.slug as string
  console.log('[Preview API] Resolving href:', { documentType, slug })

  const href = resolveHref(documentType, slug)
  console.log('[Preview API] Resolved href:', href)

  if (!href) {
    console.error('[Preview API] ERROR: Could not resolve href')
    return res
      .status(400)
      .send(
        'Unable to resolve preview URL based on the current document type and slug'
      )
  }

  try {
    console.log('[Preview API] Redirecting to:', href, 'with preview data:', { hasToken: !!previewData.token })
    return redirectToPreview(res, previewData, href)
  } catch (error) {
    console.error('[Preview API] ERROR during redirect:', error)
    return res.status(500).json({ error: 'Preview redirect failed', message: error instanceof Error ? error.message : 'Unknown error' })
  }
}
