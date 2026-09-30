const fs = require('fs');
const cities = JSON.parse(fs.readFileSync('public/data/cities.json', 'utf8'));
const periods = ['0', '20', '50', '66', '105', '150', '200', '250', '300', '375', '430', '470', '540'];

cities.forEach(c => {
  console.log('=== ' + c.name + ' (' + c.country + ') Plate: ' + c.plate + ' ===');
  periods.forEach(p => {
    const pos = c.paleoPositions[p];
    if (pos) {
      const dLat = (pos.lat - c.modern.lat).toFixed(1);
      const dLon = (pos.lon - c.modern.lon).toFixed(1);
      console.log('  ' + p + ' Ma: [' + pos.lat + ', ' + pos.lon + '] (dLat: ' + dLat + ', dLon: ' + dLon + ')');
    }
  });
});
