import type { GetStaticProps } from 'next'
import { lazy } from 'react'
import { PagePayload } from 'types'
import { pagesBySlugQuery, pagePathsQuery } from '../sanity/lib/sanity.queries'
import {
  getFooter,
  getNavigation,
  getPageBySlug,
  getPagePaths,
} from '../sanity/lib/sanity.client'
import { buildComponents } from 'utils/buildComponent'
import { getLangParam } from '../sanity/helpers/i18n'
import { getGlobalData } from '../lib/cache/globalData'

const PagePreview = lazy(() => import('layout/Preview'))

interface PageProps {
  page?: PagePayload
  homePageTitle?: string
  preview: boolean
  token: string | null
}

interface Query {
  [key: string]: string[]
}

interface PreviewData {
  token?: string
}

export default function ProjectSlugRoute(props: PageProps) {
  const { page, preview, token } = props

  const renderPage = (p?: PagePayload) => {
    const sections = p?.sections || []
    return <>{buildComponents(sections as any)}</>
  }

  if (preview) {
    return (PagePreview as any)({
      token,
      PageComponent: ({ page: p }: { page: PagePayload }) => renderPage(p),
      pageQuery: pagesBySlugQuery,
      slug: page?.slug,
    })
  }

  return renderPage(page)
}

export const getStaticProps: GetStaticProps<PageProps> = async (ctx) => {
  const { preview = false, previewData = {}, params = {}, locale } = ctx as any
  const token = (previewData as any)?.token
  const slug = (params as any)?.slug ? `/${(params as any).slug.join('/')}` : '/'

  const normalizedLocale = getLangParam(locale || 'en-GB')

  const [page, globalData] = await Promise.all([
    getPageBySlug({
      token,
      query: pagesBySlugQuery,
      params: {
        slug,
        locale: normalizedLocale,
      },
    }),
    getGlobalData(token),
  ])

  if (!page) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      global: {
        navigation: globalData.navigation,
        footer: globalData.footer,
      },
      page: {
        ...page,
        sections: page.sections || [],
      },
      preview: !!preview,
      token: token ?? null,
    },
    // No revalidate needed - fresh data on each deployment via getStaticProps
    // Pages are statically generated at build time with fresh Navigation/Footer
  }
}

export const getStaticPaths = async () => {
  const paths = await getPagePaths(pagePathsQuery)

  return {
    paths:
    paths?.map((slug) => ({
      params: { slug: `${slug}`.replace('/', '').split('/') },
    })) || [],    fallback: false,
  }
}
