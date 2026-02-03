const componentTypeMap: Record<string, string> = {
  'AudioHero': 'Hero',
  'MainHero': 'Hero',
  'StatsSection': 'ContentGrid',
  'FeaturedItems': 'ContentGrid',
  'FeatureGrid': 'ContentGrid',
  'FeaturedText': 'ContentBlock',
  'Quote': 'ContentBlock',
  'CtaBanner': 'ContentBlock',
  'MediaModule': 'ContentBlock',
  'Stats': 'ContentGrid',
  'Features': 'ContentGrid',
  'CaseStudies': 'ContentGrid',
  'TalentFeatures': 'ContentGrid',
}

export const getComponentType = (type: string): string => {
  return componentTypeMap[type] || type
}

export const configureComponentProps = (type: string, props: any): any => {
  if (type === 'TalentFeatures') {
    return {
      ...props,
      items: props.features || props.items || [],
    }
  }

  return props
}
