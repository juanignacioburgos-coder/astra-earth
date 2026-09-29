const fs = require('fs');
const path = require('path');

const plates = [
  // 1. SMILODON POPULATOR (ACCURATE: TAWNY / NO TIGER STRIPES)
  {
    file: 'smilodon.svg',
    id: 'smilodon',
    eraHeader: 'CENOZOICO • PLEISTOCENO • 1.0 – 0.01 MA',
    accentColor: '#eab308',
    title: 'Smilodon populator (Félido Dientes de Sable)',
    scientific: 'Smilodon populator (Lund, 1842)',
    stats: 'Masa: hasta 400 kg | Pelaje leonado uniforme estepario (sin rayas de tigre) | Caninos: 28 cm',
    humanText: 'Humano (1.8m)',
    svgContent: `
      <defs>
        <linearGradient id="smilodonCoat" x1="0%" y1="0%" x2="100%" y2="80%">
          <stop offset="0%" stop-color="#e8bf7a"/>
          <stop offset="50%" stop-color="#c59247"/>
          <stop offset="100%" stop-color="#8c5d21"/>
        </linearGradient>
        <radialGradient id="smilodonMuscles" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#f5d699" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#7a4e16" stop-opacity="0.9"/>
        </radialGradient>
      </defs>

      <!-- Habitat Grassland Subtle Ground Silhouette -->
      <path d="M 60 455 Q 240 445 420 450 Q 600 455 740 445 L 740 475 L 60 475 Z" fill="rgba(255,255,255,0.03)"/>

      <!-- Smilodon Body: Robust Sloping Machairodont Anatomy (NO TIGER STRIPES) -->
      <!-- Massive Hypertrophied Shoulder Girdle & Forequarters -->
      <path d="M 230 255 Q 260 215 320 215 Q 380 215 420 240 Q 480 270 540 280 Q 560 285 570 300 L 565 345 Q 560 365 575 375 L 560 380 Q 545 355 540 330 L 490 330 L 480 435 L 450 435 L 455 330 Q 420 330 390 315 L 375 435 L 345 435 L 355 310 Q 300 310 245 285 Z" fill="url(#smilodonCoat)" stroke="currentColor" stroke-width="4.5"/>
      
      <!-- Shoulder Muscle Tone Highlights (Shading, NOT Stripes!) -->
      <path d="M 320 220 Q 360 240 350 290 Q 320 300 305 270 Z" fill="url(#smilodonMuscles)" opacity="0.35"/>
      <path d="M 420 250 Q 450 270 440 310 Q 410 315 400 285 Z" fill="url(#smilodonMuscles)" opacity="0.25"/>

      <!-- Short Bobbed Tail (Distinct from long tiger tail) -->
      <path d="M 570 300 Q 600 320 605 340 Q 595 345 585 335 Q 575 325 565 315" stroke="currentColor" stroke-width="5" fill="none" stroke-linecap="round"/>

      <!-- Hind Limbs & Paws with Retractile Claws -->
      <g fill="#ffffff">
        <circle cx="350" cy="435" r="3.5"/><circle cx="360" cy="435" r="3.5"/><circle cx="370" cy="435" r="3.5"/>
        <circle cx="455" cy="435" r="3.5"/><circle cx="465" cy="435" r="3.5"/><circle cx="475" cy="435" r="3.5"/>
      </g>

      <!-- Head with Enormous Upper Saber Canines -->
      <path d="M 230 255 L 165 245 Q 140 265 155 285 L 195 295 L 200 315 L 225 310 L 220 295 L 245 285 Z" fill="url(#smilodonCoat)" stroke="currentColor" stroke-width="3.5"/>
      
      <!-- Iconic Curved Saber Canine (White) -->
      <path d="M 175 275 Q 170 335 185 350 Q 185 320 185 275 Z" fill="#ffffff" stroke="#ffffff" stroke-width="2"/>
      
      <!-- Muscular Neck & Chin -->
      <circle cx="180" cy="260" r="5" fill="#020408" stroke="#ffffff" stroke-width="1.5"/>
      <ellipse cx="230" cy="235" rx="8" ry="12" fill="currentColor" opacity="0.8"/>

      <!-- Scientific Anatomical Annotations -->
      <g font-family="'Space Grotesk', sans-serif" font-size="10" fill="#f8fafc" opacity="0.9">
        <text x="70" y="350">Caninos aserrados de 28 cm ➔</text>
        <text x="320" y="195" text-anchor="middle">Pelaje leonado liso estepario (sin rayas de tigre)</text>
        <text x="390" y="180" text-anchor="middle" font-size="9" fill="#eab308">Adaptación al bioma abierto de las Pampas sudamericanas</text>
        <text x="615" y="325">Cola corta vestigial ➔</text>
        <text x="440" y="455" text-anchor="middle">Tren delantero hipertrofiado para inmovilizar presas</text>
      </g>
    `
  },

  // 2. TRIBRACHIDIUM (EDIACARAN)
  {
    file: 'tribrachidium.svg',
    id: 'tribrachidium',
    eraHeader: 'NEOPROTEROZOICO • EDIACÁRICO • 555 MA',
    accentColor: '#ec4899',
    title: 'Disco Bentónico con Simetría Trirradial Única',
    scientific: 'Tribrachidium heraldicum',
    stats: 'Diámetro: 5 cm | Simetría trirradial de 3 brazos espirales | Filtrador sésil',
    humanText: 'Humano (1.8m)',
    svgContent: `
      <!-- Outer Disc Rim with Ciliary Micro-Ridges -->
      <circle cx="400" cy="285" r="135" fill="url(#themeGrad_tribrachidium)" opacity="0.25" stroke="currentColor" stroke-width="4"/>
      <circle cx="400" cy="285" r="120" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="4,4" opacity="0.6"/>
      <!-- Three Spiral Arms Meeting at Apex -->
      <!-- Arm 1 (0 to 120 deg) -->
      <path d="M 400 285 Q 430 200 500 190 Q 545 220 505 260 Q 450 280 400 285" fill="currentColor" opacity="0.75" stroke="#ffffff" stroke-width="3"/>
      <!-- Arm 2 (120 to 240 deg) -->
      <path d="M 400 285 Q 330 330 300 395 Q 330 435 385 410 Q 410 360 400 285" fill="currentColor" opacity="0.75" stroke="#ffffff" stroke-width="3"/>
      <!-- Arm 3 (240 to 360 deg) -->
      <path d="M 400 285 Q 420 355 365 415 Q 305 390 325 330 Q 360 295 400 285" fill="currentColor" opacity="0.75" stroke="#ffffff" stroke-width="3"/>
      <!-- Central Apical Y-Junction Depression -->
      <circle cx="400" cy="285" r="16" fill="#020408" stroke="#ffffff" stroke-width="3"/>
      <!-- Surface Ridges radiating out -->
      <g stroke="currentColor" stroke-width="1.8" opacity="0.5">
        <line x1="400" y1="150" x2="400" y2="175"/><line x1="515" y1="285" x2="490" y2="285"/>
        <line x1="300" y1="230" x2="320" y2="245"/><line x1="470" y1="365" x2="450" y2="350"/>
      </g>
      <!-- Callouts -->
      <g font-family="'Space Grotesk', sans-serif" font-size="10" fill="#f8fafc" opacity="0.85">
        <text x="525" y="180">Brazo espiral hidrodinámico ➔</text>
        <text x="400" y="270" text-anchor="middle">Depresión apical trifolia</text>
        <text x="210" y="380">Margen ciliado de filtración ➔</text>
      </g>
    `
  },

  // 3. FRACTOFUSUS (EDIACARAN)
  {
    file: 'fractofusus.svg',
    id: 'fractofusus',
    eraHeader: 'NEOPROTEROZOICO • EDIACÁRICO • 565 MA',
    accentColor: '#ec4899',
    title: 'Fronda Fractal Modular Bentónica',
    scientific: 'Fractofusus misrai',
    stats: 'Longitud: 22 cm | Crecimiento fractal auto-similar | Osmotrofia abisal',
    humanText: 'Humano (1.8m)',
    svgContent: `
      <!-- Elongated Spindle Body Outline -->
      <path d="M 400 140 C 470 230 490 320 400 450 C 310 320 330 230 400 140 Z" fill="url(#themeGrad_fractofusus)" opacity="0.3" stroke="currentColor" stroke-width="4"/>
      <!-- Central Rachis / Spindle -->
      <line x1="400" y1="140" x2="400" y2="450" stroke="#ffffff" stroke-width="5" stroke-linecap="round"/>
      <!-- Fractal Self-Similar Modular Vanes -->
      <g stroke="currentColor" stroke-width="3" fill="currentColor" opacity="0.65">
        <!-- Vane 1 -->
        <path d="M 400 180 Q 445 195 460 215 Q 430 225 400 215 Z"/>
        <path d="M 400 180 Q 355 195 340 215 Q 370 225 400 215 Z"/>
        <!-- Vane 2 -->
        <path d="M 400 230 Q 465 245 480 270 Q 440 280 400 270 Z"/>
        <path d="M 400 230 Q 335 245 320 270 Q 360 280 400 270 Z"/>
        <!-- Vane 3 -->
        <path d="M 400 285 Q 475 300 490 325 Q 445 335 400 325 Z"/>
        <path d="M 400 285 Q 325 300 310 325 Q 355 335 400 325 Z"/>
        <!-- Vane 4 -->
        <path d="M 400 340 Q 465 355 475 380 Q 435 390 400 380 Z"/>
        <path d="M 400 340 Q 335 355 325 380 Q 365 390 400 380 Z"/>
        <!-- Vane 5 -->
        <path d="M 400 395 Q 440 405 450 425 Q 425 430 400 425 Z"/>
        <path d="M 400 395 Q 360 405 350 425 Q 375 430 400 425 Z"/>
      </g>
      <!-- Micro Fractal Sub-branches -->
      <g stroke="#ffffff" stroke-width="1.5" opacity="0.6">
        <line x1="420" y1="200" x2="445" y2="205"/><line x1="380" y1="200" x2="355" y2="205"/>
        <line x1="430" y1="250" x2="465" y2="260"/><line x1="370" y1="250" x2="335" y2="260"/>
        <line x1="435" y1="305" x2="470" y2="315"/><line x1="365" y1="305" x2="330" y2="315"/>
      </g>
      <!-- Callouts -->
      <g font-family="'Space Grotesk', sans-serif" font-size="10" fill="#f8fafc" opacity="0.85">
        <text x="400" y="125" text-anchor="middle">Ápice del huso colonial</text>
        <text x="510" y="270">Módulos fractales de 3er orden ➔</text>
        <text x="210" y="360">Superficie de absorción osmótica ➔</text>
      </g>
    `
  },

  // 4. YORGIA (EDIACARAN)
  {
    file: 'yorgia.svg',
    id: 'yorgia',
    eraHeader: 'NEOPROTEROZOICO • EDIACÁRICO • 555 MA',
    accentColor: '#ec4899',
    title: 'Disco Deslizante con Simetría Alterna',
    scientific: 'Yorgia moveri',
    stats: 'Diámetro: 16 cm | Segmentación alterna por deslizamiento | Rastros fósiles de alimentación',
    humanText: 'Humano (1.8m)',
    svgContent: `
      <!-- Trace Impression (Ghost Feeding Imprint behind) -->
      <ellipse cx="280" cy="300" rx="90" ry="120" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="6,6" opacity="0.3"/>
      <!-- Main Specimen Oval Disc -->
      <ellipse cx="440" cy="285" rx="125" ry="155" fill="url(#themeGrad_yorgia)" opacity="0.35" stroke="currentColor" stroke-width="4"/>
      <!-- Axial Dividing Line with Glide Reflection Offset -->
      <line x1="440" y1="135" x2="440" y2="435" stroke="#ffffff" stroke-width="4.5"/>
      <!-- Asymmetrical / Alternating Isomer Segments -->
      <g stroke="currentColor" stroke-width="3" fill="currentColor" opacity="0.75">
        <!-- Right side segments -->
        <path d="M 440 160 Q 520 170 550 190 L 440 195 Z"/>
        <path d="M 440 210 Q 540 220 560 240 L 440 245 Z"/>
        <path d="M 440 260 Q 545 270 565 290 L 440 295 Z"/>
        <path d="M 440 310 Q 540 320 555 340 L 440 345 Z"/>
        <path d="M 440 360 Q 520 370 535 390 L 440 395 Z"/>
        <!-- Left side offset segments (Glide symmetry) -->
        <path d="M 440 185 Q 360 195 330 215 L 440 220 Z"/>
        <path d="M 440 235 Q 340 245 320 265 L 440 270 Z"/>
        <path d="M 440 285 Q 335 295 315 315 L 440 320 Z"/>
        <path d="M 440 335 Q 340 345 325 365 L 440 370 Z"/>
        <path d="M 440 385 Q 360 395 345 415 L 440 420 Z"/>
      </g>
      <!-- Undifferentiated Anterior Plate -->
      <ellipse cx="440" cy="155" rx="35" ry="18" fill="#ffffff" opacity="0.85"/>
      <!-- Callouts -->
      <g font-family="'Space Grotesk', sans-serif" font-size="10" fill="#f8fafc" opacity="0.85">
        <text x="180" y="270">Huella de alimentación previa ➔</text>
        <text x="440" y="120" text-anchor="middle">Zona anterior no segmentada</text>
        <text x="580" y="280">Isómeros en reflexión deslizante ➔</text>
      </g>
    `
  },

  // 5. CLOUDINA (EDIACARAN)
  {
    file: 'cloudina.svg',
    id: 'cloudina',
    eraHeader: 'NEOPROTEROZOICO • EDIACÁRICO FINAL • 548 MA',
    accentColor: '#ec4899',
    title: 'Primer Metazoo con Concha Calcificada Tubular',
    scientific: 'Cloudina hartmannae',
    stats: 'Longitud: 5 – 15 cm | Tubos cónicos concéntricos calcíticos | Evidencia más antigua de depredación',
    humanText: 'Humano (1.8m)',
    svgContent: `
      <!-- Multiple Nested Calcified Funnel Cones (Micro-Structure) -->
      <g stroke="currentColor" stroke-width="3.5" fill="url(#themeGrad_cloudina)" opacity="0.7">
        <!-- Basal Cone -->
        <path d="M 330 440 L 370 360 L 430 360 L 470 440 Z"/>
        <!-- Cone 2 -->
        <path d="M 345 370 L 378 300 L 422 300 L 455 370 Z"/>
        <!-- Cone 3 -->
        <path d="M 358 310 L 385 240 L 415 240 L 442 310 Z"/>
        <!-- Cone 4 -->
        <path d="M 368 250 L 390 180 L 410 180 L 432 250 Z"/>
        <!-- Cone 5 (Aperture) -->
        <path d="M 378 190 L 395 130 L 405 130 L 422 190 Z"/>
      </g>
      <!-- Concentric Tube Growth Ribs -->
      <g stroke="#ffffff" stroke-width="2" opacity="0.8">
        <ellipse cx="400" cy="440" rx="70" ry="12" fill="none"/>
        <ellipse cx="400" cy="360" rx="55" ry="10" fill="none"/>
        <ellipse cx="400" cy="300" rx="42" ry="8" fill="none"/>
        <ellipse cx="400" cy="240" rx="30" ry="6" fill="none"/>
        <ellipse cx="400" cy="180" rx="20" ry="4" fill="none"/>
        <ellipse cx="400" cy="130" rx="10" ry="3" fill="#ffffff"/>
      </g>
      <!-- Predatory Borehole Fossil Evidence -->
      <circle cx="420" cy="325" r="7" fill="#020408" stroke="#ef4444" stroke-width="2.5"/>
      <!-- Callouts -->
      <g font-family="'Space Grotesk', sans-serif" font-size="10" fill="#f8fafc" opacity="0.85">
        <text x="400" y="110" text-anchor="middle">Apertura del tubo biocalcificado</text>
        <text x="450" y="325">Orificio circular de perforación depredadora ➔</text>
        <text x="230" y="420">Conos cónicos anidados imbricados ➔</text>
      </g>
    `
  },

  // 6. NAMACALATHUS (EDIACARAN)
  {
    file: 'namacalathus.svg',
    id: 'namacalathus',
    eraHeader: 'NEOPROTEROZOICO • EDIACÁRICO • 549 MA',
    accentColor: '#ec4899',
    title: 'Copa Esquelética Calcárea Perforada',
    scientific: 'Namacalathus hermanastes',
    stats: 'Altura: 3 – 8 cm | Cáliz globular perforado sobre tallo hueco | Constructor de arrecifes primigenios',
    humanText: 'Humano (1.8m)',
    svgContent: `
      <!-- Hollow Basal Stalk -->
      <path d="M 385 290 L 385 450 L 415 450 L 415 290 Z" fill="currentColor" opacity="0.6" stroke="currentColor" stroke-width="4"/>
      <ellipse cx="400" cy="450" rx="35" ry="12" fill="currentColor" stroke="currentColor" stroke-width="3"/>
      <!-- Globular Perforated Foliate Cup (Calice) -->
      <circle cx="400" cy="225" r="95" fill="url(#themeGrad_namacalathus)" opacity="0.45" stroke="currentColor" stroke-width="4.5"/>
      <!-- Central Large Apical Incurved Aperture -->
      <ellipse cx="400" cy="150" rx="45" ry="22" fill="#020408" stroke="#ffffff" stroke-width="3.5"/>
      <!-- Lateral Symmetrical Perforations (Fenestrae) -->
      <g fill="#020408" stroke="currentColor" stroke-width="3">
        <ellipse cx="340" cy="215" rx="20" ry="28" transform="rotate(-15 340 215)"/>
        <ellipse cx="460" cy="215" rx="20" ry="28" transform="rotate(15 460 215)"/>
        <circle cx="400" cy="255" r="24"/>
      </g>
      <!-- Rim Fluting / Curves -->
      <path d="M 320 160 Q 400 190 480 160" stroke="#ffffff" stroke-width="3" fill="none"/>
      <!-- Callouts -->
      <g font-family="'Space Grotesk', sans-serif" font-size="10" fill="#f8fafc" opacity="0.85">
        <text x="400" y="125" text-anchor="middle">Apertura apical crateriforme</text>
        <text x="210" y="215">Ventanas (fenestras) laterales ➔</text>
        <text x="475" y="380">Tallo cilíndrico hueco flexible ➔</text>
      </g>
    `
  },

  // 7. PARVANCORINA (EDIACARAN)
  {
    file: 'parvancorina.svg',
    id: 'parvancorina',
    eraHeader: 'NEOPROTEROZOICO • EDIACÁRICO • 555 MA',
    accentColor: '#ec4899',
    title: 'Escudo Cefálico en Ancla (Artrópodo Basal)',
    scientific: 'Parvancorina minchami',
    stats: 'Longitud: 3 cm | Cresta central en forma de ancla | Hidrodinámica orientada a corrientes',
    humanText: 'Humano (1.8m)',
    svgContent: `
      <!-- Shield / Carapace Elliptical Body -->
      <ellipse cx="400" cy="285" rx="125" ry="155" fill="url(#themeGrad_parvancorina)" opacity="0.35" stroke="currentColor" stroke-width="4.5"/>
      <!-- Distinct Anchor-Shaped Central Ridge Complex (The "Anchor") -->
      <!-- Anterior Curved Anchor Bow -->
      <path d="M 310 215 Q 400 165 490 215" stroke="#ffffff" stroke-width="14" stroke-linecap="round" fill="none"/>
      <path d="M 310 215 Q 400 165 490 215" stroke="currentColor" stroke-width="8" stroke-linecap="round" fill="none"/>
      <!-- Median Longitudinal Central Stem / Keel -->
      <line x1="400" y1="185" x2="400" y2="405" stroke="#ffffff" stroke-width="12" stroke-linecap="round"/>
      <line x1="400" y1="185" x2="400" y2="405" stroke="currentColor" stroke-width="7" stroke-linecap="round"/>
      <!-- Basal Swelling & Apex Button -->
      <circle cx="400" cy="185" r="14" fill="#ffffff"/>
      <ellipse cx="400" cy="410" rx="22" ry="12" fill="#ffffff"/>
      <!-- Fine Lateral Transverse Fine Growth Striations -->
      <g stroke="currentColor" stroke-width="1.8" opacity="0.5">
        <line x1="330" y1="260" x2="390" y2="260"/><line x1="410" y1="260" x2="470" y2="260"/>
        <line x1="320" y1="300" x2="390" y2="300"/><line x1="410" y1="300" x2="480" y2="300"/>
        <line x1="325" y1="340" x2="390" y2="340"/><line x1="410" y1="340" x2="475" y2="340"/>
        <line x1="340" y1="380" x2="390" y2="380"/><line x1="410" y1="380" x2="460" y2="380"/>
      </g>
      <!-- Callouts -->
      <g font-family="'Space Grotesk', sans-serif" font-size="10" fill="#f8fafc" opacity="0.85">
        <text x="400" y="145" text-anchor="middle">Arco anterior de flujo hidrodinámico</text>
        <text x="490" y="300">Quilla central axial ➔</text>
        <text x="210" y="320">Surcos branquiales pares ➔</text>
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

// Update Smilodon in fauna.json to use smilodon.svg
function updateSmilodon(jsonPath) {
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  const sm = data.find(x => x.id === 'smilodon-populator');
  if (sm) {
    sm.media = {
      imageUrl: 'assets/species/smilodon.svg',
      imageAuthor: 'Lámina Científica Anatómica Astra Earth (Sin rayas de tigre)',
      imageLicense: 'CC-BY 4.0'
    };
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Updated Smilodon media in ${jsonPath}`);
  }
}

updateSmilodon('public/data/fauna.json');
updateSmilodon('src/data/fauna.json');
console.log('All updates completed successfully!');
