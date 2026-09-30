#!/usr/bin/env node
/**
 * validate_fauna.cjs
 * Comprehensive Paleontological Data Integrity & Coordinate Range Validator.
 * Verifies all records in public/data/fauna.json and src/data/fauna.json
 * strictly adhere to the FossilSpecies schema and assets exist on disk.
 */

const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const publicFaunaPath = path.join(projectRoot, 'public', 'data', 'fauna.json');
const srcFaunaPath = path.join(projectRoot, 'src', 'data', 'fauna.json');
const ffPath = path.join(projectRoot, 'public', 'data', 'fauna_flora.json');

// ANSI Terminal Colors
const C = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

console.log(`${C.bold}${C.cyan}╔══════════════════════════════════════════════════════════════════╗${C.reset}`);
console.log(`${C.bold}${C.cyan}║   🦕 VALIDADOR DE INTEGRIDAD PALEONTOLÓGICA & ESPECIES FÓSILES   ║${C.reset}`);
console.log(`${C.bold}${C.cyan}╚══════════════════════════════════════════════════════════════════╝${C.reset}\n`);

let totalErrors = 0;
let totalWarnings = 0;

// 1. Check File Existence & Synchronization
if (!fs.existsSync(publicFaunaPath)) {
  console.error(`${C.red}✖ ERROR FATAL: No se encuentra el archivo ${publicFaunaPath}${C.reset}`);
  process.exit(1);
}

const rawPublic = fs.readFileSync(publicFaunaPath, 'utf8');
let fauna = [];
try {
  fauna = JSON.parse(rawPublic);
} catch (e) {
  console.error(`${C.red}✖ ERROR DE SINTAXIS JSON en ${publicFaunaPath}: ${e.message}${C.reset}`);
  process.exit(1);
}

if (!Array.isArray(fauna)) {
  console.error(`${C.red}✖ ERROR: El contenido de fauna.json no es un arreglo.${C.reset}`);
  process.exit(1);
}

// Verify sync with src/data/fauna.json
if (fs.existsSync(srcFaunaPath)) {
  const rawSrc = fs.readFileSync(srcFaunaPath, 'utf8');
  if (rawPublic !== rawSrc) {
    console.warn(`${C.yellow}⚠ ADVERTENCIA: public/data/fauna.json y src/data/fauna.json no están sincronizados bite a bite.${C.reset}`);
    totalWarnings++;
  } else {
    console.log(`${C.green}✔ Sincronización perfecta: public/data/fauna.json ↔ src/data/fauna.json${C.reset}`);
  }
}

console.log(`${C.dim}Analizando ${fauna.length} registros fósiles...${C.reset}\n`);

const allowedEnvironments = ['terrestrial', 'marine', 'aerial', 'amphibious'];
const seenIds = new Set();
let chileanCount = 0;
const failureReports = [];

fauna.forEach((sp, idx) => {
  const errors = [];
  const warnings = [];
  const spLabel = sp.scientificName || sp.commonName || sp.id || `Índice #${idx}`;

  // ID validation
  if (!sp.id || typeof sp.id !== 'string' || sp.id.trim() === '') {
    errors.push('Campo "id" vacío o no es string');
  } else {
    if (seenIds.has(sp.id)) {
      errors.push(`ID duplicado en el catálogo: "${sp.id}"`);
    }
    seenIds.add(sp.id);
  }

  // Taxonomic names
  if (!sp.scientificName || typeof sp.scientificName !== 'string' || sp.scientificName.trim() === '') {
    errors.push('Campo "scientificName" vacío o ausente');
  }
  if (!sp.commonName || typeof sp.commonName !== 'string' || sp.commonName.trim() === '') {
    errors.push('Campo "commonName" vacío o ausente');
  }
  if (!sp.clade || typeof sp.clade !== 'string' || sp.clade.trim() === '') {
    warnings.push('Campo "clade" vacío o no especificado');
  }

  // Temporal range (Ma)
  if (typeof sp.startMa !== 'number' || isNaN(sp.startMa) || sp.startMa < 0) {
    errors.push(`"startMa" inválido (${sp.startMa}). Debe ser un número >= 0.`);
  }
  if (typeof sp.endMa !== 'number' || isNaN(sp.endMa) || sp.endMa < 0) {
    errors.push(`"endMa" inválido (${sp.endMa}). Debe ser un número >= 0.`);
  }
  if (typeof sp.startMa === 'number' && typeof sp.endMa === 'number') {
    if (sp.startMa < sp.endMa) {
      errors.push(`Inconsistencia cronológica: startMa (${sp.startMa} Ma) no puede ser menor que endMa (${sp.endMa} Ma)`);
    }
    if (sp.startMa > 4600) {
      errors.push(`startMa (${sp.startMa} Ma) excede la edad de la Tierra`);
    }
  }

  // Diet & Description
  if (!sp.diet || typeof sp.diet !== 'string' || sp.diet.trim() === '') {
    errors.push('Campo "diet" vacío o no especificado');
  }
  if (!sp.description || typeof sp.description !== 'string' || sp.description.trim().length < 20) {
    errors.push('Campo "description" ausente o demasiado corto (< 20 caracteres)');
  }

  // Metrics (length & weight)
  if (!sp.metrics || typeof sp.metrics !== 'object') {
    errors.push('Objeto "metrics" ausente');
  } else {
    if (typeof sp.metrics.lengthMeters !== 'number' || isNaN(sp.metrics.lengthMeters) || sp.metrics.lengthMeters <= 0) {
      errors.push(`"metrics.lengthMeters" inválido (${sp.metrics.lengthMeters}). Debe ser número > 0.`);
    }
    if (typeof sp.metrics.weightTons !== 'number' || isNaN(sp.metrics.weightTons) || sp.metrics.weightTons <= 0) {
      errors.push(`"metrics.weightTons" inválido (${sp.metrics.weightTons}). Debe ser número > 0.`);
    }
  }

  // Modern Excavation Coordinates (-90..90, -180..180)
  if (!sp.coordinates || typeof sp.coordinates !== 'object') {
    errors.push('Objeto "coordinates" ausente');
  } else {
    const { lat, lng } = sp.coordinates;
    if (typeof lat !== 'number' || isNaN(lat)) {
      errors.push(`"coordinates.lat" no es un número válido: ${lat}`);
    } else if (lat < -90 || lat > 90) {
      errors.push(`"coordinates.lat" fuera de rango (-90 a 90): ${lat}`);
    }

    if (typeof lng !== 'number' || isNaN(lng)) {
      errors.push(`"coordinates.lng" no es un número válido: ${lng}`);
    } else if (lng < -180 || lng > 180) {
      errors.push(`"coordinates.lng" fuera de rango (-180 a 180): ${lng}`);
    }
  }

  // Ancestral Paleo Coordinates (Mandatory & validated against continental drift)
  if (!sp.paleoCoordinates || typeof sp.paleoCoordinates !== 'object') {
    errors.push('Objeto "paleoCoordinates" ausente');
  } else {
    const plat = sp.paleoCoordinates.lat;
    const plon = sp.paleoCoordinates.lon !== undefined ? sp.paleoCoordinates.lon : sp.paleoCoordinates.lng;
    if (typeof plat !== 'number' || isNaN(plat) || plat < -90 || plat > 90) {
      errors.push(`"paleoCoordinates.lat" inválido o fuera de rango: ${plat}`);
    }
    if (typeof plon !== 'number' || isNaN(plon) || plon < -180 || plon > 180) {
      errors.push(`"paleoCoordinates.lon" inválido o fuera de rango: ${plon}`);
    }

    // Verify that ancient species (> 5 Ma) do not copy-paste modern GPS coordinates
    if (sp.startMa > 5 && sp.coordinates) {
      const mLat = sp.coordinates.lat;
      const mLon = sp.coordinates.lng;
      if (Math.abs(plat - mLat) < 0.1 && Math.abs(plon - mLon) < 0.1) {
        errors.push(`"paleoCoordinates" idénticas a modernas en era ${sp.startMa} Ma (no contempla deriva continental)`);
      }
    }

    // Verify Chilean Mesozoic species: at > 60 Ma, longitude cannot be in modern Pacific Ocean (< -55°)
    if ((sp.isChilean || sp.discovery?.modernCountry?.includes('Chile')) && sp.startMa > 60) {
      if (plon < -55) {
        errors.push(`Fósil chileno mesozoico (${sp.startMa} Ma) con paleolongitud < -55° (${plon}°). Cae en el Océano Pacífico.`);
      }
    }
  }

  // Environment
  if (!sp.environment || !allowedEnvironments.includes(sp.environment)) {
    errors.push(`"environment" inválido: "${sp.environment}". Debe ser uno de: ${allowedEnvironments.join(', ')}`);
  }

  // Discovery metadata
  if (!sp.discovery || typeof sp.discovery !== 'object') {
    errors.push('Objeto "discovery" ausente');
  } else {
    if (!sp.discovery.geologicalFormation || typeof sp.discovery.geologicalFormation !== 'string' || sp.discovery.geologicalFormation.trim() === '') {
      errors.push('Falta "discovery.geologicalFormation"');
    }
    if (!sp.discovery.modernCountry || typeof sp.discovery.modernCountry !== 'string' || sp.discovery.modernCountry.trim() === '') {
      warnings.push('Falta "discovery.modernCountry"');
    }
    if (!sp.discovery.describedBy || typeof sp.discovery.describedBy !== 'string' || sp.discovery.describedBy.trim() === '') {
      warnings.push('Falta "discovery.describedBy"');
    }
  }

  // Media assets & physical existence check
  if (!sp.media || typeof sp.media !== 'object' || !sp.media.imageUrl) {
    errors.push('Falta ruta de asset "media.imageUrl"');
  } else {
    const rawUrl = sp.media.imageUrl;
    const cleanRelPath = rawUrl.startsWith('./') ? rawUrl.substring(2) : rawUrl;
    const absAssetPath = path.join(projectRoot, 'public', cleanRelPath);

    if (!fs.existsSync(absAssetPath)) {
      errors.push(`El archivo de imagen no existe en disco: "${cleanRelPath}"`);
    } else {
      const stats = fs.statSync(absAssetPath);
      if (stats.size === 0) {
        errors.push(`El archivo de imagen está vacío (0 bytes): "${cleanRelPath}"`);
      }
    }
  }

  // Chilean Specific Paleofauna Checks
  if (sp.isChilean || sp.country === 'Chile' || (sp.discovery && sp.discovery.modernCountry && sp.discovery.modernCountry.includes('Chile'))) {
    chileanCount++;
    if (!sp.chileanRegion || typeof sp.chileanRegion !== 'string' || sp.chileanRegion.trim() === '') {
      warnings.push('Especie chilena sin especificar "chileanRegion"');
    }
    if (!sp.chileanProvince || typeof sp.chileanProvince !== 'string' || sp.chileanProvince.trim() === '') {
      warnings.push('Especie chilena sin especificar "chileanProvince"');
    }
    if (!sp.chileanLocality || typeof sp.chileanLocality !== 'string' || sp.chileanLocality.trim() === '') {
      warnings.push('Especie chilena sin especificar "chileanLocality"');
    }
  }

  if (errors.length > 0 || warnings.length > 0) {
    failureReports.push({
      id: sp.id || `Index_${idx}`,
      name: spLabel,
      errors,
      warnings
    });
    totalErrors += errors.length;
    totalWarnings += warnings.length;
  }
});

// Final Summary Report
console.log('──────────────────────────────────────────────────────────────────');
console.log(`${C.bold}ESTADÍSTICAS DEL CATÁLOGO FÓSIL:${C.reset}`);
console.log(`• Total de especies registradas: ${C.bold}${fauna.length}${C.reset}`);
console.log(`• Especies del registro fósil de Chile 🇨🇱: ${C.bold}${C.blue}${chileanCount}${C.reset}`);
console.log(`• Especies sin errores: ${C.bold}${C.green}${fauna.length - failureReports.filter(r => r.errors.length > 0).length}${C.reset}`);
console.log(`• Errores totales detectados: ${totalErrors === 0 ? C.green + '0' : C.red + totalErrors}${C.reset}`);
console.log(`• Advertencias / avisos menores: ${totalWarnings === 0 ? C.green + '0' : C.yellow + totalWarnings}${C.reset}`);
console.log('──────────────────────────────────────────────────────────────────\n');

if (failureReports.length > 0) {
  console.log(`${C.bold}DETALLE DE REGISTROS CON OBSERVACIONES:${C.reset}`);
  failureReports.forEach(rep => {
    console.log(`\n📌 [${rep.id}] ${C.bold}${rep.name}${C.reset}`);
    rep.errors.forEach(err => console.log(`   ${C.red}✖ ERROR: ${err}${C.reset}`));
    rep.warnings.forEach(warn => console.log(`   ${C.yellow}⚠ AVISO: ${warn}${C.reset}`));
  });
  console.log('');
}

if (totalErrors > 0) {
  console.log(`${C.bold}${C.red}❌ LA VALIDACIÓN HA FALLADO: Se encontraron ${totalErrors} errores que requieren corrección.${C.reset}\n`);
  process.exit(1);
} else {
  console.log(`${C.bold}${C.green}✨ ¡VALIDACIÓN EXITOSA! Todos los registros fósiles cumplen estrictamente la interfaz y rangos.${C.reset}\n`);
  process.exit(0);
}
