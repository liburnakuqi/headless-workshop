import { componentsMap, isComponentRegistered } from 'lib/components/registry'
import { SectionComponent } from 'lib/components/types'
import React from 'react'
import { getComponentType, configureComponentProps } from './componentConfig'

export const buildComponent = (section: SectionComponent): React.ReactElement | null => {
  const { _type, _key, ...props } = section

  if (!_type) {
    console.error('Section object does not have a "_type" property', section)
    return null
  }

  const componentType = getComponentType(_type)

  if (!isComponentRegistered(componentType)) {
    console.warn(
      `No component is registered for type: "${componentType}". Available types:`,
      Object.keys(componentsMap)
    )
    return null
  }

  const Component = componentsMap[componentType] as React.ComponentType<any>

  const configuredProps = configureComponentProps(_type, props)

  return React.createElement(Component, { key: _key || _type, ...configuredProps })
}

export const buildComponents = (sections: SectionComponent[] | null | undefined = []): React.ReactElement[] => {
  if (!sections || !Array.isArray(sections) || sections.length === 0) {
    return []
  }

  return sections
    .map((section) => buildComponent(section))
    .filter((component): component is React.ReactElement => component !== null)
}
