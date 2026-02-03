import { defineField, defineType } from 'sanity'
import { ImageIcon } from '@sanity/icons'

export default defineType({
  type: 'object',
  name: 'ContentGrid',
  title: 'Content Grid',
  icon: ImageIcon,
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
      title: 'Items',
      name: 'items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            // Stats fields
            defineField({
              title: 'Value',
              name: 'value',
              type: 'string',
              description: 'For stats: the large number/percentage',
            }),
            defineField({
              title: 'Label',
              name: 'label',
              type: 'string',
              description: 'For stats: the description text',
            }),
            // Feature/Case Study fields
            defineField({
              title: 'Title',
              name: 'title',
              type: 'string',
              description: 'Main title for the item',
            }),
            defineField({
              title: 'Subtitle',
              name: 'subtitle',
              type: 'string',
              description: 'Secondary title (e.g., project name for case studies)',
            }),
            defineField({
              title: 'Description',
              name: 'description',
              type: 'text',
              description: 'Description text',
            }),
            // Images
            defineField({
              title: 'Image',
              name: 'image',
              type: 'image',
              options: {
                hotspot: true,
              },
              description: 'Feature image',
            }),
            defineField({
              title: 'Logo',
              name: 'logo',
              type: 'image',
              options: {
                hotspot: true,
              },
              description: 'Company logo (for case studies)',
            }),
            defineField({
              title: 'Image Alt Text',
              name: 'imageAlt',
              type: 'string',
            }),
            defineField({
              title: 'Logo Alt Text',
              name: 'logoAlt',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'subtitle',
              value: 'value',
              label: 'label',
              media: 'image',
            },
            prepare({ title, subtitle, value, label, media }) {
              return {
                title: title || value || 'Content Item',
                subtitle: subtitle || label || '',
                media: media,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
    // Layout options
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
      title: 'Heading Alignment',
      name: 'headingAlign',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
          { title: 'Right', value: 'right' },
        ],
      },
      initialValue: 'center',
    }),
    // Styling options
    defineField({
      title: 'Has Border',
      name: 'hasBorder',
      type: 'boolean',
      description: 'Add border around each item',
      initialValue: false,
    }),
    defineField({
      title: 'Has Background',
      name: 'hasBackground',
      type: 'boolean',
      description: 'Show section background',
      initialValue: true,
    }),
    defineField({
      title: 'Background Color',
      name: 'backgroundColor',
      type: 'string',
      options: {
        list: [
          { title: 'White', value: 'white' },
          { title: 'Gray', value: 'gray' },
          { title: 'Green', value: 'green' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      initialValue: 'white',
    }),
    defineField({
      title: 'Custom Background Color',
      name: 'customBackgroundColor',
      type: 'string',
      description: 'Hex color code (e.g., #F8FCF9). Only used if Background Color is Custom.',
      hidden: ({ parent }) => parent?.backgroundColor !== 'custom',
    }),
    defineField({
      title: 'Item Padding',
      name: 'itemPadding',
      type: 'string',
      options: {
        list: [
          { title: 'Small', value: 'small' },
          { title: 'Medium', value: 'medium' },
          { title: 'Large', value: 'large' },
        ],
      },
      initialValue: 'medium',
    }),
    defineField({
      title: 'Item Shadow',
      name: 'itemShadow',
      type: 'boolean',
      description: 'Add shadow effect to items',
      initialValue: false,
    }),
    defineField({
      title: 'Columns',
      name: 'columns',
      type: 'string',
      options: {
        list: [
          { title: 'Auto (based on item count)', value: 'auto' },
          { title: '2 Columns', value: '2' },
          { title: '3 Columns', value: '3' },
          { title: '4 Columns', value: '4' },
        ],
      },
      initialValue: 'auto',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
      items: 'items',
    },
    prepare({ heading, items }) {
      return {
        title: heading || 'Content Grid',
        subtitle: items ? `${items.length} item${items.length !== 1 ? 's' : ''}` : 'No items',
      }
    },
  },
})
