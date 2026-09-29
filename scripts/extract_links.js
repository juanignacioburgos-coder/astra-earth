import fs from 'fs';

const filePath = 'C:/Users/juani/.gemini/antigravity-ide/brain/133970e9-2c4d-4851-ba4e-b930dd008c9c/.system_generated/steps/319/content.md';
const html = fs.readFileSync(filePath, 'utf-8');

const regex = /href=["'](https:\/\/www\.mundoprehistorico\.com\/[^"']+)["']/gi;
const set = new Set();
let m;
while ((m = regex.exec(html)) !== null) {
  const url = m[1];
  if (!url.includes('/wp-content/') && !url.includes('/tag/') && !url.includes('/feed/') && !url.includes('#')) {
    set.add(url);
  }
}

console.log('Categories / Pages on mundoprehistorico:');
Array.from(set).forEach(u => console.log(' - ' + u));
