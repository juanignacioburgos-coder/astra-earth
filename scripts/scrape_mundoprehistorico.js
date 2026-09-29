import fs from 'fs';

const filePath = 'C:/Users/juani/.gemini/antigravity-ide/brain/133970e9-2c4d-4851-ba4e-b930dd008c9c/.system_generated/steps/319/content.md';
const html = fs.readFileSync(filePath, 'utf-8');

console.log('HTML total length:', html.length);

// Extract portfolio items: work-item, titles, images, categories
// In Salient theme:
// <div class="col span_3 ..."> ... <div class="work-item ..."> ... <img ... src="..." /> ... <h4>...</h4> ... <span>...</span>
const items = [];
const itemRegex = /<div class="col span_3[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/gi;

// Also general image and title extractor
const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*alt=["']?([^"'>]*)["']?[^>]*>/gi;
const h4Regex = /<h4[^>]*>([\s\S]*?)<\/h4>/gi;
const pMetaRegex = /<p[^>]*class="[^"]*meta[^"]*"[^>]*>([\s\S]*?)<\/p>/gi;

// Let's search for all work-info or work-meta
const workMetaRegex = /<div class="work-meta">([\s\S]*?)<\/div>/gi;
let wm;
const metas = [];
while ((wm = workMetaRegex.exec(html)) !== null) {
  metas.push(wm[1]);
}
console.log('work-meta blocks found:', metas.length);

// Let's inspect work-item blocks
const workItemRegex = /<div class="work-item[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/gi;
let wi;
while ((wi = workItemRegex.exec(html)) !== null) {
  const block = wi[1];
  
  // get img
  const imgSrcMatch = block.match(/src=["']([^"']+)["']/i);
  const dataSrcMatch = block.match(/data-src=["']([^"']+)["']/i) || block.match(/data-lazy-src=["']([^"']+)["']/i);
  const altMatch = block.match(/alt=["']([^"']*)["']/i);
  const h4Match = block.match(/<h4[^>]*>([\s\S]*?)<\/h4>/i);
  const linkMatch = block.match(/<a[^>]+href=["']([^"']+)["']/i);
  const descMatch = block.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  const spanMatch = block.match(/<span>([\s\S]*?)<\/span>/i);

  const title = h4Match ? h4Match[1].replace(/<[^>]+>/g, '').trim() : (altMatch ? altMatch[1].trim() : 'Desconocido');
  const img = dataSrcMatch ? dataSrcMatch[1] : (imgSrcMatch ? imgSrcMatch[1] : '');
  const link = linkMatch ? linkMatch[1] : '';
  const desc = descMatch ? descMatch[1].replace(/<[^>]+>/g, '').trim() : (spanMatch ? spanMatch[1].replace(/<[^>]+>/g, '').trim() : '');

  items.push({ title, img, link, desc });
}

console.log('Total items parsed:', items.length);
console.log('First 15 items:');
console.log(JSON.stringify(items, null, 2));

// If items is empty, let's search for all articles or portfolio-items
if (items.length === 0) {
  const allH4 = [];
  let h;
  while ((h = h4Regex.exec(html)) !== null) {
    allH4.push(h[1].replace(/<[^>]+>/g, '').trim());
  }
  console.log('All H4s:', allH4);
}
