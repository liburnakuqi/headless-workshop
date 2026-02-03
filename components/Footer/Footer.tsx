import Link from 'next/link'
import * as React from 'react'
import { FooterLogo } from './FooterLogo'

type FooterLink = {
  label: string
  url: string
}

type FooterColumn = {
  title: string
  links: FooterLink[]
}

export type FooterProps = {
  columns: FooterColumn[]
  companyColumn: FooterColumn
  copyright: string
  appStoreLinks?: {
    ios?: string
    android?: string
  }
  legalLinks: FooterLink[]
}

export type Props = FooterProps

export const Footer = ({
  columns = [],
  companyColumn,
  copyright = '',
  appStoreLinks,
  legalLinks = [],
}: Partial<Props>) => {
  // Early return if no footer data
  if (!columns.length && !companyColumn && !copyright) {
    return null
  }

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Logo Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <FooterLogo />
            </Link>
            {appStoreLinks && (
              <div className="flex flex-col space-y-3">
                {appStoreLinks.ios && (
                  <Link href={appStoreLinks.ios} className="inline-block">
                    <img
                      src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&releaseDate=1288569600"
                      alt="Download on the App Store"
                      className="h-10 w-auto"
                    />
                  </Link>
                )}
                {appStoreLinks.android && (
                  <Link href={appStoreLinks.android} className="inline-block">
                    <img
                      src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                      alt="Get it on Google Play"
                      className="h-10 w-auto"
                    />
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Navigation Columns */}
          {columns && columns.length > 0 && columns.map((column, index) => (
            <div key={index}>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links && column.links.map((link) => (
                  <li key={link.url}>
                    <Link
                      href={link.url}
                      className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Company Column */}
          {companyColumn && (
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                {companyColumn.title}
              </h3>
              <ul className="space-y-3">
                {companyColumn.links && companyColumn.links.map((link) => (
                  <li key={link.url}>
                    <Link
                      href={link.url}
                      className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            {/* Copyright and Legal Links */}
            <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-6">
              <span className="text-sm text-gray-600">{copyright}</span>
              {legalLinks && legalLinks.length > 0 && (
                <div className="flex flex-wrap gap-4">
                  {legalLinks.map((link) => (
                    <Link
                      key={link.url}
                      href={link.url}
                      className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
