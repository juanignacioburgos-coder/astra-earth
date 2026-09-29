const fs = require('fs');
const f1 = JSON.parse(fs.readFileSync('public/data/fauna.json', 'utf8'));
const f2 = JSON.parse(fs.readFileSync('public/data/fauna_flora.json', 'utf8'));

const f1Map = new Map();
f1.forEach(sp => {
  f1Map.set((sp.commonName || sp.name || '').toLowerCase(), sp);
  f1Map.set((sp.scientificName || '').toLowerCase(), sp);
  f1Map.set(sp.id.toLowerCase(), sp);
  // Also without hyphens/underscores
  f1Map.set(sp.id.replace(/-/g, '_').toLowerCase(), sp);
  f1Map.set(sp.id.replace(/_/g, '-').toLowerCase(), sp);
});

console.log('=== Checking all period.species in fauna_flora.json against fauna.json ===');
let notFoundCount = 0;
let foundCount = 0;

f2.periods.forEach(p => {
  if (!p.species) return;
  p.species.forEach(s => {
    const sCommon = (s.commonName || '').toLowerCase();
    const sName = (s.name || '').toLowerCase();
    const sId = (s.id || '').toLowerCase();
    
    let match = f1Map.get(sId) || f1Map.get(sCommon) || f1Map.get(sName);
    if (!match) {
      // try fuzzy by words
      for (const [key, sp] of f1Map.entries()) {
        if (sCommon && key.includes(sCommon)) { match = sp; break; }
        if (sName && key.includes(sName)) { match = sp; break; }
      }
    }
    
    if (match) {
      foundCount++;
      // Check if IDs differ
      if (s.id !== match.id) {
        console.log(`[ID MISMATCH] In ${p.name}: fauna_flora id "${s.id}" maps to fauna.json id "${match.id}" (${match.commonName})`);
      }
    } else {
      notFoundCount++;
      console.log(`[NOT IN FAUNA.JSON] In ${p.name}: id="${s.id}", name="${s.name}", commonName="${s.commonName}"`);
    }
  });
});

console.log(`Summary: ${foundCount} mapped, ${notFoundCount} not in fauna.json`);
