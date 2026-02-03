import { defineField, defineType } from 'sanity'
import { ImageIcon } from '@sanity/icons'

export default defineType({
  type: 'object',
  name: 'LogoCarousel',
  title: 'Logo Carousel',
  icon: ImageIcon,
  fields: [
    defineField({
      title: 'Heading',
      name: 'heading',
      type: 'string',
      description: 'Optional heading text above the carousel',
    }),
    defineField({
      title: 'Show Heading',
      name: 'showHeading',
      type: 'boolean',
      description: 'Whether to display the heading',
      initialValue: true,
    }),
    defineField({
      title: 'Background Color',
      name: 'backgroundColor',
      type: 'string',
      options: {
        list: [
          { title: 'Teal (Dark)', value: 'teal' },
          { title: 'Purple (Dark)', value: 'purple' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      initialValue: 'teal',
    }),
    defineField({
      title: 'Custom Background Color',
      name: 'customBackgroundColor',
      type: 'string',
      description: 'Hex color code (e.g., #1a1a2e). Only used if Background Color is set to Custom.',
      hidden: ({ parent }) => parent?.backgroundColor !== 'custom',
    }),
    defineField({
      title: 'Items',
      name: 'items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              title: 'Logo',
              name: 'logo',
              type: 'image',
              options: {
                hotspot: true,
              },
              description: 'Logo image (will be displayed in white)',
            }),
            defineField({
              title: 'Image',
              name: 'image',
              type: 'image',
              options: {
                hotspot: true,
              },
              description: 'Alternative image (will be displayed in color)',
            }),
            defineField({
              title: 'Name',
              name: 'name',
              type: 'string',
              description: 'Company or item name (used as fallback or alt text)',
            }),
            defineField({
              title: 'Logo Alt Text',
              name: 'logoAlt',
              type: 'string',
              description: 'Alternative text for the logo',
            }),
            defineField({
              title: 'Image Alt Text',
              name: 'imageAlt',
              type: 'string',
              description: 'Alternative text for the image',
            }),
          ],
          preview: {
            select: {
              name: 'name',
              logo: 'logo',
              image: 'image',
            },
            prepare({ name, logo, image }) {
              return {
                title: name || 'Logo Item',
                media: logo || image,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
      items: 'items',
    },
    prepare({ heading, items }) {
      return {
        title: heading || 'Logo Carousel',
        subtitle: items ? `${items.length} logo${items.length !== 1 ? 's' : ''}` : 'No logos',
      }
    },
  },
})
