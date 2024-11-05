// This file is used to configure the i18n module.
// We are using localhost for now for testing purposes.

// const isProd = process.env.VERCEL_ENV === "production"

/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    locales: ["en-GB", "fr-FR", "de-DE"],
    defaultLocale: "en-GB",
    localeDetection: false,
    // These are the domains that will be used to determine the locale
    // At the moment, we are using the preview subdomains to determine the locale
    // once we all changes are ready, we can change the domains to actual production domains
    domains: [
      {
        domain: "localhost.gb", // domain: isProd ? "joinhandshake.co.uk" : "preview.joinhandshake.co.uk",
        defaultLocale: "en-GB",
        http: true,
      },
      {
        domain: "localhost.de", // domain: isProd ? "joinhandshake.de" : "preview.joinhandshake.de",
        defaultLocale: "de-DE",
        http: true,
      },
      {
        domain: "localhost.fr", // domain: isProd ? "joinhandshake.fr" : "preview.joinhandshake.fr",
        defaultLocale: "fr-FR",
        http: true,
      },
    ],
  },
}
