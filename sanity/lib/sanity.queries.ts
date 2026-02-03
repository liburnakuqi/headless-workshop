import { groq } from 'next-sanity'
import { getLangQuery } from '../helpers/i18n'

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
