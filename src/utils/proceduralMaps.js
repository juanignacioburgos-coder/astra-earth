/**
 * Procedural Paleogeographic Texture Generator
 * Generates scientifically-inspired 2048x1024 equirectangular texture maps
 * for geological periods (Scotese PALEOMAP inspired).
 */

// Simple 2D Perlin-like pseudo noise generator for terrain detail
class SimpleNoise {
  constructor(seed = 12345) {
    this.perm = new Uint8Array(512);
    const p = new Uint8Array(256);
    for (let i = 0; i < 256; i++) p[i] = i;
    let s = seed;
    for (let i = 255; i > 0; i--) {
      s = (s * 16807) % 2147483647;
      const j = s % (i + 1);
      const tmp = p[i];
      p[i] = p[j];
      p[j] = tmp;
    }
    for (let i = 0; i < 512; i++) {
      this.perm[i] = p[i & 255];
    }
  }

  noise2D(x, y) {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);

    const u = xf * xf * (3 - 2 * xf);
    const v = yf * yf * (3 - 2 * yf);

    const a = this.perm[X] + Y;
    const aa = this.perm[a];
    const ab = this.perm[a + 1];
    const b = this.perm[X + 1] + Y;
    const ba = this.perm[b];
    const bb = this.perm[b + 1];

    const grad = (hash, gx, gy) => {
      const h = hash & 3;
      return (h === 0 ? gx + gy : h === 1 ? -gx + gy : h === 2 ? gx - gy : -gx - gy);
    };

    const x1 = grad(aa, xf, yf) * (1 - u) + grad(ba, xf - 1, yf) * u;
    const x2 = grad(ab, xf, yf - 1) * (1 - u) + grad(bb, xf - 1, yf - 1) * u;
    return x1 * (1 - v) + x2 * v;
  }

  fbm(x, y, octaves = 4) {
    let total = 0;
    let freq = 1;
    let amp = 1;
    let max = 0;
    for (let i = 0; i < octaves; i++) {
      total += this.noise2D(x * freq, y * freq) * amp;
      max += amp;
      freq *= 2.05;
      amp *= 0.5;
    }
    return total / max;
  }
}

/**
 * Returns landmass mask parameters for specific geological periods
 */
function getPeriodLandmasses(periodId) {
  switch (periodId) {
    case 'present_0ma':
      return {
        isSnowball: false,
        desertBelt: true,
        iceCaps: true,
        continents: [
          // North America
          { lat: 45, lon: -100, rx: 42, ry: 24, rot: 0.1, weight: 1.2 },
          // South America
          { lat: -18, lon: -60, rx: 20, ry: 35, rot: 0.3, weight: 1.1 },
          // Eurasia
          { lat: 50, lon: 70, rx: 65, ry: 25, rot: -0.05, weight: 1.3 },
          // Africa
          { lat: 3, lon: 20, rx: 28, ry: 33, rot: -0.1, weight: 1.2 },
          // Australia
          { lat: -25, lon: 135, rx: 22, ry: 18, rot: 0.1, weight: 1.0 },
          // Antarctica
          { lat: -82, lon: 0, rx: 90, ry: 15, rot: 0, weight: 1.4 },
          // Greenland
          { lat: 72, lon: -40, rx: 16, ry: 14, rot: -0.2, weight: 1.0 }
        ]
      };

    case 'miocene_20ma':
      return {
        isSnowball: false,
        desertBelt: true,
        iceCaps: true,
        continents: [
          { lat: 43, lon: -95, rx: 40, ry: 24, rot: 0.08, weight: 1.2 },
          { lat: -16, lon: -56, rx: 20, ry: 34, rot: 0.25, weight: 1.1 },
          { lat: 48, lon: 65, rx: 62, ry: 24, rot: -0.05, weight: 1.3 },
          { lat: 2, lon: 22, rx: 27, ry: 32, rot: -0.1, weight: 1.2 },
          { lat: -29, lon: 130, rx: 22, ry: 18, rot: 0.05, weight: 1.0 },
          { lat: -82, lon: 0, rx: 85, ry: 15, rot: 0, weight: 1.4 }
        ]
      };

    case 'eocene_50ma':
      return {
        isSnowball: false,
        desertBelt: false,
        iceCaps: false, // Warm ice-free poles
        warmGreenhouse: true,
        continents: [
          // Separated Americas
          { lat: 42, lon: -88, rx: 38, ry: 23, rot: 0.05, weight: 1.1 },
          { lat: -12, lon: -50, rx: 20, ry: 32, rot: 0.2, weight: 1.0 },
          // Eurasia with shallow Obik sea
          { lat: 48, lon: 60, rx: 55, ry: 22, rot: -0.05, weight: 1.1 },
          // Africa closer to Europe
          { lat: 0, lon: 18, rx: 26, ry: 30, rot: -0.15, weight: 1.1 },
          // India island heading north
          { lat: 5, lon: 72, rx: 12, ry: 12, rot: 0.3, weight: 1.0 },
          // Australia attached or close to Antarctica
          { lat: -45, lon: 120, rx: 20, ry: 18, rot: 0.1, weight: 1.0 },
          { lat: -78, lon: 0, rx: 75, ry: 18, rot: 0, weight: 1.2 }
        ]
      };

    case 'cretaceous_66ma':
      return {
        isSnowball: false,
        desertBelt: false,
        iceCaps: false,
        highSeaLevel: true,
        continents: [
          // Laramidia (West NA)
          { lat: 45, lon: -105, rx: 18, ry: 28, rot: 0.2, weight: 1.1 },
          // Appalachia (East NA)
          { lat: 38, lon: -75, rx: 16, ry: 22, rot: 0.3, weight: 1.0 },
          // South America isolated
          { lat: -10, lon: -45, rx: 18, ry: 30, rot: 0.15, weight: 1.1 },
          // Africa
          { lat: -2, lon: 15, rx: 24, ry: 28, rot: -0.1, weight: 1.1 },
          // European Archipelago
          { lat: 42, lon: 15, rx: 18, ry: 15, rot: 0.1, weight: 0.9 },
          // Asia
          { lat: 48, lon: 75, rx: 42, ry: 24, rot: -0.1, weight: 1.2 },
          // India island in Indian Ocean
          { lat: -12, lon: 65, rx: 12, ry: 12, rot: 0.2, weight: 1.0 },
          // Antarctica / Australia united
          { lat: -70, lon: 50, rx: 60, ry: 22, rot: 0.2, weight: 1.2 }
        ]
      };

    case 'cretaceous_105ma':
      return {
        isSnowball: false,
        desertBelt: false,
        iceCaps: false,
        highSeaLevel: true,
        continents: [
          // North America rifted
          { lat: 42, lon: -85, rx: 32, ry: 24, rot: 0.1, weight: 1.1 },
          // South America & Africa separating (narrow South Atlantic)
          { lat: -8, lon: -35, rx: 18, ry: 28, rot: 0.1, weight: 1.1 },
          { lat: -5, lon: 5, rx: 22, ry: 28, rot: -0.1, weight: 1.1 },
          // Eurasia
          { lat: 45, lon: 60, rx: 48, ry: 22, rot: -0.05, weight: 1.1 },
          // India & Madagascar united with Antarctica
          { lat: -25, lon: 55, rx: 16, ry: 16, rot: 0.2, weight: 1.0 },
          // East Gondwana (Australia-Antarctica)
          { lat: -65, lon: 80, rx: 55, ry: 25, rot: 0.1, weight: 1.2 }
        ]
      };

    case 'jurassic_150ma':
      return {
        isSnowball: false,
        desertBelt: true,
        iceCaps: false,
        continents: [
          // Laurasia (North America + Eurasia)
          { lat: 35, lon: -40, rx: 35, ry: 22, rot: 0.05, weight: 1.2 },
          { lat: 42, lon: 40, rx: 45, ry: 22, rot: -0.1, weight: 1.2 },
          // Gondwana (South America + Africa + India + Antarctica + Australia)
          { lat: -5, lon: -15, rx: 22, ry: 28, rot: 0.1, weight: 1.2 },
          { lat: -10, lon: 20, rx: 28, ry: 28, rot: -0.1, weight: 1.2 },
          { lat: -35, lon: 40, rx: 35, ry: 25, rot: 0.3, weight: 1.2 },
          { lat: -55, lon: 60, rx: 40, ry: 24, rot: 0.1, weight: 1.2 }
        ]
      };

    case 'triassic_200ma':
      return {
        isSnowball: false,
        desertBelt: true,
        aridInterior: true, // Giant central red desert
        iceCaps: false,
        continents: [
          // Pangaea continuous C-shape
          { lat: 45, lon: 5, rx: 35, ry: 24, rot: 0.05, weight: 1.3 },
          { lat: 20, lon: 0, rx: 30, ry: 22, rot: 0, weight: 1.4 },
          { lat: -5, lon: -5, rx: 32, ry: 25, rot: -0.05, weight: 1.4 },
          { lat: -35, lon: 15, rx: 38, ry: 28, rot: 0.2, weight: 1.3 },
          { lat: -60, lon: 40, rx: 42, ry: 25, rot: 0.1, weight: 1.2 },
          // Cimmerian strip in Tethys
          { lat: 10, lon: 55, rx: 22, ry: 8, rot: -0.3, weight: 0.9 }
        ]
      };

    case 'permian_250ma':
      return {
        isSnowball: false,
        desertBelt: true,
        aridInterior: true,
        volcanicSiberia: true,
        iceCaps: false,
        continents: [
          // Monolithic Pangaea supercontinent
          { lat: 55, lon: 25, rx: 38, ry: 22, rot: -0.1, weight: 1.3 }, // Siberia
          { lat: 25, lon: 0, rx: 32, ry: 24, rot: 0, weight: 1.4 },
          { lat: 0, lon: -8, rx: 30, ry: 26, rot: 0.05, weight: 1.4 },
          { lat: -25, lon: 5, rx: 35, ry: 28, rot: 0.1, weight: 1.4 },
          { lat: -55, lon: 30, rx: 42, ry: 26, rot: 0.2, weight: 1.3 }
        ]
      };

    case 'carboniferous_300ma':
      return {
        isSnowball: false,
        desertBelt: false,
        equatorialSwamp: true, // Lush emerald coal forests on equator
        southPolarGlaciers: true, // Huge South polar glaciations
        continents: [
          // Euramerica (equatorial)
          { lat: 5, lon: -15, rx: 35, ry: 22, rot: 0.1, weight: 1.3 },
          // Siberia isolated in high north
          { lat: 58, lon: 50, rx: 28, ry: 20, rot: -0.2, weight: 1.1 },
          // Gondwana sprawling across south pole
          { lat: -30, lon: 10, rx: 45, ry: 30, rot: 0.1, weight: 1.4 },
          { lat: -65, lon: 25, rx: 48, ry: 26, rot: 0, weight: 1.4 }
        ]
      };

    case 'devonian_375ma':
      return {
        isSnowball: false,
        desertBelt: true,
        iceCaps: false,
        continents: [
          // Euramerica (Old Red Sandstone continent)
          { lat: -5, lon: -30, rx: 32, ry: 22, rot: 0.15, weight: 1.2 },
          // Siberia
          { lat: 40, lon: 60, rx: 25, ry: 18, rot: -0.1, weight: 1.0 },
          // Gondwana in southern hemisphere
          { lat: -45, lon: 15, rx: 55, ry: 32, rot: 0.2, weight: 1.4 },
          // Kazakhstania / China blocks
          { lat: 15, lon: 55, rx: 15, ry: 12, rot: 0, weight: 0.9 }
        ]
      };

    case 'silurian_430ma':
      return {
        isSnowball: false,
        desertBelt: false,
        iceCaps: false,
        continents: [
          // Laurentia, Baltica, Avalonia
          { lat: -15, lon: -45, rx: 25, ry: 18, rot: 0.2, weight: 1.1 },
          { lat: -10, lon: -15, rx: 18, ry: 15, rot: 0.1, weight: 1.0 },
          // Siberia
          { lat: 30, lon: 70, rx: 24, ry: 16, rot: 0, weight: 1.0 },
          // Gondwana vast southern mass
          { lat: -50, lon: 20, rx: 60, ry: 32, rot: 0.15, weight: 1.4 }
        ]
      };

    case 'ordovician_470ma':
      return {
        isSnowball: false,
        desertBelt: false,
        southPolarGlaciers: true,
        continents: [
          // Laurentia at equator
          { lat: -5, lon: -60, rx: 24, ry: 18, rot: 0.3, weight: 1.1 },
          // Baltica & Siberia
          { lat: -25, lon: -20, rx: 20, ry: 16, rot: 0.1, weight: 1.0 },
          { lat: 20, lon: 65, rx: 22, ry: 16, rot: 0, weight: 1.0 },
          // Gondwana covering South Pole
          { lat: -55, lon: 10, rx: 65, ry: 35, rot: 0.1, weight: 1.5 }
        ]
      };

    case 'cambrian_540ma':
      return {
        isSnowball: false,
        desertBelt: true,
        iceCaps: false,
        shallowTropicalSeas: true,
        continents: [
          // Laurentia
          { lat: -10, lon: -70, rx: 22, ry: 18, rot: 0.3, weight: 1.1 },
          // Baltica & Siberia
          { lat: -35, lon: -25, rx: 18, ry: 15, rot: 0, weight: 1.0 },
          { lat: 10, lon: 50, rx: 22, ry: 16, rot: -0.2, weight: 1.0 },
          // Gondwana stretched along equator and south
          { lat: -20, lon: 25, rx: 55, ry: 30, rot: 0.2, weight: 1.4 }
        ]
      };

    case 'ediacaran_600ma':
      return {
        isSnowball: false,
        desertBelt: true,
        iceCaps: false,
        alienMicrobial: true,
        continents: [
          // Pannotia amalgamation
          { lat: -30, lon: 0, rx: 50, ry: 32, rot: 0.1, weight: 1.3 },
          { lat: -55, lon: 35, rx: 42, ry: 25, rot: 0.2, weight: 1.3 },
          { lat: 10, lon: -40, rx: 28, ry: 18, rot: -0.1, weight: 1.0 },
          { lat: 25, lon: 30, rx: 22, ry: 16, rot: 0.1, weight: 0.9 }
        ]
      };

    case 'cryogenian_750ma':
    default:
      return {
        isSnowball: true, // "Snowball Earth"
        iceCaps: true,
        continents: [
          // Rodinia supercontinent breakup in low latitudes
          { lat: -15, lon: -10, rx: 55, ry: 30, rot: 0.15, weight: 1.4 },
          { lat: 10, lon: 25, rx: 40, ry: 22, rot: -0.1, weight: 1.2 }
        ]
      };
  }
}

/**
 * Creates an HTML5 Canvas with the rendered paleogeographic map
 */
export function generatePaleoMapCanvas(periodId, width = 2048, height = 1024) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  const config = getPeriodLandmasses(periodId);
  const noise = new SimpleNoise(periodId.length * 1337 + 42);

  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  // Render pixel by pixel in equirectangular projection
  for (let py = 0; py < height; py++) {
    // Latitude: +90 at py=0 to -90 at py=height-1
    const lat = 90 - (py / height) * 180;
    const latRad = (lat * Math.PI) / 180;
    const cosLat = Math.cos(latRad);

    for (let px = 0; px < width; px++) {
      // Longitude: -180 at px=0 to +180 at px=width-1
      const lon = (px / width) * 360 - 180;

      // Base ocean depth (0 = deep ocean, 1 = surface / coast)
      let landElevation = -0.35;

      // Add noise field (continents and islands)
      const nx = (px / width) * 6;
      const ny = (py / height) * 3;
      const nVal = noise.fbm(nx, ny, 5);

      // Check distance to configured continental ellipsoids
      for (const c of config.continents) {
        // Difference in degrees
        let dLon = lon - c.lon;
        if (dLon > 180) dLon -= 360;
        if (dLon < -180) dLon += 360;
        const dLat = lat - c.lat;

        // Apply rotation
        const cosR = Math.cos(c.rot);
        const sinR = Math.sin(c.rot);
        const rxVal = (dLon * cosR - dLat * sinR) / c.rx;
        const ryVal = (dLon * sinR + dLat * cosR) / c.ry;

        const distSq = rxVal * rxVal + ryVal * ryVal;
        if (distSq < 2.5) {
          const falloff = Math.exp(-distSq * 1.3) * c.weight;
          landElevation += falloff * 0.85;
        }
      }

      // Add fine-grain fractal noise
      landElevation += nVal * 0.45;

      // Polar ice cap modification
      const absLat = Math.abs(lat);
      let isIce = false;
      if (config.isSnowball) {
        isIce = true;
      } else if (config.iceCaps && absLat > 72) {
        isIce = true;
      } else if (config.southPolarGlaciers && lat < -65) {
        isIce = true;
      }

      // Color computation
      let r, g, b;

      if (config.isSnowball) {
        // Snowball Earth: Glacial ice sheets, blue crevasses, white frost
        const iceTone = 220 + Math.floor(nVal * 35);
        r = Math.min(255, iceTone - 10);
        g = Math.min(255, iceTone + 5);
        b = Math.min(255, iceTone + 25);
        // Add subtle cracks / oceanic ridges
        if (landElevation > 0.1 && landElevation < 0.25) {
          r -= 30;
          g -= 15;
          b += 10;
        }
      } else if (landElevation < 0) {
        // Ocean
        const depth = Math.min(1, Math.max(0, -landElevation / 0.5));
        if (depth > 0.4) {
          // Deep abyssal ocean (deep indigo-navy)
          r = Math.floor(10 + (1 - depth) * 15);
          g = Math.floor(25 + (1 - depth) * 35);
          b = Math.floor(65 + (1 - depth) * 75);
        } else {
          // Shallow continental shelf / warm coastal reef waters (vibrant cyan-turquoise)
          const shelfFactor = 1 - depth / 0.4;
          r = Math.floor(15 + shelfFactor * 35);
          g = Math.floor(65 + shelfFactor * 105);
          b = Math.floor(130 + shelfFactor * 65);
        }

        // Coastal surf / bright turquoise fringe
        if (landElevation > -0.05) {
          r = Math.min(255, r + 25);
          g = Math.min(255, g + 40);
          b = Math.min(255, b + 30);
        }

        // Polar sea ice
        if (isIce) {
          r = Math.floor(r * 0.3 + 190);
          g = Math.floor(g * 0.3 + 215);
          b = Math.floor(b * 0.3 + 240);
        }
      } else {
        // Land
        const elev = Math.min(1, landElevation);

        if (isIce) {
          // Polar glacier cap on land
          r = 240;
          g = 245;
          b = 255;
        } else if (config.aridInterior && (absLat > 12 && absLat < 38 || elev > 0.45)) {
          // Triassic / Permian arid supercontinent interior: Ochre, rusty red, sandstone
          r = Math.floor(175 + elev * 45 + nVal * 20);
          g = Math.floor(105 + elev * 20 + nVal * 15);
          b = Math.floor(65 + elev * 10);
        } else if (config.equatorialSwamp && absLat < 20) {
          // Carboniferous equatorial coal swamp: Deep dark emerald rainforest
          r = Math.floor(25 + elev * 30 + nVal * 10);
          g = Math.floor(75 + elev * 45 + nVal * 20);
          b = Math.floor(35 + elev * 15);
        } else if (config.warmGreenhouse) {
          // Eocene / Cretaceous lush greenhouse: Verdant tropical / temperate green everywhere
          r = Math.floor(45 + elev * 65 + nVal * 20);
          g = Math.floor(115 + elev * 50 + nVal * 25);
          b = Math.floor(40 + elev * 30);
        } else if (config.alienMicrobial) {
          // Precambrian / Ediacaran land: Rocky ochre deserts, cyan microbial coastal crusts
          r = Math.floor(145 + elev * 40 + nVal * 25);
          g = Math.floor(110 + elev * 30 + nVal * 15);
          b = Math.floor(80 + elev * 15);
        } else {
          // Standard / Modern climate zones
          if (absLat < 15) {
            // Equatorial rainforest
            r = Math.floor(35 + elev * 45);
            g = Math.floor(95 + elev * 55);
            b = Math.floor(30 + elev * 20);
          } else if (absLat >= 15 && absLat < 35 && config.desertBelt) {
            // Subtropical desert (Sahara, Kalahari, etc.)
            r = Math.floor(190 + elev * 35 + nVal * 20);
            g = Math.floor(160 + elev * 25 + nVal * 15);
            b = Math.floor(105 + elev * 15);
          } else if (absLat >= 35 && absLat < 60) {
            // Temperate forests and grasslands
            r = Math.floor(65 + elev * 60 + nVal * 20);
            g = Math.floor(120 + elev * 40 + nVal * 20);
            b = Math.floor(50 + elev * 25);
          } else {
            // Subpolar tundra & taiga
            r = Math.floor(95 + elev * 40);
            g = Math.floor(105 + elev * 35);
            b = Math.floor(75 + elev * 30);
          }
        }

        // Mountain elevation shading (rock peaks)
        if (elev > 0.55 && !isIce) {
          const mountainBlend = (elev - 0.55) / 0.45;
          r = Math.floor(r * (1 - mountainBlend) + 160 * mountainBlend);
          g = Math.floor(g * (1 - mountainBlend) + 150 * mountainBlend);
          b = Math.floor(b * (1 - mountainBlend) + 140 * mountainBlend);
          if (elev > 0.8) {
            // Snow capped mountain peaks
            r = Math.min(255, r + 70);
            g = Math.min(255, g + 70);
            b = Math.min(255, b + 80);
          }
        }
      }

      const idx = (py * width + px) * 4;
      data[idx] = r;
      data[idx + 1] = g;
      data[idx + 2] = b;
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);

  // Soft atmospheric rim blur / vignette enhancement
  return canvas;
}
