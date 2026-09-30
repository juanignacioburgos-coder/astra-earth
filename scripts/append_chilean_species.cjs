const fs = require('fs');
const path = require('path');

const chileanFauna = [
  {
    id: "chilesaurus-diegosuarezi",
    commonName: "Chilesaurio",
    scientificName: "Chilesaurus diegosuarezi",
    clade: "Theropoda • Chilesauridae (Terópodo Herbívoro Basal)",
    periodId: "jurassic_150ma",
    startMa: 148,
    endMa: 145,
    diet: "Herbívoro",
    metrics: {
      lengthMeters: 3.2,
      weightTons: 0.2,
      heightMeters: 1.1
    },
    paleoLocation: [
      "Chile 🇨🇱",
      "Región de Aysén del General Carlos Ibáñez del Campo",
      "Provincia General Carrera (Mallín Grande, Lago General Carrera)",
      "Formación Toqui"
    ],
    description: "Conocido mundialmente como el 'ornitorrinco de los dinosaurios' y uno de los mayores enigmas evolutivos de la paleontología. A pesar de descender del linaje terópodo (el mismo grupo de depredadores que incluye al T-Rex), Chilesaurus evolucionó de manera asombrosa hacia una dieta 100% vegetariana: desarrolló un pico córneo, dientes foliares en espátula para cortar helechos y una pelvis modificada parecida a la de los ornitisquios. Descubierto en 2004 por el niño Diego Suárez (7 años), su descripción en la revista Nature redefinió la comprensión de la radiación temprana de los dinosaurios.",
    media: {
      imageUrl: "assets/species/chilesaurus.jpg",
      imageAuthor: "Reconstrucción Paleontológica Oficial Chilena / Aysén",
      imageLicense: "Creative Commons Reconocimiento Paleontológico",
      phylopicSvgUrl: ""
    },
    coordinates: {
      lat: -46.65,
      lng: -72.68
    },
    environment: "terrestrial",
    discovery: {
      discoverer: "Diego Suárez (7 años de edad, 2004)",
      yearDiscovered: 2004,
      describedBy: "Fernando Novas, Leonardo Salgado, Manuel Suárez et al. (Nature, 2015)",
      geologicalFormation: "Formación Toqui (Manto de calizas y tobas volcánicas)",
      typeSpecimen: "SGO-PV 1930 (Esqueleto casi completo articulado)",
      museum: "Museo Nacional de Historia Natural de Chile (Santiago)",
      modernCountry: "Chile 🇨🇱 (Región de Aysén)",
      holotypeSpecimen: "SGO-PV 1930"
    },
    paleogeography: {
      waterBody: "Sin drenaje marino directo (Cuenca intramontana fluvial)",
      landmass: "Suroeste de Gondwana (Patagonia jurásica andina)",
      depthOrBiome: "Valles fluviales volcánicos templados con bosques densos de Araucarias y helechos",
      paleoZoneDescription: "Ambientes ribereños y planicies aluviales volcánicas del Jurásico Superior patagónico chileno."
    },
    paleoCoordinates: {
      lat: -52.0,
      lon: -68.0
    },
    isChilean: true,
    chileanRegion: "Región de Aysén",
    chileanProvince: "Provincia General Carrera",
    chileanLocality: "Mallín Grande, Lago General Carrera"
  },
  {
    id: "stegouros-elengassen",
    commonName: "Stegouros",
    scientificName: "Stegouros elengassen",
    clade: "Ankylosauria • Parankylosauria",
    periodId: "cretaceous_66ma",
    startMa: 74,
    endMa: 72,
    diet: "Herbívoro",
    metrics: {
      lengthMeters: 2.0,
      weightTons: 0.15,
      heightMeters: 0.7
    },
    paleoLocation: [
      "Chile 🇨🇱",
      "Región de Magallanes y de la Antártica Chilena",
      "Provincia de Última Esperanza (Valle del Río de las Chinas)",
      "Formación Dorotea"
    ],
    description: "Sensacional dinosaurio acorazado patagónico que reveló un linaje enteramente nuevo de anquilosaurios de Gondwana: Parankylosauria. Posee un arma defensiva única jamás observada en ningún otro vertebrado fósil o viviente: un 'macuahuitl' caudal formado por 7 pares de placas óseas dérmicas fusionadas lateralmente como la mítica espada de obsidiana mesoamericana. Este blindaje le permitía protegerse de megarraptores en los deltas cretácicos más australes del planeta.",
    media: {
      imageUrl: "assets/species/stegouros.jpg",
      imageAuthor: "Red Paleontológica Universidad de Chile / Magallanes",
      imageLicense: "Creative Commons Reconocimiento Paleontológico",
      phylopicSvgUrl: ""
    },
    coordinates: {
      lat: -51.35,
      lng: -72.35
    },
    environment: "terrestrial",
    discovery: {
      discoverer: "Sergio Soto-Acuña, Alexander Vargas, Jonatan Kaluza et al. (2018)",
      yearDiscovered: 2018,
      describedBy: "Soto-Acuña et al. (Nature, diciembre 2021)",
      geologicalFormation: "Formación Dorotea (Campaniense - Maastrichtiense)",
      typeSpecimen: "CPAP-3165 (Esqueleto postcraneal articulado casi intacto con cola completa)",
      museum: "Colección Paleontológica de la Universidad de Magallanes / U. de Chile",
      modernCountry: "Chile 🇨🇱 (Región de Magallanes)",
      holotypeSpecimen: "CPAP-3165"
    },
    paleogeography: {
      waterBody: "Mar de Weddell ancestral / Océano Austral primitivo",
      landmass: "Gondwana austral (Bloque Patagónico-Antártico)",
      depthOrBiome: "Deltas fluviales meándricos templado-fríos dominados por Nothofagus y podocarpos",
      paleoZoneDescription: "Ambientes deltaicos y llanuras costeras subantárticas del extremo sur de Chile continental."
    },
    paleoCoordinates: {
      lat: -62.0,
      lon: -64.0
    },
    isChilean: true,
    chileanRegion: "Región de Magallanes y Antártica Chilena",
    chileanProvince: "Provincia de Última Esperanza",
    chileanLocality: "Valle del Río de las Chinas (cerca de Torres del Paine)"
  },
  {
    id: "pelagornis-chilensis",
    commonName: "Pelagornis Chileno",
    scientificName: "Pelagornis chilensis",
    clade: "Aves • Odontopterygiformes (Pelagornithidae)",
    periodId: "miocene_20ma",
    startMa: 9,
    endMa: 6,
    diet: "Piscívoro",
    metrics: {
      lengthMeters: 1.9,
      weightTons: 0.025,
      heightMeters: 1.2
    },
    paleoLocation: [
      "Chile 🇨🇱",
      "Región de Atacama",
      "Provincia de Copiapó / Comuna de Caldera (Bahía Inglesa)",
      "Formación Bahía Inglesa"
    ],
    description: "Una de las aves voladoras más gigantescas que surcaron el cielo en toda la historia de la biosfera, con una envergadura alar de 5.2 metros (más del doble que el albatros moderno). Sus mandíbulas estaban provistas de largas espinas óseas o 'pseudodientes' que brotaban del hueso premaxilar y mandibular, ideales para arponear calamares resbaladizos y peces en vuelo rasante sobre la ancestral Corriente de Humboldt. El holotipo chileno es el esqueleto de pelagornítido más completo y perfectamente preservado del planeta (70% del esqueleto articulado).",
    media: {
      imageUrl: "assets/species/pelagornis_chilensis.jpg",
      imageAuthor: "Museo Nacional de Historia Natural de Chile / Bahía Inglesa",
      imageLicense: "Creative Commons Reconocimiento Paleontológico",
      phylopicSvgUrl: ""
    },
    coordinates: {
      lat: -27.15,
      lng: -70.85
    },
    environment: "aerial",
    discovery: {
      discoverer: "David Rubilar-Rogers (MNHN) y Gerald Mayr (Senckenberg Museum)",
      yearDiscovered: 2005,
      describedBy: "Gerald Mayr & David Rubilar-Rogers (Journal of Vertebrate Paleontology, 2010)",
      geologicalFormation: "Formación Bahía Inglesa (Mioceno Tardío, Miembro Mina Fosforita)",
      typeSpecimen: "MNHN SGO-PV 1077 (Esqueleto tridimensional con cráneo casi completo)",
      museum: "Museo Nacional de Historia Natural de Chile (Santiago)",
      modernCountry: "Chile 🇨🇱 (Región de Atacama)",
      holotypeSpecimen: "MNHN SGO-PV 1077"
    },
    paleogeography: {
      waterBody: "Océano Pacífico Suroriental / Corriente de Humboldt Ancestral",
      landmass: "Borde costero del Desierto de Atacama en formación",
      depthOrBiome: "Ecosistema marino pelágico templado-cálido con altísima bioproductividad y surgencias marinas",
      paleoZoneDescription: "Mar litoral de Bahía Inglesa repleto de cetáceos fósiles, megalodones y colonias de aves marinas."
    },
    paleoCoordinates: {
      lat: -29.0,
      lon: -71.5
    },
    isChilean: true,
    chileanRegion: "Región de Atacama",
    chileanProvince: "Provincia de Copiapó",
    chileanLocality: "Bahía Inglesa, Caldera"
  },
  {
    id: "mylodon-darwini",
    commonName: "Milodón",
    scientificName: "Mylodon darwini",
    clade: "Xenarthra • Folivora (Mylodontidae)",
    periodId: "present_0ma",
    startMa: 0.8,
    endMa: 0.01,
    diet: "Herbívoro",
    metrics: {
      lengthMeters: 3.2,
      weightTons: 1.6,
      heightMeters: 1.8
    },
    paleoLocation: [
      "Chile 🇨🇱",
      "Región de Magallanes y de la Antártica Chilena",
      "Provincia de Última Esperanza (Monumento Natural Cueva del Milodón, Puerto Natales)",
      "Estepa y Bosques Patagónicos"
    ],
    description: "Ícono indiscutible de la paleontología chilena y la megafauna pleistocénica sudamericana. Este colosal perezoso terrestre alcanzaba los 3.2 metros de largo y pesaba más de tonelada y media. Su piel poseía una armadura interna de diminutos huesos esféricos dérmicos (osteodermos) formando una cota de malla invulnerable contra los colmillos del tigre dientes de sable (Smilodon) y la pantera patagónica. En 1895, el colono Hermann Eberhard encontró en la caverna magallánica trozos de piel momificada con pelaje rojizo-amarillento, garras y estiércol intactos, preservados por el clima frío y seco de la Patagonia.",
    media: {
      imageUrl: "assets/species/mylodon.jpg",
      imageAuthor: "Monumento Natural Cueva del Milodón / Magallanes",
      imageLicense: "Dominio Público / Colección Histórica Darwin",
      phylopicSvgUrl: ""
    },
    coordinates: {
      lat: -51.58,
      lng: -72.62
    },
    environment: "terrestrial",
    discovery: {
      discoverer: "Hermann Eberhard (1895, hallazgo del cuero momificado); Richard Owen (1839)",
      yearDiscovered: 1895,
      describedBy: "Richard Owen (1839, con fósiles recolectados por Charles Darwin en el HMS Beagle)",
      geologicalFormation: "Depósitos cavernícolas de la Cueva del Milodón (Último Máximo Glaciar)",
      typeSpecimen: "Holotipo BMNH M 16560; cuero y huesos en MNHN Chile y Natural History Museum de Londres",
      museum: "Museo Nacional de Historia Natural (Santiago) / Museo Británico (Londres)",
      modernCountry: "Chile 🇨🇱 (Región de Magallanes)",
      holotypeSpecimen: "BMNH M 16560"
    },
    paleogeography: {
      waterBody: "Canales patagónicos en deglaciación",
      landmass: "Patagonia austral magallánica",
      depthOrBiome: "Estepa fría periglacial abierta con parches de bosque templado caducifolio de Nothofagus",
      paleoZoneDescription: "Llanuras periglaciales y abrigos rocosos de Última Esperanza donde coexistió con los primeros cazadores-recolectores humanos."
    },
    paleoCoordinates: {
      lat: -51.8,
      lon: -72.8
    },
    isChilean: true,
    chileanRegion: "Región de Magallanes y Antártica Chilena",
    chileanProvince: "Provincia de Última Esperanza",
    chileanLocality: "Monumento Natural Cueva del Milodón, Puerto Natales"
  },
  {
    id: "arackar-licanantay",
    commonName: "Arackar",
    scientificName: "Arackar licanantay",
    clade: "Sauropoda • Titanosauria (Lithostrotia)",
    periodId: "cretaceous_66ma",
    startMa: 72,
    endMa: 68,
    diet: "Herbívoro",
    metrics: {
      lengthMeters: 6.3,
      weightTons: 3.5,
      heightMeters: 2.2
    },
    paleoLocation: [
      "Chile 🇨🇱",
      "Región de Atacama",
      "Provincia de Copiapó (Quebrada La Higuera, Formación Hornitos)",
      "Desierto de Atacama"
    ],
    description: "Saurópodo titanosaurio de tamaño mediano que habitó el norte de Chile a finales del Cretácico. Su nombre significa 'osamentas de los atacameños' en la lengua originaria kunza (licanantay). Poseía vértebras cervicales y dorsales con una estructura neumática sumamente ligera y una articulación reducida entre los arcos neurales que le conferían un cuello grácil y altamente maniobrable para ramonear copas de árboles en cuencas fluviales semiáridas.",
    media: {
      imageUrl: "assets/species/arackar.jpg",
      imageAuthor: "SERNAGEOMIN & Red Paleontológica Universidad de Chile",
      imageLicense: "Creative Commons Reconocimiento Paleontológico",
      phylopicSvgUrl: ""
    },
    coordinates: {
      lat: -27.85,
      lng: -70.25
    },
    environment: "terrestrial",
    discovery: {
      discoverer: "Carlos Arévalo (geólogo SERNAGEOMIN, 1993)",
      yearDiscovered: 1993,
      describedBy: "David Rubilar-Rogers, Alexander Vargas, Bernardo González-Riga et al. (Cretaceous Research, 2021)",
      geologicalFormation: "Formación Hornitos (Cretácico Superior)",
      typeSpecimen: "SGO-PV 261 (Vértebras cervicales, dorsales y huesos de extremidades)",
      museum: "Museo Nacional de Historia Natural de Chile (Santiago)",
      modernCountry: "Chile 🇨🇱 (Región de Atacama)",
      holotypeSpecimen: "SGO-PV 261"
    },
    paleogeography: {
      waterBody: "Lagos someros estacionales y ríos efímeros",
      landmass: "Margen occidental de Sudamérica proto-andina",
      depthOrBiome: "Llanuras fluviales aluviales semiáridas con coníferas y cicadáceas xerófitas",
      paleoZoneDescription: "Cuencas de sedimentación continental del proto-Desierto de Atacama previa al levantamiento de la alta cordillera."
    },
    paleoCoordinates: {
      lat: -30.5,
      lon: -70.0
    },
    isChilean: true,
    chileanRegion: "Región de Atacama",
    chileanProvince: "Provincia de Copiapó",
    chileanLocality: "Quebrada La Higuera (al sur de Copiapó)"
  },
  {
    id: "atacamatitan-chilensis",
    commonName: "Atacamatitán",
    scientificName: "Atacamatitan chilensis",
    clade: "Sauropoda • Titanosauria",
    periodId: "cretaceous_66ma",
    startMa: 78,
    endMa: 72,
    diet: "Herbívoro",
    metrics: {
      lengthMeters: 10.0,
      weightTons: 5.0,
      heightMeters: 3.5
    },
    paleoLocation: [
      "Chile 🇨🇱",
      "Región de Antofagasta",
      "Provincia de El Loa (Conchi Viejo, Calama)",
      "Formación Tolar"
    ],
    description: "El primer dinosaurio titanosaurio formalmente descrito y bautizado en territorio chileno continental. Con una longitud estimada en 10 metros, este robusto herbívoro cuadrúpedo dominaba los cursos de agua que cruzaban lo que hoy es el Desierto de Atacama. Sus fémures y vértebras caudales marcadamente procélicas revelan adaptaciones avanzadas para soportar peso en terrenos secos y recorrer largas distancias en busca de oasis de vegetación.",
    media: {
      imageUrl: "assets/species/atacamatitan.jpg",
      imageAuthor: "Museo Nacional de Historia Natural de Chile / Antofagasta",
      imageLicense: "Creative Commons Reconocimiento Paleontológico",
      phylopicSvgUrl: ""
    },
    coordinates: {
      lat: -22.35,
      lng: -69.05
    },
    environment: "terrestrial",
    discovery: {
      discoverer: "Expedición conjunta chileno-brasileña (2000)",
      yearDiscovered: 2000,
      describedBy: "Alexander Kellner, David Rubilar-Rogers, Alexander Vargas & Mario Suárez (2011)",
      geologicalFormation: "Formación Tolar (Cretácico Tardío)",
      typeSpecimen: "SGO-PV 961 (Fémur derecho, vértebras dorsales y caudales)",
      museum: "Museo Nacional de Historia Natural de Chile (Santiago)",
      modernCountry: "Chile 🇨🇱 (Región de Antofagasta)",
      holotypeSpecimen: "SGO-PV 961"
    },
    paleogeography: {
      waterBody: "Cuenca lacustre endorreica continental",
      landmass: "Sudamérica central cretácica",
      depthOrBiome: "Llanuras de inundación aluvial con bosques ripícolas y matorrales secos",
      paleoZoneDescription: "Valles sedimentarios intermontanos en la actual provincia de El Loa (Calama), norte grande de Chile."
    },
    paleoCoordinates: {
      lat: -24.5,
      lon: -68.5
    },
    isChilean: true,
    chileanRegion: "Región de Antofagasta",
    chileanProvince: "Provincia de El Loa",
    chileanLocality: "Conchi Viejo, Calama"
  },
  {
    id: "gonkoken-nanoi",
    commonName: "Gonkoken",
    scientificName: "Gonkoken nanoi",
    clade: "Ornithopoda • Hadrosauroidea Basal",
    periodId: "cretaceous_66ma",
    startMa: 73,
    endMa: 71,
    diet: "Herbívoro",
    metrics: {
      lengthMeters: 4.0,
      weightTons: 1.0,
      heightMeters: 1.6
    },
    paleoLocation: [
      "Chile 🇨🇱",
      "Región de Magallanes y de la Antártica Chilena",
      "Provincia de Última Esperanza (Valle del Río de las Chinas)",
      "Formación Dorotea"
    ],
    description: "Extraordinario dinosaurio pico de pato basal descubierto en el extremo sur de Chile. Su hallazgo en 2023 demostró que la Patagonia austral actuó como un 'refugio biogeográfico' para linajes primitivos de ornitópodos que habían desaparecido millones de años antes en Norteamérica y Asia. Su nombre honra la lengua de los pueblos originarios tehuelches (Aonikenk), donde 'gon' significa 'parecido a' y 'koken' significa 'cisne o pato silvestre', mientras que 'nanoi' homenajea al pionero magallánico Nano Lepe.",
    media: {
      imageUrl: "assets/species/gonkoken.jpg",
      imageAuthor: "Red Paleontológica Universidad de Chile / Magallanes",
      imageLicense: "Creative Commons Reconocimiento Paleontológico",
      phylopicSvgUrl: ""
    },
    coordinates: {
      lat: -51.30,
      lng: -72.30
    },
    environment: "terrestrial",
    discovery: {
      discoverer: "Jhonatan Alarcón-Muñoz, Alexander Vargas et al. (Red Paleontológica U. de Chile)",
      yearDiscovered: 2013,
      describedBy: "Alarcón-Muñoz, Vargas, Soto-Acuña et al. (Science Advances, junio 2023)",
      geologicalFormation: "Formación Dorotea (Maastrichtiense inferior)",
      typeSpecimen: "CPAP-3054 (Esqueleto desarticulado pero exhaustivo de múltiples individuos)",
      museum: "Colección Paleontológica de la Universidad de Magallanes (Punta Arenas)",
      modernCountry: "Chile 🇨🇱 (Región de Magallanes)",
      holotypeSpecimen: "CPAP-3054"
    },
    paleogeography: {
      waterBody: "Cuenca de Magallanes / Canal marino somero subantártico",
      landmass: "Gondwana terminal austral",
      depthOrBiome: "Bosques templados húmedos de coníferas australes, helechos arborescentes y Nothofagus",
      paleoZoneDescription: "Valles deltaicos y llanuras fluviales ricas en microclimas templados del sur de la Patagonia chilena."
    },
    paleoCoordinates: {
      lat: -61.5,
      lon: -64.2
    },
    isChilean: true,
    chileanRegion: "Región de Magallanes y Antártica Chilena",
    chileanProvince: "Provincia de Última Esperanza",
    chileanLocality: "Valle del Río de las Chinas, cerca de Torres del Paine"
  }
];

const faunaFiles = [
  path.join(__dirname, '..', 'public', 'data', 'fauna.json'),
  path.join(__dirname, '..', 'src', 'data', 'fauna.json')
];

for (const filePath of faunaFiles) {
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping non-existent ${filePath}`);
    continue;
  }
  const raw = fs.readFileSync(filePath, 'utf8');
  let fauna = JSON.parse(raw);
  
  let added = 0;
  for (const newSp of chileanFauna) {
    const idx = fauna.findIndex(s => s.id === newSp.id);
    if (idx === -1) {
      fauna.push(newSp);
      added++;
    } else {
      fauna[idx] = newSp; // update
    }
  }
  
  fs.writeFileSync(filePath, JSON.stringify(fauna, null, 2), 'utf8');
  console.log(`Updated ${filePath}: added/updated ${added} Chilean species. Total species now: ${fauna.length}`);
}

// Also update public/data/fauna_flora.json and src/data/fauna_flora.json if present
const ffPath = path.join(__dirname, '..', 'public', 'data', 'fauna_flora.json');
if (fs.existsSync(ffPath)) {
  const rawFF = fs.readFileSync(ffPath, 'utf8');
  const ff = JSON.parse(rawFF);
  if (ff.periods) {
    for (const sp of chileanFauna) {
      const p = ff.periods.find(p => p.id === sp.periodId);
      if (p) {
        if (!p.species) p.species = [];
        const existingIdx = p.species.findIndex(s => s.id === sp.id);
        const speciesBrief = {
          id: sp.id,
          name: sp.scientificName,
          commonName: sp.commonName,
          image: sp.media.imageUrl,
          group: sp.clade,
          diet: sp.diet,
          habitat: sp.environment === 'marine' ? 'Marino' : (sp.environment === 'aerial' ? 'Volador' : 'Terrestre'),
          length: `${sp.metrics.lengthMeters} m`,
          weight: sp.metrics.weightTons >= 1 ? `${sp.metrics.weightTons} t` : `${Math.round(sp.metrics.weightTons * 1000)} kg`,
          scaleVsHuman: `Espécimen fósil descubierto en ${sp.chileanRegion}, Chile.`,
          description: sp.description,
          lat: sp.coordinates.lat,
          lon: sp.coordinates.lng,
          fossilSite: sp.discovery.geologicalFormation + " (" + sp.chileanLocality + ", Chile)",
          distributionZone: sp.chileanRegion + ", Chile",
          zoneRadius: 1.5,
          isChilean: true,
          chileanRegion: sp.chileanRegion,
          chileanProvince: sp.chileanProvince
        };
        if (existingIdx === -1) {
          p.species.push(speciesBrief);
        } else {
          p.species[existingIdx] = speciesBrief;
        }
      }
    }
    fs.writeFileSync(ffPath, JSON.stringify(ff, null, 2), 'utf8');
    console.log(`Updated ${ffPath} with Chilean species.`);
  }
}
