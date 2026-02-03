import { defineField, defineType } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

export default defineType({
  type: 'object',
  name: 'CaseStudies',
  title: 'Case Studies Section',
  icon: DocumentIcon,
  description: 'Display case studies with company logos, titles, and descriptions',
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
      title: 'Case Studies',
      name: 'items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              title: 'Company Name',
              name: 'title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              title: 'Project Title',
              name: 'subtitle',
              type: 'string',
            }),
            defineField({
              title: 'Description',
              name: 'description',
              type: 'text',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              title: 'Company Logo',
              name: 'logo',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
            defineField({
              title: 'Logo Alt Text',
              name: 'logoAlt',
              type: 'string',
            }),
            defineField({
              title: 'Project Image',
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
              subtitle: 'subtitle',
              media: 'logo',
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title || 'Case Study',
                subtitle: subtitle || '',
                media: media,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1),
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
      initialValue: true,
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
      initialValue: 'gray',
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
      items: 'items',
    },
    prepare({ heading, items }) {
      return {
        title: heading || 'Case Studies Section',
        subtitle: items ? `${items.length} case stud${items.length !== 1 ? 'ies' : 'y'}` : 'No case studies',
      }
    },
  },
})
