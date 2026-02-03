import { Browser } from 'phosphor-react'
import { defineArrayMember, defineField, defineType } from 'sanity'
import { isUniqueOtherThanLang } from '../../helpers/i18n'

export default defineType({
  type: 'document',
  name: 'page',
  title: 'Page',
  i18n: true,
  icon: Browser,
  fields: [
    defineField({
      type: 'string',
      name: 'title',
      title: 'Title',
      validation: (rule) => rule.required(),
    }),
      defineField({
      type: 'slug',
      name: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        isUnique: isUniqueOtherThanLang,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'array',
      name: 'sections',
      title: 'Sections',
      of: [
        defineArrayMember({ type: 'Hero' }),
        defineArrayMember({ type: 'ContentBlock' }),
        defineArrayMember({ type: 'Stats' }),
        defineArrayMember({ type: 'Features' }),
        defineArrayMember({ type: 'CaseStudies' }),
        defineArrayMember({ type: 'ContentGrid' }),
        defineArrayMember({ type: 'LogoCarousel' })
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      lang: '_lang',
    },
    prepare(data) {
      return {
        subtitle: data.lang ? `Page (${data.lang})` : 'Page',
        title: data.title || 'Untitled',
      }
    },
  },
})
