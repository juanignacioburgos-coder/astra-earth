import https from 'https';
import fs from 'fs';
import path from 'path';

const ANIMALS = [
  {
    id: 'glyptodon',
    title: 'Glyptodon',
    slug: 'glyptodon',
    imgUrl: 'https://www.mundoprehistorico.com/wp-content/uploads/Glyptodon-01.jpg',
    targetFile: 'glyptodon.jpg',
    periodId: 'present_0ma' // Cuaternario / Pleistoceno
  },
  {
    id: 'macrauchenia',
    title: 'Macrauchenia',
    slug: 'macrauchenia',
    imgUrl: 'https://www.mundoprehistorico.com/wp-content/uploads/Macrauchenia-01.jpg',
    targetFile: 'macrauchenia.jpg',
    periodId: 'present_0ma'
  },
  {
    id: 'megalania',
    title: 'Megalania (Varanus priscus)',
    slug: 'megalania',
    imgUrl: 'https://www.mundoprehistorico.com/wp-content/uploads/Megalania-01.jpg',
    targetFile: 'megalania.jpg',
    periodId: 'present_0ma'
  },
  {
    id: 'oso_cavernario',
    title: 'Oso Cavernario (Ursus spelaeus)',
    slug: 'oso-cavernario',
    imgUrl: 'https://www.mundoprehistorico.com/wp-content/uploads/Oso-Cavernario-01.jpg',
    targetFile: 'oso_cavernario.jpg',
    periodId: 'present_0ma'
  },
  {
    id: 'toxodon',
    title: 'Toxodon',
    slug: 'toxodon',
    imgUrl: 'https://www.mundoprehistorico.com/wp-content/uploads/Toxodon-01.jpg',
    targetFile: 'toxodon.jpg',
    periodId: 'present_0ma'
  },
  {
    id: 'diprotodon',
    title: 'Diprotodon',
    slug: 'diprotodon',
    imgUrl: 'https://www.mundoprehistorico.com/wp-content/uploads/Diprotodon-01.jpg',
    targetFile: 'diprotodon.jpg',
    periodId: 'present_0ma'
  },
  {
    id: 'lobo_gigante',
    title: 'Lobo Gigante / Dire Wolf (Aenocyon dirus)',
    slug: 'lobo-gigante',
    imgUrl: 'https://www.mundoprehistorico.com/wp-content/uploads/Lobo-Gigante-01.jpg',
    targetFile: 'lobo_gigante.jpg',
    periodId: 'present_0ma'
  },
  {
    id: 'mastodonte_americano',
    title: 'Mastodonte Americano (Mammut americanum)',
    slug: 'mastodonte-americano',
    imgUrl: 'https://www.mundoprehistorico.com/wp-content/uploads/Mastodonte-Americano-01.jpg',
    targetFile: 'mastodonte_americano.jpg',
    periodId: 'present_0ma'
  },
  {
    id: 'megaterio',
    title: 'Megaterio (Megatherium americanum)',
    slug: 'megaterio',
    imgUrl: 'https://www.mundoprehistorico.com/wp-content/uploads/Megaterio-01.jpg',
    targetFile: 'megaterio.jpg',
    periodId: 'present_0ma'
  },
  {
    id: 'smilodon_mundo',
    title: 'Tigre Dientes de Sable (Smilodon)',
    slug: 'tigre-dientes-de-sable',
    imgUrl: 'https://www.mundoprehistorico.com/wp-content/uploads/Tigre-Dientes-de-Sable-01.jpg',
    targetFile: 'smilodon_mundo.jpg',
    periodId: 'present_0ma'
  },
  {
    id: 'procoptodon',
    title: 'Canguro Gigante de Cara Corta (Procoptodon)',
    slug: 'canguro-gigante-de-cara-corta',
    imgUrl: 'https://www.mundoprehistorico.com/wp-content/uploads/Canguro-Gigante-de-Cara-Corta-01.jpg',
    targetFile: 'procoptodon.jpg',
    periodId: 'present_0ma'
  },
  {
    id: 'rinoceronte_lanudo',
    title: 'Rinoceronte Lanudo (Coelodonta antiquitatis)',
    slug: 'rinoceronte-lanudo',
    imgUrl: 'https://www.mundoprehistorico.com/wp-content/uploads/Rinoceronte-Lanudo-01.jpg',
    targetFile: 'rinoceronte_lanudo.jpg',
    periodId: 'present_0ma'
  },
  {
    id: 'megalocero',
    title: 'Megalocero / Alce Gigante (Megaloceros giganteus)',
    slug: 'megalocero',
    imgUrl: 'https://www.mundoprehistorico.com/wp-content/uploads/Megalocero-01.jpg',
    targetFile: 'megalocero.jpg',
    periodId: 'present_0ma'
  },
  {
    id: 'mamut_mundo',
    title: 'Mamut Lanudo (Mammuthus primigenius)',
    slug: 'mamut',
    imgUrl: 'https://www.mundoprehistorico.com/wp-content/uploads/Mamut-01.jpg',
    targetFile: 'mamut_mundo.jpg',
    periodId: 'present_0ma'
  },
  {
    id: 'leon_cavernas',
    title: 'León de las Cavernas (Panthera spelaea)',
    slug: 'leon-de-las-cavernas',
    imgUrl: encodeURI('https://www.mundoprehistorico.com/wp-content/uploads/León-de-las-Cavernas-01.jpg'),
    targetFile: 'leon_cavernas.jpg',
    periodId: 'present_0ma'
  },
  {
    id: 'titanis',
    title: 'Titanis (Titanis walleri / Ave del Terror)',
    slug: 'titanis',
    imgUrl: 'https://www.mundoprehistorico.com/wp-content/uploads/Titanis-01.jpg',
    targetFile: 'titanis.jpg',
    periodId: 'miocene_20ma' // Neógeno / Plioceno
  }
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: status ${res.statusCode}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
      file.on('error', err => {
        fs.unlink(dest, () => reject(err));
      });
    }).on('error', reject);
  });
}

function fetchArticleText(slug) {
  return new Promise((resolve) => {
    const url = `https://www.mundoprehistorico.com/portfolio/${slug}/`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      if (res.statusCode !== 200) {
        return resolve({ text: '', facts: [] });
      }
      let html = '';
      res.on('data', chunk => html += chunk);
      res.on('end', () => {
        // extract paragraphs
        const pMatches = html.match(/<p>[\s\S]*?<\/p>/gi) || [];
        const cleanParagraphs = pMatches
          .map(p => p.replace(/<[^>]+>/g, '').trim())
          .filter(t => t.length > 30 && !t.includes('cookies') && !t.includes('política'));
        
        resolve({
          text: cleanParagraphs.slice(0, 3).join(' '),
          paragraphs: cleanParagraphs
        });
      });
    }).on('error', () => resolve({ text: '', facts: [] }));
  });
}

async function run() {
  const outDir = path.resolve('public/assets/species');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const results = [];

  for (const a of ANIMALS) {
    const dest = path.join(outDir, a.targetFile);
    console.log(`Downloading ${a.title} image...`);
    try {
      await downloadFile(a.imgUrl, dest);
      console.log(` Saved ${a.targetFile} (${fs.statSync(dest).size} bytes)`);
    } catch (e) {
      console.warn(` Error downloading ${a.title}: ${e.message}`);
    }

    console.log(`Fetching article text for ${a.slug}...`);
    const art = await fetchArticleText(a.slug);
    results.push({
      ...a,
      articleText: art.text,
      paragraphs: art.paragraphs
    });
  }

  fs.writeFileSync('scripts/mundoprehistorico_data.json', JSON.stringify(results, null, 2), 'utf-8');
  console.log(`Saved mundoprehistorico_data.json with ${results.length} species.`);
}

run();
