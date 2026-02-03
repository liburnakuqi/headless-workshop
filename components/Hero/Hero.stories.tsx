import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Hero } from './Hero'

export default {
  title: 'Components/Hero',
  component: Hero,
} as ComponentMeta<typeof Hero>

const Template: ComponentStory<typeof Hero> = (args) => (
  <Hero {...args} />
)

export const SplitLayout = Template.bind({})
SplitLayout.args = {
  layout: 'split',
  heading: 'Find your next generation of talent',
  body: 'Connect with 20M+ verified college students and recent alumni from top institutions.',
  heroImage: null,
  heroImageAlt: 'Hero image',
  cta: {
    url: '/get-started',
    text: 'Get Started',
    hasPrimaryCta: true,
    isEnabled: true,
  },
}

export const CenteredWithVideo = Template.bind({})
CenteredWithVideo.args = {
  layout: 'centered',
  videoUrl: null,
  eyebrow: 'New Feature',
  heading: 'Experience the Future of Hiring',
  subheading: 'Watch how we help companies connect with top talent.',
  buttons: [
    {
      url: '/watch-demo',
      text: 'Watch Demo',
      hasPrimaryCta: true,
      isEnabled: true,
    },
  ],
  overlay: true,
  overlayOpacity: 0.5,
  backgroundColor: 'dark',
}

export const FullWidth = Template.bind({})
FullWidth.args = {
  layout: 'full-width',
  backgroundImage: null,
  heading: 'Transform Your Hiring Process',
  body: 'Join thousands of companies using Handshake to find their next generation of talent.',
  cta: {
    url: '/get-started',
    text: 'Get Started',
    hasPrimaryCta: true,
    isEnabled: true,
  },
  overlay: true,
  overlayOpacity: 0.3,
  backgroundColor: 'dark',
}
