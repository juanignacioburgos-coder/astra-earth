import https from 'https';
import fs from 'fs';
import path from 'path';

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
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

const DINOS_TO_DOWNLOAD = [
  { name: 'Tyrannosaurus Rex (Mundo Prehistórico)', url: 'https://www.mundoprehistorico.com/wp-content/uploads/Tyrannosaurus-Rex-01.jpg', file: 'tyrannosaurus_mundo.jpg' },
  { name: 'Triceratops', url: 'https://www.mundoprehistorico.com/wp-content/uploads/Triceratops-01.jpg', file: 'triceratops.jpg' },
  { name: 'Stegosaurus', url: 'https://www.mundoprehistorico.com/wp-content/uploads/Stegosaurus-01.jpg', file: 'stegosaurus.jpg' },
  { name: 'Allosaurus', url: 'https://www.mundoprehistorico.com/wp-content/uploads/Allosaurus-01.jpg', file: 'allosaurus.jpg' },
  { name: 'Ankylosaurus', url: 'https://www.mundoprehistorico.com/wp-content/uploads/Ankylosaurus-01.jpg', file: 'ankylosaurus.jpg' },
  { name: 'Velociraptor', url: 'https://www.mundoprehistorico.com/wp-content/uploads/Velociraptor-01.jpg', file: 'velociraptor.jpg' },
  { name: 'Archaeopteryx', url: 'https://www.mundoprehistorico.com/wp-content/uploads/Archaeopteryx-01.jpg', file: 'archaeopteryx.jpg' },
  { name: 'Spinosaurus (Mundo Prehistórico)', url: 'https://www.mundoprehistorico.com/wp-content/uploads/Spinosaurus-01.jpg', file: 'spinosaurus_mundo.jpg' },
  { name: 'Pterodactylus', url: 'https://www.mundoprehistorico.com/wp-content/uploads/Pterodactylus-01.jpg', file: 'pterodactylus.jpg' }
];

async function run() {
  const outDir = path.resolve('public/assets/species');
  for (const item of DINOS_TO_DOWNLOAD) {
    const dest = path.join(outDir, item.file);
    console.log(`Downloading ${item.name}...`);
    try {
      await downloadFile(item.url, dest);
      console.log(`✓ Saved ${item.file} (${fs.statSync(dest).size} bytes)`);
    } catch (e) {
      console.warn(`✗ Error: ${e.message}`);
    }
  }
}

run();
