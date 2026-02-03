import { defineField, defineType } from 'sanity'
import { ImageIcon } from '@sanity/icons'

export default defineType({
  type: 'object',
  name: 'LogoCarousel',
  title: 'Logo Carousel',
  icon: ImageIcon,
  fields: [
    defineField({
      title: 'Layout Type',
      name: 'layoutType',
      type: 'string',
      options: {
        list: [
          { title: 'Logo Carousel (scrolling logos)', value: 'logos' },
          { title: 'Testimonials (text + images)', value: 'testimonials' },
        ],
      },
      initialValue: 'logos',
      description: 'Choose between scrolling logos or testimonial cards',
    }),
    defineField({
      title: 'Title Text',
      name: 'titleText',
      type: 'string',
      description: 'Main title text (e.g., "For people who are (or have been) in your shoes")',
      hidden: ({ parent }) => parent?.layoutType !== 'testimonials',
    }),
    defineField({
      title: 'Heading',
      name: 'heading',
      type: 'string',
      description: 'Optional heading text above the carousel (for logo carousel)',
      hidden: ({ parent }) => parent?.layoutType === 'testimonials',
    }),
    defineField({
      title: 'Show Heading',
      name: 'showHeading',
      type: 'boolean',
      description: 'Whether to display the heading',
      initialValue: true,
      hidden: ({ parent }) => parent?.layoutType === 'testimonials',
    }),
    defineField({
      title: 'Items',
      name: 'items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              title: 'Logo',
              name: 'logo',
              type: 'image',
              options: {
                hotspot: true,
              },
              description: 'Logo image (will be displayed in white)',
              hidden: ({ parent }) => parent?.layoutType === 'testimonials',
            }),
            defineField({
              title: 'Image',
              name: 'image',
              type: 'image',
              options: {
                hotspot: true,
              },
              description: 'Person photo or image (for testimonials) or alternative image (for logos)',
            }),
            defineField({
              title: 'Quote/Testimonial',
              name: 'quote',
              type: 'text',
              description: 'Testimonial or quote text (for testimonial layout)',
              hidden: ({ parent }) => parent?.layoutType !== 'testimonials',
            }),
            defineField({
              title: 'Author Name',
              name: 'authorName',
              type: 'string',
              description: 'Name of the person giving the testimonial',
              hidden: ({ parent }) => parent?.layoutType !== 'testimonials',
            }),
            defineField({
              title: 'Author Pronouns',
              name: 'authorPronouns',
              type: 'string',
              description: 'Pronouns (e.g., she/her, he/him, they/them)',
              hidden: ({ parent }) => parent?.layoutType !== 'testimonials',
            }),
            defineField({
              title: 'University/Company',
              name: 'university',
              type: 'string',
              description: 'University or company name',
              hidden: ({ parent }) => parent?.layoutType !== 'testimonials',
            }),
            defineField({
              title: 'Class/Year',
              name: 'classYear',
              type: 'string',
              description: 'Class year or graduation year (e.g., Class of 2027)',
              hidden: ({ parent }) => parent?.layoutType !== 'testimonials',
            }),
            defineField({
              title: 'Name',
              name: 'name',
              type: 'string',
              description: 'Company or item name (used as fallback or alt text for logos)',
              hidden: ({ parent }) => parent?.layoutType === 'testimonials',
            }),
            defineField({
              title: 'Logo Alt Text',
              name: 'logoAlt',
              type: 'string',
              description: 'Alternative text for the logo',
              hidden: ({ parent }) => parent?.layoutType === 'testimonials',
            }),
            defineField({
              title: 'Image Alt Text',
              name: 'imageAlt',
              type: 'string',
              description: 'Alternative text for the image',
            }),
          ],
          preview: {
            select: {
              name: 'name',
              authorName: 'authorName',
              quote: 'quote',
              logo: 'logo',
              image: 'image',
            },
            prepare({ name, authorName, quote, logo, image }) {
              return {
                title: authorName || name || 'Carousel Item',
                subtitle: quote ? quote.substring(0, 50) + '...' : '',
                media: logo || image,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
      items: 'items',
    },
    prepare({ heading, items }) {
      return {
        title: heading || 'Logo Carousel',
        subtitle: items ? `${items.length} logo${items.length !== 1 ? 's' : ''}` : 'No logos',
      }
    },
  },
})
