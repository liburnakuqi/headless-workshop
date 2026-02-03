import { ComponentType } from 'react'
import { ComponentMap, ComponentRegistryEntry } from './types'

// Import all components
import { LogoCarousel } from 'components/LogoCarousel'
import { ContentGrid } from 'components/ContentGrid'
import { Hero } from 'components/Hero'
import { ContentBlock } from 'components/ContentBlock'

/**
 * Centralized component registry
 * Add new components here to register them
 */
const componentRegistry: ComponentRegistryEntry[] = [
  { type: 'Hero', component: Hero },
  { type: 'ContentBlock', component: ContentBlock },
  { type: 'ContentGrid', component: ContentGrid },
  { type: 'LogoCarousel', component: LogoCarousel },
]

/**
 * Build a type-safe component map from the registry
 */
export const buildComponentMap = (): ComponentMap => {
  return componentRegistry.reduce((map, entry) => {
    map[entry.type] = entry.component
    return map
  }, {} as ComponentMap)
}

/**
 * Get component by type
 */
export const getComponent = (type: string): ComponentType<any> | undefined => {
  const entry = componentRegistry.find((entry) => entry.type === type)
  return entry?.component
}

/**
 * Check if a component type is registered
 */
export const isComponentRegistered = (type: string): boolean => {
  return componentRegistry.some((entry) => entry.type === type)
}

/**
 * Get all registered component types
 */
export const getRegisteredTypes = (): string[] => {
  return componentRegistry.map((entry) => entry.type)
}

/**
 * Export the component map for direct use
 */
export const componentsMap = buildComponentMap()
