const fs = require('fs');
const data = JSON.parse(fs.readFileSync('public/data/fauna_flora.json', 'utf8'));

console.log('Total periods:', data.periods.length);
data.periods.forEach((p, idx) => {
  console.log(`[${idx}] ${p.id} (${p.timeMa} Ma) - Species: ${p.species ? p.species.length : 0}`);
  if (p.species) {
    p.species.forEach(s => {
      const exists = fs.existsSync('public/' + s.image);
      console.log(`   - ${s.id}: ${s.name} (${s.image}) [exists: ${exists}]`);
    });
  }
});
