import { defineField, defineType } from 'sanity'
import { ImageIcon } from '@sanity/icons'
import { createColorField } from '../../lib/helpers/color'

export default defineType({
  type: 'object',
  name: 'Stats',
  title: 'Stats Section',
  icon: ImageIcon,
  description: 'Display statistics with large numbers and labels',
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
      title: 'Stats',
      name: 'items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              title: 'Value',
              name: 'value',
              type: 'string',
              description: 'The large number or percentage (e.g., "20M", "90%")',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              title: 'Label',
              name: 'label',
              type: 'string',
              description: 'Description text (e.g., "active students")',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              value: 'value',
              label: 'label',
            },
            prepare({ value, label }) {
              return {
                title: value || 'Stat',
                subtitle: label || '',
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
      initialValue: 'center',
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
          { title: 'Custom', value: 'custom' },
        ],
      },
      initialValue: 'white',
    }),
    createColorField({
      name: 'customBackgroundColor',
      title: 'Custom Background Color',
      description: 'Pick a custom background color. Only used if Background Color is set to Custom.',
      hidden: ({ parent }) => parent?.backgroundColor !== 'custom',
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
      items: 'items',
    },
    prepare({ heading, items }) {
      return {
        title: heading || 'Stats Section',
        subtitle: items ? `${items.length} stat${items.length !== 1 ? 's' : ''}` : 'No stats',
      }
    },
  },
})
