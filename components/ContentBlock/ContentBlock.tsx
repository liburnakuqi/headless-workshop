import ImageBox from 'components/shared/ImageBox'
import { ScrollAnimation } from 'components/shared/ScrollAnimation'
import * as React from 'react'
import { Cta, CtaProps } from '../Cta/Cta'
import { QuoteIcon } from '../QuoteIcon/QuoteIcon'

export type ContentBlockProps = {
  // Content
  heading?: string
  body?: string
  quote?: string
  author?: string
  
  // Media
  image?: any
  imageAlt?: string
  
  // Layout
  layout?: 'text-only' | 'text-image' | 'quote' | 'cta-banner'
  imagePosition?: 'left' | 'right' | 'top'
  
  // CTAs
  cta?: CtaProps
  
  // Styling
  backgroundColor?: 'white' | 'gray' | 'light' | 'dark' | 'custom'
  customBackgroundColor?: string
  isDark?: boolean
  hasIcon?: boolean
  textAlign?: 'left' | 'center' | 'right'
}

export const ContentBlock = ({
  heading,
  body,
  quote,
  author,
  image,
  imageAlt,
  layout = 'text-only',
  imagePosition = 'right',
  cta,
  backgroundColor = 'white',
  customBackgroundColor,
  isDark = false,
  hasIcon = false,
  textAlign = 'left',
}: ContentBlockProps) => {
  // Background classes
  const getBackgroundClass = () => {
    if (backgroundColor === 'custom') return ''
    switch (backgroundColor) {
      case 'gray':
        return 'bg-gray-50'
      case 'light':
        return 'bg-secondary-100'
      case 'dark':
        return isDark ? 'bg-primary-500' : 'bg-secondary-600'
      default:
        return 'bg-white'
    }
  }

  const bgStyle = backgroundColor === 'custom' && customBackgroundColor
    ? { backgroundColor: customBackgroundColor }
    : {}

  const textColorClass = isDark ? 'text-grey-50' : 'text-primary-700'
  const borderColorClass = isDark ? 'border-grey-50' : 'border-primary-700'

  // Quote layout
  if (layout === 'quote') {
    return (
      <section className={`${getBackgroundClass()} py-16 lg:py-24`} style={bgStyle}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <ScrollAnimation direction="fade" delay={0.2}>
              <div className="relative text-center">
                {hasIcon && (
                  <div className={`text-center ${textColorClass}`}>
                    <QuoteIcon />
                  </div>
                )}
                <div className={`relative font-times text-2xl font-bold md:text-4xl md:leading-10 ${
                  hasIcon ? 'pt-10' : ''
                } ${textColorClass}`}>
                  "{quote || body}"
                </div>
                {author && (
                  <>
                    <div className={`mx-auto my-4 w-12 border ${borderColorClass}`}></div>
                    <span className={`mt-4 block text-center text-xs md:text-sm ${
                      isDark ? 'text-secondary-500' : 'text-secondary-600'
                    }`}>
                      {author}
                    </span>
                  </>
                )}
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>
    )
  }

  // CTA Banner layout
  if (layout === 'cta-banner') {
    return (
      <section className={`${getBackgroundClass()} py-12 lg:py-20`} style={bgStyle}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {image && imagePosition === 'top' && (
            <div className="relative pb-8 mb-8">
              <ImageBox
                width={905}
                height={350}
                image={image}
                alt={imageAlt || ''}
                className="h-56 w-full object-cover sm:h-72 md:h-80 lg:h-96 rounded-lg"
              />
            </div>
          )}
          <div className={`${textAlign === 'center' ? 'text-center' : textAlign === 'right' ? 'text-right' : ''}`}>
            {heading && (
              <h2 className={`font-times text-3xl ${textColorClass} lg:text-4xl mb-6`}>
                <span className="block font-bold leading-tight xl:inline">
                  {heading}
                </span>
              </h2>
            )}
            {body && (
              <div className={`prose mb-6 ${textColorClass}`}>
                {body}
              </div>
            )}
            {cta && cta.isEnabled && (
              <div className="pt-5">
                <Cta
                  url={cta.url}
                  text={cta.text}
                  hasPrimaryCta={cta.hasPrimaryCta}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }

  // Text + Image layout
  if (layout === 'text-image' && image) {
    const imageOnRight = imagePosition === 'right'
    const imageOnTop = imagePosition === 'top'

    return (
      <section className={`${getBackgroundClass()} py-12 lg:py-20`} style={bgStyle}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {imageOnTop ? (
            <div className="grid grid-cols-1 gap-8">
              <div className="relative">
                <ImageBox
                  width={905}
                  height={500}
                  image={image}
                  alt={imageAlt || ''}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
              <div className={`${textAlign === 'center' ? 'text-center' : textAlign === 'right' ? 'text-right' : ''}`}>
                {heading && (
                  <h2 className={`font-times text-2xl font-bold lg:text-3xl mb-6 ${textColorClass}`}>
                    {heading}
                  </h2>
                )}
                {body && (
                  <div className={`prose mb-6 ${textColorClass}`}>
                    {body}
                  </div>
                )}
                {cta && cta.isEnabled && (
                  <div className="pt-6">
                    <Cta
                      url={cta.url}
                      text={cta.text}
                      hasPrimaryCta={cta.hasPrimaryCta}
                    />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className={`${imageOnRight ? 'order-2' : ''} ${textAlign === 'center' ? 'text-center' : textAlign === 'right' ? 'text-right' : ''}`}>
                {heading && (
                  <h2 className={`font-times text-2xl font-bold lg:text-3xl mb-6 ${textColorClass}`}>
                    {heading}
                  </h2>
                )}
                {body && (
                  <div className={`prose mb-6 ${textColorClass}`}>
                    {body}
                  </div>
                )}
                {cta && cta.isEnabled && (
                  <div className="pt-6">
                    <Cta
                      url={cta.url}
                      text={cta.text}
                      hasPrimaryCta={cta.hasPrimaryCta}
                    />
                  </div>
                )}
              </div>
              <div className={`relative ${imageOnRight ? 'order-1' : ''}`}>
                <div className={`absolute inset-0 translate-x-3 transform ${
                  isDark ? 'bg-secondary-300' : 'bg-secondary-600'
                }`}>
                  <ImageBox
                    width={350}
                    height={350}
                    image={image}
                    alt={imageAlt || ''}
                    className="absolute inset-0 -translate-x-6 translate-y-6 transform object-cover"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    )
  }

  // Text-only layout (FeaturedText)
  return (
    <section className={`${getBackgroundClass()} py-12 lg:py-24`} style={bgStyle}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col ${textAlign === 'center' ? 'items-center text-center' : ''} lg:flex-row gap-8 lg:gap-12`}>
          {heading && (
            <div className="flex-1">
              <h2 className={`font-times text-2xl xl:text-3xl font-bold ${textColorClass}`}>
                <span className="block leading-tight xl:inline">
                  {heading}
                </span>
              </h2>
            </div>
          )}
          {body && (
            <div className={`prose flex-1 lg:flex-[2_2_0%] ${textColorClass}`}>
              {body}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
