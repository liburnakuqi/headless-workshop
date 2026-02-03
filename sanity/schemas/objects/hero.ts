import { defineField, defineType } from 'sanity'
import { ImageIcon } from '@sanity/icons'
import { createBackgroundColorFields } from '../../lib/helpers/color'

export default defineType({
  type: 'object',
  name: 'Hero',
  title: 'Hero',
  icon: ImageIcon,
  fields: [
    defineField({
      title: 'Heading',
      name: 'heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Eyebrow',
      name: 'eyebrow',
      type: 'string',
      description: 'Small text above the heading',
    }),
    defineField({
      title: 'Body',
      name: 'body',
      type: 'text',
      description: 'Description text (for split layout)',
    }),
    defineField({
      title: 'Subheading',
      name: 'subheading',
      type: 'text',
      description: 'Subheading text (for centered/video layout)',
    }),
    defineField({
      title: 'Layout',
      name: 'layout',
      type: 'string',
      options: {
        list: [
          { title: 'Split (text + image side by side)', value: 'split' },
          { title: 'Centered (for video hero)', value: 'centered' },
          { title: 'Full Width', value: 'full-width' },
        ],
      },
      initialValue: 'split',
    }),
    defineField({
      title: 'Image Position',
      name: 'imagePosition',
      type: 'string',
      options: {
        list: [
          { title: 'Right', value: 'right' },
          { title: 'Left', value: 'left' },
        ],
      },
      initialValue: 'right',
      hidden: ({ parent }) => parent?.layout === 'centered',
    }),
    defineField({
      title: 'Hero Image',
      name: 'heroImage',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Main hero image (for split layout)',
    }),
    defineField({
      title: 'Hero Image Alt Text',
      name: 'heroImageAlt',
      type: 'string',
    }),
    defineField({
      title: 'Background Image',
      name: 'backgroundImage',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Background image (subtle, behind content)',
    }),
    defineField({
      title: 'Video File',
      name: 'videoUrl',
      type: 'file',
      options: {
        accept: 'video/mp4,video/webm',
      },
      description: 'Video file for video hero (centered layout)',
    }),
    defineField({
      title: 'Show Overlay',
      name: 'overlay',
      type: 'boolean',
      description: 'Add dark overlay over video',
      initialValue: true,
    }),
    defineField({
      title: 'Overlay Opacity',
      name: 'overlayOpacity',
      type: 'number',
      description: 'Opacity of the overlay (0-1)',
      initialValue: 0.4,
      validation: (Rule) => Rule.min(0).max(1),
    }),
    defineField({
      title: 'CTA Button',
      name: 'cta',
      type: 'Cta',
      description: 'Single CTA button (for split layout)',
    }),
    defineField({
      title: 'Buttons',
      name: 'buttons',
      type: 'array',
      of: [{ type: 'Cta' }],
      description: 'Multiple CTA buttons (for centered/video layout)',
    }),
    ...createBackgroundColorFields({
      presetOptions: [
        { title: 'Gradient', value: 'gradient' },
        { title: 'White', value: 'white' },
        { title: 'Dark', value: 'dark' },
        { title: 'Custom', value: 'custom' },
      ],
      initialPreset: 'gradient',
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
      layout: 'layout',
      media: 'heroImage',
    },
    prepare({ heading, layout, media }) {
      return {
        title: heading || 'Hero',
        subtitle: layout || 'split',
        media: media,
      }
    },
  },
})
