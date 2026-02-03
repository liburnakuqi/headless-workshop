import { ComponentType } from 'react'

/**
 * Base interface for all section components
 * Every section component should have a _type and _key
 */
export interface SectionComponent {
  _type: string
  _key?: string
  [key: string]: any
}

/**
 * Component registry entry
 */
export interface ComponentRegistryEntry {
  component: ComponentType<any>
  type: string
}

/**
 * Type-safe component map
 */
export type ComponentMap = Record<string, ComponentType<any>>
