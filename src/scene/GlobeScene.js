import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';
import { TextureManager } from './TextureManager.js';
import { MarkerManager } from './MarkerManager.js';
import { PlateTectonicsManager } from './PlateTectonicsManager.js';
import { ExtinctionSimulationManager } from './ExtinctionSimulationManager.js';

export class GlobeScene {
  constructor(canvasContainer, onMarkerSelected = null, onBoundarySelected = null, onPlateSelected = null) {
    this.container = canvasContainer;
    this.onMarkerSelected = onMarkerSelected;
    this.onBoundarySelected = onBoundarySelected;
    this.onPlateSelected = onPlateSelected;

    this.globeRadius = 5.0;
    this.isTransitioning = false;
    this.transitionStartTime = 0;
    this.transitionDuration = 600; // ms

    // Display options
    this.showClouds = true;
    this.showGraticules = false;
    this.showTectonics = false;
    this.isCinematicMode = true;
    this.showRings = false; // Earth had no permanent rings during the Phanerozoic
    this.showCloudSea = false; // Disabled: prevent tilted plane intersecting the globe
    this.showMagma = false; // Natural paleogeographic surface by default

    // Animation / Camera focus target
    this.targetCameraPos = null;
    this.targetControlsTarget = null;
    this.cameraLerpSpeed = 0.05;
    this._activeFocusTween = null;

    this.textureManager = new TextureManager();

    this._initScene();
    this._initCamera();
    this._initRenderer();
    this._initLights();
    this._initGlobe();
    this._initClouds();
    this._initGraticules();
    this._initAtmosphere();
    this._initRings();
    this._initCinematicClouds();
    this._initMagmaLayer();
    this._initStarfield();
    this._initControls();
    this._initMarkerManager();
    this._initPlateTectonics();
    this._initExtinctionSimulation();
    this._initEventListeners();

    this.clock = new THREE.Clock();
    this._animate = this._animate.bind(this);
    requestAnimationFrame(this._animate);
  }

  _initScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x030508);
  }

  _initCamera() {
    const aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
    this.camera.position.set(0, 3.5, 13.5);
  }

  _initRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    this.container.appendChild(this.renderer.domElement);

    // Pass GPU max anisotropy to texture manager to prevent pixelation on zoom/angles
    const maxAnisotropy = this.renderer.capabilities.getMaxAnisotropy();
    this.textureManager.setMaxAnisotropy(maxAnisotropy);
  }

  _initLights() {
    // Ambient Light (subtle cosmic fill for night side)
    this.ambientLight = new THREE.AmbientLight(0x1a2434, 0.7);
    this.scene.add(this.ambientLight);

    // Directional Sun Light (warm celestial key light)
    this.sunLight = new THREE.DirectionalLight(0xfff0db, 2.8);
    this.sunLight.position.set(18, 9, 14);
    this.scene.add(this.sunLight);

    // Secondary warm bounce light from lower cloud horizon
    this.cloudBounceLight = new THREE.DirectionalLight(0xd97706, 1.4);
    this.cloudBounceLight.position.set(0, -12, 6);
    this.scene.add(this.cloudBounceLight);

    // Cosmic rim light
    this.backLight = new THREE.DirectionalLight(0xff9933, 1.1);
    this.backLight.position.set(-18, -4, -12);
    this.scene.add(this.backLight);
  }

  _initGlobe() {
    this.globeGroup = new THREE.Group();
    this.globeGroup.name = 'globe-group';
    this.scene.add(this.globeGroup);

    // Shared high-density sphere geometry (128x128 for razor-sharp curvature)
    this.sphereGeometry = new THREE.SphereGeometry(this.globeRadius, 128, 128);

    // Procedural high-frequency relief bump map to prevent pixelation on close zoom
    this._initMicroRelief();

    // Primary Globe Mesh (holds active paleogeographic texture)
    this.primaryMaterial = new THREE.MeshStandardMaterial({
      roughness: 0.52,
      metalness: 0.18,
      bumpMap: this.reliefBumpMap,
      bumpScale: 0.006
    });
    this.primaryGlobe = new THREE.Mesh(this.sphereGeometry, this.primaryMaterial);
    this.globeGroup.add(this.primaryGlobe);

    // Incoming Globe Mesh (used for silky-smooth crossfade opacity blending)
    this.incomingGeometry = new THREE.SphereGeometry(this.globeRadius * 1.0015, 128, 128);
    this.incomingMaterial = new THREE.MeshStandardMaterial({
      roughness: 0.52,
      metalness: 0.18,
      bumpMap: this.reliefBumpMap,
      bumpScale: 0.006,
      transparent: true,
      opacity: 0.0,
      depthWrite: false
    });
    this.incomingGlobe = new THREE.Mesh(this.incomingGeometry, this.incomingMaterial);
    this.incomingGlobe.renderOrder = 1;
    this.globeGroup.add(this.incomingGlobe);
  }

  _initMicroRelief() {
    const w = 2048;
    const h = 1024;
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    const imgData = ctx.createImageData(w, h);
    const data = imgData.data;

    // Multi-frequency geological micro-topography noise
    for (let y = 0; y < h; y++) {
      const ny = y / h;
      for (let x = 0; x < w; x++) {
        const nx = x / w;
        const idx = (y * w + x) * 4;

        // Fractal elevation harmonics (smooth continuous wave harmonics, no random pixel static)
        const f1 = Math.sin(nx * 80.0) * Math.cos(ny * 50.0) * 14.0;
        const f2 = Math.sin(nx * 180.0 + ny * 120.0) * 8.0;
        const f3 = Math.cos(nx * 360.0 - ny * 240.0) * 4.0;

        const val = Math.min(255, Math.max(0, Math.floor(128 + f1 + f2 + f3)));
        data[idx] = val;
        data[idx + 1] = val;
        data[idx + 2] = val;
        data[idx + 3] = 255;
      }
    }
    ctx.putImageData(imgData, 0, 0);

    this.reliefBumpMap = new THREE.CanvasTexture(canvas);
    this.reliefBumpMap.wrapS = THREE.RepeatWrapping;
    this.reliefBumpMap.wrapT = THREE.ClampToEdgeWrapping;
    this.reliefBumpMap.generateMipmaps = true;
    this.reliefBumpMap.minFilter = THREE.LinearMipmapLinearFilter;
    this.reliefBumpMap.magFilter = THREE.LinearFilter;
    this.reliefBumpMap.anisotropy = 16;
  }

  _initClouds() {
    // Photorealistic atmospheric cloud layer
    const cloudGeom = new THREE.SphereGeometry(this.globeRadius * 1.009, 64, 64);
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('./textures/fair_clouds.png', (cloudTexture) => {
      cloudTexture.wrapS = THREE.RepeatWrapping;
      cloudTexture.wrapT = THREE.ClampToEdgeWrapping;
      cloudTexture.colorSpace = THREE.SRGBColorSpace;

      const cloudMat = new THREE.MeshStandardMaterial({
        map: cloudTexture,
        transparent: true,
        opacity: 0.8,
        blending: THREE.NormalBlending,
        depthWrite: false,
        roughness: 0.9,
        metalness: 0.0
      });

      this.cloudMesh = new THREE.Mesh(cloudGeom, cloudMat);
      this.cloudMesh.renderOrder = 2;
      this.cloudMesh.visible = this.showClouds;
      this.globeGroup.add(this.cloudMesh);
    }, undefined, (err) => {
      console.warn('Could not load clouds texture, continuing without clouds:', err);
    });
  }

  _initGraticules() {
    this.graticulesGroup = new THREE.Group();
    this.graticulesGroup.name = 'graticules';
    this.graticulesGroup.visible = this.showGraticules;

    const r = this.globeRadius * 1.005;

    // Equator Line (Vibrant Cyan)
    const eqPoints = [];
    for (let i = 0; i <= 128; i++) {
      const angle = (i / 128) * Math.PI * 2;
      eqPoints.push(new THREE.Vector3(Math.cos(angle) * r, 0, Math.sin(angle) * r));
    }
    const eqGeom = new THREE.BufferGeometry().setFromPoints(eqPoints);
    const eqMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.75, linewidth: 2 });
    const equator = new THREE.Line(eqGeom, eqMat);
    this.graticulesGroup.add(equator);

    // Tropics & Polar Circles (Subtle Dotted/Translucent)
    const latitudes = [23.5, -23.5, 66.5, -66.5];
    latitudes.forEach(lat => {
      const latRad = (lat * Math.PI) / 180;
      const ringRadius = r * Math.cos(latRad);
      const ringY = r * Math.sin(latRad);
      const ringPts = [];
      for (let i = 0; i <= 96; i++) {
        const theta = (i / 96) * Math.PI * 2;
        ringPts.push(new THREE.Vector3(Math.cos(theta) * ringRadius, ringY, Math.sin(theta) * ringRadius));
      }
      const geom = new THREE.BufferGeometry().setFromPoints(ringPts);
      const mat = new THREE.LineBasicMaterial({ color: 0x94a3b8, transparent: true, opacity: 0.35 });
      this.graticulesGroup.add(new THREE.Line(geom, mat));
    });

    this.globeGroup.add(this.graticulesGroup);
  }

  _initAtmosphere() {
    const atmosGeometry = new THREE.SphereGeometry(this.globeRadius * 1.028, 64, 64);
    this.atmosMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uSunPosition: { value: this.sunLight.position }
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vWorldPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vWorldPosition;
        uniform vec3 uSunPosition;

        void main() {
          vec3 viewDir = normalize(cameraPosition - vWorldPosition);
          vec3 sunDir = normalize(uSunPosition);

          float rim = 1.0 - max(0.0, dot(vNormal, viewDir));
          rim = pow(rim, 2.4);

          float sunDot = dot(normalize(vNormal), sunDir);
          float goldenFactor = smoothstep(-0.25, 0.65, sunDot);

          // Deep cosmic sapphire on shadow side, incandescent golden amber on sunlit side
          vec3 nightAtmo = vec3(0.15, 0.38, 0.95);
          vec3 goldenAtmo = vec3(1.0, 0.65, 0.22);
          vec3 fieryCore = vec3(1.0, 0.34, 0.05);

          vec3 atmoColor = mix(nightAtmo, goldenAtmo, goldenFactor);
          atmoColor += fieryCore * pow(max(0.0, sunDot), 1.8) * rim * 1.6;

          gl_FragColor = vec4(atmoColor, rim * 0.92);
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false
    });

    this.atmosphereMesh = new THREE.Mesh(atmosGeometry, this.atmosMaterial);
    this.atmosphereMesh.renderOrder = 0;
    this.scene.add(this.atmosphereMesh);
  }

  _initRings() {
    this.ringGroup = new THREE.Group();
    this.ringGroup.name = 'planetary-rings';
    this.ringGroup.visible = this.showRings;

    const innerR = this.globeRadius * 1.35;
    const outerR = this.globeRadius * 2.45;
    const ringGeometry = new THREE.RingGeometry(innerR, outerR, 160, 1);

    this.ringMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uInnerRadius: { value: innerR },
        uOuterRadius: { value: outerR },
        uGlobeRadius: { value: this.globeRadius },
        uSunPosition: { value: this.sunLight.position }
      },
      vertexShader: `
        varying vec3 vPosition;
        varying vec3 vWorldPosition;
        void main() {
          vPosition = position;
          vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vPosition;
        varying vec3 vWorldPosition;
        uniform float uInnerRadius;
        uniform float uOuterRadius;
        uniform float uGlobeRadius;
        uniform vec3 uSunPosition;

        void main() {
          float r = length(vPosition.xy);
          if (r < uInnerRadius || r > uOuterRadius) discard;

          float t = (r - uInnerRadius) / (uOuterRadius - uInnerRadius);

          // Multi-frequency dust density bands
          float band = sin(t * 85.0) * 0.18 + sin(t * 240.0) * 0.12 + sin(t * 40.0) * 0.28 + 0.55;

          // Cassini division gap
          float gap = smoothstep(0.47, 0.49, t) * (1.0 - smoothstep(0.51, 0.53, t));
          band *= (1.0 - gap * 0.95);

          // Inner/outer edge feathering
          float edge = smoothstep(0.0, 0.05, t) * (1.0 - smoothstep(0.93, 1.0, t));

          // Golden amber & terracotta color palette
          vec3 innerCol = vec3(1.0, 0.78, 0.42);
          vec3 midCol = vec3(0.88, 0.52, 0.20);
          vec3 outerCol = vec3(0.52, 0.32, 0.18);
          vec3 ringCol = mix(innerCol, midCol, t);
          ringCol = mix(ringCol, outerCol, pow(t, 1.8));

          float alpha = band * edge * 0.85;

          // Realistic spherical shadow of the planet on the rings
          vec3 toSun = normalize(uSunPosition);
          float proj = dot(-vWorldPosition, toSun);
          if (proj > 0.0) {
            vec3 closestPoint = vWorldPosition + toSun * proj;
            if (length(closestPoint) < uGlobeRadius * 0.985) {
              alpha *= 0.08;
            }
          }

          gl_FragColor = vec4(ringCol * (0.65 + band * 0.6), alpha);
        }
      `,
      side: THREE.DoubleSide,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending
    });

    this.ringMesh = new THREE.Mesh(ringGeometry, this.ringMaterial);
    this.ringMesh.renderOrder = 3;
    this.ringGroup.add(this.ringMesh);

    // Tilt rings like a real celestial body
    this.ringGroup.rotation.x = Math.PI * 0.42;
    this.ringGroup.rotation.y = Math.PI * 0.12;

    this.scene.add(this.ringGroup);
  }

  _initCinematicClouds() {
    this.cloudSeaGroup = new THREE.Group();
    this.cloudSeaGroup.name = 'cinematic-cloud-sea';
    this.cloudSeaGroup.visible = this.showCloudSea;

    const cloudGeom = new THREE.PlaneGeometry(38, 14, 64, 32);

    this.cloudSeaMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uSunPosition: { value: this.sunLight.position }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vWorldPosition;
        void main() {
          vUv = uv;
          vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying vec3 vWorldPosition;
        uniform float uTime;
        uniform vec3 uSunPosition;

        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
        }

        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
                     mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
        }

        float fbm(vec2 p) {
          float v = 0.0;
          float a = 0.5;
          mat2 rot = mat2(0.87758, 0.47942, -0.47942, 0.87758);
          for (int i = 0; i < 5; i++) {
            v += a * noise(p);
            p = rot * p * 2.02 + vec2(10.0, 10.0);
            a *= 0.5;
          }
          return v;
        }

        void main() {
          vec2 uv = vUv;
          vec2 flow = vec2(uv.x * 2.8 + uTime * 0.02, uv.y * 1.9 - uTime * 0.01);
          float n1 = fbm(flow);
          float n2 = fbm(flow * 2.2 + vec2(uTime * 0.015));
          float cloudDensity = smoothstep(0.28, 0.78, n1 + n2 * 0.35);

          float topFade = smoothstep(0.98, 0.42, uv.y);
          float bottomFade = smoothstep(0.0, 0.25, uv.y);
          float alpha = cloudDensity * topFade * bottomFade * 0.92;

          vec3 deepBronze = vec3(0.14, 0.07, 0.03);
          vec3 warmAmber = vec3(0.84, 0.46, 0.14);
          vec3 goldenHighlight = vec3(1.0, 0.78, 0.38);
          vec3 sunlitCrest = vec3(1.0, 0.94, 0.78);

          vec3 color = mix(deepBronze, warmAmber, n1);
          color = mix(color, goldenHighlight, pow(n2, 1.6) * 1.15);
          color = mix(color, sunlitCrest, pow(cloudDensity, 3.2) * 0.75);

          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending
    });

    this.cloudSeaMesh = new THREE.Mesh(cloudGeom, this.cloudSeaMaterial);
    this.cloudSeaMesh.visible = false;
    this.cloudSeaGroup.visible = false;
    this.cloudSeaGroup.add(this.cloudSeaMesh);
    this.scene.add(this.cloudSeaGroup);
  }

  _initMagmaLayer() {
    this.magmaGeometry = new THREE.SphereGeometry(this.globeRadius * 1.002, 64, 64);
    this.magmaMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uSunPosition: { value: this.sunLight.position },
        uOpacity: { value: 0.85 }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vWorldPosition;
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vWorldPosition;
        uniform float uTime;
        uniform vec3 uSunPosition;
        uniform float uOpacity;

        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
        }

        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
                     mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
        }

        float fbm(vec2 p) {
          float v = 0.0;
          float a = 0.5;
          mat2 rot = mat2(0.87758, 0.47942, -0.47942, 0.87758);
          for (int i = 0; i < 4; i++) {
            v += a * noise(p);
            p = rot * p * 2.0 + vec2(5.0, 5.0);
            a *= 0.5;
          }
          return v;
        }

        void main() {
          vec2 uv = vUv * vec2(8.0, 4.0);
          vec2 p = uv + vec2(uTime * 0.015, 0.0);
          float n1 = fbm(p);
          float n2 = fbm(p * 2.0 - vec2(uTime * 0.02, 0.0));

          float equatorBand = 1.0 - abs(vUv.y - 0.44) * 3.8;
          equatorBand = clamp(equatorBand, 0.0, 1.0);
          equatorBand = pow(equatorBand, 1.4);

          float magmaIntensity = smoothstep(0.42, 0.75, n1 + n2 * 0.35) * equatorBand;

          vec3 hotOrange = vec3(1.0, 0.42, 0.06);
          vec3 incandescentGold = vec3(1.0, 0.88, 0.38);

          vec3 col = mix(hotOrange, incandescentGold, smoothstep(0.3, 0.8, magmaIntensity));
          float alpha = smoothstep(0.08, 0.55, magmaIntensity) * equatorBand * uOpacity;

          gl_FragColor = vec4(col * 1.6, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    this.magmaMesh = new THREE.Mesh(this.magmaGeometry, this.magmaMaterial);
    this.magmaMesh.renderOrder = 2;
    this.magmaMesh.visible = this.showMagma;
    this.globeGroup.add(this.magmaMesh);
  }

  _initStarfield() {
    const starCount = 2500;
    const starGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    const colorPalette = [
      new THREE.Color(0xffffff),
      new THREE.Color(0x9fc5e8),
      new THREE.Color(0xffe599),
      new THREE.Color(0xd9d2e9)
    ];

    for (let i = 0; i < starCount; i++) {
      const radius = 100 + Math.random() * 150;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 1.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.85
    });

    this.starfield = new THREE.Points(starGeometry, starMaterial);
    this.scene.add(this.starfield);
  }

  _initControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.minDistance = 6.8; // Calibrated to prevent texel over-stretching on close zoom
    this.controls.maxDistance = 28.0;
    this.controls.rotateSpeed = 0.7;
    this.controls.zoomSpeed = 0.9;
    this.controls.panSpeed = 0.5;
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 0.35; // Gentle majestic idle spin
  }

  _initMarkerManager() {
    this.markerManager = new MarkerManager(this.globeGroup, this.globeRadius, (siteData) => {
      if (this.onMarkerSelected) this.onMarkerSelected(siteData);
    });
  }

  _initPlateTectonics() {
    this.plateTectonicsManager = new PlateTectonicsManager(
      this.globeGroup,
      this.globeRadius,
      (boundary) => {
        if (this.onBoundarySelected) this.onBoundarySelected(boundary);
      },
      (plate) => {
        if (this.onPlateSelected) this.onPlateSelected(plate);
      }
    );
  }

  _initExtinctionSimulation() {
    this.extinctionManager = new ExtinctionSimulationManager(this, this.globeGroup, this.globeRadius);
  }

  _initEventListeners() {
    window.addEventListener('resize', this._onWindowResize.bind(this));

    const dom = this.renderer.domElement;
    dom.addEventListener('pointermove', this._onPointerMove.bind(this));
    dom.addEventListener('pointerdown', this._onPointerDown.bind(this));
    dom.addEventListener('click', this._onClick.bind(this));
  }

  _onWindowResize() {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  _getNormalizedCoords(event) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    return { x, y };
  }

  _onPointerMove(event) {
    const { x, y } = this._getNormalizedCoords(event);
    const hit = this.markerManager.testIntersection(x, y, this.camera);

    if (hit) {
      this.renderer.domElement.style.cursor = 'pointer';
      this.markerManager.setHover(hit.markerGroup);
      this._showTooltip(event.clientX, event.clientY, hit.speciesData);
      return;
    }

    // Test Tectonics Boundaries & Plates intersection
    const hitTectonics = this.plateTectonicsManager.testIntersection(x, y, this.camera);
    if (hitTectonics) {
      this.renderer.domElement.style.cursor = 'pointer';
      this.markerManager.setHover(null);
      if (hitTectonics.isTectonicBoundary) {
        this._showTectonicBoundaryTooltip(event.clientX, event.clientY, hitTectonics.boundaryData);
      } else if (hitTectonics.isTectonicPlate) {
        this._showTectonicPlateTooltip(event.clientX, event.clientY, hitTectonics.plateData);
      }
      return;
    }

    this.renderer.domElement.style.cursor = 'grab';
    this.markerManager.setHover(null);
    this._hideTooltip();
  }

  _onPointerDown() {
    this.controls.autoRotate = false;
  }

  _onClick(event) {
    const { x, y } = this._getNormalizedCoords(event);
    const hit = this.markerManager.testIntersection(x, y, this.camera);

    if (hit && hit.speciesData) {
      const sp = hit.speciesData;
      const lat = sp.coordinates ? sp.coordinates.lat : (sp.lat || 0);
      const lon = sp.coordinates ? sp.coordinates.lng : (sp.lon || 0);
      this.focusOnCoordinate(lat, lon);
      if (this.onMarkerSelected) {
        this.onMarkerSelected(sp);
      }
      return;
    }

    // Tectonic item clicked
    const hitTectonics = this.plateTectonicsManager.testIntersection(x, y, this.camera);
    if (hitTectonics) {
      if (hitTectonics.isTectonicPlate && hitTectonics.plateData) {
        const p = hitTectonics.plateData;
        this.focusOnCoordinate(p.centroid.lat, p.centroid.lon, 9.2);
        if (this.onPlateSelected) this.onPlateSelected(p);
      } else if (hitTectonics.isTectonicBoundary && hitTectonics.boundaryData) {
        const b = hitTectonics.boundaryData;
        if (b.coordinates && b.coordinates.length > 0) {
          const mid = b.coordinates[Math.floor(b.coordinates.length / 2)];
          this.focusOnCoordinate(mid[0], mid[1], 9.2);
        }
        if (this.onBoundarySelected) this.onBoundarySelected(b);
      }
    }
  }

  _showTectonicBoundaryTooltip(clientX, clientY, b) {
    if (!b) return;
    let tooltip = document.getElementById('globe-tooltip');
    if (!tooltip) {
      tooltip = document.createElement('div');
      tooltip.id = 'globe-tooltip';
      document.body.appendChild(tooltip);
    }
    let typeLabel = 'Divergente (Dorsal / Rift)';
    let typeClass = 'env-mar';
    let typeIcon = '🟦';
    if (b.type === 'convergent') {
      typeLabel = 'Convergente (Fosa de Subducción)';
      typeClass = 'env-terr';
      typeIcon = '🟧';
    } else if (b.type === 'transform') {
      typeLabel = 'Transformante (Falla de Rumbo)';
      typeClass = 'env-amp';
      typeIcon = '🟨';
    } else if (b.type === 'collision') {
      typeLabel = 'Colisión Continental (Orogenia)';
      typeClass = 'env-aer';
      typeIcon = '🟪';
    }

    tooltip.innerHTML = `
      <div class="tooltip-top-row">
        <span class="tooltip-header">${b.name}</span>
        <span class="tooltip-env-tag ${typeClass}">${typeIcon} ${b.type.toUpperCase()}</span>
      </div>
      <div class="tooltip-taxon">${typeLabel}</div>
      <div class="tooltip-meta-grid">
        <div class="tooltip-diet">⚡ Velocidad relativa: <strong>${b.motionRate || 'Variable'}</strong></div>
        <div class="tooltip-sub" style="margin-top: 4px;">${b.description}</div>
      </div>
    `;
    tooltip.style.left = `${clientX + 14}px`;
    tooltip.style.top = `${clientY + 14}px`;
    tooltip.style.display = 'block';
  }

  _showTectonicPlateTooltip(clientX, clientY, p) {
    if (!p) return;
    let tooltip = document.getElementById('globe-tooltip');
    if (!tooltip) {
      tooltip = document.createElement('div');
      tooltip.id = 'globe-tooltip';
      document.body.appendChild(tooltip);
    }
    const isOceanic = p.type === 'oceanic';
    const isMicro = p.type === 'microplate';
    const typeTag = isOceanic ? '🌊 PLACA OCEÁNICA' : (isMicro ? '🧩 MICROPLACA' : '🏔️ CRATÓN CONTINENTAL');

    tooltip.innerHTML = `
      <div class="tooltip-top-row">
        <span class="tooltip-header">${p.name}</span>
        <span class="tooltip-env-tag ${isOceanic ? 'env-mar' : (isMicro ? 'env-amp' : 'env-terr')}">${typeTag}</span>
      </div>
      <div class="tooltip-taxon">Superficie litosférica: ~${p.area || 'N/D'}</div>
      <div class="tooltip-meta-grid">
        <div class="tooltip-diet">⚡ Vector de movimiento: <strong>${p.motion}</strong></div>
        <div class="tooltip-sub" style="margin-top: 4px;">${p.context}</div>
      </div>
    `;
    tooltip.style.left = `${clientX + 14}px`;
    tooltip.style.top = `${clientY + 14}px`;
    tooltip.style.display = 'block';
  }

  _showTooltip(clientX, clientY, sp) {
    if (!sp) return;
    let tooltip = document.getElementById('globe-tooltip');
    if (!tooltip) {
      tooltip = document.createElement('div');
      tooltip.id = 'globe-tooltip';
      document.body.appendChild(tooltip);
    }
    const common = sp.commonName || sp.name;
    const sci = sp.scientificName || sp.name;
    const diet = sp.diet || '';
    const loc = sp.fossilSite || (sp.paleoLocation ? sp.paleoLocation.join(', ') : '');
    
    // Environment badge & Diet classification
    const env = (sp.environment || '').toLowerCase();
    const clade = (sp.clade || '').toLowerCase();
    const dietStr = (sp.diet || '').toLowerCase();

    const isMarine = env === 'marine' || 
                     dietStr.includes('piscívoro') || 
                     clade.includes('cetacea') || 
                     clade.includes('mosasaur') || 
                     clade.includes('pliosaur') || 
                     clade.includes('ichthyosaur') ||
                     clade.includes('ammonit') ||
                     clade.includes('trilobit');

    let envBadge = '🌲 Terrestre';
    let envClass = 'env-terr';
    if (isMarine) {
      envBadge = '🌊 Marino';
      envClass = 'env-mar';
    } else if (env === 'aerial' || clade.includes('pterosaur') || clade.includes('aves')) {
      envBadge = '🪽 Volador';
      envClass = 'env-aer';
    } else if (env === 'amphibious') {
      envBadge = '🦎 Anfibio';
      envClass = 'env-amp';
    }

    let dietBadgeClass = 'diet-carnivore';
    let dietBadgeColor = '#ef4444';
    if (dietStr.includes('filtrador') || dietStr.includes('omnívoro') || dietStr.includes('insectívoro')) {
      dietBadgeClass = 'diet-filter';
      dietBadgeColor = '#f59e0b';
    } else if (isMarine) {
      dietBadgeClass = 'diet-marine';
      dietBadgeColor = '#00d2ff';
    } else if (dietStr.includes('herbívoro') || dietStr.includes('vegetariano')) {
      dietBadgeClass = 'diet-herbivore';
      dietBadgeColor = '#22c55e';
    }

    const paleoRealm = isMarine && sp.paleogeography?.waterBody
      ? `🌊 Cuenca oceánica: <strong>${sp.paleogeography.waterBody}</strong>`
      : (sp.paleogeography?.landmass ? `🏔️ Masa continental: <strong>${sp.paleogeography.landmass}</strong>` : (sp.paleogeography?.waterBody ? `💧 Humedal / Ribera: <strong>${sp.paleogeography.waterBody}</strong>` : ''));

    const formation = sp.discovery?.geologicalFormation 
      ? `<div class="tooltip-sub">🪨 Fm. <em>${sp.discovery.geologicalFormation}</em></div>` 
      : '';

    const discoverer = sp.discovery?.discoverer 
      ? `<div class="tooltip-sub">🔍 Hallazgo: ${sp.discovery.discoverer} (${sp.discovery.yearDiscovered || 's.d.'})</div>` 
      : '';

    tooltip.innerHTML = `
      <div class="tooltip-top-row">
        <span class="tooltip-header">${common}</span>
        <div class="tooltip-tags-wrap">
          <span class="tooltip-diet-tag" style="border: 1px solid ${dietBadgeColor}; color: ${dietBadgeColor}; background: rgba(0,0,0,0.5);">${diet.split(' ')[0]}</span>
          <span class="tooltip-env-tag ${envClass}">${envBadge}</span>
        </div>
      </div>
      <div class="tooltip-taxon">${sci} ${sp.clade ? '• ' + sp.clade : ''}</div>
      <div class="tooltip-meta-grid">
        ${diet ? `<div class="tooltip-diet" style="color: ${dietBadgeColor}; font-weight: 600;">🍽️ Dieta: ${diet}</div>` : ''}
        ${paleoRealm ? `<div class="tooltip-paleo">${paleoRealm}</div>` : ''}
        <div class="tooltip-loc">📍 Yacimiento: ${loc}</div>
        ${formation}
        ${discoverer}
      </div>
    `;
    tooltip.style.left = `${clientX + 14}px`;
    tooltip.style.top = `${clientY + 14}px`;
    tooltip.style.display = 'block';
  }

  _hideTooltip() {
    const tooltip = document.getElementById('globe-tooltip');
    if (tooltip) tooltip.style.display = 'none';
  }

  /**
   * Sets the period: loads texture asynchronously and transitions with opacity crossfade
   * @param {Object} period Period metadata
   * @param {Array} activeFauna Optional filtered list of active species
   */
  async setPeriod(period, activeFauna = null) {
    try {
      const newTexture = await this.textureManager.loadPeriodTexture(period);

      // Perform crossfade
      this._startCrossfade(newTexture);

      // Update 3D species markers on globe for this period
      const faunaToDisplay = activeFauna || period.species || [];
      this.markerManager.updateSpeciesMarkers(faunaToDisplay, period.iugsColor);

      // Update 3D tectonic boundaries and paleoplates for this period
      if (this.plateTectonicsManager) {
        this.plateTectonicsManager.updateForPeriod(period.id);
      }

      // Atmospheric color adjustments for specific extremes
      if (period.id === 'cryogenian_750ma') {
        this.sunLight.color.setHex(0xddeeff);
        this.ambientLight.color.setHex(0x99bbdd);
      } else if (period.id === 'permian_250ma') {
        this.sunLight.color.setHex(0xffe8d6);
        this.ambientLight.color.setHex(0xcc8877);
      } else {
        this.sunLight.color.setHex(0xfffaed);
        this.ambientLight.color.setHex(0xa5b8d0);
      }
    } catch (err) {
      console.error('[GlobeScene] Failed setting period:', err);
    }
  }

  /**
   * Smoothly navigates the camera to point strictly perpendicular to the fossil site,
   * maintaining optimal distance for sharp terrain texture, triggering concentric pulse animation.
   * @param {string} fossilId Fossil species identifier or slug
   * @param {Object} [speciesData] Optional species object
   * @param {Object} [options] Custom configuration (duration, distance, onComplete)
   */
  focusOnFossil(fossilId, speciesData = null, options = {}) {
    const sp = speciesData || (this.markerManager ? this.markerManager.selectedSpecies : null);
    if (!sp && !speciesData) return;

    // Calibrated viewing distance (1.96x globe radius) to ensure maximum texture sharpness without pixelation
    const targetDistance = options.distance || 9.8;
    const duration = options.duration !== undefined ? options.duration : 1.35; // seconds

    // Disable auto-rotation during intentional scientific focus
    this.controls.autoRotate = false;

    // Physical Paleocoordinates Priority:
    // In ancient periods (e.g. Jurassic Aysén at 150 Ma), South America was located further southeast in Gondwana.
    // The marker and camera focus on paleoCoordinates so the site aligns with the continental landmass.
    const coords = sp.paleoCoordinates || sp.coordinates;
    const lat = coords ? coords.lat : (sp.lat || 0);
    const lon = coords ? (coords.lon !== undefined ? coords.lon : (coords.lng !== undefined ? coords.lng : 0)) : (sp.lon || 0);

    // Calculate normal vector pointing straight out of the sphere at the marker location
    const normal = this.markerManager.latLonToCartesian(lat, lon, 1.0).normalize();
    const targetCameraPos = normal.clone().multiplyScalar(targetDistance);

    // Color determination for radar beacon
    const dietStr = (sp.diet || '').toLowerCase();
    const envStr = (sp.environment || '').toLowerCase();
    const isMarine = envStr === 'marine' || dietStr.includes('piscívoro');
    let zoneColor = options.periodColor || '#38bdf8';
    if (dietStr.includes('filtrador') || dietStr.includes('omnívoro')) zoneColor = '#f59e0b';
    else if (isMarine) zoneColor = '#00d2ff';
    else if (dietStr.includes('carnívoro')) zoneColor = '#ef4444';
    else if (dietStr.includes('herbívoro') || dietStr.includes('vegetariano')) zoneColor = '#10b981';

    // 1. Display species distribution basin on the globe surface
    this.markerManager.showSpeciesZone(sp, zoneColor);

    // 2. Fire high-visibility concentric radar ripple pulse waves over the quarry site
    if (typeof this.markerManager.triggerConcentricRadarPulse === 'function') {
      this.markerManager.triggerConcentricRadarPulse(lat, lon, zoneColor);
    }

    // 3. Stop any existing ongoing camera flight or tween
    this.isFlyingTo = false;
    this.flyTargetDir = null;
    if (this._activeFocusTween) {
      this._activeFocusTween.kill();
      this._activeFocusTween = null;
    }

    const startPos = this.camera.position.clone();
    const startDist = startPos.length();
    const startDir = startPos.clone().normalize();
    const endDir = normal.clone();

    // 4. GSAP Great-Circle Spherical Interpolation
    const animObj = { progress: 0 };
    this._activeFocusTween = gsap.to(animObj, {
      progress: 1,
      duration: duration,
      ease: 'power3.inOut',
      onUpdate: () => {
        const t = animObj.progress;
        // Spherical great-circle interpolation for direction
        const currentDir = startDir.clone().lerp(endDir, t).normalize();
        // Distance interpolation towards target altitude
        const currentDist = startDist + (targetDistance - startDist) * t;

        this.camera.position.copy(currentDir.multiplyScalar(currentDist));
        this.camera.lookAt(0, 0, 0);
        this.controls.target.set(0, 0, 0);
        this.controls.update();
      },
      onComplete: () => {
        this.camera.position.copy(targetCameraPos);
        this.camera.lookAt(0, 0, 0);
        this.controls.target.set(0, 0, 0);
        this.controls.update();
        this._activeFocusTween = null;
        if (typeof options.onComplete === 'function') {
          options.onComplete();
        }
      }
    });
  }

  /**
   * Displays the geographic distribution zone for a selected species and smoothly focuses on it
   */
  showSpeciesZone(sp, periodColor) {
    if (!sp) return;
    this.focusOnFossil(sp.id, sp, { periodColor });
  }

  /**
   * Resets globe view to displaying all species markers as individual points
   */
  showAllSpeciesPoints(speciesList, periodColor) {
    this.markerManager.updateSpeciesMarkers(speciesList, periodColor);
  }

  _startCrossfade(newTexture) {
    if (!this.primaryMaterial.map) {
      this.primaryMaterial.map = newTexture;
      this.primaryMaterial.needsUpdate = true;
      return;
    }

    this.incomingMaterial.map = newTexture;
    this.incomingMaterial.opacity = 0.0;
    this.incomingMaterial.needsUpdate = true;

    this.isTransitioning = true;
    this.transitionStartTime = performance.now();
    this.pendingTexture = newTexture;
  }

  focusOnCoordinate(lat, lon, targetDistance = 9.8) {
    this.controls.autoRotate = false;
    const normal = this.markerManager.latLonToCartesian(lat, lon, 1.0).normalize();
    this.flyTargetDir = normal;
    this.flyTargetDist = targetDistance;
    this.isFlyingTo = true;
  }

  setCity(cityData, timeMa) {
    const pos = this.markerManager.setCityMarker(cityData, timeMa);
    if (pos) {
      this.focusOnCoordinate(pos.lat, pos.lon, 9.8);
    }
    return pos;
  }

  updateCityPeriod(cityData, timeMa) {
    if (!cityData) return null;
    return this.markerManager.setCityMarker(cityData, timeMa);
  }

  clearCity() {
    this.markerManager.clearCityMarker();
  }

  resetView() {
    this.controls.autoRotate = false;
    this.flyTargetDir = new THREE.Vector3(0, 0.25, 0.96).normalize();
    this.flyTargetDist = 13.5;
    this.isFlyingTo = true;
  }

  setCinematicView() {
    this.controls.autoRotate = true;
    this.flyTargetDir = new THREE.Vector3(0.18, 0.14, 0.97).normalize();
    this.flyTargetDist = 13.8;
    this.isFlyingTo = true;
  }

  toggleAutoRotate() {
    this.controls.autoRotate = !this.controls.autoRotate;
    return this.controls.autoRotate;
  }

  toggleClouds() {
    this.showClouds = !this.showClouds;
    if (this.cloudMesh) {
      this.cloudMesh.visible = this.showClouds;
    }
    return this.showClouds;
  }

  toggleGraticules() {
    this.showGraticules = !this.showGraticules;
    if (this.graticulesGroup) {
      this.graticulesGroup.visible = this.showGraticules;
    }
    return this.showGraticules;
  }

  setTectonicsData(database) {
    this.tectonicsData = database;
    if (this.plateTectonicsManager) {
      this.plateTectonicsManager.setData(database);
      if (this.currentPeriod) {
        this.plateTectonicsManager.updateForPeriod(this.currentPeriod.id);
      }
    }
  }

  toggleTectonics(forceState = null) {
    if (this.plateTectonicsManager) {
      this.showTectonics = this.plateTectonicsManager.toggle(forceState);
    }
    return this.showTectonics;
  }

  isTectonicsVisible() {
    return this.showTectonics;
  }

  toggleRings() {
    this.showRings = !this.showRings;
    if (this.ringGroup) {
      this.ringGroup.visible = this.showRings;
    }
    return this.showRings;
  }

  toggleCloudSea() {
    this.showCloudSea = !this.showCloudSea;
    if (this.cloudSeaGroup) {
      this.cloudSeaGroup.visible = this.showCloudSea;
    }
    return this.showCloudSea;
  }

  toggleMagma() {
    this.showMagma = !this.showMagma;
    if (this.magmaMesh) {
      this.magmaMesh.visible = this.showMagma;
    }
    return this.showMagma;
  }

  setCinematicMode(enabled) {
    this.isCinematicMode = enabled;
    if (enabled) {
      this.showRings = false;
      this.showCloudSea = false;
      this.showMagma = false;
      if (this.ringGroup) this.ringGroup.visible = false;
      if (this.cloudSeaGroup) this.cloudSeaGroup.visible = false;
      if (this.magmaMesh) this.magmaMesh.visible = false;
      this.sunLight.color.setHex(0xfff0db);
      this.sunLight.intensity = 2.8;
      this.ambientLight.color.setHex(0x1a2434);
      this.controls.autoRotate = true;
      this.controls.autoRotateSpeed = 0.35;
      this.setCinematicView();
    } else {
      this.showRings = false;
      this.showCloudSea = false;
      this.showMagma = false;
      if (this.ringGroup) this.ringGroup.visible = false;
      if (this.cloudSeaGroup) this.cloudSeaGroup.visible = false;
      if (this.magmaMesh) this.magmaMesh.visible = false;
      this.resetView();
    }
    return this.isCinematicMode;
  }

  // =========================================================================
  // Extinction Simulation Public Interface
  // =========================================================================
  getExtinctionManager() {
    return this.extinctionManager;
  }

  loadExtinctionEvent(eventData) {
    if (this.extinctionManager) {
      this.extinctionManager.loadEvent(eventData);
    }
  }

  startExtinctionSimulation() {
    if (this.extinctionManager) {
      this.extinctionManager.start();
    }
  }

  pauseExtinctionSimulation() {
    if (this.extinctionManager) {
      this.extinctionManager.pause();
    }
  }

  toggleExtinctionSimulation() {
    if (this.extinctionManager) {
      this.extinctionManager.togglePlay();
    }
  }

  seekExtinctionSimulation(progress) {
    if (this.extinctionManager) {
      this.extinctionManager.seek(progress);
    }
  }

  resetExtinctionSimulation() {
    if (this.extinctionManager) {
      this.extinctionManager.reset();
    }
  }

  _animate(time) {
    requestAnimationFrame(this._animate);

    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();

    // 1. Smooth Spherical Great-Circle Camera Navigation
    if (this.isFlyingTo && this.flyTargetDir) {
      const curDir = this.camera.position.clone().normalize();
      const angle = curDir.angleTo(this.flyTargetDir);

      if (angle > 0.015) {
        // Move along great circle at constant altitude around the planet
        const step = Math.min(0.08, Math.max(0.035, angle * 0.12));
        curDir.lerp(this.flyTargetDir, step).normalize();

        const curDist = this.camera.position.length();
        const newDist = curDist + (this.flyTargetDist - curDist) * 0.08;

        this.camera.position.copy(curDir.multiplyScalar(newDist));
        this.camera.lookAt(0, 0, 0);
        this.controls.target.set(0, 0, 0);
        this.controls.update();
      } else {
        this.camera.position.copy(this.flyTargetDir.clone().multiplyScalar(this.flyTargetDist));
        this.camera.lookAt(0, 0, 0);
        this.controls.target.set(0, 0, 0);
        this.controls.update();
        this.isFlyingTo = false;
        this.flyTargetDir = null;
      }
    }

    // 2. Crossfade opacity animation
    if (this.isTransitioning) {
      const elapsed = performance.now() - this.transitionStartTime;
      const progress = Math.min(1.0, elapsed / this.transitionDuration);

      const eased = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      this.incomingMaterial.opacity = eased;

      if (progress >= 1.0) {
        this.isTransitioning = false;
        this.primaryMaterial.map = this.pendingTexture;
        this.primaryMaterial.needsUpdate = true;
        this.incomingMaterial.opacity = 0.0;
        this.pendingTexture = null;
      }
    }

    // 3. Realistic cloud atmospheric drift
    if (this.cloudMesh && this.cloudMesh.visible) {
      this.cloudMesh.rotation.y += 0.00035;
    }

    // 4. Update Astra Shader Uniforms
    if (this.cloudSeaMaterial) {
      this.cloudSeaMaterial.uniforms.uTime.value = elapsedTime;
      this.cloudSeaMaterial.uniforms.uSunPosition.value.copy(this.sunLight.position);
    }
    if (this.magmaMaterial) {
      this.magmaMaterial.uniforms.uTime.value = elapsedTime;
      this.magmaMaterial.uniforms.uSunPosition.value.copy(this.sunLight.position);
    }
    if (this.atmosMaterial) {
      this.atmosMaterial.uniforms.uSunPosition.value.copy(this.sunLight.position);
    }
    if (this.ringMaterial) {
      this.ringMaterial.uniforms.uSunPosition.value.copy(this.sunLight.position);
      if (this.ringGroup) {
        this.ringGroup.rotation.z += 0.00025;
      }
    }

    // 5. Update 3D Markers & Tectonic Boundaries
    this.markerManager.update(elapsedTime);
    if (this.plateTectonicsManager) {
      this.plateTectonicsManager.update(elapsedTime);
    }
    if (this.extinctionManager) {
      this.extinctionManager.update(delta);
    }

    // 6. Subtle starfield drift
    if (this.starfield) {
      this.starfield.rotation.y = elapsedTime * 0.012;
    }

    // 7. Update Orbit Controls
    this.controls.update();

    // 8. Render Scene
    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    window.removeEventListener('resize', this._onWindowResize.bind(this));
    if (this.renderer && this.renderer.domElement) {
      this.container.removeChild(this.renderer.domElement);
      this.renderer.dispose();
    }
  }
}
