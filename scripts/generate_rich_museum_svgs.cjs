const fs = require('fs');
const path = require('path');

const speciesSVGs = [
  // 1. KIMBERELLA
  {
    file: 'kimberella.svg',
    id: 'kimberella',
    eraHeader: 'NEOPROTEROZOICO • EDIACÁRICO • 555 MA',
    accentColor: '#ec4899',
    title: 'Bilaterio Móvil con Rádula Primitiva',
    scientific: 'Kimberella quadrata',
    stats: 'Longitud: 15 cm | Moluscoide basal | Rastros fósiles de alimentación (Kimberichnus)',
    humanText: 'Humano (1.8m)',
    svgContent: `
      <!-- Kimberella Body Outline & Scute Texture -->
      <ellipse cx="400" cy="285" rx="140" ry="105" fill="url(#themeGrad_kimberella)" opacity="0.3" stroke="currentColor" stroke-width="4"/>
      <!-- Mantle Rim Fringe -->
      <path d="M 260 285 Q 260 210 400 200 Q 540 210 540 285 Q 540 360 400 370 Q 260 360 260 285 Z" fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="6,4"/>
      <!-- Inner Dorsal Integument with Segmental Bands -->
      <ellipse cx="405" cy="285" rx="105" ry="75" fill="currentColor" opacity="0.45" stroke="currentColor" stroke-width="3"/>
      <path d="M 330 240 L 480 240 M 315 260 L 495 260 M 310 285 L 500 285 M 315 310 L 495 310 M 330 330 L 480 330" stroke="currentColor" stroke-width="2.5" opacity="0.8"/>
      <!-- Axial Crest & Proboscis Extension -->
      <line x1="280" y1="285" x2="520" y2="285" stroke="#ffffff" stroke-width="3.5" opacity="0.7"/>
      <path d="M 260 285 Q 220 280 200 295 Q 185 305 195 315 Q 215 310 240 295" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
      <!-- Radular Scrape Marks on Mat -->
      <g stroke="#ffffff" stroke-width="1.8" opacity="0.6">
        <line x1="170" y1="315" x2="190" y2="330"/><line x1="175" y1="310" x2="195" y2="325"/>
        <line x1="180" y1="305" x2="200" y2="320"/><line x1="185" y1="300" x2="205" y2="315"/>
      </g>
      <!-- Anatomical Annotations -->
      <g font-family="'Space Grotesk', sans-serif" font-size="10" fill="#f8fafc" opacity="0.85">
        <text x="150" y="270">Probóscide con Rádula ➔</text>
        <text x="400" y="175" text-anchor="middle">Caparazón no mineralizado festoneado</text>
        <text x="560" y="310">Banda muscular axial ➔</text>
      </g>
    `
  },

  // 2. HYLONOMUS
  {
    file: 'hylonomus.svg',
    id: 'hylonomus',
    eraHeader: 'PALEOZOICO • CARBONÍFERO TARDÍO • 312 MA',
    accentColor: '#10b981',
    title: 'Primer Reptil Amniota Verdadero del Registro',
    scientific: 'Hylonomus lyelli',
    stats: 'Longitud: 20 cm | Diápsido basal | Huevo amniótico con cáscara protectora',
    humanText: 'Humano (1.8m)',
    svgContent: `
      <!-- Lycopod Hollow Tree Trunk Background Context -->
      <path d="M 120 180 Q 150 350 140 460 L 660 460 Q 650 350 680 180" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="3" stroke-dasharray="8,6"/>
      <!-- Hylonomus Undulating Body & Long Tail -->
      <path d="M 230 280 Q 280 250 350 260 Q 430 270 500 250 Q 560 230 620 220 Q 680 220 700 240 Q 690 260 630 260 Q 540 280 470 290 Q 380 300 310 295 L 230 280 Z" fill="url(#themeGrad_hylonomus)" opacity="0.5" stroke="currentColor" stroke-width="4"/>
      <!-- Reptilian Skull -->
      <path d="M 230 280 L 170 265 Q 150 275 165 290 L 230 295 Z" fill="currentColor" opacity="0.8" stroke="currentColor" stroke-width="3.5"/>
      <circle cx="185" cy="275" r="5" fill="#020408" stroke="#ffffff" stroke-width="1.5"/>
      <!-- Splayed Limbs with 5 Agile Digits -->
      <!-- Front Left Limb -->
      <path d="M 270 285 L 240 330 L 210 345 M 210 345 L 200 340 M 210 345 L 202 350 M 210 345 L 207 355 M 210 345 L 215 357 M 210 345 L 222 355" stroke="currentColor" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <!-- Front Right Limb -->
      <path d="M 310 265 L 320 230 L 305 210 M 305 210 L 295 205 M 305 210 L 298 200 M 305 210 L 305 198" stroke="currentColor" stroke-width="3" fill="none" opacity="0.7"/>
      <!-- Hind Left Limb -->
      <path d="M 450 285 L 430 340 L 400 360 M 400 360 L 388 355 M 400 360 L 390 365 M 400 360 L 396 372 M 400 360 L 405 374 M 400 360 L 414 370" stroke="currentColor" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <!-- Hind Right Limb -->
      <path d="M 480 265 L 500 230 L 530 215" stroke="currentColor" stroke-width="3" fill="none" opacity="0.7"/>
      <!-- Scaly Dorsal Ridges -->
      <path d="M 230 278 Q 350 255 490 250 Q 590 230 680 230" stroke="#ffffff" stroke-width="2" stroke-dasharray="4,4" opacity="0.6"/>
      <!-- Callouts -->
      <g font-family="'Space Grotesk', sans-serif" font-size="10" fill="#f8fafc" opacity="0.85">
        <text x="140" y="240">Cráneo Anápsido Agudo ➔</text>
        <text x="350" y="380">Patas pentadáctilas ágiles ➔</text>
        <text x="580" y="195">Cola alargada estabilizadora</text>
      </g>
    `
  },

  // 3. HALLUCIGENIA
  {
    file: 'hallucigenia.svg',
    id: 'hallucigenia',
    eraHeader: 'PALEOZOICO • CÁMBRICO MEDIO • 508 MA',
    accentColor: '#a855f7',
    title: 'Lobópodo Acorazado con Espinas Dorsales',
    scientific: 'Hallucigenia sparsa',
    stats: 'Longitud: 5 cm | 7 pares de espinas dorsales rígidas | 7 pares de patas lobópodas',
    humanText: 'Humano (1.8m)',
    svgContent: `
      <!-- Elongated Tubular Body with Soft Curvature -->
      <path d="M 180 300 Q 230 270 330 275 Q 460 280 560 305 Q 600 320 620 330 Q 600 340 550 325 Q 450 305 330 300 Q 230 295 180 320 Z" fill="url(#themeGrad_hallucigenia)" opacity="0.5" stroke="currentColor" stroke-width="3.5"/>
      <!-- Anterior Head with Eyes & Feeding Tentacles -->
      <circle cx="170" cy="310" r="14" fill="currentColor" opacity="0.8"/>
      <circle cx="166" cy="307" r="3.5" fill="#ffffff"/>
      <path d="M 160 315 Q 140 330 135 345 M 165 320 Q 150 338 148 355 M 172 322 Q 165 345 165 365" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <!-- 7 Pairs of Rigid Conical Dorsal Spines -->
      <g stroke="#ffffff" stroke-width="3.5" fill="currentColor" stroke-linecap="round">
        <line x1="250" y1="275" x2="270" y2="150"/>
        <line x1="300" y1="275" x2="325" y2="145"/>
        <line x1="350" y1="277" x2="380" y2="145"/>
        <line x1="400" y1="280" x2="435" y2="150"/>
        <line x1="450" y1="285" x2="490" y2="160"/>
        <line x1="500" y1="295" x2="540" y2="175"/>
        <line x1="545" y1="305" x2="585" y2="195"/>
      </g>
      <!-- 7 Pairs of Walking Lobopod Stilt Legs -->
      <g stroke="currentColor" stroke-width="4.5" fill="none" stroke-linecap="round">
        <path d="M 260 298 L 235 410 L 225 415"/>
        <path d="M 310 299 L 285 410 L 275 415"/>
        <path d="M 360 300 L 335 410 L 325 415"/>
        <path d="M 410 303 L 385 410 L 375 415"/>
        <path d="M 460 308 L 435 410 L 425 415"/>
        <path d="M 510 315 L 485 410 L 475 415"/>
        <path d="M 555 322 L 530 410 L 520 415"/>
      </g>
      <!-- Claws on Feet -->
      <g fill="#ffffff">
        <circle cx="225" cy="415" r="2.5"/><circle cx="275" cy="415" r="2.5"/><circle cx="325" cy="415" r="2.5"/>
        <circle cx="375" cy="415" r="2.5"/><circle cx="425" cy="415" r="2.5"/><circle cx="475" cy="415" r="2.5"/><circle cx="520" cy="415" r="2.5"/>
      </g>
      <!-- Callouts -->
      <g font-family="'Space Grotesk', sans-serif" font-size="10" fill="#f8fafc" opacity="0.85">
        <text x="360" y="130" text-anchor="middle">7 Pares de Espinas Dorsales Mineralizadas Defensivas</text>
        <text x="120" y="380">Tentáculos bucales ➔</text>
        <text x="360" y="445" text-anchor="middle">Patas tubulares (lobópodos) con garras terminales</text>
      </g>
    `
  },

  // 4. ISOTELUS REX
  {
    file: 'isotelus.svg',
    id: 'isotelus',
    eraHeader: 'PALEOZOICO • ORDOVÍCICO SUPERIOR • 448 MA',
    accentColor: '#06b6d4',
    title: 'El Mayor Trilobite del Registro Fósil',
    scientific: 'Isotelus rex',
    stats: 'Longitud: 72 cm | Artrópodo gigante de aguas frías | Depredador/carroñero bentónico',
    humanText: 'Humano (1.8m)',
    svgContent: `
      <!-- Complete Trilobite Carapace: Cephalon, Thorax, Pygidium -->
      <!-- Outer Marginal Border -->
      <path d="M 400 135 C 490 135 550 170 560 230 C 565 270 550 320 540 370 C 520 440 450 465 400 465 C 350 465 280 440 260 370 C 250 320 235 270 240 230 C 250 170 310 135 400 135 Z" fill="url(#themeGrad_isotelus)" opacity="0.4" stroke="currentColor" stroke-width="4.5"/>
      <!-- Cephalon (Headshield) -->
      <path d="M 240 230 C 250 160 320 140 400 140 C 480 140 550 160 560 230 C 540 245 460 250 400 250 C 340 250 260 245 240 230 Z" fill="currentColor" opacity="0.6" stroke="currentColor" stroke-width="3.5"/>
      <!-- Elevated Crescentic Eyes -->
      <ellipse cx="330" cy="205" rx="14" ry="24" fill="#020408" stroke="#ffffff" stroke-width="2.5" transform="rotate(-15 330 205)"/>
      <ellipse cx="470" cy="205" rx="14" ry="24" fill="#020408" stroke="#ffffff" stroke-width="2.5" transform="rotate(15 470 205)"/>
      <!-- Glabella -->
      <path d="M 370 245 C 370 170 430 170 430 245 Z" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <!-- 8 Thoracic Articulated Segments -->
      <g stroke="currentColor" stroke-width="2.5" opacity="0.85">
        <line x1="252" y1="265" x2="548" y2="265"/>
        <line x1="255" y1="280" x2="545" y2="280"/>
        <line x1="258" y1="295" x2="542" y2="295"/>
        <line x1="260" y1="310" x2="540" y2="310"/>
        <line x1="262" y1="325" x2="538" y2="325"/>
        <line x1="265" y1="340" x2="535" y2="340"/>
        <line x1="268" y1="355" x2="532" y2="355"/>
        <line x1="270" y1="370" x2="530" y2="370"/>
      </g>
      <!-- Trilobite Axial Lobe Longitudinal Furrows -->
      <line x1="365" y1="250" x2="365" y2="440" stroke="#ffffff" stroke-width="2.5" opacity="0.7"/>
      <line x1="435" y1="250" x2="435" y2="440" stroke="#ffffff" stroke-width="2.5" opacity="0.7"/>
      <!-- Pygidium (Tailshield) -->
      <path d="M 270 375 C 290 440 350 460 400 460 C 450 460 510 440 530 375 Z" fill="currentColor" opacity="0.5" stroke="currentColor" stroke-width="3"/>
      <!-- Callouts -->
      <g font-family="'Space Grotesk', sans-serif" font-size="10" fill="#f8fafc" opacity="0.85">
        <text x="220" y="195">Ojos holocroales elevados ➔</text>
        <text x="400" y="315" text-anchor="middle">Tórax de 8 segmentos articulados</text>
        <text x="560" y="420">Pigidio parabólico ➔</text>
      </g>
    `
  },

  // 5. SHONISAURUS
  {
    file: 'shonisaurus.svg',
    id: 'shonisaurus',
    eraHeader: 'MESOZOICO • TRIÁSICO TARDÍO • 215 MA',
    accentColor: '#38bdf8',
    title: 'Ictiosaurio Oceánico Gigante del Triásico',
    scientific: 'Shonisaurus popularis',
    stats: 'Longitud: 15 m | Peso: 30 t | Cuatro aletas hidroala de igual tamaño | Sin aleta dorsal alta',
    humanText: 'Humano (1.8m)',
    svgContent: `
      <!-- Colossal Streamlined Hydrodynamic Body -->
      <path d="M 130 290 Q 220 230 360 210 Q 520 210 640 270 Q 700 290 730 260 L 715 295 L 740 335 Q 670 320 590 330 Q 420 370 280 340 Q 180 320 130 290 Z" fill="url(#themeGrad_shonisaurus)" opacity="0.45" stroke="currentColor" stroke-width="4.5"/>
      <!-- Deep Barrel Chest Cavity Rib Impression -->
      <path d="M 330 230 Q 380 340 430 230 M 360 225 Q 410 345 460 225 M 390 220 Q 440 350 490 220" stroke="currentColor" stroke-width="2" fill="none" opacity="0.5"/>
      <!-- Toothless Beak & Huge Eye with Sclerotic Ring -->
      <polygon points="130,290 190,270 200,305" fill="currentColor" opacity="0.8"/>
      <circle cx="215" cy="275" r="16" fill="#020408" stroke="#ffffff" stroke-width="3"/>
      <circle cx="215" cy="275" r="6" fill="#ffffff"/>
      <!-- Equal-Sized Hydrofoil Flippers -->
      <!-- Anterior Left Flipper -->
      <path d="M 300 320 Q 310 430 350 460 Q 370 450 360 390 Q 350 340 340 320 Z" fill="currentColor" opacity="0.75" stroke="currentColor" stroke-width="3.5"/>
      <!-- Posterior Left Flipper -->
      <path d="M 520 315 Q 530 420 570 450 Q 585 440 575 385 Q 565 335 555 315 Z" fill="currentColor" opacity="0.75" stroke="currentColor" stroke-width="3.5"/>
      <!-- Right Flippers (in background) -->
      <path d="M 280 260 L 310 180 L 330 230" stroke="currentColor" stroke-width="3" fill="currentColor" opacity="0.4"/>
      <path d="M 500 255 L 530 185 L 545 235" stroke="currentColor" stroke-width="3" fill="currentColor" opacity="0.4"/>
      <!-- Heterocercal Tail Fin with Deflected Spine -->
      <path d="M 680 290 Q 720 285 750 250 L 730 295 L 755 345 Q 715 320 680 300" stroke="#ffffff" stroke-width="3.5" fill="none"/>
      <!-- Callouts -->
      <g font-family="'Space Grotesk', sans-serif" font-size="10" fill="#f8fafc" opacity="0.85">
        <text x="140" y="240">Anillo esclerótico gigante ➔</text>
        <text x="350" y="480" text-anchor="middle">Aletas hidroala simétricas de 2.5 m</text>
        <text x="630" y="235">Cola con aleta caudal lúnula ➔</text>
      </g>
    `
  },

  // 6. THYLACOSMILUS
  {
    file: 'thylacosmilus.svg',
    id: 'thylacosmilus',
    eraHeader: 'CENOZOICO • MIOCENO / PLIOCENO • 7 MA',
    accentColor: '#f97316',
    title: 'Dientes de Sable Marsupial Sudamericano',
    scientific: 'Thylacosmilus atrox',
    stats: 'Longitud: 1.5 m | Peso: 100 kg | Colmillos caninos de crecimiento perpetuo con vaina ósea',
    humanText: 'Humano (1.8m)',
    svgContent: `
      <!-- Muscular Stocky Body Outline -->
      <path d="M 230 250 Q 300 220 420 230 Q 520 245 560 280 L 545 420 L 520 420 L 525 315 L 435 315 L 415 420 L 390 420 L 400 305 Q 300 310 240 270 Z" fill="url(#themeGrad_thylacosmilus)" opacity="0.45" stroke="currentColor" stroke-width="4.5"/>
      <!-- Head with Downward Mandibular Flange Sheath -->
      <path d="M 230 250 L 160 240 Q 140 260 160 280 L 195 285 L 185 365 L 210 365 L 215 295 L 245 285 Z" fill="currentColor" opacity="0.75" stroke="currentColor" stroke-width="3.5"/>
      <!-- Massive Saber Canine (White) -->
      <path d="M 175 275 Q 175 350 195 355 L 190 350 Q 185 310 185 275 Z" fill="#ffffff" stroke="#ffffff" stroke-width="2"/>
      <circle cx="190" cy="255" r="6" fill="#020408" stroke="#ffffff" stroke-width="1.5"/>
      <!-- Plantigrade Paws and Claws -->
      <g fill="#ffffff">
        <circle cx="395" cy="420" r="3"/><circle cx="405" cy="420" r="3"/><circle cx="415" cy="420" r="3"/>
        <circle cx="525" cy="420" r="3"/><circle cx="535" cy="420" r="3"/><circle cx="545" cy="420" r="3"/>
      </g>
      <!-- Marsupial Tail & Shoulder Hump -->
      <path d="M 560 280 Q 610 320 635 365" stroke="currentColor" stroke-width="4.5" fill="none" stroke-linecap="round"/>
      <path d="M 280 235 Q 310 215 340 225" stroke="#ffffff" stroke-width="3" fill="none" opacity="0.7"/>
      <!-- Callouts -->
      <g font-family="'Space Grotesk', sans-serif" font-size="10" fill="#f8fafc" opacity="0.85">
        <text x="90" y="360">Vaina ósea mandibular ➔</text>
        <text x="120" y="225">Caninos en sable perpetuos ➔</text>
        <text x="350" y="205" text-anchor="middle">Robusta musculatura cervical depresora</text>
      </g>
    `
  },

  // 7. ARGENTAVIS
  {
    file: 'argentavis.svg',
    id: 'argentavis',
    eraHeader: 'CENOZOICO • MIOCENO SUPERIOR • 6 MA',
    accentColor: '#f97316',
    title: 'El Ave Voladora Más Gigantesca de la Historia',
    scientific: 'Argentavis magnificens',
    stats: 'Envergadura: 7.2 m | Peso: 72 kg | Teratornítido planeador térmico de los Andes y Pampas',
    humanText: 'Humano (1.8m)',
    svgContent: `
      <!-- Colossal Wingspan Extended in Flight Silhouette -->
      <!-- Left Wing with Primary/Secondary Feathers -->
      <path d="M 400 270 Q 320 220 210 200 Q 110 180 80 190 Q 95 240 140 270 Q 210 310 320 310 L 400 290 Z" fill="url(#themeGrad_argentavis)" opacity="0.5" stroke="currentColor" stroke-width="3.5"/>
      <!-- Right Wing -->
      <path d="M 400 270 Q 480 220 590 200 Q 690 180 720 190 Q 705 240 660 270 Q 590 310 480 310 L 400 290 Z" fill="url(#themeGrad_argentavis)" opacity="0.5" stroke="currentColor" stroke-width="3.5"/>
      <!-- Feather Flight Finger Separations -->
      <g stroke="currentColor" stroke-width="2.5" opacity="0.7">
        <line x1="80" y1="190" x2="105" y2="225"/><line x1="90" y1="205" x2="120" y2="240"/><line x1="105" y1="220" x2="135" y2="255"/>
        <line x1="720" y1="190" x2="695" y2="225"/><line x1="710" y1="205" x2="680" y2="240"/><line x1="695" y1="220" x2="665" y2="255"/>
      </g>
      <!-- Central Body, Hooked Raptor Beak, Tail Fan -->
      <ellipse cx="400" cy="285" rx="35" ry="55" fill="currentColor" opacity="0.8"/>
      <!-- Hooked Beak Head -->
      <path d="M 400 240 L 385 200 Q 395 185 410 190 L 415 200 Q 410 220 405 240 Z" fill="currentColor" stroke="currentColor" stroke-width="3"/>
      <path d="M 395 185 Q 380 190 375 205" stroke="#ffffff" stroke-width="3" fill="none" stroke-linecap="round"/>
      <!-- Fan-Shaped Tail -->
      <polygon points="400,340 360,400 440,400" fill="currentColor" opacity="0.7" stroke="currentColor" stroke-width="3"/>
      <!-- Callouts -->
      <g font-family="'Space Grotesk', sans-serif" font-size="10" fill="#f8fafc" opacity="0.85">
        <text x="400" y="165" text-anchor="middle">Envergadura alar colosal de 7.2 metros</text>
        <text x="140" y="170">Plumas remeras primarias ➔</text>
        <text x="400" y="425" text-anchor="middle">Cola en abanico estabilizadora de vuelo térmico</text>
      </g>
    `
  },

  // 8. AUSTRALOPITHECUS
  {
    file: 'australopithecus.svg',
    id: 'australopithecus',
    eraHeader: 'CENOZOICO • PLIOCENO • 3.7 MA',
    accentColor: '#eab308',
    title: 'Hominino Bípedo Clave del Valle del Rift',
    scientific: 'Australopithecus afarensis',
    stats: 'Altura: 1.1 – 1.5 m | Peso: 30 – 45 kg | Bipedestación obligada habitual con capacidad arbórea',
    humanText: 'Humano (1.8m)',
    svgContent: `
      <!-- Walking Upright Bipedal Stance Skeleton/Silhouette -->
      <!-- Cranium with Prognathism & Brow Ridge -->
      <ellipse cx="380" cy="180" rx="22" ry="24" fill="currentColor" opacity="0.8" stroke="currentColor" stroke-width="3"/>
      <path d="M 365 185 L 345 200 L 360 210 L 380 205" fill="currentColor" stroke="currentColor" stroke-width="2.5"/>
      <circle cx="365" cy="182" r="4.5" fill="#020408"/>
      <!-- Spine (Curved Lordosis) -->
      <path d="M 385 205 Q 395 240 385 270 Q 375 295 385 315" stroke="currentColor" stroke-width="6" fill="none"/>
      <!-- Broad Basin-like Pelvis -->
      <path d="M 365 315 Q 385 305 405 315 L 395 335 L 375 335 Z" fill="currentColor" opacity="0.85" stroke="currentColor" stroke-width="3"/>
      <!-- Right Striding Leg (Bicondylar Femur Angle) -->
      <path d="M 375 330 L 360 390 L 345 450 L 330 455" stroke="currentColor" stroke-width="5" fill="none" stroke-linecap="round"/>
      <!-- Left Trailing Leg -->
      <path d="M 395 330 L 415 385 L 435 440 L 450 445" stroke="currentColor" stroke-width="5" fill="none" stroke-linecap="round"/>
      <!-- Long Arms with Curved Phalanges -->
      <path d="M 390 220 L 415 270 L 425 330" stroke="currentColor" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M 370 220 L 345 265 L 340 320" stroke="currentColor" stroke-width="4" fill="none" stroke-linecap="round"/>
      <!-- Callouts -->
      <g font-family="'Space Grotesk', sans-serif" font-size="10" fill="#f8fafc" opacity="0.85">
        <text x="310" y="170">Prognatismo y cresta sagital ➔</text>
        <text x="430" y="315">Pelvis ensanchada tipo cuenco (bipedismo) ➔</text>
        <text x="240" y="440">Huellas de Laetoli (arco plantar) ➔</text>
      </g>
    `
  },

  // 9. HOMO NEANDERTHALENSIS
  {
    file: 'homo_neanderthalensis.svg',
    id: 'homo_neanderthalensis',
    eraHeader: 'CENOZOICO • PLEISTOCENO • 0.4 – 0.04 MA',
    accentColor: '#eab308',
    title: 'Humano Arcaico Adaptado a la Glaciación',
    scientific: 'Homo neanderthalensis',
    stats: 'Capacidad craneal: 1500 cc | Tórax en barril hiper-robusto | Cultura lítica musteriense y entierros',
    humanText: 'Homo sapiens (1.8m)',
    svgContent: `
      <!-- Robust Muscular Stance with Fur Cloak & Spear -->
      <!-- Broad Cranium, Prominent Brow Ridge, Occipital Bun -->
      <ellipse cx="380" cy="170" rx="26" ry="25" fill="currentColor" opacity="0.85" stroke="currentColor" stroke-width="3"/>
      <!-- Double Brow Ridge (Torus Supraorbitalis) -->
      <path d="M 350 165 Q 365 155 380 165 Q 395 155 410 165" stroke="#ffffff" stroke-width="4" fill="none"/>
      <!-- Large Nose & Receding Chin -->
      <path d="M 355 168 L 340 185 L 355 195 L 370 200" stroke="currentColor" stroke-width="3.5" fill="none"/>
      <circle cx="362" cy="172" r="4.5" fill="#020408"/>
      <!-- Massive Barrel Chest & Shoulders -->
      <path d="M 330 215 Q 380 205 430 215 L 445 320 Q 380 335 315 320 Z" fill="url(#themeGrad_homo_neanderthalensis)" opacity="0.55" stroke="currentColor" stroke-width="4"/>
      <!-- Robust Strong Limbs -->
      <path d="M 340 320 L 335 390 L 330 450" stroke="currentColor" stroke-width="7" fill="none" stroke-linecap="round"/>
      <path d="M 420 320 L 425 390 L 430 450" stroke="currentColor" stroke-width="7" fill="none" stroke-linecap="round"/>
      <!-- Fur Pelt Covering -->
      <path d="M 320 220 Q 300 280 315 340 L 445 340 Q 460 280 440 220 Z" fill="none" stroke="currentColor" stroke-width="2.5" stroke-dasharray="6,4"/>
      <!-- Mousterian Spear in Hand -->
      <line x1="280" y1="120" x2="295" y2="455" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>
      <polygon points="280,120 272,145 288,145" fill="#ffffff"/>
      <!-- Left Arm Gripping Spear -->
      <path d="M 330 220 L 290 270 L 285 260" stroke="currentColor" stroke-width="6" fill="none" stroke-linecap="round"/>
      <!-- Callouts -->
      <g font-family="'Space Grotesk', sans-serif" font-size="10" fill="#f8fafc" opacity="0.85">
        <text x="210" y="150">Lanza con punta musteriense ➔</text>
        <text x="420" y="155">Toro supraorbital continuo ➔</text>
        <text x="455" y="270">Tórax en barril hipertrofiado ➔</text>
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

speciesSVGs.forEach(spec => {
  const destPath = path.join('public', 'assets', 'species', spec.file);
  fs.writeFileSync(destPath, generateSVG(spec), 'utf8');
  console.log(`Generated high-detail scientific SVG for: ${spec.file}`);
});
console.log('All detailed scientific SVGs generated successfully!');
