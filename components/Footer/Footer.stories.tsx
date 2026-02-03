import React, { ComponentProps } from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Footer } from './Footer'

export default {
  title: 'Components/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Footer>

const Template: ComponentStory<typeof Footer> = (args) => <Footer {...args} />

export const Default = Template.bind({})
Default.args = {
  columns: [
    {
      title: 'Students',
      links: [
        { label: 'How it works', url: '/' },
        { label: "Who's hiring", url: '/' },
        { label: 'Career tips', url: '/' },
        { label: 'Companies', url: '/' },
        { label: 'Job roles', url: '/' },
        { label: 'Help center', url: '/' },
      ],
    },
    {
      title: 'Employers',
      links: [
        { label: 'Products', url: '/' },
        { label: 'Customers', url: '/' },
        { label: 'Resources', url: '/' },
        { label: 'Blog', url: '/' },
        { label: 'Request demo', url: '/' },
        { label: 'Help center', url: '/' },
      ],
    },
    {
      title: 'Career centers',
      links: [
        { label: 'Marketing toolkit', url: '/' },
        { label: 'Resources', url: '/' },
        { label: 'Events', url: '/' },
        { label: 'Security', url: '/' },
        { label: 'Request demo', url: '/' },
        { label: 'Help center', url: '/' },
      ],
    },
  ],
  companyColumn: {
    title: 'Company',
    links: [
      { label: 'About', url: '/' },
      { label: 'Handshake AI', url: '/' },
      { label: 'Join us', url: '/' },
      { label: 'Press', url: '/' },
      { label: 'Blog', url: '/' },
      { label: 'Brand guidelines', url: '/' },
      { label: 'Your Privacy Choices', url: '/' },
      { label: 'Legal hub', url: '/' },
    ],
  },
  copyright: '©2026 Handshake. All rights reserved',
  appStoreLinks: {
    ios: 'https://apps.apple.com/app/handshake/id123456789',
    android: 'https://play.google.com/store/apps/details?id=com.handshake',
  },
  countrySelector: {
    label: 'United States',
    currentCountry: 'United States',
  },
  legalLinks: [
    { label: 'Privacy policy', url: '/' },
    { label: 'Accessibility', url: '/' },
    { label: 'Terms of service', url: '/' },
  ],
}
