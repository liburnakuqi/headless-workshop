import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { LogoCarousel } from './LogoCarousel'

export default {
  title: 'Components/LogoCarousel',
  component: LogoCarousel,
} as ComponentMeta<typeof LogoCarousel>

const Template: ComponentStory<typeof LogoCarousel> = (args) => (
  <LogoCarousel {...args} />
)

export const Default = Template.bind({})
Default.args = {
  heading: '100% of Fortune 100 companies use Handshake to find their next generation of talent',
  items: [
    { name: 'General Mills', logo: null },
    { name: 'Pfizer', logo: null },
    { name: 'Match Education', logo: null },
    { name: 'Charles Schwab', logo: null },
    { name: 'Nike', logo: null },
    { name: 'Hilton', logo: null },
    { name: 'The New York Times', logo: null },
    { name: 'EY', logo: null },
    { name: 'P&G', logo: null },
    { name: 'Google', logo: null },
  ],
  showHeading: true,
}

export const WithImages = Template.bind({})
WithImages.args = {
  heading: 'Trusted by leading companies',
  items: [
    { name: 'Company 1', image: null, imageAlt: 'Company logo' },
    { name: 'Company 2', image: null, imageAlt: 'Company logo' },
    { name: 'Company 3', image: null, imageAlt: 'Company logo' },
    { name: 'Company 4', image: null, imageAlt: 'Company logo' },
    { name: 'Company 5', image: null, imageAlt: 'Company logo' },
  ],
  showHeading: true,
}

export const NoHeading = Template.bind({})
NoHeading.args = {
  items: [
    { name: 'Logo 1', logo: null },
    { name: 'Logo 2', logo: null },
    { name: 'Logo 3', logo: null },
    { name: 'Logo 4', logo: null },
  ],
  showHeading: false,
}
