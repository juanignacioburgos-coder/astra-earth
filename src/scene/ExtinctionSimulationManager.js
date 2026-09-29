import * as THREE from 'three';

/**
 * ExtinctionSimulationManager
 * Next-Generation Photorealistic 3D Visual Simulation Engine for Prehistoric Mass Extinctions:
 * 1. K-Pg (66 Ma) Chicxulub Asteroid Impact:
 *    - Hypersonic atmospheric entry with stabilized plasma wake & tumbling asteroid core (fixed tail orientation).
 *    - Blinding multi-source thermal flash and expanding 3D plasma fireball dome.
 *    - Multi-tiered incandescent crater caldera with peak ring & cooling molten melt pool.
 *    - Concentric geodetic spherical shockwaves (hypersonic ionization, megatsunami, seismic, and Lamb pressure waves).
 *    - Suborbital parabolic ballistic ejecta curtain showering incandescent microtectites.
 *    - Stratospheric soot & sulfate aerosol nuclear winter twilight.
 * 2. P-Tr (250 Ma) Siberian Traps & Tr-J (200 Ma) CAMP Volcanism:
 *    - Conformal branching crustal lava fissures pulsating with convective thermal glow (no rigid cylinders!).
 *    - Dynamic eruptive caldera vents with fiery cinder fountains & billowing pyroclastic ash columns.
 *    - Expanding basaltic flood lava field spreading across the continental craton.
 *    - Stratospheric sulfur dioxide aerosol shield casting an apocalyptic copper twilight.
 * 3. Ordovician-Silurian (443 Ma) Hirnantian Glaciation:
 *    - Mathematically conformal polar ice sheet expanding along the sphere surface (never detaches into outer space!).
 *    - Swirling polar blizzard vortex particle streams hugging the troposphere.
 *    - 2024 Scientific Discovery: Equatorial asteroid debris ring casting cooling shadow bands across tropical seas.
 * 4. Late Devonian (375 Ma) Kellwasser Oceanic Anoxia:
 *    - Conformal spherical marine anoxic bloom hugging the curved ocean surface (no flat clipping discs!).
 *    - Multistage transition: eutrophic algal bloom into toxic emerald-green and deep euxinic purple-black waters.
 *    - Effervescent bubbling plume of toxic hydrogen sulfide (H2S) and methane rising from ocean shelves.
 */
export class ExtinctionSimulationManager {
  constructor(globeScene, globeGroup, globeRadius = 5.0) {
    this.globeScene = globeScene;
    this.globeGroup = globeGroup;
    this.globeRadius = globeRadius;

    // Simulation root group (rotates with globe)
    this.simulationGroup = new THREE.Group();
    this.simulationGroup.name = 'extinction-simulation-group';
    this.globeGroup.add(this.simulationGroup);

    // Dynamic simulation elements
    this.currentEvent = null;
    this.state = 'IDLE'; // IDLE, READY, PLAYING, PAUSED, FINISHED
    this.playbackTime = 0.0;
    this.duration = 18.0; // Standard 18-second cinematic educational sequence
    this.playbackSpeed = 1.0;

    // Sub-systems tracking for clean disposal
    this.activeMeshes = [];
    this.shockwaveRings = [];
    this.particleSystems = [];
    this.volcanicVents = [];
    this.asteroidGroup = null;
    this.asteroidCoreMesh = null;
    this.asteroidTailPoints = null;
    this.fireballDomeMesh = null;
    this.craterGroup = null;
    this.ejectaPoints = null;
    this.impactLight = null;
    this.secondaryLight = null;
    this.conformalSurfaceMeshes = [];

    // External listener callbacks
    this.onProgressCallback = null;
    this.onStateChangeCallback = null;
    this.onPhaseChangeCallback = null;

    this.currentPhaseIndex = -1;
  }

  latLonToCartesian(lat, lon, radius = this.globeRadius) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    return new THREE.Vector3(
      -(radius * Math.sin(phi) * Math.cos(theta)),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    );
  }

  setCallbacks({ onProgress, onStateChange, onPhaseChange }) {
    this.onProgressCallback = onProgress;
    this.onStateChangeCallback = onStateChange;
    this.onPhaseChangeCallback = onPhaseChange;
  }

  loadEvent(eventData) {
    this.reset();
    this.currentEvent = eventData;
    this.playbackTime = 0.0;
    this.currentPhaseIndex = -1;
    this._buildSimulationScene(eventData);
    this._notifyState('READY');
  }

  start() {
    if (!this.currentEvent) return;
    this.state = 'PLAYING';
    this._notifyState('PLAYING');
  }

  pause() {
    if (this.state === 'PLAYING') {
      this.state = 'PAUSED';
      this._notifyState('PAUSED');
    }
  }

  resume() {
    if (this.state === 'PAUSED' || this.state === 'READY') {
      this.state = 'PLAYING';
      this._notifyState('PLAYING');
    }
  }

  togglePlay() {
    if (this.state === 'PLAYING') {
      this.pause();
    } else {
      this.resume();
    }
  }

  seek(progressNormalized) {
    this.playbackTime = Math.max(0, Math.min(1.0, progressNormalized)) * this.duration;
    this._updateVisuals(this.playbackTime);
  }

  reset() {
    this.state = 'IDLE';
    this.playbackTime = 0.0;
    this.currentPhaseIndex = -1;

    // Restore natural celestial illumination
    if (this.globeScene && this.globeScene.sunLight) {
      this.globeScene.sunLight.intensity = 2.8;
      this.globeScene.sunLight.color.setHex(0xfff0db);
    }
    if (this.globeScene && this.globeScene.ambientLight) {
      this.globeScene.ambientLight.intensity = 0.7;
      this.globeScene.ambientLight.color.setHex(0x1a2434);
    }

    // Recursively dispose and remove all dynamically spawned objects
    const disposeRecursive = (obj) => {
      while (obj.children.length > 0) {
        disposeRecursive(obj.children[0]);
        obj.remove(obj.children[0]);
      }
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
        else obj.material.dispose();
      }
    };

    while (this.simulationGroup.children.length > 0) {
      const child = this.simulationGroup.children[0];
      disposeRecursive(child);
      this.simulationGroup.remove(child);
    }

    this.activeMeshes = [];
    this.shockwaveRings = [];
    this.particleSystems = [];
    this.volcanicVents = [];
    this.asteroidGroup = null;
    this.asteroidCoreMesh = null;
    this.asteroidTailPoints = null;
    this.fireballDomeMesh = null;
    this.craterGroup = null;
    this.ejectaPoints = null;
    this.impactLight = null;
    this.secondaryLight = null;
    this.conformalSurfaceMeshes = [];

    this._notifyState('IDLE');
  }

  isPlaying() {
    return this.state === 'PLAYING';
  }

  // =========================================================================
  // Scene Construction Router
  // =========================================================================
  _buildSimulationScene(event) {
    const simType = event.simulationType || 'asteroid_impact';
    const coords = event.coordinates || { lat: 0, lon: 0 };
    const impactNormal = this.latLonToCartesian(coords.lat, coords.lon, 1.0).normalize();
    const surfacePos = impactNormal.clone().multiplyScalar(this.globeRadius * 1.008);

    if (simType === 'asteroid_impact') {
      this._buildAsteroidImpact(impactNormal, surfacePos);
    } else if (simType === 'siberian_traps' || simType === 'camp_volcanism') {
      this._buildFloodBasaltVolcanism(impactNormal, surfacePos, event);
    } else if (simType === 'hirnantian_glaciation') {
      this._buildGlaciation(impactNormal, surfacePos, event);
    } else if (simType === 'oceanic_anoxia') {
      this._buildOceanicAnoxia(impactNormal, surfacePos, event);
    }
  }

  // =========================================================================
  // 1. Asteroid Impact 3D System (Chicxulub K-Pg)
  // =========================================================================
  _buildAsteroidImpact(impactNormal, surfacePos) {
    this.impactNormal = impactNormal;
    this.impactPos = surfacePos;

    // Incoming trajectory from deep space at steep 60° hypersonic impact angle
    let tangent = new THREE.Vector3(1, 0, 0).cross(impactNormal).normalize();
    if (tangent.lengthSq() < 0.01) tangent.set(0, 1, 0).cross(impactNormal).normalize();
    this.spaceEntryOrigin = surfacePos.clone()
      .add(impactNormal.clone().multiplyScalar(13.5))
      .add(tangent.clone().multiplyScalar(7.2));

    this.entryDirection = surfacePos.clone().sub(this.spaceEntryOrigin).normalize();

    // 1. Bolide & Plasma Sheath Assembly
    this.asteroidGroup = new THREE.Group();
    this.asteroidGroup.visible = false;

    // Jagged stony-iron bolide core (tumbling independently)
    const coreGeom = new THREE.DodecahedronGeometry(0.22, 2);
    // Add displacement noise to vertices for organic jagged asteroid morphology
    const posAttr = coreGeom.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const v = new THREE.Vector3().fromBufferAttribute(posAttr, i);
      const noise = 1.0 + (Math.sin(v.x * 12.0) * Math.cos(v.y * 12.0) * Math.sin(v.z * 12.0)) * 0.18;
      v.multiplyScalar(noise);
      posAttr.setXYZ(i, v.x, v.y, v.z);
    }
    coreGeom.computeVertexNormals();

    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x1c1917,
      roughness: 0.85,
      metalness: 0.4,
      emissive: 0xff3b00,
      emissiveIntensity: 2.8
    });
    this.asteroidCoreMesh = new THREE.Mesh(coreGeom, coreMat);
    this.asteroidGroup.add(this.asteroidCoreMesh);

    // Compressed incandescent shock-layer plasma fireball
    const plasmaGeom = new THREE.SphereGeometry(0.38, 20, 20);
    const plasmaMat = new THREE.MeshBasicMaterial({
      color: 0xfff3d0,
      transparent: true,
      opacity: 0.92,
      blending: THREE.AdditiveBlending
    });
    const plasmaMesh = new THREE.Mesh(plasmaGeom, plasmaMat);
    this.asteroidGroup.add(plasmaMesh);

    // Trailing hypersonic plasma wake (fixed to trail strictly OPPOSITE to entryDirection)
    const tailCount = 140;
    const tailGeom = new THREE.BufferGeometry();
    const tailPos = new Float32Array(tailCount * 3);
    const tailColors = new Float32Array(tailCount * 3);

    for (let i = 0; i < tailCount; i++) {
      const frac = i / tailCount;
      const dist = frac * 5.5; // length of streak
      const spread = Math.pow(frac, 1.4) * 0.55;

      tailPos[i * 3] = (Math.random() - 0.5) * spread;
      tailPos[i * 3 + 1] = (Math.random() - 0.5) * spread;
      tailPos[i * 3 + 2] = dist; // trails backwards along +Z

      // Color gradient from incandescent yellow to deep red
      tailColors[i * 3] = 1.0;
      tailColors[i * 3 + 1] = 0.85 - frac * 0.65;
      tailColors[i * 3 + 2] = 0.2 - frac * 0.2;
    }
    tailGeom.setAttribute('position', new THREE.BufferAttribute(tailPos, 3));
    tailGeom.setAttribute('color', new THREE.BufferAttribute(tailColors, 3));

    const tailMat = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    this.asteroidTailPoints = new THREE.Points(tailGeom, tailMat);
    // Align +Z axis strictly to the backward vector (-entryDirection)
    this.asteroidTailPoints.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), this.entryDirection.clone().negate());
    this.asteroidGroup.add(this.asteroidTailPoints);

    this.simulationGroup.add(this.asteroidGroup);

    // 2. Expanding 3D Plasma Fireball Hemisphere Dome
    const fireballGeom = new THREE.SphereGeometry(1.0, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.5);
    const fireballMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.0,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    this.fireballDomeMesh = new THREE.Mesh(fireballGeom, fireballMat);
    this.fireballDomeMesh.position.copy(surfacePos);
    this.fireballDomeMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), impactNormal);
    this.fireballDomeMesh.visible = false;
    this.simulationGroup.add(this.fireballDomeMesh);

    // 3. Multi-Tiered Impact Crater Caldera & Peak Ring
    this.craterGroup = new THREE.Group();
    this.craterGroup.position.copy(surfacePos.clone().add(impactNormal.clone().multiplyScalar(0.012)));
    this.craterGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), impactNormal);
    this.craterGroup.visible = false;

    // Central peak ring (inner molten uplift)
    const peakGeom = new THREE.RingGeometry(0.01, 0.22, 48);
    const peakMat = new THREE.MeshBasicMaterial({
      color: 0xffeedd,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending
    });
    this.craterPeakMesh = new THREE.Mesh(peakGeom, peakMat);
    this.craterGroup.add(this.craterPeakMesh);

    // Outer molten caldera & fracture rim
    const rimGeom = new THREE.RingGeometry(0.18, 0.48, 64);
    const rimMat = new THREE.MeshBasicMaterial({
      color: 0xff3b00,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.0
    });
    this.craterRimMesh = new THREE.Mesh(rimGeom, rimMat);
    this.craterGroup.add(this.craterRimMesh);

    this.simulationGroup.add(this.craterGroup);

    // 4. Geodetic Spherical Shockwave Fronts
    const shockConfigs = [
      { color: 0xffffff, delay: 0.0, speed: 2.4, width: 0.055, maxAngle: 2.95 },  // Mach 25 atmospheric thermal ionization
      { color: 0xff7700, delay: 0.06, speed: 1.7, width: 0.09, maxAngle: 2.85 },   // Megatsunami & crustal rupture wave
      { color: 0xef4444, delay: 0.16, speed: 1.25, width: 0.11, maxAngle: 2.65 },  // Deep seismic P/S mantle compression
      { color: 0x38bdf8, delay: 0.26, speed: 0.95, width: 0.08, maxAngle: 2.45 }   // Lamb barometric circumglobal wave
    ];

    shockConfigs.forEach(cfg => {
      const ringData = this._createGeodeticShockwaveMesh(impactNormal, cfg.color);
      ringData.mesh.visible = false;
      this.simulationGroup.add(ringData.mesh);
      this.shockwaveRings.push({
        ...ringData,
        delay: cfg.delay,
        speed: cfg.speed,
        baseWidth: cfg.width,
        maxAngle: cfg.maxAngle
      });
    });

    // 5. Parabolic Ballistic Suborbital Ejecta Storm
    const particleCount = 420;
    const ejectaGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const ejectaColors = new Float32Array(particleCount * 3);
    const velocities = [];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = surfacePos.x;
      positions[i * 3 + 1] = surfacePos.y;
      positions[i * 3 + 2] = surfacePos.z;

      // Inverted cone velocities oriented around impactNormal
      const upwardSpeed = 1.4 + Math.random() * 3.8;
      const spreadAngle = (Math.PI * 0.38) * Math.random();
      const azimuth = Math.random() * Math.PI * 2;

      let u = new THREE.Vector3(1, 0, 0).cross(impactNormal);
      if (u.lengthSq() < 0.01) u = new THREE.Vector3(0, 1, 0).cross(impactNormal);
      u.normalize();
      const v = impactNormal.clone().cross(u).normalize();

      const dir = impactNormal.clone().multiplyScalar(Math.cos(spreadAngle))
        .add(u.clone().multiplyScalar(Math.sin(spreadAngle) * Math.cos(azimuth)))
        .add(v.clone().multiplyScalar(Math.sin(spreadAngle) * Math.sin(azimuth)))
        .normalize();

      velocities.push(dir.multiplyScalar(upwardSpeed));

      // Fiery microtectite incandescent spark colors
      ejectaColors[i * 3] = 1.0;
      ejectaColors[i * 3 + 1] = 0.55 + Math.random() * 0.45;
      ejectaColors[i * 3 + 2] = 0.1;
    }

    ejectaGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    ejectaGeom.setAttribute('color', new THREE.BufferAttribute(ejectaColors, 3));

    const ejectaMat = new THREE.PointsMaterial({
      size: 0.16,
      vertexColors: true,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.ejectaPoints = new THREE.Points(ejectaGeom, ejectaMat);
    this.ejectaPoints.userData = { velocities, initialPositions: positions.slice() };
    this.ejectaPoints.visible = false;
    this.simulationGroup.add(this.ejectaPoints);

    // 6. Impact Thermal Flash Point Light
    this.impactLight = new THREE.PointLight(0xfff8e8, 0.0, 50, 1.2);
    this.impactLight.position.copy(surfacePos.clone().add(impactNormal.clone().multiplyScalar(0.6)));
    this.simulationGroup.add(this.impactLight);
  }

  /**
   * Constructs a mathematical geodetic circular ribbon hugging the sphere surface.
   * Conforms precisely to spherical geometry with zero clipping and zero detachment.
   */
  _createGeodeticShockwaveMesh(normal, colorHex) {
    const segments = 128;
    const geom = new THREE.BufferGeometry();

    const positions = new Float32Array(segments * 2 * 3);
    const indices = [];

    for (let i = 0; i < segments; i++) {
      const i0 = i * 2;
      const i1 = i * 2 + 1;
      const next0 = ((i + 1) % segments) * 2;
      const next1 = ((i + 1) % segments) * 2 + 1;

      indices.push(i0, i1, next0);
      indices.push(next0, i1, next1);
    }

    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geom.setIndex(indices);

    const mat = new THREE.MeshBasicMaterial({
      color: colorHex,
      transparent: true,
      opacity: 0.0,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const mesh = new THREE.Mesh(geom, mat);

    let u = new THREE.Vector3(1, 0, 0).cross(normal);
    if (u.lengthSq() < 0.01) u = new THREE.Vector3(0, 1, 0).cross(normal);
    u.normalize();
    const v = normal.clone().cross(u).normalize();

    return { mesh, geometry: geom, material: mat, normal, u, v, segments };
  }

  _updateGeodeticRing(ringData, theta, width, opacity) {
    const { mesh, geometry, material, normal, u, v, segments } = ringData;
    if (theta <= 0.01 || opacity <= 0.005) {
      mesh.visible = false;
      return;
    }

    mesh.visible = true;
    material.opacity = opacity;

    const altitude = 0.026;
    const R = this.globeRadius * 1.008 + altitude;

    const halfW = width * 0.5;
    const thetaInner = Math.max(0.005, theta - halfW);
    const thetaOuter = Math.min(Math.PI - 0.005, theta + halfW);

    const cosIn = Math.cos(thetaInner);
    const sinIn = Math.sin(thetaInner);
    const cosOut = Math.cos(thetaOuter);
    const sinOut = Math.sin(thetaOuter);

    const pos = geometry.attributes.position;

    for (let i = 0; i < segments; i++) {
      const phi = (i / segments) * Math.PI * 2;
      const cosPhi = Math.cos(phi);
      const sinPhi = Math.sin(phi);

      const tx = u.x * cosPhi + v.x * sinPhi;
      const ty = u.y * cosPhi + v.y * sinPhi;
      const tz = u.z * cosPhi + v.z * sinPhi;

      const inX = R * (normal.x * cosIn + tx * sinIn);
      const inY = R * (normal.y * cosIn + ty * sinIn);
      const inZ = R * (normal.z * cosIn + tz * sinIn);

      const outX = R * (normal.x * cosOut + tx * sinOut);
      const outY = R * (normal.y * cosOut + ty * sinOut);
      const outZ = R * (normal.z * cosOut + tz * sinOut);

      pos.setXYZ(i * 2, inX, inY, inZ);
      pos.setXYZ(i * 2 + 1, outX, outY, outZ);
    }

    pos.needsUpdate = true;
  }

  // =========================================================================
  // 2. Flood Basalt Volcanism System (Siberian Traps & CAMP)
  // =========================================================================
  _buildFloodBasaltVolcanism(impactNormal, surfacePos, event) {
    const isSiberia = event.id.includes('siberian');
    const centerLat = event.coordinates.lat;
    const centerLon = event.coordinates.lon;

    // 1. Sprawling Conformal Fissure Networks on the Crust (Branching Lava Tubes)
    const fissureCount = 14;
    for (let f = 0; f < fissureCount; f++) {
      const angle = (f / fissureCount) * Math.PI * 2;
      const dist = 0.2 + (f % 3) * 0.35 + Math.random() * 0.25;
      const latOff = Math.cos(angle) * dist * 8.5;
      const lonOff = Math.sin(angle) * dist * 14.0;

      const startLat = centerLat + latOff;
      const startLon = centerLon + lonOff;

      // Spline curve conforming to spherical planetary curvature
      const points = [];
      const numPts = 6;
      for (let p = 0; p < numPts; p++) {
        const segFrac = p / (numPts - 1);
        const meanderLat = (Math.sin(segFrac * Math.PI * 3.0 + f) * 1.8);
        const meanderLon = (Math.cos(segFrac * Math.PI * 2.5 + f) * 2.5);
        const curLat = startLat + meanderLat + (p * 0.8 * (f % 2 === 0 ? 1 : -1));
        const curLon = startLon + meanderLon + (p * 1.4);
        points.push(this.latLonToCartesian(curLat, curLon, this.globeRadius * 1.012));
      }

      const curve = new THREE.CatmullRomCurve3(points);
      const tubeGeom = new THREE.TubeGeometry(curve, 24, 0.038, 6, false);
      const tubeMat = new THREE.MeshBasicMaterial({
        color: 0xff3b00,
        transparent: true,
        opacity: 0.0
      });
      const tubeMesh = new THREE.Mesh(tubeGeom, tubeMat);
      this.simulationGroup.add(tubeMesh);
      this.activeMeshes.push(tubeMesh);
    }

    // 2. Active Caldera Eruptive Vents with Fiery Cinder Fountains & Ash Clouds
    const ventCount = 8;
    for (let v = 0; v < ventCount; v++) {
      const vAngle = (v / ventCount) * Math.PI * 2;
      const vDist = 0.25 + (v % 2) * 0.45;
      const vLat = centerLat + Math.cos(vAngle) * vDist * 6.5;
      const vLon = centerLon + Math.sin(vAngle) * vDist * 11.0;
      const ventPos = this.latLonToCartesian(vLat, vLon, this.globeRadius * 1.01);
      const ventNorm = ventPos.clone().normalize();

      // Glowing circular magma vent on surface
      const ventRingGeom = new THREE.RingGeometry(0.02, 0.14, 24);
      const ventRingMat = new THREE.MeshBasicMaterial({
        color: 0xffcc00,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.0,
        blending: THREE.AdditiveBlending
      });
      const ventRing = new THREE.Mesh(ventRingGeom, ventRingMat);
      ventRing.position.copy(ventPos);
      ventRing.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), ventNorm);
      this.simulationGroup.add(ventRing);
      this.activeMeshes.push(ventRing);

      // Cinder fountain particle system (magma sparks erupting into the air)
      const sparkCount = 45;
      const sparkGeom = new THREE.BufferGeometry();
      const sparkPos = new Float32Array(sparkCount * 3);
      const sparkVels = [];

      for (let s = 0; s < sparkCount; s++) {
        sparkPos[s * 3] = ventPos.x;
        sparkPos[s * 3 + 1] = ventPos.y;
        sparkPos[s * 3 + 2] = ventPos.z;

        // Fountain velocity spray
        const sprayVel = ventNorm.clone().multiplyScalar(0.6 + Math.random() * 1.1)
          .add(new THREE.Vector3((Math.random() - 0.5) * 0.35, (Math.random() - 0.5) * 0.35, (Math.random() - 0.5) * 0.35));
        sparkVels.push(sprayVel);
      }

      sparkGeom.setAttribute('position', new THREE.BufferAttribute(sparkPos, 3));
      const sparkMat = new THREE.PointsMaterial({
        color: 0xffaa00,
        size: 0.14,
        transparent: true,
        opacity: 0.0,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const sparkPoints = new THREE.Points(sparkGeom, sparkMat);
      sparkPoints.userData = { sparkVels, ventPos: ventPos.clone(), ventNorm: ventNorm.clone() };
      this.simulationGroup.add(sparkPoints);
      this.particleSystems.push(sparkPoints);

      // Billowing pyroclastic ash column particles rising into upper atmosphere
      const ashCount = 35;
      const ashGeom = new THREE.BufferGeometry();
      const ashPos = new Float32Array(ashCount * 3);
      const ashOffsets = [];

      for (let a = 0; a < ashCount; a++) {
        const heightFrac = a / ashCount;
        const drift = heightFrac * 0.45;
        const p = ventPos.clone().add(ventNorm.clone().multiplyScalar(heightFrac * 1.8))
          .add(new THREE.Vector3((Math.random() - 0.5) * drift, (Math.random() - 0.5) * drift, (Math.random() - 0.5) * drift));
        ashPos[a * 3] = p.x;
        ashPos[a * 3 + 1] = p.y;
        ashPos[a * 3 + 2] = p.z;
        ashOffsets.push({ height: heightFrac * 1.8, spread: drift, seed: Math.random() * Math.PI * 2 });
      }

      ashGeom.setAttribute('position', new THREE.BufferAttribute(ashPos, 3));
      const ashMat = new THREE.PointsMaterial({
        color: isSiberia ? 0x1f1f23 : 0x271912,
        size: 0.28,
        transparent: true,
        opacity: 0.0,
        depthWrite: false
      });
      const ashPoints = new THREE.Points(ashGeom, ashMat);
      ashPoints.userData = { ashOffsets, ventPos: ventPos.clone(), ventNorm: ventNorm.clone() };
      this.simulationGroup.add(ashPoints);
      this.volcanicVents.push(ashPoints);
    }

    // 3. Sprawling Basalt Lava Field Shield (Conformal spherical cap on crust)
    const lavaFieldGeom = this._createConformalCapGeometry(impactNormal, 0.42, 64, 18, this.globeRadius * 1.009);
    const lavaFieldMat = new THREE.MeshBasicMaterial({
      color: 0xff4500,
      transparent: true,
      opacity: 0.0,
      side: THREE.DoubleSide
    });
    const lavaFieldMesh = new THREE.Mesh(lavaFieldGeom, lavaFieldMat);
    this.simulationGroup.add(lavaFieldMesh);
    this.conformalSurfaceMeshes.push({ mesh: lavaFieldMesh, maxOpacity: 0.75, type: 'lava' });

    // Volcanic heat glow point light
    this.impactLight = new THREE.PointLight(0xff5500, 0.0, 35, 1.4);
    this.impactLight.position.copy(surfacePos.clone().add(impactNormal.clone().multiplyScalar(0.8)));
    this.simulationGroup.add(this.impactLight);
  }

  // =========================================================================
  // 3. Hirnantian Glaciation System (Ordovician-Silurian)
  // =========================================================================
  _buildGlaciation(impactNormal, surfacePos, event) {
    // 1. Mathematically Conformal Polar Ice Sheet (conforms precisely to sphere, expands in angular coverage)
    const iceCapData = this._createDynamicCapMesh(impactNormal, 0.95, 80, 24, this.globeRadius * 1.009, 0xe0f2fe);
    this.simulationGroup.add(iceCapData.mesh);
    this.conformalSurfaceMeshes.push({
      capData: iceCapData,
      type: 'glacier',
      minAngle: 0.15, // ~9° polar cap
      maxAngle: 0.98  // ~56° vast Gondwana continental ice sheet
    });

    // 2. Swirling Polar Tropospheric Blizzard Particle Stream
    const blizzardCount = 380;
    const bGeom = new THREE.BufferGeometry();
    const bPos = new Float32Array(blizzardCount * 3);
    const bOrbits = [];

    let u = new THREE.Vector3(1, 0, 0).cross(impactNormal);
    if (u.lengthSq() < 0.01) u = new THREE.Vector3(0, 1, 0).cross(impactNormal);
    u.normalize();
    const v = impactNormal.clone().cross(u).normalize();

    for (let i = 0; i < blizzardCount; i++) {
      const polarDist = 0.2 + Math.random() * 0.75;
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.8 + Math.random() * 1.4;
      const alt = 0.02 + Math.random() * 0.08;

      bOrbits.push({ polarDist, angle, speed, alt });

      const R = this.globeRadius * 1.009 + alt;
      const cosDist = Math.cos(polarDist);
      const sinDist = Math.sin(polarDist);
      const tx = u.x * Math.cos(angle) + v.x * Math.sin(angle);
      const ty = u.y * Math.cos(angle) + v.y * Math.sin(angle);
      const tz = u.z * Math.cos(angle) + v.z * Math.sin(angle);

      bPos[i * 3] = R * (impactNormal.x * cosDist + tx * sinDist);
      bPos[i * 3 + 1] = R * (impactNormal.y * cosDist + ty * sinDist);
      bPos[i * 3 + 2] = R * (impactNormal.z * cosDist + tz * sinDist);
    }

    bGeom.setAttribute('position', new THREE.BufferAttribute(bPos, 3));
    const bMat = new THREE.PointsMaterial({
      color: 0xcbe9fc,
      size: 0.12,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const bPoints = new THREE.Points(bGeom, bMat);
    bPoints.userData = { bOrbits, normal: impactNormal.clone(), u, v };
    this.simulationGroup.add(bPoints);
    this.particleSystems.push(bPoints);

    // 3. Ordovician Asteroid Dust Ring & Cooling Shadow (2024 Discovery)
    const ringInner = this.globeRadius * 1.25;
    const ringOuter = this.globeRadius * 1.55;
    const ringGeom = new THREE.RingGeometry(ringInner, ringOuter, 96);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x94a3b8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.0,
      depthWrite: false
    });
    this.debrisRingMesh = new THREE.Mesh(ringGeom, ringMat);
    // Align with planet equator (perpendicular to Y axis)
    this.debrisRingMesh.rotation.x = Math.PI * 0.5;
    this.simulationGroup.add(this.debrisRingMesh);
    this.activeMeshes.push(this.debrisRingMesh);
  }

  // =========================================================================
  // 4. Oceanic Anoxia System (Late Devonian Kellwasser)
  // =========================================================================
  _buildOceanicAnoxia(impactNormal, surfacePos, event) {
    // 1. Conformal Spherical Marine Anoxic Bloom (hugs the curved ocean basins)
    const anoxiaCapData = this._createDynamicCapMesh(impactNormal, 0.85, 72, 20, this.globeRadius * 1.006, 0x064e3b);
    this.simulationGroup.add(anoxiaCapData.mesh);
    this.conformalSurfaceMeshes.push({
      capData: anoxiaCapData,
      type: 'anoxia',
      minAngle: 0.10,
      maxAngle: 0.88
    });

    // 2. Rising Effervescent Toxic Gas Bubbles (H2S and Methane from ocean shelf)
    const bubbleCount = 280;
    const bubGeom = new THREE.BufferGeometry();
    const bubPos = new Float32Array(bubbleCount * 3);
    const bubData = [];

    let u = new THREE.Vector3(1, 0, 0).cross(impactNormal);
    if (u.lengthSq() < 0.01) u = new THREE.Vector3(0, 1, 0).cross(impactNormal);
    u.normalize();
    const v = impactNormal.clone().cross(u).normalize();

    for (let i = 0; i < bubbleCount; i++) {
      const radiusDist = 0.1 + Math.random() * 0.72;
      const angle = Math.random() * Math.PI * 2;
      const phase = Math.random() * Math.PI * 2;
      const speed = 0.04 + Math.random() * 0.09;

      bubData.push({ radiusDist, angle, phase, speed });

      const R = this.globeRadius * 1.006;
      const cosD = Math.cos(radiusDist);
      const sinD = Math.sin(radiusDist);
      const tx = u.x * Math.cos(angle) + v.x * Math.sin(angle);
      const ty = u.y * Math.cos(angle) + v.y * Math.sin(angle);
      const tz = u.z * Math.cos(angle) + v.z * Math.sin(angle);

      bubPos[i * 3] = R * (impactNormal.x * cosD + tx * sinD);
      bubPos[i * 3 + 1] = R * (impactNormal.y * cosD + ty * sinD);
      bubPos[i * 3 + 2] = R * (impactNormal.z * cosD + tz * sinD);
    }

    bubGeom.setAttribute('position', new THREE.BufferAttribute(bubPos, 3));
    const bubMat = new THREE.PointsMaterial({
      color: 0x34d399,
      size: 0.14,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const bubblePoints = new THREE.Points(bubGeom, bubMat);
    bubblePoints.userData = { bubData, normal: impactNormal.clone(), u, v };
    this.simulationGroup.add(bubblePoints);
    this.particleSystems.push(bubblePoints);
  }

  // =========================================================================
  // Conformal Spherical Geometry Builders (Zero Clipping, Zero Detachment)
  // =========================================================================
  _createConformalCapGeometry(normal, maxAngle, segments = 64, rings = 16, radius = this.globeRadius * 1.008) {
    let u = new THREE.Vector3(1, 0, 0).cross(normal);
    if (u.lengthSq() < 0.01) u = new THREE.Vector3(0, 1, 0).cross(normal);
    u.normalize();
    const v = normal.clone().cross(u).normalize();

    const vertices = [];
    const indices = [];

    // Apex vertex
    vertices.push(normal.x * radius, normal.y * radius, normal.z * radius);

    // Concentric rings
    for (let r = 1; r <= rings; r++) {
      const theta = (r / rings) * maxAngle;
      const cosT = Math.cos(theta);
      const sinT = Math.sin(theta);

      for (let s = 0; s < segments; s++) {
        const phi = (s / segments) * Math.PI * 2;
        const cosP = Math.cos(phi);
        const sinP = Math.sin(phi);

        const tx = u.x * cosP + v.x * sinP;
        const ty = u.y * cosP + v.y * sinP;
        const tz = u.z * cosP + v.z * sinP;

        vertices.push(
          radius * (normal.x * cosT + tx * sinT),
          radius * (normal.y * cosT + ty * sinT),
          radius * (normal.z * cosT + tz * sinT)
        );
      }
    }

    // Apex fan indices
    for (let s = 0; s < segments; s++) {
      const next = (s + 1) % segments;
      indices.push(0, s + 1, next + 1);
    }

    // Quad strips between concentric rings
    for (let r = 1; r < rings; r++) {
      const r1 = 1 + (r - 1) * segments;
      const r2 = 1 + r * segments;
      for (let s = 0; s < segments; s++) {
        const next = (s + 1) % segments;
        indices.push(r1 + s, r2 + s, r1 + next);
        indices.push(r1 + next, r2 + s, r2 + next);
      }
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geom.setIndex(indices);
    geom.computeVertexNormals();
    return geom;
  }

  _createDynamicCapMesh(normal, maxAngle, segments, rings, radius, colorHex) {
    let u = new THREE.Vector3(1, 0, 0).cross(normal);
    if (u.lengthSq() < 0.01) u = new THREE.Vector3(0, 1, 0).cross(normal);
    u.normalize();
    const v = normal.clone().cross(u).normalize();

    const geom = this._createConformalCapGeometry(normal, maxAngle, segments, rings, radius);
    const mat = new THREE.MeshStandardMaterial({
      color: colorHex,
      roughness: 0.35,
      metalness: 0.15,
      transparent: true,
      opacity: 0.0,
      side: THREE.DoubleSide
    });
    const mesh = new THREE.Mesh(geom, mat);
    return { mesh, geometry: geom, material: mat, normal, u, v, segments, rings, radius };
  }

  _updateDynamicCap(capData, currentAngle, opacity) {
    const { mesh, geometry, material, normal, u, v, segments, rings, radius } = capData;
    if (currentAngle <= 0.01 || opacity <= 0.005) {
      mesh.visible = false;
      return;
    }

    mesh.visible = true;
    material.opacity = opacity;

    const pos = geometry.attributes.position;
    // Apex
    pos.setXYZ(0, normal.x * radius, normal.y * radius, normal.z * radius);

    let idx = 1;
    for (let r = 1; r <= rings; r++) {
      const theta = (r / rings) * currentAngle;
      const cosT = Math.cos(theta);
      const sinT = Math.sin(theta);

      for (let s = 0; s < segments; s++) {
        const phi = (s / segments) * Math.PI * 2;
        const cosP = Math.cos(phi);
        const sinP = Math.sin(phi);

        const tx = u.x * cosP + v.x * sinP;
        const ty = u.y * cosP + v.y * sinP;
        const tz = u.z * cosP + v.z * sinP;

        pos.setXYZ(
          idx,
          radius * (normal.x * cosT + tx * sinT),
          radius * (normal.y * cosT + ty * sinT),
          radius * (normal.z * cosT + tz * sinT)
        );
        idx++;
      }
    }

    pos.needsUpdate = true;
  }

  // =========================================================================
  // Frame Update Loop (Driven by render loop)
  // =========================================================================
  update(deltaSeconds) {
    if (this.state !== 'PLAYING') return;

    this.playbackTime += deltaSeconds * this.playbackSpeed;

    if (this.playbackTime >= this.duration) {
      this.playbackTime = this.duration;
      this.state = 'FINISHED';
      this._notifyState('FINISHED');
    }

    this._updateVisuals(this.playbackTime);
  }

  _updateVisuals(time) {
    if (!this.currentEvent) return;

    const progress = Math.min(1.0, Math.max(0.0, time / this.duration));
    if (this.onProgressCallback) {
      this.onProgressCallback(progress, time, this.duration);
    }

    const simType = this.currentEvent.simulationType || 'asteroid_impact';

    if (simType === 'asteroid_impact') {
      this._animateAsteroidImpact(progress, time);
    } else if (simType === 'siberian_traps' || simType === 'camp_volcanism') {
      this._animateVolcanism(progress, time);
    } else if (simType === 'hirnantian_glaciation') {
      this._animateGlaciation(progress, time);
    } else if (simType === 'oceanic_anoxia') {
      this._animateOceanicAnoxia(progress, time);
    }

    this._checkEnvironmentalPhase(progress);
  }

  // =========================================================================
  // 1. Animation: Asteroid Impact (Chicxulub)
  // =========================================================================
  _animateAsteroidImpact(progress, time) {
    const impactThreshold = 0.22; // t = 3.96s of 18s sequence

    // 1. Hypersonic Bolide Entry (0.0 -> 0.22)
    if (progress < impactThreshold) {
      const t = progress / impactThreshold;
      if (this.asteroidGroup) {
        this.asteroidGroup.visible = true;
        this.asteroidGroup.position.lerpVectors(this.spaceEntryOrigin, this.impactPos, t);
        // Tumble the asteroid rock core ONLY (keeping tail orientation fixed backwards)
        if (this.asteroidCoreMesh) {
          this.asteroidCoreMesh.rotation.x += 0.06;
          this.asteroidCoreMesh.rotation.y += 0.09;
        }
      }
    } else {
      if (this.asteroidGroup) this.asteroidGroup.visible = false;
    }

    // 2. Detonation Flash & Expanding 3D Plasma Fireball Dome (0.22 -> 0.48)
    const flashStart = 0.22;
    const flashEnd = 0.46;
    if (progress >= flashStart && progress <= flashEnd) {
      const ft = (progress - flashStart) / (flashEnd - flashStart);

      // Blinding light flash
      if (this.impactLight) {
        const lightPulse = Math.sin(Math.pow(ft, 0.4) * Math.PI);
        this.impactLight.intensity = lightPulse * 42.0;
      }

      // 3D Fireball dome expansion
      if (this.fireballDomeMesh) {
        this.fireballDomeMesh.visible = true;
        // Fast initial explosive expansion with smooth drag deceleration
        const domeScale = Math.pow(ft, 0.45) * 1.55;
        this.fireballDomeMesh.scale.set(domeScale, domeScale, domeScale);

        // Color shifts from blinding white to fire orange to smoky black
        const opacity = Math.sin(ft * Math.PI) * (1.0 - ft * 0.35);
        this.fireballDomeMesh.material.opacity = opacity;

        if (ft < 0.3) {
          this.fireballDomeMesh.material.color.setHex(0xffffff);
        } else if (ft < 0.65) {
          this.fireballDomeMesh.material.color.setHex(0xff5500);
        } else {
          this.fireballDomeMesh.material.color.setHex(0x381504);
        }
      }
    } else {
      if (this.impactLight) this.impactLight.intensity = 0.0;
      if (this.fireballDomeMesh) this.fireballDomeMesh.visible = false;
    }

    // 3. Geodetic Spherical Shockwave Fronts (0.22 -> 0.95)
    if (progress >= flashStart) {
      const waveOverallT = (progress - flashStart) / (0.95 - flashStart);

      this.shockwaveRings.forEach(ring => {
        const ringT = Math.max(0, (waveOverallT - ring.delay) * ring.speed);
        if (ringT > 0 && ringT <= 1.0) {
          const theta = ringT * ring.maxAngle;
          // Intense initial wave decaying exponentially across planetary distance
          const opacity = Math.sin(Math.pow(ringT, 0.4) * Math.PI) * (1.0 - ringT * 0.42);
          const currentWidth = ring.baseWidth * (1.0 + ringT * 1.4);
          this._updateGeodeticRing(ring, theta, currentWidth, opacity);
        } else {
          ring.mesh.visible = false;
        }
      });
    } else {
      this.shockwaveRings.forEach(ring => { ring.mesh.visible = false; });
    }

    // 4. Crater Caldera & Peak Ring Incandescence (0.22 -> 1.0)
    if (progress >= flashStart && this.craterGroup) {
      this.craterGroup.visible = true;
      const craterT = (progress - flashStart) / (1.0 - flashStart);
      const coolFactor = Math.max(0, 1.0 - Math.pow(craterT, 0.6) * 0.85);

      if (this.craterPeakMesh) {
        this.craterPeakMesh.material.opacity = coolFactor * 0.95;
      }
      if (this.craterRimMesh) {
        this.craterRimMesh.material.opacity = Math.min(0.85, coolFactor * 1.1);
        const rimScale = 1.0 + Math.min(1.8, craterT * 2.2);
        this.craterRimMesh.scale.set(rimScale, rimScale, 1.0);
      }
    } else if (this.craterGroup) {
      this.craterGroup.visible = false;
    }

    // 5. Parabolic Ballistic Ejecta Curtain (0.23 -> 0.70)
    if (progress >= 0.23 && progress <= 0.70 && this.ejectaPoints) {
      this.ejectaPoints.visible = true;
      const ejT = (progress - 0.23) / (0.70 - 0.23);
      this.ejectaPoints.material.opacity = Math.sin(ejT * Math.PI) * 0.95;

      const posAttr = this.ejectaPoints.geometry.attributes.position;
      const vels = this.ejectaPoints.userData.velocities;
      const initPos = this.ejectaPoints.userData.initialPositions;

      for (let i = 0; i < vels.length; i++) {
        const v = vels[i];
        // Physical ballistic trajectory with gravity pulling back towards Earth center
        const tFlight = ejT * 2.6;
        const gFactor = 0.5 * 1.8 * tFlight * tFlight;

        const norm = new THREE.Vector3(initPos[i * 3], initPos[i * 3 + 1], initPos[i * 3 + 2]).normalize();

        const px = initPos[i * 3] + v.x * tFlight - norm.x * gFactor;
        const py = initPos[i * 3 + 1] + v.y * tFlight - norm.y * gFactor;
        const pz = initPos[i * 3 + 2] + v.z * tFlight - norm.z * gFactor;

        posAttr.setXYZ(i, px, py, pz);
      }
      posAttr.needsUpdate = true;
    } else if (this.ejectaPoints) {
      this.ejectaPoints.visible = false;
    }

    // 6. Stratospheric Soot / Sulfate Aerosol Nuclear Winter
    if (this.globeScene && this.globeScene.sunLight) {
      if (progress >= 0.35 && progress <= 0.85) {
        const winterT = (progress - 0.35) / 0.50;
        const dimFactor = Math.sin(winterT * Math.PI);
        this.globeScene.sunLight.intensity = THREE.MathUtils.lerp(2.8, 0.42, dimFactor);
        this.globeScene.sunLight.color.setHex(0xfde68a); // Pale bronze / ashen sunlight
      } else if (progress > 0.85) {
        const recT = (progress - 0.85) / 0.15;
        this.globeScene.sunLight.intensity = THREE.MathUtils.lerp(0.42, 2.8, recT);
        this.globeScene.sunLight.color.setHex(0xfff0db);
      } else {
        this.globeScene.sunLight.intensity = 2.8;
      }
    }
  }

  // =========================================================================
  // 2. Animation: Flood Basalt Volcanism (Siberian Traps & CAMP)
  // =========================================================================
  _animateVolcanism(progress, time) {
    // 1. Pulsating Convective Crustal Fissures
    const magmaPulse = Math.sin(time * 5.5) * 0.25 + 0.75;
    this.activeMeshes.forEach(mesh => {
      if (mesh.material) {
        mesh.material.opacity = Math.min(0.95, progress * 1.5) * magmaPulse;
      }
    });

    // 2. Sprawling Basalt Lava Field Shield
    this.conformalSurfaceMeshes.forEach(item => {
      if (item.type === 'lava' && item.mesh) {
        const fieldT = Math.min(1.0, progress * 1.4);
        item.mesh.material.opacity = fieldT * item.maxOpacity * (0.8 + Math.sin(time * 4.0) * 0.2);
        const scale = 0.6 + fieldT * 0.7;
        item.mesh.scale.set(scale, scale, scale);
      }
    });

    // 3. Eruptive Cinder Fountains & Ash Clouds
    this.particleSystems.forEach(ps => {
      if (ps.userData && ps.userData.sparkVels) {
        ps.material.opacity = Math.min(0.9, progress * 1.6);
        const posAttr = ps.geometry.attributes.position;
        const vels = ps.userData.sparkVels;
        const vPos = ps.userData.ventPos;
        const vNorm = ps.userData.ventNorm;

        for (let i = 0; i < vels.length; i++) {
          const tCycle = (time * 2.2 + i * 0.1) % 1.0;
          const v = vels[i];
          const px = vPos.x + v.x * tCycle - vNorm.x * (0.5 * 1.2 * tCycle * tCycle);
          const py = vPos.y + v.y * tCycle - vNorm.y * (0.5 * 1.2 * tCycle * tCycle);
          const pz = vPos.z + v.z * tCycle - vNorm.z * (0.5 * 1.2 * tCycle * tCycle);
          posAttr.setXYZ(i, px, py, pz);
        }
        posAttr.needsUpdate = true;
      }
    });

    this.volcanicVents.forEach(vent => {
      if (vent.userData && vent.userData.ashOffsets) {
        vent.material.opacity = Math.min(0.85, progress * 1.4);
        const posAttr = vent.geometry.attributes.position;
        const offsets = vent.userData.ashOffsets;
        const vPos = vent.userData.ventPos;
        const vNorm = vent.userData.ventNorm;

        for (let i = 0; i < offsets.length; i++) {
          const off = offsets[i];
          const curH = off.height * (1.0 + Math.min(1.5, progress * 2.0));
          const sway = Math.sin(time * 1.5 + off.seed) * 0.12 * curH;
          const p = vPos.clone().add(vNorm.clone().multiplyScalar(curH))
            .add(new THREE.Vector3(sway, sway, sway));
          posAttr.setXYZ(i, p.x, p.y, p.z);
        }
        posAttr.needsUpdate = true;
      }
    });

    // 4. Volcanic Heat Glow & Stratospheric Copper Dusk
    if (this.impactLight) {
      this.impactLight.intensity = Math.min(18.0, progress * 22.0) * magmaPulse;
    }
    if (this.globeScene && this.globeScene.sunLight) {
      const dim = Math.min(0.68, progress * 0.9);
      this.globeScene.sunLight.intensity = THREE.MathUtils.lerp(2.8, 1.05, dim);
      this.globeScene.sunLight.color.setHex(0xfb923c); // Apocalyptic fiery copper sun
    }
  }

  // =========================================================================
  // 3. Animation: Hirnantian Glaciation (Ordovician-Silurian)
  // =========================================================================
  _animateGlaciation(progress, time) {
    // 1. Conformal Polar Ice Sheet Expansion (along the surface, zero detachment!)
    this.conformalSurfaceMeshes.forEach(item => {
      if (item.type === 'glacier' && item.capData) {
        const iceAngle = THREE.MathUtils.lerp(item.minAngle, item.maxAngle, Math.min(1.0, progress * 1.25));
        const iceOpacity = Math.min(0.92, progress * 1.4);
        this._updateDynamicCap(item.capData, iceAngle, iceOpacity);
      }
    });

    // 2. Swirling Polar Blizzard Particles
    this.particleSystems.forEach(ps => {
      if (ps.userData && ps.userData.bOrbits) {
        ps.material.opacity = Math.min(0.85, progress * 1.3);
        const posAttr = ps.geometry.attributes.position;
        const orbits = ps.userData.bOrbits;
        const norm = ps.userData.normal;
        const u = ps.userData.u;
        const v = ps.userData.v;

        for (let i = 0; i < orbits.length; i++) {
          const orb = orbits[i];
          const curAngle = orb.angle + time * orb.speed * 0.8;
          const R = this.globeRadius * 1.009 + orb.alt;

          const cosDist = Math.cos(orb.polarDist);
          const sinDist = Math.sin(orb.polarDist);
          const tx = u.x * Math.cos(curAngle) + v.x * Math.sin(curAngle);
          const ty = u.y * Math.cos(curAngle) + v.y * Math.sin(curAngle);
          const tz = u.z * Math.cos(curAngle) + v.z * Math.sin(curAngle);

          posAttr.setXYZ(
            i,
            R * (norm.x * cosDist + tx * sinDist),
            R * (norm.y * cosDist + ty * sinDist),
            R * (norm.z * cosDist + tz * sinDist)
          );
        }
        posAttr.needsUpdate = true;
      }
    });

    // 3. Ordovician Asteroid Dust Ring & Shading
    if (this.debrisRingMesh) {
      this.debrisRingMesh.material.opacity = Math.min(0.55, progress * 0.8);
      this.debrisRingMesh.rotation.z += 0.0006;
    }

    if (this.globeScene && this.globeScene.sunLight) {
      this.globeScene.sunLight.color.setHex(0xe0f2fe); // Pale glacial blue-white sun
    }
  }

  // =========================================================================
  // 4. Animation: Oceanic Anoxia (Late Devonian Kellwasser)
  // =========================================================================
  _animateOceanicAnoxia(progress, time) {
    // 1. Conformal Spherical Marine Anoxic Bloom (along ocean basins, zero clipping!)
    this.conformalSurfaceMeshes.forEach(item => {
      if (item.type === 'anoxia' && item.capData) {
        const anoxiaAngle = THREE.MathUtils.lerp(item.minAngle, item.maxAngle, Math.min(1.0, progress * 1.2));
        const anoxiaOpacity = Math.min(0.88, progress * 1.35);
        this._updateDynamicCap(item.capData, anoxiaAngle, anoxiaOpacity);

        // Color shifts from eutrophic emerald green to toxic anoxic purple-black
        if (progress > 0.45) {
          const toxicT = (progress - 0.45) / 0.55;
          item.capData.material.color.lerpColors(new THREE.Color(0x064e3b), new THREE.Color(0x1e1b4b), toxicT * 0.8);
        } else {
          item.capData.material.color.setHex(0x064e3b);
        }
      }
    });

    // 2. Rising Effervescent Toxic Gas Bubbles (H2S and Methane)
    this.particleSystems.forEach(ps => {
      if (ps.userData && ps.userData.bubData) {
        ps.material.opacity = Math.min(0.8, progress * 1.25);
        const posAttr = ps.geometry.attributes.position;
        const bData = ps.userData.bubData;
        const norm = ps.userData.normal;
        const u = ps.userData.u;
        const v = ps.userData.v;

        for (let i = 0; i < bData.length; i++) {
          const b = bData[i];
          const cycle = (time * b.speed * 8.0 + b.phase) % 1.0;
          const altitude = cycle * 0.15;
          const R = this.globeRadius * 1.006 + altitude;

          const cosD = Math.cos(b.radiusDist);
          const sinD = Math.sin(b.radiusDist);
          const tx = u.x * Math.cos(b.angle) + v.x * Math.sin(b.angle);
          const ty = u.y * Math.cos(b.angle) + v.y * Math.sin(b.angle);
          const tz = u.z * Math.cos(b.angle) + v.z * Math.sin(b.angle);

          posAttr.setXYZ(
            i,
            R * (norm.x * cosD + tx * sinD),
            R * (norm.y * cosD + ty * sinD),
            R * (norm.z * cosD + tz * sinD)
          );
        }
        posAttr.needsUpdate = true;
      }
    });

    if (this.globeScene && this.globeScene.sunLight) {
      const dim = Math.min(0.45, progress * 0.6);
      this.globeScene.sunLight.intensity = THREE.MathUtils.lerp(2.8, 1.6, dim);
    }
  }

  // =========================================================================
  // Environmental Phase Sync & Notifications
  // =========================================================================
  _checkEnvironmentalPhase(progress) {
    if (!this.currentEvent || !this.currentEvent.environmentalPhases) return;
    const phases = this.currentEvent.environmentalPhases;
    const phaseIdx = Math.min(phases.length - 1, Math.floor(progress * phases.length));

    if (phaseIdx !== this.currentPhaseIndex) {
      this.currentPhaseIndex = phaseIdx;
      if (this.onPhaseChangeCallback) {
        this.onPhaseChangeCallback(phases[phaseIdx], phaseIdx, phases.length);
      }
    }
  }

  _notifyState(stateName) {
    if (this.onStateChangeCallback) {
      this.onStateChangeCallback(stateName, this.currentEvent);
    }
  }
}
