const fs = require('fs');
const path = require('path');

const faunaList = [
  // ==========================================
  // CÁMBRICO (541 - 485 Ma)
  // ==========================================
  {
    id: "anomalocaris-canadensis",
    commonName: "Anomalocaris",
    scientificName: "Anomalocaris canadensis",
    clade: "Dinocaridida (Anomalocarididae)",
    periodId: "cambrico",
    startMa: 508.0,
    endMa: 497.0,
    diet: "Carnívoro",
    metrics: {
      lengthMeters: 1.0,
      weightTons: 0.004,
      heightMeters: 0.25
    },
    paleoLocation: ["Laurentia", "Columbia Británica (Canadá)", "Chengjiang (China)"],
    description: "Superdepredador ápice de los mares del Cámbrico dotado de dos apéndices prehensiles espinosos y ojos compuestos pedunculados formados por más de 16,000 lentes con visión estereoscópica. Su boca circular provista de placas dentadas trituraba trilobites e invertebrados de cuerpo blando.",
    media: {
      imageUrl: "assets/species/anomalocaris_mundo.jpg",
      imageAuthor: "Mundo Prehistórico / Katrina Kenny",
      imageLicense: "CC-BY-SA 4.0",
      phylopicSvgUrl: "https://images.phylopic.org/images/841fb002-c9a1-4328-86d7-ffb491fa9a5e/vector.svg"
    },
    coordinates: {
      lat: 51.40,
      lng: -116.50
    }
  },
  {
    id: "opabinia-regalis",
    commonName: "Opabinia",
    scientificName: "Opabinia regalis",
    clade: "Dinocaridida (Opabiniidae)",
    periodId: "cambrico",
    startMa: 508.0,
    endMa: 505.0,
    diet: "Carnívoro",
    metrics: {
      lengthMeters: 0.07,
      weightTons: 0.00002,
      heightMeters: 0.02
    },
    paleoLocation: ["Laurentia", "Burgess Shale (Canadá)"],
    description: "Enigmático artrópodo basal cámbrico con cinco ojos pedunculados que le conferían un campo de visión de 360 grados. En el frente de su cabeza poseía una probóscide flexible y extensible rematada en pinzas ganchudas con las que capturaba pequeñas presas entre los sedimentos marinos.",
    media: {
      imageUrl: "assets/species/opabinia.jpg",
      imageAuthor: "Nobu Tamura",
      imageLicense: "CC-BY 3.0",
      phylopicSvgUrl: "https://images.phylopic.org/images/95c3fb02-23c2-4a0b-9dfd-b06253bc0745/vector.svg"
    },
    coordinates: {
      lat: 51.41,
      lng: -116.51
    }
  },
  {
    id: "pikaia-gracilens",
    commonName: "Pikaia",
    scientificName: "Pikaia gracilens",
    clade: "Chordata (Cephalochordata basal)",
    periodId: "cambrico",
    startMa: 508.0,
    endMa: 505.0,
    diet: "Filtrador",
    metrics: {
      lengthMeters: 0.05,
      weightTons: 0.000005,
      heightMeters: 0.01
    },
    paleoLocation: ["Laurentia", "Burgess Shale (Canadá)"],
    description: "Uno de los primeros y más representativos antepasados de los vertebrados en el registro fósil. Presentaba una notocorda dorsal rígida precursora de la columna vertebral y miómeros musculares en forma de zigzag que le permitían ondular velozmente en el agua.",
    media: {
      imageUrl: "assets/species/pikaia.jpg",
      imageAuthor: "Nobu Tamura",
      imageLicense: "CC-BY-SA 3.0",
      phylopicSvgUrl: "https://images.phylopic.org/images/841fb002-c9a1-4328-86d7-ffb491fa9a5e/vector.svg"
    },
    coordinates: {
      lat: 51.42,
      lng: -116.49
    }
  },
  {
    id: "olenoides-serratus",
    commonName: "Trilobites Cámbrico",
    scientificName: "Olenoides serratus",
    clade: "Trilobita (Corynexochida)",
    periodId: "cambrico",
    startMa: 513.0,
    endMa: 500.0,
    diet: "Carnívoro",
    metrics: {
      lengthMeters: 0.10,
      weightTons: 0.00005,
      heightMeters: 0.03
    },
    paleoLocation: ["Laurentia", "Burgess Shale (Canadá)", "Utah (EE. UU.)"],
    description: "Trilobites cámbrico de exoesqueleto trilobulado calcificado con fuertes espinas marginales y patas birrámeas articuladas. Sus ojos compuestos de calcita cristalina bifocal representaron uno de los avances ópticos más tempranos de la evolución biológica marina.",
    media: {
      imageUrl: "assets/species/trilobites_mundo.jpg",
      imageAuthor: "Mundo Prehistórico / Sam Gon III",
      imageLicense: "CC-BY-SA 4.0"
    },
    coordinates: {
      lat: 51.45,
      lng: -116.48
    }
  },

  // ==========================================
  // ORDOVÍCICO (485 - 443 Ma)
  // ==========================================
  {
    id: "cameroceras-trentonense",
    commonName: "Cameroceras",
    scientificName: "Cameroceras trentonense",
    clade: "Cephalopoda (Endoceratidae)",
    periodId: "ordovicico",
    startMa: 470.0,
    endMa: 443.0,
    diet: "Carnívoro",
    metrics: {
      lengthMeters: 6.0,
      weightTons: 0.8,
      heightMeters: 0.9
    },
    paleoLocation: ["Laurentia", "Báltica", "Norteamérica y Escandinavia"],
    description: "Molusco cefalópodo con concha recta cónica de hasta 6 metros de longitud que dominó los mares poco profundos del Ordovícico. Como depredador de emboscada, capturaba trilobites y escorpiones marinos con sus fuertes tentáculos y trituraba sus corazas con un pico córneo.",
    media: {
      imageUrl: "assets/species/cameroceras.jpg",
      imageAuthor: "Nobu Tamura",
      imageLicense: "CC-BY-SA 3.0"
    },
    coordinates: {
      lat: 43.50,
      lng: -75.40
    }
  },

  // ==========================================
  // SILÚRICO (443 - 419 Ma)
  // ==========================================
  {
    id: "eurypterus-remipes",
    commonName: "Escorpión Marino",
    scientificName: "Eurypterus remipes",
    clade: "Chelicerata (Eurypterida)",
    periodId: "silurico",
    startMa: 432.0,
    endMa: 418.0,
    diet: "Carnívoro",
    metrics: {
      lengthMeters: 1.3,
      weightTons: 0.02,
      heightMeters: 0.2
    },
    paleoLocation: ["Laurentia", "Nueva York (EE. UU.)", "Báltica"],
    description: "Artrópodo quelicerado marino dotado de un par de patas modificadas en anchas palas natatorias y un telson caudal punzante. Fósil del estado de Nueva York, acechaba en lagunas salobres y arrecifes silúricos cazando peces basales y trilobites.",
    media: {
      imageUrl: "assets/species/eurypterus.jpg",
      imageAuthor: "Nobu Tamura",
      imageLicense: "CC-BY 3.0"
    },
    coordinates: {
      lat: 42.90,
      lng: -75.20
    }
  },
  {
    id: "prototaxites-loganii",
    commonName: "Prototaxites",
    scientificName: "Prototaxites loganii",
    clade: "Fungi / Ascomycota terrestre",
    periodId: "silurico",
    startMa: 430.0,
    endMa: 370.0,
    diet: "Filtrador",
    metrics: {
      lengthMeters: 8.0,
      weightTons: 1.5,
      heightMeters: 8.0
    },
    paleoLocation: ["Laurussia", "Gaspé (Canadá)", "Reino Unido", "Arabia"],
    description: "Colosal estructura biológica columnar que se alzaba hasta 8 metros sobre el suelo silúrico y devónico, siendo con diferencia el organismo terrestre más alto de su era. Los análisis isotópicos modernos sugieren que era un hongo masivo o un liquen gigante antes de la evolución de los árboles verdaderos.",
    media: {
      imageUrl: "assets/species/prototaxites.jpg",
      imageAuthor: "Antigravity PaleoArt Engine / Mary Parrish",
      imageLicense: "Public Domain"
    },
    coordinates: {
      lat: 48.83,
      lng: -64.48
    }
  },

  // ==========================================
  // DEVÓNICO (419 - 358 Ma)
  // ==========================================
  {
    id: "dunkleosteus-terrelli",
    commonName: "Dunkleósteo",
    scientificName: "Dunkleosteus terrelli",
    clade: "Placodermi (Arthrodira)",
    periodId: "devonico",
    startMa: 382.0,
    endMa: 358.0,
    diet: "Carnívoro",
    metrics: {
      lengthMeters: 8.8,
      weightTons: 4.0,
      heightMeters: 1.8
    },
    paleoLocation: ["Laurussia", "Ohio (EE. UU.)", "Marruecos", "Polonia"],
    description: "Pez acorazado placodermo colosal provisto de un blindaje óseo articulado en la cabeza y el tórax. Carecía de dientes verdaderos; en su lugar, poseía placas óseas afiladas y autoafilables con las que ejercía una fuerza de mordida de más de 5,000 N capaz de seccionar peces acorazados y tiburones primitivos.",
    media: {
      imageUrl: "assets/species/dunkleosteus.jpg",
      imageAuthor: "Nobu Tamura",
      imageLicense: "CC-BY-SA 3.0"
    },
    coordinates: {
      lat: 41.50,
      lng: -81.70
    }
  },
  {
    id: "tiktaalik-roseae",
    commonName: "Tiktaalik",
    scientificName: "Tiktaalik roseae",
    clade: "Sarcopterygii (Elpistostegalia)",
    periodId: "devonico",
    startMa: 375.0,
    endMa: 370.0,
    diet: "Carnívoro",
    metrics: {
      lengthMeters: 2.7,
      weightTons: 0.08,
      heightMeters: 0.35
    },
    paleoLocation: ["Laurussia", "Isla Ellesmere, Nunavut (Canadá)"],
    description: "Fósil de transición clave entre peces de aletas lobuladas y los primeros tetrápodos terrestres. Poseía cuello articulado móvil independiente del cráneo, costillas reforzadas para sostener los pulmones fuera del agua y aletas delanteras con huesos homólogos al brazo, antebrazo y muñeca capaces de apuntalar su cuerpo en tierra firme.",
    media: {
      imageUrl: "assets/species/tiktaalik.jpg",
      imageAuthor: "Nobu Tamura",
      imageLicense: "CC-BY 3.0"
    },
    coordinates: {
      lat: 78.50,
      lng: -82.00
    }
  },
  {
    id: "ichthyostega-stensioei",
    commonName: "Ichthyostega",
    scientificName: "Ichthyostega stensioei",
    clade: "Tetrapoda basal (Ichthyostegidae)",
    periodId: "devonico",
    startMa: 365.0,
    endMa: 360.0,
    diet: "Carnívoro",
    metrics: {
      lengthMeters: 1.5,
      weightTons: 0.04,
      heightMeters: 0.3
    },
    paleoLocation: ["Laurussia", "Groenlandia Oriental"],
    description: "Uno de los primeros vertebrados tetrápodos que combinaba pulmones y extremidades con siete dedos por pata para arrastrarse por las marismas devónicas, manteniendo a la vez una aleta dorsal natatoria en la cola para impulsarse en el agua.",
    media: {
      imageUrl: "assets/species/ichthyostega.jpg",
      imageAuthor: "Antigravity PaleoArt Engine / Dmitry Bogdanov",
      imageLicense: "CC-BY-SA 4.0"
    },
    coordinates: {
      lat: 73.50,
      lng: -23.00
    }
  },

  // ==========================================
  // CARBONÍFERO (358 - 298 Ma)
  // ==========================================
  {
    id: "arthropleura-armata",
    commonName: "Arthropleura",
    scientificName: "Arthropleura armata",
    clade: "Myriapoda (Arthropleuridea)",
    periodId: "carbonifero",
    startMa: 315.0,
    endMa: 299.0,
    diet: "Herbívoro",
    metrics: {
      lengthMeters: 2.6,
      weightTons: 0.05,
      heightMeters: 0.35
    },
    paleoLocation: ["Euramérica", "Reino Unido", "Alemania", "Nueva Escocia"],
    description: "El mayor invertebrado terrestre de todos los tiempos, un colosal milpiés de hasta 2.6 metros que prosperó gracias al 35% de oxígeno atmosférico del Carbonífero. Su cuerpo blindado con placas dorsales de quitina y queratina recorría los densos bosques de licopodios alimentándose de vegetación en descomposición.",
    media: {
      imageUrl: "assets/species/arthropleura.jpg",
      imageAuthor: "Nobu Tamura",
      imageLicense: "CC-BY-SA 3.0"
    },
    coordinates: {
      lat: 55.20,
      lng: -1.60
    }
  },
  {
    id: "meganeura-monyi",
    commonName: "Meganeura",
    scientificName: "Meganeura monyi",
    clade: "Meganisoptera (Meganeuridae)",
    periodId: "carbonifero",
    startMa: 305.0,
    endMa: 299.0,
    diet: "Insectívoro",
    metrics: {
      lengthMeters: 0.45,
      weightTons: 0.00045,
      heightMeters: 0.15
    },
    paleoLocation: ["Euramérica", "Commentry (Francia)", "Reino Unido"],
    description: "Gigantesco insecto grifonóptero emparentado con las libélulas modernas con una envergadura alar de hasta 75 cm. Como cazador aéreo veloz, capturaba anfibios tempranos e insectos de gran tamaño sobrevolando los pantanos del Carbonífero.",
    media: {
      imageUrl: "assets/species/meganeura.jpg",
      imageAuthor: "Antigravity PaleoArt Engine",
      imageLicense: "CC-BY-SA 4.0"
    },
    coordinates: {
      lat: 46.28,
      lng: 2.75
    }
  },
  {
    id: "pulmonoscorpius-kirktonensis",
    commonName: "Pulmonoscorpio",
    scientificName: "Pulmonoscorpius kirktonensis",
    clade: "Arachnida (Scorpiones)",
    periodId: "carbonifero",
    startMa: 336.0,
    endMa: 326.0,
    diet: "Carnívoro",
    metrics: {
      lengthMeters: 0.70,
      weightTons: 0.003,
      heightMeters: 0.2
    },
    paleoLocation: ["Euramérica", "East Kirkton (Escocia)"],
    description: "Escorpión gigante terrestre del Carbonífero temprano que alcanzaba hasta 70 cm de longitud. Poseía pedipalpos provistos de pinzas macizas y un gran aguijón curvo con el que inmovilizaba pequeños tetrápodos y artrópodos en el suelo forestal.",
    media: {
      imageUrl: "assets/species/pulmonoscorpius.jpg",
      imageAuthor: "Antigravity PaleoArt Engine",
      imageLicense: "CC-BY-SA 4.0"
    },
    coordinates: {
      lat: 55.90,
      lng: -3.50
    }
  },

  // ==========================================
  // PÉRMICO (298 - 252 Ma)
  // ==========================================
  {
    id: "dimetrodon-limbatus",
    commonName: "Dimetrodon",
    scientificName: "Dimetrodon limbatus",
    clade: "Synapsida (Sphenacodontidae)",
    periodId: "permico",
    startMa: 295.0,
    endMa: 272.0,
    diet: "Carnívoro",
    metrics: {
      lengthMeters: 3.5,
      weightTons: 0.25,
      heightMeters: 1.8
    },
    paleoLocation: ["Pangea", "Texas y Oklahoma (EE. UU.)", "Alemania"],
    description: "El sinápsido más emblemático del Pérmico, estrechamente emparentado con el linaje que dio origen a los mamíferos. Su alta vela dorsal sustentada por espinas vertebrales vascularizadas le permitía regular rápidamente su temperatura corporal y comunicarse visualmente con congéneres.",
    media: {
      imageUrl: "assets/species/dimetrodon_mundo.jpg",
      imageAuthor: "Mundo Prehistórico / Dmitry Bogdanov",
      imageLicense: "CC-BY-SA 4.0"
    },
    coordinates: {
      lat: 33.60,
      lng: -99.30
    }
  },
  {
    id: "inostrancevia-alexandri",
    commonName: "Inostrancevia",
    scientificName: "Inostrancevia alexandri",
    clade: "Synapsida (Gorgonopsia)",
    periodId: "permico",
    startMa: 259.0,
    endMa: 252.0,
    diet: "Carnívoro",
    metrics: {
      lengthMeters: 3.5,
      weightTons: 0.30,
      heightMeters: 1.4
    },
    paleoLocation: ["Pangea Septentrional", "Rusia Europea (Río Dvina)"],
    description: "El mayor gorgonópsido conocido, depredador cumbre del Pérmico tardío. Sus colmillos de sable de hasta 15 cm y su mandíbula con bisagra de amplia apertura estaban adaptados para perforar la densa coraza osteodérmica de pareiasaurios herbívoros.",
    media: {
      imageUrl: "assets/species/inostrancevia.jpg",
      imageAuthor: "Dmitry Bogdanov",
      imageLicense: "CC-BY-SA 3.0"
    },
    coordinates: {
      lat: 62.80,
      lng: 43.10
    }
  },
  {
    id: "scutosaurus-karpinskii",
    commonName: "Escutosaurio",
    scientificName: "Scutosaurus karpinskii",
    clade: "Parareptilia (Pareiasauridae)",
    periodId: "permico",
    startMa: 259.0,
    endMa: 252.0,
    diet: "Herbívoro",
    metrics: {
      lengthMeters: 3.0,
      weightTons: 1.2,
      heightMeters: 1.6
    },
    paleoLocation: ["Pangea Septentrional", "Óblast de Arcángel (Rusia)"],
    description: "Tanque biológico herbívoro del Pérmico tardío con patas columnares masivas dispuestas bajo el cuerpo. Su piel estaba acorazada por placas óseas dérmicas soldadas que lo protegían de los gorgonópsidos mientras procesaba grandes volúmenes de vegetación fibrosa.",
    media: {
      imageUrl: "assets/species/scutosaurus.jpg",
      imageAuthor: "Nobu Tamura",
      imageLicense: "CC-BY 3.0"
    },
    coordinates: {
      lat: 61.20,
      lng: 46.50
    }
  },

  // ==========================================
  // TRIÁSICO (252 - 201 Ma)
  // ==========================================
  {
    id: "plateosaurus-trossingensis",
    commonName: "Plateosaurio",
    scientificName: "Plateosaurus trossingensis",
    clade: "Sauropodomorpha (Plateosauridae)",
    periodId: "triasico",
    startMa: 214.0,
    endMa: 204.0,
    diet: "Herbívoro",
    metrics: {
      lengthMeters: 8.0,
      weightTons: 2.5,
      heightMeters: 3.8
    },
    paleoLocation: ["Pangea Central", "Alemania", "Suiza", "Francia", "Groenlandia"],
    description: "Uno de los primeros grandes dinosaurios prosaurópodos herbívoros de la historia. Capaz de caminar bípedamente para alcanzar hojas a más de 4 metros de altura, utilizaba el gran pulgar garfio de sus manos para acercarse las ramas.",
    media: {
      imageUrl: "assets/species/plateosaurus.jpg",
      imageAuthor: "Nobu Tamura",
      imageLicense: "CC-BY 3.0"
    },
    coordinates: {
      lat: 48.07,
      lng: 8.63
    }
  },
  {
    id: "herrerasaurus-ischigualastensis",
    commonName: "Herrerasaurio",
    scientificName: "Herrerasaurus ischigualastensis",
    clade: "Saurischia basal (Herrerasauridae)",
    periodId: "triasico",
    startMa: 231.4,
    endMa: 228.0,
    diet: "Carnívoro",
    metrics: {
      lengthMeters: 4.5,
      weightTons: 0.25,
      heightMeters: 1.5
    },
    paleoLocation: ["Gondwana", "Ischigualasto, San Juan (Argentina)"],
    description: "Uno de los dinosaurios carnívoros más antiguos y completos descubiertos en el Valle de la Luna. Presentaba patas traseras largas para la carrera rápida y una articulación mandibular flexible para sujetar presas en forcejeo.",
    media: {
      imageUrl: "assets/species/herrerasaurus.jpg",
      imageAuthor: "Nobu Tamura",
      imageLicense: "CC-BY 3.0"
    },
    coordinates: {
      lat: -30.15,
      lng: -67.85
    }
  },

  // ==========================================
  // JURÁSICO (201 - 145 Ma)
  // ==========================================
  {
    id: "allosaurus-fragilis",
    commonName: "Alosaurio",
    scientificName: "Allosaurus fragilis",
    clade: "Theropoda (Allosauridae)",
    periodId: "jurasico",
    startMa: 155.0,
    endMa: 145.0,
    diet: "Carnívoro",
    metrics: {
      lengthMeters: 9.5,
      weightTons: 2.3,
      heightMeters: 3.2
    },
    paleoLocation: ["Laurasia", "Formación Morrison (Utah, EE. UU.)", "Portugal"],
    description: "El superdepredador más icónico del Jurásico tardío norteamericano. Su cráneo presentaba una amplia apertura de mordida y dientes curvados y aserrados con los que asestaba golpes tajantes como un hacha para desangrar estegosáuridos y saurópodos.",
    media: {
      imageUrl: "assets/species/allosaurus.jpg",
      imageAuthor: "Mundo Prehistórico / Fred Wierum",
      imageLicense: "CC-BY-SA 4.0"
    },
    coordinates: {
      lat: 39.30,
      lng: -110.80
    }
  },
  {
    id: "stegosaurus-stenops",
    commonName: "Estegosaurio",
    scientificName: "Stegosaurus stenops",
    clade: "Ornithischia (Stegosauridae)",
    periodId: "jurasico",
    startMa: 155.0,
    endMa: 150.0,
    diet: "Herbívoro",
    metrics: {
      lengthMeters: 9.0,
      weightTons: 5.0,
      heightMeters: 4.0
    },
    paleoLocation: ["Laurasia", "Formación Morrison (Colorado y Utah, EE. UU.)"],
    description: "Emblemático dinosaurio cuadrúpedo con una doble hilera de placas óseas dérmicas dorsales usadas para termorregulación y cortejo, además de un letal thagomizer de cuatro púas óseas en la cola con el que hería mortalmente a terópodos como Allosaurus.",
    media: {
      imageUrl: "assets/species/stegosaurus.jpg",
      imageAuthor: "Mundo Prehistórico / Nobu Tamura",
      imageLicense: "CC-BY-SA 4.0"
    },
    coordinates: {
      lat: 40.40,
      lng: -108.50
    }
  },
  {
    id: "brachiosaurus-altithorax",
    commonName: "Braquiosaurio",
    scientificName: "Brachiosaurus altithorax",
    clade: "Sauropoda (Brachiosauridae)",
    periodId: "jurasico",
    startMa: 154.0,
    endMa: 150.0,
    diet: "Herbívoro",
    metrics: {
      lengthMeters: 23.0,
      weightTons: 35.0,
      heightMeters: 12.0
    },
    paleoLocation: ["Laurasia", "Formación Morrison (Colorado, EE. UU.)"],
    description: "Titánico saurópodo cuyas extremidades anteriores eran significativamente más largas que las traseras, otorgando a su lomo una postura inclinada semejante a una jirafa gigante para ramonear directamente en las copas de las coníferas.",
    media: {
      imageUrl: "assets/species/brachiosaurus.jpg",
      imageAuthor: "Nobu Tamura",
      imageLicense: "CC-BY 3.0"
    },
    coordinates: {
      lat: 39.05,
      lng: -108.70
    }
  },
  {
    id: "diplodocus-carnegii",
    commonName: "Diplodoco",
    scientificName: "Diplodocus carnegii",
    clade: "Sauropoda (Diplodocidae)",
    periodId: "jurasico",
    startMa: 154.0,
    endMa: 152.0,
    diet: "Herbívoro",
    metrics: {
      lengthMeters: 27.0,
      weightTons: 14.0,
      heightMeters: 4.5
    },
    paleoLocation: ["Laurasia", "Wyoming y Utah (EE. UU.)"],
    description: "Saurópodo extraordinariamente largo y esbelto con una cola formada por más de 80 vértebras que funcionaba como un látigo supersónico para defender a la manada y disuadir a los carnívoros.",
    media: {
      imageUrl: "assets/species/diplodocus.jpg",
      imageAuthor: "Dmitry Bogdanov",
      imageLicense: "CC-BY-SA 3.0"
    },
    coordinates: {
      lat: 41.50,
      lng: -106.00
    }
  },
  {
    id: "archaeopteryx-lithographica",
    commonName: "Arqueópterix",
    scientificName: "Archaeopteryx lithographica",
    clade: "Avialae basal",
    periodId: "jurasico",
    startMa: 150.8,
    endMa: 148.5,
    diet: "Carnívoro",
    metrics: {
      lengthMeters: 0.5,
      weightTons: 0.0008,
      heightMeters: 0.25
    },
    paleoLocation: ["Archipiélago Europeo", "Solnhofen, Baviera (Alemania)"],
    description: "El fósil de transición más célebre de la historia de la ciencia, evidenciando de forma irrefutable el origen terópodo de las aves al combinar dientes cónicos, garras alares y cola ósea reptiliana con plumas de vuelo asimétricas modernas.",
    media: {
      imageUrl: "assets/species/archaeopteryx.jpg",
      imageAuthor: "Nobu Tamura",
      imageLicense: "CC-BY 3.0"
    },
    coordinates: {
      lat: 48.89,
      lng: 11.00
    }
  },

  // ==========================================
  // CRETÁCICO MEDIO Y TARDÍO (145 - 66 Ma)
  // ==========================================
  {
    id: "spinosaurus-aegyptiacus",
    commonName: "Espinosaurio",
    scientificName: "Spinosaurus aegyptiacus",
    clade: "Theropoda (Spinosauridae)",
    periodId: "cretacico-medio",
    startMa: 99.0,
    endMa: 93.5,
    diet: "Piscívoro",
    metrics: {
      lengthMeters: 15.0,
      weightTons: 7.5,
      heightMeters: 4.8
    },
    paleoLocation: ["Norte de África", "Egipto", "Marruecos (Kem Kem)"],
    description: "El dinosaurio carnívoro más largo conocido, altamente adaptado a la vida semiacuática en los ríos del Sahara Cretácico. Presentaba una gran vela dorsal de hasta 1.8 metros, huesos densos para inmersión y una cola en forma de aleta natatoria.",
    media: {
      imageUrl: "assets/species/spinosaurus_mundo.jpg",
      imageAuthor: "Mundo Prehistórico / Davide Bonadonna",
      imageLicense: "CC-BY-SA 4.0"
    },
    coordinates: {
      lat: 31.00,
      lng: 28.50
    }
  },
  {
    id: "argentinosaurus-huinculensis",
    commonName: "Argentinosaurio",
    scientificName: "Argentinosaurus huinculensis",
    clade: "Sauropoda (Titanosauria)",
    periodId: "cretacico-medio",
    startMa: 97.0,
    endMa: 93.5,
    diet: "Herbívoro",
    metrics: {
      lengthMeters: 35.0,
      weightTons: 75.0,
      heightMeters: 8.5
    },
    paleoLocation: ["Gondwana", "Patagonia (Argentina)"],
    description: "Uno de los mayores animales terrestres que jamás hayan pisado el planeta, con una masa estimada de más de 70 toneladas. Sus vértebras dorsales alcanzaban 1.6 metros de altura y estaban reforzadas con complejas articulaciones para soportar su inmenso peso corporal.",
    media: {
      imageUrl: "assets/species/argentinosaurus.jpg",
      imageAuthor: "Antigravity PaleoArt Engine / Mark Witton",
      imageLicense: "CC-BY-SA 4.0"
    },
    coordinates: {
      lat: -38.90,
      lng: -69.20
    }
  },
  {
    id: "giganotosaurus-carolinii",
    commonName: "Giganotosaurio",
    scientificName: "Giganotosaurus carolinii",
    clade: "Theropoda (Carcharodontosauridae)",
    periodId: "cretacico-medio",
    startMa: 99.6,
    endMa: 97.0,
    diet: "Carnívoro",
    metrics: {
      lengthMeters: 13.2,
      weightTons: 8.2,
      heightMeters: 3.9
    },
    paleoLocation: ["Gondwana", "Neuquén, Patagonia (Argentina)"],
    description: "Colosal terópodo carcharodontosáurido del Cretácico sudamericano que rivalizaba en tamaño con Tyrannosaurus rex. Sus mandíbulas provistas de dientes de filo aserrado comprimidos lateralmente estaban adaptadas para infligir profundas heridas a los titanosaurios.",
    media: {
      imageUrl: "assets/species/giganotosaurus.jpg",
      imageAuthor: "Nobu Tamura",
      imageLicense: "CC-BY 3.0"
    },
    coordinates: {
      lat: -39.20,
      lng: -68.80
    }
  },
  {
    id: "tyrannosaurus-rex",
    commonName: "Tiranosaurio Rex",
    scientificName: "Tyrannosaurus rex",
    clade: "Theropoda (Tyrannosauridae)",
    periodId: "cretacico-tardio",
    startMa: 68.0,
    endMa: 66.0,
    diet: "Carnívoro",
    metrics: {
      lengthMeters: 12.3,
      weightTons: 8.8,
      heightMeters: 3.8
    },
    paleoLocation: ["Laramidia", "Montana, Wyoming, Dakota (EE. UU.)", "Canadá"],
    description: "El superdepredador supremo del Cretácico tardío con una fuerza de mordedura de hasta 57,000 N capaz de pulverizar huesos enteros de Triceratops. Poseía visión binocular tridimensional superior a las águilas y un sentido olfativo extraordinariamente desarrollado.",
    media: {
      imageUrl: "assets/species/tyrannosaurus_mundo.jpg",
      imageAuthor: "Mundo Prehistórico / RJ Palmer",
      imageLicense: "CC-BY-SA 4.0"
    },
    coordinates: {
      lat: 47.50,
      lng: -106.50
    }
  },
  {
    id: "triceratops-horridus",
    commonName: "Triceratops",
    scientificName: "Triceratops horridus",
    clade: "Ornithischia (Ceratopsidae)",
    periodId: "cretacico-tardio",
    startMa: 68.0,
    endMa: 66.0,
    diet: "Herbívoro",
    metrics: {
      lengthMeters: 9.0,
      weightTons: 9.0,
      heightMeters: 3.0
    },
    paleoLocation: ["Laramidia", "Formación Hell Creek y Lance (EE. UU.)"],
    description: "Ceratópsido masivo provisto de dos cuernos supraorbitales de más de 1 metro y un cuerno nasal, respaldados por una sólida gola ósea posterior que protegía su cuello y servía para combates de apareamiento e interacciones territoriales.",
    media: {
      imageUrl: "assets/species/triceratops.jpg",
      imageAuthor: "Mundo Prehistórico / Nobu Tamura",
      imageLicense: "CC-BY-SA 4.0"
    },
    coordinates: {
      lat: 44.00,
      lng: -104.50
    }
  },
  {
    id: "ankylosaurus-magniventris",
    commonName: "Anquilosaurio",
    scientificName: "Ankylosaurus magniventris",
    clade: "Ornithischia (Ankylosauridae)",
    periodId: "cretacico-tardio",
    startMa: 68.0,
    endMa: 66.0,
    diet: "Herbívoro",
    metrics: {
      lengthMeters: 8.0,
      weightTons: 6.0,
      heightMeters: 1.7
    },
    paleoLocation: ["Laramidia", "Montana (EE. UU.)", "Alberta (Canadá)"],
    description: "Tanque viviente acorazado con placas osteodérmicas y espinas óseas incrustadas a lo largo de todo su lomo e incluso párpados. Al final de su cola fusionada portaba una pesada maza ósea capaz de fracturar huesos con un golpe lateral.",
    media: {
      imageUrl: "assets/species/ankylosaurus.jpg",
      imageAuthor: "Mundo Prehistórico / Emily Willoughby",
      imageLicense: "CC-BY-SA 4.0"
    },
    coordinates: {
      lat: 47.20,
      lng: -107.00
    }
  },
  {
    id: "velociraptor-mongoliensis",
    commonName: "Velociraptor",
    scientificName: "Velociraptor mongoliensis",
    clade: "Theropoda (Dromaeosauridae)",
    periodId: "cretacico-tardio",
    startMa: 75.0,
    endMa: 71.0,
    diet: "Carnívoro",
    metrics: {
      lengthMeters: 2.0,
      weightTons: 0.015,
      heightMeters: 0.5
    },
    paleoLocation: ["Asia Central", "Desierto de Gobi (Mongolia / China)"],
    description: "Dromeosáurido ágil enteramente emplumado dotado de una formidable garra curvada en hoz en el segundo dedo de cada pie. Los famosos fósiles de 'Dinosaurios Luchadores' atestiguan combates cuerpo a cuerpo directos contra Protoceratops en las dunas de Gobi.",
    media: {
      imageUrl: "assets/species/velociraptor.jpg",
      imageAuthor: "Mundo Prehistórico / Emily Willoughby",
      imageLicense: "CC-BY-SA 4.0"
    },
    coordinates: {
      lat: 44.15,
      lng: 103.20
    }
  },
  {
    id: "quetzalcoatlus-northropi",
    commonName: "Quetzalcoatlus",
    scientificName: "Quetzalcoatlus northropi",
    clade: "Pterosauria (Azhdarchidae)",
    periodId: "cretacico-tardio",
    startMa: 68.0,
    endMa: 66.0,
    diet: "Carnívoro",
    metrics: {
      lengthMeters: 11.0,
      weightTons: 0.22,
      heightMeters: 5.5
    },
    paleoLocation: ["Laramidia", "Formación Javelina, Texas (EE. UU.)"],
    description: "Uno de los mayores seres voladores de la historia terrestre con una envergadura alar de 11 metros semejante a una avioneta y una altura erguida comparable a una jirafa macho adulta. Caminaba a cuatro patas patrullando el suelo para cazar pequeños dinosaurios.",
    media: {
      imageUrl: "assets/species/quetzalcoatlus.jpg",
      imageAuthor: "Mundo Prehistórico / Mark Witton",
      imageLicense: "CC-BY-SA 4.0"
    },
    coordinates: {
      lat: 29.25,
      lng: -103.25
    }
  },
  {
    id: "mosasaurus-hoffmannii",
    commonName: "Mosasaurio",
    scientificName: "Mosasaurus hoffmannii",
    clade: "Squamata (Mosasauridae)",
    periodId: "cretacico-tardio",
    startMa: 70.0,
    endMa: 66.0,
    diet: "Carnívoro",
    metrics: {
      lengthMeters: 17.0,
      weightTons: 14.0,
      heightMeters: 2.2
    },
    paleoLocation: ["Mares Epicontinentales Globales", "Países Bajos", "Norteamérica"],
    description: "Colosal reptil marino escamoso emparentado con los varanos actuales que dominó la cúspide de la cadena trófica marina cretácica. Poseía doble hilera de dientes en el paladar y una aleta caudal bilobulada para emboscadas veloces.",
    media: {
      imageUrl: "assets/species/mosasaurus.jpg",
      imageAuthor: "Mundo Prehistórico / Dmitry Bogdanov",
      imageLicense: "CC-BY-SA 4.0"
    },
    coordinates: {
      lat: 50.85,
      lng: 5.68
    }
  },

  // ==========================================
  // PALEÓGENO / NEÓGENO (66 - 2.58 Ma)
  // ==========================================
  {
    id: "titanoboa-cerrejonensis",
    commonName: "Titanoboa",
    scientificName: "Titanoboa cerrejonensis",
    clade: "Squamata (Boidae)",
    periodId: "paleogeno",
    startMa: 60.0,
    endMa: 58.0,
    diet: "Carnívoro",
    metrics: {
      lengthMeters: 12.8,
      weightTons: 1.13,
      heightMeters: 1.0
    },
    paleoLocation: ["Sudamérica", "Cerrejón, La Guajira (Colombia)"],
    description: "La mayor serpiente de la historia geológica, con una masa de más de una tonelada que habitó los humedales ecuatoriales hipertermales post-impacto del Paleoceno. Acechaba en ríos devorando cocodrilos dyrosáuridos y peces de agua dulce gigantes.",
    media: {
      imageUrl: "assets/species/titanoboa.jpg",
      imageAuthor: "Antigravity PaleoArt Engine",
      imageLicense: "CC-BY-SA 4.0"
    },
    coordinates: {
      lat: 11.10,
      lng: -72.60
    }
  },
  {
    id: "otodus-megalodon",
    commonName: "Megalodón",
    scientificName: "Otodus megalodon",
    clade: "Chondrichthyes (Otodontidae)",
    periodId: "neogeno",
    startMa: 23.0,
    endMa: 3.6,
    diet: "Carnívoro",
    metrics: {
      lengthMeters: 18.0,
      weightTons: 50.0,
      heightMeters: 3.5
    },
    paleoLocation: ["Océanos Templados y Cálidos Globales", "Pacífico y Atlántico"],
    description: "El tiburón macrófago más colosal de todos los tiempos. Provisto de mandíbulas de más de 2 metros de apertura armadas con 250 dientes aserrados de hasta 18 cm, ejercía una fuerza de mordida de más de 180,000 N capaz de aplastar ballenas barbadas.",
    media: {
      imageUrl: "assets/species/megalodon.jpg",
      imageAuthor: "Karen Carr / Wikimedia Commons",
      imageLicense: "Public Domain"
    },
    coordinates: {
      lat: 31.95,
      lng: -80.95
    }
  },
  {
    id: "paraceratherium-transouralicum",
    commonName: "Paraceraterio",
    scientificName: "Paraceratherium transouralicum",
    clade: "Perissodactyla (Hyracodontidae)",
    periodId: "paleogeno",
    startMa: 34.0,
    endMa: 23.0,
    diet: "Herbívoro",
    metrics: {
      lengthMeters: 7.4,
      weightTons: 15.0,
      heightMeters: 4.8
    },
    paleoLocation: ["Eurasia Central", "Kazajistán", "Pakistán", "China"],
    description: "Uno de los mayores mamíferos terrestres que jamás hayan existido, un rinoceronte desprovisto de cuernos con cuello elongado y masa de 15 toneladas capaz de ramonear en las copas de los árboles.",
    media: {
      imageUrl: "assets/species/paraceratherium.jpg",
      imageAuthor: "Antigravity PaleoArt Engine / Dmitry Bogdanov",
      imageLicense: "CC-BY-SA 4.0"
    },
    coordinates: {
      lat: 44.50,
      lng: 65.50
    }
  },
  {
    id: "purussaurus-brasiliensis",
    commonName: "Purussauro",
    scientificName: "Purussaurus brasiliensis",
    clade: "Crocodylia (Alligatoridae)",
    periodId: "neogeno",
    startMa: 13.0,
    endMa: 8.0,
    diet: "Carnívoro",
    metrics: {
      lengthMeters: 12.5,
      weightTons: 8.4,
      heightMeters: 1.6
    },
    paleoLocation: ["Sistema Pebas Sudamericano", "Amazonas (Brasil)", "Perú", "Colombia"],
    description: "Monstruoso caimán gigante de 12.5 metros con una fuerza de mordida superior a 69,000 N que dominó los lagos cálidos protoamazónicos del Mioceno alimentándose de tortugas gigantes y ungulados nativos.",
    media: {
      imageUrl: "assets/species/purussaurus.jpg",
      imageAuthor: "Antigravity PaleoArt Engine",
      imageLicense: "CC-BY-SA 4.0"
    },
    coordinates: {
      lat: -9.50,
      lng: -70.50
    }
  },
  {
    id: "basilosaurus-cetoides",
    commonName: "Basilosaurio",
    scientificName: "Basilosaurus cetoides",
    clade: "Cetacea (Basilosauridae)",
    periodId: "paleogeno",
    startMa: 41.3,
    endMa: 33.9,
    diet: "Carnívoro",
    metrics: {
      lengthMeters: 18.0,
      weightTons: 15.0,
      heightMeters: 1.8
    },
    paleoLocation: ["Mar de Tetis y Atlántico", "Egipto (Wadi Al-Hitan)", "Alabama (EE. UU.)"],
    description: "Ballena arqueoceta primitiva de cuerpo sumamente elongado y ondulante que nadaba en los mares cálidos del Eoceno. Aún conservaba diminutas extremidades traseras vestigiales y una dentición heterodonta con afilados dientes carnívoros.",
    media: {
      imageUrl: "assets/species/basilosaurus.jpg",
      imageAuthor: "Antigravity PaleoArt Engine",
      imageLicense: "CC-BY-SA 4.0"
    },
    coordinates: {
      lat: 29.27,
      lng: 30.04
    }
  },

  // ==========================================
  // PLEISTOCENO / CUATERNARIO (2.58 - 0.01 Ma)
  // [Mundo Prehistórico: Extintos Naturales]
  // ==========================================
  {
    id: "glyptodon-clavipes",
    commonName: "Gliptodonte",
    scientificName: "Glyptodon clavipes",
    clade: "Xenarthra (Cingulata / Chlamyphoridae)",
    periodId: "pleistoceno",
    startMa: 2.0,
    endMa: 0.01,
    diet: "Herbívoro",
    metrics: {
      lengthMeters: 3.3,
      weightTons: 2.0,
      heightMeters: 1.5
    },
    paleoLocation: ["Sudamérica", "Pampas Argentinas", "Uruguay", "Brasil"],
    description: "Colosal mamífero emparentado con los armadillos protegido por un caparazón de más de 1,000 osteodermos óseos de 2.5 cm de grosor. Su cola anillada funcionaba como bate defensivo y para combates territoriales; convivió con los primeros pobladores humanos de las pampas.",
    media: {
      imageUrl: "assets/species/glyptodon.jpg",
      imageAuthor: "Mundo Prehistórico / Heinrich Harder",
      imageLicense: "Public Domain"
    },
    coordinates: {
      lat: -34.60,
      lng: -58.38
    }
  },
  {
    id: "smilodon-populator",
    commonName: "Tigre Dientes de Sable",
    scientificName: "Smilodon populator",
    clade: "Carnivora (Felidae / Machairodontinae)",
    periodId: "pleistoceno",
    startMa: 2.5,
    endMa: 0.01,
    diet: "Carnívoro",
    metrics: {
      lengthMeters: 2.6,
      weightTons: 0.40,
      heightMeters: 1.25
    },
    paleoLocation: ["América del Sur y Norte", "Pampas", "Lagoa Santa", "La Brea"],
    description: "El felino macairodontino más robusto y masivo de la historia, alcanzando más de 400 kg. Sus colmillos superiores en forma de sable de hasta 28 cm infligían mortales mordiscos degolladores de precisión tras inmovilizar a sus presas con poderosos antebrazos.",
    media: {
      imageUrl: "assets/species/smilodon_mundo.jpg",
      imageAuthor: "Mundo Prehistórico / Durbed",
      imageLicense: "CC-BY-SA 3.0"
    },
    coordinates: {
      lat: -31.42,
      lng: -64.18
    }
  },
  {
    id: "mammuthus-primigenius",
    commonName: "Mamut Lanudo",
    scientificName: "Mammuthus primigenius",
    clade: "Proboscidea (Elephantidae)",
    periodId: "pleistoceno",
    startMa: 0.4,
    endMa: 0.004,
    diet: "Herbívoro",
    metrics: {
      lengthMeters: 3.8,
      weightTons: 6.0,
      heightMeters: 3.4
    },
    paleoLocation: ["Estepa de Mamuts Euroasiática y Beringiana", "Siberia", "Norteamérica"],
    description: "Emblema biológico de la última Edad de Hielo con abrigo bicapa de pelo lanoso de 90 cm y colmillos curvados en espiral de hasta 4.2 metros para retirar la nieve periglacial. Una población relicta sobrevivió en la Isla de Wrangel hasta hace 4,000 años.",
    media: {
      imageUrl: "assets/species/mamut_mundo.jpg",
      imageAuthor: "Mundo Prehistórico / Mauricio Antón",
      imageLicense: "CC-BY 2.5"
    },
    coordinates: {
      lat: 67.50,
      lng: 133.40
    }
  },
  {
    id: "megatherium-americanum",
    commonName: "Megaterio",
    scientificName: "Megatherium americanum",
    clade: "Xenarthra (Folivora / Megatheriidae)",
    periodId: "pleistoceno",
    startMa: 2.0,
    endMa: 0.01,
    diet: "Herbívoro",
    metrics: {
      lengthMeters: 6.0,
      weightTons: 4.0,
      heightMeters: 4.2
    },
    paleoLocation: ["Sudamérica", "Pampas Argentinas", "Bolivia", "Brasil"],
    description: "Titánico perezoso terrestre cuadrúpedo que se erguía sobre un trípode formado por sus musculosas patas traseras y su cola para ramonear copas de árboles a más de 4 metros de altura, defendiéndose de carnívoros con garras de 30 cm.",
    media: {
      imageUrl: "assets/species/megaterio.jpg",
      imageAuthor: "Mundo Prehistórico / Heinrich Harder",
      imageLicense: "Public Domain"
    },
    coordinates: {
      lat: -38.52,
      lng: -60.25
    }
  },
  {
    id: "macrauchenia-patachonica",
    commonName: "Macrauquenia",
    scientificName: "Macrauchenia patachonica",
    clade: "Litopterna (Macraucheniidae)",
    periodId: "pleistoceno",
    startMa: 2.0,
    endMa: 0.01,
    diet: "Herbívoro",
    metrics: {
      lengthMeters: 3.0,
      weightTons: 1.0,
      heightMeters: 2.0
    },
    paleoLocation: ["Sudamérica", "Patagonia Argentina", "Chile", "Bolivia"],
    description: "Singular ungulado nativo sudamericano descubierto por Charles Darwin con cuello semejante al de un camello y fosas nasales dorsales que sugieren una corta probóscide prehensil o labio muscular extensible para ramonear.",
    media: {
      imageUrl: "assets/species/macrauchenia.jpg",
      imageAuthor: "Mundo Prehistórico / Heinrich Harder",
      imageLicense: "Public Domain"
    },
    coordinates: {
      lat: -50.12,
      lng: -69.80
    }
  },
  {
    id: "toxodon-platensis",
    commonName: "Toxodonte",
    scientificName: "Toxodon platensis",
    clade: "Notoungulata (Toxodontidae)",
    periodId: "pleistoceno",
    startMa: 2.0,
    endMa: 0.01,
    diet: "Herbívoro",
    metrics: {
      lengthMeters: 2.7,
      weightTons: 1.5,
      heightMeters: 1.5
    },
    paleoLocation: ["Sudamérica", "Entre Ríos y Buenos Aires (Argentina)", "Brasil"],
    description: "Uno de los últimos y más exitosos notoungulados con aspecto semejante a un rinoceronte o hipopótamo. Sus incisivos curvados de crecimiento continuo en forma de arco cortaban vegetación dura y plantas acuáticas con alto contenido de sílice.",
    media: {
      imageUrl: "assets/species/toxodon.jpg",
      imageAuthor: "Mundo Prehistórico / Heinrich Harder",
      imageLicense: "Public Domain"
    },
    coordinates: {
      lat: -31.73,
      lng: -60.53
    }
  },
  {
    id: "mammut-americanum",
    commonName: "Mastodonte Americano",
    scientificName: "Mammut americanum",
    clade: "Proboscidea (Mammutidae)",
    periodId: "pleistoceno",
    startMa: 3.7,
    endMa: 0.01,
    diet: "Herbívoro",
    metrics: {
      lengthMeters: 4.5,
      weightTons: 5.5,
      heightMeters: 3.0
    },
    paleoLocation: ["Norteamérica", "Kentucky, Ohio, Nueva York (EE. UU.)", "Alaska"],
    description: "Proboscídeo de linaje más antiguo que los mamuts, caracterizado por molares con cúspides cónicas pronunciadas para desmenuzar ramas de coníferas y un cuerpo más achaparrado y robusto.",
    media: {
      imageUrl: "assets/species/mastodonte_americano.jpg",
      imageAuthor: "Mundo Prehistórico / Charles R. Knight",
      imageLicense: "Public Domain"
    },
    coordinates: {
      lat: 39.82,
      lng: -84.90
    }
  },
  {
    id: "aenocyon-dirus",
    commonName: "Lobo Terrible",
    scientificName: "Aenocyon dirus",
    clade: "Carnivora (Canidae)",
    periodId: "pleistoceno",
    startMa: 1.8,
    endMa: 0.01,
    diet: "Carnívoro",
    metrics: {
      lengthMeters: 1.8,
      weightTons: 0.085,
      heightMeters: 0.85
    },
    paleoLocation: ["América del Norte y del Sur", "Rancho La Brea (Los Ángeles, EE. UU.)"],
    description: "Cánido pleistocénico 25% más macizo que un lobo gris moderno con mandíbulas reforzadas para triturar hueso. Miles de esqueletos fosilizados en los pozos de brea de La Brea evidencian su caza cooperativa en jauría.",
    media: {
      imageUrl: "assets/species/lobo_gigante.jpg",
      imageAuthor: "Mundo Prehistórico / Mauricio Antón",
      imageLicense: "CC-BY 2.5"
    },
    coordinates: {
      lat: 34.06,
      lng: -118.36
    }
  },
  {
    id: "ursus-spelaeus",
    commonName: "Oso de las Cavernas",
    scientificName: "Ursus spelaeus",
    clade: "Carnivora (Ursidae)",
    periodId: "pleistoceno",
    startMa: 0.3,
    endMa: 0.024,
    diet: "Herbívoro",
    metrics: {
      lengthMeters: 3.5,
      weightTons: 0.80,
      heightMeters: 1.4
    },
    paleoLocation: ["Europa y Eurasia", "Cuevas Kársticas de Francia, España y Rumania"],
    description: "Colosal úrsido europeo que alcanzaba 3.5 metros erguido. Su dieta era mayormente vegetariana y pasaba largos inviernos glaciares hibernando en profundas cuevas kársticas donde se acumularon millares de osamentas fósiles.",
    media: {
      imageUrl: "assets/species/oso_cavernario.jpg",
      imageAuthor: "Mundo Prehistórico / Heinrich Harder",
      imageLicense: "Public Domain"
    },
    coordinates: {
      lat: 44.38,
      lng: 4.41
    }
  },
  {
    id: "coelodonta-antiquitatis",
    commonName: "Rinoceronte Lanudo",
    scientificName: "Coelodonta antiquitatis",
    clade: "Perissodactyla (Rhinocerotidae)",
    periodId: "pleistoceno",
    startMa: 0.46,
    endMa: 0.014,
    diet: "Herbívoro",
    metrics: {
      lengthMeters: 3.7,
      weightTons: 2.5,
      heightMeters: 1.9
    },
    paleoLocation: ["Estepa de Mamuts Euroasiática", "Siberia", "Ucrania", "Europa Central"],
    description: "Rinoceronte adaptado a la tundra periglacial por un espeso pelaje lanoso rojizo y un colosal cuerno anterior de queratina aplanado lateralmente de más de 1.3 metros con el que apartaba la nieve invernal para pastar.",
    media: {
      imageUrl: "assets/species/rinoceronte_lanudo.jpg",
      imageAuthor: "Mundo Prehistórico / Mauricio Antón",
      imageLicense: "CC-BY 2.5"
    },
    coordinates: {
      lat: 49.84,
      lng: 24.03
    }
  },
  {
    id: "megaloceros-giganteus",
    commonName: "Megalocero",
    scientificName: "Megaloceros giganteus",
    clade: "Artiodactyla (Cervidae)",
    periodId: "pleistoceno",
    startMa: 0.4,
    endMa: 0.007,
    diet: "Herbívoro",
    metrics: {
      lengthMeters: 3.2,
      weightTons: 0.70,
      heightMeters: 2.1
    },
    paleoLocation: ["Eurasia", "Irlanda (Ballybetagh)", "Alemania", "Siberia"],
    description: "Ciervo gigante que ostentaba la cornamenta más monumental de la historia animal: hasta 3.65 metros de envergadura y 40 kg de masa ósea neta que los machos regeneraban anualmente para el cortejo y las batallas de exhibición.",
    media: {
      imageUrl: "assets/species/megalocero.jpg",
      imageAuthor: "Mundo Prehistórico / Heinrich Harder",
      imageLicense: "Public Domain"
    },
    coordinates: {
      lat: 53.25,
      lng: -6.20
    }
  },
  {
    id: "diprotodon-optatum",
    commonName: "Diprotodonte",
    scientificName: "Diprotodon optatum",
    clade: "Diprotodontia (Diprotodontidae)",
    periodId: "pleistoceno",
    startMa: 1.6,
    endMa: 0.025,
    diet: "Herbívoro",
    metrics: {
      lengthMeters: 3.8,
      weightTons: 2.8,
      heightMeters: 2.0
    },
    paleoLocation: ["Australia (Sahul)", "Lago Callabonna", "Queensland", "Nueva Gales del Sur"],
    description: "El mayor marsupial de todos los tiempos, de la corpulencia de un rinoceronte blanco. Dotado de incisivos en cincel y una bolsa marsupial orientada hacia atrás, recorría las llanuras semiáridas australianas en manadas migratorias.",
    media: {
      imageUrl: "assets/species/diprotodon.jpg",
      imageAuthor: "Mundo Prehistórico / Heinrich Harder",
      imageLicense: "Public Domain"
    },
    coordinates: {
      lat: -31.80,
      lng: 136.50
    }
  },
  {
    id: "procoptodon-goliah",
    commonName: "Canguro Gigante de Cara Corta",
    scientificName: "Procoptodon goliah",
    clade: "Diprotodontia (Macropodidae / Sthenurinae)",
    periodId: "pleistoceno",
    startMa: 1.6,
    endMa: 0.03,
    diet: "Herbívoro",
    metrics: {
      lengthMeters: 2.7,
      weightTons: 0.24,
      heightMeters: 2.7
    },
    paleoLocation: ["Australia (Sahul)", "Menindee Lakes", "Naracoorte"],
    description: "El canguro más colosal conocido con rostro simiesco chato y visión binocular. A diferencia de los canguros modernos que saltan, caminaba bípedamente a zancadas sobre un único dedo ungulado modificado, alzando sus brazos para ramonear hojas de eucalipto.",
    media: {
      imageUrl: "assets/species/procoptodon.jpg",
      imageAuthor: "Mundo Prehistórico / Nobu Tamura",
      imageLicense: "CC-BY 3.0"
    },
    coordinates: {
      lat: -32.50,
      lng: 142.30
    }
  },
  {
    id: "varanus-priscus",
    commonName: "Megalania",
    scientificName: "Varanus priscus",
    clade: "Squamata (Varanidae)",
    periodId: "pleistoceno",
    startMa: 1.6,
    endMa: 0.03,
    diet: "Carnívoro",
    metrics: {
      lengthMeters: 6.5,
      weightTons: 0.80,
      heightMeters: 1.2
    },
    paleoLocation: ["Australia (Sahul)", "Darling Downs (Queensland)"],
    description: "El mayor lagarto terrestre conocido, duplicando la longitud y multiplicando por diez el peso del Dragón de Komodo actual. Con dientes serrados curvados y glándulas de veneno, era el superdepredador cumbre de la megafauna pleistocénica australiana.",
    media: {
      imageUrl: "assets/species/megalania.jpg",
      imageAuthor: "Mundo Prehistórico / Dmitry Bogdanov",
      imageLicense: "CC-BY-SA 3.0"
    },
    coordinates: {
      lat: -27.50,
      lng: 148.00
    }
  }
];

// Ensure directories exist
fs.mkdirSync('src/data', { recursive: true });
fs.mkdirSync('public/data', { recursive: true });

// Write to both locations
fs.writeFileSync('src/data/fauna.json', JSON.stringify(faunaList, null, 2), 'utf8');
fs.writeFileSync('public/data/fauna.json', JSON.stringify(faunaList, null, 2), 'utf8');

console.log(`Successfully generated Paleofauna catalog with ${faunaList.length} species strictly typed!`);
