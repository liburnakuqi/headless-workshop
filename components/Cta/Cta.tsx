import * as React from 'react'
import Link from 'next/link'

export type CtaProps = {
  url: string
  text: string
  hasPrimaryCta: boolean
  isEnabled?: boolean
}

export type Props = CtaProps

export const Cta = ({ url = '', text, hasPrimaryCta = true }: Props) => {
  const isMailTo = (url: string) => /^mailto?/i.test(url)
  const isHttp = (url: string) => /^http?/i.test(url)
  const isAnchor = /^#/i.test(url)
  const isExternal = isHttp(url) || isMailTo(url)

  const internalProps = {
    href: url.startsWith('/') || isAnchor ? url : `/${url}`,
  }

  const externalProps = {
    href: url.length > 0 ? url : '/',
  }

  const targetProps = {
    target: isMailTo(url) ? '_self' : '_blank',
  }

  // Handshake-style modern button classes
  const primaryButtonClass =
    'inline-flex items-center justify-center rounded-lg bg-handshake-blue px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-handshake-blue-dark focus:outline-none focus:ring-2 focus:ring-handshake-blue focus:ring-offset-2 transition-colors duration-200'
  const secondaryButtonClass =
    'inline-flex items-center text-base font-semibold text-handshake-blue hover:text-handshake-blue-dark transition-colors duration-200'

  if (isExternal) {
    return (
      <a
        {...externalProps}
        {...targetProps}
        className={hasPrimaryCta ? primaryButtonClass : secondaryButtonClass}
      >
        {text && <span>{text}</span>}
        {!hasPrimaryCta && (
          <span className="ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
          </span>
        )}
      </a>
    )
  }

  const LinkComponent = Link as any
  return (
    <LinkComponent
      {...internalProps}
      locale={false as const}
      className={hasPrimaryCta ? primaryButtonClass : secondaryButtonClass}
    >
      {text && <span>{text}</span>}
      {!hasPrimaryCta && (
        <span className="ml-2">&#8594;</span>
      )}
    </LinkComponent>
  )
}
