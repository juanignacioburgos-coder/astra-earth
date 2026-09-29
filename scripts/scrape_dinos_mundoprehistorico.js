import https from 'https';
import fs from 'fs';
import path from 'path';

function fetchPage(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      let html = '';
      res.on('data', chunk => html += chunk);
      res.on('end', () => resolve(html));
    }).on('error', () => resolve(''));
  });
}

async function main() {
  const pages = [
    { url: 'https://www.mundoprehistorico.com/extintos-naturales/', era: 'cuaternario' },
    { url: 'https://www.mundoprehistorico.com/fauna-cretacico/', era: 'cretacico' },
    { url: 'https://www.mundoprehistorico.com/fauna-jurasico/', era: 'jurasico' },
    { url: 'https://www.mundoprehistorico.com/fauna-triasico/', era: 'triasico' },
    { url: 'https://www.mundoprehistorico.com/fauna-permico/', era: 'permico' },
    { url: 'https://www.mundoprehistorico.com/fauna-cambrico/', era: 'cambrico' },
    { url: 'https://www.mundoprehistorico.com/fauna-carbonifero/', era: 'carbonifero' },
    { url: 'https://www.mundoprehistorico.com/fauna-devonico/', era: 'devonico' },
    { url: 'https://www.mundoprehistorico.com/fauna-silurico/', era: 'silurico' },
    { url: 'https://www.mundoprehistorico.com/fauna-ordovicico/', era: 'ordovicico' }
  ];

  const allAnimals = [];

  for (const p of pages) {
    const html = await fetchPage(p.url);
    if (!html) continue;

    // match each col span_3 or work-item
    const colMatches = html.match(/<div class="col span_3[^"]*"[^>]*>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi) ||
                       html.match(/<div class="work-item[^"]*"[^>]*>[\s\S]*?<\/div>\s*<\/div>/gi) || [];

    console.log(`Page: ${p.era}, Blocks: ${colMatches.length}`);

    for (const block of colMatches) {
      // Find full image link in pretty_photo or img src
      const fullImgMatch = block.match(/href=["'](https:\/\/www\.mundoprehistorico\.com\/wp-content\/uploads\/[^"']+\.(jpg|png|jpeg))["']/i);
      const imgMatch = block.match(/src=["'](https:\/\/www\.mundoprehistorico\.com\/wp-content\/uploads\/[^"']+\.(jpg|png|jpeg))["']/i);
      const altMatch = block.match(/alt=["']([^"']+)["']/i);
      const h4Match = block.match(/<h4[^>]*>([\s\S]*?)<\/h4>/i);
      const detailLinkMatch = block.match(/href=["'](https:\/\/www\.mundoprehistorico\.com\/portfolio\/[^"']+)["']/i);

      let title = '';
      if (h4Match) title = h4Match[1].replace(/<[^>]+>/g, '').trim();
      else if (altMatch) title = altMatch[1].replace(/\s*\d+$/, '').trim();

      const img = fullImgMatch ? fullImgMatch[1] : (imgMatch ? imgMatch[1].replace(/-\d+x\d+\.(jpg|png|jpeg)$/i, '.$1') : '');
      const detailLink = detailLinkMatch ? detailLinkMatch[1] : '';

      if (title && img && !title.toLowerCase().includes('avatar') && !title.toLowerCase().includes('logo')) {
        allAnimals.push({
          title,
          cleanName: title.replace(/\s*\d+$/, '').trim(),
          img,
          detailLink,
          era: p.era
        });
      }
    }
  }

  // Remove duplicates by cleanName
  const uniqueMap = new Map();
  for (const a of allAnimals) {
    const key = a.cleanName.toLowerCase();
    if (!uniqueMap.has(key)) {
      uniqueMap.set(key, a);
    }
  }

  const uniqueAnimals = Array.from(uniqueMap.values());
  console.log(`Successfully scraped ${uniqueAnimals.length} unique prehistoric animals from Mundo Prehistórico!`);
  console.log('Sample list of animals:');
  console.log(uniqueAnimals.slice(0, 30).map(x => `${x.cleanName} (${x.era})`));

  fs.writeFileSync('scripts/all_mundoprehistorico_species.json', JSON.stringify(uniqueAnimals, null, 2), 'utf-8');
}

main();
