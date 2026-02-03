import React from 'react'
import * as NextImage from 'next/image'
import type { Preview } from '@storybook/react'
import { mono, sans, serif } from '../styles/font'
import '../styles/index.css'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <>
        <style jsx global>
          {`
            :root {
              --font-mono: ${mono.style.fontFamily};
              --font-sans: ${sans.style.fontFamily};
              --font-serif: ${serif.style.fontFamily};
            }
          `}
        </style>
        <Story />
      </>
    ),
  ],
}

// Workaround to allowing Nextjs image to render properly
const OriginalNextImage = NextImage.default

// Use a flag to prevent multiple redefinitions (for hot reload)
const imageMockKey = '__next_image_mocked__'
if (!(NextImage as any)[imageMockKey]) {
  try {
    const descriptor = Object.getOwnPropertyDescriptor(NextImage, 'default')
    if (!descriptor || descriptor.configurable) {
      Object.defineProperty(NextImage, 'default', {
        configurable: true,
        writable: true,
        enumerable: true,
        value: (props: any) =>
          React.createElement(OriginalNextImage, { ...props, unoptimized: true }),
      })
      ;(NextImage as any)[imageMockKey] = true
    }
  } catch (e) {
    // Silently fail if we can't redefine
    console.warn('Could not redefine NextImage.default:', e)
  }
}

export default preview
