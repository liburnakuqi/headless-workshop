import { Browser } from 'phosphor-react'
import { defineArrayMember, defineField, defineType } from 'sanity'

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
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'array',
      name: 'sections',
      title: 'Sections',
      of: [
        defineArrayMember({ type: 'MainHero' }),
        defineArrayMember({ type: 'Quote' }),
        defineArrayMember({ type: 'FeaturedItems' }),
        defineArrayMember({ type: 'MediaModule' }),
        defineArrayMember({ type: 'CtaBanner' }),
        defineArrayMember({ type: 'FeaturedText' })
      ]
    })
  ],
  preview: {
    select: {
      title: 'slug.current',
      lang: "_lang" // We need to find the best way to wrap global routes with localization
    },
    prepare(data) {
      return {
        subtitle: 'Page',
        title: data.title, // getLangTitleByLocale(data.lang),
      }
    },
  },
})
