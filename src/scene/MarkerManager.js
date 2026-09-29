import * as THREE from 'three';

/**
 * Creates a spherical cap geometry that curves directly over a sphere of given radius.
 * Local orientation: centered at (0, 0, radius), pointing in +Z direction.
 */
function createSphericalCapGeometry(radius, angularRadiusRad, segments = 48, rings = 10) {
  const vertices = [];
  const uvs = [];
  const indices = [];

  // Center vertex
  vertices.push(0, 0, radius);
  uvs.push(0.5, 0.5);

  for (let r = 1; r <= rings; r++) {
    const phi = (r / rings) * angularRadiusRad;
    const sinPhi = Math.sin(phi);
    const cosPhi = Math.cos(phi);

    for (let s = 0; s <= segments; s++) {
      const theta = (s / segments) * Math.PI * 2;
      const x = radius * sinPhi * Math.cos(theta);
      const y = radius * sinPhi * Math.sin(theta);
      const z = radius * cosPhi;
      vertices.push(x, y, z);

      const u = 0.5 + 0.5 * (r / rings) * Math.cos(theta);
      const v = 0.5 + 0.5 * (r / rings) * Math.sin(theta);
      uvs.push(u, v);
    }
  }

  // Center triangle fan
  for (let s = 0; s < segments; s++) {
    indices.push(0, s + 1, s + 2);
  }

  // Quads for outer concentric rings
  for (let r = 1; r < rings; r++) {
    const ringStart = 1 + (r - 1) * (segments + 1);
    const nextRingStart = 1 + r * (segments + 1);
    for (let s = 0; s < segments; s++) {
      const a = ringStart + s;
      const b = nextRingStart + s;
      const c = nextRingStart + s + 1;
      const d = ringStart + s + 1;
      indices.push(a, b, d);
      indices.push(b, c, d);
    }
  }

  const geom = new THREE.BufferGeometry();
  geom.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geom.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geom.setIndex(indices);
  geom.computeVertexNormals();
  return geom;
}

/**
 * Creates a glowing canvas texture with semi-transparent core and neon outer boundary.
 * For marine organisms, embeds oceanic bathymetric ripple contours.
 */
function createZoneGradientTexture(hexColor, isMarine = false) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  const col = new THREE.Color(hexColor);
  const rgb = `${Math.round(col.r * 255)}, ${Math.round(col.g * 255)}, ${Math.round(col.b * 255)}`;

  const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  if (isMarine) {
    grad.addColorStop(0.0, `rgba(0, 210, 255, 0.62)`);
    grad.addColorStop(0.35, `rgba(2, 132, 199, 0.42)`);
    grad.addColorStop(0.72, `rgba(14, 165, 233, 0.24)`);
    grad.addColorStop(0.90, `rgba(56, 189, 248, 0.55)`);
    grad.addColorStop(0.97, `rgba(56, 189, 248, 0.80)`);
    grad.addColorStop(1.0, `rgba(0, 210, 255, 0.0)`);
  } else {
    grad.addColorStop(0.0, `rgba(${rgb}, 0.58)`);
    grad.addColorStop(0.40, `rgba(${rgb}, 0.38)`);
    grad.addColorStop(0.72, `rgba(${rgb}, 0.20)`);
    grad.addColorStop(0.88, `rgba(${rgb}, 0.50)`);
    grad.addColorStop(0.96, `rgba(${rgb}, 0.78)`);
    grad.addColorStop(1.0, `rgba(${rgb}, 0.0)`);
  }

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);

  if (isMarine) {
    // Subtle oceanic bathymetric ripple contours
    ctx.strokeStyle = `rgba(125, 211, 252, 0.28)`;
    ctx.lineWidth = 1.2;
    [45, 80, 110].forEach(r => {
      ctx.beginPath();
      ctx.arc(128, 128, r, 0, Math.PI * 2);
      ctx.stroke();
    });
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  return texture;
}

/**
 * MarkerManager
 * Manages 3D point markers, colored geographic distribution zones, and continental drift city pins.
 */
export class MarkerManager {
  constructor(globeGroup, globeRadius = 5.0, onMarkerClick = null) {
    this.globeGroup = globeGroup;
    this.globeRadius = globeRadius;
    this.markerRadius = globeRadius * 1.018; // Slightly elevated above terrain to avoid z-fighting
    this.onMarkerClick = onMarkerClick;

    this.markersGroup = new THREE.Group();
    this.markersGroup.name = 'species-markers-group';
    this.globeGroup.add(this.markersGroup);

    this.zoneGroup = new THREE.Group();
    this.zoneGroup.name = 'species-zone-group';
    this.globeGroup.add(this.zoneGroup);

    this.cityGroup = new THREE.Group();
    this.cityGroup.name = 'city-marker-group';
    this.globeGroup.add(this.cityGroup);

    this.activeMarkers = [];
    this.hoveredMarker = null;
    this.selectedSpecies = null;
    this.activeCity = null;

    // Raycaster for user mouse interaction
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    // Reusable geometries
    this.pinGeometry = new THREE.SphereGeometry(0.12, 16, 16);
    this.ringGeometry = new THREE.RingGeometry(0.15, 0.23, 32);

    this._initMaterials();
  }

  _initMaterials() {
    this.defaultPinMaterial = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 1.2,
      roughness: 0.2,
      metalness: 0.4
    });

    this.carnivoreMaterial = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0xdc2626,
      emissiveIntensity: 1.4,
      roughness: 0.2,
      metalness: 0.4
    });

    this.herbivoreMaterial = new THREE.MeshStandardMaterial({
      color: 0x22c55e,
      emissive: 0x16a34a,
      emissiveIntensity: 1.4,
      roughness: 0.2,
      metalness: 0.4
    });

    this.piscivoreMaterial = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x0891b2,
      emissiveIntensity: 1.4,
      roughness: 0.2,
      metalness: 0.4
    });

    this.ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.7,
      depthWrite: false
    });
  }

  /**
   * Transforms latitude/longitude coordinates (degrees) to 3D Cartesian coordinates (x, y, z)
   */
  latLonToCartesian(lat, lon, radius = this.markerRadius) {
    const latRad = (lat * Math.PI) / 180;
    const lonRad = (lon * Math.PI) / 180;

    const x = radius * Math.cos(latRad) * Math.cos(lonRad);
    const y = radius * Math.sin(latRad);
    const z = -radius * Math.cos(latRad) * Math.sin(lonRad);

    return new THREE.Vector3(x, y, z);
  }

  /**
   * Renders 3D point markers for all active species when no single species is isolated.
   */
  updateSpeciesMarkers(speciesList = [], periodColor = '#38bdf8') {
    this.clearAll();
    this.selectedSpecies = null;

    if (!speciesList || speciesList.length === 0) return;

    speciesList.forEach((sp, idx) => {
      const coords = sp.paleoCoordinates || sp.coordinates;
      const lat = coords ? coords.lat : (sp.lat || 0);
      const lon = coords ? (coords.lon !== undefined ? coords.lon : (coords.lng !== undefined ? coords.lng : 0)) : (sp.lon || 0);

      const position = this.latLonToCartesian(lat, lon, this.markerRadius);
      const surfacePos = this.latLonToCartesian(lat, lon, this.globeRadius);

      const markerNode = new THREE.Group();
      markerNode.position.copy(position);
      markerNode.lookAt(position.clone().multiplyScalar(2)); // Perpendicular to sphere

      // Color based on diet
      let pinMat;
      const dietStr = (sp.diet || '').toLowerCase();
      if (dietStr.includes('carnívoro')) {
        pinMat = this.carnivoreMaterial.clone();
      } else if (dietStr.includes('herbívoro')) {
        pinMat = this.herbivoreMaterial.clone();
      } else if (dietStr.includes('piscívoro') || dietStr.includes('filtrador')) {
        pinMat = this.piscivoreMaterial.clone();
      } else {
        pinMat = this.defaultPinMaterial.clone();
      }

      // Core sphere pin
      const sphereMesh = new THREE.Mesh(this.pinGeometry, pinMat);
      sphereMesh.userData = { speciesData: sp, parentGroup: markerNode, isMarkerMesh: true };
      markerNode.add(sphereMesh);

      // Pulsing Ring
      const ringMat = this.ringMaterial.clone();
      ringMat.color.copy(pinMat.emissive);
      const ringMesh = new THREE.Mesh(this.ringGeometry, ringMat);
      ringMesh.position.z = -0.01;
      markerNode.add(ringMesh);

      // Surface connecting stem
      const stemGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        surfacePos.clone().sub(position)
      ]);
      const stemMaterial = new THREE.LineBasicMaterial({
        color: pinMat.emissive,
        transparent: true,
        opacity: 0.6
      });
      const stemLine = new THREE.Line(stemGeometry, stemMaterial);
      markerNode.add(stemLine);

      // Setup initial animation values
      markerNode.scale.set(0.001, 0.001, 0.001);
      markerNode.userData = {
        speciesData: sp,
        targetScale: 1.0,
        currentScale: 0.001,
        pulseOffset: idx * 0.45,
        ringMesh: ringMesh,
        sphereMesh: sphereMesh
      };

      this.markersGroup.add(markerNode);
      this.activeMarkers.push(markerNode);
    });
  }

  /**
   * Displays the geographic distribution zone for a selected species.
   * Colors the geographic zone as a curved spherical cap on the globe surface with a pulsing beacon.
   */
  showSpeciesZone(sp, periodColor = '#38bdf8') {
    this.clearAll();
    this.selectedSpecies = sp;

    const coords = sp.paleoCoordinates || sp.coordinates;
    const lat = coords ? coords.lat : (sp.lat || 0);
    const lon = coords ? (coords.lon !== undefined ? coords.lon : (coords.lng !== undefined ? coords.lng : 0)) : (sp.lon || 0);

    const normal = this.latLonToCartesian(lat, lon, 1.0).normalize();
    const surfacePos = normal.clone().multiplyScalar(this.globeRadius * 1.015);
    const pinPos = normal.clone().multiplyScalar(this.markerRadius * 1.03);

    // Determine biological habitat and distribution type
    const diet = (sp.diet || '').toLowerCase();
    const isMarine = sp.environment === 'marine' || 
                     diet.includes('piscívoro') || 
                     sp.clade?.includes('Cetacea') || 
                     sp.clade?.includes('Mosasaur') || 
                     sp.clade?.includes('Pliosaur') || 
                     sp.clade?.includes('Ichthyosaur') ||
                     sp.clade?.includes('Ammonit') ||
                     sp.clade?.includes('Trilobit') ||
                     sp.paleogeography?.waterBody !== undefined;
    const isAerial = sp.environment === 'aerial' || 
                     sp.clade?.includes('Pterosaur') || 
                     sp.clade?.includes('Aves');

    // Pick glowing thematic zone color by environment / diet / taxon
    let zoneHex = periodColor || '#38bdf8';
    if (isMarine) {
      zoneHex = '#00d2ff'; // Aquatic Electric Cyan / Bathymetric glow
    } else if (isAerial) {
      zoneHex = '#38bdf8'; // Sky Cyan
    } else if (diet.includes('carnívoro')) {
      zoneHex = '#ef4444'; // Radiant Crimson
    } else if (diet.includes('herbívoro')) {
      zoneHex = '#10b981'; // Luminous Emerald
    } else if (diet.includes('filtrador') || sp.id?.includes('stromatolite') || sp.id?.includes('charnia')) {
      zoneHex = '#f59e0b'; // Radiant Gold
    }

    // 1. Curved Spherical Cap Mesh
    // Localized, realistic geological formation basins:
    // Terrestrial biomes cover localized continental formations (~0.09 - 0.11 rad, ~550 - 700 km)
    // Marine seaways cover localized shallow shelf basins (~0.13 - 0.15 rad)
    let angularRadius = 0.09;
    if (isMarine) {
      angularRadius = 0.14; // Oceanic / epicontinental shelf basin
    } else if (isAerial) {
      angularRadius = 0.12; // Aerial roaming dispersion
    } else if (sp.size?.lengthMeters > 18 || sp.metrics?.lengthMeters > 18) {
      angularRadius = 0.11; // Megafauna roaming basin
    }

    const capGeometry = createSphericalCapGeometry(this.globeRadius * 1.014, angularRadius, 48, 10);
    const zoneTexture = createZoneGradientTexture(zoneHex, isMarine);

    const zoneMaterial = new THREE.MeshBasicMaterial({
      map: zoneTexture,
      transparent: true,
      opacity: isMarine ? 0.85 : 0.90,
      side: THREE.DoubleSide,
      depthWrite: false
    });

    const zoneMesh = new THREE.Mesh(capGeometry, zoneMaterial);
    zoneMesh.name = 'distribution-zone-surface';
    // Orient spherical cap from +Z to normal
    zoneMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
    this.zoneGroup.add(zoneMesh);

    // 2. Vertical Light Column / Beacon Ray
    const rayHeight = isMarine ? 1.6 : 1.35;
    const rayGeometry = new THREE.CylinderGeometry(0.012, 0.035, rayHeight, 16);
    rayGeometry.translate(0, rayHeight / 2, 0); // Base at 0
    const rayMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(zoneHex),
      transparent: true,
      opacity: 0.75,
      depthWrite: false
    });
    const rayMesh = new THREE.Mesh(rayGeometry, rayMaterial);
    rayMesh.position.copy(surfacePos);
    rayMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
    this.zoneGroup.add(rayMesh);

    // 3. Central Luminous Fossil Holotype Site Pin (Physical rock discovery site)
    const beaconMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: new THREE.Color(zoneHex),
      emissiveIntensity: 2.2,
      roughness: 0.15,
      metalness: 0.5
    });
    const beaconMesh = new THREE.Mesh(new THREE.SphereGeometry(0.12, 24, 24), beaconMat);
    beaconMesh.position.copy(pinPos);
    beaconMesh.userData = { 
      speciesData: sp, 
      isMarkerMesh: true,
      isHolotypeSite: true,
      isMarine: isMarine
    };
    this.zoneGroup.add(beaconMesh);

    // 4. Golden Holotype Discovery Collar (Marks exact physical quarry / outcrop)
    const holotypeCollarMat = new THREE.MeshBasicMaterial({
      color: 0xffd700,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
      depthWrite: false
    });
    const holotypeCollar = new THREE.Mesh(new THREE.RingGeometry(0.14, 0.19, 32), holotypeCollarMat);
    holotypeCollar.position.copy(pinPos);
    holotypeCollar.lookAt(pinPos.clone().multiplyScalar(2));
    this.zoneGroup.add(holotypeCollar);

    // 5. Pulsing Basin Boundary Ring
    const pulseRing = new THREE.Mesh(
      new THREE.RingGeometry(0.20, 0.28, 32),
      new THREE.MeshBasicMaterial({
        color: isMarine ? 0x38bdf8 : new THREE.Color(zoneHex),
        transparent: true,
        opacity: 0.75,
        side: THREE.DoubleSide,
        depthWrite: false
      })
    );
    pulseRing.position.copy(pinPos);
    pulseRing.lookAt(pinPos.clone().multiplyScalar(2));
    this.zoneGroup.add(pulseRing);

    this.zoneNodeData = {
      zoneMesh,
      rayMesh,
      beaconMesh,
      holotypeCollar,
      pulseRing,
      baseAngularRadius: angularRadius
    };
  }

  /**
   * Places or updates a prominent City Marker on the globe according to continental drift
   * @param {Object} cityData Entry from cities.json
   * @param {number} timeMa Millions of years ago
   */
  setCityMarker(cityData, timeMa = 0) {
    this.clearCityMarker();
    this.activeCity = cityData;

    // Find closest paleo position key in cityData.paleoPositions
    const keys = Object.keys(cityData.paleoPositions).map(k => parseFloat(k));
    let closestKey = keys[0];
    let minDiff = Math.abs(timeMa - closestKey);
    for (const k of keys) {
      const diff = Math.abs(timeMa - k);
      if (diff < minDiff) {
        minDiff = diff;
        closestKey = k;
      }
    }

    const posData = cityData.paleoPositions[closestKey.toString()];
    const lat = posData.lat;
    const lon = posData.lon;

    const normal = this.latLonToCartesian(lat, lon, 1.0).normalize();
    const surfacePos = normal.clone().multiplyScalar(this.globeRadius * 1.018);
    const pinPos = normal.clone().multiplyScalar(this.markerRadius * 1.04);

    const cityGroupNode = new THREE.Group();
    cityGroupNode.name = 'active-city-node';

    // Golden Pin Head
    const cityPinMat = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      emissive: 0xf59e0b,
      emissiveIntensity: 2.5,
      roughness: 0.1,
      metalness: 0.8
    });
    const pinMesh = new THREE.Mesh(new THREE.SphereGeometry(0.22, 24, 24), cityPinMat);
    pinMesh.position.copy(pinPos);
    cityGroupNode.add(pinMesh);

    // Golden Vertical Laser Column
    const beamHeight = 3.0;
    const beamGeom = new THREE.CylinderGeometry(0.04, 0.12, beamHeight, 16);
    beamGeom.translate(0, beamHeight / 2, 0);
    const beamMat = new THREE.MeshBasicMaterial({
      color: 0xffd700,
      transparent: true,
      opacity: 0.85,
      depthWrite: false
    });
    const beamMesh = new THREE.Mesh(beamGeom, beamMat);
    beamMesh.position.copy(surfacePos);
    beamMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
    cityGroupNode.add(beamMesh);

    // Pulsing Golden Ring
    const cityRing = new THREE.Mesh(
      new THREE.RingGeometry(0.28, 0.48, 32),
      new THREE.MeshBasicMaterial({
        color: 0xffe066,
        transparent: true,
        opacity: 0.95,
        side: THREE.DoubleSide,
        depthWrite: false
      })
    );
    cityRing.position.copy(pinPos);
    cityRing.lookAt(pinPos.clone().multiplyScalar(2));
    cityGroupNode.add(cityRing);

    cityGroupNode.userData = {
      cityData,
      posData,
      pinMesh,
      cityRing,
      lat,
      lon
    };

    this.cityGroup.add(cityGroupNode);
    return { lat, lon, context: posData.context };
  }

  clearCityMarker() {
    while (this.cityGroup.children.length > 0) {
      const child = this.cityGroup.children[0];
      this.cityGroup.remove(child);
      this._disposeNode(child);
    }
    this.activeCity = null;
  }

  /**
   * Resets and clears all 3D markers and distribution zones
   */
  clearAll() {
    // Clear markers
    while (this.markersGroup.children.length > 0) {
      const child = this.markersGroup.children[0];
      this.markersGroup.remove(child);
      this._disposeNode(child);
    }
    this.activeMarkers = [];
    this.hoveredMarker = null;

    // Clear zone
    while (this.zoneGroup.children.length > 0) {
      const child = this.zoneGroup.children[0];
      this.zoneGroup.remove(child);
      this._disposeNode(child);
    }
    this.zoneNodeData = null;
  }

  _disposeNode(node) {
    node.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
        else obj.material.dispose();
      }
    });
  }

  /**
   * Per-frame animation tick
   */
  update(timeSeconds) {
    // Animate point markers
    for (const marker of this.activeMarkers) {
      if (marker.userData.currentScale < marker.userData.targetScale) {
        marker.userData.currentScale += (marker.userData.targetScale - marker.userData.currentScale) * 0.16;
        const s = marker.userData.currentScale;
        marker.scale.set(s, s, s);
      }

      const ring = marker.userData.ringMesh;
      if (ring) {
        const pulse = Math.sin(timeSeconds * 3.5 + marker.userData.pulseOffset) * 0.5 + 0.5;
        const scaleVal = 1.0 + pulse * 0.45;
        ring.scale.set(scaleVal, scaleVal, 1.0);
        ring.material.opacity = (1.0 - pulse * 0.6) * 0.8;
      }
    }

    // Animate distribution zone pulsing
    if (this.zoneNodeData) {
      const { pulseRing, rayMesh } = this.zoneNodeData;
      const pulse = Math.sin(timeSeconds * 3.0) * 0.5 + 0.5;

      if (pulseRing) {
        const scaleVal = 1.0 + pulse * 0.35;
        pulseRing.scale.set(scaleVal, scaleVal, 1.0);
        pulseRing.material.opacity = (1.0 - pulse * 0.6) * 0.75;
      }

      if (rayMesh) {
        rayMesh.material.opacity = 0.55 + pulse * 0.35;
      }
    }

    // Animate city marker pulsing
    if (this.cityGroup.children.length > 0) {
      const cityNode = this.cityGroup.children[0];
      if (cityNode && cityNode.userData && cityNode.userData.cityRing) {
        const pulse = Math.sin(timeSeconds * 3.8) * 0.5 + 0.5;
        const scaleVal = 1.0 + pulse * 0.9;
        cityNode.userData.cityRing.scale.set(scaleVal, scaleVal, 1.0);
        cityNode.userData.cityRing.material.opacity = (1.0 - pulse * 0.7) * 0.95;
      }
    }
  }

  /**
   * Raycast testing for interactive hovering and clicking on 3D markers
   */
  testIntersection(normalizedX, normalizedY, camera) {
    this.mouse.set(normalizedX, normalizedY);
    this.raycaster.setFromCamera(this.mouse, camera);

    const interactiveMeshes = [];
    this.activeMarkers.forEach(m => {
      if (m.userData.sphereMesh) interactiveMeshes.push(m.userData.sphereMesh);
    });

    // Also include beacon in zone mode if present
    this.zoneGroup.children.forEach(child => {
      if (child.userData && child.userData.isMarkerMesh) interactiveMeshes.push(child);
    });

    const intersects = this.raycaster.intersectObjects(interactiveMeshes, false);
    if (intersects.length > 0) {
      const hit = intersects[0];
      return {
        markerGroup: hit.object.userData.parentGroup || hit.object,
        speciesData: hit.object.userData.speciesData,
        point: hit.point
      };
    }
    return null;
  }

  setHover(markerGroup) {
    if (this.hoveredMarker === markerGroup) return;

    if (this.hoveredMarker && this.hoveredMarker.userData && this.hoveredMarker.userData.sphereMesh) {
      this.hoveredMarker.userData.sphereMesh.scale.set(1.0, 1.0, 1.0);
    }

    this.hoveredMarker = markerGroup;

    if (this.hoveredMarker && this.hoveredMarker.userData && this.hoveredMarker.userData.sphereMesh) {
      this.hoveredMarker.userData.sphereMesh.scale.set(1.4, 1.4, 1.4);
    }
  }
}
