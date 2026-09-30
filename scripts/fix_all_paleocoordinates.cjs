const fs = require('fs');

const faunaPath = 'public/data/fauna.json';
const srcFaunaPath = 'src/data/fauna.json';
const faunaFloraPath = 'public/data/fauna_flora.json';
const citiesPath = 'public/data/cities.json';

const fauna = JSON.parse(fs.readFileSync(faunaPath, 'utf8'));
const cities = JSON.parse(fs.readFileSync(citiesPath, 'utf8'));
const faunaFlora = JSON.parse(fs.readFileSync(faunaFloraPath, 'utf8'));
const periods = faunaFlora.periods;

// Plate assignment mapping
function getPlateKey(sp) {
  const country = (sp.discovery?.modernCountry || sp.country || '').toLowerCase();
  const loc = (Array.isArray(sp.paleoLocation) ? sp.paleoLocation.join(' ') : (sp.fossilSite || '')).toLowerCase();
  const m = sp.coordinates || {};
  const lat = m.lat !== undefined ? m.lat : (sp.lat || 0);
  const lon = m.lng !== undefined ? m.lng : (m.lon !== undefined ? m.lon : (sp.lon || 0));

  // Chile & Pacific Margin South America
  if (sp.isChilean || country.includes('chile') || loc.includes('chile')) {
    return 'santiago';
  }
  // South America - Atlantic / Brazil / Argentina / Uruguay
  if (country.includes('argentina') || country.includes('brasil') || country.includes('brazil') || country.includes('uruguay') || loc.includes('argentina') || loc.includes('patagonia') || loc.includes('neuquén')) {
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
  // Europe - Southern / Iberia / Italy
  if (country.includes('españa') || country.includes('spain') || country.includes('portugal') || country.includes('italia') || country.includes('italy')) {
    return 'madrid';
  }
  // Europe - Northern / UK / Germany / France / Scandinavia / Russia (European)
  if (country.includes('reino unido') || country.includes('uk') || country.includes('inglaterra') || country.includes('scotland') || country.includes('alemania') || country.includes('germany') || country.includes('francia') || country.includes('france') || (lat > 35 && lon > -15 && lon < 40)) {
    return 'london';
  }
  // Africa
  if (country.includes('egipto') || country.includes('marruecos') || country.includes('morocco') || country.includes('niger') || country.includes('kenia') || country.includes('kenya') || country.includes('etiopía') || country.includes('ethiopia') || country.includes('namibia') || country.includes('sudáfrica') || country.includes('south africa') || country.includes('tanzania') || country.includes('madagascar') || (lat < 38 && lat > -38 && lon > -20 && lon < 55)) {
    return 'cairo';
  }
  // Asia - East / China / Mongolia / Russia / Japan / India
  if (country.includes('china') || country.includes('mongolia') || country.includes('japón') || country.includes('japan') || country.includes('rusia') || country.includes('russia') || (lat > 0 && lon > 55 && lon < 160)) {
    return 'tokyo';
  }
  // Australia / Oceania / Antarctica
  if (country.includes('australia') || country.includes('antártida') || country.includes('antarctica') || (lat < -10 && lon > 110)) {
    return 'sydney';
  }

  // Fallback by coordinates
  if (lon < -30 && lat < 15) return 'santiago';
  if (lon < -30 && lat >= 15) return 'new-york';
  if (lon >= -30 && lon < 45 && lat > 35) return 'london';
  if (lon >= -30 && lon < 55 && lat <= 35) return 'cairo';
  if (lon >= 55) return 'tokyo';
  return 'santiago';
}

function getPlateOffset(plateCityId, targetMa) {
  const city = cities.find(c => c.id === plateCityId);
  if (!city || !city.paleoPositions) return { dLat: 0, dLon: 0 };

  const keys = Object.keys(city.paleoPositions).map(k => parseFloat(k)).sort((a,b) => a - b);

  if (city.paleoPositions[targetMa.toString()]) {
    const pos = city.paleoPositions[targetMa.toString()];
    return {
      dLat: pos.lat - city.modern.lat,
      dLon: pos.lon - city.modern.lon
    };
  }

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

console.log('--- RECONSTRUYENDO PALEOCOORDENADAS EXACTAS PARA TODA LA FAUNA ---');

// 1. Update fauna.json
fauna.forEach(sp => {
  // Determine anchor geological age
  let timeMa = sp.startMa || 0;
  const periodMatch = periods.find(p => p.id === sp.periodId);
  if (periodMatch && periodMatch.timeMa !== undefined) {
    timeMa = periodMatch.timeMa;
  }

  // If modern/recent (< 3 Ma), paleoCoords == modern coords
  const m = sp.coordinates;
  if (!m) return;
  const mLat = m.lat;
  const mLon = m.lng !== undefined ? m.lng : m.lon;

  if (timeMa <= 3 || sp.periodId === 'present_0ma' || sp.periodId === 'pleistoceno' || sp.periodId === 'holoceno') {
    sp.paleoCoordinates = {
      lat: parseFloat(mLat.toFixed(2)),
      lon: parseFloat(mLon.toFixed(2))
    };
    return;
  }

  const plateId = getPlateKey(sp);
  const offset = getPlateOffset(plateId, timeMa);

  let pLat = parseFloat((mLat + offset.dLat).toFixed(2));
  let pLon = parseFloat((mLon + offset.dLon).toFixed(2));

  // Spherical polar wrapping over North/South poles
  if (pLat > 90) {
    pLat = 180 - pLat;
    pLon += 180;
  } else if (pLat < -90) {
    pLat = -180 - pLat;
    pLon += 180;
  }

  while (pLon > 180) pLon -= 360;
  while (pLon < -180) pLon += 360;

  pLat = parseFloat(pLat.toFixed(2));
  pLon = parseFloat(pLon.toFixed(2));

  sp.paleoCoordinates = {
    lat: pLat,
    lon: pLon
  };
});

fs.writeFileSync(faunaPath, JSON.stringify(fauna, null, 2), 'utf8');
fs.writeFileSync(srcFaunaPath, JSON.stringify(fauna, null, 2), 'utf8');
console.log('✔ public/data/fauna.json y src/data/fauna.json actualizados con éxito.');

// 2. Update fauna_flora.json period species
let faunaFloraUpdatedCount = 0;
periods.forEach(per => {
  const pTimeMa = per.timeMa || 0;
  if (per.species && Array.isArray(per.species)) {
    per.species.forEach(sp => {
      // Find canonical match in fauna.json
      const canonical = fauna.find(f => f.id === sp.id);
      if (canonical && canonical.paleoCoordinates) {
        sp.lat = canonical.paleoCoordinates.lat;
        sp.lon = canonical.paleoCoordinates.lon;
        sp.paleoCoordinates = canonical.paleoCoordinates;
        if (canonical.coordinates) {
          sp.coordinates = canonical.coordinates;
        }
        faunaFloraUpdatedCount++;
      } else {
        // Compute directly
        const plateId = getPlateKey(sp);
        const offset = getPlateOffset(plateId, pTimeMa);
        let curLat = sp.lat || 0;
        let curLon = sp.lon || 0;
        if (pTimeMa > 3) {
          sp.lat = parseFloat((curLat + offset.dLat).toFixed(2));
          sp.lon = parseFloat((curLon + offset.dLon).toFixed(2));
        }
      }
    });
  }
});

fs.writeFileSync(faunaFloraPath, JSON.stringify(faunaFlora, null, 2), 'utf8');
console.log(`✔ public/data/fauna_flora.json actualizado con ${faunaFloraUpdatedCount} especies sincronizadas.`);
