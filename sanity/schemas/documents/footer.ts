import { defineField, defineType } from 'sanity'

export default defineType({
  type: 'document',
  name: 'footer',
  title: 'Footer',
  fields: [
    defineField({
      title: 'Columns',
      name: 'columns',
      type: 'array',
      of: [{ type: 'footerColumn' }],
      description: 'Main navigation columns (Students, Employers, Career centers)',
    }),
    defineField({
      title: 'Company Column',
      name: 'companyColumn',
      type: 'footerColumn',
      description: 'Company section links',
    }),
    defineField({
      title: 'Copyright',
      name: 'copyright',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'App Store Links',
      name: 'appStoreLinks',
      type: 'object',
      fields: [
        defineField({
          title: 'iOS App Store URL',
          name: 'ios',
          type: 'url',
        }),
        defineField({
          title: 'Google Play Store URL',
          name: 'android',
          type: 'url',
        }),
      ],
    }),
    defineField({
      title: 'Legal Links',
      name: 'legalLinks',
      type: 'array',
      of: [{ type: 'footerLink' }],
      description: 'Privacy policy, Terms of service, etc.',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Footer',
      }
    },
  },
})
