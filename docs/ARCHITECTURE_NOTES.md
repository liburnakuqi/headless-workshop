## Project architecture notes (high level)

### Routing & data

- **`pages/[[...slug]].tsx`**: Fetches `page`, `navigation`, and `footer` from Sanity in `getStaticProps`, then renders section components via `buildComponents(page.sections)`.
- **`pages/_app.tsx`**: Wraps every route, renders global `Navigation` and `Footer` from `pageProps.global`, and renders the current page with `<Component {...pageProps} />`.

### Component rendering

- **`utils/buildComponent.tsx`**
  - `buildComponent(section)`: Creates a single React element from a Sanity section object.
  - `buildComponents(sections)`: Maps an array of sections into React elements, safely handling null/undefined/empty values.

- **`utils/componentConfig.ts`**
  - `getComponentType(type)`: Maps legacy schema `_type` values to the current component types.
  - `configureComponentProps(type, props)`: Applies any required prop-shaping for legacy data (e.g. field renames).

### i18n (Sanity document language)

- **`sanity/helpers/i18n.ts`**
  - `getLangParam(locale)`: Normalizes a Next.js locale into the `_lang` format stored in Sanity.
  - `getLangQuery()`: GROQ predicate used by page queries to filter by the requested language.

### Sitemap

- **`pages/sitemap.xml.ts`**
  - Generates a locale-specific sitemap based on the request host (or an optional `?locale=` override).
  - Adds `hreflang` alternates (`xhtml:link`) when the same slug exists in multiple locales.

