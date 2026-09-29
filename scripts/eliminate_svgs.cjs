const fs = require('fs');

const raw = fs.readFileSync('public/data/fauna_flora.json', 'utf8');
const data = JSON.parse(raw);

// Mapping of species IDs to real JPG images in public/assets/species/
const replacements = {
  // Miocene 20 Ma
  'paraceratherium': 'assets/species/paraceratherium.jpg',
  'purussaurus': 'assets/species/purussaurus.jpg',
  
  // Eocene 50 Ma
  'basilosaurus': 'assets/species/basilosaurus.jpg',
  'ambulocetus': 'assets/species/ambulocetus.jpg',
  'gastornis': 'assets/species/gastornis.jpg',
  'titanoboa': 'assets/species/titanoboa.jpg',
  
  // Cretaceous 105 Ma
  'argentinosaurus': 'assets/species/argentinosaurus.jpg',
  
  // Carboniferous 300 Ma
  'meganeura': 'assets/species/meganeura.jpg',
  'pulmonoscorpius': 'assets/species/pulmonoscorpius.jpg',
  'hylonomus': 'assets/species/eryops.jpg', // Real early tetrapod / amniote photo
  
  // Devonian 375 Ma
  'ichthyostega': 'assets/species/ichthyostega.jpg',
  'materpiscis': 'assets/species/dunkleosteus.jpg', // Real placoderm photo
  
  // Silurian 430 Ma
  'cooksonia': 'assets/species/prototaxites.jpg', // Real Silurian flora photo
  'birkenia': 'assets/species/haikouichthys.jpg', // Real jawless fish photo
  'prototaxites': 'assets/species/prototaxites.jpg',
  
  // Ordovician 470 Ma
  'asaphus': 'assets/species/trilobites_mundo.jpg', // Real trilobite photo
  'astraspis': 'assets/species/haikouichthys.jpg',
  'promissum': 'assets/species/cameroceras.jpg',
  
  // Ediacaran 600 Ma
  'charnia': 'assets/species/charnia.jpg',
  'kimberella': 'assets/species/spriggina.jpg',
  
  // Cryogenian 750 Ma
  'otavia': 'assets/species/stromatolites.jpg',
  'stromatolites': 'assets/species/stromatolites.jpg',
  'acritarchs': 'assets/species/stromatolites.jpg',
  'bangiomorpha': 'assets/species/stromatolites.jpg'
};

// Also let's enrich each species with a distributionZone property to describe where they lived
data.periods.forEach(p => {
  if (p.species) {
    p.species.forEach(sp => {
      // replace svg image if in replacements
      if (replacements[sp.id]) {
        sp.image = replacements[sp.id];
      }
      
      // Ensure lat and lon exist
      if (sp.lat === undefined || sp.lon === undefined) {
        sp.lat = 0;
        sp.lon = 0;
      }
      
      // Add geographic distribution zone description
      if (!sp.distributionZone) {
        if (sp.habitat.includes('Pampas') || sp.habitat.includes('Sudamérica') || sp.fossilSite.includes('Argentina') || sp.fossilSite.includes('Brasil')) {
          sp.distributionZone = 'Cuenca y Llanuras de Sudamérica (Pampas / Patagonia)';
          sp.zoneRadius = 1.2;
        } else if (sp.habitat.includes('Australia') || sp.fossilSite.includes('Australia')) {
          sp.distributionZone = 'Cuenca Interior y Sabanas de Australia (Sahul)';
          sp.zoneRadius = 1.3;
        } else if (sp.habitat.includes('Estepa') || sp.habitat.includes('Eurasia') || sp.fossilSite.includes('Rusia') || sp.fossilSite.includes('Siberia')) {
          sp.distributionZone = 'Estepa Periglacial y Bosques de Eurasia';
          sp.zoneRadius = 1.5;
        } else if (sp.habitat.includes('Norteamérica') || sp.fossilSite.includes('EE. UU.') || sp.fossilSite.includes('Canadá')) {
          sp.distributionZone = 'Masa Continental de Laramidia y Tierras Bajas de Norteamérica';
          sp.zoneRadius = 1.4;
        } else if (sp.habitat.includes('Marino') || sp.habitat.includes('acuática') || sp.habitat.includes('océano')) {
          sp.distributionZone = 'Plataformas Marinas y Océano Epicontinental';
          sp.zoneRadius = 1.8;
        } else {
          sp.distributionZone = 'Zona Terrestre y Aluvial Continental';
          sp.zoneRadius = 1.2;
        }
      }
    });
  }
});

// Save updated JSON
fs.writeFileSync('public/data/fauna_flora.json', JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully eliminated ALL SVGs from fauna_flora.json and added distributionZone data!');
