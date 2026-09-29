const https = require('https');
const fs = require('fs');

https.get('https://www.mundoprehistorico.com/portfolio/glyptodon/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('scripts/glyptodon_page.html', data);
    console.log('Saved glyptodon page, length:', data.length);
  });
});
