import { defineField, defineType } from 'sanity'

export default defineType({
  type: 'object',
  name: 'footerLink',
  title: 'Footer Link',
  fields: [
    defineField({
      title: 'Label',
      name: 'label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Url',
      name: 'url',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      label: 'label',
      url: 'url',
    },
    prepare({ label, url }) {
      return {
        title: label,
        subtitle: url,
      }
    },
  },
})
