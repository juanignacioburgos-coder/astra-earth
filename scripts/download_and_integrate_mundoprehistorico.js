import https from 'https';
import fs from 'fs';
import path from 'path';

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    // encode non-ascii chars in url safely
    const cleanUrl = encodeURI(decodeURI(url));
    https.get(cleanUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode} for ${url}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
      file.on('error', err => fs.unlink(dest, () => reject(err)));
    }).on('error', reject);
  });
}

async function main() {
  const allDinos = JSON.parse(fs.readFileSync('scripts/all_mundoprehistorico_species.json', 'utf-8'));
  const outDir = path.resolve('public/assets/species');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  console.log(`Processing ${allDinos.length} animals from Mundo Prehistórico...`);

  // Target animals we want to ensure have authentic downloaded JPG photos
  const priorityAnimals = [
    // Extintos Naturales
    { name: 'Glyptodon', file: 'glyptodon.jpg' },
    { name: 'Macrauchenia', file: 'macrauchenia.jpg' },
    { name: 'Megalania', file: 'megalania.jpg' },
    { name: 'Oso Cavernario', file: 'oso_cavernario.jpg' },
    { name: 'Toxodon', file: 'toxodon.jpg' },
    { name: 'Diprotodon', file: 'diprotodon.jpg' },
    { name: 'Lobo Gigante', file: 'lobo_gigante.jpg' },
    { name: 'Mastodonte Americano', file: 'mastodonte_americano.jpg' },
    { name: 'Megaterio', file: 'megaterio.jpg' },
    { name: 'Tigre Dientes de Sable', file: 'smilodon_mundo.jpg' },
    { name: 'Canguro Gigante de Cara Corta', file: 'procoptodon.jpg' },
    { name: 'Rinoceronte Lanudo', file: 'rinoceronte_lanudo.jpg' },
    { name: 'Megalocero', file: 'megalocero.jpg' },
    { name: 'Mamut', file: 'mamut_mundo.jpg' },
    { name: 'León de las Cavernas', file: 'leon_cavernas.jpg' },
    { name: 'Titanis', file: 'titanis.jpg' },

    // Dinosaurs & Cretaceous
    { name: 'Quetzalcoatlus', file: 'quetzalcoatlus.jpg' },
    { name: 'Mosasaurus', file: 'mosasaurus.jpg' },
    { name: 'Giganotosaurus', file: 'giganotosaurus.jpg' },
    { name: 'Parasaurolophus', file: 'parasaurolophus.jpg' },
    { name: 'Iguanodon', file: 'iguanodon.jpg' },
    { name: 'Pteranodon', file: 'pteranodon.jpg' },
    { name: 'Protoceratops', file: 'protoceratops.jpg' },
    { name: 'Oviraptor', file: 'oviraptor.jpg' },
    { name: 'Gallimimus', file: 'gallimimus.jpg' },
    { name: 'Microraptor', file: 'microraptor.jpg' },
    { name: 'Muttaburrasaurus', file: 'muttaburrasaurus.jpg' },
    { name: 'Elasmosaurus', file: 'elasmosaurus.jpg' },

    // Jurassic
    { name: 'Diplodocus', file: 'diplodocus.jpg' },
    { name: 'Ichthyosaurus', file: 'ichthyosaurus.jpg' },
    { name: 'Kentrosaurus', file: 'kentrosaurus.jpg' },
    { name: 'Liopleurodon', file: 'liopleurodon.jpg' },
    { name: 'Compsognathus', file: 'compsognathus.jpg' },
    { name: 'Cryolophosaurus', file: 'cryolophosaurus.jpg' },
    { name: 'Eustreptospondylus', file: 'eustreptospondylus.jpg' },

    // Triassic
    { name: 'Plateosaurus', file: 'plateosaurus.jpg' },
    { name: 'Herrerasaurus', file: 'herrerasaurus.jpg' },
    { name: 'Eoraptor', file: 'eoraptor.jpg' },
    { name: 'Riojasaurus', file: 'riojasaurus.jpg' },

    // Permian & Paleozoic
    { name: 'Scutosaurus', file: 'scutosaurus.jpg' },
    { name: 'Inostrancevia', file: 'inostrancevia.jpg' },
    { name: 'Dimetrodon', file: 'dimetrodon_mundo.jpg' },
    { name: 'Edaphosaurus', file: 'edaphosaurus.jpg' },
    { name: 'Eryops', file: 'eryops.jpg' },
    { name: 'Seymouria', file: 'seymouria.jpg' },

    // Cambrian
    { name: 'Anomalocaris', file: 'anomalocaris_mundo.jpg' },
    { name: 'Opabinia', file: 'opabinia.jpg' },
    { name: 'Pikaia', file: 'pikaia.jpg' },
    { name: 'Haikouichthys', file: 'haikouichthys.jpg' },
    { name: 'Trilobites', file: 'trilobites_mundo.jpg' },
    { name: 'Spriggina', file: 'spriggina.jpg' }
  ];

  let downloadedCount = 0;

  for (const prio of priorityAnimals) {
    const dest = path.join(outDir, prio.file);
    // Find matching in scraped list
    const match = allDinos.find(d => 
      d.cleanName.toLowerCase() === prio.name.toLowerCase() ||
      d.title.toLowerCase().includes(prio.name.toLowerCase())
    );

    if (match && match.img) {
      // Check if file already exists with good size
      if (fs.existsSync(dest) && fs.statSync(dest).size > 10000) {
        console.log(`✓ Already downloaded: ${prio.file} (${fs.statSync(dest).size} bytes)`);
        downloadedCount++;
        continue;
      }

      console.log(`Downloading ${prio.name} from ${match.img} -> ${prio.file}...`);
      try {
        await downloadFile(match.img, dest);
        console.log(`✓ Saved ${prio.file} (${fs.statSync(dest).size} bytes)`);
        downloadedCount++;
      } catch (e) {
        console.warn(`✗ Error downloading ${prio.name}: ${e.message}`);
      }
    } else {
      console.warn(`? No scraped match for ${prio.name}`);
    }
  }

  console.log(`Total priority photos downloaded or verified: ${downloadedCount}/${priorityAnimals.length}`);
}

main();
