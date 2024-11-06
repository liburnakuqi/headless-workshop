export function getLangTitleByLocale(locale: string) {
    switch (locale) {
    case "de-DE":
    return "German(Deutsch)"
    case "fr-FR":
    return "France(Français)"
    default:
    return "English (UK)"
    }
}

export async function isUniqueOtherThanLang(
    slug: string,
    context: SlugValidationContext
  ) {
    const { document, getClient } = context
    if (!document?._lang) {
      return true
    }
    const client = getClient({ apiVersion: "2022-10-21" })
    const id = document._id.replace(/^drafts\./, "")
    const params = {
      draft: `drafts.${id}`,
      published: id,
      lang: document._lang,
      slug,
    }
    const query = `!defined(*[
      !(_id in [$draft, $published]) &&
      slug.current == $slug &&
      _lang == $lang
    ][0]._id)`
    const result = await client.fetch(query, params)
    return result
  }