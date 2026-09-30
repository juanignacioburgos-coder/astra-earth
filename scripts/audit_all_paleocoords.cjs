const fs = require('fs');

const fauna = JSON.parse(fs.readFileSync('public/data/fauna.json', 'utf8'));
const cities = JSON.parse(fs.readFileSync('public/data/cities.json', 'utf8'));
const periods = JSON.parse(fs.readFileSync('public/data/fauna_flora.json', 'utf8')).periods;

console.log('=== AUDITORÍA EXHAUSTIVA DE PALEOCOORDENADAS (108 ESPECIES) ===\n');

let countWithPaleo = 0;
let countMatchingModern = 0;
let suspiciousList = [];

fauna.forEach((sp, i) => {
  const m = sp.coordinates;
  const pc = sp.paleoCoordinates;
  const mLat = m ? m.lat : null;
  const mLon = m ? (m.lng !== undefined ? m.lng : m.lon) : null;
  const pLat = pc ? pc.lat : null;
  const pLon = pc ? (pc.lon !== undefined ? pc.lon : pc.lng) : null;
  
  if (pc) countWithPaleo++;
  
  const isIdentical = pc && m && Math.abs(mLat - pLat) < 0.1 && Math.abs(mLon - pLon) < 0.1;
  if (isIdentical && (sp.startMa > 10 || sp.periodId !== 'present_0ma')) {
    countMatchingModern++;
    suspiciousList.push({
      id: sp.id,
      name: sp.commonName,
      periodId: sp.periodId,
      startMa: sp.startMa,
      env: sp.environment,
      modern: { lat: mLat, lon: mLon },
      paleo: { lat: pLat, lon: pLon },
      reason: 'Paleocoordenadas idénticas a coordenadas modernas en era antigua (>10 Ma)'
    });
  }

  // Also check if Chilean species has incorrect longitude
  if (sp.isChilean || sp.discovery?.modernCountry?.includes('Chile')) {
    // If era is Cretaceous (66Ma, 70Ma) or Jurassic (150Ma) and longitude is still around -70, that's in the Pacific!
    if (sp.startMa > 60 && pLon < -55) {
      suspiciousList.push({
        id: sp.id,
        name: sp.commonName,
        periodId: sp.periodId,
        startMa: sp.startMa,
        env: sp.environment,
        modern: { lat: mLat, lon: mLon },
        paleo: { lat: pLat, lon: pLon },
        reason: 'Fósil chileno mesozoico en longitud < -55° (Cae en el Océano Pacífico en PALEOMAP)'
      });
    }
  }
});

console.log(`Total especies: ${fauna.length}`);
console.log(`Especies con campo paleoCoordinates: ${countWithPaleo}`);
console.log(`Especies sospechosas encontradas: ${suspiciousList.length}\n`);

suspiciousList.forEach((s, idx) => {
  console.log(`${idx + 1}. [${s.id}] ${s.name} (${s.periodId}, ${s.startMa} Ma, ${s.env})`);
  console.log(`   Modern: [${s.modern.lat}, ${s.modern.lon}] | Paleo: [${s.paleo.lat}, ${s.paleo.lon}]`);
  console.log(`   ⚠️ Problema: ${s.reason}`);
});
