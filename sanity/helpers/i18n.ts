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