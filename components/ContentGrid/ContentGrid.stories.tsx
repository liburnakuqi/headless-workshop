import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ContentGrid } from './ContentGrid'

export default {
  title: 'Components/ContentGrid',
  component: ContentGrid,
} as ComponentMeta<typeof ContentGrid>

const Template: ComponentStory<typeof ContentGrid> = (args) => (
  <ContentGrid {...args} />
)

export const Features = Template.bind({})
Features.args = {
  heading: 'Everything you need to hire top talent',
  items: [
    {
      title: 'Build your brand',
      description: 'Stay top of mind for 20M+ verified candidates and drive consistent touch points to boost engagement.',
    },
    {
      title: 'Find the right candidates',
      description: 'Refine your talent pool using enhanced filtering and targeting capabilities.',
    },
    {
      title: 'Connect with Gen Z',
      description: 'Build meaningful relationships by posting and engaging with candidates on the feed.',
    },
    {
      title: 'Reduce time to hire',
      description: 'Create a seamless hiring experience for your team with tools for end-to-end recruiting.',
    },
  ],
  textAlign: 'left',
  headingAlign: 'center',
  hasBorder: false,
  hasBackground: true,
  backgroundColor: 'green',
  itemPadding: 'medium',
  itemShadow: false,
}

export const Stats = Template.bind({})
Stats.args = {
  items: [
    {
      value: '20M',
      label: 'active college students and recent alumni',
    },
    {
      value: '90%',
      label: 'top ranked institutions in the US',
    },
    {
      value: '1M',
      label: 'employers',
    },
    {
      value: '1,600+',
      label: 'official partnerships with colleges and universities',
    },
  ],
  textAlign: 'center',
  hasBackground: true,
  backgroundColor: 'white',
}

export const CaseStudies = Template.bind({})
CaseStudies.args = {
  heading: 'Success Stories',
  items: [
    {
      title: 'Company Name',
      subtitle: 'Project Title',
      description: 'Description of the case study and results achieved.',
      logo: null,
    },
    {
      title: 'Another Company',
      subtitle: 'Another Project',
      description: 'More details about this successful partnership.',
      logo: null,
    },
  ],
  textAlign: 'left',
  headingAlign: 'center',
  hasBorder: true,
  hasBackground: true,
  backgroundColor: 'gray',
  itemPadding: 'medium',
  itemShadow: true,
}
