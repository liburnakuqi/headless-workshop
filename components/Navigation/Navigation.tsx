import Link from 'next/link'
import * as React from 'react'
import { NavLogo } from './NavLogo'

type SubMenuItem = {
  label: string
  url: string
  _key: string
}

type MenuItem = {
  label: string
  url?: string
  submenu?: SubMenuItem[]
  _key: string
}

type CtaButton = {
  label: string
  url: string
  isPrimary?: boolean
}

export type NavigationProps = {
  menu: MenuItem[]
  ctaButtons?: CtaButton[]
}

export type Props = NavigationProps

const MobileMenuItem = ({ item, onClose }: { item: MenuItem; onClose: () => void }) => {
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = React.useState(false)

  if (!item.submenu) {
    return (
      <Link
        href={item.url || '#'}
        className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
        onClick={onClose}
      >
        {item.label}
      </Link>
    )
  }

  return (
    <div>
      <button
        onClick={() => setMobileSubmenuOpen(!mobileSubmenuOpen)}
        className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
      >
        <span>{item.label}</span>
        <svg
          className={`h-5 w-5 transition-transform ${mobileSubmenuOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {mobileSubmenuOpen && (
        <div className="pl-4 space-y-1 mt-1">
          {item.url && (
            <Link
              href={item.url}
              className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              onClick={onClose}
            >
              {item.label} (Main)
            </Link>
          )}
          {item.submenu.map((subItem) => (
            <Link
              key={subItem._key}
              href={subItem.url}
              className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              onClick={onClose}
            >
              {subItem.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export const Navigation = ({ menu, ctaButtons }: Props) => {
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <NavLogo />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1 lg:space-x-2">
            {menu && menu.length > 0 ? (
              menu.map((item) => (
              <div
                key={item._key}
                className="relative group"
                onMouseEnter={() => item.submenu && setOpenDropdown(item._key)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {item.url && !item.submenu ? (
                  <Link
                    href={item.url}
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <div className="flex items-center">
                    {item.url ? (
                      <Link
                        href={item.url}
                        className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span className="px-3 py-2 text-sm font-medium text-gray-700">
                        {item.label}
                      </span>
                    )}
                    {item.submenu && (
                      <svg
                        className="ml-1 h-4 w-4 text-gray-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </div>
                )}

                {/* Dropdown Menu */}
                {item.submenu && openDropdown === item._key && (
                  <div className="absolute left-0 top-full mt-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem._key}
                          href={subItem.url}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          onClick={() => setOpenDropdown(null)}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              ))
            ) : null}
          </div>

          {/* CTA Buttons */}
          {ctaButtons && ctaButtons.length > 0 && (
            <div className="hidden md:flex md:items-center md:space-x-4">
              {ctaButtons.map((cta, index) => (
              <Link
                key={index}
                href={cta.url}
                className={
                  cta.isPrimary
                    ? 'px-4 py-2 text-sm font-semibold text-white bg-handshake-blue rounded-lg hover:bg-handshake-blue-dark transition-colors'
                    : 'px-4 py-2 text-sm font-semibold text-handshake-blue hover:text-handshake-blue-dark transition-colors'
                }
              >
                {cta.label}
              </Link>
              ))}
            </div>
          )}

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menu && menu.length > 0 ? (
                menu.map((item) => (
                <div key={item._key}>
                  <MobileMenuItem
                    item={item}
                    onClose={() => setMobileMenuOpen(false)}
                  />
                </div>
                ))
              ) : null}
              {ctaButtons && ctaButtons.length > 0 && (
                <div className="pt-4 space-y-2">
                  {ctaButtons.map((cta, index) => (
                    <Link
                      key={index}
                      href={cta.url}
                      className={
                        cta.isPrimary
                          ? 'block w-full text-center px-4 py-2 text-sm font-semibold text-white bg-handshake-blue rounded-lg hover:bg-handshake-blue-dark'
                          : 'block w-full text-center px-4 py-2 text-sm font-semibold text-handshake-blue hover:text-handshake-blue-dark'
                      }
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {cta.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
