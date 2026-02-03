import { defineField } from 'sanity'

/**
 * Creates a color field for Sanity schemas
 * Uses string type with hex color validation (compatible with Sanity v3)
 * 
 * @param options - Configuration options for the color field
 * @returns Sanity field definition
 */
export function createColorField(options: {
  name?: string
  title?: string
  description?: string
  initialValue?: string
  hidden?: (context: any) => boolean
} = {}) {
  return defineField({
    title: options.title || 'Color',
    name: options.name || 'color',
    type: 'string',
    description: options.description || 'Enter a hex color code (e.g., #FF5733 or #FF5733FF for RGBA)',
    validation: (Rule) =>
      Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/, {
        name: 'hex color',
        invert: false,
      }).error('Please enter a valid hex color code (e.g., #FF5733)'),
    initialValue: options.initialValue,
    hidden: options.hidden,
  })
}

/**
 * Creates a background color field with preset options and custom color picker
 * 
 * @param options - Configuration options
 * @returns Array of field definitions (preset selector + custom color picker)
 */
export function createBackgroundColorFields(options: {
  presetOptions?: Array<{ title: string; value: string }>
  customColorName?: string
  customColorTitle?: string
  initialPreset?: string
  hidden?: (context: any) => boolean
} = {}) {
  const {
    presetOptions = [
      { title: 'White', value: 'white' },
      { title: 'Gray', value: 'gray' },
      { title: 'Green', value: 'green' },
      { title: 'Custom', value: 'custom' },
    ],
    customColorName = 'customBackgroundColor',
    customColorTitle = 'Custom Background Color',
    initialPreset = 'white',
    hidden,
  } = options

  return [
    defineField({
      title: 'Background Color',
      name: 'backgroundColor',
      type: 'string',
      options: {
        list: presetOptions,
      },
      initialValue: initialPreset,
      hidden,
    }),
    defineField({
      title: customColorTitle,
      name: customColorName,
      type: 'string',
      description: 'Enter a hex color code (e.g., #FF5733 or #FF5733FF for RGBA). Only used if Background Color is set to Custom.',
      validation: (Rule) =>
        Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/, {
          name: 'hex color',
          invert: false,
        }).error('Please enter a valid hex color code (e.g., #FF5733)'),
      hidden: ({ parent }) => parent?.backgroundColor !== 'custom' || (hidden && hidden({ parent })),
    }),
  ]
}

/**
 * Creates a text color field with color picker
 */
export function createTextColorField(options: {
  name?: string
  title?: string
  description?: string
  initialValue?: string
  hidden?: (context: any) => boolean
} = {}) {
  return defineField({
    title: options.title || 'Text Color',
    name: options.name || 'textColor',
    type: 'string',
    description: options.description || 'Enter a hex color code (e.g., #FF5733 or #FF5733FF for RGBA)',
    validation: (Rule) =>
      Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/, {
        name: 'hex color',
        invert: false,
      }).error('Please enter a valid hex color code (e.g., #FF5733)'),
    initialValue: options.initialValue,
    hidden: options.hidden,
  })
}
