const fs = require('fs');
const path = require('path');

const faunaPath = path.join(__dirname, '..', 'public', 'data', 'fauna.json');
const srcFaunaPath = path.join(__dirname, '..', 'src', 'data', 'fauna.json');
const fauna = JSON.parse(fs.readFileSync(faunaPath, 'utf8'));

console.log('Current fauna species count:', fauna.length);

const newSpecies = [
  // ==========================================
  // 1. NEOPROTEROZOICO / EDIACÁRICO (17 especies)
  // ==========================================
  {
    id: "kimberella-quadrata",
    commonName: "Kimberella",
    scientificName: "Kimberella quadrata",
    clade: "Bilateria (Molusco basal o Lophotrochozoa)",
    periodId: "ediacarico",
    startMa: 558,
    endMa: 550,
    diet: "Filtrador",
    metrics: { lengthMeters: 0.15, weightTons: 0.0001, heightMeters: 0.04 },
    paleoLocation: ["Mar Blanco (Rusia)", "Montes Flinders (Australia)"],
    description: "Uno de los primeros organismos bilaterales móviles del reino animal. Poseía un caparazón dorsal flexible no mineralizado y una estructura anterior tipo rádula con la que raspaba los tapetes microbianos del lecho marino.",
    media: { imageUrl: "assets/species/kimberella.svg", imageAuthor: "Astra Scientific Paleontology", imageLicense: "Creative Commons" },
    coordinates: { lat: 64.9, lng: 40.2 },
    environment: "marine",
    discovery: {
      discoverer: "Martin Glaessner",
      yearDiscovered: 1959,
      describedBy: "Martin Glaessner (1959)",
      geologicalFormation: "Formación Ust-Pinega (Mar Blanco, Rusia)",
      typeSpecimen: "PIN 3993/5001",
      museum: "Instituto Paleontológico de Moscú (PIN)",
      modernCountry: "Rusia y Australia",
      holotypeSpecimen: "PIN 3993/5001"
    },
    paleogeography: {
      waterBody: "Mares epicontinentales someros de Baltica",
      landmass: "Margen continental de Baltica",
      depthOrBiome: "Fondos marinos litorales ricos en tapetes cianobacterianos",
      paleoZoneDescription: "Reptador bentónico que dejaba los rastros fósiles de alimentación Kimberichnus sobre sedimentos marinos."
    },
    paleoCoordinates: { lat: 64.9, lon: 40.2 }
  },
  {
    id: "tribrachidium-heraldicum",
    commonName: "Tribrachidium",
    scientificName: "Tribrachidium heraldicum",
    clade: "Trilobozoa (Metazoa incertae sedis)",
    periodId: "ediacarico",
    startMa: 558,
    endMa: 550,
    diet: "Filtrador",
    metrics: { lengthMeters: 0.05, weightTons: 0.00003, heightMeters: 0.02 },
    paleoLocation: ["Montes Flinders (Australia)", "Mar Blanco (Rusia)", "Podolia (Ucrania)"],
    description: "Extraordinario organismo discoidal bentónico con simetría trirradial única (tres brazos curvados en espiral con cilios o hendiduras). Es el fósil guía de la clase Trilobozoa.",
    media: { imageUrl: "assets/species/tribrachidium.svg", imageAuthor: "Astra Scientific Paleontology", imageLicense: "Creative Commons" },
    coordinates: { lat: -31.3, lng: 138.6 },
    environment: "marine",
    discovery: {
      discoverer: "Reg Sprigg",
      yearDiscovered: 1947,
      describedBy: "Martin Glaessner (1959)",
      geologicalFormation: "Arenisca de Rawnsley (Montes Flinders, Australia)",
      typeSpecimen: "SAM P12898",
      museum: "Museo del Sur de Australia (Adelaida)",
      modernCountry: "Australia",
      holotypeSpecimen: "SAM P12898"
    },
    paleogeography: {
      waterBody: "Mar somero de Adelasia / Océano de Gondwana",
      landmass: "Margen pasivo de Gondwana",
      depthOrBiome: "Llanuras mareales arenosas submareales",
      paleoZoneDescription: "Filtro de suspensión sésil que aprovechaba las corrientes marinas con su geometría de espiral trirradial."
    },
    paleoCoordinates: { lat: -31.3, lon: 138.6 }
  },
  {
    id: "fractofusus-misrai",
    commonName: "Fractofusus",
    scientificName: "Fractofusus misrai",
    clade: "Rangeomorpha",
    periodId: "ediacarico",
    startMa: 575,
    endMa: 560,
    diet: "Filtrador",
    metrics: { lengthMeters: 0.4, weightTons: 0.0002, heightMeters: 0.02 },
    paleoLocation: ["Mistaken Point (Terranova, Canadá)", "Leicestershire (Reino Unido)"],
    description: "Organismo fusiforme horizontal completamente plano que crecía mediante un patrón modular fractal repetitivo. Carecía de boca, intestino y ano, absorbiendo carbono y nutrientes orgánicos disueltos en las profundidades abisales.",
    media: { imageUrl: "assets/species/fractofusus.svg", imageAuthor: "Astra Scientific Paleontology", imageLicense: "Creative Commons" },
    coordinates: { lat: 46.6, lng: -53.2 },
    environment: "marine",
    discovery: {
      discoverer: "S.B. Misra",
      yearDiscovered: 1967,
      describedBy: "Gehling & Narbonne (2007)",
      geologicalFormation: "Formación Drook / Mistaken Point (Terranova)",
      typeSpecimen: "ROM 57555",
      museum: "Royal Ontario Museum (Toronto, Canadá)",
      modernCountry: "Canadá",
      holotypeSpecimen: "ROM 57555"
    },
    paleogeography: {
      waterBody: "Cuenca abisal oceánica de Avalonia",
      landmass: "Arco de islas volcánicas de Avalonia",
      depthOrBiome: "Fondo marino profundo afótico bajo la zona de oleaje",
      paleoZoneDescription: "Especie dominante en los lechos de ceniza volcánica submarina de Mistaken Point."
    },
    paleoCoordinates: { lat: 46.6, lon: -53.2 }
  },
  {
    id: "yorgia-moveri",
    commonName: "Yorgia",
    scientificName: "Yorgia moveri",
    clade: "Proarticulata",
    periodId: "ediacarico",
    startMa: 558,
    endMa: 550,
    diet: "Filtrador",
    metrics: { lengthMeters: 0.22, weightTons: 0.0003, heightMeters: 0.03 },
    paleoLocation: ["Mar Blanco (Óblast de Arcángel, Rusia)"],
    description: "Proarticulado ediacárico con cuerpo segmentado en 'isómeros' dispuestos en simetría especular desplazada (glide symmetry). Dejaba improntas fósiles en serie sobre el lecho marino mientras digería externamente los tapetes microbianos.",
    media: { imageUrl: "assets/species/yorgia.svg", imageAuthor: "Astra Scientific Paleontology", imageLicense: "Creative Commons" },
    coordinates: { lat: 64.9, lng: 40.2 },
    environment: "marine",
    discovery: {
      discoverer: "Andrey Ivantsov",
      yearDiscovered: 1999,
      describedBy: "Andrey Ivantsov (1999)",
      geologicalFormation: "Formación Ust-Pinega (Río Zimnie Gory, Rusia)",
      typeSpecimen: "PIN 3993/5010",
      museum: "Instituto Paleontológico de Moscú",
      modernCountry: "Rusia",
      holotypeSpecimen: "PIN 3993/5010"
    },
    paleogeography: {
      waterBody: "Mar interior somero de Baltica",
      landmass: "Plataforma continental de Baltica",
      depthOrBiome: "Llanuras de fango arenoso submareal",
      paleoZoneDescription: "Reptador pasivo que se desplazaba periódicamente para pastar biofilms bacterianos vírgenes."
    },
    paleoCoordinates: { lat: 64.9, lon: 40.2 }
  },
  {
    id: "cloudina-hartmannae",
    commonName: "Cloudina",
    scientificName: "Cloudina hartmannae",
    clade: "Metazoa incertae sedis (primeros esqueletos tubulares)",
    periodId: "ediacarico",
    startMa: 550,
    endMa: 541,
    diet: "Filtrador",
    metrics: { lengthMeters: 0.15, weightTons: 0.00005, heightMeters: 0.01 },
    paleoLocation: ["Formación Nama (Namibia)", "España", "China", "Brasil"],
    description: "Pionero evolutivo: uno de los primeros animales en construir un tubo esquelético protector de carbonato de calcio. Sus fósiles muestran con frecuencia orificios de perforación depredadora, documentando la primera carrera armamentista biológica.",
    media: { imageUrl: "assets/species/cloudina.svg", imageAuthor: "Astra Scientific Paleontology", imageLicense: "Creative Commons" },
    coordinates: { lat: -26.7, lng: 16.3 },
    environment: "marine",
    discovery: {
      discoverer: "Germs",
      yearDiscovered: 1972,
      describedBy: "Germs (1972)",
      geologicalFormation: "Grupo Nama (Namibia)",
      typeSpecimen: "G-1972-CH",
      museum: "Museo Geológico de Namibia (Windhoek)",
      modernCountry: "Namibia",
      holotypeSpecimen: "G-1972-CH"
    },
    paleogeography: {
      waterBody: "Cuenca antepaís de Nama / Océano de Adamastor",
      landmass: "Cratón del Kalahari (Gondwana)",
      depthOrBiome: "Arrecifes someros de estromatolitos y carbonatos",
      paleoZoneDescription: "Bio-constructor de los primeros micro-arrecifes esqueléticos en las plataformas carbonáticas someras."
    },
    paleoCoordinates: { lat: -26.7, lon: 16.3 }
  },
  {
    id: "namacalathus-hermanastes",
    commonName: "Namacalathus",
    scientificName: "Namacalathus hermanastes",
    clade: "Lophophorata o Cnidaria basal",
    periodId: "ediacarico",
    startMa: 550,
    endMa: 541,
    diet: "Filtrador",
    metrics: { lengthMeters: 0.08, weightTons: 0.00004, heightMeters: 0.07 },
    paleoLocation: ["Namibia", "Siberia", "Canadá"],
    description: "Organismo pedunculado en forma de cáliz o copa globular perforada por grandes orificios simétricos. Poseía un exoesqueleto calcificado que formaba colonias gregarias asociadas a Cloudina.",
    media: { imageUrl: "assets/species/namacalathus.svg", imageAuthor: "Astra Scientific Paleontology", imageLicense: "Creative Commons" },
    coordinates: { lat: -26.7, lng: 16.3 },
    environment: "marine",
    discovery: {
      discoverer: "Grotzinger et al.",
      yearDiscovered: 2000,
      describedBy: "Grotzinger, Watters & Knoll (2000)",
      geologicalFormation: "Grupo Nama (Formación Kuibis, Namibia)",
      typeSpecimen: "NAM-2000-01",
      museum: "Museo Geológico de Namibia",
      modernCountry: "Namibia",
      holotypeSpecimen: "NAM-2000-01"
    },
    paleogeography: {
      waterBody: "Cuenca marina de Nama",
      landmass: "Gondwana sudoccidental",
      depthOrBiome: "Complejos de montículos arrecifales microbiales",
      paleoZoneDescription: "Filtrador de suspensión elevado sobre el fondo mediante un pedúnculo tubular flexible."
    },
    paleoCoordinates: { lat: -26.7, lon: 16.3 }
  },
  {
    id: "rangea-schneiderhoehni",
    commonName: "Rangea",
    scientificName: "Rangea schneiderhoehni",
    clade: "Rangeomorpha",
    periodId: "ediacarico",
    startMa: 555,
    endMa: 548,
    diet: "Filtrador",
    metrics: { lengthMeters: 0.18, weightTons: 0.0001, heightMeters: 0.15 },
    paleoLocation: ["Granja Aar (Namibia)", "Australia"],
    description: "Frondomorfo ediacárico emblemático con una estructura ramificada compleja de seis alas que se agrupaban alrededor de un tallo central anclado en arena.",
    media: { imageUrl: "assets/species/rangea.svg", imageAuthor: "Astra Scientific Paleontology", imageLicense: "Creative Commons" },
    coordinates: { lat: -26.7, lng: 16.3 },
    environment: "marine",
    discovery: {
      discoverer: "P. Range",
      yearDiscovered: 1908,
      describedBy: "Gürich (1929)",
      geologicalFormation: "Grupo Nama (Miembro Kliphoek, Namibia)",
      typeSpecimen: "SAM 1929",
      museum: "Museo del Sur de África (Ciudad del Cabo)",
      modernCountry: "Namibia",
      holotypeSpecimen: "SAM-1929-RG"
    },
    paleogeography: {
      waterBody: "Canales de marea y barras arenosas de Nama",
      landmass: "Gondwana (Kalahari)",
      depthOrBiome: "Arenas someras de alta energía hidrodinámica",
      paleoZoneDescription: "Suspensívoro con vainas internas rellenas de sedimento que le otorgaban estabilidad vertical."
    },
    paleoCoordinates: { lat: -26.7, lon: 16.3 }
  },
  {
    id: "cyclomedusa-davidi",
    commonName: "Cyclomedusa",
    scientificName: "Cyclomedusa davidi",
    clade: "Vendobionta / Cnidaria basal",
    periodId: "ediacarico",
    startMa: 565,
    endMa: 550,
    diet: "Filtrador",
    metrics: { lengthMeters: 0.25, weightTons: 0.0003, heightMeters: 0.03 },
    paleoLocation: ["Montes Flinders (Australia)", "Terranova (Canadá)", "Rusia", "Noruega"],
    description: "Fósil circular discoidal con anillos concéntricos y un tubérculo central abombado. Aunque históricamente se clasificó como una medusa fósil, los análisis modernos indican que era un disco de anclaje bentónico para organismos de fronda.",
    media: { imageUrl: "assets/species/cyclomedusa.svg", imageAuthor: "Astra Scientific Paleontology", imageLicense: "Creative Commons" },
    coordinates: { lat: -31.3, lng: 138.6 },
    environment: "marine",
    discovery: {
      discoverer: "Reg Sprigg",
      yearDiscovered: 1947,
      describedBy: "Reg Sprigg (1947)",
      geologicalFormation: "Arenisca Pound (Ediacara Hills, Australia)",
      typeSpecimen: "SAM P12900",
      museum: "Museo del Sur de Australia (Adelaida)",
      modernCountry: "Australia",
      holotypeSpecimen: "SAM P12900"
    },
    paleogeography: {
      waterBody: "Mares de plataforma epicontinental australiana",
      landmass: "Gondwana este",
      depthOrBiome: "Fondos marinos litorales protegidos",
      paleoZoneDescription: "Base fijadora adherida con fuerza al sedimento para resistir las corrientes del fondo marino."
    },
    paleoCoordinates: { lat: -31.3, lon: 138.6 }
  },
  {
    id: "parvancorina-minchami",
    commonName: "Parvancorina",
    scientificName: "Parvancorina minchami",
    clade: "Arthropoda basal o Bilateria",
    periodId: "ediacarico",
    startMa: 558,
    endMa: 550,
    diet: "Filtrador",
    metrics: { lengthMeters: 0.03, weightTons: 0.00001, heightMeters: 0.01 },
    paleoLocation: ["Montes Flinders (Australia)", "Mar Blanco (Rusia)"],
    description: "Diminuto organismo con escudo dorsal ovalado dominado por una prominente cresta en forma de ancla. Las simulaciones de dinámica de fluidos demuestran que su orientación natural canalizaba el flujo de agua hacia hendiduras de alimentación.",
    media: { imageUrl: "assets/species/parvancorina.svg", imageAuthor: "Astra Scientific Paleontology", imageLicense: "Creative Commons" },
    coordinates: { lat: -31.3, lng: 138.6 },
    environment: "marine",
    discovery: {
      discoverer: "Reg Sprigg",
      yearDiscovered: 1958,
      describedBy: "Martin Glaessner (1958)",
      geologicalFormation: "Arenisca de Rawnsley (Australia)",
      typeSpecimen: "SAM P12888",
      museum: "Museo del Sur de Australia",
      modernCountry: "Australia",
      holotypeSpecimen: "SAM P12888"
    },
    paleogeography: {
      waterBody: "Plataformas someras de Gondwana oriental",
      landmass: "Australia ediacárica",
      depthOrBiome: "Llanuras sedimentarias marinas con corrientes direccionales",
      paleoZoneDescription: "Orientación reófila alineada con las paleocorrientes para captura pasiva de nutrientes."
    },
    paleoCoordinates: { lat: -31.3, lon: 138.6 }
  },
  {
    id: "haootia-quadriformis",
    commonName: "Haootia",
    scientificName: "Haootia quadriformis",
    clade: "Cnidaria (Staurozoa basal)",
    periodId: "ediacarico",
    startMa: 565,
    endMa: 558,
    diet: "Filtrador",
    metrics: { lengthMeters: 0.09, weightTons: 0.00005, heightMeters: 0.08 },
    paleoLocation: ["Península de Bonavista (Terranova, Canadá)"],
    description: "Hito paleobiológico mayúsculo: representa la evidencia fósil de tejido muscular contráctil y fibras musculares estriadas más antigua conocida en la historia del planeta Tierra.",
    media: { imageUrl: "assets/species/haootia.svg", imageAuthor: "Astra Scientific Paleontology", imageLicense: "Creative Commons" },
    coordinates: { lat: 48.6, lng: -53.0 },
    environment: "marine",
    discovery: {
      discoverer: "Martin D. Brasier et al.",
      yearDiscovered: 2008,
      describedBy: "Liu, Matthews, Menon, McIlroy & Brasier (2014)",
      geologicalFormation: "Formación Fermeuse (Península de Bonavista, Terranova)",
      typeSpecimen: "MUN-560-HQ",
      museum: "The Rooms Museum (San Juan de Terranova)",
      modernCountry: "Canadá",
      holotypeSpecimen: "MUN-560-HQ"
    },
    paleogeography: {
      waterBody: "Mares circundantes al microcontinente de Avalonia",
      landmass: "Avalonia",
      depthOrBiome: "Cuencas marinas someras a intermedias",
      paleoZoneDescription: "Primer depredador pasivo con capacidad contráctil para manipular tentáculos y capturar microorganismos."
    },
    paleoCoordinates: { lat: 48.6, lon: -53.0 }
  },
  {
    id: "aspidella-terranovica",
    commonName: "Aspidella",
    scientificName: "Aspidella terranovica",
    clade: "Vendobionta (anclaje bentónico)",
    periodId: "ediacarico",
    startMa: 575,
    endMa: 545,
    diet: "Filtrador",
    metrics: { lengthMeters: 0.12, weightTons: 0.0001, heightMeters: 0.02 },
    paleoLocation: ["San Juan de Terranova (Canadá)", "Reino Unido", "Siberia"],
    description: "El primer fósil precámbrico descrito y aceptado científicamente en el mundo (1872). Disco concéntrico ovalado con anillos concéntricos que actuaba como anclaje en el sedimento de organismos frondomorfos mayores.",
    media: { imageUrl: "assets/species/aspidella.svg", imageAuthor: "Astra Scientific Paleontology", imageLicense: "Creative Commons" },
    coordinates: { lat: 47.5, lng: -52.7 },
    environment: "marine",
    discovery: {
      discoverer: "Alexander Murray",
      yearDiscovered: 1868,
      describedBy: "Elkanah Billings (1872)",
      geologicalFormation: "Formación St. John's (Ferryland Head, Terranova)",
      typeSpecimen: "GSC 221",
      museum: "Servicio Geológico de Canadá (Ottawa)",
      modernCountry: "Canadá",
      holotypeSpecimen: "GSC 221"
    },
    paleogeography: {
      waterBody: "Océano Jápeto en apertura",
      landmass: "Arco insular avaloniano",
      depthOrBiome: "Plataformas turbidíticas de aguas profundas",
      paleoZoneDescription: "Fósil que demostró por primera vez a la ciencia victoriana la existencia de vida precámbrica macroscópica."
    },
    paleoCoordinates: { lat: 47.5, lon: -52.7 }
  },
  {
    id: "pteridinium-simplex",
    commonName: "Pteridinium",
    scientificName: "Pteridinium simplex",
    clade: "Erniettomorpha",
    periodId: "ediacarico",
    startMa: 550,
    endMa: 541,
    diet: "Filtrador",
    metrics: { lengthMeters: 0.35, weightTons: 0.0004, heightMeters: 0.08 },
    paleoLocation: ["Namibia", "Australia", "Carolina del Norte (EE. UU.)"],
    description: "Organismo marino constituido por tres alas foliáceas segmentadas en cámaras paralelas acolchadas. Vivía parcialmente enterrado en arenas móviles de las corrientes costeras.",
    media: { imageUrl: "assets/species/pteridinium.svg", imageAuthor: "Astra Scientific Paleontology", imageLicense: "Creative Commons" },
    coordinates: { lat: -26.7, lng: 16.3 },
    environment: "marine",
    discovery: {
      discoverer: "Gürich",
      yearDiscovered: 1930,
      describedBy: "Gürich (1930)",
      geologicalFormation: "Grupo Nama (Namibia)",
      typeSpecimen: "SAM 1930",
      museum: "Museo de Historia Natural de Berlín",
      modernCountry: "Namibia",
      holotypeSpecimen: "SAM-1930-PS"
    },
    paleogeography: {
      waterBody: "Mares someros de alta energía de Nama",
      landmass: "Cratón del Kalahari",
      depthOrBiome: "Bancos arenosos submarinos intermareales",
      paleoZoneDescription: "Cuerpo hidrodinámico capaz de sobrevivir al flujo turbulento de sedimentos marinos."
    },
    paleoCoordinates: { lat: -26.7, lon: 16.3 }
  },
  {
    id: "ernietta-plateauensis",
    commonName: "Ernietta",
    scientificName: "Ernietta plateauensis",
    clade: "Erniettomorpha",
    periodId: "ediacarico",
    startMa: 548,
    endMa: 541,
    diet: "Filtrador",
    metrics: { lengthMeters: 0.12, weightTons: 0.0001, heightMeters: 0.10 },
    paleoLocation: ["Namibia"],
    description: "Organismo en forma de saco o canasta hueca semienterrada en la arena, formado por tubos cilíndricos acolchados en U que canalizaban las corrientes hacia su interior para absorción de nutrientes.",
    media: { imageUrl: "assets/species/ernietta.svg", imageAuthor: "Astra Scientific Paleontology", imageLicense: "Creative Commons" },
    coordinates: { lat: -26.7, lng: 16.3 },
    environment: "marine",
    discovery: {
      discoverer: "Adolf Seilacher",
      yearDiscovered: 1966,
      describedBy: "Pflug (1966)",
      geologicalFormation: "Grupo Nama (Formación Dabis, Granja Aar, Namibia)",
      typeSpecimen: "AAR-1966-EP",
      museum: "Museo de Tubinga (Alemania)",
      modernCountry: "Namibia",
      holotypeSpecimen: "AAR-1966-EP"
    },
    paleogeography: {
      waterBody: "Canales de marea del antepaís de Nama",
      landmass: "Gondwana (África austral)",
      depthOrBiome: "Dunas subacuáticas y planicies de arena",
      paleoZoneDescription: "Bentónico infaunal parcial que utilizaba la propia arena circundante como lastre estabilizador."
    },
    paleoCoordinates: { lat: -26.7, lon: 16.3 }
  },
  {
    id: "arkarua-adami",
    commonName: "Arkarua",
    scientificName: "Arkarua adami",
    clade: "Echinodermata basal (?)",
    periodId: "ediacarico",
    startMa: 558,
    endMa: 550,
    diet: "Filtrador",
    metrics: { lengthMeters: 0.01, weightTons: 0.000005, heightMeters: 0.005 },
    paleoLocation: ["Montes Flinders (Australia del Sur)"],
    description: "Diminuto disco fósil con una estrella de cinco puntas bien marcada en el centro. Se considera el candidato más antiguo a equinodermo, sugiriendo que la simetría pentarradial se originó antes del Cámbrico.",
    media: { imageUrl: "assets/species/arkarua.svg", imageAuthor: "Astra Scientific Paleontology", imageLicense: "Creative Commons" },
    coordinates: { lat: -31.3, lng: 138.6 },
    environment: "marine",
    discovery: {
      discoverer: "James Gehling",
      yearDiscovered: 1987,
      describedBy: "Gehling (1987)",
      geologicalFormation: "Arenisca de Rawnsley (Australia del Sur)",
      typeSpecimen: "SAM P24118",
      museum: "Museo del Sur de Australia (Adelaida)",
      modernCountry: "Australia",
      holotypeSpecimen: "SAM P24118"
    },
    paleogeography: {
      waterBody: "Plataformas de aguas templadas de Adelaida",
      landmass: "Gondwana",
      depthOrBiome: "Fondos marinos litorales sobre alfombras microbianas",
      paleoZoneDescription: "Disco bentónico diminuto pionero en el desarrollo de la arquitectura anatómica pentámera."
    },
    paleoCoordinates: { lat: -31.3, lon: 138.6 }
  },
  {
    id: "bradgatia-linfordensis",
    commonName: "Bradgatia",
    scientificName: "Bradgatia linfordensis",
    clade: "Rangeomorpha",
    periodId: "ediacarico",
    startMa: 575,
    endMa: 560,
    diet: "Filtrador",
    metrics: { lengthMeters: 0.35, weightTons: 0.0005, heightMeters: 0.25 },
    paleoLocation: ["Bosque de Charnwood (Leicestershire, Inglaterra)", "Terranova (Canadá)"],
    description: "Estructura arbustiva colonial densa formada por múltiples frondas petaloides ramificadas que irradiaban desde una base central común en las profundidades abisales del Ediacárico.",
    media: { imageUrl: "assets/species/bradgatia.svg", imageAuthor: "Astra Scientific Paleontology", imageLicense: "Creative Commons" },
    coordinates: { lat: 52.7, lng: -1.2 },
    environment: "marine",
    discovery: {
      discoverer: "Boynton & Ford",
      yearDiscovered: 1995,
      describedBy: "Boynton & Ford (1995)",
      geologicalFormation: "Supergrupo de Charnian (Bradgate Park, Inglaterra)",
      typeSpecimen: "LEI-1995-BL",
      museum: "Museo de Leicester (New Walk Museum)",
      modernCountry: "Reino Unido",
      holotypeSpecimen: "LEI-1995-BL"
    },
    paleogeography: {
      waterBody: "Mar de Avalonia / Océano Jápeto",
      landmass: "Arco magmático de Avalonia",
      depthOrBiome: "Pendiente continental profunda afótica",
      paleoZoneDescription: "Filtro arbustivo multi-capa optimizado para absorber corrientes ricas en materia orgánica suspendida."
    },
    paleoCoordinates: { lat: 52.7, lon: -1.2 }
  },
  {
    id: "thectardis-avalonensis",
    commonName: "Thectardis",
    scientificName: "Thectardis avalonensis",
    clade: "Vendobionta incertae sedis",
    periodId: "ediacarico",
    startMa: 575,
    endMa: 560,
    diet: "Filtrador",
    metrics: { lengthMeters: 0.16, weightTons: 0.0001, heightMeters: 0.15 },
    paleoLocation: ["Mistaken Point (Terranova, Canadá)"],
    description: "Organismo sésil de silueta triangular cónica invertida hueca. Formaba colonias orientadas con notable precisión según las corrientes de fondo que barrían los valles abisales de Terranova.",
    media: { imageUrl: "assets/species/thectardis.svg", imageAuthor: "Astra Scientific Paleontology", imageLicense: "Creative Commons" },
    coordinates: { lat: 46.6, lng: -53.2 },
    environment: "marine",
    discovery: {
      discoverer: "Clapham, Narbonne & Gehling",
      yearDiscovered: 2004,
      describedBy: "Clapham, Narbonne & Gehling (2004)",
      geologicalFormation: "Formación Mistaken Point (Terranova, Canadá)",
      typeSpecimen: "ROM 57111",
      museum: "Royal Ontario Museum",
      modernCountry: "Canadá",
      holotypeSpecimen: "ROM 57111"
    },
    paleogeography: {
      waterBody: "Cuenca abisal de Avalonia",
      landmass: "Avalonia",
      depthOrBiome: "Fondo marino profundo cubierto de cenizas volcánicas periódicas",
      paleoZoneDescription: "Filtro de copa cónica vertical que aprovechaba el efecto Venturi del agua circundante."
    },
    paleoCoordinates: { lat: 46.6, lon: -53.2 }
  },
  {
    id: "cyanorus-singularis",
    commonName: "Cyanorus",
    scientificName: "Cyanorus singularis",
    clade: "Bilateria (Proarticulata basal)",
    periodId: "ediacarico",
    startMa: 558,
    endMa: 550,
    diet: "Filtrador",
    metrics: { lengthMeters: 0.04, weightTons: 0.00001, heightMeters: 0.01 },
    paleoLocation: ["Mar Blanco (Rusia)"],
    description: "Pequeño organismo bilateral ovoide con un conspicuo surco axial medio y lóbulos laterales divergentes. Ofrece pistas esenciales sobre la transición hacia la cefalización y motilidad en los animales primitivos.",
    media: { imageUrl: "assets/species/cyanorus.svg", imageAuthor: "Astra Scientific Paleontology", imageLicense: "Creative Commons" },
    coordinates: { lat: 64.9, lng: 40.2 },
    environment: "marine",
    discovery: {
      discoverer: "Andrey Ivantsov",
      yearDiscovered: 2007,
      describedBy: "Ivantsov (2007)",
      geologicalFormation: "Formación Ust-Pinega (Mar Blanco, Rusia)",
      typeSpecimen: "PIN 3993/5400",
      museum: "Instituto Paleontológico de Moscú",
      modernCountry: "Rusia",
      holotypeSpecimen: "PIN 3993/5400"
    },
    paleogeography: {
      waterBody: "Mares someros de Baltica",
      landmass: "Baltica",
      depthOrBiome: "Llanuras fangosas ricas en tapetes microbianos",
      paleoZoneDescription: "Explorador bentónico de los microambientes marinos anteriores a la explosión cámbrica."
    },
    paleoCoordinates: { lat: 64.9, lon: 40.2 }
  },

  // ==========================================
  // 2. ERA PALEOZOICA (9 especies)
  // ==========================================
  {
    id: "hallucigenia-sparsa",
    commonName: "Hallucigenia",
    scientificName: "Hallucigenia sparsa",
    clade: "Lobopodia (Xenusia / Panarthropoda)",
    periodId: "cambrico",
    startMa: 518,
    endMa: 505,
    diet: "Carnívoro",
    metrics: { lengthMeters: 0.05, weightTons: 0.00002, heightMeters: 0.02 },
    paleoLocation: ["Burgess Shale (Columbia Británica, Canadá)", "Esquistos de Maotianshan (Chengjiang, China)"],
    description: "Famoso lobópodo cámbrico acorazado con 7 pares de largas espinas dorsales protectoras y 7 pares de patas con garras terminales. Su extraña morfología desconcertó a los científicos durante décadas hasta descifrar cuál extremo era su cabeza.",
    media: { imageUrl: "assets/species/hallucigenia.svg", imageAuthor: "Astra Scientific Paleontology", imageLicense: "Creative Commons" },
    coordinates: { lat: 51.4, lng: -116.5 },
    environment: "marine",
    discovery: {
      discoverer: "Charles Walcott",
      yearDiscovered: 1911,
      describedBy: "Simon Conway Morris (1977)",
      geologicalFormation: "Esquistos de Burgess (Columbia Británica, Canadá)",
      typeSpecimen: "USNM 57684",
      museum: "Smithsonian National Museum of Natural History",
      modernCountry: "Canadá y China",
      holotypeSpecimen: "USNM 57684"
    },
    paleogeography: {
      waterBody: "Océano Pantalasa / Mar de Laurentia",
      landmass: "Margen continental tropical de Laurentia",
      depthOrBiome: "Fondos fangosos bajo la escarpa de carbonato de Cathedral",
      paleoZoneDescription: "Carroñero y cazador bentónico que caminaba sobre el fango armado contra superdepredadores como Anomalocaris."
    },
    paleoCoordinates: { lat: 51.4, lon: -116.5 }
  },
  {
    id: "isotelus-rex",
    commonName: "Isotelus Rex",
    scientificName: "Isotelus rex",
    clade: "Arthropoda (Trilobita / Asaphida)",
    periodId: "ordovicico",
    startMa: 450,
    endMa: 445,
    diet: "Carnívoro",
    metrics: { lengthMeters: 0.72, weightTons: 0.015, heightMeters: 0.15 },
    paleoLocation: ["Churchill (Manitoba, Canadá)", "Ontario", "Ohio (EE. UU.)"],
    description: "El trilobite más grande documentado en todo el registro fósil del planeta Tierra, superando los 70 centímetros de longitud. Depredador bentónico de aguas someras provisto de un exoesqueleto liso y ojos compuestos prominentes.",
    media: { imageUrl: "assets/species/isotelus.svg", imageAuthor: "Astra Scientific Paleontology", imageLicense: "Creative Commons" },
    coordinates: { lat: 57.0, lng: -92.5 },
    environment: "marine",
    discovery: {
      discoverer: "Dave Rudkin et al.",
      yearDiscovered: 1999,
      describedBy: "Rudkin, Young, Elias & Dobrzanski (2003)",
      geologicalFormation: "Formación Churchill River (Manitoba, Canadá)",
      typeSpecimen: "MM I-3248",
      museum: "Manitoba Museum (Winnipeg, Canadá)",
      modernCountry: "Canadá",
      holotypeSpecimen: "MM I-3248"
    },
    paleogeography: {
      waterBody: "Mar interior cálido ecuatorial de Laurentia",
      landmass: "Cratón norteamericano de Laurentia",
      depthOrBiome: "Lagunas costeras tropicales y bancos lodosos",
      paleoZoneDescription: "Cazador ápice de invertebrados marinos de cuerpo blando en los fondos del Ordovícico superior."
    },
    paleoCoordinates: { lat: 57.0, lon: -92.5 }
  },
  {
    id: "sacabambaspis-janvieri",
    commonName: "Sacabambaspis",
    scientificName: "Sacabambaspis janvieri",
    clade: "Vertebrata (Pteraspidomorphi / Arandaspida)",
    periodId: "ordovicico",
    startMa: 470,
    endMa: 455,
    diet: "Filtrador",
    metrics: { lengthMeters: 0.28, weightTons: 0.0003, heightMeters: 0.08 },
    paleoLocation: ["Sacabamba (Cochabamba, Bolivia)", "Argentina", "Australia"],
    description: "Pez agnato ancestral icónico del supercontinente Gondwana. Poseía un caparazón óseo dorsal y ventral y ojos con fosas nasales frontales que le conferían un aspecto inconfundible. Nadaba propulsado por una aleta caudal membranosa sin mandíbulas.",
    media: { imageUrl: "assets/species/sacabambaspis.svg", imageAuthor: "Astra Scientific Paleontology", imageLicense: "Creative Commons" },
    coordinates: { lat: -17.8, lng: -65.7 },
    environment: "marine",
    discovery: {
      discoverer: "Philippe Janvier & Rodrigo",
      yearDiscovered: 1986,
      describedBy: "Gagnier, Blieck & Rodrigo (1986)",
      geologicalFormation: "Formación Anzaldo (Cochabamba, Bolivia)",
      typeSpecimen: "MHNC 1001",
      museum: "Museo de Historia Natural Alcide d'Orbigny (Cochabamba)",
      modernCountry: "Bolivia",
      holotypeSpecimen: "MHNC 1001"
    },
    paleogeography: {
      waterBody: "Mar pericontinental frío de Gondwana occidental",
      landmass: "Plataforma sudamericana de Gondwana",
      depthOrBiome: "Bahías marinas someras y deltas mareales",
      paleoZoneDescription: "Filtrador de succión que nadaba en cardúmenes sobre fondos marinos someros cerca del polo sur ordovícico."
    },
    paleoCoordinates: { lat: -17.8, lon: -65.7 }
  },
  {
    id: "pterygotus-anglicus",
    commonName: "Pterygotus",
    scientificName: "Pterygotus anglicus",
    clade: "Chelicerata (Eurypterida / Pterygotidae)",
    periodId: "silurico",
    startMa: 428,
    endMa: 410,
    diet: "Carnívoro",
    metrics: { lengthMeters: 2.1, weightTons: 0.08, heightMeters: 0.35 },
    paleoLocation: ["Angus y Carmyllie (Escocia)", "Inglaterra", "Alemania"],
    description: "Euriptérido marino de talla colosal que alcanzaba más de 2 metros de longitud. Poseía quelíceros agrandados en pinzas aserradas capaces de triturar presas y grandes patas remeras para impulsarse a gran velocidad.",
    media: { imageUrl: "assets/species/pterygotus.svg", imageAuthor: "Astra Scientific Paleontology", imageLicense: "Creative Commons" },
    coordinates: { lat: 56.6, lng: -2.8 },
    environment: "marine",
    discovery: {
      discoverer: "Louis Agassiz",
      yearDiscovered: 1839,
      describedBy: "Louis Agassiz (1839)",
      geologicalFormation: "Old Red Sandstone (Carmyllie, Escocia)",
      typeSpecimen: "NHMUK ORS-PA",
      museum: "Natural History Museum de Londres",
      modernCountry: "Reino Unido",
      holotypeSpecimen: "NHMUK ORS-PA"
    },
    paleogeography: {
      waterBody: "Mar de Tetis silúrico / Cuencas de Euramérica",
      landmass: "Continente de las Viejas Areniscas Rojas (Laurasia)",
      depthOrBiome: "Estuarios marinos, lagunas costeras y mares epicontinentales",
      paleoZoneDescription: "Superdepredador nectónico de pinzas prensiles que cazaba peces acorazados primitivos."
    },
    paleoCoordinates: { lat: 56.6, lon: -2.8 }
  },
  {
    id: "materpiscis-attenboroughi",
    commonName: "Materpiscis",
    scientificName: "Materpiscis attenboroughi",
    clade: "Placodermi (Ptyctodontida)",
    periodId: "devonico",
    startMa: 385,
    endMa: 375,
    diet: "Carnívoro",
    metrics: { lengthMeters: 0.28, weightTons: 0.0006, heightMeters: 0.12 },
    paleoLocation: ["Formación Gogo (Kimberley, Australia Occidental)"],
    description: "Fósil extraordinario de placodermo descubierto con un embrión no nacido y un cordón umbilical mineralizado en su interior. Es la prueba de reproducción vivípara interna y cuidado materno más antigua conocida entre los vertebrados.",
    media: { imageUrl: "assets/species/materpiscis.svg", imageAuthor: "Astra Scientific Paleontology", imageLicense: "Creative Commons" },
    coordinates: { lat: -18.6, lng: 125.8 },
    environment: "marine",
    discovery: {
      discoverer: "John Long et al.",
      yearDiscovered: 2005,
      describedBy: "Long, Trinajstic, Young & Senden (2008)",
      geologicalFormation: "Formación Gogo (Australia Occidental)",
      typeSpecimen: "WAM 07.12.1",
      museum: "Western Australian Museum (Perth)",
      modernCountry: "Australia",
      holotypeSpecimen: "WAM 07.12.1"
    },
    paleogeography: {
      waterBody: "Arrecife de coral y estromatoporoides de Canning Basin",
      landmass: "Noroeste de Gondwana",
      depthOrBiome: "Arrecifes marinos tropicales de aguas cálidas y prístinas",
      paleoZoneDescription: "Placodermo durofago dotado de placas dentales para triturar moluscos y briozoos de arrecife."
    },
    paleoCoordinates: { lat: -18.6, lon: 125.8 }
  },
  {
    id: "stethacanthus-altonensis",
    commonName: "Stethacanthus",
    scientificName: "Stethacanthus altonensis",
    clade: "Chondrichthyes (Symmoriida)",
    periodId: "carbonifero",
    startMa: 370,
    endMa: 355,
    diet: "Piscívoro",
    metrics: { lengthMeters: 1.0, weightTons: 0.02, heightMeters: 0.35 },
    paleoLocation: ["Bearsden (Escocia)", "Illinois (EE. UU.)", "Montana"],
    description: "Tiburón ancestral con una insólita estructura en su aleta dorsal con forma de 'yunque' o 'cepillo de cerdas denticulares', complementada con un parche espinoso en la parte superior del cráneo utilizado probablemente para cortejo o intimidación.",
    media: { imageUrl: "assets/species/stethacanthus.svg", imageAuthor: "Astra Scientific Paleontology", imageLicense: "Creative Commons" },
    coordinates: { lat: 55.9, lng: -4.3 },
    environment: "marine",
    discovery: {
      discoverer: "John Newberry",
      yearDiscovered: 1889,
      describedBy: "Newberry (1889)",
      geologicalFormation: "Caliza de Bearsden / Formación Heath (Escocia y EE. UU.)",
      typeSpecimen: "AMNH 1889-SA",
      museum: "American Museum of Natural History (Nueva York)",
      modernCountry: "Reino Unido y EE. UU.",
      holotypeSpecimen: "AMNH 1889-SA"
    },
    paleogeography: {
      waterBody: "Mares de carbón someros de Euramérica",
      landmass: "Ecuador de Pangea en formación",
      depthOrBiome: "Litoral costero de aguas cálidas poco profundas",
      paleoZoneDescription: "Cazador ágil de peces y cefalópodos en los ecosistemas marinos del Carbonífero temprano."
    },
    paleoCoordinates: { lat: 55.9, lon: -4.3 }
  },
  {
    id: "diplocaulus-magnicornis",
    commonName: "Diplocaulus",
    scientificName: "Diplocaulus magnicornis",
    clade: "Amphibia / Lepospondyli",
    periodId: "permico",
    startMa: 299,
    endMa: 270,
    diet: "Carnívoro",
    metrics: { lengthMeters: 1.3, weightTons: 0.015, heightMeters: 0.18 },
    paleoLocation: ["Texas y Oklahoma (EE. UU.)", "Marruecos"],
    description: "Anfibio lepospóndilo famoso por su descomunal cráneo con cuernos tabulares laterales que le daban forma de bumerán. Esta morfología actuaba como hidroala dinámica para impulsarse verticalmente en el agua y emboscar presas.",
    media: { imageUrl: "assets/species/diplocaulus.svg", imageAuthor: "Astra Scientific Paleontology", imageLicense: "Creative Commons" },
    coordinates: { lat: 33.6, lng: -98.6 },
    environment: "amphibious",
    discovery: {
      discoverer: "Edward Drinker Cope",
      yearDiscovered: 1877,
      describedBy: "Edward Drinker Cope (1877)",
      geologicalFormation: "Lechos Rojos de Texas (Grupo Clear Fork, EE. UU.)",
      typeSpecimen: "AMNH 4470",
      museum: "American Museum of Natural History",
      modernCountry: "Estados Unidos",
      holotypeSpecimen: "AMNH 4470"
    },
    paleogeography: {
      waterBody: "Sistemas fluviales de meandros y pantanos tropicales",
      landmass: "Zona ecuatorial de Laurasia",
      depthOrBiome: "Ríos lentos, meandros abandonados y lagos de llanura aluvial",
      paleoZoneDescription: "Depredador bentónico semiacuático que acechaba peces escondido en el fondo fangoso."
    },
    paleoCoordinates: { lat: 33.6, lon: -98.6 }
  },
  {
    id: "hylonomus-lyelli",
    commonName: "Hylonomus",
    scientificName: "Hylonomus lyelli",
    clade: "Reptilia (Eureptilia basal)",
    periodId: "carbonifero",
    startMa: 315,
    endMa: 310,
    diet: "Insectívoro",
    metrics: { lengthMeters: 0.25, weightTons: 0.0003, heightMeters: 0.05 },
    paleoLocation: ["Acantilados fósiles de Joggins (Nueva Escocia, Canadá)"],
    description: "El reptil amniota verdadero más antiguo confirmado por el registro fósil. Sus huevos con cáscara protectora le permitieron independizarse completamente del agua para reproducirse, marcando un antes y un después en la conquista terrestre.",
    media: { imageUrl: "assets/species/hylonomus.svg", imageAuthor: "Astra Scientific Paleontology", imageLicense: "Creative Commons" },
    coordinates: { lat: 45.7, lng: -64.4 },
    environment: "terrestrial",
    discovery: {
      discoverer: "John William Dawson",
      yearDiscovered: 1852,
      describedBy: "John William Dawson (1860)",
      geologicalFormation: "Formación Joggins (Nueva Escocia, Canadá)",
      typeSpecimen: "BMNH R.4168",
      museum: "Redpath Museum (Montreal, Canadá)",
      modernCountry: "Canadá",
      holotypeSpecimen: "BMNH R.4168"
    },
    paleogeography: {
      waterBody: "Deltas fluviales y marismas de carbón",
      landmass: "Euramérica ecuatorial",
      depthOrBiome: "Bosques pantanosos tropicales de licopodios gigantes (Sigillaria)",
      paleoZoneDescription: "Cazador ágil de artrópodos e insectos primitivos que anidaba en los tocones huecos de árboles fósiles."
    },
    paleoCoordinates: { lat: 45.7, lon: -64.4 }
  },
  {
    id: "helicoprion-bessonowi",
    commonName: "Helicoprion",
    scientificName: "Helicoprion bessonowi",
    clade: "Chondrichthyes (Eugeneodontida)",
    periodId: "permico",
    startMa: 290,
    endMa: 270,
    diet: "Piscívoro",
    metrics: { lengthMeters: 7.5, weightTons: 1.8, heightMeters: 1.4 },
    paleoLocation: ["Krasnoufimsk (Montes Urales, Rusia)", "Idaho (EE. UU.)", "Australia"],
    description: "Pez cartilaginoso dotado de una espiral dental única en el reino animal: una sierra circular integrada en la sínfisis mandibular inferior que conservaba todos los dientes producidos a lo largo de su vida para cortar cefalópodos de cuerpo blando.",
    media: { imageUrl: "assets/species/helicoprion.svg", imageAuthor: "Astra Scientific Paleontology", imageLicense: "Creative Commons" },
    coordinates: { lat: 57.8, lng: 56.9 },
    environment: "marine",
    discovery: {
      discoverer: "Alexander Karpinsky",
      yearDiscovered: 1899,
      describedBy: "Alexander Karpinsky (1899)",
      geologicalFormation: "Artinskiense de Krasnoufimsk (Rusia)",
      typeSpecimen: "CNIGR 1899-HB",
      museum: "Museo Central Geológico de San Petersburgo",
      modernCountry: "Rusia y EE. UU.",
      holotypeSpecimen: "CNIGR 1899-HB"
    },
    paleogeography: {
      waterBody: "Océano Panthalassa y Océano Uraliano",
      landmass: "Margen de Pangea oriental",
      depthOrBiome: "Aguas marinas pelágicas abiertas de profundidad media",
      paleoZoneDescription: "Depredador pelágico especializado en capturar ammonites y belemnites con su espiral dentaria."
    },
    paleoCoordinates: { lat: 57.8, lon: 56.9 }
  },

  // ==========================================
  // 3. ERA MESOZOICA (4 especies)
  // ==========================================
  {
    id: "shonisaurus-popularis",
    commonName: "Shonisaurio",
    scientificName: "Shonisaurus popularis",
    clade: "Ichthyosauria (Shastasauridae)",
    periodId: "triasico",
    startMa: 220,
    endMa: 212,
    diet: "Piscívoro",
    metrics: { lengthMeters: 15.0, weightTons: 30.0, heightMeters: 3.5 },
    paleoLocation: ["Nevada (EE. UU.)"],
    description: "Ictiosaurio gigante del Triásico superior con un cuerpo abarrilado macizo, aletas alargadas y mandíbulas desdentadas en adultos aptas para la alimentación por succión de cefalópodos en mares abiertos.",
    media: { imageUrl: "assets/species/shonisaurus.svg", imageAuthor: "Astra Scientific Paleontology", imageLicense: "Creative Commons" },
    coordinates: { lat: 38.9, lng: -117.5 },
    environment: "marine",
    discovery: {
      discoverer: "Charles Camp",
      yearDiscovered: 1954,
      describedBy: "Camp (1976)",
      geologicalFormation: "Formación Luning (Berlin-Ichthyosaur State Park, Nevada)",
      typeSpecimen: "UCMP 56000",
      museum: "University of California Museum of Paleontology (Berkeley)",
      modernCountry: "Estados Unidos",
      holotypeSpecimen: "UCMP 56000"
    },
    paleogeography: {
      waterBody: "Océano Pantalasa oriental",
      landmass: "Margen occidental de Pangea",
      depthOrBiome: "Mares abiertos profundos y cuencas de antearco",
      paleoZoneDescription: "Titán marino oceánico gregario que migraba a lo largo de las costas de América del Norte."
    },
    paleoCoordinates: { lat: 38.9, lon: -117.5 }
  },
  {
    id: "liopleurodon-ferox",
    commonName: "Liopleurodonte",
    scientificName: "Liopleurodon ferox",
    clade: "Plesiosauria (Pliosauridae)",
    periodId: "jurasico",
    startMa: 162,
    endMa: 155,
    diet: "Carnívoro",
    metrics: { lengthMeters: 6.5, weightTons: 3.5, heightMeters: 1.8 },
    paleoLocation: ["Peterborough (Inglaterra)", "Francia", "Rusia"],
    description: "Temible pliosaurio hipercarnívoro con un cráneo robusto de hasta 1.5 metros dotado de colmillos convergentes cortantes y cuatro aletas hidrodinámicas de aceleración fulgurante bajo el agua.",
    media: { imageUrl: "assets/species/liopleurodon.jpg", imageAuthor: "Astra Scientific Paleontology", imageLicense: "Creative Commons" },
    coordinates: { lat: 52.4, lng: -0.2 },
    environment: "marine",
    discovery: {
      discoverer: "H.E. Sauvage",
      yearDiscovered: 1873,
      describedBy: "Sauvage (1873)",
      geologicalFormation: "Oxford Clay (Peterborough, Inglaterra)",
      typeSpecimen: "MNHN 1873",
      museum: "Natural History Museum de Londres",
      modernCountry: "Reino Unido y Francia",
      holotypeSpecimen: "MNHN 1873"
    },
    paleogeography: {
      waterBody: "Mar de Oxford Clay / Mar epicontinental de Tetis",
      landmass: "Archipiélago insular europeo",
      depthOrBiome: "Mares someros y templados de plataforma continental",
      paleoZoneDescription: "Superdepredador ápice marino que cazaba ictiosaurios, plesiosaurios de cuello largo y peces de gran talla."
    },
    paleoCoordinates: { lat: 52.4, lon: -0.2 }
  },
  {
    id: "carnotaurus-sastrei",
    commonName: "Carnotauro",
    scientificName: "Carnotaurus sastrei",
    clade: "Dinosauria (Theropoda / Abelisauridae)",
    periodId: "cretacico",
    startMa: 72,
    endMa: 69,
    diet: "Carnívoro",
    metrics: { lengthMeters: 8.0, weightTons: 1.8, heightMeters: 3.0 },
    paleoLocation: ["Chubut (Patagonia Argentina)"],
    description: "«Toro carnívoro»: terópodo ápice sudamericano caracterizado por dos gruesos cuernos frontales sobre los ojos, brazos extremadamente reducidos y una musculatura caudal (m. caudofemoralis longus) colosal que lo convertía en uno de los corredores más veloces del Cretácico.",
    media: { imageUrl: "assets/species/carnotaurus.svg", imageAuthor: "Astra Scientific Paleontology", imageLicense: "Creative Commons" },
    coordinates: { lat: -43.5, lng: -69.0 },
    environment: "terrestrial",
    discovery: {
      discoverer: "José Bonaparte",
      yearDiscovered: 1984,
      describedBy: "José Bonaparte (1985)",
      geologicalFormation: "Formación La Colonia (Bajada Moreno, Chubut)",
      typeSpecimen: "MACN-CH 894",
      museum: "Museo Argentino de Ciencias Naturales Bernardino Rivadavia",
      modernCountry: "Argentina",
      holotypeSpecimen: "MACN-CH 894"
    },
    paleogeography: {
      waterBody: "Sistemas de ríos meándricos y llanuras de marea estuarinas",
      landmass: "Gondwana austral (Sudamérica insular)",
      depthOrBiome: "Bosques templados húmedos, sabanas fluviales y humedales costeros",
      paleoZoneDescription: "Depredador corredor de persecución veloz especializado en la caza de saurópodos y ornitópodos medianos."
    },
    paleoCoordinates: { lat: -43.5, lon: -69.0 }
  },
  {
    id: "deinonychus-antirrhopus",
    commonName: "Deinonico",
    scientificName: "Deinonychus antirrhopus",
    clade: "Dinosauria (Theropoda / Dromaeosauridae)",
    periodId: "cretacico",
    startMa: 115,
    endMa: 108,
    diet: "Carnívoro",
    metrics: { lengthMeters: 3.4, weightTons: 0.08, heightMeters: 1.2 },
    paleoLocation: ["Montana, Wyoming y Oklahoma (EE. UU.)"],
    description: "El dinosaurio que desató el «Renacimiento de los Dinosaurios» impulsado por John Ostrom en 1969. Ágil cazador bípedo emplumado con una garra falciforme hipertrófica retráctil en el segundo dedo del pie y una cola rígida con tendones osificados como balancín.",
    media: { imageUrl: "assets/species/deinonychus.svg", imageAuthor: "Astra Scientific Paleontology", imageLicense: "Creative Commons" },
    coordinates: { lat: 45.1, lng: -108.4 },
    environment: "terrestrial",
    discovery: {
      discoverer: "John Ostrom",
      yearDiscovered: 1964,
      describedBy: "John Ostrom (1969)",
      geologicalFormation: "Formación Cloverly (Montana, EE. UU.)",
      typeSpecimen: "YPM 5205",
      museum: "Yale Peabody Museum (New Haven, EE. UU.)",
      modernCountry: "Estados Unidos",
      holotypeSpecimen: "YPM 5205"
    },
    paleogeography: {
      waterBody: "Llanuras de inundación de ríos trenzados",
      landmass: "América del Norte temprana",
      depthOrBiome: "Bosques templados, llanuras aluviales y pantanos",
      paleoZoneDescription: "Cazador activo y gregario que cimentó la teoría moderna de que las aves descienden directamente de terópodos."
    },
    paleoCoordinates: { lat: 45.1, lon: -108.4 }
  },

  // ==========================================
  // 4. ERA CENOZOICA (8 especies)
  // ==========================================
  {
    id: "gastornis-parisiensis",
    commonName: "Gastornis",
    scientificName: "Gastornis parisiensis",
    clade: "Aves (Anserimorphae / Gastornithidae)",
    periodId: "paleogeno",
    startMa: 56,
    endMa: 45,
    diet: "Herbívoro",
    metrics: { lengthMeters: 2.0, weightTons: 0.16, heightMeters: 2.0 },
    paleoLocation: ["Meudon y Cuenca de París (Francia)", "Alemania", "Wyoming (EE. UU.)"],
    description: "Ave colosal no voladora que habitó los frondosos bosques del Eoceno europeo. Aunque inicialmente se la creía carnívora, los análisis isotópicos de calcio en su esqueleto demostraron que su descomunal pico triturador era usado para abrir semillas leñosas y nueces duras.",
    media: { imageUrl: "assets/species/gastornis.jpg", imageAuthor: "Astra Scientific Paleontology", imageLicense: "Creative Commons" },
    coordinates: { lat: 48.9, lng: 2.4 },
    environment: "terrestrial",
    discovery: {
      discoverer: "Gaston de Lambertye",
      yearDiscovered: 1855,
      describedBy: "Hébert (1855)",
      geologicalFormation: "Conglomerado de Meudon (Francia)",
      typeSpecimen: "MNHN 1855",
      museum: "Muséum National d'Histoire Naturelle (París)",
      modernCountry: "Francia y Alemania",
      holotypeSpecimen: "MNHN 1855"
    },
    paleogeography: {
      waterBody: "Ríos y lagos de la Cuenca de París",
      landmass: "Archipiélago europeo eocénico",
      depthOrBiome: "Selvas tropicales densas y húmedas del Óptimo Climático del Eoceno",
      paleoZoneDescription: "Megafugívoro y ramoneador de sotobosque dominante antes de la expansión de los grandes mamíferos ungulados."
    },
    paleoCoordinates: { lat: 48.9, lon: 2.4 }
  },
  {
    id: "andrewsarchus-mongoliensis",
    commonName: "Andrewsarchus",
    scientificName: "Andrewsarchus mongoliensis",
    clade: "Mammalia (Artiodactyla / Cetancodontamorpha)",
    periodId: "paleogeno",
    startMa: 48,
    endMa: 41,
    diet: "Carnívoro",
    metrics: { lengthMeters: 4.0, weightTons: 1.0, heightMeters: 1.8 },
    paleoLocation: ["Desierto de Gobi (Mongolia Interior, China)"],
    description: "El mayor mamífero carnívoro terrestre del Paleógeno. Su cráneo fósil mide nada menos que 83 centímetros de largo, provisto de molares trituradores capaces de partir caparazones de tortugas y triturar huesos de grandes animales.",
    media: { imageUrl: "assets/species/andrewsarchus.svg", imageAuthor: "Astra Scientific Paleontology", imageLicense: "Creative Commons" },
    coordinates: { lat: 43.8, lng: 111.9 },
    environment: "terrestrial",
    discovery: {
      discoverer: "Kan Chuen Pao (Expedición de Roy Chapman Andrews)",
      yearDiscovered: 1923,
      describedBy: "Henry Fairfield Osborn (1924)",
      geologicalFormation: "Formación Irdin Manha (Mongolia Interior)",
      typeSpecimen: "AMNH 20135",
      museum: "American Museum of Natural History (Nueva York)",
      modernCountry: "China y Mongolia",
      holotypeSpecimen: "AMNH 20135"
    },
    paleogeography: {
      waterBody: "Grandes sistemas lacustres y deltas fluviales de Asia central",
      landmass: "Continente asiático",
      depthOrBiome: "Llanuras costeras semiáridas y matorrales densos",
      paleoZoneDescription: "Depredador carroñero ápice que dominaba las orillas de los lagos del Eoceno asiático."
    },
    paleoCoordinates: { lat: 43.8, lon: 111.9 }
  },
  {
    id: "phorusrhacos-longissimus",
    commonName: "Forusraco",
    scientificName: "Phorusrhacos longissimus",
    clade: "Aves (Cariamiformes / Phorusrhacidae)",
    periodId: "neogeno",
    startMa: 20,
    endMa: 13,
    diet: "Carnívoro",
    metrics: { lengthMeters: 2.5, weightTons: 0.15, heightMeters: 2.5 },
    paleoLocation: ["Formación Santa Cruz (Patagonia Argentina)"],
    description: "«Ave del terror» emblemática de Sudamérica: superdepredador de 2.5 metros de altura con un pico curvado masivo de 60 cm y alas con garras vestigiales. Descendía su pico como un hacha para quebrar cráneos de notoungulados y roedores gigantes.",
    media: { imageUrl: "assets/species/phorusrhacos.svg", imageAuthor: "Astra Scientific Paleontology", imageLicense: "Creative Commons" },
    coordinates: { lat: -49.3, lng: -67.7 },
    environment: "terrestrial",
    discovery: {
      discoverer: "Carlos Ameghino",
      yearDiscovered: 1887,
      describedBy: "Florentino Ameghino (1887)",
      geologicalFormation: "Formación Santa Cruz (Patagonia)",
      typeSpecimen: "MACN-A 5225",
      museum: "Museo Argentino de Ciencias Naturales (Buenos Aires)",
      modernCountry: "Argentina",
      holotypeSpecimen: "MACN-A 5225"
    },
    paleogeography: {
      waterBody: "Cuencas estuáricas del Atlántico sur",
      landmass: "Sudamérica aislada (continente-isla)",
      depthOrBiome: "Estepas templadas de gramíneas y bosques de araucarias",
      paleoZoneDescription: "Superdepredador bípedo que ocupó el nicho ecológico de los terópodos tras el aislamiento patagónico."
    },
    paleoCoordinates: { lat: -49.3, lon: -67.7 }
  },
  {
    id: "livyatan-melvillei",
    commonName: "Leviatán",
    scientificName: "Livyatan melvillei",
    clade: "Mammalia (Cetacea / Physeteroidea)",
    periodId: "neogeno",
    startMa: 10.0,
    endMa: 8.9,
    diet: "Carnívoro",
    metrics: { lengthMeters: 16.0, weightTons: 50.0, heightMeters: 4.0 },
    paleoLocation: ["Desierto de Pisco (Ica, Perú)"],
    description: "Colosal cachalote depredador macrorraptorial que convivió y rivalizó con el Megalodón en el Mioceno. Poseía los dientes funcionales más grandes del reino animal (36 cm de longitud y 12 cm de diámetro), con los que despedazaba ballenas barbadas.",
    media: { imageUrl: "assets/species/livyatan.svg", imageAuthor: "Astra Scientific Paleontology", imageLicense: "Creative Commons" },
    coordinates: { lat: -14.1, lng: -75.7 },
    environment: "marine",
    discovery: {
      discoverer: "Klaas Post & Mario Urbina",
      yearDiscovered: 2008,
      describedBy: "Lambert et al. (2010)",
      geologicalFormation: "Formación Pisco (Cerro Colorado, Ica, Perú)",
      typeSpecimen: "MUSM 1676",
      museum: "Museo de Historia Natural de la UNMSM (Lima, Perú)",
      modernCountry: "Perú",
      holotypeSpecimen: "MUSM 1676"
    },
    paleogeography: {
      waterBody: "Océano Pacífico suroriental costero",
      landmass: "Margen pacífico de Sudamérica",
      depthOrBiome: "Cuencas de surgencia ricas en nutrientes de la proto-Corriente de Humboldt",
      paleoZoneDescription: "Superdepredador oceánico ápice de mordida destructiva especializado en mamíferos marinos."
    },
    paleoCoordinates: { lat: -14.1, lon: -75.7 }
  },
  {
    id: "thylacosmilus-atrox",
    commonName: "Thylacosmilus",
    scientificName: "Thylacosmilus atrox",
    clade: "Metatheria (Sparassodonta / Thylacosmilidae)",
    periodId: "neogeno",
    startMa: 9.0,
    endMa: 3.0,
    diet: "Carnívoro",
    metrics: { lengthMeters: 1.5, weightTons: 0.1, heightMeters: 0.8 },
    paleoLocation: ["San Luis, La Pampa y Catamarca (Argentina)"],
    description: "Dientes de sable marsupial sudamericano: extraordinario caso de evolución convergente con Smilodon. Sus colmillos en sable eran de raíz abierta y crecimiento continuo, protegidos por dos vainas óseas mandibulares alargadas.",
    media: { imageUrl: "assets/species/thylacosmilus.svg", imageAuthor: "Astra Scientific Paleontology", imageLicense: "Creative Commons" },
    coordinates: { lat: -33.3, lng: -66.3 },
    environment: "terrestrial",
    discovery: {
      discoverer: "Elmer S. Riggs",
      yearDiscovered: 1926,
      describedBy: "Riggs (1933)",
      geologicalFormation: "Formación Huayquerías (San Luis y Catamarca)",
      typeSpecimen: "FMNH P14531",
      museum: "Field Museum of Natural History (Chicago, EE. UU.)",
      modernCountry: "Argentina",
      holotypeSpecimen: "FMNH P14531"
    },
    paleogeography: {
      waterBody: "Cuencas fluviales andinas",
      landmass: "Sudamérica pre-intercambio biótico",
      depthOrBiome: "Pastizales semiáridos, matorrales y sabanas abiertas",
      paleoZoneDescription: "Especialista en asestar puñaladas profundas en la yugular y tráquea de sus presas."
    },
    paleoCoordinates: { lat: -33.3, lon: -66.3 }
  },
  {
    id: "argentavis-magnificens",
    commonName: "Argentavis",
    scientificName: "Argentavis magnificens",
    clade: "Aves (Cathartiformes / Teratornithidae)",
    periodId: "neogeno",
    startMa: 6.8,
    endMa: 6.0,
    diet: "Carnívoro",
    metrics: { lengthMeters: 3.5, weightTons: 0.072, heightMeters: 1.7 },
    paleoLocation: ["Formación Cerro Azul (La Pampa, Argentina)"],
    description: "Una de las mayores aves voladoras de la historia del planeta: con 7 metros de envergadura alar y un peso de más de 70 kg. Planeaba aprovechando las corrientes térmicas ascendentes sobre las vastas llanuras pampeanas del Mioceno.",
    media: { imageUrl: "assets/species/argentavis.svg", imageAuthor: "Astra Scientific Paleontology", imageLicense: "Creative Commons" },
    coordinates: { lat: -36.6, lng: -64.3 },
    environment: "aerial",
    discovery: {
      discoverer: "Rosendo Pascual et al.",
      yearDiscovered: 1979,
      describedBy: "Campbell & Tonni (1980)",
      geologicalFormation: "Formación Cerro Azul (La Pampa, Argentina)",
      typeSpecimen: "MLP 65-VII-29-1",
      museum: "Museo de La Plata (Argentina)",
      modernCountry: "Argentina",
      holotypeSpecimen: "MLP 65-VII-29-1"
    },
    paleogeography: {
      waterBody: "Ríos y lagunas endorreicas pampeanas",
      landmass: "Cono Sur de Sudamérica",
      depthOrBiome: "Grandes llanuras abiertas y matorrales esteparios",
      paleoZoneDescription: "Planeador gigantesco de térmicas que dominaba el espacio aéreo del Mioceno tardío."
    },
    paleoCoordinates: { lat: -36.6, lon: -64.3 }
  },
  {
    id: "australopithecus-afarensis",
    commonName: "Australopiteco",
    scientificName: "Australopithecus afarensis",
    clade: "Mammalia (Primates / Hominidae)",
    periodId: "neogeno",
    startMa: 3.9,
    endMa: 2.9,
    diet: "Omnívoro",
    metrics: { lengthMeters: 1.3, weightTons: 0.045, heightMeters: 1.3 },
    paleoLocation: ["Hadar (Depresión de Afar, Etiopía)", "Laetoli (Tanzania)"],
    description: "Hominino clave de nuestra línea evolutiva, célebre por el esqueleto casi completo de 'Lucy'. Caminaba erguido de forma bípeda habitual sobre dos extremidades, con una capacidad craneal de ~400 cc y manos con destreza prensil.",
    media: { imageUrl: "assets/species/australopithecus.svg", imageAuthor: "Astra Scientific Paleontology", imageLicense: "Creative Commons" },
    coordinates: { lat: 11.1, lng: 40.6 },
    environment: "terrestrial",
    discovery: {
      discoverer: "Donald Johanson & Tom Gray",
      yearDiscovered: 1974,
      describedBy: "Johanson, White & Coppens (1978)",
      geologicalFormation: "Formación Hadar (Afar, Etiopía)",
      typeSpecimen: "AL 288-1 ('Lucy')",
      museum: "Museo Nacional de Etiopía (Adís Abeba)",
      modernCountry: "Etiopía y Tanzania",
      holotypeSpecimen: "AL 288-1"
    },
    paleogeography: {
      waterBody: "Cuenca lacustre de Hadar y Río Awash ancestral",
      landmass: "Valle del Rift africano",
      depthOrBiome: "Sabanas mosaico, bosques de galería y pastizales abiertos",
      paleoZoneDescription: "Bípedo recolector y explorador que marcó el nacimiento de la marcha bípeda humana."
    },
    paleoCoordinates: { lat: 11.1, lon: 40.6 }
  },
  {
    id: "homo-neanderthalensis",
    commonName: "Hombre de Neandertal",
    scientificName: "Homo neanderthalensis",
    clade: "Mammalia (Primates / Hominidae / Hominini)",
    periodId: "pleistoceno",
    startMa: 0.4,
    endMa: 0.04,
    diet: "Carnívoro",
    metrics: { lengthMeters: 1.65, weightTons: 0.08, heightMeters: 1.65 },
    paleoLocation: ["Valle de Neander (Alemania)", "Atapuerca (España)", "Cueva de Shanidar (Irak)", "Francia"],
    description: "Humano adaptado de manera formidable a los rigores de la Edad de Hielo euroasiática. De complexión robusta, tórax en barril y volumen encefálico de 1,500 cc (superior al humano actual). Dominaba el fuego, manufacturaba herramientas de piedra musterienses y practicaba ritos funerarios.",
    media: { imageUrl: "assets/species/homo_neanderthalensis.svg", imageAuthor: "Astra Scientific Paleontology", imageLicense: "Creative Commons" },
    coordinates: { lat: 51.2, lng: 6.9 },
    environment: "terrestrial",
    discovery: {
      discoverer: "Johann Carl Fuhlrott",
      yearDiscovered: 1856,
      describedBy: "William King (1864)",
      geologicalFormation: "Cueva de Feldhofer (Valle de Neander, Alemania)",
      typeSpecimen: "Neanderthal 1",
      museum: "Rheinisches Landesmuseum Bonn",
      modernCountry: "Alemania, España, Francia, Italia e Irak",
      holotypeSpecimen: "Neanderthal 1"
    },
    paleogeography: {
      waterBody: "Valles fluviales del Rin y Danubio periglaciales",
      landmass: "Eurasia periglacial",
      depthOrBiome: "Tundra glacial, estepa de mamuts y bosques boreales",
      paleoZoneDescription: "Cazador social cooperativo de megafauna (mamuts, renos y bisontes) y recolector vegetal."
    },
    paleoCoordinates: { lat: 51.2, lon: 6.9 }
  }
];

// Add unique species
let added = 0;
newSpecies.forEach(sp => {
  const exists = fauna.some(f => f.id === sp.id || f.scientificName.toLowerCase() === sp.scientificName.toLowerCase());
  if (!exists) {
    fauna.push(sp);
    added++;
  } else {
    console.log('Already exists, skipped:', sp.id);
  }
});

console.log('Successfully added', added, 'new species.');
console.log('New total fauna count:', fauna.length);

fs.writeFileSync(faunaPath, JSON.stringify(fauna, null, 2), 'utf8');
fs.writeFileSync(srcFaunaPath, JSON.stringify(fauna, null, 2), 'utf8');

console.log('Successfully updated public and src fauna.json!');
