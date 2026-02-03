import { ScrollAnimation } from 'components/shared/ScrollAnimation'
import * as React from 'react'
import ImageBox from '../shared/ImageBox'

export type LogoItem = {
  logo?: any
  logoAlt?: string
  image?: any
  imageAlt?: string
  name?: string
}

export type LogoCarouselProps = {
  heading?: string
  items: LogoItem[]
  backgroundColor?: 'teal' | 'purple' | 'custom'
  customBackgroundColor?: string
  showHeading?: boolean
}

export const LogoCarousel = ({
  heading,
  items,
  backgroundColor = 'teal',
  customBackgroundColor,
  showHeading = true,
}: LogoCarouselProps) => {
  const bgColorClass =
    backgroundColor === 'teal'
      ? 'bg-teal-900'
      : backgroundColor === 'purple'
        ? 'bg-purple-900'
        : ''

  const bgStyle = backgroundColor === 'custom' && customBackgroundColor
    ? { backgroundColor: customBackgroundColor }
    : {}

  return (
    <section
      className={`${bgColorClass} py-12 lg:py-16 relative overflow-hidden`}
      style={bgStyle}
    >
      {/* Decorative gradient strip on the right */}
      <div className="absolute right-0 top-0 bottom-0 w-32 lg:w-48 bg-gradient-to-r from-transparent via-blue-200 to-yellow-200 opacity-30 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {heading && showHeading && (
          <ScrollAnimation direction="fade" delay={0.2}>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center mb-8 lg:mb-12 max-w-4xl mx-auto leading-tight">
              {heading}
            </h2>
          </ScrollAnimation>
        )}

        {/* Carousel Container */}
        <div className="relative">
          {/* Gradient overlays for fade effect */}
          <div className={`absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r ${bgColorClass || 'from-teal-900'} to-transparent z-20 pointer-events-none`} style={bgStyle ? { background: `linear-gradient(to right, ${customBackgroundColor || '#134e4a'}, transparent)` } : {}} />
          <div className={`absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-r from-transparent ${bgColorClass || 'to-teal-900'} z-20 pointer-events-none`} style={bgStyle ? { background: `linear-gradient(to right, transparent, ${customBackgroundColor || '#134e4a'})` } : {}} />

          {/* Scrolling logos */}
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-8 lg:gap-12 px-8 animate-scroll">
              {/* First set of logos */}
              {items.map((item, index) => (
                <div
                  key={`first-${index}`}
                  className="flex-shrink-0 flex items-center justify-center"
                  style={{ minWidth: '120px', maxWidth: '180px' }}
                >
                  {item.logo ? (
                    <div className="h-12 lg:h-16 w-auto flex items-center justify-center filter brightness-0 invert opacity-90 hover:opacity-100 transition-opacity">
                      <ImageBox
                        image={item.logo}
                        alt={item.logoAlt || item.name || `Logo ${index + 1}`}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  ) : item.image ? (
                    <div className="h-12 lg:h-16 w-auto flex items-center justify-center">
                      <ImageBox
                        image={item.image}
                        alt={item.imageAlt || item.name || `Image ${index + 1}`}
                        className="max-h-full max-w-full object-contain rounded"
                      />
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
                    <div className="h-12 lg:h-16 w-auto flex items-center justify-center filter brightness-0 invert opacity-90 hover:opacity-100 transition-opacity">
                      <ImageBox
                        image={item.logo}
                        alt={item.logoAlt || item.name || `Logo ${index + 1}`}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  ) : item.image ? (
                    <div className="h-12 lg:h-16 w-auto flex items-center justify-center">
                      <ImageBox
                        image={item.image}
                        alt={item.imageAlt || item.name || `Image ${index + 1}`}
                        className="max-h-full max-w-full object-contain rounded"
                      />
                    </div>
                  ) : item.name ? (
                    <span className="text-white text-lg font-semibold">{item.name}</span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
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
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
