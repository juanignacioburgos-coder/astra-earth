const fs = require('fs');
const path = require('path');

const ARTIFACTS_DIR = 'C:\\Users\\juani\\.gemini\\antigravity-ide\\brain\\156fa824-adc7-4cf8-8870-7b3aae514475';
const TARGET_DIR = path.join(__dirname, '..', 'public', 'assets', 'species');

const images = [
  { src: 'chilesaurus_specimen_1790722706927.jpg', dest: 'chilesaurus.jpg' },
  { src: 'stegouros_specimen_1790722764566.jpg', dest: 'stegouros.jpg' },
  { src: 'pelagornis_chilensis_specimen_1790722795453.jpg', dest: 'pelagornis_chilensis.jpg' },
  { src: 'mylodon_specimen_1790722870858.jpg', dest: 'mylodon.jpg' },
  { src: 'arackar_specimen_1790722966357.jpg', dest: 'arackar.jpg' },
  { src: 'atacamatitan_specimen_1790723019479.jpg', dest: 'atacamatitan.jpg' },
  { src: 'gonkoken_specimen_1790723113643.jpg', dest: 'gonkoken.jpg' }
];

console.log('--- Copying Chilean Species Images ---');
for (const img of images) {
  const srcPath = path.join(ARTIFACTS_DIR, img.src);
  const destPath = path.join(TARGET_DIR, img.dest);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    const stats = fs.statSync(destPath);
    console.log(`Copied ${img.dest} (${(stats.size / 1024).toFixed(1)} KB)`);
  } else {
    console.error(`Source not found: ${srcPath}`);
  }
}
