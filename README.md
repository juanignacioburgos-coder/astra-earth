# 🌍 Tierra Antigua 3D (Ancient Earth SPA)

Una aplicación web estática interactiva (Single Page Application) construida con **Vite** y **Three.js** para visualizar la **deriva continental** a lo largo de 750 millones de años de historia geológica, con fauna, flora, condiciones atmosféricas y marcadores fosilíferos 3D proyectados en la superficie terrestre.

Diseñada para ser alojada de forma 100% gratuita y sin servidores en **GitHub Pages**.

---

## 🌟 Características Principales

1. **Globo Terráqueo 3D Interactivo**:
   - Renderizado con `SphereGeometry` y `MeshStandardMaterial` con shaders atmosféricos y campo estelar inmersivo.
   - Navegación orbital con `OrbitControls` (rotación libre, paneo y zoom táctil/ratón tipo Google Earth).
   - Iluminación ambiental y solar direccional calibrada con atmósfera tonal reactiva.

2. **Metodología de Deriva Continental (Snapshots Geológicos)**:
   - 15 hitos geológicos discretos desde el Criogénico (750 Ma) hasta el Presente (0 Ma).
   - Carga asíncrona de texturas equirrectangulares (compatibles con PALEOMAP de Christopher Scotese).
   - **Transición por desvanecimiento suave (Crossfade)**: Interpolación continua de opacidad sin parpadeos (*flickering*) a 60 FPS.
   - **Motor de Respaldo Procedural Fotorrealista**: Si no se suministran archivos de imagen externos, un motor procedural genera en memoria mapas equirrectangulares de 2048×1024 basados en las configuraciones paleogeográficas de cada era (Pangea, Gondwana, mares someros, glaciaciones polares, etc.).

3. **Línea de Tiempo Cronoestratigráfica (IUGS)**:
   - Slider / Scrubber interactivo codificado con la paleta oficial de colores de la **Comisión Internacional de Estratigrafía (IUGS)**.
   - Modo de reproducción automática (**Animar Deriva**) para observar la evolución tectónica en tiempo continuo.
   - Selector rápido por periodo y etiquetas en Millones de Años (Ma).

4. **Superposición de Datos Paleobiológicos (`fauna_flora.json`)**:
   - Panel lateral desplegable tipo *Glassmorphism*.
   - Telemetría planetaria: Concentración de Oxígeno ($O_2$), Dióxido de Carbono ($CO_2$), Temperatura media global y nivel del mar relativo.
   - Registro de flora predominante y fauna característica (taxones fósiles emblemáticos).
   - Hitos tectónicos y extinciones masivas documentadas.

5. **Marcadores Fosilíferos 3D y Navegación de Cámara**:
   - Marcadores en 3D proyectados sobre la superficie esférica utilizando la fórmula de conversión esférica a cartesiana:
     $$\begin{aligned}
     x &= R \cdot \cos(\text{lat}) \cdot \cos(\text{lon}) \\
     y &= R \cdot \sin(\text{lat}) \\
     z &= -R \cdot \cos(\text{lat}) \cdot \sin(\text{lon})
     \end{aligned}$$
   - Balizas pulsantes con detección interactiva de puntero (*Raycasting*), tooltips emergentes y botón *"Localizar en el Globo"* para centrar la cámara cinematográficamente en el yacimiento.

6. **Despliegue Continuo (CI/CD)**:
   - Flujo de trabajo automatizado en `.github/workflows/gh-pages.yml` para compilar y desplegar en GitHub Pages con cada `git push` a `main` o `master`.

---

## 📁 Estructura del Proyecto

```text
ancient-earth/
├── .github/
│   └── workflows/
│       └── gh-pages.yml          # Flujo CI/CD para GitHub Pages
├── public/
│   ├── data/
│   │   └── fauna_flora.json      # Base de datos paleobiológica curada (15 periodos)
│   └── textures/
│       └── paleomap/
│           └── README.md         # Guía de nombres y especificaciones para mapas externos
├── src/
│   ├── scene/
│   │   ├── GlobeScene.js         # Escena Three.js, iluminación, cámara y crossfade
│   │   ├── MarkerManager.js      # Marcadores 3D, proyección esférica y raycasting
│   │   └── TextureManager.js     # Gestor de caché y carga asíncrona de texturas
│   ├── ui/
│   │   ├── Sidebar.js            # Panel lateral paleobiológico
│   │   └── Timeline.js           # Scrubber IUGS con auto-play
│   ├── utils/
│   │   └── proceduralMaps.js     # Generador de mapas paleogeográficos procedurales
│   ├── main.js                   # Orquestador principal de la aplicación
│   └── style.css                 # Sistema de diseño, Glassmorphism y temas
├── index.html                    # Estructura semántica SPA y diálogos
├── package.json
└── vite.config.js                # Configuración con rutas relativas para GitHub Pages
```

---

## 🚀 Puesta en Marcha Local

### Prerrequisitos
- Node.js (v18 o superior)
- npm

### Instalación y Ejecución
```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev
```

Abre en tu navegador: `http://localhost:5173/`

### Compilación para Producción
```bash
npm run build
npm run preview
```

---

## 🚢 Despliegue en GitHub Pages

1. **Crear un repositorio en GitHub** y subir los archivos:
   ```bash
   git init
   git add .
   git commit -m "feat: Ancient Earth 3D SPA"
   git branch -M main
   git remote add origin https://github.com/<tu-usuario>/<tu-repositorio>.git
   git push -u origin main
   ```

2. **Habilitar GitHub Pages en el repositorio**:
   - Ve a **Settings** > **Pages** en tu repositorio de GitHub.
   - En **Build and deployment** > **Source**, selecciona: **GitHub Actions**.

3. Con cada `git push` a la rama `main`, la GitHub Action compilará la aplicación y la publicará automáticamente en:
   `https://<tu-usuario>.github.io/<tu-repositorio>/`
