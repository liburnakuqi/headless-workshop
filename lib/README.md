# Library Architecture

This directory contains the core library code for the headless CMS architecture.

## Structure

```
lib/
├── components/          # Component registry and types
│   ├── registry.ts     # Centralized component registration
│   └── types.ts        # Shared component type definitions
├── queries/            # Query builders and utilities
│   └── sections.ts     # Section-specific GROQ query fragments
└── index.ts            # Main library exports
```

## Component Registry

The component registry (`lib/components/registry.ts`) provides a centralized way to register and manage all section components.

### Adding a New Component

1. Create your component in `components/YourComponent/`
2. Import it in `lib/components/registry.ts`
3. Add it to the `componentRegistry` array:

```typescript
import { YourComponent } from 'components/YourComponent'

const componentRegistry: ComponentRegistryEntry[] = [
  // ... existing components
  { type: 'YourComponent', component: YourComponent },
]
```

That's it! The component will automatically be available in the build system.

### Using the Registry

```typescript
import { getComponent, isComponentRegistered, getRegisteredTypes } from 'lib/components/registry'

// Check if a component type exists
if (isComponentRegistered('MainHero')) {
  const Component = getComponent('MainHero')
}

// Get all registered types
const types = getRegisteredTypes() // ['MainHero', 'Quote', ...]
```

## Query Builders

The query builders (`lib/queries/sections.ts`) help organize section-specific GROQ queries.

### Adding Section-Specific Queries

When a section needs special data fetching (like expanding assets), add it to `sanity/lib/sanity.queries.ts`:

```typescript
const yourSectionFragment = groq`
  _type == "YourSection" => {
    ...,
    specialField {
      asset-> {
        url,
        metadata
      }
    }
  }
`

export const pagesBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug && ${getLangQuery()}][0] {
    ...,
    "slug": slug.current,
    sections[] {
      ...,
      ${audioHeroFragment},
      ${yourSectionFragment}  // Add your fragment here
    }
  }
`
```

## Component Building

The `utils/buildComponent.tsx` utility uses the registry to build components:

```typescript
import { buildComponent, buildComponents } from 'utils/buildComponent'

// Build a single component
const component = buildComponent(section)

// Build multiple components
const components = buildComponents(sections)
```

## Benefits

1. **Centralized Registration**: All components registered in one place
2. **Type Safety**: Better TypeScript support with shared types
3. **Easy to Extend**: Adding new components is straightforward
4. **Better Organization**: Clear separation of concerns
5. **Maintainable**: Easier to understand and modify
