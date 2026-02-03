/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */

import { visionTool } from '@sanity/vision'
import { documentI18n } from "@sanity/document-internationalization"
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'

import {
  apiVersion,
  dataset,
  previewSecretId,
  projectId,
} from './sanity/lib/sanity.api'

import { deskStructure } from './sanity/plugins/deskStructure'
import { previewDocumentNode } from './sanity/plugins/previewPane'
import { productionUrl } from './sanity/plugins/productionUrl'
import { pageStructure, singletonPlugin } from './sanity/plugins/settings'
import footer from './sanity/schemas/documents/footer'
import navigation from './sanity/schemas/documents/navigation'
import { media } from 'sanity-plugin-media'
import page from './sanity/schemas/documents/page'
import cta from './sanity/schemas/objects/cta'
import footerColumn from './sanity/schemas/objects/footerColumn'
import footerLink from './sanity/schemas/objects/footerLink'
import logoCarousel from './sanity/schemas/objects/logoCarousel'
import contentGrid from './sanity/schemas/objects/contentGrid'
import hero from './sanity/schemas/objects/hero'
import contentBlock from './sanity/schemas/objects/contentBlock'
import stats from './sanity/schemas/objects/stats'
import features from './sanity/schemas/objects/features'
import caseStudies from './sanity/schemas/objects/caseStudies'

// Get title from environment variable
const title = typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SANITY_PROJECT_TITLE || undefined

export const PREVIEWABLE_DOCUMENT_TYPES: string[] = [page.name]

export default defineConfig({
  basePath: '/studio',
  projectId: projectId!,
  dataset: dataset!,
  title: title,
  schema: {
    types: [
      // Singletons
      // Documents
      page,
      navigation,
      footer,
      // Objects
      cta,
      footerColumn,
      footerLink,
      logoCarousel,
      contentGrid,
      hero,
      contentBlock,
      stats,
      features,
      caseStudies,
    ],
  },
  plugins: [
    deskTool({
      structure: deskStructure,
      // `defaultDocumentNode` is responsible for adding a "Preview" tab to the document pane
      defaultDocumentNode: previewDocumentNode({ apiVersion, previewSecretId }),
    }),
    documentI18n({
      base: "en-GB",
      languages: [
        { id: "en-GB", title: "UK English" },
        { id: "de-DE", title: "German" },
        { id: "fr-FR", title: "French" },
      ],
      fieldNames: {
        lang: "_lang",
      },
    }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    // singletonPlugin([home.name, settings.name]),
    // Add the "Open preview" action
    productionUrl({
      apiVersion,
      previewSecretId,
      types: PREVIEWABLE_DOCUMENT_TYPES,
    }),
    // Add an image asset source for Unsplash
    unsplashImageAsset(),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
    media(),
  ],
})
