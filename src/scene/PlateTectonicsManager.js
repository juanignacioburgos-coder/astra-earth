import * as THREE from 'three';

/**
 * PlateTectonicsManager
 * High-precision 3D structural geology engine:
 * - Renders continuous glowing tectonic plate boundaries conforming to spherical geodesics
 *   (Divergent mid-ocean ridges, Subduction convergent trenches, Transform strike-slip faults, Orogenic collisions)
 * - Eliminates rectangular/boxy artifacts with spherical SLERP interpolation
 * - Displays sleek, non-intrusive glowing paleoplate pill badges instead of bulky rectangular cards
 * - Provides interactive raycasting with detailed geological telemetry
 */
export class PlateTectonicsManager {
  constructor(globeGroup, globeRadius = 5.0, onBoundarySelected = null, onPlateSelected = null) {
    this.globeGroup = globeGroup;
    this.globeRadius = globeRadius;
    this.boundaryRadius = globeRadius * 1.008; // Hugs crust naturally without z-fighting
    this.labelRadius = globeRadius * 1.025;    // Sleek proximity to planet surface

    this.onBoundarySelected = onBoundarySelected;
    this.onPlateSelected = onPlateSelected;

    this.tectonicsGroup = new THREE.Group();
    this.tectonicsGroup.name = 'tectonics-group';
    this.tectonicsGroup.visible = false;
    this.globeGroup.add(this.tectonicsGroup);

    this.boundariesGroup = new THREE.Group();
    this.boundariesGroup.name = 'tectonic-boundaries';
    this.tectonicsGroup.add(this.boundariesGroup);

    this.platesGroup = new THREE.Group();
    this.platesGroup.name = 'tectonic-plates';
    this.tectonicsGroup.add(this.platesGroup);

    this.tectonicsDatabase = null;
    this.currentPeriodId = null;
    this.activeBoundaries = [];
    this.activePlates = [];
    this.animatedMeshes = [];

    // Raycaster for user inspection
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this._initMaterials();
  }

  _initMaterials() {
    // 1. Divergent Ridges & Continental Rifts (Cyan / Neon Blue glow)
    this.divergentMaterial = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x00a8e8,
      emissiveIntensity: 2.4,
      roughness: 0.15,
      metalness: 0.3
    });

    // 2. Convergent Subduction Trenches (Fiery Orange-Red glow)
    this.convergentMaterial = new THREE.MeshStandardMaterial({
      color: 0xff4500,
      emissive: 0xd9381e,
      emissiveIntensity: 2.6,
      roughness: 0.15,
      metalness: 0.3
    });

    // 3. Transform Strike-Slip Faults (Amber / Golden Yellow glow)
    this.transformMaterial = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      emissive: 0xd97706,
      emissiveIntensity: 2.2,
      roughness: 0.15,
      metalness: 0.3
    });

    // 4. Orogenic Continental Collisions (Purple / Royal Amethyst glow)
    this.collisionMaterial = new THREE.MeshStandardMaterial({
      color: 0xc084fc,
      emissive: 0x9333ea,
      emissiveIntensity: 2.5,
      roughness: 0.15,
      metalness: 0.3
    });
  }

  setData(database) {
    this.tectonicsDatabase = database;
  }

  latLonToCartesian(lat, lon, radius = this.boundaryRadius) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    return new THREE.Vector3(
      -(radius * Math.sin(phi) * Math.cos(theta)),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    );
  }

  toggle(forceState = null) {
    const newState = forceState !== null ? forceState : !this.tectonicsGroup.visible;
    this.tectonicsGroup.visible = newState;
    return newState;
  }

  isVisible() {
    return this.tectonicsGroup.visible;
  }

  clear() {
    while (this.boundariesGroup.children.length > 0) {
      const obj = this.boundariesGroup.children[0];
      if (obj.geometry) obj.geometry.dispose();
      this.boundariesGroup.remove(obj);
    }
    while (this.platesGroup.children.length > 0) {
      const obj = this.platesGroup.children[0];
      if (obj.material && obj.material.map) obj.material.map.dispose();
      if (obj.material) obj.material.dispose();
      this.platesGroup.remove(obj);
    }
    this.activeBoundaries = [];
    this.activePlates = [];
    this.animatedMeshes = [];
  }

  updateForPeriod(periodId) {
    this.currentPeriodId = periodId;
    this.clear();

    if (!this.tectonicsDatabase || !this.tectonicsDatabase.periods) return;

    const periodData = this.tectonicsDatabase.periods[periodId];
    if (!periodData) return;

    // 1. Render Plate Boundaries with smooth spherical geodesics
    if (Array.isArray(periodData.boundaries)) {
      periodData.boundaries.forEach(b => {
        this._renderBoundary(b);
      });
    }

    // 2. Render Paleoplate Centroid Badges (Sleek, compact glowing pills)
    if (Array.isArray(periodData.plates)) {
      periodData.plates.forEach(p => {
        this._renderPlateBadge(p);
      });
    }
  }

  /**
   * Renders a continuous, organic tectonic fault line using true spherical SLERP.
   * Completely avoids flat/rectangular turns and sagging artifacts.
   */
  _renderBoundary(boundary) {
    const coords = boundary.coordinates;
    if (!coords || coords.length < 2) return;

    const smoothPoints = [];

    for (let i = 0; i < coords.length - 1; i++) {
      const lat1 = coords[i][0];
      const lon1 = coords[i][1];
      const lat2 = coords[i + 1][0];
      const lon2 = coords[i + 1][1];

      const v1 = this.latLonToCartesian(lat1, lon1, 1.0).normalize();
      const v2 = this.latLonToCartesian(lat2, lon2, 1.0).normalize();

      // Angular distance
      const angle = v1.angleTo(v2);
      // Density of steps proportional to distance on the globe
      const steps = Math.max(6, Math.min(32, Math.floor(angle * 28)));

      for (let s = 0; s < steps; s++) {
        const t = s / steps;
        // Spherical linear interpolation between unit direction vectors
        const q1 = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), v1);
        const q2 = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), v2);
        q1.slerp(q2, t);
        const interpNormal = new THREE.Vector3(0, 0, 1).applyQuaternion(q1).normalize();

        // Subtle organic geological meander (adds natural micro-fracture realism)
        const meanderFactor = Math.sin(t * Math.PI * 4.0 + i) * 0.003;
        const pt = interpNormal.multiplyScalar(this.boundaryRadius + meanderFactor);
        smoothPoints.push(pt);
      }
    }

    const lastCoord = coords[coords.length - 1];
    smoothPoints.push(this.latLonToCartesian(lastCoord[0], lastCoord[1], this.boundaryRadius));

    if (smoothPoints.length < 2) return;

    // Build smooth CatmullRom spline through spherical SLERP points
    const curve = new THREE.CatmullRomCurve3(smoothPoints);
    const tubeRadius = boundary.type === 'collision' ? 0.026 : 0.020;
    const tubeSegments = smoothPoints.length * 2;
    const tubeGeom = new THREE.TubeGeometry(curve, tubeSegments, tubeRadius, 6, false);

    let mat = this.divergentMaterial;
    if (boundary.type === 'convergent') mat = this.convergentMaterial;
    else if (boundary.type === 'transform') mat = this.transformMaterial;
    else if (boundary.type === 'collision') mat = this.collisionMaterial;

    const tubeMesh = new THREE.Mesh(tubeGeom, mat.clone());
    tubeMesh.name = `boundary-${boundary.id}`;
    tubeMesh.userData = {
      isTectonicBoundary: true,
      boundaryData: boundary,
      baseEmissiveIntensity: mat.emissiveIntensity
    };

    this.boundariesGroup.add(tubeMesh);
    this.activeBoundaries.push(tubeMesh);
    this.animatedMeshes.push(tubeMesh);
  }

  /**
   * Renders sleek, compact glowing pill tags on the planetary crust
   * Replaces giant clunky rectangular billboard boxes.
   */
  _renderPlateBadge(plate) {
    if (!plate.centroid) return;

    const surfacePos = this.latLonToCartesian(plate.centroid.lat, plate.centroid.lon, this.globeRadius * 1.012);
    const norm = surfacePos.clone().normalize();

    // 1. Sleek glowing beacon ring directly on the crust
    const isOceanic = plate.type === 'oceanic';
    const isMicro = plate.type === 'microplate';
    const ringColor = isOceanic ? 0x00e5ff : (isMicro ? 0xc084fc : 0x22c55e);

    const ringGeom = new THREE.RingGeometry(0.04, 0.08, 24);
    const ringMat = new THREE.MeshBasicMaterial({
      color: ringColor,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    const ringMesh = new THREE.Mesh(ringGeom, ringMat);
    ringMesh.position.copy(surfacePos);
    ringMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), norm);
    this.platesGroup.add(ringMesh);

    // 2. High-DPI compact capsule sprite (no giant rectangular cards, no vertical poles!)
    const canvas = document.createElement('canvas');
    canvas.width = 320;
    canvas.height = 96;
    const ctx = canvas.getContext('2d');

    const bgFill = isOceanic ? 'rgba(8, 24, 44, 0.88)' : (isMicro ? 'rgba(32, 12, 44, 0.88)' : 'rgba(12, 32, 18, 0.88)');
    const borderColor = isOceanic ? '#00e5ff' : (isMicro ? '#c084fc' : '#4ade80');
    const icon = isOceanic ? '🌊' : (isMicro ? '🧩' : '🏔️');

    // Capsule pill shape
    ctx.fillStyle = bgFill;
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(6, 6, 308, 84, 42);
    ctx.fill();
    ctx.stroke();

    // Plate name & velocity
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px "Outfit", "Inter", sans-serif';
    ctx.fillText(`${icon} ${plate.name}`, 20, 42);

    ctx.fillStyle = borderColor;
    ctx.font = '16px "Inter", monospace';
    ctx.fillText(plate.motion || 'Deriva continental activa', 22, 70);

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;

    const spriteMat = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      depthWrite: false
    });

    const sprite = new THREE.Sprite(spriteMat);
    const labelPos = this.latLonToCartesian(plate.centroid.lat, plate.centroid.lon, this.labelRadius);
    sprite.position.copy(labelPos);
    // Sleek, compact scale
    sprite.scale.set(0.85, 0.255, 1.0);
    sprite.userData = {
      isTectonicPlate: true,
      plateData: plate
    };

    this.platesGroup.add(sprite);
    this.activePlates.push(sprite);
  }

  testIntersection(normalizedX, normalizedY, camera) {
    if (!this.tectonicsGroup.visible) return null;

    this.mouse.set(normalizedX, normalizedY);
    this.raycaster.setFromCamera(this.mouse, camera);

    const interactiveObjects = [...this.activeBoundaries, ...this.activePlates];
    const intersects = this.raycaster.intersectObjects(interactiveObjects, false);

    if (intersects.length > 0) {
      const topHit = intersects[0].object;
      return topHit.userData;
    }
    return null;
  }

  update(timeSeconds) {
    if (!this.tectonicsGroup.visible) return;

    // Harmonious thermal stress pulse along plate boundaries
    const pulse = Math.sin(timeSeconds * 2.8) * 0.25 + 0.75;
    for (let i = 0; i < this.animatedMeshes.length; i++) {
      const mesh = this.animatedMeshes[i];
      if (mesh.material && mesh.material.emissiveIntensity !== undefined) {
        const base = mesh.userData.baseEmissiveIntensity || 2.2;
        mesh.material.emissiveIntensity = base * pulse;
      }
    }
  }
}
