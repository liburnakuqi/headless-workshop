import { defineField, defineType } from 'sanity'

export default defineType({
  type: 'object',
  name: 'footerColumn',
  title: 'Footer Column',
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Links',
      name: 'links',
      type: 'array',
      of: [{ type: 'footerLink' }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      links: 'links',
    },
    prepare({ title, links }) {
      return {
        title: title || 'Footer Column',
        subtitle: links ? `${links.length} link${links.length !== 1 ? 's' : ''}` : 'No links',
      }
    },
  },
})
