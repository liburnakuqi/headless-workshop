import { Link } from 'phosphor-react'
import { defineField, defineType } from 'sanity'

const subMenuItem = {
  title: 'Submenu Item',
  name: 'subMenuItem',
  type: 'object',
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
}

const menuItem = {
  title: 'Menu Item',
  name: 'menuItem',
  type: 'object',
  icon: Link,
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
      description: 'Optional - leave empty if using submenu',
    }),
    defineField({
      title: 'Submenu',
      name: 'submenu',
      type: 'array',
      of: [subMenuItem],
      description: 'Optional - add submenu items if no direct URL',
    }),
  ],
}

const ctaButton = {
  title: 'CTA Button',
  name: 'ctaButton',
  type: 'object',
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
    defineField({
      title: 'Is Primary',
      name: 'isPrimary',
      type: 'boolean',
      description: 'Primary button (blue) or secondary (text)',
      initialValue: false,
    }),
  ],
}

export default defineType({
  type: 'document',
  name: 'navigation',
  title: 'Navigation',
  fields: [
    defineField({
      title: 'Menu',
      name: 'menu',
      type: 'array',
      of: [menuItem],
    }),
    defineField({
      title: 'CTA Buttons',
      name: 'ctaButtons',
      type: 'array',
      of: [ctaButton],
      description: 'Call-to-action buttons in the header',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Navigation',
      }
    },
  },
})
