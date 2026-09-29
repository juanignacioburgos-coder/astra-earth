const fs = require('fs');
const path = require('path');

const plates = [
  // 1. RANGEA
  {
    file: 'rangea.svg',
    id: 'rangea',
    eraHeader: 'NEOPROTEROZOICO • EDIACÁRICO • 548 MA',
    accentColor: '#ec4899',
    title: 'Organismo Frondomorfo Repetitivo Sésil',
    scientific: 'Rangea schneiderhoehni',
    stats: 'Altura: 15 cm | Frondomorfo auto-ensamblado de 6 alas | Vainas rellenas de sedimento',
    humanText: 'Humano (1.8m)',
    svgContent: `
      <!-- Central Rachis Stalk -->
      <line x1="400" y1="140" x2="400" y2="440" stroke="#ffffff" stroke-width="6" stroke-linecap="round"/>
      <ellipse cx="400" cy="445" rx="55" ry="16" fill="currentColor" opacity="0.6"/>
      <!-- 6-Winged Self-Assembled Petaloid Vanes -->
      <g stroke="currentColor" stroke-width="3" fill="url(#themeGrad_rangea)" opacity="0.7">
        <path d="M 400 170 C 480 160 520 220 400 240 Z"/>
        <path d="M 400 170 C 320 160 280 220 400 240 Z"/>
        <path d="M 400 220 C 500 210 540 280 400 300 Z"/>
        <path d="M 400 220 C 300 210 260 280 400 300 Z"/>
        <path d="M 400 280 C 510 270 550 350 400 370 Z"/>
        <path d="M 400 280 C 290 270 250 350 400 370 Z"/>
        <path d="M 400 350 C 490 340 520 410 400 425 Z"/>
        <path d="M 400 350 C 310 340 280 410 400 425 Z"/>
      </g>
      <!-- Quilting Striations -->
      <g stroke="#ffffff" stroke-width="1.8" opacity="0.6">
        <line x1="400" y1="200" x2="480" y2="210"/><line x1="400" y1="200" x2="320" y2="210"/>
        <line x1="400" y1="260" x2="495" y2="270"/><line x1="400" y1="260" x2="305" y2="270"/>
        <line x1="400" y1="325" x2="500" y2="335"/><line x1="400" y1="325" x2="300" y2="335"/>
      </g>
      <!-- Callouts -->
      <g font-family="'Space Grotesk', sans-serif" font-size="10" fill="#f8fafc" opacity="0.85">
        <text x="400" y="125" text-anchor="middle">Raquis central esquelético</text>
        <text x="535" y="270">Alas acolchadas (quilted vanes) ➔</text>
        <text x="260" y="450">Bulbo de anclaje sedimentario ➔</text>
      </g>
    `
  },

  // 2. CYCLOMEDUSA
  {
    file: 'cyclomedusa.svg',
    id: 'cyclomedusa',
    eraHeader: 'NEOPROTEROZOICO • EDIACÁRICO • 560 MA',
    accentColor: '#ec4899',
    title: 'Disco Concéntrico de Anclaje Bentónico',
    scientific: 'Cyclomedusa davidi',
    stats: 'Diámetro: 20 cm | Anillos concéntricos múltiples | Base de sujeción para frondas',
    humanText: 'Humano (1.8m)',
    svgContent: `
      <!-- Multiple Concentric Circles & Radiating Spoke Canals -->
      <circle cx="400" cy="285" r="145" fill="url(#themeGrad_cyclomedusa)" opacity="0.15" stroke="currentColor" stroke-width="3"/>
      <circle cx="400" cy="285" r="120" fill="none" stroke="currentColor" stroke-width="3" opacity="0.35"/>
      <circle cx="400" cy="285" r="95" fill="none" stroke="currentColor" stroke-width="3.5" opacity="0.55"/>
      <circle cx="400" cy="285" r="70" fill="none" stroke="currentColor" stroke-width="4" opacity="0.75"/>
      <circle cx="400" cy="285" r="45" fill="none" stroke="currentColor" stroke-width="4.5" opacity="0.9"/>
      <circle cx="400" cy="285" r="20" fill="#ffffff"/>
      <!-- Radiating Fine Septal Lines -->
      <g stroke="#ffffff" stroke-width="1.8" opacity="0.5">
        <line x1="260" y1="285" x2="540" y2="285"/><line x1="400" y1="145" x2="400" y2="425"/>
        <line x1="300" y1="185" x2="500" y2="385"/><line x1="300" y1="385" x2="500" y2="185"/>
      </g>
      <!-- Callouts -->
      <g font-family="'Space Grotesk', sans-serif" font-size="10" fill="#f8fafc" opacity="0.85">
        <text x="400" y="130" text-anchor="middle">Anillos concéntricos de crecimiento</text>
        <text x="545" y="280">Canales radiales ➔</text>
        <text x="400" y="270" text-anchor="middle" fill="#020408" font-weight="700">Bulbo</text>
      </g>
    `
  },

  // 3. HAOOTIA
  {
    file: 'haootia.svg',
    id: 'haootia',
    eraHeader: 'NEOPROTEROZOICO • EDIACÁRICO • 560 MA',
    accentColor: '#ec4899',
    title: 'Primer Tejido Muscular Contráctil Fósil',
    scientific: 'Haootia quadriformis',
    stats: 'Dimensiones: 6 x 6 cm | Simetría cuadrangular con fibras musculares | Cnidario sésil',
    humanText: 'Humano (1.8m)',
    svgContent: `
      <!-- Basal Pedicle Stalk -->
      <path d="M 390 360 L 390 450 L 410 450 L 410 360 Z" fill="currentColor" opacity="0.7"/>
      <ellipse cx="400" cy="450" rx="30" ry="10" fill="currentColor"/>
      <!-- Quadrangular Calyx with 4 Extending Arms -->
      <polygon points="400,200 480,270 400,340 320,270" fill="url(#themeGrad_haootia)" opacity="0.4" stroke="currentColor" stroke-width="4"/>
      <!-- 4 Corner Branches / Tentacles with Feathering -->
      <g stroke="currentColor" stroke-width="4" fill="none" stroke-linecap="round">
        <path d="M 320 270 Q 240 240 210 200"/>
        <path d="M 400 200 Q 400 130 400 100"/>
        <path d="M 480 270 Q 560 240 590 200"/>
      </g>
      <!-- Parallel Contractile Muscle Fiber Bundles (Fossil Evidence) -->
      <g stroke="#ffffff" stroke-width="2.2" opacity="0.8">
        <line x1="350" y1="245" x2="450" y2="245"/>
        <line x1="335" y1="260" x2="465" y2="260"/>
        <line x1="330" y1="275" x2="470" y2="275"/>
        <line x1="340" y1="290" x2="460" y2="290"/>
        <line x1="360" y1="305" x2="440" y2="305"/>
      </g>
      <!-- Callouts -->
      <g font-family="'Space Grotesk', sans-serif" font-size="10" fill="#f8fafc" opacity="0.85">
        <text x="400" y="85" text-anchor="middle">Brazo bifurcado superior</text>
        <text x="480" y="240">Haces de fibras musculares contráctiles ➔</text>
        <text x="240" y="380">Disco de fijación peduncular ➔</text>
      </g>
    `
  },

  // 4. ASPIDELLA
  {
    file: 'aspidella.svg',
    id: 'aspidella',
    eraHeader: 'NEOPROTEROZOICO • EDIACÁRICO • 560 MA',
    accentColor: '#ec4899',
    title: 'Base de Anclaje Discoidal Profunda',
    scientific: 'Aspidella terranovica',
    stats: 'Diámetro: 1 – 10 cm | Estructura en tapón cónico de sedimentación | Anclaje de rangeomorfos',
    humanText: 'Humano (1.8m)',
    svgContent: `
      <!-- Multiple Invaginated Rugose Rings in Sandstone Impression -->
      <ellipse cx="400" cy="285" rx="140" ry="110" fill="url(#themeGrad_aspidella)" opacity="0.25" stroke="currentColor" stroke-width="4"/>
      <ellipse cx="400" cy="285" rx="110" ry="85" fill="none" stroke="currentColor" stroke-width="3" opacity="0.5"/>
      <ellipse cx="400" cy="285" rx="75" ry="55" fill="none" stroke="currentColor" stroke-width="3.5" opacity="0.75"/>
      <!-- Central Slit / Invaginated Stem Plug -->
      <ellipse cx="400" cy="285" rx="35" ry="24" fill="#020408" stroke="#ffffff" stroke-width="3.5"/>
      <line x1="400" y1="270" x2="400" y2="300" stroke="#ffffff" stroke-width="5" stroke-linecap="round"/>
      <!-- Radial Furrows -->
      <g stroke="currentColor" stroke-width="1.8" opacity="0.6">
        <line x1="280" y1="285" x2="360" y2="285"/><line x1="440" y1="285" x2="520" y2="285"/>
        <line x1="400" y1="190" x2="400" y2="255"/><line x1="400" y1="315" x2="400" y2="380"/>
      </g>
      <!-- Callouts -->
      <g font-family="'Space Grotesk', sans-serif" font-size="10" fill="#f8fafc" opacity="0.85">
        <text x="400" y="160" text-anchor="middle">Rugosidades concéntricas de fijación</text>
        <text x="450" y="280">Tapón invaginado central ➔</text>
        <text x="400" y="420" text-anchor="middle">Molde en sedimento de la Formación Fermeuse</text>
      </g>
    `
  },

  // 5. PTERIDINIUM
  {
    file: 'pteridinium.svg',
    id: 'pteridinium',
    eraHeader: 'NEOPROTEROZOICO • EDIACÁRICO • 545 MA',
    accentColor: '#ec4899',
    title: 'Organismo Trirradiado Foliáceo Acolchado',
    scientific: 'Pteridinium simplex',
    stats: 'Longitud: 30 cm | Tres alas o vanas acolchadas interconectadas | Estructura en saco semi-enterrado',
    humanText: 'Humano (1.8m)',
    svgContent: `
      <!-- Elongated Three-Vane Quilted Leaf Shape -->
      <!-- Center Axis Vane -->
      <path d="M 220 285 Q 400 230 580 285 Q 400 340 220 285 Z" fill="url(#themeGrad_pteridinium)" opacity="0.45" stroke="currentColor" stroke-width="4"/>
      <!-- Third Vertical Vane (Projecting upward) -->
      <path d="M 220 285 Q 400 150 580 285" stroke="#ffffff" stroke-width="4.5" fill="none"/>
      <!-- Dense Quilted Tubular Ribs -->
      <g stroke="currentColor" stroke-width="2.5" opacity="0.75">
        <line x1="260" y1="280" x2="270" y2="315"/><line x1="300" y1="270" x2="315" y2="325"/>
        <line x1="340" y1="265" x2="360" y2="330"/><line x1="380" y1="260" x2="400" y2="335"/>
        <line x1="420" y1="260" x2="440" y2="335"/><line x1="460" y1="265" x2="480" y2="330"/>
        <line x1="500" y1="270" x2="515" y2="325"/><line x1="540" y1="280" x2="550" y2="315"/>
      </g>
      <!-- Central Commissure Ridge -->
      <line x1="220" y1="285" x2="580" y2="285" stroke="#ffffff" stroke-width="4"/>
      <!-- Callouts -->
      <g font-family="'Space Grotesk', sans-serif" font-size="10" fill="#f8fafc" opacity="0.85">
        <text x="400" y="135" text-anchor="middle">Tercera ala o vana vertical</text>
        <text x="400" y="275" text-anchor="middle">Comisura axial central</text>
        <text x="400" y="365" text-anchor="middle">Costillas tubulares acolchadas (pneu structure)</text>
      </g>
    `
  },

  // 6. ERNIETTA
  {
    file: 'ernietta.svg',
    id: 'ernietta',
    eraHeader: 'NEOPROTEROZOICO • EDIACÁRICO • 545 MA',
    accentColor: '#ec4899',
    title: 'Cuerpo en Saco Hueco Anclado en Arena',
    scientific: 'Ernietta plateauensis',
    stats: 'Altura: 10 cm | Saco caliciforme hueco con tubos paralelos | Arenas someras de Namibia',
    humanText: 'Humano (1.8m)',
    svgContent: `
      <!-- Sand Bed Substrate Line -->
      <line x1="150" y1="410" x2="650" y2="410" stroke="rgba(255,255,255,0.15)" stroke-width="2" stroke-dasharray="6,4"/>
      <!-- U-Shaped Calice / Sack Body Embedded in Sand -->
      <path d="M 280 200 C 270 380 340 430 400 430 C 460 430 530 380 520 200 Z" fill="url(#themeGrad_ernietta)" opacity="0.4" stroke="currentColor" stroke-width="4.5"/>
      <!-- Parallel Tubular Hollow Ribs (U-shaped) -->
      <g stroke="currentColor" stroke-width="3" fill="none" opacity="0.8">
        <path d="M 310 200 C 305 350 350 400 400 400 C 450 400 495 350 490 200"/>
        <path d="M 340 200 C 335 320 365 370 400 370 C 435 370 465 320 460 200"/>
        <path d="M 370 200 C 365 290 380 330 400 330 C 420 330 435 290 430 200"/>
      </g>
      <!-- Upper Open Collar / Rim -->
      <ellipse cx="400" cy="200" rx="120" ry="25" fill="#020408" stroke="#ffffff" stroke-width="4"/>
      <!-- Callouts -->
      <g font-family="'Space Grotesk', sans-serif" font-size="10" fill="#f8fafc" opacity="0.85">
        <text x="400" y="160" text-anchor="middle">Apertura caliciforme superior</text>
        <text x="535" y="310">Costillas tubulares huecas en U ➔</text>
        <text x="230" y="420">Base semi-enterrada en la arena ➔</text>
      </g>
    `
  },

  // 7. ARKARUA
  {
    file: 'arkarua.svg',
    id: 'arkarua',
    eraHeader: 'NEOPROTEROZOICO • EDIACÁRICO • 555 MA',
    accentColor: '#ec4899',
    title: 'Posible Equinodermo Pentarradial Primitivo',
    scientific: 'Arkarua adami',
    stats: 'Diámetro: 1 cm | Simetría pentarradial de 5 crestas radiales | Ancestro basal de equinodermos',
    humanText: 'Humano (1.8m)',
    svgContent: `
      <!-- Disc Perimeter with Raised Rim -->
      <circle cx="400" cy="285" r="130" fill="url(#themeGrad_arkarua)" opacity="0.3" stroke="currentColor" stroke-width="4.5"/>
      <circle cx="400" cy="285" r="105" fill="none" stroke="currentColor" stroke-width="2.5" stroke-dasharray="6,4" opacity="0.6"/>
      <!-- Five Radiating Ambulacral-Like Grooves (Pentarradial Symmetry) -->
      <!-- 72 degrees each -->
      <g stroke="#ffffff" stroke-width="5" stroke-linecap="round">
        <line x1="400" y1="285" x2="400" y2="170"/>
        <line x1="400" y1="285" x2="510" y2="250"/>
        <line x1="400" y1="285" x2="470" y2="375"/>
        <line x1="400" y1="285" x2="330" y2="375"/>
        <line x1="400" y1="285" x2="290" y2="250"/>
      </g>
      <!-- Central Apical Star Depression -->
      <polygon points="400,265 410,280 425,280 412,290 418,305 400,295 382,305 388,290 375,280 390,280" fill="currentColor" stroke="#ffffff" stroke-width="2"/>
      <!-- Callouts -->
      <g font-family="'Space Grotesk', sans-serif" font-size="10" fill="#f8fafc" opacity="0.85">
        <text x="400" y="150" text-anchor="middle">5 Surcos radiales (simetría pentarradial)</text>
        <text x="400" y="325" text-anchor="middle">Depresión apical central estrellada</text>
        <text x="545" y="360">Margen periférico elevado ➔</text>
      </g>
    `
  },

  // 8. BRADGATIA
  {
    file: 'bradgatia.svg',
    id: 'bradgatia',
    eraHeader: 'NEOPROTEROZOICO • EDIACÁRICO • 565 MA',
    accentColor: '#ec4899',
    title: 'Estructura Arbustiva Colonial Abisal',
    scientific: 'Bradgatia linfordensis',
    stats: 'Diámetro: 25 cm | Complejo frondoso de ramas que irradian de un solo anclaje | Fondo abisal',
    humanText: 'Humano (1.8m)',
    svgContent: `
      <!-- Deep Abyssal Seafloor Holdfast -->
      <ellipse cx="400" cy="440" rx="45" ry="14" fill="currentColor" stroke="#ffffff" stroke-width="3"/>
      <!-- Radiating Bush-Like Fractal Cluster of 10+ Rangeomorph Fronds -->
      <g stroke="currentColor" stroke-width="3" fill="url(#themeGrad_bradgatia)" opacity="0.65">
        <path d="M 400 440 C 350 350 250 300 230 200 C 270 200 320 280 400 440 Z"/>
        <path d="M 400 440 C 370 320 310 240 310 160 C 340 180 370 260 400 440 Z"/>
        <path d="M 400 440 C 390 300 380 200 400 130 C 420 200 410 300 400 440 Z"/>
        <path d="M 400 440 C 430 320 490 240 490 160 C 460 180 430 260 400 440 Z"/>
        <path d="M 400 440 C 450 350 550 300 570 200 C 530 200 480 280 400 440 Z"/>
      </g>
      <!-- Sub-Branch Striations -->
      <g stroke="#ffffff" stroke-width="1.8" opacity="0.65">
        <line x1="250" y1="210" x2="270" y2="235"/><line x1="320" y1="180" x2="335" y2="210"/>
        <line x1="400" y1="150" x2="400" y2="190"/><line x1="480" y1="180" x2="465" y2="210"/>
        <line x1="550" y1="210" x2="530" y2="235"/>
      </g>
      <!-- Callouts -->
      <g font-family="'Space Grotesk', sans-serif" font-size="10" fill="#f8fafc" opacity="0.85">
        <text x="400" y="110" text-anchor="middle">Arbusto colonial frondomorfo tridimensional</text>
        <text x="580" y="240">Frondas ramificadas multifoliadas ➔</text>
        <text x="400" y="465" text-anchor="middle">Punto único de anclaje sedimentario</text>
      </g>
    `
  },

  // 9. THECTARDIS
  {
    file: 'thectardis.svg',
    id: 'thectardis',
    eraHeader: 'NEOPROTEROZOICO • EDIACÁRICO • 565 MA',
    accentColor: '#ec4899',
    title: 'Organismo Triangular Cónico Invertido Sésil',
    scientific: 'Thectardis avalonensis',
    stats: 'Altura: 15 cm | Morfología cónica triangular invertida | Vida bentónica en aguas profundas',
    humanText: 'Humano (1.8m)',
    svgContent: `
      <!-- Inverted Triangular Cone Body -->
      <polygon points="400,430 470,170 330,170" fill="url(#themeGrad_thectardis)" opacity="0.45" stroke="currentColor" stroke-width="4.5"/>
      <!-- Top Open Aperture Collar -->
      <ellipse cx="400" cy="170" rx="70" ry="18" fill="#020408" stroke="#ffffff" stroke-width="3.5"/>
      <!-- Internal Transverse Growth Bars -->
      <g stroke="currentColor" stroke-width="2.5" opacity="0.75">
        <line x1="345" y1="220" x2="455" y2="220"/>
        <line x1="360" y1="270" x2="440" y2="270"/>
        <line x1="375" y1="320" x2="425" y2="320"/>
        <line x1="388" y1="370" x2="412" y2="370"/>
      </g>
      <!-- Basal Pointed Apex Anchor -->
      <circle cx="400" cy="430" r="10" fill="#ffffff"/>
      <!-- Callouts -->
      <g font-family="'Space Grotesk', sans-serif" font-size="10" fill="#f8fafc" opacity="0.85">
        <text x="400" y="140" text-anchor="middle">Apertura elíptica apical superior</text>
        <text x="475" y="270">Paredes triangulares reforzadas ➔</text>
        <text x="400" y="455" text-anchor="middle">Ápice agudo anclado en sustrato turbidítico</text>
      </g>
    `
  },

  // 10. CYANORUS
  {
    file: 'cyanorus.svg',
    id: 'cyanorus',
    eraHeader: 'NEOPROTEROZOICO • EDIACÁRICO • 555 MA',
    accentColor: '#ec4899',
    title: 'Pequeño Bilaterio Móvil con Surco Axial',
    scientific: 'Cyanorus singularis',
    stats: 'Longitud: 9 mm | Bilaterio móvil primitivo | Cresta cefálica y surco medio dorsal',
    humanText: 'Humano (1.8m)',
    svgContent: `
      <!-- Elongated Bilateral Organism with Lateral Lobes -->
      <ellipse cx="400" cy="285" rx="100" ry="145" fill="url(#themeGrad_cyanorus)" opacity="0.35" stroke="currentColor" stroke-width="4.5"/>
      <!-- Anterior Crescentic Cephalic Crest -->
      <path d="M 320 200 Q 400 155 480 200" stroke="#ffffff" stroke-width="7" stroke-linecap="round" fill="none"/>
      <!-- Distinct Longitudinal Axial Groove -->
      <line x1="400" y1="175" x2="400" y2="415" stroke="#ffffff" stroke-width="4.5"/>
      <!-- Paired Lateral Lobes / Metameric Flaps -->
      <g stroke="currentColor" stroke-width="3" opacity="0.75">
        <line x1="320" y1="240" x2="395" y2="240"/><line x1="405" y1="240" x2="480" y2="240"/>
        <line x1="310" y1="285" x2="395" y2="285"/><line x1="405" y1="285" x2="490" y2="285"/>
        <line x1="320" y1="330" x2="395" y2="330"/><line x1="405" y1="330" x2="480" y2="330"/>
        <line x1="335" y1="375" x2="395" y2="375"/><line x1="405" y1="375" x2="465" y2="375"/>
      </g>
      <!-- Callouts -->
      <g font-family="'Space Grotesk', sans-serif" font-size="10" fill="#f8fafc" opacity="0.85">
        <text x="400" y="145" text-anchor="middle">Cresta cefálica anterior arqueada</text>
        <text x="400" y="440" text-anchor="middle">Surco axial medio continuo (simetría bilateral)</text>
        <text x="500" y="285">Lóbulos laterales pares ➔</text>
      </g>
    `
  }
];

function generateSVG(spec) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 560" width="800" height="560">
  <defs>
    <radialGradient id="bgGrad_${spec.id}" cx="50%" cy="46%" r="65%">
      <stop offset="0%" stop-color="#141d2c" stop-opacity="1"/>
      <stop offset="60%" stop-color="#070c14" stop-opacity="1"/>
      <stop offset="100%" stop-color="#020408" stop-opacity="1"/>
    </radialGradient>
    <linearGradient id="themeGrad_${spec.id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${spec.accentColor}" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.6"/>
    </linearGradient>
    <filter id="glow_${spec.id}" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- Deep Cosmic / Museum Canvas Background -->
  <rect width="800" height="560" fill="url(#bgGrad_${spec.id})"/>

  <!-- Technical Stratigraphic Grid -->
  <g stroke="rgba(255, 255, 255, 0.04)" stroke-width="1">
    <line x1="60" y1="80" x2="740" y2="80"/>
    <line x1="60" y1="200" x2="740" y2="200"/>
    <line x1="60" y1="320" x2="740" y2="320"/>
    <line x1="60" y1="440" x2="740" y2="440"/>
    <line x1="160" y1="60" x2="160" y2="480"/>
    <line x1="320" y1="60" x2="320" y2="480"/>
    <line x1="480" y1="60" x2="480" y2="480"/>
    <line x1="640" y1="60" x2="640" y2="480"/>
  </g>

  <!-- Specimen Holographic Frame Header -->
  <rect x="60" y="35" width="680" height="42" rx="8" fill="rgba(255, 255, 255, 0.03)" stroke="${spec.accentColor}" stroke-opacity="0.25"/>
  <circle cx="85" cy="56" r="6" fill="${spec.accentColor}"/>
  <text x="105" y="61" fill="#f8fafc" font-family="'Space Grotesk', 'Outfit', sans-serif" font-weight="700" font-size="14" letter-spacing="1.5">ARCHIVO PALEONTOLÓGICO 3D</text>
  <text x="715" y="61" fill="${spec.accentColor}" font-family="'JetBrains Mono', monospace" font-size="12" text-anchor="end">${spec.eraHeader}</text>

  <!-- Central Specimen Graphic -->
  <g transform="translate(0, 10)" color="${spec.accentColor}" filter="url(#glow_${spec.id})" opacity="0.95">
    ${spec.svgContent}
  </g>

  <!-- Ground Reference Line & Scale Ticks -->
  <line x1="100" y1="475" x2="700" y2="475" stroke="${spec.accentColor}" stroke-opacity="0.4" stroke-width="1.5"/>
  <g stroke="${spec.accentColor}" stroke-opacity="0.5" stroke-width="1.5">
    <line x1="100" y1="470" x2="100" y2="480"/>
    <line x1="250" y1="472" x2="250" y2="478"/>
    <line x1="400" y1="470" x2="400" y2="480"/>
    <line x1="550" y1="472" x2="550" y2="478"/>
    <line x1="700" y1="470" x2="700" y2="480"/>
  </g>

  <!-- Human Scale Silhouette (comparison indicator) -->
  <g transform="translate(680, 415)" fill="rgba(255, 255, 255, 0.28)">
    <circle cx="10" cy="8" r="6"/>
    <rect x="7" y="16" width="6" height="24" rx="2"/>
    <line x1="4" y1="22" x2="16" y2="22" stroke="rgba(255, 255, 255, 0.28)" stroke-width="3"/>
    <line x1="8" y1="40" x2="5" y2="58" stroke="rgba(255, 255, 255, 0.28)" stroke-width="3"/>
    <line x1="12" y1="40" x2="15" y2="58" stroke="rgba(255, 255, 255, 0.28)" stroke-width="3"/>
    <text x="10" y="70" fill="rgba(255, 255, 255, 0.45)" font-family="sans-serif" font-size="9" text-anchor="middle">${spec.humanText}</text>
  </g>

  <!-- Species Nomenclature & Biometrics Footer -->
  <rect x="60" y="495" width="680" height="45" rx="8" fill="rgba(10, 16, 26, 0.85)" stroke="rgba(255, 255, 255, 0.08)"/>
  <text x="80" y="522" fill="#ffffff" font-family="'Space Grotesk', sans-serif" font-size="16" font-weight="700">${spec.title}</text>
  <text x="80" y="534" fill="#94a3b8" font-family="'Outfit', sans-serif" font-style="italic" font-size="11">${spec.scientific}</text>
  <text x="720" y="523" fill="${spec.accentColor}" font-family="'JetBrains Mono', monospace" font-size="11" text-anchor="end">${spec.stats}</text>
</svg>`;
}

plates.forEach(spec => {
  const destPath = path.join('public', 'assets', 'species', spec.file);
  fs.writeFileSync(destPath, generateSVG(spec), 'utf8');
  console.log(`Generated authentic plate for: ${spec.file}`);
});
console.log('All remaining Ediacaran plates generated successfully!');
