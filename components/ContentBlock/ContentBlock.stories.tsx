import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ContentBlock } from './ContentBlock'

export default {
  title: 'Components/ContentBlock',
  component: ContentBlock,
} as ComponentMeta<typeof ContentBlock>

const Template: ComponentStory<typeof ContentBlock> = (args) => (
  <ContentBlock {...args} />
)

export const TextOnly = Template.bind({})
TextOnly.args = {
  layout: 'text-only',
  heading: 'Why Handshake Works',
  body: 'Handshake is the leading platform for early career recruiting, connecting employers with the next generation of talent from top institutions across the country.',
}

export const TextImage = Template.bind({})
TextImage.args = {
  layout: 'text-image',
  heading: 'Build Your Brand',
  body: 'Stay top of mind for 20M+ verified candidates and drive consistent touch points to boost engagement.',
  image: null,
  imageAlt: 'Brand building illustration',
  imageOnRight: false,
}

export const Quote = Template.bind({})
Quote.args = {
  layout: 'quote',
  heading: 'Testimonial',
  quoteText: 'Handshake has transformed how we recruit early career talent. The platform makes it easy to connect with qualified candidates.',
  author: 'Jane Smith, Head of Talent Acquisition',
  hasBackground: true,
  backgroundColor: 'dark',
  isDarkText: false,
}

export const CtaBanner = Template.bind({})
CtaBanner.args = {
  layout: 'cta-banner',
  heading: 'Ready to Get Started?',
  body: 'Join thousands of companies using Handshake to find their next generation of talent.',
  cta: {
    url: '/get-started',
    text: 'Get Started',
    hasPrimaryCta: true,
    isEnabled: true,
  },
  hasBackground: true,
  backgroundColor: 'gray',
}
