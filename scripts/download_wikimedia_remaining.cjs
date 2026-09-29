const https = require('https');
const fs = require('fs');

const targets = [
  { name: 'Asaphus kowalewskii', file: 'public/assets/species/asaphus.jpg' },
  { name: 'Materpiscis', file: 'public/assets/species/materpiscis.jpg' },
  { name: 'Cooksonia', file: 'public/assets/species/cooksonia.jpg' },
  { name: 'Hylonomus', file: 'public/assets/species/hylonomus.jpg' },
  { name: 'Birkenia elegans', file: 'public/assets/species/birkenia.jpg' },
  { name: 'Astraspis', file: 'public/assets/species/astraspis.jpg' },
  { name: 'Kimberella', file: 'public/assets/species/kimberella.jpg' },
  { name: 'Otavia antiqua', file: 'public/assets/species/otavia.jpg' }
];

function fetchImage(query, dest) {
  return new Promise((resolve) => {
    const apiUrl = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=3&prop=imageinfo&iiprop=url|mime&iiurlwidth=800&format=json`;
    
    https.get(apiUrl, { headers: { 'User-Agent': 'AncientEarthApp/2.0 (contact@ancientearth.org)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query ? Object.values(json.query.pages) : [];
          // find jpg or png
          let imgUrl = null;
          for (const p of pages) {
            if (p.imageinfo && p.imageinfo[0]) {
              const info = p.imageinfo[0];
              if (info.thumburl && (info.thumburl.endsWith('.jpg') || info.thumburl.endsWith('.png'))) {
                imgUrl = info.thumburl;
                break;
              } else if (info.url && (info.url.endsWith('.jpg') || info.url.endsWith('.png'))) {
                imgUrl = info.url;
                break;
              }
            }
          }

          if (imgUrl) {
            console.log(`Found image for ${query}: ${imgUrl}`);
            downloadFile(imgUrl, dest, resolve);
          } else {
            console.log(`No image found for ${query}`);
            resolve();
          }
        } catch (e) {
          console.error(`Error searching ${query}:`, e.message);
          resolve();
        }
      });
    }).on('error', (e) => {
      console.error(`Error requesting ${query}:`, e.message);
      resolve();
    });
  });
}

function downloadFile(url, dest, resolve) {
  https.get(url, { headers: { 'User-Agent': 'AncientEarthApp/2.0 (contact@ancientearth.org)' } }, (res) => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      return downloadFile(res.headers.location, dest, resolve);
    }
    const fileStream = fs.createWriteStream(dest);
    res.pipe(fileStream);
    fileStream.on('finish', () => {
      fileStream.close();
      console.log(`Saved ${dest} (${fs.statSync(dest).size} bytes)`);
      resolve();
    });
  }).on('error', (e) => {
    console.error(`Download error for ${dest}:`, e.message);
    resolve();
  });
}

async function run() {
  for (const t of targets) {
    await fetchImage(t.name, t.file);
    await new Promise(r => setTimeout(r, 600));
  }
  console.log('All downloads completed.');
}

run();
