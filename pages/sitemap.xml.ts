
import {
  getAllPages,
} from '../sanity/lib/sanity.client'

import type { SitemapPayload } from 'types'

import { getAllPagesQuery } from '../sanity/lib/sanity.queries'

const EXTERNAL_DATA_URLS = {
  "de-DE": 'https://joinhandshake.de',
  "fr-FR": 'https://joinhandshake.fr',
  "en-GB": 'https://joinhandshake.co.uk'
};

function generateLocaleURL(locale, path) {
  return `${EXTERNAL_DATA_URLS[locale] || EXTERNAL_DATA_URLS['uk']}${path}`;
}

const generateSiteMap = (pages: SitemapPayload[]) => {
  const urls = pages.map(page => {
    const locale = page.lang || 'en-GB';
    const loc = generateLocaleURL(locale, page.slug);
    const lastmod = page.lastmod

    return `
      <url>
        <loc>${loc}</loc>
        <lastmod>${lastmod}</lastmod>
      </url>`;
  }).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls}
    </urlset>`;
}


function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res, req }) {
  const {token} = req
  
  // We make an API call to gather the URLs for our site
  const pages = await getAllPages({
    token,
    query: getAllPagesQuery,
  });

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(pages);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;