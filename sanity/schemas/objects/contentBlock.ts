import { defineField, defineType } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'
import { createBackgroundColorFields, createTextColorField } from '../../lib/helpers/color'

export default defineType({
  type: 'object',
  name: 'ContentBlock',
  title: 'Content Block',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      title: 'Layout',
      name: 'layout',
      type: 'string',
      options: {
        list: [
          { title: 'Text Only (FeaturedText)', value: 'text-only' },
          { title: 'Text + Image (MediaModule)', value: 'text-image' },
          { title: 'Quote', value: 'quote' },
          { title: 'CTA Banner', value: 'cta-banner' },
        ],
      },
      initialValue: 'text-only',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Heading',
      name: 'heading',
      type: 'string',
      hidden: ({ parent }) => parent?.layout === 'quote',
    }),
    defineField({
      title: 'Body',
      name: 'body',
      type: 'text',
      description: 'Body text (or quote text if layout is quote)',
    }),
    defineField({
      title: 'Quote',
      name: 'quote',
      type: 'text',
      description: 'Quote text (alternative to body for quote layout)',
      hidden: ({ parent }) => parent?.layout !== 'quote',
    }),
    defineField({
      title: 'Author',
      name: 'author',
      type: 'string',
      description: 'Author name (for quote layout)',
    }),
    defineField({
      title: 'Image',
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
      hidden: ({ parent }) => parent?.layout === 'text-only' || parent?.layout === 'quote',
    }),
    defineField({
      title: 'Image Alt Text',
      name: 'imageAlt',
      type: 'string',
    }),
    defineField({
      title: 'Image Position',
      name: 'imagePosition',
      type: 'string',
      options: {
        list: [
          { title: 'Right', value: 'right' },
          { title: 'Left', value: 'left' },
          { title: 'Top', value: 'top' },
        ],
      },
      initialValue: 'right',
      hidden: ({ parent }) => parent?.layout !== 'text-image' && parent?.layout !== 'cta-banner',
    }),
    defineField({
      title: 'CTA Button',
      name: 'cta',
      type: 'Cta',
      hidden: ({ parent }) => parent?.layout === 'text-only' || parent?.layout === 'quote',
    }),
    defineField({
      title: 'Text Alignment',
      name: 'textAlign',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
          { title: 'Right', value: 'right' },
        ],
      },
      initialValue: 'left',
    }),
    ...createBackgroundColorFields({
      presetOptions: [
        { title: 'White', value: 'white' },
        { title: 'Gray', value: 'gray' },
        { title: 'Light', value: 'light' },
        { title: 'Dark', value: 'dark' },
        { title: 'Custom', value: 'custom' },
      ],
      initialPreset: 'white',
    }),
    createTextColorField({
      name: 'textColor',
      title: 'Text Color',
      description: 'Color for text content (optional, overrides Is Dark)',
    }),
    defineField({
      title: 'Is Dark',
      name: 'isDark',
      type: 'boolean',
      description: 'Use dark text colors (if Text Color is not set)',
      initialValue: false,
    }),
    defineField({
      title: 'Show Icon',
      name: 'hasIcon',
      type: 'boolean',
      description: 'Show quote icon (for quote layout)',
      initialValue: false,
      hidden: ({ parent }) => parent?.layout !== 'quote',
    }),
  ],
  preview: {
    select: {
      layout: 'layout',
      heading: 'heading',
      quote: 'quote',
      body: 'body',
      media: 'image',
    },
    prepare({ layout, heading, quote, body, media }) {
      return {
        title: heading || quote || body || 'Content Block',
        subtitle: layout || 'text-only',
        media: media,
      }
    },
  },
})
