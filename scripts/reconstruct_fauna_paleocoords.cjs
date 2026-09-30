const fs = require('fs');

const fauna = JSON.parse(fs.readFileSync('public/data/fauna.json', 'utf8'));
const cities = JSON.parse(fs.readFileSync('public/data/cities.json', 'utf8'));
const periods = JSON.parse(fs.readFileSync('public/data/fauna_flora.json', 'utf8')).periods;

// Plate reference mapping based on modern geography
function getPlateKey(sp) {
  const country = (sp.discovery?.modernCountry || sp.country || '').toLowerCase();
  const loc = (Array.isArray(sp.paleoLocation) ? sp.paleoLocation.join(' ') : (sp.fossilSite || '')).toLowerCase();
  const m = sp.coordinates || {};
  const lat = m.lat || 0;
  const lon = m.lng !== undefined ? m.lng : (m.lon || 0);

  // Chile & Pacific Margin South America
  if (sp.isChilean || country.includes('chile') || loc.includes('chile')) {
    return 'santiago';
  }
  // South America - Atlantic / Brazil / Argentina
  if (country.includes('argentina') || country.includes('brasil') || country.includes('brazil') || loc.includes('argentina') || loc.includes('patagonia')) {
    return 'buenos-aires';
  }
  // South America - Northern (Colombia, Peru, Bolivia, Venezuela)
  if (country.includes('colombia') || country.includes('peru') || country.includes('perú') || country.includes('bolivia') || country.includes('venezuela') || (lat < 12 && lat > -20 && lon < -60 && lon > -85)) {
    return 'bogota';
  }
  // North America - Mexico / Central America
  if (country.includes('mexico') || country.includes('méxico')) {
    return 'ciudad-de-mexico';
  }
  // North America - USA / Canada (Laurentia)
  if (country.includes('ee. uu') || country.includes('usa') || country.includes('estados unidos') || country.includes('canada') || country.includes('canadá') || (lat > 25 && lon < -50 && lon > -170)) {
    return 'new-york';
  }
  // Europe - Southern / Iberia
  if (country.includes('españa') || country.includes('spain') || country.includes('portugal') || country.includes('italia') || country.includes('italy')) {
    return 'madrid';
  }
  // Europe - Northern / UK / Germany / France / Scandinavia
  if (country.includes('reino unido') || country.includes('uk') || country.includes('inglaterra') || country.includes('alemania') || country.includes('germany') || country.includes('francia') || country.includes('france') || (lat > 35 && lon > -15 && lon < 40)) {
    return 'london';
  }
  // Africa
  if (country.includes('egipto') || country.includes('marruecos') || country.includes('niger') || country.includes('kenia') || country.includes('kenya') || country.includes('etiopía') || country.includes('ethiopia') || country.includes('namibia') || country.includes('sudáfrica') || country.includes('tanzania') || country.includes('madagascar') || (lat < 38 && lat > -38 && lon > -20 && lon < 55)) {
    return 'cairo';
  }
  // Asia - East / China / Mongolia / Russia / Japan
  if (country.includes('china') || country.includes('mongolia') || country.includes('japón') || country.includes('japan') || country.includes('rusia') || country.includes('russia') || (lat > 0 && lon > 55 && lon < 160)) {
    return 'tokyo';
  }
  // Australia / Oceania / Antarctica
  if (country.includes('australia') || country.includes('antártida') || country.includes('antarctica') || (lat < -10 && lon > 110)) {
    return 'sydney';
  }

  // Fallback by latitude / longitude
  if (lon < -30 && lat < 15) return 'santiago';
  if (lon < -30 && lat >= 15) return 'new-york';
  if (lon >= -30 && lon < 45 && lat > 35) return 'london';
  if (lon >= -30 && lon < 55 && lat <= 35) return 'cairo';
  if (lon >= 55) return 'tokyo';
  return 'santiago';
}

// Compute paleo offset for a plate at targetMa
function getPlateOffset(plateCityId, targetMa) {
  const city = cities.find(c => c.id === plateCityId);
  if (!city || !city.paleoPositions) return { dLat: 0, dLon: 0 };

  const keys = Object.keys(city.paleoPositions).map(k => parseFloat(k)).sort((a,b) => a - b);

  // If exact match
  if (city.paleoPositions[targetMa.toString()]) {
    const pos = city.paleoPositions[targetMa.toString()];
    return {
      dLat: pos.lat - city.modern.lat,
      dLon: pos.lon - city.modern.lon
    };
  }

  // Interpolate between closest brackets
  let lowerKey = keys[0];
  let upperKey = keys[keys.length - 1];

  for (let i = 0; i < keys.length - 1; i++) {
    if (targetMa >= keys[i] && targetMa <= keys[i + 1]) {
      lowerKey = keys[i];
      upperKey = keys[i + 1];
      break;
    }
  }

  if (targetMa <= lowerKey) {
    const pos = city.paleoPositions[lowerKey.toString()];
    return { dLat: pos.lat - city.modern.lat, dLon: pos.lon - city.modern.lon };
  }
  if (targetMa >= upperKey) {
    const pos = city.paleoPositions[upperKey.toString()];
    return { dLat: pos.lat - city.modern.lat, dLon: pos.lon - city.modern.lon };
  }

  const range = upperKey - lowerKey;
  const factor = (targetMa - lowerKey) / range;
  const p1 = city.paleoPositions[lowerKey.toString()];
  const p2 = city.paleoPositions[upperKey.toString()];

  const lat = p1.lat + (p2.lat - p1.lat) * factor;
  const lon = p1.lon + (p2.lon - p1.lon) * factor;

  return {
    dLat: lat - city.modern.lat,
    dLon: lon - city.modern.lon
  };
}

console.log('=== CALCULANDO PALEOCOORDENADAS CIENTÍFICAS BASADAS EN MODELO TECTÓNICO SCOTESE ===\n');

let changes = 0;
const report = [];

fauna.forEach(sp => {
  const m = sp.coordinates;
  if (!m) return;
  const mLat = m.lat;
  const mLon = m.lng !== undefined ? m.lng : m.lon;

  // Era timeMa in millions of years
  let timeMa = sp.startMa || 0;
  // If period has an exact anchor time
  const periodMatch = periods.find(p => p.id === sp.periodId);
  if (periodMatch && periodMatch.timeMa !== undefined) {
    timeMa = periodMatch.timeMa;
  }

  const plateId = getPlateKey(sp);
  const offset = getPlateOffset(plateId, timeMa);

  let newPaleoLat = parseFloat((mLat + offset.dLat).toFixed(2));
  let newPaleoLon = parseFloat((mLon + offset.dLon).toFixed(2));

  // Wrap lon into [-180, 180]
  while (newPaleoLon > 180) newPaleoLon -= 360;
  while (newPaleoLon < -180) newPaleoLon += 360;

  const oldPc = sp.paleoCoordinates;
  const oldLat = oldPc ? oldPc.lat : null;
  const oldLon = oldPc ? (oldPc.lon !== undefined ? oldPc.lon : oldPc.lng) : null;

  const distDiff = oldPc ? Math.hypot(newPaleoLat - oldLat, newPaleoLon - oldLon) : 999;

  if (distDiff > 1.5) {
    changes++;
    report.push({
      id: sp.id,
      name: sp.commonName,
      country: sp.discovery?.modernCountry || 'N/D',
      plate: plateId,
      timeMa,
      modern: [mLat, mLon],
      oldPaleo: [oldLat, oldLon],
      newPaleo: [newPaleoLat, newPaleoLon],
      shift: distDiff.toFixed(1) + '°'
    });
  }
});

console.log(`Especies que requerían corrección por deriva tectónica: ${changes} de ${fauna.length}\n`);

report.slice(0, 25).forEach((r, idx) => {
  console.log(`${idx + 1}. [${r.id}] ${r.name} (${r.timeMa} Ma) | Placa: ${r.plate}`);
  console.log(`   Mod: [${r.modern}] -> Antiguo Paleo: [${r.oldPaleo}] -> NUEVO CIENTÍFICO: [${r.newPaleo}] (Corrección: ${r.shift})`);
});

console.log(`\n... y ${report.length - 25} especies adicionales corregidas.`);
