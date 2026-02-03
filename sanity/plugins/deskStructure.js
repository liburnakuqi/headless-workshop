import { Globe, Browsers, Compass, SquareHalfBottom } from 'phosphor-react'
import { JsonView } from './previewPane/JsonView'

export const deskStructure = (S, context) =>
  S.list()
    .title('Content')
    .items([
      // PAGES ------------------
      S.listItem()
        .title('Pages')
        .icon(Browsers)
        .child(S.documentTypeList('page').title('Pages')),
      S.divider(),
      // GLOBAL ------------------
      S.listItem()
        .title('Global')
        .icon(Globe)
        .child(
          S.list()
            .title('Global')
            .items([
              S.listItem()
                .title('Navigation')
                .icon(Compass)
                .child(
                  S.editor()
                    .id('navigation')
                    .schemaType('navigation')
                    .documentId('navigation')
                    .views([
                      S.view.form(),
                      S.view
                        .component(JsonView)
                        .title('JSON'),
                    ])
                ),
              S.divider(),
              S.listItem()
                .title('Footer')
                .icon(SquareHalfBottom)
                .child(
                  S.editor()
                    .id('footer')
                    .schemaType('footer')
                    .documentId('footer')
                    .views([
                      S.view.form(),
                      S.view
                        .component(JsonView)
                        .title('JSON'),
                    ])
                ),
            ])
        ),
      S.divider(),
    ])
