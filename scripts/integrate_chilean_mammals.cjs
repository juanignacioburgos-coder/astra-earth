const fs = require('fs');
const path = require('path');

const chileanMammals = [
  {
    id: "chilecebus-carrascoensis",
    commonName: "Chilecebus",
    scientificName: "Chilecebus carrascoensis",
    clade: "Primates • Platyrrhini • Cebidae Basal",
    periodId: "miocene_20ma",
    startMa: 20.5,
    endMa: 19.8,
    diet: "Frugívoro / Herbívoro",
    metrics: {
      lengthMeters: 0.45,
      weightTons: 0.0012,
      heightMeters: 0.25
    },
    paleoLocation: [
      "Chile 🇨🇱",
      "Región del Libertador General Bernardo O'Higgins",
      "Provincia de Colchagua (Termas del Flaco, Valle del Río Tinguiririca)",
      "Formación Abanico"
    ],
    description: "El primer mono fósil del orden Platyrrhini descubierto en Chile y uno de los primates fósiles más antiguos y mejor preservados de toda Sudamérica. Su cráneo holotípico preserva de manera única los moldes endocraniales del cerebro y los canales semicirculares del oído interno (estudiados mediante tomografía computarizada de alta resolución por Ni et al. 2010, 2019), demostrando que la encefalización en los ancestros de los monos del Nuevo Mundo ocurrió de forma independiente y que ya habitaban exuberantes bosques andinos templados hace 20 millones de años.",
    media: {
      imageUrl: "assets/species/chilecebus.jpg",
      imageAuthor: "Reconstrucción Paleontológica Oficial Chilena / O'Higgins",
      imageLicense: "Creative Commons Reconocimiento Paleontológico",
      phylopicSvgUrl: ""
    },
    coordinates: {
      lat: -34.95,
      lng: -70.43
    },
    environment: "terrestrial",
    discovery: {
      discoverer: "John Flynn, André Wyss, Reynaldo Charrier y Carl Swisher (1995)",
      yearDiscovered: 1995,
      describedBy: "Flynn, Wyss, Charrier & Swisher (Nature, 1995)",
      geologicalFormation: "Formación Abanico (Mioceno Temprano)",
      typeSpecimen: "SGOPV 3213 (Cráneo casi completo con dentición superior)",
      museum: "Museo Nacional de Historia Natural de Chile (Santiago) / AMNH",
      modernCountry: "Chile 🇨🇱 (Región de O'Higgins)",
      holotypeSpecimen: "SGOPV 3213"
    },
    paleogeography: {
      waterBody: "Sin cuenca marina directa (Valles andinos intramontanos)",
      landmass: "Gondwana sudoccidental (Provincias volcánicas andinas de Chile central)",
      depthOrBiome: "Bosques templados montanos húmedos con coníferas australes, Nothofagus y laureles",
      paleoZoneDescription: "Ambientes boscosos andinos premontañosos del Mioceno Temprano de Chile central."
    },
    paleoCoordinates: {
      lat: -36.5,
      lon: -68.8
    },
    isChilean: true,
    chileanRegion: "Región de O'Higgins",
    chileanProvince: "Provincia de Colchagua",
    chileanLocality: "Termas del Flaco, Valle de Tinguiririca"
  },
  {
    id: "magallanodon-baikashkenke",
    commonName: "Magallanodon",
    scientificName: "Magallanodon baikashkenke",
    clade: "Mammalia • Gondwanatheria • Ferugliotheriidae",
    periodId: "cretaceous_66ma",
    startMa: 75,
    endMa: 72,
    diet: "Herbívoro",
    metrics: {
      lengthMeters: 0.6,
      weightTons: 0.005,
      heightMeters: 0.22
    },
    paleoLocation: [
      "Chile 🇨🇱",
      "Región de Magallanes y de la Antártica Chilena",
      "Provincia de Última Esperanza (Valle del Río de las Chinas, Cerro Guido)",
      "Formación Dorotea"
    ],
    description: "El mamífero de la 'Era de los Dinosaurios' más grande descubierto en Chile y el más austral del planeta. Con una masa estimada de hasta 5 kg (similar a un coipo moderno), este extraordinario gondwanaterio poseía molares hipsodontes con profundas crestas de esmalte para masticar vegetación dura y helechos. Convivió en los deltas y bosques magallánicos del fin del Cretácico con grandes titanosaurios, el anquilosaurio Stegouros y el pico de pato Gonkoken.",
    media: {
      imageUrl: "assets/species/magallanodon.jpg",
      imageAuthor: "Red Paleontológica Universidad de Chile / Magallanes",
      imageLicense: "Creative Commons Reconocimiento Paleontológico",
      phylopicSvgUrl: ""
    },
    coordinates: {
      lat: -51.32,
      lng: -72.33
    },
    environment: "terrestrial",
    discovery: {
      discoverer: "Francisco Goin, Agustín Martinelli, Sergio Soto-Acuña, Alexander Vargas et al. (2020)",
      yearDiscovered: 2020,
      describedBy: "Goin, Martinelli, Soto-Acuña, Vargas et al. (Boletín MNHN, 2020)",
      geologicalFormation: "Formación Dorotea (Campaniense - Maastrichtiense)",
      typeSpecimen: "CPAP-3189 (Molares inferiores y superiores con dentición molariforme)",
      museum: "Colección Paleontológica de la Universidad de Magallanes / U. de Chile",
      modernCountry: "Chile 🇨🇱 (Región de Magallanes)",
      holotypeSpecimen: "CPAP-3189"
    },
    paleogeography: {
      waterBody: "Océano Austral primitivo / Mar de Weddell somero",
      landmass: "Gondwana austral (Conexión Patagonia-Antártida)",
      depthOrBiome: "Bosques templados lluviosos australes con ríos meándricos y coníferas",
      paleoZoneDescription: "Ecosistemas ribereños y estuarios fluviales del Cretácico Tardío más austral de América."
    },
    paleoCoordinates: {
      lat: -61.8,
      lon: -64.1
    },
    isChilean: true,
    chileanRegion: "Región de Magallanes y Antártica Chilena",
    chileanProvince: "Provincia de Última Esperanza",
    chileanLocality: "Valle de las Chinas, Cerro Guido"
  },
  {
    id: "notiomastodon-platensis",
    commonName: "Gonfoterio Chileno",
    scientificName: "Notiomastodon platensis",
    clade: "Mammalia • Proboscidea • Gomphotheriidae",
    periodId: "present_0ma",
    startMa: 0.035,
    endMa: 0.011,
    diet: "Herbívoro",
    metrics: {
      lengthMeters: 4.8,
      weightTons: 5.0,
      heightMeters: 2.7
    },
    paleoLocation: [
      "Chile 🇨🇱",
      "Región de O'Higgins (Tagua Tagua) y Región de Los Lagos (Pilauco, Osorno)",
      "Provincia de Cachapoal / Provincia de Osorno",
      "Yacimientos Laguna de Tagua Tagua y Sitio Paleontológico Pilauco"
    ],
    description: "El proboscidio fósil por excelencia de Chile y el titán de la megafauna pleistocénica nacional (anteriormente clasificado de forma errónea como Stegomastodon o Mastodon andium). Con defensas de marfil espiraladas y molares trilofodontes robustos, estaba adaptado tanto al pastoreo como al ramoneo de vegetación palustre. Los yacimientos chilenos de Tagua Tagua (O'Higgins), Pilauco (Osorno) y Quereo (Coquimbo) han preservado esqueletos casi intactos junto a herramientas líticas humanas, evidenciando cacería y faenamiento por los primeros cazadores-recolectores paleoindios hace más de 12.000 años.",
    media: {
      imageUrl: "assets/species/notiomastodon.jpg",
      imageAuthor: "Museo Pleistocénico de Osorno / MELT Tagua Tagua / MNHN Chile",
      imageLicense: "Creative Commons Reconocimiento Paleontológico",
      phylopicSvgUrl: ""
    },
    coordinates: {
      lat: -34.52,
      lng: -71.18
    },
    environment: "terrestrial",
    discovery: {
      discoverer: "Rodolfo Philippi (1887), Daniel Frassinetti & María Teresa Alberdi (2000, 2005), Rafael Labarca (2016, 2020), Mario Pino",
      yearDiscovered: 1887,
      describedBy: "Florentino Ameghino (1888) / Redescrito para Chile por Labarca et al. (2016, 2020)",
      geologicalFormation: "Depósitos Lacustres Pleistocénicos de Tagua Tagua y Pilauco",
      typeSpecimen: "Múltiples cráneos completos, mandíbulas y esqueletos postcraneales articulados",
      museum: "Museo Nacional de Historia Natural de Chile (Santiago) / Museo de Pilauco (Osorno)",
      modernCountry: "Chile 🇨🇱 (Región de O'Higgins y Región de Los Lagos)",
      holotypeSpecimen: "Taguatagua 1 / Pilauco MNP"
    },
    paleogeography: {
      waterBody: "Cuenca lacustre endorreica de Tagua Tagua / Valle fluvial de Osorno",
      landmass: "América del Sur (Valle Central y Depresión Intermedia Chilena)",
      depthOrBiome: "Lagos y humedales templados rodeados de estepas herbáceas y bosques de Nothofagus",
      paleoZoneDescription: "Ambientes lacustres y de turbera del Pleistoceno Tardío de Chile centro-sur."
    },
    paleoCoordinates: {
      lat: -34.52,
      lon: -71.18
    },
    isChilean: true,
    chileanRegion: "Región de O'Higgins / Región de Los Lagos",
    chileanProvince: "Provincia de Cachapoal / Provincia de Osorno",
    chileanLocality: "Laguna de Tagua Tagua y Pilauco (Osorno)"
  },
  {
    id: "thalassocnus-sp",
    commonName: "Perezoso Acuático de Bahía Inglesa",
    scientificName: "Thalassocnus sp.",
    clade: "Mammalia • Xenarthra • Nothrotheriidae / Megatherioidea",
    periodId: "miocene_20ma",
    startMa: 7.5,
    endMa: 5.3,
    diet: "Herbívoro (Algas marinas / Pastos marinos)",
    metrics: {
      lengthMeters: 2.5,
      weightTons: 0.12,
      heightMeters: 0.8
    },
    paleoLocation: [
      "Chile 🇨🇱",
      "Región de Atacama",
      "Provincia de Copiapó (Bahía Inglesa, Comuna de Caldera)",
      "Formación Bahía Inglesa"
    ],
    description: "Sorprendente perezoso marino que adaptó su fisiología a la vida acuática en las costas del Pacífico sudoccidental. Para bucear eficientemente en busca de alimento desarrolló huesos densos y pesados (paquiosteosclerosis) que funcionaban como cinturón de lastre natural contra la flotabilidad. Su hocico ancho y aplanado le permitía pastar densas praderas de algas marinas bentónicas en los fondos someros de Bahía Inglesa, anclándose a las rocas submarinas con sus poderosas garras curvadas.",
    media: {
      imageUrl: "assets/species/thalassocnus.jpg",
      imageAuthor: "Red Paleontológica Bahía Inglesa / MNHN Chile",
      imageLicense: "Creative Commons Reconocimiento Paleontológico",
      phylopicSvgUrl: ""
    },
    coordinates: {
      lat: -27.12,
      lng: -70.88
    },
    environment: "marine",
    discovery: {
      discoverer: "Christian de Muizon, Jhoann Canto (2008), Peralta-Prato & Solórzano (2019)",
      yearDiscovered: 2008,
      describedBy: "Canto et al. (2008) / Peralta-Prato & Solórzano (Andean Geology, 2019)",
      geologicalFormation: "Formación Bahía Inglesa (Miembro Mina Fosforita)",
      typeSpecimen: "SGO.PV. 1133 (Mandíbula y fragmentos postcraneales con hiperostosis)",
      museum: "Museo Nacional de Historia Natural de Chile (Santiago)",
      modernCountry: "Chile 🇨🇱 (Región de Atacama)",
      holotypeSpecimen: "SGO.PV. 1133"
    },
    paleogeography: {
      waterBody: "Océano Pacífico Suroriental (Proto-corriente de Humboldt)",
      landmass: "Borde costero pacífico de Gondwana occidental / Chile septentrional",
      depthOrBiome: "Bahías protegidas marinas someras y praderas submarinas de macroalgas",
      paleoZoneDescription: "Ambientes costeros marinos someros del Mioceno Tardío de Caldera, Atacama."
    },
    paleoCoordinates: {
      lat: -28.0,
      lon: -71.5
    },
    isChilean: true,
    chileanRegion: "Región de Atacama",
    chileanProvince: "Provincia de Copiapó",
    chileanLocality: "Bahía Inglesa, Caldera"
  },
  {
    id: "piscophoca-pacifica",
    commonName: "Foca Fósil de Bahía Inglesa",
    scientificName: "Piscophoca pacifica",
    clade: "Mammalia • Carnivora • Pinnipedia • Phocidae (Monachinae)",
    periodId: "miocene_20ma",
    startMa: 7.0,
    endMa: 4.5,
    diet: "Piscívoro / Carnívoro marino",
    metrics: {
      lengthMeters: 1.8,
      weightTons: 0.15,
      heightMeters: 0.5
    },
    paleoLocation: [
      "Chile 🇨🇱",
      "Región de Atacama",
      "Provincia de Copiapó (Bahía Inglesa, Caldera)",
      "Formación Bahía Inglesa"
    ],
    description: "Foca fósil ancestral perteneciente a la subfamilia Monachinae que habitó la costa del desierto de Atacama durante el Neógeno. Dotada de extremidades completamente transformadas en aletas hidrodinámicas y una dentición especializada para atrapar peces y cefalópodos en aguas abiertas. El registro chileno documentado por Walsh & Naish (2002) y Valenzuela-Toro et al. (2013, 2016) demuestra la gran diversidad y éxito evolutivo de los mamíferos marinos carnívoros en el Pacífico suroriental.",
    media: {
      imageUrl: "assets/species/piscophoca.jpg",
      imageAuthor: "Colección Paleontológica de Caldera / MNHN Chile",
      imageLicense: "Creative Commons Reconocimiento Paleontológico",
      phylopicSvgUrl: ""
    },
    coordinates: {
      lat: -27.10,
      lng: -70.92
    },
    environment: "marine",
    discovery: {
      discoverer: "Stig Walsh & Darren Naish (2002), Ana Valenzuela-Toro, Carolina Gutstein et al. (2013)",
      yearDiscovered: 2002,
      describedBy: "De Muizon (1981) / Primer registro chileno por Walsh & Naish (2002)",
      geologicalFormation: "Formación Bahía Inglesa (Mioceno Tardío - Plioceno)",
      typeSpecimen: "Restos craneales y mandibulares articulados con fosa glenoidea típica",
      museum: "Museo Paleontológico de Caldera / Museo Nacional de Historia Natural de Chile",
      modernCountry: "Chile 🇨🇱 (Región de Atacama)",
      holotypeSpecimen: "MPC-Bahía Inglesa"
    },
    paleogeography: {
      waterBody: "Océano Pacífico Suroriental (Surgencia costera rica en nutrientes)",
      landmass: "Costa árida y archipiélagos costeros de Atacama",
      depthOrBiome: "Zona nerítica costera y rompientes rocosas ricas en fauna ictícola",
      paleoZoneDescription: "Costas y arrecifes someros del Neógeno en la Región de Atacama."
    },
    paleoCoordinates: {
      lat: -28.1,
      lon: -71.6
    },
    isChilean: true,
    chileanRegion: "Región de Atacama",
    chileanProvince: "Provincia de Copiapó",
    chileanLocality: "Bahía Inglesa, Caldera"
  },
  {
    id: "macrauchenia-patachonica",
    commonName: "Macrauquenia",
    scientificName: "Macrauchenia patachonica",
    clade: "Mammalia • Panperissodactyla • Litopterna • Macraucheniidae",
    periodId: "present_0ma",
    startMa: 0.12,
    endMa: 0.01,
    diet: "Herbívoro",
    metrics: {
      lengthMeters: 3.0,
      weightTons: 1.0,
      heightMeters: 1.8
    },
    paleoLocation: [
      "Chile 🇨🇱",
      "Región de Antofagasta (Cuenca de Calama) y Región de Magallanes (Cueva del Milodón)",
      "Provincia de El Loa / Provincia de Última Esperanza",
      "Formación Chiu-Chiu y Depósitos Fuego-Patagónicos"
    ],
    description: "Uno de los ungulados nativos sudamericanos más singulares y representativos del Cenozoico chileno. Poseía tres dedos en cada pata (extremidades tridáctilas perisodáctilas) y una abertura nasal ubicada arriba en el cráneo, directamente entre las cuencas oculares, lo que indica la posesión de una trompa móvil o probóscide prensil para seleccionar follaje. En Chile sus fósiles destacan tanto en los paleo-oasis de la Cuenca del Río Loa en Calama (estudiados por Gelfo et al. 2021) como en los yacimientos periglaciares de Magallanes (Cueva del Milodón y Laguna Sofía).",
    media: {
      imageUrl: "assets/species/macrauchenia.jpg",
      imageAuthor: "Museo de Historia Natural del Desierto de Atacama / MNHN Chile",
      imageLicense: "Creative Commons Reconocimiento Paleontológico",
      phylopicSvgUrl: ""
    },
    coordinates: {
      lat: -22.45,
      lng: -68.92
    },
    environment: "terrestrial",
    discovery: {
      discoverer: "Charles Darwin (1834), Richard Owen (1838), Javier Gelfo et al. (Calama, 2021)",
      yearDiscovered: 1838,
      describedBy: "Richard Owen (1838) / Revisión chilena por Gelfo, Flores-Aqueveque et al. (2021)",
      geologicalFormation: "Formación Chiu-Chiu (Calama) / Depósitos de Cueva del Milodón",
      typeSpecimen: "Esqueletos craneales y extremidades articuladas",
      museum: "Museo de Historia Natural y Cultural del Desierto de Atacama (Calama) / MNHN",
      modernCountry: "Chile 🇨🇱 (Región de Antofagasta y Magallanes)",
      holotypeSpecimen: "MNHN-Calama / SGO.PV"
    },
    paleogeography: {
      waterBody: "Cuenca del paleo-río Loa / Paleolagos glaciares de Última Esperanza",
      landmass: "América del Sur (Zona andina septentrional y estepa patagónica)",
      depthOrBiome: "Oasis fluviales desérticos en el norte y estepas frías abiertas en el sur",
      paleoZoneDescription: "Planicies aluviales y estepas periglaciares del Pleistoceno Tardío chileno."
    },
    paleoCoordinates: {
      lat: -23.0,
      lon: -69.2
    },
    isChilean: true,
    chileanRegion: "Región de Antofagasta y Región de Magallanes",
    chileanProvince: "Provincia de El Loa / Provincia de Última Esperanza",
    chileanLocality: "Cuenca de Calama y Cueva del Milodón"
  }
];

// 1. Update public/data/fauna.json and src/data/fauna.json
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
  for (const newSp of chileanMammals) {
    const idx = fauna.findIndex(s => s.id === newSp.id);
    if (idx === -1) {
      fauna.push(newSp);
      added++;
    } else {
      fauna[idx] = newSp; // update
    }
  }
  
  fs.writeFileSync(filePath, JSON.stringify(fauna, null, 2), 'utf8');
  console.log(`Updated ${filePath}: added/updated ${added} Chilean mammal species. Total species now: ${fauna.length}`);
}

// 2. Update public/data/fauna_flora.json
const ffPath = path.join(__dirname, '..', 'public', 'data', 'fauna_flora.json');
if (fs.existsSync(ffPath)) {
  const rawFF = fs.readFileSync(ffPath, 'utf8');
  const ff = JSON.parse(rawFF);
  if (ff.periods) {
    for (const sp of chileanMammals) {
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
    console.log(`Updated ${ffPath} with Chilean mammal species.`);
  }
}
