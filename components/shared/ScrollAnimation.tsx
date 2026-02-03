'use client'

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import * as React from 'react'

type ScrollAnimationProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale'
  duration?: number
  distance?: number
}

export const ScrollAnimation = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.6,
  distance = 50,
}: ScrollAnimationProps) => {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: distance, opacity: 0 }
      case 'down':
        return { y: -distance, opacity: 0 }
      case 'left':
        return { x: distance, opacity: 0 }
      case 'right':
        return { x: -distance, opacity: 0 }
      case 'fade':
        return { opacity: 0 }
      case 'scale':
        return { scale: 0.8, opacity: 0 }
      default:
        return { y: distance, opacity: 0 }
    }
  }

  const getAnimatePosition = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { y: 0, opacity: 1 }
      case 'left':
      case 'right':
        return { x: 0, opacity: 1 }
      case 'fade':
        return { opacity: 1 }
      case 'scale':
        return { scale: 1, opacity: 1 }
      default:
        return { y: 0, opacity: 1 }
    }
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: getInitialPosition(),
        visible: {
          ...getAnimatePosition(),
          transition: {
            delay,
            duration,
            ease: 'easeOut',
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

type ParallaxProps = {
  children: React.ReactNode
  className?: string
  speed?: number
  direction?: 'up' | 'down'
}

export const Parallax = ({
  children,
  className = '',
  speed = 0.5,
  direction = 'up',
}: ParallaxProps) => {
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'up' ? [0, -100 * speed] : [0, 100 * speed]
  )

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}

type StaggerContainerProps = {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
}

export const StaggerContainer = ({
  children,
  className = '',
  staggerDelay = 0.1,
}: StaggerContainerProps) => {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

type StaggerItemProps = {
  children: React.ReactNode
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right'
}

export const StaggerItem = ({
  children,
  className = '',
  direction = 'up',
}: StaggerItemProps) => {
  const getVariants = () => {
    const distance = 30
    switch (direction) {
      case 'up':
        return {
          hidden: { y: distance, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        }
      case 'down':
        return {
          hidden: { y: -distance, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        }
      case 'left':
        return {
          hidden: { x: distance, opacity: 0 },
          visible: { x: 0, opacity: 1 },
        }
      case 'right':
        return {
          hidden: { x: -distance, opacity: 0 },
          visible: { x: 0, opacity: 1 },
        }
      default:
        return {
          hidden: { y: distance, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        }
    }
  }

  return (
    <motion.div
      variants={getVariants()}
      transition={{
        duration: 0.5,
        ease: 'easeOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
