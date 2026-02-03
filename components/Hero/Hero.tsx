import ImageBox from 'components/shared/ImageBox'
import { Parallax, ScrollAnimation } from 'components/shared/ScrollAnimation'
import { urlForFile } from '../../sanity/lib/helpers/file'
import * as React from 'react'
import { Cta, CtaProps } from '../Cta/Cta'

export type HeroProps = {
  // Content
  heading: string
  eyebrow?: string
  body?: string
  subheading?: string
  
  // Media
  heroImage?: any
  heroImageAlt?: string
  backgroundImage?: any
  videoUrl?: string | { asset?: { url?: string } }
  
  // Layout
  layout?: 'split' | 'centered' | 'full-width'
  imagePosition?: 'left' | 'right'
  
  // CTAs
  cta?: CtaProps
  buttons?: CtaProps[]
  
  // Styling
  backgroundColor?: 'gradient' | 'white' | 'dark' | 'custom'
  customBackgroundColor?: string
  overlay?: boolean
  overlayOpacity?: number
}

export const Hero = ({
  heading,
  eyebrow,
  body,
  subheading,
  heroImage,
  heroImageAlt,
  backgroundImage,
  videoUrl,
  layout = 'split',
  imagePosition = 'right',
  cta,
  buttons = [],
  backgroundColor = 'gradient',
  customBackgroundColor,
  overlay = true,
  overlayOpacity = 0.4,
}: HeroProps) => {
  const videoRef = React.useRef<HTMLVideoElement>(null)

  // Get video URL
  const videoSrc = React.useMemo(() => {
    if (!videoUrl) return undefined
    return urlForFile(videoUrl)
  }, [videoUrl])

  React.useEffect(() => {
    if (videoRef.current && videoSrc) {
      videoRef.current.volume = 0
      videoRef.current.loop = true
      videoRef.current.muted = true
      videoRef.current.play().catch(() => {})
    }
  }, [videoSrc])

  // Background classes
  const getBackgroundClass = () => {
    switch (backgroundColor) {
      case 'white':
        return 'bg-white'
      case 'dark':
        return 'bg-gray-900'
      case 'gradient':
        return 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
      default:
        return ''
    }
  }

  const bgStyle = backgroundColor === 'custom' && customBackgroundColor
    ? { backgroundColor: customBackgroundColor }
    : {}

  const isCentered = layout === 'centered'
  const isFullWidth = layout === 'full-width'
  const hasImage = heroImage || videoSrc
  const showImageLeft = imagePosition === 'left' && !isCentered

  return (
    <section
      className={`relative ${getBackgroundClass()} overflow-hidden`}
      style={bgStyle}
    >
      {/* Background Image */}
      {backgroundImage && !videoSrc && (
        <ImageBox
          image={backgroundImage}
          className="absolute inset-0 h-full w-full object-cover opacity-10"
        />
      )}

      {/* Video Background */}
      {videoSrc && (
        <>
          <video
            ref={videoRef}
            src={videoSrc}
            muted
            autoPlay
            loop
            playsInline
            className="absolute inset-0 z-0 w-full h-full object-cover scale-105"
          />
          {overlay && (
            <div
              className="absolute inset-0 z-10 bg-black"
              style={{ opacity: overlayOpacity }}
            />
          )}
        </>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`relative z-20 ${
          isCentered ? 'min-h-screen flex flex-col justify-between py-16 md:py-24 lg:py-32' : 'py-16 md:py-24 lg:py-32'
        } ${isFullWidth ? 'max-w-full' : ''}`}>
          {isCentered ? (
            // Centered layout (for video hero)
            <>
              <div className="max-w-4xl mx-auto text-center flex-1 flex flex-col justify-center">
                {eyebrow && (
                  <ScrollAnimation direction="fade" delay={0.2}>
                    <span className="mb-4 inline-block text-sm font-semibold text-handshake-blue uppercase tracking-wide">
                      {eyebrow}
                    </span>
                  </ScrollAnimation>
                )}
                <ScrollAnimation direction="fade" delay={0.2}>
                  <h1 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight drop-shadow-lg">
                    {heading}
                  </h1>
                </ScrollAnimation>
                {subheading && (
                  <ScrollAnimation direction="fade" delay={0.4}>
                    <p className="text-lg text-white/90 sm:text-xl md:text-2xl mb-12 max-w-2xl mx-auto drop-shadow-md">
                      {subheading}
                    </p>
                  </ScrollAnimation>
                )}
              </div>
              {(buttons.length > 0 || cta) && (
                <div className="max-w-4xl mx-auto text-center pb-8 md:pb-12">
                  <ScrollAnimation direction="up" delay={0.6}>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                      {buttons.map((button, index) => (
                        <Cta
                          key={index}
                          url={button.url}
                          text={button.text}
                          hasPrimaryCta={button.hasPrimaryCta}
                          isEnabled={button.isEnabled !== false}
                        />
                      ))}
                      {cta && cta.isEnabled && (
                        <Cta
                          url={cta.url}
                          text={cta.text}
                          hasPrimaryCta={cta.hasPrimaryCta}
                        />
                      )}
                    </div>
                  </ScrollAnimation>
                </div>
              )}
            </>
          ) : (
            // Split layout (for main hero)
            <div className={`grid grid-cols-1 ${hasImage ? 'lg:grid-cols-2' : ''} gap-12 items-center`}>
              <div className={`${showImageLeft ? 'order-2' : ''} ${isFullWidth ? 'text-center' : 'text-center lg:text-left'}`}>
                <ScrollAnimation direction="right" delay={0.2}>
                  {eyebrow && (
                    <ScrollAnimation direction="fade" delay={0.3}>
                      <span className="mb-4 inline-block text-sm font-semibold text-handshake-blue uppercase tracking-wide">
                        {eyebrow}
                      </span>
                    </ScrollAnimation>
                  )}
                      {heading && (
                        <ScrollAnimation direction="up" delay={0.4}>
                          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight">
                            {heading}
                          </h1>
                        </ScrollAnimation>
                      )}
                  {body && (
                    <ScrollAnimation direction="up" delay={0.5}>
                      <p className="mt-6 text-lg text-gray-600 sm:text-xl max-w-2xl mx-auto lg:mx-0 mb-8">
                        {body}
                      </p>
                    </ScrollAnimation>
                  )}
                  {cta && cta.isEnabled && (
                    <ScrollAnimation direction="up" delay={0.6}>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <Cta
                          url={cta.url}
                          text={cta.text}
                          hasPrimaryCta={cta.hasPrimaryCta}
                        />
                      </div>
                    </ScrollAnimation>
                  )}
                </ScrollAnimation>
              </div>

              {hasImage && (
                <div className={showImageLeft ? 'order-1' : ''}>
                  <Parallax speed={0.3} direction="up">
                    <ScrollAnimation direction="left" delay={0.3}>
                      <div className="relative">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                          <ImageBox
                            width={905}
                            height={785}
                            image={heroImage}
                            alt={heroImageAlt || ''}
                            className="w-full h-auto object-cover"
                          />
                        </div>
                      </div>
                    </ScrollAnimation>
                  </Parallax>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
