import fs from 'fs';
import https from 'https';

https.get('https://www.mundoprehistorico.com/fauna-cretacico/', { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
  let html = '';
  res.on('data', chunk => html += chunk);
  res.on('end', () => {
    const workItems = html.match(/<div class="work-item[^"]*"[^>]*>[\s\S]*?<\/div>\s*<\/div>/gi) || [];
    console.log('Sample work item:');
    console.log(workItems[0]);
  });
});
