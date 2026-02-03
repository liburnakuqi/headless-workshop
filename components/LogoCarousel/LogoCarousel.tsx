import { ScrollAnimation } from 'components/shared/ScrollAnimation'
import * as React from 'react'
import ImageBox from '../shared/ImageBox'

export type LogoItem = {
  logo?: any
  logoAlt?: string
  image?: any
  imageAlt?: string
  name?: string
  quote?: string
  authorName?: string
  authorPronouns?: string
  university?: string
  classYear?: string
}

export type LogoCarouselProps = {
  heading?: string
  titleText?: string
  items: LogoItem[]
  showHeading?: boolean
  layoutType?: 'logos' | 'testimonials'
}

export const LogoCarousel = ({
  heading,
  titleText,
  items = [],
  showHeading = true,
  layoutType = 'logos',
}: LogoCarouselProps) => {
  const isTestimonials = layoutType === 'testimonials'
  
  // Early return if no items
  if (!items || items.length === 0) {
    return null
  }

  return (
    <section
      className={`${isTestimonials ? 'bg-transparent' : 'bg-purple-900'} ${isTestimonials ? 'py-16 lg:py-24' : 'pt-12 lg:pt-16 pb-8 lg:pb-12'} relative overflow-hidden`}
    >
      {/* Decorative gradient strip on the right (only for logos) */}
      {!isTestimonials && (
        <div className="absolute right-0 top-0 bottom-0 w-32 lg:w-48 bg-gradient-to-r from-transparent via-blue-200 to-yellow-200 opacity-30 blur-3xl pointer-events-none" />
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {isTestimonials && titleText && (
          <ScrollAnimation direction="fade" delay={0.2}>
            <h2 className="text-gray-900 text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 lg:mb-16 max-w-4xl mx-auto leading-tight">
              {titleText}
            </h2>
          </ScrollAnimation>
        )}
        {!isTestimonials && heading && showHeading && (
          <ScrollAnimation direction="fade" delay={0.2}>
            <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-12 lg:mb-16 max-w-4xl mx-auto leading-tight">
              {heading}
            </h2>
          </ScrollAnimation>
        )}

        {isTestimonials ? (
          /* Testimonials Layout */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {items.map((item, index) => {
              const isEven = index % 2 === 0
              return (
                <ScrollAnimation key={index} direction="up" delay={index * 0.1}>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} h-full`}>
                      {/* Text Content */}
                      <div className="flex-1 p-6 lg:p-8 flex flex-col justify-between">
                        {item.quote && (
                          <div className="mb-6">
                            <div className="bg-orange-500 rounded-xl p-6 lg:p-8">
                              <p className="text-white text-base lg:text-lg leading-relaxed">
                                "{item.quote}"
                              </p>
                            </div>
                          </div>
                        )}
                        {item.authorName && (
                          <div className="space-y-1">
                            <p className="text-gray-900 font-semibold text-lg">
                              {item.authorName}
                              {item.authorPronouns && (
                                <span className="text-gray-600 font-normal text-sm ml-2">
                                  ({item.authorPronouns})
                                </span>
                              )}
                            </p>
                            {item.university && (
                              <p className="text-gray-700 text-base">
                                {item.university}
                              </p>
                            )}
                            {item.classYear && (
                              <p className="text-gray-600 text-sm">
                                {item.classYear}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                      
                      {/* Image */}
                      {item.image && (
                        <div className="lg:w-1/2 relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-transparent opacity-50 rounded-t-2xl lg:rounded-l-none lg:rounded-r-2xl z-10" />
                          <div className={`absolute ${isEven ? 'top-0 right-0' : 'top-0 left-0'} w-32 h-32 bg-white rounded-full ${isEven ? '-mr-16 -mt-16' : '-ml-16 -mt-16'} opacity-20 z-10`} />
                          <div className={`absolute ${isEven ? 'bottom-0 left-0' : 'bottom-0 right-0'} w-32 h-32 bg-white rounded-full ${isEven ? '-ml-16 -mb-16' : '-mr-16 -mb-16'} opacity-20 z-10`} />
                          <ImageBox
                            image={item.image}
                            alt={item.imageAlt || item.authorName || `Testimonial ${index + 1}`}
                            className="w-full h-64 lg:h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </ScrollAnimation>
              )
            })}
          </div>
        ) : (
          /* Logo Carousel Layout */
          <div className="relative">
            {/* Gradient overlays for fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-purple-900 to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-r from-transparent to-purple-900 z-20 pointer-events-none" />

            {/* Scrolling logos */}
            <div className="overflow-hidden">
              <div className="flex items-center gap-8 lg:gap-12 px-8 animate-scroll">
                {/* First set of logos */}
                {items.map((item, index) => (
                  <div
                    key={`first-${index}`}
                    className="flex-shrink-0 flex items-center justify-center"
                    style={{ minWidth: '120px', maxWidth: '180px' }}
                  >
                    {item.logo ? (
                      <div className="h-12 lg:h-16 w-auto flex items-center justify-center">
                        <div className="filter brightness-0 invert opacity-90 hover:opacity-100 transition-opacity">
                          <ImageBox
                            image={item.logo}
                            alt={item.logoAlt || item.name || `Logo ${index + 1}`}
                            width={180}
                            height={64}
                            className="max-h-12 lg:max-h-16 w-auto object-contain"
                          />
                        </div>
                      </div>
                    ) : item.image ? (
                      <div className="h-12 lg:h-16 w-auto flex items-center justify-center">
                        <div className="filter brightness-0 invert opacity-90 hover:opacity-100 transition-opacity">
                          <ImageBox
                            image={item.image}
                            alt={item.imageAlt || item.name || `Image ${index + 1}`}
                            width={180}
                            height={64}
                            className="max-h-12 lg:max-h-16 w-auto object-contain"
                          />
                        </div>
                      </div>
                    ) : item.name ? (
                      <span className="text-white text-lg font-semibold">{item.name}</span>
                    ) : null}
                  </div>
                ))}

                {/* Duplicate set for seamless loop */}
                {items.map((item, index) => (
                  <div
                    key={`second-${index}`}
                    className="flex-shrink-0 flex items-center justify-center"
                    style={{ minWidth: '120px', maxWidth: '180px' }}
                  >
                    {item.logo ? (
                      <div className="h-12 lg:h-16 w-auto flex items-center justify-center">
                        <div className="filter brightness-0 invert opacity-90 hover:opacity-100 transition-opacity">
                          <ImageBox
                            image={item.logo}
                            alt={item.logoAlt || item.name || `Logo ${index + 1}`}
                            width={180}
                            height={64}
                            className="max-h-12 lg:max-h-16 w-auto object-contain"
                          />
                        </div>
                      </div>
                    ) : item.image ? (
                      <div className="h-12 lg:h-16 w-auto flex items-center justify-center">
                        <div className="filter brightness-0 invert opacity-90 hover:opacity-100 transition-opacity">
                          <ImageBox
                            image={item.image}
                            alt={item.imageAlt || item.name || `Image ${index + 1}`}
                            width={180}
                            height={64}
                            className="max-h-12 lg:max-h-16 w-auto object-contain"
                          />
                        </div>
                      </div>
                    ) : item.name ? (
                      <span className="text-white text-lg font-semibold">{item.name}</span>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
          will-change: transform;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
