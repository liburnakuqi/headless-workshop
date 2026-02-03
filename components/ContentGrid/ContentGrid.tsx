import { ScrollAnimation, StaggerContainer, StaggerItem } from 'components/shared/ScrollAnimation'
import * as React from 'react'
import ImageBox from '../shared/ImageBox'

export type ContentGridItem = {
  // For stats
  value?: string
  label?: string
  
  // For features/case studies
  title?: string
  subtitle?: string
  description?: string
  
  // Images
  image?: any
  imageAlt?: string
  logo?: any
  logoAlt?: string
}

export type ContentGridProps = {
  heading?: string
  subheading?: string
  items?: ContentGridItem[]
  
  // Layout options
  textAlign?: 'left' | 'center' | 'right'
  headingAlign?: 'left' | 'center' | 'right'
  
  // Styling options
  hasBorder?: boolean
  hasBackground?: boolean
  backgroundColor?: 'white' | 'gray' | 'green' | 'custom'
  customBackgroundColor?: string
  
  // Item styling
  itemPadding?: 'small' | 'medium' | 'large'
  itemShadow?: boolean
  
  // Layout
  columns?: 2 | 3 | 4 | 'auto' | string
}

export const ContentGrid = ({
  heading,
  subheading,
  items = [],
  textAlign = 'left',
  headingAlign = 'center',
  hasBorder = false,
  hasBackground = true,
  backgroundColor = 'white',
  customBackgroundColor,
  itemPadding = 'medium',
  itemShadow = false,
  columns = 'auto',
}: ContentGridProps) => {
  // Ensure items is always an array
  const safeItems = Array.isArray(items) ? items : []
  const itemCount = safeItems.length
  
  // Determine grid columns
  const getGridClasses = () => {
    if (columns && columns !== 'auto') {
      const cols = typeof columns === 'string' ? parseInt(columns, 10) : columns
      if (cols === 2) {
        return 'grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8'
      } else if (cols === 3) {
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'
      } else if (cols === 4) {
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'
      }
    }
    
    // Auto-detect based on item count
    if (itemCount === 2) {
      return 'grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12'
    } else if (itemCount === 3) {
      return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'
    } else {
      return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'
    }
  }
  
  // Background color classes
  const getBackgroundClass = () => {
    if (!hasBackground) return ''
    switch (backgroundColor) {
      case 'gray':
        return 'bg-gray-50'
      case 'green':
        return 'bg-green-50'
      case 'custom':
        return ''
      default:
        return 'bg-white'
    }
  }
  
  // Padding classes
  const getPaddingClass = () => {
    switch (itemPadding) {
      case 'small':
        return 'p-6'
      case 'large':
        return 'p-10 lg:p-12'
      default:
        return 'p-8 lg:p-10'
    }
  }
  
  // Text alignment classes
  const getTextAlignClass = () => {
    switch (textAlign) {
      case 'center':
        return 'text-center'
      case 'right':
        return 'text-right'
      default:
        return 'text-left'
    }
  }
  
  // Heading alignment classes
  const getHeadingAlignClass = () => {
    switch (headingAlign) {
      case 'left':
        return 'text-left'
      case 'right':
        return 'text-right'
      default:
        return 'text-center'
    }
  }
  
  // Determine if it's a wide layout (2 items)
  const isWideLayout = itemCount === 2
  
  const bgStyle = backgroundColor === 'custom' && customBackgroundColor
    ? { backgroundColor: customBackgroundColor }
    : {}
  
  const sectionBgClass = getBackgroundClass()
  
  // Determine if it's a stats layout (has value + label)
  const isStatsLayout = safeItems.length > 0 && safeItems.some(item => item.value && item.label)
  
  // Reduce spacing for stats layout
  const sectionPadding = isStatsLayout ? 'py-12 lg:py-16' : 'py-20 lg:py-32'
  const headingMargin = isStatsLayout ? 'mb-8 lg:mb-10' : 'mb-16 lg:mb-20'
  const headingSize = isStatsLayout ? 'text-2xl md:text-3xl lg:text-4xl mb-4' : 'text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl mb-6'

  return (
    <section 
      className={`${sectionBgClass} ${sectionPadding}`}
      style={bgStyle}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {(heading || subheading) && (
          <ScrollAnimation direction="up" delay={0.2}>
            <div className={`${headingMargin} ${getHeadingAlignClass()}`}>
              {heading && (
                <h2 className={`${isStatsLayout ? 'font-normal' : 'font-bold'} text-gray-900 ${headingSize}`}>
                  {heading}
                </h2>
              )}
              {subheading && (
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  {subheading}
                </p>
              )}
            </div>
          </ScrollAnimation>
        )}
        
        <StaggerContainer className={getGridClasses()}>
          {safeItems.map((item, index) => {
            // Stats layout
            if (isStatsLayout && item.value && item.label) {
              return (
                <StaggerItem 
                  key={index} 
                  direction="up" 
                  className={`${getTextAlignClass()}`}
                >
                  <div
                    className={`font-bold text-gray-900 ${
                      isWideLayout
                        ? 'text-5xl md:text-6xl lg:text-7xl xl:text-8xl'
                        : 'text-4xl md:text-5xl lg:text-6xl'
                    }`}
                  >
                    {item.value}
                  </div>
                  <div
                    className={`mt-2 text-gray-600 ${
                      isWideLayout ? 'text-base md:text-lg lg:text-xl' : 'text-sm md:text-base lg:text-lg'
                    }`}
                  >
                    {item.label}
                  </div>
                </StaggerItem>
              )
            }
            
            // Feature/Case Study layout
            const borderClass = hasBorder ? 'border border-gray-200' : ''
            const shadowClass = itemShadow ? 'shadow-md hover:shadow-lg' : ''
            const roundedClass = hasBorder || itemShadow ? 'rounded-lg' : ''
            
            return (
              <StaggerItem
                key={index}
                direction="up"
                className={`group ${getTextAlignClass()} ${getPaddingClass()} ${borderClass} ${shadowClass} ${roundedClass} ${
                  hasBackground && backgroundColor !== 'white' ? 'bg-white' : ''
                } ${itemShadow ? 'transition-shadow duration-300' : ''}`}
              >
                {/* Logo (for case studies) */}
                {item.logo && (
                  <div className={`mb-4 flex items-center ${isWideLayout ? 'h-16 mb-6' : 'h-12'} ${
                    textAlign === 'center' ? 'justify-center' : textAlign === 'right' ? 'justify-end' : ''
                  }`}>
                    <ImageBox
                      image={item.logo}
                      alt={item.logoAlt || item.title || `Logo ${index + 1}`}
                      className={`w-auto object-contain ${isWideLayout ? 'max-h-16' : 'max-h-12'}`}
                    />
                  </div>
                )}
                
                {/* Image (for features) */}
                {item.image && (
                  <div className={`mb-6 overflow-hidden rounded-lg ${isWideLayout ? 'mb-8' : ''}`}>
                    <ImageBox
                      image={item.image}
                      alt={item.imageAlt || item.title || `Image ${index + 1}`}
                      className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                        isWideLayout ? 'h-80 lg:h-96 xl:h-[28rem]' : 'h-64 lg:h-80'
                      }`}
                    />
                  </div>
                )}
                
                {/* Title */}
                {item.title && (
                  <h3 className={`font-semibold text-gray-900 mb-3 ${
                    isWideLayout ? 'text-3xl lg:text-4xl' : 'text-2xl lg:text-3xl'
                  }`}>
                    {item.title}
                  </h3>
                )}
                
                {/* Subtitle (for case studies) */}
                {item.subtitle && (
                  <h4 className={`font-medium text-gray-800 mb-4 ${
                    isWideLayout ? 'text-xl lg:text-2xl' : 'text-lg lg:text-xl'
                  }`}>
                    {item.subtitle}
                  </h4>
                )}
                
                {/* Description */}
                {item.description && (
                  <p className={`text-gray-600 leading-relaxed ${
                    isWideLayout ? 'text-xl lg:text-2xl' : 'text-lg lg:text-xl'
                  }`}>
                    {item.description}
                  </p>
                )}
                
                {/* Value (fallback for stats) */}
                {item.value && !item.label && (
                  <div className={`font-bold text-gray-900 ${
                    isWideLayout
                      ? 'text-5xl md:text-6xl lg:text-7xl xl:text-8xl'
                      : 'text-4xl md:text-5xl lg:text-6xl'
                  }`}>
                    {item.value}
                  </div>
                )}
                
                {/* Label (fallback for stats) */}
                {item.label && !item.value && (
                  <div className={`text-gray-600 ${
                    isWideLayout ? 'text-base md:text-lg lg:text-xl' : 'text-sm md:text-base lg:text-lg'
                  }`}>
                    {item.label}
                  </div>
                )}
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
    </section>
  )
}
