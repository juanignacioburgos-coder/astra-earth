const fs = require('fs');
const fauna = JSON.parse(fs.readFileSync('public/data/fauna.json', 'utf8'));

console.log('=== AUDIT OF ALL 57 SPECIES ===\n');
fauna.forEach((sp, i) => {
  console.log((i + 1) + '. [' + sp.id + '] ' + sp.commonName + ' (' + sp.scientificName + ')');
  console.log('   Period: ' + sp.periodId + ' (' + sp.startMa + '-' + sp.endMa + ' Ma) | Clade: ' + sp.clade);
  console.log('   Env: ' + sp.environment + ' | Diet: ' + sp.diet);
  console.log('   Coords: Modern(' + sp.coordinates?.lat + ', ' + sp.coordinates?.lng + ') -> Paleo(' + sp.paleoCoordinates?.lat + ', ' + sp.paleoCoordinates?.lon + ')');
  console.log('   Formation: ' + sp.discovery?.geologicalFormation);
  console.log('   Country: ' + sp.discovery?.modernCountry);
  console.log('   WaterBody: ' + sp.paleogeography?.waterBody);
  console.log('   Landmass: ' + sp.paleogeography?.landmass);
  console.log('---');
});
