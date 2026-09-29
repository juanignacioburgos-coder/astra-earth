const fs = require('fs');
const path = require('path');

const specs = [
  {
    file: 'tribrachidium.svg',
    id: 'tribrachidium',
    eraHeader: 'NEOPROTEROZOICO • EDIACÁRICO • 555 MA',
    accentColor: '#ec4899',
    title: 'Disco Bentónico con Simetría Trirradial',
    scientific: 'Tribrachidium heraldicum',
    stats: 'Diámetro: 5 cm | Simetría trirradial de 3 brazos espirales | Filtrador sésil',
    humanText: 'Humano (1.8m)',
    svgPath: '<circle cx=\"400\" cy=\"290\" r=\"110\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"12\" opacity=\"0.5\"/><path d=\"M 400 290 Q 430 220 490 200 Q 530 240 480 270 Q 430 290 400 290 M 400 290 Q 340 330 310 390 Q 340 430 380 400 Q 400 350 400 290 M 400 290 Q 420 360 360 410 Q 310 390 330 340 Q 370 300 400 290\" fill=\"currentColor\" opacity=\"0.9\"/><circle cx=\"400\" cy=\"290\" r=\"18\" fill=\"currentColor\"/>'
  },
  {
    file: 'fractofusus.svg',
    id: 'fractofusus',
    eraHeader: 'NEOPROTEROZOICO • EDIACÁRICO • 565 MA',
    accentColor: '#ec4899',
    title: 'Fronda Fractal Modular Bentónica',
    scientific: 'Fractofusus misrai',
    stats: 'Longitud: 22 cm | Crecimiento fractal auto-similar | Osmotrofia abisal',
    humanText: 'Humano (1.8m)',
    svgPath: '<path d=\"M 400 170 Q 450 250 470 320 Q 450 390 400 440 Q 350 390 330 320 Q 350 250 400 170 Z\" fill=\"currentColor\" opacity=\"0.35\" stroke=\"currentColor\" stroke-width=\"4\"/><line x1=\"400\" y1=\"170\" x2=\"400\" y2=\"440\" stroke=\"currentColor\" stroke-width=\"6\"/><path d=\"M 400 210 Q 440 220 455 240 M 400 210 Q 360 220 345 240 M 400 260 Q 450 270 470 290 M 400 260 Q 350 270 330 290 M 400 310 Q 460 320 475 340 M 400 310 Q 340 320 325 340 M 400 360 Q 450 370 460 390 M 400 360 Q 350 370 340 390 M 400 400 Q 430 410 440 425 M 400 400 Q 370 410 360 425\" stroke=\"currentColor\" stroke-width=\"4\" fill=\"none\"/>'
  },
  {
    file: 'yorgia.svg',
    id: 'yorgia',
    eraHeader: 'NEOPROTEROZOICO • EDIACÁRICO • 555 MA',
    accentColor: '#ec4899',
    title: 'Disco Deslizante de Simetría Alterna',
    scientific: 'Yorgia moveri',
    stats: 'Diámetro: 16 cm | Segmentación alterna por deslizamiento | Rastros fósiles de alimentación',
    humanText: 'Humano (1.8m)',
    svgPath: '<ellipse cx=\"400\" cy=\"290\" rx=\"115\" ry=\"140\" fill=\"currentColor\" opacity=\"0.3\" stroke=\"currentColor\" stroke-width=\"5\"/><path d=\"M 400 150 L 400 430\" stroke=\"currentColor\" stroke-width=\"6\"/><path d=\"M 400 180 Q 470 190 500 210 M 400 205 Q 330 215 300 235 M 400 230 Q 480 240 510 260 M 400 255 Q 320 265 290 285 M 400 280 Q 485 290 515 310 M 400 305 Q 325 315 295 335 M 400 330 Q 480 340 505 360 M 400 355 Q 330 365 305 385 M 400 380 Q 465 390 485 410 M 400 405 Q 350 415 330 425\" stroke=\"currentColor\" stroke-width=\"4\" fill=\"none\"/><circle cx=\"400\" cy=\"175\" r=\"22\" fill=\"currentColor\" opacity=\"0.8\"/>'
  },
  {
    file: 'cloudina.svg',
    id: 'cloudina',
    eraHeader: 'NEOPROTEROZOICO • EDIACÁRICO FINAL • 548 MA',
    accentColor: '#ec4899',
    title: 'Primer Metazoo con Concha Calcificada',
    scientific: 'Cloudina hartmannae',
    stats: 'Longitud: 5 – 15 cm | Tubos cónicos imbricados calcíticos | Primer esqueleto rígido',
    humanText: 'Humano (1.8m)',
    svgPath: '<g transform=\"translate(300, 160)\" stroke=\"currentColor\" stroke-width=\"4\" fill=\"currentColor\" opacity=\"0.85\"><path d=\"M 80 280 L 100 200 L 140 200 L 160 280 Z\" opacity=\"0.4\"/><path d=\"M 90 220 L 110 150 L 150 150 L 170 220 Z\" opacity=\"0.55\"/><path d=\"M 100 170 L 115 100 L 155 100 L 170 170 Z\" opacity=\"0.7\"/><path d=\"M 110 115 L 125 50 L 160 50 L 175 115 Z\" opacity=\"0.85\"/><path d=\"M 120 65 L 130 10 L 160 10 L 170 65 Z\" opacity=\"0.95\"/></g>'
  },
  {
    file: 'namacalathus.svg',
    id: 'namacalathus',
    eraHeader: 'NEOPROTEROZOICO • EDIACÁRICO • 549 MA',
    accentColor: '#ec4899',
    title: 'Copa Esquelética Calcárea Perforada',
    scientific: 'Namacalathus hermanastes',
    stats: 'Altura: 3 – 8 cm | Cáliz globular perforado sobre tallo hueco | Arrecifes primitivos',
    humanText: 'Humano (1.8m)',
    svgPath: '<path d=\"M 400 280 L 400 450\" stroke=\"currentColor\" stroke-width=\"16\" stroke-linecap=\"round\"/><circle cx=\"400\" cy=\"220\" r=\"85\" fill=\"currentColor\" opacity=\"0.4\" stroke=\"currentColor\" stroke-width=\"5\"/><circle cx=\"370\" cy=\"200\" r=\"24\" fill=\"#020408\" stroke=\"currentColor\" stroke-width=\"4\"/><circle cx=\"435\" cy=\"205\" r=\"20\" fill=\"#020408\" stroke=\"currentColor\" stroke-width=\"4\"/><circle cx=\"400\" cy=\"255\" r=\"26\" fill=\"#020408\" stroke=\"currentColor\" stroke-width=\"4\"/><ellipse cx=\"400\" cy=\"150\" rx=\"40\" ry=\"18\" fill=\"#020408\" stroke=\"currentColor\" stroke-width=\"4\"/>'
  },
  {
    file: 'rangea.svg',
    id: 'rangea',
    eraHeader: 'NEOPROTEROZOICO • EDIACÁRICO • 548 MA',
    accentColor: '#ec4899',
    title: 'Organismo Frondomorfo Repetitivo Sésil',
    scientific: 'Rangea schneiderhoehni',
    stats: 'Altura: 15 cm | Ramificación fractal con vainas rellenas de sedimento | Frondomorfo basal',
    humanText: 'Humano (1.8m)',
    svgPath: '<path d=\"M 400 440 L 400 180\" stroke=\"currentColor\" stroke-width=\"8\"/><ellipse cx=\"400\" cy=\"445\" rx=\"45\" ry=\"18\" fill=\"currentColor\" opacity=\"0.6\"/><g stroke=\"currentColor\" stroke-width=\"4\" fill=\"currentColor\" opacity=\"0.8\"><path d=\"M 400 200 C 450 200 470 230 400 250 Z\"/><path d=\"M 400 200 C 350 200 330 230 400 250 Z\"/><path d=\"M 400 240 C 470 240 490 280 400 300 Z\"/><path d=\"M 400 240 C 330 240 310 280 400 300 Z\"/><path d=\"M 400 290 C 480 290 500 340 400 360 Z\"/><path d=\"M 400 290 C 320 290 300 340 400 360 Z\"/><path d=\"M 400 350 C 470 350 490 400 400 420 Z\"/><path d=\"M 400 350 C 330 350 310 400 400 420 Z\"/></g>'
  },
  {
    file: 'cyclomedusa.svg',
    id: 'cyclomedusa',
    eraHeader: 'NEOPROTEROZOICO • EDIACÁRICO • 560 MA',
    accentColor: '#ec4899',
    title: 'Disco Concétrico de Anclaje Bentónico',
    scientific: 'Cyclomedusa davidi',
    stats: 'Diámetro: 20 cm | Anillos circulares concéntricos concéntricos | Disco de anclaje sedimentario',
    humanText: 'Humano (1.8m)',
    svgPath: '<circle cx=\"400\" cy=\"290\" r=\"130\" fill=\"currentColor\" opacity=\"0.15\" stroke=\"currentColor\" stroke-width=\"3\"/><circle cx=\"400\" cy=\"290\" r=\"105\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" opacity=\"0.35\"/><circle cx=\"400\" cy=\"290\" r=\"80\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\" opacity=\"0.6\"/><circle cx=\"400\" cy=\"290\" r=\"55\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"5\" opacity=\"0.8\"/><circle cx=\"400\" cy=\"290\" r=\"30\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"6\" opacity=\"0.9\"/><circle cx=\"400\" cy=\"290\" r=\"12\" fill=\"currentColor\"/><line x1=\"270\" y1=\"290\" x2=\"530\" y2=\"290\" stroke=\"currentColor\" stroke-width=\"1.5\" opacity=\"0.3\"/><line x1=\"400\" y1=\"160\" x2=\"400\" y2=\"420\" stroke=\"currentColor\" stroke-width=\"1.5\" opacity=\"0.3\"/>'
  },
  {
    file: 'parvancorina.svg',
    id: 'parvancorina',
    eraHeader: 'NEOPROTEROZOICO • EDIACÁRICO • 555 MA',
    accentColor: '#ec4899',
    title: 'Escudo Cefálico en Ancla (Artrópodo Basal)',
    scientific: 'Parvancorina minchami',
    stats: 'Longitud: 3 cm | Cresta central en forma de ancla | Hidrodinámica orientada a corrientes',
    humanText: 'Humano (1.8m)',
    svgPath: '<ellipse cx=\"400\" cy=\"290\" rx=\"110\" ry=\"135\" fill=\"currentColor\" opacity=\"0.2\" stroke=\"currentColor\" stroke-width=\"4\"/><path d=\"M 320 230 Q 400 180 480 230\" stroke=\"currentColor\" stroke-width=\"14\" stroke-linecap=\"round\" fill=\"none\"/><line x1=\"400\" y1=\"200\" x2=\"400\" y2=\"390\" stroke=\"currentColor\" stroke-width=\"12\" stroke-linecap=\"round\"/><circle cx=\"400\" cy=\"200\" r=\"15\" fill=\"currentColor\"/><ellipse cx=\"400\" cy=\"395\" rx=\"25\" ry=\"14\" fill=\"currentColor\" opacity=\"0.8\"/>'
  },
  {
    file: 'haootia.svg',
    id: 'haootia',
    eraHeader: 'NEOPROTEROZOICO • EDIACÁRICO • 560 MA',
    accentColor: '#ec4899',
    title: 'Primer Tejido Muscular Contráctil Fósil',
    scientific: 'Haootia quadriformis',
    stats: 'Dimensiones: 6 x 6 cm | Simetría cuadrangular con fibras musculares | Cnidario basal',
    humanText: 'Humano (1.8m)',
    svgPath: '<rect x=\"330\" y=\"220\" width=\"140\" height=\"140\" rx=\"25\" fill=\"currentColor\" opacity=\"0.25\" stroke=\"currentColor\" stroke-width=\"6\" transform=\"rotate(45 400 290)\"/><path d=\"M 400 290 L 300 190 M 400 290 L 500 190 M 400 290 L 500 390 M 400 290 L 300 390\" stroke=\"currentColor\" stroke-width=\"8\" stroke-linecap=\"round\"/><circle cx=\"400\" cy=\"290\" r=\"20\" fill=\"currentColor\"/><path d=\"M 300 190 Q 270 160 250 180 M 500 190 Q 530 160 550 180 M 500 390 Q 530 420 550 400 M 300 390 Q 270 420 250 400\" stroke=\"currentColor\" stroke-width=\"6\" fill=\"none\"/>'
  },
  {
    file: 'aspidella.svg',
    id: 'aspidella',
    eraHeader: 'NEOPROTEROZOICO • EDIACÁRICO • 560 MA',
    accentColor: '#ec4899',
    title: 'Base de Fijación Discoidal Sedimentaria',
    scientific: 'Aspidella terranovica',
    stats: 'Diámetro: 4 – 10 cm | Disco concéntrico con invaginación central | Anclaje de frondomorfos',
    humanText: 'Humano (1.8m)',
    svgPath: '<ellipse cx=\"400\" cy=\"290\" rx=\"140\" ry=\"100\" fill=\"currentColor\" opacity=\"0.2\" stroke=\"currentColor\" stroke-width=\"4\"/><ellipse cx=\"400\" cy=\"290\" rx=\"105\" ry=\"72\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\" opacity=\"0.4\"/><ellipse cx=\"400\" cy=\"290\" rx=\"70\" ry=\"48\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"5\" opacity=\"0.7\"/><ellipse cx=\"400\" cy=\"290\" rx=\"35\" ry=\"24\" fill=\"currentColor\" opacity=\"0.9\"/><line x1=\"380\" y1=\"290\" x2=\"420\" y2=\"290\" stroke=\"#020408\" stroke-width=\"6\" stroke-linecap=\"round\"/>'
  },
  {
    file: 'pteridinium.svg',
    id: 'pteridinium',
    eraHeader: 'NEOPROTEROZOICO • EDIACÁRICO • 545 MA',
    accentColor: '#ec4899',
    title: 'Organismo Erniettomorfo Trirradiado Acolchado',
    scientific: 'Pteridinium simplex',
    stats: 'Longitud: 30 cm | Tres alas o vanos acolchados de costillas paralelas | Semienterrado en arena',
    humanText: 'Humano (1.8m)',
    svgPath: '<path d=\"M 260 290 Q 400 230 540 290 Q 400 350 260 290 Z\" fill=\"currentColor\" opacity=\"0.3\" stroke=\"currentColor\" stroke-width=\"4\"/><line x1=\"260\" y1=\"290\" x2=\"540\" y2=\"290\" stroke=\"currentColor\" stroke-width=\"6\"/><g stroke=\"currentColor\" stroke-width=\"3\"><line x1=\"300\" y1=\"270\" x2=\"300\" y2=\"310\"/><line x1=\"340\" y1=\"255\" x2=\"340\" y2=\"325\"/><line x1=\"380\" y1=\"245\" x2=\"380\" y2=\"335\"/><line x1=\"420\" y1=\"245\" x2=\"420\" y2=\"335\"/><line x1=\"460\" y1=\"255\" x2=\"460\" y2=\"325\"/><line x1=\"500\" y1=\"270\" x2=\"500\" y2=\"310\"/></g>'
  },
  {
    file: 'ernietta.svg',
    id: 'ernietta',
    eraHeader: 'NEOPROTEROZOICO • EDIACÁRICO • 545 MA',
    accentColor: '#ec4899',
    title: 'Cuerpo en Saco Tubular Acolchado',
    scientific: 'Ernietta plateauensis',
    stats: 'Longitud: 10 cm | Saco en forma de copa con tubos en U | Filtro osmotrofo semi-enterrado',
    humanText: 'Humano (1.8m)',
    svgPath: '<path d=\"M 320 200 C 320 380 480 380 480 200 L 440 200 C 440 330 360 330 360 200 Z\" fill=\"currentColor\" opacity=\"0.4\" stroke=\"currentColor\" stroke-width=\"4\"/><g stroke=\"currentColor\" stroke-width=\"3\" opacity=\"0.7\"><line x1=\"340\" y1=\"210\" x2=\"340\" y2=\"310\"/><line x1=\"370\" y1=\"220\" x2=\"370\" y2=\"340\"/><line x1=\"400\" y1=\"220\" x2=\"400\" y2=\"355\"/><line x1=\"430\" y1=\"220\" x2=\"430\" y2=\"340\"/><line x1=\"460\" y1=\"210\" x2=\"460\" y2=\"310\"/></g>'
  },
  {
    file: 'arkarua.svg',
    id: 'arkarua',
    eraHeader: 'NEOPROTEROZOICO • EDIACÁRICO • 555 MA',
    accentColor: '#ec4899',
    title: 'Posible Equinodermo Pentarradial Primitivo',
    scientific: 'Arkarua adami',
    stats: 'Diámetro: 1 cm | Disco abombado con 5 hendiduras radiales | Precursor de estrellas y erizos',
    humanText: 'Humano (1.8m)',
    svgPath: '<circle cx=\"400\" cy=\"290\" r=\"110\" fill=\"currentColor\" opacity=\"0.2\" stroke=\"currentColor\" stroke-width=\"5\"/><polygon points=\"400,210 425,265 485,265 435,300 455,355 400,320 345,355 365,300 315,265 375,265\" fill=\"currentColor\" opacity=\"0.7\" stroke=\"currentColor\" stroke-width=\"4\"/><circle cx=\"400\" cy=\"290\" r=\"24\" fill=\"#020408\" stroke=\"currentColor\" stroke-width=\"3\"/>'
  },
  {
    file: 'bradgatia.svg',
    id: 'bradgatia',
    eraHeader: 'NEOPROTEROZOICO • EDIACÁRICO • 565 MA',
    accentColor: '#ec4899',
    title: 'Estructura Arbustiva Colonial de Frondas',
    scientific: 'Bradgatia linfordensis',
    stats: 'Diámetro: 30 cm | Mata arbustiva con frondas ramificadas | Fondos marinos abisales',
    humanText: 'Humano (1.8m)',
    svgPath: '<ellipse cx=\"400\" cy=\"420\" rx=\"50\" ry=\"16\" fill=\"currentColor\" opacity=\"0.5\"/><g stroke=\"currentColor\" stroke-width=\"5\" fill=\"none\"><path d=\"M 400 420 Q 320 330 260 220\"/><path d=\"M 400 420 Q 360 300 340 180\"/><path d=\"M 400 420 Q 400 280 400 160\"/><path d=\"M 400 420 Q 440 300 460 180\"/><path d=\"M 400 420 Q 480 330 540 220\"/></g><g fill=\"currentColor\" opacity=\"0.6\"><circle cx=\"260\" cy=\"220\" r=\"32\"/><circle cx=\"340\" cy=\"180\" r=\"36\"/><circle cx=\"400\" cy=\"160\" r=\"42\"/><circle cx=\"460\" cy=\"180\" r=\"36\"/><circle cx=\"540\" cy=\"220\" r=\"32\"/></g>'
  },
  {
    file: 'thectardis.svg',
    id: 'thectardis',
    eraHeader: 'NEOPROTEROZOICO • EDIACÁRICO • 565 MA',
    accentColor: '#ec4899',
    title: 'Organismo Sésil Cónico Invertido',
    scientific: 'Thectardis avalonensis',
    stats: 'Altura: 15 cm | Morfología triangular cónica hueca | Filtrador de suspensión bentónico',
    humanText: 'Humano (1.8m)',
    svgPath: '<polygon points=\"400,430 330,170 470,170\" fill=\"currentColor\" opacity=\"0.3\" stroke=\"currentColor\" stroke-width=\"6\" stroke-linejoin=\"round\"/><ellipse cx=\"400\" cy=\"170\" rx=\"70\" ry=\"22\" fill=\"currentColor\" opacity=\"0.7\" stroke=\"currentColor\" stroke-width=\"4\"/><circle cx=\"400\" cy=\"430\" r=\"12\" fill=\"currentColor\"/><line x1=\"400\" y1=\"170\" x2=\"400\" y2=\"430\" stroke=\"currentColor\" stroke-width=\"3\" stroke-dasharray=\"6 4\"/>'
  },
  {
    file: 'cyanorus.svg',
    id: 'cyanorus',
    eraHeader: 'NEOPROTEROZOICO • EDIACÁRICO • 555 MA',
    accentColor: '#ec4899',
    title: 'Bilaterio Móvil con Surco Axial',
    scientific: 'Cyanorus singularis',
    stats: 'Longitud: 3 cm | Surco longitudinal medial con costillas | Bilaterio primitivo nadador/reptador',
    humanText: 'Humano (1.8m)',
    svgPath: '<ellipse cx=\"400\" cy=\"290\" rx=\"80\" ry=\"130\" fill=\"currentColor\" opacity=\"0.35\" stroke=\"currentColor\" stroke-width=\"5\"/><line x1=\"400\" y1=\"170\" x2=\"400\" y2=\"410\" stroke=\"currentColor\" stroke-width=\"8\" stroke-linecap=\"round\"/><g stroke=\"currentColor\" stroke-width=\"3.5\" opacity=\"0.75\"><line x1=\"340\" y1=\"220\" x2=\"400\" y2=\"235\"/><line x1=\"460\" y1=\"220\" x2=\"400\" y2=\"235\"/><line x1=\"330\" y1=\"260\" x2=\"400\" y2=\"275\"/><line x1=\"470\" y1=\"260\" x2=\"400\" y2=\"275\"/><line x1=\"330\" y1=\"305\" x2=\"400\" y2=\"320\"/><line x1=\"470\" y1=\"305\" x2=\"400\" y2=\"320\"/><line x1=\"340\" y1=\"350\" x2=\"400\" y2=\"365\"/><line x1=\"460\" y1=\"350\" x2=\"400\" y2=\"365\"/></g>'
  },
  {
    file: 'isotelus.svg',
    id: 'isotelus',
    eraHeader: 'PALEOZOICO • ORDOVÍCICO SUPERIOR • 448 MA',
    accentColor: '#06b6d4',
    title: 'El Mayor Trilobite del Registro Fósil',
    scientific: 'Isotelus rex',
    stats: 'Longitud: 72 cm | Escudo liso y cuerpo plano y ancho | Superdepredador bentónico marino',
    humanText: 'Humano (1.8m)',
    svgPath: '<ellipse cx=\"400\" cy=\"290\" rx=\"130\" ry=\"160\" fill=\"currentColor\" opacity=\"0.2\" stroke=\"currentColor\" stroke-width=\"6\"/><path d=\"M 300 230 C 300 150 500 150 500 230 Z\" fill=\"currentColor\" opacity=\"0.7\" stroke=\"currentColor\" stroke-width=\"5\"/><circle cx=\"350\" cy=\"200\" r=\"16\" fill=\"#020408\" stroke=\"currentColor\" stroke-width=\"4\"/><circle cx=\"450\" cy=\"200\" r=\"16\" fill=\"#020408\" stroke=\"currentColor\" stroke-width=\"4\"/><path d=\"M 310 240 L 490 240 L 480 340 L 320 340 Z\" fill=\"currentColor\" opacity=\"0.5\" stroke=\"currentColor\" stroke-width=\"4\"/><line x1=\"315\" y1=\"275\" x2=\"485\" y2=\"275\" stroke=\"currentColor\" stroke-width=\"3\"/><line x1=\"318\" y1=\"310\" x2=\"482\" y2=\"310\" stroke=\"currentColor\" stroke-width=\"3\"/><path d=\"M 320 350 C 320 440 480 440 480 350 Z\" fill=\"currentColor\" opacity=\"0.7\" stroke=\"currentColor\" stroke-width=\"5\"/>'
  },
  {
    file: 'sacabambaspis.svg',
    id: 'sacabambaspis',
    eraHeader: 'PALEOZOICO • ORDOVÍCICO • 460 MA',
    accentColor: '#06b6d4',
    title: 'Pez Agnato Acorazado Gondwánico',
    scientific: 'Sacabambaspis janvieri',
    stats: 'Longitud: 25 cm | Escudo cefálico dorsal y ventral | Ojos y fosas nasales frontales sin mandíbula',
    humanText: 'Humano (1.8m)',
    svgPath: '<path d=\"M 260 290 Q 320 220 440 230 Q 550 250 600 290 Q 550 330 440 350 Q 320 360 260 290 Z\" fill=\"currentColor\" opacity=\"0.4\" stroke=\"currentColor\" stroke-width=\"6\"/><path d=\"M 260 290 Q 310 235 410 245 L 410 335 Q 310 345 260 290 Z\" fill=\"currentColor\" opacity=\"0.75\" stroke=\"currentColor\" stroke-width=\"4\"/><circle cx=\"275\" cy=\"275\" r=\"10\" fill=\"#020408\" stroke=\"currentColor\" stroke-width=\"3\"/><circle cx=\"275\" cy=\"305\" r=\"10\" fill=\"#020408\" stroke=\"currentColor\" stroke-width=\"3\"/><path d=\"M 570 290 L 630 250 L 615 290 L 635 330 Z\" fill=\"currentColor\" opacity=\"0.9\"/>'
  },
  {
    file: 'pterygotus.svg',
    id: 'pterygotus',
    eraHeader: 'PALEOZOICO • SILÚRICO / DEVÓNICO • 415 MA',
    accentColor: '#06b6d4',
    title: 'Escorpión Marino Gigante con Pinzas',
    scientific: 'Pterygotus anglicus',
    stats: 'Longitud: 2.1 m | Quelíceros quelados prensiles masivos | Superdepredador marino nectónico',
    humanText: 'Humano (1.8m)',
    svgPath: '<ellipse cx=\"400\" cy=\"280\" rx=\"60\" ry=\"80\" fill=\"currentColor\" opacity=\"0.7\" stroke=\"currentColor\" stroke-width=\"4\"/><path d=\"M 360 350 L 370 470 L 430 470 L 440 350 Z\" fill=\"currentColor\" opacity=\"0.5\" stroke=\"currentColor\" stroke-width=\"4\"/><polygon points=\"400,470 360,520 440,520\" fill=\"currentColor\" opacity=\"0.8\"/><path d=\"M 360 210 Q 310 160 280 130 Q 250 110 240 140 Q 260 170 300 200 M 240 140 L 220 120 M 240 140 L 225 155\" stroke=\"currentColor\" stroke-width=\"7\" fill=\"none\" stroke-linecap=\"round\"/><path d=\"M 440 210 Q 490 160 520 130 Q 550 110 560 140 Q 540 170 500 200 M 560 140 L 580 120 M 560 140 L 575 155\" stroke=\"currentColor\" stroke-width=\"7\" fill=\"none\" stroke-linecap=\"round\"/><ellipse cx=\"310\" cy=\"300\" rx=\"45\" ry=\"16\" fill=\"currentColor\" opacity=\"0.7\" transform=\"rotate(35 310 300)\"/><ellipse cx=\"490\" cy=\"300\" rx=\"45\" ry=\"16\" fill=\"currentColor\" opacity=\"0.7\" transform=\"rotate(-35 490 300)\"/>'
  },
  {
    file: 'stethacanthus.svg',
    id: 'stethacanthus',
    eraHeader: 'PALEOZOICO • DEVÓNICO / CARBONÍFERO • 360 MA',
    accentColor: '#06b6d4',
    title: 'Tiburón Basal con Aleta en Yunque',
    scientific: 'Stethacanthus altonensis',
    stats: 'Longitud: 1.0 m | Espina dorsal aplanada en forma de cepillo/yunque | Machos con escamas denticulares',
    humanText: 'Humano (1.8m)',
    svgPath: '<path d=\"M 200 310 Q 350 250 540 280 Q 580 290 620 270 L 610 310 L 635 340 Q 560 330 480 340 Q 320 370 200 310 Z\" fill=\"currentColor\" opacity=\"0.5\" stroke=\"currentColor\" stroke-width=\"5\"/><path d=\"M 360 260 L 370 180 L 440 180 L 430 260 Z\" fill=\"currentColor\" stroke=\"currentColor\" stroke-width=\"4\"/><ellipse cx=\"405\" cy=\"180\" rx=\"45\" ry=\"12\" fill=\"currentColor\" stroke=\"currentColor\" stroke-width=\"3\"/><polygon points=\"260,335 220,380 280,355\" fill=\"currentColor\"/><polygon points=\"470,335 450,370 485,355\" fill=\"currentColor\"/><circle cx=\"240\" cy=\"295\" r=\"8\" fill=\"#020408\"/>'
  },
  {
    file: 'helicoprion.svg',
    id: 'helicoprion',
    eraHeader: 'PALEOZOICO • PÉRMICO • 275 MA',
    accentColor: '#06b6d4',
    title: 'Tiburón con Espiral Dentaria Perpetua',
    scientific: 'Helicoprion bessonowi',
    stats: 'Longitud: 7.5 m | Espiral mandibular de dientes aserrados | Depredador pelágico de cefalópodos',
    humanText: 'Humano (1.8m)',
    svgPath: '<path d=\"M 180 290 Q 350 230 560 270 L 620 230 L 600 290 L 635 340 Q 520 330 420 340 Q 280 360 180 290 Z\" fill=\"currentColor\" opacity=\"0.4\" stroke=\"currentColor\" stroke-width=\"5\"/><polygon points=\"380,240 420,160 440,245\" fill=\"currentColor\" opacity=\"0.8\"/><circle cx=\"240\" cy=\"305\" r=\"38\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"6\"/><path d=\"M 240 305 Q 260 285 240 275 Q 215 285 225 315 Q 255 335 270 305 Q 275 270 240 265\" stroke=\"currentColor\" stroke-width=\"4\" fill=\"none\"/><circle cx=\"230\" cy=\"275\" r=\"8\" fill=\"#020408\"/>'
  },
  {
    file: 'carnotaurus.svg',
    id: 'carnotaurus',
    eraHeader: 'MESOZOICO • CRETÁCICO TARDÍO • 72 MA',
    accentColor: '#10b981',
    title: 'Toro Carnívoro de la Patagonia',
    scientific: 'Carnotaurus sastrei',
    stats: 'Longitud: 8.0 m | Peso: 1.8 t | Cuernos frontales supraorbitales y brazos vestigiales ultra-veloces',
    humanText: 'Humano (1.8m)',
    svgPath: '<path d=\"M 220 220 Q 250 170 300 200 Q 350 220 440 230 Q 540 250 640 290 Q 530 330 440 310 L 400 450 L 375 450 L 390 310 L 350 440 L 330 440 L 340 290 Q 270 300 230 260 Z\" fill=\"currentColor\" opacity=\"0.55\" stroke=\"currentColor\" stroke-width=\"5\"/><polygon points=\"270,185 285,150 295,190\" fill=\"currentColor\" stroke=\"currentColor\" stroke-width=\"3\"/><polygon points=\"245,200 220,230 250,225\" fill=\"#020408\"/><circle cx=\"260\" cy=\"205\" r=\"7\" fill=\"currentColor\"/><line x1=\"320\" y1=\"275\" x2=\"330\" y2=\"295\" stroke=\"currentColor\" stroke-width=\"4\" stroke-linecap=\"round\"/>'
  },
  {
    file: 'deinonychus.svg',
    id: 'deinonychus',
    eraHeader: 'MESOZOICO • CRETÁCICO TEMPRANO • 115 MA',
    accentColor: '#10b981',
    title: 'Garra Terrible Terópodo Cazador Ágil',
    scientific: 'Deinonychus antirrhopus',
    stats: 'Longitud: 3.4 m | Peso: 80 kg | Garra falciforme retráctil de 13 cm y cola estabilizadora rígida',
    humanText: 'Humano (1.8m)',
    svgPath: '<path d=\"M 200 230 Q 240 210 290 230 Q 350 250 440 260 L 640 240 Q 540 290 440 290 L 400 430 L 370 430 L 390 290 L 340 420 L 315 420 L 330 270 Q 260 280 200 250 Z\" fill=\"currentColor\" opacity=\"0.5\" stroke=\"currentColor\" stroke-width=\"5\"/><path d=\"M 370 430 Q 355 410 360 400\" stroke=\"currentColor\" stroke-width=\"6\" fill=\"none\"/><path d=\"M 315 420 Q 300 400 305 390\" stroke=\"currentColor\" stroke-width=\"6\" fill=\"none\"/><polygon points=\"270,250 230,290 290,270\" fill=\"currentColor\" opacity=\"0.7\"/><circle cx=\"220\" cy=\"230\" r=\"6\" fill=\"#020408\"/>'
  },
  {
    file: 'andrewsarchus.svg',
    id: 'andrewsarchus',
    eraHeader: 'CENOZOICO • EOCENO • 45 MA',
    accentColor: '#f97316',
    title: 'Mayor Ungulado Carnívoro Terrestre',
    scientific: 'Andrewsarchus mongoliensis',
    stats: 'Longitud: 4.0 m | Cráneo: 83 cm | Dentición trituradora de huesos emparentada con cetartiodáctilos',
    humanText: 'Humano (1.8m)',
    svgPath: '<path d=\"M 180 260 Q 280 230 420 240 Q 520 260 560 300 L 540 430 L 515 430 L 525 320 L 450 320 L 430 430 L 405 430 L 415 310 Q 300 320 200 280 Z\" fill=\"currentColor\" opacity=\"0.5\" stroke=\"currentColor\" stroke-width=\"5\"/><path d=\"M 180 260 L 270 235 L 290 270 L 195 285 Z\" fill=\"currentColor\" opacity=\"0.8\" stroke=\"currentColor\" stroke-width=\"4\"/><circle cx=\"260\" cy=\"250\" r=\"8\" fill=\"#020408\"/><line x1=\"230\" y1=\"275\" x2=\"235\" y2=\"285\" stroke=\"#ffffff\" stroke-width=\"3\"/>'
  },
  {
    file: 'phorusrhacos.svg',
    id: 'phorusrhacos',
    eraHeader: 'CENOZOICO • MIOCENO • 15 MA',
    accentColor: '#f97316',
    title: 'Ave del Terror Patagónica Ápice',
    scientific: 'Phorusrhacos longissimus',
    stats: 'Altura: 2.5 m | Peso: 150 kg | Pico ganchudo de 60 cm y patas cursoras ultra-potentes',
    humanText: 'Humano (1.8m)',
    svgPath: '<path d=\"M 280 180 L 330 160 L 340 260 L 440 280 Q 480 300 460 350 L 400 350 L 410 460 L 385 460 L 390 350 L 350 450 L 325 450 L 340 330 Q 300 310 310 240 Z\" fill=\"currentColor\" opacity=\"0.55\" stroke=\"currentColor\" stroke-width=\"5\"/><path d=\"M 280 180 Q 240 180 230 210 Q 250 230 290 210 Z\" fill=\"currentColor\" opacity=\"0.9\" stroke=\"currentColor\" stroke-width=\"4\"/><circle cx=\"290\" cy=\"185\" r=\"7\" fill=\"#020408\"/><polygon points=\"350,290 380,310 355,325\" fill=\"currentColor\" opacity=\"0.8\"/>'
  },
  {
    file: 'livyatan.svg',
    id: 'livyatan',
    eraHeader: 'CENOZOICO • MIOCENO • 9.9 MA',
    accentColor: '#0284c7',
    title: 'Cachalote Hipercarnívoro de Dientes Colosales',
    scientific: 'Livyatan melvillei',
    stats: 'Longitud: 15 – 17 m | Peso: 50 t | Dientes de 36 cm en mandíbula superior e inferior',
    humanText: 'Humano (1.8m)',
    svgPath: '<path d=\"M 180 250 L 290 230 Q 450 230 550 270 L 610 230 L 595 285 L 625 330 Q 490 350 360 350 L 220 330 Q 170 300 180 250 Z\" fill=\"currentColor\" opacity=\"0.5\" stroke=\"currentColor\" stroke-width=\"5\"/><path d=\"M 200 300 L 280 295\" stroke=\"currentColor\" stroke-width=\"5\"/><g fill=\"#ffffff\"><circle cx=\"210\" cy=\"298\" r=\"4\"/><circle cx=\"225\" cy=\"298\" r=\"4\"/><circle cx=\"240\" cy=\"297\" r=\"4\"/><circle cx=\"255\" cy=\"297\" r=\"4\"/><circle cx=\"270\" cy=\"296\" r=\"4\"/></g><circle cx=\"240\" cy=\"265\" r=\"8\" fill=\"#020408\"/><polygon points=\"360,335 320,380 375,355\" fill=\"currentColor\" opacity=\"0.8\"/>'
  },
  {
    file: 'thylacosmilus.svg',
    id: 'thylacosmilus',
    eraHeader: 'CENOZOICO • MIOCENO / PLIOCENO • 7 MA',
    accentColor: '#f97316',
    title: 'Dientes de Sable Marsupial Sudamericano',
    scientific: 'Thylacosmilus atrox',
    stats: 'Longitud: 1.5 m | Peso: 100 kg | Colmillos de crecimiento continuo con vainas mandibulares',
    humanText: 'Humano (1.8m)',
    svgPath: '<path d=\"M 220 240 Q 300 230 420 250 Q 490 270 520 300 L 510 420 L 485 420 L 490 330 L 410 330 L 390 420 L 365 420 L 375 320 Q 280 320 240 280 Z\" fill=\"currentColor\" opacity=\"0.5\" stroke=\"currentColor\" stroke-width=\"5\"/><path d=\"M 220 240 Q 260 230 270 270 L 220 290 Z\" fill=\"currentColor\" opacity=\"0.8\" stroke=\"currentColor\" stroke-width=\"4\"/><path d=\"M 230 280 L 235 330 L 245 330 L 245 285\" fill=\"#ffffff\" stroke=\"currentColor\" stroke-width=\"2\"/><path d=\"M 225 285 L 220 345 L 250 345 L 245 295\" fill=\"currentColor\" opacity=\"0.6\" stroke=\"currentColor\" stroke-width=\"3\"/><circle cx=\"255\" cy=\"255\" r=\"7\" fill=\"#020408\"/>'
  },
  {
    file: 'australopithecus.svg',
    id: 'australopithecus',
    eraHeader: 'CENOZOICO • PLIOCENO • 3.7 MA',
    accentColor: '#f97316',
    title: 'Hominino Bípedo del Valle del Rift',
    scientific: 'Australopithecus afarensis',
    stats: 'Altura: 1.1 – 1.4 m | Peso: 35 – 50 kg | Bipedestación habitual, encéfalo de 400 cc (Fósil Lucy)',
    humanText: 'Humano (1.8m)',
    svgPath: '<g transform=\"translate(360, 160)\" fill=\"currentColor\" opacity=\"0.85\"><circle cx=\"40\" cy=\"35\" r=\"26\" stroke=\"currentColor\" stroke-width=\"3\"/><path d=\"M 28 65 L 52 65 L 56 160 L 24 160 Z\" stroke=\"currentColor\" stroke-width=\"3\"/><line x1=\"24\" y1=\"85\" x2=\"0\" y2=\"165\" stroke=\"currentColor\" stroke-width=\"10\" stroke-linecap=\"round\"/><line x1=\"56\" y1=\"85\" x2=\"80\" y2=\"165\" stroke=\"currentColor\" stroke-width=\"10\" stroke-linecap=\"round\"/><line x1=\"30\" y1=\"160\" x2=\"22\" y2=\"270\" stroke=\"currentColor\" stroke-width=\"12\" stroke-linecap=\"round\"/><line x1=\"50\" y1=\"160\" x2=\"58\" y2=\"270\" stroke=\"currentColor\" stroke-width=\"12\" stroke-linecap=\"round\"/><circle cx=\"35\" cy=\"35\" r=\"5\" fill=\"#020408\"/></g>'
  },
  {
    file: 'homo_neanderthalensis.svg',
    id: 'homo_neanderthalensis',
    eraHeader: 'CENOZOICO • PLEISTOCENO • 0.4 – 0.04 MA',
    accentColor: '#ef4444',
    title: 'Hombre de Neandertal (Cazador Glaciar)',
    scientific: 'Homo neanderthalensis',
    stats: 'Altura: 1.65 m | Capacidad craneal: 1,500 cc | Tórax en barril, cultura lítica musteriense y fuego',
    humanText: 'Humano (1.8m)',
    svgPath: '<g transform=\"translate(355, 140)\" fill=\"currentColor\" opacity=\"0.88\"><ellipse cx=\"45\" cy=\"35\" rx=\"28\" ry=\"26\" stroke=\"currentColor\" stroke-width=\"3\"/><path d=\"M 20 68 L 70 68 L 75 175 L 15 175 Z\" stroke=\"currentColor\" stroke-width=\"4\"/><line x1=\"15\" y1=\"85\" x2=\"-10\" y2=\"165\" stroke=\"currentColor\" stroke-width=\"13\" stroke-linecap=\"round\"/><line x1=\"75\" y1=\"85\" x2=\"100\" y2=\"165\" stroke=\"currentColor\" stroke-width=\"13\" stroke-linecap=\"round\"/><line x1=\"25\" y1=\"175\" x2=\"18\" y2=\"290\" stroke=\"currentColor\" stroke-width=\"15\" stroke-linecap=\"round\"/><line x1=\"65\" y1=\"175\" x2=\"72\" y2=\"290\" stroke=\"currentColor\" stroke-width=\"15\" stroke-linecap=\"round\"/><line x1=\"-15\" y1=\"70\" x2=\"-15\" y2=\"320\" stroke=\"#ffd700\" stroke-width=\"4\" stroke-linecap=\"round\"/><polygon points=\"-15,60 -22,80 -8,80\" fill=\"#ffd700\"/><circle cx=\"40\" cy=\"35\" r=\"5\" fill=\"#020408\"/></g>'
  }
];

function generateSvg(spec) {
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

  <!-- Central Specimen Silhouette Graphic -->
  <g transform="translate(0, 10)" color="${spec.accentColor}" filter="url(#glow_${spec.id})" opacity="0.92">
    ${spec.svgPath}
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
    <text x="10" y="70" fill="rgba(255, 255, 255, 0.45)" font-family="sans-serif" font-size="9" text-anchor="middle">Humano (1.8m)</text>
  </g>

  <!-- Species Nomenclature & Biometrics Footer -->
  <rect x="60" y="495" width="680" height="45" rx="8" fill="rgba(10, 16, 26, 0.85)" stroke="rgba(255, 255, 255, 0.08)"/>
  <text x="80" y="522" fill="#ffffff" font-family="'Space Grotesk', sans-serif" font-size="16" font-weight="700">${spec.title}</text>
  <text x="80" y="534" fill="#94a3b8" font-family="'Outfit', sans-serif" font-style="italic" font-size="11">${spec.scientific}</text>
  <text x="720" y="523" fill="${spec.accentColor}" font-family="'JetBrains Mono', monospace" font-size="11" text-anchor="end">${spec.stats}</text>
</svg>`;
}

const targetDir = path.join(__dirname, '..', 'public', 'assets', 'species');
specs.forEach(s => {
  const filePath = path.join(targetDir, s.file);
  fs.writeFileSync(filePath, generateSvg(s), 'utf8');
  console.log('Generated:', s.file);
});
console.log('Done! Generated', specs.length, 'SVG files.');
