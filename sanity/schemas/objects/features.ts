import { defineField, defineType } from 'sanity'
import { SparklesIcon } from '@sanity/icons'

export default defineType({
  type: 'object',
  name: 'Features',
  title: 'Features Section',
  icon: SparklesIcon,
  description: 'Display features with images, titles, and descriptions',
  fields: [
    defineField({
      title: 'Heading',
      name: 'heading',
      type: 'string',
    }),
    defineField({
      title: 'Subheading',
      name: 'subheading',
      type: 'string',
    }),
    defineField({
      title: 'Features',
      name: 'items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              title: 'Title',
              name: 'title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              title: 'Description',
              name: 'description',
              type: 'text',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              title: 'Image',
              name: 'image',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
            defineField({
              title: 'Image Alt Text',
              name: 'imageAlt',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              media: 'image',
            },
            prepare({ title, media }) {
              return {
                title: title || 'Feature',
                media: media,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(4),
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
    defineField({
      title: 'Has Border',
      name: 'hasBorder',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      title: 'Background Color',
      name: 'backgroundColor',
      type: 'string',
      options: {
        list: [
          { title: 'White', value: 'white' },
          { title: 'Light Gray', value: 'gray' },
          { title: 'Light Green', value: 'green' },
        ],
      },
      initialValue: 'white',
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
      items: 'items',
    },
    prepare({ heading, items }) {
      return {
        title: heading || 'Features Section',
        subtitle: items ? `${items.length} feature${items.length !== 1 ? 's' : ''}` : 'No features',
      }
    },
  },
})
