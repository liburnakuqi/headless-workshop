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
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [isMuted, setIsMuted] = React.useState(true)

  // Get video URL
  const videoSrc = React.useMemo(() => {
    if (!videoUrl) return undefined
    return urlForFile(videoUrl)
  }, [videoUrl])

  React.useEffect(() => {
    if (videoRef.current && videoSrc) {
      videoRef.current.volume = 0.3
      videoRef.current.loop = true
      videoRef.current.muted = isMuted
      videoRef.current.play().catch(() => {})
      setIsPlaying(true)
    }
  }, [videoSrc, isMuted])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

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
            muted={isMuted}
            autoPlay
            loop
            playsInline
            className="absolute inset-0 z-0 w-full h-full object-cover"
          />
          {overlay && (
            <div
              className="absolute inset-0 z-10 bg-black"
              style={{ opacity: overlayOpacity }}
            />
          )}
          {/* Video Controls */}
          <div className="absolute top-4 right-4 z-30 flex gap-2">
            <button
              onClick={togglePlay}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-3 transition-all duration-200"
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              {isPlaying ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              )}
            </button>
            <button
              onClick={toggleMute}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-3 transition-all duration-200"
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            >
              {isMuted ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L4.383 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.383l4.01-4.793a1 1 0 011.617-.793zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L4.383 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.383l4.01-4.793a1 1 0 011.617-.793zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>
        </>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`relative z-20 py-16 md:py-24 lg:py-32 ${
          isCentered ? 'text-center' : ''
        } ${isFullWidth ? 'max-w-full' : ''}`}>
          {isCentered ? (
            // Centered layout (for video hero)
            <div className="max-w-4xl mx-auto">
              {eyebrow && (
                <ScrollAnimation direction="fade" delay={0.2}>
                  <span className="mb-4 inline-block text-sm font-semibold text-handshake-blue uppercase tracking-wide">
                    {eyebrow}
                  </span>
                </ScrollAnimation>
              )}
              <ScrollAnimation direction="fade" delay={0.2}>
                <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight drop-shadow-lg">
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
              {(buttons.length > 0 || cta) && (
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
              )}
            </div>
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
                      <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight">
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
