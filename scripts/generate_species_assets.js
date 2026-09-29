import fs from 'fs';
import path from 'path';

const SPECIES_CONFIGS = [
  // Cenozoic - Quaternary / Neogene / Paleogene
  {
    id: 'mammuthus',
    name: 'Mammuthus primigenius',
    common: 'Mamut Lanudo',
    era: 'Cenozoico',
    period: 'Pleistoceno • 0.3 - 0.01 Ma',
    theme: '#38bdf8',
    iconType: 'mammoth',
    metrics: 'Longitud: 4.0 m | Masa: 6.0 t | Herbívoro'
  },
  {
    id: 'homo_sapiens',
    name: 'Homo sapiens',
    common: 'Humano Anatómicamente Moderno',
    era: 'Cenozoico',
    period: 'Holoceno • 0.3 Ma - Presente',
    theme: '#38bdf8',
    iconType: 'human',
    metrics: 'Estatura: 1.75 m | Masa: 75 kg | Omnívoro'
  },
  {
    id: 'megatherium',
    name: 'Megatherium americanum',
    common: 'Perezoso Terrestre Gigante',
    era: 'Cenozoico',
    period: 'Pleistoceno • 2.5 - 0.01 Ma',
    theme: '#38bdf8',
    iconType: 'ground_sloth',
    metrics: 'Longitud: 6.0 m | Masa: 4.0 t | Herbívoro'
  },
  {
    id: 'thylacoleo',
    name: 'Thylacoleo carnifex',
    common: 'León Marsupial Australiano',
    era: 'Cenozoico',
    period: 'Pleistoceno • 1.6 - 0.04 Ma',
    theme: '#38bdf8',
    iconType: 'carnivore_quad',
    metrics: 'Longitud: 1.5 m | Masa: 130 kg | Carnívoro'
  },
  {
    id: 'paraceratherium',
    name: 'Paraceratherium transouralicum',
    common: 'Indricoterio (Rinoceronte Colosal)',
    era: 'Cenozoico',
    period: 'Oligoceno • 34 - 23 Ma',
    theme: '#10b981',
    iconType: 'mega_mammal',
    metrics: 'Longitud: 7.4 m | Altura hombro: 4.8 m | Masa: 15-20 t'
  },
  {
    id: 'argentavis',
    name: 'Argentavis magnificens',
    common: 'Teratornítido Gigante de las Pampas',
    era: 'Cenozoico',
    period: 'Mioceno Tardío • 6 Ma',
    theme: '#10b981',
    iconType: 'giant_bird',
    metrics: 'Envergadura: 7.0 m | Masa: 70 kg | Carnívoro / Carroñero'
  },
  {
    id: 'purussaurus',
    name: 'Purussaurus brasiliensis',
    common: 'Caimán Gigante del Proto-Amazonas',
    era: 'Cenozoico',
    period: 'Mioceno Tardío • 8 Ma',
    theme: '#10b981',
    iconType: 'giant_croc',
    metrics: 'Longitud: 11.5 m | Masa: 6.2 t | Carnívoro'
  },
  {
    id: 'basilosaurus',
    name: 'Basilosaurus cetoides',
    common: 'Ballena Arcaica Alargada',
    era: 'Cenozoico',
    period: 'Eoceno Tardío • 40 - 34 Ma',
    theme: '#06b6d4',
    iconType: 'primitive_whale',
    metrics: 'Longitud: 18.0 m | Masa: 14 t | Piscívoro / Carnívoro'
  },
  {
    id: 'ambulocetus',
    name: 'Ambulocetus natans',
    common: 'La Ballena que Podía Caminar',
    era: 'Cenozoico',
    period: 'Eoceno Temprano • 48 Ma',
    theme: '#06b6d4',
    iconType: 'walking_whale',
    metrics: 'Longitud: 3.0 m | Masa: 220 kg | Anfibio / Carnívoro'
  },
  {
    id: 'gastornis',
    name: 'Gastornis gigantea',
    common: 'Ave Colosal de Pico Robusto',
    era: 'Cenozoico',
    period: 'Eoceno Temprano • 56 - 45 Ma',
    theme: '#06b6d4',
    iconType: 'giant_bird',
    metrics: 'Altura: 2.1 m | Masa: 160 kg | Herbívoro / Frugívoro'
  },
  {
    id: 'titanoboa',
    name: 'Titanoboa cerrejonensis',
    common: 'Serpiente Gigante del Cerrejón',
    era: 'Cenozoico',
    period: 'Paleoceno • 60 - 58 Ma',
    theme: '#06b6d4',
    iconType: 'giant_snake',
    metrics: 'Longitud: 13.0 m | Masa: 1.1 t | Piscívoro / Carnívoro'
  },

  // Mesozoic - Cretaceous
  {
    id: 'triceratops',
    name: 'Triceratops horridus',
    common: 'Dinosaurio Acorazado de Tres Cuernos',
    era: 'Mesozoico',
    period: 'Cretácico Tardío • 68 - 66 Ma',
    theme: '#f59e0b',
    iconType: 'ceratopsian',
    metrics: 'Longitud: 8.5 m | Masa: 8.0 t | Herbívoro'
  },
  {
    id: 'quetzalcoatlus',
    name: 'Quetzalcoatlus northropi',
    common: 'Pterosaurio Colosal del Cielo',
    era: 'Mesozoico',
    period: 'Cretácico Tardío • 68 - 66 Ma',
    theme: '#f59e0b',
    iconType: 'giant_pterosaur',
    metrics: 'Envergadura: 10.5 m | Altura jirafa: 5.0 m | Masa: 220 kg'
  },
  {
    id: 'ankylosaurus',
    name: 'Ankylosaurus magniventris',
    common: 'Tanque Viviente con Maza Caudal',
    era: 'Mesozoico',
    period: 'Cretácico Tardío • 68 - 66 Ma',
    theme: '#f59e0b',
    iconType: 'ankylosaur',
    metrics: 'Longitud: 7.5 m | Masa: 6.0 t | Herbívoro Acorazado'
  },
  {
    id: 'mosasaurus',
    name: 'Mosasaurus hoffmannii',
    common: 'Superdepredador Marino Cretácico',
    era: 'Mesozoico',
    period: 'Cretácico Tardío • 70 - 66 Ma',
    theme: '#f59e0b',
    iconType: 'mosasaur',
    metrics: 'Longitud: 14.0 m | Masa: 15 t | Carnívoro Ápice Marino'
  },
  {
    id: 'carcharodontosaurus',
    name: 'Carcharodontosaurus saharicus',
    common: 'Reptil con Dientes de Gran Tiburón',
    era: 'Mesozoico',
    period: 'Cretácico Medio • 100 - 94 Ma',
    theme: '#f97316',
    iconType: 'theropod_mega',
    metrics: 'Longitud: 12.5 m | Masa: 7.5 t | Carnívoro Terrestre'
  },
  {
    id: 'argentinosaurus',
    name: 'Argentinosaurus huinculensis',
    common: 'Titanosaurio Gigante Patagónico',
    era: 'Mesozoico',
    period: 'Cretácico Medio • 96 - 92 Ma',
    theme: '#f97316',
    iconType: 'sauropod_mega',
    metrics: 'Longitud: 35.0 m | Masa: 75-85 t | El animal terrestre más masivo'
  },
  {
    id: 'sarcosuchus',
    name: 'Sarcosuchus imperator',
    common: 'SuperCroc del Sahara Cretácico',
    era: 'Mesozoico',
    period: 'Cretácico Medio • 112 Ma',
    theme: '#f97316',
    iconType: 'giant_croc',
    metrics: 'Longitud: 9.5 m | Masa: 3.5 t | Carnívoro de Ribera'
  },

  // Mesozoic - Jurassic
  {
    id: 'allosaurus',
    name: 'Allosaurus fragilis',
    common: 'Depredador Ápice de la Formación Morrison',
    era: 'Mesozoico',
    period: 'Jurásico Tardío • 155 - 145 Ma',
    theme: '#fbbf24',
    iconType: 'theropod_large',
    metrics: 'Longitud: 9.0 m | Masa: 2.2 t | Carnívoro Terrestre'
  },
  {
    id: 'stegosaurus',
    name: 'Stegosaurus stenops',
    common: 'Dinosaurio de Placas Dorsales y Púas',
    era: 'Mesozoico',
    period: 'Jurásico Tardío • 155 - 150 Ma',
    theme: '#fbbf24',
    iconType: 'stegosaur',
    metrics: 'Longitud: 9.0 m | Masa: 5.0 t | Herbívoro Cuadrúpedo'
  },
  {
    id: 'archaeopteryx',
    name: 'Archaeopteryx lithographica',
    common: 'Eslabón Fósil entre Dinosaurios y Aves',
    era: 'Mesozoico',
    period: 'Jurásico Tardío • 150 Ma',
    theme: '#fbbf24',
    iconType: 'proto_bird',
    metrics: 'Longitud: 0.5 m | Envergadura: 0.6 m | Carnívoro / Insectívoro'
  },
  {
    id: 'diplodocus',
    name: 'Diplodocus carnegii',
    common: 'Saurópodo Colosal de Cola en Látigo',
    era: 'Mesozoico',
    period: 'Jurásico Tardío • 154 - 152 Ma',
    theme: '#fbbf24',
    iconType: 'sauropod_mega',
    metrics: 'Longitud: 26.0 m | Masa: 15.0 t | Herbívoro de Cuello Largo'
  },

  // Mesozoic - Triassic
  {
    id: 'coelophysis',
    name: 'Coelophysis bauri',
    common: 'Dinosaurio Terópodo Grácil Primitivo',
    era: 'Mesozoico',
    period: 'Triásico Tardío • 216 - 196 Ma',
    theme: '#eab308',
    iconType: 'theropod_small',
    metrics: 'Longitud: 2.8 m | Masa: 25 kg | Carnívoro Veloz'
  },
  {
    id: 'postosuchus',
    name: 'Postosuchus kirkpatricki',
    common: 'Pseudosuquio Superdepredador Terrestre',
    era: 'Mesozoico',
    period: 'Triásico Tardío • 220 - 205 Ma',
    theme: '#eab308',
    iconType: 'carnivore_quad',
    metrics: 'Longitud: 4.5 m | Masa: 350 kg | Carnívoro Ápice'
  },
  {
    id: 'plateosaurus',
    name: 'Plateosaurus trossingensis',
    common: 'Prosaurópodo Herbívoro Ancestral',
    era: 'Mesozoico',
    period: 'Triásico Tardío • 214 - 204 Ma',
    theme: '#eab308',
    iconType: 'prosauropod',
    metrics: 'Longitud: 8.0 m | Masa: 4.0 t | Herbívoro Bípedo Facultativo'
  },
  {
    id: 'shonisaurus',
    name: 'Shonisaurus popularis',
    common: 'Ictiosaurio Colosal de Ojos Enormes',
    era: 'Mesozoico',
    period: 'Triásico Tardío • 215 Ma',
    theme: '#eab308',
    iconType: 'ichthyosaur',
    metrics: 'Longitud: 15.0 m | Masa: 30 t | Depredador Marino de Cefalópodos'
  },

  // Paleozoic - Permian
  {
    id: 'inostrancevia',
    name: 'Inostrancevia alexandri',
    common: 'Gorgonópsido Dientes de Sable de los Urales',
    era: 'Paleozoico',
    period: 'Pérmico Tardío • 259 - 252 Ma',
    theme: '#ef4444',
    iconType: 'gorgonopsid',
    metrics: 'Longitud: 3.5 m | Masa: 400 kg | Carnívoro Sinápsido Ápice'
  },
  {
    id: 'scutosaurus',
    name: 'Scutosaurus karpinskii',
    common: 'Pareiasaurio Blindado de Pangea',
    era: 'Paleozoico',
    period: 'Pérmico Tardío • 254 - 252 Ma',
    theme: '#ef4444',
    iconType: 'armored_reptile',
    metrics: 'Longitud: 3.0 m | Masa: 1.0 t | Herbívoro Robusto'
  },
  {
    id: 'diplocaulus',
    name: 'Diplocaulus magnicornis',
    common: 'Anfibio de Cabeza en Boomerang Hidrodinámico',
    era: 'Paleozoico',
    period: 'Pérmico Temprano • 280 Ma',
    theme: '#ef4444',
    iconType: 'boomerang_amphibian',
    metrics: 'Longitud: 1.0 m | Masa: 15 kg | Piscívoro Acuático'
  },

  // Paleozoic - Carboniferous
  {
    id: 'meganeura',
    name: 'Meganeura monyi',
    common: 'Libélula Gigante de los Pantanos de Carbón',
    era: 'Paleozoico',
    period: 'Carbonífero Tardío • 305 Ma',
    theme: '#10b981',
    iconType: 'giant_insect',
    metrics: 'Envergadura: 75 cm | Depredador aéreo de artrópodos y anfibios'
  },
  {
    id: 'pulmonoscorpius',
    name: 'Pulmonoscorpius kirktonensis',
    common: 'Escorpión Terrestre Gigante Pulmonado',
    era: 'Paleozoico',
    period: 'Carbonífero Temprano • 335 Ma',
    theme: '#10b981',
    iconType: 'giant_scorpion',
    metrics: 'Longitud: 70 cm | Depredador venenoso terrestre'
  },
  {
    id: 'hylonomus',
    name: 'Hylonomus lyelli',
    common: 'Primer Reptil Amniota Verdadero',
    era: 'Paleozoico',
    period: 'Carbonífero Tardío • 312 Ma',
    theme: '#10b981',
    iconType: 'primitive_lizard',
    metrics: 'Longitud: 20 cm | Primer huevo amniótico con cáscara protectora'
  },

  // Paleozoic - Devonian
  {
    id: 'ichthyostega',
    name: 'Ichthyostega stensioei',
    common: 'Tetrapodomorfo Primitivo de Groenlandia',
    era: 'Paleozoico',
    period: 'Devónico Tardío • 365 Ma',
    theme: '#14b8a6',
    iconType: 'tetrapod',
    metrics: 'Longitud: 1.5 m | Extremidades con 7 dígitos | Transición tierra'
  },
  {
    id: 'materpiscis',
    name: 'Materpiscis attenboroughi',
    common: 'Pez Acorazado Vivíparo con Cordón Umbilical',
    era: 'Paleozoico',
    period: 'Devónico Tardío • 380 Ma',
    theme: '#14b8a6',
    iconType: 'placoderm_fish',
    metrics: 'Longitud: 25 cm | Fósil más antiguo de viviparismo con embrión'
  },

  // Paleozoic - Silurian
  {
    id: 'cooksonia',
    name: 'Cooksonia caledonica',
    common: 'Pionera de las Plantas Terrestres Vasculares',
    era: 'Paleozoico',
    period: 'Silúrico Medio-Tardío • 430 Ma',
    theme: '#0284c7',
    iconType: 'primitive_plant',
    metrics: 'Altura: 6-10 cm | Tallos fotosintéticos con esporangios terminales'
  },
  {
    id: 'birkenia',
    name: 'Birkenia elegans',
    common: 'Pez Primitivo Ágnato sin Mandíbulas',
    era: 'Paleozoico',
    period: 'Silúrico Medio • 428 Ma',
    theme: '#0284c7',
    iconType: 'jawless_fish',
    metrics: 'Longitud: 10 cm | Escamas de hueso dérmico | Nécton marino'
  },
  {
    id: 'prototaxites',
    name: 'Prototaxites loganii',
    common: 'Hongo Troncal Gigante de la Tierra Primitiva',
    era: 'Paleozoico',
    period: 'Silúrico Tardío - Devónico • 420 - 370 Ma',
    theme: '#0284c7',
    iconType: 'giant_fungus',
    metrics: 'Altura: 8.0 m | Diámetro base: 1.0 m | Organismo terrestre más alto'
  },

  // Paleozoic - Ordovician
  {
    id: 'asaphus',
    name: 'Asaphus kowalewskii',
    common: 'Trilobites con Ojos Pedunculados de Periscopio',
    era: 'Paleozoico',
    period: 'Ordovícico Medio • 465 Ma',
    theme: '#6366f1',
    iconType: 'trilobite',
    metrics: 'Longitud: 8 cm | Ojos elevados para enterrarse bajo el fango marino'
  },
  {
    id: 'astraspis',
    name: 'Astraspis desiderata',
    common: 'Pez Acorazado con Escudo Dérmico Estrellado',
    era: 'Paleozoico',
    period: 'Ordovícico Tardío • 450 Ma',
    theme: '#6366f1',
    iconType: 'armored_fish',
    metrics: 'Longitud: 20 cm | Escudo cefálico óseo | Bentónico'
  },
  {
    id: 'promissum',
    name: 'Promissum pulchrum',
    common: 'Conodonto Gigante con Ojos Complejos',
    era: 'Paleozoico',
    period: 'Ordovícico Tardío • 445 Ma',
    theme: '#6366f1',
    iconType: 'conodont',
    metrics: 'Longitud: 40 cm | Elementos fosfatados dentados | Notocorda basal'
  },

  // Paleozoic - Cambrian
  {
    id: 'opabinia',
    name: 'Opabinia regalis',
    common: 'Criatura Extraordinaria de Cinco Ojos',
    era: 'Paleozoico',
    period: 'Cámbrico Medio • 508 Ma',
    theme: '#8b5cf6',
    iconType: 'opabinia_type',
    metrics: 'Longitud: 7 cm | Probóscide frontal con pinza prensil | 5 ojos compuestos'
  },
  {
    id: 'hallucigenia',
    name: 'Hallucigenia sparsa',
    common: 'Gusano Espinoso de Burgess Shale',
    era: 'Paleozoico',
    period: 'Cámbrico Medio • 508 Ma',
    theme: '#8b5cf6',
    iconType: 'hallucigenia_type',
    metrics: 'Longitud: 3 cm | 7 pares de espinas dorsales | Lobópodo'
  },
  {
    id: 'olenoides',
    name: 'Olenoides serratus',
    common: 'Trilobites Típico con Antenas y Apéndices',
    era: 'Paleozoico',
    period: 'Cámbrico Medio • 508 Ma',
    theme: '#8b5cf6',
    iconType: 'trilobite',
    metrics: 'Longitud: 9 cm | Exosqueleto quitinoso birramoso | Bentónico'
  },
  {
    id: 'pikaia',
    name: 'Pikaia gracilens',
    common: 'Ancestro de los Vertebrados con Notocorda',
    era: 'Paleozoico',
    period: 'Cámbrico Medio • 508 Ma',
    theme: '#8b5cf6',
    iconType: 'chordate',
    metrics: 'Longitud: 4 cm | Notocorda dorsal primitiva | Cordado basal'
  },

  // Proterozoic - Ediacaran
  {
    id: 'charnia',
    name: 'Charnia masoni',
    common: 'Fronda Fractal de las Profundidades Abisales',
    era: 'Neoproterozoico',
    period: 'Ediacárico Tardío • 570 - 550 Ma',
    theme: '#ec4899',
    iconType: 'fractal_frond',
    metrics: 'Altura: 0.6 m | Ramificación fractal modular | Sésil fijado por disco'
  },
  {
    id: 'kimberella',
    name: 'Kimberella quadrata',
    common: 'Criatura Bilateral con Rádula Raspadora',
    era: 'Neoproterozoico',
    period: 'Ediacárico • 555 Ma',
    theme: '#ec4899',
    iconType: 'bilaterian',
    metrics: 'Longitud: 5 cm | Simetría bilateral | Probable molusco basal'
  },
  {
    id: 'spriggina',
    name: 'Spriggina floundersi',
    common: 'Organismo Segmentado de Simetría Deslizante',
    era: 'Neoproterozoico',
    period: 'Ediacárico • 550 Ma',
    theme: '#ec4899',
    iconType: 'spriggina_type',
    metrics: 'Longitud: 4 cm | Escudo cefálico en herradura | Isómero proarticulado'
  },

  // Proterozoic - Cryogenian
  {
    id: 'otavia',
    name: 'Otavia antiqua',
    common: 'Diminuto Microfósil de Namibia (Esponja Basal)',
    era: 'Neoproterozoico',
    period: 'Criogénico • 760 - 550 Ma',
    theme: '#38bdf8',
    iconType: 'sponge_basal',
    metrics: 'Tamaño: 0.5 - 5 mm | Cámara fosilífera con poros | Primer animal celular'
  },
  {
    id: 'stromatolites',
    name: 'Estromatolitos de Cianobacterias',
    common: 'Arrecifes Microbianos Oxigenadores',
    era: 'Precámbrico',
    period: 'Criogénico a Arcaico • 3500 - 750 Ma',
    theme: '#38bdf8',
    iconType: 'stromatolite_mound',
    metrics: 'Estructuras laminadas de carbonato de calcio formadas por colonias fotosintéticas'
  },
  {
    id: 'acritarchs',
    name: 'Acritarcos y Eucariotas Marinos',
    common: 'Microfósiles de Pared Orgánica Resistente',
    era: 'Neoproterozoico',
    period: 'Criogénico • 750 Ma',
    theme: '#38bdf8',
    iconType: 'micro_eukaryote',
    metrics: 'Diámetro: 50 - 200 µm | Vesículas orgánicas que sobrevivieron a la glaciación'
  },
  {
    id: 'bangiomorpha',
    name: 'Bangiomorpha pubescens',
    common: 'Alga Roja Multicelular (Primer Sexo Conocido)',
    era: 'Mesoproterozoico / Neoproterozoico',
    period: 'Proterozoico • 1050 - 750 Ma',
    theme: '#38bdf8',
    iconType: 'red_algae',
    metrics: 'Longitud: 2 mm | Células diferenciadas con reproducción sexual comprobada'
  }
];

function getSilhouettePath(type) {
  switch (type) {
    case 'mammoth':
      return `<path d="M 120 380 Q 140 280 180 240 Q 230 200 320 190 Q 420 180 480 220 Q 530 260 550 330 L 530 460 L 490 460 L 480 370 L 410 370 L 390 460 L 350 460 L 370 340 L 260 340 L 240 460 L 200 460 L 210 330 Q 180 340 140 370 Z M 160 250 Q 100 270 70 350 Q 60 380 90 390 Q 120 370 140 310 Z" fill="currentColor"/>`;
    case 'ceratopsian':
      return `<path d="M 140 260 Q 120 170 190 140 Q 250 170 240 230 Q 320 220 420 230 Q 510 250 560 320 L 540 460 L 490 460 L 470 370 L 380 370 L 360 460 L 310 460 L 330 350 L 230 360 L 210 460 L 170 460 L 180 340 Q 130 350 100 370 L 90 340 Q 110 300 140 260 Z" fill="currentColor"/>`;
    case 'giant_pterosaur':
      return `<path d="M 140 290 Q 220 230 350 200 Q 480 170 650 150 Q 520 240 420 290 Q 350 330 320 420 L 300 420 Q 300 350 250 330 Q 180 340 100 360 L 80 320 Q 110 300 140 290 Z M 320 280 Q 280 240 240 210 L 290 190 Q 320 230 340 270 Z" fill="currentColor"/>`;
    case 'ankylosaur':
      return `<path d="M 110 360 Q 140 290 220 260 Q 330 240 450 260 Q 530 280 590 340 L 640 330 Q 660 310 680 340 Q 660 370 630 360 L 570 370 L 550 450 L 500 450 L 480 370 L 340 370 L 320 450 L 270 450 L 280 360 L 180 370 L 160 450 L 110 450 Z" fill="currentColor"/>`;
    case 'mosasaur':
    case 'ichthyosaur':
      return `<path d="M 80 300 Q 160 250 280 230 Q 420 220 540 260 Q 640 290 710 300 L 730 240 L 700 310 L 740 350 L 690 320 Q 560 350 440 360 Q 280 370 170 340 Z M 320 290 L 370 380 L 340 380 L 300 310 Z M 480 250 L 520 180 L 530 250 Z" fill="currentColor"/>`;
    case 'theropod_mega':
    case 'theropod_large':
    case 'theropod_small':
      return `<path d="M 120 240 Q 150 190 220 180 Q 280 210 320 260 Q 420 270 540 320 L 680 370 L 540 360 Q 450 400 390 420 L 420 510 L 380 510 L 340 430 Q 300 430 260 420 L 240 480 L 210 480 L 220 390 Q 160 380 120 330 L 150 310 L 120 280 Z" fill="currentColor"/>`;
    case 'sauropod_mega':
    case 'prosauropod':
      return `<path d="M 100 130 Q 130 110 150 140 Q 180 240 260 290 Q 350 300 450 310 Q 550 320 680 390 L 540 370 L 520 480 L 470 480 L 460 380 L 360 380 L 340 480 L 290 480 L 300 360 Q 240 350 200 300 L 120 160 Z" fill="currentColor"/>`;
    case 'stegosaur':
      return `<path d="M 110 360 Q 160 320 220 280 Q 340 260 460 290 Q 540 320 620 380 L 660 350 L 640 380 L 670 390 L 600 400 L 570 460 L 520 460 L 500 380 L 380 380 L 360 460 L 310 460 L 320 370 L 220 370 L 190 450 L 150 450 Z M 240 270 L 270 200 L 300 260 Z M 350 250 L 390 170 L 420 250 Z M 460 260 L 490 190 L 520 270 Z" fill="currentColor"/>`;
    case 'proto_bird':
    case 'giant_bird':
      return `<path d="M 220 320 Q 260 240 360 220 Q 480 200 580 180 Q 500 270 440 330 Q 420 400 400 480 L 370 480 L 380 400 L 330 380 L 280 470 L 250 470 L 290 370 Q 240 380 180 410 L 140 360 Q 180 340 220 320 Z M 330 260 Q 300 210 270 190 L 310 180 Q 340 220 350 250 Z" fill="currentColor"/>`;
    case 'giant_croc':
      return `<path d="M 70 320 Q 140 290 260 280 Q 400 270 540 300 Q 640 330 720 350 L 630 360 Q 500 370 380 360 L 350 420 L 310 420 L 330 360 L 240 360 L 210 410 L 170 410 L 190 350 Q 130 350 80 340 Z" fill="currentColor"/>`;
    case 'trilobite':
      return `<path d="M 330 180 Q 400 150 470 180 Q 510 220 500 270 Q 490 360 460 440 Q 400 480 340 440 Q 310 360 300 270 Q 290 220 330 180 Z M 380 200 Q 400 200 420 200 M 340 260 Q 400 260 460 260 M 345 320 Q 400 320 455 320 M 355 380 Q 400 380 445 380" stroke="currentColor" stroke-width="8" fill="none"/>`;
    case 'opabinia_type':
      return `<path d="M 120 310 Q 170 300 230 280 Q 350 260 480 270 Q 560 280 620 310 L 590 340 Q 480 360 360 360 Q 240 360 170 330 Z M 160 290 Q 120 270 80 260 L 70 290 Q 100 300 140 310 Z M 210 270 A 8 8 0 1 1 210 269 M 225 260 A 8 8 0 1 1 225 259 M 240 265 A 8 8 0 1 1 240 264" fill="currentColor"/>`;
    case 'hallucigenia_type':
      return `<path d="M 180 330 Q 300 320 450 320 Q 540 330 600 350 M 240 320 L 210 440 M 290 320 L 260 440 M 340 320 L 310 440 M 390 320 L 360 440 M 440 320 L 410 440 M 490 320 L 460 440 M 250 320 L 270 210 M 300 320 L 320 210 M 350 320 L 370 210 M 400 320 L 420 210 M 450 320 L 470 210 M 500 320 L 520 210" stroke="currentColor" stroke-width="7" fill="none"/>`;
    default:
      return `<ellipse cx="400" cy="320" rx="180" ry="90" fill="currentColor"/><circle cx="260" cy="270" r="45" fill="currentColor"/>`;
  }
}

function generateSpecimenSvg(cfg) {
  const primary = cfg.theme || '#38bdf8';
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 560" width="800" height="560">
  <defs>
    <radialGradient id="bgGrad_${cfg.id}" cx="50%" cy="46%" r="65%">
      <stop offset="0%" stop-color="#141d2c" stop-opacity="1"/>
      <stop offset="60%" stop-color="#070c14" stop-opacity="1"/>
      <stop offset="100%" stop-color="#020408" stop-opacity="1"/>
    </radialGradient>
    <linearGradient id="themeGrad_${cfg.id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${primary}" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.6"/>
    </linearGradient>
    <filter id="glow_${cfg.id}" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- Deep Cosmic / Museum Canvas Background -->
  <rect width="800" height="560" fill="url(#bgGrad_${cfg.id})"/>

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
  <rect x="60" y="35" width="680" height="42" rx="8" fill="rgba(255, 255, 255, 0.03)" stroke="${primary}" stroke-opacity="0.25"/>
  <circle cx="85" cy="56" r="6" fill="${primary}"/>
  <text x="105" y="61" fill="#f8fafc" font-family="'Space Grotesk', 'Outfit', sans-serif" font-weight="700" font-size="14" letter-spacing="1.5">ARCHIVO PALEONTOLÓGICO 3D</text>
  <text x="715" y="61" fill="${primary}" font-family="'JetBrains Mono', monospace" font-size="12" text-anchor="end">${cfg.era.toUpperCase()} • ${cfg.period.toUpperCase()}</text>

  <!-- Central Specimen Silhouette Graphic -->
  <g transform="translate(0, 10)" color="${primary}" filter="url(#glow_${cfg.id})" opacity="0.92">
    ${getSilhouettePath(cfg.iconType)}
  </g>

  <!-- Ground Reference Line & Scale Ticks -->
  <line x1="100" y1="475" x2="700" y2="475" stroke="${primary}" stroke-opacity="0.4" stroke-width="1.5"/>
  <g stroke="${primary}" stroke-opacity="0.5" stroke-width="1.5">
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
    <text x="10" y="70" fill="rgba(255, 255, 255, 0.45)" font-family="sans-serif" font-size="9" text-anchor="middle">Humano (1.8m)</text>
  </g>

  <!-- Species Nomenclature & Biometrics Footer -->
  <rect x="60" y="495" width="680" height="45" rx="8" fill="rgba(10, 16, 26, 0.85)" stroke="rgba(255, 255, 255, 0.08)"/>
  <text x="80" y="522" fill="#ffffff" font-family="'Space Grotesk', sans-serif" font-size="16" font-weight="700">${cfg.common}</text>
  <text x="80" y="534" fill="#94a3b8" font-family="'Outfit', sans-serif" font-style="italic" font-size="11">${cfg.name}</text>
  <text x="720" y="523" fill="${primary}" font-family="'JetBrains Mono', monospace" font-size="11" text-anchor="end">${cfg.metrics}</text>
</svg>`;
}

const outDir = path.resolve('public/assets/species');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

let count = 0;
for (const cfg of SPECIES_CONFIGS) {
  const filePath = path.join(outDir, `${cfg.id}.svg`);
  fs.writeFileSync(filePath, generateSpecimenSvg(cfg), 'utf-8');
  count++;
}

console.log(`Generated ${count} scientific specimen SVG illustrations in ${outDir}`);
