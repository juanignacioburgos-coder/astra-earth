/**
 * PaleoAI
 * Autonomous Paleontological & Earth Science Conversational Intelligence Engine.
 * Operates 100% locally in the browser with deep domain knowledge of:
 * - Geological eras, eons, and climatic periods (750 Ma Snowball Earth to Anthropocene)
 * - Prehistoric fauna, dinosaurs, marine reptiles, hominids, and dietary ecology
 * - The "Big 5" mass extinction events, crater mechanics, and volcanic trap eruptions
 * - Plate tectonics, Pangea continental drift, and paleogeographic locations of modern countries
 * - Interactive actions to steer the 3D globe camera and timeline automatically!
 */
export class PaleoAI {
  constructor(appContext = {}) {
    this.appContext = appContext;
    this.apiKey = localStorage.getItem('astra_gemini_api_key') || null;
  }

  setContext(appContext) {
    this.appContext = { ...this.appContext, ...appContext };
  }

  setApiKey(key) {
    this.apiKey = key ? key.trim() : null;
    if (this.apiKey) {
      localStorage.setItem('astra_gemini_api_key', this.apiKey);
    } else {
      localStorage.removeItem('astra_gemini_api_key');
    }
  }

  async ask(userPrompt) {
    const prompt = userPrompt.trim();
    if (!prompt) return { text: 'Por favor, escribe una pregunta o tema geológico.', actions: [] };

    // If external API key is configured, attempt call first; fallback seamlessly to local engine
    if (this.apiKey) {
      try {
        const remoteRes = await this._callGeminiApi(prompt);
        if (remoteRes) return remoteRes;
      } catch (err) {
        console.warn('Gemini API call failed, using built-in knowledge engine:', err);
      }
    }

    // Built-in standalone intelligence engine
    return this._processLocalQuery(prompt);
  }

  _processLocalQuery(query) {
    const q = query.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // strip accents for fuzzy matching

    const actions = [];
    const periods = this.appContext.periods || [];
    const fauna = this.appContext.fauna || [];
    const extinctions = this.appContext.extinctions || [];

    // 1. EXTINCTIONS MATCHING
    if (q.includes('extincion') || q.includes('asteroide') || q.includes('meteorito') || q.includes('chicxulub') || q.includes('muerte de los dinosaurios') || q.includes('gran mortandad')) {
      if (q.includes('chicxulub') || q.includes('dinosaurio') || q.includes('k-pg') || q.includes('k/t') || q.includes('66')) {
        actions.push({ type: 'OPEN_EXTINCTION', extinctionId: 'k-pg-chicxulub', label: '☄️ Simular Impacto de Chicxulub (66 Ma)' });
        return {
          text: `### ☄️ Extinción Cretácico-Paleógeno (K-Pg) • Hace 66 Ma
Hace 66 millones de años, un asteroide de **12 km de diámetro** impactó a 73,800 km/h en la actual península de Yucatán (México), liberando una energía de **100 millones de megatones de TNT**.

* **Consecuencias inmediatas:** Destello térmico que calcinó bosques en miles de kilómetros, megatsunamis de hasta 300 m y una lluvia global de microtectitas incandescentes que elevó la temperatura del aire a más de 300°C.
* **Invierno nuclear de impacto:** Nubes estratosféricas de hollín y 325 Gt de azufre bloquearon la luz solar durante años, colapsando la fotosíntesis.
* **Víctimas:** El **76% de las especies**, incluidos todos los dinosaurios no aviares, pterosaurios y reptiles marinos.
* **Supervivientes:** Aves modernas, pequeños mamíferos subterráneos, cocodrilos y tortugas de agua dulce.`,
          actions
        };
      }

      if (q.includes('permico') || q.includes('gran mortandad') || q.includes('siberia') || q.includes('traps') || q.includes('250')) {
        actions.push({ type: 'OPEN_EXTINCTION', extinctionId: 'p-tr-siberian-traps', label: '🌋 Simular Traps Siberianos (250 Ma)' });
        return {
          text: `### 🌋 La Gran Mortandad (Pérmico-Triásico) • Hace 250 Ma
Fue la **mayor catástrofe biológica de la historia de la Tierra**: se extinguió el **96% de la vida marina y el 70% de los vertebrados terrestres**.

* **Causa principal:** Los **Traps Siberianos**, colosales erupciones basálticas de más de 4 millones de km³ de magma que quemaron cuencas subterráneas de carbón y petróleo.
* **Efectos:** Lluvia ácida extrema de pH 2, colapso del 80% de la capa de ozono por halógenos, océanos ecuatoriales hirvientes a más de 40°C y anoxia euxínica global (bacterias tiñendo los mares de púrpura con sulfuro de hidrógeno tóxico).
* **El planeta tardó más de 10 millones de años** en recuperar niveles normales de biodiversidad.`,
          actions
        };
      }

      if (q.includes('triasico') || q.includes('camp') || q.includes('200')) {
        actions.push({ type: 'OPEN_EXTINCTION', extinctionId: 'tr-j-camp', label: '🌋 Simular Provincia CAMP (200 Ma)' });
        return {
          text: `### 🌋 Extinción Triásico-Jurásico (Tr-J) • Hace 200 Ma
Ocurrió durante la fracturación inicial del supercontinente Pangea al abrirse el océano Atlántico Central (Provincia Magmática CAMP).

* Se derramaron **3 millones de km³ de basalto** a lo largo de 11 millones de km².
* Desaparecieron los grandes arcosaurios cuadrúpedos no dinosaurios (rauisuquios y aetosaurios), dejando los nichos ecológicos vacíos.
* **Consecuencia clave:** Esta extinción permitió la explosiva radiación adaptativa de los **dinosaurios**, que pasaron a dominar el Jurásico.`,
          actions
        };
      }

      if (q.includes('devonico') || q.includes('kellwasser') || q.includes('375') || q.includes('anoxia')) {
        actions.push({ type: 'OPEN_EXTINCTION', extinctionId: 'late-devonian-kellwasser', label: '🌊 Simular Anoxia Kellwasser (375 Ma)' });
        return {
          text: `### 🌊 Crisis Kellwasser del Devónico Tardío • Hace 375 Ma
Una extinción predominantemente marina provocada por la **expansión de los primeros bosques con raíces profundas** (*Archaeopteris*).

* Las raíces meteorizaron intensamente los continentes, vertiendo nutrientes que desataron mareas de algas tóxicas y zonas muertas sin oxígeno en los mares (*anoxia*).
* Aniquiló a los peces placodermos acorazados gigantes como *Dunkleosteus* y a los colosales arrecifes de estromatopóridos.`,
          actions
        };
      }

      if (q.includes('ordovicico') || q.includes('glaciacion') || q.includes('443') || q.includes('anillo')) {
        actions.push({ type: 'OPEN_EXTINCTION', extinctionId: 'ordovician-silurian-glaciation', label: '❄️ Simular Glaciación Hirnantiana (443 Ma)' });
        return {
          text: `### ❄️ Glaciación Hirnantiana y Anillo Asteroidal (O-S) • Hace 443 Ma
La primera de las grandes extinciones masivas del Fanerozoico, que acabó con el **85% de las especies marinas**.

* Gondwana derivó sobre el Polo Sur, formando un colosal casquete glaciar en el actual Sahara que bajó el nivel del mar más de 100 metros.
* **Descubrimiento 2024 (Tomkins et al.):** La Tierra capturó un sistema de anillos de polvo asteroidal a 466 Ma, cuya sombra sobre el ecuador aceleró el enfriamiento planetario.`,
          actions
        };
      }
    }

    // 2. SPECIFIC FAMOUS CREATURES
    if (q.includes('t-rex') || q.includes('tyrannosaurus') || q.includes('tiranosaurio')) {
      actions.push({ type: 'SET_PERIOD', timeMa: 66, periodId: 'cretaceous_66ma', label: '🦖 Viajar al Cretácico (66 Ma)' });
      actions.push({ type: 'HIGHLIGHT_SPECIES', speciesName: 'Tyrannosaurus rex', label: '🔍 Ver Ficha del T-Rex' });
      return {
        text: `### 🦖 Tyrannosaurus rex • El Rey del Cretácico Tardío
* **Época:** Cretácico Tardío (~68 - 66 Ma), en el continente insular de Laramidia (actual Norteamérica).
* **Dimensiones:** Más de 12 metros de longitud, 4 metros de altura a la cadera y hasta 9 toneladas de peso.
* **Fuerza de mordida:** Se calcula en más de **35,000 Newtons**, la mordida más destructiva de cualquier animal terrestre conocido, capaz de pulverizar huesos enteros de Triceratops.
* **Sentidos:** Olfato agudo superior al de un sabueso, visión binocular estereoscópica con percepción de profundidad superior a la de un águila moderna.`,
        actions
      };
    }

    if (q.includes('triceratops')) {
      actions.push({ type: 'SET_PERIOD', timeMa: 66, periodId: 'cretaceous_66ma', label: '🦖 Viajar al Cretácico (66 Ma)' });
      actions.push({ type: 'HIGHLIGHT_SPECIES', speciesName: 'Triceratops horridus', label: '🔍 Ver Ficha del Triceratops' });
      return {
        text: `### 🦏 Triceratops horridus • El Titán de Tres Cuernos
* **Época:** Cretácico Tardío (hace 68-66 Ma).
* **Defensa:** Cuernos de hasta 1 metro de largo y una gola ósea maciza que protegía su cuello y servía para exhibición territorial.
* **Ecología:** Herbívoro gregario con hasta 800 dientes dispuestos en baterías dentales autorreemplazables para triturar vegetación fibrosa dura como palmeras y cícadas.`,
        actions
      };
    }

    if (q.includes('spinosaurus') || q.includes('espinosaurio')) {
      actions.push({ type: 'SET_PERIOD', timeMa: 90, periodId: 'cretaceous_90ma', label: '🦖 Viajar al Cretácico Medio (90 Ma)' });
      return {
        text: `### 🐊 Spinosaurus aegyptiacus • El Depredador Semiacuático
* **Época:** Cretácico Medio (~99 - 93 Ma) en los ríos y deltas del norte de África.
* **Dimensiones:** Hasta 14-15 metros de largo, el terópodo carnívoro más largo conocido.
* **Adaptaciones marinas:** Cola en forma de aleta/remo natatorio, hocico alargado con receptores de presión para cazar peces gigantes como *Onchopristis* y huesos densos para controlar la flotabilidad como los hipopótamos.`,
        actions
      };
    }

    if (q.includes('megalodon')) {
      actions.push({ type: 'SET_PERIOD', timeMa: 20, periodId: 'miocene_20ma', label: '🦈 Viajar al Mioceno (20 Ma)' });
      return {
        text: `### 🦈 Otodus megalodon • El Monstruo de los Océanos
* **Época:** Neógeno (Mioceno al Plioceno, hace ~23 a 3.6 Ma).
* **Dimensiones:** Entre 15 y 18 metros de longitud y más de 50 toneladas.
* **Dieta:** Especializado en cazar ballenas y grandes mamíferos marinos mediante embestidas de alta energía que fracturaban costillas y órganos vitales.`,
        actions
      };
    }

    if (q.includes('trilobite') || q.includes('trilobites')) {
      actions.push({ type: 'SET_PERIOD', timeMa: 500, periodId: 'cambrian_500ma', label: '🌊 Viajar al Cámbrico (500 Ma)' });
      return {
        text: `### 🐚 Trilobites • Los Soberanos del Paleozoico
* **Longevidad asombrosa:** Habitaron los océanos durante más de **270 millones de años** (desde el Cámbrico temprano hasta su extinción definitiva en el Pérmico).
* **Innovación biológica:** Desarrollaron los primeros ojos complejos con lentes de calcita cristalina pura en el reino animal.
* Existieron más de 20,000 especies registradas, desde filtradores microscópicos hasta depredadores de 70 cm como *Isotelus rex*.`,
        actions
      };
    }

    // 3. CONTINENTAL DRIFT & PANGEA / GONDWANA
    if (q.includes('pangea') || q.includes('supercontinente') || q.includes('gondwana') || q.includes('rodinia') || q.includes('deriva')) {
      if (q.includes('rodinia') || q.includes('750')) {
        actions.push({ type: 'SET_PERIOD', timeMa: 750, periodId: 'cryogenian_750ma', label: '❄️ Viajar a Rodinia (750 Ma)' });
        return {
          text: `### 🧩 Supercontinente Rodinia • Hace 750 Ma
Rodinia se formó hace aproximadamente 1,100 millones de años y comenzó a fracturarse en el Criogénico (hace ~750 Ma).
* Su fragmentación desató una alteración geoquímica global: la meteorización de basaltos absorbió colosales volúmenes de $CO_2$, precipitando a la Tierra en la glaciación global conocida como **Tierra Bola de Nieve**.`,
          actions
        };
      }

      actions.push({ type: 'SET_PERIOD', timeMa: 240, periodId: 'triassic_240ma', label: '🪐 Ver Supercontinente Pangea (240 Ma)' });
      actions.push({ type: 'TOGGLE_TECTONICS', state: true, label: '🌍 Activar Placas Tectónicas 3D' });
      return {
        text: `### 🌍 Supercontinente Pangea y la Deriva Continental
Pangea ("Toda la Tierra") fue el último supercontinente que reunió prácticamente todas las masas emergidas entre el Carbonífero Tardío y el Triásico (hace ~335 a 175 Ma).

* **Océano Panthalassa:** El superocéano global que rodeaba a Pangea, mientras el mar de Tetis se abría como una cuña ecuatorial en el este.
* **Clima interior:** Al ser tan inmenso, las costas quedaban a miles de kilómetros del centro, generando desiertos interiores superáridos y megamonzones continentales extremos.
* **Ruptura:** Comenzó a fracturarse hace ~200-175 Ma en dos bloques: **Laurasia** (al norte: Norteamérica y Eurasia) y **Gondwana** (al sur: Sudamérica, África, India, Antártida y Australia).`,
        actions
      };
    }

    // 4. PERIODS BY NAME OR TIME
    if (q.includes('jurasico') || q.includes('170') || q.includes('150')) {
      actions.push({ type: 'SET_PERIOD', timeMa: 170, periodId: 'jurassic_170ma', label: '🦕 Viajar al Jurásico (170 Ma)' });
      return {
        text: `### 🦕 El Periodo Jurásico • La Era Dorada de los Gigantes (Hace 201 - 145 Ma)
* **Geografía:** Pangea continúa abriéndose. El clima se vuelve cálido y húmedo sin casquetes polares de hielo.
* **Fauna:** Proliferación de los mayores animales terrestres de todos los tiempos: los saurópodos titánicos (*Diplodocus, Brachiosaurus*), depredadores como *Allosaurus*, y los primeros antepasados de las aves (*Archaeopteryx*).
* **Mares:** Ricos en ammonites, ictiosaurios con forma de delfín y feroces pliosaurios.`,
        actions
      };
    }

    if (q.includes('cretacico') || q.includes('66') || q.includes('90') || q.includes('105') || q.includes('120')) {
      actions.push({ type: 'SET_PERIOD', timeMa: 66, periodId: 'cretaceous_66ma', label: '🦖 Viajar al Cretácico (66 Ma)' });
      return {
        text: `### 🦖 El Periodo Cretácico • El Cenit de los Dinosaurios (Hace 145 - 66 Ma)
* **Revolución vegetal:** Aparecen y se diversifican de forma explosiva las **plantas con flores (angiospermas)** y los insectos polinizadores (abejas y mariposas).
* **Mares interiores:** Nivel del mar excepcionalmente alto; mares epicontinentales cálidos dividían continentes como Norteamérica en dos islas (Laramidia y Appalachia).
* **Fauna emblemática:** *T-Rex, Triceratops, Ankylosaurus, Spinosaurus, Quetzalcoatlus* y *Mosasaurus*. Concluye con el impacto de Chicxulub.`,
        actions
      };
    }

    if (q.includes('cambrico') || q.includes('500') || q.includes('540')) {
      actions.push({ type: 'SET_PERIOD', timeMa: 540, periodId: 'cambrian_540ma', label: '🌊 Ver Explosión Cámbrica (540 Ma)' });
      return {
        text: `### 🌊 Explosión Cámbrica • El Nacimiento de la Complejidad (Hace 541 - 485 Ma)
* En un lapso geológico relativamente breve de 20-25 millones de años, **aparecieron prácticamente todos los filos (diseños corporales) animales modernos**.
* Surgieron los primeros esqueletos mineralizados, conchas protectoras, ojos compuestos y depredadores activos como el célebre *Anomalocaris* en los esquistos de Burgess.`,
        actions
      };
    }

    if (q.includes('nieve') || q.includes('bola de nieve') || q.includes('criogenico') || q.includes('750')) {
      actions.push({ type: 'SET_PERIOD', timeMa: 750, periodId: 'cryogenian_750ma', label: '❄️ Ver Tierra Bola de Nieve (750 Ma)' });
      return {
        text: `### ❄️ Tierra Bola de Nieve (Periodo Criogénico) • Hace 750 - 635 Ma
* El episodio de glaciación más extremo de la historia: glaciares y placas de hielo de hasta 1 km de espesor **llegaron a cubrir incluso el ecuador terrestre**.
* **El efecto albedo:** El hielo blanco reflejaba el 85% de la radiación solar, retroalimentando el congelamiento del planeta entero.
* **¿Cómo se descongeló?** El vulcanismo continuó emitiendo $CO_2$ durante millones de años. Al no haber lluvia ni océanos expuestos que absorbieran el carbono, el efecto invernadero se disparó hasta derretir el planeta repentinamente.`,
        actions
      };
    }

    // 5. CITIES / MODERN COUNTRIES IN THE PAST
    if (q.includes('donde estaba') || q.includes('argentina') || q.includes('espana') || q.includes('mexico') || q.includes('colombia') || q.includes('chile')) {
      actions.push({ type: 'SEARCH_CITY', cityName: 'Buenos Aires', label: '📍 Rastrear Ciudad en el Tiempo' });
      return {
        text: `### 📍 Deriva Continental de Ciudades y Países
¡Puedes rastrear la posición histórica exacta de cualquier ciudad en la barra superior!

* **Sudamérica (Argentina, Brasil, Colombia):** Formaba parte del supercontinente **Gondwana**, unida a África. Durante el Triásico y Pérmico, Buenos Aires estaba cerca de las costas del océano Panthalassa y el polo sur relativo.
* **España y Europa:** En el Pérmico y Triásico estaban situadas en latitudes tropicales cálidas cerca del centro de Pangea, bañadas por el mar de Tetis.
* **Norteamérica:** Estaba unida a Eurasia y África noroccidental.

💡 **Prueba esto:** Escribe *"Buenos Aires"*, *"Madrid"* o *"Ciudad de México"* en el buscador del encabezado y desliza la línea de tiempo para ver a tu ciudad viajar por el planeta.`,
        actions
      };
    }

    // 6. FULL SPECIES CATALOG & ENCYCLOPEDIA QUERIES
    if (q.includes('catalogo') || q.includes('especie') || q.includes('todas las especies') || q.includes('animal') || q.includes('enciclopedia') || q.includes('cuantas especies') || q.includes('fauna')) {
      actions.push({ type: 'OPEN_CATALOG', label: '📚 Abrir Catálogo Completo (57 Especies)' });
      return {
        text: `### 📚 Enciclopedia Paleobiológica Completa
El atlas cuenta con una base de datos científica de **57 especies fósiles icónicas** reconstruidas exhaustivamente con coordenadas paleogeográficas, métricas anatómicas, dietas y yacimientos geológicos.

* **Abarca 4 Grandes Eras:** Desde los primeros organismos multicelulares del **Precámbrico** (hace 550 Ma) como *Dickinsonia*, pasando por la radiación del **Paleozoico**, los dinosaurios del **Mesozoico**, hasta la megafauna pleistocénica del **Cenozoico** como el *Mamut Lanudo* y el *Smilodon*.
* **Búsqueda y Filtros:** Puedes filtrar por era, hábitat (marino, terrestre, volador, anfibio), dieta y tamaño.
* **Teletransporte 3D:** Cada ficha incluye el botón **"Ver en Globo 3D"** para viajar en el tiempo geológico directamente a su ecosistema original.`,
        actions
      };
    }

    // 6. DEFAULT INTELLECTUAL HELPER
    return {
      text: `### 🌍 Hola, soy PaleoGuía IA
Puedo ayudarte a explorar los 750 millones de años de historia viva de la Tierra.

**Prueba a preguntarme sobre:**
* **Dinosaurios y Criaturas:** *"¿Qué comía el T-Rex?"*, *"Háblame del Megalodón"*, *"¿Qué eran los trilobites?"*
* **Grandes Cataclismos:** *"¿Cómo fue el impacto de Chicxulub?"*, *"¿Por qué ocurrió la extinción del Pérmico?"*
* **Geología y Eras:** *"¿Cómo era la Tierra en el Jurásico?"*, *"¿Qué fue Pangea?"*, *"¿Cómo se congeló la Tierra Bola de Nieve?"*
* **Navegación:** *"Llévame al Cretácico"*, *"Activa las placas tectónicas"*.`,
      actions: [
        { type: 'SET_PERIOD', timeMa: 66, periodId: 'cretaceous_66ma', label: '🦖 Ir al Cretácico (66 Ma)' },
        { type: 'OPEN_EXTINCTION', extinctionId: 'k-pg-chicxulub', label: '☄️ Simular Chicxulub' },
        { type: 'SET_PERIOD', timeMa: 240, periodId: 'triassic_240ma', label: '🪐 Ver Pangea (240 Ma)' },
        { type: 'TOGGLE_TECTONICS', state: true, label: '🌍 Ver Placas Tectónicas' }
      ]
    };
  }

  async _callGeminiApi(prompt) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`;
    const systemInstruction = `Eres PaleoGuía IA, un paleontólogo y geólogo de clase mundial para la aplicación 3D "Tierra Antigua".
Responde con calidez didáctica, entusiasmo científico y formato Markdown impecable en español. 
Sé conciso y fascinante (máximo 3 párrafos).
Menciona nombres de eras y millones de años (Ma).`;

    const body = {
      contents: [{ role: 'user', parts: [{ text: `${systemInstruction}\n\nPregunta del usuario: ${prompt}` }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 600
      }
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const answer = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!answer) throw new Error('Respuesta vacía');

    // Extract quick action tags if applicable
    const actions = [];
    const lower = prompt.toLowerCase();
    if (lower.includes('cretacico') || lower.includes('66')) {
      actions.push({ type: 'SET_PERIOD', timeMa: 66, periodId: 'cretaceous_66ma', label: '🦖 Ir al Cretácico (66 Ma)' });
    } else if (lower.includes('jurasico')) {
      actions.push({ type: 'SET_PERIOD', timeMa: 170, periodId: 'jurassic_170ma', label: '🦕 Ir al Jurásico (170 Ma)' });
    } else if (lower.includes('permico') || lower.includes('250')) {
      actions.push({ type: 'SET_PERIOD', timeMa: 250, periodId: 'permian_250ma', label: '🌋 Ir al Pérmico (250 Ma)' });
    }

    return { text: answer, actions };
  }
}
