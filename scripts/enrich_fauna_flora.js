import fs from 'fs';
import path from 'path';

const enrichedPeriods = [
  {
    id: "present_0ma",
    name: "Presente (Holoceno / Antropoceno)",
    period: "Cuaternario",
    era: "Cenozoico",
    eon: "Fanerozoico",
    timeMa: 0,
    iugsColor: "#F9F97F",
    textureFile: "textures/paleomap/0ma.jpg",
    climate: {
      temperature: 15,
      tempDelta: "0°C (Referencia actual)",
      oxygen: 21,
      co2: 420,
      seaLevel: "Referencia actual",
      description: "Periodo interglaciar caracterizado por casquetes polares en Groenlandia y Antártida, y una biosfera fuertemente modelada por la actividad humana."
    },
    atmosphere: {
      o2: "21%",
      co2: "420 ppm",
      pressure: "1.0 atm",
      summary: "Atmósfera rica en nitrógeno (78%) y oxígeno (21%), con niveles de dióxido de carbono en aumento antropogénico."
    },
    flora: [
      "Dominancia global de angiospermas (plantas con flor)",
      "Grandes extensiones de pastizales y praderas templadas",
      "Bosques boreales (taiga) y selvas tropicales ecuatoriales"
    ],
    fauna: [
      "Mamíferos placentarios dominantes en todos los nichos terrestres y marinos",
      "Aves modernas neornites de alta diversidad",
      "Homo sapiens como superdepredador y agente global de cambio"
    ],
    species: [
      {
        id: "smilodon",
        name: "Smilodon fatalis",
        commonName: "Tigre Dientes de Sable",
        image: "assets/species/smilodon.jpg",
        group: "Mamífero carnívoro (Félido macairodontino)",
        diet: "Carnívoro (Superdepredador)",
        habitat: "Terrestre (Llanuras y bosques abiertos)",
        length: "2.2 m",
        weight: "280 kg",
        scaleVsHuman: "1.2x la masa de un león moderno, altura al hombro de 1.2 m.",
        description: "Félido emblemático del Pleistoceno norteamericano provisto de caninos superiores alargados de hasta 28 cm con los que asestaba mordiscos de precisión en la garganta de presas como bisontes y caballos.",
        lat: 34.06,
        lon: -118.36,
        fossilSite: "Rancho La Brea (Los Ángeles, EE. UU.)"
      },
      {
        id: "mammuthus",
        name: "Mammuthus primigenius",
        commonName: "Mamut Lanudo",
        image: "assets/species/mammuthus.svg",
        group: "Mamífero proboscídeo (Elefántidos)",
        diet: "Herbívoro (Gramíneas de la estepa)",
        habitat: "Terrestre (Estepa periglaciaria)",
        length: "3.8 m",
        weight: "6.0 toneladas",
        scaleVsHuman: "El doble de la altura de un humano adulto (3.4 m a la cruz).",
        description: "Proboscídeo altamente adaptado al frío extremo de la última Edad de Hielo, con pelaje bicapa de hasta 90 cm de longitud, gruesa capa de grasa subcutánea y colmillos curvados de hasta 4.2 metros para retirar la nieve.",
        lat: 67.5,
        lon: 133.4,
        fossilSite: "Yacimientos de permafrost de Siberia (Rusia)"
      },
      {
        id: "homo_sapiens",
        name: "Homo sapiens",
        commonName: "Humano Anatómicamente Moderno",
        image: "assets/species/homo_sapiens.svg",
        group: "Primate homínido",
        diet: "Omnívoro",
        habitat: "Cosmopolita global",
        length: "1.75 m",
        weight: "75 kg",
        scaleVsHuman: "Estatura humana de referencia contemporánea.",
        description: "Especie homínida que desarrolló tecnología lítica compleja, lenguaje simbólico abstracto y arte rupestre, expandiéndose desde África por todos los continentes del planeta hace unos 70,000 años.",
        lat: 31.51,
        lon: -9.28,
        fossilSite: "Jebel Irhoud (Marruecos, ~315,000 años)"
      },
      {
        id: "megatherium",
        name: "Megatherium americanum",
        commonName: "Perezoso Terrestre Gigante",
        image: "assets/species/megatherium.svg",
        group: "Mamífero xenartro (Folívoro)",
        diet: "Herbívoro (Ramoneador)",
        habitat: "Terrestre (Pampas y bosques de Sudamérica)",
        length: "6.0 m",
        weight: "4.0 toneladas",
        scaleVsHuman: "Tan alto como un elefante africano cuando se erguía sobre dos patas.",
        description: "Colosal perezoso terrestre cuadrúpedo que podía erguirse sobre sus robustas patas traseras y su poderosa cola para alcanzar las copas de los árboles, defendiéndose con garras curvas de más de 30 cm.",
        lat: -38.5,
        lon: -60.2,
        fossilSite: "Formación Pampeana (Buenos Aires, Argentina)"
      }
    ],
    events: [
      "Retroceso de los últimos glaciares continentales hace ~11,700 años.",
      "Desarrollo de la agricultura, revolución industrial y urbanización planetaria.",
      "Configuración tectónica actual con cuencas oceánicas maduras."
    ],
    fossilSites: [
      { name: "Rancho La Brea", lat: 34.06, lon: -118.36, period: "Pleistoceno Superior", desc: "Pozos de asfalto natural que atraparon miles de carnívoros como Smilodon y lobos gigantes." },
      { name: "Cueva de Chauvet", lat: 44.38, lon: 4.41, period: "Paleolítico Superior", desc: "Santuario de arte rupestre con pinturas parietales de mamuts, leones y rinocerontes lanudos." }
    ]
  },
  {
    id: "miocene_20ma",
    name: "Mioceno (Neógeno)",
    period: "Mioceno",
    era: "Cenozoico",
    eon: "Fanerozoico",
    timeMa: 20,
    iugsColor: "#FFFF00",
    textureFile: "textures/paleomap/20ma.jpg",
    climate: {
      temperature: 18,
      tempDelta: "+3°C vs actual",
      oxygen: 20,
      co2: 500,
      seaLevel: "+25 m vs actual",
      description: "Clima cálido global que dio paso a una paulatina aridificación y expansión masiva de pastizales de gramíneas C4."
    },
    atmosphere: {
      o2: "20%",
      co2: "500 ppm",
      pressure: "1.0 atm",
      summary: "Condiciones atmosféricas muy similares a las modernas pero con mayor humedad y temperatura en latitudes altas."
    },
    flora: [
      "Radiación explosiva de las gramíneas (pastos C4)",
      "Retirada de los densos bosques tropicales hacia los trópicos",
      "Aparición de las primeras sabanas abiertas de tipo africano"
    ],
    fauna: [
      "Evolución de caballos veloces hipsodontos adaptados a pastar sílice",
      "Surgimiento de cetáceos dentados modernos y superdepredadores marinos",
      "Diversificación de félidos y cánidos corredores"
    ],
    species: [
      {
        id: "megalodon",
        name: "Otodus megalodon",
        commonName: "Tiburón Megalodón",
        image: "assets/species/megalodon.jpg",
        group: "Pez condrictio (Lamniforme)",
        diet: "Carnívoro (Superdepredador marino)",
        habitat: "Marino (Océanos cálidos globales)",
        length: "16.0 m",
        weight: "50 toneladas",
        scaleVsHuman: "Casi 10 veces la longitud de un humano y 3 veces un gran tiburón blanco.",
        description: "El tiburón más colosal de la historia de la Tierra. Poseía dientes triangulares aserrados de hasta 18 cm de altura y una mordedura calculada en más de 180,000 newtons con la que fracturaba las costillas de ballenas barbadas.",
        lat: 32.78,
        lon: -79.93,
        fossilSite: "Formación Yorktown / Cuenca de Charleston (EE. UU.)"
      },
      {
        id: "paraceratherium",
        name: "Paraceratherium transouralicum",
        commonName: "Indricoterio (Rinoceronte Gigante)",
        image: "assets/species/paraceratherium.svg",
        group: "Mamífero perisodáctilo (Hiracodóntido)",
        diet: "Herbívoro (Ramoneador de copas altas)",
        habitat: "Terrestre (Bosques abiertos y llanuras de Asia)",
        length: "7.4 m",
        weight: "17.0 toneladas",
        scaleVsHuman: "4.8 metros de altura al hombro; la cabeza superaba el segundo piso de un edificio.",
        description: "Uno de los mamíferos terrestres más gigantescos jamás existidos. Pariente sin cuernos de los rinocerontes modernos con cuello alargado para alimentarse del follaje arbóreo inaccesible para otros herbívoros.",
        lat: 44.5,
        lon: 66.8,
        fossilSite: "Estratos de Bugti (Pakistán) y Kazajistán"
      },
      {
        id: "purussaurus",
        name: "Purussaurus brasiliensis",
        commonName: "Caimán Gigante del Proto-Amazonas",
        image: "assets/species/purussaurus.svg",
        group: "Reptil crocodilio (Aligatórido)",
        diet: "Carnívoro (Superdepredador dulceacuícola)",
        habitat: "Acuático / Ribereño (Humedales de Pebas)",
        length: "11.5 m",
        weight: "6.2 toneladas",
        scaleVsHuman: "Más del doble del tamaño del cocodrilo marino moderno más grande.",
        description: "Monstruoso caimán que habitó el sistema de pantanos de Pebas en la Amazonía miocena. Su cráneo robusto de 1.4 metros ejercía una fuerza de mordida estimada en 69,000 N.",
        lat: -9.5,
        lon: -69.2,
        fossilSite: "Formación Solimões (Acre, Brasil)"
      },
      {
        id: "argentavis",
        name: "Argentavis magnificens",
        commonName: "Teratornítido Gigante de las Pampas",
        image: "assets/species/argentavis.svg",
        group: "Ave falconiforme (Teratornítidos)",
        diet: "Carnívoro / Carroñero",
        habitat: "Aéreo / Terrestre (Llanuras pampeanas)",
        length: "3.5 m",
        weight: "72 kg",
        scaleVsHuman: "Envergadura de 7 metros, equivalente a una avioneta monomotor Cessna.",
        description: "Una de las aves voladoras más inmensas de todos los tiempos. Aprovechaba las corrientes térmicas ascendentes de las llanuras sudamericanas para planear sin esfuerzo en busca de carroña o presas vivas medianas.",
        lat: -36.6,
        lon: -64.3,
        fossilSite: "Formación Epecuén / Salinas Chicas (La Pampa, Argentina)"
      }
    ],
    events: [
      "Colisión de la placa arábiga con Eurasia cerrando progresivamente el mar de Tetis.",
      "Aislamiento de la Antártida y fortalecimiento de la Corriente Circumpolar Antártica.",
      "Elevación tectónica acelerada de la cordillera del Himalaya y los Andes."
    ],
    fossilSites: [
      { name: "Humedales de Pebas", lat: -4.5, lon: -73.2, period: "Mioceno Medio", desc: "Megasistema lacustre protoamazónico con tortugas colosales (Stupendemys) y caimanes gigantes." }
    ]
  },
  {
    id: "eocene_50ma",
    name: "Eoceno Temprano",
    period: "Eoceno",
    era: "Cenozoico",
    eon: "Fanerozoico",
    timeMa: 50,
    iugsColor: "#FDC07A",
    textureFile: "textures/paleomap/50ma.jpg",
    climate: {
      temperature: 25,
      tempDelta: "+10°C vs actual",
      oxygen: 22,
      co2: 1200,
      seaLevel: "+100 m vs actual",
      description: "Periodo 'Hothouse' (Tierra Invernadero) sin hielo polar permanente; bosques templados y cocodrilos poblaban el archipiélago ártico."
    },
    atmosphere: {
      o2: "22%",
      co2: "1200 ppm",
      pressure: "1.0 atm",
      summary: "Efecto invernadero natural extremo debido a pulsos de liberación masiva de metano e intensa actividad volcánica."
    },
    flora: [
      "Selvas tropicales y paratropicales cubriendo Europa y Norteamérica",
      "Bosques de coníferas y palmeras creciendo cerca de los polos ártico y antártico",
      "Proliferación del helecho flotante Azolla en el océano Ártico dulceacuícola"
    ],
    fauna: [
      "Primeros ancestros de los órdenes de mamíferos modernos (cetáceos, proboscídeos, équidos)",
      "Aves no voladoras gigantes ocupando nichos de depredadores ápice",
      "Diversificación explosiva de pequeños primates primitivos adapiformes"
    ],
    species: [
      {
        id: "basilosaurus",
        name: "Basilosaurus cetoides",
        commonName: "Ballena Primitiva Alargada",
        image: "assets/species/basilosaurus.svg",
        group: "Cetáceo arqueoceto (Basilosáurido)",
        diet: "Carnívoro marino",
        habitat: "Marino (Mares someros del Tetis)",
        length: "18.0 m",
        weight: "14 toneladas",
        scaleVsHuman: "Cuerpo serpentiforme equivalente al largo de un autobús articulado.",
        description: "Cetáceo arcaico con cuerpo extremadamente alargado que aún conservaba patas traseras vestigiales articuladas con diminutos dedos, testimonio directo de su origen terrestre a partir de ungulados artiodáctilos.",
        lat: 31.8,
        lon: -88.1,
        fossilSite: "Wadi El Hitan (Valle de las Ballenas, Egipto)"
      },
      {
        id: "ambulocetus",
        name: "Ambulocetus natans",
        commonName: "La Ballena Andante de Pakistán",
        image: "assets/species/ambulocetus.svg",
        group: "Cetáceo arqueoceto basal",
        diet: "Carnívoro (Depredador de emboscada)",
        habitat: "Anfibio (Costas salobres y estuarios)",
        length: "3.0 m",
        weight: "220 kg",
        scaleVsHuman: "Similar al tamaño de un león marino grande.",
        description: "Forma de transición fósil crucial que evidencia cómo los ancestros de las ballenas se adaptaron a nadar ondulando la columna vertebral mientras aún conservaban cuatro patas funcionales para caminar en tierra.",
        lat: 33.6,
        lon: 72.8,
        fossilSite: "Formación Kuldana (Panyab, Pakistán)"
      },
      {
        id: "gastornis",
        name: "Gastornis gigantea",
        commonName: "Ave Colosal de Pico Robusto",
        image: "assets/species/gastornis.svg",
        group: "Ave anseriforme (Gastornítidos)",
        diet: "Herbívoro / Frugívoro (Triturador de frutos duros)",
        habitat: "Terrestre (Bosques densos subtropicales)",
        length: "2.1 m",
        weight: "160 kg",
        scaleVsHuman: "Superaba en altura a un humano adulto medio, con un pico de 45 cm.",
        description: "Enorme ave terrestre áptera con patas fornidas y un pico colosal y comprimido lateralmente. Inicialmente supuesta carnívora temible, análisis isotópicos de calcio demostraron que consumía nueces duras y semillas.",
        lat: 49.2,
        lon: 3.4,
        fossilSite: "Cuenca de París (Francia) y Formación Willwood (EE. UU.)"
      },
      {
        id: "titanoboa",
        name: "Titanoboa cerrejonensis",
        commonName: "Serpiente Gigante del Cerrejón",
        image: "assets/species/titanoboa.svg",
        group: "Reptil escamado (Boidae)",
        diet: "Carnívoro / Piscívoro",
        habitat: "Fluvial / Selva pantanosa ecuatorial",
        length: "13.0 m",
        weight: "1.1 toneladas",
        scaleVsHuman: "Su cuerpo superaba el metro de diámetro; pesaba más que un automóvil utilitario.",
        description: "La serpiente más gigantesca jamás documentada. Vivió en los bosques pantanosos ultra-cálidos del Paleoceno-Eoceno en Colombia, donde las temperaturas de 32-34°C permitieron su colosal metabolismo poiquilotermo.",
        lat: 11.1,
        lon: -72.6,
        fossilSite: "Mina de carbón del Cerrejón (La Guajira, Colombia)"
      }
    ],
    events: [
      "Máximo Térmico del Paleoceno-Eoceno (PETM hace ~56 Ma) con pico térmico planetario.",
      "Inicio del choque tectónico entre el subcontinente indio y Eurasia.",
      "Océano Ártico casi cerrado cubierto de agua dulce y densas matas del helecho Azolla."
    ],
    fossilSites: [
      { name: "Messel Pit (Fosa de Messel)", lat: 49.92, lon: 8.75, period: "Eoceno Medio", desc: "Yacimiento de conservación excepcional con mamíferos tempranos completos, pelos y contenido estomacal fosilizados." }
    ]
  },
  {
    id: "cretaceous_66ma",
    name: "Límite Cretácico-Paleógeno (K-Pg)",
    period: "Cretácico",
    era: "Mesozoico",
    eon: "Fanerozoico",
    timeMa: 66,
    iugsColor: "#80FF68",
    textureFile: "textures/paleomap/66ma.jpg",
    climate: {
      temperature: 22,
      tempDelta: "+7°C vs actual",
      oxygen: 24,
      co2: 900,
      seaLevel: "+80 m vs actual",
      description: "Clima global cálido y uniforme antes del colapso cataclísmico por el impacto del asteroide Chicxulub."
    },
    atmosphere: {
      o2: "24%",
      co2: "900 ppm",
      pressure: "1.0 atm",
      summary: "Elevada concentración de oxígeno que sostenía gigantescas tasas metabólicas en dinosaurios y pterosaurios."
    },
    flora: [
      "Bosques de coníferas, cícadas, ginkgos y helechos",
      "Rápida diversificación y dominancia de las plantas con flor (angiospermas)",
      "Primeros árboles con frutos y flores polinizadas por insectos modernos"
    ],
    fauna: [
      "Dinosaurios no avianos en la cúspide trófica terrestre hasta el impacto",
      "Pterosaurios azdárquidos de tamaños descomunales surcando los cielos",
      "Mosasaurios y plesiosaurios dominando los mares cálidos someros"
    ],
    species: [
      {
        id: "tyrannosaurus",
        name: "Tyrannosaurus rex",
        commonName: "Tirano Rey",
        image: "assets/species/tyrannosaurus.jpg",
        group: "Dinosaurio terópodo (Tiranosáurido)",
        diet: "Carnívoro (Depredador ápice / Carroñero facultativo)",
        habitat: "Terrestre (Llanuras de inundación y bosques abiertos)",
        length: "12.4 m",
        weight: "8.5 toneladas",
        scaleVsHuman: "Casi 7 veces la estatura humana; su cabeza medía 1.5 metros.",
        description: "El superdepredador terrestre más emblemático del Cretácico Tardío. Dotado de visión binocular estereoscópica, sentido del olfato hiperdesarrollado y la mordedura más demoledora entre animales terrestres (~35,000 a 57,000 N), capaz de triturar huesos macizos de triceratops.",
        lat: 47.0,
        lon: -106.0,
        fossilSite: "Formación Hell Creek (Montana, EE. UU.)"
      },
      {
        id: "triceratops",
        name: "Triceratops horridus",
        commonName: "Dinosaurio de Tres Cuernos",
        image: "assets/species/triceratops.svg",
        group: "Dinosaurio ceratópsido (Casmosaurino)",
        diet: "Herbívoro (Plantas fibrosas y palmeras)",
        habitat: "Terrestre (Llanuras aluviales de Laramidia)",
        length: "8.5 m",
        weight: "8.0 toneladas",
        scaleVsHuman: "Masa comparable a un camión cisterna; cráneo de 2.5 metros.",
        description: "Famoso dinosaurio cornudo con dos cuernos supraorbitales de un metro de longitud, un cuerno nasal corto y una gola ósea maciza que servía tanto para defensa ante tiranosáuridos como para exhibición social y cortejo intraespecífico.",
        lat: 44.1,
        lon: -104.5,
        fossilSite: "Formación Lance (Wyoming, EE. UU.)"
      },
      {
        id: "quetzalcoatlus",
        name: "Quetzalcoatlus northropi",
        commonName: "Pterosaurio Gigante Azdárquido",
        image: "assets/species/quetzalcoatlus.svg",
        group: "Reptil volador (Pterosauria / Azhdarchidae)",
        diet: "Carnívoro (Depredador terrestre de zancada)",
        habitat: "Aéreo / Terrestre (Llanuras semiáridas)",
        length: "10.5 m (Envergadura)",
        weight: "220 kg",
        scaleVsHuman: "De pie en el suelo era tan alto como una jirafa adulta (~5 m).",
        description: "El mayor animal volador de todos los tiempos. Con una envergadura alar de 10 a 11 metros, lanzaba su vuelo mediante despegue cuadrúpedo impulsado por sus poderosos músculos pectorales y descendía a tierra para cazar vertebrados pequeños como una cigüeña colosal.",
        lat: 29.3,
        lon: -103.2,
        fossilSite: "Formación Javelina (Parque Nacional Big Bend, Texas, EE. UU.)"
      },
      {
        id: "ankylosaurus",
        name: "Ankylosaurus magniventris",
        commonName: "Tanque Viviente Acorazado",
        image: "assets/species/ankylosaurus.svg",
        group: "Dinosaurio tireóforo (Anquilosáurido)",
        diet: "Herbívoro (Vegetación baja resistente)",
        habitat: "Terrestre (Bosques y valles fluviales)",
        length: "7.5 m",
        weight: "6.0 toneladas",
        scaleVsHuman: "Cuerpo acorazado bajo y ancho de casi 2 metros de envergadura.",
        description: "Herbívoro fuertemente blindado cubierto de osteodermos óseos fusionados que protegían hasta sus párpados. Su cola remataba en una pesada maza de hueso denso que podía asestar impactos de fuerza letal contra las patas de cualquier depredador.",
        lat: 49.0,
        lon: -111.6,
        fossilSite: "Formación Hell Creek / Scollard (Alberta, Canadá)"
      },
      {
        id: "mosasaurus",
        name: "Mosasaurus hoffmannii",
        commonName: "Superdepredador Marino Cretácico",
        image: "assets/species/mosasaurus.svg",
        group: "Reptil escamado marino (Mosasáurido)",
        diet: "Carnívoro marino",
        habitat: "Marino (Mares someros del Atlántico y Tetis)",
        length: "14.5 m",
        weight: "15 toneladas",
        scaleVsHuman: "Casi 8 veces el largo de un humano; cabeza de 1.8 metros.",
        description: "Lagarto marino derivado emparentado con los varanos modernos que desarrolló aletas hidrodinámicas y una poderosa aleta caudal bilobulada. Cazaba amonites, tortugas marinas, plesiosaurios y peces gigantes.",
        lat: 50.8,
        lon: 5.7,
        fossilSite: "Canteras de caliza de Maastricht (Países Bajos)"
      }
    ],
    events: [
      "Impacto del asteroide de Chicxulub (10-15 km de diámetro) en la península de Yucatán hace 66.04 Ma.",
      "Megavolcanismo masivo de los Traps del Decán en la placa india.",
      "Extinción masiva del 75% de todas las especies del planeta, incluidos los dinosaurios no aviares."
    ],
    fossilSites: [
      { name: "Cráter de Chicxulub", lat: 21.3, lon: -89.5, period: "Límite K-Pg (66.0 Ma)", desc: "Estructura de impacto de 180 km sepultada bajo sedimentos en Yucatán, causante de la extinción masiva." },
      { name: "Formación Hell Creek", lat: 47.0, lon: -106.0, period: "Maastrichtiense", desc: "El yacimiento continental más rico del mundo con registros del ocaso de los dinosaurios." }
    ]
  },
  {
    id: "cretaceous_105ma",
    name: "Cretácico Medio",
    period: "Cretácico",
    era: "Mesozoico",
    eon: "Fanerozoico",
    timeMa: 105,
    iugsColor: "#93FF7A",
    textureFile: "textures/paleomap/105ma.jpg",
    climate: {
      temperature: 24,
      tempDelta: "+9°C vs actual",
      oxygen: 23,
      co2: 1400,
      seaLevel: "+150 m vs actual",
      description: "Superinvernadero cretácico con extensos mares interiores someros que inundaban gran parte de Norteamérica, Eurasia y África."
    },
    atmosphere: {
      o2: "23%",
      co2: "1400 ppm",
      pressure: "1.0 atm",
      summary: "Altos niveles de CO2 promovidos por el magmatismo submarino de mesetas basálticas oceánicas (Ontong Java)."
    },
    flora: [
      "Expansión revolucionaria de las angiospermas (plantas con flor)",
      "Bosques templados de coníferas primitivas (Araucariaceae, Podocarpaceae)",
      "Helechos arborescentes poblando llanuras de inundación"
    ],
    fauna: [
      "Dinosaurios terópodos de dimensiones titánicas (espinosáuridos y carcarodontosáuridos)",
      "Titanosaurios gigantes alcanzando masas colosales",
      "Cocodrilomorfos gigantes de agua dulce ocupando deltas fluviales"
    ],
    species: [
      {
        id: "spinosaurus",
        name: "Spinosaurus aegyptiacus",
        commonName: "Espinosaurio Semiacuático",
        image: "assets/species/spinosaurus.jpg",
        group: "Dinosaurio terópodo (Espinosáurido)",
        diet: "Piscívoro / Carnívoro semiacuático",
        habitat: "Fluvial / Deltaico (Manglares y ríos del norte de África)",
        length: "14.5 m",
        weight: "7.4 toneladas",
        scaleVsHuman: "El terópodo carnívoro más largo conocido, con una vela dorsal de 1.8 m de altura.",
        description: "Excepcional dinosaurio cazador fluvial con hocico largo similar al de un cocodrilo, dientes cónicos lisos para atrapar peces sierra gigantes (Onchopristis) y cola ancha en forma de remo para propulsión acuática.",
        lat: 31.0,
        lon: -4.0,
        fossilSite: "Lechos de Kem Kem (Marruecos / Egipto)"
      },
      {
        id: "carcharodontosaurus",
        name: "Carcharodontosaurus saharicus",
        commonName: "Reptil Dientes de Tiburón",
        image: "assets/species/carcharodontosaurus.svg",
        group: "Dinosaurio terópodo (Carcarodontosáurido)",
        diet: "Carnívoro terrestre",
        habitat: "Terrestre (Llanuras aluviales y sabanas prehistóricas)",
        length: "12.8 m",
        weight: "7.5 toneladas",
        scaleVsHuman: "Cráneo de 1.6 metros con dientes aserrados cortantes de hasta 20 cm.",
        description: "Depredador dominante de tierra firme que coexistió con Spinosaurus en los ecosistemas africanos. A diferencia de los dientes trituradores de T-Rex, sus dientes eran planos como hojas de sable para desgarrar masivas heridas sangrantes.",
        lat: 30.5,
        lon: -4.5,
        fossilSite: "Formación Bahariya (Egipto) y Kem Kem (Marruecos)"
      },
      {
        id: "argentinosaurus",
        name: "Argentinosaurus huinculensis",
        commonName: "Titanosaurio Gigante Patagónico",
        image: "assets/species/argentinosaurus.svg",
        group: "Dinosaurio saurópodo (Titanosauria)",
        diet: "Herbívoro",
        habitat: "Terrestre (Llanuras de inundación de la Patagonia)",
        length: "35.0 m",
        weight: "75.0 toneladas",
        scaleVsHuman: "Tan largo como tres autobuses alineados y con vértebras de más de 1.5 metros de altura.",
        description: "Uno de los mayores animales terrestres conocidos en la historia del planeta. Sus fémures fosilizados superan los 2.5 metros de longitud y su paso hacía retumbar la llanura patagónica cretácica.",
        lat: -39.0,
        lon: -69.2,
        fossilSite: "Formación Huincul (Plaza Huincul, Neuquén, Argentina)"
      },
      {
        id: "sarcosuchus",
        name: "Sarcosuchus imperator",
        commonName: "SuperCroc del Sahara",
        image: "assets/species/sarcosuchus.svg",
        group: "Reptil folidosáurido (Cocodrilomorfo)",
        diet: "Carnívoro (Depredador fluvial de emboscada)",
        habitat: "Fluvial / Ripario (Grandes sistemas fluviales africanos)",
        length: "9.5 m",
        weight: "3.5 toneladas",
        scaleVsHuman: "Cráneo de casi 2 metros de largo rematado en una bula bulbosa.",
        description: "Cocodriliforme colosal que acechaba en los márgenes de los caudalosos ríos saharianos, capaz de emboscar dinosaurios herbívoros de mediano tamaño cuando se acercaban a beber.",
        lat: 16.5,
        lon: 11.8,
        fossilSite: "Formación Elrhaz (Desierto de Ténéré, Níger)"
      }
    ],
    events: [
      "Apertura acelerada del Océano Atlántico Sur, separando definitivamente Sudamérica de África.",
      "Formación del Mar Interior Occidental que dividió Norteamérica en dos subcontinentes (Laramidia y Appalachia).",
      "Eventos anóxicos oceánicos (OAE) que depositaron lutitas ricas en hidrocarburos."
    ],
    fossilSites: [
      { name: "Lechos de Kem Kem", lat: 31.0, lon: -4.0, period: "Cenomaniense", desc: "El lugar más peligroso de la historia de la Tierra por su concentración insólita de superdepredadores carnívoros." }
    ]
  },
  {
    id: "jurassic_150ma",
    name: "Jurásico Tardío",
    period: "Jurásico",
    era: "Mesozoico",
    eon: "Fanerozoico",
    timeMa: 150,
    iugsColor: "#34B2C9",
    textureFile: "textures/paleomap/150ma.jpg",
    climate: {
      temperature: 20,
      tempDelta: "+5°C vs actual",
      oxygen: 22,
      co2: 1100,
      seaLevel: "+60 m vs actual",
      description: "Clima cálido, templado y húmedo a escala global; ausencia total de casquetes de hielo polares."
    },
    atmosphere: {
      o2: "22%",
      co2: "1100 ppm",
      pressure: "1.0 atm",
      summary: "Atmósfera rica en dióxido de carbono que fomentó un crecimiento vegetal colosal y gigantescas biomasas de saurópodos."
    },
    flora: [
      "Bosques exhuberantes dominados por coníferas gigantes (ancestros de secuoyas y araucarias)",
      "Bosquetes de cícadas, bennettitales y ginkgos",
      "Extensas praderas de helechos que cubrían las planicies"
    ],
    fauna: [
      "Gigantescos dinosaurios saurópodos de cuello largo dominando el ramoneo alto",
      "Terópodos alosáuridos como superdepredadores de tierra firme",
      "Origen y primeros vuelos de las aves primitivas a partir de manirraptores"
    ],
    species: [
      {
        id: "brachiosaurus",
        name: "Brachiosaurus altithorax",
        commonName: "Braquiosaurio",
        image: "assets/species/brachiosaurus.jpg",
        group: "Dinosaurio saurópodo (Braquiosáurido)",
        diet: "Herbívoro (Ramoneador de copas arbóreas altas)",
        habitat: "Terrestre (Bosques semiáridos de coníferas)",
        length: "23.0 m",
        weight: "40.0 toneladas",
        scaleVsHuman: "Altura de 13 metros con el cuello erguido; superaba la copa de un árbol de 4 pisos.",
        description: "Colosal saurópodo cuadrúpedo con patas delanteras más largas que las traseras, diseñado anatómicamente para alcanzar las copas de las coníferas más elevadas sin necesidad de erguirse sobre sus extremidades posteriores.",
        lat: 39.1,
        lon: -108.7,
        fossilSite: "Formación Morrison (Colorado y Utah, EE. UU.)"
      },
      {
        id: "allosaurus",
        name: "Allosaurus fragilis",
        commonName: "Depredador Ápice del Jurásico",
        image: "assets/species/allosaurus.svg",
        group: "Dinosaurio terópodo (Alosáurido)",
        diet: "Carnívoro terrestre",
        habitat: "Terrestre (Llanuras y bosques fluviales)",
        length: "9.2 m",
        weight: "2.3 toneladas",
        scaleVsHuman: "Más de 5 veces la estatura humana; garras en forma de gancho de 25 cm.",
        description: "El superdepredador más común y exitoso del Jurásico norteamericano. Su mandíbula poseía articulaciones cinéticas que le permitían abrir la boca con un ángulo descomunal para usar la mandíbula superior como un hacha contra saurópodos y estegosaurios.",
        lat: 39.3,
        lon: -110.7,
        fossilSite: "Cleveland-Lloyd Dinosaur Quarry (Utah, EE. UU.)"
      },
      {
        id: "stegosaurus",
        name: "Stegosaurus stenops",
        commonName: "Dinosaurio de Placas y Púas",
        image: "assets/species/stegosaurus.svg",
        group: "Dinosaurio tireóforo (Estegosáurido)",
        diet: "Herbívoro (Vegetación baja y helechos)",
        habitat: "Terrestre (Llanuras de inundación)",
        length: "9.0 m",
        weight: "5.0 toneladas",
        scaleVsHuman: "Doble hilera de placas dorsales de hasta 60 cm de altura.",
        description: "Herbívoro icónico con 17 placas dérmicas osteodérmicas alternadas en el lomo, irrigadas por vasos sanguíneos para termorregulación y exhibición, y cuatro púas óseas en la cola ('tagomizador') para autodefensa letal.",
        lat: 40.4,
        lon: -109.3,
        fossilSite: "Dinosaur National Monument (Utah, EE. UU.)"
      },
      {
        id: "archaeopteryx",
        name: "Archaeopteryx lithographica",
        commonName: "Eslabón Fósil Ave-Dinosaurio",
        image: "assets/species/archaeopteryx.svg",
        group: "Dinosaurio aviano basal (Avialae)",
        diet: "Carnívoro pequeño / Insectívoro",
        habitat: "Arbóreo / Islas coralinas del mar de Solnhofen",
        length: "0.5 m",
        weight: "0.8 kg",
        scaleVsHuman: "Tamaño comparable a un cuervo o una urraca moderna.",
        description: "El fósil de transición más célebre de la paleontología, descubierto dos años después de 'El origen de las especies' de Darwin. Conservaba dientes de dinosaurio, cola ósea larga y garras alares, pero poseía plumas asimétricas de vuelo idénticas a las aves modernas.",
        lat: 48.9,
        lon: 11.0,
        fossilSite: "Calizas litográficas de Solnhofen (Baviera, Alemania)"
      },
      {
        id: "diplodocus",
        name: "Diplodocus carnegii",
        commonName: "Saurópodo de Cola en Látigo",
        image: "assets/species/diplodocus.svg",
        group: "Dinosaurio saurópodo (Diplodócido)",
        diet: "Herbívoro (Ramoneador medio y bajo)",
        habitat: "Terrestre (Valles fluviales de Morrison)",
        length: "26.0 m",
        weight: "15.0 toneladas",
        scaleVsHuman: "Longitud descomunal de un cuarto de cuadra; cola de 80 vértebras caudales.",
        description: "Saurópodo largo y esbelto con una cola extraordinariamente fina que funcionaba como un látigo supersónico capaz de romper la barrera del sonido para disuadir depredadores.",
        lat: 44.5,
        lon: -107.8,
        fossilSite: "Sheep Creek / Formación Morrison (Wyoming, EE. UU.)"
      }
    ],
    events: [
      "Fragmentación activa de Pangea: separación del bloque norte (Laurasia) y sur (Gondwana).",
      "Inundación del Mar de Tetis formando un archipiélago cálido en Europa central.",
      "Apertura incipiente de la cuenca del Atlántico Norte."
    ],
    fossilSites: [
      { name: "Formación Morrison", lat: 39.7, lon: -105.2, period: "Jurásico Superior", desc: "La cantera de dinosaurios gigantes más célebre de Norteamérica." },
      { name: "Caliza de Solnhofen", lat: 48.9, lon: 11.0, period: "Kimmeridgiense", desc: "Lagerstätte lagunar donde se preservaron las plumas microscópicas de Archaeopteryx." }
    ]
  },
  {
    id: "triassic_200ma",
    name: "Triásico Tardío",
    period: "Triásico",
    era: "Mesozoico",
    eon: "Fanerozoico",
    timeMa: 200,
    iugsColor: "#812B92",
    textureFile: "textures/paleomap/200ma.jpg",
    climate: {
      temperature: 22,
      tempDelta: "+7°C vs actual",
      oxygen: 16,
      co2: 1800,
      seaLevel: "+20 m vs actual",
      description: "Supercontinente Pangea con un interior extremadamente árido y desértico, y costas monzónicas hiperestacionales."
    },
    atmosphere: {
      o2: "16%",
      co2: "1800 ppm",
      pressure: "1.0 atm",
      summary: "Niveles de oxígeno deprimidos que favorecieron el desarrollo de sacos aéreos respiratorios unidireccionales en arcosaurios."
    },
    flora: [
      "Bosques de coníferas resistentes a la sequía (Voltziales)",
      "Cícadas y helechos adaptados a climas estacionales extremos",
      "Ausencia absoluta de flores y pastos"
    ],
    fauna: [
      "Primeros dinosaurios primitivos ágiles de pequeño y mediano porte",
      "Pseudosuquios (parientes de cocodrilos) dominando la cúspide terrestre",
      "Ictiosaurios gigantes colonizando el superocéano Pantalasa"
    ],
    species: [
      {
        id: "coelophysis",
        name: "Coelophysis bauri",
        commonName: "Celofisis del Cañón",
        image: "assets/species/coelophysis.svg",
        group: "Dinosaurio terópodo (Celofísido)",
        diet: "Carnívoro grácil",
        habitat: "Terrestre (Llanuras semiáridas de Pangea)",
        length: "2.8 m",
        weight: "25 kg",
        scaleVsHuman: "De complexión ligera y bípeda; altura a la cadera de 1 metro.",
        description: "Uno de los primeros dinosaurios terópodos verdaderos y más exitosos. Con huesos huecos, cuello flexible en S y garras afiladas, cazaba en manadas vertebrados pequeños, cinodontes y ancestros de lagartos.",
        lat: 36.3,
        lon: -106.4,
        fossilSite: "Ghost Ranch (Nuevo México, EE. UU.)"
      },
      {
        id: "postosuchus",
        name: "Postosuchus kirkpatricki",
        commonName: "Pseudosuquio Superdepredador",
        image: "assets/species/postosuchus.svg",
        group: "Reptil arcosaurio (Loricata / Rauisuchia)",
        diet: "Carnívoro ápice terrestre",
        habitat: "Terrestre (Tierras altas y cañones de Pangea)",
        length: "4.5 m",
        weight: "350 kg",
        scaleVsHuman: "Cráneo de 50 cm similar al de un tiranosáurido pero perteneciente al linaje cocodriliano.",
        description: "El superdepredador terrestre que gobernó la Tierra antes del ascenso de los grandes dinosaurios carnívoros. Con extremidades erguidas bajo el cuerpo (no extendidas lateralmente), cazaba dicinodontes y dinosaurios primitivos.",
        lat: 33.2,
        lon: -101.3,
        fossilSite: "Formación Chinle / Post Quarry (Texas, EE. UU.)"
      },
      {
        id: "plateosaurus",
        name: "Plateosaurus trossingensis",
        commonName: "Prosaurópodo Herbívoro Ancestral",
        image: "assets/species/plateosaurus.svg",
        group: "Dinosaurio saurisquio (Plateosáurido)",
        diet: "Herbívoro bípedo facultativo",
        habitat: "Terrestre (Llanuras áridas de Europa central)",
        length: "8.0 m",
        weight: "4.0 toneladas",
        scaleVsHuman: "Más de 4 veces la longitud de un humano; podía erguirse sobre dos patas a 4 metros de altura.",
        description: "Uno de los primeros grandes herbívoros dinosaurianos de la historia, dotado de cuello alargado y pulgares con garras curvas para desgarrar la vegetación seca y defenderse de los rauisuquios.",
        lat: 48.0,
        lon: 8.6,
        fossilSite: "Trossingen (Baden-Wurtemberg, Alemania)"
      },
      {
        id: "shonisaurus",
        name: "Shonisaurus popularis",
        commonName: "Ictiosaurio Colosal de Ojos Enormes",
        image: "assets/species/shonisaurus.svg",
        group: "Reptil marino (Ictiosauria)",
        diet: "Piscívoro / Depredador de cefalópodos",
        habitat: "Marino (Superocéano Pantalasa)",
        length: "15.0 m",
        weight: "30.0 toneladas",
        scaleVsHuman: "Cuerpo masivo con forma de barril; aletas de más de 2 metros de largo.",
        description: "Reptil marino titánico adaptado al océano abierto de Pantalasa. Poseía ojos gigantescos protegidos por anillos escleróticos óseos para cazar amonites y calamares primitivos en la oscuridad de las profundidades marinas.",
        lat: 38.9,
        lon: -117.6,
        fossilSite: "Parque Estatal Berlin-Ichthyosaur (Nevada, EE. UU.)"
      }
    ],
    events: [
      "Provincia Magmática del Atlántico Central (CAMP): erupciones de basalto a escala continental.",
      "Extinción masiva del Triásico-Jurásico (eliminó a la mayoría de los pseudosúquidos y sinápsidos arcaicos).",
      "Supercontinente Pangea en su punto de máxima amalgama territorial."
    ],
    fossilSites: [
      { name: "Ghost Ranch", lat: 36.3, lon: -106.4, period: "Noriense", desc: "Cantera famosa con cientos de esqueletos articulados de Coelophysis congregados por una riada." },
      { name: "Parque Provincial Ischigualasto", lat: -30.1, lon: -67.8, period: "Carniense", desc: "Valle de la Luna argentino con los fósiles más completos de los primeros dinosaurios como Herrerasaurus y Eoraptor." }
    ]
  },
  {
    id: "permian_250ma",
    name: "Límite Pérmico-Triásico ('La Gran Mortandad')",
    period: "Pérmico",
    era: "Paleozoico",
    eon: "Fanerozoico",
    timeMa: 250,
    iugsColor: "#F04028",
    textureFile: "textures/paleomap/250ma.jpg",
    climate: {
      temperature: 28,
      tempDelta: "+13°C vs actual",
      oxygen: 15,
      co2: 2500,
      seaLevel: "+10 m vs actual",
      description: "Supercalentamiento global catastrófico desatado por los Traps Siberianos; océanos anóxicos y acidificados hasta el 96% de letalidad."
    },
    atmosphere: {
      o2: "15%",
      co2: "2500 ppm",
      pressure: "1.0 atm",
      summary: "Colapso de la capa de ozono y liberación masiva de sulfuro de hidrógeno tóxico en atmósfera y mares."
    },
    flora: [
      "Flora de Glossopteris en el hemisferio sur (Gondwana)",
      "Bosques de coníferas tempranas y cícadas en Pangea ecuatorial",
      "Colapso masivo de la biomasa arbórea y proliferación efímera de hongos ('pico fúngico')"
    ],
    fauna: [
      "Sinápsidos no mamíferos (terápsidos y gorgonópsidos) dominando la tierra firme",
      "Trilobites, euriptéridos y corales rugosos extinguiéndose para siempre",
      "Anfibios temnospóndilos de cráneos acorazados en deltas y ríos"
    ],
    species: [
      {
        id: "dimetrodon",
        name: "Dimetrodon limbatus",
        commonName: "Sinápsido de Vela Dorsal",
        image: "assets/species/dimetrodon.jpg",
        group: "Sinápsido esfenacodóntido (Linaje protomamífero)",
        diet: "Carnívoro ápice",
        habitat: "Terrestre (Llanuras de inundación de Pangea)",
        length: "3.5 m",
        weight: "250 kg",
        scaleVsHuman: "Cuerpo bajo y robusto con vela dorsal de 1.5 metros de altura.",
        description: "Aunque a menudo confundido con un dinosaurio, es un sinápsido estrechamente emparentado con el linaje de los mamíferos. Su gran vela vascularizada sobre la espalda le permitía calentarse rápidamente al amanecer para cazar antes que sus presas de sangre fría.",
        lat: 33.8,
        lon: -99.1,
        fossilSite: "Lechos Rojos de Texas (EE. UU.)"
      },
      {
        id: "inostrancevia",
        name: "Inostrancevia alexandri",
        commonName: "Gorgonópsido Dientes de Sable",
        image: "assets/species/inostrancevia.svg",
        group: "Sinápsido terápsido (Gorgonopsia)",
        diet: "Carnívoro (Superdepredador de Pangea)",
        habitat: "Terrestre (Estepas semiáridas rusas)",
        length: "3.5 m",
        weight: "400 kg",
        scaleVsHuman: "Del tamaño de un oso polar grande con caninos de 15 cm.",
        description: "El superdepredador sinápsido cumbre del Pérmico Tardío. Poseía colmillos en forma de sable capaces de perforar la coraza de los grandes herbívoros como Scutosaurus antes del cataclismo de los Traps Siberianos.",
        lat: 61.2,
        lon: 46.5,
        fossilSite: "Río Dviná Septentrional (Rusia)"
      },
      {
        id: "scutosaurus",
        name: "Scutosaurus karpinskii",
        commonName: "Pareiasaurio Blindado",
        image: "assets/species/scutosaurus.svg",
        group: "Pararreptil anápsido (Pareiasauridae)",
        diet: "Herbívoro",
        habitat: "Terrestre (Llanuras áridas de Pangea)",
        length: "3.0 m",
        weight: "1.0 tonelada",
        scaleVsHuman: "Tan pesado y macizo como un toro semental moderno.",
        description: "Herbívoro tanque acorazado con placas óseas embutidas en la piel y extremidades columnares para soportar su pesada estructura mientras trituraba vegetales resistentes con sus dientes en forma de hoja.",
        lat: 60.8,
        lon: 46.0,
        fossilSite: "Cuenca de Kotlas (Rusia)"
      },
      {
        id: "diplocaulus",
        name: "Diplocaulus magnicornis",
        commonName: "Anfibio Cabeza de Boomerang",
        image: "assets/species/diplocaulus.svg",
        group: "Anfibio lepospóndilo (Keraterpetontidae)",
        diet: "Piscívoro",
        habitat: "Acuático dulceacuícola (Ríos y ciénagas)",
        length: "1.0 m",
        weight: "15 kg",
        scaleVsHuman: "Cráneo aplanado de 50 cm con alerones laterales en cuerno.",
        description: "Curioso anfibio acuático cuyo cráneo presentaba enormes expansiones óseas laterales que actuaban como alerones hidroala en corrientes fluviales, facilitándole ascender rápidamente hacia la superficie para atrapar peces.",
        lat: 34.0,
        lon: -99.5,
        fossilSite: "Formación Clear Fork (Texas, EE. UU.)"
      }
    ],
    events: [
      "Erupción cataclísmica de los Traps Siberianos (millones de km³ de basalto fundido quemando capas de carbón).",
      "La Gran Mortandad (Extinción P-Tr): pereció el 96% de la vida marina y el 70% de los vertebrados terrestres.",
      "Anoxia oceánica global y emisión de gases letales de sulfuro de hidrógeno (H2S)."
    ],
    fossilSites: [
      { name: "Meishan (Sección GSSP)", lat: 31.08, lon: 119.7, period: "Límite Changhsingiense-Induense", desc: "El estrato tipo mundial del límite P-Tr que registra la mayor extinción masiva de la biosfera." }
    ]
  },
  {
    id: "carboniferous_300ma",
    name: "Carbonífero Tardío",
    period: "Carbonífero",
    era: "Paleozoico",
    eon: "Fanerozoico",
    timeMa: 300,
    iugsColor: "#67A599",
    textureFile: "textures/paleomap/300ma.jpg",
    climate: {
      temperature: 12,
      tempDelta: "-3°C vs actual",
      oxygen: 35,
      co2: 350,
      seaLevel: "-40 m vs actual",
      description: "Hiperoxigenación planetaria histórica (35% O2) combinada con una glaciación masiva en el polo sur de Gondwana."
    },
    atmosphere: {
      o2: "35%",
      co2: "350 ppm",
      pressure: "1.15 atm",
      summary: "El pico más alto de oxígeno en los 4.500 millones de años de la Tierra, permitiendo el gigantismo de los artrópodos terrestres."
    },
    flora: [
      "Selvas pantanosas ecuatoriales de licofitas gigantes (Lepidodendron y Sigillaria de 30 metros)",
      "Colas de caballo colosales (Calamites) formando densos cañaverales",
      "Primeras coníferas y helechos con semilla (Pteridospermatophyta)"
    ],
    fauna: [
      "Artrópodos gigantes terrestres y aéreos aprovechando el hiperoxígeno",
      "Anfibios temnospóndilos diversificándose en ríos y pantanos",
      "Evolución del huevo amniótico: independencia reproductiva total del agua"
    ],
    species: [
      {
        id: "arthropleura",
        name: "Arthropleura armata",
        commonName: "Milpiés Gigante Acorazado",
        image: "assets/species/arthropleura.jpg",
        group: "Artrópodo miriápodo",
        diet: "Herbívoro / Detritívoro (Troncos y hojas descompuestas)",
        habitat: "Terrestre (Selvas pantanosas ecuatoriales)",
        length: "2.6 m",
        weight: "50 kg",
        scaleVsHuman: "Más largo que un humano adulto recostado; el mayor invertebrado terrestre de todos los tiempos.",
        description: "Miriápodo titánico con más de 30 segmentos corporales acorazados. Su gigantesco tamaño sólo fue biológicamente posible gracias a la asombrosa concentración del 35% de oxígeno atmosférico que alimentaba su sistema de tráqueas pasivas.",
        lat: 55.5,
        lon: -1.6,
        fossilSite: "Howick Bay (Northumberland, Reino Unido)"
      },
      {
        id: "meganeura",
        name: "Meganeura monyi",
        commonName: "Libélula Gigante de los Pantanos",
        image: "assets/species/meganeura.svg",
        group: "Insecto meganisóptero (Grifoflíteros)",
        diet: "Carnívoro aéreo",
        habitat: "Aéreo (Bosques pantanosos de carbón)",
        length: "0.45 m (Envergadura: 75 cm)",
        weight: "450 g",
        scaleVsHuman: "Envergadura de alas comparable a la de un halcón o un cuervo moderno.",
        description: "El insecto volador más grande conocido. Como depredador aéreo de primer orden, atrapaba al vuelo otros insectos gigantes e incluso anfibios pequeños en los frondosos bosques del Carbonífero.",
        lat: 46.3,
        lon: 2.8,
        fossilSite: "Yacimientos hulleros de Commentry (Allier, Francia)"
      },
      {
        id: "pulmonoscorpius",
        name: "Pulmonoscorpius kirktonensis",
        commonName: "Escorpión Gigante Pulmonado",
        image: "assets/species/pulmonoscorpius.svg",
        group: "Arácnido escorpiónido",
        diet: "Carnívoro (Depredador venenoso)",
        habitat: "Terrestre (Sotobosque húmedo)",
        length: "0.7 m",
        weight: "4.5 kg",
        scaleVsHuman: "Casi 10 veces más grande que un escorpión emperador actual.",
        description: "Escorpión terrestre de tamaño descomunal provisto de pulmones en libro hiperdesarrollados y un aguijón bulboso con el que sometía anfibios y artrópodos.",
        lat: 55.9,
        lon: -3.5,
        fossilSite: "East Kirkton Quarry (West Lothian, Escocia)"
      },
      {
        id: "hylonomus",
        name: "Hylonomus lyelli",
        commonName: "Primer Reptil Amniota Verdadero",
        image: "assets/species/hylonomus.svg",
        group: "Reptil sauropsido basal (Protorotirídidos)",
        diet: "Insectívoro",
        habitat: "Terrestre (Troncos huecos de licofitas)",
        length: "0.2 m",
        weight: "100 g",
        scaleVsHuman: "Similar a una lagartija pequeña contemporánea.",
        description: "El reptil más antiguo indiscutido del registro fósil. Protagonizó la mayor revolución reproductiva terrestre: el huevo amniótico con cáscara protectora impermeable que permitió a los vertebrados colonizar el interior de los continentes sin depender del agua para desovar.",
        lat: 45.7,
        lon: -64.4,
        fossilSite: "Acantilados fosilíferos de Joggins (Nueva Escocia, Canadá)"
      }
    ],
    events: [
      "Acumulación masiva de biomasa vegetal sin bacterias capaces de degradar la lignina, originando los yacimientos mundiales de carbón.",
      "Glaciación Karoo en Gondwana polar sur.",
      "Convergencia orogénica de Laurrusia y Gondwana creando los Montes Apalaches y Urales."
    ],
    fossilSites: [
      { name: "Acantilados de Joggins", lat: 45.7, lon: -64.4, period: "Pensilvánico", desc: "Patrimonio Mundial de la UNESCO con tocones fósiles erguidos donde quedaron atrapados los primeros reptiles." }
    ]
  },
  {
    id: "devonian_375ma",
    name: "Devónico Tardío (La Conquista de la Tierra)",
    period: "Devónico",
    era: "Paleozoico",
    eon: "Fanerozoico",
    timeMa: 375,
    iugsColor: "#CB8C37",
    textureFile: "textures/paleomap/370ma.jpg",
    climate: {
      temperature: 20,
      tempDelta: "+5°C vs actual",
      oxygen: 18,
      co2: 2000,
      seaLevel: "+180 m vs actual",
      description: "La 'Era de los Peces'. Primeros bosques verdaderos sobre tierra firme e inicio de la transición de los vertebrados hacia las extremidades con dedos."
    },
    atmosphere: {
      o2: "18%",
      co2: "2000 ppm",
      pressure: "1.0 atm",
      summary: "Caída drástica del CO2 provocada por el desarrollo de raíces profundas de los primeros árboles arborescentes (Archaeopteris)."
    },
    flora: [
      "Primeros bosques verdaderos formados por Archaeopteris (progimnospermas)",
      "Desarrollo de sistemas radiculares profundos que aceleraron la meteorización química del suelo",
      "Primeras plantas con semillas verdaderas en el sotobosque"
    ],
    fauna: [
      "Peces placodermos con blindaje cefálico gobernando los océanos",
      "Peces sarcopterigios de aletas lobuladas adaptándose a aguas someras",
      "Primeros tetrapodomorfos respirando aire y explorando orillas fluviales"
    ],
    species: [
      {
        id: "dunkleosteus",
        name: "Dunkleosteus terrelli",
        commonName: "Placodermo Blindado",
        image: "assets/species/dunkleosteus.jpg",
        group: "Pez placodermo (Artrodiro)",
        diet: "Carnívoro (Superdepredador marino)",
        habitat: "Marino (Arrecifes someros y mares epicontinentales)",
        length: "6.0 m",
        weight: "1.0 tonelada",
        scaleVsHuman: "Casi 3.5 veces la estatura humana; placas óseas craneales de 5 cm de grosor.",
        description: "El superdepredador marino definitivo del Devónico. No tenía dientes convencionales, sino placas óseas dérmicas en forma de cuchillas que se autoafilaban al cerrar la boca con una fuerza de cizalla de más de 5,000 N.",
        lat: 41.5,
        lon: -81.7,
        fossilSite: "Cleveland Shale (Ohio, EE. UU.)"
      },
      {
        id: "tiktaalik",
        name: "Tiktaalik roseae",
        commonName: "El Pez que Caminó",
        image: "assets/species/tiktaalik.jpg",
        group: "Sarcopterigio (Tetrapodomorfo)",
        diet: "Carnívoro de aguas someras",
        habitat: "Fluvial / Ribereño somero",
        length: "2.7 m",
        weight: "60 kg",
        scaleVsHuman: "Similar al tamaño de un cocodrilo joven; cráneo aplanado de 30 cm.",
        description: "El icono fósil supremo de la evolución: el eslabón entre peces y animales terrestres de cuatro patas. Poseía escamas y branquias de pez, pero también cuello móvil articulado, costillas capaces de sostener el cuerpo fuera del agua y aletas con hombro, codo y muñeca funcional.",
        lat: 77.0,
        lon: -86.0,
        fossilSite: "Isla de Ellesmere (Nunavut, Ártico Canadiense)"
      },
      {
        id: "ichthyostega",
        name: "Ichthyostega stensioei",
        commonName: "Tetrapodomorfo Primitivo",
        image: "assets/species/ichthyostega.svg",
        group: "Tetrapodomorfo basal (Ictiostégidos)",
        diet: "Carnívoro / Piscívoro",
        habitat: "Anfibio (Ciénagas costeras y orillas)",
        length: "1.5 m",
        weight: "35 kg",
        scaleVsHuman: "Similar en tamaño a una salamandra gigante del Japón.",
        description: "Uno de los primeros vertebrados terrestres con extremidades pentadáctilas y polidáctilas (7 dedos en sus patas traseras), caja torácica robusta para evitar el colapso de los pulmones en tierra firme y cola con aleta natatoria reminiscente de los peces.",
        lat: 73.5,
        lon: -23.0,
        fossilSite: "Formación Aina Dal (Groenlandia Oriental)"
      },
      {
        id: "materpiscis",
        name: "Materpiscis attenboroughi",
        commonName: "Placodermo Vivíparo con Cordón Umbilical",
        image: "assets/species/materpiscis.svg",
        group: "Pez placodermo (Ptictodóntido)",
        diet: "Durofagia (Moluscos y corales con concha)",
        habitat: "Marino (Arrecife fósil de Gogo)",
        length: "0.25 m",
        weight: "800 g",
        scaleVsHuman: "Tamaño similar a una lubina o trucha mediana.",
        description: "Hallazgo asombroso: el fósil de una hembra con un embrión intrauterino conectado mediante un cordón umbilical fosilizado. Adelantó el origen de la reproducción vivípara interna en los vertebrados en más de 200 millones de años.",
        lat: -18.3,
        lon: 125.8,
        fossilSite: "Formación Gogo (Kimberley, Australia Occidental)"
      }
    ],
    events: [
      "Extinción masiva del Devónico Tardío (Evento Kellwasser y Hangenberg).",
      "Eutrofización global de los océanos provocada por el arrastre de nutrientes de los nuevos suelos boscosos terrestres.",
      "Aparición del suelo moderno (pedogénesis avanzada)."
    ],
    fossilSites: [
      { name: "Cantera de Red Hill", lat: 41.3, lon: -77.3, period: "Fameniense", desc: "Yacimiento clave en Pensilvania que ilustra la ecología de los primeros tetrápodos fluviales." },
      { name: "Arrecife de Gogo", lat: -18.3, lon: 125.8, period: "Frasniense", desc: "Preservación tridimensional en nódulos calcáreos de la anatomía muscular y vasos de peces devónicos." }
    ]
  },
  {
    id: "silurian_430ma",
    name: "Silúrico Medio",
    period: "Silúrico",
    era: "Paleozoico",
    eon: "Fanerozoico",
    timeMa: 430,
    iugsColor: "#B3E1B6",
    textureFile: "textures/paleomap/430ma.jpg",
    climate: {
      temperature: 17,
      tempDelta: "+2°C vs actual",
      oxygen: 14,
      co2: 3000,
      seaLevel: "+120 m vs actual",
      description: "Estabilización climática tras la deglaciación ordovícica; surgimiento de los primeros arrecifes de coral y expansión vegetal pionera a orillas del agua."
    },
    atmosphere: {
      o2: "14%",
      co2: "3000 ppm",
      pressure: "1.0 atm",
      summary: "Consolidación de una capa de ozono protectora (O3) que permitió por primera vez a los seres vivos colonizar tierra firme sin letalidad ultravioleta."
    },
    flora: [
      "Primeras plantas vasculares verdaderas (Cooksonia) colonizando zonas húmedas ribereñas",
      "Briofitas y tapetes de musgos y líquenes extendiéndose sobre las rocas desnudas",
      "Hongos descomponedores primitivos fijando el suelo biológico"
    ],
    fauna: [
      "Euriptéridos (escorpiones marinos gigantes) como depredadores ápice",
      "Primeros peces con mandíbulas verdaderas (Gnathostomata)",
      "Primeros artrópodos terrestres (milpiés pneumodesmidos con espiráculos)"
    ],
    species: [
      {
        id: "eurypterus",
        name: "Eurypterus remipes",
        commonName: "Escorpión Marino Silúrico",
        image: "assets/species/eurypterus.jpg",
        group: "Quelicerado euriptérido",
        diet: "Carnívoro bentónico",
        habitat: "Marino somero y lagunar salobre",
        length: "1.3 m",
        weight: "12 kg",
        scaleVsHuman: "Cuerpo segmentado que alcanzaba la cintura de un humano adulto.",
        description: "Artrópodo depredador marino de gran éxito evolutivo. Nadaba con sus aletas traseras en forma de remo y atrapaba trilobites y peces sin mandíbulas con sus quelíceros espinosos.",
        lat: 43.0,
        lon: -75.0,
        fossilSite: "Formación Furlong / Bertie (Nueva York, EE. UU.)"
      },
      {
        id: "cooksonia",
        name: "Cooksonia caledonica",
        commonName: "Pionera de las Plantas Vasculares",
        image: "assets/species/cooksonia.svg",
        group: "Traqueofita polisporangiada",
        diet: "Autótrofo fotosintético",
        habitat: "Ribereño / Húmedo de agua dulce",
        length: "0.08 m",
        weight: "2 g",
        scaleVsHuman: "Diminuta ramificación de 5 a 8 cm de altura.",
        description: "La primera planta vascular confirmada en la historia de la Tierra. Presentaba tallos fotosintéticos verdes sin hojas verdaderas bifurcados en Y, rematados en esporangios globosos para dispersar esporas por el viento.",
        lat: 56.5,
        lon: -3.5,
        fossilSite: "Old Red Sandstone (Gales y Escocia)"
      },
      {
        id: "birkenia",
        name: "Birkenia elegans",
        commonName: "Pez Ágnato sin Mandíbulas",
        image: "assets/species/birkenia.svg",
        group: "Vertebrado ágnato (Anaspida)",
        diet: "Detritívoro / Filtrador",
        habitat: "Marino somero y estuarino",
        length: "0.1 m",
        weight: "25 g",
        scaleVsHuman: "Tamaño de un boquerón o anchoa pequeña.",
        description: "Pez primitivo desprovisto de mandíbulas articuladas, recubierto de pequeñas escamas rómbicas de hueso dérmico que le conferían flexibilidad para nadar con ondulaciones laterales.",
        lat: 55.6,
        lon: -3.9,
        fossilSite: "Lesmahagow Inlier (Lanarkshire, Escocia)"
      },
      {
        id: "prototaxites",
        name: "Prototaxites loganii",
        commonName: "Hongo Troncal Gigante",
        image: "assets/species/prototaxites.svg",
        group: "Hongo descomponedor (Fungi incertae sedis)",
        diet: "Heterótrofo saprófito",
        habitat: "Terrestre (Llanuras aluviales)",
        length: "8.0 m de altura",
        weight: "1.5 toneladas",
        scaleVsHuman: "Columnas gigantes de 1 metro de diámetro en la base y 8 metros de alto.",
        description: "El organismo terrestre más colosal del Silúrico y Devónico temprano. Mucho antes de que existieran árboles verdaderos, estos misteriosos troncos fungiformes dominaban el horizonte terrestre descomponiendo biomasa microbiana.",
        lat: 48.0,
        lon: -66.0,
        fossilSite: "Formación Battery Point (Península de Gaspesia, Quebec, Canadá)"
      }
    ],
    events: [
      "Orogenia Caledoniana: choque entre Laurentia, Báltica y Avalonia.",
      "Formación de los primeros arrecifes de estromatopóridos y corales tabulados.",
      "Consolidación de las primeras cadenas tróficas terrestres (detritívoros y hongos)."
    ],
    fossilSites: [
      { name: "Yacimientos de Gotland", lat: 57.5, lon: 18.5, period: "Wenlockiense", desc: "Arrecifes silúricos de coral y crinoideos conservados con pureza cristalina en Suecia." }
    ]
  },
  {
    id: "ordovician_470ma",
    name: "Ordovícico Medio",
    period: "Ordovícico",
    era: "Paleozoico",
    eon: "Fanerozoico",
    timeMa: 470,
    iugsColor: "#009270",
    textureFile: "textures/paleomap/470ma.jpg",
    climate: {
      temperature: 16,
      tempDelta: "+1°C vs actual",
      oxygen: 12,
      co2: 4200,
      seaLevel: "+220 m vs actual",
      description: "Gran Radiación Biológica del Ordovícico (GOBE). Mares templados que dieron paso al enfriamiento y formación de un sistema de anillos de polvo asteroidial ecuatorial."
    },
    atmosphere: {
      o2: "12%",
      co2: "4200 ppm",
      pressure: "1.0 atm",
      summary: "Altas concentraciones de gases invernadero que fueron contrarrestadas hacia el final del periodo por la sombra cósmica del anillo de escombros asteroidial."
    },
    flora: [
      "Algas verdes marinas filamentosas poblando aguas someras",
      "Primeras criptoesporas de plantas terrestres no vasculares en orillas húmedas",
      "Colonias microbianas fijadoras de carbonatos"
    ],
    fauna: [
      "Moluscos cefalópodos nautiloideos gigantes de concha recta (ortoconos)",
      "Diversificación explosiva de trilobites con periscopios oculares",
      "Primeros peces acorazados ostracodermos sin mandíbulas"
    ],
    species: [
      {
        id: "cameroceras",
        name: "Cameroceras trentonense",
        commonName: "Ortocono Gigante",
        image: "assets/species/cameroceras.jpg",
        group: "Molusco cefalópodo (Endocerátido)",
        diet: "Carnívoro (Superdepredador de aguas profundas)",
        habitat: "Marino bentónico y pelágico",
        length: "6.0 m",
        weight: "600 kg",
        scaleVsHuman: "Concha cónica recta equivalente a la longitud de un camión mediano.",
        description: "El superdepredador más gigantesco del Paleozoico temprano. Habitaba una concha cónica recta con cámaras de flotación y tentáculos prensiles con los que atrapaba peces acorazados y trilobites para quebrarlos con su pico quitinoso.",
        lat: 43.5,
        lon: -75.3,
        fossilSite: "Trenton Limestone (Nueva York, EE. UU.)"
      },
      {
        id: "asaphus",
        name: "Asaphus kowalewskii",
        commonName: "Trilobites con Ojos de Periscopio",
        image: "assets/species/asaphus.svg",
        group: "Artrópodo trilobites (Asaphida)",
        diet: "Detritívoro / Depredador bentónico",
        habitat: "Marino (Fondos fangosos someros)",
        length: "0.08 m",
        weight: "40 g",
        scaleVsHuman: "Cabe en la palma de una mano humana.",
        description: "Famoso trilobites que evolucionó ojos montados sobre largos pedúnculos erectos de calcita. Esto le permitía permanecer completamente enterrado en el sedimento del fondo marino observando posibles depredadores como un periscopio submarino.",
        lat: 59.9,
        lon: 31.0,
        fossilSite: "Río Vóljov (Región de San Petersburgo, Rusia)"
      },
      {
        id: "astraspis",
        name: "Astraspis desiderata",
        commonName: "Pez Acorazado con Escudo Estrellado",
        image: "assets/species/astraspis.svg",
        group: "Vertebrado ágnato (Ostracodermo)",
        diet: "Micrófago bentónico",
        habitat: "Marino costero somero",
        length: "0.2 m",
        weight: "180 g",
        scaleVsHuman: "Largo similar al antebrazo de un adulto humano.",
        description: "Pez basal desprovisto de mandíbulas y aletas pares, cuyo cuerpo anterior estaba protegido por placas óseas dérmicas con tubérculos poligonales en forma de estrella que constituían su armadura defensiva.",
        lat: 38.4,
        lon: -105.2,
        fossilSite: "Formación Harding Sandstone (Colorado, EE. UU.)"
      },
      {
        id: "promissum",
        name: "Promissum pulchrum",
        commonName: "Conodonto Gigante de Ojos Complejos",
        image: "assets/species/promissum.svg",
        group: "Cordado conodonto (Prioniodontida)",
        diet: "Depredador nectónico",
        habitat: "Marino pelágico frío",
        length: "0.4 m",
        weight: "250 g",
        scaleVsHuman: "Casi 10 veces más grande que los conodontos habituales (de 2-3 cm).",
        description: "Uno de los conodontos fósiles mejor preservados del mundo. Poseía una notocorda dorsal, ojos grandes con conos musculares y una faringe provista de un complejo aparato de elementos dentados fosfatados mineralizados.",
        lat: -32.3,
        lon: 18.9,
        fossilSite: "Lagerstätte Soom Shale (Cabo Occidental, Sudáfrica)"
      }
    ],
    events: [
      "Desintegración de un asteroide condrítico L en el límite de Roche terrestre, formando un anillo de escombros ecuatorial transitorio (~466 Ma, Tomkins et al., 2024).",
      "Gran Radiación Biológica del Ordovícico (GOBE): multiplicación por cuatro de las familias biológicas marinas.",
      "Glaciación Hirnantiana en Gondwana polar sur y extinción masiva del final del Ordovícico."
    ],
    fossilSites: [
      { name: "Estratos del Río Vóljov", lat: 59.9, lon: 31.0, period: "Arenigiense", desc: "Canteras rusas famosas por la conservación tridimensional de trilobites asáfidos con ojos pedunculados." }
    ]
  },
  {
    id: "cambrian_540ma",
    name: "Cámbrico Temprano ('La Explosión Cámbrica')",
    period: "Cámbrico",
    era: "Paleozoico",
    eon: "Fanerozoico",
    timeMa: 540,
    iugsColor: "#7FA056",
    textureFile: "textures/paleomap/540ma.jpg",
    climate: {
      temperature: 21,
      tempDelta: "+6°C vs actual",
      oxygen: 12,
      co2: 4500,
      seaLevel: "+160 m vs actual",
      description: "La mayor radiación evolutiva de la historia biológica: aparición repentina en el registro fósil de casi todos los filos animales modernos con exoesqueletos mineralizados."
    },
    atmosphere: {
      o2: "12%",
      co2: "4500 ppm",
      pressure: "1.0 atm",
      summary: "Incremento sostenido del oxígeno disuelto en las capas superiores del océano que desbloqueó el costo metabólico de producir caparazones y exoesqueletos de carbonato."
    },
    flora: [
      "Algas marinas macroscópicas filamentosas (rodófitas y clorófitas)",
      "Tapetes bacterianos y algales que cubrían el fondo marino",
      "Tierra firme completamente estéril sin vida vegetal macroscópica"
    ],
    fauna: [
      "Primeros superdepredadores con ojos compuestos (radiodontos)",
      "Artrópodos primitivos de morfologías experimentales extravagantes",
      "Primeros cordados con notocorda dorsal (origen de los vertebrados)"
    ],
    species: [
      {
        id: "anomalocaris",
        name: "Anomalocaris canadensis",
        commonName: "Anomalocaris (Camarón Extraño)",
        image: "assets/species/anomalocaris.jpg",
        group: "Artrópodo troncal (Radiodonta)",
        diet: "Carnívoro (Depredador ápice marino)",
        habitat: "Marino pelágico",
        length: "1.0 m",
        weight: "3.5 kg",
        scaleVsHuman: "El animal más grande de su era; alcanzaba el pecho de un humano nadador.",
        description: "El primer superdepredador ápice del registro fósil. Provisto de ojos compuestos con más de 16,000 lentes, aletas laterales ondulantes para nadar con velocidad, dos apéndices frontales espinosos para capturar presas y una boca circular en forma de rodaja de piña armada con placas concéntricas.",
        lat: 51.4,
        lon: -116.5,
        fossilSite: "Burgess Shale (Parque Nacional Yoho, Columbia Británica, Canadá)"
      },
      {
        id: "opabinia",
        name: "Opabinia regalis",
        commonName: "Criatura de Cinco Ojos",
        image: "assets/species/opabinia.svg",
        group: "Artrópodo lobópodo troncal (Opabiniidae)",
        diet: "Carnívoro / Detritívoro de fondo",
        habitat: "Marino bentónico",
        length: "0.07 m",
        weight: "15 g",
        scaleVsHuman: "Cuerpo menudo que cabía en la palma de la mano.",
        description: "Una de las criaturas más extravagantes de Burgess Shale. Poseía 5 ojos compuestos pedunculados dorsales para visión de 360 grados, un cuerpo segmentado con lóbulos laterales y una probóscide frontal flexible y tubular rematada en una garra prensil.",
        lat: 51.4,
        lon: -116.5,
        fossilSite: "Burgess Shale (Columbia Británica, Canadá)"
      },
      {
        id: "hallucigenia",
        name: "Hallucigenia sparsa",
        commonName: "Gusano Espinoso de Burgess Shale",
        image: "assets/species/hallucigenia.svg",
        group: "Ecdisozoo lobópodo",
        diet: "Carroñero / Detritívoro",
        habitat: "Marino bentónico",
        length: "0.03 m",
        weight: "2 g",
        scaleVsHuman: "Diminuto organismo de apenas 3 cm de longitud.",
        description: "Criatura enigmática llamada así por su aspecto alucinante. Durante décadas se reconstruyó al revés; hoy se sabe que caminaba sobre 7 pares de patas blandas terminadas en diminutas garras, mientras 7 pares de espinas rígidas y afiladas apuntaban hacia arriba protegiéndola.",
        lat: 51.4,
        lon: -116.5,
        fossilSite: "Burgess Shale (Canadá) y Chengjiang (China)"
      },
      {
        id: "olenoides",
        name: "Olenoides serratus",
        commonName: "Trilobites Típico de Burgess Shale",
        image: "assets/species/olenoides.svg",
        group: "Artrópodo trilobites (Corynexochida)",
        diet: "Carnívoro / Detritívoro bentónico",
        habitat: "Marino bentónico",
        length: "0.09 m",
        weight: "35 g",
        scaleVsHuman: "Tamaño similar a un cangrejo de río moderno.",
        description: "Trilobites emblemático conservado con sus partes blandas en Burgess Shale: largas antenas sensoriales flexibles y decenas de pares de patas birramosas para caminar y respirar con branquias laminares.",
        lat: 51.4,
        lon: -116.5,
        fossilSite: "Burgess Shale (Canadá)"
      },
      {
        id: "pikaia",
        name: "Pikaia gracilens",
        commonName: "Ancestro de los Vertebrados",
        image: "assets/species/pikaia.svg",
        group: "Cordado basal (Cephalochordata)",
        diet: "Filtrador nectónico",
        habitat: "Marino somero",
        length: "0.04 m",
        weight: "3 g",
        scaleVsHuman: "Cuerpo comprimido como una cinta de apenas 4 cm.",
        description: "El antepasado directo más remoto de todos los peces, dinosaurios, mamíferos y seres humanos. Poseía una notocorda dorsal rígida elástica (precursora de la columna vertebral) y paquetes musculares segmentados en forma de V (miotomos) para nadar como una anguila.",
        lat: 51.4,
        lon: -116.5,
        fossilSite: "Burgess Shale (Columbia Británica, Canadá)"
      }
    ],
    events: [
      "Explosión Cámbrica: radiación biológica explosiva de los planos corporales bilaterales en 20 millones de años.",
      "Aparición generalizada de esqueletos duros biomineralizados (calcita y fosfato de calcio).",
      "Revolución agronómica del sustrato marino: organismos excavadores comenzaron a remover el fango del fondo."
    ],
    fossilSites: [
      { name: "Burgess Shale", lat: 51.4, lon: -116.5, period: "Cámbrico Medio (Wuliuense)", desc: "El yacimiento fosilífero más influyente del mundo por la preservación exquisita de tejidos blandos cámbricos." },
      { name: "Chengjiang Biota", lat: 24.6, lon: 102.9, period: "Cámbrico Inferior", desc: "Patrimonio UNESCO en Yunnan con los primeros fósiles de peces y cordados jamás descubiertos." }
    ]
  },
  {
    id: "ediacaran_600ma",
    name: "Ediacárico Tardío",
    period: "Ediacárico",
    era: "Neoproterozoico",
    eon: "Proterozoico",
    timeMa: 600,
    iugsColor: "#FFC0CB",
    textureFile: "textures/paleomap/600ma.jpg",
    climate: {
      temperature: 14,
      tempDelta: "-1°C vs actual",
      oxygen: 8,
      co2: 3000,
      seaLevel: "+80 m vs actual",
      description: "El amanecer de la vida macroscópica compleja tras las colosales glaciaciones globales del Criogénico."
    },
    atmosphere: {
      o2: "8%",
      co2: "3000 ppm",
      pressure: "1.0 atm",
      summary: "Incremento crucial de la oxigenación oceánica profunda que permitió por primera vez el crecimiento de organismos pluricelulares de gran tamaño."
    },
    flora: [
      "Esteras microbianas espesas cubriendo la totalidad del lecho marino",
      "Colonias de algas rojas y verdes bentónicas",
      "Ausencia absoluta de cualquier forma de vida vegetal en tierra firme"
    ],
    fauna: [
      "Biota de Ediacara: organismos frondosos, acolchados y en forma de disco",
      "Seres con simetría de deslizamiento y ramificación fractal sin boca ni ano conocidos",
      "Primeros organismos con movilidad bilateral activa (Kimberella)"
    ],
    species: [
      {
        id: "dickinsonia",
        name: "Dickinsonia costata",
        commonName: "Dickinsonia",
        image: "assets/species/dickinsonia.jpg",
        group: "Organismo ediacárico (Vendobionta / Proarticulata)",
        diet: "Osmotrofia (Absorción directa de nutrientes a través del tegumento)",
        habitat: "Marino bentónico (Sobre esteras microbianas)",
        length: "0.4 m (Hasta 1.4 m en especímenes gigantes)",
        weight: "1.2 kg",
        scaleVsHuman: "Disco ovalado del tamaño de un plato de servir grande o rueda de bicicleta.",
        description: "El organismo fósil más emblemático del Ediacárico. En 2018, el análisis de biomarcadores moleculares en fósiles del Mar Blanco confirmó la presencia de moléculas de colesterol intactas, demostrando concluyentemente que Dickinsonia era un animal verdadero y el animal confirmado más antiguo de la Tierra.",
        lat: -31.5,
        lon: 138.5,
        fossilSite: "Colinas de Ediacara (Montes Flinders, Australia Meridional)"
      },
      {
        id: "charnia",
        name: "Charnia masoni",
        commonName: "Fronda Fractal Abisal",
        image: "assets/species/charnia.svg",
        group: "Organismo ediacárico (Rangeomorpha)",
        diet: "Osmótrofo filtrador de agua profunda",
        habitat: "Marino bentónico profundo (Bajo la zona fótica)",
        length: "0.6 m (Hasta 2.0 m)",
        weight: "1.5 kg",
        scaleVsHuman: "Fronda erguida de medio metro a dos metros de altura fijada por un disco basal.",
        description: "Extraordinario organismo sésil con arquitectura corporal puramente fractal: cada rama de la fronda repite a escala menor la misma estructura de la hoja completa. Vivía en aguas abisales oscuras fijado al lecho mediante un disco de anclaje.",
        lat: 52.7,
        lon: -1.3,
        fossilSite: "Bosque de Charnwood (Leicestershire, Inglaterra)"
      },
      {
        id: "kimberella",
        name: "Kimberella quadrata",
        commonName: "Criatura Bilateral con Rádula",
        image: "assets/species/kimberella.svg",
        group: "Bilaterio troncal (Probable ancestro de moluscos)",
        diet: "Herbívoros micrófagos de esteras bacterianas",
        habitat: "Marino bentónico somero",
        length: "0.05 m",
        weight: "20 g",
        scaleVsHuman: "Forma de babosa o lapa que cabe en la palma de la mano.",
        description: "Uno de los bilaterios más tempranos y activos. Se arrastraba sobre las alfombras microbianas raspando el sedimento con una probóscide dentada similar a la rádula de los moluscos, dejando huellas fósiles de raspado (Radulichnus).",
        lat: 65.5,
        lon: 39.5,
        fossilSite: "Costa del Mar Blanco (Región de Arcángel, Rusia)"
      },
      {
        id: "spriggina",
        name: "Spriggina floundersi",
        commonName: "Organismo de Simetría Deslizante",
        image: "assets/species/spriggina.svg",
        group: "Proarticulado ediacárico",
        diet: "Detritívoro / Absorción bentónica",
        habitat: "Marino bentónico",
        length: "0.04 m",
        weight: "5 g",
        scaleVsHuman: "Menudo cuerpo segmentado de 3 a 5 cm de longitud.",
        description: "Curioso organismo dotado de un escudo cefálico anterior en forma de herradura y un cuerpo alargado formado por segmentos alternados que no guardan simetría bilateral estricta, sino simetría de deslizamiento (isómeros).",
        lat: -31.5,
        lon: 138.5,
        fossilSite: "Montes Flinders (Australia)"
      }
    ],
    events: [
      "Glaciación Gaskiers (~580 Ma), el último episodio glaciar frío antes del Cámbrico.",
      "Ruptura final del supercontinente Rodinia y ensamblaje transitorio de Pannotia.",
      "Primeros animales de cuerpo blando preservados en areniscas de cuarzo."
    ],
    fossilSites: [
      { name: "Mistaken Point", lat: 46.6, lon: -53.2, period: "Ediacárico (565 Ma)", desc: "Reserva ecológica de Terranova (UNESCO) con miles de fósiles ediacáricos sepultados por ceniza volcánica submarina." },
      { name: "Montes Flinders", lat: -31.5, lon: 138.5, period: "Ediacárico", desc: "El estrato tipo de Australia que dio nombre a este periodo geológico en la escala temporal IUGS." }
    ]
  },
  {
    id: "cryogenian_750ma",
    name: "Criogénico ('Tierra Bola de Nieve')",
    period: "Criogénico",
    era: "Neoproterozoico",
    eon: "Proterozoico",
    timeMa: 750,
    iugsColor: "#E090A0",
    textureFile: "textures/paleomap/750ma.jpg",
    climate: {
      temperature: -35,
      tempDelta: "-50°C vs actual",
      oxygen: 2,
      co2: 12000,
      seaLevel: "-300 m vs actual (Hielo global)",
      description: "Glaciación Sturtiana: el evento climático más extremo de la historia de la Tierra. Capas de hielo de hasta 1 km de espesor cubrieron los océanos desde los polos hasta el ecuador."
    },
    atmosphere: {
      o2: "2%",
      co2: "12000 ppm",
      pressure: "1.1 atm",
      summary: "Acumulación titánica de CO2 de origen volcánico que no podía ser absorbido por meteorización al estar la corteza congelada, hasta provocar un superdeshielo súbito."
    },
    flora: [
      "Cianobacterias extremófilas sobreviviendo en grietas de hielo y manantiales hidrotermales",
      "Algas unicelulares eucariotas refugiadas en oasis polinias ecuatoriales",
      "Cero vegetación terrestre macroscópica"
    ],
    fauna: [
      "Ausencia de animales macroscópicos complejos",
      "Microfósiles de esponjas basales primitivas con cámaras internas (Otavia)",
      "Acritarcos y protistas eucariotas con cubiertas orgánicas protectoras"
    ],
    species: [
      {
        id: "otavia",
        name: "Otavia antiqua",
        commonName: "Microfósil Esponja Basal de Namibia",
        image: "assets/species/otavia.svg",
        group: "Porifera basal / Animal celular",
        diet: "Filtrador micrófago de nutrientes",
        habitat: "Marino bentónico (Bajo el hielo marino somero)",
        length: "0.003 m (0.5 a 5 mm)",
        weight: "0.05 g",
        scaleVsHuman: "Diminuta estructura del tamaño de un grano de arena o cabeza de alfiler.",
        description: "Descubierto en calizas fosilíferas de Namibia con una edad de entre 760 y 550 millones de años. Su cámara fosfatada interna con microporos sugiere que es uno de los animales pluricelulares más primitivos de la historia, sobreviviendo indemne a las dos glaciaciones globales de la Tierra Bola de Nieve.",
        lat: -19.5,
        lon: 17.5,
        fossilSite: "Formación Ombaatjie / Etosha (Namibia)"
      },
      {
        id: "stromatolites",
        name: "Estromatolitos de Cianobacterias",
        commonName: "Arrecifes Microbianos Oxigenadores",
        image: "assets/species/stromatolites.svg",
        group: "Consorcio microbiano cianobacteriano",
        diet: "Autótrofo fotosintético",
        habitat: "Mares someros hipersalinos y aguas termales",
        length: "1.5 m (Estructura de domo)",
        weight: "500 kg",
        scaleVsHuman: "Montículos rocosos del tamaño de rocas o bañeras en la orilla.",
        description: "Estructuras organosedimentarias laminadas construidas por capas sucesivas de cianobacterias fotosintéticas. Fueron los grandes constructores de la biosfera primordial y los artífices de la Gran Oxidación que transformó para siempre la atmósfera terrestre.",
        lat: -26.3,
        lon: 114.1,
        fossilSite: "Cuenca de Amadeus (Australia) y Hamelin Pool (Shark Bay)"
      },
      {
        id: "acritarchs",
        name: "Acritarcos y Eucariotas Marinos",
        commonName: "Microfósiles de Pared Orgánica Resistente",
        image: "assets/species/acritarchs.svg",
        group: "Eucariotas unicelulares (Quistes de dinoflagelados / algas)",
        diet: "Fotosintéticos / Osmótrofos",
        habitat: "Pelágico marino (En grietas y lagunas de hielo)",
        length: "0.0001 m (100 µm)",
        weight: "0.000001 g",
        scaleVsHuman: "Visible únicamente bajo microscopio petrográfico de luz transmitida.",
        description: "Resistentes quistes de pared orgánica gruesa con espinas microscópicas producidos por algas eucariotas primitivas para resistir las condiciones gélidas y la sequía líquida durante los 50 millones de años de congelación planetaria.",
        lat: 78.2,
        lon: 15.6,
        fossilSite: "Formación Elbobreen (Spitsbergen, Svalbard, Noruega)"
      },
      {
        id: "bangiomorpha",
        name: "Bangiomorpha pubescens",
        commonName: "Alga Roja Multicelular (Primer Sexo)",
        image: "assets/species/bangiomorpha.svg",
        group: "Alga roja eucariota (Rhodophyta)",
        diet: "Autótrofo fotosintético",
        habitat: "Marino somero intermareal",
        length: "0.002 m (2 mm)",
        weight: "0.001 g",
        scaleVsHuman: "Filamento pluricelular visible con lupa de mano.",
        description: "El organismo multicelular complejo más antiguo conocido en el que se ha comprobado diferenciación celular sexual (gametos masculinos y femeninos), clave evolutiva para la recombinación genética y la futura explosión biológica.",
        lat: 72.5,
        lon: -80.0,
        fossilSite: "Formación Hunting (Isla Somerset, Ártico de Canadá)"
      }
    ],
    events: [
      "Glaciación Sturtiana (hace ~717-660 Ma) y Glaciación Marinoana (hace ~650-635 Ma).",
      "Efecto albedo desbocado: el hielo polar reflejó tanta radiación solar que congeló los trópicos.",
      "Superinvernadero terminal con deposición de 'Cap Carbonates' (carbonatos de capa) gigantescos tras el deshielo."
    ],
    fossilSites: [
      { name: "Depósitos Glaciares de Port Askaig", lat: 55.8, lon: -6.1, period: "Criogénico", desc: "Estratos de tilitas glaciares y rocas estriadas depositadas bajo masas de hielo continentales en Escocia." }
    ]
  }
];

const bibliography = [
  {
    title: "The Story of Earth: The First 4.5 Billion Years, from Stardust to Living Planet",
    author: "Robert M. Hazen",
    year: 2012,
    publisher: "W. W. Norton & Company",
    isbn: "978-0393345407",
    topic: "Evolución mineralógica, disco protoplanetario de Theia, coevolución geosfera-biosfera"
  },
  {
    title: "Otherlands: A Journey Through Earth's Extinct Worlds (Tierras remotas)",
    author: "Thomas Halliday",
    year: 2022,
    publisher: "Penguin Random House / Allen Lane",
    isbn: "978-0241405741",
    topic: "Paleoecología y reconstrucción inmersiva de 16 biomas prehistóricos desde el Pleistoceno al Ediacárico"
  },
  {
    title: "Life: A Natural History of the First Four Billion Years of Life on Earth",
    author: "Richard Fortey",
    year: 1999,
    publisher: "Vintage Books / The Natural History Museum",
    isbn: "978-0375702617",
    topic: "Evolución biológica y geológica, trilobites y dinámica tectónica continental"
  },
  {
    title: "Atlas of Earth History: Volume 1, Paleogeography",
    author: "Dr. Christopher R. Scotese",
    year: 2001,
    publisher: "PALEOMAP Project / University of Texas",
    isbn: "PALEOMAP-01",
    topic: "Reconstrucciones paleogeográficas y tectónica de placas en alta resolución (base de mapas 3D)"
  },
  {
    title: "A (Very) Short History of Life on Earth: 4.6 Billion Years in 12 Pithy Chapters",
    author: "Henry Gee",
    year: 2021,
    publisher: "St. Martin's Press / Nature Publishing",
    isbn: "978-1250276650",
    topic: "Grandes hitos de la evolución terrestre y transiciones atmosféricas"
  },
  {
    title: "Evidence of a 466-million-year-old asteroid ring system around Earth",
    author: "Andrew G. Tomkins, Erin L. Martin, Peter A. Cawood",
    year: 2024,
    journal: "Earth and Planetary Science Letters, Vol. 646, 118991",
    doi: "10.1016/j.epsl.2024.118991",
    topic: "Evidencia del sistema de anillos ecuatoriales asteroides de la Tierra durante el Ordovícico"
  }
];

const finalOutput = {
  periods: enrichedPeriods,
  bibliography: bibliography
};

const targetPath = path.resolve('public/data/fauna_flora.json');
fs.writeFileSync(targetPath, JSON.stringify(finalOutput, null, 2), 'utf-8');

console.log(`Successfully enriched fauna_flora.json with ${enrichedPeriods.length} periods and ${bibliography.length} bibliographic references.`);
let totalSpecies = 0;
enrichedPeriods.forEach(p => {
  totalSpecies += p.species.length;
  console.log(` - ${p.name}: ${p.species.length} species`);
});
console.log(`Total species cataloged: ${totalSpecies}`);
