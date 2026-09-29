import * as THREE from 'three';
import { generatePaleoMapCanvas } from '../utils/proceduralMaps.js';

/**
 * Manages loading, caching, and fallback generation of paleogeographic textures.
 * Supports external PNG/WebP files (e.g. Scotese PALEOMAP) with automatic
 * procedural fallback generation so the application is immediately operational.
 */
export class TextureManager {
  constructor(maxAnisotropy = 16) {
    this.textureLoader = new THREE.TextureLoader();
    this.cache = new Map();
    this.pendingPromises = new Map();
    this.useProceduralFallback = true;
    this.maxAnisotropy = maxAnisotropy;
  }

  setMaxAnisotropy(val) {
    this.maxAnisotropy = val;
    this.cache.forEach(texture => {
      texture.anisotropy = val;
      texture.needsUpdate = true;
    });
  }

  /**
   * Asynchronously loads a period texture, with caching and fallback.
   * @param {Object} period Period definition from fauna_flora.json
   * @returns {Promise<THREE.Texture>}
   */
  async loadPeriodTexture(period) {
    const periodId = period.id;

    // Check cache
    if (this.cache.has(periodId)) {
      return this.cache.get(periodId);
    }

    // Check if already in flight
    if (this.pendingPromises.has(periodId)) {
      return this.pendingPromises.get(periodId);
    }

    const loadPromise = new Promise(async (resolve) => {
      // 1. Try loading external texture file if provided
      if (period.textureFile) {
        try {
          const rawUrl = period.textureFile;
          const baseUrl = import.meta.env.BASE_URL || './';
          const cleanPath = rawUrl.replace(/^\/+/, '');
          const resolvedUrl = baseUrl.endsWith('/') ? `${baseUrl}${cleanPath}` : `${baseUrl}/${cleanPath}`;
          const texture = await this._loadExternalTexture(resolvedUrl);
          if (texture) {
            this._configureTexture(texture);
            this.cache.set(periodId, texture);
            this.pendingPromises.delete(periodId);
            resolve(texture);
            return;
          }
        } catch (err) {
          console.warn(`[TextureManager] External texture ${period.textureFile} not found or failed. Falling back to procedural paleogeography engine.`, err);
        }
      }

      // 2. Fallback to procedural equirectangular map generation (HD 2048x1024)
      console.info(`[TextureManager] Generating procedural paleogeographic texture for: ${period.name} (${periodId})`);
      const canvas = generatePaleoMapCanvas(periodId, 2048, 1024);
      const canvasTexture = new THREE.CanvasTexture(canvas);
      this._configureTexture(canvasTexture);
      this.cache.set(periodId, canvasTexture);
      this.pendingPromises.delete(periodId);
      resolve(canvasTexture);
    });

    this.pendingPromises.set(periodId, loadPromise);
    return loadPromise;
  }

  /**
   * Pre-fetches or pre-generates next/previous periods for seamless scrubbing
   */
  prefetchPeriods(periods, currentIndex, range = 2) {
    const start = Math.max(0, currentIndex - range);
    const end = Math.min(periods.length - 1, currentIndex + range);

    for (let i = start; i <= end; i++) {
      if (i !== currentIndex) {
        this.loadPeriodTexture(periods[i]).catch(() => {});
      }
    }
  }

  /**
   * Internal helper to load an image URL via THREE.TextureLoader
   */
  _loadExternalTexture(url) {
    return new Promise((resolve, reject) => {
      this.textureLoader.load(
        url,
        (texture) => resolve(texture),
        undefined,
        (error) => reject(error)
      );
    });
  }

  /**
   * Configures standard texture filtering and color space
   */
  _configureTexture(texture) {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.anisotropy = this.maxAnisotropy || 16;
    texture.needsUpdate = true;
  }
}
