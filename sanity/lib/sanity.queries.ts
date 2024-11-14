import { groq } from 'next-sanity'

export const pagesBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    ...,
    "slug": slug.current,
  }
`

export const pagePathsQuery = groq`
  *[_type == "page" && slug.current != null].slug.current
`

export const getAllPagesQuery = groq `
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
