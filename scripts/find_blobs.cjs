const fs = require('fs');
const files = fs.readdirSync('public/assets/species').filter(f => f.endsWith('.svg'));
const blobList = [];
for (const file of files) {
  const content = fs.readFileSync('public/assets/species/' + file, 'utf8');
  if (content.includes('rx="180"') && content.includes('ry="90"')) {
    blobList.push(file);
  }
}
console.log('Found blob files:', blobList.length, blobList);
