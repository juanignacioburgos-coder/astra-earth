const fs = require('fs');
const html = fs.readFileSync('scripts/glyptodon_page.html', 'utf8');

// find divs or sections
const textBlocks = [];
const regex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
let m;
while ((m = regex.exec(html)) !== null) {
  const clean = m[1].replace(/<[^>]+>/g, '').trim();
  if (clean.length > 20) {
    textBlocks.push(clean);
  }
}

console.log('Paragraphs > 20 chars:', textBlocks.length);
textBlocks.forEach((t, i) => console.log(`[${i}]`, t));

// Also check meta description
const metaDesc = html.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
console.log('Meta description:', metaDesc ? metaDesc[1] : 'none');
