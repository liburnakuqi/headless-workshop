import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Navigation } from './Navigation'

export default {
  title: 'Components/Navigation',
  component: Navigation,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Navigation>

const Template: ComponentStory<typeof Navigation> = (args) => {
  return (
    <>
      <Navigation {...args} />
      <div className="bg-gray-50">
        <div className="container mx-auto h-[50vh] px-5 pt-24">
          Hero content starts here
        </div>
      </div>
      <div className="bg-white">
        <div className="container mx-auto h-[50vh] px-5">Section 1</div>
      </div>
      <div className="bg-gray-50">
        <div className="container mx-auto h-[50vh] px-5">Section 2</div>
      </div>
    </>
  )
}

export const Default = Template.bind({})
Default.args = {
  menu: [
    {
      label: 'Students',
      _key: 'students',
      submenu: [
        { label: 'How it works', url: '/', _key: 'how-it-works' },
        { label: "Who's hiring", url: '/', _key: 'whos-hiring' },
        { label: 'Career tips', url: '/', _key: 'career-tips' },
        { label: 'Companies', url: '/', _key: 'companies' },
        { label: 'Job roles', url: '/', _key: 'job-roles' },
        { label: 'Help center', url: '/', _key: 'help-center' },
      ],
    },
    {
      label: 'Employers',
      _key: 'employers',
      submenu: [
        { label: 'Products', url: '/', _key: 'products' },
        { label: 'Customers', url: '/', _key: 'customers' },
        { label: 'Resources', url: '/', _key: 'resources' },
        { label: 'Blog', url: '/', _key: 'blog' },
        { label: 'Request demo', url: '/', _key: 'request-demo' },
        { label: 'Help center', url: '/', _key: 'help-center-employers' },
      ],
    },
    {
      label: 'Career centers',
      _key: 'career-centers',
      submenu: [
        { label: 'Marketing toolkit', url: '/', _key: 'marketing-toolkit' },
        { label: 'Resources', url: '/', _key: 'resources-cc' },
        { label: 'Events', url: '/', _key: 'events' },
        { label: 'Security', url: '/', _key: 'security' },
        { label: 'Request demo', url: '/', _key: 'request-demo-cc' },
        { label: 'Help center', url: '/', _key: 'help-center-cc' },
      ],
    },
    {
      label: 'Company',
      _key: 'company',
      submenu: [
        { label: 'About', url: '/', _key: 'about' },
        { label: 'Handshake AI', url: '/', _key: 'ai' },
        { label: 'Join us', url: '/', _key: 'join-us' },
        { label: 'Press', url: '/', _key: 'press' },
        { label: 'Blog', url: '/', _key: 'blog-company' },
        { label: 'Brand guidelines', url: '/', _key: 'brand' },
        { label: 'Your Privacy Choices', url: '/', _key: 'privacy-choices' },
        { label: 'Legal hub', url: '/', _key: 'legal' },
      ],
    },
  ],
  ctaButtons: [
    { label: 'Post a job for free', url: '/', isPrimary: false },
    { label: 'Request a demo', url: '/', isPrimary: true },
  ],
}
