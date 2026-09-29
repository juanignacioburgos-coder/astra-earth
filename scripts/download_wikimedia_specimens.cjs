const https = require('https');
const fs = require('fs');
const path = require('path');

// Search and download helper for Wikimedia Commons
function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'AstraEarthAtlasBot/1.0 (Educational Paleontology Project; mailto:info@astraearth.org)' } }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'AstraEarthAtlasBot/1.0 (Educational Paleontology Project)' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: status ${res.statusCode}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(dest);
      });
    }).on('error', reject);
  });
}

async function searchAndDownload(query, outputFileName) {
  try {
    const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrlimit=3&prop=imageinfo&iiprop=url|size|extmetadata`;
    const res = await fetchJson(searchUrl);
    if (!res.query || !res.query.pages) {
      console.log(`No Wikimedia results for: ${query}`);
      return null;
    }
    const pages = Object.values(res.query.pages);
    // Find best image (jpg or png)
    const page = pages.find(p => p.imageinfo && p.imageinfo[0] && (p.imageinfo[0].url.endsWith('.jpg') || p.imageinfo[0].url.endsWith('.png')));
    if (!page) {
      console.log(`No valid image format for: ${query}`);
      return null;
    }
    const imgInfo = page.imageinfo[0];
    const dest = path.join('public', 'assets', 'species', outputFileName);
    console.log(`Downloading: ${page.title} -> ${dest}`);
    await downloadFile(imgInfo.url, dest);
    console.log(`Successfully downloaded: ${outputFileName}`);
    return {
      file: outputFileName,
      author: imgInfo.extmetadata?.Artist?.value || 'Wikimedia Commons',
      license: imgInfo.extmetadata?.LicenseShortName?.value || 'CC-BY-SA'
    };
  } catch (err) {
    console.error(`Error for ${query}:`, err.message);
    return null;
  }
}

async function run() {
  const targets = [
    { query: 'Smilodon populator restoration Dmitry Bogdanov', out: 'smilodon_accurate.jpg' },
    { query: 'Smilodon fatalis restoration Charles Knight', out: 'smilodon_knight.jpg' },
    { query: 'Hallucigenia sparsa reconstruction', out: 'hallucigenia.jpg' },
    { query: 'Isotelus rex reconstruction', out: 'isotelus.jpg' },
    { query: 'Shonisaurus popularis restoration', out: 'shonisaurus.jpg' },
    { query: 'Thylacosmilus atrox restoration', out: 'thylacosmilus.jpg' },
    { query: 'Argentavis magnificens restoration', out: 'argentavis.jpg' },
    { query: 'Australopithecus afarensis reconstruction', out: 'australopithecus.jpg' },
    { query: 'Homo neanderthalensis reconstruction', out: 'homo_neanderthalensis.jpg' },
    { query: 'Kimberella quadrata reconstruction', out: 'kimberella.jpg' },
    { query: 'Tribrachidium heraldicum reconstruction', out: 'tribrachidium.jpg' },
    { query: 'Fractofusus misrai reconstruction', out: 'fractofusus.jpg' },
    { query: 'Yorgia moveri reconstruction', out: 'yorgia.jpg' },
    { query: 'Cloudina reconstruction', out: 'cloudina.jpg' },
    { query: 'Namacalathus reconstruction', out: 'namacalathus.jpg' },
    { query: 'Parvancorina minchami reconstruction', out: 'parvancorina.jpg' }
  ];

  for (const t of targets) {
    await searchAndDownload(t.query, t.out);
  }
}

run();
