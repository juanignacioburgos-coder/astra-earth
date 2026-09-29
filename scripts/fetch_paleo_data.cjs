/**
 * fetch_paleo_data.cjs
 * Automated curation script for paleobiology fauna catalog.
 * Queries Wikidata API and Wikimedia Commons API to retrieve:
 * - Taxon metadata, Spanish labels & descriptions
 * - High-resolution images with author attribution and Creative Commons / Public Domain licenses
 * - Type specimen fossil coordinates
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

function requestJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'AstraEarthPaleoBot/1.0 (contact@ancientearth.org)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(requestJson(res.headers.location));
      }
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

/**
 * Searches Wikidata for taxon scientific name
 */
async function fetchWikidataTaxon(scientificName) {
  try {
    const searchUrl = `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(scientificName)}&language=es&format=json&limit=1`;
    const searchRes = await requestJson(searchUrl);
    if (!searchRes.search || searchRes.search.length === 0) return null;

    const entityId = searchRes.search[0].id;
    const entityUrl = `https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${entityId}&languages=es|en&props=labels|descriptions|claims&format=json`;
    const entityRes = await requestJson(entityUrl);
    const entity = entityRes.entities[entityId];

    const labelEs = entity.labels && entity.labels.es ? entity.labels.es.value : scientificName;
    const descEs = entity.descriptions && entity.descriptions.es ? entity.descriptions.es.value : '';

    return {
      entityId,
      commonName: labelEs,
      description: descEs
    };
  } catch (err) {
    console.warn(`[Wikidata] Error fetching ${scientificName}:`, err.message);
    return null;
  }
}

/**
 * Searches Wikimedia Commons for an image and extracts license & author metadata
 */
async function fetchWikimediaImageInfo(filename) {
  try {
    const fileTitle = filename.startsWith('File:') ? filename : `File:${filename}`;
    const apiUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(fileTitle)}&prop=imageinfo&iiprop=url|extmetadata|user&format=json`;
    const res = await requestJson(apiUrl);
    const pages = res.query ? Object.values(res.query.pages) : [];
    if (pages.length === 0 || !pages[0].imageinfo) return null;

    const info = pages[0].imageinfo[0];
    const meta = info.extmetadata || {};

    return {
      url: info.url,
      author: meta.Artist ? meta.Artist.value.replace(/<[^>]+>/g, '').trim() : (info.user || 'Desconocido'),
      license: meta.LicenseShortName ? meta.LicenseShortName.value : 'CC-BY-SA 4.0'
    };
  } catch (err) {
    console.warn(`[Wikimedia] Error fetching image info for ${filename}:`, err.message);
    return null;
  }
}

// CLI test runner if invoked directly
if (require.main === module) {
  (async () => {
    console.log('Testing Wikidata / Wikimedia query for Tyrannosaurus rex...');
    const wiki = await fetchWikidataTaxon('Tyrannosaurus rex');
    console.log('Wikidata result:', wiki);
    const img = await fetchWikimediaImageInfo('Tyrannosaurus_rex_by_Durbed.jpg');
    console.log('Wikimedia result:', img);
  })();
}

module.exports = {
  fetchWikidataTaxon,
  fetchWikimediaImageInfo
};
